import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDrugName } from '../../redux/actions/drug';
import { Camera, Permissions } from 'expo';
// import { getFDA } from '../../utilities/FDA';
import { Ionicons } from '@expo/vector-icons';
import drugData from '../../assets/Products.json';

const GOOGLE_API_KEY = 'AIzaSyDlnentevJhpv1-abNDgnx3JZGu-CFZzlo';
const GOOGLE_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`;

class CameraScreen extends React.Component {
  static navigationOptions =({navigation})=> ({
    headerTitle: 'Camera',
    headerTitleStyle: {
      color: 'white',
      fontWeight: '500',
      fontFamily: 'System',
      fontSize: 24,
      flex: 1,
      textAlign: 'center',
      marginLeft: '20.5%',
    },
    headerLeft: null,
    headerRight:<TouchableOpacity 
      onPress={() => navigation.dangerouslyGetParent().navigate('addDrugScreen')}
      style={styles.back}
    >
      <View>
        <Text style={styles.text}>
                      Skip
        </Text>
      </View>
    </TouchableOpacity>
  });
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.drugSet = new Set(drugData);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async takePicture() {
    if (!this.camera) {
      return;
    }
    const photo = await this.camera.takePictureAsync({
      quality: 0,
      base64: true
    });
    // // Google OCR request
    const body = JSON.stringify({
      requests: [
        {
          image: {
            content: photo.base64
          },
          features: [{ type: 'TEXT_DETECTION' }]
        }
      ]
    });
    try {
      const res = await fetch(GOOGLE_API_URL, { method: 'POST', body });
      const json = await res.json();
      const responses = json.responses;
      for (let rI = 0; rI < responses.length; rI++) {
        let response = responses[rI];
        const textAnnotations = response.textAnnotations;
        if (textAnnotations == undefined) {
          break;
        }
        for (let i = 0; i < textAnnotations.length; i++) {
          const txt = textAnnotations[i];
          const desc = txt.description.toUpperCase();
          if (this.drugSet.has(desc)) {
            Alert.alert('Found a drug name', desc);
            // const fdaDrug = await getFDA(desc);
            // if (fdaDrug.error) {
            //   throw new Error(fdaDrug.error.message);
            // }
            // const results = fdaDrug.results;
            // if (results.length == 0) {
            //   throw new Error('no FDA results');
            // }
            // const firstDrug = results[0];
            const {navigate} = this.props.navigation;
            this.props.addDrugName(desc);
            navigate('addDrugScreen');
            return;
          }
        }
      }
    } catch (err) {
      // TODO
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.flex}>
          <Camera
            style={styles.flex}
            type={this.state.type}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <TouchableOpacity
                style={styles.cameraCircle}
                onPress={this.takePicture}
              >
                <View style={styles.cameraIcon}>
                  <Ionicons name="ios-camera" size={50} />
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addDrugName }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(CameraScreen);

const styles = StyleSheet.create({
  flex: { flex: 1 },
  cameraCircle: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  cameraIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10
  },
  buttonStyle: {
    borderWidth: 2,
    borderColor: 'gray',
    alignSelf: 'center',
    width: 50,
    height: 37,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  back: {
    marginRight: 10,
  }
});

