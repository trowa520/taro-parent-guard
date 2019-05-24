/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
export const host = HOST

// pic
export const CDN = 'https://yanxuan.nosdn.127.net'

// user
export const API_USER_LOGIN = `${host}/user/login`                        // 登录
export const API_USER_SOCIALITE_LOGIN = `${host}/user/social-login`       // 第三方登录
export const API_USER_REGISTER = `${host}/user/register`                  // 注册
export const API_MA_CODE_TO_SESSION=`${host}/wx/ma/code2Session`          // 小程序 code -> openId
export const API_MP_CODE_TO_SESSION=`${host}/wx/mp/code2Session`          // 公众号 code -> openId
export const API_SMS_CODE = `${host}/user/getotp`                         // 获取短信验证码
export const API_USER_INFO = `${host}/user/info`                          // 用户信息
export const API_MANAGERS = `${host}/user/managers`                       // 管理员列表
export const API_ADD_MANAGER = `${host}/user/add-manager`                 // 添加管理员

// kid
export const API_MY_KIDS = `${host}/kid/list`                            // 所有孩子
export const API_CURRENT_TRACE = `${host}/trace/show`                     // 孩子位置
export const API_TRACES = `${host}/trace/list`                            // 孩子位置轨迹

export const API_KID_SHARE_CODE = `${host}/kid/get-share-code`            // 分享码
export const API_UPDATE_KID = `${host}/kid/update`                        // 更新孩子信息
export const API_UNBIND = `${host}/kid/unbind`                            // 解除绑定

// app
export const API_KID_APPS = `${host}/app/list`                            // 应用列表
export const API_UPDATE_APP = `${host}/app/update`                        // 更新应用

// profile
export const API_WX_MA_UNIFIED_ORDER = `${host}/wx/ma-pay/unifiedOrder`   // 统一下单
export const API_WX_MP_UNIFIED_ORDER = `${host}/wx/mp-pay/unifiedOrder`   // 统一下单
export const API_WX_MA_CREATE_ORDER = `${host}/wx/ma-pay/createOrder`     // 创建订单
export const API_WX_MP_CREATE_ORDER = `${host}/wx/mp-pay/createOrder`     // 创建订单

// command
export const API_ADD_COMMAND = `${host}/command/add`                      // 创建命令

// schedule
export const API_GET_SCHEDULE = `${host}/schedule/show`                    // 获取任务
export const API_GET_APP_SCHEDULE = `${host}/schedule/show`                // 获取任务
export const API_GET_SCREEN_SCHEDULE = `${host}/schedule/show`             // 获取任务
export const API_ADD_SCHEDULE = `${host}/schedule/add`                     // 创建任务
export const API_UPDATE_SCHEDULE = `${host}/schedule/update`               // 编辑任务

export const API_GET_PRODUCTS = `${host}/product/list`                     // 获取产品


