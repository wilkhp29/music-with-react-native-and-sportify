import React from 'react';
import {Container, Title, Backgound} from './styles';
import {categorie} from '../../Service/Sportify';
import {useNavigation} from '@react-navigation/native';
type props = {
  categoria: categorie;
};

const Categorie: React.FC<props> = ({categoria}) => {
  const navigation = useNavigation();
  return (
    <Container
      onPress={() => navigation.navigate('PlayLists', {categorie: categoria})}>
      <Backgound resizeMode="cover" source={{uri: categoria.icons[0].url}}>
        <Title>{categoria.name}</Title>
      </Backgound>
    </Container>
  );
};

export default Categorie;
