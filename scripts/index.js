let popup = document.querySelector(".popup");
let closeProfEditBtn = popup.querySelector(".popup__close-btn");
let popupForm = popup.querySelector(".popup__form");
let popupSaveBtn = popup.querySelector(".popup__save-btn");
let inputName = popup.querySelector(".popup__input_type_name");
let inputProfession = popup.querySelector(".popup__input_type_profession");

let profile = document.querySelector(".profile");
let openProfEditBtn = profile.querySelector(".profile__edit-btn");
let profileName = profile.querySelector(".profile__name");
let profileProfession = profile.querySelector(".profile__profession");



let openCloseEditPopup = () => {
   popup.classList.toggle("popup_opened");
   if (popup.classList.contains("popup_opened") === true) {
   inputName.value = profileName.textContent;
   inputProfession.value = profileProfession.textContent;
   }
}

openProfEditBtn.addEventListener("click", () => {
   openCloseEditPopup();
});

closeProfEditBtn.addEventListener("click", openCloseEditPopup);

function formSubmitHandler (evt) {
   evt.preventDefault();
   profileName.textContent = inputName.value ;
   profileProfession.textContent = inputProfession.value ;
   openCloseEditPopup();
}

popupForm.addEventListener('submit', formSubmitHandler);

