const OrdersModel = require("../Models/OrdersModel");
const OrderValid = require("../Utils/OrdersValidation");

const GetAllOrders = async (req, res) => {
  try {
    const allOrders = await OrdersModel.find();
    return res.status(200).json(allOrders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetOrderByID = async (req, res) => {
  const order_id = req.params.id;
  try {
    const foundedOrder = await OrdersModel.findById(order_id);
    if (foundedOrder) {
      return res.status(200).json({ data: foundedOrder });
    } else {
      return res.status(404).send("Order Not Found");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const AddOrder = async (req, res) => {
  const orderData = req.body;
  if (OrderValid(orderData)) {
    try {
      const newOrder = new OrdersModel(orderData);
      await newOrder.save();
      return res
        .status(201)
        .json({ message: "Added Successfully", data: newOrder });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({
      error:
        OrderValid.errors[0].instancePath.split("/")[1] +
        ": " +
        OrderValid.errors[0].keyword +
        " ==> " +
        OrderValid.errors[0].message,
    });
  }
};

const UpdateOrderById = async (req, res) => {
  const order_id = req.params.id;
  if (OrderValid(req.body)) {
    try {
      const updatedOrder = await OrdersModel.findByIdAndUpdate(
        order_id,
        req.body,
        {
          new: true,
        }
      );
      if (updatedOrder) {
        return res
          .status(200)
          .json({ message: "Updated Successfully", data: updatedOrder });
      } else {
        return res.status(404).send("Order Not Found");
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({
      error:
        OrderValid.errors[0].instancePath.split("/")[1] +
        ": " +
        OrderValid.errors[0].keyword +
        " ==> " +
        OrderValid.errors[0].message,
    });
  }
};

const DeleteOrderById = async (req, res) => {
  const order_id = req.params.id;
  try {
    await OrdersModel.findByIdAndDelete(order_id);
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetAllOrders,
  GetOrderByID,
  AddOrder,
  UpdateOrderById,
  DeleteOrderById,
};
