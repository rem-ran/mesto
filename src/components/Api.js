export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }


  //получить список всех карточек в виде массива
  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


  //добавить карточку
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


  //поставить карточке свой лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


  //удалить с карточки свой лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


 //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


  //получить данные своего пользователя
  getServerUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }

  
  //обновить данные своего пользователя
  updateServerUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


  //обновить свой аватар
  updateServerUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
        }
      })
  }


  //общий метод получения данных, необходимых при начальной отрисовки сайта
  getDataForInitialLoading() {
    return Promise.all([this.getServerUserInfo(), this.getAllCards()]);
  }

}