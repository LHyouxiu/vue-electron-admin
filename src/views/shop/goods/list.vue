<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;margin-bottom:0 !important">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name"
			v-for="(tab,tabI) in tabbars" :key="tabI">
				<button-search placeholder="要搜索的商品名称" ref="buttonSearch"
				@search="searchEvent">
					<template #left>
						<!-- 左边 -->
						<router-link :to="{name:'shop_goods_create'}">
							<el-button type="success" size="mini">发布商品</el-button>
						</router-link>
						
						<el-button type="warning" size="mini">恢复商品</el-button>
						<el-button type="danger" size="mini">批量删除</el-button>
						<el-button size="mini">上架</el-button>
						<el-button size="mini">下架</el-button>
						<el-button size="mini">推荐</el-button>
					</template>
					<!-- 高级搜索表单 -->	
					<template #form>
						<!-- 表单 -->
						<el-form inline ref="form" :model="form"
						label-width="80px">
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name" placeholder="商品名称"
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品编码" class="mb-0">
								<el-input v-model="form.code" placeholder="商品编码"
								size="mini"></el-input>
							</el-form-item>
							<el-form-item label="商品类型" class="mb-0">
								<el-select v-model="form.type" size="mini"
								placeholder="请选择商品类型">
									<el-option label="区域一"
									value="shanghai"></el-option>
									<el-option label="区域二" 
									value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="商品分类" class="mb-0">
								<el-input v-model="form.category" placeholder="商品分类"
								size="mini"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button type="info" size="mini"
								@click="searchEvent">搜索</el-button>
								<el-button size="mini"
								@click="clearSearch">清空删选条件</el-button>
							</el-form-item>
						</el-form>
					</template>	
				</button-search>
				<!-- 商品列表 -->
				<el-table
					:data="tableData[tabI].list"
					border
					class="mt-3"
					style="width: 100%"
					@selection-change="handleSelectionChange">
					<el-table-column
						type="selection"
						width="45"
						align="center">
					</el-table-column>
					<el-table-column
						prop="title"
						label="商品"
						width="380"
						align="center">
						<template slot-scope="scope">
							<div class="media">
								<img class="mr-3" style="width:60px;height:60px;" :src="scope.row.cover">
								<div class="media-body">
									<p class="mt-0">{{scope.row.title}}</p>
									<p class="mb-0">分类:{{scope.row.category}}</p>
									<p class="mb-0">时间:{{scope.row.create_time}}</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="type"
						label="商品类型"
						align="center">
					</el-table-column>
					<el-table-column
						prop="scale_count"
						label="实际销量"
						align="center">
					</el-table-column>
					<el-table-column
						prop="order"
						label="商品排序"
						align="center">
					</el-table-column>
					<el-table-column
						label="商品状态"
						align="center">
						<template slot-scope="scope">
							<el-button type="success" size="mini" plain
							@click="scope.row.ischeck = 1">审核通过</el-button>
							<el-button type="danger" size="mini" plain class="ml-0 mt-2"
							@click="scope.row.ischeck = 2">审核通过</el-button>
						</template>
						<!-- <template slot-scope="scope">
							<el-button :type="scope.row.status ?'success':'danger'" size="mini" plain
							@click="changeStatus(scope.row)">{{scope.row.status ? '上架':'下架'}}</el-button>
						</template> -->
					</el-table-column>
					<el-table-column
						prop="stock"
						label="总库存"
						align="center">
					</el-table-column>
					<el-table-column
						prop="pprice"
						label="价格(元)"
						align="center">
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						width="150">
						<template slot-scope="scope">
							<el-button-group>
								<el-button type="primary" size="mini" plain>修改</el-button>
								<el-button type="danger" size="mini" plain
								@click="deleteItem(scope.$index)">删除</el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
				<div style="height:60px;">
					<el-footer class="border-top d-flex align-items-center px-0
					position-fixed bg-white" style="bottom:0;left:200px;right:0;z-index:100">
						<!-- 底部 -->
						<div style="flex:1;" class="px-2">
							<el-pagination
								:current-page="tableData[tabI].currentPage"
								:page-sizes="[100, 200, 300, 400]"
								:page-size="100"
								layout="total, sizes, prev, pager, next, jumper"
								:total="400">
							</el-pagination>
						</div>
					</el-footer>
				</div>
				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import buttonSearch from "@/components/common/button-search.vue";
export default {
	components: {
		buttonSearch
	},
	data () {
		return {
			tabIndex: 0,
			tabbars:[
				{name:"审核中"},
				{name:"出售中"},
				{name:"已下架"},
				{name:"库存预警"},
				{name:"回收站"}
			],
			form:{
				name:'',
				code:'',
				type:'',
				category:''
			},
			tableData: [],
			multipleSelection: []
		}
	},
	mounted () {
	},
	created () {
		this.__getData()
	},
	methods: {
		//生成数据
		__getData(){
			for (let i = 0; i < this.tabbars.length; i++) {
				this.tableData.push({
					currentPage:1,
					list:[]
				})
				for (let j = 0; j < 20; j++) {
					this.tableData[i].list.push({
							id:j,
							title:'荣耀 V10全网通 标配版 4GB+64GB 魅力红'+i+'-'+j,
							cover:'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
							create_time:'2019-07-17 18:34:14',
							category:'手机',
							type:'普通商品',
							scale_count:20,
							order:100,
							status:1,
							stock:200,
							pprice:1000,
							ischeck:1
							//0未审核 1审核通过 2不通过
					})
					
				}
			}
		},
		//上下架
		changeStatus(item){
			item.status = item.status === 1 ? 0 : 1
		},
		//删除当前商品
		deleteItem(index){//tableData包含五个tab里面的表格数据
			this.$confirm('此操作将永久删除,是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.tableData[this.tabIndex].list.splice(index,1)
			}).catch(() => {})
		},
		//搜索事件
		searchEvent(e = false){
			//简单搜索
			if(typeof e === 'string'){
				return console.log('简单搜索',e)
			}
			//高级搜索
			console.log('搜索事件')
		},
		//选中
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		//加载数据
		handleClick(tab, event) {
			console.log(this.tabIndex);
		},
		//清空删选条件
		clearSearch(){
			this.form = {
				name:'',
				code:'',
				type:'',
				category:''
			},
			this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
		}
	}
}
</script>

<style>
</style>
