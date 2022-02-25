const createSwitchIdle = async (req, res, next) => {
    const { tati_timeline_name, tati_date, tati_tale_id } = req.body;

    try {
        const result = await req.context.models.talent_timeline.create({
            tati_timeline_name: tati_timeline_name,
            tati_date: tati_date,
            tati_tale_id: tati_tale_id,
        });
        // res.send(result);
        req.timeline = result.dataValues
        next()

    } catch (error) {
        res.status(404).send("no data found")
    }
};

const UpdateStatus = async (req, res) => {
    const timeline = req.timeline
    try {
        const result = await req.context.models.talent.update(
            {
                tale_status_timeline: 'Idle',
                tale_timeline_date: timeline.tati_date,
            },
            { returning: true, where: { tale_id: timeline.tati_tale_id, tale_status_timeline: 'Placement' } }
        )
        res.send(result)
    } catch (error) {
        res.status(404).send("no data found")
    }
}

export default {
    createSwitchIdle,
    UpdateStatus
};