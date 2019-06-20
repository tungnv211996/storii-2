const Parse = require('parse');
// Parse.serverURL = 'http://localhost:2337/parse';
Parse.serverURL = 'http://storii.vastbit.com:2337/parse';
Parse.initialize('storii');
Parse.masterKey = 'storiiii&1+1=10';
import appConst from '../libs/appConst';

window.fbAsyncInit = function () {
    Parse.FacebookUtils.init({
        appId: appConst.facebookAppID, // Facebook App ID
        status: true,  // check Facebook Login status
        cookie: true,  // enable cookies to allow Parse to access the session
        xfbml: true,  // initialize Facebook social plugins on the page
        version: 'v2.3' // point to the latest Facebook Graph API version
    });
};

// Load Facebook SDK
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
export default Parse;
