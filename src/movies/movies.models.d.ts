import { movieTheaterDTO } from "../movietheaters/movieTheater.model";

export interface movieDTO{
    id: number;
    title:string;
    poster:string;
}

export interface movieCreationDTO {
    title: string;
    inThearters: boolean;
    trailer : string;
    releaseDate? : Date;
    poster? : File;
    posterUrl? : string;
    genresIds? : number[];
    movieTheaterIds? : number[];
}

export interface landingPageDTO{
    inTheaters? : movieDTO[];
    upcommingMovies? : movieDTO[];
}