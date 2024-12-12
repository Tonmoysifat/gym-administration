import express from 'express';
import hpp from "hpp"
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import {authRoute} from "./routes/auth.route";
import {scheduleRoute} from "./routes/schedule.route";
import {BookingRoute} from "./routes/booking-route";
dotenv.config();
const app = express()

let URL = "mongodb+srv://<username>:<password>@atlascluster.ufe1snn.mongodb.net/gynManagement"
let OPTION={user:process.env.DB_USER,pass:process.env.DB_PASS,autoIndex:true}

mongoose.connect(URL,OPTION).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize())
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb"}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 3000,
});
app.use(limiter);
app.set("etag", false)
app.use("/auth",authRoute)
app.use("/schedule",scheduleRoute)
app.use("/booking",BookingRoute)

const PORT =  2084;
app.listen(PORT,function () {
    console.log(`back-end is running on http://localhost:${PORT}`)
})