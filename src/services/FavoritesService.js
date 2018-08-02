import Api from '@/services/Api'

export default {
  fetchFavorites (params) {
    return Api().get('/favorites', {
      params: params
    })
  }
}
