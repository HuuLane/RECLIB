<template>
  <b-container>
    <h1 @click="hi">hello</h1>
  </b-container>
</template>

<script>
const { log } = console
export default {
  name: 'test',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    hi () {
      this.axios({
        method: 'GET',
        url: `${process.env.VUE_APP_BOOK}?all=周杰伦`
      }).then((response) => {
        log('response', response.data)
      }).catch(err => {
        log('err', err)
      })
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
</style>
