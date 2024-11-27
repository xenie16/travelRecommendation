"use strict";

const apiUrl = "travel_recommendation_api.json";

const travelForm = document.getElementById("search-form");

travelForm.addEventListener("submit", (event) => {
   event.preventDefault();

   const destination = document.getElementById("search").value.toLowerCase();

   axios({
      method: "GET",
      url: apiUrl
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

      console.log(searchResults);
   }).catch((error) => {
      console.log(error);
   });
});