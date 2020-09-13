export default class Card {
  constructor(
    cardContent,
    { handleCardClick, handleDeleteClick, handleCheckOwner },
    { postOnServer, deleteOnServer, putLikeOnServer, removeLikeOnServer }
  ) {
    this._name = cardContent.name;
    this._link = cardContent.link;
    this._likes = cardContent.likes;
    this._id = cardContent._id;
    this._ownership = handleCheckOwner(cardContent.owner._id);

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._handleCheckOwner = handleCheckOwner;
    this._postOnServer = postOnServer;
    this._deleteOnServer = deleteOnServer;
    this._putLikeOnServer = putLikeOnServer;
    this._removeLikeOnServer = removeLikeOnServer;
  }

  _elementMockImgOnError(evt) {
    evt.target.src =
      "https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";
  }

  _putLike(target) {
    this._putLikeOnServer(this._id).then((cardJSON) => {
      target.classList.add("element__like-icon_checked");
      this._setLikeCount(cardJSON.likes);
    });
  }

  _removeLike(target) {
    this._removeLikeOnServer(this._id).then((cardJSON) => {
      target.classList.remove("element__like-icon_checked");
      this._setLikeCount(cardJSON.likes);
    });
  }

  _elementLikeToggle(evt) {
    if (evt.target.classList.contains("element__like-icon_checked")) {
      this._removeLike(evt.target);
    } else {
      this._putLike(evt.target);
    }
  }

  _removeParent(parentNode) {
    parentNode.remove();
  }

  _getTemplate(templateID) {
    return document.querySelector(templateID).content.cloneNode(true);
  }

  _setLikeCount(likesCollection) {
    if (likesCollection) {
      this._likes = likesCollection;
    }

    this._likeCounter.textContent = this._likes.length;
  }

  generateDOMCard(templateID) {
    const newElement = this._getTemplate(templateID);

    const cardTitle = newElement.querySelector(".element__title");
    cardTitle.textContent = this._name;
    cardTitle.setAttribute("title", this._name);

    const cardImage = newElement.querySelector(".element__image");
    cardImage.setAttribute("src", this._link);

    cardImage.onerror = this._elementMockImgOnError;

    cardImage.addEventListener("click", this._handleCardClick);

    const likeIcon = newElement.querySelector(".element__like-icon");
    likeIcon.addEventListener("click", this._elementLikeToggle.bind(this));

    if (
      this._likes.some((owner) => {
        return this._handleCheckOwner(owner._id);
      })
    ) {
      likeIcon.classList.add("element__like-icon_checked");
    }

    this._likeCounter = newElement.querySelector(".element__like-couter");
    this._setLikeCount();

    if (this._ownership) {
      const removeIcon = newElement.querySelector(".element__remove-icon");
      removeIcon.addEventListener("click", this._handleDeleteClick);
      removeIcon.classList.add("element__remove-icon_show");
    }

    return newElement;
  }

  postSelfOnServer() {
    this._postOnServer(cardContent.name, cardContent.link).then((cardJSON) => {
      console.log(cardJSON.name + " " + cardJSON.link);
      return Promise.resolve;
    });
  }

  deleteSelf(parentNode) {
    return this._deleteOnServer(this._id).then((json) => {
      this._removeParent(parentNode);
      return Promise.resolve();
    });
  }
}
