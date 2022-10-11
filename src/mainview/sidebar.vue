<template>
    <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">expand</el-radio-button>
      <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu 
      router=true 
      unique-opened=true
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >

    <el-menu-item-group>
          <el-menu-item index="/">
            <template #title>
                <!-- <el-icon><location /></el-icon> -->
                <SvgIcon icon-class="dashboard"/>
                <span>Home</span>
            </template>
          </el-menu-item>
    </el-menu-item-group>
    <SidebarNode v-for="route in menus" :key="route.path" :item="route" :basePath="route.path" />

    <!-- <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="/hello">item one</el-menu-item>
          <el-menu-item index="/home">item two</el-menu-item>
    </el-menu-item-group> -->
      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item> -->
    </el-menu>
</el-scrollbar>
</div>
  </template>
  <script lang="ts">
    export default { name: 'sidebar' };
  </script>
  <script lang="ts" setup>
  import { ref,getCurrentInstance,computed,watch } from 'vue'
  import { constantRouterMap } from '~/router'

  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
import { sortedIndex } from 'lodash';
import SidebarNode from './sidebarNode.vue'

  
    const { proxy } = getCurrentInstance()
    console.log('proxy='+proxy.$isCollapse)
    // proxy.$isCollapse=false
    // console.log('proxy='+proxy.$isCollapse)

//   const isCollapse = ref(true)
//   const isCollapse = ref(proxy.$isCollapse)

    const store = useStore()
    // const isCollapse = computed(() => store.state.isCollapse)
    const isCollapse = computed(() => store.getters.sidebar.opened)
    // const menus=computed(()=> store.state.menuList)
    // const menus=computed(()=> store.getters.sidebarRouters)
    const menus=computed(()=> store.getters.menu)

    // const menus2 = menus.slice(6, 11);

    console.log('menus')
    console.log(menus)
    // const isCollapse = store.state.isCollapse
    // watch(isCollapse, (newVal, oldVal) => {
    //     store.commit('changeisCollapse',newVal)
    // })
    // const isCollapse=()=> {
    //     console.log('proxy='+proxy.$isCollapse)
    //   return !store.state.isCollapse
    // }

  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }

  const activeMenu=()=> {

    const route = useRoute()

    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }
  </script>
  
  <style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  </style>
  