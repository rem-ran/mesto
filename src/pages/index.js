//импортируем стили
import './index.css';

//импортируем константы
import {
  //массив с начальными карточками при загрузке страницы
  initialCards,

  //константы попапа с данными пользователя
  userPopup,
  inputUserName,
  inputUserProfession,

  //константа попапа с добавлением новой карточки
  cardPopup,

  //константа попапа с редактированием аватарки профиля
  avatarPopup,

  //константы профиля пользователя
  profEditBtn,
  cardAddBtn,
  avatarEditBtn,
  profileAvatar,

  //объект с нужными для валидации классами
  validationConfig

} from "../utils/constants.js";

//импортируем классы
import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import UserInfo from "../components/UserInfo.js";



//создаём экземпляр класса FormValidator для попапа с добавлением карточки
const cardFormValidator = new FormValidator(
  validationConfig, 
  cardPopup
);

//вызываем валидацию формы создания новой карточки
cardFormValidator.enableValidation();


//создаём экземпляр класса FormValidator для попапа с редактированием данных пользователя
const userFormValidator = new FormValidator(
  validationConfig, 
  userPopup
);

//вызываем валидацию формы редактирования данных пользователя
userFormValidator.enableValidation();


//создаём экземпляр класса FormValidator для попапа с редактированием аватарки пользователя
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarPopup
);

//вызываем валидацию формы редактирования аватарки пользователя
avatarFormValidator.enableValidation();



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



//создаём экземпляр класса PopupWithForm редактирования аватарки пользователя
const popupAvatarEdit = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleSubmitForm: (link) => {
    profileAvatar.src = link.avatar;
  }
});

//вешаем слушатели на экземпляр класса popupAvatarEdit
popupAvatarEdit.setEventListeners();



//вешаем "click" слушатель на кнопку добалвения новой карточки
profEditBtn.addEventListener("click", () => {

  popupUserEdit.open();

  inputUserName.value = userInfo.getUserInfo().userName;
  inputUserProfession.value = userInfo.getUserInfo().userJob;

  userFormValidator.resetErrors();
});



//вешаем "click" слушатель на кнопку редактирования профиля пользователя
cardAddBtn.addEventListener("click", () => {

  popupCardAdd.open();

  cardFormValidator.resetErrors();
});



//вешаем "click" слушатель на кнопку редактирования аватарки профиля
avatarEditBtn.addEventListener("click", () => {

  popupAvatarEdit.open();

  avatarFormValidator.resetErrors();
});