import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {playlist, GetPlayList} from '../../Service/Sportify';
import PlayListItem from '../../Components/PlayListItem';
import {Container} from './styles';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'PlayLists'>;
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PlayLists'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

const PlayLists: React.FC<Props> = ({navigation, route}) => {
  const [playlists, setPlaylists] = useState<Array<playlist>>([]);
  const [pagination, setPagination] = useState<string | null>(null);
  const {categorie} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({title: categorie.name});
  }, [navigation, categorie]);

  const getPlayList = useCallback(async (id: string) => {
    const {items, next} = await GetPlayList(id);
    console.log(items);
    setPlaylists((old) => [...old, ...items]);
    setPagination(next);
  }, []);

  useEffect(() => {
    getPlayList(categorie.id);
  }, [getPlayList, categorie]);

  const renderFooter = () => {
    if (!pagination) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  };

  return (
    <Container>
      <FlatList
        horizontal={false}
        style={{flex: 1, width: '100%'}}
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <PlayListItem playlist={item} />}
        numColumns={2}
        ListFooterComponent={() => renderFooter()}
        onEndReached={() => pagination && getPlayList(pagination)}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
};

export default PlayLists;
