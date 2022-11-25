
export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getAllCards() {
    return fetch(`${this._url}/cards `, {
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


  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards `, {
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


  deleteCard() {

  }



}