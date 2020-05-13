import styled from 'styled-components/native';
import {Colors} from '../../Helps';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.primary};
  padding-top: 100px;
  padding-horizontal: 10px;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
`;
export const TextContainer = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 100px;
`;
export const Name = styled.Text`
  color: ${Colors.textPrimary};
  font-size: 20px;
`;
export const Musicas = styled.Text`
  color: ${Colors.textPrimary};
  margin-top: 10px;
  font-size: 16px;
`;
export const PlayButton = styled.TouchableOpacity`
  background: ${Colors.secondary};
  width: 60px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-top: 20px;
`;
export const PlayText = styled.Text`
  color: ${Colors.textPrimary};
`;
