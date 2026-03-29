<template>
  <section id="projects">
    <h4 class="section-heading" id="projects">
      Featured Projects
    </h4>
    <div class="projects-list">
      <div
        v-for="project, i in projects"
        :key="i"
        class="project"
      >
        <div class="project-date">
          {{
            new Date(project.date)
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
              })
          }}
        </div>
        <div class="project-content">
          <div>
            <h3 class="project-title">
              <ProseA
                v-if="project?.url"
                :href="project.url"
                fancy
                bold
              >
                {{ project.title }}
              </ProseA>
              <span v-else>
                {{ project.title }}
              </span>
            </h3>
            <div class="project-description">
              <ContentRenderer :value="project" />
            </div>
          </div>
          <div class="project-footer">
            <div class="project-links">
              <NuxtLink
                v-if="project.repo"
                :to="project.repo"
                aria-label="GitHub Link"
                class="link"
              >
                <Icon type="GitHub" />
              </NuxtLink>
            </div>
            <ul
              v-if="project.tech"
              class="project-tech-list"
            >
              <li
                v-for="(tech, techIndex) in project?.tech"
                :key="techIndex"
                class="project-tech-item"
              >
                <StyledButton
                  id="tech-link"
                  href=""
                >
                  {{ tech }}
                </StyledButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="archive-link" v-if="archive">
      <ProseA
        href="/archive"
        fancy
      >
        view all projects &#8599;
      </ProseA>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Featured",
}
</script>

<script lang="ts" setup>
const props = defineProps({
  archive: {
    type: Boolean,
    default: false,
  }
})

const { path } = useRoute()

const { data } = await useAsyncData(
  `featured-projects-${path}`,
  async () => {
    return await queryCollection("projects")
      .where("featured", "=", "1")
      .order("date", "DESC")
      .all()
  },
)

const projects = data.value || []
</script>

<style lang="sass" scoped>
@use "@/styles/typography"
@use "@/styles/mixins"

.section-heading
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("xs")
  text-transform: uppercase
  letter-spacing: 0.1em
  color: var(--foreground)
  font-weight: 500
  margin-bottom: 2em

.project
  @include mixins.split

  &:not(:first-of-type)
    margin-top: 3em

.project-date
  font-size: typography.font-size("xs")
  color: var(--foreground)

.project-footer
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center

  .project-links
    height: 100%
    display: inline-flex
    justify-content: flex-start

    .link
      height: 1.8em
      aspect-ratio: 1/1

      svg
        max-height: 100% !important
        aspect-ratio: 1/1
        width: auto

  .project-tech-list
    display: inline-flex
    gap: 0.5em

    .project-tech-item
      font-size: typography.font-size(xs)
      border-radius: 1em
      border: 0.5px solid var(--border-color)

      .dark-mode &
        border: 0.5px transparent
        background: var(--light-background)

      &:not(:last-child)::after
        margin: 0 0.5em

.archive-link
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("s")
  margin: 3em 0
  width: fit-content
</style>
