import Api from '@/services/Api'

export default {
  fetchUser (params) {
    return Api().get('/user', {
      params: params
    })
  }
}
