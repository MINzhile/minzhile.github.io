# MINzhile · 行旅随记

记录人生感悟，也记录人生旅程。

网站：<https://minzhile.github.io>

这是一个 GitHub Pages 个人网站。视觉结构参考 Kevin Kelly 的个人网站：大幅风景图、简洁导航、分区文字；本站的文字、版式实现与配图另行制作。

## 发布文章（直接在 GitHub 网页上完成）

1. 打开本仓库的 `_posts` 文件夹。
2. 点击 **Add file → Create new file**。
3. 文件名采用 `年-月-日-英文短标题.md`，例如 `2026-09-06-a-new-day.md`。
4. 把下面的内容粘贴进去，再修改标题、日期、分类、简介和正文。

```markdown
---
title: 在这里填写标题
date: 2026-09-06 09:00:00 +0800
category: 感悟
description: 用一句话介绍这篇文章。
---

在这里写第一段。

空一行，再写下一段。

## 一个小标题

继续写正文。
```

5. 点击 **Commit changes** 保存。日期请填实际发表时间，不要设为未来时间。
6. 等待 GitHub Pages 自动发布。新文章会自动出现在相应栏目和按年份整理的归档中。

分类请使用 `感悟` 或 `旅程`，分别对应首页两个栏目。其他分类仍会出现在归档。

## 添加照片

把照片上传到 `assets` 文件夹，在文章中写：

```markdown
![照片内容说明](/assets/你的照片文件名.jpg)
```

## 修改主页

- `index.html`：首页的关于文字、导航和分区。
- `_config.yml`：网站标题、描述和网址。
- `assets/site.css`：页面样式和手机布局。
- `_posts`：所有已经发表的文章。
- `_layouts/post.html`：文章阅读页。

首篇《给人生，留一个自己的地方》是依据建站时表达的想法整理的开篇文字，可直接修改或删除。旅程栏目未填入虚构经历。

## GitHub Pages 设置

在 **Settings → Pages** 中选择 **Deploy from a branch**，分支 `main`，文件夹 `/ (root)`。

GitHub 会自动使用 Jekyll 生成网站，无需自行安装软件或购买服务器。

## 图片

首页山水图为 AI 生成意象，不代表作者实际到访的地点。详情见 `ASSETS.md`。

