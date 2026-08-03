function t(t,e,r,i){var a,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,r,i);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,r,s):a(e,r))||s);return o>3&&s&&Object.defineProperty(e,r,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,r=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let o=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const r=void 0!==e&&1===e.length;r&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&a.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,r,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[i+1],t[0]);return new o(r,t,i)},n=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:g}=Object,_=globalThis,u=_.trustedTypes,y=u?u.emptyScript:"",m=_.reactiveElementPolyfillSupport,f=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},x=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);a?.call(this,e),this.requestUpdate(t,o,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const r of e)this.createProperty(r,t[r])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,r]of e)this.elementProperties.set(t,r)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const r=this._$Eu(t,e);void 0!==r&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(r)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const r of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=r.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(void 0!==i&&!0===r.reflect){const a=(void 0!==r.converter?.toAttribute?r.converter:b).toAttribute(e,r.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const r=this.constructor,i=r._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=r.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=a.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,r,i=!1,a){if(void 0!==t){const o=this.constructor;if(!1===i&&(a=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??x)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:a},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==a||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,r]of t){const{wrapped:t}=r,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,r,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,M=$.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,R="?"+C,z=`<${R}>`,P=document,D=()=>P.createComment(""),W=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,E="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,L=/>/g,O=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,N=/"/g,j=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),Y=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),K=new WeakMap,I=P.createTreeWalker(P,129);function X(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const r=t.length-1,i=[];let a,o=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<r;e++){const r=t[e];let n,l,d=-1,c=0;for(;c<r.length&&(s.lastIndex=c,l=s.exec(r),null!==l);)c=s.lastIndex,s===H?"!--"===l[1]?s=q:void 0!==l[1]?s=L:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),s=O):void 0!==l[3]&&(s=O):s===O?">"===l[0]?(s=a??H,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?O:'"'===l[3]?N:B):s===N||s===B?s=O:s===q||s===L?s=H:(s=O,a=void 0);const p=s===O&&t[e+1].startsWith("/>")?" ":"";o+=s===H?r+z:d>=0?(i.push(n),r.slice(0,d)+A+r.slice(d)+C+p):r+C+(-2===d?e:p)}return[X(t,o+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let a=0,o=0;const s=t.length-1,n=this.parts,[l,d]=Z(t,e);if(this.el=G.createElement(l,r),I.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=I.nextNode())&&n.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(A)){const e=d[o++],r=i.getAttribute(t).split(C),s=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:s[2],strings:r,ctor:"."===s[1]?et:"?"===s[1]?rt:"@"===s[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:a}),i.removeAttribute(t));if(j.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=M?M.emptyScript:"";for(let r=0;r<e;r++)i.append(t[r],D()),I.nextNode(),n.push({type:2,index:++a});i.append(t[e],D())}}}else if(8===i.nodeType)if(i.data===R)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)n.push({type:7,index:a}),t+=C.length-1}a++}}static createElement(t,e){const r=P.createElement("template");return r.innerHTML=t,r}}function V(t,e,r=t,i){if(e===Y)return e;let a=void 0!==i?r._$Co?.[i]:r._$Cl;const o=W(e)?void 0:e._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(t),a._$AT(t,r,i)),void 0!==i?(r._$Co??=[])[i]=a:r._$Cl=a),void 0!==a&&(e=V(t,a._$AS(t,e.values),a,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);I.currentNode=i;let a=I.nextNode(),o=0,s=0,n=r[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new at(a,this,t)),this._$AV.push(e),n=r[++s]}o!==n?.index&&(a=I.nextNode(),o++)}return I.currentNode=P,i}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),W(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==U&&W(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,i="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=G.createElement(X(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new G(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const a of t)i===e.length?e.push(r=new Q(this.O(D()),this.O(D()),this,this.options)):r=e[i],r._$AI(a),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,a){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=U}_$AI(t,e=this,r,i){const a=this.strings;let o=!1;if(void 0===a)t=V(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==Y,o&&(this._$AH=t);else{const i=t;let s,n;for(t=a[0],s=0;s<a.length-1;s++)n=V(this,i[r+s],e,s),n===Y&&(n=this._$AH[s]),o||=!W(n)||n!==this._$AH[s],n===U?t=U:t!==U&&(t+=(n??"")+a[s+1]),this._$AH[s]=n}o&&!i&&this.j(t)}j(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===U?void 0:t}}class rt extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==U)}}class it extends tt{constructor(t,e,r,i,a){super(t,e,r,i,a),this.type=5}_$AI(t,e=this){if((t=V(this,t,e,0)??U)===Y)return;const r=this._$AH,i=t===U&&r!==U||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==U&&(r===U||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(G,Q),($.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,r)=>{const i=r?.renderBefore??e;let a=i._$litPart$;if(void 0===a){const t=r?.renderBefore??null;i._$litPart$=a=new Q(e.insertBefore(D(),t),t,void 0,r??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}nt._$litElement$=!0,nt.finalized=!0,st.litElementHydrateSupport?.({LitElement:nt});const lt=st.litElementPolyfillSupport;lt?.({LitElement:nt}),(st.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,r)=>{void 0!==r?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},pt=(t=ct,e,r)=>{const{kind:i,metadata:a}=r;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(r.name,t),"accessor"===i){const{name:i}=r;return{set(r){const a=e.get.call(this);e.set.call(this,r),this.requestUpdate(i,a,t,!0,r)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=r;return function(r){const a=this[i];e.call(this,r),this.requestUpdate(i,a,t,!0,r)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,r)=>"object"==typeof r?pt(t,e,r):((t,e,r)=>{const i=e.hasOwnProperty(r);return e.constructor.createProperty(r,t),i?Object.getOwnPropertyDescriptor(e,r):void 0})(t,e,r)}function gt(t){return ht({...t,state:!0,attribute:!1})}function _t(t,e){return(e,r,i)=>((t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,r),r))(e,r,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ut={radar_x:0,radar_y:0,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]},yt={room_w:400,room_d:600,device_id:"",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z",polygon_entity:"text.r60abd1_polygon_config"},mt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!0,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!0,domain:"sensor"},{key:"z_entity",labelKey:"editor.z_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"},{key:"sleep_entity",labelKey:"editor.sleep_entity",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],ft={info:{id:"r60abd1",displayName:"MicRadar R60ABD1 (60 GHz)",fovDegrees:40,maxRangeM:2.5,minRangeM:.4,vitalRangeM:1.5,updateRateHz:.5,maxTargets:1,hasZAxis:!0,hasBreathing:!0,hasHeartRate:!0,hasSleep:!0},getEntitySchema:()=>mt,validateConfig(t){const e=[];for(const r of mt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("x_entity"),o=r("y_entity"),s=r("z_entity");if(!a||!o)return{present:!0,targets:[]};const n=parseFloat(a.state)||0,l=parseFloat(o.state)||0,d=s&&parseFloat(s.state)||0;return 0===n&&0===l&&0===d?{present:!0,targets:[]}:{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:d}]}},getDefaultCalibration:()=>({...ut,radar_z:220,pitch:0,roll:0})},bt={id:"ld2450",displayName:"Hi-Link LD2450 (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},xt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],vt={info:bt,getEntitySchema:()=>xt,validateConfig(t){const e=[];for(const r of xt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=bt.maxTargets;t++){const e=r(`target_${t}_x_entity`),i=r(`target_${t}_y_entity`);if(!e||!i)continue;const o=(parseFloat(e.state)||0)/10,s=(parseFloat(i.state)||0)/10;if(0===o&&0===s)continue;const n=r(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({...ut,radar_z:250,pitch:0,roll:0})},wt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],$t={info:{id:"rd03e",displayName:"Ai-Thinker RD03E (24 GHz)",fovDegrees:40,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>wt,validateConfig(t){const e=[];for(const r of wt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],Mt={info:{id:"ld2411",displayName:"Hi-Link LD2411 (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>kt,validateConfig(t){const e=[];for(const r of kt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},St={id:"ld2451",displayName:"Hi-Link LD2451 (24 GHz)",fovDegrees:30,maxRangeM:100,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},At=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Ct={info:St,getEntitySchema:()=>At,validateConfig(t){const e=[];for(const r of At)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=St.maxTargets;t++){const e=r(`target_${t}_x_entity`),i=r(`target_${t}_y_entity`);if(!e||!i)continue;const o=parseFloat(e.state)||0,s=parseFloat(i.state)||0;if(0===o&&0===s)continue;const n=r(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Rt={id:"ld2453",displayName:"Hi-Link LD2453 (24 GHz)",fovDegrees:80,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}],Pt={info:Rt,getEntitySchema:()=>zt,validateConfig(t){const e=[];for(const r of zt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=[];for(let t=1;t<=Rt.maxTargets;t++){const e=r(`target_${t}_x_entity`),i=r(`target_${t}_y_entity`);if(!e||!i)continue;const o=parseFloat(e.state)||0,s=parseFloat(i.state)||0;if(0===o&&0===s)continue;const n=r(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;a.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:a}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},Dt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Wt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"}],Tt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!1,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!1,domain:"sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"}],Et=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Ht=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],qt={r60abd1:ft,ld2450:vt,rd03e:$t,ld2411:Mt,ld2451:Ct,ld2453:Pt,ld2410b:{info:{id:"ld2410b",displayName:"Hi-Link LD2410B (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Dt,validateConfig(t){const e=[];for(const r of Dt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0};let i;const a=r("max_distance_entity");if(a&&a.state&&"unavailable"!==a.state){const t=parseFloat(a.state);!isNaN(t)&&t>0&&(i=t/100)}const o=r("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:i};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:i};const s=r("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:i};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:i};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:i}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},ld2410c:{info:{id:"ld2410c",displayName:"Hi-Link LD2410C (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Wt,validateConfig(t){const e=[];for(const r of Wt)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},ld6002:{info:{id:"ld6002",displayName:"Hi-Link LD6002 (60 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:.4,vitalRangeM:1.5,updateRateHz:1,maxTargets:1,hasZAxis:!1,hasBreathing:!0,hasHeartRate:!0,hasSleep:!1},getEntitySchema:()=>Tt,validateConfig(t){const e=[];return t.presence_entity||e.push("Missing required entity: presence_entity"),t.distance_entity||t.x_entity&&t.y_entity||e.push("You must provide either distance_entity OR both x_entity and y_entity."),e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("x_entity"),o=r("y_entity"),s=r("distance_entity");let n=0,l=0;if(a&&o?(n=parseFloat(a.state)||0,l=parseFloat(o.state)||0):s&&(l=parseFloat(s.state)||0),0===n&&l<=0)return{present:!0,targets:[]};return{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:0}]}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},ld2420:{info:{id:"ld2420",displayName:"Hi-Link LD2420 (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Et,validateConfig(t){const e=[];for(const r of Et)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:240,pitch:0,roll:0})},ld2450a:{info:{id:"ld2450a",displayName:"Hi-Link LD2450A (24 GHz Gesture)",fovDegrees:120,maxRangeM:2,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ht,validateConfig(t){const e=[];for(const r of Ht)r.required&&!t[r.key]&&e.push(`Missing required entity: ${r.key}`);return e},readFromHass(t,e){const r=r=>{const i=e[r];return i?t.states[i]:void 0},i=r("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const a=r("distance_entity");if(!a)return{present:!0,targets:[]};const o=parseFloat(a.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ut,radar_z:150,pitch:0,roll:0})}};function Lt(t){return qt[t]}function Ot(t,e,r){const i=r.length;if(i<3)return!0;let a=!1;for(let o=0,s=i-1;o<i;s=o++){const i=r[o].x,n=r[o].y,l=r[s].x,d=r[s].y;n>e!=d>e&&t<(l-i)*(e-n)/(d-n)+i&&(a=!a)}return a}function Bt(t,e,r,i){const a=function(t,e,r){const i=Math.PI/180,a=t*i,o=e*i,s=r*i,[n,l,d,c,p,h]=[Math.sin(a),Math.cos(a),Math.sin(o),Math.cos(o),Math.sin(s),Math.cos(s)];return[[l*h+n*d*p,n*c,-l*p+n*d*h],[-n*h+l*d*p,l*c,n*p+l*d*h],[c*p,-d,c*h]]}(i.yaw,i.pitch,i.roll),o=a[0][0]*t+a[0][1]*e+a[0][2]*r,s=a[1][0]*t+a[1][1]*e+a[1][2]*r,n=a[2][0]*t+a[2][1]*e+a[2][2]*r,l=i.radar_x+o,d=i.radar_y+s;return{roomX:l,roomY:d,roomZ:i.radar_z-n,inBoundary:Ot(l,d,i.polygon)}}const Nt=(t,e,r)=>({cx:t/r.roomW*r.W,cy:e/r.roomD*r.H}),jt=(t,e,r)=>({x:t/r.W*r.roomW,y:e/r.H*r.roomD});function Ft(t,e){const r=e.getBoundingClientRect(),i="touches"in t?t.touches[0].clientX:t.clientX,a="touches"in t?t.touches[0].clientY:t.clientY;return{x:i-r.left,y:a-r.top}}function Yt(t,e){const r=window.devicePixelRatio||1,i=t.offsetWidth||400;t.width=i*r,t.height=e*r,t.style.height=`${e}px`;const a=t.getContext("2d");return a.scale(r,r),a}function Ut(t,e){t.clearRect(0,0,e.W,e.H),t.strokeStyle="rgba(128,128,128,.06)",t.lineWidth=.5;for(let r=0;r<e.W;r+=40)t.beginPath(),t.moveTo(r,0),t.lineTo(r,e.H),t.stroke();for(let r=0;r<e.H;r+=40)t.beginPath(),t.moveTo(0,r),t.lineTo(e.W,r),t.stroke();t.strokeStyle="rgba(255,255,255,.15)",t.lineWidth=1.5,t.strokeRect(1,1,e.W-2,e.H-2);const r=100*Math.round(e.roomW/4/100)||100,i=r/e.roomW*e.W,a=e.H-10,o=e.W-i-8;t.beginPath(),t.moveTo(o,a),t.lineTo(o+i,a),t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.moveTo(o,a-3),t.lineTo(o,a+3),t.moveTo(o+i,a-3),t.lineTo(o+i,a+3),t.stroke(),t.fillStyle="rgba(255,255,255,.45)",t.font="9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillText(`${r}cm`,o+i/2,a-3),t.font="bold 9px system-ui",t.fillStyle="rgba(11,130,92,.6)",t.textAlign="right",t.textBaseline="top",t.fillText("X →",e.W-4,4),t.textAlign="left",t.textBaseline="bottom",t.fillText("Y ↓",4,e.H-4),t.textAlign="left",t.textBaseline="top",t.fillStyle="rgba(255,255,255,.3)",t.fillText("0",4,4),t.textBaseline="alphabetic"}function Kt(t,e,r,i=!1){if(e.length<2)return;const a=e.map(t=>Nt(t.x,t.y,r));t.beginPath(),a.forEach((e,r)=>0===r?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.fillStyle=i?"rgba(11,130,92,.04)":"rgba(11,130,92,.07)",t.fill()),t.strokeStyle=i?"rgba(11,130,92,.22)":"rgba(11,130,92,.55)",t.lineWidth=1.5,t.stroke(),i||a.forEach(e=>{t.beginPath(),t.arc(e.cx,e.cy,3,0,2*Math.PI),t.fillStyle="rgba(11,130,92,.8)",t.fill()})}function It(t,e,r,i,a,o,s,n,l,d){const c=Math.sqrt(l.W/l.roomW*(l.H/l.roomD)),p=t=>Math.max(100*t*c,1),h=o/2*(Math.PI/180),g=Math.PI/2+i*(Math.PI/180),_=Math.max(.05,Math.cos(a*(Math.PI/180))),u=p(s*_),y=p(n*_),m=(i,a,o,s,n=1.2)=>{const l=e+a*Math.cos(g-h),d=r+a*Math.sin(g-h);t.beginPath(),t.moveTo(l,d),t.arc(e,r,a,g-h,g+h,!1),t.arc(e,r,i,g+h,g-h,!0),t.closePath(),t.fillStyle=o,t.fill("evenodd"),t.strokeStyle=s,t.lineWidth=n,t.stroke()};if(null!=d&&d>s&&d<n){const i=p(d*_),a=t.createRadialGradient(e,r,i,e,r,y);a.addColorStop(0,"rgba(11,130,92,.35)"),a.addColorStop(1,"rgba(11,130,92,.08)"),m(i,y,a,"rgba(11,130,92,.60)");const o=t.createRadialGradient(e,r,u,e,r,i);o.addColorStop(0,"rgba(11,130,92,.60)"),o.addColorStop(1,"rgba(11,130,92,.25)"),m(u,i,o,"rgba(11,130,92,.90)",1.5)}else{const i=t.createRadialGradient(e,r,u,e,r,y);i.addColorStop(0,"rgba(11,130,92,.50)"),i.addColorStop(1,"rgba(11,130,92,.12)"),m(u,y,i,"rgba(11,130,92,.75)",1.5)}if(o>0){let i=1;i=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let a=i;a<=n;a+=i){if(a<=s)continue;const i=p(a*_);t.beginPath(),t.arc(e,r,i,g-h,g+h,!1),t.strokeStyle="rgba(255, 255, 255, 0.18)",t.lineWidth=.8,t.setLineDash([3,4]),t.stroke(),t.setLineDash([])}const a=o>=90?15:o>=40?10:15,l=o/2;for(let i=-l;i<=l;i+=a){const a=g+i*(Math.PI/180),o=e+u*Math.cos(a),s=r+u*Math.sin(a),n=e+y*Math.cos(a),l=r+y*Math.sin(a);if(t.beginPath(),t.moveTo(o,s),t.lineTo(n,l),t.strokeStyle=0===i?"rgba(11, 200, 140, 0.5)":"rgba(255, 255, 255, 0.18)",t.lineWidth=0===i?1.2:.8,0!==i&&t.setLineDash([3,4]),t.stroke(),t.setLineDash([]),0!==i){const o=e+(y+14)*Math.cos(a),s=r+(y+14)*Math.sin(a);t.font="bold 9px system-ui",t.fillStyle="rgba(255, 255, 255, 0.85)",t.textAlign="center",t.textBaseline="middle",t.fillText(`${i>0?"+":""}${i}°`,o,s),t.textBaseline="alphabetic"}}}t.beginPath(),t.moveTo(e,r),t.arc(e,r,u,g-h,g+h,!1),t.closePath(),t.fillStyle="rgba(0,0,0,.50)",t.fill(),t.beginPath(),t.arc(e,r,u,g-h,g+h,!1),t.strokeStyle="rgba(244,99,99,.80)",t.lineWidth=1.5,t.setLineDash([3,3]),t.stroke(),t.setLineDash([]);const f=(i,a,o)=>{const s=e+a*Math.cos(g),n=r+a*Math.sin(g),l=`${i}m`;t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle";const d=t.measureText(l).width;t.fillStyle="rgba(10,10,24,.82)",t.beginPath(),t.roundRect?.(s-d/2-3,n-7,d+6,14,3),t.fill(),t.fillStyle=o,t.fillText(l,s,n)};if(o>0){let t=1;t=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let e=t;e<=n;e+=t){if(e<=s)continue;const t=p(e*_),r=Math.abs(e-n)<.01,i=null!=d&&Math.abs(e-d)<.01,a=r?"rgba(27,159,117,.95)":i?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";f(Number(e.toFixed(1)),t,a)}}else{const i=e+u*Math.cos(g),a=r+u*Math.sin(g),o=e+y*Math.cos(g),l=r+y*Math.sin(g);t.beginPath(),t.moveTo(i,a),t.lineTo(o,l),t.strokeStyle="rgba(11, 200, 140, 0.65)",t.lineWidth=1.5,t.setLineDash([4,4]),t.stroke(),t.setLineDash([]);let c=1;c=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let t=c;t<=n;t+=c){if(t<=s)continue;const e=p(t*_),r=Math.abs(t-n)<.01,i=null!=d&&Math.abs(t-d)<.01,a=r?"rgba(27,159,117,.95)":i?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";f(Number(t.toFixed(1)),e,a)}}t.textBaseline="alphabetic",t.beginPath(),t.arc(e,r,9,0,2*Math.PI),t.fillStyle="rgba(10,10,24,.92)",t.fill(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=1.5,t.stroke();for(const[i,a]of[[7,0],[-7,0],[0,7],[0,-7]])t.beginPath(),t.moveTo(e+.3*i,r+.3*a),t.lineTo(e+i,r+a),t.strokeStyle="rgba(11,130,92,.7)",t.lineWidth=1.2,t.stroke()}function Xt(t,e,r,i,a="#ff9800"){i?(t.save(),t.beginPath(),t.arc(e,r,9,0,2*Math.PI),t.fillStyle=a,t.globalAlpha=.25,t.fill(),t.restore(),t.beginPath(),t.arc(e,r,5,0,2*Math.PI),t.fillStyle=a,t.fill(),t.strokeStyle="rgba(255,255,255,.6)",t.lineWidth=1.5,t.stroke()):(t.save(),t.setLineDash([2,2]),t.beginPath(),t.arc(e,r,9,0,2*Math.PI),t.strokeStyle=a,t.globalAlpha=.5,t.lineWidth=1.5,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(e,r,4,0,2*Math.PI),t.globalAlpha=.8,t.lineWidth=1.5,t.stroke(),t.restore())}function Zt(t,e,r,i,a,o,s,n,l){const d=Math.sqrt(n.W/n.roomW*(n.H/n.roomD)),c=Math.max(.05,Math.cos(a*(Math.PI/180))),p=(h=s*c,Math.max(100*h*d,1));var h;const g=o/2*(Math.PI/180),_=Math.PI/2+i*(Math.PI/180);if(l){t.beginPath(),t.arc(e,r,p,_-g,_+g,!1),t.strokeStyle="rgba(255,152,0,.35)",t.lineWidth=6,t.lineCap="round",t.stroke(),t.beginPath(),t.arc(e,r,p,_-g,_+g,!1),t.strokeStyle="var(--accent-color,#ff9800)",t.lineWidth=2.5,t.lineCap="round",t.stroke();const i=e+p*Math.cos(_),a=r+p*Math.sin(_);t.beginPath(),t.arc(i,a,7,0,2*Math.PI),t.fillStyle="rgba(255,152,0,.3)",t.fill(),t.beginPath(),t.arc(i,a,4,0,2*Math.PI),t.fillStyle="var(--accent-color,#ff9800)",t.fill(),t.strokeStyle="rgba(255,255,255,.8)",t.lineWidth=1.2,t.stroke()}else{t.setLineDash([4,4]),t.beginPath(),t.arc(e,r,p,_-g,_+g,!1),t.strokeStyle="rgba(244,67,54,.65)",t.lineWidth=2,t.lineCap="round",t.stroke(),t.setLineDash([]);const i=e+p*Math.cos(_),a=r+p*Math.sin(_);t.beginPath(),t.arc(i,a,4,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.8)",t.lineWidth=1.5,t.stroke()}t.lineCap="butt"}function Gt(t,e,r,i,a,o=!1){t.beginPath(),t.arc(e,r,7,0,2*Math.PI),o?(t.strokeStyle=a,t.lineWidth=1.8,t.stroke()):(t.fillStyle=a,t.fill(),t.strokeStyle="rgba(255,255,255,.5)",t.lineWidth=1.2,t.stroke()),t.fillStyle=o?a:"#fff",t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e,r),t.textBaseline="alphabetic"}const Vt={en:{card_name:"MMWave Radar HA Card",tabs:{geo:"① Geometry & Boundary",yaw:"② Yaw Calibration",live:"③ Live View"},geo:{install_params:"Installation Parameters (measure with tape)",radar_x:"Radar X",radar_y:"Radar Y",radar_z:"Height",yaw_rough:"Rough Yaw",pitch:"Pitch",roll:"Roll",geo_note:"Origin: top-left corner. X → right. Y ↓ down (toward foot of bed).\nYaw = angle of radar forward axis from Y-axis, clockwise positive.\nPitch/Roll: 0 for horizontal mount; enter tilt angle or read from IMU.",boundary:"Room Boundary (optional)",poly_hint_none:"Click canvas to draw boundary (≥ 3 points)",poly_hint_ok:"Boundary active — {n} vertices",poly_undo:"Undo",poly_clear:"Clear",boundary_note:"No boundary = no filtering. Targets outside the polygon are ignored."},yaw:{ref_a_title:"Reference Point A",ref_b_title:"Reference Point B",ref_a_idle:"Click the preview to mark a known position",ref_a_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_a_done:"Captured",ref_b_idle:"Complete point A first",ref_b_step:"Click another known position (> 80 cm from A)",ref_b_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_b_done:"Captured",capture_btn:"Walk to marked position → Capture radar reading",capture_wait:"Waiting for radar data…",result_idle:"Click the preview map to start — mark reference point A",result_ok:"Yaw {yaw}° · Residual {residual} cm"},live:{title:"Room Top-Down View",badge_none:"No presence",badge_present:"Present",badge_filtered:"Outside boundary",room_x:"Room X (cm)",room_y:"Room Y (cm)",room_z:"Height (cm)",targets:"Targets"},actions:{save:"Save",saved:"Saved ✓",reset:"Reset",reset_confirm:"Clear all calibration data?"},editor:{model:"Radar model",entities:"Entities",presence_entity:"Presence entity",distance_entity:"Distance entity",motion_state_entity:"Motion state entity (optional)",target_state_entity:"Target state entity (optional)",x_entity:"X coordinate entity",y_entity:"Y coordinate entity",z_entity:"Z coordinate entity (optional)",breath_entity:"Breath Entity (Optional)",heart_entity:"Heart Rate Entity (Optional)",sleep_entity:"Sleep State Entity (Optional)",polygon_entity:"Polygon Sync Entity (Optional)",target_1_x:"Target 1 X Entity",target_1_y:"Target 1 Y Entity",target_1_speed:"Target 1 Speed Entity (Optional)",target_2_x:"Target 2 X Entity (Optional)",target_2_y:"Target 2 Y Entity (Optional)",target_2_speed:"Target 2 Speed Entity (Optional)",target_3_x:"Target 3 X Entity (Optional)",target_3_y:"Target 3 Y Entity (Optional)",target_3_speed:"Target 3 Speed Entity (Optional)",room_dimensions:"Room Dimensions",room_w:"Room width (cm)",room_d:"Room depth (cm)"}},"zh-Hans":{card_name:"毫米波雷达校准卡片",tabs:{geo:"① 几何 & 边界",yaw:"② 偏航校准",live:"③ 实时验证"},geo:{install_params:"安装参数（卷尺测量后填入）",radar_x:"雷达 X",radar_y:"雷达 Y",radar_z:"安装高度",yaw_rough:"粗略偏航",pitch:"俯仰角",roll:"横滚角",geo_note:"坐标原点为预览图左上角，X 向右，Y 向下（从床头到床尾方向为正）。\n偏航角 = 雷达正前方相对 Y 轴（向下）的夹角，顺时针为正。\nPitch/Roll：水平安装填 0；有倾斜时填实测值或接入 IMU 传感器后自动读取。",boundary:"房间边界过滤（可选）",poly_hint_none:"点击画布添加顶点，绘制有效区域（≥ 3 个点）",poly_hint_ok:"边界过滤已启用 — {n} 个顶点",poly_undo:"撤销",poly_clear:"清除",boundary_note:"不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。"},yaw:{ref_a_title:"参考点 A",ref_b_title:"参考点 B",ref_a_idle:"在预览图上点击一个你能走到的已知位置",ref_a_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_a_done:"捕获完成",ref_b_idle:"完成 A 点后操作",ref_b_step:"点击另一个已知位置（与 A 距离 > 80 cm）",ref_b_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_b_done:"捕获完成",capture_btn:"走到标记位置后 → 点此捕获雷达读数",capture_wait:"等待雷达数据…",result_idle:"在预览图上点击参考点 A 开始校准",result_ok:"偏航角 {yaw}° · 残差 {residual} cm"},live:{title:"房间俯视图",badge_none:"无人",badge_present:"有人",badge_filtered:"边界外",room_x:"房间 X (cm)",room_y:"房间 Y (cm)",room_z:"离地高度 (cm)",targets:"目标数"},actions:{save:"保存",saved:"已保存 ✓",reset:"重置",reset_confirm:"清除所有校准数据？"},editor:{model:"雷达型号",entities:"实体配置",presence_entity:"存在感知实体",distance_entity:"距离实体",motion_state_entity:"运动状态实体（可选）",target_state_entity:"目标状态实体（可选）",x_entity:"X 坐标实体",y_entity:"Y 坐标实体",z_entity:"Z 坐标实体（可选）",breath_entity:"呼吸频率实体（可选）",heart_entity:"心率实体（可选）",sleep_entity:"睡眠状态实体（可选）",polygon_entity:"多边形同步实体（可选）",target_1_x:"目标 1 X 实体",target_1_y:"目标 1 Y 实体",target_1_speed:"目标 1 速度实体（可选）",target_2_x:"目标 2 X 实体（可选）",target_2_y:"目标 2 Y 实体（可选）",target_2_speed:"目标 2 速度实体（可选）",target_3_x:"目标 3 X 实体（可选）",target_3_y:"目标 3 Y 实体（可选）",target_3_speed:"目标 3 速度实体（可选）",room_dimensions:"房间尺寸",room_w:"房间宽度 (cm)",room_d:"房间深度 (cm)"}}};function Jt(t,e){const r=e??navigator.language?.split("-")[0]??"en",i=Vt[e??""]??Object.entries(Vt).find(([t])=>t.startsWith(r))?.[1]??Vt.en;let a=i;for(const e of t.split("."))if(a=a?.[e],void 0===a)break;return"string"==typeof a?a:t}const Qt=F`
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
`,te="mmwave-card",ee="mmwave-card-editor",re={position:"#03a9f4",height:"#00a878",yaw:"#ff9800",pitch:"#7e57c2",roll:"#ec407a"},ie=(t,e,r)=>Math.min(r,Math.max(e,t)),ae=t=>t*Math.PI/180,oe=(t,e)=>Math.round(t/e)*e;let se=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._handles=new Map,this._drawRaf=0}get _isZh(){return this.lang.toLowerCase().startsWith("zh")}_label(t,e){return this._isZh?t:e}firstUpdated(){this._cv&&(this._resizeObserver=new ResizeObserver(()=>this._scheduleDraw()),this._resizeObserver.observe(this._cv)),this._scheduleDraw()}updated(){this._scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),cancelAnimationFrame(this._drawRaf)}_scheduleDraw(){cancelAnimationFrame(this._drawRaf),this._drawRaf=requestAnimationFrame(()=>this._draw())}_scene(){const t=this._cv?.offsetWidth||420,e=ie(Math.round(.7*t),260,330);return{W:t,H:e,floorW:Math.max(180,t-72),floorH:Math.min(104,.32*e),floorTop:.48*e,verticalH:.36*e,roomW:this.calibration?.room_w??this.roomW,roomD:this.calibration?.room_d??this.roomD,zMax:400}}_project(t,e){const r=t.x/e.roomW,i=t.y/e.roomD,a=t.z/e.zMax;return{x:e.W/2+(r-i)*(e.floorW/2),y:e.floorTop+(r+i)*(e.floorH/2)-a*e.verticalH}}_unproject(t,e,r){const i=(t.x-r.W/2)/(r.floorW/2),a=(t.y+e/r.zMax*r.verticalH-r.floorTop)/(r.floorH/2);return{x:(i+a)/2*r.roomW,y:(a-i)/2*r.roomD}}_polygon(t,e){t.beginPath(),e.forEach((e,r)=>0===r?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)),t.closePath()}_line(t,e,r){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(r.x,r.y),t.stroke()}_drawHandle(t,e,r,i){this._handles.set(e,r),t.save(),t.shadowColor=re[e],t.shadowBlur=this._drag?.mode===e?14:7,t.beginPath(),t.arc(r.x,r.y,this._drag?.mode===e?9:7,0,2*Math.PI),t.fillStyle=re[e],t.fill(),t.shadowBlur=0,t.strokeStyle="#fff",t.lineWidth=1.5,t.stroke(),t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillStyle=re[e],t.fillText(i,r.x,r.y-11),t.restore()}_draw(){const t=this._cv;if(!t||!this.calibration||0===t.offsetWidth)return;const e=this._scene(),r=Yt(t,e.H),i=getComputedStyle(this),a=i.getPropertyValue("--primary-text-color").trim()||"#374151",o=i.getPropertyValue("--secondary-text-color").trim()||"#6b7280",s=this.calibration,n=[this._project({x:0,y:0,z:0},e),this._project({x:e.roomW,y:0,z:0},e),this._project({x:e.roomW,y:e.roomD,z:0},e),this._project({x:0,y:e.roomD,z:0},e)],l=[this._project({x:0,y:0,z:e.zMax},e),this._project({x:e.roomW,y:0,z:e.zMax},e)];r.clearRect(0,0,e.W,e.H),this._handles.clear(),r.save(),this._polygon(r,[n[0],n[1],l[1],l[0]]),r.fillStyle="rgba(3,169,244,.035)",r.fill(),this._polygon(r,[n[0],n[3],this._project({x:0,y:e.roomD,z:e.zMax},e),l[0]]),r.fillStyle="rgba(11,130,92,.035)",r.fill(),r.restore(),this._polygon(r,n),r.fillStyle="rgba(11,130,92,.09)",r.fill(),r.strokeStyle="rgba(11,130,92,.55)",r.lineWidth=1.4,r.stroke(),r.save(),r.strokeStyle=o,r.globalAlpha=.14,r.lineWidth=.8;for(let t=.25;t<1;t+=.25)this._line(r,this._project({x:e.roomW*t,y:0,z:0},e),this._project({x:e.roomW*t,y:e.roomD,z:0},e)),this._line(r,this._project({x:0,y:e.roomD*t,z:0},e),this._project({x:e.roomW,y:e.roomD*t,z:0},e));r.restore(),r.save(),r.strokeStyle=o,r.globalAlpha=.25,r.setLineDash([3,4]);for(const t of[{x:0,y:0},{x:e.roomW,y:0},{x:0,y:e.roomD}])this._line(r,this._project({...t,z:0},e),this._project({...t,z:e.zMax},e));r.restore(),r.font="bold 10px system-ui",r.fillStyle=o,r.fillText("X",n[1].x+8,n[1].y+2),r.fillText("Y",n[3].x-14,n[3].y+2),r.fillText("Z",l[0].x-13,l[0].y-2);const d=this._project({x:s.radar_x,y:s.radar_y,z:0},e),c=this._project({x:s.radar_x,y:s.radar_y,z:s.radar_z},e),p=ae(s.yaw),h=ae(s.pitch),g=ae(s.roll),_=Math.cos(p),u=-Math.sin(p),y=0,m=-Math.sin(p)*Math.sin(h),f=-Math.cos(p)*Math.sin(h),b=-Math.cos(h),x=_*Math.cos(g)+m*Math.sin(g),v=u*Math.cos(g)+f*Math.sin(g),w=y*Math.cos(g)+b*Math.sin(g),$=m*Math.cos(g)-_*Math.sin(g),k=f*Math.cos(g)-u*Math.sin(g),M=b*Math.cos(g)-y*Math.sin(g);r.save(),r.strokeStyle=re.height,r.globalAlpha=.55,r.setLineDash([4,4]),r.lineWidth=1.5,this._line(r,d,c),r.restore(),r.save(),r.translate(d.x,d.y),r.scale(1,.42),r.beginPath(),r.arc(0,0,12,0,2*Math.PI),r.fillStyle="rgba(3,169,244,.14)",r.fill(),r.restore();const S=Math.min(100*(this.maxRangeM??this.adapter?.info.maxRangeM??3),.58*Math.max(e.roomW,e.roomD)),A=ae((this.adapter?.info.fovDegrees??60)/2),C=t=>{const r=p+t;return this._project({x:s.radar_x+Math.sin(r)*Math.cos(h)*S,y:s.radar_y+Math.cos(r)*Math.cos(h)*S,z:ie(s.radar_z-Math.sin(h)*S,0,e.zMax)},e)},R=C(-A),z=C(0),P=C(A);this._polygon(r,[c,R,z,P]),r.fillStyle="rgba(11,130,92,.14)",r.fill(),r.strokeStyle="rgba(11,130,92,.6)",r.lineWidth=1.2,r.stroke();const D=(t,r)=>this._project({x:s.radar_x+x*t+$*r,y:s.radar_y+v*t+k*r,z:s.radar_z+w*t+M*r},e),W=[D(-22,-10),D(22,-10),D(22,10),D(-22,10)];this._polygon(r,W),r.fillStyle="#13212b",r.fill(),r.strokeStyle="#6ee7c1",r.lineWidth=1.5,r.stroke(),r.beginPath(),r.arc(c.x,c.y,4,0,2*Math.PI),r.fillStyle="#0b825c",r.fill();const T=.18*Math.min(e.roomW,e.roomD),E=t=>({x:ie(t.x,18,e.W-18),y:ie(t.y,52,e.H-18)}),H=E(this._project({x:s.radar_x+Math.sin(p)*T,y:s.radar_y+Math.cos(p)*T,z:s.radar_z},e));r.strokeStyle=re.yaw,r.lineWidth=2,this._line(r,c,H);const q=E({x:c.x-28,y:c.y});r.strokeStyle=re.height,r.lineWidth=1,this._line(r,{x:q.x+8,y:q.y},c);const L=E({x:H.x,y:H.y-30-s.pitch/90*20});r.strokeStyle=re.pitch,r.setLineDash([2,3]),this._line(r,H,L),r.setLineDash([]);const O=D(38,0),B=E({x:O.x+s.roll/90*10,y:O.y});this._drawHandle(r,"position",d,"XY"),this._drawHandle(r,"height",q,"Z"),this._drawHandle(r,"yaw",H,this._label("偏航","Yaw")),this._drawHandle(r,"pitch",L,this._label("俯仰","Pitch")),this._drawHandle(r,"roll",B,this._label("横滚","Roll")),r.save(),r.fillStyle=a,r.globalAlpha=.72,r.font="10px system-ui",r.textAlign="right",r.fillText(`${Math.round(e.roomW)} × ${Math.round(e.roomD)} cm`,e.W-10,e.H-10),r.restore()}_hitTest(t){let e;for(const[r,i]of this._handles){const a=Math.hypot(t.x-i.x,t.y-i.y);a<=18&&(!e||a<e.distance)&&(e={mode:r,distance:a})}return e?.mode}_onPointerDown(t){const e=this._cv;if(!e)return;const r=Ft(t,e),i=this._hitTest(r);if(!i)return;t.preventDefault(),e.setPointerCapture(t.pointerId);const a="height"===i?this.calibration.radar_z:"yaw"===i?this.calibration.yaw:"pitch"===i?this.calibration.pitch:"roll"===i?this.calibration.roll:0;this._drag={mode:i,startX:r.x,startY:r.y,startValue:a},this._scheduleDraw()}_onPointerMove(t){const e=this._cv;if(!e)return;const r=Ft(t,e);if(!this._drag)return void(e.style.cursor=this._hitTest(r)?"grab":"default");t.preventDefault();const i=this._scene(),a=this._drag;if("position"===a.mode){const t=this._unproject(r,0,i);this._emit({radar_x:oe(ie(t.x,0,i.roomW),1),radar_y:oe(ie(t.y,0,i.roomD),1)})}else if("height"===a.mode){const t=a.startValue-(r.y-a.startY)/i.verticalH*i.zMax;this._emit({radar_z:oe(ie(t,0,i.zMax),1)})}else if("yaw"===a.mode){const t=this._unproject(r,this.calibration.radar_z,i),e=180*Math.atan2(t.x-this.calibration.radar_x,t.y-this.calibration.radar_y)/Math.PI;this._emit({yaw:oe(e,.5)})}else if("pitch"===a.mode){const t=a.startValue-.6*(r.y-a.startY);this._emit({pitch:oe(ie(t,-90,90),.5)})}else{const t=a.startValue+.6*(r.x-a.startX);this._emit({roll:oe(ie(t,-90,90),.5)})}}_onPointerUp(t){const e=this._cv;e?.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._drag=void 0,this._scheduleDraw()}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}render(){if(!this.calibration)return F``;const t=this.calibration;return F`
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
        </div>
      </div>
      <div class="hint">
        ${this._label("拖拽彩色控制柄直接调整安装位置与姿态","Drag the colored handles to position and orient the radar")}
      </div>
      <div class="legend">
        ${this._legend("position",this._label("位置 X/Y","Position X/Y"))}
        ${this._legend("height",this._label("高度","Height"))} ${this._legend("yaw",this._label("偏航","Yaw"))}
        ${this._legend("pitch",this._label("俯仰","Pitch"))} ${this._legend("roll",this._label("横滚","Roll"))}
      </div>
    `}_legend(t,e){return F`<span><i style="background:${re[t]}"></i>${e}</span>`}static{this.styles=s`
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
  `}};t([ht({attribute:!1})],se.prototype,"adapter",void 0),t([ht({attribute:!1})],se.prototype,"calibration",void 0),t([ht({attribute:!1})],se.prototype,"lang",void 0),t([ht({type:Number})],se.prototype,"roomW",void 0),t([ht({type:Number})],se.prototype,"roomD",void 0),t([ht({type:Number})],se.prototype,"maxRangeM",void 0),t([_t("#installation-cv")],se.prototype,"_cv",void 0),se=t([dt("mmwave-installation-3d")],se);let ne=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._rafId=0}_L(t){return Jt(t,this.lang)}_ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const r=Ft(t,e),i=jt(r.x,r.y,this._m());this._emit({polygon:[...this.calibration.polygon,i]})}_undo(){const t=[...this.calibration.polygon];t.pop(),this._emit({polygon:t})}_clear(){this._emit({polygon:[]})}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0){const e=Yt(t,this._cssH()),r=this._m();if(Ut(e,r),this.adapter){const t=Nt(this.calibration.radar_x,this.calibration.radar_y,r);It(e,t.cx,t.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,r,this.adapter.info.vitalRangeM)}Kt(e,this.calibration.polygon,r)}this._rafId=requestAnimationFrame(()=>this._loop())}_numField(t,e,r,i=5,a=-9999,o=9999){const s=t=>{let r=parseFloat(t.target.value)||0;r>o&&(r=o),r<a&&(r=a),this._emit({[e]:r})};return F` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(r)}
        step=${i}
        min=${a}
        max=${o}
        @input=${s}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(r)}
        step=${i}
        min=${a}
        max=${o}
        @change=${s}
      />
      <span class="unit">cm</span>
    </div>`}_degField(t,e,r,i=-180,a=180){const o=t=>{const r=parseFloat(t.target.value)||0;this._emit({[e]:r})};return F` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(r)}
        step="0.5"
        min=${i}
        max=${a}
        @input=${o}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(r)}
        step="0.5"
        min=${i}
        max=${a}
        @change=${o}
      />
      <span class="unit">°</span>
    </div>`}render(){const t=this.calibration,e=t.polygon.length,r=e>=3?this._L("geo.poly_hint_ok").replace("{n}",String(e)):this._L("geo.poly_hint_none"),i=t.room_w??this.roomW,a=t.room_d??this.roomD;return F`
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
        .roomW=${i}
        .roomD=${a}
        .maxRangeM=${this.maxRangeM}
      ></mmwave-installation-3d>

      <details class="precision">
        <summary>
          <span>${this._ui("精确数值调整","Precise numeric adjustment")}</span>
          <small>${this._ui("可选","Optional")}</small>
        </summary>
        <div class="precision-fields">
          ${this._numField(this._L("geo.radar_x"),"radar_x",t.radar_x,5,0,i)}
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
          <span class="poly-hint ${e>=3?"ok":""}">${r}</span>
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
          ${0===e?F`<span class="map-empty"
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
  `}};t([ht({attribute:!1})],ne.prototype,"adapter",void 0),t([ht({attribute:!1})],ne.prototype,"calibration",void 0),t([ht({attribute:!1})],ne.prototype,"lang",void 0),t([ht({type:Number})],ne.prototype,"roomW",void 0),t([ht({type:Number})],ne.prototype,"roomD",void 0),t([ht({type:Number})],ne.prototype,"maxRangeM",void 0),t([_t("#poly-cv")],ne.prototype,"_cv",void 0),ne=t([dt("mmwave-geo-panel")],ne);let le=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._yw={sub:0,capturing:!1},this._rafId=0}_L(t){return Jt(t,this.lang)}_ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}offerReading(t,e){this._yw.capturing&&(this._capture(t,e),this._yw={...this._yw,capturing:!1})}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const r=this._yw;if(0!==r.sub&&1!==r.sub)return;const i=Ft(t,e),a=jt(i.x,i.y,this._m());0===r.sub?this._yw={...r,refA:{canvasPt:i,roomPt:a},sub:.5}:this._yw={...r,refB:{canvasPt:i,roomPt:a},sub:1.5},this.requestUpdate()}_onCapture(){this._yw={...this._yw,capturing:!0},this.dispatchEvent(new CustomEvent("capture-requested",{bubbles:!0,composed:!0}))}_restart(){this._yw={sub:0,capturing:!1}}_capture(t,e){const r=this._yw;.5===r.sub&&r.refA?this._yw={...r,refA:{...r.refA,detPt:{x:t,y:e}},sub:1}:1.5===r.sub&&r.refB&&(this._yw={...r,refB:{...r.refB,detPt:{x:t,y:e}},sub:2},this._computeYaw())}_computeYaw(){const t=this._yw;if(!t.refA?.detPt||!t.refB?.detPt)return;const e=this._m(),r=jt(t.refA.canvasPt.x,t.refA.canvasPt.y,e),i=jt(t.refB.canvasPt.x,t.refB.canvasPt.y,e),a=t.refA.detPt,o=t.refB.detPt,s=function(t,e,r,i){let a=(Math.atan2(e.y-t.y,e.x-t.x)-Math.atan2(i.y-r.y,i.x-r.x))*(180/Math.PI);for(;a>180;)a-=360;for(;a<-180;)a+=360;return Math.round(10*a)/10}(r,i,a,o),n={...this.calibration,yaw:s},l=function(t,e,r,i,a){const o=Bt(r.x,r.y,0,a),s=Bt(i.x,i.y,0,a);return(Math.hypot(o.roomX-t.x,o.roomY-t.y)+Math.hypot(s.roomX-e.x,s.roomY-e.y))/2}(r,i,a,o,n);this._yw={...this._yw,residual:l},this.dispatchEvent(new CustomEvent("calibration-changed",{detail:n,bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=Yt(t,this._cssH()),r=this._m();Ut(e,r),Kt(e,this.calibration.polygon,r,!0);const i=Nt(this.calibration.radar_x,this.calibration.radar_y,r);It(e,i.cx,i.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,r,this.adapter.info.vitalRangeM);const a=(t,i)=>{if(t&&(Gt(e,t.canvasPt.x,t.canvasPt.y,i,"#64b5f6"),t.detPt)){const a=Bt(t.detPt.x,t.detPt.y,0,this.calibration),o=Nt(a.roomX,a.roomY,r);e.beginPath(),e.moveTo(t.canvasPt.x,t.canvasPt.y),e.lineTo(o.cx,o.cy),e.strokeStyle="rgba(244,99,99,.4)",e.lineWidth=1,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),Gt(e,o.cx,o.cy,i,"rgba(244,99,99,.85)",!0)}};a(this._yw.refA,"A"),a(this._yw.refB,"B")}this._rafId=requestAnimationFrame(()=>this._loop())}_refStep(t){const e=this._yw,r=0===t?e.sub:e.sub-1,i=r>=1?"done":r>=0?"act":"",a=0===t,o=a?e.refA:e.refB;let s;if(r>=1)s=this._L(a?"yaw.ref_a_done":"yaw.ref_b_done");else if(.5===r)if(null!=o?.roomPt){const t=Math.round(o.roomPt.x),e=Math.round(o.roomPt.y),r=this._L(a?"yaw.ref_a_marked":"yaw.ref_b_marked");s=r.includes("{x}")?r.replace("{x}",String(t)).replace("{y}",String(e)):`(X=${t}, Y=${e} cm) — ${this._L(a?"yaw.ref_a_idle":"yaw.ref_b_step")}`}else s=this._L(a?"yaw.ref_a_marked":"yaw.ref_b_marked").replace("{x}","?").replace("{y}","?");else s=0===r?this._L(a?"yaw.ref_a_idle":"yaw.ref_b_step"):this._L("yaw.ref_b_idle");return F` <div class="ref-step ${i}">
      <div class="ref-num">${r>=1?"✓":a?"A":"B"}</div>
      <div class="ref-copy">
        <div class="ref-title">${this._L(a?"yaw.ref_a_title":"yaw.ref_b_title")}</div>
        <div class="ref-sub">${s}</div>
      </div>
    </div>`}render(){const t=this._yw,e=.5===t.sub||1.5===t.sub,r=t.sub>=2,i=r?this._L("yaw.result_ok").replace("{yaw}",String(this.calibration.yaw)).replace("{residual}",String((t.residual??0).toFixed(1))):this._L("yaw.result_idle");return F`
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
      <div class="result-card ${r?"ok":""}">
        <span class="result-icon">${r?"✓":"i"}</span>
        <span>${i}</span>
        ${t.sub>0?F`<button type="button" @click=${this._restart}>${this._ui("重新校准","Start over")}</button>`:""}
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
  `}};t([ht({attribute:!1})],le.prototype,"adapter",void 0),t([ht({attribute:!1})],le.prototype,"calibration",void 0),t([ht({attribute:!1})],le.prototype,"lang",void 0),t([ht({type:Number})],le.prototype,"roomW",void 0),t([ht({type:Number})],le.prototype,"roomD",void 0),t([ht({type:Number})],le.prototype,"maxRangeM",void 0),t([gt()],le.prototype,"_yw",void 0),t([_t("#yaw-cv")],le.prototype,"_cv",void 0),le=t([dt("mmwave-yaw-panel")],le);const de=["#ff9800","#03a9f4","#e91e63"];function ce(t){return de[(t%de.length+de.length)%de.length]}function pe(t,e,r,i,a){const o=2/Math.max(1e-4,i),s=o*a,n=1/(1+s+.48*s*s+.235*s*s*s),l=t-e,d=(r+o*l)*a;let c=(r-o*d)*n,p=e+(l+d)*n;return(Math.abs(e-t)<1e-6||(e-t)*(p-e)>0)&&(p=e,c=0),[p,c]}let he=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.targets=[],this.present=!1,this.showStatus=!1,this._trails=new Map,this._animatedTargets=new Map,this._rafId=0,this._lastFrameAt=0,this._lastTrailPruneAt=0}connectedCallback(){super.connectedCallback(),this._lastFrameAt=Date.now(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}willUpdate(t){t.has("targets")&&this._setTargetGoals(this.targets)}_setTargetGoals(t){const e=Date.now();for(const r of t){if(!r.room)continue;const t=r.room.roomX,i=r.room.roomY,a=Math.hypot(r.rawX,r.rawY)/100,o=this._animatedTargets.get(r.index);o&&e-o.lastSeen<=1e3?(o.goalX=t,o.goalY=i,o.goalRangeM=a,o.lastSeen=e):(this._trails.delete(r.index),this._animatedTargets.set(r.index,{x:t,y:i,rangeM:a,goalX:t,goalY:i,goalRangeM:a,velocityX:0,velocityY:0,velocityRange:0,lastSeen:e,lastTrailAt:0}))}}_advanceTargets(t){const e=Math.min(Math.max((t-this._lastFrameAt)/1e3,0),.05);this._lastFrameAt=t;const r=Math.max(this.adapter.info.updateRateHz,1),i=Math.min(.22,Math.max(.12,1.25/r));for(const[r,a]of this._animatedTargets)t-a.lastSeen>1e3?this._animatedTargets.delete(r):([a.x,a.velocityX]=pe(a.x,a.goalX,a.velocityX,i,e),[a.y,a.velocityY]=pe(a.y,a.goalY,a.velocityY,i,e),[a.rangeM,a.velocityRange]=pe(a.rangeM,a.goalRangeM,a.velocityRange,i,e))}_sampleTrails(t,e){for(const r of t){const t=this._animatedTargets.get(r.index);if(!t||!r.room?.inBoundary||e-t.lastTrailAt<75)continue;t.lastTrailAt=e;const i=this._trails.get(r.index)??[],a=i.at(-1);(!a||Math.hypot(t.x-a.x,t.y-a.y)>=.5)&&(i.push({x:t.x,y:t.y,t:e}),this._trails.set(r.index,i))}if(e-this._lastTrailPruneAt>=1e3){this._lastTrailPruneAt=e;const t=e-9e4;for(const[e,r]of this._trails){const i=r.filter(e=>e.t>t);i.length>0?this._trails.set(e,i):this._trails.delete(e)}}}clearTrail(){this._trails.clear();for(const t of this._animatedTargets.values())t.lastTrailAt=0}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 340;const e=this.roomD/this.roomW;return Math.max(140,Math.min(340,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=Yt(t,this._cssH()),r=this._m(),i=Date.now();this._advanceTargets(i),this._sampleTrails(this.targets,i),Ut(e,r),Kt(e,this.calibration.polygon,r);const a=Nt(this.calibration.radar_x,this.calibration.radar_y,r);It(e,a.cx,a.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,r,this.adapter.info.vitalRangeM);for(const[t,a]of this._trails)if(!(a.length<2)){e.save(),e.strokeStyle=ce(t),e.lineWidth=2,e.lineCap="round";for(let t=1;t<a.length;t++){const o=a[t-1],s=a[t],n=(i-s.t)/9e4;e.globalAlpha=Math.max(0,.5-.5*n);const l=Nt(o.x,o.y,r),d=Nt(s.x,s.y,r);e.beginPath(),e.moveTo(l.cx,l.cy),e.lineTo(d.cx,d.cy),e.stroke()}e.restore()}for(const t of this.targets){if(!t.room)continue;const i=this._animatedTargets.get(t.index);if(this.adapter.info.is1DRanging)Zt(e,a.cx,a.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,i?.rangeM??Math.hypot(t.rawX,t.rawY)/100,r,t.room.inBoundary);else{const a=Nt(i?.x??t.room.roomX,i?.y??t.room.roomY,r),o=ce(t.index);Xt(e,a.cx,a.cy,t.room.inBoundary,o),this.adapter.info.maxTargets>1&&(e.fillStyle=o,e.font="bold 10px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(String(t.index+1),a.cx,a.cy-14),e.textBaseline="alphabetic")}}}this._rafId=requestAnimationFrame(()=>this._loop())}_L(t){return Jt(t,this.lang)}_ui(t,e){return this.lang.toLowerCase().startsWith("zh")?t:e}_badgeText(){if(!this.present)return this._L("live.badge_none");const t=this.targets.filter(t=>t.room?.inBoundary).length;return t>0?this._L("live.badge_present"):this._L("live.badge_filtered")}_badgeCls(){return this.present?this.targets.some(t=>t.room?.inBoundary)?"on":"filtered":""}render(){return F`
      ${this.showStatus?F`<div class="panel-heading">
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
          ${this.showStatus?F`<button type="button" @click=${this.clearTrail}>${this._ui("清除轨迹","Clear trails")}</button>`:""}
        </div>
        ${this.present?"":F`<div class="idle-hint">
              <span>◎</span>${this._ui("等待雷达检测到目标","Waiting for a radar target")}
            </div>`}
      </div>
      ${this.showStatus?F`
            <div class="target-summary">
              <div class="summary-head">
                <strong>${this._ui("检测目标","Detected targets")}</strong>
                <span
                  >${this.targets.filter(t=>t.room?.inBoundary).length} /
                  ${this.adapter.info.maxTargets}</span
                >
              </div>
              <div class="target-list">
                ${this.targets.length>0?this.targets.map(t=>F`
                        <div
                          class="target-row ${t.room?.inBoundary?"":"outside"}"
                          style="--target-color:${ce(t.index)}"
                        >
                          <span class="target-id"><i></i>${this._ui("目标","Target")} ${t.index+1}</span>
                          <span class="target-coord">
                            ${t.room?`X ${Math.round(t.room.roomX)} · Y ${Math.round(t.room.roomY)}${this.adapter.info.hasZAxis?` · Z ${Math.round(t.room.roomZ)}`:""} cm`:"—"}
                          </span>
                          <span class="target-state"
                            >${t.room?.inBoundary?this._ui("有效","Inside"):this._ui("边界外","Outside")}</span
                          >
                        </div>
                      `):F`<div class="target-empty">${this._ui("当前没有目标数据","No target data yet")}</div>`}
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
  `}};t([ht({attribute:!1})],he.prototype,"adapter",void 0),t([ht({attribute:!1})],he.prototype,"calibration",void 0),t([ht({attribute:!1})],he.prototype,"lang",void 0),t([ht({type:Number})],he.prototype,"roomW",void 0),t([ht({type:Number})],he.prototype,"roomD",void 0),t([ht({attribute:!1})],he.prototype,"targets",void 0),t([ht({type:Boolean})],he.prototype,"present",void 0),t([ht({type:Boolean})],he.prototype,"showStatus",void 0),t([ht({type:Number})],he.prototype,"maxRangeM",void 0),t([_t("#live-cv")],he.prototype,"_cv",void 0),he=t([dt("mmwave-live-panel")],he),window.customCards??=[],window.customCards.push({type:te,name:"MMWave Radar HA Card",description:"Multi-model mmWave radar calibration & live visualization",preview:!0,documentationURL:"https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card"}),console.info("%c MMWAVE-CARD %c v1.0.0 ","background:#03a9f4;color:#fff;font-weight:700","background:#1c1c2e;color:#03a9f4;font-weight:700");let ge=class extends nt{constructor(){super(...arguments),this._tab=0,this._isCalibrating=!1,this._targets=[],this._present=!1,this._syncState="idle",this._deviceLoaded=!1}setConfig(t){if(!t.radar_model)throw new Error("radar_model is required");const e=Lt(t.radar_model);if(!e)throw new Error(`Unknown radar_model: "${t.radar_model}". Check src/models/index.ts.`);const r=e.validateConfig(t);if(r.length)throw new Error(r.join("; "));this._config={...yt,...t},this._adapter=e;const i=e.getDefaultCalibration(),a=this._config.room_w,o=this._config.room_d;i.radar_x=Math.round(.382*a),i.radar_y=Math.round(.382*o),this._cal=i}static async getConfigElement(){return await Promise.resolve().then(function(){return ue}),document.createElement(ee)}static getStubConfig(){return{...yt,radar_model:"r60abd1",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z"}}getCardSize(){return 7}set hass(t){if(this._hass=t,!this._adapter||!this._config)return;this._deviceLoaded||(this._deviceLoaded=!0,this._loadFromDevice());const e=this._adapter.readFromHass(t,this._config);if(this._present=e.present,this._maxRangeM=e.maxRangeM,this._targets=e.targets.map(t=>({...t,room:Bt(t.rawX,t.rawY,t.rawZ,this._cal)})),this.requestUpdate(),1===this._tab&&this._yawPanel){const t=e.targets[0];t&&this._yawPanel.offerReading(t.rawX,t.rawY)}}_L(t){return Jt(t,this._hass?.language)}_ui(t,e){return(this._hass?.language??"en").toLowerCase().startsWith("zh")?t:e}_insideTargetCount(){return this._targets.filter(t=>t.room?.inBoundary).length}_syncLabel(){return"syncing"===this._syncState?this._ui("正在同步…","Syncing…"):"success"===this._syncState?this._ui("已同步","Synced"):"error"===this._syncState?this._ui("同步失败","Sync failed"):this._ui("同步到设备","Sync to device")}disconnectedCallback(){super.disconnectedCallback(),null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer)}_gotoTab(t){this._tab=t,this._livePanel?.clearTrail(),this.requestUpdate()}_onPolygonPointAdded(t){const e=this.shadowRoot?.querySelector("#poly-cv"),r={W:e?.offsetWidth??400,H:165,roomW:this._cal?.room_w??this._config.room_w,roomD:this._cal?.room_d??this._config.room_d},i=jt(t.detail.canvasX,t.detail.canvasY,r),a={...this._cal,polygon:[...this._cal.polygon,i]};this._cal=a,this.requestUpdate()}_onCalibrationChanged(t){let e=t.detail;const r=e.room_w??this._config.room_w,i=e.room_d??this._config.room_d;e.radar_x>r&&(e={...e,radar_x:r}),e.radar_y>i&&(e={...e,radar_y:i}),this._cal=e,this.requestUpdate()}_onCaptureRequested(){}_loadFromDevice(){if(!this._hass||!this._config)return;const t=this._config.x_entity||"";if(!t)return;const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let r="";if(e)r=e[1];else{const e=t.split(".")[1]?.split("_")||[];r=e.slice(0,e.length-1).join("_")}const i={...this._cal},a=["radar_x","radar_y","radar_z","yaw","pitch","roll"];for(const t of a){const e=this._hass.states[`number.${r}_${t}`];e&&e.state&&!isNaN(Number(e.state))&&(i[t]=Number(e.state))}const o=this._config.polygon_entity||`text.${r}_polygon_config`,s=this._hass.states[o];if(s&&s.state){const t=s.state.split(";").filter(t=>t.includes(",")).map(t=>{const[e,r]=t.split(",");return{x:parseFloat(e),y:parseFloat(r)}});t.length>0?i.polygon=t:i.polygon=[]}else s&&""===s.state&&(i.polygon=[]);const n=i.room_w??this._config.room_w,l=i.room_d??this._config.room_d;i.radar_x>n&&(i.radar_x=n),i.radar_y>l&&(i.radar_y=l),this._cal=i,this.requestUpdate()}async _sync(){const t=this._config.x_entity||"";if(!t)return void alert("Error: x_entity is not configured.");const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);let r="";if(e)r=e[1];else{const e=t.split(".")[1]?.split("_")||[];r=e.slice(0,e.length-1).join("_")}this._syncState="syncing";try{const t={radar_x:this._cal.radar_x,radar_y:this._cal.radar_y,radar_z:this._cal.radar_z,yaw:this._cal.yaw,pitch:this._cal.pitch,roll:this._cal.roll};for(const[e,i]of Object.entries(t)){const t=`number.${r}_${e}`;try{await this._hass.callService("number","set_value",{entity_id:t,value:i})}catch(e){console.warn(`Failed to sync ${t}`,e)}}const e=this._cal.polygon.map(t=>`${t.x},${t.y}`).join(";"),i=this._config.polygon_entity||`text.${r}_polygon_config`;if(void 0!==this._hass.states[i])try{await this._hass.callService("text","set_value",{entity_id:i,value:e})}catch(t){console.warn(`Failed to sync ${i}`,t)}this._syncState="success"}catch(t){this._syncState="error",console.error(t)}finally{null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._syncResetTimer=window.setTimeout(()=>this._syncState="idle",2200)}}_reset(){if(!confirm(this._L("actions.reset_confirm")||"Reset to factory defaults?"))return;const t=this._adapter.getDefaultCalibration(),e=this._config.room_w,r=this._config.room_d;t.radar_x=Math.round(.382*e),t.radar_y=Math.round(.382*r),this._cal=t,this._gotoTab(0)}render(){if(!this._config||!this._adapter)return U;const t=this._cal.room_w??this._config.room_w,e=this._cal.room_d??this._config.room_d,r=this._hass?.language??"en",i=this._insideTargetCount(),a=[{icon:"mdi:cube-scan",title:this._ui("安装定位","Installation"),description:this._ui("在 3D 房间中放置雷达","Place the radar in the 3D room")},{icon:"mdi:compass-outline",title:this._ui("方向校准","Direction"),description:this._ui("通过两个参考点校准偏航","Calibrate yaw with two reference points")},{icon:"mdi:radar",title:this._ui("实时验证","Live test"),description:this._ui("检查目标、边界和运动轨迹","Verify targets, boundary and trails")}];return this._isCalibrating?F`
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
          ${a.map((t,e)=>F`
              <button
                type="button"
                class="workflow-step ${this._tab===e?"current":""} ${this._tab>e?"complete":""}"
                aria-current=${this._tab===e?"step":U}
                @click=${()=>this._gotoTab(e)}
              >
                <span class="step-icon">
                  ${this._tab>e?F`<ha-icon icon="mdi:check"></ha-icon>`:F`<ha-icon icon=${t.icon}></ha-icon>`}
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
          ${0===this._tab?F` <mmwave-geo-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${r}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-geo-panel>`:U}
          ${1===this._tab?F` <mmwave-yaw-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${r}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-yaw-panel>`:U}
          ${2===this._tab?F` <mmwave-live-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${r}
                .roomW=${t}
                .roomD=${e}
                .targets=${this._targets}
                .present=${this._present}
                .maxRangeM=${this._maxRangeM}
                .showStatus=${!0}
              >
              </mmwave-live-panel>`:U}
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
            ${this._tab>0?F`<button class="secondary-button" type="button" @click=${()=>this._gotoTab(this._tab-1)}>
                  <ha-icon icon="mdi:chevron-left"></ha-icon>${this._ui("上一步","Back")}
                </button>`:U}
            ${this._tab<2?F`<button class="primary-button" type="button" @click=${()=>this._gotoTab(this._tab+1)}>
                  ${this._ui("下一步","Continue")}<ha-icon icon="mdi:chevron-right"></ha-icon>
                </button>`:F`<button
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
    `:F`
        <ha-card class="live-card">
          <header class="live-header">
            <div class="identity">
              <div class="logo-tile ${this._present?"online":""}">${Qt}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name||this._ui("人体存在雷达","Presence radar")}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span class="presence-chip ${i>0?"active":this._present?"filtered":""}">
                <i></i>
                ${i>0?this._ui(`${i} 个目标`,`${i} target${1===i?"":"s"}`):this._present?this._ui("边界外","Outside"):this._ui("无人","Clear")}
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
              .lang=${r}
              .roomW=${t}
              .roomD=${e}
              .targets=${this._targets}
              .present=${this._present}
              .maxRangeM=${this._maxRangeM}
            >
            </mmwave-live-panel>
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
  `}};t([gt()],ge.prototype,"_config",void 0),t([gt()],ge.prototype,"_adapter",void 0),t([gt()],ge.prototype,"_cal",void 0),t([gt()],ge.prototype,"_tab",void 0),t([gt()],ge.prototype,"_isCalibrating",void 0),t([gt()],ge.prototype,"_targets",void 0),t([gt()],ge.prototype,"_present",void 0),t([gt()],ge.prototype,"_maxRangeM",void 0),t([gt()],ge.prototype,"_syncState",void 0),t([_t("mmwave-yaw-panel")],ge.prototype,"_yawPanel",void 0),t([_t("mmwave-live-panel")],ge.prototype,"_livePanel",void 0),ge=t([dt(te)],ge);let _e=class extends nt{constructor(){super(...arguments),this._devices=[],this._advOpen=!1,this._deviceStatus="idle",this._matchedEntities=0}updated(t){super.updated(t),t.has("hass")&&this.hass&&0===this._devices.length&&this._loadDevices()}async _loadDevices(){try{this._devices=await this.hass.callWS({type:"config/device_registry/list"})}catch(t){console.warn("Failed to load devices",t)}}setConfig(t){this._config={...yt,...t}}_L(t){return Jt(t,this.hass?.language)}_ui(t,e){return(this.hass?.language??"en").toLowerCase().startsWith("zh")?t:e}_changed(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}async _deviceDropdownChanged(t){const e=t.target.value;if(this._changed("device_id",e),!e)return this._deviceStatus="idle",void(this._matchedEntities=0);this._deviceStatus="loading";try{const t=(await this.hass.callWS({type:"config/entity_registry/list"})).filter(t=>t.device_id===e),r={};for(const e of t){const t=e.entity_id,i=(e.original_name||t).toLowerCase(),a=t.match(/target_(\d+)_x/),o=t.match(/target_(\d+)_y/),s=t.match(/target_(\d+)_speed/);t.startsWith("binary_sensor.")&&(i.includes("presence")||t.includes("presence"))?r.presence_entity=t:t.startsWith("sensor.")&&(i.includes("distance")||t.includes("distance")||i.includes("距离"))?r.distance_entity=t:t.startsWith("sensor.")&&(i.includes("motion_state")||t.includes("motion_state")||i.includes("运动状态")||i.includes("target_state")||t.includes("target_state")||i.includes("目标状态"))?(r.motion_state_entity=t,r.target_state_entity=t):a?r[`target_${a[1]}_x_entity`]=t:o?r[`target_${o[1]}_y_entity`]=t:s?r[`target_${s[1]}_speed_entity`]=t:t.startsWith("sensor.")&&(i.endsWith(" x")||t.endsWith("_x")||t.endsWith("radar_x"))&&!t.includes("room_x")&&!i.includes("room x")?r.x_entity=t:t.startsWith("sensor.")&&(i.endsWith(" y")||t.endsWith("_y")||t.endsWith("radar_y"))&&!t.includes("room_y")&&!i.includes("room y")?r.y_entity=t:t.startsWith("sensor.")&&(i.endsWith(" z")||t.endsWith("_z")||t.endsWith("radar_z"))&&!t.includes("room_z")&&!i.includes("room z")?r.z_entity=t:t.startsWith("sensor.")&&(t.includes("breath")||t.includes("respiration"))?r.breath_entity=t:t.startsWith("sensor.")&&t.includes("heart")?r.heart_entity=t:t.startsWith("sensor.")&&t.includes("sleep")?r.sleep_entity=t:t.startsWith("text.")&&(t.includes("polygon")||i.toLowerCase().includes("polygon")||i.includes("多边形")||i.includes("边界"))&&(r.polygon_entity=t)}Object.keys(r).length>0&&(this._config={...this._config,...r},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))),this._matchedEntities=Object.keys(r).length,this._deviceStatus=this._matchedEntities>0?"success":"error"}catch(t){this._deviceStatus="error",console.warn("Failed to auto-populate entities from device",t)}}render(){if(!this.hass||!this._config)return U;const t=this._config.radar_model??"",e=Lt(t),r=Object.entries(qt).map(([t,e])=>({id:t,label:e.info.displayName})).sort((t,e)=>t.label.localeCompare(e.label));return F` <div class="card-config">
      <div class="editor-hero">
        <span class="hero-icon">◎</span>
        <div>
          <strong>${this._ui("毫米波雷达卡片","MMWave radar card")}</strong>
          <p>
            ${this._ui("选择雷达设备后自动完成实体匹配，只需确认房间尺寸即可开始。","Choose a radar device to match entities automatically, then confirm the room size.")}
          </p>
        </div>
      </div>

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
          ${r.map(e=>F` <option value=${e.id} ?selected=${e.id===t}>${e.label}</option>`)}
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
          ${this._devices.map(t=>F` <option value=${t.id} ?selected=${t.id===this._config.device_id}>
                ${t.name_by_user||t.name||"Unknown Device"}
              </option>`)}
        </select>
      </div>
      ${"idle"!==this._deviceStatus?F`<div class="match-status ${this._deviceStatus}">
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
      ${e?F` <details
            class="advanced"
            ?open=${this._advOpen}
            @toggle=${t=>this._advOpen=t.target.open}
          >
            <summary>
              <span>${this._ui("高级选项：手动指定实体","Advanced: assign entities manually")}</span>
              <small>${this._ui("故障排查","Troubleshooting")}</small>
            </summary>
            <div class="advanced-fields">
              ${e.getEntitySchema().map(t=>F` <div class="field">
                    <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                    <input
                      type="text"
                      list="entities-list"
                      .value=${this._config[t.key]??""}
                      @change=${e=>this._changed(t.key,e.target.value)}
                    />
                  </div>`)}
            </div>
          </details>`:U}

      <datalist id="entities-list">
        ${(this.hass?Object.keys(this.hass.states):[]).map(t=>F`<option value=${t}></option>`)}
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
    }
  `}};t([ht({attribute:!1})],_e.prototype,"hass",void 0),t([ht({attribute:!1})],_e.prototype,"_config",void 0),t([gt()],_e.prototype,"_devices",void 0),t([gt()],_e.prototype,"_advOpen",void 0),t([gt()],_e.prototype,"_deviceStatus",void 0),t([gt()],_e.prototype,"_matchedEntities",void 0),_e=t([dt(ee)],_e);var ue=Object.freeze({__proto__:null,get MMWaveCardEditor(){return _e}});export{ge as MMWaveCard};
