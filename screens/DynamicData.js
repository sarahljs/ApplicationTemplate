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
  FlatList,
  Modal
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { mainStyles } from '../styles/styles';
import { Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

import DynamicDataItem from '../components/DynamicDataItem';
import EmptyDynamicDataItem from '../components/EmptyDynamicDataItem';

// Redux
import { connect } from 'react-redux';
import { fetchDynamicData } from '../redux/actions';

class DynamicData extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      search: '',
      isLoading: false,
      isFetching: false,
      modalAdd: false,
      itemTitle: '',
      itemDescription: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;

    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = () => {
    this.setState({ isLoading: true });
    this.props.fetchDynamicData().then(() => {
      this.setState({ isLoading: false });
    });
  };

  // If list is empty
  ListEmpty = () => {
    return <EmptyDynamicDataItem />;
  };

  renderListEvent = ({ item }) => {
    const { search } = this.state;

    if (search === '') {
      return (
        <DynamicDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    // Filter using the name
    if (item.data.Title.toUpperCase().includes(search.toUpperCase())) {
      return (
        <DynamicDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
    // Filter using the description
    if (item.data.Description.toUpperCase().includes(search.toUpperCase())) {
      return (
        <DynamicDataItem
          item={item}
          navigation={this.props.navigation}
        />
      );
    }
  };

  setTitle(title) {
    this.setState({
      itemTitle: title
    })
  }

  setDescription(description) {
    this.setState({
      itemDescription: description
    })
  }

  addDatabase() {
    firestore().collection('DynamicData')
      .add({
        Title: this.state.itemTitle,
        Description: this.state.itemDescription,
        CreatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.TopBar}>
            <TouchableOpacity
              style={{ marginLeft: 10, alignSelf: 'center' }}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Image
                style={styles.Logo}
                source={require('../assets/splogo.png')} />
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
          <View style={{ backgroundColor: '#B5F9F6', flex: 1 }}>
            <NavigationContainer>
              <FlatList
                onRefresh={() => this.getData()}
                refreshing={this.state.isFetching}
                data={this.props.dynamicData}
                keyExtractor={item => item.id}
                renderItem={this.renderListEvent}
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
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalAdd}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginTop: -10,
                    marginBottom: 3,
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      marginTop: -10,
                      marginBottom: 3,
                    }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ modalAdd: false });
                        }}>
                        <FontAwesome5 name={'times-circle'} size={30} color="#180D59" style={{ paddingHorizontal: 5 }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                    <TextInput
                      style={styles.textInput}
                      placeholder='Title'
                      onChangeText={(title) => this.setTitle(title)}
                      value={this.state.itemTitle} />
                    <TextInput
                      style={styles.textInput}
                      placeholder='Description'
                      onChangeText={(description) => this.setDescription(description)}
                      value={this.state.itemDescription} />
                    <Pressable
                      style={styles.buttonInsert}
                      onPress={() => {
                        // waits if on ios and then opens modal
                        setTimeout(
                          () =>
                            this.setState({
                              modalAdd: false,
                            }),
                          Platform.OS === 'ios' ? 200 : 0,
                        );
                        this.addDatabase();
                        this.setState({ modalAdd: false });
                      }}>
                      <Text style={styles.addTextStyle}>Add</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.insertButton}
              onPress={() => {
                this.setState({ modalAdd: true });
              }}>
              <FontAwesome5 name="plus" size={25} color={'#ffffff'} />
            </TouchableOpacity>
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
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#B5F9F6',
  },
  TopBar: {
    alignContent: 'stretch',
    width: '100%',
    height: 70,
    backgroundColor: '#8741E0',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  photo: {
    marginTop: 130,
    alignSelf: 'center',
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
  insertButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8741E0',
    padding: 23,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#2196f3'
  },
  Logo: {
    width: 120,
    height: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196f3',
    paddingHorizontal: '3%',
    paddingVertical: '7%',
    minWidth: '50%',
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    color: '#180D59',
    fontSize: 24,
    margin: 5,
    paddingLeft: 10,
    flexShrink: 1,
    alignSelf: 'center',
    borderWidth: 1,
    width: 200,
  },
  buttonInsert: {
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#8741E0',
  },
  addTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  dynamicData: state.main.dynamicData,
});

export default connect(mapStateToProps, { fetchDynamicData })(DynamicData);