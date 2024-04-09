const ItemModel = require("../Models/ItemsModel");
const ItemValid = require("../Utils/ItemsValidation");

const GetAllItems = async (req, res) => {
  try {
    const allItems = await ItemModel.find();
    return res.status(200).json(allItems);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetItemByID = async (req, res) => {
  const item_id = req.params.id;
  try {
    const foundedItem = await ItemModel.findById(item_id);
    if (foundedItem) {
      return res.status(200).json({ data: foundedItem });
    } else {
      return res.status(404).send("Item Not Found");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const AddItem = async (req, res) => {
  const itemData = req.body;
  if (ItemValid(itemData)) {
    try {
      const newItem = new ItemModel(itemData);
      await newItem.save();
      return res
        .status(201)
        .json({ message: "Added Successfully", data: newItem });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({
      error:
        ItemValid.errors[0].instancePath.split("/")[1] +
        ": " +
        ItemValid.errors[0].keyword +
        " ==> " +
        ItemValid.errors[0].message,
    });
  }
};

const UpdateItemById = async (req, res) => {
  const item_id = req.params.id;
  if (ItemValid(req.body)) {
    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(item_id, req.body, {
        new: true,
      });
      if (updatedItem) {
        return res
          .status(200)
          .json({ message: "Updated Successfully", data: updatedItem });
      } else {
        return res.status(404).send("Item Not Found");
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(400).json({
      error:
        ItemValid.errors[0].instancePath.split("/")[1] +
        ": " +
        ItemValid.errors[0].keyword +
        " ==> " +
        ItemValid.errors[0].message,
    });
  }
};

const DeleteItemById = async (req, res) => {
  const item_id = req.params.id;
  try {
    await ItemModel.findByIdAndDelete(item_id);
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetAllItems,
  GetItemByID,
  AddItem,
  UpdateItemById,
  DeleteItemById,
};
