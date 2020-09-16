//Webpack Moduls
import "./index.css";

//#region import constants
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupDeleteCardForm from "../scripts/components/PopupDeleteCard.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import API from "../scripts/components/API.js";

import {
  editPopupSelector,
  editPopupOpenBttn,
  editPopupInputName,
  editPopupInputJob,
  editPopupForm,
  editPopupSubmitBttn,
  editPopupNameID,
  editPopupAboutID,
} from "../scripts/utils/constants.js";

import {
  addPopupSelector,
  addPopupOpenBttn,
  addPopupForm,
  addPopupSubmitBttn,
  addPopupNameID,
  addPopupSrcID,
} from "../scripts/utils/constants.js";

import {
  avatarPopupSelector,
  avatarPopupOpenBttn,
  avatarPopupForm,
  avatarPopupSubmitBttn,
  avatarPopupSrcID,
} from "../scripts/utils/constants.js";

import { deleteCardPopupSelector } from "../scripts/utils/constants.js";

import {
  imgPopupSelector,
  imgPopupCloseBttn,
  imgPopupImageSelector,
  imgPopupSubtileSelector,
} from "../scripts/utils/constants.js";

import {
  elementsGridSelector,
  cardTemplateID,
} from "../scripts/utils/constants.js";

import {
  popupFormSelector,
  popupTextInput,
  popupSubmitSelector,
} from "../scripts/utils/constants.js";

const formValidatorMap = new Map();

const api = new API(
  "https://mesto.nomoreparties.co/v1/cohort-15/",
  "00e3d586-abb9-483a-af25-8c5b37844ed8"
);

const userInfo = new UserInfo(
  {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__job",
    avatarSelector: ".profile__avatar",
  },
  {
    initUserCallback: api.getUserInfo.bind(api),
    updateUserInfoCallBack: api.updateUserInfo.bind(api),
    updateAvatarCallback: api.updateUserAvatar.bind(api),
  }
);

const cardAPICallbacks = {
  postOnServer: api.addNewCard.bind(api),
  deleteOnServer: api.deleteCard.bind(api),
  putLikeOnServer: api.putLike.bind(api),
  removeLikeOnServer: api.removeLike.bind(api),
};

const cardHandlerCallbacks = {
  handleCardClick: imgPopupOpen,
  handleDeleteClick: deleteCardPopupOpen,
  handleCheckOwner: userInfo.checkCardOwnership.bind(userInfo),
};

//#endregion

//#region Popups
function setLoadingText(submitBttn, newBttnText = "Сохраняю...") {
  const oldText = submitBttn.textContent;
  submitBttn.textContent = newBttnText;
  return oldText;
}

function removeOldLoadingText(submitBttn, newBttnText) {
  submitBttn.textContent = newBttnText;
}

//editPopup
const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  formSelector: popupFormSelector,
  inputSelector: popupTextInput,
  submitSelector: popupSubmitSelector,
});

