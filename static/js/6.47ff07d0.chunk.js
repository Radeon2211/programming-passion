(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[6],{542:function(e,a,i){"use strict";i.r(a);var n=i(0),l=i.n(n),t=i(128),o=i(129),r=i(3),m=i(11),d=i(43),s=i(86),c=s.a({newEmail:s.b().email().trim().required()});a.default=function(e){var a=Object(r.c)(),i=Object(n.useCallback)((function(){return a(m.k())}),[a]);return Object(n.useEffect)((function(){i()}),[i]),l.a.createElement(d.c,{initialValues:{oldEmail:"",newEmail:"",password:""},validationSchema:c,onSubmit:function(i){var n,l;n=i,l=e.history,a(m.c(n,l))}},(function(e){var a=e.errors,i=e.touched,n=e.isValid,r=e.dirty,m=e.setFieldTouched;return l.a.createElement(t.a,{headingText:"Change Email",btnText:"Change",isValid:n&&r},l.a.createElement(o.a,{kind:"input",config:{type:"email",name:"oldEmail",id:"oldEmail",placeholder:"Your old email...",autoComplete:"email"},label:"Old email"}),l.a.createElement(o.a,{kind:"input",config:{type:"email",name:"newEmail",id:"newEmail",placeholder:"Your new email...",autoComplete:"email",onInput:m.bind(void 0,"newEmail",!0,!0)},label:"New email",isValid:!a.newEmail,isTouched:i.newEmail}),l.a.createElement(o.a,{kind:"input",config:{type:"password",name:"password",id:"password",placeholder:"Your password...",autoComplete:"current-password"},label:"Password"}))}))}}}]);