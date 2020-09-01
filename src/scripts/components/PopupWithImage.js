import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupImageSelector, popupSubtitleSelector }) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(popupImageSelector);
    this._popupSubtitle = this._popup.querySelector(popupSubtitleSelector);
  }

  open({ src, alt, subtitle }) {
    this._popupImage.setAttribute("src", src);
    this._popupImage.setAttribute("alt", alt);
    this._popupSubtitle.textContent = subtitle;

    super.open();
  }
}
