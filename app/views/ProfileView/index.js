import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Keyboard, TextInput, Text, Pressable } from 'react-native';
import { connect } from 'react-redux';
import prompt from 'react-native-prompt-android';
import SHA256 from 'js-sha256';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';
import { isEqual, omit } from 'lodash';

import Touch from '../../utils/touch';
import KeyboardView from '../../presentation/KeyboardView';
import sharedStyles from '../Styles';
import styles from './styles';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { showErrorAlert, showConfirmationAlert } from '../../utils/info';
import { LISTENER } from '../../containers/Toast';
import EventEmitter from '../../utils/events';
import RocketChat from '../../lib/rocketchat';
import RCTextInput from '../../containers/TextInput';
import log, { logEvent, events } from '../../utils/log';
import I18n from '../../i18n';
import Button from '../../containers/Button';
import Avatar from '../../containers/Avatar';
import { setUser as setUserAction } from '../../actions/login';
import { CustomIcon } from '../../lib/Icons';
import * as List from '../../containers/List';
import StatusBar from '../../containers/StatusBar';
import { themes } from '../../constants/colors';
import { withTheme } from '../../theme';
import { getUserSelector } from '../../selectors/login';
import SafeAreaView from '../../containers/SafeAreaView';

class ProfileView extends React.Component {
	static navigationOptions = ({ route }) => {
		const options = {
			title: I18n.t('Profile')
		};
		const onPressSyncButton = route.params?.onPressSyncButton
		const status = route.params?.status || false;
		options.headerRight = () => (
			status == true && <Text style={[styles.textDone, { color: themes.light.tintColor }]} onPress={onPressSyncButton}>{I18n.t('Done')}</Text>
		);
		return options;
	}

	static propTypes = {
		baseUrl: PropTypes.string,
		user: PropTypes.object,
		Accounts_AllowEmailChange: PropTypes.bool,
		Accounts_AllowPasswordChange: PropTypes.bool,
		Accounts_AllowRealNameChange: PropTypes.bool,
		Accounts_AllowUserAvatarChange: PropTypes.bool,
		Accounts_AllowUsernameChange: PropTypes.bool,
		Accounts_CustomFields: PropTypes.string,
		setUser: PropTypes.func,
		theme: PropTypes.string
	}

	state = {
		saving: false,
		name: null,
		username: null,
		email: null,
		newPassword: null,
		currentPassword: null,
		avatarUrl: null,
		avatar: {},
		avatarSuggestions: {},
		customFields: {}
	}

	async componentDidMount() {
		this.init();

		try {
			const result = await RocketChat.getAvatarSuggestion();
			this.setState({ avatarSuggestions: result });
		} catch (e) {
			log(e);
		}
		this.props.navigation.setParams({
			onPressSyncButton: this.submit,
		});
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { user } = this.props;
		/*
		 * We need to ignore status because on Android ImagePicker
		 * changes the activity, so, the user status changes and
		 * it's resetting the avatar right after
		 * select some image from gallery.
		 */
		if (!isEqual(omit(user, ['status']), omit(nextProps.user, ['status']))) {
			this.init(nextProps.user);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!isEqual(nextState, this.state)) {
			return true;
		}
		if (!isEqual(nextProps, this.props)) {
			return true;
		}
		return false;
	}

	setAvatar = (avatar) => {
		const { Accounts_AllowUserAvatarChange } = this.props;

		if (!Accounts_AllowUserAvatarChange) {
			return;
		}

		this.setState({ avatar });
	}

	init = (user) => {
		const { user: userProps } = this.props;
		const {
			name, username, emails, customFields
		} = user || userProps;

		this.setState({
			name,
			username,
			email: emails ? emails[0].address : null,
			newPassword: null,
			currentPassword: null,
			avatarUrl: null,
			avatar: {},
			customFields: customFields || {}
		});
	}

	formIsChanged = () => {
		const {
			name, username, email, newPassword, avatar, customFields
		} = this.state;
		const { user } = this.props;
		let customFieldsChanged = false;

		const customFieldsKeys = Object.keys(customFields);
		if (customFieldsKeys.length) {
			customFieldsKeys.forEach((key) => {
				if (!user.customFields || user.customFields[key] !== customFields[key]) {
					customFieldsChanged = true;
				}
			});
		}

		return !(user.name === name
			&& user.username === username
			&& !newPassword
			&& (user.emails && user.emails[0].address === email)
			&& !avatar.data
			&& !customFieldsChanged
		);
	}

	handleError = (e, func, action) => {
		if (e.data && e.data.error.includes('[error-too-many-requests]')) {
			return showErrorAlert(e.data.error);
		}
		showErrorAlert(I18n.t('There_was_an_error_while_action', { action: I18n.t(action) }));
	}

