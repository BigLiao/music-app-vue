<template>
  <div class="singer">
    singer
  </div>
</template>

<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from 'api/config';

export default {
  data () {
    return {
      singers: []
    }
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = res.data.list;
        }
      }).catch((e) => {
        console.log(e);
      });
    }
  },
  created () {
    this._getSingerList();
  }
}
</script>

<style lang="stylus" scoped>

</style>
