<template lang="pug">
section#projects
  h2.archive-title#projects Projects Archive

  .project-category
    h4.category-title#featured Featured
    .project(v-for="project, i in featuredProjects" :key="i")
      .range {{ new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "numeric" }) }}
      .project-content
        div
          ProseH2(bold)
            ProseA(v-if="project?.url" :href="project.url" fancy bold) {{ project.title }}
            span(v-else) {{ project.title }}
          .project-description
            ContentRenderer(:value="project")
        .project-footer
          .project-links
            NuxtLink.link(v-if="project.repo" :to="project.repo" aria-label="GitHub Link")
              Icon(type="GitHub")
          ul.project-tech-list(v-if="project.tech")
            li.project-tech-item(v-for="(tech, techIndex) in project?.tech" :key="techIndex")
              StyledButton#tech-link(href="") {{ tech }}

  .project-category(v-for="category, index in sortedCategories" :key="index")
    h4.category-title(:id="category[0].replace(' ', '-')") {{ category[0] }}
    .project(v-for="project, i in category[1]" :key="i")
      .range {{ new Date(project.date).toLocaleDateString("en-US", { year: "numeric", month: "numeric" }) }}
      .project-content
        div
          ProseH2(bold)
            ProseA(v-if="project?.url" :href="project.url" fancy bold) {{ project.title }}
            span(v-else) {{ project.title }}
          // template(v-if="hasCompany(project)")
            span.project-company(v-if="hasCompany(project)") &nbsp;@&nbsp;
            NuxtLink(v-if="project.company.url" :to="project.company.url") {{ project.company.name }}
          .project-description
            ContentRenderer(:value="project")
        .project-footer
          .project-links
            NuxtLink.link(v-if="project.repo" :to="project.repo" aria-label="GitHub Link")
              Icon(type="GitHub")
          ul.project-tech-list(v-if="project.tech")
            li.project-tech-item(v-for="(tech, techIndex) in project?.tech" :key="techIndex")
              StyledButton#tech-link {{ tech }}
</template>

<script lang="ts" setup>
import type { ProjectsCollectionItem } from '@nuxt/content'

// // @ts-ignore
// // eslint-disable-next-line import/no-unresolved
// import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types"

const hasCompany = (project: any) => typeof project.company !== "undefined"

const { path } = useRoute()
// read 'featured projects' data
const { data } = await useAsyncData(
  `featured-projects-data-${path}`,
  async () => {
    const _projectsData = await queryCollection("projects")
      .order("date", "DESC")
      .all()
    return _projectsData
  },
)

const _projects = data.value || []
const categorized = new Map<string, ProjectsCollectionItem[]>()
_projects.forEach((project) => {
  const subcategory = project.tag || "misc"
  if (categorized.has(subcategory)) {
    categorized.get(subcategory)?.push(project)
  } else {
    categorized.set(subcategory, [project])
  }
})

// sort by date
categorized.forEach((projects, _) => {
  projects.sort((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate.getTime() - aDate.getTime()
  })
})

// sort categories by latest date
const sortedCategories = Array.from(categorized.entries()).sort(
  (a, b) => {
    const aDate = new Date(a[1][0].date)
    const bDate = new Date(b[1][0].date)
    return bDate.getTime() - aDate.getTime()
  },
)

// get featured projects
const { data: featuredData } = await useAsyncData(
  "archive-all-projects-data",
  async () => {
    const _projectsData = queryCollection("projects")
      .where("featured", "=", "1")
      .order("date", "DESC")
      .all()
    return _projectsData
  },
)

const featuredProjects = featuredData.value || []

</script>

<style lang="sass" scoped>
@use "@/styles/transitions"
@use "@/styles/typography"
@use "@/styles/mixins"
@use "@/styles/colors"

.archive-title
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 1.5em
  font-weight: 500
  letter-spacing: -0.5px
  color: var(--lightest-foreground)
  margin-bottom: 1em

.project-category
  padding-top: 80px

  &:is(:last-of-type)
    margin-bottom: 80px

.category-title
  text-transform: capitalize
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

.project-title
  font-weight: 600

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

      &:not(:last-child)::after
        margin: 0 0.5em

      .dark-mode &
        border: 0.5px transparent
        background: var(--light-background)

.archive-link
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("m")
  margin: 80px 0
  width: fit-content
</style>
