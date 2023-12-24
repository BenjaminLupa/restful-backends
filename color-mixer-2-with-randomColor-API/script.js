const colorSlider = document.querySelector("#color-slider");
const body = document.querySelector("body");
const redNumber = document.querySelector("#red-number");
const greenNumber = document.querySelector("#green-number");
const blueNumber = document.querySelector("#blue-number");

const randomColorBtn = document.querySelector("#randomColor");

colorSlider.addEventListener("input", (color) => {
  changeColor("--redValue", red.value);
  changeColor("--greenValue", green.value);
  changeColor("--blueValue", blue.value);

  redNumber.innerHTML = red.value;
  greenNumber.innerHTML = green.value;
  blueNumber.innerHTML = blue.value;
});

function changeColor(customColor, colorValue) {
  body.style.setProperty(customColor, colorValue);
}

randomColorBtn.addEventListener("click", loadQuote);

function loadQuote() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      changeColor("--redValue", data.rgb.r);
      changeColor("--greenValue", data.rgb.g);
      changeColor("--blueValue", data.rgb.b);

      colorSlider.red.value = data.rgb.r;
      colorSlider.green.value = data.rgb.g;
      colorSlider.blue.value = data.rgb.b;

      redNumber.innerHTML = data.rgb.r;
      greenNumber.innerHTML = data.rgb.g;
      blueNumber.innerHTML = data.rgb.b;
    });
}
