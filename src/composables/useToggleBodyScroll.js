import { onUnmounted } from 'vue'

export function useToggleBodyScroll(isScrollLocked) {
  const toggleScroll = state => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = state ? 'hidden' : ''
    }
  }

  toggleScroll(isScrollLocked)

  onUnmounted(() => {
    toggleScroll(false)
  })
}
