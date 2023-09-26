// 是否字符串类型
export function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
}
