//класс валидации формы
class FormValidator {
  
  constructor(object, formElement) {
    this._object = object;
    this._formElement = formElement;
  }

//метод отображения ошибок ввода
  _showInputError = (formElement, inputElement, errorMessage) => {
    const {inputErrorClass, errorClass} = this._object;
    inputElement.classList.add(inputErrorClass);
    
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  
  //метод скрытия ошибкок ввода
  _hideInputError = (formElement, inputElement) => {
    const {inputErrorClass, errorClass} = this._object;
    inputElement.classList.remove(inputErrorClass);
    
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  
  //метод проверки поля ввода и скрытия\отображения ошибок ввода
  _toggleInputErrorState = (formElement, inputElement) => {
    
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
      
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };
  
  
  //ставим слушатели типа "инпут"
  _setEventListeners = () => {
    const {inputSelector, submitButtonSelector, inactiveButtonClass} = this._object;
    const formElement = this._formElement;

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  
    const buttonElement = formElement.querySelector(submitButtonSelector);
  
    inputList.forEach((inputElement) => {    
      inputElement.addEventListener('input', () => {
        this._toggleInputErrorState(formElement, inputElement);
        
        this._toggleBtnState(inputList, buttonElement, inactiveButtonClass);      
      });
    });
  };
  
  
  //метод вызывающий валидацию формы
  enableValidation = () => {
    const {formSelector} = this._object;
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    formList.forEach(() => {
    this._setEventListeners();
    });    
  };
  

  //метод проверки на неправильный ввод
  _hasInvalidInput = (inputList => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  });
  
  
  //метод активации кнопки отправки
  _activateBtn  = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }
  
  //метод деактивации кнопки отправки
  _deactivateBtn  = (buttonElement, inactiveButtonClass) => {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
  
  //метод смена состояния(активная\неактивная) кнопки отправки
  _toggleBtnState = (inputList, buttonElement, inactiveButtonClass) => {
    if (this._hasInvalidInput(inputList)) {
      this._activateBtn(buttonElement, inactiveButtonClass);
    } else {
      this._deactivateBtn(buttonElement, inactiveButtonClass);
    }
  }


  //метод сброса текста ошибок и состояния кнопки отправки
  resetError() {
    const {inputSelector, submitButtonSelector, inactiveButtonClass} = this._object;
    const formElement = this._formElement;

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
  
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement, this._object);
  
      this._toggleBtnState(inputList, buttonElement, inactiveButtonClass);
    });
  };

}