(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[11],{474:function(t,e,a){"use strict";a.r(e);var n=a(89),r=a(17),o=a(18),i=a(20),u=a(19),s=a(0),c=a.n(s),l=a(170),p=a(12),d=a(6),h=a(13),m=function(t){Object(i.a)(a,t);var e=Object(u.a)(a);function a(){var t;Object(r.a)(this,a);for(var o=arguments.length,i=new Array(o),u=0;u<o;u++)i[u]=arguments[u];return(t=e.call.apply(e,[this].concat(i))).state={email:Object(p.d)("input","Email","",{type:"email",id:"email",autoComplete:"email",placeholder:"Your email..."},null,!0),password:Object(p.d)("input","Password","",{type:"password",id:"password",autoComplete:"current-password",placeholder:"Your password..."},null,!0)},t.inputChangedHandler=function(e,a){t.setState(Object(n.a)({},e,Object(p.e)(t.state[e],{value:a.target.value,valid:Object(p.b)(a.target.value,t.state[e].validation),touched:!0})))},t.formSubmittedHandler=function(e){e.preventDefault();var a={};for(var n in t.state)a[n]=t.state[n].value.trim();t.props.onSignIn(a,t.props.history,t.props.autoRedirectPath)},t}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"render",value:function(){var t=Object(p.c)(this.state,this.inputChangedHandler);return c.a.createElement(l.a,{headingText:"Sign In",btnText:"Login",isValid:Object(p.a)(this.state),submitted:this.formSubmittedHandler},t)}}]),a}(s.Component);e.default=Object(d.b)((function(t){return{autoRedirectPath:t.auth.autoRedirectPath}}),(function(t){return{onSignIn:function(e,a,n){return t(h.p(e,a,n))},onDeleteError:function(){return t(h.k())}}}))(m)}}]);