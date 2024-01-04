const express=require("express")
const {buildSchema} =require("graphql")
const {graphqlHTTP} =require("express-graphql")
const {FilmModel} =require("./model")
const schema=buildSchema(`
    type Film{
        _id:String
        name:String
        poster:String
        price:Int
    }

    input FilmInput{
        name:String
        poster:String
        price:Int
    }

    type Query{
        getFilms:[Film]
        getFilm(name:String!):Film
    }

    type Mutation{
        createFilm(input:FilmInput):Film
        updateFilm(_id:String!,input:FilmInput):Film
        updateFilmName(name:String!,input:FilmInput):Film
        deleteFilm(_id:String):Film
    }
`)
const root ={
    getFilms:async ()=>{
        const films =await FilmModel.find()
        return films
    },

    getFilm:async ({name})=>{
        const film= await FilmModel.findOne({name})
        return film
    },
    createFilm:async ({input})=>{
        const film =await FilmModel.create(input)
        return film
    },
    updateFilm:async ({_id,input})=>{
        const film =await FilmModel.findByIdAndUpdate(_id,input)
        return film
    },
    // updateFilmName:async ({name,input})=>{
    //     const film =await FilmModel.findOneAndUpdate(name,input)
    //     console.log("name",name,"input",input)
    //     return film
    // },
    deleteFilm:async ({_id})=>{
        const film =await FilmModel.findByIdAndDelete(_id)
        return film
    }
}
const app =express()
app.use(express.json())
app.use(require("cors")())
app.use("/graphql",graphqlHTTP({
    schema:schema,
    rootValue:root,
    graphiql:true
}))
app.listen(4001,()=>{
    console.log("http://localhost:4001/graphql")
})