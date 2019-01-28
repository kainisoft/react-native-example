import { ImagePicker, Permissions } from 'expo';
import { Button, Icon, Thumbnail, View } from 'native-base';
import * as React from 'react';
import Dialog from 'react-native-dialog';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';

export interface Props extends WrappedFieldProps {

}

export type AvatarFieldProps = {

} & BaseFieldProps;

export interface State {
  dialogVisibility: boolean;
  uri?: string;
}

enum MediaType {
  CAMERA = 'camera',
  LIBRARY = 'cameraRoll'
}

export default class AvatarField extends React.Component<Props, State> {

  readonly state: State = {
    dialogVisibility: false
  };

  protected setDialogVisibility = (dialogVisibility: boolean) => {
    this.setState({dialogVisibility});
  };

  protected showDialog = () => {
    this.setDialogVisibility(true);
  };

  protected hideDialog = () => {
    this.setDialogVisibility(false);
  };

  protected async openMedia(type: MediaType) {
    this.hideDialog();

    const { status } = await Permissions.askAsync(type);

    if (status !== 'granted') {
      return;
    }

    let result: ImagePicker.ImageResult;

    switch (type) {
      case MediaType.CAMERA:
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1
        });
        break;
      case MediaType.LIBRARY:
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        });
        break;
      default:
        return;
    }

    const { cancelled } = result;

    if (cancelled) {
      return;
    }

    const { uri } = result as ImagePicker.ImageInfo;

    this.setState({uri});
    this.props.input.onChange({
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });
  }


  protected openLibrary = async () => {
    await this.openMedia(MediaType.LIBRARY);
  };

  protected openCamera = async () => {
    await this.openMedia(MediaType.CAMERA);
  };

  protected renderSourceBtn() {
    const {meta: {submitFailed, error}} = this.props;

    return <Button
      bordered
      rounded
      icon
      style={{
        borderColor: (submitFailed && error) ? '#d9534f' : '#C2C4C5',
        borderWidth: 100,
        backgroundColor: 'transparent',
        width: 130,
        height: 130,
        flex: 1,
        borderRadius: 100,
        alignSelf: 'center'
      }}
      onPress={this.showDialog}
    >
      <Icon name={'md-camera'} style={{
        fontSize: 40
      }} />
    </Button>
  }

  protected renderAvatar(uri: string) {
    return <View>
      <Thumbnail source={{uri}} large resizeMode={'cover'} style={{width: 130, height: 130, borderRadius: 100}} />
      <Button rounded icon small transparent style={{alignSelf: 'flex-end', marginTop: -30}}>
        <Icon name='close-circle' style={{
          fontSize: 40,
          borderRadius: 100,
          marginLeft: 0,
          marginRight: 0
        }}
              onPress={this.removeAvatar}
        />
      </Button>
    </View>
  }

  protected removeAvatar = () => {
    this.setState({uri: ''});
    this.props.input.onChange('');
  };

  render(): React.ReactNode {
    const { dialogVisibility, uri } = this.state;

    return <View>
      {!!uri
        ? this.renderAvatar(uri)
        : this.renderSourceBtn()
      }

      <Dialog.Container visible={dialogVisibility}>
        <Dialog.Title>
          Открыть
        </Dialog.Title>
        <Dialog.Button label={'Отмена'} onPress={this.hideDialog} />
        <Dialog.Button label={'Камеру'} onPress={this.openCamera} />
        <Dialog.Button label={'Галерею'} onPress={this.openLibrary} />
      </Dialog.Container>
    </View>
  }
}
