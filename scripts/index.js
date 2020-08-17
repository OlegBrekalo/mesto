//#region Constants

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

let iOpenPopup;
//Глобальные переменные editPopup
const editPopup = document.querySelector(".popup-edit");
const editPopupOpenBttn = document.querySelector(".profile__edit-button");
const editPopupCloseBttn = editPopup.querySelector(".popup__close-icon");
const editPopupInputName = editPopup.querySelector(
  ".edit-popup__input-text_type_name"
);
const editPopupInputJob = editPopup.querySelector(
  ".edit-popup__input-text_type_job"
);
const editPopupForm = editPopup.querySelector(".popup__form");
const editPopupSubmitBttn = editPopupForm.querySelector(
  ".popup__submit-button"
);
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//Глобальные переменные addPopup
const addPopup = document.querySelector(".popup-add");
const addPopupOpenBttn = document.querySelector(".profile__add-button");
const addPopupCloseBttn = addPopup.querySelector(".popup__close-icon");
const addPopupInputName = addPopup.querySelector(
  ".add-form__input-text_type_name"
);
const addPopupInputSrc = addPopup.querySelector(
  ".add-form__input-text_type_src"
);
const addPopupForm = addPopup.querySelector(".popup__form");
const addPopupSubmitBttn = addPopupForm.querySelector(".popup__submit-button");

//Глобальные переменные imgPopup
const imgPopup = document.querySelector(".popup-img");
const imgPopupImage = imgPopup.querySelector(".popup__image");
const imgPopupCloseBttn = imgPopup.querySelector(".popup__close-icon");
const imgPopupSubtile = imgPopup.querySelector(".popup__img-subtitle");

//Глобальные переменные отдельных карточек
const elementsGrid = document.querySelector(".elements__img-grid");
const elementTemplateID = "#template_element";

const formValidatorMap = new Map();

const initialCards = [
  {
    name: "Аляска, США",
    img:
      "https://images.unsplash.com/photo-1548181449-abc0791d2354?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
    imgAlt: "Горная долина Аляска, США.",
  },
  {
    name: "Сельяландсфосс, Исландия",
    img:
      "https://images.unsplash.com/photo-1585432615987-7f50eab32daa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    imgAlt: "Водопад Сельяландсфосс, Исландия.",
  },
  {
    name: "Пассо Ролле, Италия",
    img:
      "https://images.unsplash.com/photo-1535730480175-8f43dbb6f894?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    imgAlt: "Перевал Пассо Ролле, Италия.",
  },
  {
    name: "Лофотенские острова, Норвегия",
    img:
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
    imgAlt: "Лофотенские острова, Норвегия.",
  },
  {
    name: "Скалистые горы, Канада",
    img:
      "https://images.unsplash.com/photo-1489363855452-7327672b1608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
    imgAlt: "Канадские Скалистые горы.",
  },
  {
    name: "Гижгит, Кабардино-Балкарская Республика",
    img:
      "https://images.unsplash.com/photo-1572815117612-885a3e0288ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    imgAlt: "Озеро Гижгит.",
  },
];

//#endregion

//#region Open-Close-Submit Popups

function eventClosePopupByEsc(evt) {
  if (evt.key === "Escape") {
    popupHide(iOpenPopup);
  }
}

function setEventClosePopupOnEsc(popup) {
  document.addEventListener("keydown", eventClosePopupByEsc);
}

function removeEventClosePopupOnEsc(popup) {
  document.removeEventListener("keydown", eventClosePopupByEsc);
}

function popupShow(popup) {
  popup.classList.add("popup_opened");
  iOpenPopup = popup;
  setEventClosePopupOnEsc(popup);
}

function popupHide(popup) {
  popup.classList.remove("popup_opened");
  iOpenPopup = null;
  removeEventClosePopupOnEsc(popup);
}

//Ивенты editPopup
function editPopupOpen() {
  popupShow(editPopup);
  editPopupInputName.value = profileName.textContent;
  editPopupInputJob.value = profileJob.textContent;

  formValidatorMap.get(editPopupForm).initialazeForm();
  formValidatorMap
    .get(editPopupForm)
    .setButtonDisable(editPopupSubmitBttn, false);
}

function editPopupSubmit(evt) {
  profileName.textContent = editPopupInputName.value;
  profileJob.textContent = editPopupInputJob.value;
  popupHide(editPopup);
}

editPopupOpenBttn.addEventListener("click", editPopupOpen);
editPopupCloseBttn.addEventListener("click", () => popupHide(editPopup));
editPopupForm.addEventListener("submit", editPopupSubmit);

//Ивенты addPopup
function addPopupOpen() {
  popupShow(addPopup);
  addPopupInputName.value = "";
  addPopupInputSrc.value = "";

  formValidatorMap.get(addPopupForm).initialazeForm();
  formValidatorMap.get(addPopupForm).setButtonDisable(addPopupSubmitBttn, true);
}

function addPopupSubmit(evt) {
  elementsGrid.prepend(
    new Card(
      {
        name: addPopupInputName.value,
        img: addPopupInputSrc.value,
        imgAlt: addPopupInputName.value,
      },
      elementTemplateID,
      imgPopupOpen
    ).renderCard()
  );
  popupHide(addPopup);
}

addPopupOpenBttn.addEventListener("click", addPopupOpen);
addPopupCloseBttn.addEventListener("click", () => popupHide(addPopup));
addPopupForm.addEventListener("submit", addPopupSubmit);

//Ивенты imgPopup

//Отвечая на "Можно лучше" про imgPopupOpen
//Я не представляю как можно подавать на вход открытия попапа информацию о карточке, потому что ивент открытия возникает в глобальной области
//Даже если я начну хранить объекты карточек отдельно, связать место возникновения ивента и экземляр внутри хранилища будет сложно
///////////////
//Опция: полностью убрать код открытия imgPopup в класс Card и вызывать его по данным карточки
//Но открытие модального окна - это вообще не не должно быть функциональностью карточки, это разные сущности

function imgPopupOpen(evt) {
  imgPopupImage.setAttribute("src", evt.target.attributes.src.value);
  imgPopupImage.setAttribute("alt", evt.target.attributes.alt.value);
  imgPopupSubtile.textContent = evt.target.parentNode.querySelector(
    ".element__title"
  ).textContent;
  popupShow(imgPopup);
}

imgPopupCloseBttn.addEventListener("click", () => popupHide(imgPopup));

function addOnClickClosePopupEvents() {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        popupHide(popup);
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

initialCards.forEach((el) => {
  elementsGrid.prepend(
    new Card(el, elementTemplateID, imgPopupOpen).renderCard()
  );
});
