//класс карточки с картинкой 
export default class Card {

  constructor(data, templateSelector, handleImagePopup) {
    this._name = data.cardName;
    this._link = data.imgLink;
    this._templateSelector = templateSelector;
    this._handleImagePopup = handleImagePopup;
  }


  //находим тэмплэйт карточки в разметке и клонируем его
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector(".card")
    .cloneNode(true);
    
    return cardElement;
  }
  

  //метод создания новой карточки без добавления её в разметку
  createCard() {
    this._element = this._getTemplate();

    const cardName = this._element.querySelector('.card__heading');
    cardName.textContent = this._name;

    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;


    this._likeBtn = this._element.querySelector(".card__like-btn");

    this._deleteBtn = this._element.querySelector(".card__delete-btn");

    this._setListenersForCard();

    return this._element;
  }


  //метод постановки и снятия лайка
  _handleCardeLike() {
    this._likeBtn.classList.toggle("card__like-btn_active");
  }


  //метод удаления карточки
  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }


  //метод открытия попапа с картинкой
  _openImagePopup() {
    this._handleImagePopup({
      link: this._link,
      name: this._name
    });
  }


  //вешаем слушатели на карточку
  _setListenersForCard() {

    //слушатель лайка карточки
    this._likeBtn.addEventListener("click", () => {
      this._handleCardeLike();
    });

    //слушатель удаления карточки
    this._deleteBtn.addEventListener("click", () => {
      this._handleCardDelete();
    });

    //слушатель открытия попапа с увеличенной картинкой карточки
    this._cardImage.addEventListener("click", () => {
      this._openImagePopup()
    });
  
  }

}