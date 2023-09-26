<template>
    <view class="ht-countdown">
        <!-- 剩余天数 -->
        <template v-if="isShowDay">
            <text class="day" :style="[timeStyle]">{{ timeLog.day }}</text>
            <text class="separator" :style="[separatorStyle]">{{ format.day }}</text>
        </template>
        <!-- 剩余小时 -->
        <text class="hours" :style="[timeStyle]">{{ timeLog.hours }}</text>
        <text class="separator" :style="[separatorStyle]">{{ format.hours }}</text>
        <!-- 剩余分钟 -->
        <text class="minutes" :style="[timeStyle]">{{ timeLog.minutes }}</text>
        <text class="separator" :style="[separatorStyle]">{{ format.minutes }}</text>
        <!-- 剩余秒数 -->
        <text class="seconds" :style="[timeStyle]">{{ timeLog.seconds }}</text>
        <text class="separator" :style="[separatorStyle]">{{ format.seconds }}</text>
        <!-- 插槽 -->
        <slot></slot>
    </view>
</template>

<script>
/**
 * countdown 倒计时
 * @property {Object} timeStyle 时间数值样式
 * @property {Object} separatorStyle 时间分隔符样式
 * @property {Boolean} simplified 是否简化倒计时时间
 * @property {Boolean} isShowDay 是否显示天数
 * @property {Number} day 天数
 * @property {Number} hours 小时
 * @property {Number} minutes 分钟
 * @property {Number} seconds 秒
 * @property {Object} format 格式化分割符号
 * @event {Function} onTimeUp 倒计时时间到，执行的回调函数
 */
export default {
    name: 'ht-countdown',
    emits: ['onTimeUp'],
    props: {
        timeStyle: {
            type: Object,
            default: () => ({})
        },
        separatorStyle: {
            type: Object,
            default: () => ({})
        },
        simplified: {
            type: Boolean,
            default: false
        },
        isShowDay: {
            type: Boolean,
            default: false
        },
        day: {
            type: Number,
            default: 0
        },
        hours: {
            type: Number,
            default: 0
        },
        minutes: {
            type: Number,
            default: 0
        },
        seconds: {
            type: Number,
            default: 0
        },
        format: {
            type: Object,
            default: () => ({ hours: ':', minutes: ':', seconds: '' })
        }
    },
    data() {
        return {
            timer: 0,
            totalSeconds: 0, // 总秒数
            timeLog: {
                day: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        };
    },
    computed: {
        timeProps() {
            return {
                day: this.day,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds
            };
        }
    },
    watch: {
        timeProps() {
            this.totalSeconds = this.toSeconds(this.day, this.hours, this.minutes, this.seconds);
            this.clearTimer();
            this.setTimer();
        }
    },
    created() {
        this.totalSeconds = this.toSeconds(this.day, this.hours, this.minutes, this.seconds);
    },
    mounted() {
        this.setTimer();
    },
    beforeDestroy() {
        this.clearTimer();
    },
    methods: {
        // 转换秒数
        toSeconds(day, hours, minutes, seconds) {
            return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
        },
        // 格式化时间数值
        formatNum(num) {
            return num <= 9 ? `0${num}` : `${num}`;
        },
        // 计算时间
        calculateTime() {
            let [day, hours, minutes, seconds] = [0, 0, 0, 0];
            if (this.totalSeconds > 0) {
                day = this.isShowDay ? Math.floor(this.totalSeconds / (60 * 60 * 24)) : 0;
                hours = Math.floor(this.totalSeconds / (60 * 60)) - day * 24;
                minutes = Math.floor(this.totalSeconds / 60) - day * 24 * 60 - hours * 60;
                seconds = Math.floor(this.totalSeconds) - day * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
            }
            const result = { day, hours, minutes, seconds };
            if (!this.simplified) {
                for (const key in result) {
                    result[key] = this.formatNum(result[key]);
                }
            }
            return result;
        },
        // 清除定时器
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = 0;
            }
        },
        // 倒计时
        countdonwn() {
            const { day, hours, minutes, seconds } = this.calculateTime();
            this.timeLog = { day, hours, minutes, seconds };
            this.totalSeconds--;
            if (this.totalSeconds < 0) {
                this.clearTimer();
                this.$emit('onTimeUp');
                return;
            }
            this.timer = setTimeout(() => {
                this.countdonwn();
            }, 1000);
        },
        // 设置定时器（设置倒计时）
        setTimer() {
            if (!this.timer) this.countdonwn();
        }
    }
};
</script>

<style lang="scss" scoped>
.ht-countdown {
    font-family: yzfFont;
    .day,
    .hours,
    .minutes,
    .seconds {
        display: inline-block;
        min-width: 30rpx;
        height: 30rpx;
        text-align: center;
        border-radius: 4rpx;
        background: #fe4854;
        color: #fff;
        font-size: 20rpx;
        text-align: center;
        line-height: 30rpx;
    }
    .separator {
        color: #fe4854;
        font-size: 20rpx;
        font-weight: bold;
        margin: 0 4rpx;
    }
}
</style>
