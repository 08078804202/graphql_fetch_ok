const mongoose =require("mongoose")
mongoose.connect(
    "mongodb+srv://gaohong:gyl0216gyb0216@cluster0.evogn.mongodb.net/test?retryWrites=true&w=majority",
    {
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    }
)

const FilmSchem =new mongoose.Schema({
    id:{type:String},
    name:{type:String},
    poster:{type:String},
    price:{type:Number}
})

const FilmModel =mongoose.model("film",FilmSchem)

module.exports={
    FilmModel
}