import { sequelize } from '../models/init-models';


const summaryCandidate = async(req, res) => {

    const result = await sequelize.query(`
    select 
    sum(COALESCE (Total_candidate,null,0)) "Total Candidate",
    sum(COALESCE (Total_bootcmp,null,0)) "Total Bootcamp",
    sum(COALESCE (Idle,null,0)) "Idle",
    sum(COALESCE (Placement,null,0)) "Placement" from(
    select case when ta.tale_status = 'Candidate' then count(ta.tale_id) end Total_candidate,
    case when ta.tale_status = 'Talent' and ta.tale_status_timeline = 'Join Bootcamp' 
    then count(coalesce(ta.tale_id,0)) end Total_Bootcmp,
    case when ta.tale_status = 'Talent' and ta.tale_status_timeline = 'Idle' then count(ta.tale_id) end Idle,
    case when ta.tale_status = 'Talent' and ta.tale_status_timeline = 'Placement' then count(ta.tale_id) end Placement
    from talent ta
    group by ta.tale_status, ta.tale_status_timeline)t
    `, {
        type: sequelize.QueryTypes.SELECT,
        //model: req.context.models.talent,
    });

    return res.send(result);
}

const ApplicantByMonth = async(req, res) => {
    const result = await sequelize.query(`
    select
    sum(COALESCE (January,null,0)) "January",
    sum(COALESCE (April,null,0)) "March",
    sum(COALESCE (July,null,0)) "July",
    sum(COALESCE (October,null,0)) "October" from(
    select case when tati_timeline_name = 'Apply' and extract(month from tati_date) = 2 then count (tati_id) end January,
    case when tati_timeline_name = 'Apply' and extract(month from tati_date) = 4 then count(tati_id) end April,
    case when tati_timeline_name = 'Apply' and extract(month from tati_date) = 7 then count(tati_id) end July,
    case when tati_timeline_name = 'Apply' and extract(month from tati_date) = 10 then count(tati_id) end October
    from talent_timeline group by tati_timeline_name, tati_date)t
    `, {
        type: sequelize.QueryTypes.SELECT
    });
    return res.send(result)
}

const InterestTechnology = async(req, res) => {
    const result = await sequelize.query('select tale_bootcamp, count(*) from talent group by tale_bootcamp', {
        type: sequelize.QueryTypes.SELECT
    });
    return res.send(result)
}

const BoardingIdle = async(req, res) => {
    const result = await sequelize.query(`
    select
    sum(COALESCE (Idle,null,0)) "Idle",
    sum(COALESCE (Boarding,null,0)) "Boarding" from (
    select case when tale_status_timeline = 'Idle' then count(tale_id) end Idle,
    case when tale_status_timeline = 'Placement' then count(tale_id) end Boarding 
    from talent group by tale_status_timeline)t
    `, {
        type: sequelize.QueryTypes.SELECT
    });
    return res.send(result)
}

const Pendidikan = async(req, res) => {
    const result = await sequelize.query('select tale_education, count(*) from talent group by tale_education', {
        type: sequelize.QueryTypes.SELECT
    });
    return res.send(result)
}

const Universitas = async(req, res) => {
    const result = await sequelize.query('select tale_school_name, count(*) from talent group by tale_school_name', {
        type: sequelize.QueryTypes.SELECT
    });
    return res.send(result)
}

const Jurusan = async(req, res) => {
    const result = await sequelize.query('select tale_major, count(*) from talent group by tale_major', {
        type: sequelize.QueryTypes.SELECT
    });
    return res.send(result)
}

export default {
    summaryCandidate,
    ApplicantByMonth,
    InterestTechnology,
    BoardingIdle,
    Universitas,
    Pendidikan,
    Jurusan
}