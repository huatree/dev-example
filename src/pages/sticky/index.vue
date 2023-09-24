<template>
    <view class="sticky">
        <view class="box1">box1</view>
        <ht-sticky stickyHeight="88rpx" :scrollTop="scrollTop" :stickyTop="stickyTop" @change="changeSticky" @sticky="onSticky">
            <template v-slot:header>
                <view class="tab">123</view>
            </template>
        </ht-sticky>
        <view class="box2">box2</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            scrollTop: 0,
            stickyTop: 88
        };
    },
    onLoad() {
        console.log('onload sticky');
    },
    onPageScroll({ scrollTop }) {
        this.scrollTop = scrollTop;
    },
    methods: {
        changeSticky(e) {
            console.log('changeSticky', e);
        },
        onSticky({ isFixed }) {
            console.log('onSticy', isFixed);
        }
    }
};
</script>

<style lang="scss" scoped>
.sticky {
    height: 200vh;
}
.tab {
    width: 100%;
    height: 88rpx;
    background-color: #f40;
}
.box1 {
    width: 100%;
    height: 600rpx;
    background: #454545;
}
.box2 {
    width: 100%;
    height: 300rpx;
    background: #ccc666;
}
</style>
