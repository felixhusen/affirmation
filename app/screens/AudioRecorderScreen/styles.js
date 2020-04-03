import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config/styles';

const { width , height } = Dimensions.get('window');
const calRatio = (16 * (width / height));

export const screenWidth = width;
export const screenHeight = height;
export const ratio = (calRatio < 9 ? width / 9 : height / 18) / (360 / 9);
  
const styles = {
   	tips: {
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		fontSize: 13,
		marginBottom: 10,
		textAlign: 'center',
	},
	container: {
    	flex: 1,
	    flexDirection: 'column',
    	alignItems: 'center',
	    backgroundColor: Colors.app_primary
	},
	  titleTxt: {
	    marginTop: 100,
	    marginRight: 15,
	    marginLeft: 15,
	    color: 'white',
	    fontSize: 28,
	    textAlign: 'center'
	  },
	  viewRecorder: {
	    marginTop: 40,
	    width: '100%',
	    alignItems: 'center',
	  },
	  recordBtnWrapper: {
	    flexDirection: 'row',
	  },
	  viewPlayer: {
	    marginTop: 60,
	    alignSelf: 'stretch',
	    alignItems: 'center',
	  },
	  viewBarWrapper: {
	    marginTop: 28 * ratio,
	    marginHorizontal: 28 * ratio,
	    alignSelf: 'stretch',
	  },
	  viewBar: {
	    backgroundColor: '#ccc',
	    height: 4 * ratio,
	    alignSelf: 'stretch',
	  },
	  viewBarPlay: {
	    backgroundColor: 'white',
	    height: 4 * ratio,
	    width: 0,
	  },
	  playStatusTxt: {
	    marginTop: 8 * ratio,
	    color: '#ccc',
	  },
	  playBtnWrapper: {
	    flexDirection: 'row',
	    marginTop: 40 * ratio,
	    marginBottom: 40
	  },
	  btn: {
	  	margin: 0,
	  	text: {
	  		color: 'white'
	  	}
	  },
	  txt: {
	    color: 'white',
	    fontSize: 14 * ratio,
	    marginHorizontal: 8 * ratio,
	    marginVertical: 4 * ratio,
	  },
	  txtRecordCounter: {
	    marginTop: 32,
	    color: 'white',
	    fontSize: 30,
	    fontWeight: '200',
	    fontFamily: 'Helvetica Neue',
	    letterSpacing: 3,
	    textAlign: 'center'
	  },
	  txtCounter: {
	    marginTop: 12 * ratio,
	    color: 'white',
	    fontSize: 20 * ratio,
	    textAlignVertical: 'center',
	    fontWeight: '200',
	    fontFamily: 'Helvetica Neue',
	    letterSpacing: 3,
	  },
	  scrollView: {
	  	width: '100%',
	  	height: '100%',

	  }
};
  
export { styles }