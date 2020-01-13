import axios from "axios";
import React from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

import HeaderRightButton from "../../components/HeaderRightButton";
import useInput from "../../hooks/useInput";
import theme from "../../Styles";

const View = styled.View`
  flex: 1;
  background-color: white;
`;
const InputForm = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.lightGreyColor};
`;
const Photo = styled.Image`
  width: 80px;
  height: 80px;
`;
const CaptionInput = styled.TextInput`
  flex: 1;
  height: 80px;
  margin-left: 20px;
`;
const LocationInput = styled.TextInput`
  flex: 1;
`;

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <HeaderRightButton
          text={"Upload"}
          onPress={navigation.getParam("upload")}
        />
      )
    };
  };

  state = {
    caption: "",
    location: "",
    photo: this.props.navigation.getParam("photo"),
    fileUrl: ""
  };

  componentDidMount() {
    this.props.navigation.setParams({ upload: this.upload.bind(this) });
  }

  async upload() {
    const { caption, location, photo } = this.state;
    console.log(caption, location);
    if (caption === "" || location === "") {
      Alert.alert("All fields are required");
    }

    const formData = new FormData();
    formData.append("file", {
      name: photo.filename,
      type: photo.filename.split(".")[1].toLowerCase(),
      uri: photo.uri
    });

    try {
      const {
        data: { location }
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: { "content-type": "multipart/form-data" }
      });
      this.setState({ fileUrl: location });
      console.log(location);
    } catch (error) {
      Alert.alert("Cannot upload", "Try again later");
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <InputForm>
            <Photo source={{ uri: this.state.photo.uri }} />
            <CaptionInput
              multiline
              placeholder={"Write caption..."}
              value={this.state.caption}
              onChangeText={caption => this.setState({ caption })}
            />
          </InputForm>
          <InputForm>
            <LocationInput
              placeholder={"Location..."}
              value={this.state.location}
              onChangeText={location => this.setState({ location })}
            />
          </InputForm>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
