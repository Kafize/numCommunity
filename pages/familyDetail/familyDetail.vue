<template>
	<view>
		<view class="add-info">
			<view class="add-item">
				<view class="left-info">房屋信息：</view>
				<view class="right-info">
					<picker @change="houseChange" mode = selector :value="hIndex"  range-key="name" :range="houseList">
						<view class="uni-input">{{houseList[hIndex].name}}</view>
					</picker>
				</view>
			</view>
			<view class="add-item">
				<view class="left-info">住户类型：</view>
				<view class="right-info">
					<picker @change="typeChange" :value="index" :range="typeArr">
						<view class="uni-input">{{typeArr[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="add-item">
				<view class="left-info">姓名：</view>
				<input type="text" placeholder="请输入姓名" v-model="name">
			</view>
			<view class="add-item">
				<view class="left-info">性别：</view>
				<radio-group @change="sexChange" class="sex-list">
					<label class="choose-sex" v-for="(item, index) in sexItem" :key="index">
							<radio :value="item.value" :checked="index === current" />
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="add-item">
				<view class="left-info">手机号：</view>
				<input type="text" placeholder="请输入手机号" v-model="phone">
			</view>
			<view class="add-item">
				<view class="left-info">身份证号：</view>
				<input type="text" placeholder="请输入身份证号" v-model="idCard">
			</view>
			<view class="save-btn" >
				<view class="save" @click="saveInfo">保存</view>
				<view class="del" @click="delMember()">删除</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexItem:[
					{ value: '男', name: '男',checked: 'true'},
					{ value: '女',name: '女'},
				],
				index:0,
				current: 0,
				typeArr:['住户','租户','户主'],
				houseList:[],
				hIndex:0,
				name:'',
				gander:'',
				phone:'',
				idCard:'',
				id:0,
				houseId:''
			};
		},
		onLoad(option) {
			this.houseData();
			this.getMember(option.id);
			this.id = option.id;
		},
		methods:{
			getMember(id){
				this.$request.get(`/prod-api/api/community/member—family/${id}`).then(res=>{
					console.log(res)
					this.memberInfo = res.data.data;
					this.name = res.data.data.name;
					this.gander = res.data.data.gander;
					this.phone = res.data.data.phone;
					this.idCard = res.data.data.idCard;
					this.period = res.data.data.period;
					this.houseId = res.data.data.houseId;
				})
			},
			// 住户类型
			typeChange(e){
				this.index = e.detail.value;
			},
			sexChange(e){
				console.log(e)
				this.gander = e.detail.value
			},
			houseData(){
				this.$request.get('/prod-api/api/community/house/list').then(res=>{
					console.log(res);
					this.houseList = res.data.rows;
				})
			},
			houseChange(e){
				this.hIndex = e.detail.value;
			},
			saveInfo(){
				this.$request.put('/prod-api/api/community/member—family',{
					householdType:this.typeArr[this.index],
					name:this.name,
					gander:this.gander,
					phone:this.phone,
					idCard:this.idCard,
					period:'长期有效',
					id:this.id,
					houseId:this.houseId,
					imgUrl:'/profile/upload/2023/04/23/bba83b19-b30f-4b92-bbdd-924521adbf02.jpg'
				}).then(res=>{
					console.log(res)
					if(res.data.code==200){
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/familyMember/familyMember"
							})
						},2000)
						
					}
				})
			},
			// 删除
			delMember(){
				uni.showModal({
					title: '提示',
					content: '确定要删除吗',
					success: function (res) {
						if (res.confirm) {
							this.$request.del(`/prod-api/api/community/member—family/${this.id}`).then(res=>{
								console.log(res)
								if(res.data.code==200){
									uni.navigateTo({
										url:"/pages/familyMember/familyMember"
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)
				});
				
			},
		}
	}
</script>

<style lang="scss" scoped>
.save-btn{
	width: 80%;
	margin:  auto;
	margin-top: 80rpx;
	height: 70rpx;
	line-height: 70rpx;
	display: flex;
	justify-content: space-between;
	font-size: 28rpx;
	.save,.del{
		width: 40%;
		text-align: center;
		background-color: #1296db;
		color: #fff;
		border-radius: 10rpx;
	}
	.del{
		border: 1px crimson solid;
		background-color: #fff;
		color: crimson;
	}
	
}
.add-info{
	padding: 20rpx;
	.add-item{
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1px solid #ccc;
		.left-info{
			width: 160rpx;
			text-align: right;
			font-size: 30rpx;
			margin-right: 10rpx;
		}
		input{
			height: 80rpx;
		}
		.sex-list{
			display: flex;
			align-items: center;
		}
		.choose-sex{
			display: flex;
			margin-right: 20rpx;
		}
	}
}
</style>
