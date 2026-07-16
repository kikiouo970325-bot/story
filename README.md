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


## 資料保存說明

- 勾選、暱稱、日期、留言草稿與回憶會儲存在瀏覽器 localStorage。
- 單純清除圖片快取通常不會刪除。
- 清除「網站資料／儲存空間／Cookies 與網站資料」會刪除。
- 請定期在回憶頁按「匯出回憶備份」，保存 JSON 備份檔。
- 需要恢復時，按「匯入回憶備份」即可。
