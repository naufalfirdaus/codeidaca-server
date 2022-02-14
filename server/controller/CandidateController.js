import { sequelize } from "../models/init-models";

const findCandidate = async (req, res) => {
    try {
        const result = await req.context.models.talent.findAll({
            attributes: ['tale_id',
                        'tale_photo',  
                        'tale_fullname',
                        'tale_email',
                        'tale_school_name',
                        'tale_major',
                        'tale_graduate',	
                        'tale_handphone',
                        'tale_bootcamp',
                        'tale_status',
                        'tale_status_timeline',
                        'tale_timeline_date',],
            where: {tale_status: 'Candidate'},
            include:[
                {
                    model: req.context.models.talent_timeline,
                    as: 'talent_timelines',
                    attributes: [
                        ['tati_date','date_applied']
                    ],
                    where:{
                        tati_timeline_name : 'Apply'
                    }
                }
            ]
        });
        return res.send(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

const UpdateTimelineStatus = async (req, res, next) => {
    const { timeline_status } = req.body;
    try{
        const result = await req.context.models.talent.update(
            { 
                tale_status_timeline: timeline_status,
                tale_timeline_date : new Date()
            },
            {
                returning: true,
                where: { tale_id: req.params.id }
            }
        );
        next();
    }catch (error) {
        res.status(404).json({message : error.message})
    }
}

const createRowTimeline = async (req, res) => {
    const { timeline_status } = req.body;
    try{
        const result = await req.context.models.talent_timeline.create({
            tati_tale_id: req.params.id,
            tati_timeline_name: timeline_status,
            tati_date: new Date()
        });
        return res.send(result);
    }catch(error) {
        res.status(404).json({message : error.message})
    }
}


export default{
    findCandidate,
    UpdateTimelineStatus,
    createRowTimeline
}