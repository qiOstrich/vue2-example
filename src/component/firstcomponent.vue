<template>
  <div id="firstcomponent">
    <h2>I am a component.</h2>
    <a> written by {{ author }} </a>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      author: "Jinkey"
    }
  }
}
</script>

<style>

</style>
