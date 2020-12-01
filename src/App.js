import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
//util
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  //Ref
  const audioRef = useRef(null);
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);

  const setCurrentSongHandler = async (song) => {
    currentSong.active = false;
    song.active = true;
    await setCurrentSong(song);
  };

  const timeUpdateHandler = (e) => {
    const currentTime = Math.floor(e.target.currentTime);
    const duration = Math.floor(e.target.duration);
    //Calculate Percentage
    const animationPercentage = Math.round((currentTime / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  };

  const skipTrackHandler = (isForward) => {
    let index = songs.indexOf(currentSong);
    const newIndex = mod(isForward ? ++index : --index, songs.length);
    setCurrentSongHandler(songs[newIndex]);
    if (isPlaying) audioRef.current.play();
  };

  const mod = (n, m) => {
    return ((n % m) + m) % m;
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipTrackHandler={skipTrackHandler}
      />
      <Library
        active={libraryStatus}
        audioRef={audioRef}
        isPlaying={isPlaying}
        songs={songs}
        setCurrentSong={setCurrentSongHandler}
      />
      <audio
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        onEnded={() => skipTrackHandler(true)}
      ></audio>
    </div>
  );
}

export default App;
