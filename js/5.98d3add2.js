(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{3204:function(e,t,a){},b659:function(e,t,a){"use strict";a.r(t);var n=a("7a23");const c={class:"q-pa-md"},r={class:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},o=Object(n["m"])("br",null,null,-1);function s(e,t,a,s,l,i){const b=Object(n["J"])("q-icon"),d=Object(n["J"])("q-input"),m=Object(n["J"])("q-card-section"),p=Object(n["J"])("q-separator"),O=Object(n["J"])("q-card"),u=Object(n["J"])("q-table");return Object(n["D"])(),Object(n["i"])("div",c,[Object(n["m"])(u,{grid:"","card-container-class":s.cardContainerClass,title:"Treats",rows:s.rows,columns:s.columns,"row-key":"name",filter:s.filter,"hide-header":"",pagination:s.pagination,"onUpdate:pagination":t[2]||(t[2]=e=>s.pagination=e),"rows-per-page-options":s.rowsPerPageOptions},{"top-right":Object(n["Q"])((()=>[Object(n["m"])(d,{borderless:"",dense:"",debounce:"300",modelValue:s.filter,"onUpdate:modelValue":t[1]||(t[1]=e=>s.filter=e),placeholder:"Search"},{append:Object(n["Q"])((()=>[Object(n["m"])(b,{name:"search"})])),_:1},8,["modelValue"])])),item:Object(n["Q"])((e=>[Object(n["m"])("div",r,[Object(n["m"])(O,null,{default:Object(n["Q"])((()=>[Object(n["m"])(m,{class:"text-center"},{default:Object(n["Q"])((()=>[Object(n["l"])(" Calories for "+Object(n["L"])(e.row.index)+" ",1),o,Object(n["m"])("strong",null,Object(n["L"])(e.row.name),1)])),_:2},1024),Object(n["m"])(p),Object(n["m"])(m,{class:"flex flex-center",style:{fontSize:e.row.calories+"px"}},{default:Object(n["Q"])((()=>[Object(n["m"])("div",null,Object(n["L"])(e.row.calories)+" g",1)])),_:2},1032,["style"])])),_:2},1024)])])),_:1},8,["card-container-class","rows","columns","filter","pagination","rows-per-page-options"])])}a("4e82");var l=a("b3fe");const i=["Frozen Yogurt","Ice cream sandwich","Eclair","Cupcake","Gingerbread","Jelly bean","Lollipop","Honeycomb","Donut","KitKat"];let b=[];i.forEach((e=>{for(let t=0;t<24;t++)b.push({name:e+" ("+t.toString()+")",calories:20+Math.ceil(50*Math.random())})})),b.sort((()=>-1+Math.floor(3*Math.random()))),b=b.map(((e,t)=>(e.index=t,e)));var d={setup(){const e=Object(l["a"])();function t(){return e.screen.lt.sm?3:e.screen.lt.md?6:9}const a=Object(n["G"])(""),c=Object(n["F"])({page:1,rowsPerPage:t()});return Object(n["P"])((()=>e.screen.name),(()=>{c.rowsPerPage=t()})),{rows:b,filter:a,pagination:c,columns:[{name:"name",label:"Name",field:"name"},{name:"calories",label:"Calories (g)",field:"calories"}],cardContainerClass:Object(n["g"])((()=>e.screen.gt.xs?"grid-masonry grid-masonry--"+(e.screen.gt.sm?"3":"2"):null)),rowsPerPageOptions:Object(n["g"])((()=>e.screen.gt.xs?e.screen.gt.sm?[3,6,9]:[3,6]:[3]))}}},m=(a("e593"),a("eaac")),p=a("27f9"),O=a("0016"),u=a("f09f"),j=a("a370"),g=a("eb85"),f=a("eebe"),w=a.n(f);d.render=s;t["default"]=d;w()(d,"components",{QTable:m["a"],QInput:p["a"],QIcon:O["a"],QCard:u["a"],QCardSection:j["a"],QSeparator:g["a"]})},e593:function(e,t,a){"use strict";a("3204")}}]);