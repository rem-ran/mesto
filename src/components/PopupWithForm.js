
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, handleSubmitForm}) {
    super(popupSelector);
    
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};

    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }


  close() {
    this._form.reset()
    super.close();
  }


  setEventListeners() {
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });

    super.setEventListeners();
  }
}