import { sequelize } from "../models/init-models";
const { Op } = require("sequelize");


const findTesti = async (req, res) => {
    const result = await sequelize.query("select cure_id, cure_review, cure_rating from curriculum_reviews limit 10", {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.curriculum_reviews,
        mapToModel: true
    });

    return res.send(result);
}

export default {
    findTesti
}