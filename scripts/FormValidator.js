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

  setButtonDisable(bttn, disableFlag) {
    if (disableFlag) {
      bttn.setAttribute("disabled", true);
    } else {
      bttn.removeAttribute("disabled");
    }
  }

  _toggleFormButton(inputList, submitBttn) {
    if (this._isAllInputsValid(inputList)) {
      this.setButtonDisable(submitBttn, true);
    } else {
      this.setButtonDisable(submitBttn, false);
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputList = Array.from(
      this._form.querySelectorAll(this._formSelectors.inputSelector)
    );
    this._formButton = this._form.querySelector(
      this._formSelectors.submitButtonSelector
    );

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkingSelfValidity(input);
        this._toggleFormButton(this._inputList, this._formButton);
      });
    });
  }

  initialazeForm() {
    this._inputList.forEach((input) => {
      input.classList.remove("popup__input-text_invalid");
      input.parentNode
        .querySelector(`#${input.id}-error`)
        .classList.remove("popup__input-error_show");
    });
  }
}
