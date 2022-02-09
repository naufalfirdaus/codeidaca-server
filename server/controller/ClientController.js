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

export default { findNameClient }