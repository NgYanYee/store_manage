<template>
  	<div id="app">
		<h1 class="title">仓库管理系统</h1>
    	<Login v-if="login" v-on:to-register="toggle"/>
    	<Register v-else v-on:to-login="toggle"/>
  	</div>
</template>

<script>
import Login from './components/login'
import Register from './components/register'
export default {
	name: 'app',
	data (){
		return {
			login: true
		}
	},
	components: {
		Login,
		Register
	},
	methods: {
		toggle (){
			this.login = !this.login
		}
	}
}
</script>

<style scoped>
	#app{
		padding: 0.1px;
   	 	height: 100%;
		background-image: url('~@/assets/images/bg02.png');
		background-size: cover;
		background-attachment: fixed;
   	 	/* background-color: #272727; */
	}
	.title {
		position: relative;
		top: 210px;
		margin-bottom: -45px;
		font-size: 45px;
		text-align: center;
		letter-spacing: 30px;
		color: rgba(255, 255, 255, 0.8);
		text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.71);
	}
</style>
