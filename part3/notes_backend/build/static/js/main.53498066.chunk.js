(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{41:function(t,n,e){"use strict";e.r(n);var o=e(17),c=e.n(o),a=e(8),r=e(6),i=e(2),u=e(0),l=function(t){var n=t.note,e=t.toggleImportance,o=n.important?"make not important":"make important";return Object(u.jsxs)("li",{children:[n.content,Object(u.jsx)("button",{onClick:e,children:o})]})},s=e(3),j=e.n(s),d="/api/notes",b={getAll:function(){return j.a.get(d)},create:function(t){return j.a.post(d,t)},update:function(t,n){return j.a.put("".concat(d,"/").concat(t),n)},remove:function(t){return j.a.delete("".concat(d,"/").concat(t))}},f=function(){var t=Object(i.useState)([]),n=Object(r.a)(t,2),e=n[0],o=n[1],c=Object(i.useState)("a new note..."),s=Object(r.a)(c,2),j=s[0],d=s[1],f=Object(i.useState)(!0),p=Object(r.a)(f,2),g=p[0],h=p[1];Object(i.useEffect)((function(){b.getAll().then((function(t){o(t.data)})).catch((function(t){console.log(t)}))}),[]);var m=g?e:e.filter((function(t){return t.important}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Notes"}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return h(!g)},children:["show ",g?"important":"all"]})}),Object(u.jsx)("ul",{children:m.map((function(t){return Object(u.jsx)(l,{note:t,toggleImportance:function(){return function(t){console.log("make",e);var n=e.find((function(n){return n.id===t}));console.log("note",n);var c=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});console.log("changedNote",c),b.update(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n.data}))),console.log("respinsedata",n.data),console.log("newNotes",e)})).catch((function(t){console.log(t)}))}(t.id)}},t.id)}))}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault(),console.log("button clicked",t.target);var n={content:j,date:(new Date).toISOString(),important:Math.random()>.5};b.create(n).then((function(t){o(e.concat(t.data)),d("")})).catch((function(t){console.log(t)}))},children:[Object(u.jsx)("input",{value:j,onChange:function(t){console.log("new note",t.target.value),d(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]})]})};c.a.render(Object(u.jsx)(f,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.53498066.chunk.js.map