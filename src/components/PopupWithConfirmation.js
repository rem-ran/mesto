
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, handleSubmitForm) {
    super(popup);
    
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');

    this._saveBtn = this._popup.querySelector(".popup__save-btn");
  }

  
  open(data) {
    this._data = data;
    super.open();
  }


  renderLoadingBtn(buttonText) {
    this._saveBtn.textContent = buttonText;
  }


  setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._data);
    });

    super.setEventListeners();
  }
}