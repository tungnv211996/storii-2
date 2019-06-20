const mediaContentType = {
    Video: 1,
    Music: 2,
    AlbumMusic: 3
};

const PaymentTypeEnum = {
    CreditCard: 1,
    Momo: 2,
    ZaloPay: 3,
    Coin: 4
};

const PaymentResponseCode = {
    OutOfMoney: 101,
    Fail: 500,
    Success: 200,
};

const ProductTypeEnum = {
    PaymentPackage: 1,
    MediaContent: 2,
    StoriiCoin: 3
}

export {
    mediaContentType,
    PaymentTypeEnum,
    ProductTypeEnum,
    PaymentResponseCode
}