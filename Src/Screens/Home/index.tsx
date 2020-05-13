import React, {FC, useState, useCallback, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, View, ActivityIndicator} from 'react-native';

import {RootStackParamList} from '../../../App';
import {Container} from './styles';
import {GetCategorie, categorie} from '../../Service/Sportify';
import Categories from '../../Components/Categorie';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Home: FC<Props> = () => {
  const [categories, setCategories] = useState<Array<categorie>>([]);
  const [pagination, setPagination] = useState<string | null>(null);

  const getCategories = useCallback(async (link: string | null = null) => {
    try {
      const resposta = await GetCategorie(link);
      const {next, items} = resposta;
      setCategories((old) => [...old, ...items]);
      setPagination(next);
    } catch (error) {
      console.log('erro', error);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Categories categoria={item} />}
        numColumns={2}
        ListFooterComponent={() => renderFooter()}
        onEndReached={() => pagination && getCategories(pagination)}
        onEndReachedThreshold={0.1}
      />
    </Container>
  );
};

export default Home;
