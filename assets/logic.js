$(document).ready(function() {


  // variables to be pushed to html
  var $output = $("#train-output");
  var $input = $("#train-input");
  var $dest = $("#destination");
  var $route = $("#train-route");
  var $arrival = $("#train-arrival");
  var $freq = $("#frequency");


  var database = firebase.database();

// pushing to firebase

  $input.submit(function(event) {
    event.preventDefault();
    database.ref().push({
      route: $route.val(),
      dest: $dest.val(),
      arrival: $arrival.val(),
      freq: $freq.val()
    })
  });


  // variables for time calculations

  database.ref().on("child_added", function(snapshot) {
    var current = snapshot.val();
    var now = moment();
    var tStart = moment(current.arrival, "HH:mm");

    var nextTrain = moment(tStart.add((Math.ceil((now.diff(tStart, "minutes")/current.freq)) * current.freq), "minutes"));

    var minutesLeft = nextTrain.diff(now, "minutes");

    var timediff = moment().diff(moment(current.arrival, "HH:mm"), "minutes");
    $output.append(`<tr><td>${

      // pushing data to train schedule
      current.route
    }</td><td>${
      current.dest
    }</td><td>${
      current.freq
    }</td><td>${
      nextTrain.format("HH:mm")
    }</td><td>${
      minutesLeft
    }</td></tr>`);


  });
});