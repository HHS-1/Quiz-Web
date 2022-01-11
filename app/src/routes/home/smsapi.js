"use strict";
var request = require("request");
var crypto = require("crypto");
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");
const express = require("express");


async function send_message(phone) {
    var user_phone_number = phone;//수신 전화번호 기입
    var resultCode = 404;
    const date = Date.now().toString();
    const uri = process.env.SERVICE_ID; //서비스 ID
    const secretKey = process.env.NCP_SECRET_KEY;// Secret Key
    const accessKey = process.env.NCP_KEY;//Access Key
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);
    request({
      method: method,
      json: true,
      uri: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        countryCode: "82",
        from: "01046119794",
        content: "문자 인증 시스템 구현 테스트",
        messages: [
          { to: `${user_phone_number}`}]
      },
    },
      function (err, res) {
        if (err) console.log(err);
        else { resultCode = 200; console.log("true"); }
      } 
    );
    return resultCode;
  }

  send_message("01056569794");