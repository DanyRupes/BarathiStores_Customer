
import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect } from 'react-redux';
import { Avatar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { Footer } from 'native-base';
import cart from '../cart-helper'
import { addToCart, placeOrder, getCart, minusCart } from '../../project12/CustomerRedux/actions/cartDisplayActions';

// import {} from '../../project12/CustomerRedux/actions/cartDisplayActions';


class CartItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleAddChange = this.handleAddChange.bind(this)
    }
    state = {
        cartItems: [],
        updateItem: true,
        total_quantity: this.props.item.quantity,
    }
    componentDidMount() {
        console.log("Cart Item------------")
    }

    handleAddChange = (p) => {
        // console.log("quans",this.state.total_quantity)
        const { _id, sellingprice, productname } = p
        this.setState({ total_quantity: ++this.state.total_quantity })
        this.props.addToCart({ _id, sellingprice, productname, quantity: this.state.total_quantity });

    }

    handleMinusChange = (p) => {
        // const  {_id} = p
        this.props.minusCart(p._id);

        this.setState({ total_quantity: this.state.total_quantity - 1 })

    }


    render() {
        const p = this.props.item
        return (
            <Card key={p._id}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '3%' }}>
                    <View>
                        <Card.Content>
                            <Title>{p.productname}</Title>
                        </Card.Content>
                    </View>
                    <View>
                        <Card.Content>

                            <Card.Cover style={{ height: hp('10%'), width: wp('20%') }}
                                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8sniIrfh6AdD0wr_7qjxUGOVRZdlmcXcD6LYCCoNfDwfLIK2n' }} />



                        </Card.Content>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '3%' }}>
                    <View>
                        <Card.Content>
                            <Title> Rs. {p.sellingprice} </Title>
                        </Card.Content>
                    </View>
                    <View>
                        <Card.Content>
                            <View style={{ flexDirection: 'row', paddingLeft: wp('38%') }}>
                                <View >
                                    {p.quantity ?
                                        <Button onPress={() => this.handleMinusChange(p)}>
                                            <Icon name="ios-remove-circle" size={27} />
                                        </Button> : <Text></Text>}
                                </View>
                                <View >
                                    <Text style={{ paddingLeft: wp('3%'), paddingTop: hp('0.4%') }}> {this.state.total_quantity}</Text>
                                </View>
                                <Button onPress={() => this.handleAddChange(p)}>
                                    <Icon name="ios-add-circle" size={27} />
                                </Button>
                            </View>
                        </Card.Content>
                    </View>

                </View>

                <Divider />

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button style={{ alignSelf: 'flex-start' }}
                        title="Save For Later"
                        type="clear" />
                    <Divider />
                    <Button style={{ alignSelf: 'flex-end' }}
                        title="Remove"
                        type="clear" />
                </View>

            </Card>
        )
    }
}
const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { addToCart, minusCart })(CartItem);
