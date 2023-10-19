# OSRS Item Flipper
Welcome to the OSRS Item Flipper project! This Node.js script allows you to fetch data from the Old School RuneScape (OSRS) API and export it to CSV files for further analysis.

## Getting Started
To get started, follow these steps to clone the repository and run the project on your local machine:

1. Clone the Repository: Open your terminal and run the following command to clone this repository to your local machine:
```bash
git clone https://github.com/dcriggs/osrs-item-flipper.git
```

2. Navigate to the Project Directory: Change your current working directory to the cloned repository:
```bash
cd osrs-item-flipper
```

3. Install Dependencies: Before running the script, you need to install the required dependencies. Use npm to install them:
```bash
npm install
```

4. Run the Script: You can run the script to fetch OSRS data and export it to CSV files. Use the following command:
```bash
node osrs.js
```

The script will fetch data from three different OSRS API endpoints and export it as CSV files in your local "exports" folder.

## Configuration
The script is set up to fetch data from the following OSRS API endpoints:

* Item Mapping Data: https://prices.runescape.wiki/api/v1/osrs/mapping
* Hourly Item Data: https://prices.runescape.wiki/api/v1/osrs/1h
* Latest Item Data: https://prices.runescape.wiki/api/v1/osrs/latest

You can customize the behavior and endpoints in the script as needed.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Happy OSRS data analysis!
