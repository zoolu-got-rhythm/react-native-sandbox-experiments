
const theMovieDBDotOrgApiToken: string = "f4a9d7aa5091278c42ab52c743613aa8";

// get my facebook profile movies: returns movies
async function getMyMoviesHTTPRequest(): Promise<marshalledMoviesObjectShape[]>{
    try {
        let response = await fetch(
          'https://facebook.github.io/react-native/movies.json',
        );
        let responseJson = await response.json();
        return responseJson.movies;
      } catch (error) {
        console.log(error); 
        return [];
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



const posterPath: string = "https://image.tmdb.org/t/p/original";


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

export default async (fnCallback: (movies: MovieDataSectionsByLetter) => void) => {
    (async function (){
        let movieSectionsBeginningWithALetter: MovieDataSectionsByLetter = {};


        let myMoviesArray: marshalledMoviesObjectShape[] = await getMyMoviesHTTPRequest();
        console.log(myMoviesArray); 


        for(let i = 0; i < myMoviesArray.length; i++){
            movieSectionsBeginningWithALetter[myMoviesArray[i].title.substring(0, 1).toUpperCase()] = null;
        }

        let movieHeadersOfLetterXArr: string[] = [];
        for(let prop in movieSectionsBeginningWithALetter){
            movieHeadersOfLetterXArr.push(prop)
        }
        
        console.log("letters your found films start with"); 
        console.log(movieHeadersOfLetterXArr);

          
        myMoviesArray.forEach(async (moviePojo: marshalledMoviesObjectShape)=>{

            // console.log(moviePojo.releaseYear);
            // console.log(moviePojo.title);
            // console.log(optionsForMovieDbDiscover(moviePojo.releaseYear));
    
            let moviesDataObject: object = 
                await searchForMovieThroughMovieDbApi(optionsForMovieDbDiscover(moviePojo.releaseYear)); 
                
            console.log(moviesDataObject); 
            
            // should be named findIn*DataSetInstead
            moviePojo.posterImgUrl = `${posterPath}${findMovieObjFromDataSet(moviePojo.title, moviesDataObject)}`;


            for(let prop in movieSectionsBeginningWithALetter){
                if((prop as string) === moviePojo.title.charAt(0)){
                    if(movieSectionsBeginningWithALetter[prop] == null){
                        movieSectionsBeginningWithALetter[prop] = []; 
                        let movieSectionKeyArray = <marshalledMoviesObjectShape[]>movieSectionsBeginningWithALetter[prop]; 
                        movieSectionKeyArray.push(moviePojo);  
                    }else{
                        (movieSectionsBeginningWithALetter[prop] as marshalledMoviesObjectShape[]).push(moviePojo)
                    }
                    break; 
                }
            }
        });
        
        console.log("result of ts correlate film posters utility function"); 
        console.log(movieSectionsBeginningWithALetter)
        fnCallback(movieSectionsBeginningWithALetter); 
    })()
}