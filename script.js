"use strict";

const display = function (className, message) {
  document.querySelector("." + className).textContent = message;
};
const insertedValue = function (className) {
  return document.querySelector("." + className).value;
};
const clickAction = function (className, action) {
  document
    .querySelector("." + className)
    .addEventListener("click", function () {
      action();
    });
};

let action1 = function () {
  let city = insertedValue("city");
  if (!city) {
    display("result", "No city selected. Please try again!");
    display("region", "");
    display("temp", "");
    display("weather", "");
  } else {
    let first = "http://api.openweathermap.org/data/2.5/weather?q=";
    let last = "&APPID=4b299a41807a027d6e35536849d106c1";
    let apiLink = first + city + last;
    fetch(apiLink)
      .then((res) => res.json())
      .then((data) => {
        let cityName = data["name"];
        let countryName = data["sys"]["country"];
        let temp = Math.floor(Number(data["main"]["temp"]) - 273);
        let weather = data["weather"][0]["main"];

        display("result", "");
        display("region", `Region: ${cityName}, ${countryName}`);
        display("temp", `Temperature: ${temp}℃`);
        display("weather", `Weather: ${weather}`);
      })
      .catch((err) => {
        display("result", "No such city found. Please try again!");
        display("region", "");
        display("temp", "");
        display("weather", "");
      });
  }
};
clickAction("search", action1);
