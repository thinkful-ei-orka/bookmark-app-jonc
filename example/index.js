import $ from 'jQuery';
import api from './api.js';
import 'normalize.css';
import './index.css';
import store from './store.js';

import shoppingList from './shopping-list';

// const main = function () {
//   api
//     .getItems()
//     .then((res) => res.json())
//     .then((items) => {
//       items.forEach((item) => store.addItem(item));
//       shoppingList.render();
//     });

//   shoppingList.bindEventListeners();
//   shoppingList.render();
//   shoppingList.renderError();
// };
const main = function () {
  api.getItems().then((items) => {
    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  });

  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);
