
export default class Section {
  constructor ({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(el) {
    this._container.prepend(el);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item)
    });
  }
}