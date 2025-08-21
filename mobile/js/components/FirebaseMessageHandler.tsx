import React, {useEffect, useState} from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import {makeStyles} from '@rneui/themed';
import { messaging, onMessage } from '../modules/firebase/messaging';

const useStyles = makeStyles(theme => ({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
}));

export default function FirebaseMessageHandler(): React.JSX.Element {
  const styles = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onMessage(async remoteMessage => {
      console.log("Remote message: ", remoteMessage);
      
      setMessage(remoteMessage);
      setIsModalVisible(true);
    });

    return unsubscribe;
  }, []);

  const handleDismiss = () => {
    setIsModalVisible(false);
    setMessage(null);
  };

  return (
    <Modal animationType={'fade'} visible={isModalVisible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{message ? message.notification.title : 'No message title'}</Text>
          <Text style={styles.messageText}>
            {message ? message.notification.body : 'No message content'}
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleDismiss}>
            <Text style={styles.modalButtonText}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
