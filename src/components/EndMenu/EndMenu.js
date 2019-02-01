import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateNewReminder } from "../../redux/actions/reminder";
import PropTypes from 'prop-types';
// import { AntDesign } from '@expo/vector-icons';

import { medmindBlue } from '../../constants/styles';
import styles from './styles';

class EndMenu extends Component {
    static propTypes = {
        onPress: PropTypes.func,
        onChangeTextEndDate: PropTypes.func,
        onChangeTextCount: PropTypes.func,
    };

    render() {
        return (
            <View style={{flex:1, flexDirection: 'column'}}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={this.props.newReminder.occurence !== 'never' ? styles.radioButton : styles.radioButtonActive} 
                        onPress={() => {this.props.onPress('never')}}>
                    </TouchableOpacity>
                    <Text style={styles.text}>  Never</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={this.props.newReminder.occurence !== 'end date' ? styles.radioButton : styles.radioButtonActive} 
                        onPress={() => {this.props.onPress('end date')}}>
                    </TouchableOpacity>
                    <Text style={styles.text}>  On </Text>
                    <TextInput
                        placeholder="MM"
                        onChangeText={this.props.onChangeTextEndMonth}
                        value={this.props.newReminder.endMonth}
                        keyboardType="numeric"
                        style={styles.lightText}
                    />
                    <Text style={styles.text}> / </Text>
                    <TextInput
                        placeholder="DD"
                        onChangeText={this.props.onChangeTextEndDay}
                        value={this.props.newReminder.endDay}
                        keyboardType="numeric"
                        style={styles.lightText}
                    />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={this.props.newReminder.occurence !== 'set number' ? styles.radioButton : styles.radioButtonActive}
                    onPress={() => {this.props.onPress('set number')}}>
                </TouchableOpacity>
                <Text style={styles.text}>  After </Text>
                    <TextInput
                        placeholder= "1"
                        onChangeText={this.props.onChangeTextCount}
                        value={String(this.props.newReminder.endOccurenceCount)}
                        keyboardType="numeric"
                        style={styles.lightText}
                    /> 
                <Text style={styles.text}> occurences</Text>
            </View>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        newReminder: state.remindersReducer.newReminder,
    };
}

const mapDispatchToProps = dispatch => ({
    updateNewReminder: bindActionCreators(updateNewReminder, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EndMenu);
