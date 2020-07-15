//Инициализация значений по-умолчанию
const initialCards = [
  {
    name: 'Аляска, США',
    img: 'https://images.unsplash.com/photo-1548181449-abc0791d2354?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
    imgAlt: 'Горная долина Аляска, США.'
  },
  {
    name: 'Сельяландсфосс, Исландия',
    img: 'https://images.unsplash.com/photo-1585432615987-7f50eab32daa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
    imgAlt: 'Водопад Сельяландсфосс, Исландия.'
  },
  {
    name: 'Пассо Ролле, Италия',
    img: 'https://images.unsplash.com/photo-1535730480175-8f43dbb6f894?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    imgAlt: 'Перевал Пассо Ролле, Италия.'
  },
  {
    name: 'Лофотенские острова, Норвегия',
    img: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
    imgAlt: 'Лофотенские острова, Норвегия.'
  },
  {
    name: 'Южный остров, Новая Зеландия',
    img: 'https://images.unsplash.com/photo-1494391468241-0a4476581b78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    imgAlt: 'Горный ледник на Южном острове Новой Зеландии.'
  },
  {
    name: 'Гижгит, Кабардино-Балкарская Республика',
    img: 'https://images.unsplash.com/photo-1572815117612-885a3e0288ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    imgAlt: 'Озеро Гижгит.'
  }
];

function elementLikeToggle(evt){
  evt.target.classList.toggle("element__like-icon_checked");
}

function elementMockImgOnError(evt){
  evt.target.src = 'https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
}

function removeParent(evt){
  evt.target.parentNode.remove();
}

function renderNewPlace(newPlace){
  const newElement = elementTemplate.cloneNode(true);
  newElement.querySelector(".element__title").textContent = newPlace.name;
  newElement.querySelector(".element__title").setAttribute("title", newPlace.name);
  newElement.querySelector(".element__image").setAttribute("alt", newPlace.imgAlt);
  newElement.querySelector(".element__image").setAttribute("src", newPlace.img);

  newElement.querySelector(".element__image").onerror = elementMockImgOnError;
  newElement.querySelector(".element__image").addEventListener("click", imgPopupOpenBttn);
  newElement.querySelector(".element__like-icon").addEventListener("click", elementLikeToggle);
  newElement.querySelector(".element__remove-icon").addEventListener("click", removeParent);

  elementsGrid.prepend(newElement);
}

const elementsGrid = document.querySelector(".elements");
const elementTemplate = document.querySelector("#template_element").content;

initialCards.forEach(renderNewPlace);

//Логика edit-popup
const editPopup = document.querySelector(".popup-edit");

const editPopupOpenBttn = document.querySelector(".profile__edit-button");
const editPopupCloseBttn = editPopup.querySelector(".popup__close-icon");
const editPopupInputName = editPopup.querySelector(".edit-popup__input-text_type_name");
const editPopupInputJob = editPopup.querySelector(".edit-popup__input-text_type_job");
const editPopupForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

function editPopupDisplayToggle(evt){
  editPopup.classList.toggle("popup_opened");
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

//Логика add-popup
const addPopup = document.querySelector(".popup-add");

const addPopupOpenBttn = document.querySelector(".profile__add-button");
const addPopupCloseBttn = addPopup.querySelector(".popup__close-icon");
const addPopupInputName = addPopup.querySelector(".add-form__input-text_type_name");
const addPopupInputSrc = addPopup.querySelector(".add-form__input-text_type_src");
const addPopupForm = addPopup.querySelector(".popup__form");

function addPopupDisplayToggle(evt){
  addPopup.classList.toggle("popup_opened");
}

function addPopupOpen(){
  addPopupDisplayToggle();
  addPopupInputName.value = '';
  addPopupInputSrc.value = '';
}

function addPopupSubmit(evt){
  evt.preventDefault();
  renderNewPlace({
              name: addPopupInputName.value?addPopupInputName.value:'Неизвестное место',
              img: addPopupInputSrc.value,
              imgAlt: addPopupInputName.value?addPopupInputName.value:'Неизвестное место'
  });
  addPopupDisplayToggle();
}

addPopupOpenBttn.addEventListener("click", addPopupOpen);
addPopupCloseBttn.addEventListener("click", addPopupDisplayToggle);
addPopupForm.addEventListener('submit', addPopupSubmit);

//логика img-popup
const imgPopup = document.querySelector(".img-popup");
const imgPopupCloseBttn = imgPopup.querySelector(".img-popup__close-icon");

function imgPopupDisplayToggle(){
  imgPopup.classList.toggle("img-popup_opened");
}

function imgPopupOpenBttn (evt){
  imgPopup.querySelector(".img-popup__image").setAttribute("src", evt.target.attributes.src.value);
  imgPopup.querySelector(".img-popup__image").setAttribute("alt", evt.target.attributes.alt.value);
  imgPopup.querySelector(".img-popup__title").textContent = evt.target.parentNode.querySelector(".element__title").textContent;  imgPopupDisplayToggle();
}

imgPopupCloseBttn.addEventListener("click", imgPopupDisplayToggle);
