import React from 'react';
import {Container, Backgound, Title, number} from './styles';
import {playlist} from '../../Service/Sportify';
import {useNavigation} from '@react-navigation/native';

type Props = {
  playlist: playlist;
};

const PlayListItem: React.FC<Props> = ({playlist}) => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate('PlayList', {playlist})}>
      <Backgound source={{uri: playlist.images[0].url}} />
    </Container>
  );
};

export default PlayListItem;
