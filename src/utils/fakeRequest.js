export default function fakeRequest (time) {
  // eslint-disable-next-line promise/param-names
  return new Promise((res) => setTimeout(res, time))
}
