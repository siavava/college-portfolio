<template>
  <PanelMulti>
    <PanelNav :title="title" :subtitle="subtitle">
      <PanelEntry
        :active="activeGroup === 'work'"
        @select="selectGroup('work')"
      >{{ workLabel }}</PanelEntry>
      <PanelEntry
        :active="activeGroup === 'education'"
        @select="selectGroup('education')"
      >{{ educationLabel }}</PanelEntry>
    </PanelNav>

    <transition name="panel" mode="out-in">
      <PanelList
        v-if="activeGroup"
        :key="activeGroup"
        :title="activeGroup === 'work' ? workLabel : educationLabel"
        :count="entryCount(groupEntries.length)"
      >
        <PanelEntry
          v-for="entry in groupEntries"
          :key="entry.path"
          :active="selectedItem?.path === entry.path"
          :meta="`${entry.start} \u2014 ${entry.end}`"
          compact
          @select="selectItem(entry)"
        >{{ entry.title }} at {{ entry.company || entry.school }}</PanelEntry>
      </PanelList>
    </transition>

    <transition name="panel" mode="out-in">
      <PanelDetail
        v-if="selectedItem"
        :key="selectedItem.path"
        @close="selectedItem = null"
      >
        <div class="detail-date">{{ selectedItem.start }} &mdash; {{ selectedItem.end }}</div>
        <h2 class="detail-title">{{ selectedItem.title }}</h2>
        <div class="detail-org">
          <a
            :href="selectedItem.url"
            target="_blank"
            rel="noopener noreferrer"
            class="org-link"
          >{{ selectedItem.company || selectedItem.school }}</a>
          <span v-if="selectedItem.location" class="detail-location">&middot; {{ selectedItem.location }}</span>
        </div>
        <div class="detail-body">
          <ContentRenderer :value="selectedItem" />
        </div>
      </PanelDetail>
    </transition>
  </PanelMulti>
</template>

<script lang="ts" setup>
const { title, subtitle, work: workLabel, education: educationLabel, entryCount } = labels().experience

const { data: jobsData } = await useAsyncData(
  'all-jobs',
  () => queryCollection("jobs").order("date", "DESC").all(),
)

const { data: educationData } = await useAsyncData(
  'all-education',
  () => queryCollection("education").order("date", "DESC").all(),
)

const jobs = computed(() => jobsData.value || [])
const education = computed(() => educationData.value || [])

const { activeGroup, selectedItem, selectGroup, selectItem } = usePanelSelection()

const groupEntries = computed(() => {
  if (activeGroup.value === 'work') return jobs.value
  if (activeGroup.value === 'education') return education.value
  return []
})
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.detail-org
  margin-bottom: 1.5em
  padding-bottom: 1em
  border-bottom: 0.5px solid var(--border-color)

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
  margin-left: 0.5em
</style>
