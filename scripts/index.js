//Ивенты кнопок
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

//Инициализация значений по-умолчанию
const initialCards = [
  {
      name: 'Гижгит, Кабардино-Балкарская Республика',
      img: '../images/card-image_russia.jpg',
      imgAlt: 'Озеро Гижгит.'
  },
  {
    name: 'Южный остров, Новая Зеландия',
    img: '../images/card-image_new-zealand.jpg',
    imgAlt: 'Горный ледник на Южном острове Новой Зеландии.'
  },
  {
      name: 'Лофотенские острова, Норвегия',
      img: '../images/card-img_norway.jpg',
      imgAlt: 'Лофотенские острова, Норвегия.'
  },
  {
    name: 'Пассо Ролле, Италия',
    img: '../images/card-image_italy.jpg',
    imgAlt: 'Перевал Пассо Ролле, Италия.'
  },
  {
      name: 'Сельяландсфосс, Исландия',
      img: '../images/card-image_iceland.jpg',
      imgAlt: 'Водопад Сельяландсфосс, Исландия.'
  },
  {
    name: 'Аляска, США',
    img: '../images/card-image_usa.jpg',
    imgAlt: 'Горная долина Аляска, США.'
  }
];

const elementsGrid = document.querySelector(".elements");
const elementTemplate = document.querySelector(".template_element").content;

initialCards.forEach(function (init){
  const newElement = elementTemplate.cloneNode(true);

  newElement.querySelector(".element__title").textContent = init.name;
  newElement.querySelector(".element__title").setAttribute("title", init.name);
  newElement.querySelector(".element__image").setAttribute("src",init.img);
  newElement.querySelector(".element__image").setAttribute("alt",init.imgAlt);

  elementsGrid.append(newElement);
});
