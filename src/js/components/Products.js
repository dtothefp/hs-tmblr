import isEmpty from 'lodash/isEmpty';
import Product from './Product';
import template from '../client-templates/products.html';

export default class Products {
  constructor(store, actions) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('products');
    this.children = {};
    this.subscribe();
  }

  render() {
    const html = template.render();
    this.elm.innerHTML = html;

    const frag = this.addProducts(this.state.products);
    this.elm.appendChild(frag);

    this.addListeners();

    return this.elm;
  }

  addListeners() {
    const cart = this.elm.querySelector('[data-js-listen]');

    cart.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    this.actions.cartActions.toggleCart({open: true});
  }

  addProducts(products = {}) {
    return Object.keys(products).reduce((frag, id) => {
      const {items = {}} = this.state.cart || {};
      const added = !isEmpty(items[id]);
      const child = new Product(this.actions, {
        id,
        state: {
          ...products[id],
          added
        }
      });

      frag.appendChild(child.elm);
      this.children[id] = child;

      return frag;
    }, document.createDocumentFragment());
  }

  subscriber() {
    const state = this.store.getState();
    const childKeys = Object.keys(this.children);

    if (childKeys.length) {
      const keys = Object.keys(state.products);

      keys.forEach(id => {
        const {items = {}} = state.cart;
        const currState = items[id];
        const child = this.children[id];

        child.update(!!currState);
      });
    }

    this.lastState = this.state;
    this.state = state;
  }

  subscribe() {
    this.store.subscribe(() => this.subscriber());
  }
}
