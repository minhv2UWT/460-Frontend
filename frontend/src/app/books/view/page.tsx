"use client"
import { IBook } from "@/app/Models/Book"
import BookListItem from "@/components/Book"
import { Box, Container, Divider, List, Pagination, TextField, Typography } from "@mui/material"
import React from "react"

export default function BookView() {

    const [books, setBooks] = React.useState<IBook[]>([])
    const [page, setPage] = React.useState(1);
    const [filter, setFilter] = React.useState("");
    const pageLimit = 100;

    const startIndex = (page - 1) * pageLimit + 1;
    const endIndex = Math.min(page * pageLimit, books.length);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(filter.toLowerCase()) || 
        book.authors.toLowerCase().includes(filter.toLowerCase())
    );

    const paginatedBooks = filteredBooks.filter((book, index) => index >= startIndex - 1 && index < endIndex)

    React.useEffect(() => {
        fetch("http://localhost:4000/books/all")
          .then((res) => res.json())
          .then((data) => {console.log(data); setBooks(data)});
    }, []);

    return (
        <>
           <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "90vh", overflow: "hidden" }}>
                <TextField
                        label="Filter books"
                        variant="outlined"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        sx={{ mt: 5, mb: 2, width: "50%" }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "1.2em" }}>
                        Viewing  {paginatedBooks.length} of {filteredBooks.length}
                    </Typography>
               <Box sx={{ mt: 8, flex: 1, margin: 4, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto" }}>
                   <List
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        pt: 0,
                        pb: 0
                      }}
                    >
                        <React.Fragment>
                            {paginatedBooks.map((book, index) => (
                                <React.Fragment key={book.isbn13}>
                                    <BookListItem book={book} />
                                    {index < paginatedBooks.length - 1 && (<Divider component="li"/>)}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                        
                    </List>
               </Box>
               <Pagination count={100} color="primary" page={page} onChange={(event, value) => setPage(value)} sx={{ position: "fixed", bottom: "4px", zIndex: 1 }} />
           </Container>
        </>
    )
}
