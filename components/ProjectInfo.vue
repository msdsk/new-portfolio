<template>
  <div>
    <div class="project" v-for="(project, i) in projects" :key="project.title">
      <paralax :speed="i">
        <div class="project__content">
          <div class="project__image"><img :src="project.image" alt="" /></div>
          <div class="project__description">
            <h3>{{ project.title }}</h3>
            <nuxt-content :document="project" />
            <a v-if="project.link" :href="project.link" target="_blank">See it live →</a>
          </div>
        </div>
      </paralax>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projects: Array,
  },
}
</script>

<style lang="scss">
.project {
  @media (min-width: $lg) {
    width: 80%;

    &__content {
      display: flex;
      align-items: center;
    }

    &__image {
      flex-shrink: 0;
      width: 10em;
      height: 10em;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        pointer-events: none;
        background: $secondary;
        width: 100%;
        height: 100%;
        top: $gap*0.5;
        left: -$gap*0.5;
      }

      img {
        background: $black;
        object-fit: contain;
        padding: 1em;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
    }

    &__description {
      padding-left: $gap;
      font-size: 0.7em;
    }

    &:nth-child(4n + 1) {
      width: 100%;
    }

    &:nth-child(4n + 2) {
      margin-left: 20%;
    }

    &:nth-child(4n + 3) {
      margin-left: 0%;
    }

    &:nth-child(4n) {
      margin-left: 10%;
    }
  }

  @media (max-width: $md) {
    &__description {
      margin-bottom: $gap;
      margin-top: $gap;
    }
  }
}
</style>
