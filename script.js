// Initialize variables
let songIdx = 1;
let audioElement = new Audio(`songs/${songIdx}.mp3`);
// console.log(audioElement);
let playPauseButton = document.getElementById('playBtn');
let songBar = document.getElementById('songBar');
let currSongName = document.querySelector('.currName');
let songgName = document.querySelector('.songName');
let songAddingCode = '';
let backward = document.getElementById('prevBtn');
let forward = document.getElementById('forwBtn');

let songs = [
    { songName: 'Legion', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg', length: '02:34' },
    { songName: 'Trap', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg', length: '03:04' },
    { songName: 'They Man', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg', length: '02:55' },
    { songName: 'Rich kid', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg', length: '03:36' },
    { songName: 'Dreamer', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg', length: '03:44' },
    { songName: 'Safety Dance', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg', length: '04:15' },
    { songName: 'Back It Up', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg', length: '02:42' },
    { songName: 'Sunset', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg', length: '04:05' },
    { songName: 'Picture of you', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg', length: '02:43' },
    { songName: 'True Love', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg', length: '03:24' }
]

// Adding all songs on page
for (let i = 0; i < 10; i++) {
    songIdx = i;
    songAddingCode += `
    <div id = ${i + 1000} class="songList">
        <img src="${songs[i].coverPath}" alt="1">            
        <p class="songNamee">${songs[i].songName}</p>
        <span class="songListPlay">
        <span>${songs[i].length}</span> 
        <i id="${i}" class="ri-play-circle-fill playThisSong"></i>
        </span>
    </div>
    `;
}

document.querySelector('.allSongs').innerHTML = songAddingCode;

// Listen to events

// handelling play pause button
// CAREFULLY CLICK THE BUTTON IT IS ONLY ACCESSIBLE IN THE UPPER HALF OF THE ICON
playPauseButton.addEventListener('click', () => {
    // same button for play and pause   
    // paused and played are properties which tells that the audio is paused or playing by True or False. pause() and play() are methods which controls the pause and play the audio IMPORTANT
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        playPauseButton.classList.remove('ri-play-circle-fill');
        playPauseButton.classList.add('ri-pause-circle-fill');

        // currSongName.style.display = 'block';
        currSongName.style.opacity = 1;
    } else {
        audioElement.pause();
        playPauseButton.classList.remove('ri-pause-circle-fill');
        playPauseButton.classList.add('ri-play-circle-fill');

        // currSongName.style.display = 'none';
        currSongName.style.opacity = 0;
    }
})

//seeking the songbar 
audioElement.addEventListener('timeupdate', () => {
    let songPercentageCompleted = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(songPercentageCompleted);

    songBar.value = songPercentageCompleted;
})

songBar.addEventListener('change', () => {
    audioElement.currentTime = (songBar.value * audioElement.duration) / 100;
    // songBar.style.transition = 'all 1s ease-in';
})

let prev = 0;
const makePrevBtnsPlay = () => {
    // space optimized need not to itreate to all songList just change the previous one
    let prevSong = document.getElementById(songIdx);
    prevSong.classList.remove('ri-pause-circle-fill');
    prevSong.classList.add('ri-play-circle-fill');
    document.getElementById(songIdx + 1000).style.borderColor = 'white';

    // making all btns icon to play
    // Array.from(document.getElementsByClassName('playThisSong')).forEach((elem) => {
    //     elem.classList.remove('ri-pause-circle-fill');
    //     elem.classList.add('ri-play-circle-fill');
    // })
}

Array.from(document.getElementsByClassName('playThisSong')).forEach((elem) => {
    elem.addEventListener('click', (e) => {

        makePrevBtnsPlay();

        if (songIdx == e.target.id && !(audioElement.paused)) {
            e.target.classList.remove('ri-pause-circle-fill');
            e.target.classList.add('ri-play-circle-fill');

            playPauseButton.classList.remove('ri-pause-circle-fill');
            playPauseButton.classList.add('ri-play-circle-fill');

            audioElement.pause();

            currSongName.style.opacity = 0;
            document.getElementById(songIdx + 1000).style.borderColor = 'white';
        } else {
            songIdx = parseInt(e.target.id);
            // console.log(songIdx === '1') it returns a string convert it into int

            prev = songIdx;

            // changing songList icon
            e.target.classList.remove('ri-play-circle-fill');
            e.target.classList.add('ri-pause-circle-fill');

            // changing mainPlayButton
            playPauseButton.classList.remove('ri-play-circle-fill');
            playPauseButton.classList.add('ri-pause-circle-fill');

            // changing audio
            audioElement.src = `songs/${songIdx + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();

            // changing song name
            currSongName.style.opacity = 1;
            songgName.innerHTML = songs[songIdx].songName;

            // changing border color

            document.getElementById(songIdx + 1000).style.borderColor = 'rgb(30, 215, 96)';
        }
    })
})

backward.addEventListener('click', () => {
    let curr = document.getElementById(songIdx);
    curr.classList.remove('ri-pause-circle-fill');
    curr.classList.add('ri-play-circle-fill');
    document.getElementById(songIdx + 1000).style.borderColor = 'white';

    if (songIdx == 0) songIdx = 9;
    else songIdx -= 1;

    curr = document.getElementById(songIdx);
    curr.classList.remove('ri-play-circle-fill');
    curr.classList.add('ri-pause-circle-fill');
    document.getElementById(songIdx + 1000).style.borderColor = 'rgb(30, 215, 96)';

    audioElement.src = `songs/${songIdx + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    currSongName.style.opacity = 1;
    songgName.innerHTML = songs[songIdx].songName;
})

forward.addEventListener('click', () => {
    let curr = document.getElementById(songIdx);
    curr.classList.remove('ri-pause-circle-fill');
    curr.classList.add('ri-play-circle-fill');
    document.getElementById(songIdx + 1000).style.borderColor = 'white';

    if (songIdx == 9) songIdx = 0;
    else songIdx += 1;

    curr = document.getElementById(songIdx);
    curr.classList.remove('ri-play-circle-fill');
    curr.classList.add('ri-pause-circle-fill');
    document.getElementById(songIdx + 1000).style.borderColor = 'rgb(30, 215, 96)';

    audioElement.src = `songs/${songIdx + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    currSongName.style.opacity = 1;
    songgName.innerHTML = songs[songIdx].songName;
})

