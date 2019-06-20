let helpers = {
    tokenCookieName: 'storii_token',
    domain: null,
    appPath: '/',
    setCookieValue(key, value, expireDate, path, domain) {
        var cookieValue = encodeURIComponent(key) + '=';

        if (value) {
            cookieValue = cookieValue + encodeURIComponent(value);
        }

        if (expireDate) {
            cookieValue = cookieValue + "; expires=" + expireDate.toUTCString();
        }

        if (path) {
            cookieValue = cookieValue + "; path=" + path;
        }

        if (domain) {
            cookieValue = cookieValue + "; domain=" + domain;
        }

        document.cookie = cookieValue;
    },
    getCookieValue(key) {
        var equalities = document.cookie.split('; ');
        for (var i = 0; i < equalities.length; i++) {
            if (!equalities[i]) {
                continue;
            }

            var splitted = equalities[i].split('=');
            if (splitted.length != 2) {
                continue;
            }

            if (decodeURIComponent(splitted[0]) === key) {
                return decodeURIComponent(splitted[1] || '');
            }
        }

        return null;
    },
    setToken(authToken, expireDate) {
        this.setCookieValue(helpers.tokenCookieName, authToken, expireDate, helpers.appPath, helpers.domain);
    },
    getToken() {
        return this.getCookieValue(helpers.tokenCookieName);
    },
    deleteCookie(key, path) {
        var cookieValue = encodeURIComponent(key) + '=';

        cookieValue = cookieValue + "; expires=" + (new Date(new Date().getTime() - 86400000)).toUTCString();

        if (path) {
            cookieValue = cookieValue + "; path=" + path;
        }

        document.cookie = cookieValue;
    },
    setToken(authToken, expireDate) {
        this.setCookieValue(helpers.tokenCookieName, authToken, expireDate, helpers.appPath, helpers.domain);
    },
    clearToken() {
        this.setToken()
        localStorage.clear();
        sessionStorage.clear();
    },
    replaceAll(str, search, replacement) {
        var fix = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(fix, 'g'), replacement);
    },
    formatString() {
        if (arguments.length < 1) {
            return null;
        }

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var placeHolder = '{' + (i - 1) + '}';
            str = this.replaceAll(str, placeHolder, arguments[i]);
        }

        return str;
    },
    toPascalCase(str) {
        if (!str || !str.length) {
            return str;
        }

        if (str.length === 1) {
            return str.charAt(0).toUpperCase();
        }

        return str.charAt(0).toUpperCase() + str.substr(1);
    },

    toCamelCase(str) {
        if (!str || !str.length) {
            return str;
        }

        if (str.length === 1) {
            return str.charAt(0).toLowerCase();
        }

        return str.charAt(0).toLowerCase() + str.substr(1);
    },

    truncateString(str, maxLength) {
        if (!str || !str.length || str.length <= maxLength) {
            return str;
        }

        return str.substr(0, maxLength);
    },
    truncateStringWithPostfix(str, maxLength, postfix) {
        postfix = postfix || '...';

        if (!str || !str.length || str.length <= maxLength) {
            return str;
        }

        if (maxLength <= postfix.length) {
            return postfix.substr(0, maxLength);
        }

        return str.substr(0, maxLength - postfix.length) + postfix;
    },
    setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    },
    getLocalStorage(key) {
        return localStorage.getItem(key);
    },
    destroyLocalStorage(key) {
        localStorage.removeItem(key);
    },
    calculatingDiscountPercent(value, percent) {
        return value - ((value * percent) / 100);
    }
};


export default helpers;