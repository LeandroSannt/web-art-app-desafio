import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { Header } from '../../components/Header/Header';
import { InputFilter } from '../../components/Input';
import Product from '../../components/Product';
import { ProductProps } from '../../interfaces/Product';
import { BlankMessage, Container, ListProducts } from './styles';

const List:React.FC = () =>{
  const [products,setProducts] = useState<ProductProps[]>([])
  const [productId, setProductId] = useState<string[]>([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@product5')

      return jsonValue != null ? setProducts(JSON.parse(jsonValue)) : null;
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() =>{
    getData()
  },[])

  const renderItem = (props: any) => {
    return(
      <Product 
        key={props.item.id}
        setProductId={setProductId}
        setProducts={setProducts}
        productId={productId} 
        id={props.item.id} 
        name={props.item.name}
      />
    )
  }

  return(
    <>
    <Header checkedTotalProducts={productId.length} totalProducts={products.length}/>
    <Container 
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
     > 
      {!!products.length  ?  
      <>
        <ListProducts
        data={products}
        renderItem={renderItem}
        keyExtractor={(item: { id: { toString: () => any; }; }) => item?.id.toString()}
        />
      </>
      :
       <BlankMessage>Nenhum item na lista</BlankMessage>
      }
      <InputFilter setProducts ={setProducts} />
    </Container>
  </>
  )
}

export default List