<template>
  <div>
    <el-dialog title="商品规格选择" :visible.sync="createModel" width="80%" top="5vh">
        <el-container style="position:relative;height: 70vh;margin:-30px -20px">
          
        <el-container>
        <el-aside width="200px" style="position: absolute;top: 0;left: 0;bottom: 0;"
        class="bg-white border-right">
          <!-- 侧边 | 规格卡片标题-->
          <ul class="list-group list-group-flush">
             <li class="list-group-item list-group-item-action"
             v-for="(item,index) in skusList" :key="index"
             :class="skuIndex === index ? 'sum-active':''"
             @click="changeSku(index)">{{item.name}}</li>
          </ul>
          
        </el-aside>
        <el-container>
          <el-header style="position:absolute;top:0;left:200px;right:0;height:60px;line-height:60px;" 
          class="border-top border-bottom">
            <el-button type="primary" size="mini">
              {{isChooseAll ? '取消全选':'全选'}}</el-button>
          </el-header>
          <el-main style="position: absolute;top: 60px;left:200px;bottom: 0;right: 0;">
            <!-- 主内容 -->
            <div class="d-flex flex-wrap">
              <span class="border rounded py-1 px-2 m-1"
              style="cursor:pointer"
              v-for="(item,index) in skuItems" :key="index"
              :class="item.ischeck ? 'sum-active':''"
              @click="choose(item)">
                {{item.name}}
              </span>
            </div>
          
          </el-main>
        </el-container>
        </el-container>
        
      </el-container>

        <div slot="footer" class="dialog-footer">
          <el-button type="" @click="hide">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      createModel: false,
      callback:false,
      skuIndex:0,
      // 选中的数组
      chooseList:[],
      //数据
      skusList:[
        {
        name:"颜色1",
        type:0,
        list:[{
            id:1,
            name:"黄色1",
            image:"",
            color:"",
            ischeck:false
          },{
            id:2,
            name:"红色1",
            image:"",
            color:"",
            ischeck:false
          }]
        },
        {
          name:"尺寸",
          type:0,  
          list:[
            {
              id:3,
              name:"XL",
              image:"",
              color:"",
              ischeck:false
            },
            {
              id:4,
              name:"XXL",
              image:"",
              color:"",
              ischeck:false
            }]
        }
      ]
    }
  },
  created() {
    
  },
  computed: {
    //当前规格下的规格属性列表
    skuItems(){
      return this.skusList[this.skuIndex].list
    },
    //是否全选
    isChooseAll(){
      return this.skuItems.length === this.chooseList.length;
    }
  },
  methods: {
    //打开弹出层
    chooseSkus(callback){
      
      this.callback = callback;
      this.createModel = true
    },
    //确定
    confirm(){
      //选中的skus
      if(typeof this.callback === 'function'){
         this.callback(this.chooseList)
      }
      //隐藏
      this.hide()
    },
    //关闭弹出层
    hide(){
      this.createModel = false
      this.callback = false
    },
    //切换规则卡片
    changeSku(index){
      this.skuIndex = index
    },
    //选中规格属性
    choose(item){
      //之前未选中
      if(!item.ischeck){
        //加入选中列表
        this.chooseList.push(item)
        //修改选中状态
        return item.ischeck = true
      }
      //之前选中
      //找到当前对象chooselist索引
      let index = this.chooseList.findIndex(v=>{
        return v.id == item.id
      })
      //找不到
      if (index < 0) return;
      //从选中列表中移除
      this.chooseList.splice(index,1)
      //修改选中状态
      item.ischeck = false

    }
  }
}
</script>

<style>
.sum-active{
  background-color: teal;
  color: #ffffff
}
</style>