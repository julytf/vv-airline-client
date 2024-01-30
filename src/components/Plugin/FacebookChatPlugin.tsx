import { FunctionComponent, useEffect, useRef } from 'react'

interface FacebookChatPluginProps {}

declare global {
  interface Window {
    fbAsyncInit: () => void
    FB: {
      init: (params: object) => void
    }
  }
}

const FacebookChatPlugin: FunctionComponent<FacebookChatPluginProps> = () => {
  const pageId = '238066656049200'

  const MessengerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (MessengerRef.current) {
      MessengerRef.current.setAttribute('page_id', pageId)
      MessengerRef.current.setAttribute('attribution', 'biz_inbox')

      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: 'v16.0',
        })
      }
      ;(function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        const js = d.createElement(s) as HTMLScriptElement
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js'
        fjs?.parentNode?.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    }
  }, [])

  return (
    <>
      <div id='fb-root'></div>
      <div ref={MessengerRef} id='fb-customer-chat' className='fb-customerchat'></div>
    </>
  )
}

export default FacebookChatPlugin
