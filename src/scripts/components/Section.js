export default class Section {
  constructor({ initItems, renderer }, containerSelector) {
    this._initItems = initItems;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _renderNewElement(newElement) {
    this._container.prepend(newElement);
  }

  addNewElement(el) {
    this._renderNewElement(this._renderer(el));
  }

  init() {
    this._container.innerHTML = "";
    this._initItems.forEach((el) => {
      this.addNewElement(el);
    });
  }
}
