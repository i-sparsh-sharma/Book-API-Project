// Requirement for our project

// We are a book management company

// -> Books
// ISBN, Title, Pub Date, Language, Num of Pages, author[], category[]
// We need API for :-
// - to get all the books
// - to get the specific book
// - to get a list of book based on category
// - to get a list of books based on languages

// -> Authors
// ID, Name, books[]
// We need API for :-
// - to get all the authors
// - to get a specific author based on ID
// - to get a list of authors based on books

// -> Publications
// ID, Name, books[]
// We need API for :-
// - to get all the publications
// - to get a specific publications
// - to get a list of publications based on books

//We have to design and code an API over this...

/* X--X--PUT--X--X */
// Update book details if author is changed.

/* X--X--Delete--X--X */
// 1. Delete a book
// 2. Delete wuthor from book
// 3. Delete author from book and related book from author

// Schema - Blueprint of how data has to be constructed
// MongoDB is schemaless
// mongoose has schema
// mongoose - validation , relationship with other data.
// Model -> document model of MongoDB
// Schema -> Model -> use them .

/* Rough Work

Insert Book
{
    "ISBN": "1",
    "title": "The Demo Book",
    "pubDate": "2021-08-28",
    "language": "EN",
    "numPage": 100,
    "author": [1, 2],
    "publications": [12, 34],
    "category": ["Chill", "Horror"]
}


http://localhost:3000/lan/en
http://localhost:3000/author/book/secretBook

*/
