import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../config/styles';

const { width , height } = Dimensions.get('window');
const calRatio = (16 * (width / height));

export const screenWidth = width;
export const screenHeight = height;
export const ratio = (calRatio < 9 ? width / 9 : height / 18) / (360 / 9);
  
const styles = {
	cancelButton: {
		margin: 10,
	},
   	container: {
   		flex: 1,
   		backgroundColor: '#ffffff',
   	},
   	tips: {
		margin: 20,
		fontSize: 13,
		textAlign: 'center',
	},
	modalContainer: {
		shadowColor: '#000',
	    shadowOffset: { width: 0, height: 2 },
	    shadowOpacity: 0.8,
	    shadowRadius: 2,
	    elevation: 1,
    	flex: 1,
	    flexDirection: 'column',
    	alignItems: 'center',
	    marginTop: 22,  height: '100%', width: '100%', backgroundColor: Colors.app_primary, position: 'absolute', bottom: 0
	},
	  titleTxt: {
	    marginTop: 100,
	    color: 'white',
	    fontSize: 28
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
	    textAlignVertical: 'center',
	    fontWeight: '200',
	    fontFamily: 'Helvetica Neue',
	    letterSpacing: 3,
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
};
  
export { styles }