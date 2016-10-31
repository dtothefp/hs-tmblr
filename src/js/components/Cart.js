import union from 'lodash/union';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import CartItem from './CartItem';
import template from '../client-templates/cart.html';

export default class Cart {
  constructor(store, actions) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('cart');
    this.children = {};
    this.subscribe();
  }

  render() {
    const {items = {}} = this.state.cart;
    const ctx = {
      count: Object.keys(items).length,
      total: this.getTotal(items)
    };
    const html = template.render(ctx);
    this.elm.innerHTML = html;

    const frag = this.addItems(items, this.state.products);

    this.itemsElm = this.elm.querySelector('.cart__items');
    this.itemsElm.appendChild(frag);

    this.addObservers();
    this.addListeners();

    if (this.isOpen()) {
      this.elm.classList.add('is-open');
    }

    return this.elm;
  }

  isOpen(state = this.state) {
    return state.cart && state.cart.open;
  }

  getTotal(items) {
    return Object.keys(items).reduce((num, id) => {
      const {price} = this.state.products[id];

      return num + price;
    }, 0);
  }

  addListeners() {
    const close = this.elm.querySelector('[data-js-listen]');

    close.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    this.actions.cartActions.toggleCart({open: false});
  }

  addObservers() {
    const elms = [...this.elm.querySelectorAll('[data-js-update]')];

    this.observers = elms.reduce((acc, elm) => {
      const {jsUpdate} = elm.dataset;
      const val = acc[jsUpdate];

      if (val) {
        acc[jsUpdate] = isArray(val) ? [...val, elm] : [val, elm];
      } else {
        acc[jsUpdate] = elm;
      }

      return acc;
    }, {});
  }

  addItems(items, products) {
    return Object.keys(items).reduce((frag, id) => {
      const child = new CartItem(this.actions, {
        id,
        state: {
          ...items[id],
          ...products[id]
        }
      });

      this.children[id] = child;
      frag.appendChild(child.elm);

      return frag;
    }, document.createDocumentFragment());
  }

  subscriber() {
    const state = this.store.getState();
    const {total} = state.cart || {};
    const {total: prevTotal} = this.state.cart || {};

    if (this.itemsElm) {
      const {items = {}, count} = state.cart;
      const prevCount = this.state.cart.count;
      const childKeys = Object.keys(this.children);
      const cartKeys = Object.keys(items);
      const keys = union(childKeys, cartKeys);
      let frag;

      keys.forEach(id => {
        const currState = items[id];
        let child = this.children[id];

        if (currState && child) {
          // update the current child
          child.update(currState);
        } else if (currState && !child) {
          frag = frag || document.createDocumentFragment();
          // add a new child
          child = new CartItem(this.actions, {
            id,
            state: {
              quantity: 1,
              ...state.products[id]
            }
          });

          this.children[id] = child;
          frag.append(child.elm);
        } else if (!currState && child) {
          // remove a child
          delete this.children[id];
          this.itemsElm.removeChild(child.elm);
        }
      });


      if (frag) {
        this.itemsElm.appendChild(frag);
      }

      if (count !== prevCount) {
        this.observers.count.textContent = count;

        if (count === 0 && prevCount > 0) {
          this.observers.empty.classList.remove('is-hidden');
        } else if (count > 0 && prevCount === 0) {
          this.observers.empty.classList.add('is-hidden');
        }
      }
    }

    if (isNumber(total) && total !== prevTotal) {
      this.observers.total.forEach(elm => {
        elm.textContent = total;
      });
    }

    this.lastState = this.state;
    this.state = state;

    const lastWasOpen = this.isOpen(this.lastState);
    const currIsOpen = this.isOpen();

    if (currIsOpen && !lastWasOpen) {
      this.elm.classList.add('is-open');
    } else if (!currIsOpen && lastWasOpen) {
      this.elm.classList.remove('is-open');
    }
  }

  subscribe() {
    this.store.subscribe(() => this.subscriber());
  }
}
