//Глобальные переменные Popup
export const popupFormSelector = ".popup__form";
export const popupTextInput = ".popup__input-text";

//Глобальные переменные editPopup
export const editPopupSelector = ".popup-edit";
export const editPopup = document.querySelector(editPopupSelector);
export const editPopupOpenBttn = document.querySelector(".profile__edit-button");
export const editPopupInputName = document.querySelector(editPopupSelector).querySelector(
  ".edit-popup__input-text_type_name"
);
export const editPopupInputJob = editPopup.querySelector(
  ".edit-popup__input-text_type_job"
);
export const editPopupForm = editPopup.querySelector(".popup__form");
export const editPopupSubmitBttn = editPopupForm.querySelector(
  ".popup__submit-button"
);
export const editPopupNameID = "edit-form_name";
export const editPopupAboutID = "edit-form_about";

//Глобальные переменные addPopup
export const addPopupSelector = ".popup-add";
export const addPopup = document.querySelector(addPopupSelector);
export const addPopupOpenBttn = document.querySelector(".profile__add-button");
export const addPopupForm = addPopup.querySelector(".popup__form");
export const addPopupSubmitBttn = addPopupForm.querySelector(".popup__submit-button");
export const addPopupNameID = "add-form_name";
export const addPopupSrcID = "add-form_src";

//Глобальные переменные imgPopup
export const imgPopupSelector = ".popup-img";
export const imgPopupImageSelector = ".popup__image";
export const imgPopupSubtileSelector = ".popup__img-subtitle";
export const imgPopupCloseBttn = document.querySelector(imgPopupSelector).querySelector(".popup__close-icon");
export const imgPopupSubtitleElementSelector = ".element__title";

//Глобальные переменные отдельных карточек
export const elementsGridSelector = ".elements__img-grid";
export const cardTemplateID = "#template_element";

export const initialCards = [
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
