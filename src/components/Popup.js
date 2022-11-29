
//класс универсального попапа
export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;

    this._saveBtn = popupSelector.querySelector(".popup__save-btn");
    // this._saveBtnInitialTxt = "Сохранить";
    // this._saveBtnLodingTxt = "Сохранение...";
  }

  //метод открытия попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }


  //метод закрытия попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }


  //метод закрытия попапа по клавиши Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }


  renderLoadingBtn(isLoading, loadingTxt = "Сохранение...", finalTxt = "Сохранить") {
    if (isLoading) {
      this._saveBtn.textContent = loadingTxt;
    } else {
      this._saveBtn.textContent = finalTxt;
    }
  }


  //вешаем слушатель на кнопку-крестик для закрытия попапа
  setEventListeners() {
    this._popupSelector.addEventListener("click", (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-btn'))) {
        this.close();
      }
    })

  }

}