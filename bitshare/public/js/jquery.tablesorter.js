/*!
* TableSorter 2.16.4 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach
*/
!function(g){g.extend({tablesorter:new function(){function d(){var b=arguments[0],a=1<arguments.length?Array.prototype.slice.call(arguments):b;if("undefined"!==typeof console&&"undefined"!==typeof console.log)console[/error/i.test(b)?"error":/warn/i.test(b)?"warn":"log"](a);else alert(a)}function u(b,a){d(b+" ("+((new Date).getTime()-a.getTime())+"ms)")}function n(b){for(var a in b)return!1;return!0}function p(b,a,c){if(!a)return"";var h=b.config,e=h.textExtraction||"",f="",f="basic"===e?g(a).attr(h.textAttribute)|| a.textContent||a.innerText||g(a).text()||"":"function"===typeof e?e(a,b,c):"object"===typeof e&&e.hasOwnProperty(c)?e[c](a,b,c):a.textContent||a.innerText||g(a).text()||"";return g.trim(f)}function s(b){var a=b.config,c=a.$tbodies=a.$table.children("tbody:not(."+a.cssInfoBlock+")"),h,e,t,k,l,m,g,n,w=0,q="",r=c.length;if(0===r)return a.debug?d("Warning: *Empty table!* Not building a parser cache"):"";a.debug&&(n=new Date,d("Detecting parsers for each column"));for(e=[];w<r;){h=c[w].rows;if(h[w])for(t= h[w].cells.length,k=0;k<t;k++){l=a.$headers.filter(":not([colspan])");l=l.add(a.$headers.filter('[colspan="1"]')).filter('[data-column="'+k+'"]:last');m=a.$headers.index(l);m=a.headers[m];g=f.getParserById(f.getData(l,m,"sorter"));a.empties[k]=f.getData(l,m,"empty")||a.emptyTo||(a.emptyToBottom?"bottom":"top");a.strings[k]=f.getData(l,m,"string")||a.stringTo||"max";if(!g)a:{l=b;m=h;g=-1;for(var s=k,A=void 0,x=f.parsers.length,y=!1,F="",A=!0;""===F&&A;)g++,m[g]?(y=m[g].cells[s],F=p(l,y,s),l.config.debug&& d("Checking if value was empty on row "+g+", column: "+s+': "'+F+'"')):A=!1;for(;0<=--x;)if((A=f.parsers[x])&&"text"!==A.id&&A.is&&A.is(F,l,y)){g=A;break a}g=f.getParserById("text")}a.debug&&(q+="column:"+k+"; parser:"+g.id+"; string:"+a.strings[k]+"; empty: "+a.empties[k]+"\n");e.push(g)}w+=e.length?r:1}a.debug&&(d(q?q:"No parsers detected"),u("Completed detecting parsers",n));a.parsers=e}function x(b){var a,c,h,e,t,k,l,m,z,n,w,q=b.config,r=q.$table.children("tbody"),s=q.parsers;q.cache={};if(!s)return q.debug? d("Warning: *Empty table!* Not building a cache"):"";q.debug&&(m=new Date);q.showProcessing&&f.isProcessing(b,!0);for(t=0;t<r.length;t++)if(w=[],a=q.cache[t]={normalized:[]},!r.eq(t).hasClass(q.cssInfoBlock)){z=r[t]&&r[t].rows.length||0;for(h=0;h<z;++h)if(n={child:[]},k=g(r[t].rows[h]),l=[],k.hasClass(q.cssChildRow)&&0!==h)c=a.normalized.length-1,a.normalized[c][q.columns].$row=a.normalized[c][q.columns].$row.add(k),k.prev().hasClass(q.cssChildRow)||k.prev().addClass(f.css.cssHasChild),n.child[c]= g.trim(k[0].textContent||k[0].innerText||k.text()||"");else{n.$row=k;n.order=h;for(e=0;e<q.columns;++e)"undefined"===typeof s[e]?q.debug&&d("No parser found for cell:",k[0].cells[e],"does it have a header?"):(c=p(b,k[0].cells[e],e),c=s[e].format(c,b,k[0].cells[e],e),l.push(c),"numeric"===(s[e].type||"").toLowerCase()&&(w[e]=Math.max(Math.abs(c)||0,w[e]||0)));l[q.columns]=n;a.normalized.push(l)}a.colMax=w}q.showProcessing&&f.isProcessing(b);q.debug&&u("Building cache for "+z+" rows",m)}function y(b, a){var c=b.config,h=c.widgetOptions,e=b.tBodies,t=[],k=c.cache,d,m,z,p,w,q;if(n(k))return c.appender?c.appender(b,t):b.isUpdating?c.$table.trigger("updateComplete",b):"";c.debug&&(q=new Date);for(w=0;w<e.length;w++)if(d=g(e[w]),d.length&&!d.hasClass(c.cssInfoBlock)){z=f.processTbody(b,d,!0);d=k[w].normalized;m=d.length;for(p=0;p<m;p++)t.push(d[p][c.columns].$row),c.appender&&(!c.pager||c.pager.removeRows&&h.pager_removeRows||c.pager.ajax)||z.append(d[p][c.columns].$row);f.processTbody(b,z,!1)}c.appender&& c.appender(b,t);c.debug&&u("Rebuilt table",q);a||c.appender||f.applyWidget(b);b.isUpdating&&c.$table.trigger("updateComplete",b)}function C(b){return/^d/i.test(b)||1===b}function D(b){var a,c,h,e,t,k,l,m=b.config;m.headerList=[];m.headerContent=[];m.debug&&(l=new Date);m.columns=f.computeColumnIndex(m.$table.children("thead, tfoot").children("tr"));e=m.cssIcon?'<i class="'+(m.cssIcon===f.css.icon?f.css.icon:m.cssIcon+" "+f.css.icon)+'"></i>':"";m.$headers=g(b).find(m.selectorHeaders).each(function(b){c= g(this);a=m.headers[b];m.headerContent[b]=g(this).html();t=m.headerTemplate.replace(/\{content\}/g,g(this).html()).replace(/\{icon\}/g,e);m.onRenderTemplate&&(h=m.onRenderTemplate.apply(c,[b,t]))&&"string"===typeof h&&(t=h);g(this).html('<div class="'+f.css.headerIn+'">'+t+"</div>");m.onRenderHeader&&m.onRenderHeader.apply(c,[b]);this.column=parseInt(g(this).attr("data-column"),10);this.order=C(f.getData(c,a,"sortInitialOrder")||m.sortInitialOrder)?[1,0,2]:[0,1,2];this.count=-1;this.lockedOrder=!1; k=f.getData(c,a,"lockedOrder")||!1;"undefined"!==typeof k&&!1!==k&&(this.order=this.lockedOrder=C(k)?[1,1,1]:[0,0,0]);c.addClass(f.css.header+" "+m.cssHeader);m.headerList[b]=this;c.parent().addClass(f.css.headerRow+" "+m.cssHeaderRow).attr("role","row");m.tabIndex&&c.attr("tabindex",0)}).attr({scope:"col",role:"columnheader"});B(b);m.debug&&(u("Built headers:",l),d(m.$headers))}function E(b,a,c){var h=b.config;h.$table.find(h.selectorRemove).remove();s(b);x(b);H(h.$table,a,c)}function B(b){var a, c,h=b.config;h.$headers.each(function(e,t){c=g(t);a="false"===f.getData(t,h.headers[e],"sorter");t.sortDisabled=a;c[a?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+a);b.id&&(a?c.removeAttr("aria-controls"):c.attr("aria-controls",b.id))})}function G(b){var a,c,h=b.config,e=h.sortList,t=e.length,d=f.css.sortNone+" "+h.cssNone,l=[f.css.sortAsc+" "+h.cssAsc,f.css.sortDesc+" "+h.cssDesc],m=["ascending","descending"],n=g(b).find("tfoot tr").children().add(h.$extraHeaders).removeClass(l.join(" ")); h.$headers.removeClass(l.join(" ")).addClass(d).attr("aria-sort","none");for(a=0;a<t;a++)if(2!==e[a][1]&&(b=h.$headers.not(".sorter-false").filter('[data-column="'+e[a][0]+'"]'+(1===t?":last":"")),b.length)){for(c=0;c<b.length;c++)b[c].sortDisabled||b.eq(c).removeClass(d).addClass(l[e[a][1]]).attr("aria-sort",m[e[a][1]]);n.length&&n.filter('[data-column="'+e[a][0]+'"]').removeClass(d).addClass(l[e[a][1]])}h.$headers.not(".sorter-false").each(function(){var b=g(this),a=this.order[(this.count+1)%(h.sortReset? 3:2)],a=b.text()+": "+f.language[b.hasClass(f.css.sortAsc)?"sortAsc":b.hasClass(f.css.sortDesc)?"sortDesc":"sortNone"]+f.language[0===a?"nextAsc":1===a?"nextDesc":"nextNone"];b.attr("aria-label",a)})}function L(b){if(b.config.widthFixed&&0===g(b).find("colgroup").length){var a=g("<colgroup>"),c=g(b).width();g(b.tBodies[0]).find("tr:first").children("td:visible").each(function(){a.append(g("<col>").css("width",parseInt(g(this).width()/c*1E3,10)/10+"%"))});g(b).prepend(a)}}function M(b,a,c){var h,e, f,d=b.config;b=a||d.sortList;d.sortList=[];g.each(b,function(b,a){h=[parseInt(a[0],10),parseInt(a[1],10)];if(f=d.$headers.filter('[data-column="'+h[0]+'"]:last')[0])d.sortList.push(h),e=g.inArray(h[1],f.order),c&&(f.count+=1),f.count=0<=e?e:h[1]%(d.sortReset?3:2)})}function N(b,a){return b&&b[a]?b[a].type||"":""}function O(b,a,c){var h,e,d,k=b.config,l=!c[k.sortMultiSortKey],m=k.$table;m.trigger("sortStart",b);a.count=c[k.sortResetKey]?2:(a.count+1)%(k.sortReset?3:2);k.sortRestart&&(e=a,k.$headers.each(function(){this=== e||!l&&g(this).is("."+f.css.sortDesc+",."+f.css.sortAsc)||(this.count=-1)}));e=a.column;if(l){k.sortList=[];if(null!==k.sortForce)for(h=k.sortForce,c=0;c<h.length;c++)h[c][0]!==e&&k.sortList.push(h[c]);h=a.order[a.count];if(2>h&&(k.sortList.push([e,h]),1<a.colSpan))for(c=1;c<a.colSpan;c++)k.sortList.push([e+c,h])}else{if(k.sortAppend&&1<k.sortList.length)for(c=0;c<k.sortAppend.length;c++)d=f.isValueInArray(k.sortAppend[c][0],k.sortList),0<=d&&k.sortList.splice(d,1);if(0<=f.isValueInArray(e,k.sortList))for(c= 0;c<k.sortList.length;c++)d=k.sortList[c],h=k.$headers.filter('[data-column="'+d[0]+'"]:last')[0],d[0]===e&&(d[1]=h.order[a.count],2===d[1]&&(k.sortList.splice(c,1),h.count=-1));else if(h=a.order[a.count],2>h&&(k.sortList.push([e,h]),1<a.colSpan))for(c=1;c<a.colSpan;c++)k.sortList.push([e+c,h])}if(null!==k.sortAppend)for(h=k.sortAppend,c=0;c<h.length;c++)h[c][0]!==e&&k.sortList.push(h[c]);m.trigger("sortBegin",b);setTimeout(function(){G(b);I(b);y(b);m.trigger("sortEnd",b)},1)}function I(b){var a, c,h,e,d,k,g,m,z,p,w,q=0,r=b.config,s=r.textSorter||"",v=r.sortList,x=v.length,y=b.tBodies.length;if(!r.serverSideSorting&&!n(r.cache)){r.debug&&(d=new Date);for(c=0;c<y;c++)k=r.cache[c].colMax,g=r.cache[c].normalized,g.sort(function(c,d){for(a=0;a<x;a++){e=v[a][0];m=v[a][1];q=0===m;if(r.sortStable&&c[e]===d[e]&&1===x)break;(h=/n/i.test(N(r.parsers,e)))&&r.strings[e]?(h="boolean"===typeof r.string[r.strings[e]]?(q?1:-1)*(r.string[r.strings[e]]?-1:1):r.strings[e]?r.string[r.strings[e]]||0:0,z=r.numberSorter? r.numberSorter(c[e],d[e],q,k[e],b):f["sortNumeric"+(q?"Asc":"Desc")](c[e],d[e],h,k[e],e,b)):(p=q?c:d,w=q?d:c,z="function"===typeof s?s(p[e],w[e],q,e,b):"object"===typeof s&&s.hasOwnProperty(e)?s[e](p[e],w[e],q,e,b):f["sortNatural"+(q?"Asc":"Desc")](c[e],d[e],e,b,r));if(z)return z}return c[r.columns].order-d[r.columns].order});r.debug&&u("Sorting on "+v.toString()+" and dir "+m+" time",d)}}function J(b,a){b[0].isUpdating&&b.trigger("updateComplete");g.isFunction(a)&&a(b[0])}function H(b,a,c){var h= b[0].config.sortList;!1!==a&&!b[0].isProcessing&&h.length?b.trigger("sorton",[h,function(){J(b,c)},!0]):(J(b,c),f.applyWidget(b[0],!1))}function K(b){var a=b.config,c=a.$table;c.unbind("sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(a.namespace+" ")).bind("sortReset"+a.namespace,function(c,e){c.stopPropagation();a.sortList=[];G(b);I(b);y(b);g.isFunction(e)&& e(b)}).bind("updateAll"+a.namespace,function(c,e,d){c.stopPropagation();b.isUpdating=!0;f.refreshWidgets(b,!0,!0);f.restoreHeaders(b);D(b);f.bindEvents(b,a.$headers,!0);K(b);E(b,e,d)}).bind("update"+a.namespace+" updateRows"+a.namespace,function(a,c,d){a.stopPropagation();b.isUpdating=!0;B(b);E(b,c,d)}).bind("updateCell"+a.namespace,function(h,e,d,f){h.stopPropagation();b.isUpdating=!0;c.find(a.selectorRemove).remove();var l,m;l=c.find("tbody");m=g(e);h=l.index(g.fn.closest?m.closest("tbody"):m.parents("tbody").filter(":first")); var n=g.fn.closest?m.closest("tr"):m.parents("tr").filter(":first");e=m[0];l.length&&0<=h&&(l=l.eq(h).find("tr").index(n),m=m.index(),a.cache[h].normalized[l][a.columns].$row=n,e=a.cache[h].normalized[l][m]=a.parsers[m].format(p(b,e,m),b,e,m),"numeric"===(a.parsers[m].type||"").toLowerCase()&&(a.cache[h].colMax[m]=Math.max(Math.abs(e)||0,a.cache[h].colMax[m]||0)),H(c,d,f))}).bind("addRows"+a.namespace,function(h,e,d,f){h.stopPropagation();b.isUpdating=!0;if(n(a.cache))B(b),E(b,d,f);else{e=g(e);var l, m,u,x,w=e.filter("tr").length,q=c.find("tbody").index(e.parents("tbody").filter(":first"));a.parsers&&a.parsers.length||s(b);for(h=0;h<w;h++){m=e[h].cells.length;x=[];u={child:[],$row:e.eq(h),order:a.cache[q].normalized.length};for(l=0;l<m;l++)x[l]=a.parsers[l].format(p(b,e[h].cells[l],l),b,e[h].cells[l],l),"numeric"===(a.parsers[l].type||"").toLowerCase()&&(a.cache[q].colMax[l]=Math.max(Math.abs(x[l])||0,a.cache[q].colMax[l]||0));x.push(u);a.cache[q].normalized.push(x)}H(c,d,f)}}).bind("updateComplete"+ a.namespace,function(){b.isUpdating=!1}).bind("sorton"+a.namespace,function(a,e,d,k){var l=b.config;a.stopPropagation();c.trigger("sortStart",this);M(b,e,!0);G(b);l.delayInit&&n(l.cache)&&x(b);c.trigger("sortBegin",this);I(b);y(b,k);c.trigger("sortEnd",this);f.applyWidget(b);g.isFunction(d)&&d(b)}).bind("appendCache"+a.namespace,function(a,c,d){a.stopPropagation();y(b,d);g.isFunction(c)&&c(b)}).bind("updateCache"+a.namespace,function(c,e){a.parsers&&a.parsers.length||s(b);x(b);g.isFunction(e)&&e(b)}).bind("applyWidgetId"+ a.namespace,function(c,e){c.stopPropagation();f.getWidgetById(e).format(b,a,a.widgetOptions)}).bind("applyWidgets"+a.namespace,function(a,c){a.stopPropagation();f.applyWidget(b,c)}).bind("refreshWidgets"+a.namespace,function(a,c,d){a.stopPropagation();f.refreshWidgets(b,c,d)}).bind("destroy"+a.namespace,function(a,c,d){a.stopPropagation();f.destroy(b,c,d)})}var f=this;f.version="2.16.4";f.parsers=[];f.widgets=[];f.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}", onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,widgets:[],widgetOptions:{zebra:["even", "odd"]},initWidgets:!0,initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssIcon:"tablesorter-icon",cssInfoBlock:"tablesorter-infoOnly",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[]};f.css={table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",header:"tablesorter-header", headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",info:"tablesorter-infoOnly",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"};f.language={sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"}; f.log=d;f.benchmark=u;f.construct=function(b){return this.each(function(){var a=g.extend(!0,{},f.defaults,b);!this.hasInitialized&&f.buildTable&&"TABLE"!==this.tagName?f.buildTable(this,a):f.setup(this,a)})};f.setup=function(b,a){if(!b||!b.tHead||0===b.tBodies.length||!0===b.hasInitialized)return a.debug?d("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized"):"";var c="",h=g(b),e=g.metadata;b.hasInitialized=!1;b.isProcessing=!0;b.config=a;g.data(b,"tablesorter", a);a.debug&&g.data(b,"startoveralltimer",new Date);a.supportsDataObject=function(a){a[0]=parseInt(a[0],10);return 1<a[0]||1===a[0]&&4<=parseInt(a[1],10)}(g.fn.jquery.split("."));a.string={max:1,min:-1,emptyMin:1,emptyMax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1};/tablesorter\-/.test(h.attr("class"))||(c=""!==a.theme?" tablesorter-"+a.theme:"");a.$table=h.addClass(f.css.table+" "+a.tableClass+c).attr({role:"grid"});a.namespace=a.namespace?"."+a.namespace.replace(/\W/g,""):".tablesorter"+Math.random().toString(16).slice(2); a.$tbodies=h.children("tbody:not(."+a.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"});a.$table.find("caption").length&&a.$table.attr("aria-labelledby","theCaption");a.widgetInit={};a.textExtraction=a.$table.attr("data-text-extraction")||a.textExtraction||"basic";D(b);L(b);s(b);a.delayInit||x(b);f.bindEvents(b,a.$headers,!0);K(b);a.supportsDataObject&&"undefined"!==typeof h.data().sortlist?a.sortList=h.data().sortlist:e&&h.metadata()&&h.metadata().sortlist&&(a.sortList=h.metadata().sortlist); f.applyWidget(b,!0);0<a.sortList.length?h.trigger("sorton",[a.sortList,{},!a.initWidgets,!0]):(G(b),a.initWidgets&&f.applyWidget(b,!1));a.showProcessing&&h.unbind("sortBegin"+a.namespace+" sortEnd"+a.namespace).bind("sortBegin"+a.namespace+" sortEnd"+a.namespace,function(c){clearTimeout(a.processTimer);f.isProcessing(b);"sortBegin"===c.type&&(a.processTimer=setTimeout(function(){f.isProcessing(b,!0)},500))});b.hasInitialized=!0;b.isProcessing=!1;a.debug&&f.benchmark("Overall initialization time", g.data(b,"startoveralltimer"));h.trigger("tablesorter-initialized",b);"function"===typeof a.initialized&&a.initialized(b)};f.computeColumnIndex=function(b){var a=[],c=0,h,e,d,f,l,m,n,u,p,q;for(h=0;h<b.length;h++)for(l=b[h].cells,e=0;e<l.length;e++){d=l[e];f=g(d);m=d.parentNode.rowIndex;f.index();n=d.rowSpan||1;u=d.colSpan||1;"undefined"===typeof a[m]&&(a[m]=[]);for(d=0;d<a[m].length+1;d++)if("undefined"===typeof a[m][d]){p=d;break}c=Math.max(p,c);f.attr({"data-column":p});for(d=m;d<m+n;d++)for("undefined"=== typeof a[d]&&(a[d]=[]),q=a[d],f=p;f<p+u;f++)q[f]="x"}return c+1};f.isProcessing=function(b,a,c){b=g(b);var d=b[0].config;b=c||b.find("."+f.css.header);a?("undefined"!==typeof c&&0<d.sortList.length&&(b=b.filter(function(){return this.sortDisabled?!1:0<=f.isValueInArray(parseFloat(g(this).attr("data-column")),d.sortList)})),b.addClass(f.css.processing+" "+d.cssProcessing)):b.removeClass(f.css.processing+" "+d.cssProcessing)};f.processTbody=function(b,a,c){b=g(b)[0];if(c)return b.isProcessing=!0,a.before('<span class="tablesorter-savemyplace"/>'), c=g.fn.detach?a.detach():a.remove();c=g(b).find("span.tablesorter-savemyplace");a.insertAfter(c);c.remove();b.isProcessing=!1};f.clearTableBody=function(b){g(b)[0].config.$tbodies.empty()};f.bindEvents=function(b,a,c){b=g(b)[0];var d,e=b.config;!0!==c&&(e.$extraHeaders=e.$extraHeaders?e.$extraHeaders.add(a):a);a.find(e.selectorSort).add(a.filter(e.selectorSort)).unbind(["mousedown","mouseup","sort","keyup",""].join(e.namespace+" ")).bind(["mousedown","mouseup","sort","keyup",""].join(e.namespace+ " "),function(c,f){var l;l=c.type;if(!(1!==(c.which||c.button)&&!/sort|keyup/.test(l)||"keyup"===l&&13!==c.which||"mouseup"===l&&!0!==f&&250<(new Date).getTime()-d)){if("mousedown"===l)return d=(new Date).getTime(),"INPUT"===c.target.tagName?"":!e.cancelSelection;e.delayInit&&n(e.cache)&&x(b);l=g.fn.closest?g(this).closest("th, td")[0]:/TH|TD/.test(this.tagName)?this:g(this).parents("th, td")[0];l=e.$headers[a.index(l)];l.sortDisabled||O(b,l,c)}});e.cancelSelection&&a.attr("unselectable","on").bind("selectstart", !1).css({"user-select":"none",MozUserSelect:"none"})};f.restoreHeaders=function(b){var a=g(b)[0].config;a.$table.find(a.selectorHeaders).each(function(b){g(this).find("."+f.css.headerIn).length&&g(this).html(a.headerContent[b])})};f.destroy=function(b,a,c){b=g(b)[0];if(b.hasInitialized){f.refreshWidgets(b,!0,!0);var d=g(b),e=b.config,t=d.find("thead:first"),k=t.find("tr."+f.css.headerRow).removeClass(f.css.headerRow+" "+e.cssHeaderRow),l=d.find("tfoot:first > tr").children("th, td");!1===a&&0<=g.inArray("uitheme", e.widgets)&&(d.trigger("applyWidgetId",["uitheme"]),d.trigger("applyWidgetId",["zebra"]));t.find("tr").not(k).remove();d.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(e.namespace+" "));e.$headers.add(l).removeClass([f.css.header,e.cssHeader,e.cssAsc,e.cssDesc,f.css.sortAsc,f.css.sortDesc,f.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled", "true");k.find(e.selectorSort).unbind(["mousedown","mouseup","keypress",""].join(e.namespace+" "));f.restoreHeaders(b);d.toggleClass(f.css.table+" "+e.tableClass+" tablesorter-"+e.theme,!1===a);b.hasInitialized=!1;delete b.config.cache;"function"===typeof c&&c(b)}};f.regex={chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i};f.sortNatural=function(b,a){if(b===a)return 0;var c,d,e,g,k,l;d=f.regex;if(d.hex.test(a)){c=parseInt(b.match(d.hex), 16);e=parseInt(a.match(d.hex),16);if(c<e)return-1;if(c>e)return 1}c=b.replace(d.chunk,"\\0$1\\0").replace(d.chunks,"").split("\\0");d=a.replace(d.chunk,"\\0$1\\0").replace(d.chunks,"").split("\\0");l=Math.max(c.length,d.length);for(k=0;k<l;k++){e=isNaN(c[k])?c[k]||0:parseFloat(c[k])||0;g=isNaN(d[k])?d[k]||0:parseFloat(d[k])||0;if(isNaN(e)!==isNaN(g))return isNaN(e)?1:-1;typeof e!==typeof g&&(e+="",g+="");if(e<g)return-1;if(e>g)return 1}return 0};f.sortNaturalAsc=function(b,a,c,d,e){if(b===a)return 0; c=e.string[e.empties[c]||e.emptyTo];return""===b&&0!==c?"boolean"===typeof c?c?-1:1:-c||-1:""===a&&0!==c?"boolean"===typeof c?c?1:-1:c||1:f.sortNatural(b,a)};f.sortNaturalDesc=function(b,a,c,d,e){if(b===a)return 0;c=e.string[e.empties[c]||e.emptyTo];return""===b&&0!==c?"boolean"===typeof c?c?-1:1:c||1:""===a&&0!==c?"boolean"===typeof c?c?1:-1:-c||-1:f.sortNatural(a,b)};f.sortText=function(b,a){return b>a?1:b<a?-1:0};f.getTextValue=function(b,a,c){if(c){var d=b?b.length:0,e=c+a;for(c=0;c<d;c++)e+= b.charCodeAt(c);return a*e}return 0};f.sortNumericAsc=function(b,a,c,d,e,g){if(b===a)return 0;g=g.config;e=g.string[g.empties[e]||g.emptyTo];if(""===b&&0!==e)return"boolean"===typeof e?e?-1:1:-e||-1;if(""===a&&0!==e)return"boolean"===typeof e?e?1:-1:e||1;isNaN(b)&&(b=f.getTextValue(b,c,d));isNaN(a)&&(a=f.getTextValue(a,c,d));return b-a};f.sortNumericDesc=function(b,a,c,d,e,g){if(b===a)return 0;g=g.config;e=g.string[g.empties[e]||g.emptyTo];if(""===b&&0!==e)return"boolean"===typeof e?e?-1:1:e||1;if(""=== a&&0!==e)return"boolean"===typeof e?e?1:-1:-e||-1;isNaN(b)&&(b=f.getTextValue(b,c,d));isNaN(a)&&(a=f.getTextValue(a,c,d));return a-b};f.sortNumeric=function(b,a){return b-a};f.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6", O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};f.replaceAccents=function(b){var a,c="[",d=f.characterEquivalents;if(!f.characterRegex){f.characterRegexArray={};for(a in d)"string"===typeof a&&(c+=d[a],f.characterRegexArray[a]=RegExp("["+d[a]+"]","g"));f.characterRegex=RegExp(c+"]")}if(f.characterRegex.test(b))for(a in d)"string"===typeof a&&(b=b.replace(f.characterRegexArray[a],a));return b};f.isValueInArray=function(b, a){var c,d=a.length;for(c=0;c<d;c++)if(a[c][0]===b)return c;return-1};f.addParser=function(b){var a,c=f.parsers.length,d=!0;for(a=0;a<c;a++)f.parsers[a].id.toLowerCase()===b.id.toLowerCase()&&(d=!1);d&&f.parsers.push(b)};f.getParserById=function(b){var a,c=f.parsers.length;for(a=0;a<c;a++)if(f.parsers[a].id.toLowerCase()===b.toString().toLowerCase())return f.parsers[a];return!1};f.addWidget=function(b){f.widgets.push(b)};f.getWidgetById=function(b){var a,c,d=f.widgets.length;for(a=0;a<d;a++)if((c= f.widgets[a])&&c.hasOwnProperty("id")&&c.id.toLowerCase()===b.toLowerCase())return c};f.applyWidget=function(b,a){b=g(b)[0];var c=b.config,d=c.widgetOptions,e=[],n,k,l;!1!==a&&b.hasInitialized&&(b.isApplyingWidgets||b.isUpdating)||(c.debug&&(n=new Date),c.widgets.length&&(b.isApplyingWidgets=!0,c.widgets=g.grep(c.widgets,function(a,b){return g.inArray(a,c.widgets)===b}),g.each(c.widgets||[],function(a,b){(l=f.getWidgetById(b))&&l.id&&(l.priority||(l.priority=10),e[a]=l)}),e.sort(function(a,b){return a.priority< b.priority?-1:a.priority===b.priority?0:1}),g.each(e,function(e,f){if(f){if(a||!c.widgetInit[f.id])f.hasOwnProperty("options")&&(d=b.config.widgetOptions=g.extend(!0,{},f.options,d)),f.hasOwnProperty("init")&&f.init(b,f,c,d),c.widgetInit[f.id]=!0;!a&&f.hasOwnProperty("format")&&f.format(b,c,d,!1)}})),setTimeout(function(){b.isApplyingWidgets=!1},0),c.debug&&(k=c.widgets.length,u("Completed "+(!0===a?"initializing ":"applying ")+k+" widget"+(1!==k?"s":""),n)))};f.refreshWidgets=function(b,a,c){b=g(b)[0]; var h,e=b.config,n=e.widgets,k=f.widgets,l=k.length;for(h=0;h<l;h++)k[h]&&k[h].id&&(a||0>g.inArray(k[h].id,n))&&(e.debug&&d('Refeshing widgets: Removing "'+k[h].id+'"'),k[h].hasOwnProperty("remove")&&e.widgetInit[k[h].id]&&(k[h].remove(b,e,e.widgetOptions),e.widgetInit[k[h].id]=!1));!0!==c&&f.applyWidget(b,a)};f.getData=function(b,a,c){var d="";b=g(b);var e,f;if(!b.length)return"";e=g.metadata?b.metadata():!1;f=" "+(b.attr("class")||"");"undefined"!==typeof b.data(c)||"undefined"!==typeof b.data(c.toLowerCase())? d+=b.data(c)||b.data(c.toLowerCase()):e&&"undefined"!==typeof e[c]?d+=e[c]:a&&"undefined"!==typeof a[c]?d+=a[c]:" "!==f&&f.match(" "+c+"-")&&(d=f.match(RegExp("\\s"+c+"-([\\w-]+)"))[1]||"");return g.trim(d)};f.formatFloat=function(b,a){if("string"!==typeof b||""===b)return b;var c;b=(a&&a.config?!1!==a.config.usNumberFormat:"undefined"!==typeof a?a:1)?b.replace(/,/g,""):b.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(b)&&(b=b.replace(/^\s*\(([.\d]+)\)/,"-$1"));c=parseFloat(b);return isNaN(c)? g.trim(b):c};f.isDigit=function(b){return isNaN(b)?/^[\-+(]?\d+[)]?$/.test(b.toString().replace(/[,.'"\s]/g,"")):!0}}});var p=g.tablesorter;g.fn.extend({tablesorter:p.construct});p.addParser({id:"text",is:function(){return!0},format:function(d,u){var n=u.config;d&&(d=g.trim(n.ignoreCase?d.toLocaleLowerCase():d),d=n.sortLocaleCompare?p.replaceAccents(d):d);return d},type:"text"});p.addParser({id:"digit",is:function(d){return p.isDigit(d)},format:function(d,u){var n=p.formatFloat((d||"").replace(/[^\w,. \-()]/g, ""),u);return d&&"number"===typeof n?n:d?g.trim(d&&u.config.ignoreCase?d.toLocaleLowerCase():d):d},type:"numeric"});p.addParser({id:"currency",is:function(d){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((d||"").replace(/[+\-,. ]/g,""))},format:function(d,u){var n=p.formatFloat((d||"").replace(/[^\w,. \-()]/g,""),u);return d&&"number"===typeof n?n:d?g.trim(d&&u.config.ignoreCase?d.toLocaleLowerCase():d):d},type:"numeric"});p.addParser({id:"ipAddress", is:function(d){return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(d)},format:function(d,g){var n,v=d?d.split("."):"",s="",x=v.length;for(n=0;n<x;n++)s+=("00"+v[n]).slice(-3);return d?p.formatFloat(s,g):d},type:"numeric"});p.addParser({id:"url",is:function(d){return/^(https?|ftp|file):\/\//.test(d)},format:function(d){return d?g.trim(d.replace(/(https?|ftp|file):\/\//,"")):d},type:"text"});p.addParser({id:"isoDate",is:function(d){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(d)},format:function(d, g){return d?p.formatFloat(""!==d?(new Date(d.replace(/-/g,"/"))).getTime()||d:"",g):d},type:"numeric"});p.addParser({id:"percent",is:function(d){return/(\d\s*?%|%\s*?\d)/.test(d)&&15>d.length},format:function(d,g){return d?p.formatFloat(d.replace(/%/g,""),g):d},type:"numeric"});p.addParser({id:"usLongDate",is:function(d){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(d)||/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(d)},format:function(d,g){return d?p.formatFloat((new Date(d.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime()||d,g):d},type:"numeric"});p.addParser({id:"shortDate",is:function(d){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((d||"").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(d,g,n,v){if(d){n=g.config;var s=n.$headers.filter("[data-column="+v+"]:last");v=s.length&&s[0].dateFormat||p.getData(s,n.headers[v],"dateFormat")||n.dateFormat;d=d.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===v?d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2"):"ddmmyyyy"===v?d=d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===v&&(d=d.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3"))}return d?p.formatFloat((new Date(d)).getTime()||d,g):d},type:"numeric"});p.addParser({id:"time",is:function(d){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(d)},format:function(d,g){return d?p.formatFloat((new Date("2000/01/01 "+d.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||d,g):d},type:"numeric"});p.addParser({id:"metadata", is:function(){return!1},format:function(d,p,n){d=p.config;d=d.parserMetadataName?d.parserMetadataName:"sortValue";return g(n).metadata()[d]},type:"numeric"});p.addWidget({id:"zebra",priority:90,format:function(d,u,n){var v,s,x,y,C,D,E=RegExp(u.cssChildRow,"i"),B=u.$tbodies;u.debug&&(C=new Date);for(d=0;d<B.length;d++)v=B.eq(d),D=v.children("tr").length,1<D&&(x=0,v=v.children("tr:visible").not(u.selectorRemove),v.each(function(){s=g(this);E.test(this.className)||x++;y=0===x%2;s.removeClass(n.zebra[y? 1:0]).addClass(n.zebra[y?0:1])}));u.debug&&p.benchmark("Applying Zebra widget",C)},remove:function(d,p,n){var v;p=p.$tbodies;var s=(n.zebra||["even","odd"]).join(" ");for(n=0;n<p.length;n++)v=g.tablesorter.processTbody(d,p.eq(n),!0),v.children().removeClass(s),g.tablesorter.processTbody(d,v,!1)}})}(jQuery);

/*! tableSorter 2.16+ widgets - updated 5/5/2014 (v2.16.4)
 *
 * Column Styles
 * Column Filters
 * Column Resizing
 * Sticky Header
 * UI Theme (generalized)
 * Save Sort
 * [ "columns", "filter", "resizable", "stickyHeaders", "uitheme", "saveSort" ]
 */
/*jshint browser:true, jquery:true, unused:false, loopfunc:true */
/*global jQuery: false, localStorage: false, navigator: false */
;(function($) {
"use strict";
var ts = $.tablesorter = $.tablesorter || {};

ts.themes = {
	"bootstrap" : {
		table      : 'table table-bordered table-striped',
		caption    : 'caption',
		header     : 'bootstrap-header', // give the header a gradient background
		footerRow  : '',
		footerCells: '',
		icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		sortNone   : 'bootstrap-icon-unsorted',
		sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',
		sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down',
		active     : '', // applied when column is sorted
		hover      : '', // use custom css here - bootstrap class may not override it
		filterRow  : '', // filter row class
		even       : '', // even row zebra striping
		odd        : ''  // odd row zebra striping
	},
	"jui" : {
		table      : 'ui-widget ui-widget-content ui-corner-all', // table classes
		caption    : 'ui-widget-content ui-corner-all',
		header     : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		footerRow  : '',
		footerCells: '',
		icons      : 'ui-icon', // icon class added to the <i> in the header
		sortNone   : 'ui-icon-carat-2-n-s',
		sortAsc    : 'ui-icon-carat-1-n',
		sortDesc   : 'ui-icon-carat-1-s',
		active     : 'ui-state-active', // applied when column is sorted
		hover      : 'ui-state-hover',  // hover class
		filterRow  : '',
		even       : 'ui-widget-content', // even row zebra striping
		odd        : 'ui-state-default'   // odd row zebra striping
	}
};

$.extend(ts.css, {
	filterRow : 'tablesorter-filter-row',   // filter
	filter    : 'tablesorter-filter',
	wrapper   : 'tablesorter-wrapper',      // ui theme & resizable
	resizer   : 'tablesorter-resizer',      // resizable
	grip      : 'tablesorter-resizer-grip',
	sticky    : 'tablesorter-stickyHeader', // stickyHeader
	stickyVis : 'tablesorter-sticky-visible'
});

// *** Store data in local storage, with a cookie fallback ***
/* IE7 needs JSON library for JSON.stringify - (http://caniuse.com/#search=json)
   if you need it, then include https://github.com/douglascrockford/JSON-js

   $.parseJSON is not available is jQuery versions older than 1.4.1, using older
   versions will only allow storing information for one page at a time

   // *** Save data (JSON format only) ***
   // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
   var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
   // $.tablesorter.storage(table, key, val);
   $.tablesorter.storage(table, 'tablesorter-mywidget', val);

   // *** Get data: $.tablesorter.storage(table, key); ***
   v = $.tablesorter.storage(table, 'tablesorter-mywidget');
   // val may be empty, so also check for your data
   val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
   alert(val); // "data1" if saved, or "" if not
*/
ts.storage = function(table, key, value, options) {
	table = $(table)[0];
	var cookieIndex, cookies, date,
		hasLocalStorage = false,
		values = {},
		c = table.config,
		$table = $(table),
		id = options && options.id || $table.attr(options && options.group ||
			'data-table-group') || table.id || $('.tablesorter').index( $table ),
		url = options && options.url || $table.attr(options && options.page ||
			'data-table-page') || c && c.fixedUrl || window.location.pathname;
	// https://gist.github.com/paulirish/5558557
	if ("localStorage" in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
			hasLocalStorage = true;
			window.localStorage.removeItem('_tmptest');
		} catch(error) {}
	}
	// *** get value ***
	if ($.parseJSON) {
		if (hasLocalStorage) {
			values = $.parseJSON(localStorage[key] || '{}');
		} else {
			// old browser, using cookies
			cookies = document.cookie.split(/[;\s|=]/);
			// add one to get from the key to the value
			cookieIndex = $.inArray(key, cookies) + 1;
			values = (cookieIndex !== 0) ? $.parseJSON(cookies[cookieIndex] || '{}') : {};
		}
	}
	// allow value to be an empty string too
	if ((value || value === '') && window.JSON && JSON.hasOwnProperty('stringify')) {
		// add unique identifiers = url pathname > table ID/index on page > data
		if (!values[url]) {
			values[url] = {};
		}
		values[url][id] = value;
		// *** set value ***
		if (hasLocalStorage) {
			localStorage[key] = JSON.stringify(values);
		} else {
			date = new Date();
			date.setTime(date.getTime() + (31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(values)).replace(/\"/g,'\"') + '; expires=' + date.toGMTString() + '; path=/';
		}
	} else {
		return values && values[url] ? values[url][id] : '';
	}
};

// Add a resize event to table headers
// **************************
ts.addHeaderResizeEvent = function(table, disable, settings) {
	var headers,
		defaults = {
			timer : 250
		},
		options = $.extend({}, defaults, settings),
		c = table.config,
		wo = c.widgetOptions,
		checkSizes = function(triggerEvent) {
			wo.resize_flag = true;
			headers = [];
			c.$headers.each(function() {
				var $header = $(this),
					sizes = $header.data('savedSizes') || [0,0], // fixes #394
					width = this.offsetWidth,
					height = this.offsetHeight;
				if (width !== sizes[0] || height !== sizes[1]) {
					$header.data('savedSizes', [ width, height ]);
					headers.push(this);
				}
			});
			if (headers.length && triggerEvent !== false) {
				c.$table.trigger('resize', [ headers ]);
			}
			wo.resize_flag = false;
		};
	checkSizes(false);
	clearInterval(wo.resize_timer);
	if (disable) {
		wo.resize_flag = false;
		return false;
	}
	wo.resize_timer = setInterval(function() {
		if (wo.resize_flag) { return; }
		checkSizes();
	}, options.timer);
};

// Widget: General UI theme
// "uitheme" option in "widgetOptions"
// **************************
ts.addWidget({
	id: "uitheme",
	priority: 10,
	format: function(table, c, wo) {
		var i, time, classes, $header, $icon, $tfoot,
			themesAll = ts.themes,
			$table = c.$table,
			$headers = c.$headers,
			theme = c.theme || 'jui',
			themes = themesAll[theme] || themesAll.jui,
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc;
		if (c.debug) { time = new Date(); }
		// initialization code - run once
		if (!$table.hasClass('tablesorter-' + theme) || c.theme === theme || !table.hasInitialized) {
			// update zebra stripes
			if (themes.even !== '') { wo.zebra[0] += ' ' + themes.even; }
			if (themes.odd !== '') { wo.zebra[1] += ' ' + themes.odd; }
			// add caption style
			$table.find('caption').addClass(themes.caption);
			// add table/footer class names
			$tfoot = $table
				// remove other selected themes
				.removeClass( c.theme === '' ? '' : 'tablesorter-' + c.theme )
				.addClass('tablesorter-' + theme + ' ' + themes.table) // add theme widget class name
				.find('tfoot');
			if ($tfoot.length) {
				$tfoot
					.find('tr').addClass(themes.footerRow)
					.children('th, td').addClass(themes.footerCells);
			}
			// update header classes
			$headers
				.addClass(themes.header)
				.not('.sorter-false')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event) {
					// toggleClass with switch added in jQuery 1.3
					$(this)[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ](themes.hover);
				});
			if (!$headers.find('.' + ts.css.wrapper).length) {
				// Firefox needs this inner div to position the resizer correctly
				$headers.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
			}
			if (c.cssIcon) {
				// if c.cssIcon is '', then no <i> is added to the header
				$headers.find('.' + ts.css.icon).addClass(themes.icons);
			}
			if ($table.hasClass('hasFilters')) {
				$headers.find('.' + ts.css.filterRow).addClass(themes.filterRow);
			}
		}
		for (i = 0; i < c.columns; i++) {
			$header = c.$headers.add(c.$extraHeaders).filter('[data-column="' + i + '"]');
			$icon = (ts.css.icon) ? $header.find('.' + ts.css.icon) : $header;
			if (c.$headers.filter('[data-column="' + i + '"]:last')[0].sortDisabled) {
				// no sort arrows for disabled columns!
				$header.removeClass(remove);
				$icon.removeClass(remove + ' ' + themes.icons);
			} else {
				classes = ($header.hasClass(ts.css.sortAsc)) ?
					themes.sortAsc :
					($header.hasClass(ts.css.sortDesc)) ? themes.sortDesc :
						$header.hasClass(ts.css.header) ? themes.sortNone : '';
				$header[classes === themes.sortNone ? 'removeClass' : 'addClass'](themes.active);
				$icon.removeClass(remove).addClass(classes);
			}
		}
		if (c.debug) {
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo) {
		var $table = c.$table,
			theme = c.theme || 'jui',
			themes = ts.themes[ theme ] || ts.themes.jui,
			$headers = $table.children('thead').children(),
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc;
		$table
			.removeClass('tablesorter-' + theme + ' ' + themes.table)
			.find(ts.css.header).removeClass(themes.header);
		$headers
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
			.find('.' + ts.css.filterRow)
			.removeClass(themes.filterRow);
		$headers.find('.' + ts.css.icon).removeClass(themes.icons);
	}
});

// Widget: Column styles
// "columns", "columns_thead" (true) and
// "columns_tfoot" (true) options in "widgetOptions"
// **************************
ts.addWidget({
	id: "columns",
	priority: 30,
	options : {
		columns : [ "primary", "secondary", "tertiary" ]
	},
	format: function(table, c, wo) {
		var time, $tbody, tbodyIndex, $rows, rows, $row, $cells, remove, indx,
			$table = c.$table,
			$tbodies = c.$tbodies,
			sortList = c.sortList,
			len = sortList.length,
			// removed c.widgetColumns support
			css = wo && wo.columns || [ "primary", "secondary", "tertiary" ],
			last = css.length - 1;
			remove = css.join(' ');
		if (c.debug) {
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // detach tbody
			$rows = $tbody.children('tr');
			// loop through the visible rows
			$rows.each(function() {
				$row = $(this);
				if (this.style.display !== 'none') {
					// remove all columns class names
					$cells = $row.children().removeClass(remove);
					// add appropriate column class names
					if (sortList && sortList[0]) {
						// primary sort column class
						$cells.eq(sortList[0][0]).addClass(css[0]);
						if (len > 1) {
							for (indx = 1; indx < len; indx++) {
								// secondary, tertiary, etc sort column classes
								$cells.eq(sortList[indx][0]).addClass( css[indx] || css[last] );
							}
						}
					}
				}
			});
			ts.processTbody(table, $tbody, false);
		}
		// add classes to thead and tfoot
		rows = wo.columns_thead !== false ? ['thead tr'] : [];
		if (wo.columns_tfoot !== false) {
			rows.push('tfoot tr');
		}
		if (rows.length) {
			$rows = $table.find( rows.join(',') ).children().removeClass(remove);
			if (len) {
				for (indx = 0; indx < len; indx++) {
					// add primary. secondary, tertiary, etc sort column classes
					$rows.filter('[data-column="' + sortList[indx][0] + '"]').addClass(css[indx] || css[last]);
				}
			}
		}
		if (c.debug) {
			ts.benchmark("Applying Columns widget", time);
		}
	},
	remove: function(table, c, wo) {
		var tbodyIndex, $tbody,
			$tbodies = c.$tbodies,
			remove = (wo.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
		c.$headers.removeClass(remove);
		c.$table.children('tfoot').children('tr').children('th, td').removeClass(remove);
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
			$tbody.children('tr').each(function() {
				$(this).children().removeClass(remove);
			});
			ts.processTbody(table, $tbody, false); // restore tbody
		}
	}
});

// Widget: filter
// **************************
ts.addWidget({
	id: "filter",
	priority: 50,
	options : {
		filter_childRows     : false, // if true, filter includes child row content in the search
		filter_columnFilters : true,  // if true, a filter will be added to the top of each table column
		filter_cssFilter     : '',    // css class name added to the filter row & each input in the row (tablesorter-filter is ALWAYS added)
		filter_external      : '',    // jQuery selector string (or jQuery object) of external filters
		filter_filteredRow   : 'filtered', // class added to filtered rows; needed by pager plugin
		filter_formatter     : null,  // add custom filter elements to the filter row
		filter_functions     : null,  // add custom filter functions using this option
		filter_hideEmpty     : true,  // hide filter row when table is empty
		filter_hideFilters   : false, // collapse filter row when mouse leaves the area
		filter_ignoreCase    : true,  // if true, make all searches case-insensitive
		filter_liveSearch    : true,  // if true, search column content while the user types (with a delay)
		filter_onlyAvail     : 'filter-onlyAvail', // a header with a select dropdown & this class name will only show available (visible) options within the drop down
		filter_placeholder   : { search : '', select : '' }, // default placeholder text (overridden by any header "data-placeholder" setting)
		filter_reset         : null,  // jQuery selector string of an element used to reset the filters
		filter_saveFilters   : false, // Use the $.tablesorter.storage utility to save the most recent filters
		filter_searchDelay   : 300,   // typing delay in milliseconds before starting a search
		filter_selectSource  : null,  // include a function to return an array of values to be added to the column filter select
		filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
		filter_useParsedData : false, // filter all data using parsed content
		filter_serversideFiltering : false, // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.
		filter_defaultAttrib : 'data-value' // data attribute in the header cell that contains the default filter value
	},
	format: function(table, c, wo) {
		if (!c.$table.hasClass('hasFilters')) {
			ts.filter.init(table, c, wo);
		}
	},
	remove: function(table, c, wo) {
		var tbodyIndex, $tbody,
			$table = c.$table,
			$tbodies = c.$tbodies;
		$table
			.removeClass('hasFilters')
			// add .tsfilter namespace to all BUT search
			.unbind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter '))
			.find('.' + ts.css.filterRow).remove();
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
			$tbody.children().removeClass(wo.filter_filteredRow).show();
			ts.processTbody(table, $tbody, false); // restore tbody
		}
		if (wo.filter_reset) {
			$(document).undelegate(wo.filter_reset, 'click.tsfilter');
		}
	}
});

ts.filter = {

	// regex used in filter "check" functions - not for general use and not documented
	regex: {
		regex     : /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/, // regex to test for regex
		child     : /tablesorter-childRow/, // child row class name; this gets updated in the script
		filtered  : /filtered/, // filtered (hidden) row class name; updated in the script
		type      : /undefined|number/, // check type
		exact     : /(^[\"|\'|=]+)|([\"|\'|=]+$)/g, // exact match (allow '==')
		nondigit  : /[^\w,. \-()]/g, // replace non-digits (from digit & currency parser)
		operators : /[<>=]/g // replace operators
	},
		// function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed )
		// filter = array of filter input values; iFilter = same array, except lowercase
		// exact = table cell text (or parsed data if column parser enabled)
		// iExact = same as exact, except lowercase
		// cached = table cell text from cache, so it has been parsed
		// index = column index; table = table element (DOM)
		// wo = widget options (table.config.widgetOptions)
		// parsed = array (by column) of boolean values (from filter_useParsedData or "filter-parsed" class)
	types: {
		// Look for regex
		regex: function( filter, iFilter, exact, iExact ) {
			if ( ts.filter.regex.regex.test(iFilter) ) {
				var matches,
					regex = ts.filter.regex.regex.exec(iFilter);
				try {
					matches = new RegExp(regex[1], regex[2]).test( iExact );
				} catch (error) {
					matches = false;
				}
				return matches;
			}
			return null;
		},
		// Look for operators >, >=, < or <=
		operators: function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed ) {
			if ( /^[<>]=?/.test(iFilter) ) {
				var cachedValue, result,
					c = table.config,
					query = ts.formatFloat( iFilter.replace(ts.filter.regex.operators, ''), table ),
					parser = c.parsers[index],
					savedSearch = query;
				// parse filter value in case we're comparing numbers (dates)
				if (parsed[index] || parser.type === 'numeric') {
					result = parser.format( $.trim('' + iFilter.replace(ts.filter.regex.operators, '')), table, [], index );
					query = ( typeof result === "number" && result !== '' && !isNaN(result) ) ? result : query;
				}

				// iExact may be numeric - see issue #149;
				// check if cached is defined, because sometimes j goes out of range? (numeric columns)
				cachedValue = ( parsed[index] || parser.type === 'numeric' ) && !isNaN(query) && typeof cached !== 'undefined' ? cached :
					isNaN(iExact) ? ts.formatFloat( iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( iExact, table );

				if ( />/.test(iFilter) ) { result = />=/.test(iFilter) ? cachedValue >= query : cachedValue > query; }
				if ( /</.test(iFilter) ) { result = /<=/.test(iFilter) ? cachedValue <= query : cachedValue < query; }
				// keep showing all rows if nothing follows the operator
				if ( !result && savedSearch === '' ) { result = true; }
				return result;
			}
			return null;
		},
		// Look for quotes or equals to get an exact match; ignore type since iExact could be numeric
		exact: function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed, rowArray ) {
			/*jshint eqeqeq:false */
			if (ts.filter.regex.exact.test(iFilter)) {
				var fltr = iFilter.replace(ts.filter.regex.exact, '');
				return rowArray ? $.inArray(fltr, rowArray) >= 0 : fltr == iExact;
			}
			return null;
		},
		// Look for a not match
		notMatch: function( filter, iFilter, exact, iExact, cached, index, table, wo ) {
			if ( /^\!/.test(iFilter) ) {
				iFilter = iFilter.replace('!', '');
				var indx = iExact.search( $.trim(iFilter) );
				return iFilter === '' ? true : !(wo.filter_startsWith ? indx === 0 : indx >= 0);
			}
			return null;
		},
		// Look for an AND or && operator (logical and)
		and : function( filter, iFilter, exact, iExact ) {
			if ( ts.filter.regex.andTest.test(filter) ) {
				var query = iFilter.split( ts.filter.regex.andSplit ),
					result = iExact.search( $.trim(query[0]) ) >= 0,
					indx = query.length - 1;
				while (result && indx) {
					result = result && iExact.search( $.trim(query[indx]) ) >= 0;
					indx--;
				}
				return result;
			}
			return null;
		},
		// Look for a range (using " to " or " - ") - see issue #166; thanks matzhu!
		range : function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed ) {
			if ( ts.filter.regex.toTest.test(iFilter) ) {
				var result, tmp,
					c = table.config,
					// make sure the dash is for a range and not indicating a negative number
					query = iFilter.split( ts.filter.regex.toSplit ),
					range1 = ts.formatFloat(query[0].replace(ts.filter.regex.nondigit, ''), table),
					range2 = ts.formatFloat(query[1].replace(ts.filter.regex.nondigit, ''), table);
					// parse filter value in case we're comparing numbers (dates)
				if (parsed[index] || c.parsers[index].type === 'numeric') {
					result = c.parsers[index].format('' + query[0], table, c.$headers.eq(index), index);
					range1 = (result !== '' && !isNaN(result)) ? result : range1;
					result = c.parsers[index].format('' + query[1], table, c.$headers.eq(index), index);
					range2 = (result !== '' && !isNaN(result)) ? result : range2;
				}
				result = ( parsed[index] || c.parsers[index].type === 'numeric' ) && !isNaN(range1) && !isNaN(range2) ? cached :
					isNaN(iExact) ? ts.formatFloat( iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( iExact, table );
				if (range1 > range2) { tmp = range1; range1 = range2; range2 = tmp; } // swap
				return (result >= range1 && result <= range2) || (range1 === '' || range2 === '');
			}
			return null;
		},
		// Look for wild card: ? = single, * = multiple, or | = logical OR
		wild : function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed, rowArray ) {
			if ( /[\?|\*]/.test(iFilter) || ts.filter.regex.orReplace.test(filter) ) {
				var c = table.config,
					query = iFilter.replace(ts.filter.regex.orReplace, "|");
				// look for an exact match with the "or" unless the "filter-match" class is found
				if (!c.$headers.filter('[data-column="' + index + '"]:last').hasClass('filter-match') && /\|/.test(query)) {
					query = $.isArray(rowArray) ? '(' + query + ')' : '^(' + query + ')$';
				}
				return new RegExp( query.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(iExact);
			}
			return null;
		},
		// fuzzy text search; modified from https://github.com/mattyork/fuzzy (MIT license)
		fuzzy: function( filter, iFilter, exact, iExact ) {
			if ( /^~/.test(iFilter) ) {
				var indx,
					patternIndx = 0,
					len = iExact.length,
					pattern = iFilter.slice(1);
				for (indx = 0; indx < len; indx++) {
					if (iExact[indx] === pattern[patternIndx]) {
						patternIndx += 1;
					}
				}
				if (patternIndx === pattern.length) {
					return true;
				}
				return false;
			}
			return null;
		}
	},
	init: function(table, c, wo) {
		// filter language options
		ts.language = $.extend(true, {}, {
			to  : 'to',
			or  : 'or',
			and : 'and'
		}, ts.language);

		var options, string, $header, column, filters, time,
			regex = ts.filter.regex;
		if (c.debug) {
			time = new Date();
		}
		c.$table.addClass('hasFilters');

		$.extend( regex, {
			child : new RegExp(c.cssChildRow),
			filtered : new RegExp(wo.filter_filteredRow),
			alreadyFiltered : new RegExp('(\\s+(' + ts.language.or + '|-|' + ts.language.to + ')\\s+)', 'i'),
			toTest : new RegExp('\\s+(-|' + ts.language.to + ')\\s+', 'i'),
			toSplit : new RegExp('(?:\\s+(?:-|' + ts.language.to + ')\\s+)' ,'gi'),
			andTest : new RegExp('\\s+(' + ts.language.and + '|&&)\\s+', 'i'),
			andSplit : new RegExp('(?:\\s+(?:' + ts.language.and + '|&&)\\s+)', 'gi'),
			orReplace : new RegExp('\\s+(' + ts.language.or + ')\\s+', 'gi')
		});

		// don't build filter row if columnFilters is false or all columns are set to "filter-false" - issue #156
		if (wo.filter_columnFilters !== false && c.$headers.filter('.filter-false').length !== c.$headers.length) {
			// build filter row
			ts.filter.buildRow(table, c, wo);
		}

		c.$table.bind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join(c.namespace + 'filter '), function(event, filter) {
			c.$table.find('.' + ts.css.filterRow).toggle( !(wo.filter_hideEmpty && $.isEmptyObject(c.cache)) ); // fixes #450
			if ( !/(search|filter)/.test(event.type) ) {
				event.stopPropagation();
				ts.filter.buildDefault(table, true);
			}
			if (event.type === 'filterReset') {
				ts.filter.searching(table, []);
			} else if (event.type === 'filterEnd') {
				ts.filter.buildDefault(table, true);
			} else {
				// send false argument to force a new search; otherwise if the filter hasn't changed, it will return
				filter = event.type === 'search' ? filter : event.type === 'updateComplete' ? c.$table.data('lastSearch') : '';
				if (/(update|add)/.test(event.type) && event.type !== "updateComplete") {
					// force a new search since content has changed
					c.lastCombinedFilter = null;
					c.lastSearch = [];
				}
				// pass true (skipFirst) to prevent the tablesorter.setFilters function from skipping the first input
				// ensures all inputs are updated when a search is triggered on the table $('table').trigger('search', [...]);
				ts.filter.searching(table, filter, true);
			}
			return false;
		});

		// reset button/link
		if (wo.filter_reset) {
			if (wo.filter_reset instanceof $) {
				// reset contains a jQuery object, bind to it
				wo.filter_reset.click(function(){
					c.$table.trigger('filterReset');
				});
			} else if ($(wo.filter_reset).length) {
				// reset is a jQuery selector, use event delegation
				$(document)
				.undelegate(wo.filter_reset, 'click.tsfilter')
				.delegate(wo.filter_reset, 'click.tsfilter', function() {
					// trigger a reset event, so other functions (filterFormatter) know when to reset
					c.$table.trigger('filterReset');
				});
			}
		}
		if (wo.filter_functions) {
			// column = column # (string)
			for (column in wo.filter_functions) {
				if (wo.filter_functions.hasOwnProperty(column) && typeof column === 'string') {
					$header = c.$headers.filter('[data-column="' + column + '"]:last');
					options = '';
					if (wo.filter_functions[column] === true && !$header.hasClass('filter-false')) {
						ts.filter.buildSelect(table, column);
					} else if (typeof column === 'string' && !$header.hasClass('filter-false')) {
						// add custom drop down list
						for (string in wo.filter_functions[column]) {
							if (typeof string === 'string') {
								options += options === '' ?
									'<option value="">' + ($header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.select || '') + '</option>' : '';
								options += '<option value="' + string + '">' + string + '</option>';
							}
						}
						c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').append(options);
					}
				}
			}
		}
		// not really updating, but if the column has both the "filter-select" class & filter_functions set to true,
		// it would append the same options twice.
		ts.filter.buildDefault(table, true);

		ts.filter.bindSearch( table, c.$table.find('.' + ts.css.filter), true );
		if (wo.filter_external) {
			ts.filter.bindSearch( table, wo.filter_external );
		}

		if (wo.filter_hideFilters) {
			ts.filter.hideFilters(table, c);
		}

		// show processing icon
		if (c.showProcessing) {
			c.$table.bind('filterStart' + c.namespace + 'filter filterEnd' + c.namespace + 'filter', function(event, columns) {
				// only add processing to certain columns to all columns
				$header = (columns) ? c.$table.find('.' + ts.css.header).filter('[data-column]').filter(function() {
					return columns[$(this).data('column')] !== '';
				}) : '';
				ts.isProcessing(table, event.type === 'filterStart', columns ? $header : '');
			});
		}

		if (c.debug) {
			ts.benchmark("Applying Filter widget", time);
		}
		// add default values
		c.$table.bind('tablesorter-initialized pagerInitialized', function() {
			filters = ts.filter.setDefaults(table, c, wo) || [];
			if (filters.length) {
				ts.setFilters(table, filters, true);
			}
			c.$table.trigger('filterFomatterUpdate');
			ts.filter.checkFilters(table, filters);
		});
		// filter widget initialized
		wo.filter_initialized = true;
		c.$table.trigger('filterInit');
	},
	setDefaults: function(table, c, wo) {
		var isArray, saved, indx,
			// get current (default) filters
			filters = ts.getFilters(table) || [];
		if (wo.filter_saveFilters && ts.storage) {
			saved = ts.storage( table, 'tablesorter-filters' ) || [];
			isArray = $.isArray(saved);
			// make sure we're not just getting an empty array
			if ( !(isArray && saved.join('') === '' || !isArray) ) { filters = saved; }
		}
		// if no filters saved, then check default settings
		if (filters.join('') === '') {
			for (indx = 0; indx < c.columns; indx++) {
				filters[indx] = c.$headers.filter('[data-column="' + indx + '"]:last').attr(wo.filter_defaultAttrib) || filters[indx];
			}
		}
		c.$table.data('lastSearch', filters);
		return filters;
	},
	buildRow: function(table, c, wo) {
		var column, $header, buildSelect, disabled, name,
			// c.columns defined in computeThIndexes()
			columns = c.columns,
			buildFilter = '<tr class="' + ts.css.filterRow + '">';
		for (column = 0; column < columns; column++) {
			buildFilter += '<td></td>';
		}
		c.$filters = $(buildFilter += '</tr>').appendTo( c.$table.children('thead').eq(0) ).find('td');
		// build each filter input
		for (column = 0; column < columns; column++) {
			disabled = false;
			// assuming last cell of a column is the main column
			$header = c.$headers.filter('[data-column="' + column + '"]:last');
			buildSelect = (wo.filter_functions && wo.filter_functions[column] && typeof wo.filter_functions[column] !== 'function') ||
				$header.hasClass('filter-select');
			// get data from jQuery data, metadata, headers option or header class name
			if (ts.getData) {
				// get data from jQuery data, metadata, headers option or header class name
				disabled = ts.getData($header[0], c.headers[column], 'filter') === 'false';
			} else {
				// only class names and header options - keep this for compatibility with tablesorter v2.0.5
				disabled = (c.headers[column] && c.headers[column].hasOwnProperty('filter') && c.headers[column].filter === false) ||
					$header.hasClass('filter-false');
			}
			if (buildSelect) {
				buildFilter = $('<select>').appendTo( c.$filters.eq(column) );
			} else {
				if (wo.filter_formatter && $.isFunction(wo.filter_formatter[column])) {
					buildFilter = wo.filter_formatter[column]( c.$filters.eq(column), column );
					// no element returned, so lets go find it
					if (buildFilter && buildFilter.length === 0) {
						buildFilter = c.$filters.eq(column).children('input');
					}
					// element not in DOM, so lets attach it
					if ( buildFilter && (buildFilter.parent().length === 0 ||
						(buildFilter.parent().length && buildFilter.parent()[0] !== c.$filters[column])) ) {
						c.$filters.eq(column).append(buildFilter);
					}
				} else {
					buildFilter = $('<input type="search">').appendTo( c.$filters.eq(column) );
				}
				if (buildFilter) {
					buildFilter.attr('placeholder', $header.data('placeholder') || $header.attr('data-placeholder') || wo.filter_placeholder.search || '');
				}
			}
			if (buildFilter) {
				// add filter class name
				name = ( $.isArray(wo.filter_cssFilter) ?
					(typeof wo.filter_cssFilter[column] !== 'undefined' ? wo.filter_cssFilter[column] || '' : '') :
					wo.filter_cssFilter ) || '';
				buildFilter.addClass( ts.css.filter + ' ' + name ).attr('data-column', column);
				if (disabled) {
					buildFilter.attr('placeholder', '').addClass('disabled')[0].disabled = true; // disabled!
				}
			}
		}
	},
	bindSearch: function(table, $el, internal) {
		table = $(table)[0];
		$el = $($el); // allow passing a selector string
		if (!$el.length) { return; }
		var c = table.config,
			wo = c.widgetOptions,
			$ext = wo.filter_$externalFilters;
		if (internal !== true) {
			// save anyMatch element
			wo.filter_$anyMatch = $el.filter('[data-column="all"]');
			if ($ext && $ext.length) {
				wo.filter_$externalFilters = wo.filter_$externalFilters.add( $el );
			} else {
				wo.filter_$externalFilters = $el;
			}
			// update values (external filters added after table initialization)
			ts.setFilters(table, c.$table.data('lastSearch') || [], internal === false);
		}
		$el
		// use data attribute instead of jQuery data since the head is cloned without including the data/binding
		.attr('data-lastSearchTime', new Date().getTime())
		.unbind('keypress keyup search change '.split(' ').join(c.namespace + 'filter '))
		// include change for select - fixes #473
		.bind('keyup search change '.split(' ').join(c.namespace + 'filter '), function(event) {
			$(this).attr('data-lastSearchTime', new Date().getTime());
			// emulate what webkit does.... escape clears the filter
			if (event.which === 27) {
				this.value = '';
			// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
			} else if ( (typeof wo.filter_liveSearch === 'number' && this.value.length < wo.filter_liveSearch && this.value !== '') ||
				( event.type === 'keyup' && ( (event.which < 32 && event.which !== 8 && wo.filter_liveSearch === true && event.which !== 13) ||
				( event.which >= 37 && event.which <= 40 ) || (event.which !== 13 && wo.filter_liveSearch === false) ) ) ) {
					return;
			}
			// true flag tells getFilters to skip newest timed input
			ts.filter.searching( table, true, true );
		})
		.bind('keypress.' + c.namespace + 'filter', function(event){
			if (event.which === 13) {
				event.preventDefault();
				$(this).blur();
			}
		});
		c.$table.bind('filterReset', function(){
			$el.val('');
		});
	},
	checkFilters: function(table, filter, skipFirst) {
		var c = table.config,
			wo = c.widgetOptions,
			filterArray = $.isArray(filter),
			filters = (filterArray) ? filter : ts.getFilters(table, true),
			combinedFilters = (filters || []).join(''); // combined filter values
		// prevent errors if delay init is set
		if ($.isEmptyObject(c.cache)) { return; }
		// add filter array back into inputs
		if (filterArray) {
			ts.setFilters( table, filters, false, skipFirst !== true );
		}
		if (wo.filter_hideFilters) {
			// show/hide filter row as needed
			c.$table.find('.' + ts.css.filterRow).trigger( combinedFilters === '' ? 'mouseleave' : 'mouseenter' );
		}
		// return if the last search is the same; but filter === false when updating the search
		// see example-widget-filter.html filter toggle buttons
		if (c.lastCombinedFilter === combinedFilters && filter !== false) {
			return;
		} else if (filter === false) {
			// force filter refresh
			c.lastCombinedFilter = null;
			c.lastSearch = [];
		}
		c.$table.trigger('filterStart', [filters]);
		if (c.showProcessing) {
			// give it time for the processing icon to kick in
			setTimeout(function() {
				ts.filter.findRows(table, filters, combinedFilters);
				return false;
			}, 30);
		} else {
			ts.filter.findRows(table, filters, combinedFilters);
			return false;
		}
	},
	hideFilters: function(table, c) {
		var $filterRow, $filterRow2, timer;
		$(table)
			.find('.' + ts.css.filterRow)
			.addClass('hideme')
			.bind('mouseenter mouseleave', function(e) {
				// save event object - http://bugs.jquery.com/ticket/12140
				var event = e;
				$filterRow = $(this);
				clearTimeout(timer);
				timer = setTimeout(function() {
					if ( /enter|over/.test(event.type) ) {
						$filterRow.removeClass('hideme');
					} else {
						// don't hide if input has focus
						// $(':focus') needs jQuery 1.6+
						if ( $(document.activeElement).closest('tr')[0] !== $filterRow[0] ) {
							// don't hide row if any filter has a value
							if (c.lastCombinedFilter === '') {
								$filterRow.addClass('hideme');
							}
						}
					}
				}, 200);
			})
			.find('input, select').bind('focus blur', function(e) {
				$filterRow2 = $(this).closest('tr');
				clearTimeout(timer);
				var event = e;
				timer = setTimeout(function() {
					// don't hide row if any filter has a value
					if (ts.getFilters(c.$table).join('') === '') {
						$filterRow2[ event.type === 'focus' ? 'removeClass' : 'addClass']('hideme');
					}
				}, 200);
			});
	},
	findRows: function(table, filters, combinedFilters) {
		if (table.config.lastCombinedFilter === combinedFilters) { return; }
		var cached, len, $rows, rowIndex, tbodyIndex, $tbody, $cells, columnIndex,
			childRow, childRowText, exact, iExact, iFilter, lastSearch, matches, result,
			notFiltered, searchFiltered, filterMatched, showRow, time, val, indx,
			anyMatch, iAnyMatch, rowArray, rowText, iRowText, rowCache,
			regex = ts.filter.regex,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns,
			$tbodies = c.$table.children('tbody'), // target all tbodies #568
			// anyMatch really screws up with these types of filters
			anyMatchNotAllowedTypes = [ 'range', 'notMatch',  'operators' ],
			// parse columns after formatter, in case the class is added at that point
			parsed = c.$headers.map(function(columnIndex) {
				return c.parsers && c.parsers[columnIndex] && c.parsers[columnIndex].parsed ||
					// getData won't return "parsed" if other "filter-" class names exist (e.g. <th class="filter-select filter-parsed">)
					ts.getData && ts.getData(c.$headers.filter('[data-column="' + columnIndex + '"]:last'), c.headers[columnIndex], 'filter') === 'parsed' ||
					$(this).hasClass('filter-parsed');
			}).get();
		if (c.debug) { time = new Date(); }
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			if ($tbodies.eq(tbodyIndex).hasClass(c.cssInfoBlock || ts.css.info)) { continue; } // ignore info blocks, issue #264
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
			// skip child rows & widget added (removable) rows - fixes #448 thanks to @hempel!
			// $rows = $tbody.children('tr').not(c.selectorRemove);
			columnIndex = c.columns;
			// convert stored rows into a jQuery object
			$rows = true ? $( $.map(c.cache[tbodyIndex].normalized, function(el){ return el[columnIndex].$row.get(); }) ) : $tbody.children('tr').not(c.selectorRemove);
			len = $rows.length;
			if (combinedFilters === '' || wo.filter_serversideFiltering) {
				$rows.removeClass(wo.filter_filteredRow).not('.' + c.cssChildRow).show();
			} else {
				// optimize searching only through already filtered rows - see #313
				searchFiltered = true;
				lastSearch = c.lastSearch || c.$table.data('lastSearch') || [];
				for (indx = 0; indx < columnIndex; indx++) {
					val = filters[indx] || '';
					// break out of loop if we've already determined not to search filtered rows
					if (!searchFiltered) { indx = columnIndex; }
					// search already filtered rows if...
					searchFiltered = searchFiltered && lastSearch.length &&
						// there are no changes from beginning of filter
						val.indexOf(lastSearch[indx] || '') === 0 &&
						// if there is NOT a logical "or", or range ("to" or "-") in the string
						!regex.alreadyFiltered.test(val) &&
						// if we are not doing exact matches, using "|" (logical or) or not "!"
						!/[=\"\|!]/.test(val) &&
						// don't search only filtered if the value is negative ('> -10' => '> -100' will ignore hidden rows)
						!(/(>=?\s*-\d)/.test(val) || /(<=?\s*\d)/.test(val)) && 
						// if filtering using a select without a "filter-match" class (exact match) - fixes #593
						!( val !== '' && wo.filter_functions && wo.filter_functions[indx] === true && !c.$headers.filter('[data-column="' + indx + '"]:last').hasClass('filter-match') );
				}
				notFiltered = $rows.not('.' + wo.filter_filteredRow).length;
				// can't search when all rows are hidden - this happens when looking for exact matches
				if (searchFiltered && notFiltered === 0) { searchFiltered = false; }
				if (c.debug) {
					ts.log( "Searching through " + ( searchFiltered && notFiltered < len ? notFiltered : "all" ) + " rows" );
				}
				if ((wo.filter_$anyMatch && wo.filter_$anyMatch.length) || filters[c.columns]) {
					anyMatch = wo.filter_$anyMatch && wo.filter_$anyMatch.val() || filters[c.columns] || '';
					if (c.sortLocaleCompare) {
						// replace accents
						anyMatch = ts.replaceAccents(anyMatch);
					}
					iAnyMatch = anyMatch.toLowerCase();
				}
				// loop through the rows
				for (rowIndex = 0; rowIndex < len; rowIndex++) {
					childRow = $rows[rowIndex].className;
					// skip child rows & already filtered rows
					if ( regex.child.test(childRow) || (searchFiltered && regex.filtered.test(childRow)) ) { continue; }
					showRow = true;
					// *** nextAll/nextUntil not supported by Zepto! ***
					childRow = $rows.eq(rowIndex).nextUntil('tr:not(.' + c.cssChildRow + ')');
					// so, if "table.config.widgetOptions.filter_childRows" is true and there is
					// a match anywhere in the child row, then it will make the row visible
					// checked here so the option can be changed dynamically
					childRowText = (childRow.length && wo.filter_childRows) ? childRow.text() : '';
					childRowText = wo.filter_ignoreCase ? childRowText.toLocaleLowerCase() : childRowText;
					$cells = $rows.eq(rowIndex).children();

					if (anyMatch) {
						rowArray = $cells.map(function(i){
							var txt;
							if (parsed[i]) {
								txt = c.cache[tbodyIndex].normalized[rowIndex][i];
							} else {
								txt = wo.filter_ignoreCase ? $(this).text().toLowerCase() : $(this).text();
								if (c.sortLocaleCompare) {
									txt = ts.replaceAccents(txt);
								}
							}
							return txt;
						}).get();
						rowText = rowArray.join(' ');
						iRowText = rowText.toLowerCase();
						rowCache = c.cache[tbodyIndex].normalized[rowIndex].slice(0,-1).join(' ');
						filterMatched = null;
						$.each(ts.filter.types, function(type, typeFunction) {
							if ($.inArray(type, anyMatchNotAllowedTypes) < 0) {
								matches = typeFunction( anyMatch, iAnyMatch, rowText, iRowText, rowCache, columns, table, wo, parsed, rowArray );
								if (matches !== null) {
									filterMatched = matches;
									return false;
								}
							}
						});
						if (filterMatched !== null) {
							showRow = filterMatched;
						} else {
							showRow = (iRowText + childRowText).indexOf(iAnyMatch) >= 0;
						}
					}

					for (columnIndex = 0; columnIndex < columns; columnIndex++) {
						// ignore if filter is empty or disabled
						if (filters[columnIndex]) {
							cached = c.cache[tbodyIndex].normalized[rowIndex][columnIndex];
							// check if column data should be from the cell or from parsed data
							if (wo.filter_useParsedData || parsed[columnIndex]) {
								exact = cached;
							} else {
							// using older or original tablesorter
								exact = $.trim($cells.eq(columnIndex).text());
								exact = c.sortLocaleCompare ? ts.replaceAccents(exact) : exact; // issue #405
							}
							iExact = !regex.type.test(typeof exact) && wo.filter_ignoreCase ? exact.toLocaleLowerCase() : exact;
							result = showRow; // if showRow is true, show that row

							// replace accents - see #357
							filters[columnIndex] = c.sortLocaleCompare ? ts.replaceAccents(filters[columnIndex]) : filters[columnIndex];
							// val = case insensitive, filters[columnIndex] = case sensitive
							iFilter = wo.filter_ignoreCase ? (filters[columnIndex] || '').toLocaleLowerCase() : filters[columnIndex];
							if (wo.filter_functions && wo.filter_functions[columnIndex]) {
								if (wo.filter_functions[columnIndex] === true) {
									// default selector; no "filter-select" class
									result = (c.$headers.filter('[data-column="' + columnIndex + '"]:last').hasClass('filter-match')) ?
										iExact.search(iFilter) >= 0 : filters[columnIndex] === exact;
								} else if (typeof wo.filter_functions[columnIndex] === 'function') {
									// filter callback( exact cell content, parser normalized content, filter input value, column index, jQuery row object )
									result = wo.filter_functions[columnIndex](exact, cached, filters[columnIndex], columnIndex, $rows.eq(rowIndex));
								} else if (typeof wo.filter_functions[columnIndex][filters[columnIndex]] === 'function') {
									// selector option function
									result = wo.filter_functions[columnIndex][filters[columnIndex]](exact, cached, filters[columnIndex], columnIndex, $rows.eq(rowIndex));
								}
							} else {
								filterMatched = null;
								// cycle through the different filters
								// filters return a boolean or null if nothing matches
								$.each(ts.filter.types, function(type, typeFunction) {
									matches = typeFunction( filters[columnIndex], iFilter, exact, iExact, cached, columnIndex, table, wo, parsed );
									if (matches !== null) {
										filterMatched = matches;
										return false;
									}
								});
								if (filterMatched !== null) {
									result = filterMatched;
								// Look for match, and add child row data for matching
								} else {
									exact = (iExact + childRowText).indexOf(iFilter);
									result = ( (!wo.filter_startsWith && exact >= 0) || (wo.filter_startsWith && exact === 0) );
								}
							}
							showRow = (result) ? showRow : false;
						}
					}
					$rows.eq(rowIndex)
						.toggle(showRow)
						.toggleClass(wo.filter_filteredRow, !showRow);
					if (childRow.length) {
						childRow.toggleClass(wo.filter_filteredRow, !showRow);
					}
				}
			}
			ts.processTbody(table, $tbody, false);
		}
		c.lastCombinedFilter = combinedFilters; // save last search
		c.lastSearch = filters;
		c.$table.data('lastSearch', filters);
		if (wo.filter_saveFilters && ts.storage) {
			ts.storage( table, 'tablesorter-filters', filters );
		}
		if (c.debug) {
			ts.benchmark("Completed filter widget search", time);
		}
		c.$table.trigger('filterEnd');
		setTimeout(function(){
			c.$table.trigger('applyWidgets'); // make sure zebra widget is applied
		}, 0);
	},
	getOptionSource: function(table, column, onlyAvail) {
		var cts,
			c = table.config,
			wo = c.widgetOptions,
			parsed = [],
			arry = false,
			source = wo.filter_selectSource;

		// filter select source option
		if ($.isFunction(source)) {
			// OVERALL source
			arry = source(table, column, onlyAvail);
		} else if ($.type(source) === 'object' && source.hasOwnProperty(column)) {
			// custom select source function for a SPECIFIC COLUMN
			arry = source[column](table, column, onlyAvail);
		}
		if (arry === false) {
			// fall back to original method
			arry = ts.filter.getOptions(table, column, onlyAvail);
		}

		// get unique elements and sort the list
		// if $.tablesorter.sortText exists (not in the original tablesorter),
		// then natural sort the list otherwise use a basic sort
		arry = $.grep(arry, function(value, indx) {
			return $.inArray(value, arry) === indx;
		});

		if (c.$headers.filter('[data-column="' + column + '"]:last').hasClass('filter-select-nosort')) {
			// unsorted select options
			return arry;
		} else {
			// parse select option values
			$.each(arry, function(i, v){
				// parse array data using set column parser; this DOES NOT pass the original
				// table cell to the parser format function
				parsed.push({ t : v, p : c.parsers && c.parsers[column].format( v, table, [], column ) || v });
			});

			// sort parsed select options
			cts = c.textSorter || '';
			parsed.sort(function(a, b){
				// sortNatural breaks if you don't pass it strings
				var x = a.p.toString(), y = b.p.toString();
				if ($.isFunction(cts)) {
					// custom OVERALL text sorter
					return cts(x, y, true, column, table);
				} else if (typeof(cts) === 'object' && cts.hasOwnProperty(column)) {
					// custom text sorter for a SPECIFIC COLUMN
					return cts[column](x, y, true, column, table);
				} else if (ts.sortNatural) {
					// fall back to natural sort
					return ts.sortNatural(x, y);
				}
				// using an older version! do a basic sort
				return true;
			});
			// rebuild arry from sorted parsed data
			arry = [];
			$.each(parsed, function(i, v){
				arry.push(v.t);
			});
			return arry;
		}
	},
	getOptions: function(table, column, onlyAvail) {
		var rowIndex, tbodyIndex, len, row, cache, cell,
			c = table.config,
			wo = c.widgetOptions,
			$tbodies = c.$table.children('tbody'),
			arry = [];
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			if (!$tbodies.eq(tbodyIndex).hasClass(c.cssInfoBlock)) {
				cache = c.cache[tbodyIndex];
				len = c.cache[tbodyIndex].normalized.length;
				// loop through the rows
				for (rowIndex = 0; rowIndex < len; rowIndex++) {
					// get cached row from cache.row (old) or row data object (new; last item in normalized array)
					row = cache.row ? cache.row[rowIndex] : cache.normalized[rowIndex][c.columns].$row[0];
					// check if has class filtered
					if (onlyAvail && row.className.match(wo.filter_filteredRow)) { continue; }
					// get non-normalized cell content
					if (wo.filter_useParsedData) {
						arry.push( '' + cache.normalized[rowIndex][column] );
					} else {
						cell = row.cells[column];
						if (cell) {
							arry.push( $.trim( cell.textContent || cell.innerText || $(cell).text() ) );
						}
					}
				}
			}
		}
		return arry;
	},
	buildSelect: function(table, column, updating, onlyAvail) {
		if (!table.config.cache || $.isEmptyObject(table.config.cache)) { return; }
		column = parseInt(column, 10);
		var indx, txt, $filters,
			c = table.config,
			wo = c.widgetOptions,
			node = c.$headers.filter('[data-column="' + column + '"]:last'),
			// t.data('placeholder') won't work in jQuery older than 1.4.3
			options = '<option value="">' + ( node.data('placeholder') || node.attr('data-placeholder') || wo.filter_placeholder.select || '' ) + '</option>',
			arry = ts.filter.getOptionSource(table, column, onlyAvail),
			// Get curent filter value
			currentValue = c.$table.find('thead').find('select.' + ts.css.filter + '[data-column="' + column + '"]').val();

		// build option list
		for (indx = 0; indx < arry.length; indx++) {
			txt = arry[indx].replace(/\"/g, "&quot;");
			// replace quotes - fixes #242 & ignore empty strings - see http://stackoverflow.com/q/14990971/145346
			options += arry[indx] !== '' ? '<option value="' + txt + '"' + (currentValue === txt ? ' selected="selected"' : '') +
				'>' + arry[indx] + '</option>' : '';
		}
		// update all selects in the same column (clone thead in sticky headers & any external selects) - fixes 473
		$filters = ( c.$filters ? c.$filters : c.$table.children('thead') ).find('.' + ts.css.filter);
		if (wo.filter_$externalFilters) {
			$filters = $filters && $filters.length ? $filters.add(wo.filter_$externalFilters) : wo.filter_$externalFilters;
		}
		$filters.filter('select[data-column="' + column + '"]')[ updating ? 'html' : 'append' ](options);
	},
	buildDefault: function(table, updating) {
		var columnIndex, $header,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns;
		// build default select dropdown
		for (columnIndex = 0; columnIndex < columns; columnIndex++) {
			$header = c.$headers.filter('[data-column="' + columnIndex + '"]:last');
			// look for the filter-select class; build/update it if found
			if (($header.hasClass('filter-select') || wo.filter_functions && wo.filter_functions[columnIndex] === true) &&
				!$header.hasClass('filter-false')) {
				if (!wo.filter_functions) { wo.filter_functions = {}; }
				wo.filter_functions[columnIndex] = true; // make sure this select gets processed by filter_functions
				ts.filter.buildSelect(table, columnIndex, updating, $header.hasClass(wo.filter_onlyAvail));
			}
		}
	},
	searching: function(table, filter, skipFirst) {
		if (typeof filter === 'undefined' || filter === true) {
			var wo = table.config.widgetOptions;
			// delay filtering
			clearTimeout(wo.searchTimer);
			wo.searchTimer = setTimeout(function() {
				ts.filter.checkFilters(table, filter, skipFirst );
			}, wo.filter_liveSearch ? wo.filter_searchDelay : 10);
		} else {
			// skip delay
			ts.filter.checkFilters(table, filter, skipFirst);
		}
	}
};

ts.getFilters = function(table, getRaw, setFilters, skipFirst) {
	var i, $filters, $column,
		filters = false,
		c = table ? $(table)[0].config : '',
		wo = c ? c.widgetOptions : '';
	if (getRaw !== true && wo && !wo.filter_columnFilters) {
		return $(table).data('lastSearch');
	}
	if (c) {
		if (c.$filters) {
			$filters = c.$filters.find('.' + ts.css.filter);
		}
		if (wo.filter_$externalFilters) {
			$filters = $filters && $filters.length ? $filters.add(wo.filter_$externalFilters) : wo.filter_$externalFilters;
		}
		if ($filters && $filters.length) {
			filters = setFilters || [];
			for (i = 0; i < c.columns + 1; i++) {
				$column = $filters.filter('[data-column="' + (i === c.columns ? 'all' : i) + '"]');
				if ($column.length) {
					// move the latest search to the first slot in the array
					$column = $column.sort(function(a, b){
						return $(b).attr('data-lastSearchTime') - $(a).attr('data-lastSearchTime');
					});
					if ($.isArray(setFilters)) {
						// skip first (latest input) to maintain cursor position while typing
						(skipFirst ? $column.slice(1) : $column).val( setFilters[i] ).trigger('change.tsfilter');
					} else {
						filters[i] = $column.val() || '';
						// don't change the first... it will move the cursor
						$column.slice(1).val( filters[i] );
					}
					// save any match input dynamically
					if (i === c.columns && $column.length) {
						wo.filter_$anyMatch = $column;
					}
				}
			}
		}
	}
	if (filters.length === 0) {
		filters = false;
	}
	return filters;
};

ts.setFilters = function(table, filter, apply, skipFirst) {
	var c = table ? $(table)[0].config : '',
		valid = ts.getFilters(table, true, filter, skipFirst);
	if (c && apply) {
		// ensure new set filters are applied, even if the search is the same
		c.lastCombinedFilter = null;
		c.lastSearch = [];
		ts.filter.searching(c.$table[0], filter, skipFirst);
		c.$table.trigger('filterFomatterUpdate');
	}
	return !!valid;
};

// Widget: Sticky headers
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60, // sticky widget must be initialized after the filter widget!
	options: {
		stickyHeaders : '',       // extra class name added to the sticky header row
		stickyHeaders_attachTo : null, // jQuery selector or object to attach sticky header to
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
		stickyHeaders_filteredToTop: true, // scroll table top into view after filtering
		stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
		stickyHeaders_addResizeEvent : true, // trigger "resize" event on headers
		stickyHeaders_includeCaption : true, // if false and a caption exist, it won't be included in the sticky header
		stickyHeaders_zIndex : 2 // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
	},
	format: function(table, c, wo) {
		// filter widget doesn't initialize on an empty table. Fixes #449
		if ( c.$table.hasClass('hasStickyHeaders') || ($.inArray('filter', c.widgets) >= 0 && !c.$table.hasClass('hasFilters')) ) {
			return;
		}
		var $table = c.$table,
			$attach = $(wo.stickyHeaders_attachTo),
			$thead = $table.children('thead:first'),
			$win = $attach.length ? $attach : $(window),
			$header = $thead.children('tr').not('.sticky-false').children(),
			innerHeader = '.' + ts.css.headerIn,
			$tfoot = $table.find('tfoot'),
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $attach.length ? 0 : $stickyOffset.length ?
				$stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			$stickyTable = wo.$sticky = $table.clone()
				.addClass('containsStickyHeaders')
				.css({
					position   : $attach.length ? 'absolute' : 'fixed',
					margin     : 0,
					top        : stickyOffset,
					left       : 0,
					visibility : 'hidden',
					zIndex     : wo.stickyHeaders_zIndex ? wo.stickyHeaders_zIndex : 2
				}),
			$stickyThead = $stickyTable.children('thead:first').addClass(ts.css.sticky + ' ' + wo.stickyHeaders),
			$stickyCells,
			laststate = '',
			spacing = 0,
			nonwkie = $table.css('border-collapse') !== 'collapse' && !/(webkit|msie)/i.test(navigator.userAgent),
			resizeHeader = function() {
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				spacing = 0;
				// yes, I dislike browser sniffing, but it really is needed here :(
				// webkit automatically compensates for border spacing
				if (nonwkie) {
					// Firefox & Opera use the border-spacing
					// update border-spacing here because of demos that switch themes
					spacing = parseInt($header.eq(0).css('border-left-width'), 10) * 2;
				}
				$stickyTable.css({
					left : $attach.length ? (parseInt($attach.css('padding-left'), 10) || 0) + parseInt(c.$table.css('padding-left'), 10) +
						parseInt(c.$table.css('margin-left'), 10) + parseInt($table.css('border-left-width'), 10) :
						$thead.offset().left - $win.scrollLeft() - spacing,
					width: $table.width()
				});
				$stickyCells.filter(':visible').each(function(i) {
					var $cell = $header.filter(':visible').eq(i),
						// some wibbly-wobbly... timey-wimey... stuff, to make columns line up in Firefox
						offset = nonwkie && $(this).attr('data-column') === ( '' + parseInt(c.columns/2, 10) ) ? 1 : 0;
					$(this)
						.css({ width: $cell.width() - spacing })
						.find(innerHeader).width( $cell.find(innerHeader).width() - offset );
				});
			};
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249) - don't remove cells to get correct cell indexing
		$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
		$stickyTable.find('tbody, tfoot').remove();
		if (!wo.stickyHeaders_includeCaption) {
			$stickyTable.find('caption').remove();
		} else {
			$stickyTable.find('caption').css( 'margin-left', '-1px' );
		}
		// issue #172 - find td/th in sticky header
		$stickyCells = $stickyThead.children().children();
		$stickyTable.css({ height:0, width:0, padding:0, margin:0, border:0 });
		// remove resizable block
		$stickyCells.find('.' + ts.css.resizer).remove();
		// update sticky header class names to match real header after sorting
		$table
			.addClass('hasStickyHeaders')
			.bind('pagerComplete.tsSticky', function() {
				resizeHeader();
			});

		ts.bindEvents(table, $stickyThead.children().children('.tablesorter-header'));

		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$table.after( $stickyTable );
		// make it sticky!
		$win.bind('scroll.tsSticky resize.tsSticky', function(event) {
			if (!$table.is(':visible')) { return; } // fixes #278
			var prefix = 'tablesorter-sticky-',
				offset = $table.offset(),
				captionHeight = (wo.stickyHeaders_includeCaption ? 0 : $table.find('caption').outerHeight(true)),
				scrollTop = ($attach.length ? $attach.offset().top : $win.scrollTop()) + stickyOffset - captionHeight,
				tableHeight = $table.height() - ($stickyTable.height() + ($tfoot.height() || 0)),
				isVisible = (scrollTop > offset.top) && (scrollTop < offset.top + tableHeight) ? 'visible' : 'hidden',
				cssSettings = { visibility : isVisible };
			if ($attach.length) {
				cssSettings.top = $attach.scrollTop();
			} else {
				// adjust when scrolling horizontally - fixes issue #143
				cssSettings.left = $thead.offset().left - $win.scrollLeft() - spacing;
			}
			$stickyTable
				.removeClass(prefix + 'visible ' + prefix + 'hidden')
				.addClass(prefix + isVisible)
				.css(cssSettings);
			if (isVisible !== laststate || event.type === 'resize') {
				// make sure the column widths match
				resizeHeader();
				laststate = isVisible;
			}
		});
		if (wo.stickyHeaders_addResizeEvent) {
			ts.addHeaderResizeEvent(table);
		}

		// look for filter widget
		if ($table.hasClass('hasFilters')) {
			// scroll table into view after filtering, if sticky header is active - #482
			$table.bind('filterEnd', function() {
				// $(':focus') needs jQuery 1.6+
				var $td = $(document.activeElement).closest('td'),
					column = $td.parent().children().index($td);
				// only scroll if sticky header is active
				if ($stickyTable.hasClass(ts.css.stickyVis) && wo.stickyHeaders_filteredToTop) {
					// scroll to original table (not sticky clone)
					window.scrollTo(0, $table.position().top);
					// give same input/select focus; check if c.$filters exists; fixes #594
					if (column >= 0 && c.$filters) {
						c.$filters.eq(column).find('a, select, input').filter(':visible').focus();
					}
				}
			});
			ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
			// support hideFilters
			if (wo.filter_hideFilters) {
				ts.filter.hideFilters($stickyTable, c);
			}
		}

		$table.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo) {
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind('pagerComplete.tsSticky')
			.find('.' + ts.css.sticky).remove();
		if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
		// don't unbind if any table on the page still has stickyheaders applied
		if (!$('.hasStickyHeaders').length) {
			$(window).unbind('scroll.tsSticky resize.tsSticky');
		}
		ts.addHeaderResizeEvent(table, false);
	}
});

// Add Column resizing widget
// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: "resizable",
	priority: 40,
	options: {
		resizable : true,
		resizable_addLastColumn : false,
		resizable_widths : []
	},
	format: function(table, c, wo) {
		if (c.$table.hasClass('hasResizable')) { return; }
		c.$table.addClass('hasResizable');
		ts.resizableReset(table, true); // set default widths
		var $rows, $columns, $column, column,
			storedSizes = {},
			$table = c.$table,
			mouseXPosition = 0,
			$target = null,
			$next = null,
			fullWidth = Math.abs($table.parent().width() - $table.width()) < 20,
			stopResize = function() {
				if (ts.storage && $target && $next) {
					storedSizes = {};
					storedSizes[$target.index()] = $target.width();
					storedSizes[$next.index()] = $next.width();
					$target.width( storedSizes[$target.index()] );
					$next.width( storedSizes[$next.index()] );
					if (wo.resizable !== false) {
						// save all column widths
						ts.storage(table, 'tablesorter-resizable', c.$headers.map(function(){ return $(this).width(); }).get() );
					}
				}
				mouseXPosition = 0;
				$target = $next = null;
				$(window).trigger('resize'); // will update stickyHeaders, just in case
			};
		storedSizes = (ts.storage && wo.resizable !== false) ? ts.storage(table, 'tablesorter-resizable') : {};
		// process only if table ID or url match
		if (storedSizes) {
			for (column in storedSizes) {
				if (!isNaN(column) && column < c.$headers.length) {
					c.$headers.eq(column).width(storedSizes[column]); // set saved resizable widths
				}
			}
		}
		$rows = $table.children('thead:first').children('tr');
		// add resizable-false class name to headers (across rows as needed)
		$rows.children().each(function() {
			var canResize,
				$column = $(this);
			column = $column.attr('data-column');
			canResize = ts.getData( $column, c.headers[column], 'resizable') === "false";
			$rows.children().filter('[data-column="' + column + '"]')[canResize ? 'addClass' : 'removeClass']('resizable-false');
		});
		// add wrapper inside each cell to allow for positioning of the resizable target block
		$rows.each(function() {
			$column = $(this).children().not('.resizable-false');
			if (!$(this).find('.' + ts.css.wrapper).length) {
				// Firefox needs this inner div to position the resizer correctly
				$column.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
			}
			// don't include the last column of the row
			if (!wo.resizable_addLastColumn) { $column = $column.slice(0,-1); }
			$columns = $columns ? $columns.add($column) : $column;
		});
		$columns
		.each(function() {
			var $column = $(this),
				padding = parseInt($column.css('padding-right'), 10) + 10; // 10 is 1/2 of the 20px wide resizer grip
			$column
				.find('.' + ts.css.wrapper)
				.append('<div class="' + ts.css.resizer + '" style="cursor:w-resize;position:absolute;z-index:1;right:-' +
					padding + 'px;top:0;height:100%;width:20px;"></div>');
		})
		.bind('mousemove.tsresize', function(event) {
			// ignore mousemove if no mousedown
			if (mouseXPosition === 0 || !$target) { return; }
			// resize columns
			var leftEdge = event.pageX - mouseXPosition,
				targetWidth = $target.width();
			$target.width( targetWidth + leftEdge );
			if ($target.width() !== targetWidth && fullWidth) {
				$next.width( $next.width() - leftEdge );
			}
			mouseXPosition = event.pageX;
		})
		.bind('mouseup.tsresize', function() {
			stopResize();
		})
		.find('.' + ts.css.resizer + ',.' + ts.css.grip)
		.bind('mousedown', function(event) {
			// save header cell and mouse position
			$target = $(event.target).closest('th');
			var $header = c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
			if ($header.length > 1) { $target = $target.add($header); }
			// if table is not as wide as it's parent, then resize the table
			$next = event.shiftKey ? $target.parent().find('th').not('.resizable-false').filter(':last') : $target.nextAll(':not(.resizable-false)').eq(0);
			mouseXPosition = event.pageX;
		});
		$table.find('thead:first')
		.bind('mouseup.tsresize mouseleave.tsresize', function() {
			stopResize();
		})
		// right click to reset columns to default widths
		.bind('contextmenu.tsresize', function() {
				ts.resizableReset(table);
				// $.isEmptyObject() needs jQuery 1.4+; allow right click if already reset
				var allowClick = $.isEmptyObject ? $.isEmptyObject(storedSizes) : true;
				storedSizes = {};
				return allowClick;
		});
	},
	remove: function(table, c) {
		c.$table
			.removeClass('hasResizable')
			.children('thead')
			.unbind('mouseup.tsresize mouseleave.tsresize contextmenu.tsresize')
			.children('tr').children()
			.unbind('mousemove.tsresize mouseup.tsresize')
			// don't remove "tablesorter-wrapper" as uitheme uses it too
			.find('.' + ts.css.resizer + ',.' + ts.css.grip).remove();
		ts.resizableReset(table);
	}
});
ts.resizableReset = function(table, nosave) {
	$(table).each(function(){
		var $t,
			c = this.config,
			wo = c && c.widgetOptions;
		if (table && c) {
			c.$headers.each(function(i){
				$t = $(this);
				if (wo.resizable_widths[i]) {
					$t.css('width', wo.resizable_widths[i]);
				} else if (!$t.hasClass('resizable-false')) {
					// don't clear the width of any column that is not resizable
					$t.css('width','');
				}
			});
			if (ts.storage && !nosave) { ts.storage(this, 'tablesorter-resizable', {}); }
		}
	});
};

