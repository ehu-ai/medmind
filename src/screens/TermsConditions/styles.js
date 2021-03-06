import { StyleSheet } from 'react-native';
import { medmindBlue } from '../../constants/styles';

export default StyleSheet.create({
  heading: {
    height: 80,
    backgroundColor: medmindBlue,
    width: '100%'
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontFamily: 'System',
    color: 'rgb(160,160,160)',
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBox: {
    width: '75%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: 'rgb(72,72,72)'
  },
  text: {
    color: 'rgb(72,72,72)',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 8,
    marginBottom: 8
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  acceptButton: {
    backgroundColor: medmindBlue,
    borderRadius: 3,
    width: 100
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'System',
    padding: 8
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginLeft: '15.2%'
  }
});
