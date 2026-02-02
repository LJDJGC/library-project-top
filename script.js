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
myLibrary.forEach(book => {
  const card = document.createElement('div');
  card.textContent = book.title;
  bookElement.appendChild(card);
})
}

console.log(displayBook);