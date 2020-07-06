// const url = 'http://alpha.api-artist.ac.vip'; //测试地址
// const urls = 'https://api-artist.ac.vip'; //上线地址
function url () {
  if (window.location.host === 'm-artist.ac.vip') {
    return 'https://api-artist.ac.vip'
  } else {
    return 'http://alpha.api-artist.ac.vip'
  }
}
export default url
