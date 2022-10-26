import styled, { css } from 'styled-components/native'

interface checked{
  checked:boolean
}

export const Container = styled.View<checked>`
width: 100%;
border-radius: 4px;
background-color:${(props) => props.checked ? 'rgba(63, 175, 71,0.1)' :"#Fff" }   ;
display: flex;
align-items: center;
transition: all 400ms;
flex-direction: row;
margin: 5px  ;
border: solid 1px rgba(110, 110, 110,0.2);
min-height: 80px;
padding:5px 20px;
flex-direction: row;

`


export const Name = styled.Text<checked>`
font-size: 14px;
text-align:left;
color:#6E6E6E ;

${(props) => props.checked && 
  css`
    color:#3faf47 ;
    text-decoration: line-through;
  `
}

`

interface ContainerIconsProps{
  hasEditable:boolean
}

export const ContainerIcons = styled.View<ContainerIconsProps>`
  width: 80px;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
 
`

export const InputEdit = styled.TextInput`
  flex: 1;
  border-radius: 4px;
  background-color: #Fff;
  padding: 8px;
  color: #6E6E6E;
  border: solid 1px rgba(110, 110, 110,0.4);
`

