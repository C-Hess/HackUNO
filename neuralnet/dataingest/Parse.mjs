//var csv is the CSV file with headers
function csvJSON(csv) {
  let lines = csv.split("\n");

  let result = [];

  console.log("before");

  let headers = lines[0].split(",");
  for (let i = 1; i < lines.length; i++) {
    let obj = {};
    let currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

let vehicleFile = "Users/chris/datasets";
result = csvJSON(vehicleFile);
console.log(result.length);
