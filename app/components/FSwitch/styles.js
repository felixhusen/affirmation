import { StyleSheet, Dimensions } from 'react-native';
import { Colors, AppStyle } from '../../config/styles';
  
const styles = {
   	toggleSelected: {
   		container: {backgroundColor: Colors.app_primary, borderRadius:0 }, 
   		text: {color: 'white', margin: 10}
   	},
   	toggle: {
   		container: {backgroundColor: 'white', borderRadius:0 }, 
   		text: {color: 'black', margin: 10}
   	},
   	container: {
   		flexDirection: 'row',
   		justifyContent: 'center',
   		margin: 10,
   		marginTop: 5,
         marginBottom: 15,
   	}
};
  
export { styles }