<template>
    <view>
        <ht-highlight-text
            :text="content"
            :keyWord="keyWord"
            :textStyle="{ color: '#000' }"
            :keyWordStyle="{ color: '#ffee53' }"
        ></ht-highlight-text>
    </view>
</template>

<script>
export default {
    data() {
        return {
            content: '新用户首单专享优惠，全场9.9元',
            keyWord: '9.9'
        };
    }
};
</script>

<style></style>
