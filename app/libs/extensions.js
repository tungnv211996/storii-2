import classNames from 'classnames';
import {
    login_register_lock,
    style_min,
    style_custom,
    chat_app_page
} from '../assets/assets';
import moment from 'moment';

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
Date.prototype.getDayName = function () {
    return days[this.getDay()];
};

String.prototype.guid = function () {
    let d = new Date().getTime()
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now() //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    });
};

String.prototype.isNullOrEmpty = function () {
    return (this === '' || this.length === 0) || this === null;
};

Number.prototype.toVNDCurrency = function () {
    return this.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

Number.prototype.toVND = Number.prototype.toVNFormatNumber = function () {
    return this.toLocaleString('it-IT');
}


String.prototype.toDateTimeString = function (pattern) {
    return moment(this).format(pattern || AppConsts.defaultFormatDateTime);
}

String.prototype.replaceDotWithEmpty = function () {
    return this.replace(/\./g, '');
}

Date.prototype.ToMoment = function () {
    return moment(this);
}



function mapCss(...args) {
    if (args.length === 1) {
        return _map(args.pop());
    }

    let classes = [];
    for (let i = 0; i < args.length; i++) {
        classes.push(_map(args[i]));
    }
    return classes.join(' ');
}

function _map(cssName) {
    const cssNameMap = (cssName || '');
    const css = classNames(
        login_register_lock[cssNameMap],
        style_min[cssNameMap],
        style_custom[cssNameMap],
        chat_app_page[cssNameMap]
    );
    return Boolean(css) ? css : cssNameMap;
}

function changeAlias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
    str = str.replace(/ + /g, "");
    str = str.replace(/ /g, "-");
    str = str.trim();
    return str;
}
export {
    mapCss,
    changeAlias
}
