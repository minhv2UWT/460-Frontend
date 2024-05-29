

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

