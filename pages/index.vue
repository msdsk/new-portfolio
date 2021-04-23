<template>
  <div>
    <div class="relative">
      <div
        class="container container--high center-width intro margin-bottom-big"
      >
        <img src="/img/me.jpg" class="intro__me" />
        <div class="intro__above">
          <h1>
            <span class="intro__span" v-html="intro.title"></span>
          </h1>
          <h2 class="subtitle">
            <span class="intro__span">{{ intro.subtitle }}</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="section-background"></div>
      <div class="container center-width projects">
        <nuxt-content :document="intro" />
        <project-info
          v-for="project in orderedProjects"
          :key="project.slug"
          :project="project"
        />
      </div>
    </div>
    <div class="container center-width container__high">
      <nuxt-content :document="other_web" />
    </div>
    <div class="relative">
      <div class="section-background"></div>
      <div class="container center-width container__high">
        <nuxt-content :document="cv" class="cv" />
      </div>
    </div>
  </div>
</template>

<script>
import DataObjectParser from 'dataobject-parser'
import merge from 'deepmerge'
export default {
  data() {
    return {
      intro: {},
    }
  },
  computed: {
    orderedProjects() {
      return Object.values(this.projects).sort((a, b) => a.order - b.order)
    },
  },
  async asyncData({ $content }) {
    const content = await $content('index', { deep: true })
      .fetch()
      .then((res) =>
        res.reduce((acc, file) => {
          return merge(
            acc,
            new DataObjectParser().set(file.path.replace('/', '.'), file).data()
          )
        }, {})
      )
      .catch(console.error)
    return { ...content.index }
  },
}
</script>

<style lang="scss">
.intro {
  background: $secondary;

  &__above {
    position: relative;
    z-index: 1;
    color: #fff;
    text-align: right;
    max-width: 35em;
    margin-left: auto;
  }
  &__me {
    position: absolute;
    height: 80%;
    min-width: 25em;
    object-fit: cover;
    mix-blend-mode: multiply;
    left: 0;
    object-position: center center;
  }
  &__span {
    background: #000;
    padding: 0.1em 0.2em;
    box-decoration-break: clone;
  }
  h1 {
    line-height: 1.5em;
  }
  h2 {
    line-height: 1.8em;
  }

  @media (min-width: $lg) {
    margin-top: $gap;
  }

  @media (max-width: $lg) {
    &__above {
      font-size: 0.8em;
    }
  }

  @media (max-width: $md) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 4em;
    min-height: calc(100vh / 1.618);
    background-clip: content-box;
    padding: 2 * $gap-sm;
    &__above {
      font-size: 0.6em;
      margin: -2 * $gap-sm -2 * $gap-sm -4em;
    }
    &__me {
      // width: calc(100% - 3 * #{$gap});
      // height: calc(100% / 1.618);
      width: 100%;
      height: 100vh;
      min-width: 0;
      left: 0;
      top: 0;
    }
  }
}
</style>
