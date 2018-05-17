## TBD 加入測試錯誤

## 加入 mysql、Procedure

增加 src/models/db-model 控制呼叫 db 預存程序的物件
增加 sql/ 建立 table 及後續加入資料的 sql 
增加 sql/procedure 增加對 db table 增刪改查的指令
增加 src/controllers/student 控制 /student 路徑下的操作

執行 npm test 可看到結果，但是仍沒有處理錯誤訊息

## 完成路由規劃、API 單元測試

2018-05-16

```
npm test
```

即可看到測試結果

```
npm gulp
```

會進行 typescript 編譯，並且運行 server，只要對 ts 進行修改，就會重新編譯和運行 server