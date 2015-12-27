"use strict";

var tracks = [
    "data/03_Silly_Go_Round.mp3",
    "data/04 - angel gate.mp3",
    "data/angel gate.mp3"
];

var currentTrackIndex = 0;
var audioPlayer;
var audioTrack;
var audioTitle;
var playButton;
var nextButton;
var prevButton;
var muteButton;
var volumeSlider;
var progressSlider;

function setText(elem, text) {
    elem.innerHTML = text;
}

function setAttributes(elem, attrs) {
    for (var k in attrs) {
        elem.setAttribute(k, attrs[k]);
    }
}

function initPlayer() {
    audioPlayer = document.getElementById("audioplayer");
    audioTrack = document.getElementById("audiotrack");

    // create play button
    playButton = document.createElement("button");
    playButton.type = "button";
    audioPlayer.appendChild(playButton);
    audioTrack.removeAttribute("controls");
    audioTrack.addEventListener("play", function () {
        setText(playButton, "Pause");
    });
    audioTrack.addEventListener("playing", function () {
        setText(playButton, "Pause");
    });
    audioTrack.addEventListener("pause", function () {
        setText(playButton, "Play");
    });
    setText(playButton, "Play");

    // create previous button
    prevButton = document.createElement("button");
    prevButton.type = "button";
    audioPlayer.appendChild(prevButton);
    setText(prevButton, "Previous");

    // create next button
    nextButton = document.createElement("button");
    nextButton.type = "button";
    audioPlayer.appendChild(nextButton);
    setText(nextButton, "Next");

    // create mute button
    muteButton = document.createElement("button");
    muteButton.type = "button";
    audioPlayer.appendChild(muteButton);
    setText(muteButton, "Mute")

    // create volume slider
    volumeSlider = document.createElement("input");
    volumeSlider.type = "range";
    audioPlayer.appendChild(volumeSlider);
    volumeSlider.style.width = "100px";
    volumeSlider.style.display = "inline-block";
    setAttributes(volumeSlider, {
        "type": "range",
        "min": "0",
        "max": "1",
        "step": "any",
        "value": "1"
    });

    // create progression slider
    progressSlider = document.createElement("input");
    progressSlider.type = "range";
    audioPlayer.appendChild(progressSlider);
    progressSlider.style.width = "auto";
    progressSlider.style.display = "inline-block";

    // create audio title
    audioTitle = document.createElement("div");
    audioTitle.style.display = "inline-block";
    audioPlayer.appendChild(audioTitle);

    playButton.addEventListener("click", playPause);
    nextButton.addEventListener("click", nextTrack);
    prevButton.addEventListener("click", prevTrack);
    muteButton.addEventListener("click", muteUnmute);
    volumeSlider.addEventListener("input", changeVolume);
    audioTrack.addEventListener("volumechange", updateMuteButton);

    progressSlider.addEventListener("input", updateTrackProgress);
    audioTrack.addEventListener("timeupdate", seekTrackProgress);

    audioTrack.addEventListener("loadstart", function () {
        setText(audioTitle, "downloading...");
    });

    audioTrack.onerror = function () {
        setText(audioTitle, "error loading track");
    };
    audioTrack.addEventListener("loadeddata", function () {
        audioTrack.play();
        setText(audioTitle, audioTrack.currentSrc);
    });

    audioTrack.addEventListener("loadedmetadata", function () {
        setAttributes(progressSlider, {
            "type": "range",
            "min": "0",
            "max": audioTrack.duration,
            "step": "any",
            "value": "0"
        });
    });

    audioTrack.addEventListener("durationchange", function () {
        setAttributes(progressSlider, {
            "type": "range",
            "min": "0",
            "max": audioTrack.duration,
            "step": "any",
            "value": "0"
        });
    });

    audioTrack.addEventListener("ended", function () {
        nextTrack();
    });
}

function loadCurrentTrack() {
    loadTrack(tracks[currentTrackIndex]);
}

function loadTrack(track) {
    audioTrack.src = track;
    audioTrack.load();

    setText(audioTitle, "loading...");
}

function playPause() {
    if (audioTrack.paused) {
        audioTrack.play();
    } else {
        audioTrack.pause();
    }
}

function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= tracks.length)
        currentTrackIndex = 0;
    loadCurrentTrack();
}

function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0)
        currentTrackIndex = tracks.length - 1;
    loadCurrentTrack();
}

function muteUnmute() {
    if (audioTrack.volume == 0) {
        audioTrack.volume = 1;
    } else {
        audioTrack.volume = 0;
    }

    updateMuteButton();
}

function changeVolume() {
    audioTrack.volume = volumeSlider.value;
}

function updateMuteButton() {
    volumeSlider.value = audioTrack.volume;
    if (audioTrack.volume != 0) {
        setText(muteButton, "Mute");
    } else {
        setText(muteButton, "Unmute");
    }
}

function updateTrackProgress() {
    audioTrack.currentTime = progressSlider.value;
}

function seekTrackProgress() {
    progressSlider.value = audioTrack.currentTime;
}