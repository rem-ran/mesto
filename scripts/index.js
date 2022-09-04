let popup = document.querySelector(".popup");
let closeProfEditBtn = popup.querySelector(".popup__close-btn");
let popupContainer = popup.querySelector(".popup__container");
let popupSaveBtn = popup.querySelector(".popup__save-btn");
let inputName = popup.querySelector(".input__txt_type_name");
let inputProfession = popup.querySelector(".input__txt_type_profession");

let profile = document.querySelector(".profile");
let openProfEditBtn = profile.querySelector(".profile__edit-btn");
let profileName = profile.querySelector(".profile__name");
let profileProfession = profile.querySelector(".profile__profession");



let openCloseEditPopup = () => {
   popup.classList.toggle("popup_opened");
}

openProfEditBtn.addEventListener("click", () => {
   openCloseEditPopup();
   inputName.value = profileName.textContent;
   inputProfession.value = profileProfession.textContent;
});

closeProfEditBtn.addEventListener("click", () => {
   openCloseEditPopup();
});

function formSubmitHandler (evt) {
   evt.preventDefault();
   profileName.textContent = inputName.value ;
   profileProfession.textContent = inputProfession.value ;
   openCloseEditPopup();
}

popupContainer.addEventListener('submit', formSubmitHandler);
popupSaveBtn.addEventListener('click', formSubmitHandler);