import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, inputSelector, submitSelector }) {
    super(popupSelector);
    this._inputs = Array.from(this._popup.querySelectorAll(inputSelector));
    this._popupForm = this._popup.querySelector(formSelector);
    this.submitBttn = this._popup.querySelector(submitSelector);
  }

  clear() {
    this._inputs.forEach((input) => {
      input.value = "";
    });
  }

  close() {
    super.close();
    this.clear();
  }

  _getInputValues() {
    const value = {};
    this._inputs.forEach((input) => {
      value[input.id] = input.value;
    });
    return value;
  }

  setEventListeners({ close, submit }) {
    super.setEventListeners(close);
    this._popupForm.addEventListener("submit", () => {
      submit(this._getInputValues());
    });
  }
}
