"use strict";

import { App } from "./app.js";

export function createDOMElement(tag, content, className, id) {
  const el = document.createElement(tag);
  el.innerHTML = content;
  el.className = className;
  el.setAttribute("id", id);

  return el;
}

export function buttonDOMElement(innerText) {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.classList.add("btn");
  button.classList.add("btn-secondary");
   button.classList.add("btn-sm");

  return button;
}

const app = new App();
app.run();
