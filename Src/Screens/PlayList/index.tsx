import React, {useState, useCallback, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {FlatList, ActivityIndicator} from 'react-native';

import {Play, track, GetTracks} from '../../Service/Sportify';
import {RootStackParamList} from '../../../App';
import TrackItem from '../../Components/TrackItem';
import {
  Container,
  Header,
  Image,
  Musicas,
  Name,
  PlayButton,
  PlayText,
  TextContainer,
} from './styles';
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'PlayList'>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PlayList'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const PlayList: React.FC<Props> = ({route}) => {
  const {playlist} = route.params;
  const [tracks, setTracks] = useState<Array<track>>([]);

  const getTracks = useCallback(async () => {
    const {items} = await GetTracks(playlist.id);

    items && setTracks(items);
  }, [playlist]);

  useEffect(() => {
    getTracks();
  }, [getTracks]);

  return (
    <Container>
      <Header>
        <Image source={{uri: playlist.images[0].url}} />
        <TextContainer>
          <Name>{playlist.name}</Name>
          <Musicas>{playlist.description}</Musicas>
          <PlayButton onPress={() => Play(playlist.uri)}>
            <PlayText>Play</PlayText>
          </PlayButton>
        </TextContainer>
      </Header>
      <FlatList
        style={{flex: 3}}
        data={tracks}
        keyExtractor={(item) => item.uri}
        renderItem={({item}) => <TrackItem track={item.track} />}
        onEndReached={() => tracks.length === 0 && <ActivityIndicator />}
      />
    </Container>
  );
};

export default PlayList;
