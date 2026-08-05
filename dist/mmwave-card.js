function t(t,e,i,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,i,s):a(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),a=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new o(i,t,r)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,_=u.trustedTypes,y=_?_.emptyScript:"",m=u.reactiveElementPolyfillSupport,f=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&d(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);a?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,r)=>{if(i)t.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of r){const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=i.cssText,t.appendChild(r)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=r;const o=a.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,a){if(void 0!==t){const o=this.constructor;if(!1===r&&(a=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:a},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,m?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,M=$.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+R,A=`<${D}>`,C=document,E=()=>C.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,P="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,q=/>/g,L=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,K=/"/g,B=/^(?:script|style|textarea|title)$/i,O=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),U=new WeakMap,Y=C.createTreeWalker(C,129);function X(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,r=[];let a,o=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===H?"!--"===l[1]?s=F:void 0!==l[1]?s=q:void 0!==l[2]?(B.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=L):void 0!==l[3]&&(s=L):s===L?">"===l[0]?(s=a??H,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?L:'"'===l[3]?K:N):s===K||s===N?s=L:s===F||s===q?s=H:(s=L,a=void 0);const h=s===L&&t[e+1].startsWith("/>")?" ":"";o+=s===H?i+A:d>=0?(r.push(n),i.slice(0,d)+z+i.slice(d)+R+h):i+R+(-2===d?e:h)}return[X(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class V{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let a=0,o=0;const s=t.length-1,n=this.parts,[l,d]=Z(t,e);if(this.el=V.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=Y.nextNode())&&n.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(z)){const e=d[o++],i=r.getAttribute(t).split(R),s=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?rt:tt}),r.removeAttribute(t)}else t.startsWith(R)&&(n.push({type:6,index:a}),r.removeAttribute(t));if(B.test(r.tagName)){const t=r.textContent.split(R),e=t.length-1;if(e>0){r.textContent=M?M.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],E()),Y.nextNode(),n.push({type:2,index:++a});r.append(t[e],E())}}}else if(8===r.nodeType)if(r.data===D)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=r.data.indexOf(R,t+1));)n.push({type:7,index:a}),t+=R.length-1}a++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,r){if(e===I)return e;let a=void 0!==r?i._$Co?.[r]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=a:i._$Cl=a),void 0!==a&&(e=G(t,a._$AS(t,e.values),a,r)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??C).importNode(e,!0);Y.currentNode=r;let a=Y.nextNode(),o=0,s=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new at(a,this,t)),this._$AV.push(e),n=i[++s]}o!==n?.index&&(a=Y.nextNode(),o++)}return Y.currentNode=C,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),T(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==j&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=V.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new J(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new V(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const a of t)r===e.length?e.push(i=new Q(this.O(E()),this.O(E()),this,this.options)):i=e[r],i._$AI(a),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,a){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}_$AI(t,e=this,i,r){const a=this.strings;let o=!1;if(void 0===a)t=G(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const r=t;let s,n;for(t=a[0],s=0;s<a.length-1;s++)n=G(this,r[i+s],e,s),n===I&&(n=this._$AH[s]),o||=!T(n)||n!==this._$AH[s],n===j?t=j:t!==j&&(t+=(n??"")+a[s+1]),this._$AH[s]=n}o&&!r&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==j)}}class rt extends tt{constructor(t,e,i,r,a){super(t,e,i,r,a),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??j)===I)return;const i=this._$AH,r=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==j&&(i===j||r);r&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(V,Q),($.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let a=r._$litPart$;if(void 0===a){const t=i?.renderBefore??null;r._$litPart$=a=new Q(e.insertBefore(E(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,st.litElementHydrateSupport?.({LitElement:nt});const lt=st.litElementPolyfillSupport;lt?.({LitElement:nt}),(st.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},ht=(t=ct,e,i)=>{const{kind:r,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===r&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===r){const{name:r}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(r,a,t,!0,i)},init(e){return void 0!==e&&this.C(r,void 0,t,e),e}}}if("setter"===r){const{name:r}=i;return function(i){const a=this[r];e.call(this,i),this.requestUpdate(r,a,t,!0,i)}}throw Error("Unsupported decorator location: "+r)};function pt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const r=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),r?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return pt({...t,state:!0,attribute:!1})}function ut(t,e){return(e,i,r)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const _t={radar_x:0,radar_y:0,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]},yt={room_w:400,room_d:600,device_id:"",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z",polygon_entity:"text.r60abd1_polygon_config"},mt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!0,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!0,domain:"sensor"},{key:"z_entity",labelKey:"editor.z_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"},{key:"sleep_entity",labelKey:"editor.sleep_entity",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],ft={info:{id:"r60abd1",displayName:"MicRadar R60ABD1 (60 GHz)",fovDegrees:40,maxRangeM:2.5,minRangeM:.4,vitalRangeM:1.5,updateRateHz:.5,maxTargets:1,hasZAxis:!0,hasBreathing:!0,hasHeartRate:!0,hasSleep:!0},getEntitySchema:()=>mt,validateConfig(t){const e=[];for(const i of mt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=i("x_entity"),o=i("y_entity"),s=i("z_entity");if(!a||!o)return{present:!0,targets:[]};const n=parseFloat(a.state)||0,l=parseFloat(o.state)||0,d=s&&parseFloat(s.state)||0;return 0===n&&0===l&&0===d?{present:!0,targets:[]}:{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:d}]}},getDefaultCalibration:()=>({..._t,radar_z:220,pitch:0,roll:0})},bt={id:"ld2450",displayName:"Hi-Link LD2450 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},vt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function xt(t){const e=parseFloat(t.state)||0,i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const wt={info:bt,getEntitySchema:()=>vt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=bt.maxTargets;t++){const e=i(`target_${t}_x_entity`),r=i(`target_${t}_y_entity`);if(!e||!r)continue;const o=xt(e),s=xt(r);if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({..._t,radar_z:250,pitch:0,roll:0})},$t={id:"ld2452",displayName:"Hi-Link LD2452 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Mt(t){const e=parseFloat(t.state)||0,i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const St={info:$t,getEntitySchema:()=>kt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=$t.maxTargets;t++){const e=i(`target_${t}_x_entity`),r=i(`target_${t}_y_entity`);if(!e||!r)continue;const o=Mt(e),s=Mt(r);if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({..._t,radar_z:250,pitch:0,roll:0})},zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],Rt={info:{id:"rd03e",displayName:"Ai-Thinker RD03E (24 GHz)",fovDegrees:40,verticalFovDegrees:90,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>zt,validateConfig(t){const e=[];for(const i of zt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=i("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Dt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],At={info:{id:"ld2411",displayName:"Hi-Link LD2411 (24 GHz)",fovDegrees:40,verticalFovDegrees:80,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Dt,validateConfig(t){const e=[];for(const i of Dt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=i("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Ct={id:"ld2451",displayName:"Hi-Link LD2451 (24 GHz)",fovDegrees:30,verticalFovDegrees:14,maxRangeM:100,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Et=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Tt={info:Ct,getEntitySchema:()=>Et,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=Ct.maxTargets;t++){const e=i(`target_${t}_x_entity`),r=i(`target_${t}_y_entity`);if(!e||!r)continue;const o=parseFloat(e.state)||0,s=parseFloat(r.state)||0;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Wt={id:"ld2453",displayName:"Hi-Link LD2453 (24 GHz)",fovDegrees:80,verticalFovDegrees:60,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Pt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Ht={info:Wt,getEntitySchema:()=>Pt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=Wt.maxTargets;t++){const e=i(`target_${t}_x_entity`),r=i(`target_${t}_y_entity`);if(!e||!r)continue;const o=parseFloat(e.state)||0,s=parseFloat(r.state)||0;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Ft=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],qt={info:{id:"ld2410b",displayName:"Hi-Link LD2410B (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ft,validateConfig(t){const e=[];for(const i of Ft)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0};let r;const a=i("max_distance_entity");if(a&&a.state&&"unavailable"!==a.state){const t=parseFloat(a.state);!isNaN(t)&&t>0&&(r=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:r};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:r};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:r};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:r};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:r}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Lt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Nt={info:{id:"ld2410c",displayName:"Hi-Link LD2410C (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Lt,validateConfig(t){const e=[];for(const i of Lt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0};let r;const a=i("max_distance_entity");if(a&&a.state&&"unavailable"!==a.state){const t=parseFloat(a.state);!isNaN(t)&&t>0&&(r=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:r};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:r};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:r};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:r};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:r}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!1,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!1,domain:"sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"}],Bt={info:{id:"ld6002",displayName:"Hi-Link LD6002 (60 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:6,minRangeM:.4,vitalRangeM:1.5,updateRateHz:1,maxTargets:1,hasZAxis:!1,hasBreathing:!0,hasHeartRate:!0,hasSleep:!1},getEntitySchema:()=>Kt,validateConfig(t){const e=[];return t.presence_entity||e.push("Missing required entity: presence_entity"),t.distance_entity||t.x_entity&&t.y_entity||e.push("You must provide either distance_entity OR both x_entity and y_entity."),e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=i("x_entity"),o=i("y_entity"),s=i("distance_entity");let n=0,l=0;if(a&&o?(n=parseFloat(a.state)||0,l=parseFloat(o.state)||0):s&&(l=parseFloat(s.state)||0),0===n&&l<=0)return{present:!0,targets:[]};return{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:0}]}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Ot=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],It={info:{id:"ld2420",displayName:"Hi-Link LD2420 (24 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:8,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ot,validateConfig(t){const e=[];for(const i of Ot)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=i("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},jt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Ut={info:{id:"ld2450a",displayName:"Hi-Link LD2450A (24 GHz Gesture)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:2,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>jt,validateConfig(t){const e=[];for(const i of jt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=i("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0,s=o>0?o:0,n=[];return n.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:n}},getDefaultCalibration:()=>({..._t,radar_z:150,pitch:0,roll:0})},Yt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Xt={info:{id:"ld2410",displayName:"Hi-Link LD2410 (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Yt,validateConfig(t){const e=[];for(const i of Yt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0};let r;const a=i("max_distance_entity");if(a&&a.state&&"unavailable"!==a.state){const t=parseFloat(a.state);!isNaN(t)&&t>0&&(r=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:r};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:r};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:r};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:r};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:r}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})},Zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Vt={info:{id:"ld2411s",displayName:"Hi-Link LD2411S (24 GHz 1-D)",fovDegrees:45,verticalFovDegrees:20,maxRangeM:6,minRangeM:.3,updateRateHz:20,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Zt,validateConfig(t){const e=[];for(const i of Zt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=[],o=i("distance_entity");if(o&&"unavailable"!==o.state){const t=parseFloat(o.state)||0;t>0&&a.push({index:0,rawX:0,rawY:t,rawZ:0})}return{present:!0,targets:a}},getDefaultCalibration:()=>({..._t,radar_z:100,pitch:0,roll:0})},Gt={id:"ld2454",displayName:"Hi-Link LD2454 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Jt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Qt(t){const e=parseFloat(t.state)||0,i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const te={info:Gt,getEntitySchema:()=>Jt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0},r=i("presence_entity");if(!r||"unavailable"===r.state)return{present:!1,targets:[]};if(!("on"===r.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=Gt.maxTargets;t++){const e=i(`target_${t}_x_entity`),r=i(`target_${t}_y_entity`);if(!e||!r)continue;const o=Qt(e),s=Qt(r);if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({..._t,radar_z:250,pitch:0,roll:0})},ee=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],ie={r60abd1:ft,ld2450:wt,ld2452:St,rd03e:Rt,ld2411:At,ld2451:Tt,ld2453:Ht,ld2410b:qt,ld2410c:Nt,ld6002:Bt,ld2420:It,ld2450a:Ut,ld2410:Xt,ld2411s:Vt,ld2454:te,ld2412:{info:{id:"ld2412",displayName:"Hi-Link LD2412 (24 GHz)",fovDegrees:150,maxRangeM:9,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>ee,validateConfig(t){const e=[];for(const i of ee)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const r=e[i];return r?t.states[r]:void 0};let r;const a=i("max_distance_entity");if(a&&a.state&&"unavailable"!==a.state){const t=parseFloat(a.state);!isNaN(t)&&t>0&&(r=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:r};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:r};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:r};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:r};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:r}},getDefaultCalibration:()=>({..._t,radar_z:240,pitch:0,roll:0})}};function re(t){return ie[t]}function ae(){return Object.entries(ie).map(([t,e])=>({id:t,label:e.info.displayName})).sort((t,e)=>t.label.localeCompare(e.label))}function oe(t,e,i){const r=i.length;if(r<3)return!0;let a=!1;for(let o=0,s=r-1;o<r;s=o++){const r=i[o].x,n=i[o].y,l=i[s].x,d=i[s].y;n>e!=d>e&&t<(l-r)*(e-n)/(d-n)+r&&(a=!a)}return a}function se(t,e,i,r){const a=function(t,e,i){const r=Math.PI/180,a=t*r,o=e*r,s=i*r,[n,l,d,c,h,p]=[Math.sin(a),Math.cos(a),Math.sin(o),Math.cos(o),Math.sin(s),Math.cos(s)];return[[l*p+n*d*h,n*c,-l*h+n*d*p],[-n*p+l*d*h,l*c,n*h+l*d*p],[c*h,-d,c*p]]}(r.yaw,r.pitch,r.roll),o=a[0][0]*t+a[0][1]*e+a[0][2]*i,s=a[1][0]*t+a[1][1]*e+a[1][2]*i,n=a[2][0]*t+a[2][1]*e+a[2][2]*i,l=r.radar_x+o,d=r.radar_y+s;return{roomX:l,roomY:d,roomZ:r.radar_z-n,inBoundary:oe(l,d,r.polygon)}}class ne{constructor(t={}){this.tracks=new Map,this.associationGate=Math.max(t.association_gate_cm??90,10),this.mergeGate=Math.max(t.merge_gate_cm??70,10),this.ttlMs=1e3*Math.max(t.track_ttl_s??1.2,.2),this.confirmHits=Math.max(t.confirm_hits??2,1)}reset(){this.tracks.clear()}step(t,e=Date.now()){const i=new Map;for(const t of this.tracks.values()){const r=Math.min(Math.max((e-t.updated_at)/1e3,0),.5);t.x+=t.vx*r,t.y+=t.vy*r,t.updated_at=e,i.set(t.track_id,r)}const r=this.cluster(t),a=[...this.tracks.values()],o=a.length,s=r.length,n=o+s,l=Array.from({length:n},()=>Array(n).fill(0));for(let t=0;t<o;t++){const e=a[t],o=Math.hypot(e.vx,e.vy),d=this.associationGate+o*(i.get(e.track_id)??0);r.forEach((i,r)=>{const a=Math.hypot(e.x-i.x,e.y-i.y);l[t][r]=a<=d?a/d:4});for(let e=s;e<n;e++)l[t][e]=1.05}for(let t=o;t<n;t++)for(let e=0;e<s;e++)l[t][e]=1.05;const d=new Set,c=new Set;for(const[t,e]of function(t){if(!t.length||!t[0]?.length)return[];let e=t.map(t=>[...t]),i=e.length,r=e[0].length;const a=i>r;a&&(e=Array.from({length:r},(t,i)=>e.map(t=>t[i])),[i,r]=[r,i]);const o=Array(i+1).fill(0),s=Array(r+1).fill(0),n=Array(r+1).fill(0),l=Array(r+1).fill(0);for(let t=1;t<=i;t++){n[0]=t;let i=0;const a=Array(r+1).fill(Number.POSITIVE_INFINITY),d=Array(r+1).fill(!1);do{d[i]=!0;const t=n[i];let c=Number.POSITIVE_INFINITY,h=0;for(let n=1;n<=r;n++){if(d[n])continue;const r=e[t-1][n-1]-o[t]-s[n];r<a[n]&&(a[n]=r,l[n]=i),a[n]<c&&(c=a[n],h=n)}for(let t=0;t<=r;t++)d[t]?(o[n[t]]+=c,s[t]-=c):a[t]-=c;i=h}while(0!==n[i]);do{const t=l[i];n[i]=n[t],i=t}while(0!==i)}const d=n.map((t,e)=>[t-1,e-1]).filter(([t],e)=>e>0&&t>=0);return a?d.map(([t,e])=>[e,t]):d}(l)){if(t>=o||e>=s||l[t][e]>1)continue;const n=a[t];d.add(n.track_id),c.add(e);const h=r[e],p=Math.max(i.get(n.track_id)??.1,.05),g=h.x-n.x,u=h.y-n.y,_=Math.min(h.sources.length-1,3),y=.56+.06*_,m=.1+.02*_;n.x+=y*g,n.y+=y*u,n.vx+=m*g/p,n.vy+=m*u/p,n.last_seen=h.timestamp,n.sources=h.sources,n.hits+=Math.max(h.sources.length,1),n.confirmed=n.hits>=this.confirmHits,n.confidence=Math.min(1,n.confidence+.1+.08*_)}for(const t of this.tracks.values())d.has(t.track_id)||(t.sources=[],t.confidence=Math.max(0,t.confidence-.08));r.forEach((t,i)=>{if(c.has(i))return;const r=Math.max(t.sources.length,1),a={track_id:globalThis.crypto?.randomUUID?.().replaceAll("-","")??`${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`,x:t.x,y:t.y,vx:0,vy:0,confidence:Math.min(.9,.35+.18*t.sources.length),sources:t.sources,started_at:t.timestamp,last_seen:t.timestamp,updated_at:e,hits:r,confirmed:r>=this.confirmHits};this.tracks.set(a.track_id,a)});for(const[t,i]of this.tracks)e-i.last_seen>this.ttlMs&&this.tracks.delete(t);return[...this.tracks.values()].filter(t=>t.confirmed).map(({updated_at:t,hits:e,confirmed:i,...r})=>r)}cluster(t){const e=[];for(const i of[...t].sort((t,e)=>e.weight-t.weight)){let t,r=this.mergeGate;for(const a of e){if(a.sources.includes(i.radarId))continue;const e=Math.hypot(i.x-a.x,i.y-a.y);e<=r&&(t=a,r=e)}t?(t.observations.push(i),this.recalculate(t)):e.push({observations:[i],x:i.x,y:i.y,timestamp:i.timestamp,sources:[i.radarId]})}return e}recalculate(t){const e=t.observations.reduce((t,e)=>t+Math.max(e.weight,.01),0);t.x=t.observations.reduce((t,e)=>t+e.x*Math.max(e.weight,.01),0)/e,t.y=t.observations.reduce((t,e)=>t+e.y*Math.max(e.weight,.01),0)/e,t.timestamp=Math.max(...t.observations.map(t=>t.timestamp)),t.sources=[...new Set(t.observations.map(t=>t.radarId))]}}const le=t=>"number"==typeof t&&Number.isFinite(t)?t:void 0;function de(t){let e;try{e=JSON.parse(t)}catch{return}if(!e||"object"!=typeof e)return;const i=e,r=i.f,a=le(i.ts);if(1!==i.v||"number"!=typeof r&&"string"!=typeof r||null==a)return;if(!Array.isArray(i.t)||i.t.length>32)return;const o=[];for(const t of i.t){let e,i,r,a=0;if(Array.isArray(t)&&t.length>=2&&t.length<=4)e=le(t[0]),i=le(t[1]),3===t.length&&(r=le(t[2])),4===t.length&&(a=le(t[2])??Number.NaN,r=le(t[3]));else{if(!t||"object"!=typeof t)return;{const o=t;e=le(o.x),i=le(o.y),a=null==o.z?0:le(o.z)??Number.NaN,r=null==o.speed?void 0:le(o.speed)}}if(null==e||null==i||!Number.isFinite(a)||Math.max(Math.abs(e),Math.abs(i),Math.abs(a))>1e5)return;0===e&&0===i&&0===a||o.push({x:e,y:i,z:a,speed:null==r?void 0:Math.abs(r)})}return{frameId:String(r),sourceTimestamp:a,targets:o}}const ce=(t,e,i)=>({cx:t/i.roomW*i.W,cy:e/i.roomD*i.H}),he=(t,e,i)=>({x:t/i.W*i.roomW,y:e/i.H*i.roomD});function pe(t,e){const i=e.getBoundingClientRect(),r="touches"in t?t.touches[0].clientX:t.clientX,a="touches"in t?t.touches[0].clientY:t.clientY;return{x:r-i.left,y:a-i.top}}function ge(t,e){const i=window.devicePixelRatio||1,r=t.offsetWidth||400;t.width=r*i,t.height=e*i,t.style.height=`${e}px`;const a=t.getContext("2d");return a.scale(i,i),a}function ue(t,e){t.clearRect(0,0,e.W,e.H),t.strokeStyle="rgba(128,128,128,.06)",t.lineWidth=.5;for(let i=0;i<e.W;i+=40)t.beginPath(),t.moveTo(i,0),t.lineTo(i,e.H),t.stroke();for(let i=0;i<e.H;i+=40)t.beginPath(),t.moveTo(0,i),t.lineTo(e.W,i),t.stroke();t.strokeStyle="rgba(255,255,255,.15)",t.lineWidth=1.5,t.strokeRect(1,1,e.W-2,e.H-2);const i=100*Math.round(e.roomW/4/100)||100,r=i/e.roomW*e.W,a=e.H-10,o=e.W-r-8;t.beginPath(),t.moveTo(o,a),t.lineTo(o+r,a),t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.moveTo(o,a-3),t.lineTo(o,a+3),t.moveTo(o+r,a-3),t.lineTo(o+r,a+3),t.stroke(),t.fillStyle="rgba(255,255,255,.45)",t.font="9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillText(`${i}cm`,o+r/2,a-3),t.font="bold 9px system-ui",t.fillStyle="rgba(11,130,92,.6)",t.textAlign="right",t.textBaseline="top",t.fillText("X →",e.W-4,4),t.textAlign="left",t.textBaseline="bottom",t.fillText("Y ↓",4,e.H-4),t.textAlign="left",t.textBaseline="top",t.fillStyle="rgba(255,255,255,.3)",t.fillText("0",4,4),t.textBaseline="alphabetic"}function _e(t,e,i,r=!1){if(e.length<2)return;const a=e.map(t=>ce(t.x,t.y,i));t.beginPath(),a.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.fillStyle=r?"rgba(11,130,92,.04)":"rgba(11,130,92,.07)",t.fill()),t.strokeStyle=r?"rgba(11,130,92,.22)":"rgba(11,130,92,.55)",t.lineWidth=1.5,t.stroke(),r||a.forEach(e=>{t.beginPath(),t.arc(e.cx,e.cy,3,0,2*Math.PI),t.fillStyle="rgba(11,130,92,.8)",t.fill()})}function ye(t,e,i,r,a,o,s,n,l,d){const c=Math.sqrt(l.W/l.roomW*(l.H/l.roomD)),h=t=>Math.max(100*t*c,1),p=o/2*(Math.PI/180),g=Math.PI/2+r*(Math.PI/180),u=Math.max(.05,Math.cos(a*(Math.PI/180))),_=h(s*u),y=h(n*u),m=(r,a,o,s,n=1.2)=>{const l=e+a*Math.cos(g-p),d=i+a*Math.sin(g-p);t.beginPath(),t.moveTo(l,d),t.arc(e,i,a,g-p,g+p,!1),t.arc(e,i,r,g+p,g-p,!0),t.closePath(),t.fillStyle=o,t.fill("evenodd"),t.strokeStyle=s,t.lineWidth=n,t.stroke()};if(null!=d&&d>s&&d<n){const r=h(d*u),a=t.createRadialGradient(e,i,r,e,i,y);a.addColorStop(0,"rgba(11,130,92,.35)"),a.addColorStop(1,"rgba(11,130,92,.08)"),m(r,y,a,"rgba(11,130,92,.60)");const o=t.createRadialGradient(e,i,_,e,i,r);o.addColorStop(0,"rgba(11,130,92,.60)"),o.addColorStop(1,"rgba(11,130,92,.25)"),m(_,r,o,"rgba(11,130,92,.90)",1.5)}else{const r=t.createRadialGradient(e,i,_,e,i,y);r.addColorStop(0,"rgba(11,130,92,.50)"),r.addColorStop(1,"rgba(11,130,92,.12)"),m(_,y,r,"rgba(11,130,92,.75)",1.5)}if(o>0){let r=1;r=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let a=r;a<=n;a+=r){if(a<=s)continue;const r=h(a*u);t.beginPath(),t.arc(e,i,r,g-p,g+p,!1),t.strokeStyle="rgba(255, 255, 255, 0.18)",t.lineWidth=.8,t.setLineDash([3,4]),t.stroke(),t.setLineDash([])}const a=o>=90?15:o>=40?10:15,l=o/2;for(let r=-l;r<=l;r+=a){const a=g+r*(Math.PI/180),o=e+_*Math.cos(a),s=i+_*Math.sin(a),n=e+y*Math.cos(a),l=i+y*Math.sin(a);if(t.beginPath(),t.moveTo(o,s),t.lineTo(n,l),t.strokeStyle=0===r?"rgba(11, 200, 140, 0.5)":"rgba(255, 255, 255, 0.18)",t.lineWidth=0===r?1.2:.8,0!==r&&t.setLineDash([3,4]),t.stroke(),t.setLineDash([]),0!==r){const o=e+(y+14)*Math.cos(a),s=i+(y+14)*Math.sin(a);t.font="bold 9px system-ui",t.fillStyle="rgba(255, 255, 255, 0.85)",t.textAlign="center",t.textBaseline="middle",t.fillText(`${r>0?"+":""}${r}°`,o,s),t.textBaseline="alphabetic"}}}t.beginPath(),t.moveTo(e,i),t.arc(e,i,_,g-p,g+p,!1),t.closePath(),t.fillStyle="rgba(0,0,0,.50)",t.fill(),t.beginPath(),t.arc(e,i,_,g-p,g+p,!1),t.strokeStyle="rgba(244,99,99,.80)",t.lineWidth=1.5,t.setLineDash([3,3]),t.stroke(),t.setLineDash([]);const f=(r,a,o)=>{const s=e+a*Math.cos(g),n=i+a*Math.sin(g),l=`${r}m`;t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle";const d=t.measureText(l).width;t.fillStyle="rgba(10,10,24,.82)",t.beginPath(),t.roundRect?.(s-d/2-3,n-7,d+6,14,3),t.fill(),t.fillStyle=o,t.fillText(l,s,n)};if(o>0){let t=1;t=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let e=t;e<=n;e+=t){if(e<=s)continue;const t=h(e*u),i=Math.abs(e-n)<.01,r=null!=d&&Math.abs(e-d)<.01,a=i?"rgba(27,159,117,.95)":r?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";f(Number(e.toFixed(1)),t,a)}}else{const r=e+_*Math.cos(g),a=i+_*Math.sin(g),o=e+y*Math.cos(g),l=i+y*Math.sin(g);t.beginPath(),t.moveTo(r,a),t.lineTo(o,l),t.strokeStyle="rgba(11, 200, 140, 0.65)",t.lineWidth=1.5,t.setLineDash([4,4]),t.stroke(),t.setLineDash([]);let c=1;c=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let t=c;t<=n;t+=c){if(t<=s)continue;const e=h(t*u),i=Math.abs(t-n)<.01,r=null!=d&&Math.abs(t-d)<.01,a=i?"rgba(27,159,117,.95)":r?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";f(Number(t.toFixed(1)),e,a)}}t.textBaseline="alphabetic",t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.fillStyle="rgba(10,10,24,.92)",t.fill(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=1.5,t.stroke();for(const[r,a]of[[7,0],[-7,0],[0,7],[0,-7]])t.beginPath(),t.moveTo(e+.3*r,i+.3*a),t.lineTo(e+r,i+a),t.strokeStyle="rgba(11,130,92,.7)",t.lineWidth=1.2,t.stroke()}function me(t,e,i,r,a="#ff9800"){r?(t.save(),t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.fillStyle=a,t.globalAlpha=.25,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,5,0,2*Math.PI),t.fillStyle=a,t.fill(),t.strokeStyle="rgba(255,255,255,.6)",t.lineWidth=1.5,t.stroke()):(t.save(),t.setLineDash([2,2]),t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.strokeStyle=a,t.globalAlpha=.5,t.lineWidth=1.5,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(e,i,4,0,2*Math.PI),t.globalAlpha=.8,t.lineWidth=1.5,t.stroke(),t.restore())}function fe(t,e,i,r,a,o,s,n,l){const d=Math.sqrt(n.W/n.roomW*(n.H/n.roomD)),c=Math.max(.05,Math.cos(a*(Math.PI/180))),h=(p=s*c,Math.max(100*p*d,1));var p;const g=o/2*(Math.PI/180),u=Math.PI/2+r*(Math.PI/180);if(l){t.beginPath(),t.arc(e,i,h,u-g,u+g,!1),t.strokeStyle="rgba(255,152,0,.35)",t.lineWidth=6,t.lineCap="round",t.stroke(),t.beginPath(),t.arc(e,i,h,u-g,u+g,!1),t.strokeStyle="var(--accent-color,#ff9800)",t.lineWidth=2.5,t.lineCap="round",t.stroke();const r=e+h*Math.cos(u),a=i+h*Math.sin(u);t.beginPath(),t.arc(r,a,7,0,2*Math.PI),t.fillStyle="rgba(255,152,0,.3)",t.fill(),t.beginPath(),t.arc(r,a,4,0,2*Math.PI),t.fillStyle="var(--accent-color,#ff9800)",t.fill(),t.strokeStyle="rgba(255,255,255,.8)",t.lineWidth=1.2,t.stroke()}else{t.setLineDash([4,4]),t.beginPath(),t.arc(e,i,h,u-g,u+g,!1),t.strokeStyle="rgba(244,67,54,.65)",t.lineWidth=2,t.lineCap="round",t.stroke(),t.setLineDash([]);const r=e+h*Math.cos(u),a=i+h*Math.sin(u);t.beginPath(),t.arc(r,a,4,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.8)",t.lineWidth=1.5,t.stroke()}t.lineCap="butt"}function be(t,e,i,r,a,o=!1){t.beginPath(),t.arc(e,i,7,0,2*Math.PI),o?(t.strokeStyle=a,t.lineWidth=1.8,t.stroke()):(t.fillStyle=a,t.fill(),t.strokeStyle="rgba(255,255,255,.5)",t.lineWidth=1.2,t.stroke()),t.fillStyle=o?a:"#fff",t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(r,e,i),t.textBaseline="alphabetic"}const ve={en:{card_name:"MMWave Radar HA Card",tabs:{geo:"① Geometry & Boundary",yaw:"② Yaw Calibration",live:"③ Live View"},geo:{install_params:"Installation Parameters (measure with tape)",radar_x:"Radar X",radar_y:"Radar Y",radar_z:"Height",yaw_rough:"Rough Yaw",pitch:"Pitch",roll:"Roll",geo_note:"Origin: top-left corner. X → right. Y ↓ down (toward foot of bed).\nYaw = angle of radar forward axis from Y-axis, clockwise positive.\nPitch/Roll: 0 for horizontal mount; enter tilt angle or read from IMU.",boundary:"Room Boundary (optional)",poly_hint_none:"Click canvas to draw boundary (≥ 3 points)",poly_hint_ok:"Boundary active — {n} vertices",poly_undo:"Undo",poly_clear:"Clear",boundary_note:"No boundary = no filtering. Targets outside the polygon are ignored."},yaw:{ref_a_title:"Reference Point A",ref_b_title:"Reference Point B",ref_a_idle:"Click the preview to mark a known position",ref_a_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_a_done:"Captured",ref_b_idle:"Complete point A first",ref_b_step:"Click another known position (> 80 cm from A)",ref_b_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_b_done:"Captured",capture_btn:"Walk to marked position → Capture radar reading",capture_wait:"Waiting for radar data…",result_idle:"Click the preview map to start — mark reference point A",result_ok:"Yaw {yaw}° · Residual {residual} cm"},live:{title:"Room Top-Down View",badge_none:"No presence",badge_present:"Present",badge_filtered:"Outside boundary",model:"Model",ld2450:"HLK-LD2450 (2-D 120° 8m)",ld2454:"HLK-LD2454 (2-D 120° 8m)",rd03e:"RD03E (1-D 8m)",room_x:"Room X (cm)",room_y:"Room Y (cm)",room_z:"Height (cm)",targets:"Targets"},actions:{save:"Save",saved:"Saved ✓",reset:"Reset",reset_confirm:"Clear all calibration data?"},editor:{model:"Radar model",entities:"Entities",presence_entity:"Presence entity",distance_entity:"Distance entity",motion_state_entity:"Motion state entity (optional)",target_state_entity:"Target state entity (optional)",x_entity:"X coordinate entity",y_entity:"Y coordinate entity",z_entity:"Z coordinate entity (optional)",breath_entity:"Breath Entity (Optional)",heart_entity:"Heart Rate Entity (Optional)",sleep_entity:"Sleep State Entity (Optional)",polygon_entity:"Polygon Sync Entity (Optional)",target_frame:"Atomic Target Frame (Optional)",target_1_x:"Target 1 X Entity",target_1_y:"Target 1 Y Entity",target_1_speed:"Target 1 Speed Entity (Optional)",target_2_x:"Target 2 X Entity (Optional)",target_2_y:"Target 2 Y Entity (Optional)",target_2_speed:"Target 2 Speed Entity (Optional)",target_3_x:"Target 3 X Entity (Optional)",target_3_y:"Target 3 Y Entity (Optional)",target_3_speed:"Target 3 Speed Entity (Optional)",room_dimensions:"Room Dimensions",room_w:"Room width (cm)",room_d:"Room depth (cm)"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)"},"zh-Hans":{card_name:"毫米波雷达校准卡片",tabs:{geo:"① 几何 & 边界",yaw:"② 偏航校准",live:"③ 实时验证"},geo:{install_params:"安装参数（卷尺测量后填入）",radar_x:"雷达 X",radar_y:"雷达 Y",radar_z:"安装高度",yaw_rough:"粗略偏航",pitch:"俯仰角",roll:"横滚角",geo_note:"坐标原点为预览图左上角，X 向右，Y 向下（从床头到床尾方向为正）。\n偏航角 = 雷达正前方相对 Y 轴（向下）的夹角，顺时针为正。\nPitch/Roll：水平安装填 0；有倾斜时填实测值或接入 IMU 传感器后自动读取。",boundary:"房间边界过滤（可选）",poly_hint_none:"点击画布添加顶点，绘制有效区域（≥ 3 个点）",poly_hint_ok:"边界过滤已启用 — {n} 个顶点",poly_undo:"撤销",poly_clear:"清除",boundary_note:"不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。"},yaw:{ref_a_title:"参考点 A",ref_b_title:"参考点 B",ref_a_idle:"在预览图上点击一个你能走到的已知位置",ref_a_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_a_done:"捕获完成",ref_b_idle:"完成 A 点后操作",ref_b_step:"点击另一个已知位置（与 A 距离 > 80 cm）",ref_b_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_b_done:"捕获完成",capture_btn:"走到标记位置后 → 点此捕获雷达读数",capture_wait:"等待雷达数据…",result_idle:"在预览图上点击参考点 A 开始校准",result_ok:"偏航角 {yaw}° · 残差 {residual} cm"},live:{title:"房间俯视图",badge_none:"无人",badge_present:"有人",badge_filtered:"边界外",model:"雷达型号",ld2450:"HLK-LD2450 (二维 120° 8米)",ld2454:"HLK-LD2454 (二维 120° 8米)",rd03e:"RD03E (一维 8米)",room_x:"房间 X (cm)",room_y:"房间 Y (cm)",room_z:"离地高度 (cm)",targets:"目标数"},actions:{save:"保存",saved:"已保存 ✓",reset:"重置",reset_confirm:"清除所有校准数据？"},editor:{model:"雷达型号",entities:"实体配置",presence_entity:"存在感知实体",distance_entity:"距离实体",motion_state_entity:"运动状态实体（可选）",target_state_entity:"目标状态实体（可选）",x_entity:"X 坐标实体",y_entity:"Y 坐标实体",z_entity:"Z 坐标实体（可选）",breath_entity:"呼吸频率实体（可选）",heart_entity:"心率实体（可选）",sleep_entity:"睡眠状态实体（可选）",polygon_entity:"多边形同步实体（可选）",target_frame:"原子目标帧实体（可选）",target_1_x:"目标 1 X 实体",target_1_y:"目标 1 Y 实体",target_1_speed:"目标 1 速度实体（可选）",target_2_x:"目标 2 X 实体（可选）",target_2_y:"目标 2 Y 实体（可选）",target_2_speed:"目标 2 速度实体（可选）",target_3_x:"目标 3 X 实体（可选）",target_3_y:"目标 3 Y 实体（可选）",target_3_speed:"目标 3 速度实体（可选）",room_dimensions:"房间尺寸",room_w:"房间宽度 (cm)",room_d:"房间深度 (cm)"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)"}};function xe(t,e){const i=e??navigator.language?.split("-")[0]??"en",r=ve[e??""]??Object.entries(ve).find(([t])=>t.startsWith(i))?.[1]??ve.en;let a=r;for(const e of t.split("."))if(a=a?.[e],void 0===a)break;return"string"==typeof a?a:t}const we=O`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
    <defs>
      <!-- 手绘炭笔滤镜：在网页上实时渲染出粉笔/炭笔的颗粒感和毛边 -->
      <filter id="charcoal" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />
        <feGaussianBlur in="displaced" stdDeviation="0.6" result="blurred" />
        <feMerge>
          <feMergeNode in="blurred" />
          <feMergeNode in="SourceGraphic" opacity="0.5" />
        </feMerge>
      </filter>
    </defs>

    <g filter="url(#charcoal)" stroke-linecap="round" stroke-linejoin="round">
      <!-- 中心雷达盒子 (深灰色实心方块) -->
      <rect x="206" y="211" width="100" height="90" rx="25" fill="var(--mmwave-secondary)" />

      <!-- 中心雷达眼 (翠绿色圆点) -->
      <circle cx="256" cy="256" r="20" fill="var(--mmwave-primary)" />

      <!-- 顶部两根天线 -->
      <g stroke="var(--mmwave-secondary)" stroke-width="12" fill="none">
        <line x1="231" y1="211" x2="176" y2="136" />
        <line x1="281" y1="211" x2="336" y2="136" />
      </g>

      <!-- Ring 1: 内圈深灰色 -->
      <circle cx="256" cy="256" r="95" fill="none" stroke="var(--mmwave-secondary)" stroke-width="12" />

      <!-- Ring 2: 粗体翠绿色 -->
      <circle cx="256" cy="256" r="140" fill="none" stroke="var(--mmwave-primary)" stroke-width="16" />

      <!-- Ring 3: 外圈深灰色 -->
      <circle cx="256" cy="256" r="185" fill="none" stroke="var(--mmwave-secondary)" stroke-width="10" />

      <!-- Ring 4: 最外圈翠绿色虚线 -->
      <circle
        cx="256"
        cy="256"
        r="230"
        fill="none"
        stroke="var(--mmwave-primary)"
        stroke-width="8"
        stroke-dasharray="144.5 144.5"
        transform="rotate(-90 256 256)"
      />
    </g>
  </svg>
`,$e="mmwave-card",ke="mmwave-card-editor",Me=9e4,Se={position:"#03a9f4",height:"#00a878",yaw:"#ff9800",pitch:"#7e57c2",roll:"#ec407a"},ze=(t,e,i)=>Math.min(i,Math.max(e,t)),Re=t=>t*Math.PI/180,De=(t,e)=>Math.round(t/e)*e;let Ae=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._handles=new Map,this._drawRaf=0}get _isZh(){return this.lang.toLowerCase().startsWith("zh")}_label(t,e){return this._isZh?t:e}get _verticalFovDegrees(){return this.adapter?.info.verticalFovDegrees??Math.min(this.adapter?.info.fovDegrees??60,60)}get _isVerticalFovEstimated(){return null==this.adapter?.info.verticalFovDegrees}firstUpdated(){this._cv&&(this._resizeObserver=new ResizeObserver(()=>this._scheduleDraw()),this._resizeObserver.observe(this._cv)),this._scheduleDraw()}updated(){this._scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),cancelAnimationFrame(this._drawRaf)}_scheduleDraw(){cancelAnimationFrame(this._drawRaf),this._drawRaf=requestAnimationFrame(()=>this._draw())}_scene(){const t=this._cv?.offsetWidth||420,e=ze(Math.round(.7*t),260,330);return{W:t,H:e,floorW:Math.max(180,t-72),floorH:Math.min(104,.32*e),floorTop:.48*e,verticalH:.36*e,roomW:this.calibration?.room_w??this.roomW,roomD:this.calibration?.room_d??this.roomD,zMax:400}}_project(t,e){const i=t.x/e.roomW,r=t.y/e.roomD,a=t.z/e.zMax;return{x:e.W/2+(i-r)*(e.floorW/2),y:e.floorTop+(i+r)*(e.floorH/2)-a*e.verticalH}}_unproject(t,e,i){const r=(t.x-i.W/2)/(i.floorW/2),a=(t.y+e/i.zMax*i.verticalH-i.floorTop)/(i.floorH/2);return{x:(r+a)/2*i.roomW,y:(a-r)/2*i.roomD}}_polygon(t,e){t.beginPath(),e.forEach((e,i)=>0===i?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)),t.closePath()}_line(t,e,i){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.stroke()}_drawHandle(t,e,i,r){this._handles.set(e,i),t.save(),t.shadowColor=Se[e],t.shadowBlur=this._drag?.mode===e?14:7,t.beginPath(),t.arc(i.x,i.y,this._drag?.mode===e?9:7,0,2*Math.PI),t.fillStyle=Se[e],t.fill(),t.shadowBlur=0,t.strokeStyle="#fff",t.lineWidth=1.5,t.stroke(),t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillStyle=Se[e],t.fillText(r,i.x,i.y-11),t.restore()}_draw(){const t=this._cv;if(!t||!this.calibration||0===t.offsetWidth)return;const e=this._scene(),i=ge(t,e.H),r=getComputedStyle(this),a=r.getPropertyValue("--primary-text-color").trim()||"#374151",o=r.getPropertyValue("--secondary-text-color").trim()||"#6b7280",s=this.calibration,n=[this._project({x:0,y:0,z:0},e),this._project({x:e.roomW,y:0,z:0},e),this._project({x:e.roomW,y:e.roomD,z:0},e),this._project({x:0,y:e.roomD,z:0},e)],l=[this._project({x:0,y:0,z:e.zMax},e),this._project({x:e.roomW,y:0,z:e.zMax},e)];i.clearRect(0,0,e.W,e.H),this._handles.clear(),i.save(),this._polygon(i,[n[0],n[1],l[1],l[0]]),i.fillStyle="rgba(3,169,244,.035)",i.fill(),this._polygon(i,[n[0],n[3],this._project({x:0,y:e.roomD,z:e.zMax},e),l[0]]),i.fillStyle="rgba(11,130,92,.035)",i.fill(),i.restore(),this._polygon(i,n),i.fillStyle="rgba(11,130,92,.09)",i.fill(),i.strokeStyle="rgba(11,130,92,.55)",i.lineWidth=1.4,i.stroke(),i.save(),i.strokeStyle=o,i.globalAlpha=.14,i.lineWidth=.8;for(let t=.25;t<1;t+=.25)this._line(i,this._project({x:e.roomW*t,y:0,z:0},e),this._project({x:e.roomW*t,y:e.roomD,z:0},e)),this._line(i,this._project({x:0,y:e.roomD*t,z:0},e),this._project({x:e.roomW,y:e.roomD*t,z:0},e));i.restore(),i.save(),i.strokeStyle=o,i.globalAlpha=.25,i.setLineDash([3,4]);for(const t of[{x:0,y:0},{x:e.roomW,y:0},{x:0,y:e.roomD}])this._line(i,this._project({...t,z:0},e),this._project({...t,z:e.zMax},e));i.restore(),i.font="bold 10px system-ui",i.fillStyle=o,i.fillText("X",n[1].x+8,n[1].y+2),i.fillText("Y",n[3].x-14,n[3].y+2),i.fillText("Z",l[0].x-13,l[0].y-2);const d=this._project({x:s.radar_x,y:s.radar_y,z:0},e),c=this._project({x:s.radar_x,y:s.radar_y,z:s.radar_z},e),h=Re(s.yaw),p=Re(s.pitch),g=Re(s.roll),u=Math.sin(h)*Math.cos(p),_=Math.cos(h)*Math.cos(p),y=-Math.sin(p),m=Math.cos(h),f=-Math.sin(h),b=0,v=-Math.sin(h)*Math.sin(p),x=-Math.cos(h)*Math.sin(p),w=-Math.cos(p),$=m*Math.cos(g)+v*Math.sin(g),k=f*Math.cos(g)+x*Math.sin(g),M=b*Math.cos(g)+w*Math.sin(g),S=v*Math.cos(g)-m*Math.sin(g),z=x*Math.cos(g)-f*Math.sin(g),R=w*Math.cos(g)-b*Math.sin(g);i.save(),i.strokeStyle=Se.height,i.globalAlpha=.55,i.setLineDash([4,4]),i.lineWidth=1.5,this._line(i,d,c),i.restore(),i.save(),i.translate(d.x,d.y),i.scale(1,.42),i.beginPath(),i.arc(0,0,12,0,2*Math.PI),i.fillStyle="rgba(3,169,244,.14)",i.fill(),i.restore();const D=this.maxRangeM??this.adapter?.info.maxRangeM??3,A=Math.min(100*D,.58*Math.max(e.roomW,e.roomD)),C=Re((this.adapter?.info.fovDegrees??60)/2),E=Re(this._verticalFovDegrees/2),T=(t,i,r=A)=>{const a=Math.cos(i),o=u*Math.cos(t)*a+$*Math.sin(t)*a+S*Math.sin(i),n=_*Math.cos(t)*a+k*Math.sin(t)*a+z*Math.sin(i),l=y*Math.cos(t)*a+M*Math.sin(t)*a+R*Math.sin(i);return this._project({x:s.radar_x+o*r,y:s.radar_y+n*r,z:ze(s.radar_z+l*r,0,e.zMax)},e)},W=t=>Array.from({length:19},(e,i)=>T(i/18*C*2-C,t)),P=t=>Array.from({length:9},(e,i)=>T(t,i/8*E*2-E)),H=W(-E),F=W(0),q=W(E),L=P(-C),N=P(C);i.save(),this._polygon(i,[c,...H]),i.fillStyle="rgba(3,169,244,.055)",i.fill(),this._polygon(i,[c,...q]),i.fillStyle="rgba(11,130,92,.055)",i.fill(),this._polygon(i,[c,...L]),i.fillStyle="rgba(3,169,244,.04)",i.fill(),this._polygon(i,[c,...N]),i.fill(),i.strokeStyle="rgba(3,169,244,.25)",i.lineWidth=.8;for(let t=0;t<=18;t+=3)this._line(i,H[t],q[t]);for(const t of[H,q,L,N])i.beginPath(),t.forEach((t,e)=>0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)),i.stroke();this._polygon(i,[c,...F]),i.fillStyle="rgba(11,130,92,.16)",i.fill(),i.strokeStyle="rgba(11,130,92,.72)",i.lineWidth=1.25,i.stroke();const K=this.adapter?.info.minRangeM??0;if(K>0&&D>0){const t=A*Math.min(K/D,.8),e=Array.from({length:19},(e,i)=>T(i/18*C*2-C,0,t));i.beginPath(),e.forEach((t,e)=>0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)),i.setLineDash([3,3]),i.strokeStyle="rgba(11,130,92,.48)",i.stroke(),i.setLineDash([])}i.restore();const B=(t,i)=>this._project({x:s.radar_x+$*t+S*i,y:s.radar_y+k*t+z*i,z:s.radar_z+M*t+R*i},e),O=[B(-22,-10),B(22,-10),B(22,10),B(-22,10)];this._polygon(i,O),i.fillStyle="#13212b",i.fill(),i.strokeStyle="#6ee7c1",i.lineWidth=1.5,i.stroke(),i.beginPath(),i.arc(c.x,c.y,4,0,2*Math.PI),i.fillStyle="#0b825c",i.fill();const I=.18*Math.min(e.roomW,e.roomD),j=t=>({x:ze(t.x,18,e.W-18),y:ze(t.y,52,e.H-18)}),U=j(this._project({x:s.radar_x+Math.sin(h)*I,y:s.radar_y+Math.cos(h)*I,z:s.radar_z},e));i.strokeStyle=Se.yaw,i.lineWidth=2,this._line(i,c,U);const Y=j({x:c.x-28,y:c.y});i.strokeStyle=Se.height,i.lineWidth=1,this._line(i,{x:Y.x+8,y:Y.y},c);const X=j({x:U.x,y:U.y-30-s.pitch/90*20});i.strokeStyle=Se.pitch,i.setLineDash([2,3]),this._line(i,U,X),i.setLineDash([]);const Z=B(38,0),V=j({x:Z.x+s.roll/90*10,y:Z.y});this._drawHandle(i,"position",d,"XY"),this._drawHandle(i,"height",Y,"Z"),this._drawHandle(i,"yaw",U,this._label("偏航","Yaw")),this._drawHandle(i,"pitch",X,this._label("俯仰","Pitch")),this._drawHandle(i,"roll",V,this._label("横滚","Roll")),i.save(),i.fillStyle=a,i.globalAlpha=.72,i.font="10px system-ui",i.textAlign="right",i.fillText(`${Math.round(e.roomW)} × ${Math.round(e.roomD)} cm`,e.W-10,e.H-10),i.restore()}_hitTest(t){let e;for(const[i,r]of this._handles){const a=Math.hypot(t.x-r.x,t.y-r.y);a<=18&&(!e||a<e.distance)&&(e={mode:i,distance:a})}return e?.mode}_onPointerDown(t){const e=this._cv;if(!e)return;const i=pe(t,e),r=this._hitTest(i);if(!r)return;t.preventDefault(),e.setPointerCapture(t.pointerId);const a="height"===r?this.calibration.radar_z:"yaw"===r?this.calibration.yaw:"pitch"===r?this.calibration.pitch:"roll"===r?this.calibration.roll:0;this._drag={mode:r,startX:i.x,startY:i.y,startValue:a},this._scheduleDraw()}_onPointerMove(t){const e=this._cv;if(!e)return;const i=pe(t,e);if(!this._drag)return void(e.style.cursor=this._hitTest(i)?"grab":"default");t.preventDefault();const r=this._scene(),a=this._drag;if("position"===a.mode){const t=this._unproject(i,0,r);this._emit({radar_x:De(ze(t.x,0,r.roomW),1),radar_y:De(ze(t.y,0,r.roomD),1)})}else if("height"===a.mode){const t=a.startValue-(i.y-a.startY)/r.verticalH*r.zMax;this._emit({radar_z:De(ze(t,0,r.zMax),1)})}else if("yaw"===a.mode){const t=this._unproject(i,this.calibration.radar_z,r),e=180*Math.atan2(t.x-this.calibration.radar_x,t.y-this.calibration.radar_y)/Math.PI;this._emit({yaw:De(e,.5)})}else if("pitch"===a.mode){const t=a.startValue-.6*(i.y-a.startY);this._emit({pitch:De(ze(t,-90,90),.5)})}else{const t=a.startValue+.6*(i.x-a.startX);this._emit({roll:De(ze(t,-90,90),.5)})}}_onPointerUp(t){const e=this._cv;e?.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._drag=void 0,this._scheduleDraw()}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}render(){if(!this.calibration)return O``;const t=this.calibration;return O`
      <div class="scene-shell">
        <canvas
          id="installation-cv"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        ></canvas>
        <div class="values">
          <span>X ${Math.round(t.radar_x)}</span>
          <span>Y ${Math.round(t.radar_y)}</span>
          <span>Z ${Math.round(t.radar_z)} cm</span>
          <span
            >${Math.round(10*t.yaw)/10}° / ${Math.round(10*t.pitch)/10}° /
            ${Math.round(10*t.roll)/10}°</span
          >
          <span
            class="coverage"
            title=${this._isVerticalFovEstimated?this._label("说明书未标注垂直视场角，当前为保守示意值","Vertical FOV is not specified; showing a conservative estimate"):this._label("型号说明书标称扫描范围","Nominal scan volume from the model manual")}
          >
            ${this._label("扫描空间","Scan volume")} · H ${this.adapter?.info.fovDegrees??60}° · V
            ${this._isVerticalFovEstimated?"≈":""}${this._verticalFovDegrees}° ·
            ${this.maxRangeM??this.adapter?.info.maxRangeM??3} m
          </span>
        </div>
      </div>
      <div class="hint">
        ${this._label("拖拽彩色控制柄直接调整安装位置与姿态","Drag the colored handles to position and orient the radar")}
      </div>
      <div class="legend">
        <span class="beam-key"><i></i>${this._label("型号扫描范围","Model scan range")}</span>
        ${this._legend("position",this._label("位置 X/Y","Position X/Y"))}
        ${this._legend("height",this._label("高度","Height"))} ${this._legend("yaw",this._label("偏航","Yaw"))}
        ${this._legend("pitch",this._label("俯仰","Pitch"))} ${this._legend("roll",this._label("横滚","Roll"))}
      </div>
    `}_legend(t,e){return O`<span><i style="background:${Se[t]}"></i>${e}</span>`}static{this.styles=s`
    :host {
      display: block;
    }
    .scene-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 12px;
      background:
        radial-gradient(circle at 50% 25%, rgba(3, 169, 244, 0.08), transparent 48%),
        var(--ha-card-background, var(--card-background-color, #fff));
    }
    canvas {
      display: block;
      width: 100%;
      touch-action: none;
      user-select: none;
    }
    .values {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      pointer-events: none;
    }
    .values span {
      padding: 3px 7px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.18));
      border-radius: 10px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 82%, transparent);
      color: var(--secondary-text-color);
      font: 600 10px/1.2 system-ui;
      backdrop-filter: blur(5px);
    }
    .values .coverage {
      border-color: color-mix(in srgb, var(--primary-color, #0b825c) 35%, transparent);
      color: var(--primary-color, #0b825c);
    }
    .hint {
      margin: 7px 2px 5px;
      color: var(--secondary-text-color);
      font-size: 11px;
      text-align: center;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px 12px;
      margin-bottom: 10px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .legend i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      box-shadow: 0 0 5px currentColor;
    }
    .legend .beam-key i {
      width: 13px;
      border-radius: 2px 7px 7px 2px;
      background: linear-gradient(90deg, rgba(11, 130, 92, 0.28), rgba(3, 169, 244, 0.7));
      box-shadow: none;
    }
  `}};t([pt({attribute:!1})],Ae.prototype,"adapter",void 0),t([pt({attribute:!1})],Ae.prototype,"calibration",void 0),t([pt({attribute:!1})],Ae.prototype,"lang",void 0),t([pt({type:Number})],Ae.prototype,"roomW",void 0),t([pt({type:Number})],Ae.prototype,"roomD",void 0),t([pt({type:Number})],Ae.prototype,"maxRangeM",void 0),t([ut("#installation-cv")],Ae.prototype,"_cv",void 0),Ae=t([dt("mmwave-installation-3d")],Ae);let Ce=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._rafId=0}_L(t){return xe(t,this.lang)}_ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const i=pe(t,e),r=he(i.x,i.y,this._m());this._emit({polygon:[...this.calibration.polygon,r]})}_undo(){const t=[...this.calibration.polygon];t.pop(),this._emit({polygon:t})}_clear(){this._emit({polygon:[]})}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0){const e=ge(t,this._cssH()),i=this._m();if(ue(e,i),this.adapter){const t=ce(this.calibration.radar_x,this.calibration.radar_y,i);ye(e,t.cx,t.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM)}_e(e,this.calibration.polygon,i)}this._rafId=requestAnimationFrame(()=>this._loop())}_numField(t,e,i,r=5,a=-9999,o=9999){const s=t=>{let i=parseFloat(t.target.value)||0;i>o&&(i=o),i<a&&(i=a),this._emit({[e]:i})};return O` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(i)}
        step=${r}
        min=${a}
        max=${o}
        @input=${s}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(i)}
        step=${r}
        min=${a}
        max=${o}
        @change=${s}
      />
      <span class="unit">cm</span>
    </div>`}_degField(t,e,i,r=-180,a=180){const o=t=>{const i=parseFloat(t.target.value)||0;this._emit({[e]:i})};return O` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(i)}
        step="0.5"
        min=${r}
        max=${a}
        @input=${o}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(i)}
        step="0.5"
        min=${r}
        max=${a}
        @change=${o}
      />
      <span class="unit">°</span>
    </div>`}render(){const t=this.calibration,e=t.polygon.length,i=e>=3?this._L("geo.poly_hint_ok").replace("{n}",String(e)):this._L("geo.poly_hint_none"),r=t.room_w??this.roomW,a=t.room_d??this.roomD;return O`
      <div class="panel-heading">
        <span class="eyebrow">${this._ui("步骤 1 · 安装定位","Step 1 · Installation")}</span>
        <h2>${this._ui("在房间中放置雷达","Place the radar in the room")}</h2>
        <p>
          ${this._ui("拖拽 3D 模型上的彩色控制柄，直观调整安装位置、高度和朝向。","Drag the colored handles to set position, height and orientation.")}
        </p>
      </div>

      <mmwave-installation-3d
        .adapter=${this.adapter}
        .calibration=${t}
        .lang=${this.lang}
        .roomW=${r}
        .roomD=${a}
        .maxRangeM=${this.maxRangeM}
      ></mmwave-installation-3d>

      <details class="precision">
        <summary>
          <span>${this._ui("精确数值调整","Precise numeric adjustment")}</span>
          <small>${this._ui("可选","Optional")}</small>
        </summary>
        <div class="precision-fields">
          ${this._numField(this._L("geo.radar_x"),"radar_x",t.radar_x,5,0,r)}
          ${this._numField(this._L("geo.radar_y"),"radar_y",t.radar_y,5,0,a)}
          ${this._numField(this._L("geo.radar_z"),"radar_z",t.radar_z,5,0,400)}
          ${this._degField(this._L("geo.yaw_rough"),"yaw",t.yaw)}
          ${this._degField(this._L("geo.pitch"),"pitch",t.pitch,-90,90)}
          ${this._degField(this._L("geo.roll"),"roll",t.roll,-90,90)}
          <p class="note">${this._L("geo.geo_note")}</p>
        </div>
      </details>

      <section class="boundary-card">
        <div class="section-heading">
          <div>
            <span class="eyebrow">${this._ui("可选设置","Optional")}</span>
            <h3>${this._L("geo.boundary")}</h3>
            <p>
              ${this._ui("在俯视图中点击，依次勾画实际有效检测区域。","Click the top-down map to outline the active detection area.")}
            </p>
          </div>
          <span class="boundary-badge ${e>=3?"active":""}"
            >${e>=3?`${e} ${this._ui("个点","points")}`:this._ui("未启用","Off")}</span
          >
        </div>
        <div class="poly-bar">
          <span class="poly-hint ${e>=3?"ok":""}">${i}</span>
          <div class="poly-btns">
            <button class="pbtn" type="button" ?disabled=${0===e} @click=${this._undo}>
              ${this._ui("撤销一点","Undo point")}
            </button>
            <button class="pbtn danger" type="button" ?disabled=${0===e} @click=${this._clear}>
              ${this._L("geo.poly_clear")}
            </button>
          </div>
        </div>
        <div class="map-shell">
          <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
          ${0===e?O`<span class="map-empty"
                >${this._ui("点击地图添加第一个边界点","Click the map to add the first point")}</span
              >`:""}
        </div>
        <p class="note">${this._L("geo.boundary_note")}</p>
      </section>
    `}static{this.styles=s`
    :host {
      display: block;
    }
    .panel-heading {
      margin-bottom: 12px;
    }
    .eyebrow {
      color: var(--mmwave-primary);
      font-size: 9px;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .panel-heading h2,
    .section-heading h3 {
      margin: 4px 0;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 700;
    }
    .panel-heading p,
    .section-heading p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .sec-title {
      font-size: 10px;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      margin: 0 0 8px;
    }
    .precision {
      margin: 5px 0 16px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.035);
    }
    .precision summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
    }
    .precision summary small {
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.1);
      font-size: 8px;
    }
    .precision-fields {
      padding: 0 6px 6px;
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
    .boundary-card {
      padding: 12px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 13px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 96%, var(--mmwave-primary));
    }
    .section-heading {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    .section-heading h3 {
      font-size: 13px;
    }
    .boundary-badge {
      flex: none;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      font-size: 9px;
      font-weight: 700;
    }
    .boundary-badge.active {
      border-color: rgba(11, 130, 92, 0.25);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.09);
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
    .pbtn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
    .pbtn.danger:not(:disabled):hover {
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.08);
    }
    .pbtn:hover {
      background: rgba(128, 128, 128, 0.2);
    }
    .map-shell {
      position: relative;
    }
    .map-empty {
      position: absolute;
      left: 50%;
      bottom: 14px;
      padding: 4px 8px;
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      pointer-events: none;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    canvas {
      display: block;
      width: 100%;
      border-radius: 10px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(0, 0, 0, 0.15);
      touch-action: none;
      cursor: crosshair;
    }
  `}};t([pt({attribute:!1})],Ce.prototype,"adapter",void 0),t([pt({attribute:!1})],Ce.prototype,"calibration",void 0),t([pt({attribute:!1})],Ce.prototype,"lang",void 0),t([pt({type:Number})],Ce.prototype,"roomW",void 0),t([pt({type:Number})],Ce.prototype,"roomD",void 0),t([pt({type:Number})],Ce.prototype,"maxRangeM",void 0),t([ut("#poly-cv")],Ce.prototype,"_cv",void 0),Ce=t([dt("mmwave-geo-panel")],Ce);let Ee=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._yw={sub:0,capturing:!1},this._rafId=0}_L(t){return xe(t,this.lang)}_ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}offerReading(t,e){this._yw.capturing&&(this._capture(t,e),this._yw={...this._yw,capturing:!1})}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const i=this._yw;if(0!==i.sub&&1!==i.sub)return;const r=pe(t,e),a=he(r.x,r.y,this._m());0===i.sub?this._yw={...i,refA:{canvasPt:r,roomPt:a},sub:.5}:this._yw={...i,refB:{canvasPt:r,roomPt:a},sub:1.5},this.requestUpdate()}_onCapture(){this._yw={...this._yw,capturing:!0},this.dispatchEvent(new CustomEvent("capture-requested",{bubbles:!0,composed:!0}))}_restart(){this._yw={sub:0,capturing:!1}}_capture(t,e){const i=this._yw;.5===i.sub&&i.refA?this._yw={...i,refA:{...i.refA,detPt:{x:t,y:e}},sub:1}:1.5===i.sub&&i.refB&&(this._yw={...i,refB:{...i.refB,detPt:{x:t,y:e}},sub:2},this._computeYaw())}_computeYaw(){const t=this._yw;if(!t.refA?.detPt||!t.refB?.detPt)return;const e=this._m(),i=he(t.refA.canvasPt.x,t.refA.canvasPt.y,e),r=he(t.refB.canvasPt.x,t.refB.canvasPt.y,e),a=t.refA.detPt,o=t.refB.detPt,s=function(t,e,i,r){let a=(Math.atan2(e.y-t.y,e.x-t.x)-Math.atan2(r.y-i.y,r.x-i.x))*(180/Math.PI);for(;a>180;)a-=360;for(;a<-180;)a+=360;return Math.round(10*a)/10}(i,r,a,o),n={...this.calibration,yaw:s},l=function(t,e,i,r,a){const o=se(i.x,i.y,0,a),s=se(r.x,r.y,0,a);return(Math.hypot(o.roomX-t.x,o.roomY-t.y)+Math.hypot(s.roomX-e.x,s.roomY-e.y))/2}(i,r,a,o,n);this._yw={...this._yw,residual:l},this.dispatchEvent(new CustomEvent("calibration-changed",{detail:n,bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=ge(t,this._cssH()),i=this._m();ue(e,i),_e(e,this.calibration.polygon,i,!0);const r=ce(this.calibration.radar_x,this.calibration.radar_y,i);ye(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM);const a=(t,r)=>{if(t&&(be(e,t.canvasPt.x,t.canvasPt.y,r,"#64b5f6"),t.detPt)){const a=se(t.detPt.x,t.detPt.y,0,this.calibration),o=ce(a.roomX,a.roomY,i);e.beginPath(),e.moveTo(t.canvasPt.x,t.canvasPt.y),e.lineTo(o.cx,o.cy),e.strokeStyle="rgba(244,99,99,.4)",e.lineWidth=1,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),be(e,o.cx,o.cy,r,"rgba(244,99,99,.85)",!0)}};a(this._yw.refA,"A"),a(this._yw.refB,"B")}this._rafId=requestAnimationFrame(()=>this._loop())}_refStep(t){const e=this._yw,i=0===t?e.sub:e.sub-1,r=i>=1?"done":i>=0?"act":"",a=0===t,o=a?e.refA:e.refB;let s;if(i>=1)s=this._L(a?"yaw.ref_a_done":"yaw.ref_b_done");else if(.5===i)if(null!=o?.roomPt){const t=Math.round(o.roomPt.x),e=Math.round(o.roomPt.y),i=this._L(a?"yaw.ref_a_marked":"yaw.ref_b_marked");s=i.includes("{x}")?i.replace("{x}",String(t)).replace("{y}",String(e)):`(X=${t}, Y=${e} cm) — ${this._L(a?"yaw.ref_a_idle":"yaw.ref_b_step")}`}else s=this._L(a?"yaw.ref_a_marked":"yaw.ref_b_marked").replace("{x}","?").replace("{y}","?");else s=0===i?this._L(a?"yaw.ref_a_idle":"yaw.ref_b_step"):this._L("yaw.ref_b_idle");return O` <div class="ref-step ${r}">
      <div class="ref-num">${i>=1?"✓":a?"A":"B"}</div>
      <div class="ref-copy">
        <div class="ref-title">${this._L(a?"yaw.ref_a_title":"yaw.ref_b_title")}</div>
        <div class="ref-sub">${s}</div>
      </div>
    </div>`}render(){const t=this._yw,e=.5===t.sub||1.5===t.sub,i=t.sub>=2,r=i?this._L("yaw.result_ok").replace("{yaw}",String(this.calibration.yaw)).replace("{residual}",String((t.residual??0).toFixed(1))):this._L("yaw.result_idle");return O`
      <div class="panel-heading">
        <span class="eyebrow">${this._ui("步骤 2 · 方向校准","Step 2 · Direction")}</span>
        <h2>${this._ui("用两个位置自动计算偏航","Calculate yaw from two positions")}</h2>
        <p>
          ${this._ui("依次选择两个相距较远且方便站立的位置，雷达会自动完成方向校准。","Choose two well-separated places you can stand, then capture one reading at each.")}
        </p>
      </div>

      <div class="ref-grid">${this._refStep(0)} ${this._refStep(1)}</div>
      <div class="map-shell">
        <canvas id="yaw-cv" @click=${this._onCanvasClick}></canvas>
        <span class="map-tip">
          ${0===t.sub||1===t.sub?this._ui("点击地图选择站立位置","Click the map to choose where to stand"):t.capturing?this._ui("保持站立，正在等待雷达数据…","Stand still while waiting for radar data…"):this._ui("请走到已标记的位置","Walk to the marked position")}
        </span>
      </div>
      <button class="cap-btn" type="button" ?disabled=${!e||t.capturing} @click=${this._onCapture}>
        <span class="cap-icon">${t.capturing?"···":"◎"}</span>
        ${t.capturing?this._L("yaw.capture_wait"):e?this._ui("我已站好，捕获雷达位置","I am ready — capture position"):this._ui("请先在地图上选择位置","Choose a position on the map first")}
      </button>
      <div class="result-card ${i?"ok":""}">
        <span class="result-icon">${i?"✓":"i"}</span>
        <span>${r}</span>
        ${t.sub>0?O`<button type="button" @click=${this._restart}>${this._ui("重新校准","Start over")}</button>`:""}
      </div>
    `}static{this.styles=s`
    :host {
      display: block;
    }
    .panel-heading {
      margin-bottom: 12px;
    }
    .eyebrow {
      color: var(--mmwave-primary);
      font-size: 9px;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .panel-heading h2 {
      margin: 4px 0;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 700;
    }
    .panel-heading p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .map-shell {
      position: relative;
      margin: 9px 0;
    }
    canvas {
      display: block;
      width: 100%;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      background: rgba(0, 0, 0, 0.15);
      touch-action: none;
      cursor: crosshair;
      margin: 0;
    }
    .map-tip {
      position: absolute;
      bottom: 9px;
      left: 50%;
      max-width: calc(100% - 28px);
      padding: 5px 9px;
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      text-overflow: ellipsis;
      pointer-events: none;
      transform: translateX(-50%);
      white-space: nowrap;
      backdrop-filter: blur(6px);
    }
    .ref-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .ref-step {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      padding: 10px;
      border-radius: 11px;
      border: 1px solid var(--divider-color);
      margin-bottom: 0;
      transition: all 0.22s;
    }
    .ref-step.act {
      border-color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.07);
    }
    .ref-step .ref-num {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.2);
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      flex-shrink: 0;
    }
    .ref-copy {
      min-width: 0;
    }
    .ref-title {
      margin-bottom: 2px;
      color: var(--primary-text-color);
      font-size: 11px;
      font-weight: 700;
    }
    .ref-sub {
      display: -webkit-box;
      overflow: hidden;
      color: var(--secondary-text-color);
      font-size: 9px;
      line-height: 1.35;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .ref-step.done {
      border-color: rgba(11, 130, 92, 0.18);
      background: rgba(11, 130, 92, 0.045);
    }
    .ref-step.act .ref-num {
      background: var(--mmwave-primary);
      color: #fff;
    }
    .ref-step .ref-txt {
      flex: 1;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .ref-step.act .ref-txt {
      color: var(--primary-text-color);
      font-weight: 500;
    }
    .ref-step.done .ref-txt {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .cap-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      width: 100%;
      margin-top: 9px;
      min-height: 42px;
      padding: 10px;
      background: var(--mmwave-primary);
      border: 1px solid var(--mmwave-primary);
      border-radius: 11px;
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      color: #fff;
      transition: background 0.15s;
      box-shadow: 0 5px 14px rgba(11, 130, 92, 0.18);
    }
    .cap-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .cap-btn:not(:disabled):hover {
      filter: brightness(1.06);
    }
    .cap-icon {
      font-size: 17px;
    }
    .result-card {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.04);
      font-size: 10px;
    }
    .result-card.ok {
      border-color: rgba(11, 130, 92, 0.22);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.07);
    }
    .result-icon {
      width: 19px;
      height: 19px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 50%;
      color: #fff;
      background: #9ca3af;
      font-size: 10px;
      font-weight: 750;
    }
    .result-card.ok .result-icon {
      background: var(--mmwave-primary);
    }
    .result-card > span:nth-child(2) {
      flex: 1;
    }
    .result-card button {
      padding: 3px 7px;
      border: 0;
      border-radius: 7px;
      color: inherit;
      background: rgba(128, 128, 128, 0.09);
      font-size: 9px;
      cursor: pointer;
    }
    .result-line {
      font-size: 11px;
      text-align: center;
      min-height: 15px;
      margin-top: 5px;
      color: var(--secondary-text-color);
    }
    .result-line.ok {
      color: var(--success-color, #4caf50);
    }
    @media (max-width: 440px) {
      .ref-grid {
        grid-template-columns: 1fr;
      }
    }
  `}};t([pt({attribute:!1})],Ee.prototype,"adapter",void 0),t([pt({attribute:!1})],Ee.prototype,"calibration",void 0),t([pt({attribute:!1})],Ee.prototype,"lang",void 0),t([pt({type:Number})],Ee.prototype,"roomW",void 0),t([pt({type:Number})],Ee.prototype,"roomD",void 0),t([pt({type:Number})],Ee.prototype,"maxRangeM",void 0),t([gt()],Ee.prototype,"_yw",void 0),t([ut("#yaw-cv")],Ee.prototype,"_cv",void 0),Ee=t([dt("mmwave-yaw-panel")],Ee);const Te=["#ff9800","#03a9f4","#e91e63"];function We(t){return Te[(t%Te.length+Te.length)%Te.length]}function Pe(t,e,i,r,a){const o=2/Math.max(1e-4,r),s=o*a,n=1/(1+s+.48*s*s+.235*s*s*s),l=t-e,d=(i+o*l)*a;let c=(i-o*d)*n,h=e+(l+d)*n;return(Math.abs(e-t)<1e-6||(e-t)*(h-e)>0)&&(h=e,c=0),[h,c]}let He=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.targets=[],this.present=!1,this.showStatus=!1,this._trails=new Map,this._animatedTargets=new Map,this._rafId=0,this._lastFrameAt=0,this._lastTrailPruneAt=0}connectedCallback(){super.connectedCallback(),this._lastFrameAt=Date.now(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}willUpdate(t){t.has("targets")&&this._setTargetGoals(this.targets)}_setTargetGoals(t){const e=Date.now();for(const i of t){if(!i.room)continue;const t=i.room.roomX,r=i.room.roomY,a=Math.hypot(i.rawX,i.rawY)/100,o=this._animatedTargets.get(i.index);o&&e-o.lastSeen<=1e3?(o.goalX=t,o.goalY=r,o.goalRangeM=a,o.lastSeen=e):(this._trails.delete(i.index),this._animatedTargets.set(i.index,{x:t,y:r,rangeM:a,goalX:t,goalY:r,goalRangeM:a,velocityX:0,velocityY:0,velocityRange:0,lastSeen:e,lastTrailAt:0}))}}_advanceTargets(t){const e=Math.min(Math.max((t-this._lastFrameAt)/1e3,0),.05);this._lastFrameAt=t;const i=Math.max(this.adapter.info.updateRateHz,1),r=Math.min(.22,Math.max(.12,1.25/i));for(const[i,a]of this._animatedTargets)t-a.lastSeen>1e3?this._animatedTargets.delete(i):([a.x,a.velocityX]=Pe(a.x,a.goalX,a.velocityX,r,e),[a.y,a.velocityY]=Pe(a.y,a.goalY,a.velocityY,r,e),[a.rangeM,a.velocityRange]=Pe(a.rangeM,a.goalRangeM,a.velocityRange,r,e))}_sampleTrails(t,e){for(const i of t){const t=this._animatedTargets.get(i.index);if(!t||!i.room?.inBoundary||e-t.lastTrailAt<75)continue;t.lastTrailAt=e;const r=this._trails.get(i.index)??[],a=r.at(-1);(!a||Math.hypot(t.x-a.x,t.y-a.y)>=.5)&&(r.push({x:t.x,y:t.y,t:e}),this._trails.set(i.index,r))}if(e-this._lastTrailPruneAt>=1e3){this._lastTrailPruneAt=e;const t=e-Me;for(const[e,i]of this._trails){const r=i.filter(e=>e.t>t);r.length>0?this._trails.set(e,r):this._trails.delete(e)}}}clearTrail(){this._trails.clear();for(const t of this._animatedTargets.values())t.lastTrailAt=0}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 340;const e=this.roomD/this.roomW;return Math.max(140,Math.min(340,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=ge(t,this._cssH()),i=this._m(),r=Date.now();this._advanceTargets(r),this._sampleTrails(this.targets,r),ue(e,i),_e(e,this.calibration.polygon,i);const a=ce(this.calibration.radar_x,this.calibration.radar_y,i);ye(e,a.cx,a.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM);for(const[t,a]of this._trails)if(!(a.length<2)){e.save(),e.strokeStyle=We(t),e.lineWidth=2,e.lineCap="round";for(let t=1;t<a.length;t++){const o=a[t-1],s=a[t],n=(r-s.t)/Me;e.globalAlpha=Math.max(0,.5-.5*n);const l=ce(o.x,o.y,i),d=ce(s.x,s.y,i);e.beginPath(),e.moveTo(l.cx,l.cy),e.lineTo(d.cx,d.cy),e.stroke()}e.restore()}for(const t of this.targets){if(!t.room)continue;const r=this._animatedTargets.get(t.index);if(this.adapter.info.is1DRanging)fe(e,a.cx,a.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,r?.rangeM??Math.hypot(t.rawX,t.rawY)/100,i,t.room.inBoundary);else{const a=ce(r?.x??t.room.roomX,r?.y??t.room.roomY,i),o=We(t.index);me(e,a.cx,a.cy,t.room.inBoundary,o),this.adapter.info.maxTargets>1&&(e.fillStyle=o,e.font="bold 10px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(String(t.index+1),a.cx,a.cy-14),e.textBaseline="alphabetic")}}}this._rafId=requestAnimationFrame(()=>this._loop())}_L(t){return xe(t,this.lang)}_ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}_badgeText(){if(!this.present)return this._L("live.badge_none");const t=this.targets.filter(t=>t.room?.inBoundary).length;return t>0?this._L("live.badge_present"):this._L("live.badge_filtered")}_badgeCls(){return this.present?this.targets.some(t=>t.room?.inBoundary)?"on":"filtered":""}render(){return O`
      ${this.showStatus?O`<div class="panel-heading">
            <span class="eyebrow">${this._ui("步骤 3 · 实时验证","Step 3 · Live test")}</span>
            <h2>${this._ui("确认检测区域与目标轨迹","Verify coverage and target trails")}</h2>
            <p>
              ${this._ui("在房间内走动，检查每个目标的颜色、位置和轨迹是否符合实际。","Walk through the room and confirm that target positions and trails match reality.")}
            </p>
          </div>`:""}
      <div class="scene-shell">
        <canvas id="live-cv"></canvas>
        <div class="scene-toolbar">
          <div class="badge ${this._badgeCls()}"><i></i>${this._badgeText()}</div>
          ${this.showStatus?O`<button type="button" @click=${this.clearTrail}>${this._ui("清除轨迹","Clear trails")}</button>`:""}
        </div>
        ${this.present?"":O`<div class="idle-hint">
              <span>◎</span>${this._ui("等待雷达检测到目标","Waiting for a radar target")}
            </div>`}
      </div>
      ${this.showStatus?O`
            <div class="target-summary">
              <div class="summary-head">
                <strong>${this._ui("检测目标","Detected targets")}</strong>
                <span
                  >${this.targets.filter(t=>t.room?.inBoundary).length} /
                  ${this.adapter.info.maxTargets}</span
                >
              </div>
              <div class="target-list">
                ${this.targets.length>0?this.targets.map(t=>O`
                        <div
                          class="target-row ${t.room?.inBoundary?"":"outside"}"
                          style="--target-color:${We(t.index)}"
                        >
                          <span class="target-id"><i></i>${this._ui("目标","Target")} ${t.index+1}</span>
                          <span class="target-coord">
                            ${t.room?`X ${Math.round(t.room.roomX)} · Y ${Math.round(t.room.roomY)}${this.adapter.info.hasZAxis?` · Z ${Math.round(t.room.roomZ)}`:""} cm`:"—"}
                          </span>
                          <span class="target-state"
                            >${t.room?.inBoundary?this._ui("有效","Inside"):this._ui("边界外","Outside")}</span
                          >
                        </div>
                      `):O`<div class="target-empty">${this._ui("当前没有目标数据","No target data yet")}</div>`}
              </div>
            </div>
          `:""}
    `}static{this.styles=s`
    :host {
      display: block;
      position: relative;
    }
    .panel-heading {
      margin-bottom: 12px;
    }
    .eyebrow {
      color: var(--mmwave-primary);
      font-size: 9px;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .panel-heading h2 {
      margin: 4px 0;
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 700;
    }
    .panel-heading p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 11px;
      line-height: 1.5;
    }
    .scene-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 12px;
      background:
        radial-gradient(circle at 50% 20%, rgba(3, 169, 244, 0.055), transparent 48%),
        var(--ha-card-background, rgba(128, 128, 128, 0.04));
    }
    .scene-toolbar {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .scene-toolbar button {
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      cursor: pointer;
      pointer-events: auto;
      backdrop-filter: blur(6px);
    }
    .idle-hint {
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 82%, transparent);
      font-size: 10px;
      pointer-events: none;
      transform: translate(-50%, -50%);
      backdrop-filter: blur(7px);
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
      gap: 6px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 86%, transparent);
      border: 1px solid var(--divider-color);
      backdrop-filter: blur(4px);
      width: fit-content;
    }
    .badge i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .badge.on {
      background: rgba(11, 130, 92, 0.15);
      color: var(--mmwave-primary);
      border: 1px solid rgba(11, 130, 92, 0.3);
    }
    .badge.on i {
      background: var(--mmwave-primary);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.12);
    }
    .badge.filtered {
      border-color: rgba(255, 152, 0, 0.28);
      color: var(--warning-color, #f57c00);
      background: rgba(255, 152, 0, 0.09);
    }
    .badge.filtered i {
      background: var(--warning-color, #ff9800);
    }

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
    .coords span:first-child {
      opacity: 0.7;
    }
    .coords span:last-child {
      font-weight: 600;
      font-family: monospace;
    }
    canvas {
      display: block;
      width: 100%;
      border: none;
      background: transparent;
      touch-action: none;
    }
    .target-summary {
      margin-top: 9px;
      padding: 10px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.16));
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.035);
    }
    .summary-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 7px;
      color: var(--primary-text-color);
      font-size: 10px;
    }
    .summary-head span {
      padding: 2px 6px;
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.09);
      font-size: 9px;
    }
    .target-list {
      display: grid;
      gap: 5px;
    }
    .target-row {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      gap: 8px;
      padding: 7px 8px;
      border-radius: 8px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--target-color) 7%, transparent);
      font-size: 9px;
    }
    .target-row.outside {
      opacity: 0.55;
    }
    .target-id {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-weight: 700;
    }
    .target-id i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--target-color);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--target-color) 18%, transparent);
    }
    .target-coord {
      overflow: hidden;
      color: var(--secondary-text-color);
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .target-state {
      padding: 2px 5px;
      border-radius: 999px;
      color: var(--target-color);
      background: color-mix(in srgb, var(--target-color) 10%, transparent);
      font-weight: 700;
    }
    .target-empty {
      padding: 8px;
      color: var(--secondary-text-color);
      font-size: 10px;
      text-align: center;
    }
    @media (max-width: 440px) {
      .target-row {
        grid-template-columns: auto 1fr;
      }
      .target-coord {
        text-align: left;
      }
      .target-state {
        display: none;
      }
    }
  `}};t([pt({attribute:!1})],He.prototype,"adapter",void 0),t([pt({attribute:!1})],He.prototype,"calibration",void 0),t([pt({attribute:!1})],He.prototype,"lang",void 0),t([pt({type:Number})],He.prototype,"roomW",void 0),t([pt({type:Number})],He.prototype,"roomD",void 0),t([pt({attribute:!1})],He.prototype,"targets",void 0),t([pt({type:Boolean})],He.prototype,"present",void 0),t([pt({type:Boolean})],He.prototype,"showStatus",void 0),t([pt({type:Number})],He.prototype,"maxRangeM",void 0),t([ut("#live-cv")],He.prototype,"_cv",void 0),He=t([dt("mmwave-live-panel")],He);const Fe=["#ff9800","#03a9f4","#e91e63","#8bc34a","#9c27b0","#00bcd4"];function qe(t){let e=0;for(const i of t)e=31*e+i.charCodeAt(0)|0;return Fe[Math.abs(e)%Fe.length]}let Le=class extends nt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.radars=[],this.targets=[],this.zones=[],this.events=[],this.historyTrack=[],this.selectedEventId="",this.lang="en",this.backendState="connecting",this.trails=new Map,this.animationFrame=0}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.animationFrame)}willUpdate(t){if(!t.has("targets"))return;const e=Date.now();for(const t of this.targets){const i=this.trails.get(t.track_id)??[],r=i.at(-1);(!r||Math.hypot(r.x-t.x,r.y-t.y)>=.5)&&i.push({x:t.x,y:t.y,timestamp:e}),this.trails.set(t.track_id,i.filter(t=>t.timestamp>=e-Me))}const i=new Set(this.targets.map(t=>t.track_id));for(const t of this.trails.keys()){const r=this.trails.get(t)??[];!i.has(t)&&(r.at(-1)?.timestamp??0)<e-Me&&this.trails.delete(t)}}metrics(){const t=this.canvas?.offsetWidth||500;return{W:t,H:Math.max(220,Math.min(520,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD}}loop(){const t=this.canvas;if(t&&t.offsetWidth>0){const e=this.metrics(),i=ge(t,e.H),r=Date.now();ue(i,e),this.drawZones(i,e),this.drawRadars(i,e),this.drawTrails(i,e,r),this.drawHistory(i,e),this.drawTargets(i,e)}this.animationFrame=requestAnimationFrame(()=>this.loop())}drawZones(t,e){this.zones.forEach((i,r)=>{if(i.polygon.length<3)return;const a=Fe[(r+3)%Fe.length],o=i.polygon.map(t=>ce(t.x,t.y,e));t.beginPath(),o.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),t.closePath(),t.globalAlpha=.08,t.fillStyle=a,t.fill(),t.globalAlpha=.6,t.strokeStyle=a,t.lineWidth=1.5,t.setLineDash([5,4]),t.stroke(),t.setLineDash([]),t.globalAlpha=1,t.fillStyle=a,t.font="bold 10px system-ui",t.textAlign="left",t.fillText(i.name||i.id,o[0].cx+5,o[0].cy+13)})}drawRadars(t,e){for(const i of this.radars){const r=ce(i.calibration.radar_x,i.calibration.radar_y,e);t.save(),t.globalAlpha=i.available?.45:.12,ye(t,r.cx,r.cy,i.calibration.yaw,i.calibration.pitch,i.adapter.info.fovDegrees,i.adapter.info.minRangeM,i.adapter.info.maxRangeM,e,i.adapter.info.vitalRangeM),t.restore(),t.fillStyle=i.available?"var(--primary-text-color, #fff)":"var(--error-color, #e53935)",t.font="bold 9px system-ui",t.textAlign="center",t.fillText(i.config.id,r.cx,r.cy-14)}}drawTrails(t,e,i){for(const[r,a]of this.trails)if(!(a.length<2)){t.save(),t.strokeStyle=qe(r),t.lineWidth=2.2,t.lineCap="round";for(let r=1;r<a.length;r++){const o=ce(a[r-1].x,a[r-1].y,e),s=ce(a[r].x,a[r].y,e);t.globalAlpha=Math.max(.05,.65-(i-a[r].timestamp)/Me*.65),t.beginPath(),t.moveTo(o.cx,o.cy),t.lineTo(s.cx,s.cy),t.stroke()}t.restore()}}drawTargets(t,e){for(const i of this.targets){const r=ce(i.x,i.y,e),a=qe(i.track_id);me(t,r.cx,r.cy,!0,a),t.fillStyle=a,t.font="bold 9px ui-monospace, monospace",t.textAlign="center",t.fillText(i.track_id.slice(0,6),r.cx,r.cy-14)}}drawHistory(t,e){this.historyTrack.length<2||(t.save(),t.strokeStyle="#ffffff",t.lineWidth=2.5,t.globalAlpha=.75,t.setLineDash([6,4]),t.beginPath(),this.historyTrack.forEach((i,r)=>{const a=ce(i.x,i.y,e);0===r?t.moveTo(a.cx,a.cy):t.lineTo(a.cx,a.cy)}),t.stroke(),t.restore())}selectEvent(t){this.dispatchEvent(new CustomEvent("fusion-event-selected",{detail:t,bubbles:!0,composed:!0}))}ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}render(){const t=this.radars.filter(t=>t.available).length;return O`
      <div class="scene">
        <canvas id="fusion-cv"></canvas>
        <div class="overlay">
          <span class="status ${this.backendState}">
            <i></i>
            ${"online"===this.backendState?this.ui("后端融合","Backend fusion"):"fallback"===this.backendState?this.ui("本地降级","Local fallback"):"error"===this.backendState?this.ui("后端异常","Backend error"):this.ui("正在连接","Connecting")}
          </span>
          <span class="radar-count">${t}/${this.radars.length} ${this.ui("雷达在线","radars online")}</span>
        </div>
      </div>
      <div class="summary">
        <div><strong>${this.targets.length}</strong><span>${this.ui("融合目标","Fused targets")}</span></div>
        ${this.targets.map(t=>O`
            <div class="track" style="--track-color:${qe(t.track_id)}">
              <i></i>
              <span>${t.track_id.slice(0,6)}</span>
              <small>X ${Math.round(t.x)} · Y ${Math.round(t.y)} cm</small>
              <em>${Math.round(100*t.confidence)}%</em>
            </div>
          `)}
      </div>
      ${this.events.length?O`
            <div class="events">
              <strong>${this.ui("最近事件","Recent events")}</strong>
              ${this.events.slice(0,8).map(t=>O`
                  <button
                    type="button"
                    class=${t.event_id===this.selectedEventId?"selected":""}
                    @click=${()=>this.selectEvent(t)}
                  >
                    <span>${t.event_type.toUpperCase()} · ${t.zone_id}</span>
                    <small>${new Date(1e3*t.timestamp).toLocaleString()}</small>
                    ${t.clip_path?O`<em>▶</em>`:""}
                  </button>
                `)}
            </div>
          `:""}
    `}static{this.styles=s`
    :host {
      display: block;
    }
    .scene {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: rgba(128, 128, 128, 0.035);
    }
    canvas {
      display: block;
      width: 100%;
    }
    .overlay {
      position: absolute;
      inset: 8px 8px auto;
      display: flex;
      justify-content: space-between;
      gap: 8px;
      pointer-events: none;
    }
    .status,
    .radar-count {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font-size: 9px;
      backdrop-filter: blur(6px);
    }
    .status i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .status.online {
      color: #0b825c;
    }
    .status.online i {
      background: #0b825c;
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.14);
    }
    .status.fallback {
      color: var(--warning-color, #ff9800);
    }
    .status.fallback i {
      background: var(--warning-color, #ff9800);
    }
    .status.error {
      color: var(--error-color, #e53935);
    }
    .status.error i {
      background: var(--error-color, #e53935);
    }
    .summary {
      display: grid;
      gap: 6px;
      margin-top: 8px;
    }
    .summary > div:first-child {
      display: flex;
      align-items: baseline;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .summary > div:first-child strong {
      color: var(--primary-text-color);
      font-size: 18px;
    }
    .track {
      display: grid;
      grid-template-columns: auto auto 1fr auto;
      align-items: center;
      gap: 7px;
      padding: 7px 9px;
      border-radius: 9px;
      background: color-mix(in srgb, var(--track-color) 7%, transparent);
      color: var(--primary-text-color);
      font:
        10px ui-monospace,
        monospace;
    }
    .track i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--track-color);
    }
    .track small {
      overflow: hidden;
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .track em {
      color: var(--track-color);
      font-style: normal;
      font-weight: 700;
    }
    .events {
      display: grid;
      gap: 5px;
      margin-top: 12px;
    }
    .events > strong {
      color: var(--primary-text-color);
      font-size: 10px;
    }
    .events button {
      display: grid;
      grid-template-columns: 1fr auto auto;
      align-items: center;
      gap: 8px;
      padding: 7px 9px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      color: var(--primary-text-color);
      background: rgba(128, 128, 128, 0.035);
      font-size: 9px;
      text-align: left;
      cursor: pointer;
    }
    .events button.selected {
      border-color: #0b825c;
      background: rgba(11, 130, 92, 0.08);
    }
    .events small {
      color: var(--secondary-text-color);
    }
    .events em {
      color: #0b825c;
      font-style: normal;
    }
  `}};t([pt({type:Number})],Le.prototype,"roomW",void 0),t([pt({type:Number})],Le.prototype,"roomD",void 0),t([pt({attribute:!1})],Le.prototype,"radars",void 0),t([pt({attribute:!1})],Le.prototype,"targets",void 0),t([pt({attribute:!1})],Le.prototype,"zones",void 0),t([pt({attribute:!1})],Le.prototype,"events",void 0),t([pt({attribute:!1})],Le.prototype,"historyTrack",void 0),t([pt({attribute:!1})],Le.prototype,"selectedEventId",void 0),t([pt({attribute:!1})],Le.prototype,"lang",void 0),t([pt({attribute:!1})],Le.prototype,"backendState",void 0),t([ut("#fusion-cv")],Le.prototype,"canvas",void 0),Le=t([dt("mmwave-fusion-panel")],Le),window.customCards??=[],window.customCards.push({type:$e,name:"MMWave Radar HA Card",description:"Multi-model mmWave radar calibration & live visualization",preview:!0,documentationURL:"https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card"}),console.info("%c MMWAVE-CARD %c v1.0.0 ","background:#03a9f4;color:#fff;font-weight:700","background:#1c1c2e;color:#03a9f4;font-weight:700");function Ne(t,e=new Set){return"string"==typeof t&&/^[a-z_]+\.[a-z0-9_]+$/.test(t)?e.add(t):Array.isArray(t)?t.forEach(t=>Ne(t,e)):t&&"object"==typeof t&&Object.values(t).forEach(t=>Ne(t,e)),e}function Ke(t,e){return[...Ne(e)].some(e=>{const i=t.states[e];return i&&"unavailable"!==i.state&&"unknown"!==i.state})}let Be=class extends nt{constructor(){super(...arguments),this._tab=0,this._isCalibrating=!1,this._targets=[],this._present=!1,this._syncState="idle",this._fusionTargets=[],this._fusionRadars=[],this._fusionBackendState="connecting",this._fusionEvents=[],this._fusionHistoryTrack=[],this._fusionVideoUrl="",this._deviceLoaded=!1,this._localFusion=new ne,this._localObservationBuffer=[],this._sourceSignatures=new Map,this._fusionConnecting=!1}setConfig(t){if(this._disconnectFusionBackend(),t.radars?.length){this._config={...yt,...t};const e=this._config.room_w,i=this._config.room_d;return this._fusionRadars=t.radars.map((r,a)=>{const o=re(r.radar_model);if(!o)throw new Error(`Unknown radar_model for radars[${a}]: "${r.radar_model}"`);if(o.info.is1DRanging)throw new Error(`Radar "${r.id}" uses a ranging-only model and cannot participate in 2-D fusion.`);const s={...r,type:this._config.type,room_w:e,room_d:i},n=o.validateConfig(s);n.length&&console.warn(`Radar "${r.id}" is not fully configured: ${n.join("; ")}`);const l=o.getDefaultCalibration();return{config:r,adapter:o,calibration:{...l,radar_x:Math.round(e*(a+1)/(t.radars.length+1)),radar_y:Math.round(.2*i),...r.calibration,polygon:r.calibration?.polygon??[]},available:!1}}),this._adapter=this._fusionRadars[0].adapter,this._cal=this._fusionRadars[0].calibration,this._localFusion=new ne({...t.fusion,track_ttl_s:t.fusion?.track_ttl_s??(t.radars.some(t=>"r60abd1"===t.radar_model)?3:1.2)}),this._fusionTargets=[],this._fusionEvents=[],this._fusionHistoryTrack=[],this._selectedFusionEvent=void 0,this._fusionVideoUrl="",this._localObservationBuffer=[],this._sourceSignatures.clear(),void(this._fusionBackendState="connecting")}if(!t.radar_model)throw new Error("radar_model is required");const e=re(t.radar_model);if(!e)throw new Error(`Unknown radar_model: "${t.radar_model}". Check src/models/index.ts.`);const i=e.validateConfig(t);if(i.length)throw new Error(i.join("; "));this._config={...yt,...t},this._adapter=e;const r=e.getDefaultCalibration(),a=this._config.room_w,o=this._config.room_d;r.radar_x=Math.round(.382*a),r.radar_y=Math.round(.382*o),this._cal=r}static async getConfigElement(){return await Promise.resolve().then(function(){return Ue}),document.createElement(ke)}static getStubConfig(){return{...yt,radar_model:"r60abd1",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z"}}getCardSize(){return 7}set hass(t){if(this._hass=t,!this._adapter||!this._config)return;if(this._config.radars?.length)return this._updateFusionMode(t),void this._connectFusionBackend();this._deviceLoaded||(this._deviceLoaded=!0,this._loadFromDevice());const e=this._adapter.readFromHass(t,this._config);if(this._present=e.present,this._maxRangeM=e.maxRangeM,this._targets=e.targets.map(t=>({...t,room:se(t.rawX,t.rawY,t.rawZ,this._cal)})),this.requestUpdate(),1===this._tab&&this._yawPanel){const t=e.targets[0];t&&this._yawPanel.offerReading(t.rawX,t.rawY)}}_L(t){return xe(t,this._hass?.language)}_ui(t,e){return(this._hass?.language??"en").toLowerCase().startsWith("zh")?t:e}_insideTargetCount(){return this._targets.filter(t=>t.room?.inBoundary).length}_syncLabel(){return"syncing"===this._syncState?this._ui("正在同步…","Syncing…"):"success"===this._syncState?this._ui("已同步","Synced"):"error"===this._syncState?this._ui("同步失败","Sync failed"):this._ui("同步到设备","Sync to device")}disconnectedCallback(){super.disconnectedCallback(),null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._disconnectFusionBackend()}_updateFusionMode(t){const e=Date.now(),i=[];this._fusionRadars=this._fusionRadars.map(r=>{const a={...r.config,type:this._config.type,room_w:this._config.room_w,room_d:this._config.room_d},o=r.config.frame_entity?t.states[r.config.frame_entity]:void 0,s=o?de(o.state):void 0,n=s?{present:s.targets.length>0,targets:s.targets.map((t,e)=>{const i=Number(r.config.frame_coordinate_scale??1);return{index:e,rawX:t.x*i,rawY:t.y*i,rawZ:t.z*i,speed:null==t.speed?void 0:t.speed*i}})}:r.adapter.readFromHass(t,a),l=function(t,e){const i=e.frame_entity?t.states[e.frame_entity]:void 0;return(i&&de(i.state)?[e.frame_entity]:[...Ne(e)]).sort().map(e=>`${e}:${t.states[e]?.last_updated??"missing"}`).join("|")}(t,r.config),d=l!==this._sourceSignatures.get(r.config.id);if(this._sourceSignatures.set(r.config.id,l),d)for(const t of n.targets){const a=se(t.rawX,t.rawY,t.rawZ,r.calibration);i.push({radarId:r.config.id,slot:t.index,timestamp:e,x:a.roomX,y:a.roomY,weight:Math.max(Number(r.config.measurement_weight??1),.01)})}return{...r,available:Ke(t,r.config)}}),i.length&&this._localObservationBuffer.push(...i),this._localObservationBuffer=this._localObservationBuffer.filter(t=>e-t.timestamp<=250);const r=this._localFusion.step(this._localObservationBuffer,e);"online"!==this._fusionBackendState&&(this._fusionTargets=r,"connecting"===this._fusionBackendState&&r.length&&(this._fusionBackendState="fallback")),this.requestUpdate()}async _connectFusionBackend(){if(this._fusionConnecting||this._fusionUnsubscribe||!this._config.radars?.length||!this._hass)return;this._fusionConnecting=!0;const t=this._config.fusion_id||"home";try{if(!1!==this._config.sync_backend)try{await this._hass.callWS({type:"mmwave_fusion/configure",config:{fusion_id:t,room_w:this._config.room_w,room_d:this._config.room_d,radars:this._config.radars,zones:this._config.zones??[],cameras:this._config.cameras??[],fusion:this._config.fusion??{}}})}catch(t){console.info("MMWave Fusion backend configuration was not updated",t)}this._fusionUnsubscribe=await this._hass.connection.subscribeMessage(e=>{if(e.fusion_id!==t)return;this._fusionTargets=e.tracks,e.events.length&&(this._fusionEvents=[...e.events,...this._fusionEvents].slice(0,100));const i=new Map(e.radars.map(t=>[t.id,t.available]));this._fusionRadars=this._fusionRadars.map(t=>({...t,available:i.get(t.config.id)??t.available})),this._fusionBackendState="online",this.requestUpdate()},{type:"mmwave_fusion/subscribe",fusion_id:t}),await this._loadFusionEvents()}catch(t){console.warn("MMWave Fusion backend unavailable; using browser fallback",t),this._fusionBackendState="fallback"}finally{this._fusionConnecting=!1}}_disconnectFusionBackend(){this._fusionUnsubscribe?.(),this._fusionUnsubscribe=void 0,this._fusionConnecting=!1}async _loadFusionEvents(){if(this._hass&&this._config.radars?.length)try{const t=await this._hass.callWS({type:"mmwave_fusion/query_events",fusion_id:this._config.fusion_id||"home",limit:100});this._fusionEvents=t.map(t=>({event_id:String(t.event_id),fusion_id:String(t.fusion_id),track_id:String(t.track_id),event_type:t.event_type,zone_id:String(t.zone_id),timestamp:Number(t.ts),x:Number(t.x),y:Number(t.y),clip_path:t.clip_path?String(t.clip_path):void 0,camera_entity_id:t.camera_entity_id?String(t.camera_entity_id):void 0,clip_status:t.clip_status?String(t.clip_status):void 0,clip_provider:t.clip_provider?String(t.clip_provider):void 0,clip_file_size:t.clip_file_size?Number(t.clip_file_size):void 0}))}catch(t){console.info("MMWave Fusion history is not available",t)}}async _selectFusionEvent(t){this._selectedFusionEvent=t.detail,this._fusionVideoUrl="";try{await this._loadFusionEvents();const e=this._fusionEvents.find(e=>e.event_id===t.detail.event_id)??t.detail;if(this._selectedFusionEvent=e,this._fusionHistoryTrack=await this._hass.callWS({type:"mmwave_fusion/query_track",track_id:e.track_id,limit:1e4}),e.clip_path){const t=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${e.clip_path}`});this._fusionVideoUrl=t.url}}catch(t){console.warn("Failed to load fused trajectory event",t)}}_gotoTab(t){this._tab=t,this._livePanel?.clearTrail(),this.requestUpdate()}_onPolygonPointAdded(t){const e=this.shadowRoot?.querySelector("#poly-cv"),i={W:e?.offsetWidth??400,H:165,roomW:this._cal?.room_w??this._config.room_w,roomD:this._cal?.room_d??this._config.room_d},r=he(t.detail.canvasX,t.detail.canvasY,i),a={...this._cal,polygon:[...this._cal.polygon,r]};this._cal=a,this.requestUpdate()}_onCalibrationChanged(t){let e=t.detail;const i=e.room_w??this._config.room_w,r=e.room_d??this._config.room_d;e.radar_x>i&&(e={...e,radar_x:i}),e.radar_y>r&&(e={...e,radar_y:r}),this._cal=e,this.requestUpdate()}_onCaptureRequested(){}_loadFromDevice(){if(!this._hass||!this._config)return;const t=this._config.x_entity||"";if(!t)return;const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let i="";if(e)i=e[1];else{const e=t.split(".")[1]?.split("_")||[];i=e.slice(0,e.length-1).join("_")}const r={...this._cal},a=["radar_x","radar_y","radar_z","yaw","pitch","roll"];for(const t of a){const e=this._hass.states[`number.${i}_${t}`];e&&e.state&&!isNaN(Number(e.state))&&(r[t]=Number(e.state))}const o=this._config.polygon_entity||`text.${i}_polygon_config`,s=this._hass.states[o];if(s&&s.state){const t=s.state.split(";").filter(t=>t.includes(",")).map(t=>{const[e,i]=t.split(",");return{x:parseFloat(e),y:parseFloat(i)}});t.length>0?r.polygon=t:r.polygon=[]}else s&&""===s.state&&(r.polygon=[]);const n=r.room_w??this._config.room_w,l=r.room_d??this._config.room_d;r.radar_x>n&&(r.radar_x=n),r.radar_y>l&&(r.radar_y=l),this._cal=r,this.requestUpdate()}async _sync(){const t=this._config.x_entity||"";if(!t)return void alert("Error: x_entity is not configured.");const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let i="";if(e)i=e[1];else{const e=t.split(".")[1]?.split("_")||[];i=e.slice(0,e.length-1).join("_")}this._syncState="syncing";try{const t={radar_x:this._cal.radar_x,radar_y:this._cal.radar_y,radar_z:this._cal.radar_z,yaw:this._cal.yaw,pitch:this._cal.pitch,roll:this._cal.roll};for(const[e,r]of Object.entries(t)){const t=`number.${i}_${e}`;try{await this._hass.callService("number","set_value",{entity_id:t,value:r})}catch(e){console.warn(`Failed to sync ${t}`,e)}}const e=this._cal.polygon.map(t=>`${t.x},${t.y}`).join(";"),r=this._config.polygon_entity||`text.${i}_polygon_config`;if(void 0!==this._hass.states[r])try{await this._hass.callService("text","set_value",{entity_id:r,value:e})}catch(t){console.warn(`Failed to sync ${r}`,t)}this._syncState="success"}catch(t){this._syncState="error",console.error(t)}finally{null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._syncResetTimer=window.setTimeout(()=>this._syncState="idle",2200)}}_reset(){if(!confirm(this._L("actions.reset_confirm")||"Reset to factory defaults?"))return;const t=this._adapter.getDefaultCalibration(),e=this._config.room_w,i=this._config.room_d;t.radar_x=Math.round(.382*e),t.radar_y=Math.round(.382*i),this._cal=t,this._gotoTab(0)}render(){if(!this._config||!this._adapter)return j;if(this._config.radars?.length)return this._renderFusionMode();const t=this._cal.room_w??this._config.room_w,e=this._cal.room_d??this._config.room_d,i=this._hass?.language??"en",r=this._insideTargetCount(),a=[{icon:"mdi:cube-scan",title:this._ui("安装定位","Installation"),description:this._ui("在 3D 房间中放置雷达","Place the radar in the 3D room")},{icon:"mdi:compass-outline",title:this._ui("方向校准","Direction"),description:this._ui("通过两个参考点校准偏航","Calibrate yaw with two reference points")},{icon:"mdi:radar",title:this._ui("实时验证","Live test"),description:this._ui("检查目标、边界和运动轨迹","Verify targets, boundary and trails")}];return this._isCalibrating?O`
      <ha-card>
        <header class="workflow-header">
          <button
            class="icon-button"
            type="button"
            title=${this._ui("返回雷达视图","Back to radar view")}
            aria-label=${this._ui("返回雷达视图","Back to radar view")}
            @click=${()=>this._isCalibrating=!1}
          >
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <div class="workflow-title">
            <strong>${this._ui("雷达空间校准","Radar spatial calibration")}</strong>
            <span>${this._adapter.info.displayName}</span>
          </div>
          <span class="step-count">${this._tab+1} / ${a.length}</span>
        </header>

        <nav class="workflow-steps" aria-label=${this._ui("校准步骤","Calibration steps")}>
          ${a.map((t,e)=>O`
              <button
                type="button"
                class="workflow-step ${this._tab===e?"current":""} ${this._tab>e?"complete":""}"
                aria-current=${this._tab===e?"step":j}
                @click=${()=>this._gotoTab(e)}
              >
                <span class="step-icon">
                  ${this._tab>e?O`<ha-icon icon="mdi:check"></ha-icon>`:O`<ha-icon icon=${t.icon}></ha-icon>`}
                </span>
                <span class="step-copy"><strong>${t.title}</strong><small>${t.description}</small></span>
              </button>
            `)}
        </nav>

        <div
          class="workflow-body"
          @calibration-changed=${this._onCalibrationChanged}
          @polygon-point-added=${this._onPolygonPointAdded}
          @capture-requested=${this._onCaptureRequested}
        >
          ${0===this._tab?O` <mmwave-geo-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${i}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-geo-panel>`:j}
          ${1===this._tab?O` <mmwave-yaw-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${i}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-yaw-panel>`:j}
          ${2===this._tab?O` <mmwave-live-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${i}
                .roomW=${t}
                .roomD=${e}
                .targets=${this._targets}
                .present=${this._present}
                .maxRangeM=${this._maxRangeM}
                .showStatus=${!0}
              >
              </mmwave-live-panel>`:j}
        </div>

        <footer class="workflow-footer">
          <div class="footer-tools">
            <button class="text-button" type="button" @click=${this._loadFromDevice}>
              <ha-icon icon="mdi:backup-restore"></ha-icon><span>${this._ui("撤销修改","Revert")}</span>
            </button>
            <button class="text-button danger" type="button" @click=${this._reset}>
              <ha-icon icon="mdi:restore-alert"></ha-icon><span>${this._ui("恢复默认","Reset")}</span>
            </button>
          </div>
          <div class="footer-actions">
            ${this._tab>0?O`<button class="secondary-button" type="button" @click=${()=>this._gotoTab(this._tab-1)}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>${this._ui("上一步","Back")}
                </button>`:j}
            ${this._tab<2?O`<button class="primary-button" type="button" @click=${()=>this._gotoTab(this._tab+1)}>
                  ${this._ui("下一步","Continue")}<ha-icon icon="mdi:chevron-right"></ha-icon>
                </button>`:O`<button
                  class="primary-button sync ${this._syncState}"
                  type="button"
                  ?disabled=${"syncing"===this._syncState}
                  @click=${this._sync}
                >
                  <ha-icon
                    icon=${"success"===this._syncState?"mdi:check-circle":"error"===this._syncState?"mdi:alert-circle":"mdi:cloud-upload-outline"}
                  ></ha-icon>
                  ${this._syncLabel()}
                </button>`}
          </div>
        </footer>
      </ha-card>
    `:O`
        <ha-card class="live-card">
          <header class="live-header">
            <div class="identity">
              <div class="logo-tile ${this._present?"online":""}">${we}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name||this._ui("人体存在雷达","Presence radar")}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span class="presence-chip ${r>0?"active":this._present?"filtered":""}">
                <i></i>
                ${r>0?this._ui(`${r} 个目标`,`${r} target${1===r?"":"s"}`):this._present?this._ui("边界外","Outside"):this._ui("无人","Clear")}
              </span>
              <button
                class="icon-button"
                type="button"
                title=${this._ui("打开校准","Open calibration")}
                aria-label=${this._ui("打开校准","Open calibration")}
                @click=${()=>{this._isCalibrating=!0,this._tab=0}}
              >
                <ha-icon icon="mdi:tune-variant"></ha-icon>
              </button>
            </div>
          </header>
          <div class="live-body">
            <mmwave-live-panel
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${i}
              .roomW=${t}
              .roomD=${e}
              .targets=${this._targets}
              .present=${this._present}
              .maxRangeM=${this._maxRangeM}
            >
            </mmwave-live-panel>
          </div>
        </ha-card>
      `}_renderFusionMode(){const t=this._hass?.language??"en",e=this._fusionRadars.filter(t=>t.available).length;return O`
      <ha-card class="live-card fusion-card">
        <header class="live-header">
          <div class="identity">
            <div class="logo-tile ${this._fusionTargets.length?"online":""}">${we}</div>
            <div class="identity-copy">
              <div class="card-title">${this._config.name||this._ui("多雷达融合","Multi-radar fusion")}</div>
              <div class="card-subtitle">
                ${this._ui(`${e}/${this._fusionRadars.length} 台雷达 · ${this._config.fusion_id||"home"}`,`${e}/${this._fusionRadars.length} radars · ${this._config.fusion_id||"home"}`)}
              </div>
            </div>
          </div>
          <span class="presence-chip ${this._fusionTargets.length?"active":""}">
            <i></i>
            ${this._fusionTargets.length?this._ui(`${this._fusionTargets.length} 个目标`,`${this._fusionTargets.length} targets`):this._ui("无人","Clear")}
          </span>
        </header>
        <div class="live-body">
          <mmwave-fusion-panel
            .roomW=${this._config.room_w}
            .roomD=${this._config.room_d}
            .radars=${this._fusionRadars}
            .targets=${this._fusionTargets}
            .zones=${this._config.zones??[]}
            .events=${this._fusionEvents}
            .historyTrack=${this._fusionHistoryTrack}
            .selectedEventId=${this._selectedFusionEvent?.event_id??""}
            .lang=${t}
            .backendState=${this._fusionBackendState}
            @fusion-event-selected=${this._selectFusionEvent}
          ></mmwave-fusion-panel>
          ${this._selectedFusionEvent?O`
                <section class="fusion-playback">
                  <header>
                    <strong
                      >${this._selectedFusionEvent.event_type.toUpperCase()} ·
                      ${this._selectedFusionEvent.zone_id}</strong
                    >
                    <span>${new Date(1e3*this._selectedFusionEvent.timestamp).toLocaleString()}</span>
                  </header>
                  ${this._fusionVideoUrl?O`<video controls preload="metadata" .src=${this._fusionVideoUrl}></video>`:O`<p>
                        ${this._ui("该事件没有可播放片段，或录像仍在生成。","No playable clip is available yet, or recording is still in progress.")}
                        ${this._selectedFusionEvent.clip_status?O` (${this._selectedFusionEvent.clip_status})`:j}
                      </p>`}
                </section>
              `:j}
        </div>
      </ha-card>
    `}static{this.styles=s`
    :host {
      display: block;
      --mmwave-primary: #0b825c;
      --mmwave-primary-soft: rgba(11, 130, 92, 0.1);
      --mmwave-surface: color-mix(in srgb, var(--card-background-color, #fff) 94%, var(--mmwave-primary));
      --mmwave-line: var(--divider-color, rgba(128, 128, 128, 0.18));
      --mmwave-secondary: #4b5563;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 16px);
      box-shadow: var(--ha-card-box-shadow, 0 8px 28px rgba(0, 0, 0, 0.08));
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
      border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
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
      border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
    }
    .tab {
      flex: 1;
      padding: 12px 6px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      text-align: center;
      border: none;
      background: none;
      color: var(--secondary-text-color);
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }
    .tab:hover {
      background: rgba(128, 128, 128, 0.05);
    }
    .tab.act {
      color: var(--mmwave-primary);
    }
    .tab.act::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 15%;
      right: 15%;
      height: 2px;
      background: var(--mmwave-primary);
      border-radius: 2px 2px 0 0;
    }
    #body {
      padding: 16px;
      min-height: 270px;
    }
    #foot {
      padding: 12px 16px 16px;
      border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(128, 128, 128, 0.02);
    }
    .left-btns {
      display: flex;
      gap: 8px;
    }
    .btn-sync {
      background: var(--mmwave-primary);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .btn-sync:hover {
      opacity: 0.9;
    }
    .btn-rst {
      background: transparent;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .btn-rst:hover {
      background: rgba(128, 128, 128, 0.05);
    }

    .live-header,
    .workflow-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
    }
    .identity,
    .header-actions,
    .footer-tools,
    .footer-actions {
      display: flex;
      align-items: center;
    }
    .identity {
      min-width: 0;
      gap: 11px;
    }
    .logo-tile {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      flex: none;
      border: 1px solid var(--mmwave-line);
      border-radius: 12px;
      background: var(--mmwave-surface);
      opacity: 0.62;
      transition: 0.25s ease;
    }
    .logo-tile.online {
      border-color: rgba(11, 130, 92, 0.3);
      box-shadow: 0 0 0 4px rgba(11, 130, 92, 0.08);
      opacity: 1;
    }
    .identity-copy,
    .workflow-title {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
    }
    .card-title,
    .workflow-title strong {
      overflow: hidden;
      color: var(--primary-text-color);
      font-size: 15px;
      font-weight: 650;
      line-height: 1.25;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-subtitle,
    .workflow-title span {
      overflow: hidden;
      color: var(--secondary-text-color);
      font-size: 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header-actions {
      flex: none;
      gap: 8px;
    }
    .presence-chip,
    .step-count {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border: 1px solid var(--mmwave-line);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.05);
      font-size: 10px;
      font-weight: 650;
      white-space: nowrap;
    }
    .presence-chip i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9ca3af;
    }
    .presence-chip.active {
      border-color: rgba(11, 130, 92, 0.24);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .presence-chip.active i {
      background: var(--mmwave-primary);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.13);
    }
    .presence-chip.filtered i {
      background: var(--warning-color, #ff9800);
    }
    .icon-button {
      width: 36px;
      height: 36px;
      display: inline-grid;
      place-items: center;
      flex: none;
      padding: 0;
      border: 1px solid var(--mmwave-line);
      border-radius: 11px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.04);
      cursor: pointer;
      transition: 0.18s ease;
    }
    .icon-button:hover {
      border-color: rgba(11, 130, 92, 0.35);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .icon-button ha-icon {
      --mdc-icon-size: 20px;
    }
    .live-body {
      padding: 0 12px 12px;
    }
    .fusion-playback {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.035);
    }
    .fusion-playback header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
      color: var(--primary-text-color);
      font-size: 10px;
    }
    .fusion-playback header span,
    .fusion-playback p {
      color: var(--secondary-text-color);
      font-size: 9px;
    }
    .fusion-playback video {
      display: block;
      width: 100%;
      max-height: 360px;
      border-radius: 8px;
      background: #000;
    }
    .workflow-header {
      justify-content: flex-start;
      border-bottom: 1px solid var(--mmwave-line);
      background: linear-gradient(135deg, rgba(11, 130, 92, 0.065), transparent 65%);
    }
    .workflow-title {
      flex: 1;
    }
    .workflow-steps {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--mmwave-line);
    }
    .workflow-step {
      display: flex;
      min-width: 0;
      align-items: center;
      gap: 8px;
      padding: 9px;
      border: 1px solid transparent;
      border-radius: 11px;
      color: var(--secondary-text-color);
      background: transparent;
      text-align: left;
      cursor: pointer;
      transition: 0.18s ease;
    }
    .workflow-step:hover {
      background: rgba(128, 128, 128, 0.06);
    }
    .workflow-step.current {
      border-color: rgba(11, 130, 92, 0.22);
      color: var(--mmwave-primary);
      background: var(--mmwave-primary-soft);
    }
    .workflow-step.complete {
      color: var(--mmwave-primary);
    }
    .step-icon {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 9px;
      background: rgba(128, 128, 128, 0.1);
    }
    .workflow-step.current .step-icon,
    .workflow-step.complete .step-icon {
      color: #fff;
      background: var(--mmwave-primary);
    }
    .step-icon ha-icon {
      --mdc-icon-size: 17px;
    }
    .step-copy {
      display: flex;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
    }
    .step-copy strong {
      font-size: 11px;
      font-weight: 700;
    }
    .step-copy small {
      overflow: hidden;
      font-size: 9px;
      font-weight: 400;
      line-height: 1.25;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .workflow-body {
      min-height: 320px;
      padding: 16px;
    }
    .workflow-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 16px 16px;
      border-top: 1px solid var(--mmwave-line);
      background: rgba(128, 128, 128, 0.025);
    }
    .footer-tools,
    .footer-actions {
      gap: 7px;
    }
    .text-button,
    .secondary-button,
    .primary-button {
      display: inline-flex;
      min-height: 36px;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 7px 11px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 650;
      cursor: pointer;
      transition: 0.18s ease;
    }
    .text-button {
      padding-inline: 7px;
      border: 1px solid transparent;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .text-button:hover,
    .secondary-button:hover {
      background: rgba(128, 128, 128, 0.08);
    }
    .text-button.danger:hover {
      color: var(--error-color, #ef5350);
      background: rgba(239, 83, 80, 0.08);
    }
    .secondary-button {
      border: 1px solid var(--mmwave-line);
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
    }
    .primary-button {
      border: 1px solid var(--mmwave-primary);
      color: #fff;
      background: var(--mmwave-primary);
      box-shadow: 0 5px 14px rgba(11, 130, 92, 0.2);
    }
    .primary-button:hover {
      filter: brightness(1.06);
      transform: translateY(-1px);
    }
    .primary-button:disabled {
      cursor: wait;
      opacity: 0.65;
      transform: none;
    }
    .primary-button.success {
      border-color: var(--success-color, #43a047);
      background: var(--success-color, #43a047);
    }
    .primary-button.error {
      border-color: var(--error-color, #e53935);
      background: var(--error-color, #e53935);
    }
    .text-button ha-icon,
    .secondary-button ha-icon,
    .primary-button ha-icon {
      --mdc-icon-size: 17px;
    }
    @media (max-width: 520px) {
      .workflow-steps {
        gap: 4px;
        padding-inline: 10px;
      }
      .workflow-step {
        flex-direction: column;
        gap: 4px;
        text-align: center;
      }
      .step-copy small {
        display: none;
      }
      .workflow-body {
        padding: 12px;
      }
      .workflow-footer {
        align-items: stretch;
        padding: 10px 12px 12px;
      }
      .footer-tools span {
        display: none;
      }
      .footer-actions {
        margin-left: auto;
      }
      .presence-chip {
        display: none;
      }
    }
  `}};t([gt()],Be.prototype,"_config",void 0),t([gt()],Be.prototype,"_adapter",void 0),t([gt()],Be.prototype,"_cal",void 0),t([gt()],Be.prototype,"_tab",void 0),t([gt()],Be.prototype,"_isCalibrating",void 0),t([gt()],Be.prototype,"_targets",void 0),t([gt()],Be.prototype,"_present",void 0),t([gt()],Be.prototype,"_maxRangeM",void 0),t([gt()],Be.prototype,"_syncState",void 0),t([gt()],Be.prototype,"_fusionTargets",void 0),t([gt()],Be.prototype,"_fusionRadars",void 0),t([gt()],Be.prototype,"_fusionBackendState",void 0),t([gt()],Be.prototype,"_fusionEvents",void 0),t([gt()],Be.prototype,"_fusionHistoryTrack",void 0),t([gt()],Be.prototype,"_selectedFusionEvent",void 0),t([gt()],Be.prototype,"_fusionVideoUrl",void 0),t([ut("mmwave-yaw-panel")],Be.prototype,"_yawPanel",void 0),t([ut("mmwave-live-panel")],Be.prototype,"_livePanel",void 0),Be=t([dt($e)],Be);const Oe=["#0b825c","#03a9f4","#e91e63","#ff9800","#8bc34a","#9c27b0"];let Ie=class extends nt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.zones=[],this.radars=[],this.lang="en",this.originalId="",this.error=""}ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}beginNew(){let t=this.zones.length+1;for(;this.zones.some(e=>e.id===`zone_${t}`);)t++;this.originalId="",this.draft={id:`zone_${t}`,name:this.ui(`区域 ${t}`,`Zone ${t}`),dwell_s:0,polygon:[]},this.error=""}select(t){this.originalId=t.id,this.draft={...t,polygon:t.polygon.map(t=>({...t}))},this.error=""}patch(t){this.draft&&(this.draft={...this.draft,...t})}addPoint(t){if(!this.draft)return;const e=t.currentTarget.getBoundingClientRect(),i={x:Math.round(Math.min(Math.max((t.clientX-e.left)/e.width*this.roomW,0),this.roomW)),y:Math.round(Math.min(Math.max((t.clientY-e.top)/e.height*this.roomD,0),this.roomD))};this.patch({polygon:[...this.draft.polygon,i]})}undoPoint(){this.draft?.polygon.length&&this.patch({polygon:this.draft.polygon.slice(0,-1)})}save(){if(!this.draft)return;const t=this.draft.id.trim();if(!t)return void(this.error=this.ui("区域 ID 不能为空","Zone ID cannot be empty"));if(this.zones.some(e=>e.id===t&&e.id!==this.originalId))return void(this.error=this.ui("区域 ID 必须唯一","Zone ID must be unique"));if(this.draft.polygon.length<3)return void(this.error=this.ui("至少需要 3 个顶点","At least three vertices are required"));const e={...this.draft,id:t,name:this.draft.name?.trim()||t},i=this.originalId?this.zones.map(t=>t.id===this.originalId?e:t):[...this.zones,e];this.originalId=t,this.draft=e,this.error="",this.emit(i)}removeZone(){this.originalId&&this.emit(this.zones.filter(t=>t.id!==this.originalId)),this.draft=void 0,this.originalId="",this.error=""}emit(t){this.dispatchEvent(new CustomEvent("zones-changed",{detail:t,bubbles:!0,composed:!0}))}pointString(t){return t.map(t=>`${t.x},${t.y}`).join(" ")}render(){const t=this.draft?[...this.zones.filter(t=>t.id!==this.originalId),this.draft]:this.zones;return O`
      <div class="toolbar">
        <div class="zone-tabs">
          ${this.zones.map((t,e)=>O`<button
                type="button"
                class=${this.originalId===t.id?"active":""}
                style="--zone-color:${Oe[e%Oe.length]}"
                @click=${()=>this.select(t)}
              >
                ${t.name||t.id}
              </button>`)}
        </div>
        <button type="button" class="new" @click=${this.beginNew}>＋ ${this.ui("新建区域","New zone")}</button>
      </div>
      <svg
        class=${this.draft?"floor active":"floor"}
        viewBox=${`0 0 ${this.roomW} ${this.roomD}`}
        style=${`aspect-ratio:${this.roomW}/${this.roomD}`}
        @click=${this.addPoint}
        role="img"
        aria-label=${this.ui("事件区域户型编辑器","Floor-plan event zone editor")}
      >
        <defs>
          <pattern id="zone-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" class="background" />
        ${t.map((t,e)=>{const i=this.draft===t,r=Oe[e%Oe.length];return O`
            ${t.polygon.length>=3?O`<polygon
                  points=${this.pointString(t.polygon)}
                  fill=${r}
                  fill-opacity=${i?".20":".09"}
                  stroke=${r}
                  stroke-width=${i?"3":"2"}
                  vector-effect="non-scaling-stroke"
                />`:O`<polyline
                  points=${this.pointString(t.polygon)}
                  fill="none"
                  stroke=${r}
                  stroke-width="3"
                  vector-effect="non-scaling-stroke"
                />`}
            ${t.polygon.map((t,e)=>O`
                <circle
                  cx=${t.x}
                  cy=${t.y}
                  r="7"
                  fill=${r}
                  stroke="white"
                  stroke-width="2"
                  vector-effect="non-scaling-stroke"
                />
                ${i?O`<text x=${t.x} y=${t.y-12} class="point-label">${e+1}</text>`:j}
              `)}
          `})}
        ${this.radars.map(t=>{const e=t.calibration??{};return O`<g
            class="radar"
            transform=${`translate(${Number(e.radar_x??0)} ${Number(e.radar_y??0)}) rotate(${Number(e.yaw??0)})`}
          >
            <circle r="11" /><path d="M 0 0 L -12 25 M 0 0 L 12 25" /><text y="-17">${t.id}</text>
          </g>`})}
        <text x="8" y="18" class="axis">0</text>
        <text x=${this.roomW-8} y="18" text-anchor="end" class="axis">X → ${this.roomW}cm</text>
        <text x="8" y=${this.roomD-9} class="axis">Y ↓ ${this.roomD}cm</text>
      </svg>
      ${this.draft?O`
            <div class="form-grid">
              <label
                >ID<input
                  .value=${this.draft.id}
                  @input=${t=>this.patch({id:t.target.value})}
              /></label>
              <label
                >${this.ui("名称","Name")}<input
                  .value=${this.draft.name??""}
                  @input=${t=>this.patch({name:t.target.value})}
              /></label>
              <label
                >${this.ui("驻留秒数","Dwell seconds")}<input
                  type="number"
                  min="0"
                  step="1"
                  .value=${String(this.draft.dwell_s??0)}
                  @input=${t=>this.patch({dwell_s:Number(t.target.value)})}
              /></label>
              <div class="vertex-count">${this.draft.polygon.length} ${this.ui("个顶点","vertices")}</div>
            </div>
            <div class="actions">
              <button type="button" @click=${this.undoPoint} ?disabled=${!this.draft.polygon.length}>
                ↶ ${this.ui("撤销顶点","Undo point")}
              </button>
              <button type="button" @click=${()=>this.patch({polygon:[]})} ?disabled=${!this.draft.polygon.length}>
                ${this.ui("清空","Clear")}
              </button>
              <button type="button" class="danger" @click=${this.removeZone}>
                ${this.originalId?this.ui("删除区域","Delete zone"):this.ui("取消","Cancel")}
              </button>
              <button type="button" class="save" @click=${this.save}>${this.ui("保存区域","Save zone")}</button>
            </div>
            ${this.error?O`<div class="error">${this.error}</div>`:j}
          `:O`<p class="hint">
            ${this.ui("选择已有区域或新建区域，然后在户型图上依次点击顶点。","Select or create a zone, then click its vertices on the floor plan.")}
          </p>`}
    `}static{this.styles=s`
    :host {
      display: block;
    }
    .toolbar,
    .actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar {
      justify-content: space-between;
      margin-bottom: 7px;
    }
    .zone-tabs {
      display: flex;
      gap: 5px;
      min-width: 0;
      overflow-x: auto;
    }
    button {
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 7px;
      padding: 7px 9px;
      color: var(--secondary-text-color);
      background: var(--card-background-color, #fff);
      font-size: 9px;
      cursor: pointer;
    }
    .zone-tabs button {
      border-left: 4px solid var(--zone-color);
      white-space: nowrap;
    }
    .zone-tabs button.active,
    button.save {
      color: white;
      background: #0b825c;
    }
    button.new {
      color: #0b825c;
      white-space: nowrap;
    }
    button.danger {
      color: var(--error-color, #e53935);
    }
    button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .floor {
      box-sizing: border-box;
      width: 100%;
      min-height: 180px;
      max-height: 520px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 10px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.035);
    }
    .floor.active {
      cursor: crosshair;
    }
    .background {
      fill: url(#zone-grid);
    }
    .point-label,
    .axis,
    .radar text {
      fill: var(--secondary-text-color);
      font: 700 10px system-ui;
      text-anchor: middle;
      pointer-events: none;
    }
    .axis {
      font-size: 9px;
      text-anchor: start;
    }
    .radar {
      pointer-events: none;
    }
    .radar circle {
      fill: rgba(3, 169, 244, 0.15);
      stroke: #03a9f4;
      stroke-width: 2;
      vector-effect: non-scaling-stroke;
    }
    .radar path {
      fill: none;
      stroke: #03a9f4;
      stroke-width: 2;
      stroke-dasharray: 4 3;
      vector-effect: non-scaling-stroke;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-top: 8px;
    }
    .form-grid label {
      display: grid;
      gap: 4px;
      color: var(--secondary-text-color);
      font-size: 9px;
    }
    .form-grid input {
      min-width: 0;
      padding: 6px 7px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 7px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      font-size: 10px;
    }
    .vertex-count {
      display: grid;
      place-items: center;
      align-self: end;
      min-height: 29px;
      border-radius: 7px;
      color: #0b825c;
      background: rgba(11, 130, 92, 0.08);
      font-size: 9px;
      font-weight: 700;
    }
    .actions {
      justify-content: flex-end;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    .hint,
    .error {
      margin: 7px 1px 0;
      font-size: 9px;
    }
    .hint {
      color: var(--secondary-text-color);
    }
    .error {
      color: var(--error-color, #e53935);
    }
    @media (max-width: 500px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `}};t([pt({type:Number})],Ie.prototype,"roomW",void 0),t([pt({type:Number})],Ie.prototype,"roomD",void 0),t([pt({attribute:!1})],Ie.prototype,"zones",void 0),t([pt({attribute:!1})],Ie.prototype,"radars",void 0),t([pt({attribute:!1})],Ie.prototype,"lang",void 0),t([gt()],Ie.prototype,"draft",void 0),t([gt()],Ie.prototype,"originalId",void 0),t([gt()],Ie.prototype,"error",void 0),Ie=t([dt("mmwave-zone-editor")],Ie);let je=class extends nt{constructor(){super(...arguments),this._devices=[],this._advOpen=!1,this._deviceStatus="idle",this._matchedEntities=0,this._fusionJsonError=""}updated(t){super.updated(t),t.has("hass")&&this.hass&&0===this._devices.length&&this._loadDevices()}async _loadDevices(){try{this._devices=await this.hass.callWS({type:"config/device_registry/list"})}catch(t){console.warn("Failed to load devices",t)}}setConfig(t){this._config={...yt,...t}}_L(t){return xe(t,this.hass?.language)}_ui(t,e){return(this.hass?.language??"en").toLowerCase().startsWith("zh")?t:e}_changed(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_setMode(t){if("fusion"===t){const t={id:"radar_1",radar_model:"ld2450|ld2452",device_id:"",calibration:{radar_x:100,radar_y:100,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}};this._config={...this._config,fusion_id:this._config.fusion_id||"home",sync_backend:!0,radars:this._config.radars?.length?this._config.radars:[t]}}else this._config={...this._config,radars:void 0};this._emitConfig()}_emitConfig(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_updateFusionRadar(t,e){const i=[...this._config.radars??[]];i[t]={...i[t],...e},this._config={...this._config,radars:i},this._emitConfig()}_updateRadarCalibration(t,e,i){const r=this._config.radars?.[t];r&&this._updateFusionRadar(t,{calibration:{...r.calibration,[e]:i}})}_addFusionRadar(){const t=[...this._config.radars??[]],e=t.length+1;t.push({id:`radar_${e}`,radar_model:"ld2450|ld2452",device_id:"",calibration:{radar_x:Math.round(Number(this._config.room_w)*e/(e+1)),radar_y:Math.round(.2*Number(this._config.room_d)),radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}}),this._config={...this._config,radars:t},this._emitConfig()}_removeFusionRadar(t){const e=(this._config.radars??[]).filter((e,i)=>i!==t);this._config={...this._config,radars:e},this._emitConfig()}async _fusionDeviceChanged(t,e){const i=e.target.value;if(this._updateFusionRadar(t,{device_id:i}),i)try{const e=await this.hass.callWS({type:"config/entity_registry/list"}),r={};for(const t of e.filter(t=>t.device_id===i)){const e=t.entity_id,i=(t.original_name||e).toLowerCase(),a=e.match(/target_(\d+)_x/),o=e.match(/target_(\d+)_y/),s=e.match(/target_(\d+)_speed/);e.startsWith("binary_sensor.")&&(e.includes("presence")||i.includes("presence"))?r.presence_entity=e:e.startsWith("sensor.")&&(e.includes("target_frame")||i.includes("target frame"))?r.frame_entity=e:a?r[`target_${a[1]}_x_entity`]=e:o?r[`target_${o[1]}_y_entity`]=e:s?r[`target_${s[1]}_speed_entity`]=e:e.startsWith("sensor.")&&(e.endsWith("_x")||i.endsWith(" x"))?r.x_entity=e:e.startsWith("sensor.")&&(e.endsWith("_y")||i.endsWith(" y"))?r.y_entity=e:e.startsWith("sensor.")&&(e.endsWith("_z")||i.endsWith(" z"))&&(r.z_entity=e)}this._updateFusionRadar(t,r)}catch(t){console.warn("Failed to match fusion radar entities",t)}}_updateFusionJson(t,e){try{const i=JSON.parse(e.target.value);if(!Array.isArray(i))throw new Error("Value must be a JSON array");this._fusionJsonError="",this._changed(t,i)}catch(t){this._fusionJsonError=t instanceof Error?t.message:String(t)}}_fusionZonesChanged(t){this._changed("zones",t.detail??[])}async _deviceDropdownChanged(t){const e=t.target.value;if(this._changed("device_id",e),!e)return this._deviceStatus="idle",void(this._matchedEntities=0);this._deviceStatus="loading";try{const t=(await this.hass.callWS({type:"config/entity_registry/list"})).filter(t=>t.device_id===e),i={};for(const e of t){const t=e.entity_id,r=(e.original_name||t).toLowerCase(),a=t.match(/target_(\d+)_x/),o=t.match(/target_(\d+)_y/),s=t.match(/target_(\d+)_speed/);t.startsWith("binary_sensor.")&&(r.includes("presence")||t.includes("presence"))?i.presence_entity=t:t.startsWith("sensor.")&&(r.includes("distance")||t.includes("distance")||r.includes("距离"))?i.distance_entity=t:t.startsWith("sensor.")&&(r.includes("motion_state")||t.includes("motion_state")||r.includes("运动状态")||r.includes("target_state")||t.includes("target_state")||r.includes("目标状态"))?(i.motion_state_entity=t,i.target_state_entity=t):a?i[`target_${a[1]}_x_entity`]=t:o?i[`target_${o[1]}_y_entity`]=t:s?i[`target_${s[1]}_speed_entity`]=t:t.startsWith("sensor.")&&(r.endsWith(" x")||t.endsWith("_x")||t.endsWith("radar_x"))&&!t.includes("room_x")&&!r.includes("room x")?i.x_entity=t:t.startsWith("sensor.")&&(r.endsWith(" y")||t.endsWith("_y")||t.endsWith("radar_y"))&&!t.includes("room_y")&&!r.includes("room y")?i.y_entity=t:t.startsWith("sensor.")&&(r.endsWith(" z")||t.endsWith("_z")||t.endsWith("radar_z"))&&!t.includes("room_z")&&!r.includes("room z")?i.z_entity=t:t.startsWith("sensor.")&&(t.includes("breath")||t.includes("respiration"))?i.breath_entity=t:t.startsWith("sensor.")&&t.includes("heart")?i.heart_entity=t:t.startsWith("sensor.")&&t.includes("sleep")?i.sleep_entity=t:t.startsWith("text.")&&(t.includes("polygon")||r.toLowerCase().includes("polygon")||r.includes("多边形")||r.includes("边界"))&&(i.polygon_entity=t)}Object.keys(i).length>0&&(this._config={...this._config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))),this._matchedEntities=Object.keys(i).length,this._deviceStatus=this._matchedEntities>0?"success":"error"}catch(t){this._deviceStatus="error",console.warn("Failed to auto-populate entities from device",t)}}_modeSelector(t){return O`
      <div class="mode-switch" role="group" aria-label=${this._ui("运行模式","Operating mode")}>
        <button type="button" class=${"single"===t?"active":""} @click=${()=>this._setMode("single")}>
          ${this._ui("单雷达","Single radar")}
        </button>
        <button type="button" class=${"fusion"===t?"active":""} @click=${()=>this._setMode("fusion")}>
          ${this._ui("多雷达融合","Multi-radar fusion")}
        </button>
      </div>
    `}_renderFusionEditor(){const t=ae().filter(t=>!re(t.id)?.info.is1DRanging);return O`
      <div class="card-config">
        <div class="editor-hero">
          <span class="hero-icon">◎</span>
          <div>
            <strong>${this._ui("多雷达融合","Multi-radar fusion")}</strong>
            <p>
              ${this._ui("把多台二维定位雷达放入统一户型坐标系，并同步到持续运行的 HA 后端。","Place multiple 2-D radars in one floor-plan coordinate system and sync them to the persistent HA backend.")}
            </p>
          </div>
        </div>
        ${this._modeSelector("fusion")}

        <h3><span>1</span>${this._ui("户型与后端","Floor plan and backend")}</h3>
        <div class="field">
          <label>${this._ui("卡片标题","Card title")}</label>
          <input
            type="text"
            .value=${this._config.name??""}
            @change=${t=>this._changed("name",t.target.value)}
          />
        </div>
        <div class="field">
          <label>Fusion ID</label>
          <input
            type="text"
            .value=${this._config.fusion_id??"home"}
            @change=${t=>this._changed("fusion_id",t.target.value)}
          />
        </div>
        <div class="room-grid">
          <div class="field compact">
            <label>${this._L("editor.room_w")}</label>
            <input
              type="number"
              min="50"
              step="10"
              .value=${String(this._config.room_w??400)}
              @change=${t=>this._changed("room_w",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._L("editor.room_d")}</label>
            <input
              type="number"
              min="50"
              step="10"
              .value=${String(this._config.room_d??600)}
              @change=${t=>this._changed("room_d",Number(t.target.value))}
            />
          </div>
        </div>
        <label class="check-row">
          <input
            type="checkbox"
            .checked=${!1!==this._config.sync_backend}
            @change=${t=>this._changed("sync_backend",t.target.checked)}
          />
          <span
            >${this._ui("管理员打开卡片时自动同步配置到后端","Sync configuration to the backend when an administrator opens the card")}</span
          >
        </label>

        <h3><span>2</span>${this._ui("雷达设备","Radar devices")}</h3>
        <p class="section-help">
          ${this._ui("只显示可输出二维或三维位置的雷达型号。每台雷达必须使用唯一 ID。","Only radar models with 2-D or 3-D positions are shown. Every radar needs a unique ID.")}
        </p>
        <div class="radar-list">
          ${(this._config.radars??[]).map((e,i)=>{const r=re(e.radar_model),a=e.calibration??{};return O`
              <section class="radar-editor">
                <header>
                  <strong>${this._ui("雷达","Radar")} ${i+1}</strong>
                  <button
                    type="button"
                    class="remove-button"
                    ?disabled=${(this._config.radars?.length??0)<=1}
                    @click=${()=>this._removeFusionRadar(i)}
                  >
                    ×
                  </button>
                </header>
                <div class="two-col">
                  <div class="field compact">
                    <label>ID</label>
                    <input
                      type="text"
                      .value=${e.id}
                      @change=${t=>this._updateFusionRadar(i,{id:t.target.value})}
                    />
                  </div>
                  <div class="field compact">
                    <label>${this._L("editor.model")}</label>
                    <select
                      .value=${e.radar_model}
                      @change=${t=>this._updateFusionRadar(i,{radar_model:t.target.value})}
                    >
                      ${t.map(t=>O`<option value=${t.id} ?selected=${t.id===e.radar_model}>
                            ${t.label}
                          </option>`)}
                    </select>
                  </div>
                </div>
                <div class="field">
                  <label>${this._ui("雷达设备","Radar device")}</label>
                  <select
                    .value=${e.device_id??""}
                    @change=${t=>this._fusionDeviceChanged(i,t)}
                  >
                    <option value="">-- ${this._ui("选择设备","Select device")} --</option>
                    ${this._devices.map(t=>O`<option value=${t.id} ?selected=${t.id===e.device_id}>
                          ${t.name_by_user||t.name||"Unknown device"}
                        </option>`)}
                  </select>
                </div>
                <div class="cal-grid">
                  ${["radar_x","radar_y","radar_z","yaw"].map(t=>O`
                      <div class="field compact">
                        <label>${t}</label>
                        <input
                          type="number"
                          step=${"yaw"===t?"1":"10"}
                          .value=${String(a[t]??("radar_z"===t?220:0))}
                          @change=${e=>this._updateRadarCalibration(i,t,Number(e.target.value))}
                        />
                      </div>
                    `)}
                </div>
                ${r?O`
                      <details class="advanced">
                        <summary>${this._ui("实体映射","Entity mapping")}</summary>
                        <div class="advanced-fields">
                          ${r.getEntitySchema().map(t=>O`
                              <div class="field">
                                <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                                <input
                                  type="text"
                                  list="entities-list"
                                  .value=${String(e[t.key]??"")}
                                  @change=${e=>this._updateFusionRadar(i,{[t.key]:e.target.value})}
                                />
                              </div>
                            `)}
                        </div>
                      </details>
                    `:j}
              </section>
            `})}
        </div>
        <button class="add-button" type="button" @click=${this._addFusionRadar}>
          ＋ ${this._ui("添加雷达","Add radar")}
        </button>

        <h3><span>3</span>${this._ui("事件区域与摄像头","Event zones and cameras")}</h3>
        <p class="section-help">
          ${this._ui("在户型图上点击添加区域顶点，保存后同步到融合后端。","Draw polygon vertices on the floor plan. Saved zones are synchronized to the fusion backend.")}
        </p>
        <mmwave-zone-editor
          .roomW=${Number(this._config.room_w??400)}
          .roomD=${Number(this._config.room_d??600)}
          .zones=${this._config.zones??[]}
          .radars=${this._config.radars??[]}
          .lang=${this.hass.language}
          @zones-changed=${this._fusionZonesChanged}
        ></mmwave-zone-editor>
        <div class="json-field">
          <label>Cameras JSON</label>
          <textarea
            rows="7"
            .value=${JSON.stringify(this._config.cameras??[],null,2)}
            @change=${t=>this._updateFusionJson("cameras",t)}
          ></textarea>
        </div>
        ${this._fusionJsonError?O`<div class="json-error">${this._fusionJsonError}</div>`:j}

        <datalist id="entities-list">
          ${Object.keys(this.hass.states).map(t=>O`<option value=${t}></option>`)}
        </datalist>
      </div>
    `}render(){if(!this.hass||!this._config)return j;const t=this._config.radar_model??"",e=re(t),i=ae();return this._config.radars?.length?this._renderFusionEditor():O` <div class="card-config">
      <div class="editor-hero">
        <span class="hero-icon">◎</span>
        <div>
          <strong>${this._ui("毫米波雷达卡片","MMWave radar card")}</strong>
          <p>
            ${this._ui("选择雷达设备后自动完成实体匹配，只需确认房间尺寸即可开始。","Choose a radar device to match entities automatically, then confirm the room size.")}
          </p>
        </div>
      </div>
      ${this._modeSelector("single")}

      <!-- Basic settings -->
      <h3><span>1</span>${this._ui("基本信息","Basics")}</h3>
      <div class="field">
        <label>${this._ui("卡片标题","Card title")}</label>
        <input
          type="text"
          .value=${this._config.name??""}
          placeholder=${this._ui("人体存在雷达","Presence radar")}
          @change=${t=>this._changed("name",t.target.value)}
        />
      </div>

      <!-- Model selector -->
      <div class="field">
        <label>${this._L("editor.model")}</label>
        <select
          .value=${t}
          @change=${t=>this._changed("radar_model",t.target.value)}
        >
          <option value="" disabled>${this._L("editor.model")}…</option>
          ${i.map(e=>O` <option value=${e.id} ?selected=${e.id===t}>${e.label}</option>`)}
        </select>
      </div>

      <!-- Device selector -->
      <h3><span>2</span>${this._ui("连接雷达设备","Connect radar device")}</h3>
      <p class="section-help">
        ${this._ui("从 Home Assistant 设备列表中选择雷达，卡片会自动识别所需实体。","Select the radar from Home Assistant and the card will identify the required entities.")}
      </p>
      <div class="field">
        <label>${this._ui("雷达设备","Radar device")}</label>
        <select .value=${this._config.device_id??""} @change=${this._deviceDropdownChanged}>
          <option value="">-- 选择设备 (Select Device) --</option>
          ${this._devices.map(t=>O` <option value=${t.id} ?selected=${t.id===this._config.device_id}>
                ${t.name_by_user||t.name||"Unknown Device"}
              </option>`)}
        </select>
      </div>
      ${"idle"!==this._deviceStatus?O`<div class="match-status ${this._deviceStatus}">
            <span>${"loading"===this._deviceStatus?"···":"success"===this._deviceStatus?"✓":"!"}</span>
            ${"loading"===this._deviceStatus?this._ui("正在识别设备实体…","Detecting device entities…"):"success"===this._deviceStatus?this._ui(`已自动匹配 ${this._matchedEntities} 个配置项`,`Matched ${this._matchedEntities} configuration fields`):this._ui("自动识别失败，请展开高级选项手动配置。","Automatic detection failed. Configure entities manually below.")}
          </div>`:""}

      <!-- Room dimensions -->
      <h3><span>3</span>${this._L("editor.room_dimensions")}</h3>
      <p class="section-help">
        ${this._ui("填写房间实际尺寸，后续 3D 安装定位和轨迹显示会使用此比例。","Enter the room dimensions used by the 3D placement and target map.")}
      </p>
      <div class="room-grid">
        <div class="field compact">
          <label>${this._L("editor.room_w")}</label>
          <input
            type="number"
            .value=${String(this._config.room_w??400)}
            min="50"
            step="10"
            @change=${t=>this._changed("room_w",Number(t.target.value))}
          />
        </div>
        <div class="field compact">
          <label>${this._L("editor.room_d")}</label>
          <input
            type="number"
            .value=${String(this._config.room_d??600)}
            min="50"
            step="10"
            @change=${t=>this._changed("room_d",Number(t.target.value))}
          />
        </div>
      </div>

      <!-- Entity fields (model-specific) -->
      ${e?O` <details
            class="advanced"
            ?open=${this._advOpen}
            @toggle=${t=>this._advOpen=t.target.open}
          >
            <summary>
              <span>${this._ui("高级选项：手动指定实体","Advanced: assign entities manually")}</span>
              <small>${this._ui("故障排查","Troubleshooting")}</small>
            </summary>
            <div class="advanced-fields">
              ${e.getEntitySchema().map(t=>O` <div class="field">
                    <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                    <input
                      type="text"
                      list="entities-list"
                      .value=${this._config[t.key]??""}
                      @change=${e=>this._changed(t.key,e.target.value)}
                    />
                  </div>`)}
            </div>
          </details>`:j}

      <datalist id="entities-list">
        ${(this.hass?Object.keys(this.hass.states):[]).map(t=>O`<option value=${t}></option>`)}
      </datalist>
    </div>`}static{this.styles=s`
    :host {
      --mmwave-primary: #0b825c;
      --mmwave-line: var(--divider-color, rgba(128, 128, 128, 0.18));
      display: block;
    }
    .card-config {
      padding: 4px 2px 12px;
    }
    .mode-switch {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      margin: 10px 0 2px;
      padding: 4px;
      border: 1px solid var(--mmwave-line);
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.045);
    }
    .mode-switch button,
    .add-button,
    .remove-button {
      border: 0;
      border-radius: 7px;
      color: var(--secondary-text-color);
      background: transparent;
      font-size: 10px;
      cursor: pointer;
    }
    .mode-switch button {
      padding: 7px;
    }
    .mode-switch button.active {
      color: #fff;
      background: var(--mmwave-primary);
      font-weight: 700;
    }
    .check-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 9px;
      padding: 9px 10px;
      border-radius: 9px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.045);
      font-size: 10px;
    }
    .check-row input {
      accent-color: var(--mmwave-primary);
    }
    .radar-list {
      display: grid;
      gap: 10px;
    }
    .radar-editor {
      padding: 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 12px;
      background: rgba(128, 128, 128, 0.025);
    }
    .radar-editor > header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      color: var(--primary-text-color);
      font-size: 11px;
    }
    .remove-button {
      width: 24px;
      height: 24px;
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.08);
      font-size: 16px;
    }
    .remove-button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .two-col,
    .cal-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 7px;
    }
    .cal-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .radar-editor .field {
      margin-bottom: 7px;
    }
    .add-button {
      width: 100%;
      margin-top: 9px;
      padding: 9px;
      border: 1px dashed rgba(11, 130, 92, 0.4);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.05);
      font-weight: 700;
    }
    .json-field {
      display: grid;
      gap: 5px;
      margin-bottom: 9px;
    }
    .json-field label {
      color: var(--primary-text-color);
      font-size: 10px;
      font-weight: 700;
    }
    .json-field textarea {
      box-sizing: border-box;
      width: 100%;
      padding: 8px;
      border: 1px solid var(--mmwave-line);
      border-radius: 9px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      font:
        9px ui-monospace,
        monospace;
      resize: vertical;
    }
    .json-error {
      padding: 7px 9px;
      border-radius: 8px;
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.08);
      font-size: 9px;
    }
    .editor-hero {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px;
      border: 1px solid rgba(11, 130, 92, 0.2);
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(11, 130, 92, 0.1), rgba(3, 169, 244, 0.04));
    }
    .hero-icon {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 10px;
      color: #fff;
      background: var(--mmwave-primary);
      font-size: 18px;
    }
    .editor-hero strong {
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .editor-hero p,
    .section-help {
      margin: 3px 0 0;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.5;
    }
    h3 {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 18px 0 8px;
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 700;
    }
    h3 span {
      width: 20px;
      height: 20px;
      display: grid;
      place-items: center;
      border-radius: 7px;
      color: #fff;
      background: var(--mmwave-primary);
      font-size: 10px;
    }
    .section-help {
      margin: -3px 0 9px 27px;
    }
    .field {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
      padding: 9px 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.035);
      transition: 0.18s ease;
    }
    .field:focus-within {
      border-color: rgba(11, 130, 92, 0.45);
      box-shadow: 0 0 0 3px rgba(11, 130, 92, 0.07);
    }
    .field label {
      min-width: 130px;
      color: var(--primary-text-color);
      font-size: 11px;
      font-weight: 600;
    }
    .field ha-entity-picker,
    .field select,
    .field input {
      flex: 1;
    }
    .field select,
    .field input {
      min-width: 0;
      padding: 7px 8px;
      border: 1px solid var(--mmwave-line);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 11px;
      outline: none;
    }
    .match-status {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 3px 0 10px;
      padding: 8px 10px;
      border-radius: 9px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.06);
      font-size: 10px;
    }
    .match-status > span {
      width: 18px;
      height: 18px;
      display: grid;
      place-items: center;
      flex: none;
      border-radius: 50%;
      color: #fff;
      background: #9ca3af;
      font-weight: 750;
    }
    .match-status.success {
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
    }
    .match-status.success > span {
      background: var(--mmwave-primary);
    }
    .match-status.error {
      color: var(--error-color, #e53935);
      background: rgba(229, 57, 53, 0.07);
    }
    .match-status.error > span {
      background: var(--error-color, #e53935);
    }
    .room-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .room-grid .field {
      margin: 0;
    }
    .field.compact {
      align-items: stretch;
      flex-direction: column;
      gap: 6px;
    }
    .field.compact label {
      min-width: 0;
    }
    .advanced {
      margin-top: 16px;
      overflow: hidden;
      border: 1px solid var(--mmwave-line);
      border-radius: 11px;
      background: rgba(128, 128, 128, 0.025);
    }
    .advanced summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px;
      color: var(--secondary-text-color);
      font-size: 10px;
      font-weight: 650;
      cursor: pointer;
    }
    .advanced summary small {
      padding: 2px 6px;
      border-radius: 999px;
      background: rgba(128, 128, 128, 0.09);
      font-size: 8px;
    }
    .advanced-fields {
      padding: 0 7px 7px;
    }
    @media (max-width: 500px) {
      .field:not(.compact) {
        align-items: stretch;
        flex-direction: column;
        gap: 6px;
      }
      .field label {
        min-width: 0;
      }
      .room-grid {
        grid-template-columns: 1fr;
      }
      .cal-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `}};t([pt({attribute:!1})],je.prototype,"hass",void 0),t([pt({attribute:!1})],je.prototype,"_config",void 0),t([gt()],je.prototype,"_devices",void 0),t([gt()],je.prototype,"_advOpen",void 0),t([gt()],je.prototype,"_deviceStatus",void 0),t([gt()],je.prototype,"_matchedEntities",void 0),t([gt()],je.prototype,"_fusionJsonError",void 0),je=t([dt(ke)],je);var Ue=Object.freeze({__proto__:null,get MMWaveCardEditor(){return je}});export{Be as MMWaveCard};
