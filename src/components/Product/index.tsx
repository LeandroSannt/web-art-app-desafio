import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { ProductProps as PropsProducts } from '../../interfaces/Product';

import { Audio } from 'expo-av';
import { useToast } from '../../hooks/useToast';
import { Container, ContainerIcons, InputEdit, Name } from './styles';

const recortar = require('../../../assets/tracks/recortar.mp3')
const deleteItem = require('../../../assets/tracks/delete.mp3')

interface ProductProps{
  name:string
  id:string
  setProductId(value:string[]):void
  setProducts(value:PropsProducts[]):void
  productId:string[]
}



const Product:React.FC<ProductProps> = ({name,id,setProductId,productId,setProducts}) =>{
  const [checked, setChecked] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [productName, setProductName] = useState('');
  const [sound, setSound] = useState<any>();
  const {addToast} = useToast()

  async function handleSound(file:any) {
    const { sound } = await Audio.Sound.createAsync(file);
    setSound(sound);

    await sound.playAsync();
  }
  
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleProduct = () =>{
    setChecked(!checked);
    let updatedList = [...productId];

    if(!checked){
      updatedList = [...productId, id];
      handleSound(recortar)
    }else{
      updatedList.splice(productId.indexOf(id), 1);
    }
    setProductId(updatedList);
  }

  const confirmDelete = async (id:string) =>{
    const products = await AsyncStorage.getItem('@product5')

    if(products){
      const jsonProducts = JSON.parse(products)

      const findedProducts = jsonProducts.filter((product:any) =>{
        return product.id !== id
      })
      handleSound(deleteItem)
      const jsonValue = JSON.stringify(findedProducts)
      await AsyncStorage.setItem('@product5',jsonValue)

      setProducts(findedProducts)
    }

    const filteredProduct = productId.filter((product) =>{return product !== id})
    setProductId(filteredProduct)
  }

  const handleDelete = async (id:string) =>{
    addToast({
      name:name,
      confirmation:() =>{confirmDelete(id)}
    })

  }

  const handleEdit =async () =>{
    setHasEdit(false)

    if(!productName) return

    const products = await AsyncStorage.getItem('@product5')
    if(products){
      const jsonProducts = JSON.parse(products)
      const index = jsonProducts.findIndex((product:any) =>{return product.id === id})
      jsonProducts[index].name = productName

      const jsonValue = JSON.stringify(jsonProducts)
      await AsyncStorage.setItem('@product5',jsonValue)

      setProducts(jsonProducts)
    }
  }

  return(
    <Container checked={checked}>
      <Checkbox
        color='#3FAF47'
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleProduct}
      />

      {hasEdit ? 
      <>
        <InputEdit onSubmitEditing={handleEdit} onChangeText={setProductName} defaultValue={name}/>
        <ContainerIcons hasEditable = {hasEdit}>
          <Icon onPress={handleEdit} name="check" size={24} color="#3FAF47" />
        </ContainerIcons>
      </>
        :
      <>
        <Name checked={checked}>{name}</Name>
        <ContainerIcons>
          <Icon onPress={() =>{setHasEdit(true)}}  style={{marginLeft:'auto'}} name="edit" size={24} color="#3FAF47" />
          <Icon onPress={() =>{handleDelete(id)}}  style={{marginLeft:'auto'}} name="closecircle" size={24} color="#FF8888" />
        </ContainerIcons>
      </>
      }
     
      </Container>
  )
}
export default Product