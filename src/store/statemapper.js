import { computed } from 'vue'
import { mapGetters, mapState, useStore, createNamespacedHelpers } from 'vuex'

const useMapper = (mapper, mapFn) => {
  const store = useStore()

  const storeStateFns = mapFn(mapper)
  const storeState = {}
  Object.keys(storeStateFns).forEach((keyFn) => {
    const fn = storeStateFns[keyFn].bind({ $store: store })
    storeState[keyFn] = computed(fn)
  })

  return storeState
}

export const useState = (moduleName, mapper) => {
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

export const useGetters = (moduleName, mapper) => {
  let mapperFn = mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

// 作者：Wangpf
// 链接：https://juejin.cn/post/6999473771253874701
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


// 使用
// setup() {
//     const storeState = useState(['name', 'age', 'six'])
//     const storeGetters = useGetters(['counter'])
//     const homeState = useState('home', ['homeCounter'])
//     return {
//       ...storeState,
//       ...storeGetters,
//       ...homeState
//     }
//   },
