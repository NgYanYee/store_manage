<template>
	<div>
		<p class="title">库存查看</p>
		<div class="wrap">
			<!-- <Input v-model="searchInfo" placeholder="课程名"></Input> -->
			<Button class="refresh-bt" type="primary" size="large" shape="circle" icon="android-refresh" @click="refreshList"></Button>
			<ul class="table-wrap w16p">
				<li>
					<span class="header">货品号</span>
					<span class="header">货品名</span>
					<span class="header">分类</span>
					<span class="header">库存</span>
					<span class="header">描述</span>
					<span class="header">供应商</span>
				</li>
				<li v-for="item in allItemList" :key="item.ino">
					<span>{{item.ino}}</span>
					<span>{{item.iname}}</span>
					<span>{{item.series}}</span>
					<span>{{item.icount}}</span>
					<span>{{item.description}}</span>
					<span>{{item.pno}}</span>
				</li>
			</ul>
		</div>
		<Modal
			v-model="showMoel"
			title="修改课程信息"
			@on-ok="ok">
			<div class="info">
				<div class="helf">
					<span class="tip">货品号：</span>
					<Input disabled class="input" type="text" v-model="itemId"></Input>
				</div>
				<div class="helf">
					<span class="tip">课程名：</span>
					<Input class="input" type="text" v-model="itemName"></Input>
				</div>
				<div class="helf">
					<span class="tip">描述：</span>
					<textarea class="textarea" type="text" v-model="description"></textarea>
				</div>
				<div class="helf">
					<span class="tip">系列：</span>
					 <InputNumber :max="10" :min="1" class="input" v-model="credit"></InputNumber>
				</div>
				<div class="helf">
					<span class="tip">供应商：</span>
					 <InputNumber :max="10" :min="1" class="input" v-model="producerId"></InputNumber>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'  
import user from '../store/types/user'
export default {
  	name: 'courseManage',
	data (){
		return {
			showMoel: false,

			itemId: undefined,
			itemName: '',
			series:'',
			Description: '',
			credit: 1,
			producerId: ''
		}
	},
	computed: {
		...mapState({
			'user': state => {
				return state.user
			},
			'allItemList': state => {
				return state.user.allItemList
			},
		}),
	},

	methods: {
		...mapActions(user.actions),

		toDeleteCourse(courseId) {
			this.deleteCourse({
				courseId: courseId
			}).then(data => {
				if(data.state){
					this.$Message.success(data.info)
				}else{
					this.$Message.error(data.info)
				}
			}).catch(err => {
				this.$Message.error(err)
			})
		},
		showUpdateModel(item) {
			this.courseId = item.courseId;
			this.courseName = item.courseName;
			this.courseDescribe = item.courseDescribe;
			this.startSelectTime = item.startSelectTime;
			this.endSelectTime = item.endSelectTime;
			this.departmentId = item.departmentId;
			this.credit = item.credit;
			this.showMoel = true;
		},
		ok() {
			if(this.startSelectTime === "" || this.endSelectTime === "" || this.courseName ==="") {
				this.$Message.error("请填写好必要信息！");
				return;
			}
			this.updateCourse({
				courseId : this.courseId,
				courseName : this.courseName,
				courseDescribe : this.courseDescribe,
				startSelectTime : this.startSelectTime.toLocaleDateString(),
				endSelectTime : this.endSelectTime.toLocaleDateString(),
				departmentId : this.departmentId,
				credit: this.credit
			}).then(data => {
				if(data.state){
					this.$Message.success(data.info)
				}else{
					this.$Message.error(data.info)
				}
			}).catch(err => {
				this.$Message.error(err)
			})
		},
		initList() {
			this.getItemList().then(data => {
				if(data.state){
				}else{
					this.$Message.error(data.info)
				}
			}).catch(err => {
				this.$Message.error(err)
			})
		},
		refreshList() {
			this.initList()
			this.$Message.info('刷新');
		},
	},
	mounted() {
		this.initList()
		this.getMyInfo().then(data => {
				if(data.state){
					
				}else{
					// this.$Message.success(data.info)
					window.location.href="./login.html"
				}
			}).catch(err => {
				//this.$Message.error(err)
				window.location.href="./login.html"
			})
	}
}
</script>

<style scoped>
	.wrap {
		position: relative;
	}
	.refresh-bt {
		position: absolute;
		top: -44px;
		right: 96px;
	}
	.table-wrap {
		border-left: 1px solid rgba(0, 0, 0, 0.4);
		width: 90%;
		margin: auto;
		margin-top: 40px;
		background: rgba(255, 255, 255, 0.8);
		max-height: 720px;
    	overflow: auto;
	}
	.table-wrap li {
	}
	.table-wrap li:hover {
		background-color: rgba(179, 197, 245, 0.52);
	}
	.table-wrap li > span {
		display: inline-block;
		box-sizing: border-box;
		padding: 10px 10px;
		vertical-align: bottom;
		line-height: 20px;
		font-size: 16px;
		height: 72px;
		overflow: auto;

		border-bottom: 1px solid rgba(0, 0, 0, 0.4);
		border-right: 1px solid rgba(0, 0, 0, 0.4);
	}
	.table-wrap.w16p li > span{
		width: 16.4%;
	}
	.table-wrap.w25p li > span{
		width: 25%;
		height: 50px;
	}
	.table-wrap li .header {
		height: 50px;
		font-weight: bold;
		text-align: center;
		border-top: 2px solid rgba(0, 0, 0, 0.4);
	}


	/*滚动条*/
	.table-wrap::-webkit-scrollbar, .table-wrap li > span::-webkit-scrollbar {
		width:6px;
		background-color: rgba(0, 0, 0, 0.1);
	}
	.table-wrap::-webkit-scrollbar-track, .table-wrap li > span::-webkit-scrollbar-track {
		border-radius:10px;
	}
	.table-wrap::-webkit-scrollbar-thumb, .table-wrap li > span::-webkit-scrollbar-thumb {
		border-radius:10px;
		background:rgba(51, 153, 255, 0.4);
	}


	.table-wrap .center {
		text-align: center;
	}


	.info {
		overflow: hidden;
	}
    .info .helf {
        width: 50%;
        float: left;
    }
    .info .clear {
        clear: both;
    }
	.input {
		width: 220px;
		margin-bottom: 10px;
	}
	.textarea {
		width: 218px;
		height: 100px;
		padding: 5px;
		font-size: 14px;
		color: #495060;
		border: 1px solid #dddee1;
    	border-radius: 4px;
	}
</style>



