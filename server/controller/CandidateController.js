import { sequelize } from "../models/init-models";


const findCandidate = async (req, res) => {
    const result = await sequelize.query(
        `select 
            tale_photo,
            tale_fullname,
            tale_email,
            tale_school_name,
            tale_major,
            tale_graduate,	
            tale_handphone,
            tale_bootcamp,
            tale_status_timeline,
            tale_timeline_date,
            tati_date as date_applied
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}

const findCandidateApply = async (req, res) => {
    const result = await sequelize.query(
        `select 
            tale_photo,
            tale_fullname,
            tale_email,
            tale_school_name,
            tale_major,
            tale_graduate,	
            tale_handphone,
            tale_bootcamp,
            tale_status_timeline,
            tale_timeline_date,
            tati_date as date_applied
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply' and t.tale_status_timeline = 'Apply';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}
const findCandidateFiltering = async (req, res) => {
    const result = await sequelize.query(
        `select 
            tale_photo,
            tale_fullname,
            tale_email,
            tale_school_name,
            tale_major,
            tale_graduate,	
            tale_handphone,
            tale_bootcamp,
            tale_status_timeline,
            tale_timeline_date,
            tati_date as date_applied
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply' and t.tale_status_timeline = 'Filtering Test';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}
const findCandidateContract = async (req, res) => {
    const result = await sequelize.query(
        `select 
            tale_photo,
            tale_fullname,
            tale_email,
            tale_school_name,
            tale_major,
            tale_graduate,	
            tale_handphone,
            tale_bootcamp,
            tale_status_timeline,
            tale_timeline_date,
            tati_date as date_applied
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply' and t.tale_status_timeline = 'Contract';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}
const findCandidateBriefing = async (req, res) => {
    const result = await sequelize.query(
        `select 
            tale_photo,
            tale_fullname,
            tale_email,
            tale_school_name,
            tale_major,
            tale_graduate,	
            tale_handphone,
            tale_bootcamp,
            tale_status_timeline,
            tale_timeline_date,
            tati_date as date_applied
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply' and t.tale_status_timeline = 'Briefing Bootcamp';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}
const findCandidateJoin = async (req, res) => {
    const result = await sequelize.query(
        `select 
            tale_photo,
            tale_fullname,
            tale_email,
            tale_school_name,
            tale_major,
            tale_graduate,	
            tale_handphone,
            tale_bootcamp,
            tale_status_timeline,
            tale_timeline_date,
            tati_date as date_applied
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply' and t.tale_status_timeline = 'Join Bootcamp';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}

const UpdateTimelineStatus = async (req, res, next) => {
    const { timeline_status } = req.body;
    try{
        const result = await req.context.models.talent.update(
            { 
                tale_status_timeline: timeline_status,
                tale_timeline_date : new Date()
            },
            {
                returning: true,
                where: { tale_id: req.params.id }
            }
        );
        next();
    }catch (error) {
        res.status(404).json({message : error.message})
    }
}

const createRowTimeline = async (req, res) => {
    const { timeline_status } = req.body;
    try{
        const result = await req.context.models.talent_timeline.create({
            tati_tale_id: req.params.id,
            tati_timeline_name: timeline_status,
            tati_date: new Date()
        });
        return res.send(result);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
}


export default{
    findCandidate,
    findCandidateApply,
    findCandidateFiltering,
    findCandidateContract,
    findCandidateBriefing,
    findCandidateJoin,
    UpdateTimelineStatus,
    createRowTimeline
}