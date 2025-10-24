import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const cosmicTracks = [
    { name: 'Cosmic Journey', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3' },
  ];

  const [currentTrack] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={cosmicTracks[currentTrack].url}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-24 right-8 z-50">
        {isOpen && (
          <div className="mb-4 bg-background/95 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-4 shadow-2xl animate-fade-in min-w-[280px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Music" size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">Космическая музыка</p>
                <p className="text-xs text-muted-foreground">{cosmicTracks[currentTrack].name}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="w-12 h-12 rounded-full border-2 hover:border-primary hover:bg-primary/10"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Icon name="Pause" size={20} />
                  ) : (
                    <Icon name="Play" size={20} />
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="Volume2" size={16} className="text-muted-foreground" />
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-secondary hover:scale-110"
          size="icon"
        >
          <Icon name={isOpen ? "X" : "Music"} size={24} />
        </Button>
      </div>
    </>
  );
};

export default MusicPlayer;
