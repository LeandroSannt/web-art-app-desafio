import styled from 'styled-components/native'

interface heightStatus{
  heightStatus?:number
}

export const Container = styled.View<heightStatus>`
  background-color: #2980B9;
  height: 140px;
  padding: ${(props) => props.heightStatus}px 16px 0 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const H1 = styled.Text`
  font-size: 20px;
  color: #fff;
`

export const H3 = styled.Text`
  font-size: 12px;
  color: #fff;

  display: flex;
`

export const Span = styled.Text`
  font-size: 20px;
  color: #fff;

`

