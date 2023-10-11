var diffDOM=function(e){"use strict";function t(e,n,o){var s;return"#text"===e.nodeName?s=o.document.createTextNode(e.data):"#comment"===e.nodeName?s=o.document.createComment(e.data):(n?s=o.document.createElementNS("http://www.w3.org/2000/svg",e.nodeName):"svg"===e.nodeName.toLowerCase()?(s=o.document.createElementNS("http://www.w3.org/2000/svg","svg"),n=!0):s=o.document.createElement(e.nodeName),e.attributes&&Object.entries(e.attributes).forEach((function(e){var t=e[0],n=e[1];return s.setAttribute(t,n)})),e.childNodes&&e.childNodes.forEach((function(e){return s.appendChild(t(e,n,o))})),o.valueDiffing&&(e.value&&(s instanceof HTMLButtonElement||s instanceof HTMLDataElement||s instanceof HTMLInputElement||s instanceof HTMLLIElement||s instanceof HTMLMeterElement||s instanceof HTMLOptionElement||s instanceof HTMLProgressElement||s instanceof HTMLParamElement)&&(s.value=e.value),e.checked&&s instanceof HTMLInputElement&&(s.checked=e.checked),e.selected&&s instanceof HTMLOptionElement&&(s.selected=e.selected))),s}var n=function(e,t){for(t=t.slice();t.length>0;){var n=t.splice(0,1)[0];e=e.childNodes[n]}return e};function o(e,o,s){var i,a,c,l=o[s._const.action],r=o[s._const.route];[s._const.addElement,s._const.addTextElement].includes(l)||(i=n(e,r));var u={diff:o,node:i};if(s.preDiffApply(u))return!0;switch(l){case s._const.addAttribute:if(!(i&&i instanceof Element))return!1;i.setAttribute(o[s._const.name],o[s._const.value]);break;case s._const.modifyAttribute:if(!(i&&i instanceof Element))return!1;i.setAttribute(o[s._const.name],o[s._const.newValue]),i instanceof HTMLInputElement&&"value"===o[s._const.name]&&(i.value=o[s._const.newValue]);break;case s._const.removeAttribute:if(!(i&&i instanceof Element))return!1;i.removeAttribute(o[s._const.name]);break;case s._const.modifyTextElement:if(!(i&&i instanceof Text))return!1;s.textDiff(i,i.data,o[s._const.oldValue],o[s._const.newValue]),i.parentNode instanceof HTMLTextAreaElement&&(i.parentNode.value=o[s._const.newValue]);break;case s._const.modifyValue:if(!i||void 0===i.value)return!1;i.value=o[s._const.newValue];break;case s._const.modifyComment:if(!(i&&i instanceof Comment))return!1;s.textDiff(i,i.data,o[s._const.oldValue],o[s._const.newValue]);break;case s._const.modifyChecked:if(!i||void 0===i.checked)return!1;i.checked=o[s._const.newValue];break;case s._const.modifySelected:if(!i||void 0===i.selected)return!1;i.selected=o[s._const.newValue];break;case s._const.replaceElement:var d="svg"===o[s._const.newValue].nodeName.toLowerCase()||"http://www.w3.org/2000/svg"===i.parentNode.namespaceURI;i.parentNode.replaceChild(t(o[s._const.newValue],d,s),i);break;case s._const.relocateGroup:Array.apply(void 0,new Array(o[s._const.groupLength])).map((function(){return i.removeChild(i.childNodes[o[s._const.from]])})).forEach((function(e,t){0===t&&(c=i.childNodes[o[s._const.to]]),i.insertBefore(e,c||null)}));break;case s._const.removeElement:i.parentNode.removeChild(i);break;case s._const.addElement:var h=(p=r.slice()).splice(p.length-1,1)[0];if(!((i=n(e,p))instanceof Element))return!1;i.insertBefore(t(o[s._const.element],"http://www.w3.org/2000/svg"===i.namespaceURI,s),i.childNodes[h]||null);break;case s._const.removeTextElement:if(!i||3!==i.nodeType)return!1;var f=i.parentNode;f.removeChild(i),f instanceof HTMLTextAreaElement&&(f.value="");break;case s._const.addTextElement:var p;h=(p=r.slice()).splice(p.length-1,1)[0];if(a=s.document.createTextNode(o[s._const.value]),!(i=n(e,p)).childNodes)return!1;i.insertBefore(a,i.childNodes[h]||null),i.parentNode instanceof HTMLTextAreaElement&&(i.parentNode.value=o[s._const.value]);break;default:console.log("unknown action")}return s.postDiffApply({diff:u.diff,node:u.node,newNode:a}),!0}function s(e,t,n){var o=e[t];e[t]=e[n],e[n]=o}function i(e,t,n){(t=t.slice()).reverse(),t.forEach((function(t){!function(e,t,n){switch(t[n._const.action]){case n._const.addAttribute:t[n._const.action]=n._const.removeAttribute,o(e,t,n);break;case n._const.modifyAttribute:s(t,n._const.oldValue,n._const.newValue),o(e,t,n);break;case n._const.removeAttribute:t[n._const.action]=n._const.addAttribute,o(e,t,n);break;case n._const.modifyTextElement:case n._const.modifyValue:case n._const.modifyComment:case n._const.modifyChecked:case n._const.modifySelected:case n._const.replaceElement:s(t,n._const.oldValue,n._const.newValue),o(e,t,n);break;case n._const.relocateGroup:s(t,n._const.from,n._const.to),o(e,t,n);break;case n._const.removeElement:t[n._const.action]=n._const.addElement,o(e,t,n);break;case n._const.addElement:t[n._const.action]=n._const.removeElement,o(e,t,n);break;case n._const.removeTextElement:t[n._const.action]=n._const.addTextElement,o(e,t,n);break;case n._const.addTextElement:t[n._const.action]=n._const.removeTextElement,o(e,t,n);break;default:console.log("unknown action")}}(e,t,n)}))}var a=function(){return a=Object.assign||function(e){for(var t,n=arguments,o=1,s=arguments.length;o<s;o++)for(var i in t=n[o])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},a.apply(this,arguments)},c=function(e){var t=[];return t.push(e.nodeName),"#text"!==e.nodeName&&"#comment"!==e.nodeName&&e.attributes&&(e.attributes.class&&t.push("".concat(e.nodeName,".").concat(e.attributes.class.replace(/ /g,"."))),e.attributes.id&&t.push("".concat(e.nodeName,"#").concat(e.attributes.id))),t},l=function(e){var t={},n={};return e.forEach((function(e){c(e).forEach((function(e){var o=e in t;o||e in n?o&&(delete t[e],n[e]=!0):t[e]=!0}))})),t},r=function(e,t){var n=l(e),o=l(t),s={};return Object.keys(n).forEach((function(e){o[e]&&(s[e]=!0)})),s},u=function(e){return delete e.outerDone,delete e.innerDone,delete e.valueDone,!e.childNodes||e.childNodes.every(u)},d=function(e){if(Object.prototype.hasOwnProperty.call(e,"data"))return{nodeName:"#text"===e.nodeName?"#text":"#comment",data:e.data};var t={nodeName:e.nodeName};return Object.prototype.hasOwnProperty.call(e,"attributes")&&(t.attributes=a({},e.attributes)),Object.prototype.hasOwnProperty.call(e,"checked")&&(t.checked=e.checked),Object.prototype.hasOwnProperty.call(e,"value")&&(t.value=e.value),Object.prototype.hasOwnProperty.call(e,"selected")&&(t.selected=e.selected),Object.prototype.hasOwnProperty.call(e,"childNodes")&&(t.childNodes=e.childNodes.map((function(e){return d(e)}))),t},h=function(e,t){if(!["nodeName","value","checked","selected","data"].every((function(n){return e[n]===t[n]})))return!1;if(Object.prototype.hasOwnProperty.call(e,"data"))return!0;if(Boolean(e.attributes)!==Boolean(t.attributes))return!1;if(Boolean(e.childNodes)!==Boolean(t.childNodes))return!1;if(e.attributes){var n=Object.keys(e.attributes),o=Object.keys(t.attributes);if(n.length!==o.length)return!1;if(!n.every((function(n){return e.attributes[n]===t.attributes[n]})))return!1}if(e.childNodes){if(e.childNodes.length!==t.childNodes.length)return!1;if(!e.childNodes.every((function(e,n){return h(e,t.childNodes[n])})))return!1}return!0},f=function(e,t,n,o,s){if(void 0===s&&(s=!1),!e||!t)return!1;if(e.nodeName!==t.nodeName)return!1;if(["#text","#comment"].includes(e.nodeName))return!!s||e.data===t.data;if(e.nodeName in n)return!0;if(e.attributes&&t.attributes){if(e.attributes.id){if(e.attributes.id!==t.attributes.id)return!1;if("".concat(e.nodeName,"#").concat(e.attributes.id)in n)return!0}if(e.attributes.class&&e.attributes.class===t.attributes.class)if("".concat(e.nodeName,".").concat(e.attributes.class.replace(/ /g,"."))in n)return!0}if(o)return!0;var i=e.childNodes?e.childNodes.slice().reverse():[],a=t.childNodes?t.childNodes.slice().reverse():[];if(i.length!==a.length)return!1;if(s)return i.every((function(e,t){return e.nodeName===a[t].nodeName}));var c=r(i,a);return i.every((function(e,t){return f(e,a[t],c,!0,!0)}))},p=function(e,t){return Array.apply(void 0,new Array(e)).map((function(){return t}))},m=function(e,t){for(var n=e.childNodes?e.childNodes:[],o=t.childNodes?t.childNodes:[],s=p(n.length,!1),i=p(o.length,!1),a=[],l=function(){return arguments[1]},u=!1,d=function(){var e=function(e,t,n,o){var s=0,i=[],a=e.length,l=t.length,u=Array.apply(void 0,new Array(a+1)).map((function(){return[]})),d=r(e,t),h=a===l;h&&e.some((function(e,n){var o=c(e),s=c(t[n]);return o.length!==s.length?(h=!1,!0):(o.some((function(e,t){if(e!==s[t])return h=!1,!0})),!h||void 0)}));for(var p=0;p<a;p++)for(var m=e[p],_=0;_<l;_++){var V=t[_];n[p]||o[_]||!f(m,V,d,h)?u[p+1][_+1]=0:(u[p+1][_+1]=u[p][_]?u[p][_]+1:1,u[p+1][_+1]>=s&&(s=u[p+1][_+1],i=[p+1,_+1]))}return 0!==s&&{oldValue:i[0]-s,newValue:i[1]-s,length:s}}(n,o,s,i);e?(a.push(e),Array.apply(void 0,new Array(e.length)).map(l).forEach((function(t){return function(e,t,n,o){e[n.oldValue+o]=!0,t[n.newValue+o]=!0}(s,i,e,t)}))):u=!0};!u;)d();return e.subsets=a,e.subsetsAge=100,a},_=function(){function e(){this.list=[]}return e.prototype.add=function(e){var t;(t=this.list).push.apply(t,e)},e.prototype.forEach=function(e){this.list.forEach((function(t){return e(t)}))},e}(),V=function(){function e(e){void 0===e&&(e={});var t=this;Object.entries(e).forEach((function(e){var n=e[0],o=e[1];return t[n]=o}))}return e.prototype.toString=function(){return JSON.stringify(this)},e.prototype.setValue=function(e,t){return this[e]=t,this},e}();function g(e,t){var n,o,s=e;for(t=t.slice();t.length>0;)o=t.splice(0,1)[0],n=s,s=s.childNodes?s.childNodes[o]:void 0;return{node:s,parentNode:n,nodeIndex:o}}function v(e,t,n){return t.forEach((function(t){!function(e,t,n){var o,s,i,a;if(![n._const.addElement,n._const.addTextElement].includes(t[n._const.action])){var c=g(e,t[n._const.route]);s=c.node,i=c.parentNode,a=c.nodeIndex}var l,r,u=[],h={diff:t,node:s};if(n.preVirtualDiffApply(h))return!0;switch(t[n._const.action]){case n._const.addAttribute:s.attributes||(s.attributes={}),s.attributes[t[n._const.name]]=t[n._const.value],"checked"===t[n._const.name]?s.checked=!0:"selected"===t[n._const.name]?s.selected=!0:"INPUT"===s.nodeName&&"value"===t[n._const.name]&&(s.value=t[n._const.value]);break;case n._const.modifyAttribute:s.attributes[t[n._const.name]]=t[n._const.newValue];break;case n._const.removeAttribute:delete s.attributes[t[n._const.name]],0===Object.keys(s.attributes).length&&delete s.attributes,"checked"===t[n._const.name]?s.checked=!1:"selected"===t[n._const.name]?delete s.selected:"INPUT"===s.nodeName&&"value"===t[n._const.name]&&delete s.value;break;case n._const.modifyTextElement:s.data=t[n._const.newValue],"TEXTAREA"===i.nodeName&&(i.value=t[n._const.newValue]);break;case n._const.modifyValue:s.value=t[n._const.newValue];break;case n._const.modifyComment:s.data=t[n._const.newValue];break;case n._const.modifyChecked:s.checked=t[n._const.newValue];break;case n._const.modifySelected:s.selected=t[n._const.newValue];break;case n._const.replaceElement:l=d(t[n._const.newValue]),i.childNodes[a]=l;break;case n._const.relocateGroup:s.childNodes.splice(t[n._const.from],t[n._const.groupLength]).reverse().forEach((function(e){return s.childNodes.splice(t[n._const.to],0,e)})),s.subsets&&s.subsets.forEach((function(e){if(t[n._const.from]<t[n._const.to]&&e.oldValue<=t[n._const.to]&&e.oldValue>t[n._const.from])e.oldValue-=t[n._const.groupLength],(o=e.oldValue+e.length-t[n._const.to])>0&&(u.push({oldValue:t[n._const.to]+t[n._const.groupLength],newValue:e.newValue+e.length-o,length:o}),e.length-=o);else if(t[n._const.from]>t[n._const.to]&&e.oldValue>t[n._const.to]&&e.oldValue<t[n._const.from]){var o;e.oldValue+=t[n._const.groupLength],(o=e.oldValue+e.length-t[n._const.to])>0&&(u.push({oldValue:t[n._const.to]+t[n._const.groupLength],newValue:e.newValue+e.length-o,length:o}),e.length-=o)}else e.oldValue===t[n._const.from]&&(e.oldValue=t[n._const.to])}));break;case n._const.removeElement:i.childNodes.splice(a,1),i.subsets&&i.subsets.forEach((function(e){e.oldValue>a?e.oldValue-=1:e.oldValue===a?e.delete=!0:e.oldValue<a&&e.oldValue+e.length>a&&(e.oldValue+e.length-1===a?e.length--:(u.push({newValue:e.newValue+a-e.oldValue,oldValue:a,length:e.length-a+e.oldValue-1}),e.length=a-e.oldValue))})),s=i;break;case n._const.addElement:var f=(r=t[n._const.route].slice()).splice(r.length-1,1)[0];s=null===(o=g(e,r))||void 0===o?void 0:o.node,l=d(t[n._const.element]),s.childNodes||(s.childNodes=[]),f>=s.childNodes.length?s.childNodes.push(l):s.childNodes.splice(f,0,l),s.subsets&&s.subsets.forEach((function(e){if(e.oldValue>=f)e.oldValue+=1;else if(e.oldValue<f&&e.oldValue+e.length>f){var t=e.oldValue+e.length-f;u.push({newValue:e.newValue+e.length-t,oldValue:f+1,length:t}),e.length-=t}}));break;case n._const.removeTextElement:i.childNodes.splice(a,1),"TEXTAREA"===i.nodeName&&delete i.value,i.subsets&&i.subsets.forEach((function(e){e.oldValue>a?e.oldValue-=1:e.oldValue===a?e.delete=!0:e.oldValue<a&&e.oldValue+e.length>a&&(e.oldValue+e.length-1===a?e.length--:(u.push({newValue:e.newValue+a-e.oldValue,oldValue:a,length:e.length-a+e.oldValue-1}),e.length=a-e.oldValue))})),s=i;break;case n._const.addTextElement:var p=(r=t[n._const.route].slice()).splice(r.length-1,1)[0];l={nodeName:"#text",data:t[n._const.value]},(s=g(e,r).node).childNodes||(s.childNodes=[]),p>=s.childNodes.length?s.childNodes.push(l):s.childNodes.splice(p,0,l),"TEXTAREA"===s.nodeName&&(s.value=t[n._const.newValue]),s.subsets&&s.subsets.forEach((function(e){if(e.oldValue>=p&&(e.oldValue+=1),e.oldValue<p&&e.oldValue+e.length>p){var t=e.oldValue+e.length-p;u.push({newValue:e.newValue+e.length-t,oldValue:p+1,length:t}),e.length-=t}}));break;default:console.log("unknown action")}s.subsets&&(s.subsets=s.subsets.filter((function(e){return!e.delete&&e.oldValue!==e.newValue})),u.length&&(s.subsets=s.subsets.concat(u))),n.postVirtualDiffApply({node:h.node,diff:h.diff,newNode:l})}(e,t,n)})),!0}function b(e,t){void 0===t&&(t={valueDiffing:!0});var n={nodeName:e.nodeName};if(e instanceof Text||e instanceof Comment)n.data=e.data;else{if(e.attributes&&e.attributes.length>0)n.attributes={},Array.prototype.slice.call(e.attributes).forEach((function(e){return n.attributes[e.name]=e.value}));if(e.childNodes&&e.childNodes.length>0)n.childNodes=[],Array.prototype.slice.call(e.childNodes).forEach((function(e){return n.childNodes.push(b(e,t))}));t.valueDiffing&&(e instanceof HTMLTextAreaElement&&(n.value=e.value),e instanceof HTMLInputElement&&["radio","checkbox"].includes(e.type.toLowerCase())&&void 0!==e.checked?n.checked=e.checked:(e instanceof HTMLButtonElement||e instanceof HTMLDataElement||e instanceof HTMLInputElement||e instanceof HTMLLIElement||e instanceof HTMLMeterElement||e instanceof HTMLOptionElement||e instanceof HTMLProgressElement||e instanceof HTMLParamElement)&&(n.value=e.value),e instanceof HTMLOptionElement&&(n.selected=e.selected))}return n}var N=/<\s*\/*[a-zA-Z:_][a-zA-Z0-9:_\-.]*\s*(?:"[^"]*"['"]*|'[^']*'['"]*|[^'"/>])*\/*\s*>|<!--(?:.|\n|\r)*?-->/g,y=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function w(e){return e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&")}var E={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,menuItem:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},k=function(e){var t={nodeName:"",attributes:{}},n=!1,o=e.match(/<\/?([^\s]+?)[/\s>]/);if(o&&(t.nodeName=o[1],(E[o[1]]||"/"===e.charAt(e.length-2))&&(n=!0),t.nodeName.startsWith("!--"))){var s=e.indexOf("--\x3e");return{type:"comment",node:{nodeName:"#comment",data:-1!==s?e.slice(4,s):""},voidElement:n}}for(var i=new RegExp(y),a=null,c=!1;!c;)if(null===(a=i.exec(e)))c=!0;else if(a[0].trim())if(a[1]){var l=a[1].trim(),r=[l,""];l.indexOf("=")>-1&&(r=l.split("=")),t.attributes[r[0]]=r[1],i.lastIndex--}else a[2]&&(t.attributes[a[2]]=a[3].trim().substring(1,a[3].length-1));return{type:"tag",node:t,voidElement:n}},x=function(e,t){void 0===t&&(t={valueDiffing:!0});var n,o=[],s=-1,i=[];if(0!==e.indexOf("<")){var a=e.indexOf("<");o.push({nodeName:"#text",data:-1===a?e:e.substring(0,a)})}return e.replace(N,(function(a,c){var l="/"!==a.charAt(1),r=a.startsWith("\x3c!--"),u=c+a.length,d=e.charAt(u);if(r){var h=k(a).node;if(s<0)return o.push(h),"";var f=i[s];return f&&h.nodeName&&(f.node.childNodes||(f.node.childNodes=[]),f.node.childNodes.push(h)),""}if(l){if(n=k(a),s++,!n.voidElement&&d&&"<"!==d){n.node.childNodes||(n.node.childNodes=[]);var p=w(e.slice(u,e.indexOf("<",u)));n.node.childNodes.push({nodeName:"#text",data:p}),t.valueDiffing&&"TEXTAREA"===n.node.nodeName&&(n.node.value=p)}0===s&&n.node.nodeName&&o.push(n.node);var m=i[s-1];m&&n.node.nodeName&&(m.node.childNodes||(m.node.childNodes=[]),m.node.childNodes.push(n.node)),i[s]=n}if((!l||n.voidElement)&&(s>-1&&(n.voidElement||n.node.nodeName.toUpperCase()===a.slice(2,-1).toUpperCase())&&--s>-1&&(n=i[s]),"<"!==d&&d)){var _=-1===s?o:i[s].node.childNodes||[],V=e.indexOf("<",u);p=w(e.slice(u,-1===V?void 0:V));_.push({nodeName:"#text",data:p})}return""})),o[0]},T=function(){function e(e,t,n){this.options=n,this.t1="undefined"!=typeof Element&&e instanceof Element?b(e,this.options):"string"==typeof e?x(e,this.options):JSON.parse(JSON.stringify(e)),this.t2="undefined"!=typeof Element&&t instanceof Element?b(t,this.options):"string"==typeof t?x(t,this.options):JSON.parse(JSON.stringify(t)),this.diffcount=0,this.foundAll=!1,this.debug&&(this.t1Orig="undefined"!=typeof Element&&e instanceof Element?b(e,this.options):"string"==typeof e?x(e,this.options):JSON.parse(JSON.stringify(e)),this.t2Orig="undefined"!=typeof Element&&t instanceof Element?b(t,this.options):"string"==typeof t?x(t,this.options):JSON.parse(JSON.stringify(t))),this.tracker=new _}return e.prototype.init=function(){return this.findDiffs(this.t1,this.t2)},e.prototype.findDiffs=function(e,t){var n;do{if(this.options.debug&&(this.diffcount+=1,this.diffcount>this.options.diffcap))throw new Error("surpassed diffcap:".concat(JSON.stringify(this.t1Orig)," -> ").concat(JSON.stringify(this.t2Orig)));0===(n=this.findNextDiff(e,t,[])).length&&(h(e,t)||(this.foundAll?console.error("Could not find remaining diffs!"):(this.foundAll=!0,u(e),n=this.findNextDiff(e,t,[])))),n.length>0&&(this.foundAll=!1,this.tracker.add(n),v(e,n,this.options))}while(n.length>0);return this.tracker.list},e.prototype.findNextDiff=function(e,t,n){var o,s;if(this.options.maxDepth&&n.length>this.options.maxDepth)return[];if(!e.outerDone){if(o=this.findOuterDiff(e,t,n),this.options.filterOuterDiff&&(s=this.options.filterOuterDiff(e,t,o))&&(o=s),o.length>0)return e.outerDone=!0,o;e.outerDone=!0}if(Object.prototype.hasOwnProperty.call(e,"data"))return[];if(!e.innerDone){if((o=this.findInnerDiff(e,t,n)).length>0)return o;e.innerDone=!0}if(this.options.valueDiffing&&!e.valueDone){if((o=this.findValueDiff(e,t,n)).length>0)return e.valueDone=!0,o;e.valueDone=!0}return[]},e.prototype.findOuterDiff=function(e,t,n){var o,s,i,a,c,l,r=[];if(e.nodeName!==t.nodeName){if(!n.length)throw new Error("Top level nodes have to be of the same kind.");return[(new V).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,d(e)).setValue(this.options._const.newValue,d(t)).setValue(this.options._const.route,n)]}if(n.length&&this.options.diffcap<Math.abs((e.childNodes||[]).length-(t.childNodes||[]).length))return[(new V).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,d(e)).setValue(this.options._const.newValue,d(t)).setValue(this.options._const.route,n)];if(Object.prototype.hasOwnProperty.call(e,"data")&&e.data!==t.data)return"#text"===e.nodeName?[(new V).setValue(this.options._const.action,this.options._const.modifyTextElement).setValue(this.options._const.route,n).setValue(this.options._const.oldValue,e.data).setValue(this.options._const.newValue,t.data)]:[(new V).setValue(this.options._const.action,this.options._const.modifyComment).setValue(this.options._const.route,n).setValue(this.options._const.oldValue,e.data).setValue(this.options._const.newValue,t.data)];for(s=e.attributes?Object.keys(e.attributes).sort():[],i=t.attributes?Object.keys(t.attributes).sort():[],a=s.length,l=0;l<a;l++)o=s[l],-1===(c=i.indexOf(o))?r.push((new V).setValue(this.options._const.action,this.options._const.removeAttribute).setValue(this.options._const.route,n).setValue(this.options._const.name,o).setValue(this.options._const.value,e.attributes[o])):(i.splice(c,1),e.attributes[o]!==t.attributes[o]&&r.push((new V).setValue(this.options._const.action,this.options._const.modifyAttribute).setValue(this.options._const.route,n).setValue(this.options._const.name,o).setValue(this.options._const.oldValue,e.attributes[o]).setValue(this.options._const.newValue,t.attributes[o])));for(a=i.length,l=0;l<a;l++)o=i[l],r.push((new V).setValue(this.options._const.action,this.options._const.addAttribute).setValue(this.options._const.route,n).setValue(this.options._const.name,o).setValue(this.options._const.value,t.attributes[o]));return r},e.prototype.findInnerDiff=function(e,t,n){var o=e.childNodes?e.childNodes.slice():[],s=t.childNodes?t.childNodes.slice():[],i=Math.max(o.length,s.length),a=Math.abs(o.length-s.length),c=[],l=0;if(!this.options.maxChildCount||i<this.options.maxChildCount){var r=Boolean(e.subsets&&e.subsetsAge--),u=r?e.subsets:e.childNodes&&t.childNodes?m(e,t):[];if(u.length>0&&(c=this.attemptGroupRelocation(e,t,u,n,r)).length>0)return c}for(var f=0;f<i;f+=1){var p=o[f],_=s[f];a&&(p&&!_?"#text"===p.nodeName?(c.push((new V).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,n.concat(l)).setValue(this.options._const.value,p.data)),l-=1):(c.push((new V).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.route,n.concat(l)).setValue(this.options._const.element,d(p))),l-=1):_&&!p&&("#text"===_.nodeName?c.push((new V).setValue(this.options._const.action,this.options._const.addTextElement).setValue(this.options._const.route,n.concat(l)).setValue(this.options._const.value,_.data)):c.push((new V).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.route,n.concat(l)).setValue(this.options._const.element,d(_))))),p&&_&&(!this.options.maxChildCount||i<this.options.maxChildCount?c=c.concat(this.findNextDiff(p,_,n.concat(l))):h(p,_)||(o.length>s.length?("#text"===p.nodeName?c.push((new V).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,n.concat(l)).setValue(this.options._const.value,p.data)):c.push((new V).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.element,d(p)).setValue(this.options._const.route,n.concat(l))),o.splice(f,1),f-=1,l-=1,a-=1):o.length<s.length?(c=c.concat([(new V).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.element,d(_)).setValue(this.options._const.route,n.concat(l))]),o.splice(f,0,d(_)),a-=1):c=c.concat([(new V).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,d(p)).setValue(this.options._const.newValue,d(_)).setValue(this.options._const.route,n.concat(l))]))),l+=1}return e.innerDone=!0,c},e.prototype.attemptGroupRelocation=function(e,t,n,o,s){for(var i,a,c,l,r,u=function(e,t,n){var o=e.childNodes?p(e.childNodes.length,!0):[],s=t.childNodes?p(t.childNodes.length,!0):[],i=0;return n.forEach((function(e){for(var t=e.oldValue+e.length,n=e.newValue+e.length,a=e.oldValue;a<t;a+=1)o[a]=i;for(a=e.newValue;a<n;a+=1)s[a]=i;i+=1})),{gaps1:o,gaps2:s}}(e,t,n),h=u.gaps1,m=u.gaps2,_=e.childNodes.slice(),g=t.childNodes.slice(),v=Math.min(h.length,m.length),b=[],N=0,y=0;N<v;y+=1,N+=1)if(!s||!0!==h[N]&&!0!==m[N]){if(!0===h[y])if("#text"===(l=_[y]).nodeName)if("#text"===g[N].nodeName){if(l.data!==g[N].data){for(var w=y;_.length>w+1&&"#text"===_[w+1].nodeName;)if(w+=1,g[N].data===_[w].data){r=!0;break}r||b.push((new V).setValue(this.options._const.action,this.options._const.modifyTextElement).setValue(this.options._const.route,o.concat(y)).setValue(this.options._const.oldValue,l.data).setValue(this.options._const.newValue,g[N].data))}}else b.push((new V).setValue(this.options._const.action,this.options._const.removeTextElement).setValue(this.options._const.route,o.concat(y)).setValue(this.options._const.value,l.data)),h.splice(y,1),_.splice(y,1),v=Math.min(h.length,m.length),y-=1,N-=1;else!0===m[N]?b.push((new V).setValue(this.options._const.action,this.options._const.replaceElement).setValue(this.options._const.oldValue,d(l)).setValue(this.options._const.newValue,d(g[N])).setValue(this.options._const.route,o.concat(y))):(b.push((new V).setValue(this.options._const.action,this.options._const.removeElement).setValue(this.options._const.route,o.concat(y)).setValue(this.options._const.element,d(l))),h.splice(y,1),_.splice(y,1),v=Math.min(h.length,m.length),y-=1,N-=1);else if(!0===m[N])"#text"===(l=g[N]).nodeName?(b.push((new V).setValue(this.options._const.action,this.options._const.addTextElement).setValue(this.options._const.route,o.concat(y)).setValue(this.options._const.value,l.data)),h.splice(y,0,!0),_.splice(y,0,{nodeName:"#text",data:l.data}),v=Math.min(h.length,m.length)):(b.push((new V).setValue(this.options._const.action,this.options._const.addElement).setValue(this.options._const.route,o.concat(y)).setValue(this.options._const.element,d(l))),h.splice(y,0,!0),_.splice(y,0,d(l)),v=Math.min(h.length,m.length));else if(h[y]!==m[N]){if(b.length>0)return b;if(c=n[h[y]],(a=Math.min(c.newValue,_.length-c.length))!==c.oldValue){i=!1;for(var E=0;E<c.length;E+=1)f(_[a+E],_[c.oldValue+E],{},!1,!0)||(i=!0);if(i)return[(new V).setValue(this.options._const.action,this.options._const.relocateGroup).setValue(this.options._const.groupLength,c.length).setValue(this.options._const.from,c.oldValue).setValue(this.options._const.to,a).setValue(this.options._const.route,o)]}}}else;return b},e.prototype.findValueDiff=function(e,t,n){var o=[];return e.selected!==t.selected&&o.push((new V).setValue(this.options._const.action,this.options._const.modifySelected).setValue(this.options._const.oldValue,e.selected).setValue(this.options._const.newValue,t.selected).setValue(this.options._const.route,n)),(e.value||t.value)&&e.value!==t.value&&"OPTION"!==e.nodeName&&o.push((new V).setValue(this.options._const.action,this.options._const.modifyValue).setValue(this.options._const.oldValue,e.value||"").setValue(this.options._const.newValue,t.value||"").setValue(this.options._const.route,n)),e.checked!==t.checked&&o.push((new V).setValue(this.options._const.action,this.options._const.modifyChecked).setValue(this.options._const.oldValue,e.checked).setValue(this.options._const.newValue,t.checked).setValue(this.options._const.route,n)),o},e}(),O={debug:!1,diffcap:10,maxDepth:!1,maxChildCount:50,valueDiffing:!0,textDiff:function(e,t,n,o){e.data=o},preVirtualDiffApply:function(){},postVirtualDiffApply:function(){},preDiffApply:function(){},postDiffApply:function(){},filterOuterDiff:null,compress:!1,_const:!1,document:!("undefined"==typeof window||!window.document)&&window.document,components:[]},A=function(){function e(e){if(void 0===e&&(e={}),Object.entries(O).forEach((function(t){var n=t[0],o=t[1];Object.prototype.hasOwnProperty.call(e,n)||(e[n]=o)})),!e._const){var t=["addAttribute","modifyAttribute","removeAttribute","modifyTextElement","relocateGroup","removeElement","addElement","removeTextElement","addTextElement","replaceElement","modifyValue","modifyChecked","modifySelected","modifyComment","action","route","oldValue","newValue","element","group","groupLength","from","to","name","value","data","attributes","nodeName","childNodes","checked","selected"],n={};e.compress?t.forEach((function(e,t){return n[e]=t})):t.forEach((function(e){return n[e]=e})),e._const=n}this.options=e}return e.prototype.apply=function(e,t){return function(e,t,n){return t.every((function(t){return o(e,t,n)}))}(e,t,this.options)},e.prototype.undo=function(e,t){return i(e,t,this.options)},e.prototype.diff=function(e,t){return new T(e,t,this.options).init()},e}(),D=function(){function e(e){void 0===e&&(e={});var t=this;this.pad="│   ",this.padding="",this.tick=1,this.messages=[];var n=function(e,n){var o=e[n];e[n]=function(){for(var s=arguments,i=[],a=0;a<arguments.length;a++)i[a]=s[a];t.fin(n,Array.prototype.slice.call(i));var c=o.apply(e,i);return t.fout(n,c),c}};for(var o in e)"function"==typeof e[o]&&n(e,o);this.log("┌ TRACELOG START")}return e.prototype.fin=function(e,t){this.padding+=this.pad,this.log("├─> entering ".concat(e),t)},e.prototype.fout=function(e,t){this.log("│<──┘ generated return value",t),this.padding=this.padding.substring(0,this.padding.length-this.pad.length)},e.prototype.format=function(e,t){return"".concat(function(e){for(var t="".concat(e);t.length<4;)t="0".concat(e);return t}(t),"> ").concat(this.padding).concat(e)},e.prototype.log=function(){for(var e=arguments,t=[],n=0;n<arguments.length;n++)t[n]=e[n];var o=function(e){return e?"string"==typeof e?e:e instanceof HTMLElement?e.outerHTML||"<empty>":e instanceof Array?"[".concat(e.map(o).join(","),"]"):e.toString()||e.valueOf()||"<unknown>":"<falsey>"},s=t.map(o).join(", ");this.messages.push(this.format(s,this.tick++))},e.prototype.toString=function(){for(var e="└───";e.length<=this.padding.length+this.pad.length;)e+="×   ";var t=this.padding;return this.padding="",e=this.format(e,this.tick),this.padding=t,"".concat(this.messages.join("\n"),"\n").concat(e)},e}();return e.DiffDOM=A,e.TraceLogger=D,e.nodeToObj=b,e.stringToObj=x,e}({});
function loadLinkClick(){
    var links= document.getElementsByTagName("a");
    const headers = new Headers();
    console.log(links.length+" adet link bulundu.");
    for (var i=0;i<links.length;i++){
        links[i].addEventListener("click",function(e){
            let href=e.currentTarget.href;
            console.log("href",href)
            NProgress.start();
            fetch(href,{method:"GET",headers}).then(res=>res.text()).then(result=>{
                processAjaxData(result,href);
                NProgress.done();
            });
            e.preventDefault();
        })
    }
} 


function processAjaxData(response, urlPath){
    var dd = new diffDOM.DiffDOM();
    var html1=document.documentElement;
    var parser = new DOMParser();
    var html2 = parser.parseFromString(response, "text/html");
    var diff = dd.diff(html1, html2.documentElement);
    dd.apply(html1, diff)
    document.title = html2.title;
    document.documentElement.replaceWith(html1);
    localStorage.setItem(urlPath, html1.outerHTML);
    var data={"Title":html2.title,"Url":urlPath};
    console.log("data");
    console.log(data);
    window.history.pushState(data,"", urlPath);
    loadLinkClick();
    window.scrollTo({top: 0, behavior: "smooth"});
}

window.onpopstate = function(e){
    if(e.state){
        var html = localStorage.getItem(e.state.Url);
        var parser = new DOMParser();
        var domHtml = parser.parseFromString(html, "text/html");
        document.body.replaceWith(domHtml.body);
        document.title = e.state.Title;
        window.scrollTo({top: 0, behavior: "smooth"});
        loadLinkClick();
    }
};


addEventListener("load",function(){
    loadLinkClick();
    localStorage.setItem(location.href, document.documentElement.outerHTML);
});
