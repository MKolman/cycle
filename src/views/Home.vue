<template>
  <div class="home">
    <h1>
      {{ currentMonthName }}
      <span class="navigation">
        <v-btn
          fab
          text
          large
          @click="prev"
        >
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          fab
          text
          large
          @click="next"
        >
          <v-icon large>mdi-chevron-right</v-icon>
        </v-btn>
      </span>
    </h1>
    <v-calendar
      ref="calendar"
      v-model="currentDate"
      class="elevation-2"
      type="month"
      :events="allEvents"
      :event-color="getEventColor"
      @click:event="handleEvent"
      @click:date="handleDate"
      @click:day="handleDay"
    />
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        creatingEvent: false,
        currentDate: '2019-11-15',
        newEvent: {
          name: 'New Event',
          color: 'primary',
        },
        events: [
          {
            name: 'Krvavec',
            start: '2018-11-01',
            end: '2019-11-10',
          },
        ],
      }
    },
    computed: {
      allEvents () {
        if (this.creatingEvent) {
          return [this.newEvent].concat(this.events)
        }
        return this.events
      },
      defaultColor () {
        return ['primary', 'secondary'][+this.creatingEvent]
      },
      currentMonthName () {
        let date = new Date(this.currentDate)
        console.log(date)
        return date.toLocaleString('default', { month: 'long', year: 'numeric' })
      },
    },
    methods: {
      getEventColor (event) {
        return event.color || this.defaultColor
      },
      handleEvent (event) {
        console.log('Event', event)
        console.log('Event', this.events)
      },
      handleDay (event) {
        if (this.creatingEvent) {
          this.handleDate(event)
        }
      },
      handleDate (event) {
        if (this.creatingEvent) {
          let ev = { name: '', start: this.newEvent.start, end: event.date }
          if (ev.start > ev.end) [ev.start, ev.end] = [ev.end, ev.start]
          this.events.push(ev)
        } else {
          this.newEvent.start = event.date
          this.newEvent.end = event.date
        }
        this.creatingEvent = !this.creatingEvent
        console.log('Day', event)
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
    },
  }
</script>

<style scoped lang="scss">
  .home {
    width: 100%;
    height: 100%;
    padding-bottom: 4em;
    h1 {
      line-height: 2em;
      .navigation {
        white-space: nowrap;
        float: right;
      }
    }
  }
</style>
