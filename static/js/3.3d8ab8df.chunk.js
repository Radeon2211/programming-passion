(this["webpackJsonpprogramming-passion"]=this["webpackJsonpprogramming-passion"]||[]).push([[3],{445:function(e,a,t){e.exports={Settings:"Settings_Settings__ipIZj",User:"Settings_User__37Vhg",UserPhotoLink:"Settings_UserPhotoLink__2dfKB",UserPhoto:"Settings_UserPhoto__mwbso",UserLink:"Settings_UserLink__2rZ3G",Heading:"Settings_Heading__XJBBw",Buttons:"Settings_Buttons__1YArc",ButtonLink:"Settings_ButtonLink__2gbso",Success:"Settings_Success__1pWiE"}},449:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),l=t(445),o=t.n(l),c=t(9),i=t(5),r=t(29),m=t(23),u=t(114),g=t.n(u),p=t(25),E=t(41);a.default=Object(c.b)((function(e){return{success:e.auth.success,firstName:e.firebase.profile.firstName,lastName:e.firebase.profile.lastName,email:e.firebase.auth.email,photoURL:e.firebase.profile.photoURL}}),(function(e){return{onDeleteSuccess:function(){return e(r.l())}}}))((function(e){var a=e.success,t=e.firstName,l=e.lastName,c=e.email,r=e.photoURL,u=e.onDeleteSuccess,h=s.a.createElement(E.a,{size:"Small"});return t&&l&&c&&(h=s.a.createElement(n.Fragment,null,s.a.createElement(i.b,{to:"/change-name",className:o.a.UserLink},"".concat(t," ").concat(l)),s.a.createElement(i.b,{to:"/change-email",className:o.a.UserLink},c))),a&&setTimeout(u,5e3),s.a.createElement("div",{className:o.a.Settings},s.a.createElement("div",{className:o.a.User},s.a.createElement(i.b,{to:"/change-photo",className:o.a.UserPhotoLink},s.a.createElement("img",{src:r||g.a,alt:"You",className:o.a.UserPhoto})),h),s.a.createElement(p.a,{type:"Middle",size:"Size-2"}),s.a.createElement("h3",{className:o.a.Heading},"What would you like to do?"),s.a.createElement("div",{className:o.a.Buttons},s.a.createElement(i.b,{to:"/change-name",className:o.a.ButtonLink},s.a.createElement(m.a,{size:"Small",fill:"Empty",color:"Green"},"Change name")),s.a.createElement(i.b,{to:"/change-email",className:o.a.ButtonLink},s.a.createElement(m.a,{size:"Small",fill:"Empty",color:"Green"},"Change email")),s.a.createElement(i.b,{to:"/change-password",className:o.a.ButtonLink},s.a.createElement(m.a,{size:"Small",fill:"Empty",color:"Green"},"Change password")),s.a.createElement(i.b,{to:"/change-photo",className:o.a.ButtonLink},s.a.createElement(m.a,{size:"Small",fill:"Empty",color:"Green"},"Change photo")),s.a.createElement(i.b,{to:"/delete-account",className:o.a.ButtonLink},s.a.createElement(m.a,{size:"Small",fill:"Empty",color:"Red"},"Delete account"))),s.a.createElement(i.b,{to:"/my-posts"},s.a.createElement(m.a,{size:"Small",fill:"Filled",color:"Green"},"View your posts")),s.a.createElement(i.b,{to:"/add-admin"},s.a.createElement(m.a,{size:"Small",fill:"Filled",color:"Green"},"Add admin")),s.a.createElement("span",{className:o.a.Success},a))}))}}]);