import { IRatings } from "./Ratings";
import { IUrlIcon } from "./URLIcon";
export interface IBook {
    isbn13: string;
    authors: string;
    publication: string;
    original_title: string;
    title: string;
    ratings: IRatings;
    icons: IUrlIcon;
}