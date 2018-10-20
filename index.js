const express = require("express");
const app = express();

app.use(express.static(__dirname + "/views")); // html
app.use(express.static(__dirname + "/public")); // js, css, images

const server = app.listen(5000, function() {
  console.log("Now listening to port 5000");
});

const io = require("socket.io")(server);
io.on("connection", () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});



var i = 0;
var j = 0;

var list = [
  { title: "Have at least 5 gallons of water per person", place: "" },
  { title: "Put together a 3 to 5 day supply of food that doesn’t go bad (like canned food)", place: "" },
  { title: "Gather any prescription medicines", place: "" },
  { title: "have First Aid Kit", place: "pharmacy" },
  {title:"have Flashlight", place: ""}
];

io.on("connection", function(socket) {
  socket.emit(
    "bot reply",
    "There is a hurricane from category 5 alerted around your area that is predicted to last for 4 days, are you planning to leave ?"
  );
  socket.on("chat message", text => {
    console.log(i + "dsadas");
    console.log("mussage: " + text);

    if (i == 0) {
      if (text === "no") {
        socket.emit(
          "bot reply",
          "ِAre you insane? These are some pictures and videos for what happened in a hurricane called Macko in Mexico, when you come back click the button"
        );
      } else if (text === "yes") {
        socket.emit(
          "bot reply",
          "Let's check your checklist together then, are you ready?"
        );
        i++;
      }
    } else {
      if (text === "no") {
        console.log("hi");
        socket.emit(
          "bot reply",
          "You can get this item from the pharmacy, The nearest pharmacy is Guardian it is 5 minutes away, follow google map "
        );

        socket.emit(
            "bot text",
            "https://www.google.com/maps/place/Guardian/@3.1248417,101.6534577,15z/data=!4m8!1m2!2m1!1spharmacy!3m4!1s0x31cc49d0a17dd3ff:0xe3b6bfb09d93ca83!8m2!3d3.1198755!4d101.6743677"
          );
      } else if (text === "yes") {
        if (j == list.length) {
          socket.emit(
            "bot reply",
            "We have finished all your checklist now you need to go to the shelter, May Allah bless you!"
          );
        } else {
          socket.emit(
            "bot reply",
            "Do you "+list[j].title+" ?"
          );
          i++;
          console.log(list[j]);
          j++;
        }
      }
    }
  });
});
