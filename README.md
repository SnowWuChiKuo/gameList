# 介紹
***
可以創建帳號、使用facebook登入以及google登入，開始使用專屬自己的遊戲書籤。

# 功能
*** 
- 可以利用email、facebook、google進行註冊並登入
- 可以新增兩個遊戲的書籤
  - MapleStory
  - GrandChase
- 查看書籤內容
- 新增書籤
- 編輯書籤
- 刪除書籤

# 開始使用
***
1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟後，透過中顛機進入資料夾，輸入:
  npm install
4. 安裝完畢後，繼續輸入:
  npm run dev
5. 若看見以下文字代表順利運行，打開瀏覽器進入到以下網址
  App is running in http://localhost:3000
6. 新增種子資料
  npm run seedGrand
  npm run seedMaple

# 開發工具
***
- bcryptjs 2.4.3
- body-parser 1.20.0
- connect-flash 0.1.1
- dotenv 8.2.0
- express 4.17.1
- express-handlebars 5.3.3
- express-session 1.17.1
- method-override 3.0.0
- mongoose 6.0.5
- passport 0.4.1
- passport-facebook 3.0.0
- passport-google-oauth20 2.0.0
- passport-local 1.0.0