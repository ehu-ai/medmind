import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { addReminder, updateNewReminder, updateReminder, setNewReminder } from "../../redux/actions/reminder";
import { defaultReminder } from "../../constants/constants";
import { connect } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader/ScreenHeader";
import TimePicker from "../../components/TimePicker/TimePicker";
import { Ionicons } from "@expo/vector-icons";
import { medmindBlue } from "../../constants/styles";
import moment from "moment";
import styles from "./styles";

class ReminderFormScreen extends Component {
  static navigationOptions = {
    drawerLabel: "New Reminder"
  };

  static propTypes = {};

  static defaultProps = {};

  // callback for login errors
  onError = error => {
    console.log("Error", error);
  };

  state = {
    title: this.props.title || "Reminder",
  };

  openDrugListPage = () => {
    this.props.navigation.navigate("chooseDrugScreen", {
      showButton: true,
    });
  };

  openRepeatPage = () => {
   this.props.navigation.navigate("repeatScreen", {
      showButton: true,
    });
  };

  openSoundPage = () => {
    this.props.navigation.navigate("soundScreen", {
      showButton: true,
    });
  };

  getDrugName = drugId => {
    const drug = this.props.drugs.filter(function(drug) {
      return drug.id === drugId;
    });
    if (drug.length == 0) {
      return;
    }
    return drug[0].name;
  };

  updateReminder = () => {
    // const newReminder = this.props.newReminder;
    // const reminders = this.props.reminders.map(item => {
    //   return (item.id === newReminder.id ? newReminder : item);
    // });
    this.props.updateReminder(this.props.newReminder);
  }

  addReminder = () => {
    const newReminder = this.props.newReminder;
    if (typeof newReminder.time === "undefined") {
      this.props.updateNewReminder("time", moment());
    }
    // Trimming the repeat selection down to one word ('Every week' => 'week')
    if (typeof newReminder.repeat !== "undefined" && newReminder.repeat[0] === "E") {
        const newRepeat = newReminder.repeat.split(" ")[1];
        this.props.updateNewReminder("repeat", newRepeat);
    }
    this.props.addReminder();
  }

  saveReminder = () => {
    // Modifying existing reminder
    if (this.props.updateOnly) {
      this.updateReminder();
      this.props.setNewReminder(defaultReminder);
    }
    // Adding new reminder
    else {
      this.addReminder();
    }
    this.props.navigation.goBack();
  };

  render() {
    const { newReminder, updateNewReminder, addReminder, drugs } = this.props;
    const arrowButton = (
      <Ionicons name="ios-arrow-forward" style={styles.arrowButton} />
    );
    const soundText = (
      <Text style={styles.selectedSetting}>{newReminder.sound}</Text>
    );
    const repeatText = (
      <Text style={styles.selectedSetting}>{newReminder.repeat}</Text>
    );
    const drugText = (
      <Text style={styles.selectedSetting}>{this.getDrugName(newReminder.drugId)}</Text>
    );
    return (
      <View style={styles.container}>
        <TimePicker
          header="Time"
          setDate={time => updateNewReminder("time", time)}
        />
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.setting}>Drug</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openDrugListPage()}
          >
            {newReminder.drugId ? drugText : arrowButton}
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.setting}>Repeat</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openRepeatPage()}
          >
            {newReminder.repeat ? repeatText : arrowButton}
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.setting}>Dosage</Text>
          <Text style={styles.entry}>
            {newReminder.dosage ? newReminder.dosage : null}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.setting}>Sound</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.openSoundPage()}
          >
            {newReminder.sound ? soundText : arrowButton}
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.setting}>Snooze</Text>
          <Switch
            onTintColor={medmindBlue}
            style={styles.switchButton}
            onValueChange={() => updateNewReminder("snooze", newReminder.snooze)}
            value={newReminder.snooze}
          />
        </View>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => this.saveReminder()}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    reminders: state.remindersReducer.reminders,
    drugs: state.drugInfoReducer.drugInfo,
    newReminder: state.remindersReducer.newReminder,
    updateOnly: state.remindersReducer.updateOnly,
  };
}

const mapDispatchToProps = dispatch => ({
  addReminder: bindActionCreators(addReminder, dispatch),
  updateReminder: bindActionCreators(updateReminder, dispatch),
  updateNewReminder: bindActionCreators(updateNewReminder, dispatch),
  setNewReminder: bindActionCreators(setNewReminder, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReminderFormScreen);
