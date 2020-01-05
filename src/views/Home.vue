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

    <v-dialog
      v-model="showDeleteDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Delete event
        </v-card-title>

        <v-card-text>
          Do you want to delete event ranging from {{ eventToDelete?eventToDelete.startDate.toLocaleDateString():'past' }} to {{ eventToDelete?eventToDelete.endDate.toLocaleDateString():'future' }}?
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="showDeleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="deleteEvent"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import database from '@/plugins/db.ts'
  import predict from '@/plugins/predict.ts'

  export default {
    name: 'Home',
    data () {
      return {
        creatingEvent: false,
        currentDate: '2020-01-15',
        profile: 'default',
        eventToDelete: null,
        db: null,
        newEvent: {
          name: 'New Event',
          color: 'primary',
        },
        events: [],
      }
    },
    computed: {
      showDeleteDialog: {
        get () {
          return this.eventToDelete !== null
        },
        set (newVal) {
          if (newVal === false) {
            this.eventToDelete = null
          }
        },
      },
      allEvents () {
        let result = []
        const prediction = predict(this.events)
        if (prediction) {
          result.push(prediction)
        }
        if (this.creatingEvent) {
          result.push(this.newEvent)
        }
        return result.concat(this.events)
      },
      defaultColor () {
        return ['primary', 'secondary'][+this.creatingEvent]
      },
      currentMonthName () {
        let date = new Date(this.currentDate)
        return date.toLocaleString('default', { month: 'long', year: 'numeric' })
      },
    },
    created () {
      database.getDb().then(db => {
        this.db = db
        this.loadEvents()
      })
    },
    methods: {
      deleteEvent () {
        if (this.eventToDelete !== null) {
          database.deleteEvent(this.db, {
            profile: this.profile,
            startDay: this.eventToDelete.start,
            endDay: this.eventToDelete.end,
          }).then(() => {
            this.loadEvents()
          })
          this.eventToDelete = null
        }
      },
      loadEvents () {
        database.getEvents(this.db).then(eventDays => {
          let result = {}
          eventDays.forEach(day => {
            result[day.startDay + day.endDay] = {
              name: '',
              start: day.startDay,
              end: day.endDay,
            }
          })
          this.events = Object.values(result)
        })
      },
      getEventColor (event) {
        return event.color || this.defaultColor
      },
      handleEvent (event) {
        let ev = event.event
        ev.startDate = new Date(ev.start)
        ev.endDate = new Date(ev.end)
        this.eventToDelete = ev
      },
      handleDay (event) {
        if (this.creatingEvent) {
          this.handleDate(event)
        }
      },
      handleDate (event) {
        if (this.creatingEvent) {
          this.newEvent.end = event.date
          if (this.newEvent.start > this.newEvent.end) {
            [this.newEvent.start, this.newEvent.end] = [this.newEvent.end, this.newEvent.start]
          }
          let ev = { name: '', start: this.newEvent.start, end: this.newEvent.end }
          database.addEvent(this.db, {
            profile: this.profile,
            startDay: ev.start,
            endDay: ev.end,
          }).then(() => {
            this.creatingEvent = false
            this.loadEvents()
          })
        } else {
          this.newEvent.start = event.date
          this.newEvent.end = event.date
          this.creatingEvent = true
        }
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
