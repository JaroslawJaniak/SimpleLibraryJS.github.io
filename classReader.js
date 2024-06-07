import { createDOMElement } from "./index.js";
import { buttonDOMElement } from "./index.js";

export class Reader {
  #firstName;
  #lastName;
  #id = Math.random() * 1000 + 1;
  #books = [];

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get firstName() {
    return this.#firstName;
  }

  get lastName() {
    return this.#lastName;
  }

  get books() {
    return this.#books;
  }

  get readerInfo() {
    return ` ${this.#firstName} ${this.#lastName}`;
  }

  set firstName(str) {
    this.#firstName = str;
  }

  set lastName(str) {
    this.#lastName = str;
  }

  // listReaderBooksDOMElement(content, element) {
  //   const el = document.createElement(`div`);
  //   el.classList.add("w-75");
  //   el.classList.add("m-2");
  //   el.classList.add("p-2");

  //   el.classList.add("d-flex");
  //   el.classList.add("justify-content-between");
  //   const removeBtn = buttonDOMElement("Remove");

  //   removeBtn.addEventListener("click", () =>
  //     this.removeBookFromReaderBooksList(element)
  //   );

  //   el.appendChild(content);
  //   el.appendChild(removeBtn);

  //   return el;
  // }

  // removeBookFromReaderBooksList(book) {
  //   console.log(`click`);
  //   const bookIdx = this.#books.findIndex((b) => b === book);
  //   this.#books.splice(bookIdx, 1);
  //   book.isAvailable = true;
  // }

  renderR(container, f) {
    this.renderReadersBookListR(this.#books, container, f);
  }

  renderReadersBookListR(arr, container, f) {
    //container.innerHTML = "";

    arr.forEach((book) => {
      const listElement = f(
        createDOMElement(`li`, `${book.bookInfo}`, ""),
        book
      );
      container.appendChild(listElement);
    });
  }

  displayBooks(container) {
    this.books.forEach((book) => {
      container.appendChild(createDOMElement(`li`, `${book.bookInfo}`, ""));
    });
  }

  sortBooksByAuthor() {
    const sortedBooks = this.#books.sort((a, b) => {
      const nameA = a.authorLastName.toUpperCase(); // ignore upper and lowercase
      const nameB = b.authorLastName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    //render books list
  }

  addBook(book, isReaderInLibrary) {
    console.log(book.selectBookInfo);
    console.log(book.isAvailable);
    console.log(` is ${isReaderInLibrary}`);

    if (book.isAvailable && isReaderInLibrary) {
      console.log(` is2 ${isReaderInLibrary}`);
      this.#books.push(book);
      book.isAvailable = false;
    }
  }

  addBook2(book) {
    if (book.isAvailable) {
      
      this.#books.push(book);
      book.isAvailable = false;
    }
  }

  //splice(start, deleteCount)
  removeBook(book) {
    let index;

    for (let i = 0; i < this.#books.length; i++) {
      if (this.#books[i] === book) {
        index = i;
      }
    }

    this.#books.splice(index, 1);
    book.isAvailable = true;
  }
}
