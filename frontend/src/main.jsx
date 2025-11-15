import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Initialize global audio on app startup
const initGlobalBackgroundMusic = () => {
  const MUSIC_SRC = "/assets/AppSounds/BgMusicLingGo.mp3";

  if (!window._linggo_bg_audio) {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.2;

    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("ended", onEnded);
    window._linggo_bg_audio = {
      audio,
      onEnded,
      isPlaying: false,
      hasUserInteracted: false,
    };

    // Function to start music on first user interaction
    const startMusicOnInteraction = () => {
      if (!window._linggo_bg_audio.hasUserInteracted) {
        window._linggo_bg_audio.hasUserInteracted = true;

        const musicWasEnabled = localStorage.getItem("linggo_music_enabled");
        if (musicWasEnabled === "true" || musicWasEnabled === null) {
          localStorage.setItem("linggo_music_enabled", "true");
          audio
            .play()
            .then(() => {
              window._linggo_bg_audio.isPlaying = true;
            })
            .catch((error) => {
              console.log("Could not play audio:", error);
            });
        }

        // Remove the event listeners after first interaction
        document.removeEventListener("click", startMusicOnInteraction);
        document.removeEventListener("keydown", startMusicOnInteraction);
        document.removeEventListener("touchstart", startMusicOnInteraction);
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", startMusicOnInteraction);
    document.addEventListener("keydown", startMusicOnInteraction);
    document.addEventListener("touchstart", startMusicOnInteraction);
  }

  return window._linggo_bg_audio;
};

// Initialize audio on app load
initGlobalBackgroundMusic();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
