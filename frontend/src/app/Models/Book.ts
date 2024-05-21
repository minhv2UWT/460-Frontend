import { IRatings } from "./Ratings";
import { IUrlIcon } from "./URLIcon";
export interface IBook {
    isbn13: string;
    authors: string;
    publication_year: string;
    original_title: string;
    title: string;
    image_url: string;
    image_url_small: string;
    rating_avg: number;
    rating_count: number;
    ratings: IRatings;
    rating_1_star: number;
    rating_2_star: number;
    rating_3_star: number;
    rating_4_star: number;
    rating_5_star: number;
}