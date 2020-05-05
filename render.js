import store from './store.js';

function homePage(params) {
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
    e.preventDefault();
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
      <section class="addingbookmark">
        <h2>Add New Bookmark</h2>
       <section class="topbuttons">
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
      <section class="addingbookmark">
        <h2>Add New Bookmark</h2>
        <form action="submit">
          <input type="text" name="name" placeholder="Enter a name" />
          <input type="url" placeholder="Enter a URL" name="url" />
          <input type="textbox" name="desc" />
          <input type="number" />
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
    generateBookmarks(filteredArray);
  });
}

// Return new string of bookmarks
// Render page

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
  handleAddBookmarkClicked(), handleRatingButton();
}

export default {
  render,
  homePage,
  bindEventListeners,
};
