
const theMovieDBDotOrgApiToken: string = "f4a9d7aa5091278c42ab52c743613aa8";
const posterPath: string = "https://image.tmdb.org/t/p/original";

// get my facebook profile movies: returns movies
async function getMyMoviesHTTPRequest(): Promise<marshalledMoviesObjectShape[]>{
    try {
        let response = await fetch(
          'https://facebook.github.io/react-native/movies.json',
        );
        let responseJson = await response.json();
        return responseJson.movies;
      } catch (error) {
        // console.log(error); 
        // return [];
        throw error; 
      }
}

interface httpOptionsObject{
    hostname: string; 
    port: number; 
    path: string; 
    method: string; 
}

let optionsForMovieDbDiscover = (year: number): httpOptionsObject => {
    return {
        hostname: 'api.themoviedb.org',
        port: 443,
        path: movieSearchByYearApiPath(year),
        method: 'GET'
    }
}

async function searchForMovieThroughMovieDbApi(options: httpOptionsObject): Promise<object>{

    console.log(`${options.hostname}${options.path}`); 
    try {
        let response = await fetch(
          `http://${options.hostname}${options.path}`
        );
        let responseJson = await response.json();
        console.log(responseJson); 
        return Promise.resolve(responseJson);
      } catch (error) {
        return Promise.reject(new Error("movieDB api request failed :("));
      }
}

let movieSearchByYearApiPath = (year: number): string => {
    let movieDbDiscoverApiPath: string = `/3/discover/movie?api_key=${theMovieDBDotOrgApiToken}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&year=${year}`;
    return movieDbDiscoverApiPath;
};

type marshalledMoviesArray = null | marshalledMoviesObjectShape[] | undefined[]; 

export interface MovieDataSectionsByLetter{
    [ key: string ]: marshalledMoviesArray; 
}

let findMovieObjFromDataSet = (filmTitle: string, moviesdataSetObject: any): string => {
    for(let i = 0; i < moviesdataSetObject.results.length; i++){
        if(moviesdataSetObject.results[i].title.toUpperCase().includes(filmTitle.toUpperCase()))
            return moviesdataSetObject.results[i].poster_path;
    }
    return "not found";
}

export interface marshalledMoviesObjectShape{
    title: string; 
    posterImgUrl?: string; 
    releaseYear: number; 
    id: number; 
}

export default async (): Promise<MovieDataSectionsByLetter> => {
    // this gets mutated
    let movieSectionsBeginningWithALetter: MovieDataSectionsByLetter = {};

    let myMoviesArray: marshalledMoviesObjectShape[] = await getMyMoviesHTTPRequest();

    for(let i = 0; i < myMoviesArray.length; i++){
        movieSectionsBeginningWithALetter[myMoviesArray[i].title.substring(0, 1).toUpperCase()] = null;
    }

    let movieHeadersOfLetterXArr: string[] = [];
    for(let prop in movieSectionsBeginningWithALetter){
        movieHeadersOfLetterXArr.push(prop)
    }
    
    const arrayOfMoviesJsonObjects: object[] = await Promise.all(
        myMoviesArray.map(async (moviePojo: marshalledMoviesObjectShape)=>{ 
            // get value from promise 
            return searchForMovieThroughMovieDbApi(optionsForMovieDbDiscover(moviePojo.releaseYear)); 
        })
    )

    const arrayOfMarshalledMoviesObjectShapes: marshalledMoviesObjectShape[] = 
        myMoviesArray.map((moviePojo: marshalledMoviesObjectShape, index: number)=>{
            return {
                ...moviePojo, 
                posterImgUrl: `${posterPath}${findMovieObjFromDataSet(moviePojo.title, arrayOfMoviesJsonObjects[index])}`
            }
    })

    // should be pure, avoids mutation: returns fresh value
    const movieSectionsBeginningWithLetterWithArrData: MovieDataSectionsByLetter = 
        arrayOfMarshalledMoviesObjectShapes.reduce((accumulatedMovieSectionsBegWithLetterX: MovieDataSectionsByLetter, currentMoviePojo: marshalledMoviesObjectShape) => {
            
            for(let prop in accumulatedMovieSectionsBegWithLetterX){
                if((prop as string) === currentMoviePojo.title.charAt(0)){
                    if(accumulatedMovieSectionsBegWithLetterX[prop] == null){
                        accumulatedMovieSectionsBegWithLetterX[prop] = []; 
                        let movieSectionKeyArray = <marshalledMoviesObjectShape[]>accumulatedMovieSectionsBegWithLetterX[prop]; 
                        movieSectionKeyArray.push(currentMoviePojo);  
                    }else{
                        (accumulatedMovieSectionsBegWithLetterX[prop] as marshalledMoviesObjectShape[]).push(currentMoviePojo); 
                    }
                    break; 
                }
            }

            return accumulatedMovieSectionsBegWithLetterX; 

    }, movieSectionsBeginningWithALetter); 
        
    return movieSectionsBeginningWithLetterWithArrData; 
}