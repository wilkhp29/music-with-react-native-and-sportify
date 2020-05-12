import Style from 'styled-components/native';
import {Colors} from '../../Helps';

export const Container = Style.ImageBackground`
  flex:1;
  background:${Colors.primary};
`;
export const ContainerImg = Style.View`
  flex:1;
  align-items:center;
  justify-content:center;
`;
export const Img = Style.Image``;
export const Title = Style.Text`
  color:${Colors.textPrimary}
  margin-top:10px;
  font-size:28px;
`;
export const Form = Style.View`
  flex:1;
  align-items:center;
`;
export const Button = Style.View``;
export const TextButton = Style.Text``;
