import { createRouter, createWebHistory } from 'vue-router'
// 懒加载
const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 配置路由的映射关系
const routes = [ {
  // 这里是重定向
  path:'',
  redirect:'/home'
},
{
  path: '/home',
  name: 'Home',
  component: Home
},
{
  path: '/cart',
  name: 'Car',
  component: Cart
},
{
  path: '/category',
  name: 'About',
  component: Category
},
{
  path: '/profile',
  name: 'Me',
  component: Profile
},
{
  path: '/detail/:iid',
  name: 'dt',
  component: Detail
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


