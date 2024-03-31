<template>
	<view class="charts-content">
		<view class="charts-item">
			<view id="barEcharts" :prop="barOption" :change:prop="echarts.updateEcharts" class="echarts"></view>
		</view>
		<view class="charts-item">
			<view class="title">线图示例</view>
			<view :prop="lineOption" :change:prop="echarts.updateLineEcharts" id="lineEcharts" class="echarts"></view>
		</view>
		<view class="charts-item">
			<view class="title">饼图示例</view>
			<view :prop="pieOption" :change:prop="echarts.updatePieEcharts" id="pieEcharts" class="echarts"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barOption:{
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					xAxis: {
						name: ' ',
						axisTick: {
							show: true //坐标轴刻度线
						},
						axisLine: { //轴线
							show: true
						},
						splitLine: { //网格线
							show: true
						},
						data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
					},
					yAxis: {
						interval:50, // 步长
						min:0, // 起始
						max:200,
					},
					series: [{
							name: '女性评论数',
							type: 'bar',
							data: [5, 12, 16, 20, 16, 29, 5, 20, 36, 10, 10, 20],
							itemStyle: {
								color: '#FD7E4D'
							}
						},
						{
							name: '男性评论数',
							type: 'bar',
							data: [5, 20, 36, 10, 10, 20, 5, 12, 16, 20, 16, 29],
							itemStyle: {
								color: '#86CBF4'
							}
						}
					]
				},
				lineOption:{
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						top: '5%',
						left: 'center'
					},
					xAxis: {
						name: ' ',
						axisTick: {
							show: true //坐标轴刻度线
						},
						axisLine: { //轴线
							show: true
						},
						splitLine: { //网格线
							show: true
						},
						type: 'category',
						data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
					},
					yAxis: {
						type: 'value',
						interval:100, // 步长
						min:0, // 起始
						max:500,
					},
					series: [{
						name: '快递数量趋势',
						type: 'line',
						data: [5, 12, 16, 20, 16, 29, 5, 20, 36, 10, 10, 20],
						itemStyle: {
							color: '#86CBF4'
						}
					}]
				},
				pieOption:{
					title: {
						text: '',
					},
					tooltip: {
						trigger: 'item'
					},
					color: ["#6096E6", "#58B6E5", "#56CA95","#FFBA55","#F18870","#EC5F74"],
					legend: {
						bottom: '2%',
						icon:'circle',
						left: 'center',
						data:['高中','大专','本科','硕士研究生','博士研究生']
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: '50%',
						label: {
							normal: {
								show: true,
								formatter: '{d}%',
							}
						},
						// data:newArr,
						data: [{
								value: 1048,
								name: '高中'
							},
							{
								value: 735,
								name: '大专'
							},
							{
								value: 580,
								name: '本科'
							},
							{
								value: 484,
								name: '硕士研究生'
							},
							{
								value: 300,
								name: '博士研究生'
							}
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				}
			}
		},
		onLoad() {
			this.getBarData();
			this.getLineData();
			this.getPieData()
		},
		methods: {
			getBarData(){
				this.$request.get('/prod-api/api/data/comment/list').then(res=>{
					var data = res.data.rows;
					var obj = {}
					var barArr= [];
					var maleData=[];
					var femaleData=[];
					data.forEach(item=>{
						var year = item.commentTime.slice(0,4)
						var month = item.commentTime.slice(5,7);
					 	if(year=="2023"){
							barArr.push(item.commentUserSex+month);
						}
					}) 
					var barObj = barArr.reduce(function(prev, next) {
						prev[next] = (prev[next] + 1) || 1;
						return prev;
					}, {});
					var barNew=[];
					for (let i in barObj) {
						let obj = {
							'num': barObj[i],
							'name': i,
						}
						barNew.push(obj)
					}
					console.log(barNew);
					barNew.forEach(item=>{
						if(item.name=='001'){
							femaleData[0] = item.num
						}else if(item.name=='101'){
							maleData[0] = item.num
						}else if(item.name=='002'){
							femaleData[1] = item.num
						}else if(item.name=='102'){
							maleData[1] = item.num
						}else if(item.name=='003'){
							femaleData[2] = item.num
						}else if(item.name=='103'){
							maleData[2] = item.num
						}else if(item.name=='004'){
							femaleData[3] = item.num
						}else if(item.name=='104'){
							maleData[3] = item.num
						}else if(item.name=='005'){
							femaleData[4] = item.num
						}else if(item.name=='105'){
							maleData[4] = item.num
						}else if(item.name=='006'){
							femaleData[5] = item.num
						}else if(item.name=='106'){
							maleData[5] = item.num
						}else if(item.name=='007'){
							femaleData[6] = item.num
						}else if(item.name=='107'){
							maleData[6] = item.num
						}else if(item.name=='008'){
							femaleData[7] = item.num
						}else if(item.name=='108'){
							maleData[7] = item.num
						}else if(item.name=='009'){
							femaleData[8] = item.num
						}else if(item.name=='109'){
							maleData[8] = item.num
						}else if(item.name=='010'){
							femaleData[9] = item.num
						}else if(item.name=='110'){
							maleData[9] = item.num
						}else if(item.name=='011'){
							femaleData[10] = item.num
						}else if(item.name=='111'){
							maleData[10] = item.num
						}else if(item.name=='012'){
							femaleData[11] = item.num
						}else if(item.name=='112'){
							maleData[11] = item.num
						}
					})
					/* console.log('男',femaleData)
					console.log('女',maleData) */
					this.barOption.series[0].data=femaleData
					this.barOption.series[1].data=maleData
				})
			},
			getLineData(){
				// 获取折线图数据，进行赋值
				this.$request.get('/prod-api/api/dataAnalysis/information/list').then(res=>{
					var data = res.data.rows;
					var newArr=[];
					var allData=[];
					data.forEach(item=>{
						var year = item.createTime.slice(0,4)
						var month = item.createTime.slice(5,7);
						if(year=="2022"){
							newArr.push(month);
						}
					})
					var myObj = newArr.reduce(function(prev, next) {
						prev[next] = (prev[next] + 1) || 1;
						return prev;
					}, {});
					var allNewArr=[]
					for (let i in myObj) {
						let obj = {
							'num': myObj[i],
							'name': i
						}
						allNewArr.push(obj)
					}
					
					allNewArr.forEach(item=>{
						switch (item.name){
							case '01':
								allData[0]=item.num;
								break;
							case '02':
								allData[1]=item.num;
								break;
							case '03':
								allData[2]=item.num;
								break;
							case '04':
								allData[3]=item.num;
								break;
							case '05':
								allData[4]=item.num;
								break;
							case '06':
								allData[5]=item.num;
								break;
							case '07':
								allData[6]=item.num;
								break;
							case '08':
								allData[7]=item.num;
								break;
							case '09':
								allData[8]=item.num;
								break;
							case '10':
								allData[9]=item.num;
								break;
							case '11':
								allData[10]=item.num;
								break;
							case '12':
								allData[11]=item.num;
								break;
							default:
								break;
						}
					})
					
					this.lineOption.series[0].data = allData;
				})
			},
			getPieData(){
				this.$request.get('/prod-api/api/dataAnalysis/activity/list').then(res=>{
					
					var data = res.data.rows;
					//console.log(data)
					var allNewArr = [];
					let list = data.map(item => {
						return item.activityName
					})
					// console.log(list);//需要
					var bookObj = list.reduce(function(prev, next) {
						//console.log(prev,9999)
						prev[next] = (prev[next] + 1) || 1;
						return prev;
					}, {});
					 for (let i in bookObj) {
						 console.log(bookObj,333333)
						let obj = {
							'value': bookObj[i],
							'name': i
						}
						allNewArr.push(obj)
					}
					this.pieOption.legend.data = list;
					this.pieOption.series[0].data = allNewArr;
				})
			}
		}
	}
