const fs = require('fs');
const path = require('path');
const base = 'D:/./qclaw/workspace/bangongxiaoke';
const listPages = ['excel.html','word.html','ppt.html','ai-office.html','zhichang.html','diannao.html','index.html'];

let updated = 0;
for (const page of listPages) {
  const fp = path.join(base, page);
  if (!fs.existsSync(fp)) { console.log(`❌ 跳过（不存在）：${page}`); continue; }
  let html = fs.readFileSync(fp, 'utf8');
  // Replace article links: articleN.html -> articles/articleN.html
  const newHtml = html.replace(/"article(\d+)\.html"/g, '"articles/article$1.html"');
  if (newHtml !== html) {
    fs.writeFileSync(fp, newHtml, 'utf8');
    const count = (newHtml.match(/articles\/article\d+\.html/g) || []).length;
    console.log(`✅ 已更新 ${page}，替换 ${count} 个链接`);
    updated++;
  }
}
console.log(`\n总计更新 ${updated} 个列表页`);