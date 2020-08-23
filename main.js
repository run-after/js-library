// Storage for all books
let library = [];

// Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Adds book to library array
function addBookToLibrary(book){
  library.push(book);
}

// Creates a new card, fills in all the data, adds listener to delete card
function addCard(book, index) {
  const div = document.createElement('div');// Creates new div
  div.classList.add('card'); // Adds class card for styling
  div.innerHTML = `<h1>${book.title}</h1> 
                   <h3>${book.author}</h3>
                   <p>${book.pages} pages</p>
                   <p>Status: ${book.read}</p>`;// Adds info to card
  div.setAttribute('data-index', index); // Sets data attribute to find card
  const cards = document.querySelector('.cards');// Selects parent element
  cards.appendChild(div);// Adds card as a child to the end

  const deleteBtn = document.createElement('div'); // Creates a div inside card(close button)
  deleteBtn.classList.add('delete-btn');// Adds class to style button
  deleteBtn.textContent = 'X';// Adds letter 'x'
  div.insertBefore(deleteBtn, div.firstChild);// Adds delete button to top of card
  addDelete(div);// Adds delete listener
}

// Creates listener to delete button on each card.
function addDelete(div){
  const deleteBtn = div.querySelector('.delete-btn');
  deleteBtn.onclick = function () {
    deleteBook(div);
  }
}

function deleteBook(book) {
  // Removes from list
  book.parentElement.removeChild(book);
  // Delete from library
  let index = book.getAttribute('data-index');
  library.splice(index, 1);
}

// Loops through each book in library and creates a card for it.
function render(library) {
  library.forEach(addCard);
}

// MODAL (Pop up for creating new book)

let modal = document.getElementById('modal');
let newBtn = document.getElementById('new-book-btn');
// Pops up form
newBtn.onclick = function () {
  modal.style.display = "block";
}

// Create's new book and then adds it to the library
function createNew() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.forms.addBook.elements.read.value;
  
  if(read === "true") {
    read = 'Read';
  } else {
    read = 'Not yet read';
  }

  let book = new Book(title, author, pages, read);
  addBookToLibrary(book);
}

let addBtn = document.getElementById('add-book-btn');
// Takes info from user and creates new book
addBtn.onclick = function() {
  clear();
  createNew();
  modal.style.display="none";
  render(library);
}

// Deletes all existing cards from DOM so they are not duplicated
function clear() {
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';
}