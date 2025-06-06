<template>
  <section class="jobs">
    <ProseH4 id="work">
      Work Experience
    </ProseH4>
    <div class="jobs-list">
      <div
        v-for="job, i in jobs"
        :key="i"
        class="work-item"
      >
        <div class="range">
          <span class="date">{{ job.start }}</span>
          <span class="date"> &mdash; </span>
          <span class="date"> {{ job.end }} </span>
        </div>
        <div class="work-info">
          <ProseH2>
            <ProseA
              :href="job.url"
              class="link"
              fancy
              bold
            >
              <span>
                {{ job.title }}
                <span class="company">
                  at
                  {{ job.company }}
                </span>
              </span>
            </ProseA>
          </ProseH2>

          <ContentRenderer
            class="jobs-doc"
            :value="job"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// read 'job-info' data from Markdown files
const { data: jobsData } = await useAsyncData(
  `jobs-${useRoute().path}`,
  async () => {
    const _jobsData = await queryCollection("jobs")
      .order("date", "DESC")
      .all()
    return _jobsData
  },
)

// parse job info and store in an array, sorted by date
// const jobs = Array<ParsedJobInfo>();
const jobs = jobsData.value || []
</script>

<script lang="ts">
export default {
  name: "Jobs",
}
</script>

<style lang="sass" scoped>
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
    // flex-direction: 
    font-size: typography.font-size(m)
    margin-top: 4em

</style>
