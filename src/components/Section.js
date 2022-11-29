export default class Section {
  constructor ({ renderer }, selector) {
    
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }


  addItemFirst(el) {
    this._container.prepend(el);
  }

  addItemLast(el) {
    this._container.append(el);
  }


  renderItems(items) {
    items.forEach(item => {
      this._renderer(item)
    });
  }
}