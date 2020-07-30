//#region Constants

let iOpenPopup;
//Глобальные переменные editPopup
const editPopup = document.querySelector(".popup-edit");
const editPopupOpenBttn = document.querySelector(".profile__edit-button");
const editPopupCloseBttn = editPopup.querySelector(".popup__close-icon");
const editPopupInputName = editPopup.querySelector(".edit-popup__input-text_type_name");
const editPopupInputJob = editPopup.querySelector(".edit-popup__input-text_type_job");
const editPopupForm = editPopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//Глобальные переменные addPopup
const addPopup = document.querySelector(".popup-add");
const addPopupOpenBttn = document.querySelector(".profile__add-button");
const addPopupCloseBttn = addPopup.querySelector(".popup__close-icon");
const addPopupInputName = addPopup.querySelector(".add-form__input-text_type_name");
const addPopupInputSrc = addPopup.querySelector(".add-form__input-text_type_src");
const addPopupForm = addPopup.querySelector(".popup__form");

//Глобальные переменные imgPopup
const imgPopup = document.querySelector(".popup-img");
const imgPopupCloseBttn = imgPopup.querySelector(".popup__close-icon");

//Глобальные переменные отдельных карточек
const elementsGrid = document.querySelector(".elements__img-grid");
const elementTemplate = document.querySelector("#template_element").content;

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
    name: 'Скалистые горы, Канада',
    img: 'https://images.unsplash.com/photo-1489363855452-7327672b1608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
    imgAlt: 'Канадские Скалистые горы.'
  },
  {
    name: 'Гижгит, Кабардино-Балкарская Республика',
    img: 'https://images.unsplash.com/photo-1572815117612-885a3e0288ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    imgAlt: 'Озеро Гижгит.'
  }
];

//#endregion

//#region Open-Close-Submit Popups

function EventClosePopupByEsc(evt){
    if (evt.key === 'Escape'){
      popupDisplayToggle(iOpenPopup);
    };
}

function setEventClosePopupOnEsc(popup){
  document.addEventListener('keydown', EventClosePopupByEsc);
}

function removeEventClosePopupOnEsc(popup){
  document.removeEventListener('keydown', EventClosePopupByEsc);
}

function popupDisplayToggle(popup){
  if (!popup.classList.contains('popup_opened')){
    popup.classList.add("popup_opened");
    iOpenPopup = popup;
    setEventClosePopupOnEsc(popup);
  } else {
    popup.classList.remove("popup_opened");
    iOpenPopup = null;
    removeEventClosePopupOnEsc(popup);
  }
}



//Проблема: если после провала валидации закрыть форму, то после её открытия ошибки остаются висеть + блокированна кнопка
//Решение: Можно просто вызывать функцию hideErrorTootlit(), но согласно требованию брифа я вынужден разделить js на 2 файла и её не видно
//Поэтому приходиться дублировать функциональность и приводить текстовые поля в значения по-умолчани и вручную принимать решение о разблокировки кнопки
function initialazeForm(form){
  Array.from(form.querySelectorAll('.popup__input-text')).forEach((input) =>{
    input.classList.remove('popup__input-text_invalid');
    input.parentNode.querySelector(`#${input.id}-error`).classList.remove('popup__input-error_show');
  });
}

//Ивенты editPopup
function editPopupOpen(){
  popupDisplayToggle(editPopup);
  editPopupInputName.value = profileName.textContent;
  editPopupInputJob.value = profileJob.textContent;

  initialazeForm(editPopupForm);

  const editPopupSubmitBttn = editPopupForm.querySelector('.popup__submit-button');
  if (editPopupInputName.value.length > 1 && editPopupInputJob.value.length > 1) {
    editPopupSubmitBttn.removeAttribute('disabled', false)
  } else {
    editPopupSubmitBttn.setAttribute('disabled', true);
  }
}

function editPopupSubmit(evt){
  profileName.textContent = editPopupInputName.value;
  profileJob.textContent = editPopupInputJob.value;
  popupDisplayToggle(editPopup);
}

editPopupOpenBttn.addEventListener("click", editPopupOpen);
editPopupCloseBttn.addEventListener("click", ()=>popupDisplayToggle(editPopup));
editPopupForm.addEventListener('submit', editPopupSubmit);

//Ивенты addPopup
function addPopupOpen(){
  popupDisplayToggle(addPopup);
  addPopupInputName.value = '';
  addPopupInputSrc.value = '';
  addPopupForm.querySelector('.popup__submit-button').setAttribute('disabled', true);

  initialazeForm(addPopupForm);
  setEventClosePopupOnEsc(addPopup);
}

function addPopupSubmit(evt){
  renderCard({name: addPopupInputName.value ? addPopupInputName.value : 'Неизвестное место',
              img: addPopupInputSrc.value,
              imgAlt: addPopupInputName.value ? addPopupInputName.value : 'Неизвестное место'
  });
  popupDisplayToggle(addPopup);
}

addPopupOpenBttn.addEventListener("click", addPopupOpen);
addPopupCloseBttn.addEventListener("click", ()=>popupDisplayToggle(addPopup));
addPopupForm.addEventListener('submit', addPopupSubmit);

//Ивенты imgPopup

function imgPopupOpen(evt){
  const imgPopupImage = imgPopup.querySelector(".popup__image");
  imgPopupImage.setAttribute("src", evt.target.attributes.src.value);
  imgPopupImage.setAttribute("alt", evt.target.attributes.alt.value);

  imgPopup.querySelector(".popup__img-subtitle").textContent = evt.target.parentNode.querySelector(".element__title").textContent;
  popupDisplayToggle(imgPopup);
}

imgPopupCloseBttn.addEventListener("click", ()=>popupDisplayToggle(imgPopup));


function addOnClickClosePopupEvents(){
  const popupList = Array.from( document.querySelectorAll('.popup') );
  popupList.forEach( (popup) => {
    popup.addEventListener('click', (evt) =>{
      if (evt.currentTarget === evt.target){
        popupDisplayToggle(popup);
      }
    });
  });
}

addOnClickClosePopupEvents();
//#endregion

//#region Cards Logic. Likes, delete and render new Cards
function elementMockImgOnError(evt){
  evt.target.src = 'https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
}

function elementLikeToggle(evt){
  evt.target.classList.toggle("element__like-icon_checked");
}

function removeParent(evt){
  evt.target.parentNode.remove();
}

function newDOMElementNewPlace(newPlace){
  const newElement = elementTemplate.cloneNode(true);
  const newElementTitle = newElement.querySelector(".element__title");
  newElementTitle.textContent = newPlace.name;
  newElementTitle.setAttribute("title", newPlace.name);

  const newElementImage = newElement.querySelector(".element__image");
  newElementImage.setAttribute("alt", newPlace.imgAlt);
  newElementImage.setAttribute("src", newPlace.img);
  newElementImage.onerror = elementMockImgOnError;
  newElementImage.addEventListener("click", imgPopupOpen);

  newElement.querySelector(".element__like-icon").addEventListener("click", elementLikeToggle);

  newElement.querySelector(".element__remove-icon").addEventListener("click", removeParent);
  return newElement;
}

function renderCard(newPlace){
  elementsGrid.prepend(newDOMElementNewPlace(newPlace));
}

initialCards.forEach(renderCard);
//#endregion

