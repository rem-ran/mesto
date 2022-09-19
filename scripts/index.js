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

const cards = document.querySelector(".cards__container");
const cardTemplate = document.querySelector(".card-template").content;

initialCards.forEach(function (el) {
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.card__heading').textContent = el.name;
  newCard.querySelector('.card__image').src = el.link;
  newCard.querySelector('.card__image').alt = el.name;

  cards.append(newCard)
})


const popup = document.querySelector(".popup");
const userPopup = document.querySelector(".popup_type_user")
const profCloseBtn = popup.querySelector(".popup__close-btn_type_user");
const popupUserForm = popup.querySelector(".popup__form_type_user");
const popupSaveBtn = popup.querySelector(".popup__save-btn_type_user");
const inputName = popup.querySelector(".popup__input_type_name");
const inputProfession = popup.querySelector(".popup__input_type_profession");

const cardPopup = document.querySelector(".popup_type_card")
const popupCardForm = popup.querySelector(".popup__form_type_card");
const cardPopupCloseBtn = document.querySelector(".popup__close-btn_type_card");

const profile = document.querySelector(".profile");
const profEditBtn = profile.querySelector(".profile__edit-btn");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const cardAddBtn = profile.querySelector(".profile__add-btn");

const card = document.querySelector(".card");
const cardLikeBtn = card.querySelector(".card__like-btn")
const cardActive = cardLikeBtn.querySelector(".card__like-btn_active");


let openCloseUserPopup = () => {
  userPopup.classList.toggle("popup_opened");
  if (userPopup.classList.contains("popup_opened") === true) {
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
  }
}

let openCloseCardPopup = () => {
  cardPopup.classList.toggle("popup_opened");
}



function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value ;
  profileProfession.textContent = inputProfession.value ;
  openCloseUserPopup();
}

popupUserForm.addEventListener('submit', formSubmitHandler);

profEditBtn.addEventListener("click", openCloseUserPopup);

profCloseBtn.addEventListener("click", openCloseUserPopup);

cardAddBtn.addEventListener("click", openCloseCardPopup);

cardPopupCloseBtn.addEventListener("click", openCloseCardPopup);



// cardLikeBtn.forEach(item => {
//   item.addEventListener('click', function (evt) {
//     evt.target.classList.toggle("card__like-btn_active");
//   });
// });
