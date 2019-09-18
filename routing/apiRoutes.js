var friends = require("../app/data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var bestFriendVar = 0;
    var minDifference = 100;

    for (var i = 0; i < friends.length; i++) {
      friends[i].best = false;
      var differnce = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(req.body.scores[j] - friends[i].scores[j]);
        differnce += difference;
      }

      if (differnce < minDifference) {
        bestFriendVar = i;
        minDifference = differnce;
      }
    }

    friends.push(req.body);
    friends[bestFriendVar].best = true;
    res.json(friends[bestFriendVar]);
  });
};
