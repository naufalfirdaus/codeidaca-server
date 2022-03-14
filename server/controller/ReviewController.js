import { sequelize } from "../models/init-models";
const { Op } = require("sequelize");


const findTesti = async (req, res) => {
    const result = await sequelize.query(
    `select 
        cure_id, cure_review, cure_rating, cure_user_id, 
        user_id, user_name,  user_email, tale_fullname, 
        tale_bootcamp,  tale_photo, tale_position,  tale_user_id 
    from curriculum_reviews cr 
    inner join users u on cr.cure_user_id = u.user_id 
    inner join talent t on u.user_id = t.tale_user_id  limit 10`, 
    {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.curriculum_reviews,
        mapToModel: true
    });

    return res.send(result);
}

export default {
    findTesti
}