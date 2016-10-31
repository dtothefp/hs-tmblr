import temp from '../client-templates/product.html';

export default class Product {
  constructor(actions, {id, state}) {
    this.state = state;
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('products__product');
    this.elm.innerHTML = temp.render(state);
    this.id = id;
    this.addListeners();
    this.addObservers();
  }

  addListeners() {
    const buttonElm = this.elm.querySelector('[data-js-update]');

    buttonElm.addEventListener('click', this.handleAdd.bind(this));
  }

  addObservers() {
    const elms = [...this.elm.querySelectorAll('[data-js-update]')];

    this.observers = elms.reduce((acc, elm) => {
      const {jsUpdate} = elm.dataset;

      acc[jsUpdate] = elm;

      return acc;
    }, {});
  }

  handleAdd(e) {
    e.preventDefault();

    // TODO: don't use local state
    if (this.state.added) {
      this.actions.cartActions.update(this.id, {method: 'remove'});
    } else {
      // use fetch to post here
      this.actions.cartActions.update(this.id);
    }
  }

  update(isInCart) {
    const {added} = this.state;

    if (isInCart && !added) {
      this.observers.add.textContent = 'Remove';
      this.state.added = true;
    } else if (!isInCart && added) {
      this.observers.add.textContent = 'Add to Cart';
      this.state.added = false;
    }
  }
}
