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

