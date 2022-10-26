import React, { createContext, useCallback, useContext } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Popup, Root } from 'react-native-popup-confirm-toast';


export interface ToastMessage{
  type:'success' | 'error' | 'info';
  description?:string;
  title:string;

}

interface ToastProps{
  confirmation():void
  name:string
}

interface ToastContextData{
  addToast(confirm:ToastProps):void;
  removeToast(id:string):void;
}

interface Props{
  children:JSX.Element[]
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider = ({children}:Props) =>{
  const window = useWindowDimensions();
  let heightTotalWindow = window.height + 100
  
 
  const addToast = ({confirmation,name}:ToastProps) =>{
    Popup.show({
      type: 'confirm',
      title: 'Excluir item',
      textBody: `Tem certeza que deseja excluir o item - ${name}`,
      buttonText: 'Confirmar',
      confirmText: 'Cancelar',
      containerStyle:{ position: 'absolute',height:heightTotalWindow, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', top: 0,bottom:0, left: 0,},
      okButtonStyle: {backgroundColor: '#3FAF47'},
      callback: (() =>{
        confirmation()
        Popup.hide();
      })
      },
    )
  }

  const removeToast = useCallback((id:string) => {
  }, [])

  return(
    <ToastContext.Provider value ={{addToast,removeToast}}>
      {children}
      <Root>
        <View>
            <TouchableOpacity onPress={() =>{addToast}}>
            </TouchableOpacity>
        </View>
    </Root>

    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)

  if(!context){
    throw new Error('useToast must be used ToastProvider')
  }

  return context
}

export { ToastProvider, useToast };

