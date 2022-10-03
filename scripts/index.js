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

const userPopup = document.querySelector(".popup_type_user")
const popupUserForm = userPopup.querySelector(".popup__form_type_user");
const popupSaveBtn = userPopup.querySelector(".popup__save-btn_type_user");
const inputUserName = userPopup.querySelector(".popup__input_type_username");
const inputUserProfession = userPopup.querySelector(".popup__input_type_profession");

const closeButtons = document.querySelectorAll('.popup__close-btn');

const cardPopup = document.querySelector(".popup_type_card")
const popupCardForm = document.querySelector(".popup__form_type_card");

const imagePopup = document.querySelector(".image-zoom");
const zoomedCaption = document.querySelector(".image-zoom__caption");
const zoomedImage = document.querySelector(".image-zoom__image");

const profile = document.querySelector(".profile");
const profEditBtn = profile.querySelector(".profile__edit-btn");
const profileName = profile.querySelector(".profile__name");
const profileProfession = profile.querySelector(".profile__profession");
const cardAddBtn = profile.querySelector(".profile__add-btn");

const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_card-link");

const cardSection = document.querySelector(".cards__container");
const cardTemplate = document.querySelector(".card-template").content;


function renderCardsFromInitialArray() {
  initialCards.forEach(renderCard);
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__heading').textContent = item.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  setListenersForCard(cardElement);
  return cardElement;
}

function renderCard(el) {
  const newCard = createCard(el)
  cardSection.appendChild(newCard);
}

//кнопки на каждой карточке
function setListenersForCard(el) {
  const likeBtn = el.querySelector(".card__like-btn");
  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-btn_active");
  });

  const deleteBtn = el.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", deleteCard);

  const imagePopup = el.querySelector(".card__image");
  imagePopup.addEventListener("click", openImagePopup);
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
}

//закрытие всех попапов по крестику
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  button.removeEventListener('click', () => closePopup(popup));
});

function closePopupByEsc(evt) {
  if (evt.key = "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}



//открытие попапа с картинкой по клику
function openImagePopup(event) {
  openPopup(imagePopup);
  const cardImage = event.target.closest('.card');
  const currentImageText = cardImage.querySelector(".card__heading").textContent;
  zoomedCaption.textContent = currentImageText;

  const cardImageSrc = cardImage.querySelector(".card__image").src;
  const currentZoomedImage = zoomedImage;
  currentZoomedImage.src = cardImageSrc;
  currentZoomedImage.alt = currentImageText;
}

renderCardsFromInitialArray();

const openUserPopup = () => {
  openPopup(userPopup);
    inputUserName.value = profileName.textContent;
    inputUserProfession.value = profileProfession.textContent;
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value ;
  profileProfession.textContent = inputUserProfession.value ;
  closePopup(userPopup);
}

// создание карточки с 2 аргументами
function addCard(cardName, cardLink) {
  const item = { name: cardName, link: cardLink };
  const newCard = createCard(item);
  cardSection.prepend(newCard);
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addCard(inputCardName.value, inputCardLink.value);
  evt.target.reset()
  closePopup(cardPopup);
}

popupCardForm.addEventListener('submit', handleCardFormSubmit);

popupUserForm.addEventListener('submit', handleProfileFormSubmit);

profEditBtn.addEventListener("click", openUserPopup);

cardAddBtn.addEventListener("click", () => openPopup(cardPopup));
