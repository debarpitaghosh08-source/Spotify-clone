console.log("Welcome to Spotify");
//Initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
myProgressBar.value = 0;
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: "Illusion", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Trap", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "They Mad", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Plug Walk", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Alone With You", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Safety Dance", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Back It Up", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Tick-Tock", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Feel Better", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "True Love", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("SongName")[0].innerText = songs[i].songName
});
//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.innerHTML = `
            <circle cx="30" cy="30" r="28" fill="white"/>
            <rect x="20" y="18" width="6" height="24" fill="black"/>
            <rect x="34" y="18" width="6" height="24" fill="black"/>
        `;
    gif.style.opacity = 1;
  } else {
    audioElement.pause();

    // Change back to play icon
    masterPlay.innerHTML = `
            <circle cx="30" cy="30" r="28" fill="white"/>
            <polygon points="24,18 24,42 42,30" fill="black"/>
        `;
    gif.style.opacity = 0;

  }
})
console.log('masterPlay');

//Listen to Events
audioElement.addEventListener("timeupdate", () => {
  console.log("Current Time:", audioElement.currentTime);
  console.log("Duration:", audioElement.duration);

  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
    //calculating the progress in % as the whole myprogressbar is calculated as 100 %
    //therefore if song length is 240 sec after 30 second the current time is 30
    //tahole (30/240)*100=12.5% song ta bejeche
    // parseint ta point value ta remove kore
    //tahole joto percent barbe oi range rod ta accordingly move korbe
  );

  console.log("Progress:", progress);

  myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})
function makeAllPlays() {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.src = "play.svg";
  });
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
  element.addEventListener('click', (e) => {
    if (audioElement.paused) {
      makeAllPlays();
      e.target.src = "pause.svg";
      songIndex = parseInt(e.target.id);
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      masterPlay.innerHTML = `
            <circle cx="30" cy="30" r="28" fill="white"/>
            <rect x="20" y="18" width="6" height="24" fill="black"/>
            <rect x="34" y="18" width="6" height="24" fill="black"/>
        `;
      gif.style.opacity = 1;
      e
      audioElement.play();
    } else {
      masterPlay.innerHTML = `
            <circle cx="30" cy="30" r="28" fill="white"/>
            <polygon points="24,18 24,42 42,30" fill="black"/>
        `;
      gif.style.opacity = 0;
      audioElement.pause();
      e.target.src = "play.svg";
    }
  });
});
document.getElementById('previous').addEventListener('click', () => {

  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex--;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  myProgressBar.value = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();

  masterPlay.innerHTML = `
        <circle cx="30" cy="30" r="28" fill="white"/>
        <rect x="20" y="18" width="6" height="24" fill="black"/>
        <rect x="34" y="18" width="6" height="24" fill="black"/>
    `;
  gif.style.opacity = 1;
  makeAllPlays();
  document.getElementById(`${songIndex + 1}`).src = "pause.svg";
});
document.getElementById('next').addEventListener('click', () => {

  if (songIndex > 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  myProgressBar.value = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  masterPlay.innerHTML = `
        <circle cx="30" cy="30" r="28" fill="white"/>
        <rect x="20" y="18" width="6" height="24" fill="black"/>
        <rect x="34" y="18" width="6" height="24" fill="black"/>
    `;
  gif.style.opacity = 1;
  makeAllPlays();
  document.getElementById(`${songIndex + 1}`).src = "pause.svg";
});
audioElement.addEventListener("ended", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    myProgressBar.value = 0;
    makeAllPlays();

    // Remove the extra '1' here
    document.getElementById(`${songIndex + 1}`).src = "pause.svg";

    masterPlay.innerHTML = `
        <circle cx="30" cy="30" r="28" fill="white"/>
        <rect x="20" y="18" width="6" height="24" fill="black"/>
        <rect x="34" y="18" width="6" height="24" fill="black"/>
    `;

    gif.style.opacity = 1;
});