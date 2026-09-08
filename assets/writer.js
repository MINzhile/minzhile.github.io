/* All draft processing stays in this page. No storage, telemetry or network requests. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('writer-form');
  let checked = null;
  $('note-date').value = WriterChecks.today();
  $('note-date').max = WriterChecks.today();
  const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const renderer = new marked.Renderer();
  renderer.html = token => escape(token.text);
  renderer.link = function(token) { return `<span class="preview-link">${this.parser.parseInline(token.tokens)}</span>`; };
  renderer.image = token => `<span class="preview-image">[图片：${escape(token.text || '未填写图片说明')}]</span>`;
  function invalidate() {
    checked = null;
    $('public-consent').checked = false;
    $('download-note').disabled = true;
    $('writer-preview').hidden = true;
    $('writer-status').textContent = '内容已修改，请重新检查并预览。';
    $('download-status').textContent = '';
    $('generated-file').hidden = true;
    $('generated-name').value = '';
    $('generated-source').value = '';
  }
  form.addEventListener('input', invalidate);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const note = Object.fromEntries(['title','date','category','description','body'].map(key => [key,$('note-'+key).value]));
    invalidate();
    const errors = WriterChecks.validate(note);
    const status = $('writer-status');
    status.replaceChildren();
    if (errors.length) {
      const list = document.createElement('ul');
      for (const error of errors) {const li = document.createElement('li');li.textContent=error;list.append(li);}
      status.append(list);
      return;
    }
    checked = note;
    $('preview-title').textContent = note.title;
    $('preview-description').textContent = note.description;
    $('preview-meta').textContent = `${note.date} / ${note.category}`;
    $('preview-body').innerHTML = marked.parse(note.body,{renderer,gfm:true,breaks:false});
    $('writer-preview').hidden = false;
    status.textContent = '格式检查通过。请阅读下方预览，并核对是否可以公开。';
    $('writer-preview').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  $('public-consent').addEventListener('change', () => {$('download-note').disabled = !checked || !$('public-consent').checked;});
  $('download-note').addEventListener('click', () => {
    if (!checked || !$('public-consent').checked) return;
    const filename = `${checked.date}-note-${Date.now()}.md`;
    const source = WriterChecks.markdown(checked);
    $('generated-name').value = filename;
    $('generated-source').value = source;
    $('generated-file').hidden = false;
    const url = URL.createObjectURL(new Blob([source],{type:'text/markdown;charset=utf-8'}));
    const link = document.createElement('a');link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    $('download-status').textContent = `已生成 ${filename}。请在浏览器下载记录中确认保存；文章尚未上传或发布。`;
  });
})();
