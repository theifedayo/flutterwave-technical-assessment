const express = require('express');

const app = express();
app.use(express.json());





//ROUTES
app.use('', require('./routes'));

//PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
	console.log(`Server running on port ${PORT}...`);
})


// const jsonData = {
// 	'djdsj': 'dsndns'
// }

// //check for length of json objects
// const abc = Object.entries(jsonData).length
// console.log(abc)


// //check for an object
// console.log(typeof jsonData === 'object')