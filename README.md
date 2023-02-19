# Nodejs-US-Stock-Report-Search

<img src="https://images.squarespace-cdn.com/content/v1/587b630aebbd1ab22efeeb6b/7b3c1611-c613-4138-9164-edbc392d06f9/US+Stock+Report+Nodejs.png"/>

Check out the [demo video](https://youtu.be/CV4IY6x_gTQ).

### Launch the App

1) Download Node.js and JavaScript.
2) Download the StockSearch.js file.
3) Create a Polygon.io account (free memberships are available).
4) Find your Polygon.io unique key.
5) Edit the StockSearch.js file and paste your API key as the apiKey variable text.
4) In your terminal, navigate to the file folder. Then execute: node StockSearch.js 
The App should run. If not, ensure that the file is a JavaScript file and that you are in the correct folder location.

### About

- The app was created in February 2023.
- It enables the user to search for listed companies via their ticker. 
- Search listed US mid-large cap companies. E.g mcd or tsla or cat ...
- The app shows end of day market data and some basic financial data from the most recently available balance sheet.
- Companies must listed on Polygon.io and be featured on their "Ticker Details v3" and "Stock Financials vX" endpoints.
- If you make "Too Many Requests" (add more than 5 tickers within 1 minutes), then just wait 1 minute.
- The data may be outdated and sometimes even inaccurate. So, PLEASE DO NOT MAKE FINANCIAL DECISIONS ACCORDING TO THIS DATA.
- App functionality may be affected by future changes to Polygon.io or Node.js.
