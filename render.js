import store from './store.js';
import api from './api.js';

function homePage() {
  $('main').html(`<section class="topbuttons">
        <button id="addbookmark">ADD BOOKMARK</button>
        <label for="rating"></label>
        <select name="rating" id="rating">
          <option value="rating">RATING ⤵️</option>
          <option value="1">1 Star +</option>
          <option value="2">2 Stars +</option>
          <option value="3">3 Stars +</option>
          <option value="4">4 Stars +</option>
          <option value="5">5 Stars +</option>
        </select>
      </section>
      <section class="bookmark-section">

      </section>`);
  console.log('homepage rendering has been done');
}

function handleAddBookmarkClicked() {
  $('#addbookmark').click(function (e) {
    $('main').html(`

      <section class="addingbookmark">
        <h2>Add New Bookmark</h2>
        <form class="addbookmarkform" name>
          <input type="text" id="formname" name="title" placeholder="Enter a name" />
          <input type="url" id="formurl" placeholder="Enter a URL" name="url" />
          <input type="text" id="formdesc" name="desc" />
          <input type="number" id="formrating" name="rating"/>
          <input type="submit">'
        </form>
      </section>
      </section>`);
    console.log('Render add bookmark has been run');
  });
}

function generateBookmarks(bookmark) {
  const listItems = bookmark.map((item) => generateBookmarkItems(item));
  return listItems;
}

//Get rating num from bookmark array
//take num and print span with star 'num' of times
//return that html
// function generateStars(rating) {
//   let starSpan = '<span class="stars">★</span>';
//   // let bookmarkRatingNum = bookmark.rating;
//   console.log(rating);
//   let totalSpans = [];
//   console.log(totalSpans);

//   for (bookmark.rating in bookmark) {
//     totalSpans.push(starSpan);
//   }
//   console.log(totalSpans);
//   return totalSpans;
// }

function generateBookmarkItems(bookmark) {
  console.log(bookmark.rating);
  // let ratingNum = bookmark.rating;
  // let totalStars = generateStars([bookmark.rating]);
  let starSpan = '<span class="stars">★</span>';

  return `<div class="bookmark">
          <span class="bookmark-name">${bookmark.title}</span>
          <span class="separator"></span>

          <div class="starbox">
          ${starSpan.repeat(bookmark.rating)}



          </div>
        </div>`;
}

function handleBookmarkSubmit() {
  $('.addbookmarkform').submit(function (e) {
    e.preventDefault();
    console.log(event);
    const newBookmarkData = {
      title: $('#formname').val(),
      url: $('#formurl').val(),
      desc: $('#formdesc').val(),
      rating: $('#formrating').val(),
    };

    // const name = $('input #name').val();
    // const url = $('input #url').val();
    // const desc = $('input #desc').val();
    // const rating = $('input #rating').val();
    // console.log(name);
    // console.log(url);

    // $('#name').val('');
    // $('#url').val('');
    // $('#desc').val('');
    // $('#rating').val('');
    console.log(newBookmarkData);
    api
      .createBookmark(newBookmarkData)
      .then((newItem) => {
        console.log(newItem);

        store.addBookmark(newItem);
      })
      .catch((err) => renderError(err));
  });
}

function handleRatingButton() {
  // Watch for change on rating button
  $('#rating').click(function (e) {
    e.preventDefault();
    // Get the value of the selected rating button
    console.log(e.currentTarget.value);
    let setRating = e.currentTarget.value;

    // Foreach object that has .rating >= the value of button
    let items = store.bookmarks;
    let filteredArray = items.filter((item) => item.rating >= setRating);
    console.log(filteredArray);
    // Return new string of bookmarks
    const filteredString = generateBookmarks(filteredArray);
    // Render page
    $('.bookmark-section').html(filteredString);
    // If rating is default, render home page
    if (setRating === 'rating') {
      render();
    }
  });
}

/**
 * End functions
 */

function render() {
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.bookmarks];
  console.log(items);

  // render the shopping list in the DOM
  const bookmarksString = generateBookmarks(items);
  // const ratingValue = $('#rating').val();
  // if (ratingValue !== 'rating') {
  //   handleRatingButton(ratingValue, bookmarksString);
  // }
  // insert that HTML into the DOM
  $('.bookmark-section').html(bookmarksString);
}

function bindEventListeners() {
  handleAddBookmarkClicked();
  handleRatingButton();
  handleBookmarkSubmit();
}

export default {
  render,
  homePage,
  bindEventListeners,
};
