//класс валидации формы
class FormValidator {
  
    constructor(validationObject, validationElement, popupSaveButton, inputList) {
      this._validationObject = validationObject;
      this._validationElement = validationElement;
      this._popupSaveButton = popupSaveButton;
      this.inputList = inputList;
    }
  
  //метод отображения ошибок ввода
    _showInputError = (inputElement, errorMessage) => {
      const {inputErrorClass, errorClass} = this._validationObject;
      inputElement.classList.add(inputErrorClass);
      
      const errorElement = this._validationElement.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);
    };
    
    
    //метод скрытия ошибкок ввода
    _hideInputError = (inputElement) => {
      const {inputErrorClass, errorClass} = this._validationObject;
      inputElement.classList.remove(inputErrorClass);
      
      const errorElement = this._validationElement.querySelector(`.${inputElement.id}-error`);
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    };
    
    
    //метод проверки поля ввода и скрытия\отображения ошибок ввода
    _toggleInputErrorState = (inputElement) => {
      
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
        
      } else {
        this._hideInputError(inputElement);
      }
    };
    
    
    //ставим слушатели типа "инпут"
    _setEventListeners = () => {
      const {inputSelector} = this._validationObject;
  
      const inputList = Array.from(this._validationElement.querySelectorAll(inputSelector));
    
      inputList.forEach((inputElement) => {    
        inputElement.addEventListener('input', () => {
          this._toggleInputErrorState(inputElement);
          
          this._toggleBtnState(inputList);      
        });
      });
    };
    
    
    //метод вызывающий валидацию формы
    enableValidation = () => {
      this._setEventListeners(); 
    };
    
  
    //метод проверки на неправильный ввод
    _hasInvalidInput = (inputList => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    });
    
    
    //метод активации кнопки отправки
    _activateBtn  = () => {
      const {inactiveButtonClass} = this._validationObject;
  
      this._popupSaveButton.classList.add(inactiveButtonClass);
      this._popupSaveButton.setAttribute("disabled", true);
    }
    
    //метод деактивации кнопки отправки
    _deactivateBtn  = () => {
      const {inactiveButtonClass} = this._validationObject;
  
      this._popupSaveButton.classList.remove(inactiveButtonClass);
      this._popupSaveButton.removeAttribute("disabled");
    }
    
    //метод смена состояния(активная\неактивная) кнопки отправки
    _toggleBtnState = (inputList) => {
  
      if (this._hasInvalidInput(inputList)) {
        this._activateBtn();
      } else {
        this._deactivateBtn();
      }
    }
  
  
    //метод сброса текста ошибок и состояния кнопки отправки
    resetErrors() {
      const {inputSelector} = this._validationObject;    
  
      const inputList = Array.from(this._validationElement.querySelectorAll(inputSelector));
    
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    
        this._toggleBtnState(inputList);
      });
    };
  
  }