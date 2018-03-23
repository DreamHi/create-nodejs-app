# template-nodejs-app
基于Nodejs的后端服务器模版，只提供RestAPI服务。适用于前后端分离的项目。  
前端模版请参考[template-react-app]()

## 环境要求

node > 6  
mongodb > 3.6

## 

## 运行

#### 1. 启动mongodb

```sh
cd ./mongodb-3.6.3
bin/mongod --dbpath=./data/
```    

#### 2.安装依赖的库

```shell
npm install
```

#### 3.启动服务
 
```shell
node app.js
[2018-03-23T18:51:32.416] [WARN] application - init server [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/app.js] [14]
[2018-03-23T18:51:32.419] [WARN] application - init db [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/app.js] [17]
[2018-03-23T18:51:32.420] [WARN] application - init express [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/app.js] [20]
[2018-03-23T18:51:32.568] [WARN] application - init routes [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/app.js] [24]
[2018-03-23T18:51:33.063] [WARN] application - Create a connection. [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/src/core/db.js] [10]
[2018-03-23T18:51:33.064] [WARN] application - Database Info: 127.0.0.1 27017 template [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/src/core/db.js] [23]
[2018-03-23T18:51:33.098] [WARN] application - Server listening on port 3000 [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/app.js] [28]
[2018-03-23T18:51:55.490] [INFO] application - user.simpleLogin() start. [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/src/modules/system/controllers/ctrl_user.js] [16]
[2018-03-23T18:51:55.515] [DEBUG] application - user.simpleLogin().authUser() error. [] [192.168.2.83] [/Users/Documents/hidream/template-nodejs-app/src/modules/system/controllers/ctrl_user.js] [51]
POST /template/login 400 33.723 ms - 84
```

#### 4.检证

![](http://img.hb.aicdn.com/8304f553472a13288f36c546ac31a70a3886ca3a2dc60-2tQXhd_fw658)

## 用户指南

- [目录结构]()
- [web框架]()
  - [Express]()
- [DB驱动]()
  - [mongoose]()
- [日志]()
  - [log4js]()
- [国际化]()
  - [i18n]()
- [中间件]()
- [安全性]()
- [认证]()
- [工具库]()
  - [lodash]()
  - [moment]()
  - [async]()
  - [joi]()
- [代码规范]()  
- [测试]()
  - [istanbul]()
  - [mocha]()
  - [mochawesome]()
  - [chai]()
  
## 目录结构


