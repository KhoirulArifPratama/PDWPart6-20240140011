function gantiVideo(el) {
    const mainVideo = document.getElementById("mainVideo");

    // 1. Clone main video jadi versi kecil
    const newSmall = mainVideo.cloneNode(true);
    newSmall.removeAttribute("id");
    newSmall.className = "playlist-video"; // Paksa class jadi bentuk kotak kecil
    newSmall.setAttribute("onclick", "gantiVideo(this)");
    newSmall.muted = true; // Pastikan video kecil selalu mute

    // 2. Ambil video kotak yang diklik
    const clickedVideo = el;

    // 3. Clone video kecil jadi video utama
    const newMain = clickedVideo.cloneNode(true);
    newMain.setAttribute("id", "mainVideo");
    newMain.className = "main-video"; // Paksa class jadi ukuran utama
    newMain.removeAttribute("onclick"); // Hapus fungsi klik di video utama

    // Video utama harus jalan
    newMain.muted = true;
    newMain.autoplay = true;
    newMain.loop = true;

    // 4. Ganti elemen di HTML (DOM)
    mainVideo.parentNode.replaceChild(newMain, mainVideo);
    clickedVideo.parentNode.replaceChild(newSmall, clickedVideo);

    // 5. Reload dan play video utama yang baru
    newMain.load();
    newMain.play();
}

function peringatan1() {
    alert("Klik video untuk mengganti video utama!");
}

function peringatan2() {
    alert("One Piece Song Opening 1 - We Are! Lagu ini membawa kita kembali ke awal petualangan Luffy dan kru Topi Jerami. Dengan lirik yang penuh semangat dan melodi yang catchy, lagu ini selalu berhasil membangkitkan semangat untuk menjelajahi dunia Grand Line!");
}

function peringatan3() {
    alert("Berita terbaru dari dunia One Piece! Trio Generasi Terburuk luffy law dan kid beraliansi melawan Kaido di Wano. Pertarungan epik ini menunjukkan tekad dan kekuatan luar biasa dari ketiga bajak laut muda ini, yang siap menghadapi tantangan terbesar mereka untuk melindungi teman-teman mereka dan meraih kebebasan sejati di lautan.");
}

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const progress = document.getElementById("progress");
    const currentTime = document.getElementById("currentTime");
    const duration = document.getElementById("duration");

    // ▶️ PLAY / PAUSE
    playBtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = "⏸";
        } else {
            audio.pause();
            playBtn.textContent = "▶";
        }
    };

    // ⏱ UPDATE PROGRESS
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.value = percent;
            currentTime.textContent = formatTime(audio.currentTime);
        }
    });

    // ⏳ SET DURATION
    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
    });

    // 🎚 SEEK
    progress.addEventListener("input", () => {
        if (audio.duration) {
            audio.currentTime = (progress.value / 100) * audio.duration;
        }
    });

    // 🔄 RESET SAAT SELESAI
    audio.addEventListener("ended", () => {
        playBtn.textContent = "▶";
        progress.value = 0;
        currentTime.textContent = "0:00";
    });

    // FORMAT TIME
    function formatTime(time) {
        let min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);
        return min + ":" + (sec < 10 ? "0" + sec : sec);
    }
});