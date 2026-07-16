# Our Future 純前端手機版

## 在 WebCode 使用

1. 在 WebCode 開啟整個 `OurFuture_純前端手機版` 資料夾。
2. 開啟 `index.html`。
3. 按畫面下方的 ▶ 預覽。
4. 不要從 Android 檔案總管直接點擊 HTML；`content://` 模式可能阻擋 Discord 請求。
5. 完成全部選項後，填寫稱呼、日期和想說的話，再按「♡ 我願意 ♡」。

## 檔案

- `index.html`：網站畫面
- `style.css`：樣式與動畫
- `app.js`：互動、Discord 傳送與電影結尾
- `config.js`：Discord Webhook 與作者設定

## 修改稱呼

打開 `config.js`，修改：

```js
senderName: "穆雪"
```
