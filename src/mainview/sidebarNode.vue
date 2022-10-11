<template>
    <!--if have childs add sidebarnode loop , if no child add el-menu-item -->
    <el-sub-menu v-if="hasChild(item)" ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
        <!-- <template v-if="item.meta&&item.meta.title"> -->
        <template #title>
          <!-- <el-icon><location /></el-icon> -->
          <SvgIcon :icon-class="item.meta.icon"/>
          <span>{{item.meta.title}}</span>
          <!-- aa -->
        </template>
        <SidebarNode v-for="child in item.children" :key="child.path" :item="child" :basePath="item.path"/>
    </el-sub-menu>
    <template v-else>
        <el-menu-item :index="resolvePath(item.path)">
            <template #title>
                <!-- <el-icon><location /></el-icon> -->
                <SvgIcon :icon-class="item.meta.icon"/>
                <span>{{item.meta.title}}</span>
                <!-- bb -->
            </template>
        </el-menu-item>
    </template>
</template>
<script lang="ts">
    export default { name: 'SidebarNode' };
</script>

<script lang="ts" setup>
    import path from 'path'
    import Vue from 'vue'
    import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
    import { defineProps } from '@vue/runtime-core';
    // import type { PropType } from '@vue/runtime-core'; 

    const props = defineProps({
            // route object
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    });

    const hasChild=( item:Object )=>{
        // console.log('item')
        // console.log(item)

        // console.log(item.children.length)
        if(item.children!=null&&item.children.length>0){
            return true;
        }else{
            return false;
        }
    }
    const isExternal=(nowPath)=> {
        return /^(https?:|mailto:|tel:)/.test(nowPath)
    }
    const resolvePath=(routePath)=> {
        // console.log('path='+routePath)
        if (isExternal(routePath)) {
            return routePath
        }
        if (isExternal(props.basePath)) {
            return props.basePath
        }
    //   console.log("resolvePath="+path.resolve(props.basePath, routePath))


        // try {
        //     console.log("resolvePath="+path.resolve('/nested', 'menu2'))
        //     return path.resolve(props.basePath, routePath)
        // }
        // catch(err) {
        //     return '/404'
        // }
        // console.log('outpath='+props.basePath+'/'+routePath)
        return props.basePath+'/'+routePath
    //   return path.resolve('/nested', 'menu2')
    }
</script>
