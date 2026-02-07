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

const bookElement = document.querySelector("#library-container");

function displayBook() {
  bookElement.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;
    
    const info = document.createElement('p');
    info.textContent = `${book.author}, ${book.pages} pages. Status: ${book.isRead ? "Read" : "Not Read"}`;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      removeBook(book.id);
    };

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "Toggle Read Status";
    toggleBtn.onclick = () => {
      book.toggleRead();
      displayBook();
    };

    card.appendChild(info);
    card.appendChild(toggleBtn);
    card.appendChild(deleteBtn);
    bookElement.appendChild(card);
});
}

function removeBook(id) {
  myLibrary = myLibrary.filter(book => book.id != id);
  displayBook();
}

const dialog = document.querySelector("#book-dialog");
const showButton = document.querySelector("#open-dialog");
const closeButton = document.querySelector("#close-dialog");
const bookForm = document.querySelector("#book-form");


showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

// addを押したら、ここでaddBookToLibrary();を実行するコードを書けばいいということかな。 //


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

addBookToLibrary("The Hobbit", "Tolkien", 295, false);
displayBook();

