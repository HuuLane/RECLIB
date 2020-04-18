<template>
  <b-jumbotron>
    <template v-slot:header>
      <slot>404 Not Found</slot>
    </template>
    <template v-slot:lead>
      <slot name="info"></slot>
    </template>    
  </b-jumbotron>
</template>

<script>
import { setInterval } from 'timers'
export default {
  name: 'PageNotFound',
}
</script>
