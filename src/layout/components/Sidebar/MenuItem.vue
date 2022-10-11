<template>
  <svg-icon icon-class={{icon}} />
  <span slot='title'>{{title}}</span>

</template>


<!-- <script lang="jsx"> -->
<script>
import { computed } from "vue";
import svgIcon from '~/components/SvgIcon/index.vue'
// const {icon} = undefined || {};

export default {
  name: 'MenuItem',
  // name: 'Item',
  components: { svgIcon },
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props){
    const icon = computed({
      get: () => props.icon,
    });
    const title = computed({
      get: () => props.title,
      // set: val => emit("update:inputText", val),
    });
    console.log('title='+title)
    // watch(()=>{ 
    //   console.log(`name is: ` + props.name)
    // })
    return { title , icon }
  }
  // ,
  // render(h, context) {
  //   console.log(context.props)
  //   const { icon, title } = context.props|| {}
  //   const vnodes = []
  //   console.log('icon='+icon)
  //   console.log('title='+title)
  //   if (icon) {
  //     vnodes.push(<svg-icon icon-class={icon}/>)
  //   }

  //   if (title) {
  //     vnodes.push(<span slot='title'>{(title)}</span>)
  //   }
  //   return vnodes
  // }
}
</script>
