const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API",
			version: "1.0.0"
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT}/api/${process.env.SERVICEABB}`,
				description: "API Documentation",
				variable: {
					default: "api-swagger",
				}
			},
		],
	},
	apis: ['./*/controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
