(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[3],{476:function(e,t,a){e.exports={ChangePhoto:"ChangePhoto_ChangePhoto__1nDoI",Content:"ChangePhoto_Content__3PGap",Label:"ChangePhoto_Label__3vuDA",Preview:"ChangePhoto_Preview__31GaD",FileDataRow:"ChangePhoto_FileDataRow___ByaK",FileDataCaption:"ChangePhoto_FileDataCaption__1TOe_",Error:"ChangePhoto_Error__1RiK0",PhotoBox:"ChangePhoto_PhotoBox__12ilb",Photo:"ChangePhoto_Photo__1f5UM",Input:"ChangePhoto_Input__20d0x"}},485:function(e,t,a){"use strict";a.r(t);var o=a(1),n=a.n(o),r=a(8),s=a(15),i=a(16),l=a(18),h=a(17),c=a(0),p=a.n(c),u=a(476),m=a.n(u),P=a(92),f=a(3),b=a(7),d=a(11),g=a(22),_=function(e){Object(l.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(s.a)(this,a);for(var o=arguments.length,i=new Array(o),l=0;l<o;l++)i[l]=arguments[l];return(e=t.call.apply(t,[this].concat(i))).state={photo:null,photoPreview:null,photoName:null,photoSize:null,error:null},e.inputChangedHandler=function(){var t=Object(r.a)(n.a.mark((function t(a){var o,r,s,i;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(!(o=a.target.files).length>0)){t.next=5;break}return t.next=4,e.setState({photo:null,photoPreview:null,photoName:null,photoSize:null});case 4:return t.abrupt("return");case 5:return r=o[0],(s=r.name).length>25&&(s="".concat(s.slice(0,20),"...").concat(r.type.split("/")[1])),t.next=10,e.setState({photoName:s,photoSize:Object(f.a)(r.size)});case 10:if(Object(f.h)(r.type)){t.next=16;break}return t.next=13,e.setState({photo:null,photoPreview:null,error:"File extension is not valid"});case 13:return t.abrupt("return");case 16:return t.next=18,e.setState({error:null});case 18:if(Object(f.g)(r.size)){t.next=21;break}return t.next=21,e.setState({error:"Maximum available size is 1MB"});case 21:(i=new FileReader).readAsDataURL(r),i.onloadend=function(){e.setState({photo:r,photoPreview:i.result})};case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.formSubmittedHandler=function(t){t.preventDefault(),e.state.photo&&Object(f.h)(e.state.photo.type)&&Object(f.g)(e.state.photo.size)&&e.props.onChangePhoto(e.state.photo,e.props.history)},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"render",value:function(){var e=p.a.createElement("div",{className:m.a.Preview},"No file currently selected for upload. Max size is 1MB."),t=null,a=null,o=null;return this.state.error&&(t=p.a.createElement("span",{className:m.a.Error},this.state.error)),this.state.photoPreview&&(a=p.a.createElement("div",{className:m.a.PhotoBox},p.a.createElement("img",{src:this.state.photoPreview,alt:"Preview",className:m.a.Photo}))),(this.state.photo||this.state.error)&&(e=p.a.createElement("div",{className:m.a.Preview},p.a.createElement("div",{className:m.a.FileData},p.a.createElement("span",{className:m.a.FileDataRow},p.a.createElement("span",{className:m.a.FileDataCaption},"Name:")," ",this.state.photoName),p.a.createElement("span",{className:m.a.FileDataRow},p.a.createElement("span",{className:m.a.FileDataCaption},"Size:")," ",this.state.photoSize)),a)),this.props.currentPhotoURL&&(o=p.a.createElement(g.a,{size:"Small",fill:"Empty",color:"Red",type:"button",clicked:this.props.onDeletePhoto.bind(this,this.props.currentPhotoURL,this.props.history)},"Delete your photo")),p.a.createElement("div",{className:m.a.ChangePhoto},p.a.createElement(P.a,{headingText:"Change Photo",btnText:"Change",isValid:this.state.photo&&!this.state.error,submitted:this.formSubmittedHandler},p.a.createElement("div",{className:m.a.Content},p.a.createElement("label",{htmlFor:"photo",className:m.a.Label},p.a.createElement(g.a,{size:"Small",fill:"Empty",color:"Green",type:"button"},"Choose photo")),e,t,p.a.createElement("input",{type:"file",id:"photo",className:m.a.Input,onChange:this.inputChangedHandler}))),o)}}]),a}(c.Component);t.default=Object(b.b)((function(e){return{currentPhotoURL:e.firebase.profile.photoURL}}),(function(e){return{onChangePhoto:function(t,a){return e(d.f(t,a))},onDeletePhoto:function(t,a){return e(d.l(t,a))},onDeleteError:function(){return e(d.k())}}}))(_)}}]);