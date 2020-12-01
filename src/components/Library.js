import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ active, audioRef, songs, setCurrentSong, isPlaying }) => {
  return (
    <div className={`library ${active ? 'active' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            key={song.id}
            song={song}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            setActiveSong={setCurrentSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
