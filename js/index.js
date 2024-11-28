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


      if (destination.includes("australia") || destination.includes("japan") || destination.includes("brazil")) {
         const countryArray = data.countries;

         countryArray.forEach(country => {
            country.cities.forEach(city => {

               if (city.name.toLowerCase().includes(destination)) {
                  searchResults.push(
                     {
                        name: city.name,
                        imageUrl: city.imageUrl,
                        description: city.description
                     }
                  );
               }
            });
         });
      } else if (destination.includes("temple")) {
         const templesArray = data.temples;

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
         const beachesArray = data.beaches;

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
      resultsContainer.innerHTML = "";

      if (searchResults.length !== 0) {
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
      } else {
         resultsContainer.style.display = "none";
      }
   }).catch((error) => {
      console.error(error);
   });
});

clearButton.addEventListener("click", () => {
   resultsContainer.innerHTML = "";
   resultsContainer.style.display = "none";
});