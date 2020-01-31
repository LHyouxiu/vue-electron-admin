<template>
  <div class="card mb-3" style="line-height:1.2">
    <div class="card-header d-flex align-items-center">
      规格项:
      <el-input size="mini" style="width:200px"
      :value="item.name" @input="vModel('name',index,$event)">
        <el-button slot="append" icon="el-icon-more"></el-button>
      </el-input>
      <el-radio-group size="mini" style="margin-bottom:-10px;"
      :value="item.type" class="ml-2" @input="vModel('type',index,$event)">
        <el-radio :label="0">无</el-radio>
        <el-radio :label="1">颜色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
      <!-- 上移 -->
      <el-button icon="el-icon-top" size="mini" class="ml-auto" :disabled="index == 0"
      @click="sortCard('moveUp',index)"></el-button>
      <!-- 下移 -->
      <el-button icon="el-icon-bottom" size="mini"
      @click="sortCard('moveDown',index)" :disabled="total == (index+1)"></el-button>
      <el-button size="mini" type="text"
      @click="delSkuCard(index)">删除</el-button>
    </div>
    <div class="card-body">
      <!-- 规格属性列表 -->
      <div class="d-flex align-items-center flex-wrap">
        <sku-card-children :type="item.type"></sku-card-children>
      </div>
      <!-- 增加规格属性 -->
      <div class="mt-2">
        <el-button type="text" size="mini" icon="el-icon-plus">
          增加规格值
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import skuCardChildren from './sku-card-children';
import { mapState,mapMutations } from 'vuex';
export default {
  components: {
    skuCardChildren
  },
  data () {
    return {
      
    }
  },
  props: {
    item:Object,
    index:Number,
    total:Number
  },
  computed: {
    
  },
  methods: {
    ...mapMutations(['delSkuCard','vModelSkuCard','sortSkuCard']),
    vModel(key,index,value){
      this.vModelSkuCard({key,index,value})
    },
    //排序规则卡片
    sortCard(action,index){
      this.sortSkuCard({action,index}) 
    }
  }
}
</script>

<style>

</style>