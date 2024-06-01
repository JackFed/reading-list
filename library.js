
const myLibrary = []
const bookList = document.querySelector(".books")

// Book constructor
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

// Features for storing books in array
function addBookToLibrary(book) {
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
    const keys = Object.keys(book).slice(0,4);
    keys.forEach(prop => { 
        const div = document.createElement("div");
        div.className = prop;
        div.innerHTML = `${prop}: ${book[prop]}`;
        bookNode.appendChild(div);
    });
    bookList.appendChild(bookNode);
}

// Dialog Add popup

const addButton = document.querySelector(".add");
const formDialog = document.querySelector(".form-dialog");
const outputBox = document.querySelector("output")
const confirmBtn = document.querySelector(".confirm")
const addBookForm = document.querySelector(".add-book")

addButton.addEventListener("click", () => {
    formDialog.showModal();
})

formDialog.addEventListener("close", (e) => {
    outputBox.value =
      formDialog.returnValue === "default"
        ? "No return value."
        : `ReturnValue: ${formDialog.returnValue}.`; // Have to check for "default" rather than empty string
});




confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // We don't want to submit this fake form

    const book = new Book(document.querySelector("#title").value,document.querySelector("#author").value, 
        document.querySelector("#pages").value, document.querySelector("#has-read").value);
    addBookToLibrary(book);
    makeBookDisplay(book);
}); 



let book1 = new Book("Zoolander", "Bob Ross", 293, false)
let book2 = new Book("Grapes of Wrath", "John Steinbeck", 487, true)

addBookToLibrary(book1)
addBookToLibrary(book2)

displayBooks();