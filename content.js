function getIdQuery(id){
  return "#" + id;
}

function performSpecialSetUp(url){
  switch(url){
    
    case 'http://hip2save.com/contact/':
      document.getElementById('submitdealform').style.display = 'block';
      break;
    
    case 'http://www.passionforsavings.com/contact-us/':
      console.log("Setting up Passion for Savings");
      document.getElementById('input_1_2').value = "I'd like to Submit a HOT Deal";
      break;
  }
}

function fillForm(data){
  var pageInfo = data.pageInfo;
  var inputInfo = data.inputInfo;
  var form = document.getElementById(pageInfo.formId);

  // Do any necessary setup.
  performSpecialSetUp(pageInfo.submissionUrl);

  // Name
  if (pageInfo.fieldIds.lastName){
    form.querySelector(getIdQuery(pageInfo.fieldIds.lastName)).value = inputInfo.lastName;
  }
  else{
    form.querySelector(getIdQuery(pageInfo.fieldIds.firstName)).value = inputInfo.firstName + " " + inputInfo.lastName;
  }

  // Email
  if (pageInfo.fieldIds.email && inputInfo.email){
    form.querySelector(getIdQuery(pageInfo.fieldIds.email)).value = inputInfo.email;
  }

  // Subject
  if (pageInfo.fieldIds.subject && inputInfo.subject){
    form.querySelector(getIdQuery(pageInfo.fieldIds.subject)).value = inputInfo.subject;
  }

  // Url
  if (pageInfo.fieldIds.url && inputInfo.url){
    form.querySelector(getIdQuery(pageInfo.fieldIds.url)).value = inputInfo.url;
  }

  // Message
  if (pageInfo.fieldIds.message && inputInfo.message){
    var message = inputInfo.message;

    // If no url field was available, append the url to the message.
    if (!pageInfo.fieldIds.url && inputInfo.url){
      inputInfo.message += "\n\n" + inputInfo.url;
    }

    form.querySelector(getIdQuery(pageInfo.fieldIds.message)).value = message;
  }

  // Scroll the form into view.
  document.getElementById(pageInfo.formId).scrollIntoView();
}

chrome.runtime.sendMessage({submissionUrl: document.URL}, function(response) {
  chrome.storage.local.get('daisyInputInfo', function(data){
    fillForm({
      pageInfo: response,
      inputInfo: data.daisyInputInfo
    });
  });
});