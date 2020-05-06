const bookmarks = [];

function addBookmark(bookmark) {
  this.bookmarks.push(bookmark);
}
function findById(id) {
  return bookmarks.find((e) => e.id === id);
}
function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
}

export default {
  addBookmark,
  findById,
  findAndDelete,
  bookmarks,
};
