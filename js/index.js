"use strict";

const travelForm = document.getElementById("search-form");
const resultsContainer = document.getElementById("results-container");
const clearButton = document.getElementById("clear-button");

travelForm.addEventListener("submit", (event) => {
   event.preventDefault();
   const destination = document.getElementById("search").value.toLowerCase().trim();

   axios({
      method: "GET",
      url: "travel_recommendation_api.json"
   }).then((response) => {
      const data = response.data;
      let searchResults = [];

      const countryArray = data.countries;
      const templesArray = data.temples;
      const beachesArray = data.beaches;

      if (destination.includes("country" || "countries")) {
         countryArray.forEach(country => {
            country.cities.forEach(city => {
               searchResults.push(
                  {
                     name: city.name,
                     imageUrl: city.imageUrl,
                     description: city.description
                  }
               );
            });
         });
      } else if (destination.includes("temple")) {
         templesArray.forEach(temple => {
            searchResults.push(
               {
                  name: temple.name,
                  imageUrl: temple.imageUrl,
                  description: temple.description
               }
            );
         });
      } else if (destination.includes("beach")) {
         beachesArray.forEach(beach => {
            searchResults.push(
               {
                  name: beach.name,
                  imageUrl: beach.imageUrl,
                  description: beach.description
               }
            );
         });
      }

      resultsContainer.style.display = "flex";
      searchResults.forEach(result => {
         const resultElement = document.createElement("article");

         resultElement.innerHTML = `
            <img class="result-image" src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
            <button class="book-button">Book Now</button>
         `;

         resultsContainer.appendChild(resultElement);
      });
   }).catch((error) => {
      console.error(error);
   });
});

clearButton.addEventListener("click", () => {
   resultsContainer.innerHTML = "";
   resultsContainer.style.display = "none";
});