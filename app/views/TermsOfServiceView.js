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

class TermsServiceView extends Component {

    static navigationOptions = ({ }) => ({
        title: I18n.t('Terms_of_Service')
    })

    render() {
        const { theme } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar theme={theme} />

                <ScrollView style={{ paddingHorizontal: 24 }}>
                    <Text style={[styles.h2, { color: themes[theme].titleText }]}>Điều khoản dịch vụ</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Vui lòng đọc kỹ “Điều khoản dịch vụ” trước khi bạn tiến hành tải, cài đặt, sử dụng tất cả
                        hoặc bất kỳ phần nào của ứng dụng “FWork” (bao gồm phần mềm, các file và các tài liệu liên
                        quan) hoặc sử dụng các dịch vụ do Công ty FTECH cung cấp để kết nối đến ứng dụng. Bạn chấp
                        thuận và đồng ý bị ràng buộc bởi các quy định và điều kiện trong “Điều khoản dịch vụ” này
                        khi thực hiện các thao tác trên đây. Trường hợp bạn không đồng ý với bất kỳ điều khoản sử
                        dụng nào của chúng tôi (phiên bản này và các phiên bản cập nhật), bạn vui lòng không tải,
                        cài đặt, sử dụng ứng dụng hoặc tháo gỡ ứng dụng ra khỏi thiết bị di động của bạn.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>1. Cập nhật</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        “Điều khoản dịch vụ” này có thể được cập nhật thường xuyên bởi FTECH. Phiên bản cập nhật sẽ thay
                        thế cho các quy định và điều kiện trong thỏa thuận ban đầu. Bạn có thể truy cập vào ứng dụng
                        hoặc website để xem nội dung chi tiết của phiên bản cập nhật.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>2. Giới thiệu về ứng dụng</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        FWork là ứng dụng nhắn tin và kết nối đa phương tiện dành riêng cho người dùng di động tại Việt
                        Nam. Ứng dụng có các tính năng chính như: nhắn tin, gọi điện thoại, tạo nhóm... Ứng dụng hỗ trợ
                        tất cả các nền tảng iOS và Android.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>3. Quyền sở hữu ứng dụng</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Ứng Dụng này được phát triển và sở hữu bởi FTECH, tất cả các quyền sở hữu trí tuệ liên quan đến
                        ứng dụng (bao gồm nhưng không giới hạn mã nguồn, hình ảnh, dữ liệu, thông tin, nội dung chứa
                        đựng trong ứng dụng; các sửa đổi, bổ sung, cập nhật của ứng dụng) và các tài liệu hướng dẫn liên
                        quan (nếu có) sẽ thuộc quyền sở hữu duy nhất bởi FTECH và không cá nhân, tổ chức nào được phép
                        sao chép, tái tạo, phân phối, hoặc hình thức khác xâm phạm tới quyền của chủ sở hữu nếu không có
                        sự đồng ý và cho phép bằng văn bản của FTECH.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>4. Tài khoản</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Để sử dụng ứng dụng, bạn phải tạo một tài khoản theo yêu cầu của chúng tôi, bạn cam kết rằng
                        việc sử dụng tài khoản phải tuân thủ các quy định của FTECH, đồng thời tất cả các thông tin bạn
                        cung cấp cho chúng tôi là đúng, chính xác, đầy đủ với tại thời điểm được yêu cầu. Mọi quyền lợi
                        và nghĩa vụ của bạn sẽ căn cứ trên thông tin tài khoản bạn đã đăng ký, do đó nếu có bất kỳ thông
                        tin sai lệch nào chúng tôi sẽ không chịu trách nhiệm trong trường hợp thông tin đó làm ảnh hưởng
                        hoặc hạn chế quyền lợi của bạn.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>5. Quy định</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Bạn có quyền sử dụng ứng dụng và các dịch vụ khác mà chúng tôi cung cấp, tuy nhiên việc sử dụng
                        đó sẽ không bao gồm các hành vi sau đây nếu không có sự đồng ý bằng văn bản của FTECH:
                        {'\n'}- Sao chép, chỉnh sửa, tái tạo, tạo ra sản phẩm mới hoặc phiên bản khác trên cơ sở ứng dụng
                        này;
                        {'\n'}-Bán, chuyển giao, cấp quyền lại, tiết lộ hoặc hình thức chuyển giao khác hoặc đưa một phần hoặc
                        toàn bộ ứng dụng cho bất kỳ bên thứ ba;
                        {'\n'}- Sử dụng ứng dụng để cung cấp dịch vụ cho bất kỳ bên thứ ba (tổ chức, cá nhân);
                        {'\n'}- Di chuyển, xóa bỏ, thay đổi bất kỳ thông báo chính đáng hoặc dấu hiệu nào của ứng dụng;
                        {'\n'}- Thiết kế lại, biên dịch, tháo gỡ, chỉnh sửa, đảo lộn thiết kế của ứng dụng hoặc nội dung
                        ứng dụng;
                        {'\n'}- Thay đổi hoặc hủy bỏ trạng thái ban đầu của ứng dụng;
                        {'\n'}- Sử dụng ứng dụng để thực hiện bất kỳ hành động gây hại cho hệ thống an ninh mạng của FTECH,
                        bao gồm sử dụng dữ liệu hoặc truy cập vào máy chủ hệ thống hoặc tài khoản không được phép; truy cập
                        vào hệ thống mạng để xóa bỏ, chỉnh sửa và thêm các thông tin; phát tán các chương trình độc hại,
                        virus hoặc thực hiện bất kỳ hành động nào khác nhằm gây hại hoặc phá hủy hệ thống mạng;
                        {'\n'}- Đăng nhập và sử dụng ứng dụng bằng một phần mềm tương thích của bên thứ ba hoặc hệ thống không
                        được phát triển, cấp quyền hoặc chấp thuận bởi FTECH;
                        {'\n'}- Sử dụng, bán, cho mượn, sao chép, chỉnh sửa, kết nối tới, phiên dịch, phát hành, công bố các
                        thông tin liên quan đến ứng dụng, xây dựng mirror website để công bố các thông tin này hoặc để
                        phát triển các sản phẩm, công việc hoặc dịch vụ;
                        {'\n'}- Sử dụng ứng dụng để đăng tải, chuyển, truyền hoặc lưu trữ các thông tin vi phạm pháp luật, vi
                        phạm thuần phong mỹ tục của dân tộc;
                        {'\n'}- Sử dụng ứng dụng để sử dụng, đăng tải, chuyển, truyền hoặc lưu trữ bất kỳ nội dung vi phạm
                        quyền sở hữu trí tuệ, bí mật kinh doanh hoặc quyền pháp lý của bên thứ ba;
                        {'\n'}- Sử dụng ứng dụng hoặc các dịch vụ khác được cung cấp bởi FTECH trong bất kỳ hình thức vi phạm
                        pháp luật nào, cho bất kỳ mục đích bất hợp pháp nào;
                        {'\n'}- Các hình thức vi phạm khác.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>6. Xử lý vi phạm</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Trường hợp bạn vi phạm bất kỳ quy định nào trong “Điều khoản dịch vụ” này, FTECH có quyền ngay
                        lập tức khóa tài khoản của bạn và/hoặc xóa bỏ toàn bộ các thông tin, nội dung vi phạm, đồng thời
                        tùy thuộc vào tính chất, mức độ vi phạm bạn sẽ phải chịu trách nhiệm trước cơ quan có thẩm
                        quyền, FTECH và bên thứ ba về mọi thiệt hại gây ra bởi hoặc xuất phát từ hành vi vi phạm của
                        bạn.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>7. Quyền truy cập và thu thập thông tin</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        (a) Khi sử dụng ứng dụng, bạn thừa nhận rằng chúng tôi có quyền sử dụng những API hệ thống sau
                        để truy cập vào dữ liệu trên điện thoại của bạn:
                        (1) Đọc và ghi vào danh bạ điện thoại,
                        (2) Ghi dữ liệu của ứng dụng lên thẻ nhớ,
                        (3) Truy cập vào Internet từ thiết bị của bạn. Tất cả các truy
                        cập này đều được chúng tôi thực hiện sau khi có sự đồng ý của bạn, vì vậy bạn cam kết và thừa
                        nhận rằng, khi bạn đã cấp quyền cho chúng tôi, bạn sẽ không có bất kỳ khiếu nại nào đối với
                        FTECH về việc truy cập này.

                        {'\n'}(b) Cùng với quyền truy cập, chúng tôi sẽ thu thập các thông tin sau của bạn:
                        Thông tin cá nhân: bao gồm các thông tin bạn cung cấp cho chúng tôi để xác nhận tài khoản như
                        tên, số điện thoại, địa chỉ email;
                        Thông tin chung: như các thông tin về cấu hình điện thoại của bạn, thông tin phiên bản FWork mà
                        bạn đang sử dụng cho điện thoại của mình;
                        Danh bạ điện thoại: chúng tôi sẽ lưu trữ danh bạ điện thoại của bạn trên máy chủ nhằm hỗ trợ tốt
                        nhất cho bạn trong việc sử dụng ứng dụng và tránh trường hợp bạn bị mất dữ liệu. Chúng tôi cam
                        kết sẽ tôn trọng và không sử dụng danh bạ điện thoại của bạn vì bất kỳ mục đích nào nếu không có
                        sự đồng ý của bạn;
                        Chúng tôi không sử dụng bất kỳ biện pháp nào để theo dõi nội dung tin nhắn, trao đổi hoặc hình
                        thức khác nhằm theo dõi người dùng khi sử dụng ứng dụng này.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>8. Phí và các khoản thu</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        FTECH cam kết không thu bất cứ khoản phí nào từ người dùng cho các dịch vụ cơ bản mà hiện tại
                        chúng tôi đang cung cấp.
                    </Text>
                    <Text style={[styles.h3, { color: themes[theme].titleText }]}>9. Quảng cáo và các nội dung thương mại được phân phối bởi FTECH</Text>
                    <Text style={{ color: themes[theme].bodyText }}>
                        Khi sử dụng ứng dụng, bạn thừa nhận rằng chúng tôi có quyền sử dụng các thông tin không định
                        danh của bạn nhằm cung cấp các nội dung quảng cáo đúng đối tượng.
                        {'\n'}
                    </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
export default withTheme(TermsServiceView)
