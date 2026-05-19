const listService = require('../services/ListsService');
const fridgeService = require('../services/FridgeService');

exports.saveList = async (req, res) => {
    try {

        const userId = req.userId;
        const { listName, ingredientsIds } = req.body;

        const list = await listService.createList(userId, listName, ingredientsIds);

        res.status(201).json(list);
    } catch (error) {
        console.error("Erreur saveList:", error);
        res.status(500).json({
            message: "Erreur lors de la création de la liste",
            error: error.message
        });
    }
};

exports.completeShopping = async (req, res) => {
    try {
        const userId = req.userId;
        const { listId } = req.body;

        const list = await listService.getListById(listId);

        if (!list) return res.status(404).json({
            message: "Liste non trouvée"
        });

        if (list.user_id !== userId) return res.status(403).json({
            message: "Accès interdit"
        })

        const fridge = await fridgeService.getFridgeByUserId(userId);
        const result = await listService.migrateListToFridge(userId, listId, fridge.id);

        res.status(200).json({
            message: "La liste a été transférée dans le frigo !",
            addedCount: result.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserLists = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "L'UUID de l'utilisateur est requis" });
        }

        const lists = await listService.getAllUserLists(userId);

        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des listes",
            error: error.message
        });
    }
};

exports.getOneList = async (req, res) => {
    try {
        const userId = req.userId;
        const { listId } = req.params;

        const list = await listService.getListById(listId);

        if (!list) return res.status(404).json({
            message: "Liste non trouvée"
        });

        if (list.user_id !== userId) return res.status(403).json({
            message: "Accès interdit"
        })

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de la liste",
            error: error.message
        });
    }
};

exports.deleteList = async (req, res) => {
    try {
        const userId = req.userId;
        const listId = req.params.listId;

        const list = await listService.getListById(listId);

        if (!list) return res.status(404).json({
            message: "Liste non trouvée"
        });

        if (list.user_id !== userId) return res.status(403).json({
            message: "Accès interdit"
        })

        const deleted = await listService.deleteList(listId, userId);

        if (deleted === 0) {
            return res.status(404).json({ message: "Liste non trouvée" });
        }

        res.status(200).json({ message: "Liste supprimée avec succès" });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression",
            error: error.message
        });
    }
};

exports.updateList = async (req, res) => {
    try {
        const userId = req.userId;
        const { listId } = req.params;
        const { listName, ingredientsIds } = req.body;

        const list = await listService.getListById(listId);

        if (!list) return res.status(404).json({
            message: "Liste non trouvée"
        });

        if (list.user_id !== userId) return res.status(403).json({
            message: "Accès interdit"
        })

        const result = await listService.updateList(listId, userId, listName, ingredientsIds);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la mise à jour",
            error: error.message
        });
    }
};