
//const fetchAllBooks = async () => getAllBooks().then((res) => res.json());

"use client";
import { IBook } from "@/app/Models/Book";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton} from "@mui/material";
import { searchByAuthor, searchByTitle, searchByYear, searchByRating, searchBookByISBN, getAllBooks, DeleteISBNs  } from "@/app/api/routes";
import BookListItem from "@/components/Bookdelete";
import { Search } from "@mui/icons-material";
import { Box, Button, Container, FormControl, InputAdornment, InputLabel, List, MenuItem, Pagination, Select, TextField, Typography, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { Star, StarBorder } from "@mui/icons-material";

const searchAuthor = async (author: string) => searchByAuthor(author).then((res) => res.json());
const searchTitle = async (title: string) => searchByTitle(title).then((res) => res.json());
const searchYear = async (year: string) => searchByYear(year).then((res) => res.json());
const searchRating = async (rating: string) => searchByRating(rating).then((res) => res.json());
const  getallbooks = async () => getAllBooks().then((res)=>res.json());

export default function BookView() {
    const [books, setBooks] = React.useState<IBook[]>([]);
    const [page, setPage] = React.useState(1);
    const [filter, setFilter] = React.useState("");
    const [searchCriteria, setSearchCriteria] = React.useState("Title");
    const [totalPages, setTotalPages] = React.useState(0);
    const [selectedBook, setSelectedBook] = React.useState<IBook | null>(null);
    const searchOptions = ["Title", "Author", "Publication Year", "Rating"];
    const [pageSize, setPageSize] = React.useState(10);
    const [selectedISBNs, setSelectedISBNs] = React.useState<string[]>([]);

    const toggleSelect = (isbn13: string) => {
        setSelectedISBNs(prev => 
            prev.includes(isbn13) ? prev.filter(isbn => isbn !== isbn13) : [...prev, isbn13]
        );
    };

    const onDelete = async (Isbns: string[]) => {
        await DeleteISBNs(Isbns);
        setBooks(books.filter(book => !Isbns.includes(book.isbn13)));
        setSelectedISBNs([]);
    };

    const viewBook = async (isbn13: string) => {
        const book = await searchBookByISBN(isbn13);
        setSelectedBook(book);
    };

    const closeModal = () => {
        setSelectedBook(null);
    };

    const Paginator = () => {
        useEffect(() => {
            setTotalPages(Math.ceil(books.length / pageSize));
        }, [page, pageSize]);

        return (
            
            <Box maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, flexWrap: "nowrap" }}>
                <FormControl sx={{ width: "20%", mr: 2 }}>
                    <InputLabel>Page Size</InputLabel>
                    <Select
                        label="Page Size"
                        value={pageSize}
                        onChange={(event) => {
                            setPageSize(event.target.value as number);
                            setTotalPages(Math.ceil(books.length / pageSize));
                        }}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
               
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    sx={{ ml: 2, flex: 1, flexShrink: 0, width: "100%" }}
                />
            </Box>
        );
    };

    const setFields = (data: IBook[]) => {
        setBooks(data);
        setTotalPages(Math.ceil(data.length / pageSize));
        setPage(1);
    };

    const search = () => {
        switch (searchCriteria) {
            case "Title":
                searchTitle(filter).then((data) => {
                    if (data.message) {
                        setBooks([]);
                    } else {
                        setFields(data);
                    }
                });
                break;
            case "Author":
                searchAuthor(filter).then((data) => {
                    if (data.message) {
                        setBooks([]);
                    } else {
                        setFields(data);
                    }
                });
                break;
            case "Publication Year":
                searchYear(filter).then((data) => {
                    if (data.message) {
                        setBooks([]);
                    } else {
                        setFields(data);
                    }
                });
                break;
            case "Rating":
                searchRating(filter).then((data) => {
                    if (data.message) {
                        setBooks([]);
                    } else {
                        setFields(data);
                    }
                });
                break;
        }
        console.log(books);
    };

    return (
        <>
             <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "90vh", overflow: "hidden", width: "lg" }}>
                <Box sx={{ display: "flex", mt: 0, mb: 2, width: "50%", alignItems: "center" }}>
                    <FormControl fullWidth sx={{ mt: 5, mb: 2, mr: 2, width: "50%" }}>
                        <InputLabel id="demo-simple-select-label">Search by</InputLabel>
                        <Select
                            label="Search by"
                            value={searchCriteria}
                            onChange={(e) => setSearchCriteria(e.target.value as string)}
                        >
                            {searchOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label={searchCriteria === "Rating" ? "Rating Greater or Equal to " : "Search by " + searchCriteria}
                        variant="outlined"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                search();
                            }
                        }}
                        sx={{ mt: 5, mb: 2, width: "75%" }}
                        InputProps={{
                            endAdornment: (
                                <Button onClick={search}>
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                </Button>
                            ),
                        }}
                    />
                </Box>
                {selectedISBNs.length > 0 && (
                  
                  <IconButton 
                  edge="start" 
                  aria-label="delete selected" 
                  onClick={() => onDelete(selectedISBNs)} 
                  sx={{ mt: -5, ml : 95}}
                  >
                  <DeleteIcon />
                  </IconButton>
              
            )}
                <Box sx={{ position: 'relative', flex: 1, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", width: "75%" }}>
                    {books.length == 0 && <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.2em" }}>No Books Found. Please enter a valid search term to get results.</Typography>}
              
                    <List
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            pt: 0,
                            pb: 0,
                        }}
                    >
                        {books.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((book) => (
                            <React.Fragment key={book.isbn13}>
                                <BookListItem book={book} onDelete={onDelete} viewBook={viewBook} selected={selectedISBNs.includes(book.isbn13)} 
                                    toggleSelect={toggleSelect} />
                            </React.Fragment>
                        ))}
                    </List>
                  
                    {books.length > 0 && <Paginator />}
                </Box>

            </Container>
           

            <Modal open={selectedBook !== null} onClose={closeModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: '80vh', overflowY: 'auto', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                    {selectedBook && (
                        <div>
                            <Typography variant="h6" component="h2">{selectedBook.title}</Typography>
                            <Typography sx={{ mt: 2 }}>Author: {selectedBook.authors}</Typography>
                            <Typography sx={{ mt: 2 }}>Publication Year: {selectedBook.publication_year}</Typography>
                            <Typography sx={{ mt: 2 }}>Average Rating: {selectedBook.rating_avg} ({selectedBook.rating_count})</Typography>
                            <Typography sx={{ mt: 2 }}>ISBN: {selectedBook.isbn13}</Typography>

                            <Box sx={{ mt: 2 }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Box key={star} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        {Array.from({ length: star }, (_, index) => (
                                            <Star key={index} color="primary" />
                                        ))}
                                        {Array.from({ length: 5 - star }, (_, index) => (
                                            <StarBorder key={index} color="primary" />
                                        ))}
                                        <Typography sx={{ ml: 1 }}>
                                            {selectedBook[`rating_${star}_star`]}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <img src={selectedBook.image_url} alt={selectedBook.title} style={{ width: '100%', marginTop: '16px' }} />
                        </div>
                    )}
                </Box>
            </Modal>
        </>
    );
}
