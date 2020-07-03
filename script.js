let editPopup = document.querySelector(".edit-popup");
let editPopupOpenBttn = document.querySelector(".profile__edit-button");
let editPopupCloseBttn = document.querySelector(".edit-popup__close-icon");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let editPopupInputName = document.querySelector(".edit-popup__input-text_type_name");
let editPopupInputJob = document.querySelector(".edit-popup__input-text_type_job");
let editPopupForm = document.querySelector(".edit-popup__form");


editPopupOpenBttn.addEventListener("click", function(){
  editPopup.classList.add("edit-popup_opened");
  editPopupInputName.value = profileName.textContent;
  editPopupInputJob.value = profileJob.textContent;
})

editPopupCloseBttn.addEventListener("click", function(){
  editPopup.classList.remove("edit-popup_opened");
})

editPopupForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = editPopupInputName.value;
  profileJob.textContent = editPopupInputJob.value;
  editPopup.classList.remove("edit-popup_opened");
});
