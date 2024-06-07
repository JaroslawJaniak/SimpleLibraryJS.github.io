import { createDOMElement } from "./index.js";
import { buttonDOMElement } from "./index.js";

export class Library {
  #readers = [];
  #books = [];

  get books() {
    return this.#books;
  }

  get readers() {
    return this.#readers;
  }

  set books(b) {
    this.#books = b;
  }

  set readers(r) {
    this.#readers = r;
  }

  initLibrary(readers, books) {
    this.#readers = readers.slice();
    this.#books = books.slice();
  }

  addReader(reader) {
    this.#readers.push(reader);
    this.render();
  }

  getReaderFromLibrary(firstName, lastName) {
    const reader = this.#readers.find((el) => {
      return el.firstName === firstName && el.lastName === lastName;
    });

    return reader;
  }

  isReaderInLibrary(firstName, lastName) {
    this.#readers.find((el) => {
      return el.firstName === firstName && el.lastName === lastName;
    });
  }

  findReaderWithBook(book) {
    this.#readers.forEach((reader) => {
      reader.books.forEach((readerBook) => {
        if (readerBook === book) {
          console.log(`finded: ${reader.readerInfo}`);
          return reader;
        } else {
          return "READER not found";
        }
      });
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

    return sortedBooks;
  }

  sortReadersByLastName() {
    const sortedReaders = this.#readers.sort((a, b) => {
      const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
      const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    return sortedReaders;
  }

  selectDOMelement(reader) {
    const container = document.createElement(`div`);
    const select = document.createElement(`select`);
    select.classList.add("form-select");

    container.classList.add("d-flex");
    container.classList.add("justify-content");
    this.#books.forEach((book, index) => {
      if (book.isAvailable) {
        const option = document.createElement(`option`);
        option.value = index;
        option.innerHTML = book.selectBookInfo;
        select.appendChild(option);
      }
    });

    const addBtn = buttonDOMElement(
      `Add book to ${reader.firstName
        .toString()
        .toUpperCase()} ${reader.lastName.toString().toUpperCase()}`
    );
    addBtn.classList.add("btn-success");
    addBtn.style.width = "300px";
    addBtn.addEventListener("click", () => {
      console.log("select.value: " + select.value);
      this.addBookToReaderBooksList(select.value, reader);
    });

    container.appendChild(select);
    container.appendChild(addBtn);

    return container;
  }

  addBookToReaderBooksList(index, reader) {
    reader.addBook2(this.#books[index]);

    this.renderReadersList(this.#readers);
    this.displayAllBooks();
  }

  listReaderDOMElement(content, element) {
    const el = document.createElement(`div`);
    el.style.width = "700px";

    el.classList.add("border");
    el.classList.add("rounded");
    el.classList.add("d-flex");
    el.classList.add("justify-content-between");
    const deleteBtn = buttonDOMElement("Delete");
    deleteBtn.classList.add("btn-danger");

    deleteBtn.addEventListener("click", () =>
      this.deleteReaderFromLibrary(element)
    );

    el.appendChild(content);
    el.appendChild(deleteBtn);

    return el;
  }

  deleteReaderFromLibrary(reader) {
    if (confirm(`Do you want to delete user: ${reader.readerInfo}`)) {
      const userIdx = this.#readers.findIndex((r) => r === reader);

      if (userIdx !== -1) {
        this.readers[userIdx].books.forEach((book) => {
          book.isAvailable = true;
        });

        this.#readers.splice(userIdx, 1);
        this.renderReadersList(this.#readers);
        this.displayAllBooks();
      }
    }
  }

  listReaderBooksDOMElement(content, reader, book) {
    const el = document.createElement(`div`);
    el.classList.add("w-75");

    el.classList.add("d-flex");
    el.classList.add("justify-content-between");

    const removeBtn = buttonDOMElement(`← Remove this Book from Reader`);
    removeBtn.classList.add("btn-warning");

    removeBtn.addEventListener("click", () =>
      this.removeBookFromReaderBooksList(reader, book)
    );

    el.appendChild(content);
    //el.appendChild(this.selectDOMelement());

    el.appendChild(removeBtn);
    return el;
  }

  removeBookFromReaderBooksList(reader, book) {
    console.log(`click`);

    const userIdx = this.#readers.findIndex((r) => r === reader);

    if (userIdx !== -1) {
      const bookIdx = this.readers[userIdx].books.findIndex((b) => b === book);
      this.readers[userIdx].books[bookIdx].isAvailable = true;
      this.#readers.forEach((el) => {
        console.log(el.books);
      });
      this.readers[userIdx].books.splice(bookIdx, 1);
      this.renderReadersList(this.#readers);
      this.displayAllBooks();
    }
  }

  renderReadersBookList(arrBooks, container, reader) {
    arrBooks.forEach((book) => {
      const listElement = this.listReaderBooksDOMElement(
        createDOMElement(`li`, `${book.bookInfo}`, ""),
        reader,
        book
      );
      container.appendChild(listElement);
    });

    container.appendChild(this.selectDOMelement(reader));
    const hr = document.createElement(`hr`);
    hr.classList.add(`my-5`);
    container.appendChild(hr);
    container.classList.add("border");
    container.classList.add("rounded");
  }

  render() {
    this.displayAllBooks();
    this.renderReadersList();
  }

  renderReadersList() {
    const container = document.querySelector(`.readersList`);
    container.innerHTML = "";

    const sortedReaders = this.sortReadersByLastName()

    sortedReaders.forEach((el, index) => {
      const listElement = this.listReaderDOMElement(
        createDOMElement(
          `div`,
          `${el.readerInfo}`,
          "reader divHeader",
          `reader${index}`
        ),
        el
      );
      container.appendChild(listElement);
      //el.displayBooks(container);
      this.renderReadersBookList(el.books, container, el);
      //el.renderR(container, this.listReaderBooksDOMElement);
    });
  }

  displayAllReaders() {
    const container = document.querySelector(`.readersList`);
    this.#readers.forEach((el, index) => {
      container.appendChild(
        createDOMElement(
          `div`,
          `${el.readerInfo} `,
          "reader divHeader",
          `reader${index}`
        )
      );
    });
  }

  //accordion-body-flush-collapseThree
  displayAllBooks() {
    const container = document.querySelector(`.booksList`);
    container.innerHTML = "";

    const sortedBooks = this.sortBooksByAuthor();

    sortedBooks.forEach((el) => {
      let result = "(FREE)";

      this.#readers.forEach((reader) => {
        reader.books.forEach((readerBook) => {
          if (readerBook === el) {
            result = `(READER: ${reader.readerInfo.toUpperCase()})`;
          }
        });
      });

      if (el.isAvailable) {
        container.appendChild(
          createDOMElement(
            `li`,
            `<b>${result}</b><br> ${el.bookInfo}`,
            "available",
            `${el.author}${el.title}`
          )
        );
      } else {
        container.appendChild(
          createDOMElement(
            `li`,
            `<b>${result}</b><br> ${el.bookInfo}`,
            "notAvailable",
            `${el.author}${el.title}`
          )
        );
      }
    });
  }

  //-----------------------------------------------------------------------------

  displayAvailableBooks() {
    createDOMElement(`displayAvailableBooks() from Library():`, "divHeader");
    for (let i = 0; i < this.#books.length; i++) {
      if (this.#books[i].isAvailable) {
        console.log(this.#books[i]);

        createDOMElement(`${this.#books[i].displayBookInfo()}`, "available");
      }
    }
  }

  displayNotAvailableBooks() {
    createDOMElement(`displayNotAvailableBooks() from Library():`, "divHeader");
    for (let i = 0; i < this.#books.length; i++) {
      if (!this.#books[i].isAvailable) {
        console.log(this.#books[i]);

        createDOMElement(`${this.#books[i].displayBookInfo()}`, "notAvailable");
      }
    }
  }

  //-----------------------------------------------------------------------------
  displayReaders() {
    createDOMElement(`div`, `displayReaders() from Library():`, "divHeader");
    for (let i = 0; i < this.#readers.length; i++) {
      createDOMElement(`div`, `${this.#readers[i].readerInfo}`, "reader");
      this.#readers[i].displayBooks();
    }
  }
}
