import { IBook } from "@/app/Models/Book";
import { Divider, IconButton, ImageListItem, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export default function BookListItem(
    { book, onDelete, viewBook 

    }: { 
        book: IBook, 
        onDelete: (book: IBook) => void, 
        viewBook: (book: IBook) => void 
    }) {
    return (
        <>
        <ListItem 
            onClick={() => viewBook(book)} 
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
        </ListItem>
        </>
    )
}