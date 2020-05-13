import React, {useEffect, useState, useRef} from 'react';
import {
  Listernes,
  Play,
  Resume,
  track,
  state,
  Pause,
} from '../../Service/Sportify';
import {Container, ContainerImg, Img, Name, Time} from './styles';
import {View} from 'react-native';

type Props = {
  track: track;
};

// min = Math.floor((ms/1000/60) << 0),
// sec = Math.floor((ms/1000) % 60);
//(currentState?.playback_position / track.duration_ms) * 100 progresso

const TrackItem: React.FC<Props> = ({track}) => {
  const [currentState, setCurrentState] = useState<state>();
  const [currencePlayback, setCurrencePlayback] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const ItemRef = useRef<View>();

  useEffect(() => {
    const listner = Listernes.addListener('States', (event) =>
      setCurrentState(JSON.parse(event.Track)),
    );

    return () => {
      listner.remove();
    };
  }, []);

  useEffect(() => {
    if (track.name === currentState?.track.name) {
      setCurrencePlayback(currentState?.playback_position);
      setIsPlay(!currentState.is_paused);
    } else {
      setIsPlay(false);
    }
  }, [currentState, track]);

  useEffect(() => {
    //  console.log(currentState);
  }, [currentState]);

  return (
    <Container ref={ItemRef}>
      <ContainerImg
        isPlay={isPlay}
        onPress={() =>
          currentState?.track.name !== track.name
            ? Play(track.uri)
            : isPlay
            ? Pause()
            : Resume
        }>
        <Img
          source={
            isPlay
              ? require('../../Assets/Img/Pause.png')
              : require('../../Assets/Img/Play.png')
          }
        />
      </ContainerImg>
      <Name>
        {track.name} - {track.artists[0].name}
      </Name>
      <Time>
        {Math.floor((track.duration_ms / 1000 / 60) << 0)}:
        {Math.floor((track.duration_ms / 1000) % 60)}
      </Time>
    </Container>
  );
};

export default TrackItem;
