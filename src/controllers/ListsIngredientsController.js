const listService = require('../services/ListsIngredientsService');
const fridgeService = require('../services/FridgeService');

exports.saveList = async (req, res) => {
    const { userId, ingredientsIds } = req.body;
    const list = await listService.createList(userId, ingredientsIds);
    res.status(201).json(list);
};

exports.completeShopping = async (req, res) => {
    const { userId } = req.body;

    const fridge = await fridgeService.getFridgeByUserId(userId);

    const result = await listService.migrateListToFridge(userId, fridge.id);

    res.status(200).json({
        message: "Courses transférées dans le frigo !",
        addedCount: result.length
    });
};

