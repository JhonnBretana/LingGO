// ...existing code...
import { useEffect } from "react";

const MUSIC_SRC = "/assets/AppSounds/BgMusicLingGo.mp3";

function initGlobalAudio() {
  if (!window._linggo_bg_audio) {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 1;
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };
    audio.addEventListener("ended", onEnded);
    // store both audio and listener so we can clean up if needed
    window._linggo_bg_audio = { audio, onEnded };
  }
  return window._linggo_bg_audio.audio;
}

export default function useBackgroundMusic() {
  const playMusic = () => {
    const audio = initGlobalAudio();
    audio.play().catch(() => {});
  };

  const stopMusic = () => {
    const obj = window._linggo_bg_audio;
    if (obj && obj.audio) {
      try {
        obj.audio.pause();
        obj.audio.currentTime = 0;
      } catch (e) {}
    }
  };

  useEffect(() => {
    return () => {
      // optional: keep audio between routes. If you want to fully remove on unmount uncomment:
      // const obj = window._linggo_bg_audio;
      // if (obj) {
      //   obj.audio.pause();
      //   obj.audio.currentTime = 0;
      //   obj.audio.removeEventListener("ended", obj.onEnded);
      //   delete window._linggo_bg_audio;
      // }
    };
  }, []);

  return { playMusic, stopMusic };
}
