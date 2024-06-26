

export async function getAllBooks() {
    const res = await fetch("http://localhost:4000/books", {
        next: {tags : ["books"]},

        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}

export async function DeleteISBNs(Isbn: string[]){
    const isbnObject = {isbns: Isbn}
    const res = await fetch("http://localhost:4000/books/isbn", {
        next: {tags : ["books"]},

        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(isbnObject)
    })
    const data = await res.json()
    return Response.json(data)
}



export async function searchByTitle(title: string) {
    const res = await fetch("http://localhost:4000/books/title?title=" + title, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}
export async function searchByAuthor(author: string) {
    const res = await fetch("http://localhost:4000/books/author?author=" + author, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}
export async function searchByYear(year: string) {
    const res = await fetch("http://localhost:4000/books/publication_year?publication_year=" + year, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}
export async function searchByRating(rating: string) {
    const res = await fetch("http://localhost:4000/books/rating?rating=" + rating, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}
export async function searchBookByISBN(isbn:string) {
    const res = await fetch("http://localhost:4000/books/isbn?isbn=" + isbn, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data;
}

export async function addBook(theBook: object) {
    console.log(theBook)
    const res = await fetch("http://localhost:4000/books/add_new_book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(theBook)
    
    })
    const data = await res.json()
    return Response.json(data)
}