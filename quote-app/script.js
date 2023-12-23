const newQuoteBtn = document.querySelector("#new-quote");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");

newQuoteBtn.addEventListener("click", loadQuote);

function loadQuote() {
  fetch("https://dummy-apis.netlify.app/api/quote")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      renderQuote(data);
    });
}

function renderQuote(data) {
  quote.innerText = "";
  const newQuoteText = document.createTextNode(data.quote);
  quote.appendChild(newQuoteText);

  author.innerText = "";
  const newAuthorText = document.createTextNode(data.author);
  author.appendChild(newAuthorText);
}