editPopup.setEventListeners({
  close: () => {
    editPopup.close();
  },
  submit: (data) => {
    const oldText = setLoadingText(editPopup.submitBttn);
    userInfo
      .setNewTextInfo({
        name: data[editPopupNameID],
        about: data[editPopupAboutID],
      })
      .then(() => {
        editPopup.close();
        removeOldLoadingText(editPopup.submitBttn, oldText);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

function editPopupOpen() {
  formValidatorMap.get(editPopupForm).initialazeForm();
  formValidatorMap
    .get(editPopupForm)
    .setButtonDisable(editPopupSubmitBttn, false);

  const { name, about } = userInfo.getUserInfo();

  editPopupInputName.value = name;
  editPopupInputJob.value = about;

  editPopup.open();
}

editPopupOpenBttn.addEventListener("click", editPopupOpen);

//addPopup
const addPopup = new PopupWithForm({
  popupSelector: addPopupSelector,
  formSelector: popupFormSelector,
  inputSelector: popupTextInput,
  submitSelector: popupSubmitSelector,
});

addPopup.setEventListeners({
  close: () => {
    addPopup.close();
  },
  submit: (data) => {
    const oldText = setLoadingText(addPopup.submitBttn, "Создаю...");
    api
      .addNewCard(data[addPopupNameID], data[addPopupSrcID])
      .then((cardJSON) => {
        cardsSection.addNewElement(
          new Card(cardJSON, cardHandlerCallbacks, cardAPICallbacks)
        );
      })
      .then(() => {
        addPopup.close();
        removeOldLoadingText(addPopup.submitBttn, oldText);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

function addPopupOpen() {
  addPopup.clear();
  addPopup.open();

  formValidatorMap.get(addPopupForm).initialazeForm();
  formValidatorMap.get(addPopupForm).setButtonDisable(addPopupSubmitBttn, true);
}

addPopupOpenBttn.addEventListener("click", addPopupOpen);

//avatarPopup
const avatarPopup = new PopupWithForm({
  popupSelector: avatarPopupSelector,
  formSelector: popupFormSelector,
  inputSelector: popupTextInput,
  submitSelector: popupSubmitSelector,
});

avatarPopup.setEventListeners({
  close: () => {
    avatarPopup.close();
  },
  submit: (data) => {
    const oldText = setLoadingText(avatarPopup.submitBttn);
    userInfo
      .setNewAvatar(data[avatarPopupSrcID])
      .then(() => {
        avatarPopup.close();
        removeOldLoadingText(avatarPopup.submitBttn, oldText);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

function avatarPopupOpen() {
  avatarPopup.clear();
  avatarPopup.open();

  formValidatorMap.get(avatarPopupForm).initialazeForm();
  formValidatorMap
    .get(avatarPopupForm)
    .setButtonDisable(avatarPopupSubmitBttn, true);
}

avatarPopupOpenBttn.addEventListener("click", avatarPopupOpen);

//deleteCardPopup
const deleteCardPopup = new PopupDeleteCardForm({
  popupSelector: deleteCardPopupSelector,
  formSelector: popupFormSelector,
  inputSelector: popupTextInput,
  submitSelector: popupSubmitSelector,
});

deleteCardPopup.setEventListeners({
  close: () => {
    deleteCardPopup.close();
  },
  submit: () => {
    const oldText = setLoadingText(deleteCardPopup.submitBttn, "Удаляю...");
    deleteCardPopup.deletedCard
      .deleteSelf(deleteCardPopup.parentNode)
      .then(() => {
        deleteCardPopup.close();
        removeOldLoadingText(deleteCardPopup.submitBttn, oldText);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

function deleteCardPopupOpen(evt) {
  deleteCardPopup.open(this, evt.target.parentNode);
}

//imgPopup
const imgPopup = new PopupWithImage({
  popupSelector: imgPopupSelector,
  popupImageSelector: imgPopupImageSelector,
  popupSubtitleSelector: imgPopupSubtileSelector,
});

function imgPopupOpen(evt) {
  imgPopup.open({
    src: evt.target.attributes.src.value,
    alt: evt.target.attributes.alt.value,
    subtitle: evt.target.parentNode.querySelector(".element__title")
      .textContent,
  });
}

imgPopupCloseBttn.addEventListener("click", () => imgPopup.close());

function addOnClickClosePopupEvents() {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        window.openPopup.close();
      }
    });
  });
}

addOnClickClosePopupEvents();
//#endregion

Array.from(document.querySelectorAll(".popup__form")).forEach((form) => {
  formValidatorMap.set(
    form,
    new FormValidator(form, {
      formSelector: ".popup__form",
      inputSelector: ".popup__input-text",
      submitButtonSelector: ".popup__submit-button",
      inputErrorClass: "popup__input-text_invalid",
      errorClass: "popup__input-error_show",
    })
  );
  formValidatorMap.get(form).enableValidation();
});

const cardsSection = new Section((card) => {
  return card.generateDOMCard(cardTemplateID);
}, elementsGridSelector);

Promise.all([userInfo.initUser(), api.getCards()])
  .then((cardsJSON) => {
    cardsSection.init(
      cardsJSON[1].map((cardJSON) => {
        return new Card(cardJSON, cardHandlerCallbacks, cardAPICallbacks);
      })
    );
  })
  .catch( (err) =>{
    console.log(err);
  });
