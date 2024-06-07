Reading List App
View at https://jackfed.github.io/reading-list/

Originally written with procedural programming, rewritten to practice using Javascript classes.


Refactoring General thoughts:
Class list:
Library (Contains Books)
  add book to Library
  get book
  remove book
  
Book
  -contains book attributes
  -get and setters for hasRead status

View classes
bookDisplay
  -displayBooks
  -makeBookDisplay
  -removeBookDisplay
formDisplay
  -makeBtnDisplayRemove
  -makeDialogDisplay
//
addEventListeners
  -showModal (Show form) on formDialog
  -formSubmit (create new book) on confirmBtn
