
export default class Section {
  constructor ({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(el) {
    this._container.prepend(el);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item)
    });
  }
}