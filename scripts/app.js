let tel = document.getElementById("phone");
// declaration of a new dom for option form
let resOption = document.getElementById("restrict-network");
// end of declaration of a new dom for option form
let networkContainer = document.querySelector(".network-div");
let errorDisplay = document.querySelector(".error-display");

// declaration of patterns
let _9mobPattern =
  /^0909|^0908|^0818|^0809|^0817|^(\+|)234909|^(\+|)234908|^(\+|)234818|^(\+|)234809|^(\+|)234817/;
let _mtnPattern =
  /^0803|^0816|^0903|^0810|^0806|^0703|^0706|^0813|^0814|^0906|^(\+|)234803|^(\+|)234816|^(\+|)234903|^(\+|)234810|^(\+|)234806|^(\+|)234703|^(\+|)234706|^(\+|)234813|^(\+|)234814|^(\+|)234906/;
let _airtelPattern =
  /^0907|^0708|^0802|^0902|^0812|^0808|^0701|^(\+|)234907|^(\+|)234708|^(\+|)234802|^(\+|)234902|^(\+|)234812|^(\+|)234808|^(\+|)234701/;
let _gloPattern =
  /^0805|^0905|^0807|^0811|^0705|^0815|^(\+|)234805|^(\+|)234905|^(\+|)234807|^(\+|)234811|^(\+|)234705|^(\+|)234815/;

eventHandler(tel.addEventListener, "input");
eventHandler(resOption.addEventListener, "change");

//event handler to handle all events
function eventHandler(domEvent, event_) {
  domEvent(event_, () => {
    let phoneNumber = tel.value;
    let phoneNumberRegex = /^[0-9]{4,15}$/;

    //start of adding if statement to validate +234 numbers
    let prefixRegex = /^(\+|)234/;
    if (prefixRegex.test(phoneNumber)) {
      if (phoneNumber[0] == "+") {
        phoneNumber = 0 + phoneNumber.substring(4);
      } else {
        phoneNumber = 0 + phoneNumber.substring(3);
      }
    }
    //end of adding if statement for validate +234 numbers

    if (phoneNumber) {
      if (phoneNumberRegex.test(phoneNumber)) {
        //start: initialise restriction variable `filterNetwork`
        let filterNetwork = document.getElementById("restrict-network").value;
        let provider = getProvider(phoneNumber);
        displayProvider(provider);
        if (provider === null) {
          errorDisplay.innerHTML = `<p class="display">The network provider is unknown</p>`;
        }
        // added conditional for network restriction
        else if (provider == filterNetwork.toLowerCase()) {
          // Change textbox when restriction is active

          let _9mobPatStr = _9mobPattern.toString();
          // convert patterns to strings
          _9mobPatStr = _9mobPatStr.substring(1, _9mobPatStr.length - 1);
          let _airtelPatStr = _airtelPattern.toString();
          _airtelPatStr = _airtelPatStr.substring(1, _airtelPatStr.length - 1);
          let _mtnPatStr = _mtnPattern.toString();
          _mtnPatStr = _mtnPatStr.substring(1, _mtnPatStr.length - 1);
          let _gloPatStr = _gloPattern.toString();
          _gloPatStr = _gloPatStr.substring(1, _gloPatStr.length - 1);
          // end of convert patterns to strings

          if (filterNetwork.toLowerCase() == "9mobile") {
            tel.setAttribute(
              "pattern",
              _airtelPatStr + "|" + _mtnPatStr + "|" + _gloPatStr
            );
            errorDisplay.innerHTML = `<p class="display">${provider} is restricted</p>`;
          } else if (filterNetwork.toLowerCase() == "airtel") {
            tel.setAttribute(
              "pattern",
              _9mobPatStr + "|" + _mtnPatStr + "|" + _gloPatStr
            );
            errorDisplay.innerHTML = `<p class="display">${provider} is restricted</p>`;
          } else if (filterNetwork.toLowerCase() == "mtn") {
            tel.setAttribute(
              "pattern",
              _airtelPatStr + "|" + _9mobPatStr + "|" + _gloPatStr
            );
            errorDisplay.innerHTML = `<p class="display">${provider} is restricted</p>`;
          } else if (filterNetwork.toLowerCase() == "glo") {
            tel.setAttribute(
              "pattern",
              _airtelPatStr + "|" + _mtnPatStr + "|" + _9mobPatStr
            );
            errorDisplay.innerHTML = `<p class="display">${provider} is restricted</p>`;
          }
          tel.setAttribute("class", "restricted");
        }
        // end of added conditional for network restriction
        else {
          tel.setAttribute("class", "");
          errorDisplay.innerHTML = `<p class="display">This is ${provider} number</p>`;
        }
      } else {
        if (/[^0-9]/.test(phoneNumber)) {
          errorDisplay.innerHTML = "❌ Input must be a phone number";
        }
      }
    } else {
      if (!phoneNumber) {
        networkContainer.innerHTML = "";
        errorDisplay.innerHTML = "";
      }
    }
  });
}

const getProvider = (phone) => {
  if (_9mobPattern.test(phone)) {
    return "9mobile";
  } else if (_airtelPattern.test(phone)) {
    return "airtel";
  } else if (_gloPattern.test(phone)) {
    return "glo";
  } else if (_mtnPattern.test(phone)) {
    return "mtn";
  } else {
    return null;
  }
};

const displayProvider = (provider) => {
  if (provider === null) {
  } else {
    const path = `/media/${provider}.svg`;
    networkContainer.innerHTML = `<img src="${path}" alt="${provider}'s Logo" class="network">`;
  }
};
