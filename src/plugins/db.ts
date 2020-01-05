const DB_NAME = 'tracker'
const DB_VERSION = 1
let database = {
  deleteDb () {
    indexedDB.deleteDatabase(DB_NAME)
  },
  async getDb () {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = (e:any) => {
        reject(Error('Error opening db'))
      }

      request.onsuccess = (e:any) => {
        resolve(e.target.result)
      }

      request.onupgradeneeded = (e:any) => {
        let db = e.target.result

        if (e.oldVersion < 1) {
          /*
          {
            id: 33,
            profile: 'Maks',
            startDay: '2019-11-22',
            endDay: '2019-11-25',
            day: '2019-11-23',
          }
          */
          let objectStore = db.createObjectStore('eventDays', { autoIncrement: true, keyPath: 'id' })
          objectStore.createIndex('by_profile', 'profile', { unique: false })

          objectStore.createIndex('by_startDay', 'startDay', { unique: false })
          objectStore.createIndex('by_endDay', 'endDay', { unique: false })
          objectStore.createIndex('by_day', 'day', { unique: false })

          objectStore.createIndex('by_profile_startDay', ['profile', 'startDay'], { unique: false })
          objectStore.createIndex('by_profile_endDay', ['profile', 'endDay'], { unique: false })
          objectStore.createIndex('by_profile_day', ['profile', 'day'], { unique: false })

          objectStore.createIndex('by_profile_startDay_endDay', ['profile', 'startDay', 'endDay'], { unique: false })
        }
      }
    })
  },

  async getEvents (db:IDBDatabase) {
    return new Promise((resolve, reject) => {
      let trans = db.transaction(['eventDays'], 'readonly')
      trans.oncomplete = (e:any) => {
        resolve(eventDays)
      }

      let store = trans.objectStore('eventDays')
      let eventDays:object[] = []

      store.openCursor().onsuccess = (e:any) => {
        let cursor = e.target.result
        if (cursor) {
          eventDays.push(cursor.value)
          cursor.continue()
        }
      }
    })
  },

  async addEvent (db:IDBDatabase, event:any) {
    return new Promise((resolve, reject) => {
      let trans = db.transaction(['eventDays'], 'readwrite')
      trans.oncomplete = (e:any) => {
        resolve()
      }
      const startDay = new Date(event.startDay)
      const endDay = new Date(event.endDay)
      let store = trans.objectStore('eventDays')
      for (let day = startDay; day <= endDay; day.setDate(day.getDate() + 1)) { // eslint-disable-line no-unmodified-loop-condition
        store.add({
          profile: event.profile,
          startDay: event.startDay,
          endDay: event.endDay,
          day: day.getFullYear().toString().padStart(4, '0') + '-' +
               (day.getMonth() + 1).toString().padStart(2, '0') + '-' +
               day.getDate().toString().padStart(2, '0'),
        })
      }
    })
  },

  async deleteEvent (db:IDBDatabase, event:any) {
    return new Promise((resolve, reject) => {
      let trans = db.transaction(['eventDays'], 'readwrite')
      trans.oncomplete = (e:any) => {
        resolve()
      }
      let store = trans.objectStore('eventDays')
      store.index('by_profile_startDay_endDay')
        .openKeyCursor(IDBKeyRange.only(
          [event.profile, event.startDay, event.endDay]))
        .onsuccess = (e:any) => {
          var cursor = e.target.result
          if (cursor) {
            store.delete(cursor.primaryKey)
            cursor.continue()
          }
        }
    })
  },
}

export default database
