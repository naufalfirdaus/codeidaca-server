import UploadDownloadHelper from '../helpers/UploadDownloadHelper'
import { sequelize } from '../models/init-models';

const createData = async(req, res) => {
    const { files, fields } = req.fileAttrib;

    try {
        const result = await req.context.models.talent.create({
            tale_fullname: fields[0].value, //fullname
            tale_email: fields[1].value, //email 
            tale_birthdate: fields[2].value, //birth date
            tale_education: fields[3].value, //pendidikan
            tale_school_name: fields[4].value, //pendidikan universitas
            tale_major: fields[5].value, //jurusan
            tale_graduate: parseInt(fields[6].value), //tahun lulus
            tale_gpa: parseInt(fields[7].value), //ipk
            tale_handphone: fields[8].value, //contact number
            tale_bootcamp: fields[9].value, //joint bootcamp
            tale_motivation: fields[10].value, //
            tale_address: fields[11].value, //
            tale_city: fields[12].value, //asal kota
            tale_province: fields[13].value, //provinsi
            tale_role: fields[14].value, //
            tale_candidate_resume: fields[15].value,
            tale_resume: fields[16].value, //resume
            tale_cover_letter: fields[17].value, //cover letter
            tale_photo: files[0].file.newFilename, //photo
            tale_position: fields[18].value,
            tale_scale_skill: parseInt(fields[19].value),

        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

const findById = async(req, res) => {
    // const id = req.params.id
    // const result = await req.context.models.talent.findOne({
    //     where: { tale_id: id }
    // });
    // return res.send(result);

    try {
        const result = await req.context.models.talent.findOne({
            where: { tale_id: req.params.id }
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

const updateTalent = async(req, res) => {
    try {
        const singlePart = await UploadDownloadHelper.uploadSingleFile(req);
        const { attrb: { file, fields, filename }, status: { status } } = singlePart;

        if (status === 'succeed') {
            try {
                const result = await req.context.models.talent.update({
                    tale_fullname: fields[0].value,
                    tale_birthdate: fields[1].value,
                    tale_education: fields[2].value,
                    tale_major: fields[3].value,
                    tale_school_name: fields[4].value,
                    tale_handphone: fields[5].value,
                    tale_bootcamp: fields[6].value,
                    tale_graduate: parseInt(fields[7].value),
                    tale_gpa: parseInt(fields[8].value),
                    tale_city: fields[9].value,
                    tale_province: fields[10].value,
                    tale_tag_skill: fields[11].value,
                    tale_candidate_resume: filename[0],
                    tale_resume: filename[1],
                    tale_photo: filename[2]

                }, { returning: true, where: { tale_id: parseInt(req.params.id) } });
                return res.send(result);
            } catch (error) {
                return res.send(404).send(error);
            }
        }
    } catch (error) {
        return res.send(error);
    }
}

// const findRowById = async (req, res) => {
//     const result = await req.context.models.category.findByPk(
//         req.params.id
//     );
//     return res.send(result);
// }

// const createData = async(req, res) => {
//     const { files, fields } = req.fileAttrib;

//     try {
//         const result = await req.context.models.talent.create({
//             tale_fullname = fields[0].value,
//             tale_email = fields[1].value,
//             tale_birthdate = fields[2].value,
//             tale_education = fields[3].value,
//             tale_school_name = fields[4].value,
//             tale_major = fields[5].value,
//             tale_graduate = parseInt(fields[6].value),
//             tale_gpa = parseInt(fields[7].value),
//             tale_handphone = fields[8].value,
//             tale_bootcamp = fields[9].value,
//             tale_motivation = fields[10].value,
//             tale_address = fields[11].value,
//             tale_city = fields[12].value,
//             tale_province = fields[13].value,
//             tale_role = fields[14].value,
//             tale_candidate_resume = fields[15].value,
//             tale_resume = fields[16].value,
//             tale_cover_letter = fields[17].value,
//             tale_photo = files[0].file.newFilename,
//             tale_position = fields[18].value,
//             tale_scale_skill = parseInt(fields[19].value),
//             tale_status = 
//             tale_status_date =
//             tale_tag_skill =
//             tale_user_id =
//             tale_status_timeline =
//             tale_timeline_date =
//         })
//     }
// }

export default {
    createData,
    findById,
    updateTalent
}