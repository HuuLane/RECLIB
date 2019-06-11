# 6-5-reclab

### 开发日志

6/9 subject详细页(80%)
- intro card 采用 collapse, 用 ajax 读数据.
- 404组件, 5秒倒计时回首页.
- 指定 router-view keep-alive

6/10
- 修改数据库, score, rating改为 Number(坑我好久..$gte死活查不出)
- 做主页 search bar.
- 添加 fontawesome
- 添加一个 restful api all
- 做 search 结果页.
- 加入@media query scss(但不是很懂), 有空再学.
- test infinite-scroll okay.

6/11
- 使用vue-infinite-scroll, 将 search页修改. 并添加一个 scroll to top.
- 复习概率论准备考试.

### 坑

1. 仅指定特定的 router-view keep-alive 的话, 是用模块名而不是 router name.