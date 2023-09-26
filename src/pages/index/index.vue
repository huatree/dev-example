<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <text class="title">{{ title }}</text>
        </view>
        <view>
            <button @click="onJumpSticky('sticky')">Sticky 吸顶</button>
            <button @click="onJumpSticky('highlightText')">HighlightText 高亮文本</button>
            <button @click="onJumpSticky('countdown')">countdown 倒计时</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            title: 'Hello'
        };
    },
    onLoad() {},
    methods: {
        onJumpSticky(path) {
            uni.navigateTo({ url: `/pages/${path}/index` });
        }
    }
};
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36rpx;
    color: #8f8f94;
}
</style>
