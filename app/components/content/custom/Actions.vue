<template lang="pug">
.actions-container
  button#color-mode-button.color-mode-button(aria-label="Toggle color mode" @click="toggleColorMode")
    .icon
      svg(viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg")
        defs
          linearGradient#a(
            x1="814.98" x2="881.02"
            y1="235.19" y2="235.19"
            gradientTransform="matrix(1.3745 0 0 1.3633 -317.33 -85.443)"
            gradientUnits="userSpaceOnUse"
          )
            stop(stop-color="var(--foreground)" offset="0")
            stop(stop-color="var(--background)" offset="1")
        path(
          d="M878.98 235.19c.012 17.094-13.851 30.957-30.957 30.957s-30.969-13.863-30.957-30.957c-.012-17.094 13.851-30.957 30.957-30.957s30.969 13.863 30.957 30.957z"
          color="#000000"
          fill="url(#a)"
          stroke="var(--foreground)"
          stroke-width="5.6502"
          transform="matrix(.17626 0 0 .17771 -141.52 -33.795)"
        )
</template>

<script setup>
const colorMode = useColorMode()

const colorModes = [
  "light",
  "dark",
]

const toggleColorMode = () => {
  const currentIndex = colorModes.indexOf(colorMode.preference)
  const nextIndex = (currentIndex + 1) % colorModes.length
  colorMode.preference = colorModes[nextIndex]
}
</script>

<style lang="sass" scoped>
@use "@/styles/typography"

.actions-container
  display: flex
  align-items: center

.color-mode-button
  color: var(--lightest-foreground)
  background: transparent
  border: none
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  width: 20px
  height: 20px
  transition: opacity 0.2s ease

  &:hover
    opacity: 0.7

  &:focus
    outline: none

.icon
  height: 18px
  aspect-ratio: 1/1

  svg
    width: 100% !important
    height: 100% !important
</style>
