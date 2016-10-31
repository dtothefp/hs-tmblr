import flux from './modules/bootstrap';
import Products from './components/Products';
import Cart from './components/Cart';

const {store, actions} = flux();
const productsComponent = new Products(store, actions); // eslint-disable-line
const cartComponent = new Cart(store, actions);
const app = document.querySelector('[data-app]');

Promise.all([
  actions.cartActions.init(),
  actions.productActions.init()
]).then(() => {
  const productElm = productsComponent.render();
  const cartElm = cartComponent.render();

  app.appendChild(productElm);
  app.appendChild(cartElm);
});
