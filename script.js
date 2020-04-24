const video = document.getElementById('video'),
  play = document.getElementById('play'),
  stop = document.getElementById('stop'),
  progress = document.getElementById('progress'),
  timestamp = document.getElementById('timestamp');


//Play and pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"/>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"/>`;
  }
}

function updateProgressReversed() {
  timestamp.classList.toggle('reversed');
}

// Update progress and timestamp
function updateProgress() {
  if (timestamp.classList.contains('reversed')) {
    progress.value = (video.currentTime / video.duration) * 100;

    let timeLeft = video.duration - video.currentTime;
    let minsLeft = Math.floor(timeLeft / 60);
    let secsLeft = Math.floor(timeLeft % 60);
    if (minsLeft < 10) {
      minsLeft = '0' + String(minsLeft);
    }
    if (secsLeft < 10) {
      secsLeft = '0' + String(secsLeft);
    }
    if (secsLeft == 0 && minsLeft == 0) {
      timestamp.innerHTML = `${minsLeft}:${secsLeft}`;
    } else {
      timestamp.innerHTML = `-${minsLeft}:${secsLeft}`;
    }
  } else {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
  }
}

// Set Video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}



// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);
timestamp.addEventListener('click', updateProgressReversed);