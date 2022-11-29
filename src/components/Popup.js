
//класс универсального попапа
export default class Popup {
  constructor(popup) {
    
    this._popup = popup;

  }

  //метод открытия попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }


  //метод закрытия попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", this._handleEscClose);
  }


  //метод закрытия попапа по клавиши Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }


  //вешаем слушатель на кнопку-крестик для закрытия попапа
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-btn'))) {
        this.close();
      }
    })

  }

}