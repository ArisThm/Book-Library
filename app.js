// Book Class: Represents a Book
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
// UI Class: Handle Ui
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href='#' class='btn delete'>X</td> 
        `;

        list.appendChild(row);
    }   
    
    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Dissapear after 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';

    }
}
// Store Class: Handles Storage(Local)
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    // Prevent actual submit
    e.preventDefault();
    
    // Get Form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    // Validate
    if(title === "" || author === "" || pages ==="") {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
            
    //  Instantiate Book
    const book = new Book(title, author, pages);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to storage
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // CLear Fields
    UI.clearFields();
    }

})
// Event: Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    // Remove Book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show success message
    UI.showAlert('Book Removed', 'success');

});