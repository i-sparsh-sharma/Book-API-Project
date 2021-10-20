require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
// Database
const database = require("./database/database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(() => console.log("Connection Established"));

/*
Route            /
Description     Get all the books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/",async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route            /is
Description     Get specific book on ISBN
Access          PUBLIC
Parameter       ISBN
Methods         GET
*/
booky.get("/is/:isbn",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    //null !0 = 1 , !1=0
    if(!getSpecificBook) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});


/*
Route           /c
Description     Get specific book on category
Access          PUBLIC
Parameter       category
Methods         GET
*/

booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
    //null !0 = 1 , !1=0
    if(!getSpecificBook) {
        return res.json({error: `No book found for the category of ${req.params.category}`});
    }
  
    return res.json({book: getSpecificBook});
});


/*
Route           /author
Description     Get all the authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/author", async (req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

/*
Route           /author/book
Description     Get all the authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        });
    }
    return res.json({authors: getSpecificAuthor});
});

/*
Route           /pub
Description     Get all the publications
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/pub",async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
  })

// Assignments Starts From Here

/*
Route           /lan
Description     Get all the books based on languages
Access          PUBLIC
Parameter       en
Methods         GET
*/
booky.get("/lan/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    )

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for language ${req.params.language}`})
    }

    return res.json({book: getSpecificBook});
});

/*
Route           /pub
Description     Get list of publications based on books
Access          PUBLIC
Parameter       name
Methods         GET
*/

booky.get("/pub/book/:books", (req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.books)
    );

    if(getSpecificPublication.length === 0){
        return res.json({
            error: `No publication found for the book of ${req.params.books}`
        });
    }
    return res.json({publications: getSpecificPublication});
});

/*
Route           /author/id
Description     Get specific author based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/

booky.get("/author/id/:id",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(req.params.id)
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found with the id of ${req.params.id}`
        });
    }
    return res.json({author: getSpecificAuthor});
});

/*
Route           /pub/id
Description     Get specific author based on id
Access          PUBLIC
Parameter       id
Methods         GET
*/

booky.get("/pub/id/:id",(req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.id === parseInt(req.params.id)
    );

    if(getSpecificPublication.length === 0) {
        return res.json({
            error: `No publication found with the id of ${req.params.id}`
        });
    }
    return res.json({publication: getSpecificPublication});
});

// 6 Aug 2021 -> Postman | POST

/*
Route           /book/new
Description     Add new Books
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/book/new",async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!"
    });
});

/*
Route           /author/new
Description     Add new authors
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/author/new",async (req,res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
      return res.json(
        {
          author: addNewAuthor,
          message: "Author was added!!!"
        }
    );
});

/*
Route           /pub/new
Description     Add new publications
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/pub/new",(req,res) => {
    const newPub = req.body;
    database.publication.push(newPub);
    return res.json(database.publication);
});

/*
Route           /pub/update/book
Description     Update / add new publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/pub/update/book/:isbn", (req,res) => {
    // Update the publication database
    database.publication.forEach((pub) =>{
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });
    //Update the book database
    database.books.forEach((book) => {
        if(book.isbn === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json({
        books: database.books,
        publications: database.publication,
        message: "Successfully updated publications"
    });
});

/* ----Delete---- */
/*
Route           /book/delete
Description     Delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/

booky.delete("/book/delete/:isbn", (req,res) => {
    //Whichever book that doesn't match with isbn, just send it to an updatedBoookDatabase arary
    // and rest will be filtered out
    const updateBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updateBookDatabase;
    return res.json({books: database.books});
});

/*
Route            /book/delete/author
Description      Delete an author from a book and vice versa
Access           PUBLIC
Parameter        isbn, authorId
Methods          DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    //Update the book database
     database.books.forEach((book)=>{
       if(book.ISBN === req.params.isbn) {
         const newAuthorList = book.author.filter(
           (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
         );
         book.author = newAuthorList;
         return;
       }
    });
  
  
    //Update the author database
    database.author.forEach((eachAuthor) => {
      if(eachAuthor.id === parseInt(req.params.authorId)) {
        const newBookList = eachAuthor.books.filter(
          (book) => book !== req.params.isbn
        );
        eachAuthor.books = newBookList;
        return;
      }
    });
  
    return res.json({
      book: database.books,
      author: database.author,
      message: "Author was deleted!!!!"
    });
});  

/****************PUT***************/
// 12th Aug 2021 -> MongoDB

/*
Route            /book/update
Description      U
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("book/update/:isbn",async (req,res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBook
    });
});

/****************Updating New Author***************/
/*
Route            /pub/update/book
Description      Update/add new publications
Access           PUBLIC
Parameter        isbn
Methods          PUT
*/

booky.put("/book/author/update/:isbn", async(req,res) => {
    // Update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );

    // Update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    return res.json(
        {
            books: updatedBook,
            auhtors: updatedAuthor,
            message: ""

        }
    )
});



booky.listen(3000, () => {
    console.log("Server is up and running");
});