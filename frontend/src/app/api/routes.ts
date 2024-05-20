

export async function GET() {
    const res = await fetch("http://localhost:4000/books/all", {
        next: {tags : ["books"]},

        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    
    })
    const data = await res.json()
    return Response.json(data)
}