import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const DrugIcon = ({ color, scale = 1 }) => {
  let styles = createStyles(color, scale);
  return (
    <View style={styles.pillIconContainer}>
      <View style={styles.pillColorSide} />
      <View style={styles.pillGraySide} />
    </View>
  );
};

const createStyles = (drugColor, scale) => {
  return StyleSheet.create({
    pillIconContainer: {
      transform: [{ rotate: '-70deg' }],
      flexDirection: 'row',
      margin: 'auto',
      shadowColor: '#000',
      shadowOffset: { width: -2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2
    },
    pillGraySide: {
      height: 12.0 * scale,
      width: 15.6 * scale,
      borderTopRightRadius: 7.0 * scale,
      borderBottomRightRadius: 7.0 * scale,
      backgroundColor: '#FFFFFF'
    },
    pillColorSide: {
      height: 12.0 * scale,
      width: 15.6 * scale,
      borderTopLeftRadius: 7.0 * scale,
      borderBottomLeftRadius: 7.0 * scale,
      backgroundColor: drugColor
    }
  });
};

export default DrugIcon;
