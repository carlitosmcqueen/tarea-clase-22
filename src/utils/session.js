import MongoStore from "connect-mongo";
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionConfig ={
    secret: "32m32e90me2393",
    resave: true,
    cookie:{maxAge: 60000},
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://CarlosCoder:coder123@cluster0.tl5cqne.mongodb.net/test",
        mongoOptions: advancedOptions,
    })
    
}
export default sessionConfig