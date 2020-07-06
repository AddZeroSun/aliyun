const mixin = {
  data() {},
  watch: {
    // $route: {
    //   handler: function(route) {
    //     this.redirect = route.query && route.query.redirect
    //   },
    //   immediate: true
    // }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 保存搜索数据
    saveSearchData(searchPage, searchData, pageData, other) {
      sessionStorage.setItem('searchPage', searchPage)
      const pageDataStr = JSON.stringify(pageData)
      sessionStorage.setItem('pageData', pageDataStr)
      const searchDataStr = JSON.stringify(searchData)
      sessionStorage.setItem('searchData', searchDataStr)
      const otherStr = JSON.stringify(other)
      sessionStorage.setItem('other', otherStr)
    },
    // 获取搜索数据
    getSearchData(searchPage) {
      const isSearchPage = sessionStorage.getItem('searchPage')
      const isSearchData = sessionStorage.getItem('searchData')
      return new Promise((resolve, reject) => {
        if (isSearchPage !== undefined && isSearchPage === searchPage && isSearchData !== undefined) {
          // alert('有重复')
          const searchDataStr = sessionStorage.getItem('searchData')
          const searchDataObj = JSON.parse(searchDataStr)
          const pageDataStr = sessionStorage.getItem('pageData')
          const pageDataObj = JSON.parse(pageDataStr)
          const otherStr = sessionStorage.getItem('other')
          const otherObj = JSON.parse(otherStr)
          const res = {
            code: 200,
            searchData: searchDataObj,
            pageData: pageDataObj,
            otherData: otherObj,
            msg: '有搜索数据'
          }
          // console.log(res)
          resolve(res)
          // reject('error')
        } else {
          const res = {
            code: 400,
            msg: '无搜索数据'
          }
          resolve(res)
        }
      })
    },
    // 清除搜索
    clearSearchData() {
      sessionStorage.setItem('searchPage', '')
      sessionStorage.setItem('searchData', '')
      sessionStorage.setItem('pageData', '')
      sessionStorage.setItem('other', '')
    },
    back() {
      this.$router.back(-1)
    }
  }
}
export default mixin
