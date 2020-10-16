﻿// 通过触发后台方法，获取数据
var http = require("http");

var opt = {
  host: "101.201.101.70",
  port: 8080,
  agent: false,
  // path: '/5i5j/staff_getDutyList.action',
  path: "/5i5j/main/userRole_queryList.action?roleId=1",
  headers: { "Content-Type": "application/json" },
};

http
  .get(opt, function (res) {
    console.info("状态码：", res.statusCode);

    res.on("data", function (data) {
      console.log("返回的内容： " + JSON.parse(data));
    });
  })
  .on("error", function (err) {
    console.log("error", err);
  });
