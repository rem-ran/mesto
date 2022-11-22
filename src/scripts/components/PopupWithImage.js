
import Popup from "./Popup.js";


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomedCaption = document.querySelector(".image-zoom__caption");
    this._zoomedImage = document.querySelector(".image-zoom__image");
  }

  open({link, name}) {
    this._zoomedCaption.textContent = name;
    this._zoomedImage.src = link;
    this._zoomedImage.alt = name;
    super.open();
  }
}