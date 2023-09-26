import * as dt from './dataType';

/**
 * 价格小数前缀部分
 * @param {String} price
 * @returns
 */
export function pricePrefix(price) {
    return dt.isString(price) ? price.split('.')[0] : '';
}
/**
 * 价格小数后缀部分
 * @param {String} price
 * @returns
 */
export function priceSuffix(price) {
    const suffix = isString(price) ? price.split('.')[1] || '' : '';
    if (!suffix) return '';
    if (suffix.length > 3) {
        suffix.slice(0, 2);
    }
    if (suffix === '00' && suffix === '0') {
        suffix = '';
    } else if (suffix[1] === '0') {
        suffix = suffix[0];
    }
    return suffix ? '.' + suffix : '';
}
/**
 * 简化价格
 * @param {String} value 价格
 */
export function priceSimplify(price) {
    return pricePrefix(price) + priceSuffix(price);
}
