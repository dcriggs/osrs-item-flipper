const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Import 'node-fetch' using dynamic import
import("node-fetch").then((fetchModule) => {
  const fetch = fetchModule.default;

  // Function to fetch and process item mapping data
  async function fetchOSRSItemMappingAndProcess() {
    try {
      // Fetch data from OSRS API
      const url = "https://prices.runescape.wiki/api/v1/osrs/mapping";
      const response = await fetch(url);
      const data = await response.json();

      // Export data to CSV with a timestamp
      exportDataToCSV(data, "item_mapping");
    } catch (error) {
      console.error("Error fetching and processing item mapping data:", error);
    }
  }

  // Function to fetch and process hourly item data
  async function fetchAndProcessHourlyItemData() {
    try {
      const url = "https://prices.runescape.wiki/api/v1/osrs/1h";
      const response = await fetch(url);
      const result = await response.json();

      if (result && result.data) {
        const dataObject = result.data;
        const dataArray = Object.values(dataObject);

        if (dataArray.length > 0) {
          // Extract the item data from the object and include the ID
          const formattedData = Object.entries(dataObject).map(
            ([id, values]) => ({
              id,
              ...values,
            })
          );

          exportDataToCSV(formattedData, "1h_item_prices");
        } else {
          console.error("No valid data received for hourly item data.");
        }
      } else {
        console.error("Invalid data received for hourly item data.");
      }
    } catch (error) {
      console.error("Error fetching and processing hourly item data:", error);
    }
  }

  // Function to fetch and process latest item data
  async function fetchAndProcessLatestItemData() {
    try {
      const url = "https://prices.runescape.wiki/api/v1/osrs/latest";
      const response = await fetch(url);
      const result = await response.json();

      if (result && result.data) {
        const dataObject = result.data;
        const dataArray = Object.values(dataObject);

        if (dataArray.length > 0) {
          // Extract the item data from the object and include the ID
          const formattedData = Object.entries(dataObject).map(
            ([id, values]) => ({
              id,
              ...values,
            })
          );

          exportDataToCSV(formattedData, "latest_item_prices");
        } else {
          console.error("No valid data received for latest item data.");
        }
      } else {
        console.error("Invalid data received for latest item data.");
      }
    } catch (error) {
      console.error("Error fetching and processing latest item data:", error);
    }
  }

  // Function to export data to a CSV file
  function exportDataToCSV(data, prefix) {
    if (!data || (!data.data && !Array.isArray(data))) {
      console.error(`No valid data received for ${prefix}.`);
      return;
    }

    // Convert data to an array if it's not already
    const dataArray = Array.isArray(data) ? data : Object.values(data.data);

    if (dataArray.length === 0) {
      console.error(`No valid data received for ${prefix}.`);
      return;
    }

    // Select the first item (assuming the structure is consistent)
    const firstItem = dataArray[0];

    // Define the current date and time
    const now = new Date();
    const timestamp = now.toLocaleString().replace(/[/:\s,]+/g, "_");

    // Define the filename with a timestamp
    const csvFilename = `./exports/${prefix}_${timestamp}.csv`;

    // Create the CSV writer with dynamic headers based on the first item
    const header = Object.keys(firstItem).map((header) => ({
      id: header,
      title: header,
    }));

    // Check if you're fetching from the 'mapping' API
    if (prefix.includes("item_mapping")) {
      header.push({ id: "limit", title: "limit" });
    }

    const csvWriter = createCsvWriter({
      path: csvFilename,
      header: header,
    });

    // Log headers
    //console.log("Headers for CSV:", Object.keys(firstItem));

    // Execute the export to CSV
    csvWriter
      .writeRecords(dataArray)
      .then(() =>
        console.log(`CSV file ${csvFilename} has been written successfully`)
      )
      .catch((error) => console.error("Error writing CSV file:", error));
  }

  // Call the functions to fetch and process data in sequence
  fetchOSRSItemMappingAndProcess();
  fetchAndProcessHourlyItemData();
  fetchAndProcessLatestItemData();
});
