// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const path = require('path');
const fs = require('fs');
const _ = require("lodash");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  return page;
};

//Saves and formats the data
const saveDataToFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data saved to:", filePath);
};

const scrapeNewestHundredpart1 = async (page) => {
  //My inital method was only effective in grabbing the rank and title as the tr.athing does not include the ISO8601 date I need for data validation
    return page.$$eval("tr.athing", (repoCards) => {
      return repoCards.map((card) => {
        const rank = card.querySelector("span.rank");
        const title = card.querySelector("span.titleline");
        //const postTimeElement = card.querySelector("span.age");
        //span.age =>title = ISO8601 formatting as of 10/22/24
        const formatText = (element) => element && element.innerText.trim();
        var rankCleaned = formatText(rank);
        return {
          rank: parseInt(rankCleaned.slice(0, -1)),
          title: formatText(title),
        };
      });
    });
};

const scrapeNewestHundredpart2 = async (page) => {
    return page.$$eval("td.subtext", (repoCards) => {
      return repoCards.map((card) => {
        const age = card.querySelector("span.age");
        //span.age =>title = ISO8601 formatting as of 10/22/24
        return {
          postTime: age.title,
        };
      });
    });
  };

  //Simply grabs the unique class morelink to navigate to the next page
  const nextPageNavigator = async (page) => {
    const nextPage = await page.locator('a.morelink').click();
  }

(async () => {
  const page = await sortHackerNewsArticles();
  const filePath = path.join(__dirname, "data.json");
  const errorLog = [];

  //Scrapes first page 30 articles and combines data into json card for git
  var firstHalfCard = await scrapeNewestHundredpart1(page);
  var secondHalfCard = await scrapeNewestHundredpart2(page);
  //Shallow merge did not work with card objects so lodash for simple deep merge
  var fullData = _.defaultsDeep(firstHalfCard, secondHalfCard);

  //while the data array is under 100 entries
  while (fullData.length < 100) {
    //Moves to next page to grab n+30
    await nextPageNavigator(page);
    var firstHalfCard = await scrapeNewestHundredpart1(page);
    var secondHalfCard = await scrapeNewestHundredpart2(page);

    var addData = _.defaultsDeep(firstHalfCard, secondHalfCard);

    fullData.push.apply(fullData, addData);
  }
  
  for (let i = 0; i < (fullData.length - 1); i++) {
    lowerRank = fullData[i].rank;
    higherRank = fullData[i+1].rank;
    //Slice used to parse into Date format
    soonerPost = new Date((fullData[i].postTime).slice(0, -11));
    laterPost = new Date((fullData[i+1].postTime).slice(0, -11));
    if (lowerRank > higherRank){
      errorLog.push("Incorrect due to order of rank" + lowerRank);
    }
    if(soonerPost.getTime() < laterPost.getTime()) {
      errorLog.push("Incorrect at rank " + lowerRank + " due to order of postTime: " + soonerPost + " < " + laterPost);
    }
  }

  //Saving report data since website updates in real time
  saveDataToFile(filePath, fullData);

  if (errorLog.length != 0) {
    for (let i = 0; i < errorLog.length; ++i) {
      console.log(errorLog[i]);
    }
  }
  else{
    console.log("No errors found.")
  }
  
  process.exit(1);
})();