	submit = async () => {
		Keyboard.dismiss();

		if (!this.formIsChanged()) {
			return;
		}

		this.setState({ saving: true });

		const {
			name, username, email, newPassword, currentPassword, avatar, customFields
		} = this.state;
		const { user, setUser } = this.props;
		const params = {};

		// Name
		if (user.name !== name) {
			params.name = name;
		}

		// Username
		if (user.username !== username) {
			params.username = username;
		}

		// Email
		if (user.emails && user.emails[0].address !== email) {
			params.email = email;
		}

		// newPassword
		if (newPassword) {
			params.newPassword = newPassword;
		}

		// currentPassword
		if (currentPassword) {
			params.currentPassword = SHA256(currentPassword);
		}

		const requirePassword = !!params.email || newPassword;
		if (requirePassword && !params.currentPassword) {
			this.setState({ saving: false });
			prompt(
				I18n.t('Please_enter_your_password'),
				I18n.t('For_your_security_you_must_enter_your_current_password_to_continue'),
				[
					{ text: I18n.t('Cancel'), onPress: () => { }, style: 'cancel' },
					{
						text: I18n.t('Save'),
						onPress: (p) => {
							this.setState({ currentPassword: p });
							this.submit();
						}
					}
				],
				{
					type: 'secure-text',
					cancelable: false
				}
			);
			return;
		}

		try {
			if (avatar.url) {
				try {
					logEvent(events.PROFILE_SAVE_AVATAR);
					await RocketChat.setAvatarFromService(avatar);
				} catch (e) {
					logEvent(events.PROFILE_SAVE_AVATAR_F);
					this.setState({ saving: false, currentPassword: null });
					return this.handleError(e, 'setAvatarFromService', 'changing_avatar');
				}
			}

			const result = await RocketChat.saveUserProfile(params, customFields);

			if (result.success) {
				logEvent(events.PROFILE_SAVE_CHANGES);
				if (customFields) {
					setUser({ customFields, ...params });
				} else {
					setUser({ ...params });
				}
				EventEmitter.emit(LISTENER, { message: I18n.t('Profile_saved_successfully') });
				this.init();
			}
			this.setState({ saving: false });
		} catch (e) {
			logEvent(events.PROFILE_SAVE_CHANGES_F);
			this.setState({ saving: false, currentPassword: null });
			this.handleError(e, 'saveUserProfile', 'saving_profile');
		}
	}

	resetAvatar = async () => {
		const { Accounts_AllowUserAvatarChange } = this.props;

		if (!Accounts_AllowUserAvatarChange) {
			return;
		}

		try {
			const { user } = this.props;
			await RocketChat.resetAvatar(user.id);
			EventEmitter.emit(LISTENER, { message: I18n.t('Avatar_changed_successfully') });
			this.init();
		} catch (e) {
			this.handleError(e, 'resetAvatar', 'changing_avatar');
		}
	}

	pickImage = async () => {
		const { Accounts_AllowUserAvatarChange } = this.props;

		if (!Accounts_AllowUserAvatarChange) {
			return;
		}

		const options = {
			cropping: true,
			compressImageQuality: 0.8,
			freeStyleCropEnabled: true,
			cropperAvoidEmptySpaceAroundImage: false,
			cropperChooseText: I18n.t('Choose'),
			cropperCancelText: I18n.t('Cancel'),
			includeBase64: true
		};
		try {
			logEvent(events.PROFILE_PICK_AVATAR);
			const response = await ImagePicker.openPicker(options);
			this.setAvatar({ url: response.path, data: `data:image/jpeg;base64,${response.data}`, service: 'upload' });
			this.props.navigation.setParams({ status: response !== null });
		} catch (error) {
			logEvent(events.PROFILE_PICK_AVATAR_F);
			console.warn(error);
		}
	}

	pickImageWithURL = (avatarUrl) => {
		logEvent(events.PROFILE_PICK_AVATAR_WITH_URL);
		this.setAvatar({ url: avatarUrl, data: avatarUrl, service: 'url' });
	}

	renderAvatarButton = ({
		key, child, onPress, disabled = false
	}) => {
		const { theme } = this.props;
		return (
			<Touch
				key={key}
				testID={key}
				onPress={onPress}
				style={[styles.avatarButton, { opacity: disabled ? 0.5 : 1 }, { backgroundColor: themes[theme].borderColor }]}
				enabled={!disabled}
				theme={theme}
			>
				{child}
			</Touch>
		);
	}

	renderAvatarButtons = () => {
		const { avatarUrl, avatarSuggestions } = this.state;
		const {
			user,
			theme,
			Accounts_AllowUserAvatarChange
		} = this.props;

		return (
			<View style={styles.avatarButtons}>
				{this.renderAvatarButton({
					child: <Avatar text={`@${user.username}`} size={50} />,
					onPress: () => this.resetAvatar(),
					disabled: !Accounts_AllowUserAvatarChange,
					key: 'profile-view-reset-avatar'
				})}
				{this.renderAvatarButton({
					child: <CustomIcon name='upload' size={30} color={themes[theme].bodyText} />,
					onPress: () => this.pickImage(),
					disabled: !Accounts_AllowUserAvatarChange,
					key: 'profile-view-upload-avatar'
				})}
				{this.renderAvatarButton({
					child: <CustomIcon name='link' size={30} color={themes[theme].bodyText} />,
					onPress: () => this.pickImageWithURL(avatarUrl),
					disabled: !avatarUrl,
					key: 'profile-view-avatar-url-button'
				})}
				{Object.keys(avatarSuggestions).map((service) => {
					const { url, blob, contentType } = avatarSuggestions[service];
					return this.renderAvatarButton({
						disabled: !Accounts_AllowUserAvatarChange,
						key: `profile-view-avatar-${service}`,
						child: <Avatar avatar={url} size={50} />,
						onPress: () => this.setAvatar({
							url, data: blob, service, contentType
						})
					});
				})}
			</View>
		);
	}

