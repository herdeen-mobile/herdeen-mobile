import { ModalProps } from '@/types/modal-type'
import { Modal, StyleSheet } from 'react-native'

const CustomModal = ({visible, transparent, animationType, children}: ModalProps) => {
  return (
    <Modal 
        visible={visible} 
        transparent={transparent}
        animationType={animationType}
        style={{flex: 1, backgroundColor: 'white'}}
    >   
        {children}
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({})