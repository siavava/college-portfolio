<template lang="pug">
PanelMulti
  PanelMenu(:title="title" :label="subtitle" storage-key="panel:experience-nav" :depth="0")
    PanelEntry(
      :active="activeGroup === 'work'"
      @select="selectGroup('work')"
    ) {{ workLabel }}
    PanelEntry(
      :active="activeGroup === 'education'"
      @select="selectGroup('education')"
    ) {{ educationLabel }}

  Transition(name="panel" mode="out-in")
    PanelMenu(
      v-if="activeGroup"
      :key="activeGroup"
      :title="activeGroup === 'work' ? workLabel : educationLabel"
      :label="entryCount(groupEntries.length)"
      :depth="1"
      storage-key="panel:experience-list"
      @back="selectGroup(activeGroup)"
    )
      PanelEntry(
        v-for="entry in groupEntries"
        :key="entry.path"
        :active="selectedItem?.path === entry.path"
        :meta="`${entry.start} \u2014 ${entry.end}`"
        compact
        @select="selectItem(entry)"
      ) {{ entry.title }} at {{ orgName(entry) }}

  Transition(name="panel" mode="out-in")
    PanelDetail(
      v-if="selectedItem"
      :key="selectedItem.path"
      @close="selectedItem = null"
    )
      .detail-date {{ selectedItem.start }} &mdash; {{ selectedItem.end }}
      h2.detail-title {{ selectedItem.title }}
      .detail-org
        a.org-link(
          :href="selectedItem.url"
          target="_blank"
          rel="noopener noreferrer"
        ) {{ orgName(selectedItem) }}
        span.detail-location(v-if="selectedItem.location") &middot; {{ selectedItem.location }}
      .detail-body
        ContentRenderer(:value="selectedItem")
</template>

<script lang="ts" setup>
const { title, subtitle, work: workLabel, education: educationLabel, entryCount } = labels().experience

const { data: jobsData } = await useAsyncData(
  "all-jobs",
  () => queryCollection("jobs").order("date", "DESC").all(),
)

const { data: educationData } = await useAsyncData(
  "all-education",
  () => queryCollection("education").order("date", "DESC").all(),
)

const jobs = computed(() => jobsData.value || [])
const education = computed(() => educationData.value || [])

const { activeGroup, selectedItem, selectGroup, selectItem } = usePanelSelection()

const groupEntries = computed(() => {
  if (activeGroup.value === "work") return jobs.value
  if (activeGroup.value === "education") return education.value
  return []
})

const orgName = (entry: { company?: string, school?: string }) =>
  entry.company || entry.school || ""
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.detail-org
  margin-bottom: 1.5em

.org-link
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("m")
  color: var(--lightest-foreground)
  text-decoration: underline
  text-underline-offset: 3px
  text-decoration-color: var(--foreground)

  &:hover
    text-decoration-color: var(--lightest-foreground)

.detail-location
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("s")
  color: var(--foreground)
  margin-left: 0.25em
</style>
