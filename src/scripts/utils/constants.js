//массив с начальными карточками при загрузке страницы
export const initialCards = [
  {
    cardName: 'Архыз',
    imgLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    cardName: 'Челябинская область',
    imgLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    cardName: 'Иваново',
    imgLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    cardName: 'Камчатка',
    imgLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    cardName: 'Холмогорский район',
    imgLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    cardName: 'Байкал',
    imgLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//константы попапа с данными пользователя
export const userPopup = document.querySelector(".popup_type_user")
export const inputUserName = userPopup.querySelector(".popup__input_type_username");
export const inputUserProfession = userPopup.querySelector(".popup__input_type_profession");


//константы попапа с добавлением новой карточки
export const cardPopup = document.querySelector(".popup_type_card");


//константы профиля пользователя
export const profile = document.querySelector(".profile");
export const profEditBtn = profile.querySelector(".profile__edit-btn");
export const cardAddBtn = profile.querySelector(".profile__add-btn");


//объект с нужными для валидации классами
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};