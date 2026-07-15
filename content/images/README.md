# 图片目录

将你的个人照片命名为 `photo.png` 放在此目录下，侧边栏将自动显示。

或者，你也可以在 `content/site.json` 中设置 `avatar` 字段指向任意图片路径：

```json
{
  "avatar": "/images/photo.png"
}
```

如果不放照片，侧边栏会显示你的名字首字母作为占位符。

博客文章中引用图片时使用相对路径：
```markdown
![图片描述](../images/your-image.png)
```
