Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.DEFAULT_SIGN_API_PATH = exports.DEFAULT_SIGN_HEADER = undefined;

exports.encryptFeApiToken = encryptFeApiToken;

var _md = require("../libs/md5");

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var SECRET_KEY = "WSUDD";

var DEFAULT_SIGN_HEADER = exports.DEFAULT_SIGN_HEADER = "X-Sign";

var DEFAULT_SIGN_API_PATH = exports.DEFAULT_SIGN_API_PATH = "/fe_api/";

var DEFAULT_SIGN_VERSION = "X";

function transformKey(key) {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function getQueryByParams(params, transform) {
    var paramsArray = [];
    Object.keys(params).forEach(function(key) {
        if (typeof params[key] !== "undefined") {
            var realKey = transform ? transformKey(key) : key;
            paramsArray.push(encodeURIComponent(realKey) + "=" + encodeURIComponent(params[key]));
        }
    });
    return paramsArray.join("&");
}

function encryptFeApiToken(config) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_SIGN_VERSION;
    var _config$url = config.url, url = _config$url === undefined ? "" : _config$url;
    var params = config.params, _config$transform = config.transform, transform = _config$transform === undefined ? false : _config$transform;
    url = url.slice(url.indexOf(DEFAULT_SIGN_API_PATH), url.length);
    var queryString = "";
    if (params) {
        queryString = getQueryByParams(params, transform);
    }
    queryString = queryString ? "?" + queryString : "";
    if (version === DEFAULT_SIGN_VERSION) {
        return "" + version + (0, _md2.default)(url + queryString + SECRET_KEY);
    }
    return "";
}