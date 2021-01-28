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
	if(Object.entries(req.body).length == 2){
		var boolCheckRuleObject = checkRuleObject(req.body.rule.field, req.body.data)
	}


	if(!req.body.data & !req.body.rule || Object.entries(req.body).length > 2){
		return res.status(400).json({
			message: "Invalid JSON payload passed.",
			status: "error",
			data: null
		})
	
	}


	/* 
	CHECK TO SEE IF ERROR IN VALIDATING JOI SCHEMA.
	*/
	else if(error) {
	
		//slice joi error message to see if it contains the word "object"
		objectMessageCheck = error.details[0].message;
		var objectCheck = objectMessageCheck.includes("object");

		if(objectCheck == true){
			const fieldName = error.details[0].message.slice(1,5);
			return res.status(400).json({
				message: `${fieldName} should be an object.`,
				status: "error",
				data: null
			});
		}

		//slice joi error message to get field name (data, rule)
		const fieldName = error.details[0].message.slice(1,5);
		return res.status(400).json({
			message: `${fieldName} is required.`,
			status: "error",
			data: null
		});
	}else if(boolCheckRuleObject == false){
		const ruleFieldName = req.body.rule.field
		return res.status(400).json({
			message: `field ${ruleFieldName} is missing from data.`,
			status: "error",
			data: null
		})
	}else{
		if(ruleFieldConditions(req.body.rule, req.body.data) == true){
			res.status(200).json({
				message: `field ${req.body.rule.field} successfully validated.`,
				status: "success",
				data: {
					validation: {
						error: false,
						field: req.body.rule.field,
						field_value: "a", //nested objects
						condition: req.body.rule.condition,
						condition_value: req.body.rule.condition_value
					}
				}
			});
		}else{
			res.status(400).json({
				message: `field ${req.body.rule.field} failed validation.`,
				status: "error",
				validation: {
					error: true,
					field: req.body.rule.field,
					field_value: "a",//nested objects
					condition: req.body.rule.condition,
					condition_value: req.body.rule.condition_value
				}
			})
		}

	}
}



//=================  HELPING FUNCTIONS ===================

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
	//data1 => req.body.rule.field, data2 => req.body.data

	if(Object.keys(data2).includes(data1) 
		|| (parseInt(data1) < data2.length) 
		|| (Number.isInteger(parseInt(data1)) && (Array.isArray(data2) || typeof(data2)=="string")
			)

		//|| check for nested objects
		){
		if(parseInt(data1) > data2.length) return false
		return true;
	}
	return false;
}




function ruleFieldConditions(data1, data2){
	var index = parseInt(data1.field) - 1;
	if(Number.isInteger(parseInt(data1.field)) && (Array.isArray(data2) || typeof(data2)=="string")){
		if(data1.condition == "eq"){
			if(parseInt(data1.field) <= data2.length && data2[index] == data1.condition_value) return true;
		}else if(data1.condition == "neq"){
			if(data2[index] != data1.condition_value) return true;
		// }else if(data1.condition == "gt"){
			
		// }else if(data1.condition == "gte"){

		}else if(data1.condition == "contains"){
			dataField = data1.field
			if(parseInt(data1.field) < data2.length && (data2[index]).includes(data1.condition_value)){
				return true;
			}
			
		}
	}else if(typeof(data1.field)=="string"){
		if(data1.condition == "eq"){
			const ruleField = data1.field; 
			console.log(ruleField)
		//TODO: solve hard-coded missions.count here
			if(data2.missions.count && data2.missions.count == data1.condition_value) return true
		}else if(data1.condition == "neq"){
			if(data2.missions.count != data1.condition_value) return true
		}else if(data1.condition == "gt"){
			if(data2.missions.count > data1.condition_value) return true
		}else if(data1.condition == "gte"){
			if(data2.missions.count >= data1.condition_value) return true
		}else if(data1.condition == "contains"){
			if((data2.missions.count).includes(data1.condition_value)) return true
		}
	}
	return false
}




