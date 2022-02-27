import { sequelize } from "../models/init-models";

const summaryCandidate = async (req, res) => {
  const result = await sequelize.query(
    `
    select 
    sum(COALESCE (Total_candidate,null,0)) "Candidate",
    sum(COALESCE (Total_bootcmp,null,0)) "Bootcamp",
    sum(COALESCE (Idle,null,0)) "Idle",
    sum(COALESCE (Placement,null,0)) "Placement" from(
    select case when ta.tale_status = 'Candidate' then count(ta.tale_id) end Total_candidate,
    case when ta.tale_status = 'Talent' and ta.tale_status_timeline = 'Join Bootcamp' 
    then count(coalesce(ta.tale_id,0)) end Total_Bootcmp,
    case when ta.tale_status = 'Talent' and ta.tale_status_timeline = 'Idle' then count(ta.tale_id) end Idle,
    case when ta.tale_status = 'Talent' and ta.tale_status_timeline = 'Placement' then count(ta.tale_id) end Placement
    from talent ta
    group by ta.tale_status, ta.tale_status_timeline)t
    `,
    {
      type: sequelize.QueryTypes.SELECT,
      //model: req.context.models.talent,
    }
  );

  return res.send(result);
};

const ApplicantByMonth = async (req, res) => {
  const result = await sequelize.query(
    `
    select to_char(tati_date,'Month') as name, count(tati_id)
    from talent_timeline
    group by to_char(tati_date,'Month')
    `,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.send(result);
};

const InterestTechnology = async (req, res) => {
  const result = await sequelize.query(
    "select tale_bootcamp as name, count(*) from talent group by tale_bootcamp",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.send(result);
};

const BoardingIdle = async (req, res) => {
  const result = await sequelize.query(
    `
    select tale_status_timeline as name, cast(count(tale_id) as int) 
    from talent where tale_status_timeline = 'Idle' or tale_status_timeline = 'Placement'
    group by tale_status_timeline
    `,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.send(result);
};

const Pendidikan = async (req, res) => {
  const result = await sequelize.query(
    "select tale_education as name, cast(count(*) as int) from talent group by tale_education",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.send(result);
};

const Universitas = async (req, res) => {
  const result = await sequelize.query(
    "select tale_school_name as name, cast(count(*) as int) from talent group by tale_school_name",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.send(result);
};

const Jurusan = async (req, res) => {
  const result = await sequelize.query(
    "select tale_major as name, cast(count(*) as int) from talent group by tale_major",
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.send(result);
};

export default {
  summaryCandidate,
  ApplicantByMonth,
  InterestTechnology,
  BoardingIdle,
  Universitas,
  Pendidikan,
  Jurusan,
};
