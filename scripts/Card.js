//класс карточки с картинкой 
class Card {


  constructor(data, templateSelector, zoomImgFunc) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._zoomImgFunc = zoomImgFunc;
  }


  //находим тэмплэйт карточки в разметке и клонируем его
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);
    
    return cardElement;
  }


  //метод создания новой карточки без добавления её в разметку
  createCard() {
    this._element = this._getTemplate();
    this._setListenersForCard();

    const cardName = this._element.querySelector('.card__heading');
    cardName.textContent = this._name;

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }


  //вешаем слушатели на карточку
  _setListenersForCard() {


    //слушатель лайка карточки
    const likeBtn = this._element.querySelector(".card__like-btn");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("card__like-btn_active");
    });
  

    //слушатель удаления карточки
    const deleteBtn = this._element.querySelector(".card__delete-btn");
    deleteBtn.addEventListener("click", (event) => {
        event.target.closest(".card").remove();
    });


    //слушатель открытия попапа с увеличенной картинкой карточки
    const imagePopup = this._element.querySelector(".card__image");
    imagePopup.addEventListener("click", this._zoomImgFunc);
  }

}