(function(){var z=function(c){return c?"string"==typeof c?[c]:Array.prototype.slice.call(c):[]},A=function(c,l){for(var a=0;a<c.length;a++)if(c[a]==l)return!0;return!1},B=function(c,l,a){for(var f,b=[],d=c.x,e=c.y,g=">",m=0,h;m<a.length;m++)if(f=a.charAt(m),h=a.substr(m),/^[><+\\-]$/.test(f)){g=f;">"==f?d+=c.cell.colSpan:"<"==f?d--:"+"==f?e--:"-"==f?e+=c.cell.rowSpan:"\\"==f&&(e+=c.cell.rowSpan,d+=c.cell.colSpan);if(0>e||e>=l.length||0>d||d>=l[e].length)return[];c=l[e][d];c.refCell&&(c=c.cell);d=
c.x;e=c.y}else if(f=/^\d+[:a-z]*/i.exec(h))if(h=parseInt(/^\d/.exec(h)[0],10),0===h&&0===m)b.push(c),m+=f[0].length-1;else for(var k=0;k<h;k++){if(0<k){f=g;">"==f?d+=c.cell.colSpan:"<"==f?d--:"+"==f?e--:"-"==f?e+=c.cell.rowSpan:"\\"==f&&(e+=c.cell.rowSpan,d+=c.cell.colSpan);if(0>e||e>=l.length||0>d||d>=l[e].length)return[];c=l[e][d];c.refCell&&(c=c.cell);d=c.x;e=c.y}b.push(c)}else if(/[.]{3}\s*$/.test(h))return b.concat(B(c,l,a));return b},C=function(c){for(var l={},a=[],f=[],b=0,d;b<c.length;b++)d=
c[b],l[1E9*d.y+d.x]=d.cell;for(b in l)l.hasOwnProperty(b)&&a.push({order:b,cell:l[b]});a.sort(function(a,b){return a.order-b.order});for(b=0;b<a.length;b++)f.push(a[b].cell);return f},p=function(c){var l={};this.element=c;this.isAChildCell=function(a){if(!p.isACell(a))return!1;for(;a=a.parentElement;){if(a==this.element)return!0;if(p.isACell(a))break}return!1};this.clearCache=function(){l={}};this.removeCol=function(a){a||0===a||"0"===a||(a=-1);for(var f=this.matrix(),b=0;b<f.length;b++){var d=f[b];
if(0>a){var e=d.length+a;0>e&&(e=0)}else e=a>=d.length?d.length-1:a;if(e=d[e])b+=(e.refCell||e).cell.rowSpan-1,e.refCell?--e.refCell.cell.colSpan:1<e.cell.colSpan?--e.cell.colSpan:e.cell.parentElement.removeChild(e.cell)}};this.removeRow=function(a){a||0===a||"0"===a||(a=-1);var f=this.element,b=this.matrix();0>a?(a=b.length+a,0>a&&(a=0)):a>=b.length&&(a=b.length-1);for(var d=b[a],b=b[a+1],e=0;e<d.length;e++){var g=d[e];if(g.refCell)1<g.refCell.cell.rowSpan&&--g.refCell.cell.rowSpan;else if(1<g.cell.rowSpan&&
b){0!==g.cell.rowSpan&&--g.cell.rowSpan;for(var m=b[e],h=e;h<b.length;h++)b[h].cell&&(m=b[h].cell,h=b.length);f.rows[a+1].insertBefore(g.cell,m)}e+=(g.refCell||g).cell.colSpan-1}f.rows[a].parentElement.removeChild(f.rows[a])};this.insertCol=function(a,f){a||0===a||"0"===a||(a=-1);for(var b=this.element,d=this.matrix(),e=0;e<d.length;e++){var g=d[e];if(0>a){var m=g.length+a+1;0>m&&(m=0)}else m=a>g.length?g.length:a;var g=0===m?d[e][m]:d[e][m-1],h=d[e][m];if(h&&h.refCell)h.refCell.cell.colSpan+=1,e+=
h.refCell.cell.rowSpan-1;else{var c=e;g?(g=g.cell||g.refCell,m=document.createElement(g.tagName),m.rowSpan=g.rowSpan,e+=g.rowSpan-1):m=document.createElement("TD");f&&f.call(this,m);b.rows[c].insertBefore(m,h?h.cell:null)}}};this.insertRow=function(a,f){var b;a||0===a||"0"===a||(a=-1);var d=this.element,e=document.createElement("tr"),g=this.matrix();0>a?(a=g.length+a+1,0>a&&(a=0)):a>g.length&&(a=g.length);var m=g[a];if(g=0==a?g[a]:g[a-1])for(var h=0;h<g.length;h++){var c=g[h];(b=(m||[])[h])&&b.refCell?
(b.refCell.cell.rowSpan+=1,h+=b.refCell.cell.colSpan-1):(c=c.cell||c.refCell,b=document.createElement(c.tagName),b.colSpan=c.colSpan,h+=c.colSpan-1,f&&f.call(this,b),e.appendChild(b))}else b=document.createElement("td"),f&&f.call(this,b),e.appendChild(b);((d.rows[0]||{}).parentElement||d).insertBefore(e,d.rows[a])};this.split=function(a,f){a.tagName&&(a=[a]);a=Array.prototype.slice.call(a);for(var b=0;b<a.length;b++){var d=a[b];if(!(1>=d.rowSpan&&1>=d.colSpan)){for(var e=this.matrix(),g=this.position(d,
e),m=Array(d.rowSpan),b=0;b<d.rowSpan;b++){m[b]=document.createDocumentFragment();for(var h=0;h<d.colSpan;h++)if(0!==b||0!==h){var k=document.createElement(d.tagName);f&&f.call(this,k);m[b].appendChild(k)}}d.rowSpan=d.colSpan=1;for(b=0;b<m.length;b++){d=e[g.y+b];k=null;for(h=g.x+(0===b?1:0);h<d.length;h++)d[h].cell&&(k=d[h].cell,h=d.length);c.rows[g.y+b].insertBefore(m[b],k)}}}};this.mergeVertical=function(a,f){for(var b=!1,d=0;d<p.maxIteration;d++)if(this._mergeVertical(a,f))b=!0;else break;return b};
this.mergeHorizontal=function(a,f){for(var b=!1,d=0;d<p.maxIteration;d++)if(this._mergeHorizontal(a,f))b=!0;else break;return b};this.first=function(){for(var a=this.element.rows,f=0;f<a.length;f++)for(var b=a[f].cells;0<b.length;)return b[0];return null};this.last=function(){for(var a=this.element.rows,f=a.length-1;0<=f;f--)for(var b=a[f].cells,d=b.length-1;0<=d;)return b[d];return null};this.cells=function(a,f){if(1>arguments)return[];1==arguments?(f=a,a=this.first()):"[object Array]"===Object.prototype.toString.call(a)&&
(a=this.cell.apply(this,a));if(!this.isAChildCell(a))return[];var b=[];if(!this.isAChildCell(a))return b;for(var b=f.split(/,+/g),d=[],e=this.matrix(),g=this.position(a,e),c=0;c<b.length;c++)d=d.concat(B(e[g.y][g.x],e,b[c]));return C(d)};this.cell=function(a,f,b){b=b||this.matrix();0>f&&(f=b.length+f);if(0>f||f>=b.length)return null;f=b[f];0>a&&(a=f.length+a);if(0>a||a>=f.length)return null;a=f[a];return a.cell||a.refCell.cell};this.merge=function(a,f){for(var b,d,e=!1,g=0;g<p.maxIteration;g++)if(d=
this._mergeVertical(a,f),b=this._mergeHorizontal(a,f),d||b)e=!0;else if(!d&&!b)break;return e};this._mergeVertical=function(a,f){a=z(a);if(1>=a.length)return!1;for(var b=this.matrix(),d=!1,e=0,g=a.length;e<g;e++){var c=a[e],h=[],k=c.colSpan,q=c.rowSpan;if(this.isAChildCell(c)){var l=this.position(c,b);if(!l)continue;for(var n=l.y+c.rowSpan;n<b.length;n++)for(var p=[],w=0,t=b[n],y=0,u=l.x;u<t.length;u++){var r=t[u].cell,y=y+((r||{}).colSpan||1),w=0===w?(r||{}).rowSpan:w;r&&A(a,r)&&y<=k&&r.rowSpan==
w?(p.push(r),k===y&&(h=h.concat(p),q+=w,u=t.length),u+=r.colSpan-1,n+=r.rowSpan-1):(u=t.length,n=b.length)}}if(0<h.length){f&&f.call(this,k,q,c,h);for(n=0;n<h.length;n++)h[n].parentElement.removeChild(h[n]);c.rowSpan=q;c.colSpan=k;d=!0}}return d};this._mergeHorizontal=function(a,f){a=z(a);if(1>=a.length)return!1;for(var b=this.matrix(),d=!1,e=0,g=a.length;e<g;e++){var c=a[e],h=[],k=c.rowSpan,q=c.colSpan;if(this.isAChildCell(c)){var l=this.position(c,b);if(!l)continue;for(var n=l.x+c.colSpan,p=b[l.y].length;n<
p;n++)for(var w=[],t=0,y=0,u=l.y;u<b.length;u++){var r=b[u][n].cell,y=y+((r||{}).rowSpan||1),t=0===t?(r||{}).colSpan:t;r&&A(a,r)&&y<=k&&r.colSpan==t?(w.push(r),k===y&&(h=h.concat(w),q+=t,u=b.length),u+=r.rowSpan-1,n+=r.colSpan-1):(u=b.length,n=p)}}if(0<h.length){f&&f.call(this,q,k,c,h);for(n=0;n<h.length;n++)h[n].parentElement.removeChild(h[n]);c.rowSpan=k;c.colSpan=q;d=!0}}return d};this.position=function(a,f){f=f||this.matrix();for(var b=0,d;b<f.length;b++){d=f[b];for(var e=0,c;e<d.length;e++)if((c=
d[e])&&c.cell==a)return{x:c.x,y:c.y}}return null};this.matrix=function(a){var c=this.element,b=[],d=[],e=c.rows,c=c.innerHTML;if(p.cache&&l[c])return l[c];this.clearCache();for(var g=0;g<e.length;g++)b.push([]);for(g=0;g<e.length;g++)for(var m=e[g],h=0,k=0;k<m.cells.length;k++){var q=m.cells[k];if("object"!=typeof b[g][h]&&!1!==b[g][h]){var x=a?parseInt(q.getAttribute("rowSpan"),10):q.rowSpan,x=Math.floor(Math.abs(isNaN(x)?1:x));0===x&&!a&&q.ownerDocument&&"BackCompat"==q.ownerDocument.compatMode&&
(x=1);if(1==x)if(!q.colSpan||2>q.colSpan)b[g][h]={cell:q,x:h,y:g};else{var n=b[g][h]={cell:q,x:h,y:g};for(var v=1;v<q.colSpan;v++)b[g][h+v]={refCell:n,x:h+v,y:g}}else{n=b[g][h]={cell:q,x:h,y:g};0===x&&d.push(n);for(var v=0,w=Math.max(x,1);v<w;v++)for(var t=0;t<q.colSpan;t++)if(0!==v||0!==t)n=b[g+v][h+t]={refCell:n,x:h+t,y:g+v},0===x&&d.push(n)}}else k--;h++}if(d.length)for(g=0;g<d.length;g++)for(a=d[g],e=a.x,k=a.y+1;k<b.length;k++)for(b[k].splice(e,0,{x:e,y:k,refCell:a.refCell||a}),n=e+1;n<b[k].length;n++)b[k][n].x+=
1;p.cache&&(l[c]=b);return b};this.getCellPosition=function(a){for(var c=[],b=this.element.rows,d=0;d<b.length;d++)c.push([]);for(d=0;d<b.length;d++)for(var e=b[d].cells,g=0,m=0;m<e.length;m++){var h=e[m];if(c[d][g])m--,g++;else{if(h==a)return{x:d,y:g};for(var k=1;k<h.rowSpan;k++)for(var l=0;l<h.colSpan;l++)c[d+k][g+l]=!0;g+=h.colSpan}}};this.getCellByPosition=function(a,c){var b=[],d=this.element.rows;if(a>=d.length)return null;for(var e=0;e<d.length;e++)b.push([]);for(var e=0,g=Math.min(d.length,
a+1);e<g;e++)for(var f=d[e].cells,h=0,k=0;k<f.length;k++){var l=f[k];if(b[e][h])k--,h++;else{if(e==a&&h==c)return l;for(var p=1;p<l.rowSpan;p++)for(var n=0;n<l.colSpan;n++)b[e+p][h+n]=!0;h+=l.colSpan}}}};p.isACell=function(c){return c&&("TD"==c.tagName||"TH"==c.tagName)};p.rowSpan=function(c){if(p.isACell(c)){if(0===c.rowSpan){if(-1==c.cellIndex)return 1;c=c.parentElement;var l=1;if(!c||"TR"!=c.tagName)return-1;for(;c=c.nextSibling;)"TR"==c.tagName&&l++;return l}return c.rowSpan}return null};p.maxIteration=
50;p.cache=!0;p.build=2;p.version="0.1.1";p.stable=!1;window.Table=p})();