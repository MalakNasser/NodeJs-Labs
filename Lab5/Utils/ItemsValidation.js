const Ajv = require("ajv");
const ajv = new Ajv();

//#Start Region Item Validation
let itemSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    price: { type: "integer" },
    desc: { type: "string", minLength: 10 },
  },
  required: ["name", "price", "desc"],
  additionalProperties: false,
};
module.exports = ajv.compile(itemSchema);
//#End Region
