# Our Future 3.0 — Pages 重構版

此版本為純 HTML/CSS/JavaScript，可直接部署到 GitHub Pages。

## 根目錄必須包含
- index.html
- config.js
- css/
- js/
- .nojekyll

## 本次修正
- 所有官宣勾選皆為自由選擇
- 0 個到全部都能按「我願意」並寄出
- GitHub Pages 使用相對路徑
- 保留 Discord、寄信動畫、回憶、備份與電影結尾
- 回憶首頁會讀取第一筆回憶的實際照片、日期、時間與文字
- `config.js` 的 `memorySync.endpoint` 可填入同一個 HTTPS JSON API，讓所有設備不分登入者共用同一份回憶紀錄

## 回憶同步端點格式
GitHub Pages 不能直接寫入檔案或資料庫，因此跨設備同步必須使用外部 HTTPS API。

- `GET endpoint` 回傳 `{ "memories": [] }` 或直接回傳陣列
- `PUT endpoint` 接收 `{ "memories": [] }`