// Save table sort widget
// this widget saves the last sort only if the
// saveSort widget option is true AND the
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: 'saveSort',
	priority: 20,
	options: {
		saveSort : true
	},
	init: function(table, thisWidget, c, wo) {
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, c, wo, true);
	},
	format: function(table, c, wo, init) {
		var stored, time,
			$table = c.$table,
			saveSort = wo.saveSort !== false, // make saveSort active/inactive; default to true
			sortList = { "sortList" : c.sortList };
		if (c.debug) {
			time = new Date();
		}
		if ($table.hasClass('hasSaveSort')) {
			if (saveSort && table.hasInitialized && ts.storage) {
				ts.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug) {
					ts.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$table.addClass('hasSaveSort');
			sortList = '';
			// get data
			if (ts.storage) {
				stored = ts.storage( table, 'tablesorter-savesort' );
				sortList = (stored && stored.hasOwnProperty('sortList') && $.isArray(stored.sortList)) ? stored.sortList : '';
				if (c.debug) {
					ts.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);
				}
				$table.bind('saveSortReset', function(event) {
					event.stopPropagation();
					ts.storage( table, 'tablesorter-savesort', '' );
				});
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0) {
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0) {
				// update sort change
				$table.trigger('sorton', [sortList]);
			}
		}
	},
	remove: function(table) {
		// clear storage
		if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);

