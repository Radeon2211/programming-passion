(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[14],{539:function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i),c=n(128),a=n(129),r=n(3),s=n(35),l=n(58),u=n(11),d=n(12),p=n(57),f=n(43),m=n(86),h=m.a({title:m.b().max(200).trim().required(),content:m.b().max(1200).trim().required()});e.default=Object(s.firestoreConnect)((function(t){return[{collection:"posts",doc:t.match.params.id,storeAs:"post"}]}))((function(t){var e=Object(i.useRef)({title:null,content:null}),n=Object(r.d)((function(t){return t.post.canWritePost})),s=Object(r.d)((function(t){return void 0===t.firestore.data.post?void 0:t.firestore.data.post})),m=Object(r.c)(),b=Object(i.useCallback)((function(){return m(u.k())}),[m]);Object(i.useEffect)((function(){b()}),[b]);var v=Object(i.useCallback)((function(){e.current={title:s.title,content:s.content}}),[s]);Object(i.useEffect)((function(){s&&!e.current.title&&v()}),[v,s]);var E=t.dispatch;Object(i.useEffect)((function(){return function(){E({type:l.actionTypes.CLEAR_DATA,preserve:{ordered:!0,data:["allPosts","comments","userPosts"]}})}}),[E]);var j=function(){t.history.goBack()};return null===s?o.a.createElement(d.a,{variant:"H6"},"This post does not exists"):void 0===s?o.a.createElement(p.a,{size:"Small"}):o.a.createElement(f.c,{initialValues:{title:s.title,content:s.content},validationSchema:h,onSubmit:function(i){i.title!==e.current.title||i.content!==e.current.content?function(t,e,n,i){m(u.p(t,e,n,i))}(i,t.match.params.id,t.history,n):t.history.push("/posts/".concat(t.match.params.id))}},(function(t){var e=t.errors,n=t.touched,i=t.isValid,r=t.dirty,l=t.setFieldTouched;return o.a.createElement(c.a,{headingText:"Edit Post".concat(s?": ".concat(s.title):""),btnText:"Edit",isValid:i&&r,isPostForm:!0,cancelled:j},o.a.createElement(a.a,{kind:"input",config:{type:"text",name:"title",id:"title",placeholder:"Post title...",autoComplete:"off",onInput:l.bind(void 0,"title",!0,!0)},label:"Title",isValid:!e.title,isTouched:n.title}),o.a.createElement(a.a,{kind:"textarea",config:{name:"content",id:"content",placeholder:"Share your thoughts...",onInput:l.bind(void 0,"content",!0,!0)},label:"Content",isValid:!e.content,isTouched:n.content}))}))}))}}]);