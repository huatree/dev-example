<template>
    <view>
        <ht-countdown :minutes="minutes"></ht-countdown>
    </view>
</template>

<script>
export default {
    data() {
        return {
            minutes: 5
        };
    }
};
</script>

<style></style>
