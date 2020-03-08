import fs from "fs";
import moment from "moment";

//var csv is the CSV file with headers
const csvToArray = csv => {
  let lines = csv.split("\n");

  let result = [];

  for (let i = 1; i < lines.length; i++) {
    let currentline = lines[i].split(",");
    result.push(currentline);
  }
  return result; //JSON
};

const filterVehicleFeatures = dataset => {
  let accept = ["Ice/frost", "Snow", "Slush"];
  let acceptCities = ["DES MOINES", "WEST DES MOINES"];

  return dataset.filter(
    x => acceptCities.includes(x[5]) && accept.includes(x[13])
  );
};

const filterWeatherFeatures = dataset => {
  const excludeCols = [0, 5, 6, 8, 10, 12];
  return dataset.map(x => {
    const newRow = [];
    for (let ci = 0; ci < x.length; ci++) {
      if (!excludeCols.includes(ci)) {
        newRow.push(x[ci]);
      }
    }

    return newRow;
  });
};

const loadVehicleData = () => {
  try {
    const content = fs.readFileSync(
      "C:/Users/chris/datasets/crash-data-iowa.csv",
      "utf8"
    );
    const unfilteredArr = csvToArray(content.toString());
    return filterVehicleFeatures(unfilteredArr).sort((x, y) => {
      const d1 = moment(x[2], "MM/DD/YYYY hh:mm:ss A");
      const d2 = moment(y[2], "MM/DD/YYYY hh:mm:ss A");
      return d1.valueOf() - d2.valueOf();
    });
  } catch (error) {
    console.error(error);
  }
};

const loadWeatherData = afterDate => {
  try {
    const content = fs.readFileSync(
      "C:/Users/chris/datasets/weather-data.txt",
      "utf8"
    );
    const rawWeatherData = csvToArray(content.toString());
    const filteredWeatherArray = filterWeatherFeatures(rawWeatherData);
    let firstRelWeatherInd = filteredWeatherArray.findIndex(weatherRow => {
      return moment(weatherRow[0], "MM/DD/YYYY H:mm:ss").isSameOrAfter(
        afterDate
      );
    });
    // console.log({ firstRelInd: firstRelWeatherInd, afterDate });
    return filteredWeatherArray.slice(firstRelWeatherInd);
  } catch (error) {
    console.error(error);
  }
};

function getCountsPerHour(dataset, dateTime, lastInd) {
  const accidentsForHour = [];
  const nextHour = dateTime.add(1, "hour");
  for (let i = lastInd; i < dataset.length; i++) {
    const crashTime = moment(dataset[i][2], "MM/DD/YYYY hh:mm:ss A");
    if (crashTime.isBefore(nextHour)) {
      accidentsForHour.push(dataset[i]);
    } else {
      lastInd = i;
      break;
    }
  }

  const numFatal = accidentsForHour.filter(x => x[12] == "Fatal").length;
  const numMaj = accidentsForHour.filter(x => x[12] == "Major Injury").length;
  const numMin = accidentsForHour.filter(x => x[12] == "Minor Injury").length;
  const numProp = accidentsForHour.filter(
    x => x[12] == "Possible/Unkown" || x[12] == "Property Damage Only"
  ).length;

  return {
    lastInd,
    sums: [numFatal, numMaj, numMin, numProp]
  };
}

const vehData = loadVehicleData();

const firstVehDataTime = moment(vehData[0][2], "MM/DD/YYYY hh:mm:ss A");
const weatherData = loadWeatherData(firstVehDataTime);
console.log(weatherData.length);
let lastVehTimeInd = 0;
const outData = weatherData.map((x, ind) => {
  const currHour = moment(x[0], "MM/DD/YYYY H:mm:ss").add(x[1], "hours");

  const hourInfo = getCountsPerHour(vehData, currHour, lastVehTimeInd);
  lastVehTimeInd = hourInfo.lastInd;

  console.log(`${(ind / weatherData.length) * 100} %`);

  return [...x, ...hourInfo.sums];
});

let finalCsv = "";
for (let i = 0; i < outData.length; i++) {
  finalCsv += outData[i].join(",") + "\n";
}

fs.writeFile("C:/Users/chris/datasets/nn_input_data.csv", finalCsv, function(
  err
) {
  if (err) return console.error(err);
});