	logoutOtherLocations = () => {
		logEvent(events.PROFILE_LOGOUT_OTHER_LOCATIONS);
		showConfirmationAlert({
			message: I18n.t('You_will_be_logged_out_from_other_locations'),
			callToAction: I18n.t('Logout'),
			onPress: async () => {
				try {
					await RocketChat.logoutOtherLocations();
					EventEmitter.emit(LISTENER, { message: I18n.t('Logged_out_of_other_clients_successfully') });
				} catch {
					logEvent(events.PROFILE_LOGOUT_OTHER_LOCATIONS_F);
					EventEmitter.emit(LISTENER, { message: I18n.t('Logout_failed') });
				}
			}
		});
	}

	render() {
		const {
			name, username, email, newPassword, avatarUrl, customFields, avatar, saving
		} = this.state;
		const {
			user,
			theme,
			Accounts_AllowEmailChange,
			Accounts_AllowPasswordChange,
			Accounts_AllowRealNameChange,
			Accounts_AllowUserAvatarChange,
			Accounts_AllowUsernameChange,
			Accounts_CustomFields,
			navigation
		} = this.props;

		return (
			<KeyboardView
				style={{ backgroundColor: themes[theme].auxiliaryBackground }}
				contentContainerStyle={sharedStyles.container}
				keyboardVerticalOffset={128}
			>
				<StatusBar />
				<SafeAreaView testID='profile-view'>
					<ScrollView
						contentContainerStyle={styles.containerScrollView}
						testID='profile-view-list'
						{...scrollPersistTaps}
					>
						<View style={[styles.avatarContainer, { backgroundColor: themes[theme].backgroundColor }]} testID='profile-view-avatar'>
							<View>
								<Pressable onPress={this.pickImage}>
									<Avatar
										text={user.username}
										avatar={avatar?.url}
										isStatic={avatar?.url}
										size={70}
									/>
								</Pressable>
								<View style={[styles.pencilChangeAvatar, { right: 0, top: 0 }]}>
									<CustomIcon name='edit' size={20} color={themes[theme].tintColor} />
								</View>
							</View>
							<TextInput
								editable={Accounts_AllowRealNameChange}
								style={[styles.textInput, { color: themes[theme].titleText, borderColor: themes[theme].borderColor }]}
								inputRef={(e) => { this.name = e; }}
								placeholder={I18n.t('Name')}
								value={name}
								onChangeText={value => {
									navigation.setParams({ status: user.name !== value });
									this.setState({ name: value })
								}}
							/>
						</View>
						<Text style={[styles.wrapViewText, { color: themes[theme].auxiliaryText }]}>
							{I18n.t('Enter_your_name')}
						</Text>
						<List.Item
							title='Username'
							right={() => <View style={{ flexDirection: 'row' }}>
								<Text style={{ color: themes[theme].auxiliaryText, fontSize: 16 }}>{username}</Text>
								<List.Icon name='chevron-right' />
							</View>}
							onPress={() => navigation.navigate('EditProfileView', { username })}
						/>
						<List.Separator />
						<List.Item
							title='Email'
							right={() => <Text style={{ color: themes[theme].auxiliaryText, fontSize: 16 }}>{email}</Text>}
						/>
						<List.Section>
							<Button
								title={I18n.t('Logout_from_other_logged_in_locations')}
								type='secondary'
								backgroundColor={themes[theme].backgroundColor}
								color={themes[theme].dangerColor}
								onPress={this.logoutOtherLocations}
								testID='profile-view-logout-other-locations'
								theme={theme}
							/>
						</List.Section>
					</ScrollView>
				</SafeAreaView>
			</KeyboardView>
		);
	}
}

const mapStateToProps = state => ({
	user: getUserSelector(state),
	Accounts_AllowEmailChange: state.settings.Accounts_AllowEmailChange,
	Accounts_AllowPasswordChange: state.settings.Accounts_AllowPasswordChange,
	Accounts_AllowRealNameChange: state.settings.Accounts_AllowRealNameChange,
	Accounts_AllowUserAvatarChange: state.settings.Accounts_AllowUserAvatarChange,
	Accounts_AllowUsernameChange: state.settings.Accounts_AllowUsernameChange,
	Accounts_CustomFields: state.settings.Accounts_CustomFields,
	baseUrl: state.server.server
});

const mapDispatchToProps = dispatch => ({
	setUser: params => dispatch(setUserAction(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ProfileView));
