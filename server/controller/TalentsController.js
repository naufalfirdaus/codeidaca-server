const findTalent = async (req, res) => {
    try {
        const result = await req.context.models.talent.findAll();
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

export default{
    findTalent
}