<template>
  <div class="dictionary-page">
    <h1 class="word">{{ profile.name }}</h1>
    <div class="pronunciation">{{ profile.pronunciation }}</div>

    <div class="part-of-speech">{{ profile.partOfSpeech }}</div>

    <div class="definitions">
      <ContentRenderer :value="profile" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: profile } = await useAsyncData(
  'profile-about',
  () => queryCollection("profile").first(),
)
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.dictionary-page
  padding: 60px 40px
  max-width: 560px

  @media screen and (max-width: 768px)
    padding: 40px 20px

.word
  font-family: typography.font("serif"), serif
  font-size: 2.8em
  font-weight: 400
  color: var(--lightest-foreground)
  letter-spacing: -0.5px
  line-height: 1.1
  margin-bottom: 0.15em

  @media screen and (max-width: 768px)
    font-size: 2.2em

.pronunciation
  font-family: typography.font("serif"), serif
  font-style: italic
  font-size: typography.font-size("s")
  color: var(--foreground)
  margin-bottom: 2em

.part-of-speech
  font-family: typography.font("serif"), serif
  font-style: italic
  font-size: typography.font-size("m")
  color: var(--lightest-foreground)
  margin-bottom: 1em

.definitions
  margin-bottom: 2.5em
  font-family: typography.font("serif"), serif
  font-size: typography.font-size("m")
  color: var(--lightest-foreground)
  line-height: 1.7

  :deep(.see-also)
    margin-top: 2em
    font-size: typography.font-size("xxs")
    font-family: typography.font("sans-serif"), sans-serif
    color: var(--foreground)
    display: flex
    gap: 0.8em
    align-items: baseline
    flex-wrap: wrap

    em
      font-family: typography.font("serif"), serif
      font-size: typography.font-size("xs")

</style>
