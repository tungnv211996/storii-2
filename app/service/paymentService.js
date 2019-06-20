import Parse from "../parse/parseServer";
import { PaymentResponseCode } from "../libs/commonEnum";
import helperUI from "../libs/helperUI";
import appConst from "../libs/appConst";

class PaymentService {

    alert(code) {
        const status = {
            [PaymentResponseCode.Fail]: async () => {
                helperUI.alertError('Thanh toán thất bại', 'Có lỗi gì đó đã xảy ra, vui lòng thử lại sau ít phút');
                return Promise.reject({
                    code,
                    message: 'Thanh toán thất bại'
                });
            },
            [PaymentResponseCode.OutOfMoney]: () => {
                helperUI.alertError('Thanh toán thất bại', `Vui lòng nạp thêm ${appConst.unit}`);
                return Promise.reject({
                    code,
                    message: 'Thanh toán thất bại'
                });
            },
            [PaymentResponseCode.Success]: () => {
                helperUI.alertSuccess('Thanh toán thành công', 'Cảm ơn bạn đã mua nội dung này');
                return Promise.resolve();
            }
        };
        return status[code]();
    }

    async payMediaContent(infoMedia) {
        const rs = await Parse.Cloud.run('payMediaContent', {
            orderItems: [
                {
                    productId: infoMedia.id,
                    quantity: 1
                }
            ],
            description: `Mua nội dung ${infoMedia.title}`
        });
        return await this.alert(rs.code);
    }
}

export default new PaymentService();