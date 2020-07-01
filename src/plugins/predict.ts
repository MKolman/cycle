function jitter (nums:number[], guess:number):number[] {
  while (nums.length <= 1) {
    nums.push(guess)
  }
  return nums
}
const mean = (arr:Array<number>) => Math.round(
    arr.reduce((a:number, b:number) => a + b, 0) / arr.length)

const ISODate = (date:Date) => date.toISOString().substr(0, 10)

function dateDiff (first:string, second:string):number {
  const t = (new Date(first)).valueOf() - (new Date(second)).valueOf()
  return Math.round(t / (1000 * 60 * 60 * 24))
}

function predict (events:Array<any>) {
  if (events.length === 0) return null
  events.sort((a:any, b:any) => {
    if (a.start > b.start) return 1
    return a.start === b.start ? 0 : -1
  })
  const data:{ [key: string]: number[] } = {
    len: [],
    beg: [],
    end: [],
  }
  for (let i = 0; i < events.length; i++) {
    const ev = events[i]
    data.len.push(dateDiff(ev.end, ev.start))
    if (i !== 0) {
      data.beg.push(dateDiff(ev.start, events[i - 1].start))
      data.end.push(dateDiff(ev.end, events[i - 1].end))
    }
  }
  data.len = jitter(data.len, 5)
  data.beg = jitter(data.beg, 29)
  data.end = jitter(data.end, 29)
  const ev = events[events.length - 1]
  const start = new Date(ev.start)
  const end = new Date(ev.end)
  start.setDate(start.getDate() + mean(data.beg))
  end.setDate(end.getDate() + mean(data.end))
  return { start: ISODate(start), end: ISODate(end), name: 'predict' }
}

export default predict
