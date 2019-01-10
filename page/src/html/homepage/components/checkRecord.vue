<template>
	<section>
		<p class="title">记录查看</p>
		<div class="info blue-bar">
			<h3>入库记录</h3>
			<li v-for="storage in inList" :key="storage.sno">
					<span>{{storage.sno}}</span>
					<span>{{storage.ino}}</span>
					<span>{{storage.sprice}}/件</span>
					<span>{{storage.scount}}件</span>
					<span>{{storage.sdate.split("T")[0]}}</span>
				</li>
			<h3>出库记录</h3>
			<li v-for="sale in outList" :key="sale.sano">
					<span>{{sale.sano}}</span>
					<span>{{sale.ino}}</span>
					<span>{{sale.saprice}}/件</span>
					<span>{{sale.sacount}}件</span>
					<span>{{sale.sadate.split("T")[0]}}</span>
				</li>
		</div>
	</section>
</template>

<script>
	import {mapState, mapActions} from 'vuex';
	import user from  '../store/types/user'
	export default {
		data () {
			return {
                courseName: '',
                credit: 1,
                courseDescribe: '',
                startSelectTime: '',
                endSelectTime: '',
			}
        },
        computed: {
            ...mapState({
                'user': state => {
                    return state.user
				},
				'inList': state => {
					return state.user.inList
				},
				'outList': state => {
					return state.user.outList
				},
            }),
        },
		methods: {
			...mapActions(user.actions),

			initInList() {
				this.getInList().then(data => {
					if(data.state){
					}else{
						this.$Message.error(data.info)
					}
				}).catch(err => {
					this.$Message.error(err)
				})
			},
			initOutList() {
				this.getOutList().then(data => {
					if(data.state){
					}else{
						this.$Message.error(data.info)
					}
				}).catch(err => {
					this.$Message.error(err)
				})
		
			}
		},
		mounted() {
			this.initInList()
			this.initOutList()
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
		width: 80%;
		height: 380px;
	    padding: 30px 40px;
	    margin: 80px 0 0 3%;
	    box-shadow: 1px 1px 8px 1px #b1b1b1;
		background: rgba(255, 255, 255, 0.8);
		overflow-y: scroll;
	}
	.info > div {
        margin-bottom: 10px;
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
		margin-bottom: 20px;
    }
    .textarea {
        width: calc(100% - 129px);
        height: 100px;
        margin-bottom: 20px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        padding: 10px;
        font-size: 16px;
    }
	.change-bt {
        position: absolute;
        width: 140px;
        bottom: 32px;
        right: 60px;
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
		font-size: 20px;
		width: 100px;
		vertical-align: top;
	}

	.info li {
		list-style: none;
	}
	.info span {
		display: inline-block;
		width: 120px;
		margin: 10px 0;
		text-align: center;
		font-size: 15px;
	}
</style>