(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[4],{451:function(e,t,a){"use strict";a.r(t);var n=a(86),r=a(14),i=a(15),o=a(17),l=a(16),u=a(0),s=a.n(u),p=a(166),c=a(11),d=a(9),m=a(29),h=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var i=arguments.length,o=new Array(i),l=0;l<i;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={oldEmail:Object(c.d)("input","Old email","",{type:"email",id:"oldEmail",autoComplete:"email",placeholder:"Your old email..."},null,!0),newEmail:Object(c.d)("input","New email","",{type:"email",id:"newEmail",autoComplete:"email",placeholder:"Your new email..."},{isEmail:!0},!1),password:Object(c.d)("input","Password","",{type:"password",id:"password",autoComplete:"current-password",placeholder:"Your password..."},null,!0)},e.inputChangedHandler=function(t,a){e.setState(Object(n.a)({},t,Object(c.e)(e.state[t],{value:a.target.value,valid:Object(c.b)(a.target.value,e.state[t].validation),touched:!0})))},e.formSubmittedHandler=function(t){t.preventDefault();var a={};for(var n in e.state)a[n]=e.state[n].value.trim();e.props.onChangeEmail(a,e.props.history)},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"render",value:function(){var e=Object(c.c)(this.state,this.inputChangedHandler);return s.a.createElement(p.a,{headingText:"Change Email",btnText:"Change",isValid:Object(c.a)(this.state),submitted:this.formSubmittedHandler},e)}}]),a}(u.Component);t.default=Object(d.b)(null,(function(e){return{onChangeEmail:function(t,a){return e(m.b(t,a))},onDeleteError:function(){return e(m.j())}}}))(h)}}]);