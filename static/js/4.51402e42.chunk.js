(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[4],{483:function(t,e,a){"use strict";a.r(e);var n=a(89),i=a(17),r=a(18),o=a(20),u=a(19),l=a(0),c=a.n(l),d=a(170),s=a(12),m=a(6),p=a(13),b=function(t){Object(o.a)(a,t);var e=Object(u.a)(a);function a(){var t;Object(i.a)(this,a);for(var r=arguments.length,o=new Array(r),u=0;u<r;u++)o[u]=arguments[u];return(t=e.call.apply(e,[this].concat(o))).state={email:Object(s.d)("input","Email","",{type:"email",id:"email",autoComplete:"email",placeholder:"Future admin's email"},{isEmail:!0},!1)},t.inputChangedHandler=function(e,a){t.setState(Object(n.a)({},e,Object(s.e)(t.state[e],{value:a.target.value,valid:Object(s.b)(a.target.value,t.state[e].validation),touched:!0})))},t.formSubmittedHandler=function(e){e.preventDefault();var a=t.state.email.value.trim();t.props.onAddAdmin(a)},t}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"render",value:function(){var t=Object(s.c)(this.state,this.inputChangedHandler);return c.a.createElement(d.a,{headingText:"Add Admin",btnText:"Add",isValid:Object(s.a)(this.state),submitted:this.formSubmittedHandler},t)}}]),a}(l.Component);e.default=Object(m.b)(null,(function(t){return{onAddAdmin:function(e){return t(p.a(e))},onDeleteError:function(){return t(p.k())}}}))(b)}}]);