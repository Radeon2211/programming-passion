(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[3],{476:function(e,t,a){e.exports={Content:"ChangePhoto_Content__3PGap",Label:"ChangePhoto_Label__3vuDA",Preview:"ChangePhoto_Preview__31GaD",FileDataRow:"ChangePhoto_FileDataRow___ByaK",FileDataCaption:"ChangePhoto_FileDataCaption__1TOe_",Error:"ChangePhoto_Error__1RiK0",PhotoBox:"ChangePhoto_PhotoBox__12ilb",Photo:"ChangePhoto_Photo__1f5UM",Input:"ChangePhoto_Input__20d0x"}},484:function(e,t,a){"use strict";a.r(t);var n=a(2),o=a.n(n),r=a(9),l=a(17),s=a(18),i=a(20),h=a(19),c=a(0),p=a.n(c),u=a(476),m=a.n(u),f=a(172),v=a(7),P=a(6),d=a(13),_=a(26),b=function(e){Object(i.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={photo:null,photoPreview:null,photoName:null,photoSize:null,error:null},e.inputChangedHandler=function(){var t=Object(r.a)(o.a.mark((function t(a){var n,r,l,s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(!(n=a.target.files).length>0)){t.next=5;break}return t.next=4,e.setState({photo:null,photoPreview:null,photoName:null,photoSize:null});case 4:return t.abrupt("return");case 5:return r=n[0],(l=r.name).length>25&&(l="".concat(l.slice(0,20),"...").concat(r.type.split("/")[1])),t.next=10,e.setState({photoName:l,photoSize:Object(v.a)(r.size)});case 10:if(Object(v.h)(r.type)){t.next=16;break}return t.next=13,e.setState({photo:null,photoPreview:null,error:"File extension is not valid"});case 13:return t.abrupt("return");case 16:return t.next=18,e.setState({error:null});case 18:if(Object(v.g)(r.size)){t.next=21;break}return t.next=21,e.setState({error:"Maximum available size is 1MB"});case 21:(s=new FileReader).readAsDataURL(r),s.onloadend=function(){e.setState({photo:r,photoPreview:s.result})};case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.formSubmittedHandler=function(t){t.preventDefault(),e.props.onChangePhoto(e.state.photo,e.props.history)},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"render",value:function(){var e=p.a.createElement("div",{className:m.a.Preview},"No file currently selected for upload. Max size is 1MB."),t=null,a=null;return this.state.error&&(t=p.a.createElement("span",{className:m.a.Error},this.state.error)),this.state.photoPreview&&(a=p.a.createElement("div",{className:m.a.PhotoBox},p.a.createElement("img",{src:this.state.photoPreview,alt:"Preview",className:m.a.Photo}))),(this.state.photo||this.state.error)&&(e=p.a.createElement("div",{className:m.a.Preview},p.a.createElement("div",{className:m.a.FileData},p.a.createElement("span",{className:m.a.FileDataRow},p.a.createElement("span",{className:m.a.FileDataCaption},"Name:")," ",this.state.photoName),p.a.createElement("span",{className:m.a.FileDataRow},p.a.createElement("span",{className:m.a.FileDataCaption},"Size:")," ",this.state.photoSize)),a)),p.a.createElement(f.a,{headingText:"Change Photo",btnText:"Change",isValid:this.state.photo&&!this.state.error,submitted:this.formSubmittedHandler},p.a.createElement("div",{className:m.a.Content},p.a.createElement("label",{htmlFor:"photo",className:m.a.Label},p.a.createElement(_.a,{size:"Small",fill:"Empty",color:"Green",type:"button"},"Choose photo")),e,t,p.a.createElement("input",{type:"file",id:"photo",className:m.a.Input,onChange:this.inputChangedHandler})))}}]),a}(c.Component);t.default=Object(P.b)(null,(function(e){return{onChangePhoto:function(t,a){return e(d.f(t,a))},onDeleteError:function(){return e(d.k())}}}))(b)}}]);