import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";

import styles from "../Styles";

export const SimpleLineIcon = ({
  name,
  color = styles.blackColor,
  size = 23,
  focused = true
}) => (
  <SimpleLineIcons
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />
);

SimpleLineIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};

export const FeatherIcon = ({
  name,
  color = styles.blackColor,
  size = 23,
  focused = true
}) => (
  <Feather
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />
);

FeatherIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};

export const IonIcon = ({
  name,
  color = styles.blackColor,
  size = 23,
  focused = true
}) => (
  <Ionicons
    name={name}
    color={focused ? color : styles.darkGreyColor}
    size={size}
  />
);

IonIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};
