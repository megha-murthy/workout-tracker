const express= require("express");
const logger= require("morgan");
const mongoose = require("mongoose");
const path= require("path");
const mongojs= require("mongojs");

const PORT= process.env.PORT || 3000;

const Workout = require("./models/workoutModel.js");

const app= express();

app.use(logger("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));

// var MONGODB_URI=process.env.MONGODB_URI || "mongodb://localhost/workout"
// mongoose.connect(MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || "mongodb://workout:password1@ds223161.mlab.com:23161/heroku_374jvllv",{ useNewUrlParser: true, useFindAndModify: false});

//Routes

app.get("/exercise",(req,res)=>{
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
})

app.post("/api/workouts",(req,res)=>{
    //const workout= new Workout(req.body)
    Workout.create(req.body)
    .then(dbWorkout=>{
        res.json(dbWorkout);
        console.log("Response sent to server successfully")
    })
    .catch(err=>{
        res.status(400).json(err);
    })

})

app.get("/api/workouts",(req,res)=>{
    Workout.find({})
    .then(dbWorkout=>{
        res.json(dbWorkout);
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

// app.get("/api/workouts/:id",(req,res)=>{
//     Workout.find({_id:mongojs.ObjectId(req.params.id)})
//     .then(dbWorkout=>{
//         res.json(dbWorkout);
//     })
//     .catch(err=>{
//         res.status(400).json(err)
//     })
// })

app.put("/api/workouts/:id",(req,res)=>{
    Workout.findByIdAndUpdate({_id:mongojs.ObjectId(req.params.id)},{$push:{exercises:req.body}}, {new:true})
    .then(dbWorkout=>{
        console.log(dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

// app.get("/api/workouts/range",(req,res)=>{
//     Workout.find({})
//     .then(dbWorkout=>{
//         window.location.replace("/stats");
//        res.json(dbWorkout);
        
//     })
//     .catch(err=>{
//         res.status(400).json(err)
//     })

// })

app.get("/api/workouts/range",(req,res)=>{
    Workout.find({})
    .then(dbWorkout=>{
       res.json(dbWorkout);
        
    })
    .catch(err=>{
        res.status(400).json(err)
    })

})

app.get("/stats",(req,res)=>{
    res.sendFile(path.join(__dirname, "./public/stats.html"));
})


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });