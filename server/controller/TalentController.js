import { sequelize } from "../models/init-models";

const findAllRows = async (req, res) => {
    try {
        const result = await req.context.models.talent.findAll({
            attributes: [
                "tale_id",
                "tale_fullname",
                "tale_bootcamp",
                "tale_photo",
                "tale_status",
                "tale_status_date",
                "tale_status_timeline",
            ],
            where: { tale_status: "Talent" },
            include: [
                {
                    model: req.context.models.talent_batch,
                    as: "talent_batches",
                    attributes: ["taba_batch_id"],
                    include: {
                        model: req.context.models.batch,
                        as: "taba_batch",
                        attributes: [
                            "batch_name",
                            "batch_start_date",
                            "batch_end_date",
                        ],
                        include: {
                            model: req.context.models.instructor,
                            as: "batch_inst",
                            attributes: ["inst_name"],
                        },
                    },
                },
            ],
        });
        return res.send(result);
    } catch (error) {
        return res.sendStatus(404).json({ msg: "N0 DATA FOUND" });
    }
};

const findBySql = async (req, res) => {
    const result = await sequelize.query(
        `select
            tale_id,
            tale_fullname,
            tale_photo,
            tale_bootcamp,
            tale_status,
            tale_status_date,
            taba_batch_id,
            batch_name,
            batch_start_date,
            batch_end_date,
            tale_status_timeline,
            batch_inst_id,
            inst_name
        from talent t
        inner join talent_batch tb on t.tale_id = tb.taba_batch_id
        inner join batch b on tb.taba_batch_id = b.batch_id
        inner join instructor i on b.batch_inst_id = i.inst_id
        where tale_status = 'Talent'
        `,
        {
            type: sequelize.QueryTypes.SELECT,
            model: req.context.models.talent,
            mapToModel: true,
        }
    );
    return res.send(result);
};

const findAllList = async (req, res) => {
    try {
        const result = await req.context.models.talent.findAll({
            include: [
                {
                    model: req.context.models.talent_batch,
                    as: "talent_batches",
                },
            ],
        });
        return res.send(result);
    } catch (error) {
        return res.sendStatus(404).json({ msg: "N0 DATA FOUND" });
    }
};

const findBatch = async (req, res) => {
    const result = await req.context.models.batch.findAll({
        attributes: [
            "batch_id",
            "batch_name",
            "batch_technology",
            "batch_start_date",
            "batch_end_date",
            "batch_status",
        ],
        include: [
            {
                model: req.context.models.talent_batch,
                as: "talent_batches",
                attributes: ["taba_tale_id"],
                where: {
                    taba_drop: false,
                },
                include: {
                    model: req.context.models.talent,
                    as: "taba_tale",
                    attributes: ["tale_photo"],
                },
            },
            {
                model: req.context.models.instructor,
                as: "batch_inst",
                attributes: ["inst_name"],
            },
        ],
    });
    return res.send(result);
};

const findTalent = async (req, res) => {
    try {
        const result = await req.context.models.talent_batch.findAll({
            include: [
                {
                    model: req.context.models.talent,
                    as: "taba_tale",

                    where: { tale_status: "Talent" },
                },
                {
                    model: req.context.models.batch,
                    as: "taba_batch",
                    include: {
                        model: req.context.models.instructor,
                        as: "batch_inst",
                    },
                },
            ],
        });
        return res.send(result);
    } catch (error) {
        return res.sendStatus(404).json({ msg: "N0 DATA FOUND" });
    }
};

export default {
    findAllRows,
    findBySql,
    findAllList,
    findBatch,
    findTalent,
};
