(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[14],{480:function(t,e,n){"use strict";n.r(e);var o=n(62),a=n(15),s=n(16),i=n(18),r=n(17),p=n(0),c=n.n(p),l=n(92),u=n(7),d=n(29),h=n(20),m=n(3),f=n(44),v=n(11),b=n(12),g=n(43),j=function(t){Object(i.a)(n,t);var e=Object(r.a)(n);function n(){var t;Object(a.a)(this,n);for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))).state={title:Object(m.f)("input","Title","",{type:"text",id:"title",autoComplete:"off",placeholder:"Post title..."},{minLength:1,maxLength:200}),content:Object(m.f)("textarea","Content","",{id:"content",placeholder:"Share your thoughts..."},{minLength:1,maxLength:1200})},t.oldData={title:null,content:null},t.inputChangedHandler=function(e,n){t.setState(Object(o.a)({},e,Object(m.i)(t.state[e],{value:n.target.value,valid:Object(m.c)(n.target.value,t.state[e].validation),touched:!0})))},t.editingCancelledHandler=function(){t.props.history.goBack()},t.formSubmittedHandler=function(e){e.preventDefault();var n={};for(var o in t.state)n[o]=t.state[o].value.trim();n.title!==t.oldData.title||n.content!==t.oldData.content?t.props.onEditPost(n,t.props.match.params.id,t.props.history,t.props.canEditPost):t.props.history.push("/posts/".concat(t.props.match.params.id))},t}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.props.onDeleteError()}},{key:"componentDidUpdate",value:function(){this.props.post&&""===this.state.title.value&&this.updateStateValues()}},{key:"componentWillUnmount",value:function(){this.props.dispatch({type:f.actionTypes.CLEAR_DATA,preserve:{ordered:!0,data:["allPosts","comments","userPosts"]}})}},{key:"updateStateValues",value:function(){this.setState({title:Object(m.i)(this.state.title,{value:this.props.post.title,valid:!0}),content:Object(m.i)(this.state.content,{value:this.props.post.content,valid:!0})}),this.oldData={title:this.props.post.title,content:this.props.post.content}}},{key:"render",value:function(){var t=Object(m.e)(this.state,this.inputChangedHandler);g.a;return null===this.props.post?c.a.createElement(b.a,{variant:"H6"},"This post does not exists"):c.a.createElement(l.a,{headingText:"Edit Post".concat(this.props.post?": ".concat(this.props.post.title):""),btnText:"Edit",isValid:Object(m.b)(this.state),submitted:this.formSubmittedHandler,isPostForm:!0,cancelled:this.editingCancelledHandler},t)}}]),n}(p.Component);e.default=Object(h.d)(Object(u.b)((function(t){return{canEditPost:t.post.canWritePost,post:void 0===t.firestore.data.post?void 0:t.firestore.data.post}}),(function(t){return{onEditPost:function(e,n,o,a){return t(v.p(e,n,o,a))},onDeleteError:function(){return t(v.k())}}})),Object(d.firestoreConnect)((function(t){return[{collection:"posts",doc:t.match.params.id,storeAs:"post"}]})))(j)}}]);