const findTalentReview = async (req, res) => {

    try {
        const talent = await req.context.models.talent.findOne({
            where: { tale_id: req.params.id }
        })
        const talentBatch = await req.context.models.talent_batch.findAll({
            where: { taba_tale_id: talent.dataValues.tale_id }
        })
        const batch = await req.context.models.batch.findAll({
            where: { batch_id: talentBatch[0].dataValues.taba_batch_id }
        })


        const result = { talent, talentBatch, batch }
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data found")
    }

}

export default { findTalentReview }