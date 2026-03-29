<template>
  <section class="education">
    <h4 class="section-heading" id="education">
      Education
    </h4>
    <div class="entries">
      <div
        v-for="experience, i in experiences"
        :key="i"
        class="entry"
      >
        <div class="entry-date">
          <span>{{ experience.start }}</span>
          <span> &mdash; </span>
          <span>{{ experience.end }}</span>
        </div>
        <div class="entry-content">
          <h3 class="entry-title">
            <ProseA
              :href="experience.url"
              fancy
              bold
            >
              {{ experience.title }}
              <span class="entry-org">
                at {{ experience.school }}
              </span>
            </ProseA>
          </h3>
          <ContentRenderer
            class="entry-description"
            :value="experience"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { path } = useRoute()

const { data: experiencesData } = await useAsyncData(
  `education-data-${path}`,
  async () => {
    const _expData = await queryCollection("education")
      .order("date", "DESC")
      .all()
    return _expData
  },
)

const experiences = experiencesData.value || []
</script>

<script lang="ts">
export default {
  name: "Education",
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
