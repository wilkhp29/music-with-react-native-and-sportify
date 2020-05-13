import React, {FC} from 'react';
import {Login as logar} from '../../Service/Sportify';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';
import {
  Container,
  ContainerImg,
  Img,
  Title,
  Form,
  Button,
  TextButton,
} from './styles';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Login: FC<Props> = ({navigation}) => {
  async function handlerLogin() {
    try {
      const response: string = await logar('keu public', 'redirect');

      if (response === 'Connected') {
        navigation.replace('Home');
      }
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <Container source={require('../../Assets/Img/BackgroundLogin.png')}>
      <ContainerImg>
        <Img source={require('../../Assets/Img/Logo.png')} />
        <Title>Music</Title>
      </ContainerImg>
      <Form>
        <Button onPress={() => handlerLogin()}>
          <TextButton>Login com spotify</TextButton>
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
