<template>
  <section class="jobs">
    <h4 class="section-heading" id="work">
      Experience
    </h4>
    <div class="entries">
      <div
        v-for="job, i in jobs"
        :key="i"
        class="entry"
      >
        <div class="entry-date">
          <span>{{ job.start }}</span>
          <span> &mdash; </span>
          <span>{{ job.end }}</span>
        </div>
        <div class="entry-content">
          <h3 class="entry-title">
            <ProseA
              :href="job.url"
              fancy
              bold
            >
              {{ job.title }}
              <span class="entry-org">
                at {{ job.company }}
              </span>
            </ProseA>
          </h3>
          <ContentRenderer
            class="entry-description"
            :value="job"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { path } = useRoute()

const { data: jobsData } = await useAsyncData(
  `jobs-data-${path}`,
  async () => {
    const _jobsData = await queryCollection("jobs")
      .order("date", "DESC")
      .all()
    return _jobsData
  },
)

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

.section-heading
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("xs")
  text-transform: uppercase
  letter-spacing: 0.1em
  color: var(--foreground)
  font-weight: 500
  margin-bottom: 2em

.entry
  @include mixins.split

  &
    margin-top: 3em

  &:first-child
    margin-top: 0

.entry-date
  font-size: typography.font-size("xs")
  color: var(--foreground)

.entry-org
  font-weight: 400
  color: var(--foreground)
</style>
