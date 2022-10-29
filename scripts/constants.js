//массив с начальными карточками при загрузке страницы
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//константы попапа с данными пользователя
export const userPopup = document.querySelector(".popup_type_user")
export const popupUserForm = userPopup.querySelector(".popup__form_type_user");
export const popupUserSaveButton = userPopup.querySelector(".popup__save-btn_type_user");
export const inputUserName = userPopup.querySelector(".popup__input_type_username");
export const inputUserProfession = userPopup.querySelector(".popup__input_type_profession");


//константы попапа с добавлением новой карточки
export const cardPopup = document.querySelector(".popup_type_card")
export const popupCardForm = cardPopup.querySelector(".popup__form_type_card");
export const inputCardName = cardPopup.querySelector(".popup__input_type_card-name");
export const inputCardLink = cardPopup.querySelector(".popup__input_type_card-link");
export const popupCardSaveButton = cardPopup.querySelector(".popup__save-btn_type_card");


//константы попапа увеличенной картинки
export const imagePopup = document.querySelector(".image-zoom");
export const zoomedCaption = imagePopup.querySelector(".image-zoom__caption");
export const zoomedImage = imagePopup.querySelector(".image-zoom__image");


//константы профиля пользователя
export const profile = document.querySelector(".profile");
export const profEditBtn = profile.querySelector(".profile__edit-btn");
export const profileName = profile.querySelector(".profile__name");
export const profileProfession = profile.querySelector(".profile__profession");
export const cardAddBtn = profile.querySelector(".profile__add-btn");


//константы карточек
export const cardSection = document.querySelector(".cards__container");
export const cardTemplate = document.querySelector(".card-template").content;


//объект с нужными для валидации классами
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const inputUserList = Array.from(userPopup.querySelectorAll('.popup__input'));

export const inputCardList = Array.from(cardPopup.querySelectorAll('.popup__input'));

