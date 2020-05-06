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
}

function handleAddBookmarkClicked() {
  $('#addbookmark').click(function (e) {
    $('main').html(`

      <section class="addingbookmark">
  <h2>Add New Bookmark</h2>
  <form class="addbookmarkform">
    <input type="text" id="formname" name="title" placeholder="Enter a name" required />
    <input type="url" id="formurl" placeholder="Enter a URL" name="url"  required/>
    <input type="text" id="formdesc" name="desc" required/>
    <input type="number" id="formrating" name="rating" required/>
    <input type="submit" />
  </form>
</section>

<button class="backbutton"> Back</button>
`);
    handleBookmarkSubmit(); //This took me 5 hours to figure out... :( Ill never forget
    handleBackButton();
  });
}
function renderMoreInfo(bookmark) {
  let starSpan = '<span class="stars">★</span>';
  $('main').html(`<section class="bookmark-info">
  <h2>${bookmark.title}</h2>
  <div class="starbox">
    ${starSpan.repeat(bookmark.rating)}
  </div>
  <div class="full-bookmark-desc">${bookmark.desc}</div>
  <div class="full-bookmark-link">
    <a href="${bookmark.url}">Visit Site</a>
  </div>
  <button class="backbutton"> Back</button>
</section>`);
  handleBackButton();
  render();
}

function handleMoreInfoClick() {
  $('.moreinfo').click(function (e) {
    event.preventDefault();
    const id = getBookmarkId(event.currentTarget);

    let selectedBookmark = store.findById(id);
    renderMoreInfo(selectedBookmark);

    // api.deleteBookmark(id).then(() => {
    //   store.findAndDelete(id);
    // homePage();
    render();
  });
}

function handleBackButton() {
  $('.backbutton').click(function (e) {
    e.preventDefault();

    homePage();

    render();
  });
}

function generateBookmarks(bookmark) {
  const listItems = bookmark.map((item) => generateBookmarkItems(item));
  return listItems;
}

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
  <button class="moreinfo">More Info</button>
          <button class="deletebtn">Delete</button>

        </div>`;
}

function handleBookmarkSubmit() {
  $('.addbookmarkform').submit(function (e) {
    e.preventDefault();
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

    api
      .createBookmark(newBookmarkData)
      .then((newItem) => {
        store.addBookmark(newItem);
        homePage();
        render();
      })
      .catch(function (err) {
        console.log(err);
        submitError(err);
      });

    // .catch((err) => renderError(err));
  });
}

function handleRatingButton() {
  // Watch for change on rating button
  $('#rating').click(function (e) {
    e.preventDefault();
    // Get the value of the selected rating button
    let setRating = e.currentTarget.value;

    // Foreach object that has .rating >= the value of button
    let items = store.bookmarks;
    let filteredArray = items.filter((item) => item.rating >= setRating);
    // Return new string of bookmarks
    const filteredString = generateBookmarks(filteredArray);
    // Render page
    $('.bookmark-section').html(filteredString);

    // If rating is default, render home page
    if (setRating === 'rating') {
      render();
    }
    handleMoreInfoClick();
  });
}

function getBookmarkId(bookmark) {
  return $(bookmark).closest('.bookmark').data('item-id');
}

function handleDeleteBookmark() {
  $('.deletebtn').click(function (event) {
    event.preventDefault();
    const id = getBookmarkId(event.currentTarget);
    api
      .deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        // homePage();
        render();
      })
      .catch(function (err) {
        console.log(err);
        render.renderError(err);
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
  handleDeleteBookmark();
  handleMoreInfoClick();
  handleRatingButton();
  handleAddBookmarkClicked();
}

function bindEventListeners() {
  handleAddBookmarkClicked();
  handleRatingButton();
  handleBookmarkSubmit();
  handleDeleteBookmark();
  handleBackButton();
  handleMoreInfoClick();
}

function renderError(error) {
  $('main').html(`<section class="main-error">
  <div>We apologize for the inconvenience but you have hit an error.</div>
  <div class="errormessage">Error message = ${error.message}</div>
  <div class="errorcode">Error code = ${error.code}</div>
</section>`);
}
function submitError(error) {
  $('main').append(`<section class="main-error">
  <div>Please fix the missing data:</div>
  <div class="errormessage">Error message = ${error.message}</div>
  <div class="errorcode">Error code = ${error.code}</div>
</section>`);
}

export default {
  render,
  homePage,
  bindEventListeners,
  renderError,
};
