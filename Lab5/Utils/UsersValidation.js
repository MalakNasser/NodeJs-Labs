const Ajv = require("ajv");
const validator = require("validator");
const ajv = new Ajv();

ajv.addFormat("email", (data) => validator.isEmail(data));

//#Start Region User Validation
let userSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    age: { type: "integer", minimum: 15 },
    address: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 10 },
  },
  required: ["name", "age", "address", "email", "password"],
  additionalProperties: false,
};
module.exports = ajv.compile(userSchema);
//#End Region
