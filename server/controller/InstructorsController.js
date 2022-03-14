import { sequelize } from "../models/init-models";
const findInstructor = async (req, res) => {
    try {
        const result = await req.context.models.instructor.findAll({
            // attributes:[[sequelize.literal('DISTINCT ON `inst_name`'), 'inst_name'],'inst_id']
                        // [sequelize.literal('DISTINCT `inst_id`'), 'inst_id']],
            // attributes:[[sequelize.fn('DISTINCT ON', sequelize.col('inst_name')) ,'inst_name']],
            attributes:['inst_id','inst_name','inst_bootcamp']
        });
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export default{
    findInstructor
}