<template>
	<center>
		<div class="form" @keyup.enter="toRegister">
			<Mytip content="用户名" :info="nameInfo">
			    <Input class="input" type="text" v-model="userName" placeholder="用户名" icon="ios-person-outline"></Input>
            </Mytip>
            <Mytip content="账号" :info="accountInfo">
				<Input class="input" type="text" v-model="account" placeholder="账号" icon="ios-account-outline"></Input>
            </Mytip>
			
			<Mytip content="密码" :info="passwordInfo">	
				<Input class="input" type="password" v-model="password" placeholder="密码" icon="ios-locked-outline"></Input>
            </Mytip>
			
			<Mytip content="确认密码" :info="rePasswordInfo">
				<Input class="input" type="password" v-model="rePassword" placeholder="确认密码" icon="ios-unlocked-outline"></Input>
            </Mytip>

			<Button class="login-bt" type="primary" long @click="toRegister" :loading="loadStatu">注册</Button>
			<div>
				<a href="#" class="a-login" @click="toLogin">前往登录</a>
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
				userName: '',
				account: '',
				password: '',
				rePassword: '',
				loadStatu: false,

				nameInfo: '',
				accountInfo: '',
				passwordInfo: '',
				rePasswordInfo: '',
			}
		},
		components: {
			Mytip
		},
		computed: {
		    ...mapState({
		    	// 'allDepartmentList': state => {
		    	// 	return state.user.allDepartmentList
		    	// }
		    }),
		},
		methods: {
			...mapActions(user.actions),
			toRegister: function () {
				if(!this.check()) return
				
				this.loadStatu = true
				this.Register({
					userId: this.account,
					userName: this.userName,
					password: this.password,
				}).then(data => {
					if(data.state){
						this.onSuccess(data.info)
						this.toLogin()
					}else{
						this.onError(data.info)
					}
				}).catch(err => {
					this.onError(err)
				})
			
				
			},
			onSuccess (info) {
				this.$Message.success(info);
			},
			onError (err) {
				this.loadStatu = false
				this.$Message.error(err);
			},
			toLogin () {
				this.$emit('to-login')
			},
			check () {
				if(this.userName.trim()=="" || this.account.trim()=="" || this.password.trim()=="" || this.password.trim() !== this.rePassword.trim()){
					this.$Message.error("请填写好所有的信息")
					return false
				}else if(this.account.length!==6){
					this.$Message.error("账号长度为6位")
					return false
				}else{
					return true
				}
			},
		},
		watch: {
			userName: function(val) {
				if(val.trim()===""){
					this.nameInfo = "请输入用户名"
				}else{
					this.nameInfo = ""
				}
			},
			account: function(val){
				if(val===''){
					this.accountInfo ="请输入账号";
				}else if(val.length !== 6) {
					this.accountInfo ="账号长度为6位";
				}
			},
			password: function(val){
				if(val===''){
					this.passwordInfo ="请输入密码";
				}
			},
			rePassword: function(val){
				if(val===''){
					this.rePasswordInfo = "请确定密码"
				}else if(this.rePassword!==this.password){
					this.rePasswordInfo = "确认密码不匹配"
				}else {
					this.rePasswordInfo = ""
				}
			},
		},
		created() {
			this.getAllDepartment().then(data => {
				if(data.state){
					this.departmentId = this.allDepartmentList[0].departmentId
				}else{
					this.onError(data.info)
				}
			}).catch(err => {
				this.onError(err)
			})
		}
	}
</script>

<style scoped>
	.form {
		position: relative;
	    top: 270px;
	    width: 25%;
	    min-width: 350px;
	    padding: 30px 30px 15px;
	    border-radius: 10px;
	    box-sizing: border-box;
	    background-color: rgba(160, 160, 160, 0.6);
	    box-shadow: 0 0 8px 2px #585858;
	}
	.input, .login-bt, .department {
		margin: 0 0 20px 0;
	}

	.competence {
		position: absolute;
		left: 32px;
		bottom: 30px;
		color: white;
	}
	.a-login {
		color: #ffffff;
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
