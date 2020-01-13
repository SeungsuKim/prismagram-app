import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import React from "react";

import HeaderRightButton from "../../../components/HeaderRightButton";
import SelectPhotoPresenter from "./SelectPhotoPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      hasPermission: false,
      selectedPhoto: {},
      allPhotos: []
    };
  }

  async componentDidMount() {
    await this.askPermission();

    this.props.navigation.setParams({ navigate: this.navigate });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <HeaderRightButton
          text={"Next"}
          onPress={navigation.getParam("navigate")}
        />
      )
    };
  };

  askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        this.setState({ hasPermission: true });
        await this.getPhotos();
      }
    } catch (error) {
      console.log(error);
      this.setState({ hasPermission: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      this.setState({
        selectedPhoto: firstPhoto,
        allPhotos: assets
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeSelected = photo => {
    const { navigation } = this.props;
    navigation.setParams({ photo });

    this.setState({ selectedPhoto: photo });
  };

  navigate = () => {
    const { navigation } = this.props;

    navigation.navigate("UploadPhoto", { photo: this.state.selectedPhoto });
  };

  render() {
    const { loading, selectedPhoto, allPhotos } = this.state;

    return (
      <SelectPhotoPresenter
        loading={loading}
        selectedPhoto={selectedPhoto}
        allPhotos={allPhotos}
        changeSelected={this.changeSelected}
      />
    );
  }
}
