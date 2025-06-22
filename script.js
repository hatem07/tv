// List of TV channels with their .m3u8 links
const channels = [
    { name: "Mbc3 144p", url: "https://shls-mbc3-prod-dub.shahid.net/out/v1/d5bbe570e1514d3d9a142657d33d85e6/index_8.m3u8" },
    { name: "MBC3 240p", url: "https://shls-mbc3-prod-dub.shahid.net/out/v1/d5bbe570e1514d3d9a142657d33d85e6/index_10.m3u8" },
    { name: "MBC3 360p", url: "https://shls-mbc3-prod-dub.shahid.net/out/v1/d5bbe570e1514d3d9a142657d33d85e6/index_5.m3u8" },
    { name: "Spacetoon 240p", url: "https://streams.spacetoon.com/live/stchannel/smil:livesmil.smil/chunklist_w810512056_b346000_slAR.m3u8" },
    { name: "Spacetoon 360p", url: "https://streams.spacetoon.com/live/stchannel/smil:livesmil.smil/chunklist_w810512056_b596000_slAR.m3u8" },
    { name: "Spacetoon 480p", url: "https://streams.spacetoon.com/live/stchannel/smil:livesmil.smil/chunklist_w810512056_b946000_slAR.m3u8" },
    { name: "Spacetoon auto", url: "https://streams.spacetoon.com/live/stchannel/smil:livesmil.smil/playlist.m3u8" },
    { name: "Cn AR auto", url: "https://watch.3rbcafee.com/2024/10/cnarabia.html", isWebpage: true }
];

const channelList = document.getElementById("channel-list");
const videoPlayer = document.getElementById("video-player");

// Dynamically add channels to the list
channels.forEach((channel) => {
    const li = document.createElement("li");
    li.textContent = channel.name;
    li.addEventListener("click", () => {
        if (channel.isWebpage) {
            // Open URL directly in new tab for webpages
            window.open(channel.url, '_blank');
        } else {
            playChannel(channel.url);
        }
    });
    channelList.appendChild(li);
});

// Function to play the selected channel
function playChannel(url) {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoPlayer);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoPlayer.play();
        });
    } else if (videoPlayer.canPlayType("application/vnd.apple.mpegurl")) {
        // For Safari and other browsers that support native HLS
        videoPlayer.src = url;
        videoPlayer.play();
    } else {
        alert("Your browser does not support HLS streaming.");
    }
}

// Enable fullscreen mode on mobile devices
videoPlayer.addEventListener("click", () => {
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) { // Firefox
        videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) { // Chrome, Safari, Opera
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) { // IE/Edge
        videoPlayer.msRequestFullscreen();
    }
});
