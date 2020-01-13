import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
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
    fileUrl: ""
  };

  componentDidMount() {
    this.props.navigation.setParams({ upload: this.upload });
  }

  upload() {}

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <InputForm>
            <Photo
              source={{ uri: this.props.navigation.getParam("photo").uri }}
            />
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
