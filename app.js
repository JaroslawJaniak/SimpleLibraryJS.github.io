import { Book } from "./classBook.js";
import { Reader } from "./classReader.js";
import { Library } from "./classLibrary.js";
import { ReaderForm } from "./classReaderForm.js";

//obiekty ksiązek
const book1 = new Book("Robert", "E. Howard", "Conan The Barbarian", 1932, 32);
const book2 = new Book("J.R.R", "Tolkien", "Lord of the Rings", 1948, 52);
const book3 = new Book("J.R.R", "Tolkien", "Silmarilion", 1948, 52);
const book4 = new Book("Ann", "Rice", "Interview with the Vampire", 1976, 34);
const book5 = new Book("James", "Joyce", "Ulysses", 1925, 84);
const book6 = new Book("Stanisław", "Lem", "Wojny Robotów", 1965, 33);
const book7 = new Book("Rober", "Falk", "Eony bzdur", 1985, 3323);
const book8 = new Book("Michael", "Frost", "Endless Future", 1990, 24);

//obiekty czytelników
const reader1 = new Reader("John", "Doe");
const reader2 = new Reader("Jane", "Smith");
const reader3 = new Reader("Fox", "Moulder");
const reader4 = new Reader("Ashton", "Cutcher");
const reader5 = new Reader("Dana", "Scully");

// reader1.addBook(book2, true);
// reader3.addBook(book1, true);
// reader3.addBook(book5, true);
// reader5.addBook(book3, true);

//lista ksiazek i czytelników przekazanych do konstrukcji obiektu biblioteka
const arrayBooks = [book1, book2, book3, book4, book5, book6, book7, book8];
const arrayReaders = [reader1, reader2, reader3, reader5, reader4];

export class App {

  #library;
  #readerForm;

  run() {
    this.#library = new Library();
    this.#library.initLibrary(arrayReaders, arrayBooks);
    this.#readerForm = new ReaderForm(this.#library);

    this.#library.render();
    

    // this.#userService = new UserService();
    // this.#userList = new UsersList(this.#userService);
    // this.#listToolbar = new ListToolbar(this.#userList);
    // this.#userForm = new UserForm(this.#userList);

    //this.#userList.show();
  }
}
