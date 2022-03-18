import { sequelize } from "../models/init-models";


const findAllRows = async (req, res) => {
    try {
        const result = await sequelize.query("select curr_id, curr_name, curr_title, curr_description, curr_duration, curr_type, curr_price from curriculum ",  {
            type: sequelize.QueryTypes.SELECT,
            model: req.context.models.curriculum,
            mapToModel: true
        });
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


// const findbyType = async (req, res) => {
//     try {
//         const result = await sequelize.query("select curr_name, curr_title, curr_description, curr_duration,  curr_type, curr_price from curriculum ",  {
//             type: sequelize.QueryTypes.SELECT,
//             model: req.context.models.curriculum,
//             mapToModel: true, 
//             
//         });
//         return res.send(result)
//     } catch (error) {
//         res.status(404).json({message : error.message})
//     }
// }

// const findbyId = async (req, res) => {
//     try {
//         const result = await req.context.models.batch.findAll({
//             attributes: ['curr_name', 
//                         'curr_title',
//                         'curr_description',
//                         'curr_duration',
//                         'curr_type',
//                         'curr_price'],
//             where:{batch_id: req.params.id},  });
//         return res.send(result)
//     } catch (error) {
//         res.status(404).json({message : error.message})
//     }
// }

const findRegular = async (req, res) => {
    try {
        const result = await sequelize.query(            
        `select curr_id, curr_name, curr_title, curr_description, 
        curr_duration, curr_type, curr_price, cure_rating from curriculum cu inner join curriculum_reviews cr 
        on cu.curr_id = cr.cure_curr_id where curr_type = 'Regular'`,  {
            type: sequelize.QueryTypes.SELECT,
            model: req.context.models.curriculum,
            mapToModel: true, 
            // where: {curr_type:req.curr_type}
        });
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

const findBerbayar = async (req, res) => {
    try {
        const result = await sequelize.query(
            `select curr_id, curr_name, curr_title, curr_description, 
            curr_duration, curr_type, curr_price, cure_rating from curriculum cu inner join curriculum_reviews cr 
            on cu.curr_id = cr.cure_curr_id where curr_type = 'Berbayar'`,  
            {
            type: sequelize.QueryTypes.SELECT,
            model: req.context.models.curriculum,
            mapToModel: true, 
            // where: {curr_type:req.params.curr_type}
        });
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}


export default {
    findAllRows,
    // findbyType,
    findRegular,
    findBerbayar,
    // findbyId
    
}