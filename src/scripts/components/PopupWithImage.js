import Popup from "./Popup.js";
import {
  imgPopupImageSelector,
  imgPopupSubtileSelector,
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor({
    popupSelector,
    popupImageSelector = imgPopupImageSelector,
    popupSubtitleSelector = imgPopupSubtileSelector,
  }) {
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
