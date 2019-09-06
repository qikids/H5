# H5实战页面
DIV + CSS布局，HTML5+CSS3+JS

动画按需加载
第一屏在0.3s之后开始播放动画，每一屏须保证该屏出现才开始播放动画。这里的动画按需加载采用css类控制，即在每一屏中添加一个_animate_init的类作为标记，在每一屏中的CSS动画设置中，同样加上_animate_init类名，当滚动条滚动到该屏时在把类名切换为_animate_done，这样就实现了当页面出现才开始播放本页动画的功能。

element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));

优化滑动过渡效果，得流畅的交互效果。
transition: all 2s;

