import React from 'react';
import{
    View,
    StyleSheet
} from 'react-native';
import { Text, Body, Card, CardItem, Grid, Row} from 'native-base';

import firestore from '@react-native-firebase/firestore';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default class EmptyStaticDataItem extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

render(){
    return (
        <View style={[styles.EmptyContainer]}>
         <FontAwesome5Icon
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
            No items
        </Text>
        <Text>
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
  