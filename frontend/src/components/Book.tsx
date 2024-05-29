import { IBook } from "@/app/Models/Book";
import { Divider, IconButton, ImageListItem, ListItem, ListItemText, Rating, Typography, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export default function BookListItem(
    { book, onDelete, viewBook 

    }: { 
        book: IBook, 
        onDelete: (book: IBook) => void, 
        viewBook: (isbn13: string) => void 
    }) {
    const theme = useTheme();
    return (
        <>
        <ListItem 
            onClick={() => viewBook(book.isbn13)} 
            sx={{border: '1px solid #ddd', cursor: 'pointer', mt: 1}}
        >
            <ImageListItem key={book.isbn13}>
            <img srcSet={book.image_url + ' 2x'}
                src={book.image_url_small}
                alt={book.title}/>
            </ImageListItem>
            <ListItemText
                sx={{padding: 2}}
                primary={book.title}
                secondary={book.authors + ' | ' + book.publication_year + ' | ' + book.rating_avg} 
                secondaryTypographyProps={{ color: 'text.secondary' }}
            >
            </ListItemText>
            <Typography color="text.secondary" > Average Rating </Typography>
            <Typography color="text.secondary" sx={{padding: 2}} fontSize={24} fontWeight={100}> | </Typography>
            <Rating value={book.rating_avg} readOnly precision={0.25} 
                sx={{
                    "& .MuiRating-iconFilled": {
                    color: "#1976d2"
                    }
                }}
            >
            </Rating>
        </ListItem>
        </>
    )
}