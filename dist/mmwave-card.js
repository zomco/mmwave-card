function t(t,e,i,a){var r,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(o<3?r(s):o>3?r(e,i,s):r(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new o(i,t,a)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:_,getPrototypeOf:h}=Object,g=globalThis,u=g.trustedTypes,m=u?u.emptyScript:"",f=g.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&d(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const o=a?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=h(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),..._(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,a)=>{if(i)t.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=i.cssText,t.appendChild(a)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=a;const o=r.fromAttribute(e,t.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(t,e,i,a=!1,r){if(void 0!==t){const o=this.constructor;if(!1===a&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,f?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,M=$.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+R,D=`<${C}>`,A=document,P=()=>A.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,W="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,H=/>/g,N=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),K=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),Y=new WeakMap,X=A.createTreeWalker(A,129);function U(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,a=[];let r,o=2===e?"<svg>":3===e?"<math>":"",s=q;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===q?"!--"===l[1]?s=F:void 0!==l[1]?s=H:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=r??q,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?N:'"'===l[3]?j:L):s===j||s===L?s=N:s===F||s===H?s=q:(s=N,r=void 0);const p=s===N&&t[e+1].startsWith("/>")?" ":"";o+=s===q?i+D:d>=0?(a.push(n),i.slice(0,d)+z+i.slice(d)+R+p):i+R+(-2===d?e:p)}return[U(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class V{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let r=0,o=0;const s=t.length-1,n=this.parts,[l,d]=Z(t,e);if(this.el=V.createElement(l,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=X.nextNode())&&n.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(z)){const e=d[o++],i=a.getAttribute(t).split(R),s=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?et:"?"===s[1]?it:"@"===s[1]?at:tt}),a.removeAttribute(t)}else t.startsWith(R)&&(n.push({type:6,index:r}),a.removeAttribute(t));if(I.test(a.tagName)){const t=a.textContent.split(R),e=t.length-1;if(e>0){a.textContent=M?M.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],P()),X.nextNode(),n.push({type:2,index:++r});a.append(t[e],P())}}}else if(8===a.nodeType)if(a.data===C)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=a.data.indexOf(R,t+1));)n.push({type:7,index:r}),t+=R.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,a){if(e===K)return e;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const o=E(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,a)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??A).importNode(e,!0);X.currentNode=a;let r=X.nextNode(),o=0,s=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new rt(r,this,t)),this._$AV.push(e),n=i[++s]}o!==n?.index&&(r=X.nextNode(),o++)}return X.currentNode=A,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),E(t)?t===O||null==t||""===t?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==O&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=V.createElement(U(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new J(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new V(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const r of t)a===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[a],i._$AI(r),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,r){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=O}_$AI(t,e=this,i,a){const r=this.strings;let o=!1;if(void 0===r)t=G(this,t,e,0),o=!E(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const a=t;let s,n;for(t=r[0],s=0;s<r.length-1;s++)n=G(this,a[i+s],e,s),n===K&&(n=this._$AH[s]),o||=!E(n)||n!==this._$AH[s],n===O?t=O:t!==O&&(t+=(n??"")+r[s+1]),this._$AH[s]=n}o&&!a&&this.j(t)}j(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===O?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==O)}}class at extends tt{constructor(t,e,i,a,r){super(t,e,i,a,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??O)===K)return;const i=this._$AH,a=t===O&&i!==O||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==O&&(i===O||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(V,Q),($.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let r=a._$litPart$;if(void 0===r){const t=i?.renderBefore??null;a._$litPart$=r=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}nt._$litElement$=!0,nt.finalized=!0,st.litElementHydrateSupport?.({LitElement:nt});const lt=st.litElementPolyfillSupport;lt?.({LitElement:nt}),(st.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},pt=(t=ct,e,i)=>{const{kind:a,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,r,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];e.call(this,i),this.requestUpdate(a,r,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function _t(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ht(t){return _t({...t,state:!0,attribute:!1})}function gt(t,e){return(e,i,a)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut={radar_x:0,radar_y:0,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]},mt={room_w:400,room_d:600,device_id:"",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z",polygon_entity:"text.r60abd1_polygon_config"},ft=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!0,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!0,domain:"sensor"},{key:"z_entity",labelKey:"editor.z_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"},{key:"sleep_entity",labelKey:"editor.sleep_entity",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],yt={info:{id:"r60abd1",displayName:"MicRadar R60ABD1 (60 GHz)",fovDegrees:40,maxRangeM:2.5,minRangeM:.4,vitalRangeM:1.5,updateRateHz:.5,maxTargets:1,hasZAxis:!0,hasBreathing:!0,hasHeartRate:!0,hasSleep:!0},getEntitySchema:()=>ft,validateConfig(t){const e=[];for(const i of ft)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("x_entity"),o=i("y_entity"),s=i("z_entity");if(!r||!o)return{present:!0,targets:[]};const n=parseFloat(r.state)||0,l=parseFloat(o.state)||0,d=s&&parseFloat(s.state)||0;return 0===n&&0===l&&0===d?{present:!0,targets:[]}:{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:d}]}},getDefaultCalibration:()=>({...ut,radar_z:220,pitch:0,roll:0})},bt={id:"ld2450",displayName:"Hi-Link LD2450 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},vt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function xt(t){const e=parseFloat(t.state)||0,i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const wt={info:bt,getEntitySchema:()=>vt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=bt.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=xt(e),s=xt(a);if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ut,radar_z:250,pitch:0,roll:0})},$t={id:"ld2452",displayName:"Hi-Link LD2452 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Mt(t){const e=parseFloat(t.state)||0,i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const St={info:$t,getEntitySchema:()=>kt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=$t.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=Mt(e),s=Mt(a);if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ut,radar_z:250,pitch:0,roll:0})},zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],Rt={info:{id:"rd03e",displayName:"Ai-Thinker RD03E (24 GHz)",fovDegrees:40,verticalFovDegrees:90,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>zt,validateConfig(t){const e=[];for(const i of zt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Ct=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],Dt={info:{id:"ld2411",displayName:"Hi-Link LD2411 (24 GHz)",fovDegrees:40,verticalFovDegrees:80,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ct,validateConfig(t){const e=[];for(const i of Ct)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},At={id:"ld2451",displayName:"Hi-Link LD2451 (24 GHz)",fovDegrees:30,verticalFovDegrees:14,maxRangeM:100,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Pt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Et={info:At,getEntitySchema:()=>Pt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=At.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=parseFloat(e.state)||0,s=parseFloat(a.state)||0;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Tt={id:"ld2453",displayName:"Hi-Link LD2453 (24 GHz)",fovDegrees:80,verticalFovDegrees:60,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Wt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],qt={info:Tt,getEntitySchema:()=>Wt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Tt.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=parseFloat(e.state)||0,s=parseFloat(a.state)||0;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Ft=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Ht={info:{id:"ld2410b",displayName:"Hi-Link LD2410B (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ft,validateConfig(t){const e=[];for(const i of Ft)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Nt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Lt={info:{id:"ld2410c",displayName:"Hi-Link LD2410C (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Nt,validateConfig(t){const e=[];for(const i of Nt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},jt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!1,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!1,domain:"sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"}],It={info:{id:"ld6002",displayName:"Hi-Link LD6002 (60 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:6,minRangeM:.4,vitalRangeM:1.5,updateRateHz:1,maxTargets:1,hasZAxis:!1,hasBreathing:!0,hasHeartRate:!0,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>jt,validateConfig(t){const e=[];return t.presence_entity||e.push("Missing required entity: presence_entity"),t.distance_entity||t.x_entity&&t.y_entity||e.push("You must provide either distance_entity OR both x_entity and y_entity."),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("x_entity"),o=i("y_entity"),s=i("distance_entity");let n=0,l=0;if(r&&o?(n=parseFloat(r.state)||0,l=parseFloat(o.state)||0):s&&(l=parseFloat(s.state)||0),0===n&&l<=0)return{present:!0,targets:[]};return{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:0}]}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Bt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Kt={info:{id:"ld2420",displayName:"Hi-Link LD2420 (24 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:8,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Bt,validateConfig(t){const e=[];for(const i of Bt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Ot=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Yt={info:{id:"ld2450a",displayName:"Hi-Link LD2450A (24 GHz Gesture)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:2,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ot,validateConfig(t){const e=[];for(const i of Ot)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0,s=o>0?o:0,n=[];return n.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:n}},getDefaultCalibration:()=>({...ut,radar_z:150,pitch:0,roll:0})},Xt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Ut={info:{id:"ld2410",displayName:"Hi-Link LD2410 (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Xt,validateConfig(t){const e=[];for(const i of Xt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Vt={info:{id:"ld2411s",displayName:"Hi-Link LD2411S (24 GHz 1-D)",fovDegrees:45,verticalFovDegrees:20,maxRangeM:6,minRangeM:.3,updateRateHz:20,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Zt,validateConfig(t){const e=[];for(const i of Zt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[],o=i("distance_entity");if(o&&"unavailable"!==o.state){const t=parseFloat(o.state)||0;t>0&&r.push({index:0,rawX:0,rawY:t,rawZ:0})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ut,radar_z:100,pitch:0,roll:0})},Gt={id:"ld2454",displayName:"Hi-Link LD2454 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Jt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Qt(t){const e=parseFloat(t.state)||0,i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const te={info:Gt,getEntitySchema:()=>Jt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Gt.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=Qt(e),s=Qt(a);if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ut,radar_z:250,pitch:0,roll:0})},ee=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],ie={r60abd1:yt,ld2450:wt,ld2452:St,rd03e:Rt,ld2411:Dt,ld2451:Et,ld2453:qt,ld2410b:Ht,ld2410c:Lt,ld6002:It,ld2420:Kt,ld2450a:Yt,ld2410:Ut,ld2411s:Vt,ld2454:te,ld2412:{info:{id:"ld2412",displayName:"Hi-Link LD2412 (24 GHz)",fovDegrees:150,maxRangeM:9,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>ee,validateConfig(t){const e=[];for(const i of ee)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})}};function ae(t){return ie[t]}function re(){return Object.entries(ie).map(([t,e])=>({id:t,label:e.info.displayName})).sort((t,e)=>t.label.localeCompare(e.label))}function oe(t,e,i){const a=i.length;if(a<3)return!0;let r=!1;for(let o=0,s=a-1;o<a;s=o++){const a=i[o].x,n=i[o].y,l=i[s].x,d=i[s].y;n>e!=d>e&&t<(l-a)*(e-n)/(d-n)+a&&(r=!r)}return r}function se(t,e,i,a){const r=function(t,e,i){const a=Math.PI/180,r=t*a,o=e*a,s=i*a,[n,l,d,c,p,_]=[Math.sin(r),Math.cos(r),Math.sin(o),Math.cos(o),Math.sin(s),Math.cos(s)];return[[l*_+n*d*p,n*c,-l*p+n*d*_],[-n*_+l*d*p,l*c,n*p+l*d*_],[c*p,-d,c*_]]}(a.yaw,a.pitch,a.roll),o=r[0][0]*t+r[0][1]*e+r[0][2]*i,s=r[1][0]*t+r[1][1]*e+r[1][2]*i,n=r[2][0]*t+r[2][1]*e+r[2][2]*i,l=a.radar_x+o,d=a.radar_y+s;return{roomX:l,roomY:d,roomZ:a.radar_z-n,inBoundary:oe(l,d,a.polygon)}}class ne{constructor(t={}){this.tracks=new Map,this.associationGate=Math.max(t.association_gate_cm??90,10),this.mergeGate=Math.max(t.merge_gate_cm??70,10),this.ttlMs=1e3*Math.max(t.track_ttl_s??1.2,.2),this.confirmHits=Math.max(t.confirm_hits??2,1),this.minConfirmSources=Math.max(t.min_confirm_sources??1,1)}reset(){this.tracks.clear()}step(t,e=Date.now()){const i=new Map;for(const t of this.tracks.values()){const a=Math.min(Math.max((e-t.updated_at)/1e3,0),.5);t.x+=t.vx*a,t.y+=t.vy*a,t.updated_at=e,i.set(t.track_id,a)}const a=this.cluster(t),r=[...this.tracks.values()],o=r.length,s=a.length,n=o+s,l=Array.from({length:n},()=>Array(n).fill(0));for(let t=0;t<o;t++){const e=r[t],o=Math.hypot(e.vx,e.vy),d=this.associationGate+o*(i.get(e.track_id)??0);a.forEach((i,a)=>{const r=Math.hypot(e.x-i.x,e.y-i.y);l[t][a]=r<=d?r/d:4});for(let e=s;e<n;e++)l[t][e]=1.05}for(let t=o;t<n;t++)for(let e=0;e<s;e++)l[t][e]=1.05;const d=new Set,c=new Set;for(const[t,e]of function(t){if(!t.length||!t[0]?.length)return[];let e=t.map(t=>[...t]),i=e.length,a=e[0].length;const r=i>a;r&&(e=Array.from({length:a},(t,i)=>e.map(t=>t[i])),[i,a]=[a,i]);const o=Array(i+1).fill(0),s=Array(a+1).fill(0),n=Array(a+1).fill(0),l=Array(a+1).fill(0);for(let t=1;t<=i;t++){n[0]=t;let i=0;const r=Array(a+1).fill(Number.POSITIVE_INFINITY),d=Array(a+1).fill(!1);do{d[i]=!0;const t=n[i];let c=Number.POSITIVE_INFINITY,p=0;for(let n=1;n<=a;n++){if(d[n])continue;const a=e[t-1][n-1]-o[t]-s[n];a<r[n]&&(r[n]=a,l[n]=i),r[n]<c&&(c=r[n],p=n)}for(let t=0;t<=a;t++)d[t]?(o[n[t]]+=c,s[t]-=c):r[t]-=c;i=p}while(0!==n[i]);do{const t=l[i];n[i]=n[t],i=t}while(0!==i)}const d=n.map((t,e)=>[t-1,e-1]).filter(([t],e)=>e>0&&t>=0);return r?d.map(([t,e])=>[e,t]):d}(l)){if(t>=o||e>=s||l[t][e]>1)continue;const n=r[t];d.add(n.track_id),c.add(e);const p=a[e],_=Math.max(i.get(n.track_id)??.1,.05),h=p.x-n.x,g=p.y-n.y,u=Math.min(p.sources.length-1,3),m=.56+.06*u,f=.1+.02*u;n.x+=m*h,n.y+=m*g,n.vx+=f*h/_,n.vy+=f*g/_,n.last_seen=p.timestamp,n.sources=p.sources,p.sources.forEach(t=>n.seenSources.add(t)),n.hits+=Math.max(p.sources.length,1),n.confirmed=n.hits>=this.confirmHits&&n.seenSources.size>=this.minConfirmSources;const y=n.seenSources.size>=this.minConfirmSources?1:.74;n.confidence=Math.min(y,n.confidence+.1+.08*u)}for(const t of this.tracks.values())d.has(t.track_id)||(t.sources=[],t.confidence=Math.max(0,t.confidence-.08));a.forEach((t,i)=>{if(c.has(i))return;const a=Math.max(t.sources.length,1),r={track_id:globalThis.crypto?.randomUUID?.().replaceAll("-","")??`${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`,x:t.x,y:t.y,vx:0,vy:0,confidence:Math.min(.9,.35+.18*t.sources.length),sources:t.sources,started_at:t.timestamp,last_seen:t.timestamp,updated_at:e,hits:a,confirmed:a>=this.confirmHits&&t.sources.length>=this.minConfirmSources,seenSources:new Set(t.sources)};this.tracks.set(r.track_id,r)});for(const[t,i]of this.tracks)e-i.last_seen>this.ttlMs&&this.tracks.delete(t);return[...this.tracks.values()].filter(t=>t.confirmed).map(({updated_at:t,hits:e,confirmed:i,seenSources:a,...r})=>({...r,source_count:a.size}))}cluster(t){const e=[];for(const i of[...t].sort((t,e)=>e.weight-t.weight)){let t,a=this.mergeGate;for(const r of e){if(r.sources.includes(i.radarId))continue;const e=Math.hypot(i.x-r.x,i.y-r.y);e<=a&&(t=r,a=e)}t?(t.observations.push(i),this.recalculate(t)):e.push({observations:[i],x:i.x,y:i.y,timestamp:i.timestamp,sources:[i.radarId]})}return e}recalculate(t){const e=t.observations.reduce((t,e)=>t+Math.max(e.weight,.01),0);t.x=t.observations.reduce((t,e)=>t+e.x*Math.max(e.weight,.01),0)/e,t.y=t.observations.reduce((t,e)=>t+e.y*Math.max(e.weight,.01),0)/e,t.timestamp=Math.max(...t.observations.map(t=>t.timestamp)),t.sources=[...new Set(t.observations.map(t=>t.radarId))]}}const le=t=>"number"==typeof t&&Number.isFinite(t)?t:void 0;function de(t){let e;try{e=JSON.parse(t)}catch{return}if(!e||"object"!=typeof e)return;const i=e,a=i.f,r=le(i.ts);if(1!==i.v||"number"!=typeof a&&"string"!=typeof a||null==r)return;if(!Array.isArray(i.t)||i.t.length>32)return;const o=[];for(const t of i.t){let e,i,a,r=0;if(Array.isArray(t)&&t.length>=2&&t.length<=4)e=le(t[0]),i=le(t[1]),3===t.length&&(a=le(t[2])),4===t.length&&(r=le(t[2])??Number.NaN,a=le(t[3]));else{if(!t||"object"!=typeof t)return;{const o=t;e=le(o.x),i=le(o.y),r=null==o.z?0:le(o.z)??Number.NaN,a=null==o.speed?void 0:le(o.speed)}}if(null==e||null==i||!Number.isFinite(r)||Math.max(Math.abs(e),Math.abs(i),Math.abs(r))>1e5)return;0===e&&0===i&&0===r||o.push({x:e,y:i,z:r,speed:null==a?void 0:Math.abs(a)})}return{frameId:String(a),sourceTimestamp:r,targets:o}}const ce=(t,e,i)=>({cx:t/i.roomW*i.W,cy:e/i.roomD*i.H}),pe=(t,e,i)=>({x:t/i.W*i.roomW,y:e/i.H*i.roomD});function _e(t,e){const i=e.getBoundingClientRect(),a="touches"in t?t.touches[0].clientX:t.clientX,r="touches"in t?t.touches[0].clientY:t.clientY;return{x:a-i.left,y:r-i.top}}function he(t,e){const i=window.devicePixelRatio||1,a=t.offsetWidth||400;t.width=a*i,t.height=e*i,t.style.height=`${e}px`;const r=t.getContext("2d");return r.scale(i,i),r}function ge(t,e){t.clearRect(0,0,e.W,e.H),t.strokeStyle="rgba(128,128,128,.06)",t.lineWidth=.5;for(let i=0;i<e.W;i+=40)t.beginPath(),t.moveTo(i,0),t.lineTo(i,e.H),t.stroke();for(let i=0;i<e.H;i+=40)t.beginPath(),t.moveTo(0,i),t.lineTo(e.W,i),t.stroke();t.strokeStyle="rgba(255,255,255,.15)",t.lineWidth=1.5,t.strokeRect(1,1,e.W-2,e.H-2);const i=100*Math.round(e.roomW/4/100)||100,a=i/e.roomW*e.W,r=e.H-10,o=e.W-a-8;t.beginPath(),t.moveTo(o,r),t.lineTo(o+a,r),t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.moveTo(o,r-3),t.lineTo(o,r+3),t.moveTo(o+a,r-3),t.lineTo(o+a,r+3),t.stroke(),t.fillStyle="rgba(255,255,255,.45)",t.font="9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillText(`${i}cm`,o+a/2,r-3),t.font="bold 9px system-ui",t.fillStyle="rgba(11,130,92,.6)",t.textAlign="right",t.textBaseline="top",t.fillText("X →",e.W-4,4),t.textAlign="left",t.textBaseline="bottom",t.fillText("Y ↓",4,e.H-4),t.textAlign="left",t.textBaseline="top",t.fillStyle="rgba(255,255,255,.3)",t.fillText("0",4,4),t.textBaseline="alphabetic"}function ue(t,e,i,a=!1){if(e.length<2)return;const r=e.map(t=>ce(t.x,t.y,i));t.beginPath(),r.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.fillStyle=a?"rgba(11,130,92,.04)":"rgba(11,130,92,.07)",t.fill()),t.strokeStyle=a?"rgba(11,130,92,.22)":"rgba(11,130,92,.55)",t.lineWidth=1.5,t.stroke(),a||r.forEach(e=>{t.beginPath(),t.arc(e.cx,e.cy,3,0,2*Math.PI),t.fillStyle="rgba(11,130,92,.8)",t.fill()})}function me(t,e,i,a,r,o,s,n,l,d){const c=Math.sqrt(l.W/l.roomW*(l.H/l.roomD)),p=t=>Math.max(100*t*c,1),_=o/2*(Math.PI/180),h=Math.PI/2-a*(Math.PI/180),g=Math.max(.05,Math.cos(r*(Math.PI/180))),u=p(s*g),m=p(n*g),f=(a,r,o,s,n=1.2)=>{const l=e+r*Math.cos(h-_),d=i+r*Math.sin(h-_);t.beginPath(),t.moveTo(l,d),t.arc(e,i,r,h-_,h+_,!1),t.arc(e,i,a,h+_,h-_,!0),t.closePath(),t.fillStyle=o,t.fill("evenodd"),t.strokeStyle=s,t.lineWidth=n,t.stroke()};if(null!=d&&d>s&&d<n){const a=p(d*g),r=t.createRadialGradient(e,i,a,e,i,m);r.addColorStop(0,"rgba(11,130,92,.35)"),r.addColorStop(1,"rgba(11,130,92,.08)"),f(a,m,r,"rgba(11,130,92,.60)");const o=t.createRadialGradient(e,i,u,e,i,a);o.addColorStop(0,"rgba(11,130,92,.60)"),o.addColorStop(1,"rgba(11,130,92,.25)"),f(u,a,o,"rgba(11,130,92,.90)",1.5)}else{const a=t.createRadialGradient(e,i,u,e,i,m);a.addColorStop(0,"rgba(11,130,92,.50)"),a.addColorStop(1,"rgba(11,130,92,.12)"),f(u,m,a,"rgba(11,130,92,.75)",1.5)}if(o>0){let a=1;a=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let r=a;r<=n;r+=a){if(r<=s)continue;const a=p(r*g);t.beginPath(),t.arc(e,i,a,h-_,h+_,!1),t.strokeStyle="rgba(255, 255, 255, 0.18)",t.lineWidth=.8,t.setLineDash([3,4]),t.stroke(),t.setLineDash([])}const r=o>=90?15:o>=40?10:15,l=o/2;for(let a=-l;a<=l;a+=r){const r=h+a*(Math.PI/180),o=e+u*Math.cos(r),s=i+u*Math.sin(r),n=e+m*Math.cos(r),l=i+m*Math.sin(r);if(t.beginPath(),t.moveTo(o,s),t.lineTo(n,l),t.strokeStyle=0===a?"rgba(11, 200, 140, 0.5)":"rgba(255, 255, 255, 0.18)",t.lineWidth=0===a?1.2:.8,0!==a&&t.setLineDash([3,4]),t.stroke(),t.setLineDash([]),0!==a){const o=e+(m+14)*Math.cos(r),s=i+(m+14)*Math.sin(r);t.font="bold 9px system-ui",t.fillStyle="rgba(255, 255, 255, 0.85)",t.textAlign="center",t.textBaseline="middle",t.fillText(`${a>0?"+":""}${a}°`,o,s),t.textBaseline="alphabetic"}}}t.beginPath(),t.moveTo(e,i),t.arc(e,i,u,h-_,h+_,!1),t.closePath(),t.fillStyle="rgba(0,0,0,.50)",t.fill(),t.beginPath(),t.arc(e,i,u,h-_,h+_,!1),t.strokeStyle="rgba(244,99,99,.80)",t.lineWidth=1.5,t.setLineDash([3,3]),t.stroke(),t.setLineDash([]);const y=(a,r,o)=>{const s=e+r*Math.cos(h),n=i+r*Math.sin(h),l=`${a}m`;t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle";const d=t.measureText(l).width;t.fillStyle="rgba(10,10,24,.82)",t.beginPath(),t.roundRect?.(s-d/2-3,n-7,d+6,14,3),t.fill(),t.fillStyle=o,t.fillText(l,s,n)};if(o>0){let t=1;t=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let e=t;e<=n;e+=t){if(e<=s)continue;const t=p(e*g),i=Math.abs(e-n)<.01,a=null!=d&&Math.abs(e-d)<.01,r=i?"rgba(27,159,117,.95)":a?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";y(Number(e.toFixed(1)),t,r)}}else{const a=e+u*Math.cos(h),r=i+u*Math.sin(h),o=e+m*Math.cos(h),l=i+m*Math.sin(h);t.beginPath(),t.moveTo(a,r),t.lineTo(o,l),t.strokeStyle="rgba(11, 200, 140, 0.65)",t.lineWidth=1.5,t.setLineDash([4,4]),t.stroke(),t.setLineDash([]);let c=1;c=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let t=c;t<=n;t+=c){if(t<=s)continue;const e=p(t*g),i=Math.abs(t-n)<.01,a=null!=d&&Math.abs(t-d)<.01,r=i?"rgba(27,159,117,.95)":a?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";y(Number(t.toFixed(1)),e,r)}}t.textBaseline="alphabetic",t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.fillStyle="rgba(10,10,24,.92)",t.fill(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=1.5,t.stroke();for(const[a,r]of[[7,0],[-7,0],[0,7],[0,-7]])t.beginPath(),t.moveTo(e+.3*a,i+.3*r),t.lineTo(e+a,i+r),t.strokeStyle="rgba(11,130,92,.7)",t.lineWidth=1.2,t.stroke()}function fe(t,e,i,a,r="#ff9800"){a?(t.save(),t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.fillStyle=r,t.globalAlpha=.25,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,5,0,2*Math.PI),t.fillStyle=r,t.fill(),t.strokeStyle="rgba(255,255,255,.6)",t.lineWidth=1.5,t.stroke()):(t.save(),t.setLineDash([2,2]),t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.strokeStyle=r,t.globalAlpha=.5,t.lineWidth=1.5,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(e,i,4,0,2*Math.PI),t.globalAlpha=.8,t.lineWidth=1.5,t.stroke(),t.restore())}function ye(t,e,i,a,r,o,s,n,l){const d=Math.sqrt(n.W/n.roomW*(n.H/n.roomD)),c=Math.max(.05,Math.cos(r*(Math.PI/180))),p=(_=s*c,Math.max(100*_*d,1));var _;const h=o/2*(Math.PI/180),g=Math.PI/2-a*(Math.PI/180);if(l){t.beginPath(),t.arc(e,i,p,g-h,g+h,!1),t.strokeStyle="rgba(255,152,0,.35)",t.lineWidth=6,t.lineCap="round",t.stroke(),t.beginPath(),t.arc(e,i,p,g-h,g+h,!1),t.strokeStyle="var(--accent-color,#ff9800)",t.lineWidth=2.5,t.lineCap="round",t.stroke();const a=e+p*Math.cos(g),r=i+p*Math.sin(g);t.beginPath(),t.arc(a,r,7,0,2*Math.PI),t.fillStyle="rgba(255,152,0,.3)",t.fill(),t.beginPath(),t.arc(a,r,4,0,2*Math.PI),t.fillStyle="var(--accent-color,#ff9800)",t.fill(),t.strokeStyle="rgba(255,255,255,.8)",t.lineWidth=1.2,t.stroke()}else{t.setLineDash([4,4]),t.beginPath(),t.arc(e,i,p,g-h,g+h,!1),t.strokeStyle="rgba(244,67,54,.65)",t.lineWidth=2,t.lineCap="round",t.stroke(),t.setLineDash([]);const a=e+p*Math.cos(g),r=i+p*Math.sin(g);t.beginPath(),t.arc(a,r,4,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.8)",t.lineWidth=1.5,t.stroke()}t.lineCap="butt"}function be(t,e,i,a,r,o=!1){t.beginPath(),t.arc(e,i,7,0,2*Math.PI),o?(t.strokeStyle=r,t.lineWidth=1.8,t.stroke()):(t.fillStyle=r,t.fill(),t.strokeStyle="rgba(255,255,255,.5)",t.lineWidth=1.2,t.stroke()),t.fillStyle=o?r:"#fff",t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(a,e,i),t.textBaseline="alphabetic"}const ve={en:{card_name:"MMWave Radar HA Card",tabs:{geo:"① Geometry & Boundary",yaw:"② Yaw Calibration",live:"③ Live View"},geo:{install_params:"Installation Parameters (measure with tape)",radar_x:"Radar X",radar_y:"Radar Y",radar_z:"Height",yaw_rough:"Rough Yaw",pitch:"Pitch",roll:"Roll",geo_note:"Origin: top-left corner. X → right. Y ↓ down (toward foot of bed).\nYaw = angle of radar forward axis from Y-axis, clockwise positive.\nPitch/Roll: 0 for horizontal mount; enter tilt angle or read from IMU.",boundary:"Room Boundary (optional)",poly_hint_none:"Click canvas to draw boundary (≥ 3 points)",poly_hint_ok:"Boundary active — {n} vertices",poly_undo:"Undo",poly_clear:"Clear",boundary_note:"No boundary = no filtering. Targets outside the polygon are ignored.",step_1_installation:"Step 1 · Installation",place_the_radar_in_the_room:"Place the radar in the room",drag_the_colored_handles_to_set:"Drag the colored handles to set position, height and orientation.",precise_numeric_adjustment:"Precise numeric adjustment",optional:"Optional",optional_2:"Optional",click_the_top_down_map_to:"Click the top-down map to outline the active detection area.",points:"points",off:"Off",undo_point:"Undo point",click_the_map_to_add_the:"Click the map to add the first point"},yaw:{ref_a_title:"Reference Point A",ref_b_title:"Reference Point B",ref_a_idle:"Click the preview to mark a known position",ref_a_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_a_done:"Captured",ref_b_idle:"Complete point A first",ref_b_step:"Click another known position (> 80 cm from A)",ref_b_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_b_done:"Captured",capture_btn:"Walk to marked position → Capture radar reading",capture_wait:"Waiting for radar data…",result_idle:"Click the preview map to start — mark reference point A",result_ok:"Yaw {yaw}° · Residual {residual} cm",step_2_direction:"Step 2 · Direction",calculate_yaw_from_two_positions:"Calculate yaw from two positions",choose_two_well_separated_places_you:"Choose two well-separated places you can stand, then capture one reading at each.",click_the_map_to_choose_where:"Click the map to choose where to stand",stand_still_while_waiting_for_radar:"Stand still while waiting for radar data…",walk_to_the_marked_position:"Walk to the marked position",i_am_ready_capture_position:"I am ready — capture position",choose_a_position_on_the_map:"Choose a position on the map first",start_over:"Start over"},live:{title:"Room Top-Down View",badge_none:"No presence",badge_present:"Present",badge_filtered:"Outside boundary",model:"Model",ld2450:"HLK-LD2450 (2-D 120° 8m)",ld2454:"HLK-LD2454 (2-D 120° 8m)",rd03e:"RD03E (1-D 8m)",room_x:"Room X (cm)",room_y:"Room Y (cm)",room_z:"Height (cm)",targets:"Targets",step_3_live_test:"Step 3 · Live test",verify_coverage_and_target_trails:"Verify coverage and target trails",walk_through_the_room_and_confirm:"Walk through the room and confirm that target positions and trails match reality.",clear_trails:"Clear trails",waiting_for_a_radar_target:"Waiting for a radar target",detected_targets:"Detected targets",target:"Target",inside:"Inside",outside:"Outside",no_target_data_yet:"No target data yet"},actions:{save:"Save",saved:"Saved ✓",reset:"Reset",reset_confirm:"Clear all calibration data?"},editor:{model:"Radar model",entities:"Entities",presence_entity:"Presence entity",distance_entity:"Distance entity",motion_state_entity:"Motion state entity (optional)",target_state_entity:"Target state entity (optional)",x_entity:"X coordinate entity",y_entity:"Y coordinate entity",z_entity:"Z coordinate entity (optional)",breath_entity:"Breath Entity (Optional)",heart_entity:"Heart Rate Entity (Optional)",sleep_entity:"Sleep State Entity (Optional)",polygon_entity:"Polygon Sync Entity (Optional)",target_frame:"Atomic Target Frame (Optional)",target_1_x:"Target 1 X Entity",target_1_y:"Target 1 Y Entity",target_1_speed:"Target 1 Speed Entity (Optional)",target_2_x:"Target 2 X Entity (Optional)",target_2_y:"Target 2 Y Entity (Optional)",target_2_speed:"Target 2 Speed Entity (Optional)",target_3_x:"Target 3 X Entity (Optional)",target_3_y:"Target 3 Y Entity (Optional)",target_3_speed:"Target 3 Speed Entity (Optional)",room_dimensions:"Room Dimensions",room_w:"Room width (cm)",room_d:"Room depth (cm)",imported_p0_revision_p1:"Imported {p0} (revision {p1})",imported_device_calibration_profile_p0:"Imported device calibration profile: {p0}",saving_device_calibration_profiles:"Saving device calibration profiles…",all_calibrations_were_applied_and_saved:"All calibrations were applied and saved.",operating_mode:"Operating mode",single_radar:"Single radar",multi_radar_fusion:"Multi-radar fusion",multi_radar_fusion_2:"Multi-radar fusion",place_multiple_2_d_radars_in:"Place multiple 2-D radars in one floor-plan coordinate system and sync them to the persistent HA backend.",floor_plan_and_backend:"Floor plan and backend",card_title:"Card title",sync_configuration_to_the_backend_when:"Sync configuration to the backend when an administrator opens the card",radar_devices:"Radar devices",only_radar_models_with_2_d:"Only radar models with 2-D or 3-D positions are shown. Every radar needs a unique ID.",radar:"Radar",radar_device:"Radar device",select_device:"Select device",calibration_profile:"Calibration profile",manual_not_linked:"Manual / not linked",device_profile_snapshot:"Device profile snapshot",entity_mapping:"Entity mapping",add_radar:"Add radar",interactive_installation:"Interactive installation",select_a_radar_in_the_shared:"Select a radar in the shared room model, then drag the handles to adjust its position, height and orientation. Other radars remain as gray landmarks.",joint_multi_radar_calibration:"Joint multi-radar calibration",each_shared_reference_position_captures_every:"Each shared reference position captures every radar and independently solves yaw and X/Y corrections for each device.",fusion_and_recording_rules:"Fusion and recording rules",filter_single_radar_false_alarms_and:"Filter single-radar false alarms and save recordings only for complete, continuous crossings after a track ends.",minimum_supporting_radars:"Minimum supporting radars",merge_distance_cm:"Merge distance (cm)",track_end_delay_s:"Track end delay (s)",recording_score:"Recording score",minimum_duration_s:"Minimum duration (s)",minimum_displacement_cm:"Minimum displacement (cm)",boundary_margin_cm:"Boundary margin (cm)",record_complete_crossings_only:"Record complete crossings only",recording_test:"Recording test",enter_near_one_room_edge_walk:"Enter near one room edge, walk continuously for at least {p0} cm, and leave at another edge. Wait {p1} seconds after leaving radar coverage. A qualified event becomes TRAVERSE and triggers the camera.",event_zones_and_cameras:"Event zones and cameras",draw_polygon_vertices_on_the_floor:"Draw polygon vertices on the floor plan. Saved zones are synchronized to the fusion backend.",mmwave_radar_card:"MMWave radar card",choose_a_radar_device_to_match:"Choose a radar device to match entities automatically, then confirm the room size.",basics:"Basics",card_title_2:"Card title",presence_radar:"Presence radar",connect_radar_device:"Connect radar device",select_the_radar_from_home_assistant:"Select the radar from Home Assistant and the card will identify the required entities.",radar_device_2:"Radar device",detecting_device_entities:"Detecting device entities…",matched_p0_configuration_fields:"Matched {p0} configuration fields",automatic_detection_failed_configure_entities_manually:"Automatic detection failed. Configure entities manually below.",enter_the_room_dimensions_used_by:"Enter the room dimensions used by the 3D placement and target map.",advanced_assign_entities_manually:"Advanced: assign entities manually",troubleshooting:"Troubleshooting"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)",entity_aliases:{distance:["distance"],motion_state:["motion state","motion_state","target state","target_state"],polygon:["polygon","boundary"]},card:{syncing:"Syncing…",synced:"Synced",sync_failed:"Sync failed",sync_to_device:"Sync to device",installation:"Installation",place_the_radar_in_the_3d:"Place the radar in the 3D room",direction:"Direction",calibrate_yaw_with_two_reference_points:"Calibrate yaw with two reference points",live_test:"Live test",verify_targets_boundary_and_trails:"Verify targets, boundary and trails",presence_radar:"Presence radar",p0_target_p1:"{p0} target{p1}",outside:"Outside",clear:"Clear",open_calibration:"Open calibration",open_calibration_2:"Open calibration",back_to_radar_view:"Back to radar view",back_to_radar_view_2:"Back to radar view",radar_spatial_calibration:"Radar spatial calibration",calibration_steps:"Calibration steps",revert:"Revert",reset:"Reset",back:"Back",continue:"Continue",multi_radar_fusion:"Multi-radar fusion",p0_p1_radars_p2:"{p0}/{p1} radars · {p2}",p0_targets:"{p0} targets",clear_2:"Clear",trajectory_quality:"Trajectory quality",no_playable_clip_is_available_yet:"No playable clip is available yet, or recording is still in progress."},fusion:{filtered:"Filtered",clip_failed:"Clip failed",recording:"Recording",key_track:"Key track",backend_fusion:"Backend fusion",local_fallback:"Local fallback",backend_error:"Backend error",connecting:"Connecting",hide_coverage:"Hide coverage",show_coverage:"Show coverage",radars_online:"radars online",calibration_warning:"Calibration warning",fused_targets:"Fused targets",recent_events:"Recent events",integration_missing:"Fusion integration not installed",integration_missing_help:"Multi-radar fusion needs the separate mmwave-fusion integration (experimental). Without it the card fuses in the browser only: no stored trajectories, no events, no recordings.",integration_outdated:"Fusion integration is outdated"},fusioncal:{capturing_all_radars_synchronously:"Capturing all radars synchronously…",no_radar_produced_enough_stable_samples:"No radar produced enough stable samples. Try again.",captured_p0_p1_radars:"Captured {p0}/{p1} radars.",joint_direction_calibration:"Joint direction calibration",calibrate_every_radar_from_shared_positions:"Calibrate every radar from shared positions",keep_only_one_test_person_in:"Keep only one test person in the room. Select at least three well-spaced positions and stand still for two seconds at each.",pending_x_p0_y_p1_cm:"Pending: X {p0} / Y {p1} cm",click_the_floor_plan_to_choose:"Click the floor plan to choose the next reference position",capturing:"Capturing…",i_am_ready_capture_all:"I am ready — capture all",radars:"radars",points:"points",not_enough_references:"Not enough references",start_over:"Start over",apply_all_calibrations:"Apply all calibrations",need_3_points_120_cm_span:"Need 3 points, 120 cm span and residual ≤ 40 cm"},zone:{zone_p0:"Zone {p0}",zone_id_cannot_be_empty:"Zone ID cannot be empty",zone_id_must_be_unique:"Zone ID must be unique",at_least_three_vertices_are_required:"At least three vertices are required",new_zone:"New zone",floor_plan_event_zone_editor:"Floor-plan event zone editor",name:"Name",dwell_seconds:"Dwell seconds",vertices:"vertices",undo_point:"Undo point",clear:"Clear",delete_zone:"Delete zone",cancel:"Cancel",save_zone:"Save zone",select_or_create_a_zone_then:"Select or create a zone, then click its vertices on the floor plan."},fusion_reason:{insufficient_observations:"Too few observations",too_short:"Too short",too_few_observations:"Too few valid points",insufficient_displacement:"Insufficient displacement",discontinuous_observations:"Discontinuous",mostly_outside_room:"Mostly outside room",observation_gap:"Observation gap",trajectory_jump:"Trajectory jump",incomplete_crossing:"Incomplete crossing",unstable_boundary_crossing:"Unstable crossing",below_score_threshold:"Below score threshold"},install3d:{yaw:"Yaw",pitch:"Pitch",roll:"Roll",vertical_fov_is_not_specified_showing:"Vertical FOV is not specified; showing a conservative estimate",nominal_scan_volume_from_the_model:"Nominal scan volume from the model manual",scan_volume:"Scan volume",drag_the_colored_handles_to_position:"Drag the colored handles to position and orient the radar",model_scan_range:"Model scan range",position_x_y:"Position X/Y",height:"Height",yaw_2:"Yaw",pitch_2:"Pitch",roll_2:"Roll"}},"zh-Hans":{card_name:"毫米波雷达校准卡片",tabs:{geo:"① 几何 & 边界",yaw:"② 偏航校准",live:"③ 实时验证"},geo:{install_params:"安装参数（卷尺测量后填入）",radar_x:"雷达 X",radar_y:"雷达 Y",radar_z:"安装高度",yaw_rough:"粗略偏航",pitch:"俯仰角",roll:"横滚角",geo_note:"坐标原点为预览图左上角，X 向右，Y 向下（从床头到床尾方向为正）。\n偏航角 = 雷达正前方相对 Y 轴（向下）的夹角，顺时针为正。\nPitch/Roll：水平安装填 0；有倾斜时填实测值或接入 IMU 传感器后自动读取。",boundary:"房间边界过滤（可选）",poly_hint_none:"点击画布添加顶点，绘制有效区域（≥ 3 个点）",poly_hint_ok:"边界过滤已启用 — {n} 个顶点",poly_undo:"撤销",poly_clear:"清除",boundary_note:"不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。",step_1_installation:"步骤 1 · 安装定位",place_the_radar_in_the_room:"在房间中放置雷达",drag_the_colored_handles_to_set:"拖拽 3D 模型上的彩色控制柄，直观调整安装位置、高度和朝向。",precise_numeric_adjustment:"精确数值调整",optional:"可选",optional_2:"可选设置",click_the_top_down_map_to:"在俯视图中点击，依次勾画实际有效检测区域。",points:"个点",off:"未启用",undo_point:"撤销一点",click_the_map_to_add_the:"点击地图添加第一个边界点"},yaw:{ref_a_title:"参考点 A",ref_b_title:"参考点 B",ref_a_idle:"在预览图上点击一个你能走到的已知位置",ref_a_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_a_done:"捕获完成",ref_b_idle:"完成 A 点后操作",ref_b_step:"点击另一个已知位置（与 A 距离 > 80 cm）",ref_b_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_b_done:"捕获完成",capture_btn:"走到标记位置后 → 点此捕获雷达读数",capture_wait:"等待雷达数据…",result_idle:"在预览图上点击参考点 A 开始校准",result_ok:"偏航角 {yaw}° · 残差 {residual} cm",step_2_direction:"步骤 2 · 方向校准",calculate_yaw_from_two_positions:"用两个位置自动计算偏航",choose_two_well_separated_places_you:"依次选择两个相距较远且方便站立的位置，雷达会自动完成方向校准。",click_the_map_to_choose_where:"点击地图选择站立位置",stand_still_while_waiting_for_radar:"保持站立，正在等待雷达数据…",walk_to_the_marked_position:"请走到已标记的位置",i_am_ready_capture_position:"我已站好，捕获雷达位置",choose_a_position_on_the_map:"请先在地图上选择位置",start_over:"重新校准"},live:{title:"房间俯视图",badge_none:"无人",badge_present:"有人",badge_filtered:"边界外",model:"雷达型号",ld2450:"HLK-LD2450 (二维 120° 8米)",ld2454:"HLK-LD2454 (二维 120° 8米)",rd03e:"RD03E (一维 8米)",room_x:"房间 X (cm)",room_y:"房间 Y (cm)",room_z:"离地高度 (cm)",targets:"目标数",step_3_live_test:"步骤 3 · 实时验证",verify_coverage_and_target_trails:"确认检测区域与目标轨迹",walk_through_the_room_and_confirm:"在房间内走动，检查每个目标的颜色、位置和轨迹是否符合实际。",clear_trails:"清除轨迹",waiting_for_a_radar_target:"等待雷达检测到目标",detected_targets:"检测目标",target:"目标",inside:"有效",outside:"边界外",no_target_data_yet:"当前没有目标数据"},actions:{save:"保存",saved:"已保存 ✓",reset:"重置",reset_confirm:"清除所有校准数据？"},editor:{model:"雷达型号",entities:"实体配置",presence_entity:"存在感知实体",distance_entity:"距离实体",motion_state_entity:"运动状态实体（可选）",target_state_entity:"目标状态实体（可选）",x_entity:"X 坐标实体",y_entity:"Y 坐标实体",z_entity:"Z 坐标实体（可选）",breath_entity:"呼吸频率实体（可选）",heart_entity:"心率实体（可选）",sleep_entity:"睡眠状态实体（可选）",polygon_entity:"多边形同步实体（可选）",target_frame:"原子目标帧实体（可选）",target_1_x:"目标 1 X 实体",target_1_y:"目标 1 Y 实体",target_1_speed:"目标 1 速度实体（可选）",target_2_x:"目标 2 X 实体（可选）",target_2_y:"目标 2 Y 实体（可选）",target_2_speed:"目标 2 速度实体（可选）",target_3_x:"目标 3 X 实体（可选）",target_3_y:"目标 3 Y 实体（可选）",target_3_speed:"目标 3 速度实体（可选）",room_dimensions:"房间尺寸",room_w:"房间宽度 (cm)",room_d:"房间深度 (cm)",imported_p0_revision_p1:"已导入 {p0}（版本 {p1}）",imported_device_calibration_profile_p0:"已自动导入设备校准档案：{p0}",saving_device_calibration_profiles:"正在保存设备校准档案…",all_calibrations_were_applied_and_saved:"全部校准已应用并保存。",operating_mode:"运行模式",single_radar:"单雷达",multi_radar_fusion:"多雷达融合",multi_radar_fusion_2:"多雷达融合",place_multiple_2_d_radars_in:"把多台二维定位雷达放入统一户型坐标系，并同步到持续运行的 HA 后端。",floor_plan_and_backend:"户型与后端",card_title:"卡片标题",sync_configuration_to_the_backend_when:"管理员打开卡片时自动同步配置到后端",radar_devices:"雷达设备",only_radar_models_with_2_d:"只显示可输出二维或三维位置的雷达型号。每台雷达必须使用唯一 ID。",radar:"雷达",radar_device:"雷达设备",select_device:"选择设备",calibration_profile:"校准档案",manual_not_linked:"手工配置 / 未绑定",device_profile_snapshot:"设备档案快照",entity_mapping:"实体映射",add_radar:"添加雷达",interactive_installation:"交互式安装定位",select_a_radar_in_the_shared:"在同一房间模型中选择雷达，并拖动彩色控制柄调整位置、高度和姿态。其他雷达会作为灰色参照保留。",joint_multi_radar_calibration:"多雷达联合方向校准",each_shared_reference_position_captures_every:"同一个参考位置会同步采集全部雷达，并为每台设备独立计算 yaw 与 X/Y 修正。",fusion_and_recording_rules:"融合与录像规则",filter_single_radar_false_alarms_and:"过滤单雷达误报，并在轨迹结束后只为完整、连续的穿越轨迹保存录像。",minimum_supporting_radars:"最少支持雷达数",merge_distance_cm:"融合距离 (cm)",track_end_delay_s:"轨迹结束等待 (s)",recording_score:"录像最低评分",minimum_duration_s:"最短持续时间 (s)",minimum_displacement_cm:"最短位移 (cm)",boundary_margin_cm:"边界判定范围 (cm)",record_complete_crossings_only:"只保存完整穿越轨迹",recording_test:"录像测试方法",enter_near_one_room_edge_walk:"从房间一侧边缘进入，连续行走至少 {p0} cm 并从另一侧边缘离开；离开雷达范围后等待 {p1} 秒。合格事件会由 TRAJECTORY 变为 TRAVERSE 并触发摄像头。",event_zones_and_cameras:"事件区域与摄像头",draw_polygon_vertices_on_the_floor:"在户型图上点击添加区域顶点，保存后同步到融合后端。",mmwave_radar_card:"毫米波雷达卡片",choose_a_radar_device_to_match:"选择雷达设备后自动完成实体匹配，只需确认房间尺寸即可开始。",basics:"基本信息",card_title_2:"卡片标题",presence_radar:"人体存在雷达",connect_radar_device:"连接雷达设备",select_the_radar_from_home_assistant:"从 Home Assistant 设备列表中选择雷达，卡片会自动识别所需实体。",radar_device_2:"雷达设备",detecting_device_entities:"正在识别设备实体…",matched_p0_configuration_fields:"已自动匹配 {p0} 个配置项",automatic_detection_failed_configure_entities_manually:"自动识别失败，请展开高级选项手动配置。",enter_the_room_dimensions_used_by:"填写房间实际尺寸，后续 3D 安装定位和轨迹显示会使用此比例。",advanced_assign_entities_manually:"高级选项：手动指定实体",troubleshooting:"故障排查"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)",entity_aliases:{distance:["距离"],motion_state:["运动状态","目标状态"],polygon:["多边形","边界"]},card:{syncing:"正在同步…",synced:"已同步",sync_failed:"同步失败",sync_to_device:"同步到设备",installation:"安装定位",place_the_radar_in_the_3d:"在 3D 房间中放置雷达",direction:"方向校准",calibrate_yaw_with_two_reference_points:"通过两个参考点校准偏航",live_test:"实时验证",verify_targets_boundary_and_trails:"检查目标、边界和运动轨迹",presence_radar:"人体存在雷达",p0_target_p1:"{p0} 个目标",outside:"边界外",clear:"无人",open_calibration:"打开校准",open_calibration_2:"打开校准",back_to_radar_view:"返回雷达视图",back_to_radar_view_2:"返回雷达视图",radar_spatial_calibration:"雷达空间校准",calibration_steps:"校准步骤",revert:"撤销修改",reset:"恢复默认",back:"上一步",continue:"下一步",multi_radar_fusion:"多雷达融合",p0_p1_radars_p2:"{p0}/{p1} 台雷达 · {p2}",p0_targets:"{p0} 个目标",clear_2:"无人",trajectory_quality:"轨迹质量",no_playable_clip_is_available_yet:"该事件没有可播放片段，或录像仍在生成。"},fusion:{filtered:"已过滤",clip_failed:"录像失败",recording:"录像中",key_track:"关键轨迹",backend_fusion:"后端融合",local_fallback:"本地降级",backend_error:"后端异常",connecting:"正在连接",hide_coverage:"隐藏覆盖",show_coverage:"显示覆盖",radars_online:"雷达在线",calibration_warning:"安装校准异常",fused_targets:"融合目标",recent_events:"最近事件",integration_missing:"未安装融合集成",integration_missing_help:"多雷达融合需要额外安装 mmwave-fusion 集成（实验性）。未安装时卡片仅在浏览器内做临时融合：不保存轨迹、不产生事件、不触发录像。",integration_outdated:"融合集成版本过旧"},fusioncal:{capturing_all_radars_synchronously:"正在同步采集所有雷达…",no_radar_produced_enough_stable_samples:"没有雷达获得足够的稳定样本，请重试。",captured_p0_p1_radars:"已采集 {p0}/{p1} 台雷达。",joint_direction_calibration:"联合方向校准",calibrate_every_radar_from_shared_positions:"用多个位置同时校准全部雷达",keep_only_one_test_person_in:"保持空间内只有一名测试人员。依次选择至少三个分散位置，每个位置静止两秒完成同步采集。",pending_x_p0_y_p1_cm:"待采集：X {p0} / Y {p1} cm",click_the_floor_plan_to_choose:"点击户型图选择下一个参考位置",capturing:"正在采集…",i_am_ready_capture_all:"我已站好，同步采集",radars:"台雷达",points:"点",not_enough_references:"参考点不足",start_over:"重新采集",apply_all_calibrations:"应用全部校准",need_3_points_120_cm_span:"至少 3 点、跨度 120 cm 且残差 ≤ 40 cm"},zone:{zone_p0:"区域 {p0}",zone_id_cannot_be_empty:"区域 ID 不能为空",zone_id_must_be_unique:"区域 ID 必须唯一",at_least_three_vertices_are_required:"至少需要 3 个顶点",new_zone:"新建区域",floor_plan_event_zone_editor:"事件区域户型编辑器",name:"名称",dwell_seconds:"驻留秒数",vertices:"个顶点",undo_point:"撤销顶点",clear:"清空",delete_zone:"删除区域",cancel:"取消",save_zone:"保存区域",select_or_create_a_zone_then:"选择已有区域或新建区域，然后在户型图上依次点击顶点。"},fusion_reason:{insufficient_observations:"观测不足",too_short:"持续时间不足",too_few_observations:"有效点不足",insufficient_displacement:"位移不足",discontinuous_observations:"轨迹不连续",mostly_outside_room:"大部分在房间外",observation_gap:"观测中断",trajectory_jump:"轨迹跳变",incomplete_crossing:"未完整穿越",unstable_boundary_crossing:"边界反复跳变",below_score_threshold:"质量分不足"},install3d:{yaw:"偏航",pitch:"俯仰",roll:"横滚",vertical_fov_is_not_specified_showing:"说明书未标注垂直视场角，当前为保守示意值",nominal_scan_volume_from_the_model:"型号说明书标称扫描范围",scan_volume:"扫描空间",drag_the_colored_handles_to_position:"拖拽彩色控制柄直接调整安装位置与姿态",model_scan_range:"型号扫描范围",position_x_y:"位置 X/Y",height:"高度",yaw_2:"偏航",pitch_2:"俯仰",roll_2:"横滚"}}};function xe(t,e,i){const a=e??navigator.language?.split("-")[0]??"en",r=ve[e??""]??Object.entries(ve).find(([t])=>t.startsWith(a))?.[1]??ve.en;let o=r;for(const e of t.split("."))if(o=o?.[e],void 0===o)break;if("string"!=typeof o){let e=ve.en;for(const i of t.split("."))if(e=e?.[i],void 0===e)break;o=e}return"string"!=typeof o?t:i?o.replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):t):o}const we=B`
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
`,$e="mmwave-card",ke="mmwave-card-editor",Me=15e3,Se={position:"#03a9f4",height:"#00a878",yaw:"#ff9800",pitch:"#7e57c2",roll:"#ec407a"},ze=(t,e,i)=>Math.min(i,Math.max(e,t)),Re=t=>t*Math.PI/180,Ce=(t,e)=>Math.round(t/e)*e;let De=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.peerCalibrations=[],this._handles=new Map,this._drawRaf=0}_t(t,e){return xe(t,this.lang,e)}get _verticalFovDegrees(){return this.adapter?.info.verticalFovDegrees??Math.min(this.adapter?.info.fovDegrees??60,60)}get _isVerticalFovEstimated(){return null==this.adapter?.info.verticalFovDegrees}firstUpdated(){this._cv&&(this._resizeObserver=new ResizeObserver(()=>this._scheduleDraw()),this._resizeObserver.observe(this._cv)),this._scheduleDraw()}updated(){this._scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),cancelAnimationFrame(this._drawRaf)}_scheduleDraw(){cancelAnimationFrame(this._drawRaf),this._drawRaf=requestAnimationFrame(()=>this._draw())}_scene(){const t=this._cv?.offsetWidth||420,e=ze(Math.round(.7*t),260,330);return{W:t,H:e,floorW:Math.max(180,t-72),floorH:Math.min(104,.32*e),floorTop:.48*e,verticalH:.36*e,roomW:this.calibration?.room_w??this.roomW,roomD:this.calibration?.room_d??this.roomD,zMax:400}}_project(t,e){const i=t.x/e.roomW,a=t.y/e.roomD,r=t.z/e.zMax;return{x:e.W/2+(i-a)*(e.floorW/2),y:e.floorTop+(i+a)*(e.floorH/2)-r*e.verticalH}}_unproject(t,e,i){const a=(t.x-i.W/2)/(i.floorW/2),r=(t.y+e/i.zMax*i.verticalH-i.floorTop)/(i.floorH/2);return{x:(a+r)/2*i.roomW,y:(r-a)/2*i.roomD}}_polygon(t,e){t.beginPath(),e.forEach((e,i)=>0===i?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)),t.closePath()}_line(t,e,i){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.stroke()}_drawHandle(t,e,i,a){this._handles.set(e,i),t.save(),t.shadowColor=Se[e],t.shadowBlur=this._drag?.mode===e?14:7,t.beginPath(),t.arc(i.x,i.y,this._drag?.mode===e?9:7,0,2*Math.PI),t.fillStyle=Se[e],t.fill(),t.shadowBlur=0,t.strokeStyle="#fff",t.lineWidth=1.5,t.stroke(),t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillStyle=Se[e],t.fillText(a,i.x,i.y-11),t.restore()}_draw(){const t=this._cv;if(!t||!this.calibration||0===t.offsetWidth)return;const e=this._scene(),i=he(t,e.H),a=getComputedStyle(this),r=a.getPropertyValue("--primary-text-color").trim()||"#374151",o=a.getPropertyValue("--secondary-text-color").trim()||"#6b7280",s=this.calibration,n=[this._project({x:0,y:0,z:0},e),this._project({x:e.roomW,y:0,z:0},e),this._project({x:e.roomW,y:e.roomD,z:0},e),this._project({x:0,y:e.roomD,z:0},e)],l=[this._project({x:0,y:0,z:e.zMax},e),this._project({x:e.roomW,y:0,z:e.zMax},e)];i.clearRect(0,0,e.W,e.H),this._handles.clear(),i.save(),this._polygon(i,[n[0],n[1],l[1],l[0]]),i.fillStyle="rgba(3,169,244,.035)",i.fill(),this._polygon(i,[n[0],n[3],this._project({x:0,y:e.roomD,z:e.zMax},e),l[0]]),i.fillStyle="rgba(11,130,92,.035)",i.fill(),i.restore(),this._polygon(i,n),i.fillStyle="rgba(11,130,92,.09)",i.fill(),i.strokeStyle="rgba(11,130,92,.55)",i.lineWidth=1.4,i.stroke(),i.save(),i.strokeStyle=o,i.globalAlpha=.14,i.lineWidth=.8;for(let t=.25;t<1;t+=.25)this._line(i,this._project({x:e.roomW*t,y:0,z:0},e),this._project({x:e.roomW*t,y:e.roomD,z:0},e)),this._line(i,this._project({x:0,y:e.roomD*t,z:0},e),this._project({x:e.roomW,y:e.roomD*t,z:0},e));i.restore(),i.save(),i.strokeStyle=o,i.globalAlpha=.25,i.setLineDash([3,4]);for(const t of[{x:0,y:0},{x:e.roomW,y:0},{x:0,y:e.roomD}])this._line(i,this._project({...t,z:0},e),this._project({...t,z:e.zMax},e));i.restore(),i.font="bold 10px system-ui",i.fillStyle=o,i.fillText("X",n[1].x+8,n[1].y+2),i.fillText("Y",n[3].x-14,n[3].y+2),i.fillText("Z",l[0].x-13,l[0].y-2);for(const t of this.peerCalibrations){const a=this._project({x:t.calibration.radar_x,y:t.calibration.radar_y,z:t.calibration.radar_z},e),r=Re(t.calibration.yaw),s=this._project({x:t.calibration.radar_x+45*Math.sin(r),y:t.calibration.radar_y+45*Math.cos(r),z:t.calibration.radar_z},e);i.save(),i.globalAlpha=.48,i.strokeStyle=o,i.fillStyle=o,i.lineWidth=1.2,this._line(i,a,s),i.beginPath(),i.arc(a.x,a.y,4,0,2*Math.PI),i.fill(),i.font="bold 9px system-ui",i.textAlign="center",i.fillText(t.id,a.x,a.y-9),i.restore()}const d=this._project({x:s.radar_x,y:s.radar_y,z:0},e),c=this._project({x:s.radar_x,y:s.radar_y,z:s.radar_z},e),p=Re(s.yaw),_=Re(s.pitch),h=Re(s.roll),g=Math.sin(p)*Math.cos(_),u=Math.cos(p)*Math.cos(_),m=-Math.sin(_),f=Math.cos(p),y=-Math.sin(p),b=0,v=-Math.sin(p)*Math.sin(_),x=-Math.cos(p)*Math.sin(_),w=-Math.cos(_),$=f*Math.cos(h)+v*Math.sin(h),k=y*Math.cos(h)+x*Math.sin(h),M=b*Math.cos(h)+w*Math.sin(h),S=v*Math.cos(h)-f*Math.sin(h),z=x*Math.cos(h)-y*Math.sin(h),R=w*Math.cos(h)-b*Math.sin(h);i.save(),i.strokeStyle=Se.height,i.globalAlpha=.55,i.setLineDash([4,4]),i.lineWidth=1.5,this._line(i,d,c),i.restore(),i.save(),i.translate(d.x,d.y),i.scale(1,.42),i.beginPath(),i.arc(0,0,12,0,2*Math.PI),i.fillStyle="rgba(3,169,244,.14)",i.fill(),i.restore();const C=this.maxRangeM??this.adapter?.info.maxRangeM??3,D=Math.min(100*C,.58*Math.max(e.roomW,e.roomD)),A=Re((this.adapter?.info.fovDegrees??60)/2),P=Re(this._verticalFovDegrees/2),E=(t,i,a=D)=>{const r=Math.cos(i),o=g*Math.cos(t)*r+$*Math.sin(t)*r+S*Math.sin(i),n=u*Math.cos(t)*r+k*Math.sin(t)*r+z*Math.sin(i),l=m*Math.cos(t)*r+M*Math.sin(t)*r+R*Math.sin(i);return this._project({x:s.radar_x+o*a,y:s.radar_y+n*a,z:ze(s.radar_z+l*a,0,e.zMax)},e)},T=t=>Array.from({length:19},(e,i)=>E(i/18*A*2-A,t)),W=t=>Array.from({length:9},(e,i)=>E(t,i/8*P*2-P)),q=T(-P),F=T(0),H=T(P),N=W(-A),L=W(A);i.save(),this._polygon(i,[c,...q]),i.fillStyle="rgba(3,169,244,.055)",i.fill(),this._polygon(i,[c,...H]),i.fillStyle="rgba(11,130,92,.055)",i.fill(),this._polygon(i,[c,...N]),i.fillStyle="rgba(3,169,244,.04)",i.fill(),this._polygon(i,[c,...L]),i.fill(),i.strokeStyle="rgba(3,169,244,.25)",i.lineWidth=.8;for(let t=0;t<=18;t+=3)this._line(i,q[t],H[t]);for(const t of[q,H,N,L])i.beginPath(),t.forEach((t,e)=>0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)),i.stroke();this._polygon(i,[c,...F]),i.fillStyle="rgba(11,130,92,.16)",i.fill(),i.strokeStyle="rgba(11,130,92,.72)",i.lineWidth=1.25,i.stroke();const j=this.adapter?.info.minRangeM??0;if(j>0&&C>0){const t=D*Math.min(j/C,.8),e=Array.from({length:19},(e,i)=>E(i/18*A*2-A,0,t));i.beginPath(),e.forEach((t,e)=>0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)),i.setLineDash([3,3]),i.strokeStyle="rgba(11,130,92,.48)",i.stroke(),i.setLineDash([])}i.restore();const I=(t,i)=>this._project({x:s.radar_x+$*t+S*i,y:s.radar_y+k*t+z*i,z:s.radar_z+M*t+R*i},e),B=[I(-22,-10),I(22,-10),I(22,10),I(-22,10)];this._polygon(i,B),i.fillStyle="#13212b",i.fill(),i.strokeStyle="#6ee7c1",i.lineWidth=1.5,i.stroke(),i.beginPath(),i.arc(c.x,c.y,4,0,2*Math.PI),i.fillStyle="#0b825c",i.fill();const K=.18*Math.min(e.roomW,e.roomD),O=t=>({x:ze(t.x,18,e.W-18),y:ze(t.y,52,e.H-18)}),Y=O(this._project({x:s.radar_x+Math.sin(p)*K,y:s.radar_y+Math.cos(p)*K,z:s.radar_z},e));i.strokeStyle=Se.yaw,i.lineWidth=2,this._line(i,c,Y);const X=O({x:c.x-28,y:c.y});i.strokeStyle=Se.height,i.lineWidth=1,this._line(i,{x:X.x+8,y:X.y},c);const U=O({x:Y.x,y:Y.y-30-s.pitch/90*20});i.strokeStyle=Se.pitch,i.setLineDash([2,3]),this._line(i,Y,U),i.setLineDash([]);const Z=I(38,0),V=O({x:Z.x+s.roll/90*10,y:Z.y});this._drawHandle(i,"position",d,"XY"),this._drawHandle(i,"height",X,"Z"),this._drawHandle(i,"yaw",Y,this._t("install3d.yaw")),this._drawHandle(i,"pitch",U,this._t("install3d.pitch")),this._drawHandle(i,"roll",V,this._t("install3d.roll")),i.save(),i.fillStyle=r,i.globalAlpha=.72,i.font="10px system-ui",i.textAlign="right",i.fillText(`${Math.round(e.roomW)} × ${Math.round(e.roomD)} cm`,e.W-10,e.H-10),i.restore()}_hitTest(t){let e;for(const[i,a]of this._handles){const r=Math.hypot(t.x-a.x,t.y-a.y);r<=18&&(!e||r<e.distance)&&(e={mode:i,distance:r})}return e?.mode}_onPointerDown(t){const e=this._cv;if(!e)return;const i=_e(t,e),a=this._hitTest(i);if(!a)return;t.preventDefault(),e.setPointerCapture(t.pointerId);const r="height"===a?this.calibration.radar_z:"yaw"===a?this.calibration.yaw:"pitch"===a?this.calibration.pitch:"roll"===a?this.calibration.roll:0;this._drag={mode:a,startX:i.x,startY:i.y,startValue:r},this._scheduleDraw()}_onPointerMove(t){const e=this._cv;if(!e)return;const i=_e(t,e);if(!this._drag)return void(e.style.cursor=this._hitTest(i)?"grab":"default");t.preventDefault();const a=this._scene(),r=this._drag;if("position"===r.mode){const t=this._unproject(i,0,a);this._emit({radar_x:Ce(ze(t.x,0,a.roomW),1),radar_y:Ce(ze(t.y,0,a.roomD),1)})}else if("height"===r.mode){const t=r.startValue-(i.y-r.startY)/a.verticalH*a.zMax;this._emit({radar_z:Ce(ze(t,0,a.zMax),1)})}else if("yaw"===r.mode){const t=this._unproject(i,this.calibration.radar_z,a),e=180*Math.atan2(t.x-this.calibration.radar_x,t.y-this.calibration.radar_y)/Math.PI;this._emit({yaw:Ce(e,.5)})}else if("pitch"===r.mode){const t=r.startValue-.6*(i.y-r.startY);this._emit({pitch:Ce(ze(t,-90,90),.5)})}else{const t=r.startValue+.6*(i.x-r.startX);this._emit({roll:Ce(ze(t,-90,90),.5)})}}_onPointerUp(t){const e=this._cv;e?.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._drag=void 0,this._scheduleDraw()}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}render(){if(!this.calibration)return B``;const t=this.calibration;return B`
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
            title=${this._isVerticalFovEstimated?this._t("install3d.vertical_fov_is_not_specified_showing"):this._t("install3d.nominal_scan_volume_from_the_model")}
          >
            ${this._t("install3d.scan_volume")} · H ${this.adapter?.info.fovDegrees??60}° · V
            ${this._isVerticalFovEstimated?"≈":""}${this._verticalFovDegrees}° ·
            ${this.maxRangeM??this.adapter?.info.maxRangeM??3} m
          </span>
        </div>
      </div>
      <div class="hint">${this._t("install3d.drag_the_colored_handles_to_position")}</div>
      <div class="legend">
        <span class="beam-key"><i></i>${this._t("install3d.model_scan_range")}</span>
        ${this._legend("position",this._t("install3d.position_x_y"))}
        ${this._legend("height",this._t("install3d.height"))} ${this._legend("yaw",this._t("install3d.yaw_2"))}
        ${this._legend("pitch",this._t("install3d.pitch_2"))} ${this._legend("roll",this._t("install3d.roll_2"))}
      </div>
    `}_legend(t,e){return B`<span><i style="background:${Se[t]}"></i>${e}</span>`}static{this.styles=s`
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
  `}};t([_t({attribute:!1})],De.prototype,"adapter",void 0),t([_t({attribute:!1})],De.prototype,"calibration",void 0),t([_t({attribute:!1})],De.prototype,"lang",void 0),t([_t({type:Number})],De.prototype,"roomW",void 0),t([_t({type:Number})],De.prototype,"roomD",void 0),t([_t({type:Number})],De.prototype,"maxRangeM",void 0),t([_t({attribute:!1})],De.prototype,"peerCalibrations",void 0),t([gt("#installation-cv")],De.prototype,"_cv",void 0),De=t([dt("mmwave-installation-3d")],De);let Ae=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._rafId=0}_L(t){return xe(t,this.lang)}_t(t,e){return xe(t,this.lang,e)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const i=_e(t,e),a=pe(i.x,i.y,this._m());this._emit({polygon:[...this.calibration.polygon,a]})}_undo(){const t=[...this.calibration.polygon];t.pop(),this._emit({polygon:t})}_clear(){this._emit({polygon:[]})}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0){const e=he(t,this._cssH()),i=this._m();if(ge(e,i),this.adapter){const t=ce(this.calibration.radar_x,this.calibration.radar_y,i);me(e,t.cx,t.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM)}ue(e,this.calibration.polygon,i)}this._rafId=requestAnimationFrame(()=>this._loop())}_numField(t,e,i,a=5,r=-9999,o=9999){const s=t=>{let i=parseFloat(t.target.value)||0;i>o&&(i=o),i<r&&(i=r),this._emit({[e]:i})};return B` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(i)}
        step=${a}
        min=${r}
        max=${o}
        @input=${s}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(i)}
        step=${a}
        min=${r}
        max=${o}
        @change=${s}
      />
      <span class="unit">cm</span>
    </div>`}_degField(t,e,i,a=-180,r=180){const o=t=>{const i=parseFloat(t.target.value)||0;this._emit({[e]:i})};return B` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(i)}
        step="0.5"
        min=${a}
        max=${r}
        @input=${o}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(i)}
        step="0.5"
        min=${a}
        max=${r}
        @change=${o}
      />
      <span class="unit">°</span>
    </div>`}render(){const t=this.calibration,e=t.polygon.length,i=e>=3?this._L("geo.poly_hint_ok").replace("{n}",String(e)):this._L("geo.poly_hint_none"),a=t.room_w??this.roomW,r=t.room_d??this.roomD;return B`
      <div class="panel-heading">
        <span class="eyebrow">${this._t("geo.step_1_installation")}</span>
        <h2>${this._t("geo.place_the_radar_in_the_room")}</h2>
        <p>${this._t("geo.drag_the_colored_handles_to_set")}</p>
      </div>

      <mmwave-installation-3d
        .adapter=${this.adapter}
        .calibration=${t}
        .lang=${this.lang}
        .roomW=${a}
        .roomD=${r}
        .maxRangeM=${this.maxRangeM}
      ></mmwave-installation-3d>

      <details class="precision">
        <summary>
          <span>${this._t("geo.precise_numeric_adjustment")}</span>
          <small>${this._t("geo.optional")}</small>
        </summary>
        <div class="precision-fields">
          ${this._numField(this._L("geo.radar_x"),"radar_x",t.radar_x,5,0,a)}
          ${this._numField(this._L("geo.radar_y"),"radar_y",t.radar_y,5,0,r)}
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
            <span class="eyebrow">${this._t("geo.optional_2")}</span>
            <h3>${this._L("geo.boundary")}</h3>
            <p>${this._t("geo.click_the_top_down_map_to")}</p>
          </div>
          <span class="boundary-badge ${e>=3?"active":""}"
            >${e>=3?`${e} ${this._t("geo.points")}`:this._t("geo.off")}</span
          >
        </div>
        <div class="poly-bar">
          <span class="poly-hint ${e>=3?"ok":""}">${i}</span>
          <div class="poly-btns">
            <button class="pbtn" type="button" ?disabled=${0===e} @click=${this._undo}>
              ${this._t("geo.undo_point")}
            </button>
            <button class="pbtn danger" type="button" ?disabled=${0===e} @click=${this._clear}>
              ${this._L("geo.poly_clear")}
            </button>
          </div>
        </div>
        <div class="map-shell">
          <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
          ${0===e?B`<span class="map-empty">${this._t("geo.click_the_map_to_add_the")}</span>`:""}
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
  `}};t([_t({attribute:!1})],Ae.prototype,"adapter",void 0),t([_t({attribute:!1})],Ae.prototype,"calibration",void 0),t([_t({attribute:!1})],Ae.prototype,"lang",void 0),t([_t({type:Number})],Ae.prototype,"roomW",void 0),t([_t({type:Number})],Ae.prototype,"roomD",void 0),t([_t({type:Number})],Ae.prototype,"maxRangeM",void 0),t([gt("#poly-cv")],Ae.prototype,"_cv",void 0),Ae=t([dt("mmwave-geo-panel")],Ae);let Pe=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._yw={sub:0,capturing:!1},this._rafId=0}_L(t){return xe(t,this.lang)}_t(t,e){return xe(t,this.lang,e)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}offerReading(t,e){this._yw.capturing&&(this._capture(t,e),this._yw={...this._yw,capturing:!1})}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const i=this._yw;if(0!==i.sub&&1!==i.sub)return;const a=_e(t,e),r=pe(a.x,a.y,this._m());0===i.sub?this._yw={...i,refA:{canvasPt:a,roomPt:r},sub:.5}:this._yw={...i,refB:{canvasPt:a,roomPt:r},sub:1.5},this.requestUpdate()}_onCapture(){this._yw={...this._yw,capturing:!0},this.dispatchEvent(new CustomEvent("capture-requested",{bubbles:!0,composed:!0}))}_restart(){this._yw={sub:0,capturing:!1}}_capture(t,e){const i=this._yw;.5===i.sub&&i.refA?this._yw={...i,refA:{...i.refA,detPt:{x:t,y:e}},sub:1}:1.5===i.sub&&i.refB&&(this._yw={...i,refB:{...i.refB,detPt:{x:t,y:e}},sub:2},this._computeYaw())}_computeYaw(){const t=this._yw;if(!t.refA?.detPt||!t.refB?.detPt)return;const e=this._m(),i=pe(t.refA.canvasPt.x,t.refA.canvasPt.y,e),a=pe(t.refB.canvasPt.x,t.refB.canvasPt.y,e),r=t.refA.detPt,o=t.refB.detPt,s=function(t,e,i,a){const r=Math.atan2(e.y-t.y,e.x-t.x);let o=(Math.atan2(a.y-i.y,a.x-i.x)-r)*(180/Math.PI);for(;o>180;)o-=360;for(;o<-180;)o+=360;return Math.round(10*o)/10}(i,a,r,o),n={...this.calibration,yaw:s},l=function(t,e,i,a,r){const o=se(i.x,i.y,0,r),s=se(a.x,a.y,0,r);return(Math.hypot(o.roomX-t.x,o.roomY-t.y)+Math.hypot(s.roomX-e.x,s.roomY-e.y))/2}(i,a,r,o,n);this._yw={...this._yw,residual:l},this.dispatchEvent(new CustomEvent("calibration-changed",{detail:n,bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=he(t,this._cssH()),i=this._m();ge(e,i),ue(e,this.calibration.polygon,i,!0);const a=ce(this.calibration.radar_x,this.calibration.radar_y,i);me(e,a.cx,a.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM);const r=(t,a)=>{if(t&&(be(e,t.canvasPt.x,t.canvasPt.y,a,"#64b5f6"),t.detPt)){const r=se(t.detPt.x,t.detPt.y,0,this.calibration),o=ce(r.roomX,r.roomY,i);e.beginPath(),e.moveTo(t.canvasPt.x,t.canvasPt.y),e.lineTo(o.cx,o.cy),e.strokeStyle="rgba(244,99,99,.4)",e.lineWidth=1,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),be(e,o.cx,o.cy,a,"rgba(244,99,99,.85)",!0)}};r(this._yw.refA,"A"),r(this._yw.refB,"B")}this._rafId=requestAnimationFrame(()=>this._loop())}_refStep(t){const e=this._yw,i=0===t?e.sub:e.sub-1,a=i>=1?"done":i>=0?"act":"",r=0===t,o=r?e.refA:e.refB;let s;if(i>=1)s=this._L(r?"yaw.ref_a_done":"yaw.ref_b_done");else if(.5===i)if(null!=o?.roomPt){const t=Math.round(o.roomPt.x),e=Math.round(o.roomPt.y),i=this._L(r?"yaw.ref_a_marked":"yaw.ref_b_marked");s=i.includes("{x}")?i.replace("{x}",String(t)).replace("{y}",String(e)):`(X=${t}, Y=${e} cm) — ${this._L(r?"yaw.ref_a_idle":"yaw.ref_b_step")}`}else s=this._L(r?"yaw.ref_a_marked":"yaw.ref_b_marked").replace("{x}","?").replace("{y}","?");else s=0===i?this._L(r?"yaw.ref_a_idle":"yaw.ref_b_step"):this._L("yaw.ref_b_idle");return B` <div class="ref-step ${a}">
      <div class="ref-num">${i>=1?"✓":r?"A":"B"}</div>
      <div class="ref-copy">
        <div class="ref-title">${this._L(r?"yaw.ref_a_title":"yaw.ref_b_title")}</div>
        <div class="ref-sub">${s}</div>
      </div>
    </div>`}render(){const t=this._yw,e=.5===t.sub||1.5===t.sub,i=t.sub>=2,a=i?this._L("yaw.result_ok").replace("{yaw}",String(this.calibration.yaw)).replace("{residual}",String((t.residual??0).toFixed(1))):this._L("yaw.result_idle");return B`
      <div class="panel-heading">
        <span class="eyebrow">${this._t("yaw.step_2_direction")}</span>
        <h2>${this._t("yaw.calculate_yaw_from_two_positions")}</h2>
        <p>${this._t("yaw.choose_two_well_separated_places_you")}</p>
      </div>

      <div class="ref-grid">${this._refStep(0)} ${this._refStep(1)}</div>
      <div class="map-shell">
        <canvas id="yaw-cv" @click=${this._onCanvasClick}></canvas>
        <span class="map-tip">
          ${0===t.sub||1===t.sub?this._t("yaw.click_the_map_to_choose_where"):t.capturing?this._t("yaw.stand_still_while_waiting_for_radar"):this._t("yaw.walk_to_the_marked_position")}
        </span>
      </div>
      <button class="cap-btn" type="button" ?disabled=${!e||t.capturing} @click=${this._onCapture}>
        <span class="cap-icon">${t.capturing?"···":"◎"}</span>
        ${t.capturing?this._L("yaw.capture_wait"):e?this._t("yaw.i_am_ready_capture_position"):this._t("yaw.choose_a_position_on_the_map")}
      </button>
      <div class="result-card ${i?"ok":""}">
        <span class="result-icon">${i?"✓":"i"}</span>
        <span>${a}</span>
        ${t.sub>0?B`<button type="button" @click=${this._restart}>${this._t("yaw.start_over")}</button>`:""}
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
  `}};t([_t({attribute:!1})],Pe.prototype,"adapter",void 0),t([_t({attribute:!1})],Pe.prototype,"calibration",void 0),t([_t({attribute:!1})],Pe.prototype,"lang",void 0),t([_t({type:Number})],Pe.prototype,"roomW",void 0),t([_t({type:Number})],Pe.prototype,"roomD",void 0),t([_t({type:Number})],Pe.prototype,"maxRangeM",void 0),t([ht()],Pe.prototype,"_yw",void 0),t([gt("#yaw-cv")],Pe.prototype,"_cv",void 0),Pe=t([dt("mmwave-yaw-panel")],Pe);const Ee=["#ff9800","#03a9f4","#e91e63"];function Te(t){return Ee[(t%Ee.length+Ee.length)%Ee.length]}function We(t,e,i,a,r){const o=2/Math.max(1e-4,a),s=o*r,n=1/(1+s+.48*s*s+.235*s*s*s),l=t-e,d=(i+o*l)*r;let c=(i-o*d)*n,p=e+(l+d)*n;return(Math.abs(e-t)<1e-6||(e-t)*(p-e)>0)&&(p=e,c=0),[p,c]}let qe=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.targets=[],this.present=!1,this.showStatus=!1,this._trails=new Map,this._animatedTargets=new Map,this._rafId=0,this._lastFrameAt=0,this._lastTrailPruneAt=0}connectedCallback(){super.connectedCallback(),this._lastFrameAt=Date.now(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}willUpdate(t){t.has("targets")&&this._setTargetGoals(this.targets)}_setTargetGoals(t){const e=Date.now();for(const i of t){if(!i.room)continue;const t=i.room.roomX,a=i.room.roomY,r=Math.hypot(i.rawX,i.rawY)/100,o=this._animatedTargets.get(i.index);o&&e-o.lastSeen<=1e3?(o.goalX=t,o.goalY=a,o.goalRangeM=r,o.lastSeen=e):(this._trails.delete(i.index),this._animatedTargets.set(i.index,{x:t,y:a,rangeM:r,goalX:t,goalY:a,goalRangeM:r,velocityX:0,velocityY:0,velocityRange:0,lastSeen:e,lastTrailAt:0}))}}_advanceTargets(t){const e=Math.min(Math.max((t-this._lastFrameAt)/1e3,0),.05);this._lastFrameAt=t;const i=Math.max(this.adapter.info.updateRateHz,1),a=Math.min(.22,Math.max(.12,1.25/i));for(const[i,r]of this._animatedTargets)t-r.lastSeen>1e3?this._animatedTargets.delete(i):([r.x,r.velocityX]=We(r.x,r.goalX,r.velocityX,a,e),[r.y,r.velocityY]=We(r.y,r.goalY,r.velocityY,a,e),[r.rangeM,r.velocityRange]=We(r.rangeM,r.goalRangeM,r.velocityRange,a,e))}_sampleTrails(t,e){for(const i of t){const t=this._animatedTargets.get(i.index);if(!t||!i.room?.inBoundary||e-t.lastTrailAt<75)continue;t.lastTrailAt=e;const a=this._trails.get(i.index)??[],r=a.at(-1);(!r||Math.hypot(t.x-r.x,t.y-r.y)>=.5)&&(a.push({x:t.x,y:t.y,t:e}),this._trails.set(i.index,a))}if(e-this._lastTrailPruneAt>=1e3){this._lastTrailPruneAt=e;const t=e-9e4;for(const[e,i]of this._trails){const a=i.filter(e=>e.t>t);a.length>0?this._trails.set(e,a):this._trails.delete(e)}}}clearTrail(){this._trails.clear();for(const t of this._animatedTargets.values())t.lastTrailAt=0}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 340;const e=this.roomD/this.roomW;return Math.max(140,Math.min(340,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=he(t,this._cssH()),i=this._m(),a=Date.now();this._advanceTargets(a),this._sampleTrails(this.targets,a),ge(e,i),ue(e,this.calibration.polygon,i);const r=ce(this.calibration.radar_x,this.calibration.radar_y,i);me(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM);for(const[t,r]of this._trails)if(!(r.length<2)){e.save(),e.strokeStyle=Te(t),e.lineWidth=2,e.lineCap="round";for(let t=1;t<r.length;t++){const o=r[t-1],s=r[t],n=(a-s.t)/9e4;e.globalAlpha=Math.max(0,.5-.5*n);const l=ce(o.x,o.y,i),d=ce(s.x,s.y,i);e.beginPath(),e.moveTo(l.cx,l.cy),e.lineTo(d.cx,d.cy),e.stroke()}e.restore()}for(const t of this.targets){if(!t.room)continue;const a=this._animatedTargets.get(t.index);if(this.adapter.info.is1DRanging)ye(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,a?.rangeM??Math.hypot(t.rawX,t.rawY)/100,i,t.room.inBoundary);else{const r=ce(a?.x??t.room.roomX,a?.y??t.room.roomY,i),o=Te(t.index);fe(e,r.cx,r.cy,t.room.inBoundary,o),this.adapter.info.maxTargets>1&&(e.fillStyle=o,e.font="bold 10px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(String(t.index+1),r.cx,r.cy-14),e.textBaseline="alphabetic")}}}this._rafId=requestAnimationFrame(()=>this._loop())}_L(t){return xe(t,this.lang)}_t(t,e){return xe(t,this.lang,e)}_badgeText(){if(!this.present)return this._L("live.badge_none");const t=this.targets.filter(t=>t.room?.inBoundary).length;return t>0?this._L("live.badge_present"):this._L("live.badge_filtered")}_badgeCls(){return this.present?this.targets.some(t=>t.room?.inBoundary)?"on":"filtered":""}render(){return B`
      ${this.showStatus?B`<div class="panel-heading">
            <span class="eyebrow">${this._t("live.step_3_live_test")}</span>
            <h2>${this._t("live.verify_coverage_and_target_trails")}</h2>
            <p>${this._t("live.walk_through_the_room_and_confirm")}</p>
          </div>`:""}
      <div class="scene-shell">
        <canvas id="live-cv"></canvas>
        <div class="scene-toolbar">
          <div class="badge ${this._badgeCls()}"><i></i>${this._badgeText()}</div>
          ${this.showStatus?B`<button type="button" @click=${this.clearTrail}>${this._t("live.clear_trails")}</button>`:""}
        </div>
        ${this.present?"":B`<div class="idle-hint"><span>◎</span>${this._t("live.waiting_for_a_radar_target")}</div>`}
      </div>
      ${this.showStatus?B`
            <div class="target-summary">
              <div class="summary-head">
                <strong>${this._t("live.detected_targets")}</strong>
                <span
                  >${this.targets.filter(t=>t.room?.inBoundary).length} /
                  ${this.adapter.info.maxTargets}</span
                >
              </div>
              <div class="target-list">
                ${this.targets.length>0?this.targets.map(t=>B`
                        <div
                          class="target-row ${t.room?.inBoundary?"":"outside"}"
                          style="--target-color:${Te(t.index)}"
                        >
                          <span class="target-id"><i></i>${this._t("live.target")} ${t.index+1}</span>
                          <span class="target-coord">
                            ${t.room?`X ${Math.round(t.room.roomX)} · Y ${Math.round(t.room.roomY)}${this.adapter.info.hasZAxis?` · Z ${Math.round(t.room.roomZ)}`:""} cm`:"—"}
                          </span>
                          <span class="target-state"
                            >${t.room?.inBoundary?this._t("live.inside"):this._t("live.outside")}</span
                          >
                        </div>
                      `):B`<div class="target-empty">${this._t("live.no_target_data_yet")}</div>`}
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
  `}};t([_t({attribute:!1})],qe.prototype,"adapter",void 0),t([_t({attribute:!1})],qe.prototype,"calibration",void 0),t([_t({attribute:!1})],qe.prototype,"lang",void 0),t([_t({type:Number})],qe.prototype,"roomW",void 0),t([_t({type:Number})],qe.prototype,"roomD",void 0),t([_t({attribute:!1})],qe.prototype,"targets",void 0),t([_t({type:Boolean})],qe.prototype,"present",void 0),t([_t({type:Boolean})],qe.prototype,"showStatus",void 0),t([_t({type:Number})],qe.prototype,"maxRangeM",void 0),t([gt("#live-cv")],qe.prototype,"_cv",void 0),qe=t([dt("mmwave-live-panel")],qe);const Fe=["#ff9800","#03a9f4","#e91e63","#8bc34a","#9c27b0","#00bcd4"];function He(t){let e=0;for(const i of t)e=31*e+i.charCodeAt(0)|0;return Fe[Math.abs(e)%Fe.length]}let Ne=class extends nt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.radars=[],this.targets=[],this.zones=[],this.events=[],this.historyTrack=[],this.selectedEventId="",this.lang="en",this.backendState="connecting",this.showCoverage=!1,this.trails=new Map,this.animationFrame=0}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.animationFrame)}willUpdate(t){if(!t.has("targets"))return;const e=Date.now();for(const t of this.targets){const i=this.trails.get(t.track_id)??[],a=i.at(-1);(!a||Math.hypot(a.x-t.x,a.y-t.y)>=.5)&&i.push({x:t.x,y:t.y,timestamp:e}),this.trails.set(t.track_id,i.filter(t=>t.timestamp>=e-Me))}const i=new Set(this.targets.map(t=>t.track_id));for(const t of this.trails.keys()){const a=this.trails.get(t)??[];!i.has(t)&&(a.at(-1)?.timestamp??0)<e-Me&&this.trails.delete(t)}}metrics(){const t=this.canvas?.offsetWidth||500;return{W:t,H:Math.max(220,Math.min(520,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD}}loop(){const t=this.canvas;if(t&&t.offsetWidth>0){const e=this.metrics(),i=he(t,e.H),a=Date.now();ge(i,e),this.drawZones(i,e),this.drawRadars(i,e),this.drawTrails(i,e,a),this.drawHistory(i,e),this.drawTargets(i,e)}this.animationFrame=requestAnimationFrame(()=>this.loop())}drawZones(t,e){this.zones.forEach((i,a)=>{if(i.polygon.length<3)return;const r=Fe[(a+3)%Fe.length],o=i.polygon.map(t=>ce(t.x,t.y,e));t.beginPath(),o.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),t.closePath(),t.globalAlpha=.08,t.fillStyle=r,t.fill(),t.globalAlpha=.6,t.strokeStyle=r,t.lineWidth=1.5,t.setLineDash([5,4]),t.stroke(),t.setLineDash([]),t.globalAlpha=1,t.fillStyle=r,t.font="bold 10px system-ui",t.textAlign="left",t.fillText(i.name||i.id,o[0].cx+5,o[0].cy+13)})}drawRadars(t,e){for(const i of this.radars){const a=ce(i.calibration.radar_x,i.calibration.radar_y,e),r=i.calibrationWarning?"#ff9800":i.available?"#0b825c":"#9ca3af";this.showCoverage&&(t.save(),t.globalAlpha=i.available?.14:.06,me(t,a.cx,a.cy,i.calibration.yaw,i.calibration.pitch,i.adapter.info.fovDegrees,i.adapter.info.minRangeM,i.adapter.info.maxRangeM,e,i.adapter.info.vitalRangeM),t.restore());const o=Math.PI/2-i.calibration.yaw*(Math.PI/180);t.save(),t.strokeStyle=r,t.fillStyle=r,t.lineWidth=1.5,t.globalAlpha=i.available?.9:.4,t.beginPath(),t.arc(a.cx,a.cy,4,0,2*Math.PI),t.fill(),t.beginPath(),t.moveTo(a.cx,a.cy),t.lineTo(a.cx+18*Math.cos(o),a.cy+18*Math.sin(o)),t.stroke(),t.restore(),t.fillStyle=r,t.font="bold 9px system-ui",t.textAlign="center",t.fillText(i.config.id,a.cx,a.cy-14)}}drawTrails(t,e,i){for(const[a,r]of this.trails)if(!(r.length<2)){t.save(),t.strokeStyle=He(a),t.lineWidth=2.2,t.lineCap="round";for(let a=1;a<r.length;a++){const o=ce(r[a-1].x,r[a-1].y,e),s=ce(r[a].x,r[a].y,e);t.globalAlpha=Math.max(.05,.65-(i-r[a].timestamp)/Me*.65),t.beginPath(),t.moveTo(o.cx,o.cy),t.lineTo(s.cx,s.cy),t.stroke()}t.restore()}}drawTargets(t,e){for(const i of this.targets){const a=ce(i.x,i.y,e),r=He(i.track_id);fe(t,a.cx,a.cy,!0,r),t.fillStyle=r,t.font="bold 9px ui-monospace, monospace",t.textAlign="center",t.fillText(i.track_id.slice(0,6),a.cx,a.cy-14)}}drawHistory(t,e){this.historyTrack.length<2||(t.save(),t.strokeStyle="#ffffff",t.lineWidth=2.5,t.globalAlpha=.75,t.setLineDash([6,4]),t.beginPath(),this.historyTrack.forEach((i,a)=>{const r=ce(i.x,i.y,e);0===a?t.moveTo(r.cx,r.cy):t.lineTo(r.cx,r.cy)}),t.stroke(),t.restore())}selectEvent(t){this.dispatchEvent(new CustomEvent("fusion-event-selected",{detail:t,bubbles:!0,composed:!0}))}_t(t,e){return xe(t,this.lang,e)}qualityReason(t){return t?this._t(`fusion_reason.${t}`):this._t("fusion.filtered")}eventStatus(t){return t.clip_path?"▶":"failed"===t.clip_status?this._t("fusion.clip_failed"):"waiting"===t.clip_status||"extracting"===t.clip_status?this._t("fusion.recording"):"rejected_quality"===t.recording_decision||"trajectory"===t.event_type?this.qualityReason(t.quality_reason):"traverse"===t.event_type?this._t("fusion.key_track"):""}render(){const t=this.radars.filter(t=>t.available).length,e=this.radars.filter(t=>t.calibrationWarning),i=this.events.filter(t=>"trajectory"===t.event_type||"traverse"===t.event_type),a=i.length?i:this.events;return B`
      <div class="scene">
        <canvas id="fusion-cv"></canvas>
        <div class="overlay">
          <span class="status ${this.backendState}">
            <i></i>
            ${"online"===this.backendState?this._t("fusion.backend_fusion"):"missing"===this.backendState?this._t("fusion.integration_missing"):"outdated"===this.backendState?this._t("fusion.integration_outdated"):"fallback"===this.backendState?this._t("fusion.local_fallback"):"error"===this.backendState?this._t("fusion.backend_error"):this._t("fusion.connecting")}
          </span>
          <span class="overlay-actions">
            <button type="button" class="coverage-toggle" @click=${()=>this.showCoverage=!this.showCoverage}>
              ${this.showCoverage?this._t("fusion.hide_coverage"):this._t("fusion.show_coverage")}
            </button>
            <span class="radar-count">${t}/${this.radars.length} ${this._t("fusion.radars_online")}</span>
          </span>
        </div>
      </div>
      ${e.length?B`<div class="calibration-warning">
            ${this._t("fusion.calibration_warning")}:
            ${e.map(t=>{const e=null==t.inRoomRatio?"?":`${Math.round(100*t.inRoomRatio)}%`;return`${t.config.id} (${e})`}).join(", ")}
          </div>`:""}
      <div class="summary">
        <div><strong>${this.targets.length}</strong><span>${this._t("fusion.fused_targets")}</span></div>
        ${this.targets.map(t=>B`
            <div class="track" style="--track-color:${He(t.track_id)}">
              <i></i>
              <span>${t.track_id.slice(0,6)}</span>
              <small>X ${Math.round(t.x)} · Y ${Math.round(t.y)} cm</small>
              <em>${Math.round(100*t.confidence)}%</em>
            </div>
          `)}
      </div>
      ${a.length?B`
            <div class="events">
              <strong>${this._t("fusion.recent_events")}</strong>
              ${a.slice(0,8).map(t=>B`
                  <button
                    type="button"
                    class=${t.event_id===this.selectedEventId?"selected":""}
                    @click=${()=>this.selectEvent(t)}
                  >
                    <span>
                      ${t.event_type.toUpperCase()} · ${t.zone_id}
                      ${null==t.quality_score?"":` · ${t.quality_score}/100`}
                    </span>
                    <small>${new Date(1e3*t.timestamp).toLocaleString()}</small>
                    <em class=${"failed"===t.clip_status?"failed":""}>${this.eventStatus(t)}</em>
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
    .overlay-actions {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .coverage-toggle {
      pointer-events: auto;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font: inherit;
      font-size: 9px;
      cursor: pointer;
      backdrop-filter: blur(6px);
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
    .calibration-warning {
      margin-top: 8px;
      padding: 7px 9px;
      border: 1px solid color-mix(in srgb, var(--warning-color, #ff9800) 45%, transparent);
      border-radius: 8px;
      color: var(--warning-color, #ff9800);
      background: color-mix(in srgb, var(--warning-color, #ff9800) 8%, transparent);
      font-size: 9px;
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
    .events em.failed {
      color: var(--error-color, #e53935);
    }
  `}};t([_t({type:Number})],Ne.prototype,"roomW",void 0),t([_t({type:Number})],Ne.prototype,"roomD",void 0),t([_t({attribute:!1})],Ne.prototype,"radars",void 0),t([_t({attribute:!1})],Ne.prototype,"targets",void 0),t([_t({attribute:!1})],Ne.prototype,"zones",void 0),t([_t({attribute:!1})],Ne.prototype,"events",void 0),t([_t({attribute:!1})],Ne.prototype,"historyTrack",void 0),t([_t({attribute:!1})],Ne.prototype,"selectedEventId",void 0),t([_t({attribute:!1})],Ne.prototype,"lang",void 0),t([_t({attribute:!1})],Ne.prototype,"backendState",void 0),t([ht()],Ne.prototype,"showCoverage",void 0),t([gt("#fusion-cv")],Ne.prototype,"canvas",void 0),Ne=t([dt("mmwave-fusion-panel")],Ne),window.customCards??=[],window.customCards.push({type:$e,name:"MMWave Radar HA Card",description:"Multi-model mmWave radar calibration & live visualization",preview:!0,documentationURL:"https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card"}),console.info("%c MMWAVE-CARD %c v1.0.0 ","background:#03a9f4;color:#fff;font-weight:700","background:#1c1c2e;color:#03a9f4;font-weight:700");function Le(t,e=new Set){return"string"==typeof t&&/^[a-z_]+\.[a-z0-9_]+$/.test(t)?e.add(t):Array.isArray(t)?t.forEach(t=>Le(t,e)):t&&"object"==typeof t&&Object.values(t).forEach(t=>Le(t,e)),e}function je(t,e){return[...Le(e)].some(e=>{const i=t.states[e];return i&&"unavailable"!==i.state&&"unknown"!==i.state})}let Ie=class extends nt{constructor(){super(...arguments),this._tab=0,this._isCalibrating=!1,this._targets=[],this._present=!1,this._syncState="idle",this._fusionTargets=[],this._fusionRadars=[],this._fusionBackendState="connecting",this._fusionEvents=[],this._fusionHistoryTrack=[],this._fusionVideoUrl="",this._deviceLoaded=!1,this._localFusion=new ne,this._localObservationBuffer=[],this._sourceSignatures=new Map,this._fusionConnecting=!1}setConfig(t){if(this._disconnectFusionBackend(),t.radars?.length){this._config={...mt,...t};const e=this._config.room_w,i=this._config.room_d;return this._fusionRadars=t.radars.map((a,r)=>{const o=ae(a.radar_model);if(!o)throw new Error(`Unknown radar_model for radars[${r}]: "${a.radar_model}"`);if(o.info.is1DRanging)throw new Error(`Radar "${a.id}" uses a ranging-only model and cannot participate in 2-D fusion.`);const s={...a,type:this._config.type,room_w:e,room_d:i},n=o.validateConfig(s);n.length&&console.warn(`Radar "${a.id}" is not fully configured: ${n.join("; ")}`);const l=o.getDefaultCalibration();return{config:a,adapter:o,calibration:{...l,radar_x:Math.round(e*(r+1)/(t.radars.length+1)),radar_y:Math.round(.2*i),...a.calibration,polygon:a.calibration?.polygon??[]},available:!1}}),this._adapter=this._fusionRadars[0].adapter,this._cal=this._fusionRadars[0].calibration,this._localFusion=new ne({...t.fusion,min_confirm_sources:t.fusion?.min_confirm_sources??(t.radars.length>1?2:1),track_ttl_s:t.fusion?.track_ttl_s??(t.radars.some(t=>"r60abd1"===t.radar_model)?3:1.2)}),this._fusionTargets=[],this._fusionEvents=[],this._fusionHistoryTrack=[],this._selectedFusionEvent=void 0,this._fusionVideoUrl="",this._localObservationBuffer=[],this._sourceSignatures.clear(),void(this._fusionBackendState="connecting")}if(!t.radar_model)throw new Error("radar_model is required");const e=ae(t.radar_model);if(!e)throw new Error(`Unknown radar_model: "${t.radar_model}". Check src/models/index.ts.`);const i=e.validateConfig(t);if(i.length)throw new Error(i.join("; "));this._config={...mt,...t},this._adapter=e;const a=e.getDefaultCalibration(),r=this._config.room_w,o=this._config.room_d;a.radar_x=Math.round(.382*r),a.radar_y=Math.round(.382*o),this._cal=a}static async getConfigElement(){return await Promise.resolve().then(function(){return Je}),document.createElement(ke)}static getStubConfig(){return{...mt,radar_model:"r60abd1",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z"}}getCardSize(){return 7}set hass(t){if(this._hass=t,!this._adapter||!this._config)return;if(this._config.radars?.length)return this._updateFusionMode(t),void this._connectFusionBackend();this._deviceLoaded||(this._deviceLoaded=!0,this._loadFromDevice());const e=this._adapter.readFromHass(t,this._config);if(this._present=e.present,this._maxRangeM=e.maxRangeM,this._targets=e.targets.map(t=>({...t,room:se(t.rawX,t.rawY,t.rawZ,this._cal)})),this.requestUpdate(),1===this._tab&&this._yawPanel){const t=e.targets[0];t&&this._yawPanel.offerReading(t.rawX,t.rawY)}}_L(t){return xe(t,this._hass?.language)}_t(t,e){return xe(t,this._hass?.language,e)}_insideTargetCount(){return this._targets.filter(t=>t.room?.inBoundary).length}_syncLabel(){return"syncing"===this._syncState?this._t("card.syncing"):"success"===this._syncState?this._t("card.synced"):"error"===this._syncState?this._t("card.sync_failed"):this._t("card.sync_to_device")}disconnectedCallback(){super.disconnectedCallback(),null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._disconnectFusionBackend()}_updateFusionMode(t){const e=Date.now(),i=[];this._fusionRadars=this._fusionRadars.map(a=>{const r={...a.config,type:this._config.type,room_w:this._config.room_w,room_d:this._config.room_d},o=a.config.frame_entity?t.states[a.config.frame_entity]:void 0,s=o?de(o.state):void 0,n=s?{present:s.targets.length>0,targets:s.targets.map((t,e)=>{const i=Number(a.config.frame_coordinate_scale??1);return{index:e,rawX:t.x*i,rawY:t.y*i,rawZ:t.z*i,speed:null==t.speed?void 0:t.speed*i}})}:a.adapter.readFromHass(t,r),l=function(t,e){const i=e.frame_entity?t.states[e.frame_entity]:void 0;return(i&&de(i.state)?[e.frame_entity]:[...Le(e)]).sort().map(e=>`${e}:${t.states[e]?.last_updated??"missing"}`).join("|")}(t,a.config),d=l!==this._sourceSignatures.get(a.config.id);if(this._sourceSignatures.set(a.config.id,l),d)for(const t of n.targets){const r=se(t.rawX,t.rawY,t.rawZ,a.calibration);i.push({radarId:a.config.id,slot:t.index,timestamp:e,x:r.roomX,y:r.roomY,weight:Math.max(Number(a.config.measurement_weight??1),.01)})}return{...a,available:je(t,a.config)}});const a=i.filter(t=>t.x>=0&&t.x<=Number(this._config.room_w)&&t.y>=0&&t.y<=Number(this._config.room_d));a.length&&this._localObservationBuffer.push(...a),this._localObservationBuffer=this._localObservationBuffer.filter(t=>e-t.timestamp<=250);const r=this._localFusion.step(this._localObservationBuffer,e);"online"!==this._fusionBackendState&&(this._fusionTargets=r,"connecting"===this._fusionBackendState&&r.length&&(this._fusionBackendState="fallback")),this.requestUpdate()}async _connectFusionBackend(){if(this._fusionConnecting||this._fusionUnsubscribe||!this._config.radars?.length||!this._hass)return;this._fusionConnecting=!0;const t=this._config.fusion_id||"home";try{if(!1!==this._config.sync_backend)try{await this._hass.callWS({type:"mmwave_fusion/configure",config:{fusion_id:t,room_w:this._config.room_w,room_d:this._config.room_d,radars:this._config.radars,zones:this._config.zones??[],cameras:this._config.cameras??[],fusion:this._config.fusion??{},quality:this._config.quality??{}}})}catch(t){console.info("MMWave Fusion backend configuration was not updated",t)}this._fusionUnsubscribe=await this._hass.connection.subscribeMessage(e=>{if(e.fusion_id!==t)return;const i=e.api_version??0;if(i<1)return"outdated"!==this._fusionBackendState&&console.warn(`MMWave Fusion backend speaks api_version ${i}, this card needs 1; please update the mmwave-fusion integration`),this._fusionBackendState="outdated",void this.requestUpdate();this._fusionTargets=e.tracks,e.events.length&&(this._fusionEvents=[...e.events,...this._fusionEvents].slice(0,100));const a=new Map(e.radars.map(t=>[t.id,t]));this._fusionRadars=this._fusionRadars.map(t=>({...t,available:a.get(t.config.id)?.available??t.available,observations:a.get(t.config.id)?.observations,inRoomRatio:a.get(t.config.id)?.in_room_ratio,calibrationWarning:a.get(t.config.id)?.calibration_warning})),this._fusionBackendState="online",this.requestUpdate()},{type:"mmwave_fusion/subscribe",fusion_id:t}),await this._loadFusionEvents()}catch(t){const e=t?.code;"unknown_command"===e?(console.info("MMWave Fusion integration is not installed; multi-radar fusion needs it"),this._fusionBackendState="missing"):(console.warn("MMWave Fusion backend unavailable; using browser fallback",t),this._fusionBackendState="fallback")}finally{this._fusionConnecting=!1}}_disconnectFusionBackend(){this._fusionUnsubscribe?.(),this._fusionUnsubscribe=void 0,this._fusionConnecting=!1}async _loadFusionEvents(){if(this._hass&&this._config.radars?.length)try{const t=await this._hass.callWS({type:"mmwave_fusion/query_events",fusion_id:this._config.fusion_id||"home",limit:100});this._fusionEvents=t.map(t=>({event_id:String(t.event_id),fusion_id:String(t.fusion_id),track_id:String(t.track_id),event_type:t.event_type,zone_id:String(t.zone_id),timestamp:Number(t.ts),x:Number(t.x),y:Number(t.y),clip_path:t.clip_path?String(t.clip_path):void 0,camera_entity_id:t.camera_entity_id?String(t.camera_entity_id):void 0,clip_status:t.clip_status?String(t.clip_status):void 0,clip_provider:t.clip_provider?String(t.clip_provider):void 0,clip_file_size:t.clip_file_size?Number(t.clip_file_size):void 0,clip_error:t.clip_error?String(t.clip_error):void 0,metadata:t.metadata&&"object"==typeof t.metadata?t.metadata:void 0,quality_score:null==t.quality_score?void 0:Number(t.quality_score),quality_reason:t.quality_reason?String(t.quality_reason):void 0,recording_decision:t.recording_decision?String(t.recording_decision):void 0,recording_decisions:Array.isArray(t.recording_decisions)?t.recording_decisions:void 0}))}catch(t){console.info("MMWave Fusion history is not available",t)}}async _selectFusionEvent(t){this._selectedFusionEvent=t.detail,this._fusionVideoUrl="";try{await this._loadFusionEvents();const e=this._fusionEvents.find(e=>e.event_id===t.detail.event_id)??t.detail;if(this._selectedFusionEvent=e,this._fusionHistoryTrack=await this._hass.callWS({type:"mmwave_fusion/query_track",track_id:e.track_id,limit:1e4}),e.clip_path){const t=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${e.clip_path}`});this._fusionVideoUrl=t.url}}catch(t){console.warn("Failed to load fused trajectory event",t)}}_gotoTab(t){this._tab=t,this._livePanel?.clearTrail(),this.requestUpdate()}_onPolygonPointAdded(t){const e=this.shadowRoot?.querySelector("#poly-cv"),i={W:e?.offsetWidth??400,H:165,roomW:this._cal?.room_w??this._config.room_w,roomD:this._cal?.room_d??this._config.room_d},a=pe(t.detail.canvasX,t.detail.canvasY,i),r={...this._cal,polygon:[...this._cal.polygon,a]};this._cal=r,this.requestUpdate()}_onCalibrationChanged(t){let e=t.detail;const i=e.room_w??this._config.room_w,a=e.room_d??this._config.room_d;e.radar_x>i&&(e={...e,radar_x:i}),e.radar_y>a&&(e={...e,radar_y:a}),this._cal=e,this.requestUpdate()}_onCaptureRequested(){}_loadFromDevice(){if(!this._hass||!this._config)return;const t=this._config.x_entity||"";if(!t)return;const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let i="";if(e)i=e[1];else{const e=t.split(".")[1]?.split("_")||[];i=e.slice(0,e.length-1).join("_")}const a={...this._cal},r=["radar_x","radar_y","radar_z","yaw","pitch","roll"];for(const t of r){const e=this._hass.states[`number.${i}_${t}`];e&&e.state&&!isNaN(Number(e.state))&&(a[t]=Number(e.state))}const o=this._config.polygon_entity||`text.${i}_polygon_config`,s=this._hass.states[o];if(s&&s.state){const t=s.state.split(";").filter(t=>t.includes(",")).map(t=>{const[e,i]=t.split(",");return{x:parseFloat(e),y:parseFloat(i)}});t.length>0?a.polygon=t:a.polygon=[]}else s&&""===s.state&&(a.polygon=[]);const n=a.room_w??this._config.room_w,l=a.room_d??this._config.room_d;a.radar_x>n&&(a.radar_x=n),a.radar_y>l&&(a.radar_y=l),this._cal=a,this.requestUpdate()}async _sync(){const t=this._config.x_entity||"";if(!t)return void alert("Error: x_entity is not configured.");const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let i="";if(e)i=e[1];else{const e=t.split(".")[1]?.split("_")||[];i=e.slice(0,e.length-1).join("_")}this._syncState="syncing";try{const t={radar_x:this._cal.radar_x,radar_y:this._cal.radar_y,radar_z:this._cal.radar_z,yaw:this._cal.yaw,pitch:this._cal.pitch,roll:this._cal.roll};for(const[e,a]of Object.entries(t)){const t=`number.${i}_${e}`;try{await this._hass.callService("number","set_value",{entity_id:t,value:a})}catch(e){console.warn(`Failed to sync ${t}`,e)}}const e=this._cal.polygon.map(t=>`${t.x},${t.y}`).join(";"),a=this._config.polygon_entity||`text.${i}_polygon_config`;if(void 0!==this._hass.states[a])try{await this._hass.callService("text","set_value",{entity_id:a,value:e})}catch(t){console.warn(`Failed to sync ${a}`,t)}if(this._config.device_id&&this._config.radar_model)try{await this._hass.callWS({type:"mmwave_fusion/upsert_calibration_profile",profile:{profile_id:`device:${this._config.device_id}`,device_id:this._config.device_id,radar_model:this._config.radar_model,name:this._adapter.info.displayName,calibration:this._cal}})}catch(t){console.info("Shared calibration profile is not available",t)}this._syncState="success"}catch(t){this._syncState="error",console.error(t)}finally{null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._syncResetTimer=window.setTimeout(()=>this._syncState="idle",2200)}}_reset(){if(!confirm(this._L("actions.reset_confirm")||"Reset to factory defaults?"))return;const t=this._adapter.getDefaultCalibration(),e=this._config.room_w,i=this._config.room_d;t.radar_x=Math.round(.382*e),t.radar_y=Math.round(.382*i),this._cal=t,this._gotoTab(0)}render(){if(!this._config||!this._adapter)return O;if(this._config.radars?.length)return this._renderFusionMode();const t=this._cal.room_w??this._config.room_w,e=this._cal.room_d??this._config.room_d,i=this._hass?.language??"en",a=this._insideTargetCount(),r=[{icon:"mdi:cube-scan",title:this._t("card.installation"),description:this._t("card.place_the_radar_in_the_3d")},{icon:"mdi:compass-outline",title:this._t("card.direction"),description:this._t("card.calibrate_yaw_with_two_reference_points")},{icon:"mdi:radar",title:this._t("card.live_test"),description:this._t("card.verify_targets_boundary_and_trails")}];return this._isCalibrating?B`
      <ha-card>
        <header class="workflow-header">
          <button
            class="icon-button"
            type="button"
            title=${this._t("card.back_to_radar_view")}
            aria-label=${this._t("card.back_to_radar_view_2")}
            @click=${()=>this._isCalibrating=!1}
          >
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </button>
          <div class="workflow-title">
            <strong>${this._t("card.radar_spatial_calibration")}</strong>
            <span>${this._adapter.info.displayName}</span>
          </div>
          <span class="step-count">${this._tab+1} / ${r.length}</span>
        </header>

        <nav class="workflow-steps" aria-label=${this._t("card.calibration_steps")}>
          ${r.map((t,e)=>B`
              <button
                type="button"
                class="workflow-step ${this._tab===e?"current":""} ${this._tab>e?"complete":""}"
                aria-current=${this._tab===e?"step":O}
                @click=${()=>this._gotoTab(e)}
              >
                <span class="step-icon">
                  ${this._tab>e?B`<ha-icon icon="mdi:check"></ha-icon>`:B`<ha-icon icon=${t.icon}></ha-icon>`}
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
          ${0===this._tab?B` <mmwave-geo-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${i}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-geo-panel>`:O}
          ${1===this._tab?B` <mmwave-yaw-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${i}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-yaw-panel>`:O}
          ${2===this._tab?B` <mmwave-live-panel
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
              </mmwave-live-panel>`:O}
        </div>

        <footer class="workflow-footer">
          <div class="footer-tools">
            <button class="text-button" type="button" @click=${this._loadFromDevice}>
              <ha-icon icon="mdi:backup-restore"></ha-icon><span>${this._t("card.revert")}</span>
            </button>
            <button class="text-button danger" type="button" @click=${this._reset}>
              <ha-icon icon="mdi:restore-alert"></ha-icon><span>${this._t("card.reset")}</span>
            </button>
          </div>
          <div class="footer-actions">
            ${this._tab>0?B`<button class="secondary-button" type="button" @click=${()=>this._gotoTab(this._tab-1)}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("card.back")}
                </button>`:O}
            ${this._tab<2?B`<button class="primary-button" type="button" @click=${()=>this._gotoTab(this._tab+1)}>
                  ${this._t("card.continue")}<ha-icon icon="mdi:chevron-right"></ha-icon>
                </button>`:B`<button
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
    `:B`
        <ha-card class="live-card">
          <header class="live-header">
            <div class="identity">
              <div class="logo-tile ${this._present?"online":""}">${we}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name||this._t("card.presence_radar")}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span class="presence-chip ${a>0?"active":this._present?"filtered":""}">
                <i></i>
                ${a>0?this._t("card.p0_target_p1",{p0:a,p1:1===a?"":"s"}):this._present?this._t("card.outside"):this._t("card.clear")}
              </span>
              <button
                class="icon-button"
                type="button"
                title=${this._t("card.open_calibration")}
                aria-label=${this._t("card.open_calibration_2")}
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
      `}_renderFusionMode(){const t=this._hass?.language??"en",e=this._fusionRadars.filter(t=>t.available).length;return B`
      <ha-card class="live-card fusion-card">
        <header class="live-header">
          <div class="identity">
            <div class="logo-tile ${this._fusionTargets.length?"online":""}">${we}</div>
            <div class="identity-copy">
              <div class="card-title">${this._config.name||this._t("card.multi_radar_fusion")}</div>
              <div class="card-subtitle">
                ${this._t("card.p0_p1_radars_p2",{p0:e,p1:this._fusionRadars.length,p2:this._config.fusion_id||"home"})}
              </div>
            </div>
          </div>
          <span class="presence-chip ${this._fusionTargets.length?"active":""}">
            <i></i>
            ${this._fusionTargets.length?this._t("card.p0_targets",{p0:this._fusionTargets.length}):this._t("card.clear_2")}
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
          ${this._selectedFusionEvent?B`
                <section class="fusion-playback">
                  <header>
                    <strong
                      >${this._selectedFusionEvent.event_type.toUpperCase()} ·
                      ${this._selectedFusionEvent.zone_id}</strong
                    >
                    <span>${new Date(1e3*this._selectedFusionEvent.timestamp).toLocaleString()}</span>
                  </header>
                  ${null!=this._selectedFusionEvent.quality_score?B`<p class="quality-detail">
                        ${this._t("card.trajectory_quality")}:
                        <strong>${this._selectedFusionEvent.quality_score}/100</strong>
                        ${this._selectedFusionEvent.quality_reason?B` · ${this._selectedFusionEvent.quality_reason}`:O}
                      </p>`:O}
                  ${this._fusionVideoUrl?B`<video controls preload="metadata" .src=${this._fusionVideoUrl}></video>`:B`<p>
                        ${this._t("card.no_playable_clip_is_available_yet")}
                        ${this._selectedFusionEvent.clip_status?B` (${this._selectedFusionEvent.clip_status})`:O}
                        ${this._selectedFusionEvent.clip_error?B`<br /><span class="clip-error">${this._selectedFusionEvent.clip_error}</span>`:O}
                      </p>`}
                </section>
              `:O}
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
    .fusion-playback .quality-detail strong {
      color: var(--primary-text-color);
    }
    .fusion-playback .clip-error {
      color: var(--error-color, #e53935);
      overflow-wrap: anywhere;
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
  `}};t([ht()],Ie.prototype,"_config",void 0),t([ht()],Ie.prototype,"_adapter",void 0),t([ht()],Ie.prototype,"_cal",void 0),t([ht()],Ie.prototype,"_tab",void 0),t([ht()],Ie.prototype,"_isCalibrating",void 0),t([ht()],Ie.prototype,"_targets",void 0),t([ht()],Ie.prototype,"_present",void 0),t([ht()],Ie.prototype,"_maxRangeM",void 0),t([ht()],Ie.prototype,"_syncState",void 0),t([ht()],Ie.prototype,"_fusionTargets",void 0),t([ht()],Ie.prototype,"_fusionRadars",void 0),t([ht()],Ie.prototype,"_fusionBackendState",void 0),t([ht()],Ie.prototype,"_fusionEvents",void 0),t([ht()],Ie.prototype,"_fusionHistoryTrack",void 0),t([ht()],Ie.prototype,"_selectedFusionEvent",void 0),t([ht()],Ie.prototype,"_fusionVideoUrl",void 0),t([gt("mmwave-yaw-panel")],Ie.prototype,"_yawPanel",void 0),t([gt("mmwave-live-panel")],Ie.prototype,"_livePanel",void 0),Ie=t([dt($e)],Ie);const Be=["#0b825c","#03a9f4","#e91e63","#ff9800","#8bc34a","#9c27b0"];let Ke=class extends nt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.zones=[],this.radars=[],this.lang="en",this.originalId="",this.error=""}_t(t,e){return xe(t,this.lang,e)}beginNew(){let t=this.zones.length+1;for(;this.zones.some(e=>e.id===`zone_${t}`);)t++;this.originalId="",this.draft={id:`zone_${t}`,name:this._t("zone.zone_p0",{p0:t}),dwell_s:0,polygon:[]},this.error=""}select(t){this.originalId=t.id,this.draft={...t,polygon:t.polygon.map(t=>({...t}))},this.error=""}patch(t){this.draft&&(this.draft={...this.draft,...t})}addPoint(t){if(!this.draft)return;const e=t.currentTarget.getBoundingClientRect(),i={x:Math.round(Math.min(Math.max((t.clientX-e.left)/e.width*this.roomW,0),this.roomW)),y:Math.round(Math.min(Math.max((t.clientY-e.top)/e.height*this.roomD,0),this.roomD))};this.patch({polygon:[...this.draft.polygon,i]})}undoPoint(){this.draft?.polygon.length&&this.patch({polygon:this.draft.polygon.slice(0,-1)})}save(){if(!this.draft)return;const t=this.draft.id.trim();if(!t)return void(this.error=this._t("zone.zone_id_cannot_be_empty"));if(this.zones.some(e=>e.id===t&&e.id!==this.originalId))return void(this.error=this._t("zone.zone_id_must_be_unique"));if(this.draft.polygon.length<3)return void(this.error=this._t("zone.at_least_three_vertices_are_required"));const e={...this.draft,id:t,name:this.draft.name?.trim()||t},i=this.originalId?this.zones.map(t=>t.id===this.originalId?e:t):[...this.zones,e];this.originalId=t,this.draft=e,this.error="",this.emit(i)}removeZone(){this.originalId&&this.emit(this.zones.filter(t=>t.id!==this.originalId)),this.draft=void 0,this.originalId="",this.error=""}emit(t){this.dispatchEvent(new CustomEvent("zones-changed",{detail:t,bubbles:!0,composed:!0}))}pointString(t){return t.map(t=>`${t.x},${t.y}`).join(" ")}render(){const t=this.draft?[...this.zones.filter(t=>t.id!==this.originalId),this.draft]:this.zones;return B`
      <div class="toolbar">
        <div class="zone-tabs">
          ${this.zones.map((t,e)=>B`<button
                type="button"
                class=${this.originalId===t.id?"active":""}
                style="--zone-color:${Be[e%Be.length]}"
                @click=${()=>this.select(t)}
              >
                ${t.name||t.id}
              </button>`)}
        </div>
        <button type="button" class="new" @click=${this.beginNew}>＋ ${this._t("zone.new_zone")}</button>
      </div>
      <svg
        class=${this.draft?"floor active":"floor"}
        viewBox=${`0 0 ${this.roomW} ${this.roomD}`}
        style=${`aspect-ratio:${this.roomW}/${this.roomD}`}
        @click=${this.addPoint}
        role="img"
        aria-label=${this._t("zone.floor_plan_event_zone_editor")}
      >
        <defs>
          <pattern id="zone-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" stroke-opacity=".08" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" class="background" />
        ${t.map((t,e)=>{const i=this.draft===t,a=Be[e%Be.length];return B`
            ${t.polygon.length>=3?B`<polygon
                  points=${this.pointString(t.polygon)}
                  fill=${a}
                  fill-opacity=${i?".20":".09"}
                  stroke=${a}
                  stroke-width=${i?"3":"2"}
                  vector-effect="non-scaling-stroke"
                />`:B`<polyline
                  points=${this.pointString(t.polygon)}
                  fill="none"
                  stroke=${a}
                  stroke-width="3"
                  vector-effect="non-scaling-stroke"
                />`}
            ${t.polygon.map((t,e)=>B`
                <circle
                  cx=${t.x}
                  cy=${t.y}
                  r="7"
                  fill=${a}
                  stroke="white"
                  stroke-width="2"
                  vector-effect="non-scaling-stroke"
                />
                ${i?B`<text x=${t.x} y=${t.y-12} class="point-label">${e+1}</text>`:O}
              `)}
          `})}
        ${this.radars.map(t=>{const e=t.calibration??{};return B`<g
            class="radar"
            transform=${`translate(${Number(e.radar_x??0)} ${Number(e.radar_y??0)}) rotate(${-Number(e.yaw??0)})`}
          >
            <circle r="11" /><path d="M 0 0 L -12 25 M 0 0 L 12 25" /><text y="-17">${t.id}</text>
          </g>`})}
        <text x="8" y="18" class="axis">0</text>
        <text x=${this.roomW-8} y="18" text-anchor="end" class="axis">X → ${this.roomW}cm</text>
        <text x="8" y=${this.roomD-9} class="axis">Y ↓ ${this.roomD}cm</text>
      </svg>
      ${this.draft?B`
            <div class="form-grid">
              <label
                >ID<input
                  .value=${this.draft.id}
                  @input=${t=>this.patch({id:t.target.value})}
              /></label>
              <label
                >${this._t("zone.name")}<input
                  .value=${this.draft.name??""}
                  @input=${t=>this.patch({name:t.target.value})}
              /></label>
              <label
                >${this._t("zone.dwell_seconds")}<input
                  type="number"
                  min="0"
                  step="1"
                  .value=${String(this.draft.dwell_s??0)}
                  @input=${t=>this.patch({dwell_s:Number(t.target.value)})}
              /></label>
              <div class="vertex-count">${this.draft.polygon.length} ${this._t("zone.vertices")}</div>
            </div>
            <div class="actions">
              <button type="button" @click=${this.undoPoint} ?disabled=${!this.draft.polygon.length}>
                ↶ ${this._t("zone.undo_point")}
              </button>
              <button type="button" @click=${()=>this.patch({polygon:[]})} ?disabled=${!this.draft.polygon.length}>
                ${this._t("zone.clear")}
              </button>
              <button type="button" class="danger" @click=${this.removeZone}>
                ${this.originalId?this._t("zone.delete_zone"):this._t("zone.cancel")}
              </button>
              <button type="button" class="save" @click=${this.save}>${this._t("zone.save_zone")}</button>
            </div>
            ${this.error?B`<div class="error">${this.error}</div>`:O}
          `:B`<p class="hint">${this._t("zone.select_or_create_a_zone_then")}</p>`}
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
  `}};t([_t({type:Number})],Ke.prototype,"roomW",void 0),t([_t({type:Number})],Ke.prototype,"roomD",void 0),t([_t({attribute:!1})],Ke.prototype,"zones",void 0),t([_t({attribute:!1})],Ke.prototype,"radars",void 0),t([_t({attribute:!1})],Ke.prototype,"lang",void 0),t([ht()],Ke.prototype,"draft",void 0),t([ht()],Ke.prototype,"originalId",void 0),t([ht()],Ke.prototype,"error",void 0),Ke=t([dt("mmwave-zone-editor")],Ke);const Oe=t=>t.length?Math.sqrt(t.reduce((t,e)=>t+e*e,0)/t.length):1/0;const Ye=["#03a9f4","#9c27b0","#ff9800","#e91e63","#4caf50","#795548"],Xe=t=>{const e=[...t].sort((t,e)=>t-e),i=Math.floor(e.length/2);return e.length%2?e[i]:(e[i-1]+e[i])/2},Ue=t=>({...ut,...t.calibration??{},polygon:t.calibration?.polygon??[]});let Ze=class extends nt{constructor(){super(...arguments),this.radars=[],this.roomW=400,this.roomD=600,this.lang="en",this.references=[],this.capturing=!1,this.captureProgress=0,this.captureMessage="",this.sampleBuffers=new Map,this.signatures=new Map,this.drawFrame=0}_t(t,e){return xe(t,this.lang,e)}firstUpdated(){this.scheduleDraw()}updated(t){(t.has("radars")||t.has("roomW")||t.has("roomD")||t.has("references"))&&this.scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this.clearCaptureTimers(),cancelAnimationFrame(this.drawFrame)}metrics(){const t=this.canvas?.offsetWidth||520;return{W:t,H:Math.max(240,Math.min(420,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD}}scheduleDraw(){cancelAnimationFrame(this.drawFrame),this.drawFrame=requestAnimationFrame(()=>this.draw())}draw(){const t=this.canvas;if(!t||!t.offsetWidth)return;const e=this.metrics(),i=he(t,e.H);ge(i,e);const a=new Map(this.solutions.map(t=>[t.radarId,t]));if(this.radars.forEach((t,r)=>{const o=ae(t.radar_model);if(!o)return;const s=Ue(t),n=ce(s.radar_x,s.radar_y,e);i.save(),i.globalAlpha=.11,me(i,n.cx,n.cy,s.yaw,s.pitch,o.info.fovDegrees,o.info.minRangeM,o.info.maxRangeM,e,o.info.vitalRangeM),i.restore(),i.fillStyle=Ye[r%Ye.length],i.beginPath(),i.arc(n.cx,n.cy,4,0,2*Math.PI),i.fill(),i.font="bold 9px system-ui",i.textAlign="center",i.fillText(t.id,n.cx,n.cy-10);const l=a.get(t.id);if(l)for(const a of this.references){const o=a.readings[t.id];if(!o)continue;const s=se(o.rawX,o.rawY,o.rawZ,l.calibration),n=ce(s.roomX,s.roomY,e);i.save(),i.globalAlpha=.75,i.fillStyle=Ye[r%Ye.length],i.beginPath(),i.arc(n.cx,n.cy,3,0,2*Math.PI),i.fill(),i.restore()}}),this.references.forEach((t,a)=>{const r=ce(t.room.x,t.room.y,e);be(i,r.cx,r.cy,String.fromCharCode(65+a),"#0b825c")}),this.pendingPoint){const t=ce(this.pendingPoint.x,this.pendingPoint.y,e);be(i,t.cx,t.cy,"+","#ff9800")}}onCanvasClick(t){if(this.capturing||this.references.length>=8||!this.canvas)return;const e=_e(t,this.canvas),i=pe(e.x,e.y,this.metrics());this.pendingPoint={x:Math.round(Math.max(0,Math.min(this.roomW,i.x))),y:Math.round(Math.max(0,Math.min(this.roomD,i.y)))},this.captureMessage="",this.scheduleDraw()}beginCapture(){if(!this.pendingPoint||this.capturing)return;this.capturing=!0,this.captureProgress=0,this.captureMessage=this._t("fusioncal.capturing_all_radars_synchronously"),this.sampleBuffers=new Map(this.radars.map(t=>[t.id,[]])),this.signatures.clear();const t=Date.now();this.collectSamples(),this.captureInterval=window.setInterval(()=>{this.collectSamples(),this.captureProgress=Math.min(1,(Date.now()-t)/2e3)},100),this.captureTimer=window.setTimeout(()=>this.finishCapture(),2e3)}collectSamples(){if(this.pendingPoint&&this.hass)for(const t of this.radars){const e=this.readRadarTargets(t);if(!e||e.signature===this.signatures.get(t.id)||!e.targets.length)continue;this.signatures.set(t.id,e.signature);const i=Ue(t),a=e.targets.map(t=>{const e=se(t.rawX,t.rawY,t.rawZ,i);return{target:t,distance:Math.hypot(e.roomX-this.pendingPoint.x,e.roomY-this.pendingPoint.y)}}).sort((t,e)=>t.distance-e.distance)[0];a&&this.sampleBuffers.get(t.id)?.push({x:a.target.rawX,y:a.target.rawY,z:a.target.rawZ})}}readRadarTargets(t){const e=t.frame_entity?this.hass.states[t.frame_entity]:void 0,i=e?de(e.state):void 0;if(i){const e=Number(t.frame_coordinate_scale??1);return{signature:`${i.frameId}:${i.sourceTimestamp}`,targets:i.targets.map((t,i)=>({index:i,rawX:t.x*e,rawY:t.y*e,rawZ:t.z*e,speed:null==t.speed?void 0:t.speed*e}))}}const a=ae(t.radar_model);if(!a)return;const r={...t,type:"custom:mmwave-card",room_w:this.roomW,room_d:this.roomD};return{signature:Object.entries(t).filter(([t,e])=>t.endsWith("_entity")&&"string"==typeof e).map(([,t])=>this.hass.states[String(t)]?.last_updated??"missing").join("|"),targets:a.readFromHass(this.hass,r).targets}}finishCapture(){const t=this.pendingPoint;if(this.clearCaptureTimers(),this.capturing=!1,this.captureProgress=1,!t)return;const e={};for(const t of this.radars){const i=this.sampleBuffers.get(t.id)??[];if(i.length<3)continue;const a=Xe(i.map(t=>t.x)),r=Xe(i.map(t=>t.y)),o=Xe(i.map(t=>t.z)),s=Xe(i.map(t=>Math.hypot(t.x-a,t.y-r)));e[t.id]={rawX:Math.round(10*a)/10,rawY:Math.round(10*r)/10,rawZ:Math.round(10*o)/10,samples:i.length,spreadCm:Math.round(10*s)/10}}const i=Object.keys(e).length;i?(this.references=[...this.references,{id:`ref_${this.references.length+1}`,room:t,readings:e}],this.pendingPoint=void 0,this.captureMessage=this._t("fusioncal.captured_p0_p1_radars",{p0:i,p1:this.radars.length}),this.scheduleDraw()):this.captureMessage=this._t("fusioncal.no_radar_produced_enough_stable_samples")}clearCaptureTimers(){null!=this.captureInterval&&window.clearInterval(this.captureInterval),null!=this.captureTimer&&window.clearTimeout(this.captureTimer),this.captureInterval=void 0,this.captureTimer=void 0}get solutions(){return this.radars.map(t=>function(t,e,i){const a=i.map(e=>({room:e.room,reading:e.readings[t]})).filter(t=>Boolean(t.reading));if(a.length<2)return;const r=a.reduce((t,e)=>t+e.reading.rawX,0)/a.length,o=a.reduce((t,e)=>t+e.reading.rawY,0)/a.length,s=a.reduce((t,e)=>t+e.room.x,0)/a.length,n=a.reduce((t,e)=>t+e.room.y,0)/a.length;let l=0,d=0;for(const t of a){const e=t.reading.rawX-r,i=t.reading.rawY-o,a=t.room.x-s,c=t.room.y-n;l+=e*a+i*c,d+=e*c-i*a}if(Math.hypot(l,d)<1)return;const c=Math.atan2(d,l),p=(t=>{let e=t;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e})(180*-c/Math.PI),_=Math.cos(c),h=Math.sin(c),g=s-(_*r-h*o),u=n-(h*r+_*o),m={...e,radar_x:Math.round(10*g)/10,radar_y:Math.round(10*u)/10,yaw:Math.round(10*p)/10},f=a.map(t=>{const i=se(t.reading.rawX,t.reading.rawY,t.reading.rawZ,e);return Math.hypot(i.roomX-t.room.x,i.roomY-t.room.y)}),y=a.map(t=>{const e=se(t.reading.rawX,t.reading.rawY,t.reading.rawZ,m);return Math.hypot(e.roomX-t.room.x,e.roomY-t.room.y)});return{radarId:t,calibration:m,pointCount:a.length,sampleCount:a.reduce((t,e)=>t+e.reading.samples,0),residualBeforeCm:Math.round(10*Oe(f))/10,residualAfterCm:Math.round(10*Oe(y))/10,maxResidualCm:Math.round(10*Math.max(...y))/10}}(t.id,Ue(t),this.references)).filter(t=>Boolean(t))}removeReference(t){this.references=this.references.filter((e,i)=>i!==t),this.captureMessage="",this.scheduleDraw()}reset(){this.capturing||(this.references=[],this.pendingPoint=void 0,this.captureMessage="",this.scheduleDraw())}applySolutions(){const t=this.solutions;this.solutionsReady(t)&&this.dispatchEvent(new CustomEvent("fusion-calibration-applied",{detail:{solutions:t},bubbles:!0,composed:!0}))}get referenceSpanCm(){let t=0;for(let e=0;e<this.references.length;e+=1)for(let i=e+1;i<this.references.length;i+=1)t=Math.max(t,Math.hypot(this.references[e].room.x-this.references[i].room.x,this.references[e].room.y-this.references[i].room.y));return t}solutionsReady(t){return this.references.length>=3&&this.referenceSpanCm>=120&&t.length===this.radars.length&&t.every(t=>t.pointCount>=3&&t.residualAfterCm<=40&&t.calibration.radar_x>=-50&&t.calibration.radar_x<=this.roomW+50&&t.calibration.radar_y>=-50&&t.calibration.radar_y<=this.roomD+50)}render(){const t=this.solutions,e=this.solutionsReady(t);return B`
      <section class="calibration-shell">
        <div class="intro">
          <span class="eyebrow">${this._t("fusioncal.joint_direction_calibration")}</span>
          <strong>${this._t("fusioncal.calibrate_every_radar_from_shared_positions")}</strong>
          <p>${this._t("fusioncal.keep_only_one_test_person_in")}</p>
        </div>
        <canvas id="fusion-calibration-canvas" @click=${this.onCanvasClick}></canvas>
        <div class="capture-bar">
          <span>
            ${this.pendingPoint?this._t("fusioncal.pending_x_p0_y_p1_cm",{p0:this.pendingPoint.x,p1:this.pendingPoint.y}):this._t("fusioncal.click_the_floor_plan_to_choose")}
          </span>
          <button type="button" ?disabled=${!this.pendingPoint||this.capturing} @click=${this.beginCapture}>
            ${this.capturing?this._t("fusioncal.capturing"):this._t("fusioncal.i_am_ready_capture_all")}
          </button>
        </div>
        ${this.capturing?B`<div class="progress"><i style=${`width:${Math.round(100*this.captureProgress)}%`}></i></div>`:O}
        ${this.captureMessage?B`<div class="message">${this.captureMessage}</div>`:O}
        <div class="reference-list">
          ${this.references.map((t,e)=>B`
              <div class="reference">
                <b>${String.fromCharCode(65+e)}</b>
                <span>X ${t.room.x} · Y ${t.room.y} cm</span>
                <small
                  >${Object.keys(t.readings).length}/${this.radars.length} ${this._t("fusioncal.radars")}</small
                >
                <button type="button" @click=${()=>this.removeReference(e)}>×</button>
              </div>
            `)}
        </div>
        ${t.length?B`
              <div class="results">
                ${this.radars.map(e=>{const i=t.find(t=>t.radarId===e.id);return B`
                    <div class="result ${!i||i.residualAfterCm>40?"bad":""}">
                      <strong>${e.id}</strong>
                      ${i?B`
                            <span>${i.residualBeforeCm} → ${i.residualAfterCm} cm</span>
                            <small>
                              ${i.pointCount} ${this._t("fusioncal.points")} · yaw ${i.calibration.yaw}° ·
                              X ${i.calibration.radar_x} · Y ${i.calibration.radar_y}
                            </small>
                          `:B`<span>${this._t("fusioncal.not_enough_references")}</span>`}
                    </div>
                  `})}
              </div>
            `:O}
        <div class="actions">
          <button
            type="button"
            class="secondary"
            ?disabled=${this.capturing||!this.references.length}
            @click=${this.reset}
          >
            ${this._t("fusioncal.start_over")}
          </button>
          <button type="button" class="primary" ?disabled=${!e} @click=${this.applySolutions}>
            ${e?this._t("fusioncal.apply_all_calibrations"):this._t("fusioncal.need_3_points_120_cm_span")}
          </button>
        </div>
      </section>
    `}static{this.styles=s`
    :host {
      display: block;
      min-width: 0;
    }
    .calibration-shell {
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 13px;
      background: var(--card-background-color, #fff);
    }
    .intro {
      display: grid;
      gap: 3px;
      padding: 12px 13px 9px;
    }
    .eyebrow {
      color: var(--primary-color, #0b825c);
      font-size: 9px;
      font-weight: 750;
      text-transform: uppercase;
    }
    .intro strong {
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .intro p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.5;
    }
    canvas {
      display: block;
      width: 100%;
      cursor: crosshair;
    }
    .capture-bar,
    .actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 9px 11px;
      border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    button {
      min-width: 0;
      padding: 7px 10px;
      border: 0;
      border-radius: 8px;
      color: #fff;
      background: var(--primary-color, #0b825c);
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    .progress {
      height: 3px;
      background: rgba(128, 128, 128, 0.12);
    }
    .progress i {
      display: block;
      height: 100%;
      background: var(--primary-color, #0b825c);
      transition: width 0.1s linear;
    }
    .message {
      padding: 7px 11px;
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .reference-list,
    .results {
      display: grid;
      gap: 5px;
      padding: 8px 11px;
    }
    .reference {
      display: grid;
      grid-template-columns: 22px minmax(0, 1fr) auto 24px;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .reference b {
      width: 20px;
      height: 20px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: var(--primary-color, #0b825c);
    }
    .reference button {
      padding: 2px;
      color: var(--error-color, #e53935);
      background: transparent;
      font-size: 15px;
    }
    .result {
      display: grid;
      grid-template-columns: 70px minmax(0, 1fr);
      gap: 2px 8px;
      padding: 7px 9px;
      border-radius: 8px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .result.bad {
      background: color-mix(in srgb, var(--error-color, #e53935) 7%, transparent);
    }
    .result small {
      grid-column: 2;
      color: var(--secondary-text-color);
    }
    .actions {
      justify-content: flex-end;
    }
    .actions .secondary {
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.08);
    }
    @media (max-width: 500px) {
      .capture-bar,
      .actions {
        align-items: stretch;
        flex-direction: column;
      }
      .capture-bar button,
      .actions button {
        width: 100%;
      }
    }
  `}};function Ve(t,e,i){const a=`${t} ${e}`.toLowerCase();return function(t){const e=[];for(const i of Object.values(ve)){const a=i?.entity_aliases?.[t];Array.isArray(a)&&e.push(...a.map(t=>String(t).toLowerCase()))}return e}(i).some(t=>a.includes(t))}t([_t({attribute:!1})],Ze.prototype,"hass",void 0),t([_t({attribute:!1})],Ze.prototype,"radars",void 0),t([_t({type:Number})],Ze.prototype,"roomW",void 0),t([_t({type:Number})],Ze.prototype,"roomD",void 0),t([_t({attribute:!1})],Ze.prototype,"lang",void 0),t([ht()],Ze.prototype,"references",void 0),t([ht()],Ze.prototype,"pendingPoint",void 0),t([ht()],Ze.prototype,"capturing",void 0),t([ht()],Ze.prototype,"captureProgress",void 0),t([ht()],Ze.prototype,"captureMessage",void 0),t([gt("#fusion-calibration-canvas")],Ze.prototype,"canvas",void 0),Ze=t([dt("mmwave-fusion-calibration")],Ze);let Ge=class extends nt{constructor(){super(...arguments),this._devices=[],this._advOpen=!1,this._deviceStatus="idle",this._matchedEntities=0,this._fusionJsonError="",this._calibrationProfiles=[],this._selectedFusionRadar=0,this._profileStatus="",this._profilesLoaded=!1}updated(t){super.updated(t),t.has("hass")&&this.hass&&0===this._devices.length&&this._loadDevices(),t.has("hass")&&this.hass&&!this._profilesLoaded&&(this._profilesLoaded=!0,this._loadCalibrationProfiles())}async _loadDevices(){try{this._devices=await this.hass.callWS({type:"config/device_registry/list"})}catch(t){console.warn("Failed to load devices",t)}}async _loadCalibrationProfiles(){try{this._calibrationProfiles=await this.hass.callWS({type:"mmwave_fusion/list_calibration_profiles"})}catch(t){console.info("Calibration profiles are not available",t),this._calibrationProfiles=[]}}setConfig(t){this._config={...mt,...t}}_L(t){return xe(t,this.hass?.language)}_t(t,e){return xe(t,this.hass?.language,e)}_changed(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_setMode(t){if("fusion"===t){const t={id:"radar_1",radar_model:"ld2450",device_id:"",calibration:{radar_x:100,radar_y:100,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}};this._config={...this._config,fusion_id:this._config.fusion_id||"home",sync_backend:!0,radars:this._config.radars?.length?this._config.radars:[t]}}else this._config={...this._config,radars:void 0};this._emitConfig()}_emitConfig(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_updateFusionRadar(t,e){const i=[...this._config.radars??[]];i[t]={...i[t],...e},this._config={...this._config,radars:i},this._emitConfig()}_updateRadarCalibration(t,e,i){const a=this._config.radars?.[t];a&&this._updateFusionRadar(t,{calibration:{...a.calibration,[e]:i},calibration_profile_id:void 0,calibration_profile_revision:void 0})}_fusionInstallationChanged(t,e){this._updateFusionRadar(t,{calibration:e.detail,calibration_profile_id:void 0,calibration_profile_revision:void 0})}_addFusionRadar(){const t=[...this._config.radars??[]],e=t.length+1;t.push({id:`radar_${e}`,radar_model:"ld2450",device_id:"",calibration:{radar_x:Math.round(Number(this._config.room_w)*e/(e+1)),radar_y:Math.round(.2*Number(this._config.room_d)),radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}}),this._config={...this._config,radars:t},this._emitConfig()}_removeFusionRadar(t){const e=(this._config.radars??[]).filter((e,i)=>i!==t);this._config={...this._config,radars:e},this._selectedFusionRadar=Math.max(0,Math.min(this._selectedFusionRadar,e.length-1)),this._emitConfig()}_profileChanged(t,e){const i=e.target.value;if(!i)return void this._updateFusionRadar(t,{calibration_profile_id:void 0,calibration_profile_revision:void 0});const a=this._calibrationProfiles.find(t=>t.profile_id===i);a&&(this._updateFusionRadar(t,{device_id:a.device_id,radar_model:a.radar_model,calibration:structuredClone(a.calibration),calibration_profile_id:a.profile_id,calibration_profile_revision:a.revision}),this._profileStatus=this._t("editor.imported_p0_revision_p1",{p0:a.name,p1:a.revision}))}async _fusionDeviceChanged(t,e){const i=e.target.value;if(this._updateFusionRadar(t,{device_id:i}),i)try{const e=await this.hass.callWS({type:"config/entity_registry/list"}),a={};for(const t of e.filter(t=>t.device_id===i)){const e=t.entity_id,i=(t.original_name||e).toLowerCase(),r=e.match(/target_(\d+)_x/),o=e.match(/target_(\d+)_y/),s=e.match(/target_(\d+)_speed/);e.startsWith("binary_sensor.")&&(e.includes("presence")||i.includes("presence"))?a.presence_entity=e:e.startsWith("sensor.")&&(e.includes("target_frame")||i.includes("target frame"))?a.frame_entity=e:r?a[`target_${r[1]}_x_entity`]=e:o?a[`target_${o[1]}_y_entity`]=e:s?a[`target_${s[1]}_speed_entity`]=e:e.startsWith("sensor.")&&(e.endsWith("_x")||i.endsWith(" x"))?a.x_entity=e:e.startsWith("sensor.")&&(e.endsWith("_y")||i.endsWith(" y"))?a.y_entity=e:e.startsWith("sensor.")&&(e.endsWith("_z")||i.endsWith(" z"))&&(a.z_entity=e)}const r=this._calibrationProfiles.find(t=>t.device_id===i);r&&(a.calibration=structuredClone(r.calibration),a.calibration_profile_id=r.profile_id,a.calibration_profile_revision=r.revision,this._profileStatus=this._t("editor.imported_device_calibration_profile_p0",{p0:r.name})),this._updateFusionRadar(t,a)}catch(t){console.warn("Failed to match fusion radar entities",t)}}_updateFusionJson(t,e){try{const i=JSON.parse(e.target.value);if(!Array.isArray(i))throw new Error("Value must be a JSON array");this._fusionJsonError="",this._changed(t,i)}catch(t){this._fusionJsonError=t instanceof Error?t.message:String(t)}}_updateFusionSetting(t,e){this._changed("fusion",{...this._config.fusion??{},[t]:e})}_updateQualitySetting(t,e){this._changed("quality",{...this._config.quality??{},[t]:e})}_fusionZonesChanged(t){this._changed("zones",t.detail??[])}async _fusionCalibrationApplied(t){const e=new Map(t.detail.solutions.map(t=>[t.radarId,t])),i=(this._config.radars??[]).map(t=>{const i=e.get(t.id);return i?{...t,calibration:i.calibration}:t});this._config={...this._config,radars:i},this._emitConfig(),this._profileStatus=this._t("editor.saving_device_calibration_profiles");const a=await Promise.all(i.map(async t=>{const i=e.get(t.id);if(!i||!t.device_id)return t;try{const e=await this.hass.callWS({type:"mmwave_fusion/upsert_calibration_profile",profile:{profile_id:`device:${t.device_id}`,device_id:t.device_id,radar_model:t.radar_model,name:this._devices.find(e=>e.id===t.device_id)?.name_by_user||t.id,calibration:i.calibration,residual_cm:i.residualAfterCm}});return{...t,calibration_profile_id:e.profile_id,calibration_profile_revision:e.revision}}catch(e){return console.warn(`Failed to save calibration profile for ${t.id}`,e),t}}));this._config={...this._config,radars:a},this._emitConfig(),await this._loadCalibrationProfiles(),this._profileStatus=this._t("editor.all_calibrations_were_applied_and_saved")}async _deviceDropdownChanged(t){const e=t.target.value;if(this._changed("device_id",e),!e)return this._deviceStatus="idle",void(this._matchedEntities=0);this._deviceStatus="loading";try{const t=(await this.hass.callWS({type:"config/entity_registry/list"})).filter(t=>t.device_id===e),i={};for(const e of t){const t=e.entity_id,a=(e.original_name||t).toLowerCase(),r=t.match(/target_(\d+)_x/),o=t.match(/target_(\d+)_y/),s=t.match(/target_(\d+)_speed/);t.startsWith("binary_sensor.")&&(a.includes("presence")||t.includes("presence"))?i.presence_entity=t:t.startsWith("sensor.")&&Ve(t,a,"distance")?i.distance_entity=t:t.startsWith("sensor.")&&Ve(t,a,"motion_state")?(i.motion_state_entity=t,i.target_state_entity=t):r?i[`target_${r[1]}_x_entity`]=t:o?i[`target_${o[1]}_y_entity`]=t:s?i[`target_${s[1]}_speed_entity`]=t:t.startsWith("sensor.")&&(a.endsWith(" x")||t.endsWith("_x")||t.endsWith("radar_x"))&&!t.includes("room_x")&&!a.includes("room x")?i.x_entity=t:t.startsWith("sensor.")&&(a.endsWith(" y")||t.endsWith("_y")||t.endsWith("radar_y"))&&!t.includes("room_y")&&!a.includes("room y")?i.y_entity=t:t.startsWith("sensor.")&&(a.endsWith(" z")||t.endsWith("_z")||t.endsWith("radar_z"))&&!t.includes("room_z")&&!a.includes("room z")?i.z_entity=t:t.startsWith("sensor.")&&(t.includes("breath")||t.includes("respiration"))?i.breath_entity=t:t.startsWith("sensor.")&&t.includes("heart")?i.heart_entity=t:t.startsWith("sensor.")&&t.includes("sleep")?i.sleep_entity=t:t.startsWith("text.")&&Ve(t,a,"polygon")&&(i.polygon_entity=t)}Object.keys(i).length>0&&(this._config={...this._config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))),this._matchedEntities=Object.keys(i).length,this._deviceStatus=this._matchedEntities>0?"success":"error"}catch(t){this._deviceStatus="error",console.warn("Failed to auto-populate entities from device",t)}}_modeSelector(t){return B`
      <div class="mode-switch" role="group" aria-label=${this._t("editor.operating_mode")}>
        <button type="button" class=${"single"===t?"active":""} @click=${()=>this._setMode("single")}>
          ${this._t("editor.single_radar")}
        </button>
        <button type="button" class=${"fusion"===t?"active":""} @click=${()=>this._setMode("fusion")}>
          ${this._t("editor.multi_radar_fusion")}
        </button>
      </div>
    `}_renderFusionEditor(){const t=re().filter(t=>!ae(t.id)?.info.is1DRanging),e=this._config.radars??[],i=Math.max(0,Math.min(this._selectedFusionRadar,e.length-1)),a=e[i],r=a?ae(a.radar_model):void 0,o=a?{...ut,...r?.getDefaultCalibration()??{},...a.calibration??{},polygon:a.calibration?.polygon??[]}:void 0,s=e.map((t,e)=>({index:e,id:t.id,calibration:{...ut,...ae(t.radar_model)?.getDefaultCalibration()??{},...t.calibration??{},polygon:t.calibration?.polygon??[]}})).filter(t=>t.index!==i);return B`
      <div class="card-config">
        <div class="editor-hero">
          <span class="hero-icon">◎</span>
          <div>
            <strong>${this._t("editor.multi_radar_fusion_2")}</strong>
            <p>${this._t("editor.place_multiple_2_d_radars_in")}</p>
          </div>
        </div>
        ${this._modeSelector("fusion")}

        <h3><span>1</span>${this._t("editor.floor_plan_and_backend")}</h3>
        <div class="field">
          <label>${this._t("editor.card_title")}</label>
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
          <span>${this._t("editor.sync_configuration_to_the_backend_when")}</span>
        </label>

        <h3><span>2</span>${this._t("editor.radar_devices")}</h3>
        <p class="section-help">${this._t("editor.only_radar_models_with_2_d")}</p>
        <div class="radar-list">
          ${(this._config.radars??[]).map((e,i)=>{const a=ae(e.radar_model),r=e.calibration??{};return B`
              <section class="radar-editor">
                <header>
                  <strong>${this._t("editor.radar")} ${i+1}</strong>
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
                      ${t.map(t=>B`<option value=${t.id} ?selected=${t.id===e.radar_model}>
                            ${t.label}
                          </option>`)}
                    </select>
                  </div>
                </div>
                <div class="field">
                  <label>${this._t("editor.radar_device")}</label>
                  <select
                    .value=${e.device_id??""}
                    @change=${t=>this._fusionDeviceChanged(i,t)}
                  >
                    <option value="">-- ${this._t("editor.select_device")} --</option>
                    ${this._devices.map(t=>B`<option value=${t.id} ?selected=${t.id===e.device_id}>
                          ${t.name_by_user||t.name||"Unknown device"}
                        </option>`)}
                  </select>
                </div>
                <div class="field profile-field">
                  <label>${this._t("editor.calibration_profile")}</label>
                  <select
                    .value=${e.calibration_profile_id??""}
                    @change=${t=>this._profileChanged(i,t)}
                  >
                    <option value="">${this._t("editor.manual_not_linked")}</option>
                    ${this._calibrationProfiles.map(t=>B`
                        <option
                          value=${t.profile_id}
                          ?selected=${t.profile_id===e.calibration_profile_id}
                        >
                          ${t.name} · ${t.radar_model} · v${t.revision}
                        </option>
                      `)}
                  </select>
                  ${e.calibration_profile_id?B`<small class="profile-badge">
                        ${this._t("editor.device_profile_snapshot")} · v${e.calibration_profile_revision??"?"}
                      </small>`:O}
                </div>
                <div class="cal-grid">
                  ${["radar_x","radar_y","radar_z","yaw","pitch","roll"].map(t=>B`
                      <div class="field compact">
                        <label>${t}</label>
                        <input
                          type="number"
                          step=${"yaw"===t||"pitch"===t||"roll"===t?"1":"10"}
                          .value=${String(r[t]??("radar_z"===t?220:0))}
                          @change=${e=>this._updateRadarCalibration(i,t,Number(e.target.value))}
                        />
                      </div>
                    `)}
                </div>
                ${a?B`
                      <details class="advanced">
                        <summary>${this._t("editor.entity_mapping")}</summary>
                        <div class="advanced-fields">
                          ${a.getEntitySchema().map(t=>B`
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
                    `:O}
              </section>
            `})}
        </div>
        <button class="add-button" type="button" @click=${this._addFusionRadar}>
          ＋ ${this._t("editor.add_radar")}
        </button>
        ${this._profileStatus?B`<div class="profile-status">${this._profileStatus}</div>`:O}

        <h3><span>3</span>${this._t("editor.interactive_installation")}</h3>
        <p class="section-help">${this._t("editor.select_a_radar_in_the_shared")}</p>
        <div class="radar-selector">
          ${e.map((t,e)=>B`
              <button
                type="button"
                class=${e===i?"active":""}
                @click=${()=>this._selectedFusionRadar=e}
              >
                ${t.id}<small>${t.radar_model}</small>
              </button>
            `)}
        </div>
        ${a&&r&&o?B`
              <mmwave-installation-3d
                .adapter=${r}
                .calibration=${o}
                .peerCalibrations=${s}
                .lang=${this.hass.language}
                .roomW=${Number(this._config.room_w??400)}
                .roomD=${Number(this._config.room_d??600)}
                .maxRangeM=${r.info.maxRangeM}
                @calibration-changed=${t=>this._fusionInstallationChanged(i,t)}
              ></mmwave-installation-3d>
            `:O}

        <h3><span>4</span>${this._t("editor.joint_multi_radar_calibration")}</h3>
        <p class="section-help">${this._t("editor.each_shared_reference_position_captures_every")}</p>
        <mmwave-fusion-calibration
          .hass=${this.hass}
          .radars=${e}
          .roomW=${Number(this._config.room_w??400)}
          .roomD=${Number(this._config.room_d??600)}
          .lang=${this.hass.language}
          @fusion-calibration-applied=${this._fusionCalibrationApplied}
        ></mmwave-fusion-calibration>

        <h3><span>5</span>${this._t("editor.fusion_and_recording_rules")}</h3>
        <p class="section-help">${this._t("editor.filter_single_radar_false_alarms_and")}</p>
        <div class="rules-grid">
          <div class="field compact">
            <label>${this._t("editor.minimum_supporting_radars")}</label>
            <input
              type="number"
              min="1"
              max=${String(Math.max(1,this._config.radars?.length??1))}
              step="1"
              .value=${String(this._config.fusion?.min_confirm_sources??Math.min(2,this._config.radars?.length??1))}
              @change=${t=>this._updateFusionSetting("min_confirm_sources",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.merge_distance_cm")}</label>
            <input
              type="number"
              min="20"
              step="5"
              .value=${String(this._config.fusion?.merge_gate_cm??70)}
              @change=${t=>this._updateFusionSetting("merge_gate_cm",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.track_end_delay_s")}</label>
            <input
              type="number"
              min="0.5"
              step="0.1"
              .value=${String(this._config.fusion?.track_ttl_s??1.8)}
              @change=${t=>this._updateFusionSetting("track_ttl_s",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.recording_score")}</label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              .value=${String(this._config.quality?.min_score??70)}
              @change=${t=>this._updateQualitySetting("min_score",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_duration_s")}</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              .value=${String(this._config.quality?.min_duration_s??3)}
              @change=${t=>this._updateQualitySetting("min_duration_s",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_displacement_cm")}</label>
            <input
              type="number"
              min="20"
              step="10"
              .value=${String(this._config.quality?.min_displacement_cm??120)}
              @change=${t=>this._updateQualitySetting("min_displacement_cm",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.boundary_margin_cm")}</label>
            <input
              type="number"
              min="10"
              step="10"
              .value=${String(this._config.quality?.boundary_margin_cm??60)}
              @change=${t=>this._updateQualitySetting("boundary_margin_cm",Number(t.target.value))}
            />
          </div>
        </div>
        <label class="check-row">
          <input
            type="checkbox"
            .checked=${!1!==this._config.quality?.require_enter_exit}
            @change=${t=>this._updateQualitySetting("require_enter_exit",t.target.checked)}
          />
          <span>${this._t("editor.record_complete_crossings_only")}</span>
        </label>
        <div class="test-hint">
          <strong>${this._t("editor.recording_test")}</strong>
          <span>
            ${this._t("editor.enter_near_one_room_edge_walk",{p0:this._config.quality?.min_displacement_cm??120,p1:this._config.fusion?.track_ttl_s??1.8})}
          </span>
        </div>

        <h3><span>6</span>${this._t("editor.event_zones_and_cameras")}</h3>
        <p class="section-help">${this._t("editor.draw_polygon_vertices_on_the_floor")}</p>
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
        ${this._fusionJsonError?B`<div class="json-error">${this._fusionJsonError}</div>`:O}

        <datalist id="entities-list">
          ${Object.keys(this.hass.states).map(t=>B`<option value=${t}></option>`)}
        </datalist>
      </div>
    `}render(){if(!this.hass||!this._config)return O;const t=this._config.radar_model??"",e=ae(t),i=re();return this._config.radars?.length?this._renderFusionEditor():B` <div class="card-config">
      <div class="editor-hero">
        <span class="hero-icon">◎</span>
        <div>
          <strong>${this._t("editor.mmwave_radar_card")}</strong>
          <p>${this._t("editor.choose_a_radar_device_to_match")}</p>
        </div>
      </div>
      ${this._modeSelector("single")}

      <!-- Basic settings -->
      <h3><span>1</span>${this._t("editor.basics")}</h3>
      <div class="field">
        <label>${this._t("editor.card_title_2")}</label>
        <input
          type="text"
          .value=${this._config.name??""}
          placeholder=${this._t("editor.presence_radar")}
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
          ${i.map(e=>B` <option value=${e.id} ?selected=${e.id===t}>${e.label}</option>`)}
        </select>
      </div>

      <!-- Device selector -->
      <h3><span>2</span>${this._t("editor.connect_radar_device")}</h3>
      <p class="section-help">${this._t("editor.select_the_radar_from_home_assistant")}</p>
      <div class="field">
        <label>${this._t("editor.radar_device_2")}</label>
        <select .value=${this._config.device_id??""} @change=${this._deviceDropdownChanged}>
          <option value="">-- 选择设备 (Select Device) --</option>
          ${this._devices.map(t=>B` <option value=${t.id} ?selected=${t.id===this._config.device_id}>
                ${t.name_by_user||t.name||"Unknown Device"}
              </option>`)}
        </select>
      </div>
      ${"idle"!==this._deviceStatus?B`<div class="match-status ${this._deviceStatus}">
            <span>${"loading"===this._deviceStatus?"···":"success"===this._deviceStatus?"✓":"!"}</span>
            ${"loading"===this._deviceStatus?this._t("editor.detecting_device_entities"):"success"===this._deviceStatus?this._t("editor.matched_p0_configuration_fields",{p0:this._matchedEntities}):this._t("editor.automatic_detection_failed_configure_entities_manually")}
          </div>`:""}

      <!-- Room dimensions -->
      <h3><span>3</span>${this._L("editor.room_dimensions")}</h3>
      <p class="section-help">${this._t("editor.enter_the_room_dimensions_used_by")}</p>
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
      ${e?B` <details
            class="advanced"
            ?open=${this._advOpen}
            @toggle=${t=>this._advOpen=t.target.open}
          >
            <summary>
              <span>${this._t("editor.advanced_assign_entities_manually")}</span>
              <small>${this._t("editor.troubleshooting")}</small>
            </summary>
            <div class="advanced-fields">
              ${e.getEntitySchema().map(t=>B` <div class="field">
                    <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                    <input
                      type="text"
                      list="entities-list"
                      .value=${this._config[t.key]??""}
                      @change=${e=>this._changed(t.key,e.target.value)}
                    />
                  </div>`)}
            </div>
          </details>`:O}

      <datalist id="entities-list">
        ${(this.hass?Object.keys(this.hass.states):[]).map(t=>B`<option value=${t}></option>`)}
      </datalist>
    </div>`}static{this.styles=s`
    :host {
      --mmwave-primary: #0b825c;
      --mmwave-line: var(--divider-color, rgba(128, 128, 128, 0.18));
      display: block;
      max-width: 100%;
      overflow-x: hidden;
    }
    .card-config {
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
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
      min-width: 0;
    }
    .radar-editor {
      box-sizing: border-box;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
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
    .cal-grid,
    .rules-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
      min-width: 0;
    }
    .cal-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .radar-editor .field {
      margin-bottom: 7px;
    }
    .profile-field {
      position: relative;
    }
    .profile-badge {
      flex: none;
      padding: 3px 6px;
      border-radius: 999px;
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
      font-size: 8px;
      white-space: nowrap;
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
    .profile-status {
      margin-top: 7px;
      padding: 8px 10px;
      border-radius: 8px;
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.07);
      font-size: 10px;
    }
    .radar-selector {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
      overflow-x: auto;
      scrollbar-width: thin;
    }
    .radar-selector button {
      display: grid;
      gap: 1px;
      min-width: 78px;
      padding: 7px 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 9px;
      color: var(--primary-text-color);
      background: rgba(128, 128, 128, 0.035);
      font: inherit;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
    }
    .radar-selector button.active {
      border-color: rgba(11, 130, 92, 0.5);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
    }
    .radar-selector small {
      color: var(--secondary-text-color);
      font-size: 8px;
      font-weight: 500;
    }
    mmwave-installation-3d,
    mmwave-fusion-calibration {
      display: block;
      max-width: 100%;
      min-width: 0;
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
    .test-hint {
      display: grid;
      gap: 4px;
      margin-top: 9px;
      padding: 10px 12px;
      border-left: 3px solid var(--mmwave-primary);
      border-radius: 8px;
      color: var(--secondary-text-color);
      background: rgba(11, 130, 92, 0.065);
      font-size: 10px;
      line-height: 1.5;
    }
    .test-hint strong {
      color: var(--primary-text-color);
      font-size: 11px;
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
      box-sizing: border-box;
      display: flex;
      max-width: 100%;
      min-width: 0;
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
      box-sizing: border-box;
      flex: 1;
      max-width: 100%;
      min-width: 0;
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
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      min-width: 0;
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
      .rules-grid {
        grid-template-columns: 1fr;
      }
    }
  `}};t([_t({attribute:!1})],Ge.prototype,"hass",void 0),t([_t({attribute:!1})],Ge.prototype,"_config",void 0),t([ht()],Ge.prototype,"_devices",void 0),t([ht()],Ge.prototype,"_advOpen",void 0),t([ht()],Ge.prototype,"_deviceStatus",void 0),t([ht()],Ge.prototype,"_matchedEntities",void 0),t([ht()],Ge.prototype,"_fusionJsonError",void 0),t([ht()],Ge.prototype,"_calibrationProfiles",void 0),t([ht()],Ge.prototype,"_selectedFusionRadar",void 0),t([ht()],Ge.prototype,"_profileStatus",void 0),Ge=t([dt(ke)],Ge);var Je=Object.freeze({__proto__:null,get MMWaveCardEditor(){return Ge}});export{Ie as MMWaveCard};
