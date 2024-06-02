
const myLibrary = []
const bookList = document.querySelector(".books")

// Book constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.index = 0;
    this.info = function() {
        readStatus = readBook(hasRead)
        return(`${this.title} is written by, ${this.author} and is ${this.pages} long. You have ${readStatus}.`);
    };
    this.prettyPrint = function() {
        readStatus = readBook(hasRead)
        return (`Title: ${this.title}\nAuthor: ${this.author}\nPage count: ${this.pages} pages\nRead Status: You have ${readStatus}.`);
    }
}

// Features for storing books in array
function addBookToLibrary(book) {
    if (myLibrary.length > 0) {
        book.index = myLibrary.length;
    }
    myLibrary.push(book);
}

function readBook(hasRead) {
    readStatus = "not read it yet";
    if (hasRead) {
        readStatus = "read it";
    }
    return readStatus;
}


// Functions for updating the GUI
function displayBooks() {
    myLibrary.forEach(book => {
        makeBookDisplay(book);
    });
}

function makeBookDisplay(book) {
    const bookNode = document.createElement("li");
    // Add the data attribute to relate the html to the library array.
    bookNode.setAttribute("data-index", book.index);

    // Add the Visible book attributes to the tile.
    const keys = Object.keys(book).slice(0,4);
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
    closeBtn.onclick= removeBook;
    return closeBtn
}

// Removing books functions

// Find the parent of the button clicked
// Remove from both html and array using data-index
function removeBook(event) {
    const bookElement = event.target.closest("li")
    bookElement.remove();
    removeByIndex(Number(bookElement.dataset.index));
}

function removeByIndex(index) {
    for (let i=0; i < myLibrary.length; i ++) {
        if (myLibrary[i].index === index) {
            myLibrary.splice(i, 1);
            return 1;
        }
    }
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
    addBookToLibrary(book);
    makeBookDisplay(book);
    formDialog.close();
}); 


// Sample books to see layout
const book1 = new Book("Zoolander", "Bob Ross", 293, false)
const book2 = new Book("Grapes of Wrath", "John Steinbeck", 487, false)
const book3 = new Book("Crime and Punishment", "Fyodor Dostoevsky", 423, true)
const book4 = new Book("House of the Spirits", "Isabel Allende", 372, true)

addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)
addBookToLibrary(book4)

displayBooks();