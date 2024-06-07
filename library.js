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

    initializeSampleBooks() {
        const sampleBooks = [
            { title: "Zoolander", author: "Bob Ross", pages: 293, hasRead: false },
            { title: "Grapes of Wrath", author: "John Steinbeck", pages: 487, hasRead: false },
            { title: "Crime and Punishment", author: "Fyodor Dostoevsky", pages: 423, hasRead: true },
            { title: "House of the Spirits", author: "Isabel Allende", pages: 372, hasRead: true }
        ];

        sampleBooks.forEach(bookData => {
            const book = new Book(bookData);
            this.addBookToLibrary(book);
        });
    }
}
class Book {
    constructor({title, author, pages, hasRead}) {
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
class viewBookList {
    // Expect divName = ".'class name'"
    constructor (divName) {
        this.bookDiv = document.querySelector(divName)
    }

    displayBooks(myLibrary) {
        myLibrary.getBookList().forEach(book => {
            this.addToDisplay(book);
        });
    }
    
    addToDisplay(book) {
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
    
        const closeBtn = this.makeRemoveButtonDisplay();
        bookNode.appendChild(closeBtn);
        this.bookDiv.appendChild(bookNode);
    }
    
    makeRemoveButtonDisplay() {
        const closeBtn = document.createElement("button");
        closeBtn.className = "remove";
        closeBtn.innerHTML = "Remove";
        closeBtn.onclick= removeScreenBook;
        return closeBtn
    }
}


// Removing books functions

// Find the parent of the button clicked
// Remove from both html and array using data-index
function removeScreenBook(event) {
    const bookElement = event.target.closest("li")
    bookElement.remove();
    myLibrary.removeBook(Number(bookElement.dataset.index));
}

// Library Controller class
class LibraryController {
    constructor(myLibrary, bookListView) {
        this.myLibrary = myLibrary;
        this.bookListView = bookListView;
        this.formDialog = document.querySelector(".form-dialog");
        this.addEventListeners();
    }

    addEventListeners() {
        const addButton = document.querySelector(".add");
        addButton.addEventListener("click", this.showForm.bind(this));
        
        const confirmBtn = document.querySelector(".confirm");  
        confirmBtn.addEventListener("click", this.onSubmit.bind(this)); 
    }

    showForm() {
        this.formDialog.showModal();
    }

    onSubmit(event) {
        event.preventDefault(); // We don't want to submit this fake form
        const bookInfo = {
            title: document.querySelector("#title").value,
            author: document.querySelector("#author").value,
            pages: document.querySelector("#pages").value,
            hasRead: document.querySelector("#has-read").value
        }
        const book = new Book(bookInfo);
        this.myLibrary.addBookToLibrary(book);
        this.bookListView.addToDisplay(book);
        
        this.formDialog.close();
    }


}


// Sample books to see layout
const myLibrary = new Library();
const bookListView = new viewBookList(".books")
const libraryController = new LibraryController(myLibrary, bookListView);

myLibrary.initializeSampleBooks();
bookListView.displayBooks(myLibrary);
