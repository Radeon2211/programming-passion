(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[10],{547:function(e,i,a){"use strict";a.r(i);var t=a(0),n=a.n(t),l=a(3),m=a(43),o=a(86),r=a(128),c=a(129),u=a(11),s=o.a({email:o.b().email().trim().required()});i.default=function(e){var i=Object(l.c)(),a=Object(t.useCallback)((function(){return i(u.k())}),[i]);return Object(t.useEffect)((function(){a()}),[a]),n.a.createElement(m.c,{initialValues:{email:""},validationSchema:s,onSubmit:function(a){var t,n;t=a.email,n=e.history,i(u.q(t,n))}},(function(e){var i=e.errors,a=e.touched,t=e.isValid,l=e.dirty,m=e.setFieldTouched;return n.a.createElement(r.a,{headingText:"Remove Admin",btnText:"Remove",isValid:t&&l},n.a.createElement(c.a,{kind:"input",config:{type:"email",name:"email",id:"email",placeholder:"Email of admin to remove",autoComplete:"email",onInput:m.bind(void 0,"email",!0,!0)},label:"Email",isValid:!i.email,isTouched:a.email}))}))}}}]);