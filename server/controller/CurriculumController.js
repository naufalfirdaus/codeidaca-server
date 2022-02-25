import { sequelize } from "../models/init-models";


const findAllRows = async (req, res) => {
    try {
        const result = await sequelize.query("select curr_name, curr_title, curr_description, curr_duration from curriculum ",  {
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
//         const result = await sequelize.query("select curr_name, curr_title, curr_description, curr_duration from curriculum ",  {
//             type: sequelize.QueryTypes.SELECT,
//             model: req.context.models.curriculum,
//             mapToModel: true, 
//             where: {curr_type:req.curr_type}
//         });
//         return res.send(result)
//     } catch (error) {
//         res.status(404).json({message : error.message})
//     }
// }

const findRegular = async (req, res) => {
    try {
        const result = await sequelize.query("select curr_name, curr_title, curr_description, curr_duration from curriculum where curr_type = 'Regular'",  {
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
        const result = await sequelize.query("select curr_name, curr_title, curr_description, curr_duration from curriculum where curr_type = 'Berbayar'",  {
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
    findBerbayar
    
}