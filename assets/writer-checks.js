(function (root) {
  'use strict';
  function today() {
    const parts = new Intl.DateTimeFormat('en-US', {timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const value = type => parts.find(p => p.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
  }
  function validate(note, currentDate = today()) {
    const errors = [];
    for (const [key, label] of [['title','标题'],['date','发表日期'],['description','简介'],['body','正文']]) {
      if (!note[key] || !note[key].trim()) errors.push(`请填写${label}。`);
    }
    if (note.title.length > 120 || note.description.length > 240) errors.push('标题请控制在120字内，简介请控制在240字内。');
    if (/\.md\s*$/i.test(note.title)) errors.push('标题应是文章名称，不是以 .md 结尾的文件名。');
    if (!['感悟','旅程'].includes(note.category)) errors.push('栏目请选择人生感悟或人生旅程。');
    const date = new Date(note.date + 'T00:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(note.date) || isNaN(date) || date.toISOString().slice(0,10) !== note.date) errors.push('请填写有效日期。');
    else if (note.date > currentDate) errors.push('发表日期不能晚于今天，否则文章可能不会显示。');
    const placeholders = ['用一句话简单介绍这篇文章','用一句话介绍这篇文章','在这里填写标题','从这里开始写正文','每一段之间空一行','一个小标题','在这里写第一段','继续写下面的内容'];
    const text = `${note.title}\n${note.description}\n${note.body}`;
    if (['文章标题','文章的标题'].includes(note.title.trim()) || placeholders.some(p => text.includes(p))) errors.push('发现模板提示文字，请替换成自己的内容。');
    if (/^\s*---\s*\r?\n/.test(note.body)) errors.push('正文开头似乎含有文章信息区，请移除；标题和日期已在上方填写。');
    if (/siyuan:\/\/|(?:!?)\[[^\]]*\]\(\s*assets\//i.test(note.body)) errors.push('发现思源内部链接或相对附件路径，请改成公开链接或 /assets/照片文件名。');
    if (/<\/?[a-z][^>]*>/i.test(note.body)) errors.push('正文包含 HTML 标签，请改用普通文字或 Markdown 后发布。');
    if (/(?:javascript|data|file|vbscript):/i.test(note.body)) errors.push('发现不适合公开文章的链接格式，请检查链接。');
    return errors;
  }
  function markdown(note) {
    return `---\ntitle: ${JSON.stringify(note.title.trim())}\ndate: ${note.date} 00:00:00 +0800\ncategory: ${note.category}\ndescription: ${JSON.stringify(note.description.trim())}\n---\n\n${note.body.trim()}\n`;
  }
  const api = { today, validate, markdown };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.WriterChecks = api;
})(typeof window !== 'undefined' ? window : globalThis);
