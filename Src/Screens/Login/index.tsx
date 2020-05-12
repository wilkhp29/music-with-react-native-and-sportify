import React, {FC} from 'react';
import {Login as logar, Play} from '../../Service/Sportify';
import {
  Container,
  ContainerImg,
  Img,
  Title,
  Form,
  Button,
  TextButton,
} from './styles';

const Login: FC = () => {
  async function handlerLogin() {
    try {
      const response: string = await logar(
        '84067b11c37b461685389e75d9772c68',
        'com.music:/auth',
      );

      Play('spotify:playlist:5iAvq0CKsofmdWjtKamNe0');
      if (response === 'Connected') {
        //chamar outrar tela
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
