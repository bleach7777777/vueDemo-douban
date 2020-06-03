<template>
  <div>
    <span>{{test}}</span>
    <button @click="addtest()">add</button>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "test",
  data() {
    return {
      t: 0
    };
  },
  methods: {
    ...mapMutations({
      settest: "SET_TEST"
    }),
    addtest() {
      this.t++;
      this.settest(this.t);
    }
  },
  computed: {
    ...mapState({
      test: state => state.test
    })
  }
}
</script>
<style lang='scss' scoped>
</style>
