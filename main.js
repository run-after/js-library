// Storage for all books
if(localStorage.length > 0) {
  library = JSON.parse(localStorage['library']);
} else {
  library = [];
}
render(library);

// Constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.addBookToLibrary = function() {
  library.push(this);
  if(library.length === 0) {
    hideImage();
  }
}

// Creates a new card, fills in all the data, adds listener to delete card
function addCard(book, index) {
  const div = document.createElement('div');// Creates new div
  div.classList.add('card'); // Adds class card for styling

  addElements(div, book);
               
  div.setAttribute('data-index', index); // Sets data attribute to find card
  const cards = document.querySelector('.cards');// Selects parent element
  cards.appendChild(div);// Adds card as a child to the end

  addDeleteBtn(div);
  addReadBtn(div);
  if(library.length != 0) {
    hideImage();
  }
}
// Helper for addCard()
function addElements(div, book) {
  const title = document.createElement('h1');
  title.textContent = `${book.title}`;
  div.appendChild(title);
  const author = document.createElement('h3');
  author.textContent = `${book.author}`;
  div.appendChild(author);
  const pages = document.createElement('p');
  pages.textContent = `${book.pages} pages`;
  div.appendChild(pages);
  const read = document.createElement('p');
  read.textContent = `Status: ${book.read}`;
  read.classList.add('status');
  div.appendChild(read);
}

// Helper for addCard()
function addDeleteBtn(card) {
  const deleteBtn = document.createElement('div'); // Creates a div inside card(close button)
  deleteBtn.classList.add('delete-btn');// Adds class to style button
  deleteBtn.textContent = 'X';// Adds letter 'x'
  card.insertBefore(deleteBtn, card.firstChild);// Adds delete button to top of card
  deleteListener(card);// Adds delete listener
}

// Helper for addCard()
function addReadBtn(card) {
    const readBtn = document.createElement('button');// Creates a button inside card to toggle whether it is read or not
  readBtn.classList.add('read-btn');// Adds class to style button
  readBtn.textContent = 'Read/Unread';
  card.appendChild(readBtn);
  readListener(card);
}

// Creates listener to delete button on each card.
function deleteListener(div){
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
  localStorage.setItem('library', JSON.stringify(library));////////////
  if(library.length === 0) {
    showImage();
  }
}

// Creates listener to change read status on each card
function readListener(div) {
  const readBtn = div.querySelector('.read-btn');
  readBtn.onclick = function () {
    changeReadStatus(div);
  }
}

function changeReadStatus(book) {
  let status = book.querySelector('.status');
  let index = book.getAttribute('data-index');
  if(status.innerHTML !=  'Status: Read') {
    status.innerHTML = 'Status: Read';
    library[index].read = 'Read'
  } else {
    status.innerHTML = 'Status: Not yet read';
    library[index].read = 'Not yet read'
  }
  store(library);
}

// Loops through each book in library and creates a card for it.
function render(library) {
  library.forEach(addCard);
  store(library);
  if(library.length === 0) {
    showImage();
  } else {
    hideImage();
  }
}

function store(library) {
  localStorage.clear();
  localStorage.setItem('library', JSON.stringify(library));
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
  book.addBookToLibrary();
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

function showImage() {
  const addBtnImg = document.getElementById('add-book-img');
    addBtnImg.style.display = 'block';
  }

function hideImage() {
  const addBtnImg = document.getElementById('add-book-img');
  addBtnImg.style.display = 'none'; 
}

