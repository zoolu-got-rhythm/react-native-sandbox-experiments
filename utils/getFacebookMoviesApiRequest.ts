
// const theMovieDBDotOrgApiToken: string = "f4a9d7aa5091278c42ab52c743613aa8";

// const https = require('https'); 

// interface httpOptionsObject{
//     hostname: string; 
//     port: number; 
//     path: string; 
//     method: string; 
// }

// const optionsForFacebookMovies = {
//     hostname: 'facebook.github.io',
//     port: 443,
//     path: '/react-native/movies.json',
//     method: 'GET'
// }

// // get my facebook profile movies
// function getMyMoviesHTTPRequest(callbackFn: (jsonObj: object) => void, options: httpOptionsObject){
//     const req = https.request(options, (res: any) => {
//         // console.log(`statusCode: ${res.statusCode}`)

//         let data = "";

//         res.on('data', (d: string) => {
//             data += d;
//             // console.log(typeof data);
//             // process.stdout.write(d)
//         })

//         res.on('end', () => {
//             callbackFn(JSON.parse(data).movies);
//             // // console.log();
//         })
//     })

//     req.on('error', (error: any) => {
//         console.error(error)
//     })

//     req.end()
// }


// let optionsForMovieDbDiscover = (year: number) => {
//     return {
//         hostname: 'api.themoviedb.org',
//         port: 443,
//         path: movieSearchByYearApiPath(year),
//         method: 'GET'
//     }
// }


// function searchForMovieThroughMovieDbApi(options: httpOptionsObject, callbackFn: (jsonObj: object) => void): void{
//     const req = https.request(options, (res: any) => {
//         // console.log(`statusCode: ${res.statusCode}`)

//         let data = "";

//         res.on('data', (d: string) => {
//             data += d;
//             // console.log(typeof data);
//             // process.stdout.write(d)
//         })

//         res.on('end', () => {
//             callbackFn(JSON.parse(data));
//             // // console.log();
//         })
//     })

//     req.on('error', (error: any) => {
//         console.error(error)
//     })

//     req.end()
// }



// const posterPath: string = "https://image.tmdb.org/t/p/original";


// let movieSearchByYearApiPath = (year: number): string => {
//     let movieDbDiscoverApiPath: string = `/3/discover/movie?api_key=${theMovieDBDotOrgApiToken}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&year=${year}`;
//     return movieDbDiscoverApiPath;
// };


// type marshalledMoviesArray = null | marshalledMoviesObjectShape[] | undefined[]; 

// export interface MovieDataSectionsByLetter{
//     [ key: string ]: marshalledMoviesArray; 
// }



// let movieSectionsBeginningWithALetter: MovieDataSectionsByLetter = {};


// export interface marshalledMoviesObjectShape{
//     title: string; 
//     posterImgUrl?: string; 
//     releaseYear: number; 
//     id: number; 
// }

// let myMoviesArray: marshalledMoviesObjectShape[];

// getMyMoviesHTTPRequest(function(movieArray){
//     // console.log(movieArray);
//     myMoviesArray = <marshalledMoviesObjectShape[]>movieArray;
// }, optionsForFacebookMovies);


// // find img url link for poster



// let findMovieObjFromDataSet = (filmTitle: string, moviesdataSetObject: any): string => {
//     for(let i = 0; i < moviesdataSetObject.results.length; i++){
//         if(moviesdataSetObject.results[i].title.toUpperCase().includes(filmTitle.toUpperCase()))
//             return moviesdataSetObject.results[i].poster_path;
//     }
//     return "not found";
// }



// // timeout to get over async problem
// setTimeout(
//     function(){
//         for(let i = 0; i < myMoviesArray.length; i++){
//             movieSectionsBeginningWithALetter[myMoviesArray[i].title.substring(0, 1).toUpperCase()] = null;
//         }

//         let movieHeadersOfLetterXArr: string[] = [];
//         for(let prop in movieSectionsBeginningWithALetter){
//             movieHeadersOfLetterXArr.push(prop)
//         }
        
//         console.log("letters your found films start with"); 
//         console.log(movieHeadersOfLetterXArr);


//         myMoviesArray.forEach((moviePojo: marshalledMoviesObjectShape)=>{

//             // console.log(moviePojo.releaseYear);
//             // console.log(moviePojo.title);
//             // console.log(optionsForMovieDbDiscover(moviePojo.releaseYear));

//             searchForMovieThroughMovieDbApi(optionsForMovieDbDiscover(moviePojo.releaseYear), (moviesDataObject) => {
//                 moviePojo.posterImgUrl = `${posterPath}${findMovieObjFromDataSet(moviePojo.title, moviesDataObject)}`;
//                 for(let prop in movieSectionsBeginningWithALetter){
//                     if((prop as string) === moviePojo.title.charAt(0)){
//                         if(movieSectionsBeginningWithALetter[prop] == null){
//                             movieSectionsBeginningWithALetter[prop] = []; 
//                             let movieSectionKeyArray = <marshalledMoviesObjectShape[]>movieSectionsBeginningWithALetter[prop]; 
//                             movieSectionKeyArray.push(moviePojo);  
//                         }else{
//                             (movieSectionsBeginningWithALetter[prop] as marshalledMoviesObjectShape[]).push(moviePojo)
//                         }
//                         break; 
//                     }
//                 }
//             })
//         });
//     }, 200);


// export default (fnCallback: (movies: MovieDataSectionsByLetter) => void) => {
//     setTimeout(()=>{
//         // console.log(myMoviesArray);
//         fnCallback(movieSectionsBeginningWithALetter); 
//     }, 600);
// }



