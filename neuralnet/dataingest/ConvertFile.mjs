

 export function cvsToJson(fileName){
   // let fileSystem = require('fs');
  //  let file = fileSystem.readFile(fileName,'utf8',(err,data) => {
   //     if(err){
   //         console.log("err");
   //     }else{
  //          console.log(data);
  //      }
  //  });
    let file = "1,2,3,4,5 1,2,3,4,5 1,2,3,4,5 1,2,3,4,5";
    let rows = file.split(" ");
    //console.log(rows);

    let json = [];
   let test = rows.map( (x) => {cvsRowToArray(x)} );
   
  
  }

function arrayToJson(arr){
    const FIELDS = ["first","second","third","forth","fith"];
    console.log(arr);
    let tempJSON = FIELDS.map( (x,i) => {i})
    console.log(tempJSON);

    return JSON.stringify(tempJSON);
}
function cvsRowToArray(cvsRow){
    
    let arr = cvsRow.split(",");
    console.log(arr + "as");
    return arr;

}

function openFile(fileName){
    
}

