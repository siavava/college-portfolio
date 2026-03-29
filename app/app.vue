<template lang="pug">
NuxtLayout
  NuxtPage
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
})

useServerSeoMeta({
  ogSiteName: "Amittai",
})
</script>
