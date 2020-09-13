export default class UserInfo {
  constructor(
    { nameSelector, aboutSelector, avatarSelector },
    { initUserCallback, updateUserInfoCallBack, updateAvatarCallback }
  ) {
    this._nameElem = document.querySelector(nameSelector);
    this._aboutElem = document.querySelector(aboutSelector);
    this._avatarElem = document.querySelector(avatarSelector);

    this._initUserInfo = initUserCallback;
    this._updateUserInfo = updateUserInfoCallBack;
    this._updateAvatar = updateAvatarCallback;
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      about: this._aboutElem.textContent,
    };
  }

  setNewTextInfo({ name, about }) {
    return this._updateUserInfo(name, about).then((respond) => {
      this._setUserInfoinDOM(respond.name, respond.about);
      return Promise.resolve();
    });
  }

  setNewAvatar(avatar) {
    return this._updateAvatar(avatar).then((respond) => {
      this._setUserAvatarinDOM(respond.avatar);
      return Promise.resolve();
    });
  }

  _setUserInfoinDOM(name, about) {
    this._nameElem.textContent = name;
    this._aboutElem.textContent = about;
  }

  _setUserAvatarinDOM(avatar) {
    this._avatarElem.src = avatar;
  }

  initUser() {
    this._initUserInfo()
      .then((userJSON) => {
        this._setUserInfoinDOM(userJSON.name, userJSON.about);
        this._setUserAvatarinDOM(userJSON.avatar);
        this._id = userJSON._id;
      })
      .catch(() => {
        this.setUserInfo({ name: "ОШИБКА", about: "ОШИБКА", avatar: "#" });
      });
  }

  checkCardOwnership(ownerCardId){
    return (this._id === ownerCardId);
  }

}
