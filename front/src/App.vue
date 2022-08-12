<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
}
</script>

<style>
*{
  margin: 0;
  padding: 0px;
}
#app{
  font-family: Lato, Helvetica, Arial, sans-serif;
  color : #4E5166;
}
html {
  height: 100%;
}
body {
  margin: 0px;
  height: 100%;
}
</style>
