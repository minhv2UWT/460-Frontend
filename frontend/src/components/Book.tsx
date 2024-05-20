import { IBook } from "@/app/Models/Book";
import { IconButton, ImageListItem, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


export default function BookListItem({ book }: { book: IBook }, onDelete: (isbn13: string) => void) {
    return (
        <ListItem
            secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(book.isbn13)}
            >
              <DeleteIcon/>
            </IconButton> 
            }  
            onClick={() => console.log(book)} 
        >
            <ImageListItem key={book.isbn13}>
            <img srcSet={book.icons.large + ' 2x'}
                src={book.icons.small}
                alt={book.title}/>
            </ImageListItem>
            <ListItemText
                sx={{padding: 2}}
                primary={book.title}
                secondary={book.authors + ' | ' + book.publication + ' | ' + book.ratings.average} 
                secondaryTypographyProps={{ color: 'text.secondary' }}
            >
            </ListItemText>
        </ListItem>
    )
}