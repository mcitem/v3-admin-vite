import{ar as e,ac as l,w as a,l as o,t as n,b1 as t,aR as s,X as u,m as d,av as i,aj as r,F as c,at as p,j as m,a1 as v}from"./runtime-core.esm-bundler-42d2bde8.js";function f(a){const{api:o}=a,n=e(!1),t=e([]),s=e("");return l((()=>{n.value=!0,t.value=[],o().then((e=>{t.value=e.data})).finally((()=>{n.value=!1}))})),{loading:n,options:t,value:s}}const h={code:0,data:[{label:"苹果",value:1},{label:"香蕉",value:2},{label:"橘子",value:3,disabled:!0}],message:"获取 Select 数据成功"};function b(){return new Promise(((e,l)=>{setTimeout((()=>{Math.random()<.8?e(h):l(new Error("接口发生错误"))}),2e3)}))}const g={class:"app-container"},V=d("h4",null,"该示例是演示：通过 hook 自动调用 api 后拿到 Select 组件需要的数据并传递给 Select 组件",-1),S=d("h5",null,"Select 示例",-1),j=d("h5",null,"Select V2 示例（如果数据量过多，可以选择该组件）",-1),w=a({__name:"use-fetch-select",setup(e){const{loading:l,options:a,value:d}=f({api:b});return(e,f)=>{const h=i("el-option"),b=i("el-select"),w=i("el-select-v2");return r(),o("div",g,[V,S,n(b,{loading:s(l),modelValue:s(d),"onUpdate:modelValue":f[0]||(f[0]=e=>u(d)?d.value=e:null),filterable:""},{default:t((()=>[(r(!0),o(c,null,p(s(a),((e,l)=>(r(),m(h,v(e,{key:l,placeholder:"请选择"}),null,16)))),128))])),_:1},8,["loading","modelValue"]),j,n(w,{loading:s(l),modelValue:s(d),"onUpdate:modelValue":f[1]||(f[1]=e=>u(d)?d.value=e:null),options:s(a),filterable:"",placeholder:"请选择"},null,8,["loading","modelValue","options"])])}}});export{w as default};
