import {Button, Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { theme } from '../../../../themes';

import { recordError } from '@modules/firebase/crashlytics';

const AvatarPicker = ({
  employeeId = null,
  editable = false,
  size = 100,
  avatar = 'https://randomuser.me/api/portraits/men/33.jpg',
  onAvatarChange = (img: any) => {},
}) => {
  const [previewURI, setPreviewURI] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (
      typeof avatar === 'string' &&
      (avatar.startsWith('http://') || avatar.startsWith('https://'))
    ) {
      setPreviewURI(avatar);
    }
  }, [avatar]);

  const pickFile = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    } as ImageLibraryOptions;

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error(
          'ImagePicker Error: ',
          response.errorCode + ': ',
          response.errorMessage,
        );
      } else {
        const file = response.assets[0];
        setPreviewURI(file.uri);
        
        if (file) {
          try {
            const img = {
              uri: file.uri,
              type: file.type,
              name: employeeId? employeeId.toString() + '.' + file.fileName?.split('.').pop() : file.fileName,
            };
            onAvatarChange(img);
          } catch (error) {
            recordError(error as Error);
            console.error(error);
          }
        }
      }
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      {previewURI ? (
        <Image
          source={{uri: previewURI}}
          style={{width: size, height: size, borderRadius: size / 2}}
        />
      ) : (
        <Image
          source={{uri: avatar}}
          style={{width: size, height: size, borderRadius: size / 2}}
        />
      )}
      {editable && (
        <Button
          type="clear"
          icon={
            <Icon name="edit" type="font-awesome" size={20} color={theme.lightColors?.grey2} />
          }
          onPress={pickFile}
        />
      )}
    </View>
  );
};

export default AvatarPicker;
