<template>
	<div>
		
		<!-- 数据统计 -->
		<el-row :gutter="20">
			<el-col :span="6" v-for="(item,index) in counts"
			:key="index">
				<el-card class="box-card" shadow="hover">
					<div class="d-flex align-items-center">
						<i 
						:class="[item.icon,item.color]"
						class="h4 mb-0 text-white text-center mr-3"
						style="width: 40px;height: 40px;line-height: 40px;">
						</i>
						<div>
							<h4 class="mb-1">{{item.num}}</h4>
							<small class="text-muted">{{item.desc}}</small>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		
		<!-- 店铺、订单提示 | 统计图 -->
		<el-row :gutter="20" class="mt-3">
			<!-- 店铺、订单提示 -->
			<el-col :span="12" class="d-flex flex-column" 
			style="height: 370px;justify-content: space-between;">
			
				<el-card class="box-card" shadow="never"
				v-for="(tip,ti) in tips" :key="ti">
					<div slot="header" class="clearfix">
						<span>{{tip.title}}</span>
						<el-button style="float: right; padding: 3px 0" 
						type="text">{{tip.desc}}</el-button>
					</div>
					<div class="row">
						<div :class="tip.list.length|getCol" 
						v-for="(tlist,listi) in tip.list"
						:key="listi">
							<button class="btn btn-light w-100">
								<h4 class="mb-1">{{tlist.value}}</h4>
								<small class="text-muted">
								{{tlist.name}}</small>
							</button>
						</div>
						
					</div>
				</el-card>
				
			</el-col>
			<!-- 统计图 -->
			<el-col :span="12">
				<el-card class="box-card" style="height: 370px;" 
				shadow="never">
					<div slot="订单总数统计" class="clearfix">
						<span>订单数量</span>
						<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
					</div>
					<!-- 统计图容器 -->
					<div ref="myChart" 
					style="width: 100%;height: 330px;"></div>
					
				</el-card>
			</el-col>
		</el-row>
		
		<!-- 销售情况统计 | 单品销售排名 -->
		<el-row :gutter="20" class="my-3">
			<el-col :span="12">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span>销售情况统计</span>
						<el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
					</div>
					
					<div class="media align-items-center border">
						<span class="py-4 px-3 bg-light border-right">
							昨日销量</span>
						<div class="media-body">
							<div class="border-bottom pl-3 pb-1 mb-1"> 
							<span>订单金额(元)  </span> 12</div>
							<div class="pl-3"> 
							<span>订单量(件) </span> 12</div>
						</div>
					</div>
					
					<div class="media align-items-center border mt-3">
						<span class="py-4 px-3 bg-light border-right">
							本月销量</span>
						<div class="media-body">
							<div class="border-bottom pl-3 pb-1 mb-1"> 
							<span>订单金额(元) </span> 12</div>
							<div class="pl-3"> 
							<span>订单量(件) </span> 12</div>
						</div>
					</div>
					
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span>单品销售排名</span>
						<el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
					</div>
					
					<el-table
					:data="tableData"
					height="200"
					border
					style="width: 100%">
					<el-table-column
					  type="index"
					  label="#"
					  width="50">
					</el-table-column>
					
					<el-table-column
					  prop="name"
					  label="商品信息">
					</el-table-column>

					<el-table-column
					  prop="num"
					  label="销量"
					  width="50">
					</el-table-column>

				  </el-table>
					
					
				</el-card>
			</el-col>
		</el-row>
		
		
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		data() {
			return {
				tableData: [
					{
						name:"小天鹅（LittleSwan）滚筒洗衣机...",
						num:"9"
					},
					{
						name:"小天鹅（LittleSwan）滚筒洗衣机...",
						num:"9"
					},
					{
						name:"小天鹅（LittleSwan）滚筒洗衣机...",
						num:"9"
					},
					{
						name:"小天鹅（LittleSwan）滚筒洗衣机...",
						num:"9"
					},
					{
						name:"小天鹅（LittleSwan）滚筒洗衣机...",
						num:"9"
					}
				],
				counts: [
					{ icon:"el-icon-user-solid",desc:"关注人数(个)",num:"30",color:"bg-primary" },
					{ icon:"el-icon-s-finance",desc:"订单总数(笔)",num:"120",color:"bg-success" },
					{ icon:"el-icon-s-order",desc:"今日订单总金额(元)",num:"4183.80" ,color:"bg-danger"},
					{ icon:"el-icon-s-data",desc:"本月销量(笔)",num:"100",color:"bg-warning" },
				],
				tips:[
					{
						title:"店铺及商品提示",
						desc:"需要关注的店铺信息及待处理事项",
						list:[
							{ name:"出售中",value:"64" },
							{ name:"待回复",value:"10" },
							{ name:"库存预警",value:"0" },
							{ name:"仓库中",value:"3" },
						]
					},
					{
						title:"交易提示",
						desc:"需要立即处理的交易订单",
						list:[
							{ name:"待付款",value:"0" },
							{ name:"待发货",value:"10" },
							{ name:"已发货",value:"0" },
							{ name:"已收货",value:"3" },
							{ name:"退款中",value:"3" },
							{ name:"待售后",value:"3" },
						]
					},
				]
			}
		},
		filters: {
			getCol(total) {
				return `col-${12/total}`;
			}
		},
		mounted () {
			this.cartogramChart()
		},
		methods: {
			cartogramChart() {
				var option = {
					tooltip: {
						trigger: "axis", //'axis'坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
						axisPointer: {
							lineStyle: {
								color: "#57617B"
							}
						}
					},
					legend: {
						data: ["制动盘温度", "闸片温度"],

						left: "right",
						type: "scroll",
						orient: "horizontal",
						textStyle: {
							color: "#A3E2F4",
							fontSize: 11,
						},
						itemWidth: 12,
						itemHeight: 8,
						// itemGap: 35
					},
					grid: {
						top: "5%",
						left: "3%", //grid 组件离容器左侧的距离。
						right: "2%", //grid 组件离容器右侧的距离。
						bottom: "5%", //grid 组件离容器下侧的距离。
						containLabel: true
					},
					xAxis: [
						{
							name: "制动时间(s)",
							nameLocation: "middle",
							nameGap: 25,
							type: "category",
							boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
							axisLine: {
								lineStyle: {
									color: "#A3E2F4" //坐标轴线线的颜色。
								}
							},
							data: ["1s", "3s", "5s", "10s", "20s", "30s", "60s", "100s", "150s"]
						}
					],
					yAxis: [
						{
							type: "value", 
							//name: "（件）", //坐标轴名称。
							name: "温度(℃)",
							nameLocation: "middle",
							nameGap: 40,
							axisTick: {
								show: true //是否显示坐标轴刻度
							},
							axisLine: {
								lineStyle: {
									color: "#A3E2F4" //坐标轴线线的颜色
								}
							},
							axisLabel: {
								margin: 10, //刻度标签与轴线之间的距离
								textStyle: {
									fontSize: 12 //文字的字体大小
								}
							},
							splitLine: {
								show: false,
								lineStyle: {
									color: "#A3E2F4" //分隔线颜色设置
								}
							}
						}
					],
					series: [
						{
							name: "制动盘温度",
							type: "line",
							smooth: true,
							symbol: "circle",
							symbolSize: 5,
							showSymbol: false,
							lineStyle: {
								normal: {
									width: 2,
									color: "rgba(0,136,219,1)"
								}
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1,
										[
											{
												offset: 0,
												color: "rgba(0,136,219,1)"
											},
											{
												offset: 0.8,
												color: "rgba(0,136,219,0)"
											}
										],
										false
									),
									shadowColor: "rgba(0, 0, 0, 0.1)",
									shadowBlur: 10
								}
							},
							itemStyle: {
								normal: {
									color: "rgba(0,136,219,1)",
									borderColor: "rgba(0,136,219,1)",
									borderWidth: 12
								}
							},
							data: [
								152,
								289,
								283,
								296,
								324,
								256,
								164,
								157,
								328,
								334,
								342,
								395,
								485,
								267,
								200,
								394,
								519,
								556,
								590,
								516,
								272,
								216,
								502,
								472,
								512,
								359,
								333,
								176,
								174,
								329,
								373
							]
						},
						{
							type: "line",
							name: "闸片温度",
							smooth: true,
							symbol: "circle",
							symbolSize: 5,
							showSymbol: false,
							lineStyle: {
								normal: {
									width: 2,
									color: "rgba(82,255,176,1)"
								}
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1,
										[
											{
												offset: 0,
												color: "rgba(82,255,176,1)"
											},
											{
												offset: 0.8,
												color: "rgba(82,255,176,0)"
											}
										],
										false
									),
									shadowColor: "rgba(0, 0, 0, 0.1)",
									shadowBlur: 10
								}
							},
							itemStyle: {
								normal: {
									color: "rgba(82,255,176,1)",
									borderColor: "rgba(82,255,176,1)",
									borderWidth: 12
								}
							},
							data: [
								252,
								289,
								283,
								296,
								224,
								256,
								264,
								257,
								228,
								234,
								242,
								295,
								285,
								267,
								200,
								294,
								219,
								256,
								290,
								216,
								272,
								216,
								202,
								272,
								212,
								259,
								233,
								276,
								274,
								229,
								273
							]
						}
					]
				};
				var myChart = echarts.init(this.$refs.myChart);
				myChart.setOption(option);
    	}
		}
	}
</script>

<style>
</style>
