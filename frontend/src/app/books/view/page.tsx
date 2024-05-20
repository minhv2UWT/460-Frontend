"use client"
import { IBook } from "@/app/Models/Book"
import BookListItem from "@/components/Book"
import { Box, Container, List } from "@mui/material"
import React from "react"



export default function BookView() {

    const [books, setBooks] = React.useState<IBook[]>([])

    React.useEffect(() => {
        fetch("http://localhost:4000/books/all")
          .then((res) => res.json())
          .then((data) => {console.log(data); setBooks(data.books)});
      }, []);

    return (
           <Container maxWidth="md">
               <Box sx={{ mt: 1 }}>
                   <List
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                        {books.map((book) => (
                            <BookListItem key={book.isbn13} book={book} />
                        ))}
                    </List>
               </Box>
           </Container>
    )
}