const HOT_TITLE = '热门';
const HOT_LENGTH = 10;

export function formatSinger(list) {
  let map = {
    hot: {
      title: HOT_TITLE,
      item: []
    }
  };
  list.forEach((item, index) => {
    if (index < HOT_LENGTH) {
      map.hot.item.push(new Singer(item.Fsinger_mid, item.Fsinger_name))
    }
  })
}

export class Singer {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`;
  }
} 