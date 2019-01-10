<template>
	<section>
		<p class="title">单据填写</p>
		<div class="info blue-bar">
			<div>
				<span class="tip">订单号：</span>
				<Input class="input" type="text" v-model="orderId" placeholder="订单号"></Input> 
			</div>
			<div>
				<span class="tip">货品号：</span>
				<Input class="input" type="text" v-model="itemId" placeholder="货品号"></Input> 
			</div>
			<div>
				<span class="tip">货品数量：</span>
				<Input class="input" type="text" v-model="count" placeholder="货品数量"></Input> 
			</div>
			<div>
				<span class="tip">货品价格：</span>
				<Input class="input" type="text" v-model="price" placeholder="货品价格"></Input> 
			</div>
			<div>
				<span class="tip">日期：</span>
				<Input class="input" type="text" v-model="date" placeholder="YYYY-MM-DD格式"></Input> 
			</div>
			<div>
				<span class="tip">类别：</span>
				<input type="radio" name="operation" id="outStore" value="out" checked @click="changeOperation()"><span style="font-size: medium; margin-right: 10px;">出库</span>
				<input type="radio" name="operation" id="inStore" value="in" @click="changeOperation()"><span style="font-size: medium;">入库</span><br>
			</div>
			<!-- <div v-show="operation">
				<span class="tip">供应商号：</span>
				<Input class="input" type="text" v-model="producerId" placeholder="供应商号"></Input> 
			</div> -->
			<div v-show="!operation">
				<span class="tip">客户账号：</span>
				<Input class="input" type="text" v-model="customerId" placeholder="客户账号"></Input> 
			</div>
			<Button type="primary" class="change-bt my-bt" @click="addOrder()">添加记录</Button>
		</div>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import user from  '../store/types/user'
	export default {
		data () {
			return {

				operation: 0,
				orderId: '',
				itemId: '',
				count: undefined,
				price: undefined,
				producerId: '',
				customerId: '',
				date: ''

			}
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

			changeOperation () {
				this.operation = !this.operation;
			},
			addOrder () {
				console.log("111")
				if(this.operation == 0) {
					this.outStore({
						orderId: this.orderId,
						itemId: this.itemId,
						count: this.count,
						price: this.price,
						date: this.date,
						customerId: this.customerId
					}).then(data => {
						if(data.state){
							this.$Message.success(data.info)
						}else{
							this.$Message.error(data.info)
						}
					}).catch(err => {
						this.$Message.error(err)
					})
				} else {
					this.inStore({
						orderId: this.orderId,
						itemId: this.itemId,
						count: this.count,
						price: this.price,
						date: this.date
					}).then(data => {
						if(data.state){
							this.$Message.success(data.info)
						}else{
							this.$Message.error(data.info)
						}
					}).catch(err => {
						this.$Message.error(err)
					})
				}
			}
		},
		mounted() {
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
	.info {
		width: 700px;
		height: 430px;
	    padding: 30px 40px;
	    margin: 80px 0 0 15%;
	    box-shadow: 1px 1px 8px 1px #b1b1b1;
		background: rgba(255, 255, 255, 0.8);
	}
	.info > div {
		margin-bottom: 20px;
	}
	.input {
		width: 300px;
		margin-bottom: 5px;
	}
	.change-bt {
		position: absolute;
		right: 30px;
		top: 30px;
		width: 140px;
	}
	.text {
		display: inline-block;
		width: 80px;
		padding-right: 10px;
		text-align: right;
		font-size: 16px;
	}
	.tip {
		display: inline-block;
		font-size: 18px;
		width: 100px;
		vertical-align: top;
	}
	#inStore, #outStore {
		font-size: medium;
	}
</style>