// Storage for all books
let library = [];

// Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages...Read yet: ${read}`;
  }
}

// Adds book to library array
function addBookToLibrary(book){
  library.push(book);
}

// Creates a new card, fills in all the data, adds listener to delete
// card.
function addCard(book, index) {
  const div = document.createElement('div');// Creates new div
  div.classList.add('card'); // Adds class card
  div.classList.add(`card-${index}`);// Adds class to help find it (delete this line)
  div.innerHTML = `<h1>${book.title}</h1> 
                   <h3>${book.author}</h3>
                   <p>${book.pages} pages</p>
                   <p>Status: ${book.read}</p>`;// Adds info to card
  div.setAttribute('data-index', index); // Sets data attribute to find card
  const cards = document.querySelector('.cards');// Selects parent element
  cards.appendChild(div);// Adds card as a child to the end
  const closeBtn = document.createElement('div'); // Creates a div inside card(close button)
  closeBtn.classList.add('close-btn');// Adds class to style button
  closeBtn.textContent = 'X';// Adds letter 'x'
  div.insertBefore(closeBtn, div.firstChild);// Adds delete button to top of card
  addDelete(div);// Adds delete listener
}

// Loops through each book in library and creates a card for it.
function render(library) {
  library.forEach(addCard);
}

// MODAL (Pop up for creating new book)

let modal = document.getElementById('modal');

let newBtn = document.getElementById('new-book-btn');

newBtn.onclick = function () {
  modal.style.display = "block";
}
// Deletes all existing cards on site so they are not duplicated
function clear() {
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';
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

// Seeds books into library // 
/*
book = new Book('title', 'author', '300', 'true');
addBookToLibrary(book);
addBookToLibrary(book);
addCard(book, 1);
addCard(book, 2);
*/
// Creates listener to delete button on each card.
function addDelete(div){
  const closeBtn = div.querySelector('.close-btn');
  closeBtn.onclick = function () {
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