var mongoose    = require("mongoose"),
    Bullet      = require("./models/bullet"),
    Note        = require("./models/note");
    
var data = [
    {
        task: "Bullet Journal App",
        description: "Make the best get shit done app",
        dueDate: "8/31/2017"
    },
    {
        task: "AMEX Deal Options",
        description: "Put together ppt with the various deals for AMEX",
        dueDate: "8/8/2017"
    }
];

function seedDB(){
    Bullet.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Bullets");
        data.forEach(function(seed){
            Bullet.create(seed, function(err, bullet){
                if(err){
                    console.log("added a bullet");
                } else {
                    Note.create(
                        {
                            text: "Make sure to poop at some point",
                            dateCreated: "8/7/2017"
                            
                        }, function(err, note){
                            if(err){
                                console.log(err);
                            } else {
                                bullet.notes.push(note);
                                bullet.save();
                                console.log("Created a new note");
                            }
                        });
                            
                }
            });
        });
    });
}

module.exports = seedDB;