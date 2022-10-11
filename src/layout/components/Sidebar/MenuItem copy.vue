<script lang="jsx">

  // const {icon} = undefined || {};
  
  export default {
    // name: 'MenuItem',
    name: 'Item',
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
    render(h, context) {
      console.log(context.props)
      const { icon, title } = context.props|| {}
      const vnodes = []
      console.log('icon='+icon)
      console.log('title='+title)
      if (icon) {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
  
      if (title) {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
      return vnodes
    }
  }
  </script>


