import { StyleSheet } from 'react-native';

import sharedStyles from '../Styles';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemCurrent: {
		backgroundColor: '#E1E5E8'
	},
	itemHorizontal: {
		marginHorizontal: 10,
		width: 30,
		alignItems: 'center'
	},
	itemCenter: {
		flex: 1,
		marginLeft: 12
	},
	itemText: {
		marginTop: 12,
		marginBottom:16,
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	separator: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		marginVertical: 4
	},
	header: {
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerTextContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start'
	},
	headerUsername: {
		justifyContent: "space-evenly",
		marginLeft: 15
	},
	username: {
		fontSize: 22,
		fontWeight: "400",
	},
	textStyle: {
		fontSize: 14,
	},
	avatar: {
		marginHorizontal: 10
	},
	status: {
		marginRight: 5
	},
	currentServerText: {
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	version: {
		marginHorizontal: 10,
		marginBottom: 10,
		fontSize: 13,
		...sharedStyles.textSemibold
	},
	inverted: {
		transform: [{ scaleY: -1 }]
	},
	wrapAvatarProfile: {
		height: 70,
		width: 70,
		borderRadius: 35,
		backgroundColor: "silver",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 12
	},
	wrapStatus: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderWidth: 3,
		borderColor: '#fff'
	}
});
