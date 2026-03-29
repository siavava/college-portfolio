<template>
  <PanelMulti>
    <PanelNav :title="title" :subtitle="subtitle">
      <PanelEntry
        v-if="featuredProjects.length"
        :active="activeGroup === '__featured__'"
        @select="selectGroup('__featured__')"
      >{{ featured }}</PanelEntry>
      <PanelEntry
        v-for="[category] in sortedCategories"
        :key="category"
        :active="activeGroup === category"
        @select="selectGroup(category)"
      >{{ toTitleCase(category) }}</PanelEntry>
    </PanelNav>

    <transition name="panel" mode="out-in">
      <PanelList
        v-if="activeGroup"
        :key="activeGroup"
        :title="activeGroup === '__featured__' ? featured : toTitleCase(activeGroup)"
        :count="projectCount(groupProjects.length)"
      >
        <PanelEntry
          v-for="project in groupProjects"
          :key="project.path"
          :active="selectedItem?.path === project.path"
          :meta="formatDate(project.date)"
          compact
          @select="selectItem(project)"
        >{{ project.title }}</PanelEntry>
      </PanelList>
    </transition>

    <transition name="panel" mode="out-in">
      <PanelDetail
        v-if="selectedItem"
        :key="selectedItem.path"
        @close="selectedItem = null"
      >
        <div class="detail-date">{{ formatDate(selectedItem.date) }}</div>
        <h2 class="detail-title">{{ selectedItem.title }}</h2>

        <div class="detail-body">
          <ContentRenderer :value="selectedItem" />
        </div>

        <div class="detail-meta" v-if="selectedItem.tech?.length || selectedItem.repo || selectedItem.url">
          <div v-if="selectedItem.tech?.length" class="tech-list">
            <span v-for="tech in selectedItem.tech" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div class="detail-links">
            <a v-if="selectedItem.repo" :href="selectedItem.repo" target="_blank" rel="noopener noreferrer" class="detail-link">GitHub &#8599;</a>
            <a v-if="selectedItem.url" :href="selectedItem.url" target="_blank" rel="noopener noreferrer" class="detail-link">Visit &#8599;</a>
          </div>
        </div>
      </PanelDetail>
    </transition>
  </PanelMulti>
</template>

<script lang="ts" setup>
const { title, subtitle, featured, projectCount } = labels().projects

const { data } = await useAsyncData(
  'all-projects',
  () => queryCollection("projects").order("date", "DESC").all(),
)

const projects = computed(() => data.value || [])
const featuredProjects = computed(() => projects.value.filter(p => p.featured))

const categorized = computed(() => {
  const map = new Map<string, any[]>()
  projects.value.forEach((project) => {
    const cat = project.tag || "misc"
    if (map.has(cat)) {
      map.get(cat)?.push(project)
    } else {
      map.set(cat, [project])
    }
  })
  return map
})

const sortedCategories = computed(() => {
  return Array.from(categorized.value.entries()).sort((a, b) => {
    const aDate = new Date(a[1][0].date)
    const bDate = new Date(b[1][0].date)
    return bDate.getTime() - aDate.getTime()
  })
})

const { activeGroup, selectedItem, selectGroup, selectItem } = usePanelSelection()

const groupProjects = computed(() => {
  if (!activeGroup.value) return []
  if (activeGroup.value === '__featured__') return featuredProjects.value
  return categorized.value.get(activeGroup.value) || []
})

const formatDate = (date: string) => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${month}-${day}-${year}`
}

const toTitleCase = (str: string) => {
  return str.replace(
    /(^|\b(?!(and?|at?|the|for|to|but|by)\b))\w+/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

// Projects-specific detail overrides
.detail-title
  margin-bottom: 1.5em
  padding-bottom: 1em
  border-bottom: 0.5px solid var(--border-color)

.detail-body
  margin-bottom: 2em

.detail-meta
  border-top: 0.5px solid var(--border-color)
  padding-top: 1em

.tech-list
  display: flex
  flex-wrap: wrap
  gap: 0.5em
  margin-bottom: 1em

.tech-tag
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  color: var(--foreground)
  border: 0.5px solid var(--border-color)
  padding: 3px 10px
  border-radius: 20px

.detail-links
  display: flex
  gap: 1em

.detail-link
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("s")
  color: var(--lightest-foreground)
  text-decoration: underline
  text-underline-offset: 3px
  text-decoration-color: var(--foreground)
  transition: text-decoration-color 0.2s ease

  &:hover
    text-decoration-color: var(--lightest-foreground)
</style>
