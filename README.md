### Rule-Validation API

# Getting started
clone the project from github with

		$git clone <github-repo-url>

then navigate to the folder and run

		$npm install

to install other packages. When completed, run

		$npm run dev

to run in development mode using nodemon for monitoring file changes

#Requests Check
There are only two routes in this project - the base route "localhost:5000" and validation route "localhost:5000/validate-rule"


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
