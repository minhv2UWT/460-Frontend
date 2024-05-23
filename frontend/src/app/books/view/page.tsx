"use client"
import { IBook } from "@/app/Models/Book"
import { searchByAuthor, searchByTitle, searchByYear, searchByRating } from "@/app/api/routes"
import BookListItem from "@/components/Book"
import { Search } from "@mui/icons-material"
import { Box, Button, Container, Divider, FormControl, Input, InputAdornment, InputLabel, List, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material"
import { pages } from "next/dist/build/templates/app-page"
import React, { useEffect } from "react"

const searchAuthor  = async (author: string) => searchByAuthor(author).then((res) => res.json());
const searchTitle  = async (title: string) => searchByTitle(title).then((res) => res.json());
const searchYear = async (year: string) => searchByYear(year).then((res) => res.json());
const searchRating = async (rating: string) => searchByRating(rating).then((res) => res.json());

export default function BookView() {

    const [books, setBooks] = React.useState<IBook[]>([])
    const [page, setPage] = React.useState(1);
    const [filter, setFilter] = React.useState("");
    const [searchCriteria, setSearchCriteria] = React.useState("Title");
    const [totalPages, setTotalPages] = React.useState(0);
    const searchOptions = ["Title", "Author", "Publication Year", "Rating"];
    const [pageSize, setPageSize] = React.useState(10);


    const onDelete = (book: IBook) => {
        console.log(book);
    }

    const viewBook = (book: IBook) => {
        console.log(book);
    }

    const Paginator = () => {

        useEffect(() => {
            setTotalPages(Math.ceil(books.length / pageSize))
        }, [page, pageSize])

        return (
            <Box maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, flexWrap: "nowrap"  }}>
                <FormControl sx={{width: "20%", mr: 2}}>
                    <InputLabel>Page Size</InputLabel>
                    <Select
                        label="Page Size"
                        value={pageSize}
                        onChange={(event) => {
                            setPageSize(event.target.value as number)
                            setTotalPages(Math.ceil(books.length / pageSize))
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
        )
    }

    const setFields = (data : IBook[]) => {
        setBooks(data);
        setTotalPages(Math.ceil(data.length / pageSize));
        setPage(1);
    }

    const search = () => {
        switch(searchCriteria) {
            case "Title":
                searchTitle(filter)
                    .then((data) => {
                        if (data.message) {
                            setBooks([]);
                        } else {
                            setFields(data);
                        }
                    });
                break;
            case "Author":
                searchAuthor(filter)
                    .then((data) => {
                        if (data.message) {
                            setBooks([]);
                        } else {
                            setFields(data);
                        }
                    });
                break;
            case "Publication Year":
                searchYear(filter)
                    .then((data) => {
                        if (data.message) {
                            setBooks([]);
                        } else {
                            setFields(data);
                        }
                    });
                break;
            case "Rating":
                searchRating(filter)
                    .then((data) => {
                        if (data.message) {
                            setBooks([]);
                        } else {
                            setFields(data);
                        }
                    });
                break;
        }
        console.log(books);
    }

    return (
        <>
           <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "90vh", overflow: "hidden", width: "lg" }}>
                <Box sx={{ display: "flex", mt: 0, mb: 2, width: "50%", alignItems: "center" }}>
                <FormControl fullWidth sx={{ mt: 5, mb: 2, mr: 2, width: "50%" }}>
                <InputLabel id="demo-simple-select-label" >Search by</InputLabel>
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
                            label={searchCriteria === "Rating" ? "Rating Greater or Equal to " :  "Search by " + searchCriteria}
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
                                endAdornment: 
                                <Button onClick={search}>
                                <InputAdornment position="end">    
                                        <Search/>
                                </InputAdornment>
                                </Button>
                                }
                            }
                        />
                </Box>
                    {/* <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "1.2em" }}>
                        Viewing  {paginatedBooks.length} of {filteredBooks.length}
                    </Typography> */}
               <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", width: "75%" }}>
                   {books.length == 0 && <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "1.2em" }}>No Books Found. Please enter a valid search term to get results.</Typography>}
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
                    {books.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize).map((book, index) => (
                        <React.Fragment key={book.isbn13}>
                            <BookListItem book={book} onDelete={onDelete} viewBook={viewBook} />
                        </React.Fragment>
                    ))}
                        
                    </List>
               </Box>
               {books.length > 0 && <Paginator/>}
           </Container>
        </>
    )
}
