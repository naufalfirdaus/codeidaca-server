import { sequelize } from "../models/init-models";
const { Op } = require("sequelize");

const findBatch = async (req, res) => {
    try {
        const result = await req.context.models.batch.findAll({
            attributes: ['batch_id', 
                        'batch_name',
                        'batch_technology',
                        'batch_start_date',
                        'batch_end_date',
                        'batch_status'],
            include:[
                {
                    model: req.context.models.talent_batch,
                    as: 'talent_batches',
                    attributes: [
                        'taba_tale_id'
                    ],
                    where:{
                        taba_drop: false
                    },
                    include:{
                        model: req.context.models.talent,
                        as: 'taba_tale',
                        attributes: [
                            'tale_photo'
                        ]
                    }
                },
                {
                    model: req.context.models.instructor,
                    as: 'batch_inst',
                    attributes: [
                        'inst_name'
                    ]
                }
            ]
        });
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

const UpdateBatchStatus = async (req, res) => {
    const { batch_status } = req.body;
    try{
        const result = await req.context.models.batch.update(
            { 
                batch_status: batch_status
            },
            {
                returning: true,
                where: { batch_id: req.params.id }
            }
        );
        return res.send(result);
    }catch (error) {
        res.status(404).json({message : error.message})
    }
}

const deleteBatch = async (req, res) => {
    const id = req.params.id;
    try {
        const result_taba = await req.context.models.talent_batch.destroy({
            where: { taba_batch_id: parseInt(id) }
        });
        const result = await req.context.models.batch.destroy({
            where: { batch_id: parseInt(id) }
        });
        return res.send("delete " + result + " rows.")
    } catch (error) {
        return res.sendStatus(404).send("Data not found.")
    }
}


// Update App Batch
/* 
req.body = {
    batch_name,
    batch_technology,
    taba_tale_id,
    taba_drop
    batch_start_date,
    batch_end_date,
    batch_inst_id,
}
*/

// 1
const UpdateBatch = async (req, res, next) => {
    const {batch_name, batch_technology, batch_start_date, batch_end_date, batch_inst_id} = req.body;
    try{
        const result = await req.context.models.batch.update(
            { 
                batch_name: batch_name,
                batch_technology: batch_technology,
                batch_start_date: batch_start_date,
                batch_end_date: batch_end_date,
                batch_inst_id: batch_inst_id
            },
            {
                returning: true,
                where: { batch_id: req.params.id }
            }
        );
        next()
    }catch (error) {
        res.status(404).json({message : error.message})
    }
}

// 2
const UpdateMembers = async (req, res) => {
    const {taba_tale_id, taba_drop} = req.body;
    try{
        const result = await req.context.models.talent_batch.update(
            { 
                taba_drop: taba_drop
            },
            {
                returning: true,
                where: { 
                    [Op.and]: [
                        {taba_batch_id: req.params.id },
                        {taba_tale_id: taba_tale_id }
                    ]
                }
            }
        );
        return res.send(result);
    }catch (error) {
        res.status(404).json({message : error.message})
    }
}




export default{
    findBatch,
    UpdateBatchStatus,
    UpdateBatch,
    UpdateMembers,
    deleteBatch
}