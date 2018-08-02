import Api from '@/services/Api'

export default {
  fetchBookmarks (params) {
    return Api().get('/bookmarks', {
      params: params
    })
  }
}
