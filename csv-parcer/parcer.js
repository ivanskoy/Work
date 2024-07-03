const fs = require('fs');
const { parse } = require('csv-parse');
const { default: axios } = require('axios');

// Specify the options for parsing
const options = {
  columns: true, // Automatically detect column names
  skip_empty_lines: true // Skip empty lines
};

// Create a readable stream from the CSV file
const stream = fs.createReadStream('/home/user/Downloads/humanz-ex-users.csv');

// Parse the CSV data
stream.pipe(parse(options), {

}).on('data', async (row) => {
  const data = {
    _id: row.ID,
    email: row.Email,
    fullname: row.Name,
    phone: row.Phone,
    ip: row.IP,
  }

  await axios.post('http://localhost:8000/users', data).catch(() => {})

});
