(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[6],{452:function(e,t,a){"use strict";a.r(t);var n=a(86),r=a(14),o=a(15),s=a(17),i=a(16),l=a(0),d=a.n(l),u=a(166),p=a(11),c=a(9),h=a(29),m=function(e){Object(s.a)(a,e);var t=Object(i.a)(a);function a(){var e;Object(r.a)(this,a);for(var o=arguments.length,s=new Array(o),i=0;i<o;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={email:Object(p.d)("input","Email","",{type:"email",id:"email",autoComplete:"email",placeholder:"Your email..."},null,!0),oldPassword:Object(p.d)("input","Old password","",{type:"password",id:"oldPassword",autoComplete:"current-password",placeholder:"Your old password..."},null,!0),newPassword:Object(p.d)("input","New password","",{type:"password",id:"newPassword",autoComplete:"new-password",placeholder:"Type safe password..."},{minLength:6},!1)},e.inputChangedHandler=function(t,a){e.setState(Object(n.a)({},t,Object(p.e)(e.state[t],{value:"newPassword"===t?a.target.value.trim():a.target.value,valid:Object(p.b)(a.target.value,e.state[t].validation),touched:!0})))},e.formSubmittedHandler=function(t){t.preventDefault();var a={};for(var n in e.state)a[n]=e.state[n].value.trim();e.props.onChangePassword(a,e.props.history)},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"render",value:function(){var e=Object(p.c)(this.state,this.inputChangedHandler);return d.a.createElement(u.a,{headingText:"Change Password",btnText:"Change",isValid:Object(p.a)(this.state),submitted:this.formSubmittedHandler},e)}}]),a}(l.Component);t.default=Object(c.b)(null,(function(e){return{onChangePassword:function(t,a){return e(h.d(t,a))},onDeleteError:function(){return e(h.j())}}}))(m)}}]);