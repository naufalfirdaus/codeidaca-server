// 1. pastikan selalu import dotenv di line pertama
//import "dotenv/config";
import config from './config/config'
import express from "express";
import cors from "cors";
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import middleware  from "./helpers/middleware";

//for access models to db
import models,{sequelize} from "./models/init-models";
import routes from './routes/IndexRoute'

// declare port
const port = process.env.PORT || 3001;

const app = express();
// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// load models dan simpan di req.context
app.use(async (req,res,next) =>{
    req.context = {models};
    next();
});

/*  app.use(process.env.URL_DOMAIN,(req,res)=>{
    res.send("Hello Eshopay");
});  */


//auth.setMiddleware(app);


// call routes
app.use(config.URL_DOMAIN+"/auth",routes.UserRoute)
app.use(process.env.URL_API + "/testimoni", routes.TestimoniRoute);
app.use(process.env.URL_API + "/instructor", routes.InstructorRoute);
app.use(process.env.URL_API + "/talentpage", routes.TalentRoute);

app.use(config.URL_API+"/curriculum", routes.CurriculumRoute)
app.use(config.URL_API+"/review", routes.ReviewRoute)

app.use(config.URL_API+"/candidat",routes.CandidateRoute)
app.use(config.URL_API+"/batch",routes.BatchRoute)
app.use(config.URL_API+"/instructors",routes.InstructorsRoute)
app.use(config.URL_API+"/talents",routes.TalentsRoute)

app.use(config.URL_API + "/placement", routes.TalentPlacement)
app.use(config.URL_API + "/client", routes.ClientRoute)
app.use(config.URL_API + "/detail", routes.TalentDetail)

app.use(config.URL_API + "/dashboard", routes.DashboardRoute)
app.use(config.URL_API + "/app", routes.AppSettingRoute)

app.use(config.URL_API+"/apply",routes.TalentesRoute)

app.use(config.URL_DOMAIN+"/bootcamp",routes.CampDetailRoute)
app.use(config.URL_DOMAIN+"/batchs",routes.BatchesRoute)
//use middleware to handle error from others modules
app.use(middleware.handleError);
app.use(middleware.notFound);


// set to false agar tidak di drop tables yang ada didatabase
const dropDatabaseSync = false;

sequelize.sync({force : dropDatabaseSync}).then(async ()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }

    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    });

})



export default app;