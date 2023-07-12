var express =    require("express"),
    app =        express(),
    bodyParser = require("body-parser"),
    mongoose =   require("mongoose"),
    Car =        require("./models/cars"),
    Comment =    require("./models/comments");
    seedDB =     require("./seeds");

mongoose.connect("mongodb://localhost:27017/car_web4", { useNewUrlParser: true });    

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

seedDB();
//adding a neww car to the database

// var merco = new Car({
//     name: "audi",
//     image:"https://cdn.motor1.com/images/mgl/m63Oo/s1/audi-rs6-avant-performance-in-the-alps.jpg",
//     description:"This car has a v12 engine"  
// });

// merco.save(function(err,car){
//     if(err){
//         console.log("Something went wrong");
//         console.log(err);
//     } else{
//         console.log("A new car has been saved");
//         console.log(car.name);
//     }
// });  

app.get("/",function(req,res){
    res.render("homepage");
});

//INDEX route---show all cars
app.get("/cars",function(req,res){
    Car.find({},function(err,allCars){
        if(err){
            console.log("There is a error");
        } else{
            res.render("index",{cars:allCars});
        }
    });
});

//NEW---form to create a new car
app.get("/cars/newcars",function(req,res){
    res.render("newCar");
});
//CREATE route---add a new car to DB
app.post("/cars",function(req,res){
    var brand = req.body.brand;
    var image = req.body.image;
    var desc = req.body.description;
    var newCar = {
        name:brand,
        image:image,
        description:desc
    }
    Car.create(newCar,function(err,newCar){
        if(err){
            console.log("Error");
        } else{
            res.redirect("/cars");
        }
    });
    //carArray.push(newCar);
});

//SHOW route---show one specific car(using the id)
app.get("/cars/:id",function(req,res){
    //res.send("This is the show page");
    Car.findById(req.params.id).populate("comments").exec(function(err,car){
        if(err){
            console.log("Error");
        } else{            
            res.render("show",{car:car});
            //console.log(car);
            //this would display the elements of a car, including the comments that was called by reference
        }
    });
});

//adding comments
app.get("/cars/:id/comments/new",function(req,res){
    Car.findById(req.params.id,function(err,car){
        if(err){
            console.log(err);
        } else{
            res.render("new",{car:car});
        }
    });
});

app.listen(3100,function(){
    console.log("car server has started!");
});