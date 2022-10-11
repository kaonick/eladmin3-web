import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
// import dynamicImport from 'vite-plugin-dynamic-import'
import { fileURLToPath } from 'url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'




// import Unocss from 'unocss/vite'
// import {
//   presetAttributify,
//   presetIcons,
//   presetUno,
//   transformerDirectives,
//   transformerVariantGroup,
// } from 'unocss'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@crud':fileURLToPath(new URL('./src/components/Crud', import.meta.url)),
      // '~/': `${pathSrc}/`,
      // '@': `${pathSrc}/views`,

      // '@/': path.join(__dirname, 'src/'),
      path: "path-browserify",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
    
        // additionalData:'@import "@/assets/scss/globalVariable1.scss";@import"@/assets/scss/globalVariable2.scss";',
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    // dynamicImport(/* options */),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
      // 指定symbolId格式
      // symbolId: 'icon-[dir]-[name]',
      symbolId: '[name]',

      /**
       * 自定义插入位置
       * @default: body-last
       */
      // inject?: 'body-last' | 'body-first'

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    })


    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    // Unocss({
    //   presets: [
    //     presetUno(),
    //     presetAttributify(),
    //     presetIcons({
    //       scale: 1.2,
    //       warn: true,
    //     }),
    //   ],
    //   transformers: [
    //     transformerDirectives(),
    //     transformerVariantGroup(),
    //   ]
    // }),
  ],
})
