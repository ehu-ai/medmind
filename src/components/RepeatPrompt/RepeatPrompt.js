import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Text, StyleSheet, Platform, TextInput, Picker } from 'react-native';
import { medmindBlue } from '../../constants/styles';


export default class RepeatPrompt extends Component {
    static propTypes = {
      onSelect: PropTypes.func,
      selectedValue: PropTypes.string,
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center'}}> 
                <Text>Repeats every </Text>
                <TextInput
                    placeholder="1"
                    onChangeText={(text) => this.setState({text})}
                    keyboardType="numeric"
                />
                <Picker
                    mode="dropdown"
                    selectedValue={this.props.selectedValue}
                    style={{ height: 50, width: 100 }}
                    onValueChange={this.props.onSelect}>
                    <Picker.Item label="days" value="day" />
                    <Picker.Item label="weeks" value="week" />
                    <Picker.Item label="months" value="month" />
                 </Picker>

            </View>
        )
    }
}
