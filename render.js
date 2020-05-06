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
  handleDeleteBookmark();
  console.log('homepage rendering has been done');
}

function handleAddBookmarkClicked() {
  $('#addbookmark').click(function (e) {
    $('main').html(`

      <section class="addingbookmark">
  <h2>Add New Bookmark</h2>
  <form class="addbookmarkform">
    <input type="text" id="formname" name="title" placeholder="Enter a name" />
    <input type="url" id="formurl" placeholder="Enter a URL" name="url" />
    <input type="text" id="formdesc" name="desc" />
    <input type="number" id="formrating" name="rating" />
    <input type="submit" />
  </form>
</section>
`);
    console.log('Render add bookmark has been run');
    handleBookmarkSubmit();
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
  // let ratingNum = bookmark.rating;
  // let totalStars = generateStars([bookmark.rating]);
  let starSpan = '<span class="stars">★</span>';

  return `<div class="bookmark" data-item-id="${bookmark.id}">
          <span class="bookmark-name">${bookmark.title}</span>
          <span class="separator"></span>

          <div class="starbox">
          ${starSpan.repeat(bookmark.rating)}



          </div>
          <button class="deletebtn">Delete</button>
        </div>`;
}

function handleBookmarkSubmit() {
  $('.addbookmarkform').submit(function (e) {
    e.preventDefault();
    console.log(event);
    let title = $('#formname').val();
    let url = $('#formurl').val();
    let desc = $('#formdesc').val();
    let rating = $('#formrating').val();
    const newBookmarkData = {
      title: title,
      url: url,
      desc: desc,
      rating: rating,
    };

    api.createBookmark(newBookmarkData).then((newItem) => {
      store.addBookmark(newItem);
      homePage();
      render();
    });

    // .catch((err) => renderError(err));
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

function getBookmarkId(bookmark) {
  console.log('getBookmarkId hit');
  $(bookmark).closest('.bookmark').data('data-item-id');
}

function handleDeleteBookmark() {
  $('.deletebtn').click(function (event) {
    const id = getBookmarkId(event.currentTarget);
    console.log(id);
    api.deleteBookmark(id).then(() => {
      store.findAndDelete(id);
      // homePage();
      render();
    });
  });
}

/**
 * End functions
 */

function render() {
  let items = [...store.bookmarks];

  const bookmarksString = generateBookmarks(items);

  $('.bookmark-section').html(bookmarksString);
}

function bindEventListeners() {
  handleAddBookmarkClicked();
  handleRatingButton();
  handleBookmarkSubmit();
  handleDeleteBookmark();
}

export default {
  render,
  homePage,
  bindEventListeners,
};
