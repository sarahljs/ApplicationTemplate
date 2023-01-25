import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Linking,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { mainStyles } from '../styles/styles';
import { Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {

    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onClickDatabase() {
    Linking.openURL("https://console.firebase.google.com/u/1/project/testproject-eb717/firestore/data/~2FDynamicData~2FKLaNhpWFlKVZHBakFJvV");
  }

  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover">
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <View>
            <Image
              style={styles.photo}
              source={require('../assets/splogo.png')} />
            <View>
              <Text style={styles.catch}>
                Catchphrase
              </Text>
            </View>
            <View style={mainStyles.button}>
              <Button
                title="DATABASE"
                style={{ backgroundColor: '#180D59' }}
                color="#8741E0"
                onPress={() => this.onClickDatabase()}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#B5F9F6',
  },
  catch: {
    alignSelf: 'center',
    fontSize: 30,
    marginTop: '16%',
    marginBottom: '10%',
    color: '#000000',
  },
  button: {
    margin: '4%',
    marginHorizontal: '20%',
  },
  photo: {
    marginTop: 130,
    alignSelf: 'center',
  }
});

export default (Homepage);