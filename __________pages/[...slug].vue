<template>
  <ContentRenderer
    v-if="page?.body"
    :value="page"
  />
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

const route = useRoute()

// definePageMeta({
//   layout: "article",
// })

const { data: page } = await useAsyncData(
  withoutTrailingSlash(route.path),
  async () => {
    const res = await queryCollection("pages")
      .path(withoutTrailingSlash(route.path))
      .first();

    console.log("Page data:", res)
    return res;

  },
)

useHead({
  titleTemplate: "%s | alt",
  title: page.value?.title,
  meta: [
    {
      // hid: "description",
      name: "description",
      content: page.value?.description || "",
    },
    {
      // hid: "og:description",
      name: "og:description",
      // removed excerpt
      content: page.value?.description || "",
    },
    {
      // hid: "og:title",
      
      name: "og:title",
      content: `${page.value?.title} | alt`,
    },
  ],
})

useSeoMeta({
  titleTemplate: "%s | alt",
  title: page.value?.title,
  ogTitle: `${page.value?.title} | alt`,
  description: page.value?.description || "",
  ogDescription: page.value?.description || "",
})
</script>
