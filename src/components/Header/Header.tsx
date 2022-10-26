import React from 'react';
import { StatusBar } from 'react-native';

import { Container, H1, Span } from './styles';

interface HeaderProps {
  totalProducts: number;
  checkedTotalProducts:number
}

export function Header({ checkedTotalProducts,totalProducts }: HeaderProps) {

  
  return (
    <Container heightStatus={StatusBar.currentHeight?.toFixed(0)}>
      <H1>Lista de compras</H1>
      <Span>
        {checkedTotalProducts}/{totalProducts}
      </Span>
    </Container>
  )
}

