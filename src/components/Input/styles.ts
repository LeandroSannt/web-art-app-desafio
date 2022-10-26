import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView `
  width: 100%;
  height: 80px;
  background-color:#2980B9;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 10px;
`

export const Input = styled.TextInput`
  display: flex;
  flex: 1;
  border-radius: 4px;
  background-color: #Fff;
  padding: 10px;
  color: #6E6E6E;
`

export const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  color: #6E6E6E;
  justify-content: center;
  border-radius: 4px;
  background-color: #Fff;
  color: #6E6E6E;
  width: 60px;
  margin-left: 8px;
`

export const Add = styled.Text`
  color: #2980B9;
  font-size: 16px;
`
