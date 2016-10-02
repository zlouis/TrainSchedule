
var config = {
    apiKey: "AIzaSyB6fMAP1ES7G21doGxcxKVRAJDuEjcesOE",
    authDomain: "trainschedule-a7cd2.firebaseapp.com",
    databaseURL: "https://trainschedule-a7cd2.firebaseio.com",
    storageBucket: "trainschedule-a7cd2.appspot.com",
    messagingSenderId: "652497974428"
  };
  firebase.initializeApp(config);

var trainschedule = firebase.database();

trainschedule.ref().on("child_added", function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

  // Store  into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainFirstTrain = childSnapshot.val().firstTrain;

  
  // calculate the minutes till arrival time///
  var differenceTimes = moment().diff(moment.unix(trainFirstTrain), "minutes");
  var trainRemainder = moment().diff(moment.unix(trainFirstTrain), "minutes") % trainFrequency ;
  var trainMinutes = trainFrequency - trainRemainder;

  //calculate the arrival time of trains////
  var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A"); 
  console.log(trainMinutes);
  console.log(trainArrival);

  console.log(moment().format("hh:mm A"));
  console.log(trainArrival);
  console.log(moment().format("X"));


  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");



});


// Button for adding trains
$("#addTrainBtn").on("click", function(){


  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainInput = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequencyInput").val().trim();


  var newTrain = {
    name:  trainName,
    destination: destination,
    firstTrain: firstTrainInput,
    frequency: frequency
  }

  
  trainschedule.ref().push(newTrain);

  // show logs in console
  console.log(newTrain.name);
  console.log(newTrain.destination); 
  console.log(firstTrainInput);
  console.log(newTrain.frequency)



 /// reset input  values to be empty
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");


  return false;
});


