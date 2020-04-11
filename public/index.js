init();

async function init() {
  console.log("####start here!!")
  if (location.search.split("=")[1] === undefined) {
    console.log("reached here")
    const workout = await API.getLastWorkout();
    console.log("HIIIIIII work out value",workout)
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
  //document.querySelector("#continue-btn").addEventListener("click",continueWorkout)
}

// function continueWorkout(){

// }