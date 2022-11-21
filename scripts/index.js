//импортируем константы
import {
  //массив с начальными карточками при загрузке страницы
  initialCards,

  //константы попапа с данными пользователя
  userPopup,
  inputUserName,
  inputUserProfession,

  //константы попапа с добавлением новой карточки
  cardPopup,

  //константы профиля пользователя
  profEditBtn,
  cardAddBtn,

  //объект с нужными для валидации классами
  validationConfig

} from "./constants.js";

//импортируем класс карточки
import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import Section from "./Section.js";

import PopupWithForm from "./PopupWithForm.js";

import PopupWithImage from "./PopupWithImage.js";

import UserInfo from "./UserInfo.js";



//вызываем валидацию формы создания новой карточки
const cardFormValidator = new FormValidator(
  validationConfig, 
  cardPopup
);
cardFormValidator.enableValidation();


//вызываем валидвцию формы редактирования данных пользователя
const userFormValidator = new FormValidator(
  validationConfig, 
  userPopup
);
userFormValidator.enableValidation();



//метод отрисовки начальных карточкек в разметке
const cardList = new Section ({

  items: initialCards,

  renderer: (item) => {
    const newCard = makeCard(item)
    cardList.addItem(newCard);
  }

}, ".cards__container");


//метод создания одной карточки
const makeCard = (data) => {
  const card = new Card(data, '.card-template', (image) => {
    popupWithZoomedImage.open(image);
  });

  return card.createCard();
}


//выводим начальный массив карточек на экран при загрузке страницы
cardList.renderItems();



//создаём экземпляр класса PopupWithForm для попапа с вводом данных пользователя
const popupUserEdit = new PopupWithForm({

  popupSelector: ".popup_type_user",

  handleSubmitForm: (inputValue) => {
    userInfo.setUserInfo(inputValue);
  }
});

//вешаем слушатели на экземпляр класса PopupWithForm
popupUserEdit.setEventListeners();



//создаём экземпляр класса PopupWithForm для добавления новой карточки
const popupCardAdd = new PopupWithForm({

  popupSelector: ".popup_type_card",

  handleSubmitForm: (item) => {
    const newAdedCard = makeCard(item);
    cardList.addItem(newAdedCard);
  }
});

//вешаем слушатели на экземпляр класса PopupWithForm
popupCardAdd.setEventListeners();



//создаём экземпляр класса PopupWithImage
const popupWithZoomedImage = new PopupWithImage(".image-zoom");

//вешаем слушатели на экземпляр класса PopupWithImage
popupWithZoomedImage.setEventListeners();



//создаём экземпляр класса UserInfo и передаём в него нужные нам данные
const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__profession"
});



//вешаем слушатель на кнопку добалвения новой карточки
profEditBtn.addEventListener("click", () => {

  popupUserEdit.open();

  inputUserName.value = userInfo.getUserInfo().userName;
  inputUserProfession.value = userInfo.getUserInfo().userJob;

  userFormValidator.resetErrors();
});



//вешаем слушатель на кнопку редактирования профиля пользователя
cardAddBtn.addEventListener("click", () => {

  popupCardAdd.open();

  cardFormValidator.resetErrors();
});