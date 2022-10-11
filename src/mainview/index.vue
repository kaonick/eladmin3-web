<template>
    <div class="common-layout">
      <el-container>
        <!-- <el-aside width="200px"> -->
            <sidebar/>
        <!-- </el-aside> -->
        <el-container>
          <el-header class="fixed-header">
            <!-- <div>
              <el-button type="success" @click="logout">Logout</el-button>
              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                  <el-radio-button :label="false">expand</el-radio-button>
                  <el-radio-button :label="true">collapse</el-radio-button>
              </el-radio-group>
              <el-button type="success" @click="logout">Logout</el-button>
              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
                  <el-radio-button :label="false">expand</el-radio-button>
                  <el-radio-button :label="true">collapse</el-radio-button>
              </el-radio-group>
            </div> -->
            <div>
              <Navbar/>
              <TagsView/>
            </div>
          </el-header>
          <el-scrollbar height="600px" class="header-toppad">
          <!-- <el-scrollbar> -->
            <el-main class="app-main">
                <!-- <h1>Hello App!</h1>
                <router-link to="/home">Go to Home</router-link>
                <router-link to="/hello">Go to Hello</router-link> -->
                <router-view></router-view>
                <!-- Main -->
                <!-- <transition name="fade-transform" mode="out-in"> -->
                    <!-- <keep-alive> -->
                        <!-- <router-view/> -->
                    <!-- </keep-alive> -->
                <!-- </transition> -->
            </el-main>
          </el-scrollbar>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </template>
  <script setup lang="ts">
    import sidebar from './sidebar.vue'
    import { Navbar, TagsView} from './components'
    import { useStore } from 'vuex'
    import { ref,getCurrentInstance,watch,computed } from 'vue'
    const { proxy } = getCurrentInstance()
    // const isCollapse = ref(proxy.$isCollapse);

    // watch(isCollapse, (newVal, oldVal) => {
    //     console.log('value='+newVal)
    //     proxy.$isCollapse=newVal
    // })
    const store = useStore()
    const isCollapse = ref(true);
    // const isCollapse = computed(() => store.state.isCollapse)
    // const isCollapse = store.state.isCollapse
    watch(isCollapse, (newVal, oldVal) => {

      store.dispatch('app/toggleSideBar')

        // store.commit('changeisCollapse',newVal)
    })
    // const isCollapse=()=> {
    //   return !store.state.isCollapse
    // }

    const logout=()=> {
      store.dispatch('LogOut').then(() => {
        location.reload()
      })
    }

  </script>
  <style lang="scss" scoped>
    @import "~/assets/styles/mixin.scss";
    @import "~/assets/styles/variables.scss";
    .header{
        float: right;
    }
    .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
    padding: 0;
  }
  .app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  }

  .header-toppad {
    padding-top: 50px;
  }
  </style>

