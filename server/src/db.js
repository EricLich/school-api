const mongoose = require('mongoose');

(async () => {
    try{
        const db = mongoose.connect('mongodb://localhost/school', {useNewUrlParser:true, useUnifiedTopology: true})
                            .then(db => console.log("DB connected"))
                            .catch(err => console.log(err))
    }catch(err){
        console.log(err);
    }
})()

