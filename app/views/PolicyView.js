import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native'
import { withTheme } from '../theme';
import StatusBar from '../containers/StatusBar';
import I18n from '../i18n';
import { themes } from '../constants/colors';

const styles = StyleSheet.create({
    h3: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 6
    },
    h2: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8
    }
})

class PolicyView extends Component {

    static navigationOptions = ({ }) => ({
        title: I18n.t('Privacy_Policy')
    })

    render() {
        const { theme } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar theme={theme} />

                <ScrollView style={{ paddingHorizontal: 24 }}>
                    <Text style={[styles.h2, { color: themes[theme].titleText }]}>Chính sách bảo mật</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Vui lòng đọc kỹ “Chính sách bảo mật” trước khi bạn tiến hành tải, cài đặt, sử dụng tất cả hoặc
                        bất kỳ phần nào của ứng dụng “FWork” (bao gồm phần mềm, các file và các tài liệu liên quan) hoặc
                        sử dụng các dịch vụ do Công ty FTECH cung cấp để kết nối đến ứng dụng. Bạn chấp thuận và đồng ý
                        bị ràng buộc bởi các quy định và điều kiện trong “Chính sách bảo mật” này khi thực hiện các thao
                        tác trên đây. Trường hợp bạn không đồng ý, bạn vui lòng không tải, cài đặt, sử dụng ứng dụng
                        hoặc tháo gỡ ứng dụng ra khỏi thiết bị di động của bạn.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>1. Thu thập thông tin</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Chúng tôi sẽ thu thập các thông tin sau của bạn:
                        {'\n'}- Thông tin cá nhân: bao gồm các thông tin bạn cung cấp cho chúng tôi để xác nhận tài khoản như
                        tên, số điện thoại, địa chỉ email;
                        {'\n'}- Thông tin chung: như các thông tin về cấu hình điện thoại của bạn, thông tin phiên bản FWork
                        mà
                        bạn đang sử dụng cho điện thoại của mình;
                        {'\n'}- Danh bạ điện thoại: chúng tôi sẽ lưu trữ danh bạ điện thoại của bạn trên máy chủ nhằm hỗ trợ
                        tốt
                        nhất cho bạn trong việc sử dụng ứng dụng và tránh trường hợp bạn bị mất dữ liệu. Chúng tôi cam
                        kết sẽ tôn trọng và không sử dụng danh bạ điện thoại của bạn vì bất kỳ mục đích nào nếu không có
                        sự đồng ý của bạn;
                        {'\n'}- Chúng tôi không sử dụng bất kỳ biện pháp nào để theo dõi nội dung tin nhắn, trao đổi hoặc hình
                        thức khác nhằm theo dõi người dùng khi sử dụng ứng dụng này.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>2. Quảng cáo và các nội dung thương mại được phân phối bởi FTECH</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Khi sử dụng ứng dụng, bạn thừa nhận rằng chúng tôi có quyền sử dụng các thông tin không định
                        danh của bạn nhằm cung cấp các nội dung quảng cáo đúng đối tượng.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>3. Sửa đổi và xóa thông tin tài khoản</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Bạn có thể sửa đổi, cập nhật thông tin tài khoản của bạn bất cứ lúc nào. Cho dù, bạn tự xoá các
                        thông tin đó đi nhưng chúng tôi có thể phục hồi những thông tin đó từ cơ sở dữ liệu của chúng
                        tôi để giải quyết các tranh chấp, thi hành bản thoả thuận người sử dụng, hay vì các yêu cầu kỹ
                        thuật, pháp lý liên quan đến sự an toàn và những hoạt động của chúng tôi.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>4. Cam kết bảo mật thông tin</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        FTECH sử dụng các phương thức truyền tin an toàn https và mã hóa để truyền tải và lưu trữ các dữ
                        liệu cá nhân và giao tiếp của bạn. Chúng tôi cam kết giữ bí mật tất cả thông tin mà bạn cung cấp
                        cho FTECH hoặc chúng tôi thu thập từ bạn và không tiết lộ với bất kỳ bên thứ ba nào trừ khi có
                        yêu cầu từ Cơ quan Nhà nước có thẩm quyền.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default withTheme(PolicyView)
