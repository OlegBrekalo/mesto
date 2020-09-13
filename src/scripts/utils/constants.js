//Глобальные переменные Popup
export const popupFormSelector = ".popup__form";
export const popupTextInput = ".popup__input-text";
export const popupSubmitSelector = ".popup__submit-button";

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

////Глобальные переменные avatarPopup
export const avatarPopupSelector = ".popup-avatar";
export const avatarPopup = document.querySelector(avatarPopupSelector);
export const avatarPopupOpenBttn = document.querySelector(".profile__avatar");
export const avatarPopupForm = avatarPopup.querySelector(".popup__form");
export const avatarPopupSubmitBttn = avatarPopupForm.querySelector(".popup__submit-button");
export const avatarPopupSrcID = "avatar-form_src";

export const deleteCardPopupSelector = ".popup-delete-card";

//Глобальные переменные imgPopup
export const imgPopupSelector = ".popup-img";
export const imgPopupImageSelector = ".popup__image";
export const imgPopupSubtileSelector = ".popup__img-subtitle";
export const imgPopupCloseBttn = document.querySelector(imgPopupSelector).querySelector(".popup__close-icon");
export const imgPopupSubtitleElementSelector = ".element__title";

//Глобальные переменные отдельных карточек
export const elementsGridSelector = ".elements__img-grid";
export const cardTemplateID = "#template_element";
