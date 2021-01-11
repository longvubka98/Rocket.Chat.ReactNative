import React from 'react';
import PropTypes from 'prop-types';
import {
	Text, StyleSheet, Alert, Image
} from 'react-native';
import { connect } from 'react-redux';
import equal from 'deep-equal';
import { Base64 } from 'js-base64';

import I18n from '../i18n';
import { themes } from '../constants/colors';
import { withTheme } from '../theme';
import FormContainer, { FormContainerInner } from '../containers/FormContainer';
import random from '../utils/random';
import { Pressable } from 'react-native';

const styles = StyleSheet.create({
	button: {
		borderRadius: 12,
		borderColor: '#96999D',
		borderWidth: 2,
		height: 56,
		justifyContent: 'center',
		width: '80%',
		alignSelf: 'center'
	},
	logo: {
		alignSelf: 'center',
		marginTop: 134,
		marginBottom: 46,
		width: 271.5,
		height: 177
	},
	text: {
		fontWeight: '700',
		textAlign: 'center',
		fontSize: 18
	}
});

class LoginInternalView extends React.Component {
	static navigationOptions = ({ route, navigation }) => ({
		headerShow: false
	})

	static propTypes = {
		navigation: PropTypes.object,
		route: PropTypes.object,
		theme: PropTypes.string,
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { error } = this.props;
		if (nextProps.failure && !equal(error, nextProps.error)) {
			Alert.alert(I18n.t('Oops'), I18n.t('Login_error'));
		}
	}

	onPressCustomOAuth = (loginService) => {
		const { server } = this.props;
		const {
			clientId, scope, service
		} = loginService;
		const redirectUri = `${server}/_oauth/${service}`;
		const state = this.getOAuthState();
		const params = `?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}&scope=${scope}`;
		var returnUrl = encodeURIComponent(`/fcall/connect/authorize/callback${params}`)
		var url = `https://fid.ftech.ai/fcall/External/Challenge?provider=Google&returnUrl=${returnUrl}`
		this.openOAuth({ url });
	}

	getOAuthState = () => {
		const credentialToken = random(43);
		console.log('google state before base64 ' + JSON.stringify({ loginStyle: 'popup', credentialToken, isCordova: true }))
		return Base64.encodeURI(JSON.stringify({ loginStyle: 'popup', credentialToken, isCordova: true }));
	}

	openOAuth = ({ url, ssoToken, authType = 'oauth' }) => {
		const { navigation } = this.props;
		navigation.navigate('AuthenticationWebView', { url, authType, ssoToken });
	}

	render() {
		const { theme, services } = this.props;
		const server = Object.values(services).find(server => server.authType == 'oauth_custom')
		return (
			<FormContainer theme={theme} testID='login-view'>
				<FormContainerInner>
					<Image
						source={require('../static/images/login_logo.png')}
						style={styles.logo} />
					<Pressable
						onPress={() => this.onPressCustomOAuth(server)}
						style={styles.button}
					>
						<Text style={[styles.text, { color: themes[theme].titleText }]}>{I18n.t('Sign_in_with_ftech')}</Text>
					</Pressable>
				</FormContainerInner>
			</FormContainer>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server.server,
	services: state.login.services
});

export default connect(mapStateToProps)(withTheme(LoginInternalView));
