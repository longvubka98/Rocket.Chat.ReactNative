import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	disabled: {
		opacity: 0.3
	},
	containerScrollView: {
		paddingBottom: 30
	},
	avatarContainer: {
		alignItems: 'center',
		padding: 15,
		flexDirection: "row",
		marginTop: 15
	},
	textInput: {
		fontSize: 20,
		borderBottomWidth: 1,
		marginLeft: 30,
		width: "73%",
		paddingBottom: 5
	},
	wrapViewText: {
		paddingHorizontal: 15,
		paddingTop: 15,
		paddingBottom: 40
	},
	avatarButtons: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	avatarButton: {
		backgroundColor: '#e1e5e8',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 15,
		marginBottom: 15,
		borderRadius: 2
	},
	textDone: {
		fontWeight: "bold",
		marginHorizontal: 15,
		fontSize: 16,
	},
	pencilChangeAvatar: {
		position: 'absolute',
		top: 7,
		right: 3
	},
});
