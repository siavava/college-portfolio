<template>
  <div
    class="panel-entry"
    :class="{ active, compact }"
    @click="$emit('select')"
  >
    <div class="panel-entry-row">
      <span class="panel-entry-indicator" v-if="active">&rsaquo;</span>
      <span class="panel-entry-title">
        <slot />
        <span class="panel-entry-arrow">&#8599;</span>
      </span>
    </div>
    <div v-if="meta" class="panel-entry-meta">{{ meta }}</div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  active?: boolean
  meta?: string
  compact?: boolean
}>(), {
  active: false,
  compact: false,
})

defineEmits<{
  select: []
}>()
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.panel-entry
  padding: 10px 0
  cursor: pointer
  position: relative

  &:hover .panel-entry-title
    color: var(--lightest-foreground)

  &.active
    .panel-entry-title
      color: var(--lightest-foreground)
      font-weight: 400

.panel-entry-row
  display: flex
  align-items: baseline
  gap: 0.3em

.panel-entry-indicator
  position: absolute
  left: -16px
  color: var(--lightest-foreground)
  font-size: 14px
  font-weight: 400

.panel-entry-title
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("m")
  color: var(--light-foreground)
  transition: color 0.15s ease

  .compact &
    font-size: typography.font-size("s")

.panel-entry-arrow
  font-size: 11px
  color: var(--foreground)
  opacity: 0.4

.panel-entry-meta
  font-family: typography.font("sans-serif"), sans-serif
  font-size: 10px
  color: var(--foreground)
  opacity: 0.5
  margin-top: 2px
</style>
