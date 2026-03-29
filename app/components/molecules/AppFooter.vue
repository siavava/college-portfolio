<template lang="pug">
footer.styled-footer
  .footer-inner
    .left-section
      span.copyright &copy; amittai {{ new Date().getFullYear() }}.
    .right-section
      .clock(@click="toggleTimeInfo")
        .clock-face
          .hand.hour-hand(ref="hourHand")
          .hand.min-hand(ref="minuteHand")
          .hand.second-hand(ref="secondHand")
      #clock-info(:class="{ visible: timeInfoVisible }")
        span(ref="timeZoneElement")
</template>

<script setup lang="ts">
const secondHand = ref<HTMLElement>(null)
const minuteHand = ref<HTMLElement>(null)
const hourHand = ref<HTMLElement>(null)
const timeZoneElement = ref<HTMLElement>(null)
const timeInfoVisible = ref(false)
const intervals: ReturnType<typeof setInterval>[] = []

function toggleTimeInfo() {
  timeInfoVisible.value = !timeInfoVisible.value
}

function tick() {
  const setTime = () => {
    if (!secondHand.value || !minuteHand.value || !hourHand.value) {
      return
    }

    const now = new Date()

    const seconds = now.getSeconds()
    const secondsDegree = ((seconds / 60) * 360) + 90
    secondHand.value.style.transform = `rotate(${secondsDegree}deg)`

    const minutes = now.getMinutes()
    const minutesDegree = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90
    minuteHand.value.style.transform = `rotate(${minutesDegree}deg)`

    const hour = now.getHours()
    const hourDegree = ((hour / 12) * 360) + ((minutes / 60) * 30) + 90
    hourHand.value.style.transform = `rotate(${hourDegree}deg)`

    if (timeZoneElement.value) {
      const timeZoneInfo = `${new Date()
        .toLocaleTimeString(
          [],
          {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          },
        )} ${new Date()
        .toLocaleTimeString(
          "en-us",
          {
            timeZoneName: "short",
          },
        ).split(" ")[2]}`

      timeZoneElement.value.innerText = timeZoneInfo
    }
  }

  intervals.push(setInterval(setTime, 1000))
}

onMounted(() => {
  tick()
})

onUnmounted(() => {
  intervals.forEach((interval) => clearInterval(interval))
})
</script>

<style lang="scss" scoped>
@use "@/styles/mixins";
@use "@/styles/typography";
@use "@/styles/colors";

.styled-footer {
  border-top: 1px solid var(--border-color);
  padding: 1em;

  .footer-inner {
    @include mixins.flex-between;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;

    .left-section {
      .copyright {
        font-family: typography.font("sans-serif"), sans-serif;
        font-size: typography.font-size(xs);
        color: var(--foreground);
      }
    }

    .right-section {
      display: inline-flex;
      gap: 1em;
      position: relative;
      align-items: center;
    }

    #clock-info {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 120px;
      transform: translateY(-100%);

      background: var(--border-color);
      color: var(--foreground);
      font-weight: 300;
      font-size: 1em;
      padding: 0 1px;
      border-radius: 5px;
      display: inline-flex;
      justify-content: center;
      border: 1px solid var(--border-color);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      &.visible {
        opacity: 0.8;
      }

      & > span {
        color: var(--light-foreground);
        font-weight: 500;
      }
    }

    .clock {
      height: 1.2em;
      aspect-ratio: 1/1;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      position: relative;
      padding: 0;
      cursor: pointer;

      &:hover {
        + #clock-info {
          opacity: 0.8 !important;
        }
      }

      .clock-face {
        position: relative;
        width: 100%;
        height: 100%;
        transform: translateY(-0.3px);

        .hand {
          width: 50%;
          background: var(--foreground);
          position: absolute;
          top: 50%;
          transform-origin: 100%;
          transform: rotate(90deg);
          transition: all 0.05s;
          transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
        }

        .hour-hand {
          height: 2px;
          width: 35%;
          left: 15%;
        }

        .min-hand {
          height: 1px;
          width: 35%;
          left: 15%;
        }

        .second-hand {
          height: 1px;
          width: 40%;
          left: 10%;
        }
      }
    }
  }
}
</style>
