
export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      _id: this._userId
    }
    return userData;
  }


  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  };


  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserId(data) {
    this._userId = data._id;
  }

}