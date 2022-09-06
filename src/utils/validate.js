/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['ddhi', 'f123456']
  return valid_map.indexOf(str.trim()) >= 0
}/**
 * @param {string} str
 * @returns {Boolean}
 */
// 手机号
export function validPhone(str) {
  return (/^1[3456789]\d{9}$/.test(str))
}
// 固话
export function validSpecialPhone(str) {
  return (/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str))
}
// 身份证
export function validIdcard(str) {
  return (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str))
}
// 邮箱
export function validEmail(str) {
  return (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(str))
}
