<template>
<b-container>
{{tag}}
</b-container>
</template>

<script>
const {log} = console
export default {
  name: 'test',
  created() {
    const vm = this
    log('', vm.$route.query)
    vm.tag = vm.$route.query.tag
  },
  data() {
    return {
      tag: ''
    }
  },
}
</script>
