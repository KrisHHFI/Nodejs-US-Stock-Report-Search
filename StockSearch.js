// Simple US stock report program. Availability limited to Polygon.io coverage. Created by Kristopher Pepper, in 2022.
// User must input their own Polygon.io API key to the apiKey variable (free membership available).
console.log('_____________________________________________________________________________________________________________________________________\n' +
  '                                                            |                                                                        |\n' +
  '88    88  .8888.    .8888.  88888888  .88.   .8888.  88  8\' |   ________                                                             |\n' +
  '88    88  88.       88.        88    .8  8.  88      88 8\'  |  |        |\\             Created by Kristopher Pepper, 2023.           |\n' +
  '88    88  \'8888.    \'8888.     88    8    8  88      888    |  |US STOCK|  \\                                                         |\n' +
  '88    88     \'88       \'88     88    \'8  8\'  88      88 8.  |  | REPORT |    \\                                                       |\n' +
  ' \'8888\'   \'8888\'    \'8888\'     88     \'88\'   \'8888\'  88  8. |  | ------ |      \\   Note:                                             |\n' +
  '                                                            |  | ------- ‾‾‾‾‾‾ |  - Simply search for companies by their ticker.    |\n' +
  '                                                            |  | -------------- |  For example - aapl or tsla or mcd ...             |\n' +
  '    88888.   888888  88888.   .88.   88888.  88888888       |  | -------------- |  - Availability limited to Polygon.io and those    |\n' +
  '    88  88   88      88  88  .8  8.  88  88     88          |  | -------------- |  searchable by both "Ticker Details V3" and        |\n' +
  '    8888     888888  88888\'  8    8  8888       88          |  | -------------- |  "Stock Financials VX".                            |\n' +
  '    88 \'8.   88      88      \'8  8\'  88 \'8.     88          |  | -------------- |  - The data here may be out of date or inaccurate. |\n' +
  '    88  \'8.  888888  88       \'88\'   88  \'8.    88          |  |________________|  Please don\'t invest based of off this data!       |\n' +
  '____________________________________________________________|________________________________________________________________________|\n');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const apiKey = 'bd4AaEVBAzq0QKuV4AM9e5DTt6_2QcOb'; // Personal api key.
let tickerList = []; // Only used for testing purposes

function displayTickerTable(tickerList, tickerProfile) { // Prints ticker table to screen.
  console.table(tickerProfile);
  USStockSearch();
}

async function apiFetch(url, fetchName) { // The API fetch, which is used twice to two different end points.
  const response = await fetch(url);
  var data = await response.json();
  if ((!response.ok) || (response.statusText == 'Too Many Requests') || (data.status == 'ERROR') || data.results.length == 0) {
    var data = 'Fail';
    console.log(fetchName + ' failed. Server response: ' + response.statusText + '.');
    return data;
  } else {
    data = data.results;
    return data;
  }
}

async function addToListTickerDetailsV3(url, tickerProfile) {
  let fetchName = 'TickerDetailsV3';
  let result = await apiFetch(url, fetchName);
  if (result == 'Fail') {
  } else {
    tickerProfile.Ticker = result.ticker;
    tickerProfile.Name = result.name;
    let rawDescription = result.description;
    let rawDescriptionArray = rawDescription.split(" ");
    for (let i = 0; i < rawDescriptionArray.length; i++) {
      if (i < 10) {
        tickerProfile.l1 += rawDescriptionArray[i] + ' ';
      } else if (i >= 10 && i <= 20) {
        tickerProfile.l2 += rawDescriptionArray[i] + ' ';
      } else if (i > 20 && i <= 30) {
        tickerProfile.l3 += rawDescriptionArray[i] + ' ';
      } else if (i > 30 && i <= 40) {
        tickerProfile.l4 += rawDescriptionArray[i] + ' ';
      } else if (i > 40 && i <= 50) {
        tickerProfile.l5 += rawDescriptionArray[i] + ' ';
      } else if (i > 50 && i <= 60) {
        tickerProfile.l6 += rawDescriptionArray[i] + ' ';
      } else if (i > 60 && i <= 70) {
        tickerProfile.l7 += rawDescriptionArray[i] + ' ';
      } else if (i > 70 && i <= 80) {
        tickerProfile.l8 += rawDescriptionArray[i] + ' ';
      } else if (i > 80 && i <= 90) {
        tickerProfile.l9 += rawDescriptionArray[i] + ' ';
      } else if (i > 90 && i <= 100) {
        tickerProfile.l10 += rawDescriptionArray[i] + ' ';
      } else if (i > 100 && i <= 110) {
        tickerProfile.l11 += rawDescriptionArray[i] + ' ';
      } else if (i > 110 && i <= 120) {
        tickerProfile.l12 += rawDescriptionArray[i] + ' ';
      } else if (i > 120 && i <= 130) {
        tickerProfile.l13 += rawDescriptionArray[i] + ' ';
      } else if (i > 130 && i <= 140) {
        tickerProfile.l14 += rawDescriptionArray[i] + ' ';
      } else if (i > 140 && i <= 150) {
        tickerProfile.l15 += rawDescriptionArray[i] + ' ';
      }
    }

    tickerProfile.SIC_Description = result.sic_description;
    tickerProfile.Locale = result.locale;
    tickerProfile.Total_Employees = result.total_employees.toLocaleString("en-US");;
    tickerProfile.Market = result.market;
    tickerProfile.Primary_Exchange = result.primary_exchange;
    tickerProfile.Type = result.type;
    tickerProfile.Active = result.active;
    tickerProfile.Currency = result.currency_name;
    tickerProfile.Website = result.homepage_url;
    tickerProfile.Market_Cap = Math.trunc(result.market_cap).toLocaleString("en-US");
    tickerProfile.Weighted_Shares_Outstanding = (result.weighted_shares_outstanding).toLocaleString("en-US");
    tickerProfile.Market_Value_Per_Share = Number((result.market_cap / result.weighted_shares_outstanding).toFixed(2));
  }
}

