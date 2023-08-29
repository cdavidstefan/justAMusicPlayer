const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'song-1',
        picture: 'image-1',
        displayName: 'Fear',
        artist: 'Boris Brejcha',
    },
    {
        name: 'song-2',
        picture: 'image-2',
        displayName: 'Mockingbird',
        artist: 'Eminem',
    },
    {
        name: 'song-3',
        picture: 'image-3',
        displayName: 'To The Moon And Back',
        artist: 'Boris Brejcha',
    },
    {
        name: 'metric-1',
        picture: 'metric-1',
        displayName: 'Metric',
        artist: 'Front Row',
    },
];

// Check if music is playing
let isPlaying = false;

// Play Music
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause Music
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong (song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.picture}.jpg`;

}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    loadSong(songs[songIndex]);
    playSong();
};

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };
    loadSong(songs[songIndex]);
    playSong();
};

// On Load - Select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
    const { duration, currentTime} = e.srcElement;
    // Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    };
    //Delay switching element to avoid NaN
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        };

    // Calculate display for current time
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    };
    currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;
    };
};

// Manually Set Progress Bar
function setProgressBar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width', width);
    const clickX = e.offsetX;
    console.log('clickX', clickX);
    const { duration } = music;
    console.log(clickX / width);
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);