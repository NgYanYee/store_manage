<template>
	<center>
		<div class="form" @keyup.enter="toLogin">
			<Mytip content="账号" :info="accountInfo">
				<Input class="input" type="text" v-model="account" placeholder="账号" icon="ios-email-outline"></Input>
			</Mytip>
			<Mytip content="密码" :info="passwordInfo">
				<Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"></Input>
			</Mytip>
			<Button class="login-bt" type="primary" long @click="toLogin" :loading="loadStatu">登录</Button>
			<div>
				<a href="#" class="forget-psw" @click="forgetPasswork">忘记密码</a>
				<a href="#" class="register" @click="toRegister">前往注册</a>
			</div>
		</div>
	</center>
</template>

<script>
	import { mapState, mapActions } from 'vuex'  
	import user from '../store/types/user'
	import { IP } from 'src/utils/interaction'

	import Mytip from './Mytip.vue'
	export default {
		data () {
			return {
				account: '',
				password: '',
				loadStatu: false,

				accountInfo: '',
				passwordInfo: '',
			}
		},
		components: {
			Mytip
		},
		computed: {
		    ...mapState({
		    	'user': state => {
		    		return state.user
		    	}
		    }),
		},
		methods: {
			...mapActions(user.actions),
			toLogin: function () {
				if(!this.check()) return

				this.loadStatu = true
					this.Login({
						userId: this.account,
						password: this.password,
					}).then(data => {
						if(data.state){
							this.onSuccess(data.info)
						}else{
							this.onError(data.info)
						}
					}).catch(err => {
						this.onError(err)
				})


			

			},
			
			onSuccess (info) {
				this.$Message.success(info);
				window.location.href="./homepage.html"
			},
			onError (err) {
				this.loadStatu = false
				this.$Message.error(err);
			},
			toRegister () {
				this.$emit('to-register')
			},
			check () {
				if(this.account.trim()=="" || this.password.trim()==""){
					this.$Message.error("请填写好所有的信息")
					return false
				}else{
					return true
				}
			},
			forgetPasswork() {
				this.$Message.info('该功能还未完成，敬请期待！')
			}

		},
	}
</script>

<style scoped>
	.form {
		position: relative;
	    top: 300px;
	    width: 25%;
	    min-width: 350px;
	    padding: 30px 30px 15px;
	    border-radius: 10px;
	    box-sizing: border-box;
	    background-color: rgba(160, 160, 160, 0.6);
	    box-shadow: 0 0 8px 2px #585858;
	}
	.input, .login-bt {
		margin: 0 0 20px 0;
	}
	.forget-psw {
		padding-right: 10px;
		margin-right: 10px;
		border-right: 1px solid white;
		color: #fff;
	}
	.register {
		color: #fff;
	}
	.competence {
		position: absolute;
		left: 32px;
		bottom: 30px;
		color: white;
	}
	.role {
		margin-bottom: 15px;
		color: white;
	}
	.role-item {
		margin: 0 15px;
	}

	@media only screen and (max-width: 768px){
		.form {
			top: 120px;
		}
	}
</style>