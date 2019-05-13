window.addEventListener("load", Init);

function Init() {
  let url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

  console.log("init");

  const categoryArr = [
    "sport",
    "entertainment",
    "health",
    "science",
    "technology"
  ];

  Request(url, GetCurrency);
  for (let i = 0; i < categoryArr.length; i++) {
    NewsRequest(categoryArr[i], GetNews);
  }
}

function NewsRequest(category, callback) {
  let url = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&apiKey=18f1c87e444741aca30db0a569bba999`;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      var errStatus = xhr.status;
      var errText = xhr.statusText;
      console.log(errStatus + ": " + errText);
    } else {
      var data = JSON.parse(xhr.responseText);
      callback(category, data);
    }
  };
}

function Request(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      var errStatus = xhr.status;
      var errText = xhr.statusText;
      console.log(errStatus + ": " + errText);
    } else {
      var data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
}

function GetCurrency(data) {
  ///console.log("GetCurrency: ", data);

  let currency = document.querySelector("#currency");

  for (let i = 0; i < data.length; i++) {
    let ccy = document.createElement("div");
    ccy.className = "ccy";
    ccy.innerHTML = data[i].ccy;
    currency.appendChild(ccy);
    let base_ccy = document.createElement("div");
    base_ccy.className = "base_ccy";
    base_ccy.innerHTML = data[i].base_ccy;
    currency.appendChild(base_ccy);
    let buy = document.createElement("div");
    buy.className = "buy";
    buy.innerHTML = data[i].buy;
    currency.appendChild(buy);
    let sale = document.createElement("div");
    sale.className = "sale";
    sale.innerHTML = data[i].sale;
    currency.appendChild(sale);
    //console.log(data[i].ccy, " ", data[i].base_ccy, " buy: ", data[i].buy, " sale: ", data[i].sale);
  }
}

function GetNews(category, data) {
  if (category === "sport") {
    var sport = document.querySelector("#sport");
  } else if (category === "health") {
    var sport = document.querySelector("#health");
  } else if (category === "entertainment") {
    var sport = document.querySelector("#entertainment");
  } else if (category === "technology") {
    var sport = document.querySelector("#technology");
  } else if (category === "science") {
    var sport = document.querySelector("#science");
  }
  for (let i = 0; i < 5; i++) {
    let h3 = document.createElement("h3");
    h3.className = "newsTitle";
    h3.innerHTML = data.articles[i].title;
    sport.appendChild(h3);
    let img = document.createElement("img");
    img.className = "newsImg";
    img.setAttribute("alt", "Image");
    img.setAttribute("src", data.articles[i].urlToImage);
    sport.appendChild(img);
    let desc = document.createElement("div");
    desc.className = "newsArticle";
    desc.innerHTML = data.articles[i].description;
    sport.appendChild(desc);
    let date = document.createElement("span");
    date.className = "newsPublishedAt";
    date.innerHTML = data.articles[i].publishedAt;
    sport.appendChild(date);
    let author = document.createElement("span");
    author.className = "newsAuthor";
    author.innerHTML = data.articles[i].author;
    sport.appendChild(author);
  }
}
