import { observable } from "mobx";

export default class PaymentStore {
    @observable paymentTypeSelected = null;
}