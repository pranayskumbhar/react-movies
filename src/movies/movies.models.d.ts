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
}

export interface landingPageDTO{
    inTheaters? : movieDTO[];
    upcommingMovies? : movieDTO[];
}