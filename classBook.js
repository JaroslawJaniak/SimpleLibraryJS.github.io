export class Book {
  #author;
  #authorFirstName;
  #authorLastName;
  #title;
  #year;
  #price;
  #isAvailable = true;

  get authorFirstName() {
    return this.#authorFirstName;
  }
  get authorLastName() {
    return this.#authorLastName;
  }
  get author() {
    return `${this.#authorFirstName} ${this.#authorLastName}`;
  }
  get title() {
    return this.#title;
  }
  get year() {
    return this.#year;
  }
  get price() {
    return this.#price;
  }
  get isAvailable() {
    return this.#isAvailable;
  }

  get selectBookInfo() {
    return `${this.#authorFirstName} ${this.#authorLastName} "${this.#title}"`;
  }

  get bookInfo() {
    return `${this.#authorFirstName} ${this.#authorLastName} "${
      this.#title
    }" year of publication: ${this.#year}, is available: ${this.#isAvailable
      .toString()
      .toUpperCase()}, `;
  }

  set isAvailable(status) {
    this.#isAvailable = status;
  }

  constructor(authorFirstName, authorLastName, title, year, price) {
    this.#authorFirstName = authorFirstName;
    this.#authorLastName = authorLastName;
    this.#title = title;
    this.#year = year;
    this.#price = price;
  }
}
