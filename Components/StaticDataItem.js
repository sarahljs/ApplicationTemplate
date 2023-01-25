import React from 'react';
import {
    ScrollView,
    View
} from 'react-native';
import { Text, Body, Card, CardItem, Grid, Row } from 'native-base';
import firestore from '@react-native-firebase/firestore';

export default class StaticDataItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            // @Sarah, please improve the UI here, below is just an example to show the raw data
            <ScrollView
                style={{
                    backgroundColor: '#B5F9F6'
                }}>
                <Card
                    style={{
                        marginTop: '1%',
                        marginBottom: '1%',
                        marginLeft: '4%',
                        marginRight: '4%',
                        borderRadius: 10,
                    }}>
                    <CardItem
                        header
                        bordered
                        style={{
                            backgroundColor: '#8741E0',
                            borderRadius: 10,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                        }}>
                        <Grid>
                            <Row>
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        fontWeight: 'bold',
                                        fontSize: 22,
                                        marginLeft: 10,
                                    }}>
                                    {this.props.item.data.Title}
                                </Text>
                            </Row>
                        </Grid>
                    </CardItem>
                    <CardItem
                        style={{
                            borderRadius: 10,
                        }}>
                        <Body>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <Grid>
                                        <Row>
                                            <Text
                                                style={{
                                                    color: '#180D5988',
                                                    fontSize: 22,
                                                    marginLeft: 10,
                                                }}>
                                                Name: {this.props.item.data.Name}
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Text
                                                style={{
                                                    color: '#180D5988',
                                                    fontSize: 22,
                                                    marginLeft: 10,
                                                }}>
                                                NRIC: {this.props.item.data.NRIC}
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Text
                                                style={{
                                                    color: '#180D5988',
                                                    fontSize: 22,
                                                    marginLeft: 10,
                                                }}>
                                                Phone Number: {this.props.item.data.PhoneNumber}
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Text
                                                style={{
                                                    color: '#180D5988',
                                                    fontSize: 22,
                                                    marginLeft: 10,
                                                }}>
                                                Email Address: {this.props.item.data.Email}
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Text
                                                style={{
                                                    color: '#180D5988',
                                                    fontSize: 22,
                                                    marginLeft: 10,
                                                }}>
                                                Age: {this.props.item.data.Age}
                                            </Text>
                                        </Row>
                                        <Row>
                                            <Text
                                                style={{
                                                    color: '#180D5988',
                                                    fontSize: 22,
                                                    marginLeft: 10,
                                                }}>
                                                Postal Code: {this.props.item.data.PostalCode}
                                            </Text>
                                        </Row>
                                    </Grid>
                                </View>
                            </View>
                        </Body>
                    </CardItem>
                </Card>

            </ScrollView>
        );
    }
}