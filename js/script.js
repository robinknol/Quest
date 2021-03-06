const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');
const treasures = document.getElementById('treasure');

let currentLocation = 4;
let gotTreasure = false;
let doorLock = true;

let something = [];
  // something[0][locations] = "kantine";
  // something[0][images] = "room0.jpg";

let locations = [];
  locations[0] = "kantine";
  locations[1] = "trap";
  locations[2] = "eind";
  locations[3] = "docentenkamer";
  locations[4] = "gang";
  locations[5] = "medialab";
  locations[6] = "toiletten";
  locations[7] = "klaslokaal";
  locations[8] = "examenlokaal";

let images = [];
  images[0] = "room0.jpg";
  images[1] = "room1.jpg";
  images[2] = "room2.jpg";
  images[3] = "room3.jpg";
  images[4] = "room4.jpg";
  images[5] = "room5.jpg";
  images[6] = "room6.jpg";
  images[7] = "room7.jpg";
  images[8] = "room8.jpg";
 
let directions = [];
  directions[0] = ["oost"];
  directions[1] = ["west", "zuid"];
  directions[2] = ["zuid"];
  directions[3] = ["oost"];
  directions[4] = ["noord", "west", "zuid"];
  directions[5] = ["zuid"];
  directions[6] = ["oost"];
  directions[7] = ["noord", "west", "oost"];
  directions[8] = ["noord", "west"];

let descriptions = [];
  descriptions[0] = "u staat in een kantine. Hier zitten studenten te eten of computerspelletjes te doen";
  descriptions[1] = "u staat op een trap naar de eerste etage. Om u heen lopen studenten omhoog en omlaag";
  descriptions[2] = "u heeft gewonnen";
  descriptions[3] = "u staat in de lerarenkamer. De leraren eten hier hun lunch of drinken koffie of thee";
  descriptions[4] = "u staat in een gang. Studenten en leraren lopen richting de klaslokalen";
  descriptions[5] = "u staat in het medialab. Hier kan geexperimenteerd worden met bijvoorbeeld virtual reality brillen";
  descriptions[6] = "u staat bij de toiletten";
  descriptions[7] = "u staat in een klaslokaal. De tafels staan recht achter elkaar en voorin is een projector en een smartboard";
  descriptions[8] = "u staat in het examenlokaal. Hier zijn de vierdejaars studenten bezig met het voorbereiden van hun examen";


let usingTreasure = [];
  usingTreasure[5] = "sleutel";

let grabbingTreasure = [];
  grabbingTreasure[6] = "sleutel";

let treasure = [];
  treasure[6] = "Key.png";

myInput.addEventListener('keydown', getInput, false);

function getInput(evt)
{
  if (evt.key == "Enter")
  {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "ga")
    {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1)
      {
        switch (inputArray[1])
        {
        case "noord":
          currentLocation -= 3;
          break;
        case "zuid":
          currentLocation += 3;
          break;
        case "oost":
          currentLocation += 1;
          break;
        case "west":
          currentLocation -= 1;
          break;
        }
      }

      else
      {
        feedback.innerHTML = "dat mag niet";
        setTimeout(removeFeedback, 2000);
      }

      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "pak")
    {
      if (grabbingTreasure[currentLocation].indexOf(inputArray[1]) != -1)
      {
        gotTreasure = true;
        console.log("got key");
      }
      myInput.value = "";
    }

    if (inputArray[0] == "gebruik")
    {
      if (usingTreasure[currentLocation].indexOf(inputArray[1]) != -1)
      {
        if (gotTreasure == true)
        {
          doorLock = false;
          directions[5] = ["noord", "zuid"];
          console.log("Door open");
        }
      }
      myInput.value = "";
    }

    if (inputArray[0] != "ga" && inputArray[0] != "pak" && inputArray[0] != "gebruik" )
    {
      feedback.innerHTML = "mogelijke commando's zijn: ga, pak, gebruik";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }
  }
}

function giveLocation()
{
  divLocation.innerHTML = locations[currentLocation] + " => grid " + currentLocation;
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "Media/" + images[currentLocation];
  myDirections = "mogelijke richtingen zijn: ";
  for (let i = 0; i < directions[currentLocation].length; i++)
  {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myPossibilities.innerHTML = myDirections;
  if (gotTreasure == true)
  {
    myInventory.innerHTML = "Key"; 
  }
  else
  {
    myInventory.innerHTML = "uw inventory is leeg";
  }
  showTreasure(currentLocation);
}

function showTreasure(currentLocation)
{
  if(typeof treasure[currentLocation] != "undefined")
  {
    console.log(treasure[currentLocation]);
    treasures.src = "Treasure/" + treasure[currentLocation];
  }
}

function removeFeedback()
{
  feedback.innerHTML = "";
}

giveLocation();
