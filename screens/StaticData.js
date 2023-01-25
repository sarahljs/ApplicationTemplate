import React, { Component, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Linking,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import { Body, Card, CardItem, Grid, Row, Text } from 'native-base';
import { mainStyles } from '../styles/styles';
import Spinner from 'react-native-loading-spinner-overlay';

import firestore from '@react-native-firebase/firestore';
import * as firebase from 'firebase/app';

import { NavigationContainer } from '@react-navigation/native';
import EmptyStaticDataItem from '../components/EmptyStaticDataItem';
import StaticDataItem from '../components/StaticDataItem';

class StaticData extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      StaticData: [],
      search: '',
      isLoading: false,
      isFetching: false,
    };

  }

  componentDidMount() {
    this._isMounted = true;
    this.getStaticData();
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  onError(error) {
    console.error(error);
  }

  getStaticData = () => {
    let tempStatic = [];

    console.log('Fetching Static Data');

    this.setState({ isLoading: true });

    // Get DonationDetails filtering with selected orgID
    dbRefDDDetails = firestore().collection('StaticData');

    dbRefDDDetails
      .orderBy('CreatedAt', 'desc')
      .onSnapshot(DDSnapshot => {
        if (DDSnapshot != null) {
          DDSnapshot.forEach(async (DonDoc) => {
            DDResponse = {
              ...DonDoc.data(),
              Name: DonDoc.data().Name,
              Title: DonDoc.data().Title,
              PhoneNumber: DonDoc.data().PhoneNumber,
              Email: DonDoc.data().Email,
              Age: DonDoc.data().Age,
              PostalCode: DonDoc.data().PostalCode,
            }

            if (DDResponse != null) {
              tempStatic.push({
                id: DonDoc.id,
                data: DDResponse,
                staticTime: DonDoc.data().CreatedAt
              });
            }
          });
        }
        //Sort with activityTime
        tempStatic.sort((val1, val2) => {
          return new Date(val2.staticTime) - new Date(val1.staticTime);
        });

        this.setState({ StaticData: tempStatic, isLoading: false })
      }, this.onError);
  };

  ListEmpty = () => {
    return <EmptyStaticDataItem />;
  };

  renderListStaticData = ({ item }) => {
    const { search } = this.state;

    if (search === '') {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.Title.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.Name.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.NRIC.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.PhoneNumber.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.Email.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.Age.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    if (item.data.PostalCode.toUpperCase().includes(search.toUpperCase())) {
      return (
        <StaticDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
  };
  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.TopBar}>
              <TouchableOpacity
                style={{ marginLeft: 10, alignSelf: 'center' }}
                onPress={() => this.props.navigation.navigate('Home')}>
                <Image
                  style={styles.Logo}
                  source={require('../assets/splogo.png')}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={search => this.setState({ search })}
                value={this.state.search}
                placeholder="Search"
                // autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => {
                  
                }}
              />
            </View>
          </View>
          <View style={{ backgroundColor: '#B5F9F6', flex: 1 }}>
            <NavigationContainer>
              <FlatList
                onRefresh={() => this.getStaticData()}
                refreshing={this.state.isFetching}
                data={this.state.StaticData}
                keyExtractor={item => item.id}
                renderItem={this.renderListStaticData}
                ListEmptyComponent={this.ListEmpty()}
                // Performance settings
                removeClippedSubviews={true} // Unmount components when outside of window
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                updateCellsBatchingPeriod={200} // Increase time between renders
                windowSize={2} // Reduce the window size
              />
            </NavigationContainer>
          </View>
          {this.state.isLoading &&
            <Spinner
              color={'#2196f3'}
              overlayColor={'#ffffff99'}
              visible={true}
              tintColor="#123456"
              textContent={'LOADING...'}
              textStyle={mainStyles.spinnerTextStyle} />}
        </SafeAreaView>
      </ImageBackground>
    );
  };
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#B5F9F6',
  },
  static: {
    marginHorizontal: '30%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9245F4',
  },
  TopBar: {
    alignContent: 'stretch',
    width: '100%',
    height: 70,
    backgroundColor: '#8741E0',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  Logo: {
    width: 120,
    height: 50,
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 42,
    width: '62%',
    fontSize: 24,
    marginLeft: 15,
    color: '#161F3D',
    elevation: 2,
    backgroundColor: '#FFFFFF',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    alignSelf: 'center',
  },
});


export default (StaticData);