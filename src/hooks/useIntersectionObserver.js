import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

// export default function useScroll(elRef) {
//     const isReachBottom = ref(false)

//     const clientHeight = ref(0)
//     const scrollTop = ref(0)
//     const scrollHeight = ref(0)

//     const scrollListenerHandler = () => {
//         clientHeight.value = document.documentElement.clientHeight
//         scrollTop.value = document.documentElement.scrollTop
//         scrollHeight.value = document.documentElement.scrollHeight

//         if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
//             // console.log("滚动到底部了")
//             isReachBottom.value = true
//         }
//     }

//     onMounted(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     })

//     onUnmounted(() => {
//         window.removeEventListener("scroll", scrollListenerHandler)
//     })

//     return { isReachBottom, clientHeight, scrollTop, scrollHeight }
// }







// 第二种写法：在 hook 内部直接接收回调
// import { ref, onMounted, onUnmounted } from 'vue'
//
// export function useIntersectionObserver(callback, options = {}) {
//     const targetRef = ref(null)
//     let observer = null
//
//     onMounted(() => {
//         observer = new IntersectionObserver(
//             (entries) => {
//                 const entry = entries[0]
//                 if (entry.isIntersecting) {
//                     callback(entry)
//                 }
//             },
//             options
//         )
//
//         if (targetRef.value) {
//             observer.observe(targetRef.value)
//         }
//     })
//
//     onUnmounted(() => {
//         if (observer) {
//             observer.disconnect()
//             observer = null
//         }
//     })
//
//     return targetRef
// }

// 第三种写法：只提供响应式标志，由组件自己通过 watch 处理
export function useIntersectionObserver(options = {}) {
    const targetRef = ref(null)
    const isIntersecting = ref(false)
    let observer = null

    onMounted(() => {
        observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                // console.log(isIntersecting.value)
                isIntersecting.value = entry.isIntersecting
                // console.log(isIntersecting.value)
            },
            options
        )

        if (targetRef.value) {
            observer.observe(targetRef.value)
        }
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
            observer = null
        }
    })

    onActivated(() => {
        if (targetRef.value) {
            observer.observe(targetRef.value)
        }
    })

    onDeactivated(() => {
        if (observer) {
            observer.disconnect()
            observer = null
        }
    })

    return {
        targetRef,
        isIntersecting,
    }
}

