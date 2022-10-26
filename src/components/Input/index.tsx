import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';

import { Keyboard } from 'react-native';
import { Add, Button, Container, Input } from './styles';

interface TodoInputProps {
  setProducts(value:any):void
}

export function InputFilter({setProducts}: TodoInputProps) {
  const [product, setProduct] = useState('');


 async function handleAddNewTask() {
    try {
      const value = await AsyncStorage.getItem('@product5')

      if(!product){
        return
      }

      if(value && value?.length > 0){
        const c = JSON.parse(value)

        const jsonValue = JSON.stringify([{id:uuid.v4(),name:product},...c])

        await AsyncStorage.setItem('@product5',jsonValue)
        setProducts(JSON.parse(jsonValue))
        setProduct('')

      }else{
        const jsonValue = JSON.stringify([{id:uuid.v4(),name:product}])
        await AsyncStorage.setItem('@product5',jsonValue)
      }

      Keyboard.dismiss()
      
    } catch (e) {
      // saving error
    }
  }

  return (
    <Container>
      <Input 
        placeholder="Novo item da lista"
        placeholderTextColor="#B2B2B2"
        returnKeyType="send"
        selectionColor="#666666"
        value={product}
        onChangeText={setProduct}
        onSubmitEditing={handleAddNewTask}
      />
      <Button
        testID="add-new-task-button"
        activeOpacity={0.7}
        onPress={handleAddNewTask}
      >
        <Add>
          +
        </Add>
      </Button>
    </Container>
  )
}

