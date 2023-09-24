## HighlightText 高亮文本

### 基本用法

在 template 中使用组件

```vue
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
```

## API

### Props

|     参数     |  类型  |    说明    | 默认值 |
| :----------: | :----: | :--------: | :----: |
|     text     | String |  文本信息  |   -    |
|   keyWord    | String |   高亮词   |   -    |
|  textStyle   | Object |  文本样式  |   -    |
| keyWordStyle | Object | 高亮词样式 |   -    |
