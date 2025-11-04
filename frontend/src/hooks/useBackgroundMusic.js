import { useEffect, useRef } from "react";

const MUSIC_SRC = "/assets/AppSounds/BgMusicLingGo.mp3";

export default function useBackgroundMusic() {
  const audioRef = useRef(null);

  const playMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_SRC);
      audioRef.current.loop = true;
      audioRef.current.volume = 1;

      // Fallback: restart music when it ends
      audioRef.current.addEventListener("ended", () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      });
    }
    audioRef.current.play().catch(() => {});
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeEventListener("ended", () => {});
      }
    };
  }, []);

  return playMusic;
}
