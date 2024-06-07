export class LibraryEventsManager {
  #usersList;
  #nameInput = document.getElementById("nameFilter");
  #surnameInput = document.getElementById("surnameFilter");
  #filterBtn = document.getElementById("filterBtn");

  #addBtn = document.getElementById("addNewReaderBtn");

  constructor(bookList, readerList) {
    this.#usersList = usersList;
    this.#filterBtn.addEventListener("click", () => this.#filter());

    this.#addBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const firstName = document.getElementById("firstName").value;
      const lastName = document.querySelector("#lastName").value;
      const reader = new Reader("", "");

      if (firstName !== "" && lastName !== "") {
        reader.name = firstName;
        reader.lastName = lastName;
        console.log("clicked");
        library.addReader(reader);
      }
    });
  }

  #addrReader() {
    const name = this.#nameInput.value;
    const surname = this.#surnameInput.value;
  }

  #filter() {
    const name = this.#nameInput.value;
    const surname = this.#surnameInput.value;

    this.#usersList.filter(name, surname);
  }
}

//find reader
document.getElementById("findReaderBtn").addEventListener("click", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("findFirstName").value;
  const lastName = document.querySelector("#findLastName").value;

  const reader = library.findReaderInLibrary(firstName, lastName);

  if (firstName !== "" && lastName !== "") {
    document.getElementById("accordionFlushExampleSub").hidden = false;
    const btn = document.querySelector("#accordion-button-sub");
    const accordionBody = document.getElementById("flush-collapseTwoSub");
    const header = document.getElementById("readerListOfBooksReaderName");
    const contener = document.getElementById("readerListOfBooks");

    library.readers.forEach((reader) => {
      if (reader.firstName === firstName && reader.lastName === lastName) {
        reader.books.forEach((readerBook) => {
          document
            .getElementById(`${readerBook.author}${readerBook.title}`)
            .classList.add("readerFinded");
        });
      } else {
        reader.books.forEach((readerBook) => {
          document
            .getElementById(`${readerBook.author}${readerBook.title}`)
            .classList.remove("readerFinded");
        });
      }
    });

    btn.classList.remove("collapsed");
    accordionBody.classList.add("show");
    contener.innerHTML = "";
    contener.appendChild(header);
    header.innerHTML = `<span id="readerFirstName">${firstName}</span> <span id="readerLastName">${lastName}</span>`;
    reader.displayBooks(contener);
  } else {
    document.getElementById("accordionFlushExampleSub").hidden = false;
  }
});

function findElement(firstName, lastName) {
  const reader = arrayReaders.find((el) => {
    return el.firstName === firstName && el.lastName === lastName;
  });

  console.log(reader);
}
