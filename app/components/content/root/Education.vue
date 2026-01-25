<template>
  <section class="jobs">
    <ProseH4 id="education">
      Education
    </ProseH4>
    <div class="jobs-list">
      <div
        v-for="experience, i in experiences"
        :key="i"
        class="work-item"
      >
        <div class="range">
          <span class="date">{{ experience.start }}</span>
          <span class="date"> &mdash; </span>
          <span class="date"> {{ experience.end }} </span>
        </div>
        <div class="work-info">
          <ProseH2>
            <ProseA
              :href="experience.url"
              class="link"
              fancy
              bold
            >
              <span>
                {{ experience.title }}
                <span class="company">
                  at
                  {{ experience.school }}
                </span>
              </span>
            </ProseA>
          </ProseH2>

          <ContentRenderer
            class="jobs-doc"
            :value="experience"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
// import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types"

const { path } = useRoute()

// read 'job-info' data from Markdown files
const { data: experiencesData } = await useAsyncData(
  `education-data-${path}`,
  async () => {
    const _expData = await queryCollection("education")
      .order("date", "DESC")
      .all()
    return _expData
  },
)

// parse job info and store in an array, sorted by date
// const jobs = Array<ParsedJobInfo>();
const experiences = experiencesData.value || []

</script>

<script lang="ts">
export default {
  name: "Education",
}
</script>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/mixins"
@use "@/styles/colors"

.jobs-doc
  .prose-table
    font-size: typography.font-size(xs) !important

.work-item

  @include mixins.split

  &
    // display: flex
    // flex-direction: row
    font-size: typography.font-size(m)
    margin-top: 4em

</style>
