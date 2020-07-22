const bcrypt=require('bcryptjs');
const passwordHash=async function(password){
	console.log("Inside password hash method ");
	try{
		console.log("Inside try block ");
		const salt=await bcrypt.genSalt(10);
		console.log("salt value is : "+salt);
		const passhash=await bcrypt.hash(password,salt);
		return passhash;
	}
	catch(error){
		console.log("Inside catch block of hash method ");
		return error;
	}
	
}
module.exports=passwordHash;