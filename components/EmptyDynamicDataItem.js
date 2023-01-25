import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text, Body, Card, CardItem, Grid, Row } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class EmptyDynamicDataItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={[styles.EmptyContainer]}>
        <FontAwesome5
          name="times"
          size={50}
          color="#180D59"
          textAlign="center"
        />
        <Text
          style={{
            margin: 10,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#180D59',
          }}>
          No Items
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: '#180D59',
          }}>
          Items will appear in this space after being inserted
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  EmptyContainer: {
    backgroundColor: '#ffffffaa',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    borderColor: '#180D59',
    borderWidth: 1,
    margin: 35,
    padding: 10,
  },
});