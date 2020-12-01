import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  songInfo,
  setSongInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  skipTrackHandler,
}) => {
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const dragHandler = (e) => {
    const value = e.target.value;
    setSongInfo({ ...songInfo, currentTime: value });
    audioRef.current.currentTime = value;
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className='track'
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type='range'
            min={0}
            step={1}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div
            className='animate-track'
            style={{
              transform: `translateX(${songInfo.animationPercentage}%)`,
            }}
          ></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          icon={faAngleLeft}
          size='2x'
          onClick={() => skipTrackHandler(false)}
        />
        <FontAwesomeIcon
          className='play'
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
          size='2x'
        />
        <FontAwesomeIcon
          className='skip-forward'
          icon={faAngleRight}
          onClick={() => skipTrackHandler(true)}
          size='2x'
        />
      </div>
    </div>
  );
};

export default Player;
