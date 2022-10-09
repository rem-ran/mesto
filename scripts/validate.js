//объект с нужными для валидации классами
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};


//показываем ошибки
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  inputElement.classList.add(inputErrorClass);
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};


//скрываем ошибки
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  inputElement.classList.remove(inputErrorClass);
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


// проверка на валидацию поля инпута
const toggleInputErrorState = (formElement, inputElement) => {
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};


//ставим слушатели типа "инпут"
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {    
    inputElement.addEventListener('input', () => {
      toggleInputErrorState(formElement, inputElement);
      
      if (hasInvalidInput(inputList)) {
        activateBtn(inputList, buttonElement, inactiveButtonClass);
      } else {
        deactivateBtn(inputList, buttonElement, inactiveButtonClass);
      }

      // toggleButtonState(inputList, buttonElement, inactiveButtonClass);      
    });
  });
};

//запускаем валидацию
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  
  formList.forEach((formElement) => {
  setEventListeners(formElement, rest);
  });
};

//проверяем на неправильный ввод
const hasInvalidInput = (inputList => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
});



//активация кнопки отправки
const activateBtn  = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }
}

//деактивация кнопки отправки
const deactivateBtn  = (inputList, buttonElement, inactiveButtonClass) => {
  if (!(hasInvalidInput(inputList))) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}


//сброс текста ошибок и состояния кнопки отправки
function resetError(formElement, object) {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, object);

    if (hasInvalidInput(inputList)) {
      activateBtn(inputList, buttonElement, object.inactiveButtonClass);
    } else {
      deactivateBtn(inputList, buttonElement, object.inactiveButtonClass);
    }
  })
};

enableValidation (validationConfig);
