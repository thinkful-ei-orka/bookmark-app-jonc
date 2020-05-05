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
        <div class="bookmark">
          <span class="bookmark-name">Placeholder</span>
          <span class="separator"></span>

          <div class="starbox">
            <span class="stars">★</span>
            <span class="stars">★</span>
            <span class="stars">★</span>
            <span class="stars">★</span>
            <span class="stars">★</span>
          </div>
        </div>
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

function generateBookmarks(bookmark) {}

function generateBookmarkItems() {}

export default {
  homePage,
  handleAddBookmarkClicked,
};
