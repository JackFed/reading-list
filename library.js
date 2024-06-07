// Model
class Library {
    constructor() {
        this.bookList = [];
    }

    // Features for storing books in array
    addBookToLibrary(book) {
        if (this.bookList.length > 0) {
            book.setIndex(this.bookList.length);
        }
        this.bookList.push(book);
    }

    getBookList() {
        return this.bookList;
    }

    removeBook(index) {
        for (let i=0; i < this.bookList.length; i ++) {
            const book = this.bookList[i]
            if (book.getIndex() === index) {
                this.bookList.splice(i, 1);
            }
        }
    }

}
class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
        this.index = 0;
    }

    getIndex = () => this.index;

    setIndex = (index) => this.index = index;

    getBook = () => {
        return {
            title: this.title,
            author: this.author,
            pages: this.pages,
            hasRead: this.hasRead
        }
    }

    getReadStatus = () => this.hasRead;

    setReadStatus = (readStatus) => this.hasRead = readStatus;

}

// Functions for updating the GUI
function displayBooks() {
    myLibrary.getBookList().forEach(book => {
        makeBookDisplay(book);
    });
}

function makeBookDisplay(book) {
    const bookNode = document.createElement("li");
    // Add the data attribute to relate the html to the library array.
    bookNode.setAttribute("data-index", book.getIndex());

    // Add the Visible book attributes to the tile.
    const keys = Object.keys(book.getBook());
    keys.forEach(prop => { 
        const div = document.createElement("div");
        div.className = prop;
        div.innerHTML = `${prop}: ${book[prop]}`;
        bookNode.appendChild(div);
    });

    const closeBtn = makeButtonDisplay();
    bookNode.appendChild(closeBtn);

    bookList.appendChild(bookNode);
}

function makeButtonDisplay() {
    const closeBtn = document.createElement("button");
    closeBtn.className = "remove";
    closeBtn.innerHTML = "Remove";
    closeBtn.onclick= removeScreenBook;
    return closeBtn
}

// Removing books functions

// Find the parent of the button clicked
// Remove from both html and array using data-index
function removeScreenBook(event) {
    const bookElement = event.target.closest("li")
    bookElement.remove();
    myLibrary.removeBook(Number(bookElement.dataset.index));
}

// Dialog Add popup

const addButton = document.querySelector(".add");
const formDialog = document.querySelector(".form-dialog");
const confirmBtn = document.querySelector(".confirm");
const addBookForm = document.querySelector(".add-book");

addButton.addEventListener("click", () => {
    formDialog.showModal();
})

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    const book = new Book(document.querySelector("#title").value,document.querySelector("#author").value, 
        document.querySelector("#pages").value, document.querySelector("#has-read").value);
    myLibrary.addBookToLibrary(book);
    makeBookDisplay(book);
    formDialog.close();
}); 


const bookList = document.querySelector(".books")

// Sample books to see layout
const book1 = new Book("Zoolander", "Bob Ross", 293, false)
const book2 = new Book("Grapes of Wrath", "John Steinbeck", 487, false)
const book3 = new Book("Crime and Punishment", "Fyodor Dostoevsky", 423, true)
const book4 = new Book("House of the Spirits", "Isabel Allende", 372, true)

const myLibrary = new Library();

myLibrary.addBookToLibrary(book1)
myLibrary.addBookToLibrary(book2)
myLibrary.addBookToLibrary(book3)
myLibrary.addBookToLibrary(book4)

displayBooks();