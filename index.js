const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos')
const path = require('path');

const PORT = process.env.PORT || 3000; 

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)


const start = async function(){
    try{
        await mongoose.connect('mongodb+srv://vladilen:doktor111@cluster0.mawhc.mongodb.net/todos',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        app.listen(PORT, ()=>{
            console.log('server start');
        })
    } catch(e){
        console.log(e)
    }
   
}


start()