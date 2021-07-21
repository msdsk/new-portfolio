<template>
  <div
    class="paralax"
    ref="cont"
    :style="{ transform: `translateY(${transform}px)` }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    speed: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      transform: 0,
      center: 0,
      debounce: false,
    }
  },
  methods: {
    moveParallax() {
      this.transform =
        (this.center - window.scrollY - window.innerHeight / 2) *
        this.speed *
        0.1
    },
    initParalax() {
      const rect = this.$refs['cont'].getBoundingClientRect()
      this.center = rect.top + window.scrollY + rect.height / 2

      document.addEventListener('scroll', this.moveParallax)
      this.moveParallax()
    },
  },
  mounted() {
    this.initParalax()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.moveParallax)
  },
}
</script>

<style lang="scss">
.paralax {
  @media (max-width: $md) {
    transform: none !important;
  }
}
</style>
