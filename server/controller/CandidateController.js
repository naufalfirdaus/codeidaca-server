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
            tati_timeline_name,
            tati_date
        from talent t
        inner join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate';`, {
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
            tati_timeline_name,
            tati_date
        from talent t
        left join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Apply';`, {
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
            tati_timeline_name,
            tati_date
        from talent t
        left join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Filtering Test';`, {
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
            tati_timeline_name,
            tati_date
        from talent t
        left join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Contract';`, {
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
            tati_timeline_name,
            tati_date
        from talent t
        left join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Briefing Bootcamp';`, {
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
            tati_timeline_name,
            tati_date
        from talent t
        left join talent_timeline tt on t.tale_id = tt.tati_tale_id
        where t.tale_status = 'Candidate' and tt.tati_timeline_name = 'Join Bootcamp';`, {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.talent,
        mapToModel: true
    });
    return res.send(result);
}

const createRowTimeline = async (req, res) => {
    const { tale_id, timeline_name } = req.body;
    const result = await req.context.models.talent_timeline.create({
        tati_tale_id: tale_id,
        tati_timeline_name: timeline_name,
        tati_date: new Date()
    });
    return res.send(result);
}


export default{
    findCandidate,
    findCandidateApply,
    findCandidateFiltering,
    findCandidateContract,
    findCandidateBriefing,
    findCandidateJoin,
    createRowTimeline
}