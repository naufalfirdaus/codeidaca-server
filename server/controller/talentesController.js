import UploadDownloadHelper from "../helpers/UploadDownloadHelper"
const createTalent = async (req, res) => {
    const {files, fields} = req.fileAttrb;
    // const {tale_fullname} = req.body

    try {
        const result = await req.context.models.talent.create({
            tale_fullname: fields[0].value,
            tale_birthdate: fields[1].value,
            tale_education: fields[2].value,
            tale_school_name: fields[3].value,
            tale_major: fields[4].value,
            tale_handphone: fields[5].value,
            tale_bootcamp: fields[6].value,
            tale_motivation: fields[7].value,
            tale_user_id: fields[8].value,
            tale_email: fields[9].value,
            tale_resume: files[0].file.newFilename,
            tale_photo: files[1].file.newFilename,
            tale_role: "candidate",
            tale_status: "Candidate",
            tale_status_date: Date.now(),
            tale_status_timeline: "Apply",
            tale_timeline_date: Date.now(),
        });
        return res.send(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export default{
    createTalent   
}