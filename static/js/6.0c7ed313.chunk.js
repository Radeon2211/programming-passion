(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[6],{542:function(e,a,i){"use strict";i.r(a);var n=i(0),l=i.n(n),t=i(3),o=i(43),r=i(86),m=i(128),d=i(129),s=i(11),c=r.a({newEmail:r.b().email().trim().required()});a.default=function(e){var a=Object(t.c)(),i=Object(n.useCallback)((function(){return a(s.k())}),[a]);return Object(n.useEffect)((function(){i()}),[i]),l.a.createElement(o.c,{initialValues:{oldEmail:"",newEmail:"",password:""},validationSchema:c,onSubmit:function(i){var n,l;n=i,l=e.history,a(s.c(n,l))}},(function(e){var a=e.errors,i=e.touched,n=e.isValid,t=e.dirty,o=e.setFieldTouched;return l.a.createElement(m.a,{headingText:"Change Email",btnText:"Change",isValid:n&&t},l.a.createElement(d.a,{kind:"input",config:{type:"email",name:"oldEmail",id:"oldEmail",placeholder:"Your old email...",autoComplete:"email"},label:"Old email"}),l.a.createElement(d.a,{kind:"input",config:{type:"email",name:"newEmail",id:"newEmail",placeholder:"Your new email...",autoComplete:"email",onInput:o.bind(void 0,"newEmail",!0,!0)},label:"New email",isValid:!a.newEmail,isTouched:i.newEmail}),l.a.createElement(d.a,{kind:"input",config:{type:"password",name:"password",id:"password",placeholder:"Your password...",autoComplete:"current-password"},label:"Password"}))}))}}}]);