/*!
 * tablesorter pager plugin
 * updated 4/23/2014 (v2.16.0)
 */
/*jshint browser:true, jquery:true, unused:false */
;(function($) {
	"use strict";
	/*jshint supernew:true */
	var ts = $.tablesorter;

	$.extend({ tablesorterPager: new function() {

		this.defaults = {
			// target the pager markup
			container: null,

			// use this format: "http://mydatabase.com?page={page}&size={size}&{sortList:col}&{filterList:fcol}"
			// where {page} is replaced by the page number, {size} is replaced by the number of records to show,
			// {sortList:col} adds the sortList to the url into a "col" array, and {filterList:fcol} adds
			// the filterList to the url into an "fcol" array.
			// So a sortList = [[2,0],[3,0]] becomes "&col[2]=0&col[3]=0" in the url
			// and a filterList = [[2,Blue],[3,13]] becomes "&fcol[2]=Blue&fcol[3]=13" in the url
			ajaxUrl: null,

			// modify the url after all processing has been applied
			customAjaxUrl: function(table, url) { return url; },

			// modify the $.ajax object to allow complete control over your ajax requests
			ajaxObject: {
				dataType: 'json'
			},

			// set this to false if you want to block ajax loading on init
			processAjaxOnInit: true,

			// process ajax so that the following information is returned:
			// [ total_rows (number), rows (array of arrays), headers (array; optional) ]
			// example:
			// [
			//   100,  // total rows
			//   [
			//     [ "row1cell1", "row1cell2", ... "row1cellN" ],
			//     [ "row2cell1", "row2cell2", ... "row2cellN" ],
			//     ...
			//     [ "rowNcell1", "rowNcell2", ... "rowNcellN" ]
			//   ],
			//   [ "header1", "header2", ... "headerN" ] // optional
			// ]
			ajaxProcessing: function(ajax){ return [ 0, [], null ]; },

			// output default: '{page}/{totalPages}'
			// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
			output: '{startRow} to {endRow} of {totalRows} rows', // '{page}/{totalPages}'

			// apply disabled classname to the pager arrows when the rows at either extreme is visible
			updateArrows: true,

			// starting page of the pager (zero based index)
			page: 0,

		// reset pager after filtering; set to desired page #
		// set to false to not change page at filter start
			pageReset: 0,

			// Number of visible rows
			size: 10,

			// Save pager page & size if the storage script is loaded (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
			savePages: true,
			
			// defines custom storage key
			storageKey: 'tablesorter-pager',

			// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
			// table row set to a height to compensate; default is false
			fixedHeight: false,

			// count child rows towards the set page size? (set true if it is a visible table row within the pager)
			// if true, child row(s) may not appear to be attached to its parent row, may be split across pages or
			// may distort the table if rowspan or cellspans are included.
			countChildRows: false,

			// remove rows from the table to speed up the sort of large tables.
			// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
			removeRows: false, // removing rows in larger tables speeds up the sort

			// css class names of pager arrows
			cssFirst: '.first', // go to first page arrow
			cssPrev: '.prev', // previous page arrow
			cssNext: '.next', // next page arrow
			cssLast: '.last', // go to last page arrow
			cssGoto: '.gotoPage', // go to page selector - select dropdown that sets the current page
			cssPageDisplay: '.pagedisplay', // location of where the "output" is displayed
			cssPageSize: '.pagesize', // page size selector - select dropdown that sets the "size" option
			cssErrorRow: 'tablesorter-errorRow', // error information row

			// class added to arrows when at the extremes (i.e. prev/first arrows are "disabled" when on the first page)
			cssDisabled: 'disabled', // Note there is no period "." in front of this class name

			// stuff not set by the user
			totalRows: 0,
			totalPages: 0,
			filteredRows: 0,
			filteredPages: 0,
			ajaxCounter: 0,
			currentFilters: [],
			startRow: 0,
			endRow: 0,
			$size: null,
			last: {}

		};

		var $this = this,

		// hide arrows at extremes
		pagerArrows = function(p, disable) {
			var a = 'addClass',
			r = 'removeClass',
			d = p.cssDisabled,
			dis = !!disable,
			first = ( dis || p.page === 0 ),
			tp = Math.min( p.totalPages, p.filteredPages ),
			last = ( dis || (p.page === tp - 1) || p.totalPages === 0 );
			if ( p.updateArrows ) {
				p.$container.find(p.cssFirst + ',' + p.cssPrev)[ first ? a : r ](d).attr('aria-disabled', first);
				p.$container.find(p.cssNext + ',' + p.cssLast)[ last ? a : r ](d).attr('aria-disabled', last);
			}
		},

		updatePageDisplay = function(table, p, completed) {
			var i, pg, s, out, regex,
				c = table.config,
				f = c.$table.hasClass('hasFilters') && !p.ajaxUrl,
				t = [],
				sz = p.size || 10; // don't allow dividing by zero
			t = [ (c.widgetOptions && c.widgetOptions.filter_filteredRow || 'filtered'), c.selectorRemove ];
			if (p.countChildRows) { t.push(c.cssChildRow); }
			regex = new RegExp( '(' + t.join('|') + ')' );
			p.totalPages = Math.ceil( p.totalRows / sz ); // needed for "pageSize" method
			p.filteredRows = (f) ? 0 : p.totalRows;
			p.filteredPages = p.totalPages;
			if (f) {
				$.each(c.cache[0].normalized, function(i, el) {
					p.filteredRows += p.regexRows.test(el[c.columns].$row[0].className) ? 0 : 1;
				});
				p.filteredPages = Math.ceil( p.filteredRows / sz ) || 0;
			}
			if ( Math.min( p.totalPages, p.filteredPages ) >= 0 ) {
				t = (p.size * p.page > p.filteredRows);
				p.startRow = (t) ? 1 : (p.filteredRows === 0 ? 0 : p.size * p.page + 1);
				p.page = (t) ? 0 : p.page;
				p.endRow = Math.min( p.filteredRows, p.totalRows, p.size * ( p.page + 1 ) );
				out = p.$container.find(p.cssPageDisplay);
				// form the output string (can now get a new output string from the server)
				s = ( p.ajaxData && p.ajaxData.output ? p.ajaxData.output || p.output : p.output )
					// {page} = one-based index; {page+#} = zero based index +/- value
					.replace(/\{page([\-+]\d+)?\}/gi, function(m,n){
						return p.totalPages ? p.page + (n ? parseInt(n, 10) : 1) : 0;
					})
					// {totalPages}, {extra}, {extra:0} (array) or {extra : key} (object)
					.replace(/\{\w+(\s*:\s*\w+)?\}/gi, function(m){
						var str = m.replace(/[{}\s]/g,''),
							extra = str.split(':'),
							data = p.ajaxData,
							// return zero for default page/row numbers
							deflt = /(rows?|pages?)$/i.test(str) ? 0 : '';
						return extra.length > 1 && data && data[extra[0]] ? data[extra[0]][extra[1]] : p[str] || (data ? data[str] : deflt) || deflt;
					});
				if (out.length) {
					out[ (out[0].tagName === 'INPUT') ? 'val' : 'html' ](s);
					if ( p.$goto.length ) {
						t = '';
						pg = Math.min( p.totalPages, p.filteredPages );
						for ( i = 1; i <= pg; i++ ) {
							t += '<option>' + i + '</option>';
						}
						p.$goto.html(t).val( p.page + 1 );
					}
				}
			}
			pagerArrows(p);
			if (p.initialized && completed !== false) {
				c.$table.trigger('pagerComplete', p);
				// save pager info to storage
				if (p.savePages && ts.storage) {
					ts.storage(table, p.storageKey, {
						page : p.page,
						size : p.size
					});
				}
			}
		},

		fixHeight = function(table, p) {
			var d, h,
				c = table.config,
				$b = c.$tbodies.eq(0);
			if (p.fixedHeight) {
				$b.find('tr.pagerSavedHeightSpacer').remove();
				h = $.data(table, 'pagerSavedHeight');
				if (h) {
					d = h - $b.height();
					if ( d > 5 && $.data(table, 'pagerLastSize') === p.size && $b.children('tr:visible').length < p.size ) {
						$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.replace(/(tr)?\./g,'') + '" style="height:' + d + 'px;"></tr>');
					}
				}
			}
		},

		changeHeight = function(table, p) {
			var $b = table.config.$tbodies.eq(0);
			$b.find('tr.pagerSavedHeightSpacer').remove();
			$.data(table, 'pagerSavedHeight', $b.height());
			fixHeight(table, p);
			$.data(table, 'pagerLastSize', p.size);
		},

		hideRows = function(table, p){
			if (!p.ajaxUrl) {
				var i,
				lastIndex = 0,
				c = table.config,
				rows = c.$tbodies.eq(0).children(),
				l = rows.length,
				s = ( p.page * p.size ),
				e =  s + p.size,
				f = c.widgetOptions && c.widgetOptions.filter_filteredRow || 'filtered',
				j = 0; // size counter
				for ( i = 0; i < l; i++ ){
					if ( !rows[i].className.match(f) ) {
						if (j === s && rows[i].className.match(c.cssChildRow)) {
							// hide child rows @ start of pager (if already visible)
							rows[i].style.display = 'none';
						} else {
							rows[i].style.display = ( j >= s && j < e ) ? '' : 'none';
							// don't count child rows
							j += rows[i].className.match(c.cssChildRow + '|' + c.selectorRemove.slice(1)) && !p.countChildRows ? 0 : 1;
							if ( j === e && rows[i].style.display !== 'none' && rows[i].className.match(ts.css.cssHasChild) ) {
								lastIndex = i;
							}
						}
					}
				}
				// add any attached child rows to last row of pager. Fixes part of issue #396
				if ( lastIndex > 0 && rows[lastIndex].className.match(ts.css.cssHasChild) ) {
					while ( ++lastIndex < l && rows[lastIndex].className.match(c.cssChildRow) ) {
						rows[lastIndex].style.display = '';
					}
				}
			}
		},

		hideRowsSetup = function(table, p){
			p.size = parseInt( p.$size.val(), 10 ) || p.size;
			$.data(table, 'pagerLastSize', p.size);
			pagerArrows(p);
			if ( !p.removeRows ) {
				hideRows(table, p);
				$(table).bind('sortEnd.pager filterEnd.pager', function(){
					hideRows(table, p);
				});
			}
		},

		renderAjax = function(data, table, p, xhr, exception){
			// process data
			if ( typeof(p.ajaxProcessing) === "function" ) {
				// ajaxProcessing result: [ total, rows, headers ]
				var i, j, hsh, $f, $sh, t, th, d, l, rr_count,
					c = table.config,
					$t = c.$table,
					tds = '',
					result = p.ajaxProcessing(data, table) || [ 0, [] ],
					hl = $t.find('thead th').length;

				// Clean up any previous error.
				ts.showError(table);

				if ( exception ) {
					if (c.debug) {
						ts.log('Ajax Error', xhr, exception);
					}
					ts.showError(table,
						xhr.status === 0 ? 'Not connected, verify Network' :
						xhr.status === 404 ? 'Requested page not found [404]' :
						xhr.status === 500 ? 'Internal Server Error [500]' :
						exception === 'parsererror' ? 'Requested JSON parse failed' :
						exception === 'timeout' ? 'Time out error' :
						exception === 'abort' ? 'Ajax Request aborted' :
						'Uncaught error: ' + xhr.statusText + ' [' + xhr.status + ']' );
					c.$tbodies.eq(0).empty();
					p.totalRows = 0;
				} else {
					// process ajax object
					if (!$.isArray(result)) {
						p.ajaxData = result;
						p.totalRows = result.total;
						th = result.headers;
						d = result.rows;
					} else {
						// allow [ total, rows, headers ]  or [ rows, total, headers ]
						t = isNaN(result[0]) && !isNaN(result[1]);
						// ensure a zero returned row count doesn't fail the logical ||
						rr_count = result[t ? 1 : 0];
						p.totalRows = isNaN(rr_count) ? p.totalRows || 0 : rr_count;
						d = p.totalRows === 0 ? [""] : result[t ? 0 : 1] || []; // row data
						th = result[2]; // headers
					}
					l = d.length;
					if (d instanceof jQuery) {
						if (p.processAjaxOnInit) {
							// append jQuery object
							c.$tbodies.eq(0).empty().append(d);
						}
					} else if (l) {
						// build table from array
						for ( i = 0; i < l; i++ ) {
							tds += '<tr>';
							for ( j = 0; j < d[i].length; j++ ) {
								// build tbody cells; watch for data containing HTML markup - see #434
								tds += /^\s*<td/.test(d[i][j]) ? $.trim(d[i][j]) : '<td>' + d[i][j] + '</td>';
							}
							tds += '</tr>';
						}
						// add rows to first tbody
						if (p.processAjaxOnInit) {
							c.$tbodies.eq(0).html( tds );
						}
					}
					p.processAjaxOnInit = true;
					// only add new header text if the length matches
					if ( th && th.length === hl ) {
						hsh = $t.hasClass('hasStickyHeaders');
						$sh = hsh ? c.widgetOptions.$sticky.children('thead:first').children().children() : '';
						$f = $t.find('tfoot tr:first').children();
						// don't change td headers (may contain pager)
						c.$headers.filter('th').each(function(j){
							var $t = $(this), icn;
							// add new test within the first span it finds, or just in the header
							if ( $t.find('.' + ts.css.icon).length ) {
								icn = $t.find('.' + ts.css.icon).clone(true);
								$t.find('.tablesorter-header-inner').html( th[j] ).append(icn);
								if ( hsh && $sh.length ) {
									icn = $sh.eq(j).find('.' + ts.css.icon).clone(true);
									$sh.eq(j).find('.tablesorter-header-inner').html( th[j] ).append(icn);
								}
							} else {
								$t.find('.tablesorter-header-inner').html( th[j] );
								if (hsh && $sh.length) {
									$sh.eq(j).find('.tablesorter-header-inner').html( th[j] );
								}
							}
							$f.eq(j).html( th[j] );
						});
					}
				}
				if (c.showProcessing) {
					ts.isProcessing(table); // remove loading icon
				}
				// make sure last pager settings are saved, prevents multiple server side calls with
				// the same parameters
				p.totalPages = Math.ceil( p.totalRows / ( p.size || 10 ) );
				p.last.totalRows = p.totalRows;
				p.last.currentFilters = p.currentFilters;
				p.last.sortList = (c.sortList || []).join(',');
				updatePageDisplay(table, p);
				fixHeight(table, p);
				$t.trigger('updateCache', [function(){
					if (p.initialized) {
						// apply widgets after table has rendered
						$t
							.trigger('applyWidgets')
							.trigger('pagerChange', p);
					}
				}]);

			}
			if (!p.initialized) {
				p.initialized = true;
				$(table)
					.trigger('applyWidgets')
					.trigger('pagerInitialized', p);
			}
		},

		getAjax = function(table, p){
			var url = getAjaxUrl(table, p),
			$doc = $(document),
			counter,
			c = table.config;
			if ( url !== '' ) {
				if (c.showProcessing) {
					ts.isProcessing(table, true); // show loading icon
				}
				$doc.bind('ajaxError.pager', function(e, xhr, settings, exception) {
					renderAjax(null, table, p, xhr, exception);
					$doc.unbind('ajaxError.pager');
				});

				counter = ++p.ajaxCounter;

				p.ajaxObject.url = url; // from the ajaxUrl option and modified by customAjaxUrl
				p.ajaxObject.success = function(data) {
					// Refuse to process old ajax commands that were overwritten by new ones - see #443
					if (counter < p.ajaxCounter){
						return;
					}
					renderAjax(data, table, p);
					$doc.unbind('ajaxError.pager');
					if (typeof p.oldAjaxSuccess === 'function') {
						p.oldAjaxSuccess(data);
					}
				};
				if (c.debug) {
					ts.log('ajax initialized', p.ajaxObject);
				}
				$.ajax(p.ajaxObject);
			}
		},

		getAjaxUrl = function(table, p) {
			var c = table.config,
				url = (p.ajaxUrl) ? p.ajaxUrl
				// allow using "{page+1}" in the url string to switch to a non-zero based index
				.replace(/\{page([\-+]\d+)?\}/, function(s,n){ return p.page + (n ? parseInt(n, 10) : 0); })
				.replace(/\{size\}/g, p.size) : '',
			sl = c.sortList,
			fl = p.currentFilters || $(table).data('lastSearch') || [],
			sortCol = url.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),
			filterCol = url.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),
			arry = [];
			if (sortCol) {
				sortCol = sortCol[1];
				$.each(sl, function(i,v){
					arry.push(sortCol + '[' + v[0] + ']=' + v[1]);
				});
				// if the arry is empty, just add the col parameter... "&{sortList:col}" becomes "&col"
				url = url.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : sortCol );
				arry = [];
			}
			if (filterCol) {
				filterCol = filterCol[1];
				$.each(fl, function(i,v){
					if (v) {
						arry.push(filterCol + '[' + i + ']=' + encodeURIComponent(v));
					}
				});
				// if the arry is empty, just add the fcol parameter... "&{filterList:fcol}" becomes "&fcol"
				url = url.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : filterCol );
				p.currentFilters = fl;
			}
			if ( typeof(p.customAjaxUrl) === "function" ) {
				url = p.customAjaxUrl(table, url);
			}
			if (c.debug) {
				ts.log('Pager ajax url: ' + url);
			}
			return url;
		},

		renderTable = function(table, rows, p) {
			var $tb, index, count, added,
				$t = $(table),
				c = table.config,
				f = c.$table.hasClass('hasFilters'),
				l = rows && rows.length || 0, // rows may be undefined
				s = ( p.page * p.size ),
				e = p.size;
			if ( l < 1 ) { return; } // empty table, abort!
			if ( p.page >= p.totalPages ) {
				// lets not render the table more than once
				moveToLastPage(table, p);
			}
			p.isDisabled = false; // needed because sorting will change the page and re-enable the pager
			if (p.initialized) { $t.trigger('pagerChange', p); }

			if ( !p.removeRows ) {
				hideRows(table, p);
			} else {
				ts.clearTableBody(table);
				$tb = ts.processTbody(table, c.$tbodies.eq(0), true);
				// not filtered, start from the calculated starting point (s)
				// if filtered, start from zero
				index = f ? 0 : s;
				count = f ? 0 : s;
				added = 0; 
				while (added < e && index < rows.length) {
					if (!f || !/filtered/.test(rows[index][0].className)){
						count++;
						if (count > s && added <= e) {
							added++;
							$tb.append(rows[index]);
						}
					}
					index++;
				}
				ts.processTbody(table, $tb, false);
			}
			updatePageDisplay(table, p);
			if ( !p.isDisabled ) { fixHeight(table, p); }
			$t.trigger('applyWidgets');
			if (table.isUpdating) {
				$t.trigger("updateComplete", table);
			}
		},

		showAllRows = function(table, p){
			if ( p.ajax ) {
				pagerArrows(p, true);
			} else {
				p.isDisabled = true;
				$.data(table, 'pagerLastPage', p.page);
				$.data(table, 'pagerLastSize', p.size);
				p.page = 0;
				p.size = p.totalRows;
				p.totalPages = 1;
				$(table)
					.addClass('pagerDisabled')
					.removeAttr('aria-describedby')
					.find('tr.pagerSavedHeightSpacer').remove();
				renderTable(table, table.config.rowsCopy, p);
				if (table.config.debug) {
					ts.log('pager disabled');
				}
			}
			// disable size selector
			p.$size.add(p.$goto).each(function(){
				$(this).attr('aria-disabled', 'true').addClass(p.cssDisabled)[0].disabled = true;
			});
		},

		moveToPage = function(table, p, pageMoved) {
			if ( p.isDisabled ) { return; }
			var c = table.config,
				$t = $(table),
				l = p.last,
				pg = Math.min( p.totalPages, p.filteredPages );
			if ( p.page < 0 ) { p.page = 0; }
			if ( p.page > ( pg - 1 ) && pg !== 0 ) { p.page = pg - 1; }
			// fixes issue where one currentFilter is [] and the other is ['','',''],
			// making the next if comparison think the filters are different (joined by commas). Fixes #202.
			l.currentFilters = (l.currentFilters || []).join('') === '' ? [] : l.currentFilters;
			p.currentFilters = (p.currentFilters || []).join('') === '' ? [] : p.currentFilters;
			// don't allow rendering multiple times on the same page/size/totalRows/filters/sorts
			if ( l.page === p.page && l.size === p.size && l.totalRows === p.totalRows &&
				(l.currentFilters || []).join(',') === (p.currentFilters || []).join(',') &&
				l.sortList === (c.sortList || []).join(',') ) { return; }
			if (c.debug) {
				ts.log('Pager changing to page ' + p.page);
			}
			p.last = {
				page : p.page,
				size : p.size,
				// fixes #408; modify sortList otherwise it auto-updates
				sortList : (c.sortList || []).join(','),
				totalRows : p.totalRows,
				currentFilters : p.currentFilters || []
			};
			if (p.ajax) {
				getAjax(table, p);
			} else if (!p.ajax) {
				renderTable(table, c.rowsCopy, p);
			}
			$.data(table, 'pagerLastPage', p.page);
			if (p.initialized && pageMoved !== false) {
				$t
					.trigger('pageMoved', p)
					.trigger('applyWidgets');
				if (table.isUpdating) {
					$t.trigger('updateComplete');
				}
			}
		},

		setPageSize = function(table, size, p) {
			p.size = size || p.size || 10;
			p.$size.val(p.size);
			$.data(table, 'pagerLastPage', p.page);
			$.data(table, 'pagerLastSize', p.size);
			p.totalPages = Math.ceil( p.totalRows / p.size );
			p.filteredPages = Math.ceil( p.filteredRows / p.size );
			moveToPage(table, p);
		},

		moveToFirstPage = function(table, p) {
			p.page = 0;
			moveToPage(table, p);
		},

		moveToLastPage = function(table, p) {
			p.page = ( Math.min( p.totalPages, p.filteredPages ) - 1 );
			moveToPage(table, p);
		},

		moveToNextPage = function(table, p) {
			p.page++;
			if ( p.page >= ( Math.min( p.totalPages, p.filteredPages ) - 1 ) ) {
				p.page = ( Math.min( p.totalPages, p.filteredPages ) - 1 );
			}
			moveToPage(table, p);
		},

		moveToPrevPage = function(table, p) {
			p.page--;
			if ( p.page <= 0 ) {
				p.page = 0;
			}
			moveToPage(table, p);
		},

		destroyPager = function(table, p){
			showAllRows(table, p);
			p.$container.hide(); // hide pager
			table.config.appender = null; // remove pager appender function
			p.initialized = false;
			delete table.config.rowsCopy;
			$(table).unbind('destroy.pager sortEnd.pager filterEnd.pager enable.pager disable.pager');
			if (ts.storage) {
				ts.storage(table, p.storageKey, '');
			}
		},

		enablePager = function(table, p, triggered){
			var info,
				c = table.config;
			p.$size.add(p.$goto).removeClass(p.cssDisabled).removeAttr('disabled').attr('aria-disabled', 'false');
			p.isDisabled = false;
			p.page = $.data(table, 'pagerLastPage') || p.page || 0;
			p.size = $.data(table, 'pagerLastSize') || parseInt(p.$size.find('option[selected]').val(), 10) || p.size || 10;
			p.$size.val(p.size); // set page size
			p.totalPages = Math.ceil( Math.min( p.totalRows, p.filteredRows ) / p.size );
			// if table id exists, include page display with aria info
			if ( table.id ) {
				info = table.id + '_pager_info';
				p.$container.find(p.cssPageDisplay).attr('id', info);
				c.$table.attr('aria-describedby', info);
			}
			if ( triggered ) {
				c.$table.trigger('updateRows');
				setPageSize(table, p.size, p);
				hideRowsSetup(table, p);
				fixHeight(table, p);
				if (c.debug) {
					ts.log('pager enabled');
				}
			}
		};

		$this.appender = function(table, rows) {
			var c = table.config,
				p = c.pager;
			if ( !p.ajax ) {
				c.rowsCopy = rows;
				p.totalRows = p.countChildRows ? c.$tbodies.eq(0).children().length : rows.length;
				p.size = $.data(table, 'pagerLastSize') || p.size || 10;
				p.totalPages = Math.ceil( p.totalRows / p.size );
				renderTable(table, rows, p);
				// update display here in case all rows are removed
				updatePageDisplay(table, p, false);
			}
		};

		$this.construct = function(settings) {
			return this.each(function() {
				// check if tablesorter has initialized
				if (!(this.config && this.hasInitialized)) { return; }
				var t, ctrls, fxn,
					table = this,
					c = table.config,
					wo = c.widgetOptions,
					p = c.pager = $.extend( true, {}, $.tablesorterPager.defaults, settings ),
					$t = c.$table,
					// added in case the pager is reinitialized after being destroyed.
					pager = p.$container = $(p.container).addClass('tablesorter-pager').show();
				if (c.debug) {
					ts.log('Pager initializing');
				}
				p.oldAjaxSuccess = p.oldAjaxSuccess || p.ajaxObject.success;
				c.appender = $this.appender;
				if (ts.filter && $.inArray('filter', c.widgets) >= 0) {
					// get any default filter settings (data-value attribute) fixes #388
					p.currentFilters = c.$table.data('lastSearch') || ts.filter.setDefaults(table, c, c.widgetOptions) || [];
					// set, but don't apply current filters
					ts.setFilters(table, p.currentFilters, false);
				}
				if (p.savePages && ts.storage) {
					t = ts.storage(table, p.storageKey) || {}; // fixes #387
					p.page = isNaN(t.page) ? p.page : t.page;
					p.size = ( isNaN(t.size) ? p.size : t.size ) || 10;
					$.data(table, 'pagerLastSize', p.size);
				}

				// skipped rows
				p.regexRows = new RegExp('(' + (wo.filter_filteredRow || 'filtered') + '|' + c.selectorRemove.substring(1) + '|' + c.cssChildRow + ')');

				$t
					.unbind('filterStart filterEnd sortEnd disable enable destroy update updateRows updateAll addRows pageSize '.split(' ').join('.pager '))
					.bind('filterStart.pager', function(e, filters) {
						p.currentFilters = filters;
						// don't change page is filters are the same (pager updating, etc)
						if (p.pageReset !== false && (c.lastCombinedFilter || '') !== (filters || []).join('')) {
							p.page = p.pageReset; // fixes #456 & #565
						}
					})
					// update pager after filter widget completes
					.bind('filterEnd.pager sortEnd.pager', function() {
						if (p.initialized) {
							// update page display first, so we update p.filteredPages
							updatePageDisplay(table, p, false);
							moveToPage(table, p, false);
							fixHeight(table, p);
						}
					})
					.bind('disable.pager', function(e){
						e.stopPropagation();
						showAllRows(table, p);
					})
					.bind('enable.pager', function(e){
						e.stopPropagation();
						enablePager(table, p, true);
					})
					.bind('destroy.pager', function(e){
						e.stopPropagation();
						destroyPager(table, p);
					})
					.bind('update updateRows updateAll addRows '.split(' ').join('.pager '), function(e){
						e.stopPropagation();
						hideRows(table, p);
					})
					.bind('pageSize.pager', function(e,v){
						e.stopPropagation();
						setPageSize(table, parseInt(v, 10) || 10, p);
						hideRows(table, p);
						updatePageDisplay(table, p, false);
						if (p.$size.length) { p.$size.val(p.size); } // twice?
					})
					.bind('pageSet.pager', function(e,v){
						e.stopPropagation();
						p.page = (parseInt(v, 10) || 1) - 1;
						if (p.$goto.length) { p.$goto.val(p.size); } // twice?
						moveToPage(table, p);
						updatePageDisplay(table, p, false);
					});

				// clicked controls
				ctrls = [ p.cssFirst, p.cssPrev, p.cssNext, p.cssLast ];
				fxn = [ moveToFirstPage, moveToPrevPage, moveToNextPage, moveToLastPage ];
				pager.find(ctrls.join(','))
					.attr("tabindex", 0)
					.unbind('click.pager')
					.bind('click.pager', function(e){
						e.stopPropagation();
						var i, $t = $(this), l = ctrls.length;
						if ( !$t.hasClass(p.cssDisabled) ) {
							for (i = 0; i < l; i++) {
								if ($t.is(ctrls[i])) {
									fxn[i](table, p);
									break;
								}
							}
						}
					});

				// goto selector
				p.$goto = pager.find(p.cssGoto);
				if ( p.$goto.length ) {
					p.$goto
						.unbind('change')
						.bind('change', function(){
							p.page = $(this).val() - 1;
							moveToPage(table, p);
							updatePageDisplay(table, p, false);
						});
				}

				// page size selector
				p.$size = pager.find(p.cssPageSize);
				if ( p.$size.length ) {
					p.$size.unbind('change.pager').bind('change.pager', function() {
						p.$size.val( $(this).val() ); // in case there are more than one pagers
						if ( !$(this).hasClass(p.cssDisabled) ) {
							setPageSize(table, parseInt( $(this).val(), 10 ), p);
							changeHeight(table, p);
						}
						return false;
					});
				}

				// clear initialized flag
				p.initialized = false;
				// before initialization event
				$t.trigger('pagerBeforeInitialized', p);

				enablePager(table, p, false);

				if ( typeof(p.ajaxUrl) === 'string' ) {
					// ajax pager; interact with database
					p.ajax = true;
					//When filtering with ajax, allow only custom filtering function, disable default filtering since it will be done server side.
					c.widgetOptions.filter_serversideFiltering = true;
					c.serverSideSorting = true;
					moveToPage(table, p);
				} else {
					p.ajax = false;
					// Regular pager; all rows stored in memory
					$(this).trigger("appendCache", true);
					hideRowsSetup(table, p);
				}

				changeHeight(table, p);

				// pager initialized
				if (!p.ajax) {
					p.initialized = true;
					$(table).trigger('pagerInitialized', p);
				}
			});
		};

	}() });

	// see #486
	ts.showError = function(table, message){
		$(table).each(function(){
			var $row,
				c = this.config,
				errorRow = c.pager && c.pager.cssErrorRow || c.widgetOptions.pager_css && c.widgetOptions.pager_css.errorRow || 'tablesorter-errorRow';
			if (c) {
				if (typeof message === 'undefined') {
					c.$table.find('thead').find(c.selectorRemove).remove();
				} else {
					$row = ( /tr\>/.test(message) ? $(message) : $('<tr><td colspan="' + c.columns + '">' + message + '</td></tr>') )
						.click(function(){
							$(this).remove();
						})
						// add error row to thead instead of tbody, or clicking on the header will result in a parser error
						.appendTo( c.$table.find('thead:first') )
						.addClass( errorRow + ' ' + c.selectorRemove.replace(/^[.#]/, '') )
						.attr({
							role : 'alert',
							'aria-live' : 'assertive'
						});
				}
			}
		});
	};

// extend plugin scope
$.fn.extend({
	tablesorterPager: $.tablesorterPager.construct
});

})(jQuery);
