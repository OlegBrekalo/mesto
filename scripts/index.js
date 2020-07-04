let editPopup = document.querySelector(".edit-popup");
let editPopupOpenBttn = document.querySelector(".profile__edit-button");
let editPopupCloseBttn = document.querySelector(".edit-popup__close-icon");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let editPopupInputName = document.querySelector(".edit-popup__input-text_type_name");
let editPopupInputJob = document.querySelector(".edit-popup__input-text_type_job");
let editPopupForm = document.querySelector(".edit-popup__form");


function editPopupDisplayToggle(){
  editPopup.classList.toggle("edit-popup_opened");
}

function editPopupOpen(){
  editPopupDisplayToggle();
  editPopupInputName.value = profileName.textContent;
  editPopupInputJob.value = profileJob.textContent;
}

function editPopupSubmit(evt){
  evt.preventDefault();
  profileName.textContent = editPopupInputName.value;
  profileJob.textContent = editPopupInputJob.value;
  editPopupDisplayToggle();
}

editPopupOpenBttn.addEventListener("click", editPopupOpen);
editPopupCloseBttn.addEventListener("click", editPopupDisplayToggle);
editPopupForm.addEventListener('submit', editPopupSubmit);
