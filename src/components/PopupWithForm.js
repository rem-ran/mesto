
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor ({popup, handleSubmitForm}) {
    super(popup);
    
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');

    this._saveBtn = this._popup.querySelector(".popup__save-btn");
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


  renderLoadingBtn(buttonText) {
    this._saveBtn.textContent = buttonText;
  }


  setEventListeners() {
    
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });

    super.setEventListeners();
  }
}