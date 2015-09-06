// Saves options to chrome.storage
function save_options() {
  var hideCourses = document.getElementById('hide-courses').checked;
  chrome.storage.sync.set({
    hideCourses: hideCourses
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    hideCourses: false
  }, function(items) {
    document.getElementById('hide-courses').checked = items.hideCourses;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);