import { pricePrefix, priceSuffix, priceSimplify } from './libs/function/price';
const install = (Vue) => {
    Vue.filter('pricePrefix', (price) => pricePrefix(price));
    Vue.filter('priceSuffix', (price) => priceSuffix(price));
    Vue.filter('priceSimplify', (price) => priceSimplify(price));
};

export default {
    install
};
