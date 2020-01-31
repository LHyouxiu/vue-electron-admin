import $Util from '@/common/util.js';
export default {
  state: {
    skus_type:0,//0 单一规格 1 多规格
    title:"",//商品名称
    category:[],//商品分类
    desc:"",//描述
    unit:"",//单位
    stock:0,//总库存
    min_stock:0,//库存预警
    status:0,//是否上架 0仓库 1上架
    display_stock:0,//库存显示 0隐藏 1显示
    express:"",//运费模板

    oprice:0, // 市场价格
		pprice:0, // 销售价格
		cprice:0, // 成本价格
		weight:0, // 重量
    volume:0, // 体积
    //规格卡片
    sku_card:[
      {
        name:"颜色",
        type:0,//规格类型 0无 1颜色 2图片
        list:[]
      }
    ]
  },
  getters: {
    
  },
  mutations: {
    //修改state
    vModelState(state,{key,value}){
      state[key] = value
    },
    //增加规格卡片
    addSkuCard(state){
      state.sku_card.push({
        name:"规格名称",
        type:0,
        list:[]
      })
    },
    //删除规格卡片
    delSkuCard(state,index){
      state.sku_card.splice(index,1)
    },
    //修改卡片
    vModelSkuCard(state,{key,index,value}){
      state.sku_card[index][key] = value
    },
    //规则卡片排序
    sortSkuCard(state,{action,index}){
      //上移
      $Util[action](state.sku_card,index)
    }
  },
  actions: {
    
  }
}