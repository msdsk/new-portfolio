<template>
  <div class="project margin-top-bigger" ref="container">
    <div
      class="project__image"
      :style="{
        opacity: transform * 0.8 + 0.2,
        transform: `translate(${(this.transform - 1) * 30}%, -50%)`,
        filter: `grayscale(${1 - this.transform})`,
      }"
    >
      <img :src="project.image" :alt="`${project.title} Screenshot`" />
    </div>
    <h3>
      <component :is="project.link ? 'a' : 'span'" :href="project.link">{{
        project.title
      }}</component>
    </h3>
    <nuxt-content :document="project" />
  </div>
</template>

<script>
export default {
  props: {
    project: Object,
  },
  data() {
    return { transform: 0, debounce: false }
  },
  methods: {
    scrollListener() {
      if (this.debounce || !this.$refs.container) return
      this.debounce = true
      requestAnimationFrame(() => (this.debounce = false))
      const containerPosition = this.$refs.container.getBoundingClientRect(),
        distanceFromTop = containerPosition.bottom / window.innerHeight + 0.05,
        distanceFromBottom = 1 - containerPosition.top / window.innerHeight

      const closestDistance = Math.max(
        0,
        Math.min(distanceFromTop, distanceFromBottom)
      )
      this.transform = Math.min(closestDistance * 3, 1)
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollListener)
    this.scrollListener()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
  },
}
</script>

<style lang="scss">
.project {
  position: relative;
  min-height: 30vh;
  &__image {
    width: 33%;
    min-width: 15em;
    position: absolute;
    top: 50%;
    left: 2em;
    opacity: 0.2;
    pointer-events: none;
    left: 32em;
    transition: transform 0.2s;

    img {
      mix-blend-mode: multiply;
    }
  }

  @media (min-width: $lg) {
    // &__image {
    //   left: 32em;
    //   transform: translate(-100%, -50%);
    //   transition: 1.5s, 0.8s;
    //   transition-delay: 0.5s, 0s;
    //   transition-timing-function: ease-in-out;
    //   transition-property: transform, opacity, background-color, filter;
    //   max-height: unset;
    // }

    // &--highlighted {
    //   .project {
    //     &__image {
    //       transition-delay: 0s, 0.7s;
    //       transform: translate(0%, -50%);
    //       opacity: 1;
    //       background-color: $white;
    //       filter: grayscale(0);
    //     }
    //   }
    // }
  }
}
</style>
