/*jshint esversion: 9 */

const axios = require('axios');

class SID {
  constructor(clientName) {
    this.clientName = clientName;
    this.sidServerInstance = axios.create({
      baseURL: 'http://sid.donote.co:3000/api/v1/',
      timeout: 3000,
      headers: {
        'Host': 'sid.donote.co:3000'
      }
    });
  }

  login(clientid, id, pw) {
    return this.sidServerInstance.post('/session/', {
      type: 'login',
      clientid: clinetid,
      userid: id,
      password: pw,
      isPermanent: false,
      isWeb: true
    }).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        if (resData.type === 'error') {
          reject({
            error: 1
          });
          return;
        }

        output.sessid = resData.response_data[0];
        output.pid = resData.response_data[1];
        output.nickname = resData.response_data[2];
        output.expire = resData.response_data[3];
        resolve(output);
      });
    });
  }

  loginAuth(clientid, sessid) {
    return this.sidServerInstance.post('/session/', {
      type: 'login',
      clientid: clientid,
      sessid: sessid
    }).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        if (resData.type === 'error') {
          reject({
            error: 1
          });
          return;
        }

        output.sessid = resData.response_data[0];
        output.pid = resData.response_data[1];
        output.nickname = resData.response_data[2];
        output.expire = resData.response_data[3];
        resolve(output);
      });
    });
  }

  logout(clientid, sessid) {
    return this.sidServerInstance.delete('/session/', {
      type: 'logout',
      clientid: clientid,
      sessid: sessid
    }).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        if (resData.type === 'error' || !resData.is_succeed) {
          reject({
            error: 1
          });
          return;
        }

        resolve();
      });
    });
  }

  register(clientid, id, pw, nickname = 'User') {
    return this.sidServerInstance.post('/user/', {
      type: 'register',
      clientid: clientid,
      userid: userid,
      nickname: nickname,
      password: pw
    }).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        if (resData.type === 'error' || !resData.is_succeed) {
          reject({
            error: 1
          });
          return;
        }

        resolve(resData.private_id);
      });
    });
  }

  getUserNickname(clientid, sessid) {
    return this.sidServerInstance.get(`/${clientid}/${sessid}/usname`).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        if (resData.type === 'error') {
          reject({
            error: 1
          });
          return;
        }
        if (!resData.is_vaild) {
          resolve('');
          return;
        }

        resolve(resData.response_data);
      });
    });
  }

  loginCheck(target) {}

  passwordCheck(clientid, sessid, pw) {
    return this.sidServerInstance.post('/password/verify', {
      type: 'verify',
      data: 'password',
      clientid: clientid,
      sessid: sessid,
      value: pw
    }).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        if (resData.type === 'error' || !resData.is_vaild) {
          reject({
            error: 1
          });
          return;
        }

        resolve(true);
      });
    });
  }

  createClientID(devicedata) {
    return this.sidServerInstance.post('/clientid', {
      type: 'create',
      data: 'clientid',
      devicedata: devicedata
    }).then(response => {
      let resData = JSON.parse(response.data);
      return Promise((resolve, reject) => {
        resolve(resData.response_data);
      });
    });
  }

  getClientName() {
    return this.clientName;
  }
}

module.exports = new SID();