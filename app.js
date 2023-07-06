const searchBtn = document.getElementById("search-btn");
const countryInput = document.getElementById("country-input");
const result = document.getElementById("result");

countryInput.addEventListener("keypress", (event) => {
  const charCode = event.which || event.keyCode;
  const char = String.fromCharCode(charCode);

  const regex = /^[a-zA-Z\s]+$/;

  if (!regex.test(char)) {
    event.preventDefault();
    result.innerHTML = `<h3>You cannot provide number</h3>`;
  }
});

const getCountryData = async (countryName) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(xhr.status);
        }
      }
    };

    xhr.open(
      "GET",
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`,
      true
    );
    xhr.send();
  });

}



searchBtn.addEventListener("click", async () => {
  const countryName = countryInput.value;

  try {
    const data = await getCountryData(countryName);
    result.innerHTML = `
        <img
        class="flag-img"
        src="${data[0].flags.svg}" alt="img"/>
        <h2>${data[0].name.common}</h2>
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${data[0].capital[0]}</span>
        </div>
        <div class="data-wrapper">
            <h4>Continents:</h4>
            <span>${data[0].continents[0]}</span>
        </div>
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${data[0].currencies[Object.keys(data[0].currencies)].name
      }</span>
        </div>
        <div class="data-wrapper">
            <h4>Language:</h4>
            <span>${Object.values(data[0].languages).join(", ")}</span>
        </div>
      `;

  } catch (error) {
    if (countryName.length === 0) {
      result.innerHTML = `<h3>The input field cannot be empty</h3>`;
    } else {
      result.innerHTML = `<h3>Please enter valid country</h3>`;
    }
  }
});
