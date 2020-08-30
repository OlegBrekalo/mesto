import Popup from "./Popup.js";

import { popupFormSelector, popupTextInput } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    formSelector = popupFormSelector,
    inputSelector = popupTextInput,
  }) {
    super(popupSelector);
    this._inputs = Array.from(this._popup.querySelectorAll(inputSelector));
    this._popupForm = this._popup.querySelector(formSelector);
  }

  clear() {
    this._inputs.forEach((input) => {
      input.value = "";
    });
  }

  close(){
    super.close();
    this._clear();
  }

  _getInputValues() {
    const value = {};
    this._inputs.forEach((input) => {
      value[input.id] = input.value;
    });
    return value;
  }

  //В условии задачи было скзанно что коллбек сабмина следует помещать в конструктор
  //Но тем не менее я считаю что лучше единобразно помещать и включать все ивенты в одной функции
  setEventListeners({ close, submit }) {
    super.setEventListeners(close);
    this._popupForm.addEventListener("submit", () => {
      submit(this._getInputValues());
    });
  }
}
