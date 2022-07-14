# 简介

- 京豆签到
- 掘金签到
- 个人学习博客自动部署

# 上手


- clone (代码还会更新，建议不要改动其中逻辑)
- my_actions/utils/email.js 改成个人邮箱 
- 部署到个人GitHub
- 按照备注参考文章获取对应信息，保存到secrets(github主页 => Settings => Secrets => Actions )
  - 掘金cookie[1] => JUEJIN_COOKIE
  - qq邮箱授权码[1] => QQ_EMAIL_PASS
  - 京东pt_pin[2] => JD_PT_KEY
  - 京东pt_key[2] => JD_PT_KEY

# 以下文件暂时可忽略

## 个人博客用

.github/workflows/jindou-submit.yml
publish.md

# 参考文章

[1] [掘金](https://juejin.cn/post/7041495891388743716)
[2] [京豆](https://segmentfault.com/a/1190000041786477)