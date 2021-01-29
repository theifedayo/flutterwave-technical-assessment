### Rule-Validation API

hosted at https://flutter-wave-tech.herokuapp.com/

# Getting started
Clone the project from github with

		$git clone https://github.com/adesiyan-ifedayo/flutterwave-technical-assessment.git

then navigate to the folder and run

		$npm install

to install other packages. When completed, run

		$npm run dev

to run in development mode using nodemon for monitoring file changes

# Requests Check
There are only two routes in this project - the base route "localhost:5000" and validation route "localhost:5000/validate-rule"

Route 1 -

using your postman, change your request to "GET" and input "http://localhost:5000" as your request URL, then send.
sample response[200 OK]

		{
		    "message": "My Rule-Validation API",
		    "status": "success",
		    "data": {
		        "name": "Ifedayo Adesiyan",
		        "github": "@adesiyan-ifedayo",
		        "email": "adesiyanifedayo@gmail.com",
		        "mobile": "08106261649",
		        "twitter": "@ifedayoadesiyan"
		    }
		}


<img width="1000" alt="Screenshot 2021-01-29 at 13 20 41" src="https://user-images.githubusercontent.com/47679952/106274613-d10c5580-6234-11eb-999d-e71eb232a411.png">

sample response[500 internal server error]

		{
			"message": "server-error",
			"status": "error",
			"data": null
		}

Route 2 -
With postman, change your request to "POST" and input "http://localhost:5000/validate-rule" as your request URL, your header's key set to "Content-Type" and value to "application/json". Move to body tab and select raw. Finally, post your json data in your body with schema similar to this.

	{
		"rule": <data>,
		"data": <data>
	}

rule should be an object, and data can either be a string, an object or an array. When posted, the data types and values are been validated accoding to the instructions given.

