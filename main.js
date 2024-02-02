// Function to start fetching news data and initiate the Web Worker
function startFetching() {
  // Create a Web Worker
  const worker = new Worker("worker.js");

  // Listen for messages from the worker
  worker.onmessage = function (event) {
    console.log(event.data);
    displayData(event.data);

    worker.terminate();
  };

  // Start fetching news data
  const date = document.getElementById("date").value;

  // API URL for fetching news data about Health
  const url = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Configure it: GET-request for the specified URL
  xhr.open('GET', url, true);

  // Setup callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // Successful response
        const data = JSON.parse(xhr.responseText);

        // Send data to the Web Worker for filtering based on the date
        worker.postMessage({ newsData: data.articles, selectedDate: date });
      } else {
        // Error handling
        console.error("Error fetching news data. Status:", xhr.status);
      }
    }
  };

  // Send the request
  xhr.send();
}

// Function to display filtered news data in the table
function displayData(filteredNewsData) {
  const tableBody = document.getElementById("table");
  tableBody.innerHTML = ""; // Clear previous data

  // Display filtered news data in the table
  filteredNewsData.forEach((article, index) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${article.title}</td>
      <td>${article.publishedAt}</td>
      <td><a href="${article.url}" target="_blank">Visit</a></td>
    `;
  });
}
