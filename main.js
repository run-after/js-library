let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages...Read yet: ${read}`;
  }
}

function addBookToLibrary(book){
  library.push(book);
}

function addCard(book, index) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add(`card-${index}`);/////////////////////////
  div.innerHTML = `<div class="close-btn">X</div>
                   <h1>${book.title}</h1>
                   <h3>${book.author}</h3>
                   <p>${book.pages} pages</p>
                   <p>Status: ${book.read}</p>`;
  div.setAttribute('data-index', index);
  const cards = document.querySelector('.cards');
  cards.appendChild(div);
}

function render(library) {
  library.forEach(addCard);
}
// MODAL

let modal = document.getElementById('modal');

let newBtn = document.getElementById('new-book-btn');

newBtn.onclick = function () {
  modal.style.display = "block";
}

function clear() {
  const cards = document.querySelector('.cards');
  cards.innerHTML = '';
}

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

addBtn.onclick = function() {
  clear();
  createNew();
  modal.style.display="none";
  render(library);
}

/////////////////////////////////////////////
let closeBtn = document.getElementsByClassName('close-btn');

closeBtn.onclick = function () {
  alert('dog');
}

/*
function removeBookFromLibrary(book) {
  let card = document.querySelector(`[data-index=${}`)
}



CLOSE BUTTON NOT DOING SHIT!


*/
