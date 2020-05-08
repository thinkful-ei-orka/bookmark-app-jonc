import store from './store.js';
import api from './api.js';

function homePage() {
  let options = '';

  for (let index = 1; index < 6; index++) {
    options += `<option value="${index}">${index} Star${
      index > 1 ? 's' : ''
    } +</option>`;
  }

  $('main').html(`<section class="topbuttons">
        <button id="addbookmark">ADD BOOKMARK</button>

        <select name="rating" class="rating">
          <option value="rating">RATING ⤵️</option>
     ${options}
        </select>
      </section>
      <section class="bookmark-section">
      <ul>
</ul>

      </section>`);
}

function handleAddBookmarkClicked() {
  $('main').on('click', '#addbookmark', function (e) {
    $('main').html(`

      <section class="addingbookmark">
  <h2>Add New Bookmark</h2>
  <form class="addbookmarkform">
  <label for="title"> Bookmark Title </label>
    <input type="text" id="formname" name="title" placeholder="Enter a name" required />
    <label for="url"> Bookmark URL </label>
    <input type="url" id="formurl" placeholder="Enter a URL" name="url"  required/>
    <label for="desc"> Bookmark Description </label>
    <textarea   id="formdesc" name="desc" placeholder="Enter a description for this bookmark" required/></textarea>
    <label for="rating"> Bookmark Rating </label>
    <input type="number" id="formrating" name="rating" placeholder="Rate the bookmark" required/>
    <input type="submit" id="submitbutton" />
  </form>
</section>

<button class="backbutton"> Back</button>
`);
    // handleBookmarkSubmit(); //This took me 5 hours to figure out... :( Ill never forget
  });
}
function renderMoreInfo(target, bookmark) {
  let bookmarkDesc = bookmark.desc;
  const bookmarkUrl = bookmark.url;

  $(target).replaceWith(`<section class="bookmark-info">

  <div class="full-bookmark-desc">${bookmarkDesc}</div>
  <div class="full-bookmark-link">
    <a href="${bookmarkUrl}">Visit Site</a>
  </div>
  <button class="backbutton"> Back</button>
</section>`);
  //   let starSpan = '<span class="stars">★</span>';
  //   $('main').html(`<section class="bookmark-info">
  //   <h2>${bookmark.title}</h2>
  //   <div class="starbox">
  //     ${starSpan.repeat(bookmark.rating)}
  //   </div>
  //   <div class="full-bookmark-desc">${bookmark.desc}</div>
  //   <div class="full-bookmark-link">
  //     <a href="${bookmark.url}">Visit Site</a>
  //   </div>
  //   <button class="backbutton"> Back</button>
  // </section>`);
}

function handleMoreInfoClick() {
  $('main').on('click', '.moreinfo', function (e) {
    e.preventDefault();
    const id = getBookmarkId(e.currentTarget);

    const selectedBookmark = store.findById(id);

    //     this.replaceWith(`<section class="bookmark-info">

    //   <div class="full-bookmark-desc">${selectedBookmark.desc}</div>
    //   <div class="full-bookmark-link">
    //     <a href="${selectedBookmark.url}">Visit Site</a>
    //   </div>
    //   <button class="backbutton"> Back</button>
    // </section>`);
    renderMoreInfo(this, selectedBookmark);

    // let starSpan = '<span class="stars">★</span>';

    // let selectedBookmark = store.findById(id);

    // renderMoreInfo(selectedBookmark);

    // api.deleteBookmark(id).then(() => {
    //   store.findAndDelete(id);
    // homePage();
  });
}

function handleBackButton() {
  $('main').on('click', '.backbutton', function (e) {
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
  return `
        <li class="bookmark" data-item-id="${bookmark.id}">
          <span class="bookmark-name">${bookmark.title}</span>

          <div class="starbox">
          ${starSpan.repeat(bookmark.rating)}
 </div>
  <button class="moreinfo">More Info</button>
          <button class="deletebtn">Delete</button>
        </li>`;
}

function handleBookmarkSubmit() {
  $('main').on('submit', '.addbookmarkform', function (e) {
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
  $('main').on('click', '.rating', function (e) {
    console.log('rating clicked');

    e.preventDefault();
    // Get the value of the selected rating button
    let setRating = e.currentTarget.value;

    // Foreach object that has .rating >= the value of button
    let items = store.bookmarks;
    let filteredArray = items.filter((item) => item.rating >= setRating);
    console.log(filteredArray);

    // Return new string of bookmarks
    const filteredString = generateBookmarks(filteredArray);
    console.log(filteredString);

    // Render page
    $('.bookmark-section ul').html(filteredString);

    // If rating is default, render home page
    if (setRating === 'rating') {
      render();
    }
    console.log(setRating);
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

  $('.bookmark-section ul').html(bookmarksString);
  handleDeleteBookmark();
  handleMoreInfoClick();
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
