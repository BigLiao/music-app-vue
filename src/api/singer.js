import { jsonp } from "../common/js/jsonp";
import { commonParams, options, ajaxParams } from "./config";

export function getSingerList () {
  const url = 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg';
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, {
    param: 'jsonpCallback'
  })
}
