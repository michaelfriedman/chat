import { useEffect } from 'react'

export default function useChatScrollManager(ref) {
  useEffect(() => {
    const node = ref.current
    node.scrollTop = node.scrollHeight
  })
}
