<template>
  <div
    class="grid projects-grid"
    :class="{ 'projects-grid--details-visible': detailsVisible !== false }"
  >
    <div
      v-for="(project, i) in projects"
      :key="project.slug"
      class="project col col--lg-3"
      :ref="`container${i}`"
      :style="getProjectStyle(i)"
      :class="{ 'project--details-hidden': detailsVisible !== i }"
      @click="getPosition(i)"
    >
      <h3 class="project__title text-center margin-bottom-small">
        <div>{{ project.title }}</div>
      </h3>
      <div class="project__image">
        <img :src="project.image" :alt="`${project.title} Screenshot`" />
      </div>
      <div
        class="project__details"
        :style="{ transitionDelay: `${0.3 * Math.pow(i, 0.3)}s` }"
      >
        <div>
          <button @click.stop="detailsVisible = false" class="a project__back">
            ← Go back
          </button>
          <nuxt-content :document="project" class="margin-top-small" />
          <a :href="project.link" target="_blank">See it live</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: Array,
  },
  data() {
    return {
      detailsVisible: false,
      leftOffset: [],
    }
  },
  methods: {
    getPosition(index) {
      const ref = this.$refs[`container${index}`][0]
      this.leftOffset[index] =
        ref.getBoundingClientRect().left -
        ref.parentElement.getBoundingClientRect().left
      this.detailsVisible = index
    },
    getProjectStyle(index) {
      return {
        transitionDuration: `${0.5 * Math.pow(index, 0.3)}s, 0.15s`,
        transform: `translateX(-${this.leftOffset[index] || 0}px)`,
      }
    },
  },
}
</script>

<style lang="scss">
.project {
  @media (min-width: $lg) {
    transition: transform 0.5s ease-in-out, opacity 0.15s;
    &__image {
      height: 0;
      width: 80%;
      margin: auto;
      padding-bottom: 80%;
      position: relative;
      display: flex;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        transition: filter 0.2s;
        background: $black;
        border: 0.5em solid $black;
      }
      &::before {
        content: '';
        position: absolute;
        top: 1em;
        right: 1em;
        bottom: -1em;
        left: -1em;
        background: $secondary;
      }
    }

    &__details {
      transition: opacity 0.2s 0.8s, transform 0.2s 0.8s ease-out;
      position: absolute;
      top: 0;
      min-height: 100%;
      z-index: 3;
      left: calc(25vw + #{0.5 * $gap});
      width: calc(75vw - #{0.5 * $gap});
      display: flex;
      align-items: center;
      background: $black;
      color: $white;
      padding: $gap;
    }

    &--details-hidden {
      transform: translateX(0) !important;
      &:hover {
        img {
          // box-shadow: 0 0.3em 1em rgba(0, 0, 0, 0.3);
          filter: drop-shadow(0 0.4em 0.5em rgba(0, 0, 0, 0.3));
          cursor: pointer;
        }
      }
      .project__details {
        opacity: 0;
        pointer-events: none;
        transition-delay: 0s !important;
        transform: translateX(2em);
      }
    }
  }
  @media (max-width: $lg) {
    transform: none !important;
    &__image {
      max-width: 20em;
      margin: auto;
    }
    h3 {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        bottom: -0.5em;
        height: 2em;
        width: 100%;
        left: -0.5em;
        background: $secondary;
      }
      div {
        background: $black;
        color: $white;
        position: relative;
        z-index: 1;
        padding: 0.3em;
      }
    }

    &__back {
      display: none;
    }
  }
}
.projects-grid {
  @media (min-width: $lg) {
    z-index: 6;
    position: relative;
    &--details-visible {
      .project--details-hidden {
        opacity: 0;
        pointer-events: none;
      }
    }
  }
}
</style>
