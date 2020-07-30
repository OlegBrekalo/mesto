const showErrorTootlit = (input, errorTooltip, parameters) => {
  errorTooltip.classList.add(parameters.errorClass);
  input.classList.add(parameters.inputErrorClass);
  errorTooltip.textContent = input.validationMessage;
};

const hideErrorTootlit = (input, errorTooltip, parameters) => {
  errorTooltip.classList.remove(parameters.errorClass);
  input.classList.remove(parameters.inputErrorClass);
  errorTooltip.textContent = '';
};

//Ивент поля ввода для проверки собственно валидности и переключения видимости ошибки и стиля ошибки ввода
const checkingSelfValidity = (input, parameters) =>{
  const errorTooltip = input.parentNode.querySelector(`#${input.id}-error`);

  if (!input.validity.valid){
    showErrorTootlit(input, errorTooltip, parameters);
  } else {
    hideErrorTootlit(input, errorTooltip, parameters);
  };
};

//Пробег по всем флагам валидности
//Не слишком эфекивно при каждом вводе проверять все, но я не вижу оптимального решения
const isAllInputsValid = (inputList) =>{
  return inputList.some((input)=>{
    return !input.validity.valid;
  });
};

//Переключение доступности кнопки, стиль меняется в .button:disabled
const toggleFormButton = (inputList, submitBttn) => {
  if (isAllInputsValid(inputList)){
    submitBttn.setAttribute('disabled', true);
  } else {
    submitBttn.removeAttribute('disabled')
  }
};

//Универсальная функция для включения валидации для всех полей всех форм
const enableValidation = (parameters) => {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach( (form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(parameters.inputSelector));
    const formButton = form.querySelector(parameters.submitButtonSelector);

    //Валидирование поля ввода на каждом инпуте + проверка возможности активации кнопки
    inputList.forEach( (input) => {
      input.addEventListener('input', () =>{
        checkingSelfValidity(input, parameters);
        toggleFormButton(inputList, formButton);
      });

    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input-text_invalid',
  errorClass: 'popup__input-error_show'
});
