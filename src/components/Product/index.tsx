import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import { useToast } from '../../hooks/useToast';
import { Container, ContainerIcons, InputEdit, Name } from './styles';

interface ProductProps{
  name:string
  id:string
  setProductId(value:string[]):void
  setProducts(value:string[]):void
  productId:string[]
}

const tracks = [
  {
    id:1,
    url:'https://youtu.be/NhHr8oVSetQ',
    title:"teste",
  }
]



const Product:React.FC<ProductProps> = ({name,id,setProductId,productId,setProducts}) =>{
  const [checked, setChecked] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [productName, setProductName] = useState('');
  const {addToast} = useToast()

  // const setUpTrackPlayer = async () =>{
  //   try{
  //     await TrackPlayer.setupPlayer()
  //     await TrackPlayer.add(tracks)
  //   }catch(err){
  //     console.log(err)
  //   }

  // }

  // useEffect(() =>{
  //   setUpTrackPlayer()
  // },[])

  const handleProduct = () =>{
    setChecked(!checked);

    let updatedList = [...productId];

    if(!checked){
      updatedList = [...productId, id];
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
      {/* <TouchableOpacity onPress={() =>{TrackPlayer.play()}}>
      <Text>PLAY</Text>
      </TouchableOpacity> */}
      <Checkbox
        color='#3FAF47'
        status={checked ? 'checked' : 'unchecked'}
        onPress={handleProduct}
      />

      {hasEdit ? 
      <>
        <InputEdit onSubmitEditing={handleEdit} onChangeText={setProductName} defaultValue={name}/>
        <ContainerIcons hasEditable = {hasEdit}>
          <Icon onPress={handleEdit} name="check" size={24} color="green" />
        </ContainerIcons>
      </>
        :
      <>
        <Name checked={checked}>{name}</Name>
        <ContainerIcons>
          <Icon onPress={() =>{setHasEdit(true)}}  style={{marginLeft:'auto'}} name="edit" size={24} color="green" />
          <Icon onPress={() =>{handleDelete(id)}}  style={{marginLeft:'auto'}} name="closecircle" size={24} color="#FF8888" />
        </ContainerIcons>
      </>
      }
     
      </Container>
  )
}
export default Product