</script>

<script module="echarts" lang="renderjs">
	import echarts from "../../static/echarts.js"
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initChar();
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script');
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				// script.src = 'static/echarts.js'
				script.onload = this.initChar.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initChar() {
				this.barData();
				// this.lineCharts();
				// this.pieChart();
			},
			barData() {
				setTimeout(() => {
					let myChart = echarts.init(document.getElementById('barEcharts'));
					// 观测更新的数据在 view 层可以直接访问到
					myChart.setOption(this.barOption)
				})
			},
			updateEcharts(newValue) {
				setTimeout(() => {
					let myChart = echarts.init(document.getElementById('barEcharts'));
					// 观测更新的数据在 view 层可以直接访问到
					myChart.setOption(this.barOption)
				})
			},
			lineCharts() {
				setTimeout(() => {
					let lineChart = echarts.init(document.getElementById('lineEcharts'));
					// 观测更新的数据在 view 层可以直接访问到
					lineChart.setOption(this.lineOption)
				})
			},
			updateLineEcharts(){
				setTimeout(() => {
					let lineChart = echarts.init(document.getElementById('lineEcharts'));
					// 观测更新的数据在 view 层可以直接访问到
					lineChart.setOption(this.lineOption)
				})
			},
			pieChart() {
				/* this.$requst.get('/prod-api/api/job/post/list').then(res=>{
					var data = res.data.rows;
					var allNewArr = [];
					let list = data.map(item => {
						return item.name
					})
					var myObj = list.reduce(function(prev, next) {
						prev[next] = (prev[next] + 1) || 1;
						return prev;
					}, {});
					for (let i in myObj) {
						let obj = {
							'value': myObj[i],
							'name': i
						}
						allNewArr.push(obj)
					}
					var newArr = [];
					allNewArr.forEach(item => {
						if (item.name == "Java开发" || item.name == "技术支持" || item.name == "UX / UI设计员") {
							newArr.push(item)
						}
					}) */
				// })
				setTimeout(() => {
					var	pieChart = echarts.init(document.getElementById('pieEcharts'))
						// 观测更新的数据在 view 层可以直接访问到
						pieChart.setOption(this.pieOption)
				})
			},
			updatePieEcharts(){
				setTimeout(() => {
					var	pieChart = echarts.init(document.getElementById('pieEcharts'))
						// 观测更新的数据在 view 层可以直接访问到
						pieChart.setOption(this.pieOption)
				})
			}
		}
	}
</script>

<style scoped>
	.charts-content{
		padding: 20rpx;
	}
	.title{
		padding-left: 20rpx;
	}
	.echarts {
		width: 100%;
		height: 300px;
	}
</style>
