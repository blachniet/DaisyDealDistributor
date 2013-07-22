/**
 * Fired when a tab is opened. Responsible for injecting
 * the content script into the new tab.
 */
function onTabOpened(tab){
  console.log("Tab opened with id " + tab.id);
  chrome.tabs.executeScript(tab.id, {file: 'content.js'});
}

/**
 * Launches the submission pages.
 */
function launchPages(inputInfo){
  console.log("In background: " + inputInfo.firstName);
  chrome.storage.local.set({'daisyInputInfo': inputInfo},function(){
    var pages = getSupportedPages();
    for (var i = 0; i < pages.length; ++i){
      chrome.tabs.create({
        url: pages[i].submissionUrl,
        active: true,
      }, onTabOpened);
    }
  });
}

/**
 * Register to listen for messages from the content script.
 */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Getting page info for " + request.submissionUrl);
    sendResponse(getSupportedPage(request.submissionUrl));
  });

/**
 * Gets information about the supported submission pages.
 */
function getSupportedPages(){
  return [
    {
      displayName: "Money Saving Mom",
      submissionUrl: 'http://moneysavingmom.com/submit-a-deal',
      formId: 'si_contact_form7',
      fieldIds: {
        firstName: 'si_contact_name7',
        lastName: null,
        email: 'si_contact_email7',
        subject: 'si_contact_subject7',
        url: 'si_contact_ex_field7_2',
        message: 'si_contact_ex_field7_1'
      }
    },
    {
      displayName: "For The Mommas",
      submissionUrl: 'http://forthemommas.com/how-to-contact-us',
      formId: 'gform_2',
      fieldIds: {
        firstName: 'input_2_1',
        lastName: null,
        email: 'input_2_2',
        subject: 'input_2_3',
        url: null,
        message: 'input_2_4'
      }
    },
    {
      displayName: "Hip2Save",
      submissionUrl: 'http://hip2save.com/contact/',
      formId: 'submitdealform',
      fieldIds: {
        firstName: 'Name',
        lastName: null,
        email: 'emailAddress',
        subject: 'DealSubject',
        url: 'Organization',
        message: 'comment'
      }
    },
    {
      displayName: "Penny Pinchin' Mom",
      submissionUrl: 'http://www.pennypinchinmom.com/contact-me/',
      formId: 'gform_3',
      fieldIds: {
        firstName: 'input_3_1_3',
        lastName: 'input_3_1_6',
        email: 'input_3_3',
        subject: null,
        url: null,
        message: 'input_3_4'
      }
    },
    {
      displayName: 'Passion For Savings',
      submissionUrl: 'http://www.passionforsavings.com/contact-us/',
      formId: 'gform_1',
      fieldIds: {
        firstName: 'input_1_4',
        lastName: null,
        email: 'input_1_5',
        subject: 'input_1_1',
        url: 'input_1_6',
        message: 'input_1_3'
      }
    }
  ]


  // // Template
  // {
  //   displayName: null,
  //   submissionUrl: null,
  //   formId: null,
  //   fieldIds: {
  //     firstName: null,
  //     lastName: null,
  //     email: null,
  //     subject: null,
  //     url: null,
  //     message: null
  //   }
  // }
}

function getSupportedPage (url) {
  var supportedPages = getSupportedPages();
  for (var i = 0; i < supportedPages.length; ++i){
    if (supportedPages[i].submissionUrl == url){
      return supportedPages[i];
    }
  }

  return null;
}