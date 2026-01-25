<template>
  <section class="about">
    <ProseH4 id="about">
      About
    </ProseH4>

    <ContentRenderer
      :value="profile"
      class="doc"
    />
  </section>
</template>

<script lang="ts" setup>

// import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types"
const { path } = useRoute()

const { data: profile } = await useAsyncData(
  `profile-${path}`,
  async () => {
    return queryCollection("profile")
      .first();
  },
)
</script>

<style lang="sass">
.doc
  margin-top: 4em
</style>
