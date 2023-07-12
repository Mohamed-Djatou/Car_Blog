var  mongoose = require("mongoose");
var Car = require("./models/cars");
Comment =    require("./models/comments");

var data = [
    {
        name:"Mercedes S63 amg coupe",
        image:"https://images.carscoops.com/2015/08/vossen-merc-s63amg-matte-12.jpg",
        description:"This v12 monster is where class and power meet to produce this elegant german monster"
    },
    {
        name:"Porsche GT2 Rs",
        image:"https://images.caradisiac.com/logos/3/1/9/8/253198/S0-porsche-va-relancer-la-production-de-la-911-gt2-rs-175181.jpg",
        description:"Achieving the best lap in the nurburgring, this car is a most to experience a 10/10 handling experience"
    },
    {
        name:"Bentley Continental GT",
        image:"https://cdn.motor1.com/images/mgl/mgLwA/s1/2012-304335-bentley-continental-gt-redesign-by-mansory-live-in-geneva-13-03-20121.jpg",
        description:"I don't have the words... I just wanna drive it"
    },
]
function seedDB(){
    Car.remove({},function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed Car");
        }
    });
    //adding datas to the DB
    data.forEach(function(seed){
        Car.create(seed,function(err,car){
            if(err){
                console.log("err");
            } else{
                console.log("We added a new Car");
                //adding a comment to the post
                Comment.create(
                    {
                        text:"This car is really beautiful",
                        author:"The Admin"
                    }, function(err, comment){
                        if(err){
                            console.log("Error adding a comment");
                        }
                        else{
                            car.comments.push(comment);
                            car.save(); 
                        }
                });
            }
        });
    });       
}

module.exports = seedDB;
