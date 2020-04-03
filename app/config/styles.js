import { StyleSheet } from 'react-native'
  
const AppStyle = StyleSheet.create({
   	title: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		fontSize: 24,
		marginBottom: 10,
		lineHeight: 35,
		letterSpacing: 1,
	},
	title2: {
		marginTop: 10,
		marginLeft: 10,
		marginRight: 20,
		fontSize: 18,
		marginBottom: 10,
		lineHeight: 35,
		letterSpacing: 1,
	},
    drawerTitle: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 18,
        letterSpacing: 1,
        color: 'white',
        zIndex: 100,
    },
    drawerSubtitle: {
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        fontSize: 13,
        letterSpacing: 1,
        color: 'white',
        zIndex: 100,
    },
    backgroundTint: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        backgroundColor: 'black',
        zIndex: 50,
        opacity: 0.3,
        borderRadius:5,
    }
});

const Colors = {
	app_primary: '#bf360c',
	app_primary_dark: '#ba000d',
	app_primary_light: '#f9683a',
	app_tint: '#fff',
};
  
export { AppStyle, Colors }