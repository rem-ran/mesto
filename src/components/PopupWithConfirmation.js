
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  open(data) {
    this._data = data;
    super.open();
  }

  setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._data);
    });

    super.setEventListeners();
  }
}