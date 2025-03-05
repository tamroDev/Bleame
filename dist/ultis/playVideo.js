"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const listVideo = document.querySelectorAll(".video_inner");
    listVideo.forEach((container) => {
        const video = container.querySelector(".future_video_dom");
        const btnPlay = container.querySelector(".play-button-wrapper .play-gif");
        if (!video || !btnPlay)
            return;
        btnPlay.addEventListener("click", () => {
            video.play();
            btnPlay.style.display = "none";
        });
        video.addEventListener("click", () => {
            if (!video.paused) {
                video.pause();
                btnPlay.style.display = "block";
            }
        });
        video.addEventListener("ended", () => {
            btnPlay.style.display = "block";
        });
    });
});
