const books = [
  {
    ISBN: "123",
    title: "Tesla!!",
    pubDate: "05-08-2021",
    language: "hi",
    numPage: 250,
    author: [1,2],
    publications: [1],
    category: ["tech","space"]
  },
  {
    ISBN: "456",
    title: "2States",
    pubDate: "08-10-2009",
    language: "en",
    numPage: 321,
    author: [3],
    publications: [2],
    category: ["fiction","romance"]
  }
]
  
const author = [
  {
    id: 1,
    name: "Sparsh",
    books: ["123", "secretBook"]
  },
  {
    id: 2,
    name: "Elon Musk",
    books: ["123"]
  },
  {
    id: 3,
    name: "Chetan Bhagat",
    books: ["456"]
  }
]
  
const publication = [
  {
    id: 1,
    name: "diamond",
    books: ["123"]
  },
  {
    id: 2,
    name: "gold",
    books: ["456"]
  },
  {
    id: 3,
    name: "silver",
    books: []
  }
]
  
module.exports = {books , author , publication};
  