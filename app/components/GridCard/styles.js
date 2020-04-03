import { StyleSheet, Dimensions } from 'react-native';

const numColumns = 2;
  
const styles = StyleSheet.create({
   	backgroundTint: {
		position: 'absolute',
      	height: "100%",
      	width: "100%",
      	backgroundColor: 'black',
      	zIndex: 50,
      	opacity: 0.2,
      	borderRadius:5,
	},
	card: {
		margin: 10,
		flex: 1,
	},
	image: {
		// zIndex: 100,
		alignItems: 'center',
	    justifyContent: 'center',
	    
	    
	    // height: Dimensions.get('window').width / numColumns,
	    height: 150,
	    backgroundColor: 'white',
	    borderRadius:10,
	    // box shadow
	    
	},
	title: {
		zIndex: 80,
		position: 'absolute',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		fontSize: 24,
		marginBottom: 10,
		lineHeight: 35,
		color: 'white',
		letterSpacing: 1,
	},
});
  
export { styles }