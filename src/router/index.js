import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./common/config/router.js"

Vue.use(VueRouter)
/*
 	const routes = [
		{
			path:'/',
			name:'layout',
			redirect:{name:'index'},
			component:()=>import('../views/layout.vue'),
			children:[
				{
					path:'/index',
					name:'index',
					meta:{title:'后台首页'},
					component:()=>import('../views/index/index.vue'),
				},
				{
					path:'/shop/goods/list',
					name:'shop_goods_list',
					meta:{title:'商品列表'},
					component:()=>import('../views/shop/goods/list.vue')
				},
				{
					path:'/image',
					name:'image',
					meta:{title:'相册管理'},
					component:()=>import('../views/imag/index.vue')
				}
			]
		},
		{
			path:'/login',
			name:'login',
			component:()=>import('../views/login/index.vue'),
			meta:{title:'登录页'},
			// component:'login/index'
		},
		{
			path:'*',
			redirect:{name:'index'},
		}
	] 
*/

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
