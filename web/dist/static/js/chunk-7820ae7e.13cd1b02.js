(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7820ae7e"],{"18ed":function(t,e,a){},"1fb7":function(t,e,a){"use strict";var i=a("9636"),n=a.n(i);n.a},"238b":function(t,e,a){},"279d":function(t,e,a){},3286:function(t,e,a){},"462e":function(t,e,a){"use strict";var i=a("b12a"),n=a.n(i);n.a},"55a2":function(t,e,a){"use strict";var i=a("238b"),n=a.n(i);n.a},5811:function(t,e,a){"use strict";a.r(e);var i,n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"course_detail"},[i("van-nav-bar",{attrs:{title:"讲师列表","left-text":"","right-text":"","left-arrow":""},on:{"click-left":t.onClickLeft}}),i("div",{staticClass:"contents"},[i("div",{staticClass:"top_con"},[1===t.active?i("div",{staticClass:"video_con"},[i("video",{staticClass:"video_con",attrs:{id:"video",controls:"",preload:"none",src:t.videoSrc,poster:t.poster}})]):t._e(),0===t.active||2===t.active?i("img",{staticClass:"course_detail_ban",attrs:{src:a("b689")}}):t._e()]),i("div",{staticClass:"course_detail_tab"},[i("van-tabs",{attrs:{"title-active-color":"#d2bd7a",color:"#d2bd7a"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[i("van-tab",{attrs:{title:"详情"}},[i("detail")],1),i("van-tab",{attrs:{title:"目录"}},[i("directory",{on:{"change-video":t.changeVideo}})],1),i("van-tab",{attrs:{title:"评价(9)"}},[i("comments")],1)],1)],1)]),i("van-goods-action",[i("van-goods-action-icon",{attrs:{icon:"chat-o",text:"客服"}}),i("van-goods-action-button",{attrs:{color:"#cfc19a",type:"danger",text:"立即购买"}})],1)],1)},c=[],s=a("bd86"),o=(a("7f7f"),a("2d6d")),l=a("d314"),r=a("d1e1"),d=a("9ffb"),u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"components_container"},[i("div",{staticClass:"contents"},[t._m(0),i("div",{staticClass:"title_con"},[i("van-icon",{staticClass:"icon_de",attrs:{name:"column"}}),i("span",{staticClass:"title"},[t._v("课程介绍")])],1),t._m(1),i("div",{staticClass:"title_con title_con_t"},[i("van-icon",{staticClass:"icon_de",attrs:{name:"manager"}}),i("span",{staticClass:"title"},[t._v("名师介绍")])],1),i("div",{staticClass:"detail_techer"},[i("van-row",{staticClass:"content_list"},[i("van-col",{staticClass:"content_list_l",attrs:{span:"12"}},[i("img",{staticClass:"content_list_img",attrs:{src:a("f626")}})]),i("van-col",{staticClass:"content_list_r",attrs:{span:"19"}},[i("div",{staticClass:"content_list_con"},[i("span",{staticClass:"content_list_title"},[t._v("国学国学国学国学国学国学国学")])]),i("div",{staticClass:"content_list_con content_list_con_b_t"},[i("span",{staticClass:"content_list_c"},[t._v("共"),i("span",{staticClass:"count_s"},[t._v("23")]),t._v("节")]),i("span",{staticClass:"more"},[t._v("查看更多课程")])])])],1),i("div",{staticClass:"teacher_con"},[t._v("\n        111\n      ")])],1)])])},v=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail_title_con"},[a("p",{staticClass:"detail_title"},[a("span",{staticClass:"detail_title_msg"},[t._v("国学")])]),a("div",{staticClass:"content_list_con"},[a("span",{staticClass:"content_list_price"},[t._v("300￥")]),a("span",{staticClass:"content_list_c content_list_m"},[t._v("|")]),a("span",{staticClass:"content_list_c"},[t._v("32节")]),a("span",{staticClass:"content_list_c content_list_z"},[t._v("令狐")])])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content_detail"},[i("p",[t._v("介绍")]),i("img",{attrs:{width:"100%",src:a("b689")}})])}],_={name:"Detail",components:{},data:function(){return{active:0}},computed:{},watch:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{indexListData:function(){}}},p=_,f=(a("e88a"),a("8faf"),a("2877")),m=Object(f["a"])(p,u,v,!1,null,"5ade4e45",null),b=m.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"components_container"},[a("div",{staticClass:"contents"},t._l(t.videoData,(function(e){return a("van-cell-group",{key:e.id},[a("van-cell",{staticClass:"title",attrs:{title:e.title,icon:"label-o"}}),t._l(e.list,(function(e){return a("van-cell",{key:e.id,on:{click:function(a){return t.playVideo(e)}}},[a("template",{slot:"title"},[a("van-tag",{attrs:{plain:""}},[t._v("视屏")]),a("span",{staticClass:"custom_title"},[t._v(t._s(e.title))])],1)],2)}))],2)})),1)])},h=[],g={name:"Directory",components:{},data:function(){return{active:0,videoData:[{id:0,title:"课程大纲",list:[{id:0,title:"课程1",url:"https://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4",poster:"https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820"},{id:1,title:"课程2",url:"http://video.699pic.com/videos/22/04/18/a_Pe8c8ryBB4bj1569220418.mp4",poster:"https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820"},{id:2,title:"课程3",url:"http://video.699pic.com/videos/86/82/16/a_V5kZaNyT3Y8J1570868217.mp4",poster:"https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820"}]},{id:1,title:"课程大纲1",list:[{id:0,title:"课程1",url:"https://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4",poster:"https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820"},{id:1,title:"课程2",url:"http://video.699pic.com/videos/22/04/18/a_Pe8c8ryBB4bj1569220418.mp4",poster:"https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820"},{id:2,title:"课程3",url:"http://video.699pic.com/videos/86/82/16/a_V5kZaNyT3Y8J1570868217.mp4",poster:"https://img95.699pic.com//video_cover/22/04/14/a_PumGuCB3WKbP1569220414.jpg!/fw/820"}]}]}},computed:{},watch:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{playVideo:function(t){this.$emit("change-video",t)}}},j=g,w=(a("cecd"),a("6608"),Object(f["a"])(j,C,h,!1,null,"a4f46330",null)),y=w.exports,P=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"components_container"},[a("div",{staticClass:"contents"},[a("van-panel",{attrs:{title:"标题",desc:"课程不错"}})],1)])},x=[],k={name:"Detail",components:{},data:function(){return{active:0}},computed:{},watch:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{indexListData:function(){}}},O=k,B=(a("98cf"),a("55a2"),Object(f["a"])(O,P,x,!1,null,"15c43b85",null)),D=B.exports,$={name:"CourseDetail",components:(i={},Object(s["a"])(i,o["a"].name,o["a"]),Object(s["a"])(i,l["a"].name,l["a"]),Object(s["a"])(i,r["a"].name,r["a"]),Object(s["a"])(i,r["a"].Col,d["a"]),Object(s["a"])(i,"Detail",b),Object(s["a"])(i,"Directory",y),Object(s["a"])(i,"Comments",D),i),data:function(){return{videoSrc:"",poster:"",active:0}},computed:{},watch:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{changeVideo:function(t){this.videoSrc=t.url,this.poster=t.poster},onClickLeft:function(){this.$router.go(-1)}}},E=$,G=(a("1fb7"),a("462e"),Object(f["a"])(E,n,c,!1,null,"ea7b3006",null));e["default"]=G.exports},6608:function(t,e,a){"use strict";var i=a("816b"),n=a.n(i);n.a},"816b":function(t,e,a){},"8faf":function(t,e,a){"use strict";var i=a("18ed"),n=a.n(i);n.a},9636:function(t,e,a){},"98cf":function(t,e,a){"use strict";var i=a("279d"),n=a.n(i);n.a},abcc:function(t,e,a){},b12a:function(t,e,a){},b689:function(t,e,a){t.exports=a.p+"static/img/vip_bg.16cf090b.png"},cecd:function(t,e,a){"use strict";var i=a("3286"),n=a.n(i);n.a},e88a:function(t,e,a){"use strict";var i=a("abcc"),n=a.n(i);n.a},f626:function(t,e,a){t.exports=a.p+"static/img/banner.85115c1a.jpg"}}]);
//# sourceMappingURL=chunk-7820ae7e.13cd1b02.js.map