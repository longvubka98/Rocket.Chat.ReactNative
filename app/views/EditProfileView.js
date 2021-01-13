import React, { Component } from 'react'
import { Text, View, SafeAreaView, TextInput } from 'react-native'
import I18n from '../i18n';
import StatusBar from '../containers/StatusBar';
import Styles from './Styles'
import { LISTENER } from '../containers/Toast';
import EventEmitter from '../utils/events';
import RocketChat from '../lib/rocketchat';
import { connect } from 'react-redux';
import { showErrorAlert } from '../utils/info';
import { withTheme } from '../theme';
import { themes } from '../constants/colors';

export class EditProfileView extends Component {
    static navigationOptions = ({ route }) => {
        const options = {
            title: I18n.t('Profile')
        };
        const onPressSyncButton = route.params?.onPressSyncButton
        const status = route.params?.status || false;
        options.headerRight = () => (
            status && <Text onPress={onPressSyncButton} style={[Styles.textHeader, { color: themes.light.tintColor }]}>{I18n.t('Done')}</Text>
        );
        return options
    }

    async componentDidMount() {
        this.props.navigation.setParams({ onPressSyncButton: this.submit });
    }
    state = {
        username: this.props.route.params?.username,
    }

    handleError = (e, func, action) => {
        if (e.data && e.data.errorType === 'error-too-many-requests') {
            return showErrorAlert(e.data.error);
        }
        showErrorAlert(
            I18n.t('There_was_an_error_while_action', { action: I18n.t(action) }),
            '',
            () => this.setState({ showPasswordAlert: false })
        );
    }

    submit = async () => {
        // Keyboard.dismiss();
        // if (!this.formIsChanged()) {
        //     return;
        // }

        const { username } = this.state;
        const { user, setUser } = this.props;
        const params = {};

        // Username
        if (user.username !== username) {
            params.username = username;
        }

        try {
            const result = await RocketChat.saveUserProfile(params, {});
            if (result.success == true) {
                console.log("lol");
                // setUser({ params });
                EventEmitter.emit(LISTENER, { message: I18n.t('Profile_saved_successfully') });
                // this.init();
            }
        } catch (e) {
            this.handleError(e, 'saveUserProfile', 'saving_profile');
        }
    }

    render() {
        const { username } = this.state;
        const { theme, navigation, user } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themes[theme].auxiliaryBackground }} >
                <StatusBar />
                <View style={[Styles.wrapViewTextInput, { backgroundColor: themes[theme].backgroundColor, }]}>
                    <Text style={{ fontSize: 16, color: themes[theme].titleText }}>{I18n.t('Username')}</Text>
                    <TextInput
                        value={username}
                        style={{ marginLeft: 15, fontSize: 16, width: "70%", color: themes[theme].titleText }}
                        onChangeText={value => {
                            navigation.setParams({ status: user.username !== value });
                            this.setState({ username: value });
                        }}
                    ></TextInput>
                </View>
                <Text style={Styles.textNotice}>{I18n.t('Notice_1')}</Text>
                <Text style={Styles.textNotice}>{I18n.t('Notice_2')}</Text>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => ({
    user: {
        id: state.login.user && state.login.user.id,
        name: state.login.user && state.login.user.name,
        username: state.login.user && state.login.user.username,
        customFields: state.login.user && state.login.user.customFields,
        emails: state.login.user && state.login.user.emails,
        token: state.login.user && state.login.user.token
    },
    Accounts_CustomFields: state.settings.Accounts_CustomFields,
    baseUrl: state.settings.Site_Url || state.server ? state.server.server : ''
});

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(EditProfileView));
