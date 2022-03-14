import UploadDownloadHelper from '../helpers/UploadDownloadHelper'
import { sequelize } from '../models/init-models';

const createData = async (req, res) => {
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

const findById = async (req, res) => {
    try {
        const result = await req.context.models.talent.findOne({
            where: { tale_user_id: req.params.id }
        })
        return res.send(result)
    } catch (error) {
        return res.status(404).send("no data found")
    }
}

const updateTalent = async (req, res) => {
    const { files, fields } = req.fileAttrb;
    
    if (files.length === 2) {
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
                tale_resume: files[0].file.originalFilename,
                tale_candidat_resume: files[1].file.originalFilename,
            }, { returning: true, where: { tale_user_id: parseInt(req.params.id) } });
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    }else if(files[0].fieldName === "tale_resume"){
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
                tale_resume: files[0].file.originalFilename,
            }, { returning: true, where: { tale_user_id: parseInt(req.params.id) } });
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    }else if(files[0].fieldName === "tale_candidat_resume"){
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
                tale_candidat_resume: files[0].file.originalFilename,
            }, { returning: true, where: { tale_user_id: parseInt(req.params.id) } });
            return res.send(result);
        } catch (error) {
            console.log(error);
        }
    }


}


const updateTalentNoFile = async (req, res) => {
    const { tale_fullname, tale_birthdate, tale_education, tale_major, tale_school_name, tale_handphone, tale_bootcamp, tale_graduate, tale_gpa, tale_city, tale_province, tale_tag_skill, tale__user_id } = req.body;
    const result = await req.context.models.talent.update({
        tale_fullname: tale_fullname,
        tale_birthdate: tale_birthdate,
        tale_education: tale_education,
        tale_major: tale_major,
        tale_school_name: tale_school_name,
        tale_handphone: tale_handphone,
        tale_bootcamp: tale_bootcamp,
        tale_graduate: tale_graduate,
        tale_gpa: tale_gpa,
        tale_city: tale_city,
        tale_province: tale_province,
        tale_tag_skill: tale_tag_skill
    },
        {
            returning: true,
            where: { tale_user_id: req.params.id }
        }
    );
    return res.send(result)
}


export default {
    createData,
    findById,
    updateTalent,
    updateTalentNoFile
}