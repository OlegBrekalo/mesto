export default class Card {
  constructor(cardContent, templateID, parentPopupOpenEvent) {
    this._cardContent = cardContent;
    this._parentPopupOpenEvent = parentPopupOpenEvent;
    this._templateID = templateID;
  }

  //По-хорошему для реализации полноценной инкапсуляции следовало с нуля описать parentPopupOpenEvent, но это дублирует уже существующий код
  //Вопрос только в том во что мы упираемся сильнее в инкапсуляцию или DRY ?
  //Пока я просто передаю уже существующую функцию и связываю её внутри

  _elementMockImgOnError(evt) {
    evt.target.src =
      "https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";
  }

  _elementLikeToggle(evt) {
    evt.target.classList.toggle("element__like-icon_checked");
  }

  _removeParent(evt) {
    evt.target.parentNode.remove();
  }

  _generateHTMLCard() {
    const newElement = document
      .querySelector(this._templateID)
      .content.cloneNode(true);
    const cardTitle = newElement.querySelector(".element__title");
    cardTitle.textContent = this._cardContent.name;
    cardTitle.setAttribute("title", this._cardContent.name);

    const cardImage = newElement.querySelector(".element__image");
    cardImage.setAttribute("alt", this._cardContent.imgAlt);
    cardImage.setAttribute("src", this._cardContent.img);
    cardImage.onerror = this._elementMockImgOnError;
    cardImage.addEventListener("click", this._parentPopupOpenEvent);

    newElement
      .querySelector(".element__like-icon")
      .addEventListener("click", this._elementLikeToggle);
    newElement
      .querySelector(".element__remove-icon")
      .addEventListener("click", this._removeParent);

    return newElement;
  }

  renderCard() {
    return this._generateHTMLCard();
  }
}
