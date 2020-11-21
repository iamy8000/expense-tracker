#Expense Tracker Project!

![Login Page](/public/images/login.png)
![Register Page](/public/images/register.png)
![Index Page](/public/images/index.png)
![Edit Page](/public/images/edit.png)
![Create Page](/public/new.png)

使用者透過這個記帳網站：

- 可以註冊帳號，註冊資料包括：name, email, 密碼, 確認密碼
- 可以透過Facebook Login 直接登入
- 登入後可以在首頁一次瀏覽所有支出的清單
- 可以在首頁看到所有支出清單的總金額
- 可以新增支出，並提供金額、商家、消費類型、品項資訊
- 可以修改一筆支出的資訊
- 可以刪除一筆支出
- 可以根據「類別」與「月份」來篩選支出，而總金額使會顯示符合項目的加總

提供一組帳密功測試：
- email: 'root@example.com', password: '12345678'

# Prerequisites

- 安裝<a href="https://www.mongodb.com/try/download/community">MongoDB</a></li>
- 安裝<a href="https://robomongo.org/">Robo 3T</a></li>
- 啟動、連線MongoDB資料庫
```
[~] $ cd ~/mongodb/bin/
[~/mongodb/bin] $ ./mongod --dbpath /Users/[你的使用者名稱]/mongodb-data
```
- Create database named 'expense-tracker' in Robo 3T


# Installation and execution

<p>首先啟動終端機，並遵循以下指令。</p>

```
//將專案複製到電腦中
$ git clone https://github.com/iamy8000/expense-tracker.git

//進入專案資料夾
$ cd expense-tracker

//安裝套件
$ npm install

//執行專案
$ npm run dev

//使用種子資料
$ npm run seed

```

<p>若終端機顯示 "App is running on http://localhost:3000, 
mongodb connected!"，便代表檔案安裝成功，即可開啟瀏覽器並進入http://localhost:3000。</p>