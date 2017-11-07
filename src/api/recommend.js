import {jsonp} from "../common/js/jsonp";
import { commonParams, options, ajaxParams } from "./config";
import ajax from '../common/js/ajax';

// 原接口
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });

  return jsonp(url, data, {
    param: 'jsonpCallback',
    prefix: 'jp'
  })
}

export function getAjaxData () {
  const url = '/api/getrecommend';

  const data = Object.assign({}, ajaxParams);

  return ajax(url, 'get', data)
}

export function getPlayList () {
  const url = '/api/getplaylist';
  let rnd = Math.random();
  // const data = Object.assign({}, commonParams, {
  //   picmid: 1,
  //   g_tk: 5381,
  //   loginUin: 0,
  //   format: 'json',
  //   rnd: rnd,
  //   hostUin: 0,
  //   platform: 'yqq',
  //   needNewCode: 0,
  //   categoryId: 10000000,
  //   sortId: 5,
  //   sin: 30,
  //   ein: 59
  // });
  let options = {
    picmid: 1,
    rnd: rnd,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 30,
    ein: 59
  }
  return jsonp(url, options, {
    param: 'jsonpCallback'
  })
}
