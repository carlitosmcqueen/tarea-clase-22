import MongoStore from "connect-mongo";
import * as dotenv from "dotenv"
dotenv.config()
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionConfig ={
    secret: "32m32e90me2393",
    resave: true,
    cookie:{maxAge: 300000},
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE,
        mongoOptions: advancedOptions,
    })
}
export default sessionConfig