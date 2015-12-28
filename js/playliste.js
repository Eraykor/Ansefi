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

// for set attribute
function setAttributes(elem, attrs) {
    for (var k in attrs) {
        elem.setAttribute(k, attrs[k]);
    }
}

function initPlayer() {
    audioPlayer = document.getElementById("audioplayer");
    audioTrack = document.getElementById("audiotrack");

    // create play button
    playButton = document.getElementById("playbutton");
    audioTrack.removeAttribute("controls");
    audioTrack.addEventListener("play", function () {
        setText(playButton, '<span class="glyphicon glyphicon-pause fleche" aria-hidden="true"></span>');
    });
    audioTrack.addEventListener("playing", function () {
        setText(playButton, '<span class="glyphicon glyphicon-pause fleche" aria-hidden="true"></span>');
    });
    audioTrack.addEventListener("pause", function () {
        setText(playButton, '<span class="glyphicon glyphicon-play fleche" aria-hidden="true"></span>');
    });
    setText(playButton, '<span class="glyphicon glyphicon-play fleche" aria-hidden="true"></span>');

    // create previous button
    prevButton = document.getElementById("previous");

    // create next button
    nextButton = document.getElementById("next");

    // create mute button
    muteButton = document.getElementById("mute");

    // create volume slider
    volumeSlider = document.getElementById("volume");

    // create audio title
    audioTitle = document.getElementById("titreMusique");
    
    // create progression slider
    progressSlider = document.getElementById("progress");

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
        setText(muteButton, '<span class="glyphicon glyphicon-volume-down fleche" aria-hidden="true"></span>');
    } else {
        setText(muteButton, '<span class="glyphicon glyphicon-volume-off fleche" aria-hidden="true"></span>');
    }
}

function updateTrackProgress() {
    audioTrack.currentTime = progressSlider.value;
}

function seekTrackProgress() {
    progressSlider.value = audioTrack.currentTime;
}