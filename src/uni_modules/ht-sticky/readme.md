## ht-sticky 吸顶

### 基本用法

在 template 中使用组件

```vue
<template>
    <ht-sticky 
    stickyHeight="88rpx" 
    :scrollTop="scrollTop" 
    :stickyTop="stickyTop" 
    @change="changeSticky" 
    @sticky="onSticky">
        <template v-slot:header>
            <view class="tab">123</view>
        </template>
    </ht-sticky>
</template>
```

## API

### Slots

|    名称     |                     说明                     |
| :---------: | :------------------------------------------: |
| **header**  |              吸顶容器内显示内容              |
| **content** | 当吸顶容器设置为指定容器时，内容放置此插槽内 |

### Props

|      参数       |       类型       |                     说明                     |    默认值     |
| :-------------: | :--------------: | :------------------------------------------: | :-----------: |
|    scrollTop    |      Number      |              滚动条距离顶部距离              |     **-**     |
|    stickyTop    | [Number, String] |          吸顶时与顶部的距离，单位px          | H5:44，其他:0 |
|    container    |     Boolean      |    是否指定容器，即内容放置插槽content内     |     false     |
| isNativeHeader  |     Boolean      |             是否是原生自带header             |     true      |
|  stickyHeight   |      String      |              吸顶容器 高度 rpx               |     auto      |
| backgroundColor |      String      |               占位容器背景颜色               |  transparent  |
|     recalc      |      Number      | 是否重新计算[有异步加载时使用,设置大于0的数] |       0       |
|      index      | [Number, String] |                列表中的索引值                |       0       |

### Events

| 事件名 |                说明                | 回调参数                                                     |
| :----: | :--------------------------------: | ------------------------------------------------------------ |
| sticky |            是否已经吸顶            | {   isFixed: Boolean, //是否吸顶   index: Number //列表中的索引值 } |
| change | 元吸顶容器距顶部距离发生变化时触发 | {   top:Number, //距离顶部距离 px   index: Number //列表中的索引值 } |
