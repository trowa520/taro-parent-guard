/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST
export const hostM = HOST_M
/* eslint-enable */

// pic
export const CDN = 'https://yanxuan.nosdn.127.net'

// user
export const API_USER = `${host}/api/user`
export const API_USER_LOGIN = `${host}/api/user/login`
export const API_USER_SOCIALITE_LOGIN = `${host}/api/user/social-login`
export const API_USER_REGISTER = `${host}/api/user/register`
export const API_MA_CODE_TO_SESSION=`${hostM}/wx/ma/code2Session`
export const API_MP_CODE_TO_SESSION=`${hostM}/wx/mp/code2Session`
export const API_SMS_CODE = `${host}/api/user/getotp` // 获取短信验证码

// kid
export const API_MY_KIDS = `${host}/api/user/kids`
export const API_CURRENT_TRACE = `${host}/api/trace/show`
export const API_KID_APPS = `${host}/api/app/list` // app




