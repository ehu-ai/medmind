import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import styles from './styles';

import { ScrollView, FlatList} from 'react-native';
import DrugIcon from '../../components/DrugIcon/DrugIcon';
import EventInDayView from '../../components/EventInDayView/EventInDayView';

// Temp schema for as needed drugs
const asNeededDrugs = [
  {
    id : 1,
    key: "1",
    name : "Lorazepam",
    dosage: "2 mg",
    color: "yellow"
  },
  {
    id: 2,
    key: "2",
    name : "Lorazepam",
    dosage: "2 mg",
    color: "yellow"
  },
  {
    id : 3,
    key: "3",
    name : "Lorazepam",
    dosage: "2 mg",
    color: "yellow"
  },
  {
    id : 4,
    key: "4",
    name : "Lorazepam",
    dosage: "2 mg",
    color: "yellow"
  },
  {
    id : 5,
    key: "5",
    name : "Lorazepam",
    dosage: "2 mg",
    color: "yellow"
  },
  {
    id : 6,
    key: "6",
    name : "Lorazepam",
    dosage: "2 mg",
    color: "yellow"
  }
]

// Temp schema for drugs by events
const drugsByEvents =[
  {
    time: "7:00 PM",
    key: "1",
    drugs :[
      {
        id : 1,
        key: "1",
        name : "Lorazepam",
        dosage: "2 mg",
        color: "yellow"
      },
      {
        id: 2,
        key: "2",
        name : "Lorazepam",
        dosage: "2 mg",
        color: "yellow"
      },
    ],
  },
  {
    time: "8:00 PM",
    key:"2",
    drugs :[
      {
        id : 1,
        key: "1",
        name : "Lorazepam",
        dosage: "2 mg",
        color: "yellow"
      },
      {
        id: 2,
        key: "2",
        name : "Lorazepam",
        dosage: "2 mg",
        color: "yellow"
      },
    ],
  },
]

export default class DayView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  static defaultProps = {};

  state = {
  };

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader {...this.props} title={this.state.title} />
          <ScrollView >
            <Text style={styles.text}>
              As Needed
            </Text>
            <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={asNeededDrugs}
                      renderItem={({item}) => <DrugIcon drug={item} /> }
            >

            </FlatList>
            <View style={styles.dayVerticalListWrapper}>
              <FlatList data={drugsByEvents} renderItem={({item}) => <EventInDayView event={item} /> } style={styles.dayVerticalList} >
              </FlatList>
            </View>
          </ScrollView>
      </View>
    );
  }
}