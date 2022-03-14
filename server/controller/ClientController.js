const findNameClient = async (req, res) => {
    const { client_name } = req.body;
    try {
        const result = await req.context.models.client.findOne({
            where: { client_name: client_name }
        });
        return res.send(result);
    } catch (error) {
        return res.send(error)
    }
}

const findClient = async (req, res) => {

    try {
        const talent = await req.context.models.talent.findOne({
            where: { tale_id: req.params.id }
        })
        const tapl = await req.context.models.talent_placement.findAll({
            where: { tapl_tale_id: talent.dataValues.tale_id, tapl_drop: false }
        })
        const place = await req.context.models.placement.findAll({
            where: { place_id: tapl[0].dataValues.tapl_place_id }
        })
        const client = await req.context.models.client.findAll({
            where: { client_id: place[0].dataValues.place_client_id }
        })
        const result = { talent, tapl, place, client }
        return res.send(result)
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
export default { findNameClient, findClient }