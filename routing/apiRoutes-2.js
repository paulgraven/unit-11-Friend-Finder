var friends = require("../app/data/friends");
var userScore = 0;
var friendScore = 0;
var difference = 0;
var minDifference = 0;
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    for (var x = 0; x < req.body.scores.length; x++) {
      userScore += parseInt(req.body.scores[x]);
    }

    for (var i = 0; i < friends.length; i++) {
      friendScore = 0;
      difference = 0;
      // console.log(Math.min(difference));
      for (var j = 0; j < friends[i].scores.length; j++)
        friendScore += friends[i].scores[j];
      difference = Math.abs(userScore - friendScore);
      console.log("Name:", friends[i].name, difference);
    }
    console.log(Math.min(difference));
    friends.push(req.body);
  });

  app.post("/api/clear", function(req, res) {
    friends.length = 0;
    friendsData.length = 0;
    res.json({ ok: true });
  });
};
