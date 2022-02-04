import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

export const Container = styled.View`                                    
flex: 1;
background-color: ${ColorTheme.White};
`;

export const Header = styled.View`
background-color: ${ColorTheme.Blue};
padding: 13px 9px;
flex-direction: row;
justify-content: space-between;
`;

export const InfoHeader = styled.Text`
font-size: 20px;
color: ${ColorTheme.White};
`;

export const NumberItemList = styled.Text`
font-size: 20px;
color: ${ColorTheme.White};
`;

export const ContentNoItem = styled.View`
flex: 1;
`;

export const TextNoItem = styled.Text`
font-size: 14px;
color: ${ColorTheme.Gray};
margin-top: 30px;
text-align: center;
`;

export const BoxItemList = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
border: 1px solid ${ColorTheme.Gray2};
background-color: ${ColorTheme.White};
padding: 19px 12px;
margin: 10px 7px 0;
`;

export const ContenInfoList = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
`;

export const NameItemList = styled.Text`
font-size: 16px;
color: ${ColorTheme.Gray};
margin-left: 10px;
`;

export const BoxClose = styled.TouchableOpacity`
background-color: ${ColorTheme.Red};
width: 16px;
height: 16px;
border-radius: 30px;
align-items: center;
justify-content: center;
`;

export const ContentNewItem = styled.View`
background-color: ${ColorTheme.Blue};
padding: 15px 7px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const InputNewItem = styled.TextInput`
background: ${ColorTheme.White};
border: 1px solid ${ColorTheme.Gray2};
padding: 7px 10px;
font-size: 16px;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
color: ${ColorTheme.Gray};
width: 80%;
`;

export const AddNewItem = styled.TouchableOpacity`
background: ${ColorTheme.White};
border: 1px solid ${ColorTheme.Gray2};
padding: 10px 22px;
font-size: 16px;
border-radius: 5px;
align-items: center;
justify-content: center;
`;
