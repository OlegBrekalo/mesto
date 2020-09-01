import "./index.css";

//#region import constants
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";

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
} from "../scripts/utils/constants.js";

import { initialCards } from "../scripts/utils/constants.js";

const formValidatorMap = new Map();
//#endregion

const userInfo = new UserInfo(".profile__name", ".profile__job");

//#region Popups
//editPopup
const editPopup = new PopupWithForm({
  popupSelector: editPopupSelector,
  formSelector: popupFormSelector,
  inputSelector: popupTextInput,
});

editPopup.setEventListeners({
  close: () => {
    editPopup.close();
  },
  submit: (data) => {
    userInfo.setUserInfo({
      name: data[editPopupNameID],
      about: data[editPopupAboutID],
    });
    editPopup.close();
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
});

addPopup.setEventListeners({
  close: () => {
    addPopup.close();
  },
  submit: (data) => {
    cardsSection.addNewElement(
      new Card(
        {
          name: data[addPopupNameID],
          img: data[addPopupSrcID],
          imgAlt: data[addPopupNameID],
        },
        imgPopupOpen
      )
    );
    addPopup.close();
  },
});

function addPopupOpen() {
  addPopup.clear();
  addPopup.open();

  formValidatorMap.get(addPopupForm).initialazeForm();
  formValidatorMap.get(addPopupForm).setButtonDisable(addPopupSubmitBttn, true);
}

addPopupOpenBttn.addEventListener("click", addPopupOpen);

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

const cardsSection = new Section(
  {
    initItems: initialCards.map((el) => {
      return new Card(el, imgPopupOpen);
    }),
    renderer: (card) => {
      return card.generateDOMCard(cardTemplateID);
    },
  },
  elementsGridSelector
);

cardsSection.init();
