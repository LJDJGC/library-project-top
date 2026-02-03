const myLibrary = [];

function Book(title, author, pages, isRead) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.id = crypto.randomUUID();
}

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
  card.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
  bookElement.appendChild(card);
})
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


FormData.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const isRead = formData.get('isRead') === 'on';

  addBookToLibrary(title, author)
})
