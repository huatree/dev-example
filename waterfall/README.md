---
title: 探索瀑布流布局
date: 2023/03/19 09:45:29
categories:
    - 工作点滴
tags:
    - Vue
    - uniapp
---

瀑布流布局是一种网页布局方式，也称为瀑布流式布局、瀑布流式排版、瀑布流式设计等。它是指将内容按照一定规则排列在不同的列中，形成类似瀑布流般的视觉效果。一般来说，瀑布流布局会自适应屏幕大小，并且具有不规则性，即每个内容块的高度和宽度不一定相等。瀑布流布局在展示图片、文章、商品等内容时比较常见，具有良好的用户体验和视觉效果。

<!-- more -->

## 手写一个瀑布流

[详见 demo](./code/index.html)

## 一些值得尝试优化的地方

### 瀑布流内容缓存

涉及的一些关键字段

```js
const cacheType = {
    tag: '',
    list: [],
    currentPage: 1,
    scrollTop: 0,
    noMore: false
}
```

缓存方式

本地存储，状态管理如 vuex，临时缓存基于当前页...

### 图片懒加载

很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载，即图片赖加载。

懒加载的主要目的是减少页面加载时的请求次数，从而提高页面加载速度和用户体验。

可采用 [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)实现，uniapp 对应的 [uni.createIntersectionObserver](https://uniapp.dcloud.net.cn/api/ui/intersection-observer.html#createintersectionobserver)。

IntersectionObserver 兼容性，[详见](https://caniuse.com/?search=IntersectionObserver)

## 兼容与取舍

合适的才是最优解。

Github 上的排`Sort: Best match`前 4 个解决方案

| 名称               | 优点                                                                             | 缺点                                                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vue-waterfall      | start 数最多的一个方案                                                           | 需要在组件渲染前知道图片的宽度和高度，而我们一般并不会在接口中返回这些数据                                                                                                                           |
| vue-waterfall-easy | 无需提前获取图片的宽高信息，采用图片预加载后再进行排版                           | 耦合下拉、无限加载组件；包含 PC 端等逻辑，包体积较大，对于追求性能的页面并不友好（作为开源方案，兼容更多的场景其实无可厚非，只是这些功能我们都已经有单独的组件实现）；一次加载所有图片，不支持懒加载 |
| vue-waterfall2     | 支持高度自适应，支持懒加载                                                       | 内部多次创建 image 对象，同时还伴随着大量的计算和滚动监听。                                                                                                                                          |
| vue2-waterfall     | 通过对 masonry-layout 和 imagesloaded 这两个开源方案的封装来实现，逻辑简单明了。 | 不支持懒加载                                                                                                                                                                                         |

[详见](https://github.com/search?q=vue-waterfall)

## issues

### 1 图片加载是个异步过程，页面渲染获取列高度不准确

图片没加载出来，图片高度还没有，就去获取列高度引起的。元素高度不固定，且无法预估高度，只能等渲染之后才可以确定高度。

解决：

```js
const img = new Image()
img.src = 'url'
img.load = (e) => {}
img.error = (e) => {}
```

当然，img 标签中支持 load 和 error 事件。

### 2 瀑布流与 tab 组合场景，快速来回切换多个 tab，上一个 tab 在当前 tab 中渲染

上一个接口请求未中断，最终 push 到了 list。加 apiFlag 标识判断。

```js
 data() {
   return {
      // 记录tab频繁切换时接口List请求的索引
     getListIndex: 0
   }
 },
 methods: {
   getList() {
     const currentIndex = this.getListIndex;
     this.getListIndex++;
     this.$ajax('apiName', (res) => {
      // ...
      if (this.getListIndex === currentIndex) {
         // ...
      }
    })
   }
 }
```

### 3 触底加载时内容重渲染

子组件的多个 props 更新时间不一致引起。

### 4 当前页未渲染完成就触发下一页引起单列渲染

需要加一个 renderedFlag 标识判断。

### 5 uniapp v-for 内用插槽只兼容微信小程序 2.18.0 版本以下

### 6 uniapp 瀑布流图片格式移动端设备不兼容

如`.avif`，只兼容 PC

了解更多，[详见](https://developer.mozilla.org/zh-CN/docs/Web/Media/Formats/Image_types)

## 参考

[1] [uview 1.x u-waterfall](https://gitee.com/umicro/uView/blob/master/uview-ui/components/u-waterfall/u-waterfall.vue)

[2] [cool-uni master cl-waterfall](https://github.com/cool-team-official/cool-uni/blob/master/components/cl-waterfall/cl-waterfall.vue)

[3] [教你如何实现一个完美的移动端瀑布流组件](https://juejin.cn/post/7086330043038695432)

[4] [uview 1.x u-lazy-laod](https://gitee.com/umicro/uView/blob/master/uview-ui/components/u-lazy-load/u-lazy-load.vue)
