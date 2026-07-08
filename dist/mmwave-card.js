function t(t,e,r,i){var a,s=arguments.length,o=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,r,i);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(o=(s<3?a(o):s>3?a(e,r,o):a(e,r))||o);return s>3&&o&&Object.defineProperty(e,r,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&a.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new s(r,t,i)},n=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,y=globalThis,u=y.trustedTypes,g=u?u.emptyScript:"",m=y.reactiveElementPolyfillSupport,f=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},v=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const s=i?.call(this);a?.call(this,e),this.requestUpdate(t,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(r)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const a=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(e,r.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const s=a.fromAttribute(e,t.type);this[i]=s??this._$Ej?.get(i)??s,this._$Em=null}}requestUpdate(t,e,r,i=!1,a){if(void 0!==t){const s=this.constructor;if(!1===i&&(a=this[t]),r??=s.getPropertyOptions(t),!((r.hasChanged??v)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:a},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==a||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,m?.({ReactiveElement:$}),(y.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+M,E=`<${P}>`,R=document,H=()=>R.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,q="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,L=/>/g,B=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,U=/"/g,F=/^(?:script|style|textarea|title)$/i,K=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),N=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),I=new WeakMap,j=R.createTreeWalker(R,129);function X(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const r=t.length-1,i=[];let a,s=2===e?"<svg>":3===e?"<math>":"",o=z;for(let e=0;e<r;e++){const r=t[e];let n,l,d=-1,c=0;for(;c<r.length&&(o.lastIndex=c,l=o.exec(r),null!==l);)c=o.lastIndex,o===z?"!--"===l[1]?o=D:void 0!==l[1]?o=L:void 0!==l[2]?(F.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=B):void 0!==l[3]&&(o=B):o===B?">"===l[0]?(o=a??z,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?B:'"'===l[3]?U:O):o===U||o===O?o=B:o===D||o===L?o=z:(o=B,a=void 0);const h=o===B&&t[e+1].startsWith("/>")?" ":"";s+=o===z?r+E:d>=0?(i.push(n),r.slice(0,d)+C+r.slice(d)+M+h):r+M+(-2===d?e:h)}return[X(t,s+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let a=0,s=0;const o=t.length-1,n=this.parts,[l,d]=Z(t,e);if(this.el=G.createElement(l,r),j.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=j.nextNode())&&n.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=d[s++],r=i.getAttribute(t).split(M),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:r,ctor:"."===o[1]?et:"?"===o[1]?rt:"@"===o[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(M)&&(n.push({type:6,index:a}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(M),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],H()),j.nextNode(),n.push({type:2,index:++a});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===P)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf(M,t+1));)n.push({type:7,index:a}),t+=M.length-1}a++}}static createElement(t,e){const r=R.createElement("template");return r.innerHTML=t,r}}function V(t,e,r=t,i){if(e===N)return e;let a=void 0!==i?r._$Co?.[i]:r._$Cl;const s=T(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),void 0===s?a=void 0:(a=new s(t),a._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=a:r._$Cl=a),void 0!==a&&(e=V(t,a._$AS(t,e.values),a,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??R).importNode(e,!0);j.currentNode=i;let a=j.nextNode(),s=0,o=0,n=r[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new Q(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new at(a,this,t)),this._$AV.push(e),n=r[++o]}s!==n?.index&&(a=j.nextNode(),s++)}return j.currentNode=R,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),T(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==N&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=G.createElement(X(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new G(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const a of t)i===e.length?e.push(r=new Q(this.O(H()),this.O(H()),this,this.options)):r=e[i],r._$AI(a),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,a){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Y}_$AI(t,e=this,r,i){const a=this.strings;let s=!1;if(void 0===a)t=V(this,t,e,0),s=!T(t)||t!==this._$AH&&t!==N,s&&(this._$AH=t);else{const i=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=V(this,i[r+o],e,o),n===N&&(n=this._$AH[o]),s||=!T(n)||n!==this._$AH[o],n===Y?t=Y:t!==Y&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}s&&!i&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class rt extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class it extends tt{constructor(t,e,r,i,a){super(t,e,r,i,a),this.type=5}_$AI(t,e=this){if((t=V(this,t,e,0)??Y)===N)return;const r=this._$AH,i=t===Y&&r!==Y||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==Y&&(r===Y||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(G,Q),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let a=i._$litPart$;if(void 0===a){const t=r?.renderBefore??null;i._$litPart$=a=new Q(e.insertBefore(H(),t),t,void 0,r??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return N}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},ht=(t=ct,e,r)=>{const{kind:i,metadata:a}=r;let s=globalThis.litPropertyMetadata.get(a);if(void 0===s&&globalThis.litPropertyMetadata.set(a,s=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const a=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,a,t,!0,r)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=r;return function(r){const a=this[i];e.call(this,r),this.requestUpdate(i,a,t,!0,r)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,r)=>"object"==typeof r?ht(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}function _t(t){return pt({...t,state:!0,attribute:!1})}function yt(t,e){return(e,r,i)=>((t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,r),r))(e,r,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut={radar_x:0,radar_y:0,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]},gt={room_w:400,room_d:600,device_id:"",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z",polygon_entity:"text.r60abd1_polygon_config"},mt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!0,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!0,domain:"sensor"},{key:"z_entity",labelKey:"editor.z_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"},{key:"sleep_entity",labelKey:"editor.sleep_entity",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],ft={info:{id:"r60abd1",displayName:"MicRadar R60ABD1 (60 GHz)",fovDegrees:40,maxRangeM:2.5,minRangeM:.4,vitalRangeM:1.5,updateRateHz:.5,maxTargets:1,hasZAxis:!0,hasBreathing:!0,hasHeartRate:!0,hasSleep:!0},getEntitySchema:()=>mt,validateConfig(t){const e=[];for(const r of mt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("x_entity"),s=r("y_entity"),o=r("z_entity");if(!a||!s)return{present:!0,targets:[]};const n=parseFloat(a.state)||0,l=parseFloat(s.state)||0,d=o&&parseFloat(o.state)||0;return 0===n&&0===l&&0===d?{present:!0,targets:[]}:{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:d}]}},getDefaultCalibration:()=>({...ut,radar_z:220,pitch:0,roll:0})},bt={id:"ld2450",displayName:"Hi-Link LD2450 (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},vt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],xt={info:bt,getEntitySchema:()=>vt,validateConfig(t){const e=[];for(const r of vt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=bt.maxTargets;t++){const e=r(`target_${t}_x_entity`),i=r(`target_${t}_y_entity`);if(!e||!i)continue;const s=(parseFloat(e.state)||0)/10,o=(parseFloat(i.state)||0)/10;if(0===s&&0===o)continue;const n=r(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:s,rawY:o,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({...ut,radar_z:250,pitch:0,roll:0})},$t=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],wt={info:{id:"rd03e",displayName:"Ai-Thinker RD03E (24 GHz)",fovDegrees:0,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},getEntitySchema:()=>$t,validateConfig(t){const e=[];for(const r of $t)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const s=parseFloat(a.state)||0;if(s<=0)return{present:!0,targets:[]};const o=[];return o.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:o}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],At={info:{id:"ld2411",displayName:"Hi-Link LD2411 (24 GHz)",fovDegrees:0,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},getEntitySchema:()=>kt,validateConfig(t){const e=[];for(const r of kt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const s=parseFloat(a.state)||0;if(s<=0)return{present:!0,targets:[]};const o=[];return o.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:o}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},St={id:"ld2451",displayName:"Hi-Link LD2451 (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Ct=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Mt={info:St,getEntitySchema:()=>Ct,validateConfig(t){const e=[];for(const r of Ct)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=St.maxTargets;t++){const e=r(`target_${t}_x_entity`),i=r(`target_${t}_y_entity`);if(!e||!i)continue;const s=parseFloat(e.state)||0,o=parseFloat(i.state)||0;if(0===s&&0===o)continue;const n=r(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:s,rawY:o,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Pt={id:"ld2453",displayName:"Hi-Link LD2453 (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Et=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Rt={info:Pt,getEntitySchema:()=>Et,validateConfig(t){const e=[];for(const r of Et)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=Pt.maxTargets;t++){const e=r(`target_${t}_x_entity`),i=r(`target_${t}_y_entity`);if(!e||!i)continue;const s=parseFloat(e.state)||0,o=parseFloat(i.state)||0;if(0===s&&0===o)continue;const n=r(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:s,rawY:o,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Ht=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"}],Tt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"}],Wt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!1,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!1,domain:"sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!1,domain:"sensor"},{key:"respiration_entity",labelKey:"editor.respiration_entity",required:!1,domain:"sensor"},{key:"heart_rate_entity",labelKey:"editor.heart_rate_entity",required:!1,domain:"sensor"}],qt={r60abd1:ft,ld2450:xt,rd03e:wt,ld2411:At,ld2451:Mt,ld2453:Rt,ld2410b:{info:{id:"ld2410b",displayName:"Hi-Link LD2410B (24 GHz)",fovDegrees:0,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},getEntitySchema:()=>Ht,validateConfig(t){const e=[];for(const r of Ht)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const s=parseFloat(a.state)||0;if(s<=0)return{present:!0,targets:[]};const o=[];return o.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:o}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},ld2410c:{info:{id:"ld2410c",displayName:"Hi-Link LD2410C (24 GHz)",fovDegrees:0,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},getEntitySchema:()=>Tt,validateConfig(t){const e=[];for(const r of Tt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const s=parseFloat(a.state)||0;if(s<=0)return{present:!0,targets:[]};const o=[];return o.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:o}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},ld6002:{info:{id:"ld6002",displayName:"Hi-Link LD6002 (60 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:1,maxTargets:1,hasZAxis:!1,hasBreathing:!0,hasHeartRate:!0,hasSleep:!1},getEntitySchema:()=>Wt,validateConfig(t){const e=[];return t.presence_entity||e.push("Missing required entity: presence_entity"),t.distance_entity||t.x_entity&&t.y_entity||e.push("You must provide either distance_entity OR both x_entity and y_entity."),e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("x_entity"),s=r("y_entity"),o=r("distance_entity");let n=0,l=0;if(a&&s?(n=parseFloat(a.state)||0,l=parseFloat(s.state)||0):o&&(l=parseFloat(o.state)||0),0===n&&l<=0)return{present:!0,targets:[]};return{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:0}]}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})}};function zt(t){return qt[t]}function Dt(t,e,r){const i=r.length;if(i<3)return!0;let a=!1;for(let s=0,o=i-1;s<i;o=s++){const i=r[s].x,n=r[s].y,l=r[o].x,d=r[o].y;n>e!=d>e&&t<(l-i)*(e-n)/(d-n)+i&&(a=!a)}return a}function Lt(t,e,r,i){const a=function(t,e,r){const i=Math.PI/180,a=t*i,s=e*i,o=r*i,[n,l,d,c,h,p]=[Math.sin(a),Math.cos(a),Math.sin(s),Math.cos(s),Math.sin(o),Math.cos(o)];return[[l*p+n*d*h,n*c,-l*h+n*d*p],[-n*p+l*d*h,l*c,n*h+l*d*p],[c*h,-d,c*p]]}(i.yaw,i.pitch,i.roll),s=a[0][0]*t+a[0][1]*e+a[0][2]*r,o=a[1][0]*t+a[1][1]*e+a[1][2]*r,n=a[2][0]*t+a[2][1]*e+a[2][2]*r,l=i.radar_x+s,d=i.radar_y+o;return{roomX:l,roomY:d,roomZ:i.radar_z-n,inBoundary:Dt(l,d,i.polygon)}}const Bt=(t,e,r)=>({cx:t/r.roomW*r.W,cy:e/r.roomD*r.H}),Ot=(t,e,r)=>({x:t/r.W*r.roomW,y:e/r.H*r.roomD});function Ut(t,e){const r=e.getBoundingClientRect(),i="touches"in t?t.touches[0].clientX:t.clientX,a="touches"in t?t.touches[0].clientY:t.clientY;return{x:i-r.left,y:a-r.top}}function Ft(t,e){const r=window.devicePixelRatio||1,i=t.offsetWidth||400;t.width=i*r,t.height=e*r,t.style.height=`${e}px`;const a=t.getContext("2d");return a.scale(r,r),a}function Kt(t,e){t.clearRect(0,0,e.W,e.H),t.strokeStyle="rgba(128,128,128,.06)",t.lineWidth=.5;for(let r=0;r<e.W;r+=40)t.beginPath(),t.moveTo(r,0),t.lineTo(r,e.H),t.stroke();for(let r=0;r<e.H;r+=40)t.beginPath(),t.moveTo(0,r),t.lineTo(e.W,r),t.stroke();t.strokeStyle="rgba(255,255,255,.15)",t.lineWidth=1.5,t.strokeRect(1,1,e.W-2,e.H-2);const r=100*Math.round(e.roomW/4/100)||100,i=r/e.roomW*e.W,a=e.H-10,s=e.W-i-8;t.beginPath(),t.moveTo(s,a),t.lineTo(s+i,a),t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.moveTo(s,a-3),t.lineTo(s,a+3),t.moveTo(s+i,a-3),t.lineTo(s+i,a+3),t.stroke(),t.fillStyle="rgba(255,255,255,.45)",t.font="9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillText(`${r}cm`,s+i/2,a-3),t.font="bold 9px system-ui",t.fillStyle="rgba(11,130,92,.6)",t.textAlign="right",t.textBaseline="top",t.fillText("X →",e.W-4,4),t.textAlign="left",t.textBaseline="bottom",t.fillText("Y ↓",4,e.H-4),t.textAlign="left",t.textBaseline="top",t.fillStyle="rgba(255,255,255,.3)",t.fillText("0",4,4),t.textBaseline="alphabetic"}function Nt(t,e,r,i=!1){if(e.length<2)return;const a=e.map(t=>Bt(t.x,t.y,r));t.beginPath(),a.forEach((e,r)=>0===r?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.fillStyle=i?"rgba(11,130,92,.04)":"rgba(11,130,92,.07)",t.fill()),t.strokeStyle=i?"rgba(11,130,92,.22)":"rgba(11,130,92,.55)",t.lineWidth=1.5,t.stroke(),i||a.forEach(e=>{t.beginPath(),t.arc(e.cx,e.cy,3,0,2*Math.PI),t.fillStyle="rgba(11,130,92,.8)",t.fill()})}function Yt(t,e,r,i,a,s,o,n,l,d){const c=Math.sqrt(l.W/l.roomW*(l.H/l.roomD)),h=t=>Math.max(100*t*c,1),p=s/2*(Math.PI/180),_=Math.PI/2+i*(Math.PI/180),y=Math.max(.05,Math.cos(a*(Math.PI/180))),u=h(o*y),g=h(n*y),m=(i,a,s,o,n=1.2)=>{const l=e+a*Math.cos(_-p),d=r+a*Math.sin(_-p);t.beginPath(),t.moveTo(l,d),t.arc(e,r,a,_-p,_+p,!1),t.arc(e,r,i,_+p,_-p,!0),t.closePath(),t.fillStyle=s,t.fill("evenodd"),t.strokeStyle=o,t.lineWidth=n,t.stroke()};if(null!=d&&d>o&&d<n){const i=h(d*y),a=t.createRadialGradient(e,r,i,e,r,g);a.addColorStop(0,"rgba(11,130,92,.25)"),a.addColorStop(1,"rgba(11,130,92,.05)"),m(i,g,a,"rgba(11,130,92,.45)");const s=t.createRadialGradient(e,r,u,e,r,i);s.addColorStop(0,"rgba(11,130,92,.55)"),s.addColorStop(1,"rgba(11,130,92,.20)"),m(u,i,s,"rgba(11,130,92,.85)",1.5)}else{const i=t.createRadialGradient(e,r,u,e,r,g);i.addColorStop(0,"rgba(11,130,92,.45)"),i.addColorStop(1,"rgba(11,130,92,.10)"),m(u,g,i,"rgba(11,130,92,.70)")}t.beginPath(),t.moveTo(e,r),t.arc(e,r,u,_-p,_+p,!1),t.closePath(),t.fillStyle="rgba(0,0,0,.50)",t.fill(),t.beginPath(),t.arc(e,r,u,_-p,_+p,!1),t.strokeStyle="rgba(244,99,99,.80)",t.lineWidth=1.5,t.setLineDash([3,3]),t.stroke(),t.setLineDash([]);const f=(i,a,s)=>{const o=e+a*Math.cos(_),n=r+a*Math.sin(_),l=`${i}m`;t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle";const d=t.measureText(l).width;t.fillStyle="rgba(10,10,24,.82)",t.beginPath(),t.roundRect?.(o-d/2-3,n-7,d+6,14,3),t.fill(),t.fillStyle=s,t.fillText(l,o,n)};null!=d&&f(Number((d*y).toFixed(1)),h(d*y),"rgba(11,130,92,1)"),f(Number((n*y).toFixed(1)),g,"rgba(27,159,117,.85)"),t.textBaseline="alphabetic",t.beginPath(),t.arc(e,r,9,0,2*Math.PI),t.fillStyle="rgba(10,10,24,.92)",t.fill(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=1.5,t.stroke();for(const[i,a]of[[7,0],[-7,0],[0,7],[0,-7]])t.beginPath(),t.moveTo(e+.3*i,r+.3*a),t.lineTo(e+i,r+a),t.strokeStyle="rgba(11,130,92,.7)",t.lineWidth=1.2,t.stroke()}function It(t,e,r,i){i?(t.beginPath(),t.arc(e,r,9,0,2*Math.PI),t.fillStyle="rgba(255,152,0,.25)",t.fill(),t.beginPath(),t.arc(e,r,5,0,2*Math.PI),t.fillStyle="var(--accent-color,#ff9800)",t.fill(),t.strokeStyle="rgba(255,255,255,.6)",t.lineWidth=1.5,t.stroke()):(t.setLineDash([2,2]),t.beginPath(),t.arc(e,r,9,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.5)",t.lineWidth=1.5,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(e,r,4,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.7)",t.lineWidth=1.5,t.stroke())}function jt(t,e,r,i,a,s=!1){t.beginPath(),t.arc(e,r,7,0,2*Math.PI),s?(t.strokeStyle=a,t.lineWidth=1.8,t.stroke()):(t.fillStyle=a,t.fill(),t.strokeStyle="rgba(255,255,255,.5)",t.lineWidth=1.2,t.stroke()),t.fillStyle=s?a:"#fff",t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e,r),t.textBaseline="alphabetic"}const Xt={en:{card_name:"MMWave Radar HA Card",tabs:{geo:"① Geometry & Boundary",yaw:"② Yaw Calibration",live:"③ Live View"},geo:{install_params:"Installation Parameters (measure with tape)",radar_x:"Radar X",radar_y:"Radar Y",radar_z:"Height",yaw_rough:"Rough Yaw",pitch:"Pitch",roll:"Roll",geo_note:"Origin: top-left corner. X → right. Y ↓ down (toward foot of bed).\nYaw = angle of radar forward axis from Y-axis, clockwise positive.\nPitch/Roll: 0 for horizontal mount; enter tilt angle or read from IMU.",boundary:"Room Boundary (optional)",poly_hint_none:"Click canvas to draw boundary (≥ 3 points)",poly_hint_ok:"Boundary active — {n} vertices",poly_undo:"Undo",poly_clear:"Clear",boundary_note:"No boundary = no filtering. Targets outside the polygon are ignored."},yaw:{ref_a_title:"Reference Point A",ref_b_title:"Reference Point B",ref_a_idle:"Click the preview to mark a known position",ref_a_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_a_done:"Captured",ref_b_idle:"Complete point A first",ref_b_step:"Click another known position (> 80 cm from A)",ref_b_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_b_done:"Captured",capture_btn:"Walk to marked position → Capture radar reading",capture_wait:"Waiting for radar data…",result_idle:"Click the preview map to start — mark reference point A",result_ok:"Yaw {yaw}° · Residual {residual} cm"},live:{title:"Room Top-Down View",badge_none:"No presence",badge_present:"Present",badge_filtered:"Outside boundary",room_x:"Room X (cm)",room_y:"Room Y (cm)",room_z:"Height (cm)",targets:"Targets"},actions:{save:"Save",saved:"Saved ✓",reset:"Reset",reset_confirm:"Clear all calibration data?"},editor:{model:"Radar model",entities:"Entities",presence_entity:"Presence entity",x_entity:"X coordinate entity",y_entity:"Y coordinate entity",z_entity:"Z coordinate entity (optional)",breath_entity:"Breath Entity (Optional)",heart_entity:"Heart Rate Entity (Optional)",sleep_entity:"Sleep State Entity (Optional)",polygon_entity:"Polygon Sync Entity (Optional)",target1_x:"Target 1 X Entity",target1_y:"Target 1 Y entity",target2_x:"Target 2 X entity (optional)",target2_y:"Target 2 Y entity (optional)",target3_x:"Target 3 X entity (optional)",target3_y:"Target 3 Y entity (optional)",room_dimensions:"Room Dimensions",room_w:"Room width (cm)",room_d:"Room depth (cm)"}},"zh-Hans":{card_name:"毫米波雷达校准卡片",tabs:{geo:"① 几何 & 边界",yaw:"② 偏航校准",live:"③ 实时验证"},geo:{install_params:"安装参数（卷尺测量后填入）",radar_x:"雷达 X",radar_y:"雷达 Y",radar_z:"安装高度",yaw_rough:"粗略偏航",pitch:"俯仰角",roll:"横滚角",geo_note:"坐标原点为预览图左上角，X 向右，Y 向下（从床头到床尾方向为正）。\n偏航角 = 雷达正前方相对 Y 轴（向下）的夹角，顺时针为正。\nPitch/Roll：水平安装填 0；有倾斜时填实测值或接入 IMU 传感器后自动读取。",boundary:"房间边界过滤（可选）",poly_hint_none:"点击画布添加顶点，绘制有效区域（≥ 3 个点）",poly_hint_ok:"边界过滤已启用 — {n} 个顶点",poly_undo:"撤销",poly_clear:"清除",boundary_note:"不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。"},yaw:{ref_a_title:"参考点 A",ref_b_title:"参考点 B",ref_a_idle:"在预览图上点击一个你能走到的已知位置",ref_a_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_a_done:"捕获完成",ref_b_idle:"完成 A 点后操作",ref_b_step:"点击另一个已知位置（与 A 距离 > 80 cm）",ref_b_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_b_done:"捕获完成",capture_btn:"走到标记位置后 → 点此捕获雷达读数",capture_wait:"等待雷达数据…",result_idle:"在预览图上点击参考点 A 开始校准",result_ok:"偏航角 {yaw}° · 残差 {residual} cm"},live:{title:"房间俯视图",badge_none:"无人",badge_present:"有人",badge_filtered:"边界外",room_x:"房间 X (cm)",room_y:"房间 Y (cm)",room_z:"离地高度 (cm)",targets:"目标数"},actions:{save:"保存",saved:"已保存 ✓",reset:"重置",reset_confirm:"清除所有校准数据？"},editor:{model:"雷达型号",entities:"实体配置",presence_entity:"存在感知实体",x_entity:"X 坐标实体",y_entity:"Y 坐标实体",z_entity:"Z 坐标实体（可选）",breath_entity:"呼吸频率实体（可选）",heart_entity:"心率实体（可选）",sleep_entity:"睡眠状态实体（可选）",polygon_entity:"多边形同步实体（可选）",target1_x:"目标 1 X 实体",target1_y:"目标 1 Y 实体",target2_x:"目标 2 X 实体（可选）",target2_y:"目标 2 Y 实体（可选）",target3_x:"目标 3 X 实体（可选）",target3_y:"目标 3 Y 实体（可选）",room_dimensions:"房间尺寸",room_w:"房间宽度 (cm)",room_d:"房间深度 (cm)"}}};function Zt(t,e){const r=e??navigator.language?.split("-")[0]??"en",i=Xt[e??""]??Object.entries(Xt).find(([t])=>t.startsWith(r))?.[1]??Xt.en;let a=i;for(const e of t.split("."))if(a=a?.[e],void 0===a)break;return"string"==typeof a?a:t}const Gt=K`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
  <path d="M 256 256 L 256 26 A 230 230 0 0 1 418.6 418.6 Z" fill="var(--mmwave-primary)" opacity="0.2" />
  <circle cx="256" cy="256" r="85" fill="none" stroke="var(--mmwave-primary)" stroke-width="24" />
  <circle cx="256" cy="256" r="145" fill="none" stroke="var(--mmwave-primary)" stroke-width="24" />
  <circle cx="256" cy="256" r="205" fill="none" stroke="var(--mmwave-primary)" stroke-width="24" />
  <line x1="256" y1="256" x2="358.5" y2="153.5" stroke="var(--mmwave-secondary)" stroke-width="12" stroke-linecap="round" />
  <path d="M 272.5 162.5 A 95 95 0 0 1 349.5 239.5" fill="none" stroke="var(--mmwave-secondary)" stroke-width="12" stroke-linecap="round" />
  <path d="M 279.4 123.1 A 135 135 0 0 1 388.9 232.6" fill="none" stroke="var(--mmwave-secondary)" stroke-width="12" stroke-linecap="round" />
  <circle cx="256" cy="256" r="45" fill="var(--mmwave-secondary)" />
  <circle cx="337.3" cy="174.7" r="16" fill="var(--mmwave-secondary)" />
</svg>
`,Vt="mmwave-card",Jt="mmwave-card-editor";let Qt=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._rafId=0}_L(t){return Zt(t,this.lang)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const r=Ut(t,e),i=Ot(r.x,r.y,this._m());this._emit({polygon:[...this.calibration.polygon,i]})}_undo(){const t=[...this.calibration.polygon];t.pop(),this._emit({polygon:t})}_clear(){this._emit({polygon:[]})}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0){const e=Ft(t,this._cssH()),r=this._m();if(Kt(e,r),this.adapter){const t=Bt(this.calibration.radar_x,this.calibration.radar_y,r);Yt(e,t.cx,t.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.adapter.info.maxRangeM,r,this.adapter.info.vitalRangeM)}Nt(e,this.calibration.polygon,r)}this._rafId=requestAnimationFrame(()=>this._loop())}_numField(t,e,r,i=5,a=-9999,s=9999){const o=t=>{let r=parseFloat(t.target.value)||0;r>s&&(r=s),r<a&&(r=a),this._emit({[e]:r})};return K` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(r)}
        step=${i}
        min=${a}
        max=${s}
        @input=${o}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(r)}
        step=${i}
        min=${a}
        max=${s}
        @change=${o}
      />
      <span class="unit">cm</span>
    </div>`}_degField(t,e,r,i=-180,a=180){const s=t=>{const r=parseFloat(t.target.value)||0;this._emit({[e]:r})};return K` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(r)}
        step="0.5"
        min=${i}
        max=${a}
        @input=${s}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(r)}
        step="0.5"
        min=${i}
        max=${a}
        @change=${s}
      />
      <span class="unit">°</span>
    </div>`}render(){const t=this.calibration,e=t.polygon.length,r=e>=3?this._L("geo.poly_hint_ok").replace("{n}",String(e)):this._L("geo.poly_hint_none"),i=t.room_w??this.roomW,a=t.room_d??this.roomD;return K`
      ${this._numField(this._L("geo.radar_x"),"radar_x",t.radar_x,5,0,i)}
      ${this._numField(this._L("geo.radar_y"),"radar_y",t.radar_y,5,0,a)}
      ${this._numField(this._L("geo.radar_z"),"radar_z",t.radar_z,5,0,400)}
      ${this._degField(this._L("geo.yaw_rough"),"yaw",t.yaw)}
      ${this._degField(this._L("geo.pitch"),"pitch",t.pitch,-90,90)}
      ${this._degField(this._L("geo.roll"),"roll",t.roll,-90,90)}
      <p class="note">${this._L("geo.geo_note")}</p>

      <p class="sec-title" style="margin-top:14px">${this._L("geo.boundary")}</p>
      <div class="poly-bar">
        <span class="poly-hint ${e>=3?"ok":""}">${r}</span>
        <div class="poly-btns">
          <button class="pbtn" @click=${this._undo}>${this._L("geo.poly_undo")}</button>
          <button class="pbtn" @click=${this._clear}>${this._L("geo.poly_clear")}</button>
        </div>
      </div>
      <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
      
      ${K`<p class="note">${this._L("geo.boundary_note")}</p>`}
    `}static{this.styles=o`
    :host {
      display: block;
    }
    .sec-title {
      font-size: 10px;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin: 0 0 8px;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      margin-bottom: 5px;
      background: rgba(128, 128, 128, 0.06);
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      border-radius: 8px;
      transition: border-color 0.15s;
    }
    .field:focus-within {
      border-color: var(--mmwave-primary);
    }
    .field label {
      font-size: 12px;
      color: var(--secondary-text-color);
      width: 90px;
      flex-shrink: 0;
    }
    .field input {
      flex: 1;
      background: none;
      border: none;
      outline: none;
      font-size: 13px;
      font-weight: 500;
      text-align: right;
      color: var(--primary-text-color);
    }
    .field input.slider {
      accent-color: var(--mmwave-primary);
      margin: 0 8px;
    }
    .field input.num-input {
      width: 45px;
      flex: none;
    }
    .unit {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 18px;
      text-align: right;
    }
    .note {
      font-size: 10px;
      color: var(--secondary-text-color);
      line-height: 1.6;
      margin: 5px 0;
      padding: 7px 9px;
      white-space: pre-line;
      background: rgba(128, 128, 128, 0.04);
      border-left: 2px solid var(--divider-color);
      border-radius: 0 5px 5px 0;
    }
    .poly-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .poly-hint {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .poly-hint.ok {
      color: var(--success-color, #4caf50);
    }
    .poly-btns {
      display: flex;
      gap: 4px;
    }
    .pbtn {
      background: rgba(128, 128, 128, 0.1);
      border: 1px solid var(--divider-color);
      border-radius: 6px;
      padding: 3px 9px;
      font-size: 11px;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .pbtn:hover {
      background: rgba(128, 128, 128, 0.2);
    }
    canvas {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(0, 0, 0, 0.15);
      touch-action: none;
      cursor: crosshair;
    }
    }
  `}};t([pt({attribute:!1})],Qt.prototype,"adapter",void 0),t([pt({attribute:!1})],Qt.prototype,"calibration",void 0),t([pt({attribute:!1})],Qt.prototype,"lang",void 0),t([pt({type:Number})],Qt.prototype,"roomW",void 0),t([pt({type:Number})],Qt.prototype,"roomD",void 0),t([yt("#poly-cv")],Qt.prototype,"_cv",void 0),Qt=t([dt("mmwave-geo-panel")],Qt);let te=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._yw={sub:0,capturing:!1},this._rafId=0}_L(t){return Zt(t,this.lang)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}offerReading(t,e){this._yw.capturing&&(this._capture(t,e),this._yw={...this._yw,capturing:!1})}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const r=this._yw;if(0!==r.sub&&1!==r.sub)return;const i=Ut(t,e),a=Ot(i.x,i.y,this._m());0===r.sub?this._yw={...r,refA:{canvasPt:i,roomPt:a},sub:.5}:this._yw={...r,refB:{canvasPt:i,roomPt:a},sub:1.5},this.requestUpdate()}_onCapture(){this._yw={...this._yw,capturing:!0},this.dispatchEvent(new CustomEvent("capture-requested",{bubbles:!0,composed:!0}))}_capture(t,e){const r=this._yw;.5===r.sub&&r.refA?this._yw={...r,refA:{...r.refA,detPt:{x:t,y:e}},sub:1}:1.5===r.sub&&r.refB&&(this._yw={...r,refB:{...r.refB,detPt:{x:t,y:e}},sub:2},this._computeYaw())}_computeYaw(){const t=this._yw;if(!t.refA?.detPt||!t.refB?.detPt)return;const e=this._m(),r=Ot(t.refA.canvasPt.x,t.refA.canvasPt.y,e),i=Ot(t.refB.canvasPt.x,t.refB.canvasPt.y,e),a=t.refA.detPt,s=t.refB.detPt,o=function(t,e,r,i){let a=(Math.atan2(e.y-t.y,e.x-t.x)-Math.atan2(i.y-r.y,i.x-r.x))*(180/Math.PI);for(;a>180;)a-=360;for(;a<-180;)a+=360;return Math.round(10*a)/10}(r,i,a,s),n={...this.calibration,yaw:o},l=function(t,e,r,i,a){const s=Lt(r.x,r.y,0,a),o=Lt(i.x,i.y,0,a);return(Math.hypot(s.roomX-t.x,s.roomY-t.y)+Math.hypot(o.roomX-e.x,o.roomY-e.y))/2}(r,i,a,s,n);this._yw={...this._yw,residual:l},this.dispatchEvent(new CustomEvent("calibration-changed",{detail:n,bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=Ft(t,this._cssH()),r=this._m();Kt(e,r),Nt(e,this.calibration.polygon,r,!0);const i=Bt(this.calibration.radar_x,this.calibration.radar_y,r);Yt(e,i.cx,i.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.adapter.info.maxRangeM,r,this.adapter.info.vitalRangeM);const a=(t,i)=>{if(t&&(jt(e,t.canvasPt.x,t.canvasPt.y,i,"#64b5f6"),t.detPt)){const a=Lt(t.detPt.x,t.detPt.y,0,this.calibration),s=Bt(a.roomX,a.roomY,r);e.beginPath(),e.moveTo(t.canvasPt.x,t.canvasPt.y),e.lineTo(s.cx,s.cy),e.strokeStyle="rgba(244,99,99,.4)",e.lineWidth=1,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),jt(e,s.cx,s.cy,i,"rgba(244,99,99,.85)",!0)}};a(this._yw.refA,"A"),a(this._yw.refB,"B")}this._rafId=requestAnimationFrame(()=>this._loop())}_refStep(t){const e=this._yw,r=0===t?e.sub:e.sub-1,i=r>=1?"done":r>=0?"act":"",a=0===t,s=a?e.refA:e.refB;let o;if(r>=1)o=this._L(a?"yaw.ref_a_done":"yaw.ref_b_done");else if(.5===r)if(null!=s?.roomPt){const t=Math.round(s.roomPt.x),e=Math.round(s.roomPt.y),r=this._L(a?"yaw.ref_a_marked":"yaw.ref_b_marked");o=r.includes("{x}")?r.replace("{x}",String(t)).replace("{y}",String(e)):`(X=${t}, Y=${e} cm) — ${this._L(a?"yaw.ref_a_idle":"yaw.ref_b_step")}`}else o=this._L(a?"yaw.ref_a_marked":"yaw.ref_b_marked").replace("{x}","?").replace("{y}","?");else o=0===r?this._L(a?"yaw.ref_a_idle":"yaw.ref_b_step"):this._L("yaw.ref_b_idle");return K`
      <div class="ref-step ${i}">
        <div class="ref-num">${r>=1?"✓":a?"A":"B"}</div>
        <div>
          <div class="ref-title">${this._L(a?"yaw.ref_a_title":"yaw.ref_b_title")}</div>
          <div class="ref-sub">${o}</div>
        </div>
      </div>`}render(){const t=this._yw,e=.5===t.sub||1.5===t.sub,r=t.sub>=2,i=r?this._L("yaw.result_ok").replace("{yaw}",String(this.calibration.yaw)).replace("{residual}",String((t.residual??0).toFixed(1))):this._L("yaw.result_idle");return K`
      ${this._refStep(0)}
      ${this._refStep(1)}
      <canvas id="yaw-cv" @click=${this._onCanvasClick}></canvas>
      <button class="cap-btn" ?disabled=${!e||t.capturing}
        @click=${this._onCapture}>
        ${t.capturing?this._L("yaw.capture_wait"):this._L("yaw.capture_btn")}
      </button>
      <div class="result-line ${r?"ok":""}">${i}</div>
    `}static{this.styles=o`
    :host { display:block; }
    canvas {
      display:block;width:100%;border-radius:8px;
      border:1px solid var(--divider-color,rgba(128,128,128,.15));
      background:rgba(0,0,0,.15);touch-action:none;cursor:crosshair;margin:8px 0;
    }
    .ref-step {
      display:flex;align-items:center;gap:9px;padding:8px 10px;
      border-radius:8px;border:1px solid var(--divider-color);margin-bottom:5px;transition:all .22s;
    }
    .ref-step.act  { border-color:var(--mmwave-primary);background:rgba(11, 130, 92,.07); }
    .ref-step .ref-num {
      width:20px;height:20px;border-radius:10px;
      background:rgba(128,128,128,.2);color:var(--secondary-text-color);
      display:flex;align-items:center;justify-content:center;
      font-size:11px;font-weight:600; flex-shrink:0;
    }
    .ref-step.act  .ref-num { background:var(--mmwave-primary);color:#fff; }
    .ref-step .ref-txt { flex:1;font-size:12px;color:var(--secondary-text-color); }
    .ref-step.act  .ref-txt { color:var(--primary-text-color);font-weight:500; }
    .ref-step.done .ref-txt { text-decoration:line-through;opacity:.6; }
    
    .cap-btn {
      width:100%;margin-top:9px;padding:9px;
      background:rgba(11, 130, 92,.12);border:1px solid rgba(11, 130, 92,.35);
      border-radius:8px;font-size:13px;font-weight:500;
      cursor:pointer;color:var(--mmwave-primary);transition:background .15s;
    }
    .cap-btn:disabled { opacity:.4;cursor:not-allowed; }
    .cap-btn:not(:disabled):hover { background:rgba(11, 130, 92,.22); }
    .result-line {
      font-size:11px;text-align:center;min-height:15px;margin-top:5px;
      color:var(--secondary-text-color);
    }
    .result-line.ok { color:var(--success-color,#4caf50); }
  `}};t([pt({attribute:!1})],te.prototype,"adapter",void 0),t([pt({attribute:!1})],te.prototype,"calibration",void 0),t([pt({attribute:!1})],te.prototype,"lang",void 0),t([pt({type:Number})],te.prototype,"roomW",void 0),t([pt({type:Number})],te.prototype,"roomD",void 0),t([_t()],te.prototype,"_yw",void 0),t([yt("#yaw-cv")],te.prototype,"_cv",void 0),te=t([dt("mmwave-yaw-panel")],te);let ee=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.targets=[],this.present=!1,this.showStatus=!1,this._trail=[],this._rafId=0}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}willUpdate(t){t.has("targets")&&this.addTrailPoints(this.targets)}addTrailPoints(t){const e=Date.now();for(const r of t)r.room?.inBoundary&&this._trail.push({x:r.room.roomX,y:r.room.roomY,t:e});const r=e-9e4;this._trail=this._trail.filter(t=>t.t>r)}clearTrail(){this._trail=[]}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 340;const e=this.roomD/this.roomW;return Math.max(140,Math.min(340,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=Ft(t,this._cssH()),r=this._m();Kt(e,r),Nt(e,this.calibration.polygon,r);const i=Bt(this.calibration.radar_x,this.calibration.radar_y,r);if(Yt(e,i.cx,i.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.adapter.info.maxRangeM,r,this.adapter.info.vitalRangeM),this._trail.length>1){const t=Date.now();for(let i=1;i<this._trail.length;i++){const a=this._trail[i-1],s=this._trail[i],o=(t-s.t)/9e4,n=Math.max(0,.5-.5*o),l=Bt(a.x,a.y,r),d=Bt(s.x,s.y,r);e.beginPath(),e.moveTo(l.cx,l.cy),e.lineTo(d.cx,d.cy),e.strokeStyle=`rgba(255,152,0,${n})`,e.lineWidth=2,e.stroke()}}for(const t of this.targets){if(!t.room)continue;const i=Bt(t.room.roomX,t.room.roomY,r);It(e,i.cx,i.cy,t.room.inBoundary),this.adapter.info.maxTargets>1&&(e.fillStyle="rgba(255,255,255,.7)",e.font="9px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(String(t.index+1),i.cx,i.cy-14),e.textBaseline="alphabetic")}}this._rafId=requestAnimationFrame(()=>this._loop())}_L(t){return Zt(t,this.lang)}_badgeText(){if(!this.present)return this._L("live.badge_none");const t=this.targets.filter(t=>t.room?.inBoundary).length;return t>0?this._L("live.badge_present"):this._L("live.badge_filtered")}_badgeCls(){return this.present?this.targets.some(t=>t.room?.inBoundary)?"on":"filtered":""}_primaryTarget(){return this.targets.find(t=>t.room?.inBoundary)?.room}render(){return K`
      <canvas id="live-cv"></canvas>
      ${this.showStatus?K`
        <div class="status">
          <div class="badge ${this._badgeCls()}">${this._badgeText()}</div>
          ${this._primaryTarget()?K`
            <div class="coords">
              <div><span>${this._L("live.room_x")}</span><span>${Math.round(this._primaryTarget().roomX)}</span></div>
              <div><span>${this._L("live.room_y")}</span><span>${Math.round(this._primaryTarget().roomY)}</span></div>
              ${this.adapter.info.hasZAxis?K`
                <div><span>${this._L("live.room_z")}</span><span>${Math.round(this._primaryTarget().roomZ)}</span></div>
              `:""}
            </div>
          `:""}
        </div>
      `:""}
    `}static{this.styles=o`
    :host {
      display: block;
      position: relative;
    }
    .status {
      position: absolute;
      bottom: 12px;
      right: 12px;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      background: rgba(128, 128, 128, 0.4);
      backdrop-filter: blur(4px);
      width: fit-content;
    }
    .badge.on {
      background: rgba(11, 130, 92, 0.15);
      color: var(--mmwave-primary);
      border: 1px solid rgba(11, 130, 92, 0.3);
    }
    .badge.filtered { background: var(--warning-color, #ff9800); }
    
    .coords {
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      border-radius: 8px;
      padding: 6px 10px;
      color: #fff;
      font-size: 11px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: fit-content;
    }
    .coords div {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }
    .coords span:first-child { opacity: 0.7; }
    .coords span:last-child { font-weight: 600; font-family: monospace; }
    canvas {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: var(--ha-card-background, rgba(128, 128, 128, 0.05));
      touch-action: none;
    }
  `}};t([pt({attribute:!1})],ee.prototype,"adapter",void 0),t([pt({attribute:!1})],ee.prototype,"calibration",void 0),t([pt({attribute:!1})],ee.prototype,"lang",void 0),t([pt({type:Number})],ee.prototype,"roomW",void 0),t([pt({type:Number})],ee.prototype,"roomD",void 0),t([pt({attribute:!1})],ee.prototype,"targets",void 0),t([pt({type:Boolean})],ee.prototype,"present",void 0),t([pt({type:Boolean})],ee.prototype,"showStatus",void 0),t([yt("#live-cv")],ee.prototype,"_cv",void 0),ee=t([dt("mmwave-live-panel")],ee),window.customCards??=[],window.customCards.push({type:Vt,name:"MMWave Radar HA Card",description:"Multi-model mmWave radar calibration & live visualization",preview:!0,documentationURL:"https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card"}),console.info("%c MMWAVE-CARD %c v1.0.0 ","background:#03a9f4;color:#fff;font-weight:700","background:#1c1c2e;color:#03a9f4;font-weight:700");let re=class extends nt{constructor(){super(...arguments),this._tab=0,this._isCalibrating=!1,this._targets=[],this._present=!1,this._deviceLoaded=!1}setConfig(t){if(!t.radar_model)throw new Error("radar_model is required");const e=zt(t.radar_model);if(!e)throw new Error(`Unknown radar_model: "${t.radar_model}". Check src/models/index.ts.`);const r=e.validateConfig(t);if(r.length)throw new Error(r.join("; "));this._config={...gt,...t},this._adapter=e;const i=e.getDefaultCalibration(),a=this._config.room_w,s=this._config.room_d;i.radar_x=Math.round(.382*a),i.radar_y=Math.round(.382*s),this._cal=i}static async getConfigElement(){return await Promise.resolve().then(function(){return ae}),document.createElement(Jt)}static getStubConfig(){return{...gt,radar_model:"r60abd1",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z"}}getCardSize(){return 7}set hass(t){if(this._hass=t,!this._adapter||!this._config)return;this._deviceLoaded||(this._deviceLoaded=!0,this._loadFromDevice());const e=this._adapter.readFromHass(t,this._config);if(this._present=e.present,this._targets=e.targets.map(t=>({...t,room:Lt(t.rawX,t.rawY,t.rawZ,this._cal)})),this.requestUpdate(),1===this._tab&&this._yawPanel){const t=e.targets[0];t&&this._yawPanel.offerReading(t.rawX,t.rawY)}}_L(t){return Zt(t,this._hass?.language)}_gotoTab(t){this._tab=t,this._livePanel?.clearTrail(),this.requestUpdate()}_onPolygonPointAdded(t){const e=this.shadowRoot?.querySelector("#poly-cv"),r={W:e?.offsetWidth??400,H:165,roomW:this._cal?.room_w??this._config.room_w,roomD:this._cal?.room_d??this._config.room_d},i=Ot(t.detail.canvasX,t.detail.canvasY,r),a={...this._cal,polygon:[...this._cal.polygon,i]};this._cal=a,this.requestUpdate()}_onCalibrationChanged(t){let e=t.detail;const r=e.room_w??this._config.room_w,i=e.room_d??this._config.room_d;e.radar_x>r&&(e={...e,radar_x:r}),e.radar_y>i&&(e={...e,radar_y:i}),this._cal=e,this.requestUpdate()}_onCaptureRequested(){}_loadFromDevice(){if(!this._hass||!this._config)return;const t=this._config.x_entity||"";if(!t)return;const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let r="";if(e)r=e[1];else{const e=t.split(".")[1]?.split("_")||[];r=e.slice(0,e.length-1).join("_")}const i={...this._cal},a=["radar_x","radar_y","radar_z","yaw","pitch","roll"];for(const t of a){const e=this._hass.states[`number.${r}_${t}`];e&&e.state&&!isNaN(Number(e.state))&&(i[t]=Number(e.state))}const s=this._config.polygon_entity||`text.${r}_polygon_config`,o=this._hass.states[s];if(o&&o.state){const t=o.state.split(";").filter(t=>t.includes(",")).map(t=>{const[e,r]=t.split(",");return{x:parseFloat(e),y:parseFloat(r)}});t.length>0?i.polygon=t:i.polygon=[]}else o&&""===o.state&&(i.polygon=[]);const n=i.room_w??this._config.room_w,l=i.room_d??this._config.room_d;i.radar_x>n&&(i.radar_x=n),i.radar_y>l&&(i.radar_y=l),this._cal=i,this.requestUpdate()}async _sync(){const t=this._config.x_entity||"";if(!t)return void alert("Error: x_entity is not configured.");const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let r="";if(e)r=e[1];else{const e=t.split(".")[1]?.split("_")||[];r=e.slice(0,e.length-1).join("_")}const i=this.shadowRoot?.getElementById("btn-sync");i&&(i.style.opacity="0.5",i.textContent="同步中...");try{const t={radar_x:this._cal.radar_x,radar_y:this._cal.radar_y,radar_z:this._cal.radar_z,yaw:this._cal.yaw,pitch:this._cal.pitch,roll:this._cal.roll};for(const[e,i]of Object.entries(t)){const t=`number.${r}_${e}`;try{await this._hass.callService("number","set_value",{entity_id:t,value:i})}catch(e){console.warn(`Failed to sync ${t}`,e)}}const e=this._cal.polygon.map(t=>`${t.x},${t.y}`).join(";"),a=this._config.polygon_entity||`text.${r}_polygon_config`;if(void 0!==this._hass.states[a])try{await this._hass.callService("text","set_value",{entity_id:a,value:e})}catch(t){console.warn(`Failed to sync ${a}`,t)}i&&(i.textContent="同步成功！")}catch(t){i&&(i.textContent="同步失败"),console.error(t)}finally{i&&setTimeout(()=>{i.textContent="同步到设备",i.style.opacity=""},2e3)}}_reset(){if(!confirm(this._L("actions.reset_confirm")||"Reset to factory defaults?"))return;const t=this._adapter.getDefaultCalibration(),e=this._config.room_w,r=this._config.room_d;t.radar_x=Math.round(.382*e),t.radar_y=Math.round(.382*r),this._cal=t,this._gotoTab(0)}render(){if(!this._config||!this._adapter)return Y;const t=[this._L("tabs.geo"),this._L("tabs.yaw"),this._L("tabs.live")],e=this._cal.room_w??this._config.room_w,r=this._cal.room_d??this._config.room_d,i=this._hass?.language??"en";return this._isCalibrating?K`
      <ha-card>
        <div class="ha-header calib">
          <div class="ha-title">
            <ha-icon icon="mdi:arrow-left" style="cursor: pointer; color: var(--secondary-text-color);" @click=${()=>this._isCalibrating=!1}></ha-icon>
            <span style="font-size: 14px; font-weight: 600;">高级校准模式</span>
          </div>
        </div>

        <!-- Tab bar -->
        <div id="tabs">
          ${t.map((t,e)=>K`
            <button class="tab ${this._tab===e?"act":""}"
              @click=${()=>this._gotoTab(e)}>${t}</button>`)}
        </div>

        <!-- Body -->
        <div id="body"
          @calibration-changed=${this._onCalibrationChanged}
          @polygon-point-added=${this._onPolygonPointAdded}
          @capture-requested=${this._onCaptureRequested}>

          ${0===this._tab?K`
            <mmwave-geo-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${i}
              .roomW=${e}
              .roomD=${r}>
            </mmwave-geo-panel>`:Y}

          ${1===this._tab?K`
            <mmwave-yaw-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${i}
              .roomW=${e}
              .roomD=${r}>
            </mmwave-yaw-panel>`:Y}

          ${2===this._tab?K`
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${i}
              .roomW=${e}
              .roomD=${r}
              .targets=${this._targets}
              .present=${this._present}
              .showStatus=${!0}>
            </mmwave-live-panel>`:Y}
        </div>

        <!-- Footer -->
        <div id="foot">
          <div class="left-btns">
            <button class="btn-rst" @click=${this._loadFromDevice}>撤销修改</button>
            <button class="btn-rst" @click=${this._reset}>恢复出厂</button>
          </div>
          <button class="btn-sync" id="btn-sync" @click=${this._sync}>同步到设备</button>
        </div>
      </ha-card>
    `:K`
        <ha-card>
          <div class="ha-header">
            <div class="ha-title">
              <div style="opacity: ${this._present?1:.5}; display: flex; align-items: center; justify-content: center;">
                ${Gt}
              </div>
              <span>${this._config.name||"人体存在雷达"}</span>
            </div>
            <ha-icon-button icon="mdi:cog" @click=${()=>this._isCalibrating=!0}></ha-icon-button>
          </div>
          <div id="body" style="padding-top: 0;">
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${i}
              .roomW=${e}
              .roomD=${r}
              .targets=${this._targets}
              .present=${this._present}>
            </mmwave-live-panel>
          </div>
        </ha-card>
      `}static{this.styles=o`
    :host { 
      display: block;
      --mmwave-primary: #0B825C;
      --mmwave-secondary: #2C3E50;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
      border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #e0e0e0));
      overflow: hidden;
      color: var(--primary-text-color);
      font-family: var(--primary-font-family, system-ui, sans-serif);
      transition: all 0.3s ease-out;
    }
    
    /* Header styles */
    .ha-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 16px 12px 16px;
    }
    .ha-header.calib {
      padding: 4px 8px 4px 4px;
      border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.15));
      background: rgba(128, 128, 128, 0.05);
    }
    .ha-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .ha-title ha-icon {
      --mdc-icon-size: 24px;
    }

    #tabs {
      display: flex;
      border-bottom: 1px solid var(--divider-color, rgba(128,128,128,.15));
    }
    .tab {
      flex: 1; padding: 12px 6px 10px;
      font-size: 11px; font-weight: 600;
      letter-spacing: .05em; text-transform: uppercase;
      text-align: center; border: none; background: none;
      color: var(--secondary-text-color);
      cursor: pointer; position: relative; transition: color .2s;
    }
    .tab:hover {
      background: rgba(128, 128, 128, 0.05);
    }
    .tab.act { color: var(--mmwave-primary); }
    .tab.act::after {
      content: ""; position: absolute;
      bottom: 0; left: 15%; right: 15%; height: 2px;
      background: var(--mmwave-primary);
      border-radius: 2px 2px 0 0;
    }
    #body { padding: 16px; min-height: 270px; }
    #foot {
      padding: 12px 16px 16px;
      border-top: 1px solid var(--divider-color, rgba(128,128,128,.15));
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(128, 128, 128, 0.02);
    }
    .left-btns { display: flex; gap: 8px; }
    .btn-sync {
      background: var(--mmwave-primary); color: #fff;
      border: none; border-radius: 6px; padding: 8px 16px;
      font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity .15s;
    }
    .btn-sync:hover { opacity: 0.9; }
    .btn-rst {
      background: transparent;
      border: 1px solid var(--divider-color, rgba(128,128,128,.3));
      border-radius: 6px; padding: 8px 12px;
      font-size: 13px; font-weight: 500; color: var(--primary-text-color); cursor: pointer;
    }
    .btn-rst:hover { background: rgba(128, 128, 128, 0.05); }
  `}};t([_t()],re.prototype,"_config",void 0),t([_t()],re.prototype,"_adapter",void 0),t([_t()],re.prototype,"_cal",void 0),t([_t()],re.prototype,"_tab",void 0),t([_t()],re.prototype,"_isCalibrating",void 0),t([_t()],re.prototype,"_targets",void 0),t([_t()],re.prototype,"_present",void 0),t([yt("mmwave-yaw-panel")],re.prototype,"_yawPanel",void 0),t([yt("mmwave-live-panel")],re.prototype,"_livePanel",void 0),re=t([dt(Vt)],re);let ie=class extends nt{constructor(){super(...arguments),this._devices=[],this._advOpen=!1}updated(t){super.updated(t),t.has("hass")&&this.hass&&0===this._devices.length&&this._loadDevices()}async _loadDevices(){try{this._devices=await this.hass.callWS({type:"config/device_registry/list"})}catch(t){console.warn("Failed to load devices",t)}}setConfig(t){this._config={...gt,...t}}_L(t){return Zt(t,this.hass?.language)}_changed(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}async _deviceDropdownChanged(t){const e=t.target.value;if(this._changed("device_id",e),e)try{const t=(await this.hass.callWS({type:"config/entity_registry/list"})).filter(t=>t.device_id===e),r={};for(const e of t){const t=e.entity_id,i=(e.original_name||t).toLowerCase();t.startsWith("binary_sensor.")&&(i.includes("presence")||t.includes("presence"))?r.presence_entity=t:t.startsWith("sensor.")&&(i.endsWith(" x")||t.endsWith("_x")||t.endsWith("radar_x"))&&!t.includes("room_x")&&!i.includes("room x")?r.x_entity=t:t.startsWith("sensor.")&&(i.endsWith(" y")||t.endsWith("_y")||t.endsWith("radar_y"))&&!t.includes("room_y")&&!i.includes("room y")?r.y_entity=t:t.startsWith("sensor.")&&(i.endsWith(" z")||t.endsWith("_z")||t.endsWith("radar_z"))&&!t.includes("room_z")&&!i.includes("room z")?r.z_entity=t:t.startsWith("sensor.")&&(t.includes("breath")||t.includes("respiration"))?r.breath_entity=t:t.startsWith("sensor.")&&t.includes("heart")?r.heart_entity=t:t.startsWith("sensor.")&&t.includes("sleep")?r.sleep_entity=t:t.startsWith("text.")&&(t.includes("polygon")||i.toLowerCase().includes("polygon")||i.includes("多边形")||i.includes("边界"))&&(r.polygon_entity=t)}Object.keys(r).length>0&&(this._config={...this._config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}})))}catch(t){console.warn("Failed to auto-populate entities from device",t)}}render(){if(!this.hass||!this._config)return Y;const t=this._config.radar_model??"",e=zt(t),r=Object.entries(qt).map(([t,e])=>({id:t,label:e.info.displayName})).sort((t,e)=>t.label.localeCompare(e.label));return K`
      <div class="card-config">
        <!-- Basic settings -->
        <h3>基础设置 (Basic Settings)</h3>
        <div class="field">
          <label>卡片标题 (Title)</label>
          <input type="text" .value=${this._config.name??""} placeholder="人体存在雷达"
            @change=${t=>this._changed("name",t.target.value)}>
        </div>

        <!-- Model selector -->
        <h3>${this._L("editor.model")}</h3>
        <div class="field">
          <label>${this._L("editor.model")}</label>
          <select .value=${t} @change=${t=>this._changed("radar_model",t.target.value)}>
            <option value="" disabled>${this._L("editor.model")}…</option>
            ${r.map(e=>K`
              <option value=${e.id} ?selected=${e.id===t}>${e.label}</option>`)}
          </select>
        </div>

        <!-- Device selector -->
        <h3>雷达设备 (Radar Device)</h3>
        <p style="font-size:12px; color:var(--secondary-text-color); margin-top:-4px;">一键选择设备，自动匹配下方所有实体配置</p>
        <div class="field">
          <label>设备</label>
          <select .value=${this._config.device_id??""} @change=${this._deviceDropdownChanged}>
            <option value="">-- 选择设备 (Select Device) --</option>
            ${this._devices.map(t=>K`
              <option value=${t.id} ?selected=${t.id===this._config.device_id}>
                ${t.name_by_user||t.name||"Unknown Device"}
              </option>`)}
          </select>
        </div>

        <!-- Entity fields (model-specific) -->
        ${e?K`
          <details style="margin-top:16px;" ?open=${this._advOpen} @toggle=${t=>this._advOpen=t.target.open}>
            <summary style="cursor:pointer; font-size:12px; color:var(--mmwave-primary); outline:none;">
              高级选项：手动指定实体 (Advanced Entities)
            </summary>
            <div style="margin-top:10px;">
              ${e.getEntitySchema().map(t=>K`
                <div class="field">
                  <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                  <input type="text" list="entities-list"
                    .value=${this._config[t.key]??""}
                    @change=${e=>this._changed(t.key,e.target.value)}>
                </div>`)}
            </div>
          </details>`:Y}

        <datalist id="entities-list">
          ${(this.hass?Object.keys(this.hass.states):[]).map(t=>K`<option value=${t}></option>`)}
        </datalist>

        <!-- Room dimensions -->
        <h3>${this._L("editor.room_dimensions")}</h3>
        <div class="field">
          <label>${this._L("editor.room_w")}</label>
          <input type="number" .value=${String(this._config.room_w??400)} min="50" step="10"
            @change=${t=>this._changed("room_w",Number(t.target.value))}>
        </div>
        <div class="field">
          <label>${this._L("editor.room_d")}</label>
          <input type="number" .value=${String(this._config.room_d??600)} min="50" step="10"
            @change=${t=>this._changed("room_d",Number(t.target.value))}>
        </div>
      </div>`}static{this.styles=o`
    .card-config { padding: 4px 0; }
    h3 {
      font-size: 11px; font-weight: 600; letter-spacing: .06em;
      text-transform: uppercase; color: var(--secondary-text-color);
      margin: 16px 0 8px;
    }
    .field { display: flex; align-items: center; gap: 12px; margin-bottom: 7px; }
    .field label { font-size: 13px; min-width: 150px; color: var(--primary-text-color); }
    .field ha-entity-picker, .field select, .field input { flex: 1; }
    .field select, .field input {
      padding: 6px 8px; border: 1px solid var(--divider-color);
      border-radius: 6px; background: var(--card-background-color);
      color: var(--primary-text-color); font-size: 13px;
    }
  `}};t([pt({attribute:!1})],ie.prototype,"hass",void 0),t([pt({attribute:!1})],ie.prototype,"_config",void 0),t([_t()],ie.prototype,"_devices",void 0),t([_t()],ie.prototype,"_advOpen",void 0),ie=t([dt(Jt)],ie);var ae=Object.freeze({__proto__:null,get MMWaveCardEditor(){return ie}});export{re as MMWaveCard};
