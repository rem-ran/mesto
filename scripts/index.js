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

function render() {
  initialCards.forEach(renderCard);
}

function renderCard(el) {
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.card__heading').textContent = el.name;
  newCard.querySelector('.card__image').src = el.link;
  newCard.querySelector('.card__image').alt = el.name;
  setListenersForCard(newCard);
  cards.appendChild(newCard);
}

function setListenersForCard(el) {
  const likeBtn = el.querySelector(".card__like-btn");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-btn_active");
  });
  const deleteBtn = el.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", cardDelete);
}

function cardDelete(event) {
  event.target.closest(".card").remove();
}

render();

const popup = document.querySelector(".popup");
const userPopup = document.querySelector(".popup_type_user")
const profCloseBtn = popup.querySelector(".popup__close-btn_type_user");
const popupUserForm = popup.querySelector(".popup__form_type_user");
const popupSaveBtn = popup.querySelector(".popup__save-btn_type_user");
const inputUserName = popup.querySelector(".popup__input_type_username");
const inputUserProfession = popup.querySelector(".popup__input_type_profession");

const cardPopup = document.querySelector(".popup_type_card")
const popupCardForm = popup.querySelector(".popup__form_type_card");
const cardPopupCloseBtn = document.querySelector(".popup__close-btn_type_card");
const inputCardName = popup.querySelector(".popup__input_type_card-name");
const inputCardLink = popup.querySelector(".popup__input_type_card-link");

const profile = document.querySelector(".profile");
const profEditBtn = profile.querySelector(".profile__edit-btn");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const cardAddBtn = profile.querySelector(".profile__add-btn");


const openCloseUserPopup = () => {
  userPopup.classList.toggle("popup_opened");
  if (userPopup.classList.contains("popup_opened") === true) {
    inputUserName.value = profileName.textContent;
    inputUserProfession.value = profileProfession.textContent;
  }
}

const openCloseCardPopup = () => {
  cardPopup.classList.toggle("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value ;
  profileProfession.textContent = inputUserProfession.value ;
  openCloseUserPopup();
}

// function renderUserCard() {
//   const newCard = cardTemplate.cloneNode(true);
//   newCard.querySelector('.card__heading').textContent = inputCardName.value;
//   newCard.querySelector('.card__image').src = inputCardLink.value;
//   newCard.querySelector('.card__image').alt = inputCardName.value;
//   cards.appendChild(newCard)
// }

// function formSubmitCard (evt) {
//   evt.preventDefault();
//   const newCard = cardTemplate.cloneNode(true);
//   newCard.querySelector('.card__heading').textContent = inputCardName.value;
//   newCard.querySelector('.card__image').src = inputCardLink.value;
//   newCard.querySelector('.card__image').alt = inputCardName.value;
//   cards.appendChild(newCard)
//   openCloseUserPopup();
// }

popupUserForm.addEventListener('submit', formSubmitHandler);

// popupCardForm.addEventListener('submit', formSubmitCard);

profEditBtn.addEventListener("click", openCloseUserPopup);

profCloseBtn.addEventListener("click", openCloseUserPopup);

cardAddBtn.addEventListener("click", openCloseCardPopup);

cardPopupCloseBtn.addEventListener("click", openCloseCardPopup);


