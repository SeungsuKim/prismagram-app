import React from "react";
import styled from "styled-components";

import SearchBar from "../../components/SearchBar";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Text = styled.Text``;

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar
        value={this.state.term}
        onchage={() => null}
        onSubmit={() => null}
      />
    )
  });

  state = {
    term: ""
  };

  onChage = text => {
    this.setState({ text });
  };

  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }
}
