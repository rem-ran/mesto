

//константы попапа с данными пользователя
export const userPopup = document.querySelector(".popup_type_user")
export const inputUserName = userPopup.querySelector(".popup__input_type_username");
export const inputUserProfession = userPopup.querySelector(".popup__input_type_profession");


//константа попапа с добавлением новой карточки
export const cardPopup = document.querySelector(".popup_type_card");


//константа попапа с редактированием аватарки профиля
export const avatarPopup = document.querySelector(".popup_type_avatar");


//константа попапа с увеличенной картинкой
export const imagePopup = document.querySelector(".image-zoom");


//константы профиля пользователя
export const profile = document.querySelector(".profile");
export const profEditBtn = profile.querySelector(".profile__edit-btn");
export const cardAddBtn = profile.querySelector(".profile__add-btn");
export const profileAvatar = profile.querySelector(".profile__image");
export const avatarEditBtn = profile.querySelector(".profile__image-edit-btn");


//объект с нужными для валидации классами
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};