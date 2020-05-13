import React from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

// import { Container } from './styles';
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Track: React.FC = () => {
  return <View />;
};

export default Track;
