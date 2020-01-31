<template>
  <div class="border py-1 px-2 rounded mr-2 position-relative d-flex align-items-center">
    <div v-if="type != 0">
      <!-- 颜色选择器 -->
      <el-color-picker size="mini" v-if="type == 1">
      </el-color-picker>
      <!-- 图片选择 -->
      <span class="btn btn-light border mr-2" v-else>
        <i class="el-icon-plus"></i>
      </span>
    </div>
      <input value="内容" class="form-control text-center border-0" 
      style="width:80px;font-size:15px;">

    <span class="btn btn-light p-0 position-absolute"
    style="line-height:1;right:-10px;top:-10px">
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type:{
      type:Number,
      default:0
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>