import { Reader } from "./classReader.js";

export class ReaderForm {
  #userNameInput = document.getElementById("formFirstName");
  #userSurnameInput = document.getElementById("formLastName");
  #addBtn = document.getElementById("addNewReaderBtn");
  #findBtn = document.getElementById("findReaderBtn");
  #library;

  constructor(library) {
    this.#library = library;

    this.#addBtn.addEventListener("click", () => this.#addUser());
    this.#findBtn.addEventListener("click", (event) => this.#findUser(event));
  }

  #addUser() {
    const newReader = new Reader(
      this.#userNameInput.value,
      this.#userSurnameInput.value
    );

    this.#library.addReader(newReader);

    this.#userNameInput.value = "";
    this.#userSurnameInput.value = "";
  }

  #findUser(event) {
    event.preventDefault();

    const first_name = this.#userSurnameInput.value;
    const last_name = this.#userSurnameInput.value;

    this.#library.findReaderInLibrary(first_name, last_name);
    
    this.#userNameInput.value = "";
    this.#userSurnameInput.value = "";
  }
}
