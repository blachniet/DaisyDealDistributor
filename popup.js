function onTabOpened(tab){
  console.log("Tab opened with id " + tab.id);
}

function go(){
  chrome.tabs.create({
    url: 'http://moneysavingmom.com/submit-a-deal',
    active: true,
  }, onTabOpened);
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#submitButton').addEventListener('click', go);
});