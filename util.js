import _ from 'lodash'

export default function groupBy(arr, criteria, value) {
  // acc is the accumulator. Starting value is an empty object.
  const newObj = arr.reduce((acc, currentValue) => {
    if (!acc[currentValue[criteria]]) {
      acc[currentValue[criteria]] = []
    }
    // need toString() because each value is in an array for some reason
    acc[currentValue[criteria]].push(currentValue[value].toString())
    return acc
  }, {})
  return newObj
}
