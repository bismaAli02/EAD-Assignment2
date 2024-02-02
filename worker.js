// Web Worker script for processing data
onmessage = function (event) {
  const { newsData, selectedDate } = event.data;

  // Perform data processing (filter based on date)
  const filteredData = newsData.filter((article) => {
    const articleDate = new Date(article.publishedAt)
      .toISOString()
      .split("T")[0];
    return articleDate >= selectedDate;
  });

  // Send filtered data back to the main script
  postMessage(filteredData);
};