async function addToListTickerDetailsVX(url, tickerProfile) {
  let fetchName = 'TickerDetailsVX';
  let result = await apiFetch(url, fetchName);
  if (result == 'Fail') {
    setTimeout(function () {
      USStockSearch();
    }, 1000);
  } else {
    //tickerList.push((result));
    //tickerList.push((result[0].financials));
    tickerList.push((result[0].financials.balance_sheet));
    tickerProfile.Fiscal_Period = result[0].fiscal_year + ', ' + result[0].fiscal_period;
    tickerProfile.Total_Assets = (result[0].financials.balance_sheet.assets.value).toLocaleString("en-US");
    tickerProfile.Total_Liabilities = (result[0].financials.balance_sheet.liabilities.value).toLocaleString("en-US");
    tickerProfile.Current_Assets = (result[0].financials.balance_sheet.current_assets.value).toLocaleString("en-US");
    tickerProfile.Current_Liabilities = (result[0].financials.balance_sheet.current_liabilities.value).toLocaleString("en-US");
    tickerProfile.Current_Ratio = Number((result[0].financials.balance_sheet.current_assets.value /
      result[0].financials.balance_sheet.current_liabilities.value).toFixed(2));
    tickerProfile.Earnings_Per_Share = result[0].financials.income_statement.basic_earnings_per_share.value;
    tickerProfile.PE_Ratio = Number((tickerProfile.Market_Value_Per_Share / (result[0].financials.income_statement.basic_earnings_per_share.value)).toFixed(2));
    setTimeout(function () {
      displayTickerTable(tickerList, tickerProfile);
    }, 500)
  }
}

USStockSearch();
function USStockSearch() {
  let tickerProfile = {
    PROFILE: '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯',
    Ticker: '', Name: '', SIC_Description: '', Website: '', Locale: '', Market: '', Total_Employees: 0, Primary_Exchange: '',
    Type: '', Active: '', Currency: '',
    DESCRIPTION: '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯',
    l1: '', l2: '', l3: '', l4: '', l5: '', l6: '', l7: '', l8: '', l9: '', l10: '', l11: '', l12: '', l13: '', l14: '', l15: '',
    STATISTICS: '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯',
    Market_Cap: 0, Weighted_Shares_Outstanding: '', Market_Value_Per_Share: 0, Earnings_Per_Share: 0,
    BALANCE_SHEET: '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯',
    Fiscal_Period: '', Total_Assets: 0, Total_Liabilities: 0, Current_Assets: 0, Current_Liabilities: 0,
    VALUATION_MEASURES: '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯',
    PE_Ratio: 0, Current_Ratio: ''
  };

  readline.question('\Search ticker = s | Exit = e : ', userPrompt => {
    if (userPrompt == 's') {
      readline.question('\nEnter ticker characters: ', tickerInput => {
        if (tickerInput == '') {
          console.log('Input cannot be blank.');
          USStockSearch();
        } else { // API's fetched one at a time.
          function firstAPIFetch() {
            let url = 'https://api.polygon.io/v3/reference/tickers/' + tickerInput.toUpperCase() + '?apiKey=' + apiKey;
            addToListTickerDetailsV3(url, tickerProfile);
          }

          function secondAPIFetch() {
            url = 'https://api.polygon.io/vX/reference/financials?ticker=' + tickerInput.toUpperCase() + '&timeframe=annual&apiKey=' + apiKey;
            addToListTickerDetailsVX(url, tickerProfile);
          }
          firstAPIFetch();
          secondAPIFetch();
        }
      });
    } else if (userPrompt == 'e') {
      readline.close();
      return;
    }
    else {
      console.log('Incorrect value.');
      USStockSearch();
    }
  });
}