<template>
  	<div id="app">
		<div class="layout">
			<Layout class="wrap">
				<Header>
					<div class="layout-logo">{{user.departmentName}}</div>
					<a href="#" class="exit" @click="toExit">退出</a>
				</Header>
				<Layout>
					<Sider hide-trigger class="sider">
						<Menu active-name="addRecord" theme="light" width="auto" @on-select="changePage">
							<MenuItem name="addRecord">
								<Icon type="ios-navigate"></Icon>
								<span>单据填写</span>
							</MenuItem >
							<MenuItem  name="checkStore">
								<Icon type="ios-keypad"></Icon>
								<span>库存查看</span>
							</MenuItem >
							<MenuItem  name="checkRecord">
								<Icon type="ios-analytics"></Icon>
								<span>记录查看</span>
							</MenuItem >
						</Menu>
					</Sider>
					<Layout class="content-layout">
						<Content class="content-wrap">
							<component :is="pageName" />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</div>
  	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'  
import user from './store/types/user'
import checkStore from './components/checkStore'
import addRecord from './components/addRecord'
import checkRecord from './components/checkRecord'
export default {
	name: 'app',
	data (){
		return {
			login: true,
			pageName: 'addRecord'
		}
	},
	computed: {
		...mapState({
			'user': state => {
				return state.user
			}
		}),
	},
	components: {
		checkStore,
		addRecord,
		checkRecord
	},
	methods: {
		...mapActions(user.actions),

		toExit() {
			this.exit().then(data => {
				if(data.state){
					window.location.href = "./login.html"
				}else{
					this.$Message.success(data.info)
				}
			}).catch(err => {
				this.$Message.error(err)
			})
		},

		changePage(name) {
			this.pageName = name;
			console.log(this.pageName)
		}	
	},
	created() {
		this.getMyInfo().then(data => {
			if(data.state){
			}else{
				this.$Message.success(data.info)
			}
		}).catch(err => {
			this.$Message.error(err)
		})
	}
}
</script>

<style scoped>
	#app{
		padding: 0.1px;
   	 	height: 100%;
		background-image: url('~@/assets/images/bg03.png');
		background-size: cover;
		background-attachment: fixed;
	}
	.layout{
		border: 1px solid #d7dde4;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
		height: 100%;
	}
	.layout-logo{
		display: inline;
		padding: 8px 20px;
		background: #5b6270;
		border-radius: 3px;
		color: white;
    	font-size: 16px;
	}
	.layout-nav{
		width: 420px;
		margin: 0 auto;
		margin-right: 20px;
	}
	.exit {
		float: right;
	}
	.wrap {
		height: 100%;
	}
	.sider {
		background: rgba(255, 255, 255, 0.6);
		margin-top: 8px;
	}
	.content-layout {
		padding: 8px 0 0 8px
	}
	.content-wrap {
		padding: 24px;
		min-height: 280px; 
		background: rgba(255, 255, 255, 0.6);
	}
</style>
