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
  font-family:'SF Pro Display'
  text-transform: uppercase;
`;
export const Form = Style.View`
  flex:1;
  align-items:center;
`;
export const Button = Style.TouchableOpacity`
  background:#1DB954;
  padding:20px;
  border-radius:30px;
  width:50%;
  align-items:center;
`;
export const TextButton = Style.Text`
  color:${Colors.textPrimary}
  font-family:'SF Pro Display'
`;
