export default class FormValidator {
  constructor(form, formSelectors) {
    this._form = form;
    this._formSelectors = formSelectors;
  }

  _showErrorTootlit(input, errorTooltip) {
    errorTooltip.classList.add(this._formSelectors.errorClass);
    input.classList.add(this._formSelectors.inputErrorClass);
    errorTooltip.textContent = input.validationMessage;
  }

  _hideErrorTootlit(input, errorTooltip) {
    errorTooltip.classList.remove(this._formSelectors.errorClass);
    input.classList.remove(this._formSelectors.inputErrorClass);
    errorTooltip.textContent = "";
  }

  _checkingSelfValidity(input) {
    const errorTooltip = input.parentNode.querySelector(`#${input.id}-error`);

    if (!input.validity.valid) {
      this._showErrorTootlit(input, errorTooltip);
    } else {
      this._hideErrorTootlit(input, errorTooltip);
    }
  }

  _isAllInputsValid(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleFormButton(inputList, submitBttn) {
    if (this._isAllInputsValid(inputList)) {
      submitBttn.setAttribute("disabled", true);
    } else {
      submitBttn.removeAttribute("disabled");
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(
      this._form.querySelectorAll(this._formSelectors.inputSelector)
    );
    const formButton = this._form.querySelector(
      this._formSelectors.submitButtonSelector
    );

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkingSelfValidity(input);
        this._toggleFormButton(inputList, formButton);
      });
    });
  }
}
