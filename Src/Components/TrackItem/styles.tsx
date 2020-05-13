import styled from 'styled-components/native';
import {Colors} from '../..//Helps';

type props = {
  isPlay: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 60px;
`;
export const ContainerImg = styled.TouchableOpacity<props>`
  background: ${({isPlay}) => (isPlay ? Colors.secondary : Colors.textPrimary)};
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  margin-right: 10px;
`;
export const Img = styled.Image`
  width: 13px;
  height: 13px;
`;

export const Name = styled.Text`
  color: ${Colors.textPrimary};
  flex-wrap: wrap;
  flex: 1;
  align-content: center;
  text-align: center;
`;
export const Time = styled.Text`
  color: ${Colors.textPrimary};
  margin-left: 10px;
`;
