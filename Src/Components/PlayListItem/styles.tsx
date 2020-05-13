import styled from 'styled-components/native';
import {Colors} from '../../Helps';

export const Container = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  height: 170px;
  padding: 10px;
`;
export const Backgound = styled.ImageBackground`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
export const Title = styled.Text`
  color: ${Colors.textPrimary};
  margin-bottom: 20px;
  font-size: 18px;
`;

export const number = styled.Text`
  color: ${Colors.textPrimary};
  margin-bottom: 20px;
  font-size: 14px;
`;
