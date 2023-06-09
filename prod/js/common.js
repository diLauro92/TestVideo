const video = document.getElementById('video')
const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
let bufferSize = document.getElementById('bufferDisplayStatus')
const config = {
    maxMaxBufferLength: 40
}
if (Hls.isSupported()) {
    const hls = new Hls(config)
    hls.loadSource(videoSrc)
    hls.attachMedia(video)
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc
}

function progressUpdate() {
    const positionBar = document.getElementById("positionBar")
    const displayStatus = document.getElementById("displayStatus")
    positionBar.style.width = video.currentTime / video.duration * 100 + "%"
    displayStatus.innerHTML =  Math.round(video.currentTime * 100) / 100 + " сек"

    bufferSize.innerHTML = video.buffered.end(0).toString()
}

function bufferProgressUpdate() {
    const bufferPositionBar = document.getElementById("bufferPositionBar")
    const bufferDisplayStatus = document.getElementById("bufferDisplayStatus")
    bufferPositionBar.style.width = video.buffered.end(0) / video.duration * 100 + "%"
    bufferDisplayStatus.innerHTML =  video.buffered.end(0).toFixed(2).toString() + " сек"
}

function play() {
    video.play();
}

function pause() {
    video.pause();
}
function speedUp() {
    video.play();
    video.playbackRate = 2;
}

function slowDown() {
    video.play();
    video.playbackRate = 0.5;
}

function normalSpeed() {
    video.play();
    video.playbackRate = 1;
}

setInterval(progressUpdate, 50)
setInterval(bufferProgressUpdate, 50)