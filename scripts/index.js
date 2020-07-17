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


function popupDisplayToggle(popup){
  popup.classList.toggle("popup_opened");
}

//Ивенты editPopup
function editPopupOpen(){
  popupDisplayToggle(editPopup);
  editPopupInputName.value = profileName.textContent;
  editPopupInputJob.value = profileJob.textContent;
}

function editPopupSubmit(evt){
  evt.preventDefault();
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
}

function addPopupSubmit(evt){
  evt.preventDefault();
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

//Логика карточек
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

//Инициализация значений по-умолчанию
initialCards.forEach(renderCard);
