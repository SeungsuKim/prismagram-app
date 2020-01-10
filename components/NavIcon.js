import { Foundation, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";

import styles from "../Styles";

export const SimpleLineIcon = ({
  name,
  color = styles.blackColor,
  size = 23
}) => <SimpleLineIcons name={name} color={color} size={size} />;

SimpleLineIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export const FoundationIcon = ({
  name,
  color = styles.blackColor,
  size = 23
}) => <Foundation name={name} color={color} size={size} />;

FoundationIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export const IonIcon = ({ name, color = styles.blackColor, size = 23 }) => (
  <Ionicons name={name} color={color} size={size} />
);

IonIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};
