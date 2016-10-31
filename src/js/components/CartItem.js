import temp from '../client-templates/cart-item.html';

export default class CartItem {
  constructor(actions, {id, state}) {
    this.state = {
      ...state,
      quantity: state.quantity || 1
    };
    this.basePrice = state.price;
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('cart__items-item');
    this.elm.innerHTML = temp.render(this.state);
    this.id = id;
    this.addObservers();
    this.addListeners();
  }

  addListeners() {
    // TODO: was previously binding the listener to the `this.elm` and delegating
    // but was having problems with Karma testing triggering events in Safari ¯\_(ツ)_/¯
    const quantityElms = [...this.elm.querySelectorAll('[data-js-quantity]')];

    quantityElms.forEach(elm => {
      const {jsQuantity} = elm.dataset;

      if (jsQuantity === 'decrement') {
        this.observers[jsQuantity] = elm;
      }

      elm.addEventListener('click', this.handleClick.bind(this));
    });
  }

  addObservers() {
    const elms = [...this.elm.querySelectorAll('[data-js-update]')];

    this.observers = elms.reduce((acc, elm) => {
      const {jsUpdate} = elm.dataset;

      acc[jsUpdate] = elm;

      return acc;
    }, {});
  }

  handleClick(e) {
    e.preventDefault();

    const method = e.target.dataset && e.target.dataset.jsQuantity;

    if (method) {
      this.actions.cartActions.update(this.id, {method});
    }
  }

  update({quantity}) {
    if (quantity !== this.state.quantity) {
      this.lastState = this.state;
      this.state = Object.assign({}, this.lastState, {
        quantity,
        price: this.basePrice * quantity
      });

      this.observers.quantity.textContent = this.state.quantity;
      this.observers.price.textContent = this.state.price;

      const {decrement} = this.observers;

      if (quantity === 1) {
        decrement.classList.add('remove');
        decrement.classList.remove('decrement');
      } else if (this.lastState.quantity === 1) {
        decrement.classList.add('decrement');
        decrement.classList.remove('remove');
      }
    }
  }
}
