const OrderStatusEnum = {
    Pending: 10,
    Processing: 20,
    Complete: 30,
    Cancelled: 40
};

const ProductTypeEnum = {
    PaymentPackage: 1,
    MediaContent: 2,
    StoriiCoin: 3
}

const PaymentTypeEnum = {
    CreditCard: 1,
    Momo: 2,
    ZaloPay: 3,
    StoriiCash: 4
}

const PaymentTransactionStatusEnum = {
    Pending: 10,
    Authorized: 20,
    Paid: 30,
    PartiallyRefunded: 35,
    Refunded: 40,
    Voided: 50
}

const TransactionStatusEnum = {
    OutOfMoney: 101,
    Fail: 500,
    Success: 200,
}

export {
    PaymentTransactionStatusEnum,
    PaymentTypeEnum,
    OrderStatusEnum,
    ProductTypeEnum,
    TransactionStatusEnum
}