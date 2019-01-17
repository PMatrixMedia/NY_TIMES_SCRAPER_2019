import axios from "axios";
const apikey = 'peVTWltlVXnlOHViygJEhI0AyqGRzT3G'

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  },


  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/" + id)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  
  // Saves a book to the database
  saveArticle: function(articleData) {
    console.log(articleData);
    return axios.post("/api/articles", articleData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },


  findArticles: function(topic, startYear, endYear) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231" + "&api-key=" + apikey);
  }
};
