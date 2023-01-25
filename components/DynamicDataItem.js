import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text, Body, Card, CardItem, Grid, Row } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import firestore from '@react-native-firebase/firestore';

export default class DynamicDataItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      itemTitle: this.props.item.data.Title,
      itemDescription: this.props.item.data.Description,
    }
  }

  onItemClick() {
    this.setState({
      modalVisible: true,
      itemTitle: this.props.item.data.Title,
      itemDescription: this.props.item.data.Description,
    });
    return;
  }

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

  updateDatabase() {
    firestore().collection('DynamicData')
      .doc(this.props.item.id)
      .update({
        Title: this.state.itemTitle,
        Description: this.state.itemDescription,
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{
                flexDirection: 'row',
                alignSelf:'flex-end',
                marginTop: -10,
                marginBottom: 3
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}>
                  <FontAwesome5 name={'times-circle'} size={30} color="#180D59" style={{ paddingHorizontal: 5 }} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column', flexShrink: 1 }}>
                <TextInput
                  style={{
                    color: '#180D59',
                    fontWeight: 'bold',
                    fontSize: 24,
                    marginLeft: 10,
                    flexShrink: 1,
                    alignSelf: 'center',
                  }}
                  onChangeText={(title) => this.setTitle(title)}
                  value={this.state.itemTitle}>
                </TextInput>
                <TextInput
                  style={{
                    color: '#180D5988',
                    fontSize: 20,
                    marginLeft: 10,
                    flexShrink: 1,
                  }}
                  onChangeText={(description) => this.setDescription(description)}
                  value={this.state.itemDescription}>
                </TextInput>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    // waits if on ios and then opens modal
                    setTimeout(
                      () =>
                        this.setState({
                          modalVisible: false,
                        }),
                      Platform.OS === 'ios' ? 200 : 0,
                    );
                    this.updateDatabase();
                    this.setState({ modalVisible: false });
                  }}>
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Card
          style={{
            marginTop: '1%',
            marginBottom: '1%',
            marginLeft: '4%',
            marginRight: '4%',
            borderRadius: 10,
          }}>
          <TouchableOpacity onPress={() => this.onItemClick()}>
            <CardItem
              header
              bordered
              style={{
                backgroundColor: '#8741E0',
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}>
              <Body>
                <View style={{ flexDirection: 'row', flexShrink: 1, alignSelf: 'center' }}>
                  <View>
                    <Grid>
                      <Row>
                        <Text
                          style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginLeft: 10,
                            flexShrink: 1,
                          }}>
                          {this.props.item.data.Title}
                        </Text>
                      </Row>
                    </Grid>
                  </View>
                </View>
              </Body>
            </CardItem>
            <CardItem
              style={{
                borderRadius: 10,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}>
            <Body>
                <View style={{ flexDirection: 'row', flexShrink: 1 }}>
                  <View>
                    <Grid>
                      <Row>
                        <Text
                          style={{
                            color: '#180D5988',
                            fontSize: 22,
                            marginLeft: 10,
                            flexShrink: 1,
                          }}>
                          {this.props.item.data.Description}
                        </Text>
                      </Row>
                    </Grid>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  button: {
    borderRadius: 20,
    elevation: 2,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#8741E0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  OrgParticularsLabels: {
    color: '#180D59',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    flexShrink: 1,
  },
  OrgParticulars: {
    color: '#180D5988',
    fontSize: 20,
    marginLeft: 10,
    flexShrink: 1,
  }
});