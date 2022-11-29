//класс карточки с картинкой 
export default class Card {

  constructor({data, templateSelector, handleImagePopup, openConfirmPopup, handleLikeClick }, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likeAmount = data.likes;
    this._cardOwnerId = data.owner._id;

    this._templateSelector = templateSelector;

    this._handleImagePopup = handleImagePopup;

    this._openConfirmPopup = openConfirmPopup;

    this._handleLikeClick = handleLikeClick;

    this._myId = userId;
    
    //провермяем есть ли в списке лайков карточки мой лайк
    this._myLike = Boolean(this._likeAmount.find(like => like._id === this._myId));

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


    this._likeCounter = this._element.querySelector(".card__like-counter");


    //если у карточки нет лайков, то 0 не отображаем
    if (this._likeAmount.length > 0){
      this._likeCounter.textContent = this._likeAmount.length;
    }
    
    this._handleDeleteBtnIcon();

    if (this._myLike) {
      this._likeBtn.classList.add("card__like-btn_active");
    }

    this._setListenersForCard();


    return this._element;
  }


  //метод удаления иконки корзины с карточек, которые не мои
  _handleDeleteBtnIcon() {
    if(this._myId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }


  //метод постановки и снятия лайка
  _handleCardeLike() {
    this._handleLikeClick(this._myLike);
  }


  //метод удаления карточки
  handleCardDelete() {
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


  //метод постановки лайка карточке
  setCardLike(likeAmount) {
    this._likeBtn.classList.add("card__like-btn_active");

    this._likeCounter.textContent = likeAmount;

    this._myLike = true;
}


//метод снятия лайка с карточки
  removeCardLike(likeAmount) {
    this._likeBtn.classList.remove("card__like-btn_active");
    
    //если количество лайков карточки становится 0, то 0 не отображаем
    if (likeAmount === 0) {
      this._likeCounter.textContent = "";
    } else {
      this._likeCounter.textContent = likeAmount;
    }

    this._myLike = false;
  }


  //вешаем слушатели на карточку
  _setListenersForCard() {

    //слушатель лайка карточки
    this._likeBtn.addEventListener("click", () => {
      this._handleCardeLike();
    });

    //слушатель удаления карточки
    this._deleteBtn.addEventListener("click", () => {
      this._openConfirmPopup();
    });

    //слушатель открытия попапа с увеличенной картинкой карточки
    this._cardImage.addEventListener("click", () => {
      this._openImagePopup()
    });
  
  }

}