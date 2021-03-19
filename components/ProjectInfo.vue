<template>
  <div
    class="project margin-top-big"
    ref="container"
    :class="highlighted ? 'project--highlighted' : ''"
  >
    <div class="project__image">
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
let observer
export default {
  props: {
    project: Object,
  },
  data() {
    return { highlighted: false }
  },
  mounted() {
    const observerOptions = { rootMargin: '-35% 0%' }
    observer = new IntersectionObserver(
      (e) => (this.highlighted = e[0].isIntersecting),
      observerOptions
    )
    observer.observe(this.$refs.container)
  },
  beforeDestroy() {
    observer.disconnect()
  },
}
</script>

<style lang="scss">
.project {
  position: relative;
  &__image {
    width: 33%;
    min-width: 15em;
    position: absolute;
    top: -0.5em;
    left: 2em;
    filter: grayscale(1);
    opacity: 0.2;
    pointer-events: none;

    img {
      mix-blend-mode: multiply;
    }
  }

  @media (min-width: $lg) {
    &__image {
      left: 32em;
      transform: translateX(-100%);
      transition: 1.5s, 0.8s;
      transition-delay: 0.5s, 0s;
      transition-timing-function: ease-in-out;
      transition-property: transform, opacity, background-color, filter;
      max-height: unset;
    }

    &--highlighted {
      .project {
        &__image {
          transition-delay: 0s, 0.7s;
          transform: translateX(0%);
          opacity: 1;
          background-color: $white;
          filter: grayscale(0);
        }
      }
    }
  }
}
</style>
