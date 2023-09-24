<template>
    <view class="ht-highlight-text" :style="[toTextStyle]">
        <text>{{ toText[0] }}</text>
        <text :style="[toKeyWordStyle]">{{ keyWord }}</text>
        <text>{{ toText[1] }}</text>
    </view>
</template>

<script>
/**
 * highlight-text 高亮文本
 * @property {String} text 文本
 * @property {String} keyWord 高亮词
 * @property {Object} textStyle 高亮词样式
 * @property {Object} keyWordStyle 高亮词样式
 */
export default {
    name: 'ht-highlight-text',
    props: {
        text: {
            type: String,
            default: ''
        },
        keyWord: {
            type: String,
            default: ''
        },
        keyWordStyle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        toText() {
            return this.text.split(this.keyWord);
        },
        toTextStyle() {
            return Object.assign({}, this.textStyle);
        },
        toKeyWordStyle() {
            return Object.assign({}, this.keyWordStyle);
        }
    }
};
</script>

<style lang="scss" scoped>
.ht-highlight-text {
    font-size: 24rpx;
    font-weight: bold;
}
</style>
