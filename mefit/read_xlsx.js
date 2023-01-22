const app = require('express')()
const xlsx = require('xlsx')
const fs = require('fs')
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile)

const convertExcelFileToJsonUsingXlsx = async (filepath) =>{
    // Read the file using pathname
    const file = xlsx.readFile(`${filepath}.xlsx`);
  
    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;
  
    // Variable to store our data
    let parsedData = [];
  
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
        // Convert to json using xlsx
        const sheetData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);

        // Add the sheet's json to our data array
        parsedData.push([sheetData]);
    }

    let fichaHeader = 0;
    const separatedSheets = []
    const fichasSheet = parsedData[0][0];
    // Loop through fichas
    for (let j = 1; j < fichasSheet.length; j++) {
        const line = fichasSheet[j];
        const lineIsFichaHeader = line.__EMPTY === "EXERCÍCIO";

        if (lineIsFichaHeader) {
            separatedSheets.push(fichasSheet.slice(fichaHeader, j-1))
            fichaHeader = j-1
        }
    }
    separatedSheets.push(fichasSheet.slice(fichaHeader))
    parsedData[0][0] = separatedSheets
  
   // call a function to save the data in a json file
  
   await generateJSONFile(parsedData, `${filepath}.json`);
}

const generateJSONFile = async (data, filepath) => {
    try {
        await writeFile(filepath, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
 }

async function main (){
    convertExcelFileToJsonUsingXlsx('./database/ficha_teste')
    app.listen(8080, () => console.log('App running...'))
}

main()