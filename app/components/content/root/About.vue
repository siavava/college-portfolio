<template>
  <section class="about">
    <h4 class="section-heading" id="about">
      About
    </h4>

    <ContentRenderer
      :value="profile"
      class="about-content"
    />
  </section>
</template>

<script lang="ts" setup>
const { path } = useRoute()

const { data: profile } = await useAsyncData(
  `profile-${path}`,
  async () => {
    return queryCollection("profile")
      .first();
  },
)
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.section-heading
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("xs")
  text-transform: uppercase
  letter-spacing: 0.1em
  color: var(--foreground)
  font-weight: 500
  margin-bottom: 2em

.about-content
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("m")
  line-height: 1.7
  color: var(--foreground)
</style>
