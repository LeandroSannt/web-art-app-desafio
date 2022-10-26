import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
display: flex;
justify-content: space-between;
flex-direction: column;
height: 84%;
  
`

export const Create = styled.View`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`

export const Input = styled.TextInput`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  position: fixed;
`
export const ListProducts = styled.FlatList`
flex: 1;
width: 100%;
`

export const BlankMessage = styled.Text`
margin-top: 20px;
font-size: 14px;
color: #6E6E6E;
text-align: center;
width: 100%;
`