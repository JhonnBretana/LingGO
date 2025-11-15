export default function useBackgroundMusic() {
  const playMusic = () => {
    const audioObj = window._linggo_bg_audio;
    if (audioObj && audioObj.audio) {
      // Check if audio is actually playing, not just the flag
      const isActuallyPlaying = !audioObj.audio.paused && !audioObj.audio.ended;

      if (!isActuallyPlaying) {
        audioObj.audio
          .play()
          .then(() => {
            audioObj.isPlaying = true;
            localStorage.setItem("linggo_music_enabled", "true");
          })
          .catch((error) => {
            // If autoplay is prevented and user hasn't interacted yet
            if (!audioObj.hasUserInteracted) {
              console.log("Music will start on first user interaction");
            } else {
              console.log("Could not play audio:", error);
            }
          });
      }
    }
  };

  const stopMusic = () => {
    const audioObj = window._linggo_bg_audio;
    if (audioObj && audioObj.audio) {
      try {
        audioObj.audio.pause();
        audioObj.audio.currentTime = 0;
        audioObj.isPlaying = false;
        localStorage.setItem("linggo_music_enabled", "false");
      } catch (e) {
        console.log("Error stopping music:", e);
      }
    }
  };

  return { playMusic, stopMusic };
}
