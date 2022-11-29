export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //метод проверки от сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText} `); 
    }
      return res.json();
  }


  //получить список всех карточек в виде массива
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }


  //добавить карточку
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(res => this._getResponseData(res))
  }


  //поставить карточке свой лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }


  //удалить с карточки свой лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }


 //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }


  //получить данные своего пользователя
  getServerUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  }

  
  //обновить данные своего пользователя
  updateServerUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then(res => this._getResponseData(res))
  }


  //обновить свой аватар
  updateServerUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this._getResponseData(res))
  }


  //общий метод получения данных, необходимых при начальной отрисовки сайта
  getDataForInitialLoading() {
    return Promise.all([this.getServerUserInfo(), this.getAllCards()]);
  }

}