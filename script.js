let myLibrary = [];

function Book(title, author, pages, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  // take params, create a book then store it in the array
  const newbook = new Book(title, author, pages, isRead);

  myLibrary.push(newbook);
}


addBookToLibrary("The Hobbit", "Tolkien", 295, false);
addBookToLibrary("1984", "George Orwell", 328, true);
console.log(myLibrary);

const bookElement = document.querySelector("#library-container");

function displayBook() {
  bookElement.innerHTML = "";

myLibrary.forEach(book => {
  const card = document.createElement('div');
  card.classList.add('book-card');
  card.dataset.id = book.id;
  
  card.appendChild(deleteBtn);
  bookElement.appendChild(card);
  card.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
  bookElement.appendChild(card);
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', () => {
    removeBook(book.id);
  });

});
}

function removeBook(id) {
  myLibrary = myLibrary.filter(book => book.id != id);
  displayBook();
}

const dialog = document.querySelector("#book-dialog");
const showButton = document.querySelector("#open-dialog");
const closeButton = document.querySelector("dialog #close-dialog");
const addButton = document.querySelector("dialog #add-book");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// addを押したら、ここでaddBookToLibrary();を実行するコードを書けばいいということかな。 //

const bookForm = document.querySelector("#book-form");

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  addBookToLibrary(
  formData.get('title'),
  formData.get('author'),
  Number(formData.get('pages')),
  formData.get('isRead') === 'on'
  );
  displayBook();
  e.target.reset();
  dialog.close();
});

