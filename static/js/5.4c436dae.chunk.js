(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[5],{493:function(e,t,a){"use strict";a.r(t);var i=a(60),n=a(27),c=a(16),u=a(0),l=a.n(u),r=a(91),s=a(4),o=a(3),b=a(11);t.default=function(){var e=Object(u.useState)({email:Object(s.f)("input","Email","",{type:"email",id:"email",autoComplete:"email",placeholder:"Future admin's email"},{isEmail:!0})}),t=Object(c.a)(e,2),a=t[0],m=t[1],d=Object(o.c)(),p=Object(u.useCallback)((function(){return d(b.k())}),[d]);Object(u.useEffect)((function(){p()}),[p]);var f=Object(s.e)(a,(function(e,t){t.persist(),m((function(c){return Object(n.a)({},c,Object(i.a)({},e,Object(s.i)(a[e],{value:t.target.value,valid:Object(s.c)(t.target.value,a[e].validation),touched:!0})))}))}));return l.a.createElement(r.a,{headingText:"Add Admin",btnText:"Add",isValid:Object(s.b)(a),submitted:function(e){e.preventDefault(),function(e){d(b.a(e))}(a.email.value.trim())}},f)}}}]);