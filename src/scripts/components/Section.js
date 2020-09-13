export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _renderNewElement(newElement) {
    this._container.prepend(newElement);
  }

  addNewElement(el) {
    this._renderNewElement(this._renderer(el));
  }

  init(raws){
    raws.reverse().forEach(el => {
      this.addNewElement(el);
    });
  }
}
