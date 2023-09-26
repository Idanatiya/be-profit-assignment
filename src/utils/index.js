import { vm } from '../main'

export function showToast(message, type = 'is-success', duration = 5000) {
  vm.$buefy.toast.open({
    duration,
    message,
    position: 'is-bottom-right',
    type
  })
}
