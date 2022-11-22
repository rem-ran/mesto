
export default class UserInfo {
  constructor({userName, userJob}) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
    return userData;
  }

  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._userJob.textContent = data.userJob;
  };
}