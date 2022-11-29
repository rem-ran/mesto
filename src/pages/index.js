//импортируем стили
import './index.css';


//импортируем константы
import {
  //массив с начальными карточками при загрузке страницы
  // initialCards,

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
const newApi = new Api(apiConfig);



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
const cardList = new Section ({

  renderer: (item, userId) => {

    const newCard = makeCard(item, userId)
    cardList.addItem(newCard);

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

  const card = new Card({

    data: cardData, 

    templateSelector: '.card-template', 

    handleImagePopup: (image) => { popupWithZoomedImage.open(image) },

    openConfirmPopup: () => { popupWithCardDeleteConfirm.open({
      id: cardData._id,
      handleSubmitForm: () => card.handleCardDelete()
    }) 
    },

    handleLikeClick: (likeMe) =>{

      if (!likeMe) {
        newApi.putLike(cardData._id)

          .then((result) => {
            card.setCardLike(result.likes.length);
          })

          .catch((error) => {
            console.log(`Ошибка при добавлении лайка: ${error}`);
          })

      } else {
        newApi.removeLike(cardData._id)

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

  popupSelector: userPopup,

  handleSubmitForm: (inputValue) => {

    popupUserEdit.renderLoadingBtn(true);
    
    newApi.updateServerUserInfo( {name: inputValue.name, about: inputValue.about} )

      .then((userData) => {
        userInfo.setUserInfo(userData);
      })

      .then(() => popupUserEdit.close())

      .catch((error) => {
        console.log(`Ошибка при обновлении данных пользоваетля: ${error}`);
      })

      .finally(() => {
        popupUserEdit.renderLoadingBtn(false);
      })
  }
});

//вешаем слушатели на экземпляр класса PopupWithForm
popupUserEdit.setEventListeners();




//создаём экземпляр класса PopupWithForm для добавления новой карточки
const popupCardAdd = new PopupWithForm({

  popupSelector: cardPopup,

  handleSubmitForm: (card) => {
    popupCardAdd.renderLoadingBtn(true, "Создание...", "Создать");
    newApi.addNewCard( {name: card.name, link: card.link} )

      .then((newCard) => {
        const newAdedCard = makeCard(newCard, newCard.owner._id);
        cardList.addItem(newAdedCard);
      })

      .then(() => popupCardAdd.close())
      
      .catch((error) => {
        console.log(`Ошибка при добавлении карточки: ${error}`);
      })

      .finally(() => {
        popupCardAdd.renderLoadingBtn(false, "Создание...", "Создать");
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

  popupSelector: avatarPopup,

  handleSubmitForm: (inputValue) => {

    popupAvatarEdit.renderLoadingBtn(true);

    newApi.updateServerUserAvatar( {avatar: inputValue.avatar } )
    .then((data) => {
      userInfo.setUserAvatar(data);
    })

    .then(() => popupAvatarEdit.close())

    .catch((error) => {
      console.log(`Ошибка при обновлении аватарки: ${error}`);
    })

    .finally(() => {
      popupAvatarEdit.renderLoadingBtn(false);
    })
  }
});

//вешаем слушатели на экземпляр класса popupAvatarEdit
popupAvatarEdit.setEventListeners();




//создаём экземпляр класса PopupWithConfirmation для подтверждения удаления своей карточки
const popupWithCardDeleteConfirm = new PopupWithConfirmation(

  confirmationPopup, 

  ({ id, handleSubmitForm }) => {
    popupWithCardDeleteConfirm.renderLoadingBtn(true, "Удаление...", "Да");
    newApi.deleteCard(id)
      .then(() => handleSubmitForm())

      .then(() => popupWithCardDeleteConfirm.close())

      .catch((error) => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      })

      .finally(() => {
        popupWithCardDeleteConfirm.renderLoadingBtn(false, "Удаление...", "Да");
      })
  }
);

//вешаем слушатели на экземпляр класса PopupWithConfirmation
popupWithCardDeleteConfirm.setEventListeners();




//вешаем "click" слушатель на кнопку добалвения новой карточки
profEditBtn.addEventListener("click", () => {

  popupUserEdit.open();

  inputUserName.value = userInfo.getUserInfo().name;
  inputUserProfession.value = userInfo.getUserInfo().about;

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



//загружаем информацию о пользователе и начальные карточки с сервера на начальный экран
newApi.getDataForInitialLoading()
  .then(argument => {
    const [userData, cards] = argument;
    const userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);

    cardList.renderItems(cards, userId);

  })

  .catch((error) => {
      console.log(`Ошибка при начальной загрузки информации с сервера: ${error}`);
  })

