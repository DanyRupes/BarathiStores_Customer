import React, { Component } from 'react'
import { View, Text, StyleSheet, ListView, FlatList, ActivityIndicator } from 'react-native'
import StepIndicator from 'react-native-step-indicator'
import { Divider } from 'react-native-elements'
import dummyData from './data'
import { Button, Card, Left, CardItem, Spinner } from 'native-base'
import { widthPercentageToDP } from 'react-native-responsive-screen';

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013'
}

export default class VerticalStepIndicator extends Component {
  constructor(props) {
    super(props)

    this.viewabilityConfig = { itemVisiblePercentThreshold: 40 }
  }
  state = {
          currentPage: 0, orderStatus:'',loadingStatus:true
        }

  componentDidMount() {
    //console.log(this.props.navigation.state.params.id)
    let {status} = this.props.navigation.state.params.item
    let finalStatus
    if(status){
      switch(status){
        case 'Ordered':
          finalStatus = 0
          break
        case 'Processing': //
          finalStatus = 1
          break;
        case 'OutForDelivery'://
          finalStatus = 2
          break
        case 'Delivered'://
          finalStatus = 3
          break
        }
        this.setState({orderStatus:parseInt(finalStatus), loadingStatus:false})  
        console.log( "final Status", status, finalStatus)
      }
    }
  
  render() {
    const { totalamount, status, created, payment_id } = this.props.navigation.state.params.item
    // const { productname, quantity, sellingprice, } = this.props.navigation.state.params.item
    console.log( "rendering2", this.state.orderStatus)
    return (

      <View style={{ flexDirection: 'column', height: '100%', padding: '5%' }}>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>
            8754743609
      </Text>
          <Text style={{ fontWeight: 'bold' }}>
            -
      </Text>
          <Text style={{ fontWeight: 'bold' }}> {'\u20B9'} {totalamount} </Text>
        </View>
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>
            {created}
          </Text>
          <Text style={{ fontWeight: 'bold' }}>
            /
      </Text>
          <Text style={{ fontWeight: 'bold' }}>
            Mode Of Payment - {payment_id}
          </Text>
        </View>
        <Divider />
        {
          
          this.state.loadingStatus?<ActivityIndicator size="small" />:
          <View style={styles.container}>
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={stepIndicatorStyles}
              stepCount={4}
              direction='vertical'
              currentPosition={this.state.orderStatus}
              labels={dummyData.data.map(item => item.title)}
            />
          </View>
          <FlatList
            style={{ flexGrow: 1 }}
            data={dummyData.data}
            renderItem={this.renderPage}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig} />
        </View>
        }
        <Divider />
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          <Button transparent success>
            <Text style={{ fontWeight: 'bold', color: 'green' }}>Show Details</Text>
          </Button>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: "flex-start" }}>Product1</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Quantity</Text>
          <Text style={{ fontSize: 14, fontWeight: 'bold', alignSelf: "flex-end" }}>Price</Text>
        </View>
          {
            this.props.navigation.state.params.item.orders.map((dim, index) => {
              // console.log(dim)
              return (
                <View key={index} style={{ display: "flex", backgroundColor:'#green',flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ flex: 1, alignSelf: "flex-start" }}>{dim.productname}</Text>
                  <Text style={{ flex: 1, paddingLeft: 3, textAlign: "center" }}>{dim.quantity}</Text>
                  <Text style={{ flex: 1, alignSelf: "flex-end", paddingRight: 5, textAlign: "right" }}>{dim.sellingprice}</Text>
                </View>
              )
            })
          }
      </View>

    )
  }

  renderPage = rowData => {
    const item = rowData.item
    return (
      <View style={styles.rowItem}>
        {/* <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text> */}
      </View>
    )
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    const visibleItemsCount = viewableItems.length
    if (visibleItemsCount != 0) {
      // this.setState({ orderStatus: viewableItems[visibleItemsCount - 1].index })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  stepIndicator: {
    marginVertical: 50,
    paddingHorizontal: 20
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20
  },
  title: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600'
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: '#606060',
    lineHeight: 24,
    marginRight: 8
  }
})