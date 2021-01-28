const Joi = require('joi')


exports.getHome = async (req, res)=>{
	try{
		return res.status(200).json({
			message: "My Rule-Validation API",
			status: "success",
			data: {
				name: "Ifedayo Adesiyan",
				github: "@adesiyan-ifedayo",
				email: "adesiyanifedayo@gmail.com",
				mobile: "08106261649",
				twitter: "@ifedayoadesiyan"
			}
		});
	}catch(error){
		res.status(500).json({
			message: "server-error",
			status: "error",
			data: null
		});
	}
}




exports.postRule = (req, res)=>{

	const {error} = validateData(req.body);

	if(!req.body.data & !req.body.rule){
		return res.status(400).json({
			message: "Invalid JSON payload passed.",
			status: "error",
			data: "null"
		})
	}else if(req.body.rule && req.body.data){		
		var boolCheckRuleObject = checkRuleObject(req.body.rule.field, req.body.data)
	}

	/* 
	CHECK TO SEE IF ERROR IN VALIDATING JOI SCHEMA.
	*/
	if(error) {
		//slice joi error message to see if it contains the word "object"
		objectMessageCheck = error.details[0].message;
		var objectCheck = objectMessageCheck.includes("object");

		if(objectCheck == true){
			const fieldName = error.details[0].message.slice(1,5);
			return res.status(400).json({
				message: `${fieldName} should be an object.`,
				status: "error",
				data: "null"
			});
		}
		//slice joi error message to get field name (data, rule)
		const fieldName = error.details[0].message.slice(1,5);
		return res.status(400).json({
			message: `${fieldName} is required.`,
			status: "error",
			data: "null"
		});
	}else if(boolCheckRuleObject == false){
		const ruleFieldName = req.body.rule.field

		return res.status(400).json({
			message: `field ${ruleFieldName} is missing from data.`,
			status: "error",
			data: "null"
		})
	}else{
		res.send('okay');
	}
}



function validateData(data){
	//using joi to validate rule and data field 
	
	const schema = {
		rule : Joi.object().min(1).required(),
		data: Joi.required()
	}
	return Joi.validate(data, schema);
}

function checkRuleObject(data1, data2){
	/* 
		Check if data2 is found in data1, check if data1 is integer only when data2 is
		a string or an array
	*/
	if(Object.keys(data2 || "").includes(data1 || "") || (Number.isInteger(data1) && (Array.isArray(data2) || typeof(data2)=="string"))){
		return true;
	}else{
		return false;
	}
}




function ruleFieldConditions(){
	console.log("checking........");
}



