
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    
    this._form = this._popup.querySelector('.popup__form');

    this._saveBtn = this._popup.querySelector(".popup__save-btn");
  }

  setCallback(submitClbk) {
    this._handleSubmitForm = submitClbk;
  }

  open() {
    super.open();
  }


  renderLoadingBtn(buttonText) {
    this._saveBtn.textContent = buttonText;
  }


  setEventListeners() {

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    });

    super.setEventListeners();
  }
}