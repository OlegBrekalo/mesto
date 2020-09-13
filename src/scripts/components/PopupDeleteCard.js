import PopupWithForm from "./PopupWithForm.js";

export default class PopupDeleteCardForm extends PopupWithForm {

  open(deletedCard, parentNode){
    this.deletedCard = deletedCard;
    this.parentNode = parentNode;
    super.open();
  }
}
