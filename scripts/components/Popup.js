export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _setEventClosePopupOnEsc() {
    document.addEventListener("keydown", this._handleEscClose);
    window.openPopup = this;
  }

  _removeEventClosePopupOnEsc() {
    document.removeEventListener("keydown", this._handleEscClose);
    window.openPopup = null;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      window.openPopup.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventClosePopupOnEsc();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventClosePopupOnEsc();
  }

  setEventListeners(close) {
    this._popup
      .querySelector(".popup__close-icon")
      .addEventListener("click", close);
  }
}
