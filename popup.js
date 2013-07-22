function onSubmit(){
  chrome.runtime.getBackgroundPage(function (bgPage){
    bgPage.launchPages({
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      url: document.getElementById('url').value,
      message: document.getElementById('message').value,
    });
  });
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#submitButton').addEventListener('click', onSubmit);
});