<template>
  <section>
    <h4 class="section-heading" id="contact">
      Contact
    </h4>
    <div class="contacts-list">
      <div
        v-for="link, i in contact.links"
        :key="i"
        class="contact-item"
      >
        <div class="contact-name">
          {{ link.name }}
        </div>
        <div class="contact-value">
          <hr class="separator" />
          <ProseA
            v-if="link.url"
            :href="link.url"
            class="link"
            fancy
          >
            <span>
              {{ link.username }}
            </span>
          </ProseA>
          <span
            v-else
            class="link"
          >
            {{ link.username }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { path } = useRoute()

const { data: contact } = await useAsyncData(
  `contact-data-${path}`,
  async () => {
    const _contactData = await queryCollection("contact")
      .first()
    return _contactData
  },
)
</script>

<style lang="sass" scoped>
@use "@/styles/mixins"
@use "@/styles/typography"

.section-heading
  font-family: typography.font("sans-serif"), sans-serif
  font-size: typography.font-size("xs")
  text-transform: uppercase
  letter-spacing: 0.1em
  color: var(--foreground)
  font-weight: 500
  margin-bottom: 2em

.contacts-list
  margin-top: 0

.contact-item
  @include mixins.split

  &
    margin-bottom: 0.5em !important
    text-transform: lowercase
    font-family: typography.font("serif"), serif

.link
  color: var(--lightest-foreground)

.contact-value
  display: flex
  justify-content: flex-end
  gap: 1em

  @media screen and (max-width: 540px)
    justify-content: flex-start

  .separator
    flex-grow: 1
    align-self: stretch
    border: none
    border-top: 1px dashed var(--border-color)
    height: 0.01em
    margin: auto

    @media screen and (max-width: 540px)
      display: none
</style>
