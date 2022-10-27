//метод отрисовки карточки в разметке
function renderCard(item) {
  const card = new Card(item, '.card-template', openImagePopup);
  const cardElement = card.createCard();
  cardSection.prepend(cardElement);
}

//метод создания начальных карточек из массива "initialCards"
function renderCardsFromInitialArray() {
  initialCards.reverse().forEach(renderCard);
}

//выводим начальный массив карточек на экран при загрузке страницы
renderCardsFromInitialArray();




//открываем попап и вешаем на него слушатели закрытия: по крестику, темной зоне и кнопки Esc
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByDarkAreaAndCrossClick);
}


//закрываем попап и снимаем с него слушатели закрытия: по кнопке-крестику, тёмной зоне и кнопке Esc
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener('click', closePopupByDarkAreaAndCrossClick);
}


//находим открытый попап
function findOpenedPopup() {
  return document.querySelector(".popup_opened");
} 


//метод закрытия попапа по клику на тёмную зону и кнопку-крестик
function closePopupByDarkAreaAndCrossClick (evt) {
  if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-btn'))) {
    closePopup(evt.currentTarget);
  }
}


//метод закрытия попапа по нажатаю на кнопку Esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(findOpenedPopup());
  }
}


//метод открытия попапа с увеличенной картинкой по клику на картинку карточки
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




//метод редактирования информации пользователя с введёнными пользователем данными 
//и закрытием попапа редактированния данных пользователя
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value ;
  profileProfession.textContent = inputUserProfession.value ;
  closePopup(userPopup);
}


//метод добавления новой карточки в разметку с введёнными пользователем данными 
//и закрытием попапа создания карточки
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const item = { 
    name: inputCardName.value, 
    link: inputCardLink.value 
  }
  renderCard(item)
  closePopup(cardPopup);
}




//вешаем слушатель на сабмит формы создания новой карточки
popupCardForm.addEventListener('submit', handleCardFormSubmit);


//вешаем слушатель на сабмит формы редактированния данных пользователя
popupUserForm.addEventListener('submit', handleProfileFormSubmit);


profEditBtn.addEventListener("click", () => {
  openPopup(userPopup)
  inputUserName.value = profileName.textContent;
  inputUserProfession.value = profileProfession.textContent;
  resetError(userPopup, validationConfig);
});


cardAddBtn.addEventListener("click", () => {
  openPopup(cardPopup)
  popupCardForm.reset();
  resetError(cardPopup, validationConfig);
});