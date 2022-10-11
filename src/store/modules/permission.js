import { constantRouterMap } from '~/router'
import Layout from '~/layout/index.vue'
import mainview from '~/mainview/index.vue'
import ParentView from '~/components/ParentView/index.vue'
// import { composeEventHandlers } from 'element-plus/es/utils'





const permission = {
  state: {
    routers: [],//constantRouterMap
    addRouters: [],
    sidebarRouters: [],
    menu: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRouterMap.concat(routers)
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    }
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    SetMenu({ commit }, menu) {
      commit('SET_MENU', menu)
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
      commit('SET_SIDEBAR_ROUTERS', sidebarRouter)
    }
  }
}


const modules_l1=import.meta.glob('@/views/*/*.vue')
const modules_l2=import.meta.glob('@/views/*/*/*.vue')
const modules_l3=import.meta.glob('@/views/*/*/*/*.vue')


export const filterAsyncRouter = (routers, lastRouter = false, type = false) => { // 遍历后台传来的路由字符串，转换为组件对象

  
  // for(const path in modules_l1){
  //   modules_l1[path]().then((mod)=>{
  //     console.log(path,mod)
  //   })
  // }
  // for(const path in modules_l2){
  //   modules_l2[path]().then((mod)=>{
  //     console.log(path,mod)
  //   })
  // }
  for(const path in modules_l3){
    modules_l3[path]().then((mod)=>{
      console.log(path,mod)
    })
  }
  
  
  return routers.filter(router => {
    if (type && router.children) {
      router.children = filterChildren(router.children)
    }
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        // router.component = Layout
        router.component = mainview
      } else if (router.component === 'ParentView') {
        router.component = ParentView
      } else {
        const component = router.component
        // console.log('component='+component)
        router.component = loadView(component)
      }
    }
    if (router.children != null && router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, router, type)
    } else {
      delete router['children']
      delete router['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => {
  // return (resolve) => require([`~/views/${view}`], resolve)
  console.log('component='+view)
  // const com=() => import("~/views/"+view)
  // console.log(com)

  // const component = () => import(`~/views/${view}.vue`)
  // .then((m) => m.default)
  // .catch(err => import ("~/views/features/404"))
  // return component
  // return defineAsyncComponent(() => import("../views/"+view))


  // return () => import('~/views/nested/menu2/index.vue')  //ok
  // return () => import('@/views/'+view+'.vue') //error
  // return () => import(`~/views/${view}`) //error

  // const page = (await import(`~/views/${view}.vue`)).default;
  // return page

  // const comps = import.meta.glob('./views/**/*.vue');
  // const match = comps[`./views/${view}.vue`];
  // console.log(typeof match,'match')
  // const page = match

  // const page = (await match()).default
  // const page = match

  // return page
  // return () => import(`@/views/${view}.vue`)//error

  // return ()=>defineAsyncComponent(() => import("~/views/"+view+".vue"))
  // const module='nested/menu2'
  // return () => import(`@/views/${module}/index.vue`)//error
  // view='/nested/menu2'

  const arr = view.split("/");
  // console.log(arr.length,'arr')
  if(arr.length==2){
    return modules_l1[`/src/views/${arr[0]}/${arr[1]}.vue`]
  }else if(arr.length==3){
    //@/views/nested/menu2/index.vue
    ///src/views/nested/menu2/index.vue 
    // console.log('@/views/${arr[0]}/${arr[1]}/${arr[2]}.vue','view')
    return modules_l2[`/src/views/${arr[0]}/${arr[1]}/${arr[2]}.vue`]
  }else if(arr.length==4){
    return modules_l3[`/src/views/${arr[0]}/${arr[1]}/${arr[2]}/${arr[3]}.vue`]
  }

}

export default permission
