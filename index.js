// import app from './app.js';
import render from './render.js';
import store from './store.js';

function main() {
  render.homePage();
  render.handleAddBookmarkClicked();
  store.getBookmarks();
}

$(main);
