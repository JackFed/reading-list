
const myLibrary = []

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function() {
        readStatus = readBook(hasRead)
        return(`${this.title} is written by, ${this.author} and is ${this.pages} long. You have ${readStatus}.`);
    };
    this.prettyPrint = function() {
        readStatus = readBook(hasRead)
        return (`Title: ${this.title}\nAuthor: ${this.author}\nPage count: ${this.pages} pages\nRead Status: You have ${readStatus}.`);
    }
}


function addBookToLibrary(book) {
    myLibrary.push(book)
}

function displayBooks() {
    const list = document.querySelector(".books")
    myLibrary.forEach(book => {
        const bookNode = makeBookDisplay(book);
        list.appendChild(bookNode);
    });
}

function makeBookDisplay(book) {
    const bookNode = document.createElement("li");
    const keys = Object.keys(book).slice(0,4);
    keys.forEach(prop => { 
        const div = document.createElement("div");
        div.className = prop;
        div.innerHTML = `${prop}: ${book[prop]}`;
        bookNode.appendChild(div);
    });
    return bookNode;
}

function createDiv(text) {
    const element = document.createElement("div");
    element.className = text;

}


function readBook(hasRead) {
    readStatus = "not read it yet";
    if (hasRead) {
        readStatus = "read it";
    }
    return readStatus;
}


let book1 = new Book("Zoolander", "Bob Ross", 293, false)
let book2 = new Book("Mr. Brightside", "Barrack Obama", 387, true)

addBookToLibrary(book1)
addBookToLibrary(book2)

displayBooks();