<template>
  <div>
    <main-menu />
    <div class="relative" id="top">
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
          <a href="#cv" v-scroll-to="'#cv'" class="btn intro__btn margin-top"
            >See my cv</a
          >
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="section-background"></div>
      <div class="container center-width">
        <nuxt-content :document="intro" />
      </div>
      <div class="container projects" id="web-dev">
        <project-info :projects="orderedProjects" />
      </div>
    </div>
    <div class="container center-width container--high unbulleted-list-inside">
      <nuxt-content :document="other_web" />
    </div>
    <div class="container center-width container--high" id="graphic-design">
      <nuxt-content :document="graphic_design" />
      <div class="grid design-grid">
        <div class="col col--sm-0 col--md-2"></div>
        <paralax class="col col--md-10 design-grid--first" :speed="2">
          <img src="/img/projects/brochure.jpg" alt="Brochure" />
        </paralax>
        <paralax class="col col--md-6" :speed="3">
          <img src="/img/projects/plakat.png" alt="Poster" />
        </paralax>
        <div class="col col--sm-0 col--md-6"></div>
        <div class="col col--sm-0 col--md-1"></div>
        <paralax class="col col--md-11" :speed="1">
          <img src="/img/projects/folder.jpg" alt="Folder" />
        </paralax>
        <div class="col col--sm-0 col--md-12"></div>
        <div class="col col--sm-0 col--md-4"></div>
        <paralax class="col col--md-5" :speed="2">
          <img src="/img/projects/ulotka-kobiety.jpg" alt="Leaflet" />
        </paralax>
      </div>
    </div>
    <div class="relative">
      <div class="section-background"></div>
      <div class="container center-width container--high" id="cv">
        <nuxt-content :document="cv" class="cv unbulleted-list-inside" />
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
  mounted() {
    console.log(`


██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗       ███╗   ███╗ █████╗ ██╗   ██╗██████╗ ███████╗██████╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝       ████╗ ████║██╔══██╗╚██╗ ██╔╝██╔══██╗██╔════╝╚════██╗
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗         ██╔████╔██║███████║ ╚████╔╝ ██████╔╝█████╗    ▄███╔╝
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝         ██║╚██╔╝██║██╔══██║  ╚██╔╝  ██╔══██╗██╔══╝    ▀▀══╝
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗▄█╗    ██║ ╚═╝ ██║██║  ██║   ██║   ██████╔╝███████╗  ██╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚══════╝  ╚═╝



`)
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
    background: $black;
    padding: 0.1em 0.2em;
    box-decoration-break: clone;
  }
  h1 {
    line-height: 1.5em;
  }
  h2 {
    line-height: 1.8em;
  }

  &__btn {
    background: $white;
    border: 5px solid $black;
    color: $black;
    font-family: $font-family-header;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 1.2em;
    &:hover {
      color: $black;
      background: $secondary;
    }
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
      width: 100%;
      height: 100vh;
      min-width: 0;
      left: 0;
      top: 0;
    }
  }
}

.unbulleted-list-inside {
  ul {
    list-style: none;
    margin: 0;
  }
  li {
    display: inline;
    background: $black;
    color: $white;
    padding: 0.15em 0.5em;
    box-decoration-break: clone;
    line-height: 2em;
    text-align: center;
    a {
      color: $primary;
      transition: opacity 0.2s;
      &:hover {
        opacity: 0.7;
      }
    }
    &:nth-child(2n) {
      background: $secondary;
      color: $black;
      a {
        color: $white;
      }
    }
  }
}

.design-grid {
  pointer-events: none;
  @media (min-width: $md) {
    margin-bottom: -20%;
    .paralax {
      transition: opacity 0.2s, filter 0.2s;
      img {
        pointer-events: all;
      }
      &:not(.design-grid--first) {
        margin-top: -40%;
      }
    }
    // &:hover {
    //   .paralax:not(:hover) {
    //     opacity: 1;
    //     filter: saturate(0.3);
    //   }
    //   .paralax:hover {
    //     z-index: 1;
    //   }
    // }
  }
}
</style>
