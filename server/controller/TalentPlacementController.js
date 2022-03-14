
const statusPlace = async (req, res, next) => {
    const { tale_id, client_name, place_purchase_order, place_start_date, place_end_date, place_status, place_note } = req.body;
    const client = await req.context.models.client.findAll({
        where: { client_name: client_name },
    })
    try {
        const result = await req.context.models.placement.findOrCreate({
            where: { place_purchase_order: place_purchase_order },
            defaults: {
                place_purchase_order: place_purchase_order,
                place_start_date: place_start_date,
                place_end_date: place_end_date,
                place_status: place_status,
                place_note: place_note,
                place_client_id: client[0].dataValues.client_id
            },
        });

        req.placement = {
            place: result[0].dataValues,
            talent: { tale_id }
        };
        next();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const talenPlacement = async (req, res, next) => {
    const { place, talent } = req.placement
    try {
        const result = await req.context.models.talent_placement.create({
            tapl_drop: false,
            tapl_notes: place.place_note,
            tapl_drop_date: place.place_end_date,
            tapl_tale_id: talent.tale_id,
            tapl_place_id: place.place_id
        });
        req.status = result.dataValues.tapl_tale_id
        next()

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const UpdateStatusPlace = async (req, res) => {
    const id = req.status
    const { place } = req.placement
    try {
        const result = await req.context.models.talent.update(
            {
                tale_status_timeline: place.place_status,
            },
            { returning: true, where: { tale_id: id } }
        )
        res.send("data terupdate")
    } catch (error) {
        res.status(404).send("no data found")
    }
}

const findAllRows = async (req, res) => {
    try {
        const result = await req.context.models.talent.findAll();
        return res.send(result);
    } catch (error) {
        return res.send(error)
    }

}

const createSwitchIdle = async (req, res, next) => {
    const { tati_timeline_name, tati_date, tati_tale_id } = req.body;

    try {
        const result = await req.context.models.talent_timeline.create({
            tati_timeline_name: tati_timeline_name,
            tati_date: tati_date,
            tati_tale_id: tati_tale_id,
        });
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
            { returning: true, where: { tale_id: timeline.tati_tale_id } }
        )
        res.send(result)
    } catch (error) {
        res.status(404).send("no data found")
    }
}

export default {
    findAllRows,
    createSwitchIdle,
    UpdateStatus,
    statusPlace,
    talenPlacement,
    UpdateStatusPlace,
};