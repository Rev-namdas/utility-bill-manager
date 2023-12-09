const { statusCode } = require("./httpStatusCodes")

module.exports.catchBlockCodes = (res, err, functionName) => {
	console.log(`📌 ${functionName} | ${err.message}`)
	return res.status(statusCode.SERVER_ERROR).send({
		flag: "FAIL",
		msg: "Internal Server Error"
	})
}