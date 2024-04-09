const Ajv = require("ajv");
const ajv = new Ajv();

//#Start Region Order Validation
let orderSchema = {
  type: "object",
  properties: {
    price: { type: "integer" },
    items: { type: "array", items: { type: "string" } },
  },
  required: ["price", "items"],
  additionalProperties: false,
};
module.exports = ajv.compile(orderSchema);
//#End Region
