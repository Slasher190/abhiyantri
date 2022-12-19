const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',
  headers: {
    'X-RapidAPI-Key': '53fa27b24amsh4434edb036ce8fdp1240ddjsnf833a435c871',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


// export const PostData = (path) => {
//   const options = {
//     method: 'POST',
//     url: path,
//     headers: {

//     }
//   }
// }