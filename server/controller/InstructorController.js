const findAllRows = async (req, res) => {
    try {
        const result = await req.context.models.instructor.findAll();
        return res.send(result);
    } catch (error) {
        return res.sendStatus(404).json({ msg: "N0 DATA FOUND" });
    }
};

export default {
    findAllRows,
};