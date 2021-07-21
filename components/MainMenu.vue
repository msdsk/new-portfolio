<template>
  <nav class="main-menu">
    <a href="#web-dev" v-scroll-to="'#web-dev'">Web dev</a>
    <a href="#graphic-design" v-scroll-to="'#graphic-design'">Graphic design</a>
    <a href="#cv" v-scroll-to="'#cv'">CV</a>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.main-menu {
  width: 100vh;
  transform: translateY(-1.6em) rotate(-90deg);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 200;
  transform-origin: bottom right;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  a {
    text-decoration: none;
    color: $black;
    font-family: $font-family-header;
    font-weight: 700;
    text-transform: uppercase;
    &:hover {
      color: $secondary;
    }
  }
}
</style>
