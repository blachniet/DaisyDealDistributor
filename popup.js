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

  chrome.storage.local.get('daisyInputInfo', function(data){
    if (data && data.daisyInputInfo){
      document.getElementById('firstName').value = data.daisyInputInfo.firstName;
      document.getElementById('lastName').value = data.daisyInputInfo.lastName;
      document.getElementById('email').value = data.daisyInputInfo.email;
      document.getElementById('subject').value = data.daisyInputInfo.subject;
      document.getElementById('url').value = data.daisyInputInfo.url;
      document.getElementById('message').value = data.daisyInputInfo.message;
    }
  });
});