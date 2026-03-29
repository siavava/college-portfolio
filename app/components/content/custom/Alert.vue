<template lang="pug">
.alert-container(:class="type")
  .title-container
    span.title {{ title || type }}
  slot(id="alert-content")
</template>

<script lang="ts">
export default {
  name: "Alert",
  props: {
    type: {
      type: String,
      default: "info",
      validator: (value: string) => [
        "info", "success", "error", "warning", "critical",
      ].includes(value),
    },
    title: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="sass">
@use "@/styles/colors"
@use "@/styles/typography"

.alert-container

  margin: 1em 0
  padding: 1rem
  border-radius: 0.5rem
  position: relative

  border: 0.5px solid var(--border-color)

  .prose-ul
    font-size: inherit !important

    li::before
      color: inherit !important

  .alert-icon
    width: 1.5em
    height: 1.5em
    margin-right: 0.5em
    padding-bottom: 0.25em

  .title-container
    margin-bottom: 1em
    display: flex
    flex-direction: row

    .title
      font-weight: 600
      font-family: typography.font("monospace")
      text-transform: uppercase
      font-size: 0.8em
      margin: 0em 0 0.5em 0
      border-bottom: 1px dotted
      opacity: 0.5
      width: fit-content

  &:hover
    & > .title-container > .title
      opacity: 1

  &.info
    background-color: var(--info-background) !important
    color: var(--info-foreground) !important

    & > .paragraph
      color: var(--info-foreground) !important

  &.success
    background-color: var(--success-background)
    color: var(--success-foreground)

    & > .paragraph
      color: var(--success-foreground) !important

  &.error
    background-color: var(--error-background) !important
    color: var(--error-foreground) !important

    & > .paragraph
      color: var(--error-foreground) !important

  &.warning
    background-color: var(--warning-background)
    color: var(--warning-foreground)

    & > .paragraph
      color: var(--warning-foreground) !important

  &.critical
    background-color: var(--critical-background) !important
    color: var(--critical-foreground) !important

    & > .paragraph
      color: var(--critical-foreground) !important

  & > .paragraph
    &:is(:last-of-type)
      padding-bottom: 5em !important
      background: yellow !important

</style>
