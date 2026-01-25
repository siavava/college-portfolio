<template>
  <section>
    <div class="profile-info">
      <div class="profile-text">
        <div class="name">
          <h1>
            {{ profile.name }}
          </h1>
        </div>
        <p
          class="hero-callout"
          v-html="callout" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
// import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types"
const { path } = useRoute()
const { data: profile } = await useAsyncData(
  `hero-data-${path}`,
  async () => {
    return await queryCollection("profile")
      .first()
  },
)

const dropNewLines = (title: string) => title
  .replace(/\\/gm, "?.?")
  .replace(/\?\.\?n/g, "\n")
  .replace(/\?\.\?/g, "\\")

const callout = computed(() => dropNewLines(profile.value.callout || ""))
</script>

<script lang="ts">
export default {
  name: "Hero",
}
</script>

<style lang="sass" scoped>
@use "@/styles/mixins"
@use "@/styles/colors"
@use "@/styles/typography"
@use "@/styles/geometry"

.profile-info
  width: min(400px, 90svw)
  display: flex
  flex-direction: row
  align-content: center


  margin-top: 100px

  .profile-image
    width: 100px
    aspect-ratio: 1/1
    border-radius: 50%
    overflow: hidden

    // maintain aspect ratio
    object-fit: cover

  .profile-text
    height: auto
    display: flex
    flex-direction: column
    margin-top: 60px
    gap: 140px

    .name
      display: flex
      flex-direction: column

      & > h1
        font-weight: 600
        letter-spacing: -2px
        margin: 0
        font-size: 30px
      
        &:first-of-type
          padding-top: 20px

    .hero-callout
      font-weight: 500
      margin: 0.5em 0
      color: var(--lightest-foreground)
      line-height: 1.5
      font-size: 20px

      @include mixins.underline

      @media screen and (max-width: 600px)
        font-size: 18px

</style>
