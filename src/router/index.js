import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
				component:()=>import('../views/index/index.vue'),
				meta:{title:'后台首页'},
			},
			{
				name:'shop_goods_list',
				path:'/shop/goods/list',
				meta:{title:'商品列表'},
				component:()=>import('../views/shop/goods/list.vue')
			}
		]
	},
	{
		path:'/login',
		name:'login',
		component:()=>import('../views/login/index.vue'),
		meta:{title:'登录页'},
	},
	{
		path:'*',
		redirect:{name:'index'},
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
