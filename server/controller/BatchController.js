import { sequelize } from "../models/init-models";


const findBatch = async (req, res) => {
    const result = await sequelize.query(
        `select
            batch_id,
            batch_name,
            batch_technology,
            taba_tale_id,
            tale_photo,
            batch_start_date,
            batch_end_date,
            inst_name,
            batch_status
        from batch b 
        inner join talent_batch tb on b.batch_id = tb.taba_batch_id
        inner join instructor i on b.batch_inst_id = i.inst_id
        inner join talent t on tb.taba_tale_id = t.tale_id
        where taba_drop = false;`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.batch,
        mapToModel: true
    });
    return res.send(result);
}

const findBatchNew = async (req, res) => {
    const result = await sequelize.query(
        `select
            batch_id,
            batch_name,
            batch_technology,
            taba_tale_id,
            tale_photo,
            batch_start_date,
            batch_end_date,
            inst_name,
            batch_status
        from batch b 
        inner join talent_batch tb on b.batch_id = tb.taba_batch_id
        inner join instructor i on b.batch_inst_id = i.inst_id
        inner join talent t on tb.taba_tale_id = t.tale_id
        where taba_drop = false and batch_status = 'new';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.batch,
        mapToModel: true
    });
    return res.send(result);
}
const findBatchRunning = async (req, res) => {
    const result = await sequelize.query(
        `select
            batch_id,
            batch_name,
            batch_technology,
            taba_tale_id,
            tale_photo,
            batch_start_date,
            batch_end_date,
            inst_name,
            batch_status
        from batch b 
        inner join talent_batch tb on b.batch_id = tb.taba_batch_id
        inner join instructor i on b.batch_inst_id = i.inst_id
        inner join talent t on tb.taba_tale_id = t.tale_id
        where taba_drop = false and batch_status = 'running';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.batch,
        mapToModel: true
    });
    return res.send(result);
}
const findBatchClosed = async (req, res) => {
    const result = await sequelize.query(
        `select
            batch_id,
            batch_name,
            batch_technology,
            taba_tale_id,
            tale_photo,
            batch_start_date,
            batch_end_date,
            inst_name,
            batch_status
        from batch b 
        inner join talent_batch tb on b.batch_id = tb.taba_batch_id
        inner join instructor i on b.batch_inst_id = i.inst_id
        inner join talent t on tb.taba_tale_id = t.tale_id
        where taba_drop = false and batch_status = 'closed';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.batch,
        mapToModel: true
    });
    return res.send(result);
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
                where: { taba_batch_id: req.params.id, taba_batch_id: taba_tale_id }
            }
        );
        return res.send(result);
    }catch (error) {
        res.status(404).json({message : error.message})
    }
}




export default{
    findBatch,
    findBatchNew,
    findBatchRunning,
    findBatchClosed,
    UpdateBatchStatus,
    UpdateBatch,
    UpdateMembers
}