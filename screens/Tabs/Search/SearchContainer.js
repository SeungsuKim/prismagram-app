import React from "react";

import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: "",
      shouldFetch: false
    };

    const { navigation } = props;
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
      />
    )
  });

  onChange = text => {
    const { navigation } = this.props;
    navigation.setParams({ term: text });

    this.setState({ text, shouldFetch: false });
  };

  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };

  render() {
    const { term, shouldFetch } = this.state;

    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}
