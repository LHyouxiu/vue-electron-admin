<template>
  <div class="bg-white px-3 good_create" style="margin: -20px;margin-top: -1rem;margin-bottom:0 !important">
    <router-link :to="{name:'shop_goods_list'}" style="position:absolute;top:13px;left:200px;">
      <el-button size="mini">回到商品列表</el-button>
    </router-link>
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane label="基础设置">
        <base-create></base-create>
      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <!-- 规格选项 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格">
            <el-radio-group :value="skus_type" size="medium"
            @input="vModel('skus_type',$event)">
              <el-radio-button label="0">单一规格</el-radio-button>
              <el-radio-button label="1">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 单规格 -->
        <template v-if="skus_type == 0">
          <single-attrs></single-attrs>
        </template>
        <!-- 多规格 -->
        <template v-else>
          <!-- 规格卡片 -->
          <el-form ref="form" label-width="80px">
            <el-form-item label="添加规格">
                <sku-card v-for="(item,index) in sku_card" :key="index"
                :item="item" :index="index" :total="skuCardTotal"></sku-card>
              <el-button type="success" size="mini"
              @click="addSkuCard">添加规格</el-button>
            </el-form-item>
          </el-form>

          <el-form ref="form" label-width="80px">
            <el-form-item label="批量设置">
              <template v-if="!updateAllStatus">
                <el-button type="text"
                v-for="(btn,btnIndex) in updateList"
                :key="btnIndex" @click="openUpdateAllStatus(btn)">{{btn.name}}</el-button>
              </template>
              
              <div v-else class="d-flex align-items-center">
                <el-input :placeholder="UpdateAllPlaceholder" size="small" 
                style="width:150px" class="mr-2"
                type="number" v-model="UpdateAllValue"></el-input>
                <el-button type="primary" size="mini"
                @click="UpdateAllSubmit">设置</el-button>
                <el-button size="mini" @click="closeUpdateAllStatus">取消</el-button>
              </div>
              
            </el-form-item>
            <el-form-item label="规格设置">
              <sku-table ref="table"></sku-table>
            </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性
      </el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置
      </el-tab-pane>
      <el-tab-pane label="商品详情">
        <!-- 富文本编辑器 -->
        <tinymce
          ref="editor"
          v-model="msg"
          @onClick="onClick"
        />

      </el-tab-pane>
      <el-tab-pane label="折扣设置">基础设置
      </el-tab-pane>
		</el-tabs>
  </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
import baseCreate from '@/components/shop/create/base-create.vue';
import singleAttrs from '@/components/shop/create/single-attrs.vue';
import skuCard from '@/components/shop/create/sku/sku-card.vue';
import skuTable from '@/components/shop/create/sku-table.vue';
import tinymce from '@/components/common/tinymce.vue';
export default {
  data () {
    return {
      tabIndex:0,
      msg: 'Welcome to Use Tinymce Editor',
      //批量修改
      updateList:[
        {
          name:'销售价',
          key:'pprice'
        },
        {
          name:'市场价',
          key:'oprice'
        },
        {
          name:'成本价',
          key:'cprice'
        },
        {
          name:'库存',
          key:'stock'
        },
        {
          name:'体积',
          key:'volume'
        },
        {
          name:'重量',
          key:'weight'
        },
      ],
      updateAllStatus:false,
      UpdateAllPlaceholder:'',
      UpdateAllValue:''
    }
  },
  components: {
    baseCreate,
    singleAttrs,
    skuCard,
    skuTable,
    tinymce
  },
  computed: {
    ...mapState({
      skus_type:state=>state.goods_create.skus_type,//0 单一规格 1 多规格
      sku_card:state=>state.goods_create.sku_card
    }),
    //规则卡片总数
    skuCardTotal(){
      return this.sku_card.length
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['vModelState','addSkuCard']),
    //修改表单的值
    vModel(key,value){
      this.vModelState({key,value})
    },
    //加载数据
		handleClick(tab, event) {
			console.log(tab.index);
    },
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    //修改批量设置状态
    openUpdateAllStatus(item){
      this.updateAllStatus = item.key,
      this.UpdateAllPlaceholder = item.name
    },
    //取消批量设置状态
    closeUpdateAllStatus(){
      this.updateAllStatus = false;
      this.UpdateAllValue = ''
    },
    //提交批量设置
    UpdateAllSubmit(){
      this.$refs.table.list.forEach(item=>{
        item[this.updateAllStatus] = this.UpdateAllValue
      });
      this.closeUpdateAllStatus()
    }
  }
}
</script>
<style>
.good_create .el-form-item{
  margin-bottom: 15px;
}
</style>