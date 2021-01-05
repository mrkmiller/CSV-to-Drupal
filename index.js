const parse = require('csv-parse')
const fs = require('fs')
const axios = require('axios')

// Edit the Url and Authentication values.
const csvFile = `./example.csv`

const url = 'http://d9.lndo.site:8080/jsonapi/node/page'

const auth = {
  username: 'admin',
  password: 'admin'
};

const entityType = 'node--page'

/**
 * Convert the CSV file into an array of data.
 */
const processFile = async () => {
  records = []
  const parser = fs
    .createReadStream(csvFile)
    .pipe(parse({
      // CSV options if any https://csv.js.org/parse/options/
    }))

  for await (const record of parser) {
    records.push(record)
  }
  return records
}

/**
 * Convert the array of CSV data into Drupal data ready for JsonAPI.
 * 
 * @param {array} data
 *   
 */
const prepareNodes = data => {
  // Remove the first row as headers
  data.shift()

  const nodes = data.map(item => {
    return {
      data: {
        type: entityType,
        attributes: {
          title: item[0],
          body: {
            value: `<p>${item[1]}</p>`,
            format: 'basic_html'
          }
          // Add more fields here.
        }
      }
    }
  })

  return nodes
}

/**
 * Send a single Node into Drupal.
 * 
 * @param {object} data
 *   The JsonAPI "data" object.
 */
const postToDrupal = async data => {
  try {
    return await axios({
      method: 'post',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      url,
      auth,
      data,
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports.testFile = async function () {
  const records = await processFile()
  console.info(records)

  const data = prepareNodes(records)
  console.info(data)
};

module.exports.execute = async function () {
  const records = await processFile()
  const data = prepareNodes(records)

  // Import the content into Drupal.
  for await (const node of data) {
    await postToDrupal(node)
  }

  console.log('All Done')
}
