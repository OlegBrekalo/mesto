//Инициализация значений по-умолчанию
const initialCards = [
  {
    name: 'Аляска, США',
    img: '../images/card-image_usa.jpg',
    imgAlt: 'Горная долина Аляска, США.'
  },
  {
    name: 'Сельяландсфосс, Исландия',
    img: '../images/card-image_iceland.jpg',
    imgAlt: 'Водопад Сельяландсфосс, Исландия.'
  },
  {
    name: 'Пассо Ролле, Италия',
    img: '../images/card-image_italy.jpg',
    imgAlt: 'Перевал Пассо Ролле, Италия.'
  },
  {
    name: 'Лофотенские острова, Норвегия',
    img: '../images/card-img_norway.jpg',
    imgAlt: 'Лофотенские острова, Норвегия.'
  },
  {
    name: 'Южный остров, Новая Зеландия',
    img: '../images/card-image_new-zealand.jpg',
    imgAlt: 'Горный ледник на Южном острове Новой Зеландии.'
  },
  {
    name: 'Гижгит, Кабардино-Балкарская Республика',
    img: '../images/card-image_russia.jpg',
    imgAlt: 'Озеро Гижгит.'
  }
];

function elementLikeToggle(evt){
  evt.target.classList.toggle("element__like-icon_checked");
}

function elementMockImgOnError(evt){
  evt.target.src = '../images/card-image_unknown.jpg';
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
  newElement.querySelector(".element__like-icon").addEventListener("click", elementLikeToggle);
  newElement.querySelector(".element__remove-icon").addEventListener("click", removeParent);

  elementsGrid.prepend(newElement);
}

const elementsGrid = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template_element").content;

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

function editPopupDisplayToggle(){
  editPopup.classList.toggle("popup-edit_opened");
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

function addPopupDisplayToggle(){
  addPopup.classList.toggle("popup-add_opened");
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
