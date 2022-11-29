//импортируем стили
import './index.css';


//импортируем константы
import {
  
  //константы попапа с данными пользователя
  userPopup,
  inputUserName,
  inputUserProfession,

  //константа попапа с добавлением новой карточки
  cardPopup,

  //константа попапа с редактированием аватарки профиля
  avatarPopup,

  //константа попапа с увеличенной картинкой
  imagePopup,

  confirmationPopup,

  //константы профиля пользователя
  profEditBtn,
  cardAddBtn,
  avatarEditBtn,
  profileAvatar,
  profileName,
  profileProfession,

  //объект с нужными для валидации классами
  validationConfig,

  //объект с нужными для работы с сервером данными
  apiConfig

} from "../utils/constants.js";


//импортируем классы
import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import UserInfo from "../components/UserInfo.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import Api from "../components/Api.js"



//создаём экземпляр класса Api для работы с сервером
const api = new Api(apiConfig);



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



// метод отрисовки начальных карточкек в разметке
const cardSection = new Section ({

  renderer: (item) => {

    const userData = userInfo.getUserInfo();

    const newCard = makeCard(item, userData._id)

    cardSection.addItemLast(newCard);

  }

}, ".cards__container");



//создаём экземпляр класса UserInfo и передаём в него нужные нам данные
const userInfo = new UserInfo({
  name: profileName,
  about: profileProfession,
  avatar: profileAvatar
});



// метод создания одной карточки
const makeCard = (cardData, userId) => {

  const handleDeleteCard = () =>  {

    popupWithCardDeleteConfirm.renderLoadingBtn("Удаление...");
    
    api.deleteCard(cardData._id)
      .then(() => card.handleCardDelete())
  
      .then(() => popupWithCardDeleteConfirm.close())
  
      .catch((error) => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      })
  
      .finally(() => {
        popupWithCardDeleteConfirm.renderLoadingBtn("Да");
      })
  }

  const card = new Card({

    data: cardData, 

    templateSelector: '.card-template', 

    handleImageClick: (image) => { popupWithZoomedImage.open(image) },

    handleDeleteClick: () => { 
      popupWithCardDeleteConfirm.open(),

      popupWithCardDeleteConfirm.setCallback(handleDeleteCard)

    },

    handleLikeClick: (likeMe) =>{

      if (!likeMe) {
        api.putLike(cardData._id)

          .then((result) => {
            card.setCardLike(result.likes.length);
          })

          .catch((error) => {
            console.log(`Ошибка при добавлении лайка: ${error}`);
          })

      } else {
        api.removeLike(cardData._id)

          .then((result) => {
            card.removeCardLike(result.likes.length);
          })

          .catch((error) => {
            console.log(`Ошибка при удалении лайка: ${error}`);
          })

      }
    }

}, userId );

  return card.createCard();
}




//создаём экземпляр класса PopupWithForm для попапа с вводом данных пользователя
const popupUserEdit = new PopupWithForm({

  popup: userPopup,

  handleSubmitForm: (inputValue) => {

    popupUserEdit.renderLoadingBtn("Сохранение...");
    
    api.updateServerUserInfo( {name: inputValue.name, about: inputValue.about} )

      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupUserEdit.close();
      })

      .catch((error) => {
        console.log(`Ошибка при обновлении данных пользоваетля: ${error}`);
      })

      .finally(() => {
        popupUserEdit.renderLoadingBtn("Сохранить");
      })
  }
});

//вешаем слушатели на экземпляр класса PopupWithForm
popupUserEdit.setEventListeners();




//создаём экземпляр класса PopupWithForm для добавления новой карточки
const popupCardAdd = new PopupWithForm({

  popup: cardPopup,

  handleSubmitForm: (card) => {
    popupCardAdd.renderLoadingBtn("Создание...");
    api.addNewCard( {name: card.name, link: card.link} )

      .then((newCard) => {
        const newAddedCard = makeCard(newCard, newCard.owner._id);
        cardSection.addItemFirst(newAddedCard);
        popupCardAdd.close();
      })
      
      .catch((error) => {
        console.log(`Ошибка при добавлении карточки: ${error}`);
      })

      .finally(() => {
        popupCardAdd.renderLoadingBtn("Создать");
      })
  }
});

//вешаем слушатели на экземпляр класса PopupWithForm
popupCardAdd.setEventListeners();





//создаём экземпляр класса PopupWithImage
const popupWithZoomedImage = new PopupWithImage(imagePopup);

//вешаем слушатели на экземпляр класса PopupWithImage
popupWithZoomedImage.setEventListeners();





//создаём экземпляр класса PopupWithForm редактирования аватарки пользователя
const popupAvatarEdit = new PopupWithForm({

  popup: avatarPopup,

  handleSubmitForm: (inputValue) => {

    popupAvatarEdit.renderLoadingBtn("Сохранение...");

    api.updateServerUserAvatar( {avatar: inputValue.avatar } )
    .then((data) => {
      userInfo.setUserAvatar(data);
      popupAvatarEdit.close();
    })

    .catch((error) => {
      console.log(`Ошибка при обновлении аватарки: ${error}`);
    })

    .finally(() => {
      popupAvatarEdit.renderLoadingBtn("Сохранить");
    })
  }
});

//вешаем слушатели на экземпляр класса popupAvatarEdit
popupAvatarEdit.setEventListeners();





//создаём экземпляр класса PopupWithConfirmation для подтверждения удаления своей карточки
const popupWithCardDeleteConfirm = new PopupWithConfirmation(
  confirmationPopup 
);

//вешаем слушатели на экземпляр класса PopupWithConfirmation
popupWithCardDeleteConfirm.setEventListeners();



//метод открытия попапа с данными пользователя
function handleUserPopupOpening() {
  popupUserEdit.open();

  const userData = userInfo.getUserInfo();
  inputUserName.value = userData.name;
  inputUserProfession.value = userData.about;

  userFormValidator.resetErrors();
}

//вешаем "click" слушатель на кнопку редактирования профиля пользователя
profEditBtn.addEventListener("click", handleUserPopupOpening);



//метод открытия попапа с добавлением новой карточки
function handleCardPopupOpening() {
  popupCardAdd.open();

  cardFormValidator.resetErrors();
}

//вешаем "click" слушатель на кнопку добалвения новой карточки
cardAddBtn.addEventListener("click", handleCardPopupOpening);



//метод открытия попапа с обновлением аватарки
function handleAvatarPopupOpening() {
  popupAvatarEdit.open();

  avatarFormValidator.resetErrors();
}

//вешаем "click" слушатель на кнопку редактирования аватарки профиля
avatarEditBtn.addEventListener("click", handleAvatarPopupOpening);



//загружаем информацию о пользователе и начальные карточки с сервера на начальный экран
api.getDataForInitialLoading()
  .then(([userData, cards]) => {

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData);

    cardSection.renderItems(cards);

  })

  .catch((error) => {
      console.log(`Ошибка при начальной загрузки информации с сервера: ${error}`);
  })

