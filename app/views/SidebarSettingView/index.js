import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	ScrollView, Text, View, TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Q } from '@nozbe/watermelondb';
import isEqual from 'react-fast-compare';

import Avatar from '../../containers/Avatar';
import Status from '../../containers/Status/Status';
import log, { logEvent, events } from '../../utils/log';
import I18n from '../../i18n';
import { CustomIcon } from '../../lib/Icons';
import styles from './styles';
import SidebarItem from './SidebarItem';
import { themes } from '../../constants/colors';
import database from '../../lib/database';
import { withTheme } from '../../theme';
import { getUserSelector } from '../../selectors/login';
import Navigation from '../../lib/Navigation';
import { TouchableOpacity } from 'react-native';

const Separator = React.memo(({ theme }) => <View style={[styles.separator, { borderColor: themes[theme].separatorColor }]} />);
Separator.propTypes = {
	theme: PropTypes.string
};

const permissions = [
	'view-statistics',
	'view-room-administration',
	'view-user-administration',
	'view-privileged-setting'
];

class Sidebar extends Component {
	static propTypes = {
		baseUrl: PropTypes.string,
		navigation: PropTypes.object,
		Site_Name: PropTypes.string.isRequired,
		user: PropTypes.object,
		state: PropTypes.string,
		theme: PropTypes.string,
		loadingServer: PropTypes.bool,
		useRealName: PropTypes.bool,
		allowStatusMessage: PropTypes.bool,
		isMasterDetail: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.state = {
			showStatus: false,
			isAdmin: false
		};
	}

	componentDidMount() {
		this.setIsAdmin();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { loadingServer } = this.props;
		if (loadingServer && nextProps.loadingServer !== loadingServer) {
			this.setIsAdmin();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { showStatus, isAdmin } = this.state;
		const {
			Site_Name, user, baseUrl, state, isMasterDetail, useRealName, theme
		} = this.props;
		// Drawer navigation state
		if (state?.index !== nextProps.state?.index) {
			return true;
		}
		if (nextState.showStatus !== showStatus) {
			return true;
		}
		if (nextProps.Site_Name !== Site_Name) {
			return true;
		}
		if (nextProps.Site_Name !== Site_Name) {
			return true;
		}
		if (nextProps.baseUrl !== baseUrl) {
			return true;
		}
		if (nextProps.theme !== theme) {
			return true;
		}
		if (!isEqual(nextProps.user, user)) {
			return true;
		}
		if (nextProps.isMasterDetail !== isMasterDetail) {
			return true;
		}
		if (nextProps.useRealName !== useRealName) {
			return true;
		}
		if (nextState.isAdmin !== isAdmin) {
			return true;
		}
		return false;
	}

	async setIsAdmin() {
		const db = database.active;
		const { user } = this.props;
		const { roles } = user;
		try {
			if (roles) {
				const permissionsCollection = db.collections.get('permissions');
				const permissionsFiltered = await permissionsCollection.query(Q.where('id', Q.oneOf(permissions))).fetch();
				const isAdmin = permissionsFiltered.reduce((result, permission) => (
					result || permission.roles.some(r => roles.indexOf(r) !== -1)),
					false);
				this.setState({ isAdmin });
			}
		} catch (e) {
			log(e);
		}
	}

	sidebarNavigate = (route) => {
		logEvent(events[`SIDEBAR_GO_${route.replace('StackNavigator', '').replace('View', '').toUpperCase()}`]);
		Navigation.navigate(route);
	}

	renderCustomStatus = () => {
		const { user, theme } = this.props;
		return (
			<SidebarItem
				text={user.statusText || I18n.t('Edit_Status')}
				right={<CustomIcon name='edit' size={20} color={themes[theme].titleText} />}
				onPress={() => this.sidebarNavigate('StatusView')}
				testID='sidebar-custom-status'
			/>
		);
	}

	render() {
		const {
			user, useRealName, allowStatusMessage, theme, onPress
		} = this.props;

		if (!user) {
			return null;
		}
		return (
			<View testID='sidebar-view' style={{ backgroundColor: themes[theme].backgroundColor }}>
				<TouchableOpacity style={styles.header} theme={theme} onPress={onPress}>
					<View style={styles.wrapAvatarProfile}>
						<Avatar
							text={user.username}
							style={styles.avatar}
							size={70}
						/>
						<Status style={styles.wrapStatus} status={user && user.status} />
					</View>
					<View style={styles.headerTextContainer}>
						<View style={styles.headerUsername}>
							<Text numberOfLines={1} style={[styles.username, { color: themes[theme].titleText }]}>{useRealName ? user.name : user.username}</Text>
							<Text style={[styles.textStyle, { color: themes[theme].titleText }]}>@{user.username}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<Separator theme={theme} />

				{allowStatusMessage ? this.renderCustomStatus() : null}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	user: getUserSelector(state),
	baseUrl: state.server.server,
	loadingServer: state.server.loading,
	useRealName: state.settings.UI_Use_Real_Name,
	allowStatusMessage: state.settings.Accounts_AllowUserStatusMessageChange,
});

export default connect(mapStateToProps)(withTheme(Sidebar));
