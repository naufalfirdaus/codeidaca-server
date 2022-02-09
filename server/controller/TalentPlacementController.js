import { sequelize } from "../models/init-models";


const getPlaceOrder = async (req, res, next) => {
    try {
        const result = await sequelize.query("select 'CA'||lpad(nextval('placement_place_id_seq')||'',4,'0') as placeorder", {
            type: sequelize.QueryTypes.SELECT,
        });
        req.PlaceOrder = result[0].placeorder;
        next();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createPlacement = async (req, res, next) => {
    const { place_end_date, place_status, place_note, place_client_id } = req.body;

    try {
        const result = await req.context.models.placement.create({
            place_purchase_order: req.PlaceOrder,
            place_start_date: Date(),
            place_end_date: place_end_date,
            place_status: place_status,
            place_note: place_note,
            place_client_id: place_client_id
        });
        // res.send(result);
        req.placement = result

        next()
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const talenPlacement = async (req, res) => {
    const placement = req.placement
    try {
        const result = await req.context.models.talent_placement.create({
            tapl_drop: false,
            tapl_notes: placement.place_note,
            tapl_drop_date: placement.place_end_date,
            tapl_tale_id: null,
            tapl_place_id: placement.place_id
        });
        res.send(result);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default {
    createPlacement,
    getPlaceOrder,
    talenPlacement
};