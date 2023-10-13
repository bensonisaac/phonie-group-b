let tel = document.getElementById("phone");
let networkContainer = document.querySelector(".network-div");
let errorDisplay = document.querySelector(".error-display");

tel.addEventListener("input", () => {
  let phoneNumber = tel.value;
  let phoneNumberRegex = /^[0-9]{4,15}$/;

  if (phoneNumber) {
    if (phoneNumberRegex.test(phoneNumber)) {
      let provider = getProvider(phoneNumber);
      displayProvider(provider);
      if (provider === null) {
        errorDisplay.innerHTML = `<p class="display">The network provider is unknown</p>`;
      } else {
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

const getProvider = (phone) => {
  if (/^0909|^0908|^0818|^0809|^0817/.test(phone)) {
    return "9mobile";
  } else if (/^0907|^0708|^0802|^0902|^0812|^0808|^0701/.test(phone)) {
    return "airtel";
  } else if (/^0805|^0905|^0807|^0811|^0705|^0815/.test(phone)) {
    return "glo";
  } else if (
    /^0803|^0816|^0903|^0810|^0806|^0703|^0706|^0813|^0814|^0906/.test(phone)
  ) {
    return "mtn";
  } else {
    return null;
  }
};

const displayProvider = (provider) => {
  const path = `../media/${provider}.svg`;
  networkContainer.innerHTML = `<img src="${path}" alt="${provider}'s Logo" class="network">`;
};
