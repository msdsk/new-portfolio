<template>
  <nav class="main-menu">
    <div class="main-menu__item main-menu__item--1">
      <a href="#top" v-scroll-to="'#top'">Top</a>
      <a href="#web-dev" v-scroll-to="'#web-dev'">Web dev</a>
      <a href="#graphic-design" v-scroll-to="'#graphic-design'">
        Graphic design
      </a>
    </div>
    <div class="main-menu__item main-menu__item--2">
      <a href="#cv" v-scroll-to="'#cv'">CV</a>
      <a href="#cv" v-scroll-to="'#stuff-i-know'">Stuff I know</a>
      <a href="#cv" v-scroll-to="'#contact'">Contact</a>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.main-menu {
  &__item {
    width: 100vh;
    position: fixed;
    top: 0;
    z-index: 200;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: $black;
      font-family: $font-family-header;
      font-weight: 700;
      text-transform: uppercase;
      position: relative;

      &::before {
        content: '';
        width: calc(100% + 1em);
        height: 100%;
        top: 0;
        left: -0.5em;
        display: block;
        background: $secondary;
        position: absolute;
        mix-blend-mode: darken;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s;
        border-right: 0.3em solid $black;
      }

      &:hover::before {
        transform: scaleX(1);
      }
    }

    &--1 {
      transform: translateY(-1.6em) rotate(90deg);
      transform-origin: bottom left;
      left: 0;
    }

    &--2 {
      transform: translateY(-1.6em) rotate(-90deg);
      transform-origin: bottom right;
      right: 0;
      flex-direction: row-reverse;
    }
  }
}
</style>
