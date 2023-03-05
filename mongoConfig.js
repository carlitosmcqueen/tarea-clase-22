import * as dotenv from "dotenv"
dotenv.config()


const config ={
    mongo :{
        url : process.env.DATABASE,
        options : {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    }

}
export default config;