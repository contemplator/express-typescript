## 2018.02.09

獨立 router 邏輯

---

## 2018.02.09 

加入真實 API 測試，但仍是直接回傳一個捏造的 json array

---

## 2018.02.09

因為是開發 http service，好的開發流程是 TDD，也就是先寫測試再寫功能的意思，因為不用測試介面，所以 test 應該算好寫吧！？

加入測試：mocha chia

mocha：用途不明
chia：用途不明

在 npm script 加入 test，會通知通過和未通過幾個測試

---

## 2018.02.09

加入 gulp，當 .ts 或 .json 檔案有修改時，就做即時編譯，從 ts 依照 tsconfig.json 設定編譯成 js，並且重啟。

-- 目前 gulp 會在還沒編譯完成就進行重啟，有重啟多次的問題

---

## 2018.02.09

完成 Nodejs + Express + Typescript 

app.ts 定義了 class App，用來定義 app 設定，像是使用了哪一些 middleware，還有路徑和對應的 function 處理
index.ts 定義了 server 如何建立（即是參考 app.ts），以及在建立和遇到例外的處理

-- 應該將 app.ts 和 index.ts 合併為一個，將 route 路徑和對應的 function 的處理放在另外一個地方定義，最好是使用 decorator 一律參考某個檔案或資料夾
