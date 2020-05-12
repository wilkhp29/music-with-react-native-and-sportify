import React, {FC} from 'react';
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
  return (
    <Container source={require('../../Assets/Img/BackgroundLogin.png')}>
      <ContainerImg>
        <Img source={require('../../Assets/Img/Logo.png')} />
        <Title>Music</Title>
      </ContainerImg>
      <Form>
        <Button>
          <TextButton>Login com spotify</TextButton>
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
