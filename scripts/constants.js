//массив с начальными карточками при загрузке страницы
const initialCards = [
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
const userPopup = document.querySelector(".popup_type_user")
const popupUserForm = userPopup.querySelector(".popup__form_type_user");
const popupSaveBtn = userPopup.querySelector(".popup__save-btn_type_user");
const inputUserName = userPopup.querySelector(".popup__input_type_username");
const inputUserProfession = userPopup.querySelector(".popup__input_type_profession");


//константы попапа с добавлением новой карточки
const cardPopup = document.querySelector(".popup_type_card")
const popupCardForm = document.querySelector(".popup__form_type_card");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_card-link");


//константы попапа увеличенной картинки
const imagePopup = document.querySelector(".image-zoom");
const zoomedCaption = document.querySelector(".image-zoom__caption");
const zoomedImage = document.querySelector(".image-zoom__image");


//константы профиля пользователя
const profile = document.querySelector(".profile");
const profEditBtn = profile.querySelector(".profile__edit-btn");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const cardAddBtn = profile.querySelector(".profile__add-btn");


//константы карточек
const cardSection = document.querySelector(".cards__container");
const cardTemplate = document.querySelector(".card-template").content;


//объект с нужными для валидации классами
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};