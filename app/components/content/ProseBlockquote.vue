<template lang="pug">
blockquote.prose-blockquote
  slot
  .author(v-if="author")
    .name-links-container(v-if="author.name")
      ProseA.name-link.author(:to="author.link" :fancy="!author.writing?.name")
        span.author-name {{ author.name }}
      span.writing-separator(v-if="author.writing") {{ ",\u00A0" }}
      ProseA.name-link.writing(v-if="author.writing" :to="author.writing.link" fancy bare)
        span.author-name {{ author.writing.name }}
    .name(v-else) {{ author.name }}
    ul.tag-list(v-if="tags")
      li.tag-item(v-for="tag in tags" :key="tag") {{ tag }}
</template>

<script lang="ts" setup>
defineProps<{
  author?: {
    name: string
    link: string
    writing?: {
      name: string
      link: string
    }
  },
  link?: string
  tags?: string[]
}>()
</script>

<style lang="sass">
@use "@/styles/typography"
@use "@/styles/colors"

.prose-blockquote
  width: calc(100% - 1rem)
  position: relative
  margin: 2rem 0 0 0
  padding-left: 1em
  border-left: 0.5px solid // var(--border-color)

  &:not(:last-child)
    margin-bottom: 1.5rem

  .author
    .name-links-container
      display: flex

      .name-link.writing
          // italicize
          font-style: italic
</style>
