function t(t,e,a,i){var r,o=arguments.length,s=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,a,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(o<3?r(s):o>3?r(e,a,s):r(e,a))||s);return o>3&&s&&Object.defineProperty(e,a,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,a=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(a&&void 0===t){const a=void 0!==e&&1===e.length;a&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),a&&r.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const a=1===t.length?t[0]:e.reduce((e,a,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[i+1],t[0]);return new o(a,t,i)},n=a?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const a of t.cssRules)e+=a.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:_}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=null!==t;break;case Number:a=null===t?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch(t){a=null}}return a}},v=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(t,a,e);void 0!==i&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,a){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const a of e)this.createProperty(a,t[a])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,a]of e)this.elementProperties.set(t,a)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const a=this._$Eu(t,e);void 0!==a&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const a=new Set(t.flat(1/0).reverse());for(const t of a)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const a=e.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const a of e.keys())this.hasOwnProperty(a)&&(t.set(a,this[a]),delete this[a]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(a)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const a of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=a.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,a){this._$AK(t,a)}_$ET(t,e){const a=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,a);if(void 0!==i&&!0===a.reflect){const r=(void 0!==a.converter?.toAttribute?a.converter:b).toAttribute(e,a.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const a=this.constructor,i=a._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=a.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,a,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),a??=o.getPropertyOptions(t),!((a.hasChanged??v)(r,e)||a.useDefault&&a.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,a))))return;this.C(t,e,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:a,reflect:i,wrapped:r},o){a&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||a||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,a]of t){const{wrapped:t}=a,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,a,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,M=$.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,R="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+z,A=`<${C}>`,D=document,E=()=>D.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,q=Array.isArray,P="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,W=/>/g,N=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...a)=>({_$litType$:t,strings:e,values:a}))(1),O=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),K=new WeakMap,X=D.createTreeWalker(D,129);function U(t,e){if(!q(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Z=(t,e)=>{const a=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<a;e++){const a=t[e];let n,l,d=-1,c=0;for(;c<a.length&&(s.lastIndex=c,l=s.exec(a),null!==l);)c=s.lastIndex,s===H?"!--"===l[1]?s=F:void 0!==l[1]?s=W:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=r??H,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?N:'"'===l[3]?j:L):s===j||s===L?s=N:s===F||s===W?s=H:(s=N,r=void 0);const p=s===N&&t[e+1].startsWith("/>")?" ":"";o+=s===H?a+A:d>=0?(i.push(n),a.slice(0,d)+R+a.slice(d)+z+p):a+z+(-2===d?e:p)}return[U(t,o+(t[a]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},a){let i;this.parts=[];let r=0,o=0;const s=t.length-1,n=this.parts,[l,d]=Z(t,e);if(this.el=G.createElement(l,a),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&n.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(R)){const e=d[o++],a=i.getAttribute(t).split(z),s=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:s[2],strings:a,ctor:"."===s[1]?et:"?"===s[1]?at:"@"===s[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(z)&&(n.push({type:6,index:r}),i.removeAttribute(t));if(I.test(i.tagName)){const t=i.textContent.split(z),e=t.length-1;if(e>0){i.textContent=M?M.emptyScript:"";for(let a=0;a<e;a++)i.append(t[a],E()),X.nextNode(),n.push({type:2,index:++r});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===C)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(z,t+1));)n.push({type:7,index:r}),t+=z.length-1}r++}}static createElement(t,e){const a=D.createElement("template");return a.innerHTML=t,a}}function V(t,e,a=t,i){if(e===O)return e;let r=void 0!==i?a._$Co?.[i]:a._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,a,i)),void 0!==i?(a._$Co??=[])[i]=r:a._$Cl=r),void 0!==r&&(e=V(t,r._$AS(t,e.values),r,i)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:a}=this._$AD,i=(t?.creationScope??D).importNode(e,!0);X.currentNode=i;let r=X.nextNode(),o=0,s=0,n=a[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Q(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new rt(r,this,t)),this._$AV.push(e),n=a[++s]}o!==n?.index&&(r=X.nextNode(),o++)}return X.currentNode=D,i}p(t){let e=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(t,a,e),e+=a.strings.length-2):a._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,a,i){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),T(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==O&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>q(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:a}=t,i="number"==typeof a?this._$AC(t):(void 0===a.el&&(a.el=G.createElement(U(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new J(i,this),a=t.u(this.options);t.p(e),this.T(a),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new G(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let a,i=0;for(const r of t)i===e.length?e.push(a=new Q(this.O(E()),this.O(E()),this,this.options)):a=e[i],a._$AI(r),i++;i<e.length&&(this._$AR(a&&a._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,a,i,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=Y}_$AI(t,e=this,a,i){const r=this.strings;let o=!1;if(void 0===r)t=V(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==O,o&&(this._$AH=t);else{const i=t;let s,n;for(t=r[0],s=0;s<r.length-1;s++)n=V(this,i[a+s],e,s),n===O&&(n=this._$AH[s]),o||=!T(n)||n!==this._$AH[s],n===Y?t=Y:t!==Y&&(t+=(n??"")+r[s+1]),this._$AH[s]=n}o&&!i&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class at extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class it extends tt{constructor(t,e,a,i,r){super(t,e,a,i,r),this.type=5}_$AI(t,e=this){if((t=V(this,t,e,0)??Y)===O)return;const a=this._$AH,i=t===Y&&a!==Y||t.capture!==a.capture||t.once!==a.once||t.passive!==a.passive,r=t!==Y&&(a===Y||i);i&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,a){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const ot=$.litHtmlPolyfillSupport;ot?.(G,Q),($.litHtmlVersions??=[]).push("3.3.2");const st=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,a)=>{const i=a?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=a?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(E(),t),t,void 0,a??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}}nt._$litElement$=!0,nt.finalized=!0,st.litElementHydrateSupport?.({LitElement:nt});const lt=st.litElementPolyfillSupport;lt?.({LitElement:nt}),(st.litElementVersions??=[]).push("4.2.2");const dt=t=>(e,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},pt=(t=ct,e,a)=>{const{kind:i,metadata:r}=a;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(a.name,t),"accessor"===i){const{name:i}=a;return{set(a){const r=e.get.call(this);e.set.call(this,a),this.requestUpdate(i,r,t,!0,a)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=a;return function(a){const r=this[i];e.call(this,a),this.requestUpdate(i,r,t,!0,a)}}throw Error("Unsupported decorator location: "+i)};function ht(t){return(e,a)=>"object"==typeof a?pt(t,e,a):((t,e,a)=>{const i=e.hasOwnProperty(a);return e.constructor.createProperty(a,t),i?Object.getOwnPropertyDescriptor(e,a):void 0})(t,e,a)}function _t(t){return ht({...t,state:!0,attribute:!1})}function ut(t,e){return(e,a,i)=>((t,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,a),a))(e,a,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const gt={radar_x:0,radar_y:0,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]},mt={room_w:400,room_d:600,device_id:"",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z",polygon_entity:"text.r60abd1_polygon_config"},ft=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!0,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!0,domain:"sensor"},{key:"z_entity",labelKey:"editor.z_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"},{key:"sleep_entity",labelKey:"editor.sleep_entity",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],yt={info:{id:"r60abd1",displayName:"MicRadar R60ABD1 (60 GHz)",fovDegrees:40,maxRangeM:2.5,minRangeM:.4,vitalRangeM:1.5,updateRateHz:.5,maxTargets:1,hasZAxis:!0,hasBreathing:!0,hasHeartRate:!0,hasSleep:!0},getEntitySchema:()=>ft,validateConfig(t){const e=[];for(const a of ft)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=a("x_entity"),o=a("y_entity"),s=a("z_entity");if(!r||!o)return{present:!0,targets:[]};const n=parseFloat(r.state)||0,l=parseFloat(o.state)||0,d=s&&parseFloat(s.state)||0;return 0===n&&0===l&&0===d?{present:!0,targets:[]}:{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:d}]}},getDefaultCalibration:()=>({...gt,radar_z:220,pitch:0,roll:0})},bt={id:"ld2450",displayName:"Hi-Link LD2450 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},vt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function xt(t){const e=parseFloat(t.state);if(!Number.isFinite(e))return null;const a=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===a?e:"m"===a?100*e:e/10}const wt={info:bt,getEntitySchema:()=>vt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=bt.maxTargets;t++){const e=a(`target_${t}_x_entity`),i=a(`target_${t}_y_entity`);if(!e||!i)continue;const o=xt(e),s=xt(i);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=a(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...gt,radar_z:250,pitch:0,roll:0})},$t={id:"ld2452",displayName:"Hi-Link LD2452 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Mt(t){const e=parseFloat(t.state);if(!Number.isFinite(e))return null;const a=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===a?e:"m"===a?100*e:e/10}const St={info:$t,getEntitySchema:()=>kt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=$t.maxTargets;t++){const e=a(`target_${t}_x_entity`),i=a(`target_${t}_y_entity`);if(!e||!i)continue;const o=Mt(e),s=Mt(i);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=a(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...gt,radar_z:250,pitch:0,roll:0})},Rt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],zt={info:{id:"rd03e",displayName:"Ai-Thinker RD03E (24 GHz)",fovDegrees:40,verticalFovDegrees:90,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Rt,validateConfig(t){const e=[];for(const a of Rt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=a("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Ct=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],At={info:{id:"ld2411",displayName:"Hi-Link LD2411 (24 GHz)",fovDegrees:40,verticalFovDegrees:80,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ct,validateConfig(t){const e=[];for(const a of Ct)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=a("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Dt={id:"ld2451",displayName:"Hi-Link LD2451 (24 GHz)",fovDegrees:30,verticalFovDegrees:14,maxRangeM:100,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Et=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}];function Tt(t){if(!t)return null;const e=parseFloat(t.state);return Number.isFinite(e)?e:null}const qt={info:Dt,getEntitySchema:()=>Et,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Dt.maxTargets;t++){const e=a(`target_${t}_x_entity`),i=a(`target_${t}_y_entity`);if(!e||!i)continue;const o=Tt(e),s=Tt(i);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=a(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Pt={id:"ld2453",displayName:"Hi-Link LD2453 (24 GHz)",fovDegrees:80,verticalFovDegrees:60,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Ht=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"}];function Ft(t){if(!t)return null;const e=parseFloat(t.state);return Number.isFinite(e)?e:null}const Wt={info:Pt,getEntitySchema:()=>Ht,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Pt.maxTargets;t++){const e=a(`target_${t}_x_entity`),i=a(`target_${t}_y_entity`);if(!e||!i)continue;const o=Ft(e),s=Ft(i);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=a(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Nt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Lt={info:{id:"ld2410b",displayName:"Hi-Link LD2410B (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Nt,validateConfig(t){const e=[];for(const a of Nt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0};let i;const r=a("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(i=t/100)}const o=a("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:i};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:i};const s=a("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:i};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:i};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:i}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},jt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],It={info:{id:"ld2410c",displayName:"Hi-Link LD2410C (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>jt,validateConfig(t){const e=[];for(const a of jt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0};let i;const r=a("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(i=t/100)}const o=a("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:i};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:i};const s=a("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:i};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:i};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:i}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Bt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!1,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!1,domain:"sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"}],Ot={info:{id:"ld6002",displayName:"Hi-Link LD6002 (60 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:6,minRangeM:.4,vitalRangeM:1.5,updateRateHz:1,maxTargets:1,hasZAxis:!1,hasBreathing:!0,hasHeartRate:!0,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Bt,validateConfig(t){const e=[];return t.presence_entity||e.push("Missing required entity: presence_entity"),t.distance_entity||t.x_entity&&t.y_entity||e.push("You must provide either distance_entity OR both x_entity and y_entity."),e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=a("x_entity"),o=a("y_entity"),s=a("distance_entity");let n=0,l=0;if(r&&o?(n=parseFloat(r.state)||0,l=parseFloat(o.state)||0):s&&(l=parseFloat(s.state)||0),0===n&&l<=0)return{present:!0,targets:[]};return{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:0}]}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Yt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Kt={info:{id:"ld2420",displayName:"Hi-Link LD2420 (24 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:8,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Yt,validateConfig(t){const e=[];for(const a of Yt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=a("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Xt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Ut={info:{id:"ld2450a",displayName:"Hi-Link LD2450A (24 GHz Gesture)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:2,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Xt,validateConfig(t){const e=[];for(const a of Xt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=a("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0,s=o>0?o:0,n=[];return n.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:n}},getDefaultCalibration:()=>({...gt,radar_z:150,pitch:0,roll:0})},Zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Gt={info:{id:"ld2410",displayName:"Hi-Link LD2410 (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Zt,validateConfig(t){const e=[];for(const a of Zt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0};let i;const r=a("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(i=t/100)}const o=a("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:i};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:i};const s=a("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:i};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:i};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:i}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})},Vt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Jt={info:{id:"ld2411s",displayName:"Hi-Link LD2411S (24 GHz 1-D)",fovDegrees:45,verticalFovDegrees:20,maxRangeM:6,minRangeM:.3,updateRateHz:20,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Vt,validateConfig(t){const e=[];for(const a of Vt)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=[],o=a("distance_entity");if(o&&"unavailable"!==o.state){const t=parseFloat(o.state)||0;t>0&&r.push({index:0,rawX:0,rawY:t,rawZ:0})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...gt,radar_z:100,pitch:0,roll:0})},Qt={id:"ld2454",displayName:"Hi-Link LD2454 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},te=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function ee(t){const e=parseFloat(t.state);if(!Number.isFinite(e))return null;const a=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===a?e:"m"===a?100*e:e/10}const ae={info:Qt,getEntitySchema:()=>te,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0},i=a("presence_entity");if(!i||"unavailable"===i.state)return{present:!1,targets:[]};if(!("on"===i.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Qt.maxTargets;t++){const e=a(`target_${t}_x_entity`),i=a(`target_${t}_y_entity`);if(!e||!i)continue;const o=ee(e),s=ee(i);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=a(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...gt,radar_z:250,pitch:0,roll:0})},ie=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],re={r60abd1:yt,ld2450:wt,ld2452:St,rd03e:zt,ld2411:At,ld2451:qt,ld2453:Wt,ld2410b:Lt,ld2410c:It,ld6002:Ot,ld2420:Kt,ld2450a:Ut,ld2410:Gt,ld2411s:Jt,ld2454:ae,ld2412:{info:{id:"ld2412",displayName:"Hi-Link LD2412 (24 GHz)",fovDegrees:150,maxRangeM:9,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>ie,validateConfig(t){const e=[];for(const a of ie)a.required&&!t[a.key]&&e.push(`Missing required entity: ${a.key}`);return e},readFromHass(t,e){const a=a=>{const i=e[a];return i?t.states[i]:void 0};let i;const r=a("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(i=t/100)}const o=a("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:i};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:i};const s=a("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:i};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:i};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:i}},getDefaultCalibration:()=>({...gt,radar_z:240,pitch:0,roll:0})}};function oe(t){return re[t]}function se(){return Object.entries(re).map(([t,e])=>({id:t,label:e.info.displayName})).sort((t,e)=>t.label.localeCompare(e.label))}function ne(t,e,a){const i=a.length;if(i<3)return!0;let r=!1;for(let o=0,s=i-1;o<i;s=o++){const i=a[o].x,n=a[o].y,l=a[s].x,d=a[s].y;n>e!=d>e&&t<(l-i)*(e-n)/(d-n)+i&&(r=!r)}return r}function le(t,e,a,i){const r=function(t,e,a){const i=Math.PI/180,r=t*i,o=e*i,s=a*i,[n,l,d,c,p,h]=[Math.sin(r),Math.cos(r),Math.sin(o),Math.cos(o),Math.sin(s),Math.cos(s)];return[[l*h+n*d*p,n*c,-l*p+n*d*h],[-n*h+l*d*p,l*c,n*p+l*d*h],[c*p,-d,c*h]]}(i.yaw,i.pitch,i.roll),o=r[0][0]*t+r[0][1]*e+r[0][2]*a,s=r[1][0]*t+r[1][1]*e+r[1][2]*a,n=r[2][0]*t+r[2][1]*e+r[2][2]*a,l=i.radar_x+o,d=i.radar_y+s;return{roomX:l,roomY:d,roomZ:i.radar_z-n,inBoundary:ne(l,d,i.polygon)}}class de{constructor(t={}){this.tracks=new Map,this.associationGate=Math.max(t.association_gate_cm??90,10),this.mergeGate=Math.max(t.merge_gate_cm??70,10),this.ttlMs=1e3*Math.max(t.track_ttl_s??1.2,.2),this.confirmHits=Math.max(t.confirm_hits??2,1),this.minConfirmSources=Math.max(t.min_confirm_sources??1,1)}reset(){this.tracks.clear()}step(t,e=Date.now()){const a=new Map;for(const t of this.tracks.values()){const i=Math.min(Math.max((e-t.updated_at)/1e3,0),.5);t.x+=t.vx*i,t.y+=t.vy*i,t.updated_at=e,a.set(t.track_id,i)}const i=this.cluster(t),r=[...this.tracks.values()],o=r.length,s=i.length,n=o+s,l=Array.from({length:n},()=>Array(n).fill(0));for(let t=0;t<o;t++){const e=r[t],o=Math.hypot(e.vx,e.vy),d=this.associationGate+o*(a.get(e.track_id)??0);i.forEach((a,i)=>{const r=Math.hypot(e.x-a.x,e.y-a.y);l[t][i]=r<=d?r/d:4});for(let e=s;e<n;e++)l[t][e]=1.05}for(let t=o;t<n;t++)for(let e=0;e<s;e++)l[t][e]=1.05;const d=new Set,c=new Set;for(const[t,e]of function(t){if(!t.length||!t[0]?.length)return[];let e=t.map(t=>[...t]),a=e.length,i=e[0].length;const r=a>i;r&&(e=Array.from({length:i},(t,a)=>e.map(t=>t[a])),[a,i]=[i,a]);const o=Array(a+1).fill(0),s=Array(i+1).fill(0),n=Array(i+1).fill(0),l=Array(i+1).fill(0);for(let t=1;t<=a;t++){n[0]=t;let a=0;const r=Array(i+1).fill(Number.POSITIVE_INFINITY),d=Array(i+1).fill(!1);do{d[a]=!0;const t=n[a];let c=Number.POSITIVE_INFINITY,p=0;for(let n=1;n<=i;n++){if(d[n])continue;const i=e[t-1][n-1]-o[t]-s[n];i<r[n]&&(r[n]=i,l[n]=a),r[n]<c&&(c=r[n],p=n)}for(let t=0;t<=i;t++)d[t]?(o[n[t]]+=c,s[t]-=c):r[t]-=c;a=p}while(0!==n[a]);do{const t=l[a];n[a]=n[t],a=t}while(0!==a)}const d=n.map((t,e)=>[t-1,e-1]).filter(([t],e)=>e>0&&t>=0);return r?d.map(([t,e])=>[e,t]):d}(l)){if(t>=o||e>=s||l[t][e]>1)continue;const n=r[t];d.add(n.track_id),c.add(e);const p=i[e],h=Math.max(a.get(n.track_id)??.1,.05),_=p.x-n.x,u=p.y-n.y,g=Math.min(p.sources.length-1,3),m=.56+.06*g,f=.1+.02*g;n.x+=m*_,n.y+=m*u,n.vx+=f*_/h,n.vy+=f*u/h,n.last_seen=p.timestamp,n.sources=p.sources,p.sources.forEach(t=>n.seenSources.add(t)),n.hits+=Math.max(p.sources.length,1),n.confirmed=n.hits>=this.confirmHits&&n.seenSources.size>=this.minConfirmSources;const y=n.seenSources.size>=this.minConfirmSources?1:.74;n.confidence=Math.min(y,n.confidence+.1+.08*g)}for(const t of this.tracks.values())d.has(t.track_id)||(t.sources=[],t.confidence=Math.max(0,t.confidence-.08));i.forEach((t,a)=>{if(c.has(a))return;const i=Math.max(t.sources.length,1),r={track_id:globalThis.crypto?.randomUUID?.().replaceAll("-","")??`${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`,x:t.x,y:t.y,vx:0,vy:0,confidence:Math.min(.9,.35+.18*t.sources.length),sources:t.sources,started_at:t.timestamp,last_seen:t.timestamp,updated_at:e,hits:i,confirmed:i>=this.confirmHits&&t.sources.length>=this.minConfirmSources,seenSources:new Set(t.sources)};this.tracks.set(r.track_id,r)});for(const[t,a]of this.tracks)e-a.last_seen>this.ttlMs&&this.tracks.delete(t);return[...this.tracks.values()].filter(t=>t.confirmed).map(({updated_at:t,hits:e,confirmed:a,seenSources:i,...r})=>({...r,source_count:i.size}))}cluster(t){const e=[];for(const a of[...t].sort((t,e)=>e.weight-t.weight)){let t,i=this.mergeGate;for(const r of e){if(r.sources.includes(a.radarId))continue;const e=Math.hypot(a.x-r.x,a.y-r.y);e<=i&&(t=r,i=e)}t?(t.observations.push(a),this.recalculate(t)):e.push({observations:[a],x:a.x,y:a.y,timestamp:a.timestamp,sources:[a.radarId]})}return e}recalculate(t){const e=t.observations.reduce((t,e)=>t+Math.max(e.weight,.01),0);t.x=t.observations.reduce((t,e)=>t+e.x*Math.max(e.weight,.01),0)/e,t.y=t.observations.reduce((t,e)=>t+e.y*Math.max(e.weight,.01),0)/e,t.timestamp=Math.max(...t.observations.map(t=>t.timestamp)),t.sources=[...new Set(t.observations.map(t=>t.radarId))]}}const ce=t=>"number"==typeof t&&Number.isFinite(t)?t:void 0;function pe(t){let e;try{e=JSON.parse(t)}catch{return}if(!e||"object"!=typeof e)return;const a=e,i=a.f,r=ce(a.ts);if(1!==a.v||"number"!=typeof i&&"string"!=typeof i||null==r)return;if(!Array.isArray(a.t)||a.t.length>32)return;const o=[];for(const t of a.t){let e,a,i,r=0;if(Array.isArray(t)&&t.length>=2&&t.length<=4)e=ce(t[0]),a=ce(t[1]),3===t.length&&(i=ce(t[2])),4===t.length&&(r=ce(t[2])??Number.NaN,i=ce(t[3]));else{if(!t||"object"!=typeof t)return;{const o=t;e=ce(o.x),a=ce(o.y),r=null==o.z?0:ce(o.z)??Number.NaN,i=null==o.speed?void 0:ce(o.speed)}}if(null==e||null==a||!Number.isFinite(r)||Math.max(Math.abs(e),Math.abs(a),Math.abs(r))>1e5)return;0===e&&0===a&&0===r||o.push({x:e,y:a,z:r,speed:null==i?void 0:Math.abs(i)})}return{frameId:String(i),sourceTimestamp:r,targets:o}}const he=(t,e,a)=>({cx:t/a.roomW*a.W,cy:e/a.roomD*a.H}),_e=(t,e,a)=>({x:t/a.W*a.roomW,y:e/a.H*a.roomD});function ue(t,e){const a=e.getBoundingClientRect(),i="touches"in t?t.touches[0].clientX:t.clientX,r="touches"in t?t.touches[0].clientY:t.clientY;return{x:i-a.left,y:r-a.top}}function ge(t,e){const a=window.devicePixelRatio||1,i=t.offsetWidth||400;t.width=i*a,t.height=e*a,t.style.height=`${e}px`;const r=t.getContext("2d");return r.scale(a,a),r}function me(t,e){t.clearRect(0,0,e.W,e.H),t.strokeStyle="rgba(128,128,128,.06)",t.lineWidth=.5;for(let a=0;a<e.W;a+=40)t.beginPath(),t.moveTo(a,0),t.lineTo(a,e.H),t.stroke();for(let a=0;a<e.H;a+=40)t.beginPath(),t.moveTo(0,a),t.lineTo(e.W,a),t.stroke();t.strokeStyle="rgba(255,255,255,.15)",t.lineWidth=1.5,t.strokeRect(1,1,e.W-2,e.H-2);const a=100*Math.round(e.roomW/4/100)||100,i=a/e.roomW*e.W,r=e.H-10,o=e.W-i-8;t.beginPath(),t.moveTo(o,r),t.lineTo(o+i,r),t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.moveTo(o,r-3),t.lineTo(o,r+3),t.moveTo(o+i,r-3),t.lineTo(o+i,r+3),t.stroke(),t.fillStyle="rgba(255,255,255,.45)",t.font="9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillText(`${a}cm`,o+i/2,r-3),t.font="bold 9px system-ui",t.fillStyle="rgba(11,130,92,.6)",t.textAlign="right",t.textBaseline="top",t.fillText("X →",e.W-4,4),t.textAlign="left",t.textBaseline="bottom",t.fillText("Y ↓",4,e.H-4),t.textAlign="left",t.textBaseline="top",t.fillStyle="rgba(255,255,255,.3)",t.fillText("0",4,4),t.textBaseline="alphabetic"}function fe(t,e,a,i=!1){if(e.length<2)return;const r=e.map(t=>he(t.x,t.y,a));t.beginPath(),r.forEach((e,a)=>0===a?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.fillStyle=i?"rgba(11,130,92,.04)":"rgba(11,130,92,.07)",t.fill()),t.strokeStyle=i?"rgba(11,130,92,.22)":"rgba(11,130,92,.55)",t.lineWidth=1.5,t.stroke(),i||r.forEach(e=>{t.beginPath(),t.arc(e.cx,e.cy,3,0,2*Math.PI),t.fillStyle="rgba(11,130,92,.8)",t.fill()})}const ye=[[0,33,102,172],[.35,5,168,170],[.65,240,190,60],[1,214,48,49]];function be(t,e){const a=Math.min(1,Math.max(0,t));let i=ye[0],r=ye[ye.length-1];for(let t=1;t<ye.length;t++)if(a<=ye[t][0]){i=ye[t-1],r=ye[t];break}const o=r[0]-i[0],s=0===o?0:(a-i[0])/o,n=(t,e)=>Math.round(t+(e-t)*s);return`rgba(${n(i[1],r[1])},${n(i[2],r[2])},${n(i[3],r[3])},${e})`}function ve(t,e,a,i,r,o,s,n,l,d){const c=Math.sqrt(l.W/l.roomW*(l.H/l.roomD)),p=t=>Math.max(100*t*c,1),h=o/2*(Math.PI/180),_=Math.PI/2-i*(Math.PI/180),u=Math.max(.05,Math.cos(r*(Math.PI/180))),g=p(s*u),m=p(n*u),f=(i,r,o,s,n=1.2)=>{const l=e+r*Math.cos(_-h),d=a+r*Math.sin(_-h);t.beginPath(),t.moveTo(l,d),t.arc(e,a,r,_-h,_+h,!1),t.arc(e,a,i,_+h,_-h,!0),t.closePath(),t.fillStyle=o,t.fill("evenodd"),t.strokeStyle=s,t.lineWidth=n,t.stroke()};if(null!=d&&d>s&&d<n){const i=p(d*u),r=t.createRadialGradient(e,a,i,e,a,m);r.addColorStop(0,"rgba(11,130,92,.35)"),r.addColorStop(1,"rgba(11,130,92,.08)"),f(i,m,r,"rgba(11,130,92,.60)");const o=t.createRadialGradient(e,a,g,e,a,i);o.addColorStop(0,"rgba(11,130,92,.60)"),o.addColorStop(1,"rgba(11,130,92,.25)"),f(g,i,o,"rgba(11,130,92,.90)",1.5)}else{const i=t.createRadialGradient(e,a,g,e,a,m);i.addColorStop(0,"rgba(11,130,92,.50)"),i.addColorStop(1,"rgba(11,130,92,.12)"),f(g,m,i,"rgba(11,130,92,.75)",1.5)}if(o>0){let i=1;i=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let r=i;r<=n;r+=i){if(r<=s)continue;const i=p(r*u);t.beginPath(),t.arc(e,a,i,_-h,_+h,!1),t.strokeStyle="rgba(255, 255, 255, 0.18)",t.lineWidth=.8,t.setLineDash([3,4]),t.stroke(),t.setLineDash([])}const r=o>=90?15:o>=40?10:15,l=o/2;for(let i=-l;i<=l;i+=r){const r=_+i*(Math.PI/180),o=e+g*Math.cos(r),s=a+g*Math.sin(r),n=e+m*Math.cos(r),l=a+m*Math.sin(r);if(t.beginPath(),t.moveTo(o,s),t.lineTo(n,l),t.strokeStyle=0===i?"rgba(11, 200, 140, 0.5)":"rgba(255, 255, 255, 0.18)",t.lineWidth=0===i?1.2:.8,0!==i&&t.setLineDash([3,4]),t.stroke(),t.setLineDash([]),0!==i){const o=e+(m+14)*Math.cos(r),s=a+(m+14)*Math.sin(r);t.font="bold 9px system-ui",t.fillStyle="rgba(255, 255, 255, 0.85)",t.textAlign="center",t.textBaseline="middle",t.fillText(`${i>0?"+":""}${i}°`,o,s),t.textBaseline="alphabetic"}}}t.beginPath(),t.moveTo(e,a),t.arc(e,a,g,_-h,_+h,!1),t.closePath(),t.fillStyle="rgba(0,0,0,.50)",t.fill(),t.beginPath(),t.arc(e,a,g,_-h,_+h,!1),t.strokeStyle="rgba(244,99,99,.80)",t.lineWidth=1.5,t.setLineDash([3,3]),t.stroke(),t.setLineDash([]);const y=(i,r,o)=>{const s=e+r*Math.cos(_),n=a+r*Math.sin(_),l=`${i}m`;t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle";const d=t.measureText(l).width;t.fillStyle="rgba(10,10,24,.82)",t.beginPath(),t.roundRect?.(s-d/2-3,n-7,d+6,14,3),t.fill(),t.fillStyle=o,t.fillText(l,s,n)};if(o>0){let t=1;t=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let e=t;e<=n;e+=t){if(e<=s)continue;const t=p(e*u),a=Math.abs(e-n)<.01,i=null!=d&&Math.abs(e-d)<.01,r=a?"rgba(27,159,117,.95)":i?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";y(Number(e.toFixed(1)),t,r)}}else{const i=e+g*Math.cos(_),r=a+g*Math.sin(_),o=e+m*Math.cos(_),l=a+m*Math.sin(_);t.beginPath(),t.moveTo(i,r),t.lineTo(o,l),t.strokeStyle="rgba(11, 200, 140, 0.65)",t.lineWidth=1.5,t.setLineDash([4,4]),t.stroke(),t.setLineDash([]);let c=1;c=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let t=c;t<=n;t+=c){if(t<=s)continue;const e=p(t*u),a=Math.abs(t-n)<.01,i=null!=d&&Math.abs(t-d)<.01,r=a?"rgba(27,159,117,.95)":i?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";y(Number(t.toFixed(1)),e,r)}}t.textBaseline="alphabetic",t.beginPath(),t.arc(e,a,9,0,2*Math.PI),t.fillStyle="rgba(10,10,24,.92)",t.fill(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=1.5,t.stroke();for(const[i,r]of[[7,0],[-7,0],[0,7],[0,-7]])t.beginPath(),t.moveTo(e+.3*i,a+.3*r),t.lineTo(e+i,a+r),t.strokeStyle="rgba(11,130,92,.7)",t.lineWidth=1.2,t.stroke()}function xe(t,e,a,i,r="#ff9800"){i?(t.save(),t.beginPath(),t.arc(e,a,9,0,2*Math.PI),t.fillStyle=r,t.globalAlpha=.25,t.fill(),t.restore(),t.beginPath(),t.arc(e,a,5,0,2*Math.PI),t.fillStyle=r,t.fill(),t.strokeStyle="rgba(255,255,255,.6)",t.lineWidth=1.5,t.stroke()):(t.save(),t.setLineDash([2,2]),t.beginPath(),t.arc(e,a,9,0,2*Math.PI),t.strokeStyle=r,t.globalAlpha=.5,t.lineWidth=1.5,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(e,a,4,0,2*Math.PI),t.globalAlpha=.8,t.lineWidth=1.5,t.stroke(),t.restore())}function we(t,e,a,i,r,o,s,n,l){const d=Math.sqrt(n.W/n.roomW*(n.H/n.roomD)),c=Math.max(.05,Math.cos(r*(Math.PI/180))),p=(h=s*c,Math.max(100*h*d,1));var h;const _=o/2*(Math.PI/180),u=Math.PI/2-i*(Math.PI/180);if(l){t.beginPath(),t.arc(e,a,p,u-_,u+_,!1),t.strokeStyle="rgba(255,152,0,.35)",t.lineWidth=6,t.lineCap="round",t.stroke(),t.beginPath(),t.arc(e,a,p,u-_,u+_,!1),t.strokeStyle="var(--accent-color,#ff9800)",t.lineWidth=2.5,t.lineCap="round",t.stroke();const i=e+p*Math.cos(u),r=a+p*Math.sin(u);t.beginPath(),t.arc(i,r,7,0,2*Math.PI),t.fillStyle="rgba(255,152,0,.3)",t.fill(),t.beginPath(),t.arc(i,r,4,0,2*Math.PI),t.fillStyle="var(--accent-color,#ff9800)",t.fill(),t.strokeStyle="rgba(255,255,255,.8)",t.lineWidth=1.2,t.stroke()}else{t.setLineDash([4,4]),t.beginPath(),t.arc(e,a,p,u-_,u+_,!1),t.strokeStyle="rgba(244,67,54,.65)",t.lineWidth=2,t.lineCap="round",t.stroke(),t.setLineDash([]);const i=e+p*Math.cos(u),r=a+p*Math.sin(u);t.beginPath(),t.arc(i,r,4,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.8)",t.lineWidth=1.5,t.stroke()}t.lineCap="butt"}function $e(t,e,a,i,r,o=!1){t.beginPath(),t.arc(e,a,7,0,2*Math.PI),o?(t.strokeStyle=r,t.lineWidth=1.8,t.stroke()):(t.fillStyle=r,t.fill(),t.strokeStyle="rgba(255,255,255,.5)",t.lineWidth=1.2,t.stroke()),t.fillStyle=o?r:"#fff",t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(i,e,a),t.textBaseline="alphabetic"}const ke={en:{card_name:"MMWave Radar HA Card",tabs:{geo:"① Geometry & Boundary",yaw:"② Yaw Calibration",live:"③ Live View"},geo:{install_params:"Installation Parameters (measure with tape)",radar_x:"Radar X",radar_y:"Radar Y",radar_z:"Height",yaw_rough:"Rough Yaw",pitch:"Pitch",roll:"Roll",geo_note:"Origin: top-left corner. X → right. Y ↓ down (toward foot of bed).\nYaw = angle of radar forward axis from Y-axis, clockwise positive.\nPitch/Roll: 0 for horizontal mount; enter tilt angle or read from IMU.",boundary:"Room Boundary (optional)",poly_hint_none:"Click canvas to draw boundary (≥ 3 points)",poly_hint_ok:"Boundary active — {n} vertices",poly_undo:"Undo",poly_clear:"Clear",boundary_note:"No boundary = no filtering. Targets outside the polygon are ignored.",step_1_installation:"Step 1 · Installation",place_the_radar_in_the_room:"Place the radar in the room",drag_the_colored_handles_to_set:"Drag the colored handles to set position, height and orientation.",precise_numeric_adjustment:"Precise numeric adjustment",optional:"Optional",optional_2:"Optional",click_the_top_down_map_to:"Click the top-down map to outline the active detection area.",points:"points",off:"Off",undo_point:"Undo point",click_the_map_to_add_the:"Click the map to add the first point"},yaw:{ref_a_title:"Reference Point A",ref_b_title:"Reference Point B",ref_a_idle:"Click the preview to mark a known position",ref_a_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_a_done:"Captured",ref_b_idle:"Complete point A first",ref_b_step:"Click another known position (> 80 cm from A)",ref_b_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_b_done:"Captured",capture_btn:"Walk to marked position → Capture radar reading",capture_wait:"Waiting for radar data…",result_idle:"Click the preview map to start — mark reference point A",result_ok:"Yaw {yaw}° · Residual {residual} cm",step_2_direction:"Step 2 · Direction",calculate_yaw_from_two_positions:"Calculate yaw from two positions",choose_two_well_separated_places_you:"Choose two well-separated places you can stand, then capture one reading at each.",click_the_map_to_choose_where:"Click the map to choose where to stand",stand_still_while_waiting_for_radar:"Stand still while waiting for radar data…",walk_to_the_marked_position:"Walk to the marked position",i_am_ready_capture_position:"I am ready — capture position",choose_a_position_on_the_map:"Choose a position on the map first",start_over:"Start over"},live:{title:"Room Top-Down View",badge_none:"No presence",badge_present:"Present",badge_filtered:"Outside boundary",model:"Model",ld2450:"HLK-LD2450 (2-D 120° 8m)",ld2454:"HLK-LD2454 (2-D 120° 8m)",rd03e:"RD03E (1-D 8m)",room_x:"Room X (cm)",room_y:"Room Y (cm)",room_z:"Height (cm)",targets:"Targets",step_3_live_test:"Step 3 · Live test",verify_coverage_and_target_trails:"Verify coverage and target trails",walk_through_the_room_and_confirm:"Walk through the room and confirm that target positions and trails match reality.",clear_trails:"Clear trails",waiting_for_a_radar_target:"Waiting for a radar target",detected_targets:"Detected targets",target:"Target",inside:"Inside",outside:"Outside",no_target_data_yet:"No target data yet"},actions:{save:"Save",saved:"Saved ✓",reset:"Reset",reset_confirm:"Clear all calibration data?"},editor:{model:"Radar model",entities:"Entities",presence_entity:"Presence entity",distance_entity:"Distance entity",motion_state_entity:"Motion state entity (optional)",target_state_entity:"Target state entity (optional)",x_entity:"X coordinate entity",y_entity:"Y coordinate entity",z_entity:"Z coordinate entity (optional)",breath_entity:"Breath Entity (Optional)",heart_entity:"Heart Rate Entity (Optional)",sleep_entity:"Sleep State Entity (Optional)",polygon_entity:"Polygon Sync Entity (Optional)",target_frame:"Atomic Target Frame (Optional)",target_1_x:"Target 1 X Entity",target_1_y:"Target 1 Y Entity",target_1_speed:"Target 1 Speed Entity (Optional)",target_2_x:"Target 2 X Entity (Optional)",target_2_y:"Target 2 Y Entity (Optional)",target_2_speed:"Target 2 Speed Entity (Optional)",target_3_x:"Target 3 X Entity (Optional)",target_3_y:"Target 3 Y Entity (Optional)",target_3_speed:"Target 3 Speed Entity (Optional)",room_dimensions:"Room Dimensions",room_w:"Room width (cm)",room_d:"Room depth (cm)",imported_p0_revision_p1:"Imported {p0} (revision {p1})",imported_device_calibration_profile_p0:"Imported device calibration profile: {p0}",saving_device_calibration_profiles:"Saving device calibration profiles…",all_calibrations_were_applied_and_saved:"All calibrations were applied and saved.",operating_mode:"Operating mode",single_radar:"Single radar",multi_radar_fusion:"Multi-radar fusion",multi_radar_fusion_2:"Multi-radar fusion",place_multiple_2_d_radars_in:"Place multiple 2-D radars in one floor-plan coordinate system and sync them to the persistent HA backend.",floor_plan_and_backend:"Floor plan and backend",card_title:"Card title",sync_configuration_to_the_backend_when:"Sync configuration to the backend when an administrator opens the card",radar_devices:"Radar devices",only_radar_models_with_2_d:"Only radar models with 2-D or 3-D positions are shown. Every radar needs a unique ID.",radar_devices_and_installation:"Radar devices and installation",configure_devices_then_place_them:"Switch radars with tabs. The active page combines device binding, installation values and interactive 3-D placement. Adding a radar creates and selects a new tab; every radar needs a unique ID.",radar:"Radar",radar_device:"Radar device",select_device:"Select device",calibration_profile:"Calibration profile",manual_not_linked:"Manual / not linked",device_profile_snapshot:"Device profile snapshot",entity_mapping:"Entity mapping",add_radar:"Add radar",radar_installation_tabs:"Radar installation tabs",interactive_installation:"Interactive installation",select_a_radar_in_the_shared:"Select a radar in the shared room model, then drag the handles to adjust its position, height and orientation. Other radars remain as gray landmarks.",current_tab_controls_form_and_3d:"The active tab keeps its parameter form and 3-D model in sync. Other radars remain as gray landmarks.",joint_multi_radar_calibration:"Joint multi-radar calibration",each_shared_reference_position_captures_every:"Each shared reference position captures every radar and independently solves yaw and X/Y corrections for each device.",fusion_and_recording_rules:"Fusion and recording rules",filter_single_radar_false_alarms_and:"Filter single-radar false alarms and save recordings only for complete, continuous crossings after a track ends.",minimum_supporting_radars:"Minimum supporting radars",merge_distance_cm:"Merge distance (cm)",track_end_delay_s:"Track end delay (s)",recording_score:"Recording score",minimum_duration_s:"Minimum duration (s)",minimum_displacement_cm:"Minimum displacement (cm)",boundary_margin_cm:"Boundary margin (cm)",record_complete_crossings_only:"Record complete crossings only",recording_test:"Recording test",enter_near_one_room_edge_walk:"Enter near one room edge, walk continuously for at least {p0} cm, and leave at another edge. Wait {p1} seconds after leaving radar coverage. A qualified event becomes TRAVERSE and triggers the camera.",event_zones_and_cameras:"Event zones and cameras",draw_polygon_vertices_on_the_floor:"Draw polygon vertices on the floor plan. Saved zones are synchronized to the fusion backend.",mmwave_radar_card:"MMWave radar card",choose_a_radar_device_to_match:"Choose a radar device to match entities automatically, then confirm the room size.",basics:"Basics",card_title_2:"Card title",presence_radar:"Presence radar",connect_radar_device:"Connect radar device",select_the_radar_from_home_assistant:"Select the radar from Home Assistant and the card will identify the required entities.",radar_device_2:"Radar device",detecting_device_entities:"Detecting device entities…",matched_p0_configuration_fields:"Matched {p0} configuration fields",automatic_detection_failed_configure_entities_manually:"Automatic detection failed. Configure entities manually below.",enter_the_room_dimensions_used_by:"Enter the room dimensions used by the 3D placement and target map.",advanced_assign_entities_manually:"Advanced: assign entities manually",troubleshooting:"Troubleshooting",fusion_rate_hz:"Fusion rate (Hz)",fusion_rate_hz_help:"How often positions are computed. Higher is smoother and costs more CPU. It does not change how much is stored — that is the trajectory quality setting persist_interval_s, which saves one position per track every half second by default.",association_distance_cm:"Association distance (cm)",association_distance_cm_help:"How far a target may move between frames and still be treated as the same person. Too small splits one person into several tracks; too large merges two people into one.",confirm_hits:"Frames before a track is published",confirm_hits_help:"Raising this suppresses brief false targets at the cost of a slower first detection."},"model.ld2452":"HLK-LD2452 (2D 120° 6m)",entity_aliases:{distance:["distance"],motion_state:["motion state","motion_state","target state","target_state"],polygon:["polygon","boundary"]},card:{syncing:"Syncing…",synced:"Synced",sync_failed:"Sync failed",sync_to_device:"Sync to device",installation:"Installation",place_the_radar_in_the_3d:"Place the radar in the 3D room",direction:"Direction",calibrate_yaw_with_two_reference_points:"Calibrate yaw with two reference points",live_test:"Live test",verify_targets_boundary_and_trails:"Verify targets, boundary and trails",presence_radar:"Presence radar",p0_target_p1:"{p0} target{p1}",outside:"Outside",clear:"Clear",open_calibration:"Open calibration",open_calibration_2:"Open calibration",back_to_radar_view:"Back to radar view",back_to_radar_view_2:"Back to radar view",radar_spatial_calibration:"Radar spatial calibration",calibration_steps:"Calibration steps",revert:"Revert",reset:"Reset",back:"Back",continue:"Continue",multi_radar_fusion:"Multi-radar fusion",p0_p1_radars_p2:"{p0}/{p1} radars · {p2}",p0_targets:"{p0} targets",clear_2:"Clear",trajectory_quality:"Trajectory quality",no_playable_clip_is_available_yet:"No playable clip is available yet, or recording is still in progress."},fusion:{filtered:"Filtered",clip_failed:"Clip failed",recording:"Recording",key_track:"Key track",backend_fusion:"Backend fusion",local_fallback:"Local fallback",backend_error:"Backend error",connecting:"Connecting",hide_coverage:"Hide coverage",show_coverage:"Show coverage",radars_online:"radars online",calibration_warning:"Calibration warning",fused_targets:"Fused targets",recent_events:"Recent events",integration_missing:"Fusion integration not installed",integration_missing_help:"Multi-radar fusion needs the separate mmwave-fusion integration (experimental). Without it the card fuses in the browser only: no stored trajectories, no events, no recordings.",integration_outdated:"Fusion integration is outdated",show_heatmap:"Heatmap",hide_heatmap:"Hide heatmap",window_hour:"1 h",window_day:"24 h",window_week:"7 d",heatmap_rare:"Rare",heatmap_frequent:"Frequent",heatmap_loading:"Reading stored trajectories…",heatmap_summary:"{points} points · {bin} cm cells",heatmap_truncated:"busiest cells only",heatmap_failed:"Heatmap query failed",heatmap_needs_newer_backend:"The heatmap needs a newer mmwave-fusion integration",show_replay:"Replay",hide_replay:"Hide replay",window_5min:"5 min",window_6h:"6 h",replay_loading:"Reading stored tracks…",replay_empty:"Nothing was recorded in this window",replay_summary:"{tracks} tracks · {points} points",replay_thinned:"thinned to {hz} Hz",replay_failed:"Replay query failed",replay_needs_newer_backend:"Replay needs a newer mmwave-fusion integration"},fusioncal:{capturing_all_radars_synchronously:"Capturing all radars synchronously…",no_radar_produced_enough_stable_samples:"No radar produced enough stable samples. Try again.",captured_p0_p1_radars:"Captured {p0}/{p1} radars.",joint_direction_calibration:"Joint direction calibration",calibrate_every_radar_from_shared_positions:"Calibrate every radar from shared positions",keep_only_one_test_person_in:"Keep only one test person in the room and follow the blue recommended areas. Gray is uncollected; each colored segment means that radar has captured the area.",mobile_calibration:"Mobile calibration",mobile_calibration_hint:"Use the focused view to keep guidance and capture controls visible.",enter_mobile_calibration:"Start",exit_mobile_calibration:"Exit",guided_capture_floor_plan:"Guided joint-calibration floor plan",pending_x_p0_y_p1_cm:"Pending: X {p0} / Y {p1} cm",click_the_floor_plan_to_choose:"Click the floor plan to choose the next reference position",tap_a_guided_region:"Tap one of the guided capture areas.",move_to_region_p0:"Move to blue area {p0}",stand_near_center_then_hold_still:"Stand near its center (X {p0} / Y {p1} cm) and hold still. This area has {p2}/{p3} radars captured.",tap_another_region_or_follow_recommendation:"Tap another circle or continue with the blue recommendation",capturing_region_p0:"Capturing area {p0} from all radars…",region_p0_captured_p1_p2_radars:"Area {p0} captured {p1}/{p2} radars. The next area is now recommended.",p0_p1_samples:"{p0}/{p1} samples",p0_reference_points:"{p0} reference points",capturing:"Capturing…",capturing_p0_percent:"Capturing… {p0}%",capturing_p0_percent_p1_p2_radars_ready:"Capturing {p0}% · {p1}/{p2} radars have stable samples. Hold still.",i_am_ready_capture_all:"I am ready — capture all",p0_p1_regions_captured:"{p0}/{p1} areas captured",p0_p1_radars_ready_short:"{p0}/{p1} radars ready",show_capture_details:"Show details",hide_capture_details:"Hide details",radars:"radars",points:"points",not_enough_references:"Not enough references",span_p0_cm:"span {p0} cm",review_installation_parameters:"Review the indicated radar installations",review_p0_radars_before_retrying:"{p0} did not pass calibration. Compare the current values, fitted reference and suggested adjustment below, then correct them manually under Radar devices and installation before capturing again.",xy_yaw_only_manual_note:"Joint calibration estimates only X, Y and yaw. Confirm radar_z, pitch and roll from the physical installation. A rejected fit is diagnostic only and is never written to the configuration.",calibration_reference_accepted:"Reference accepted",installation_needs_review:"Review installation",current_installation:"Current installation",fitted_reference:"Fitted reference",suggested_manual_adjustment:"Suggested manual adjustment",quality_not_enough_points:"Only {p0} valid points; this reference has low confidence.",quality_span_too_small:"The capture span is only {p0} cm; this reference has low confidence.",quality_residual_too_high:"The fitted residual of {p0} cm exceeds {p1} cm. Check the installation and outlier captures first; do not copy this reference directly.",quality_reference_outside_room:"The fitted installation is outside the room. Check the coordinate origin, direction and physical installation.",quality_reference_accepted:"The fitted residual is {p0} cm; this reference can be reviewed or applied.",p0_p1_radars_ready:"{p0}/{p1} radars meet the 3-point, span and residual requirements",start_over:"Start over",apply_all_calibrations:"Apply all calibrations",need_3_points_120_cm_span:"Each radar needs 3 points, 120 cm span and residual ≤ 40 cm"},zone:{zone_p0:"Zone {p0}",zone_id_cannot_be_empty:"Zone ID cannot be empty",zone_id_must_be_unique:"Zone ID must be unique",at_least_three_vertices_are_required:"At least three vertices are required",new_zone:"New zone",floor_plan_event_zone_editor:"Floor-plan event zone editor",name:"Name",dwell_seconds:"Dwell seconds",vertices:"vertices",undo_point:"Undo point",clear:"Clear",delete_zone:"Delete zone",cancel:"Cancel",save_zone:"Save zone",select_or_create_a_zone_then:"Select or create a zone, then click its vertices on the floor plan."},fusion_reason:{insufficient_observations:"Too few observations",too_short:"Too short",too_few_observations:"Too few valid points",insufficient_displacement:"Insufficient displacement",discontinuous_observations:"Discontinuous",mostly_outside_room:"Mostly outside room",observation_gap:"Observation gap",trajectory_jump:"Trajectory jump",incomplete_crossing:"Incomplete crossing",unstable_boundary_crossing:"Unstable crossing",below_score_threshold:"Below score threshold"},install3d:{yaw:"Yaw",pitch:"Pitch",roll:"Roll",vertical_fov_is_not_specified_showing:"Vertical FOV is not specified; showing a conservative estimate",nominal_scan_volume_from_the_model:"Nominal scan volume from the model manual",scan_volume:"Scan volume",drag_the_colored_handles_to_position:"Drag the colored handles to position and orient the radar",model_scan_range:"Model scan range",position_x_y:"Position X/Y",height:"Height",yaw_2:"Yaw",pitch_2:"Pitch",roll_2:"Roll"}},"zh-Hans":{card_name:"毫米波雷达校准卡片",tabs:{geo:"① 几何 & 边界",yaw:"② 偏航校准",live:"③ 实时验证"},geo:{install_params:"安装参数（卷尺测量后填入）",radar_x:"雷达 X",radar_y:"雷达 Y",radar_z:"安装高度",yaw_rough:"粗略偏航",pitch:"俯仰角",roll:"横滚角",geo_note:"坐标原点为预览图左上角，X 向右，Y 向下（从床头到床尾方向为正）。\n偏航角 = 雷达正前方相对 Y 轴（向下）的夹角，顺时针为正。\nPitch/Roll：水平安装填 0；有倾斜时填实测值或接入 IMU 传感器后自动读取。",boundary:"房间边界过滤（可选）",poly_hint_none:"点击画布添加顶点，绘制有效区域（≥ 3 个点）",poly_hint_ok:"边界过滤已启用 — {n} 个顶点",poly_undo:"撤销",poly_clear:"清除",boundary_note:"不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。",step_1_installation:"步骤 1 · 安装定位",place_the_radar_in_the_room:"在房间中放置雷达",drag_the_colored_handles_to_set:"拖拽 3D 模型上的彩色控制柄，直观调整安装位置、高度和朝向。",precise_numeric_adjustment:"精确数值调整",optional:"可选",optional_2:"可选设置",click_the_top_down_map_to:"在俯视图中点击，依次勾画实际有效检测区域。",points:"个点",off:"未启用",undo_point:"撤销一点",click_the_map_to_add_the:"点击地图添加第一个边界点"},yaw:{ref_a_title:"参考点 A",ref_b_title:"参考点 B",ref_a_idle:"在预览图上点击一个你能走到的已知位置",ref_a_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_a_done:"捕获完成",ref_b_idle:"完成 A 点后操作",ref_b_step:"点击另一个已知位置（与 A 距离 > 80 cm）",ref_b_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_b_done:"捕获完成",capture_btn:"走到标记位置后 → 点此捕获雷达读数",capture_wait:"等待雷达数据…",result_idle:"在预览图上点击参考点 A 开始校准",result_ok:"偏航角 {yaw}° · 残差 {residual} cm",step_2_direction:"步骤 2 · 方向校准",calculate_yaw_from_two_positions:"用两个位置自动计算偏航",choose_two_well_separated_places_you:"依次选择两个相距较远且方便站立的位置，雷达会自动完成方向校准。",click_the_map_to_choose_where:"点击地图选择站立位置",stand_still_while_waiting_for_radar:"保持站立，正在等待雷达数据…",walk_to_the_marked_position:"请走到已标记的位置",i_am_ready_capture_position:"我已站好，捕获雷达位置",choose_a_position_on_the_map:"请先在地图上选择位置",start_over:"重新校准"},live:{title:"房间俯视图",badge_none:"无人",badge_present:"有人",badge_filtered:"边界外",model:"雷达型号",ld2450:"HLK-LD2450 (二维 120° 8米)",ld2454:"HLK-LD2454 (二维 120° 8米)",rd03e:"RD03E (一维 8米)",room_x:"房间 X (cm)",room_y:"房间 Y (cm)",room_z:"离地高度 (cm)",targets:"目标数",step_3_live_test:"步骤 3 · 实时验证",verify_coverage_and_target_trails:"确认检测区域与目标轨迹",walk_through_the_room_and_confirm:"在房间内走动，检查每个目标的颜色、位置和轨迹是否符合实际。",clear_trails:"清除轨迹",waiting_for_a_radar_target:"等待雷达检测到目标",detected_targets:"检测目标",target:"目标",inside:"有效",outside:"边界外",no_target_data_yet:"当前没有目标数据"},actions:{save:"保存",saved:"已保存 ✓",reset:"重置",reset_confirm:"清除所有校准数据？"},editor:{model:"雷达型号",entities:"实体配置",presence_entity:"存在感知实体",distance_entity:"距离实体",motion_state_entity:"运动状态实体（可选）",target_state_entity:"目标状态实体（可选）",x_entity:"X 坐标实体",y_entity:"Y 坐标实体",z_entity:"Z 坐标实体（可选）",breath_entity:"呼吸频率实体（可选）",heart_entity:"心率实体（可选）",sleep_entity:"睡眠状态实体（可选）",polygon_entity:"多边形同步实体（可选）",target_frame:"原子目标帧实体（可选）",target_1_x:"目标 1 X 实体",target_1_y:"目标 1 Y 实体",target_1_speed:"目标 1 速度实体（可选）",target_2_x:"目标 2 X 实体（可选）",target_2_y:"目标 2 Y 实体（可选）",target_2_speed:"目标 2 速度实体（可选）",target_3_x:"目标 3 X 实体（可选）",target_3_y:"目标 3 Y 实体（可选）",target_3_speed:"目标 3 速度实体（可选）",room_dimensions:"房间尺寸",room_w:"房间宽度 (cm)",room_d:"房间深度 (cm)",imported_p0_revision_p1:"已导入 {p0}（版本 {p1}）",imported_device_calibration_profile_p0:"已自动导入设备校准档案：{p0}",saving_device_calibration_profiles:"正在保存设备校准档案…",all_calibrations_were_applied_and_saved:"全部校准已应用并保存。",operating_mode:"运行模式",single_radar:"单雷达",multi_radar_fusion:"多雷达融合",multi_radar_fusion_2:"多雷达融合",place_multiple_2_d_radars_in:"把多台二维定位雷达放入统一户型坐标系，并同步到持续运行的 HA 后端。",floor_plan_and_backend:"户型与后端",card_title:"卡片标题",sync_configuration_to_the_backend_when:"管理员打开卡片时自动同步配置到后端",radar_devices:"雷达设备",only_radar_models_with_2_d:"只显示可输出二维或三维位置的雷达型号。每台雷达必须使用唯一 ID。",radar_devices_and_installation:"雷达设备与安装定位",configure_devices_then_place_them:"通过 TAB 切换雷达；当前页集中显示设备绑定、安装参数和交互式 3D 定位。添加雷达会创建并选中一个新 TAB，每台雷达必须使用唯一 ID。",radar:"雷达",radar_device:"雷达设备",select_device:"选择设备",calibration_profile:"校准档案",manual_not_linked:"手工配置 / 未绑定",device_profile_snapshot:"设备档案快照",entity_mapping:"实体映射",add_radar:"添加雷达",radar_installation_tabs:"雷达安装配置页",interactive_installation:"交互式安装定位",select_a_radar_in_the_shared:"在同一房间模型中选择雷达，并拖动彩色控制柄调整位置、高度和姿态。其他雷达会作为灰色参照保留。",current_tab_controls_form_and_3d:"当前 TAB 的参数表单与 3D 模型保持同步；其他雷达作为灰色参照保留。",joint_multi_radar_calibration:"多雷达联合方向校准",each_shared_reference_position_captures_every:"同一个参考位置会同步采集全部雷达，并为每台设备独立计算 yaw 与 X/Y 修正。",fusion_and_recording_rules:"融合与录像规则",filter_single_radar_false_alarms_and:"过滤单雷达误报，并在轨迹结束后只为完整、连续的穿越轨迹保存录像。",minimum_supporting_radars:"最少支持雷达数",merge_distance_cm:"融合距离 (cm)",track_end_delay_s:"轨迹结束等待 (s)",recording_score:"录像最低评分",minimum_duration_s:"最短持续时间 (s)",minimum_displacement_cm:"最短位移 (cm)",boundary_margin_cm:"边界判定范围 (cm)",record_complete_crossings_only:"只保存完整穿越轨迹",recording_test:"录像测试方法",enter_near_one_room_edge_walk:"从房间一侧边缘进入，连续行走至少 {p0} cm 并从另一侧边缘离开；离开雷达范围后等待 {p1} 秒。合格事件会由 TRAJECTORY 变为 TRAVERSE 并触发摄像头。",event_zones_and_cameras:"事件区域与摄像头",draw_polygon_vertices_on_the_floor:"在户型图上点击添加区域顶点，保存后同步到融合后端。",mmwave_radar_card:"毫米波雷达卡片",choose_a_radar_device_to_match:"选择雷达设备后自动完成实体匹配，只需确认房间尺寸即可开始。",basics:"基本信息",card_title_2:"卡片标题",presence_radar:"人体存在雷达",connect_radar_device:"连接雷达设备",select_the_radar_from_home_assistant:"从 Home Assistant 设备列表中选择雷达，卡片会自动识别所需实体。",radar_device_2:"雷达设备",detecting_device_entities:"正在识别设备实体…",matched_p0_configuration_fields:"已自动匹配 {p0} 个配置项",automatic_detection_failed_configure_entities_manually:"自动识别失败，请展开高级选项手动配置。",enter_the_room_dimensions_used_by:"填写房间实际尺寸，后续 3D 安装定位和轨迹显示会使用此比例。",advanced_assign_entities_manually:"高级选项：手动指定实体",troubleshooting:"故障排查",fusion_rate_hz:"融合频率（Hz）",fusion_rate_hz_help:"计算位置的频率。越高轨迹越平滑，CPU 开销也越大。它不影响存储量——决定存储量的是轨迹质量选项 persist_interval_s，默认每条轨迹每半秒存一个点。",association_distance_cm:"关联距离（厘米）",association_distance_cm_help:"目标在相邻帧之间移动多远仍算同一个人。过小会把一个人拆成多条轨迹，过大会把两个人并成一条。",confirm_hits:"确认帧数",confirm_hits_help:"调高可抑制瞬时误报，代价是首次检出变慢。"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)",entity_aliases:{distance:["距离"],motion_state:["运动状态","目标状态"],polygon:["多边形","边界"]},card:{syncing:"正在同步…",synced:"已同步",sync_failed:"同步失败",sync_to_device:"同步到设备",installation:"安装定位",place_the_radar_in_the_3d:"在 3D 房间中放置雷达",direction:"方向校准",calibrate_yaw_with_two_reference_points:"通过两个参考点校准偏航",live_test:"实时验证",verify_targets_boundary_and_trails:"检查目标、边界和运动轨迹",presence_radar:"人体存在雷达",p0_target_p1:"{p0} 个目标",outside:"边界外",clear:"无人",open_calibration:"打开校准",open_calibration_2:"打开校准",back_to_radar_view:"返回雷达视图",back_to_radar_view_2:"返回雷达视图",radar_spatial_calibration:"雷达空间校准",calibration_steps:"校准步骤",revert:"撤销修改",reset:"恢复默认",back:"上一步",continue:"下一步",multi_radar_fusion:"多雷达融合",p0_p1_radars_p2:"{p0}/{p1} 台雷达 · {p2}",p0_targets:"{p0} 个目标",clear_2:"无人",trajectory_quality:"轨迹质量",no_playable_clip_is_available_yet:"该事件没有可播放片段，或录像仍在生成。"},fusion:{filtered:"已过滤",clip_failed:"录像失败",recording:"录像中",key_track:"关键轨迹",backend_fusion:"后端融合",local_fallback:"本地降级",backend_error:"后端异常",connecting:"正在连接",hide_coverage:"隐藏覆盖",show_coverage:"显示覆盖",radars_online:"雷达在线",calibration_warning:"安装校准异常",fused_targets:"融合目标",recent_events:"最近事件",integration_missing:"未安装融合集成",integration_missing_help:"多雷达融合需要额外安装 mmwave-fusion 集成（实验性）。未安装时卡片仅在浏览器内做临时融合：不保存轨迹、不产生事件、不触发录像。",integration_outdated:"融合集成版本过旧",show_heatmap:"热力图",hide_heatmap:"隐藏热力图",window_hour:"1 小时",window_day:"24 小时",window_week:"7 天",heatmap_rare:"少",heatmap_frequent:"多",heatmap_loading:"正在读取历史轨迹…",heatmap_summary:"{points} 个点 · {bin} 厘米网格",heatmap_truncated:"仅显示最密集的网格",heatmap_failed:"热力图查询失败",heatmap_needs_newer_backend:"热力图需要更新版本的 mmwave-fusion 集成",show_replay:"回放",hide_replay:"隐藏回放",window_5min:"5 分钟",window_6h:"6 小时",replay_loading:"正在读取历史轨迹…",replay_empty:"这段时间内没有任何记录",replay_summary:"{tracks} 条轨迹 · {points} 个点",replay_thinned:"已抽稀至 {hz} Hz",replay_failed:"回放查询失败",replay_needs_newer_backend:"回放需要更新版本的 mmwave-fusion 集成"},fusioncal:{capturing_all_radars_synchronously:"正在同步采集所有雷达…",no_radar_produced_enough_stable_samples:"没有雷达获得足够的稳定样本，请重试。",captured_p0_p1_radars:"已采集 {p0}/{p1} 台雷达。",joint_direction_calibration:"联合方向校准",calibrate_every_radar_from_shared_positions:"用多个位置同时校准全部雷达",keep_only_one_test_person_in:"保持空间内只有一名测试人员。按蓝色推荐区域依次采集；灰色代表未采集，彩色分段代表对应雷达已采集。",mobile_calibration:"移动校准",mobile_calibration_hint:"进入专注界面后，区域指引和采集按钮会始终可见。",enter_mobile_calibration:"开始",exit_mobile_calibration:"退出",guided_capture_floor_plan:"联合方向校准引导地图",pending_x_p0_y_p1_cm:"待采集：X {p0} / Y {p1} cm",click_the_floor_plan_to_choose:"点击户型图选择下一个参考位置",tap_a_guided_region:"请点击一个引导采集区域。",move_to_region_p0:"请移动到蓝色区域 {p0}",stand_near_center_then_hold_still:"站到圆心附近（X {p0} / Y {p1} cm），保持静止；该区域已采集 {p2}/{p3} 台雷达。",tap_another_region_or_follow_recommendation:"可点击其他圆形区域，或按当前蓝色推荐继续",capturing_region_p0:"正在同步采集区域 {p0}…",region_p0_captured_p1_p2_radars:"区域 {p0} 已采集 {p1}/{p2} 台雷达，已自动推荐下一区域。",p0_p1_samples:"{p0}/{p1} 样本",p0_reference_points:"{p0} 个参考点",capturing:"正在采集…",capturing_p0_percent:"正在采集… {p0}%",capturing_p0_percent_p1_p2_radars_ready:"正在采集 {p0}% · {p1}/{p2} 台雷达已获得稳定样本，请保持静止。",i_am_ready_capture_all:"我已站好，同步采集",p0_p1_regions_captured:"已采集 {p0}/{p1} 个区域",p0_p1_radars_ready_short:"{p0}/{p1} 台雷达达标",show_capture_details:"查看详情",hide_capture_details:"收起详情",radars:"台雷达",points:"点",not_enough_references:"参考点不足",span_p0_cm:"跨度 {p0} cm",review_installation_parameters:"请核对指定雷达的安装参数",review_p0_radars_before_retrying:"{p0} 未通过校准。请比较下方当前值、拟合参考和建议调整量，在上方“雷达设备与安装定位”中手动修正后重新采集。",xy_yaw_only_manual_note:"联合校准只能估算 X、Y 和 yaw；radar_z、pitch、roll 仍需按实际安装手动确认。拟合未通过时，参考值仅用于排查，不会自动写入配置。",calibration_reference_accepted:"参考可信",installation_needs_review:"需核对安装",current_installation:"当前安装参数",fitted_reference:"拟合参考值",suggested_manual_adjustment:"建议手动调整量",quality_not_enough_points:"只有 {p0} 个有效点，参考可信度低。",quality_span_too_small:"采集跨度只有 {p0} cm，参考可信度低。",quality_residual_too_high:"拟合残差 {p0} cm 超过 {p1} cm；请先核对安装参数和异常采集点，不要直接套用参考值。",quality_reference_outside_room:"拟合安装位置超出户型边界，参考可信度低；请核对坐标原点、方向和安装位置。",quality_reference_accepted:"拟合残差 {p0} cm，参考值可用于核对或应用。",p0_p1_radars_ready:"{p0}/{p1} 台雷达达到 3 点、跨度和残差要求",start_over:"重新采集",apply_all_calibrations:"应用全部校准",need_3_points_120_cm_span:"每台雷达需 3 点、跨度 120 cm 且残差 ≤ 40 cm"},zone:{zone_p0:"区域 {p0}",zone_id_cannot_be_empty:"区域 ID 不能为空",zone_id_must_be_unique:"区域 ID 必须唯一",at_least_three_vertices_are_required:"至少需要 3 个顶点",new_zone:"新建区域",floor_plan_event_zone_editor:"事件区域户型编辑器",name:"名称",dwell_seconds:"驻留秒数",vertices:"个顶点",undo_point:"撤销顶点",clear:"清空",delete_zone:"删除区域",cancel:"取消",save_zone:"保存区域",select_or_create_a_zone_then:"选择已有区域或新建区域，然后在户型图上依次点击顶点。"},fusion_reason:{insufficient_observations:"观测不足",too_short:"持续时间不足",too_few_observations:"有效点不足",insufficient_displacement:"位移不足",discontinuous_observations:"轨迹不连续",mostly_outside_room:"大部分在房间外",observation_gap:"观测中断",trajectory_jump:"轨迹跳变",incomplete_crossing:"未完整穿越",unstable_boundary_crossing:"边界反复跳变",below_score_threshold:"质量分不足"},install3d:{yaw:"偏航",pitch:"俯仰",roll:"横滚",vertical_fov_is_not_specified_showing:"说明书未标注垂直视场角，当前为保守示意值",nominal_scan_volume_from_the_model:"型号说明书标称扫描范围",scan_volume:"扫描空间",drag_the_colored_handles_to_position:"拖拽彩色控制柄直接调整安装位置与姿态",model_scan_range:"型号扫描范围",position_x_y:"位置 X/Y",height:"高度",yaw_2:"偏航",pitch_2:"俯仰",roll_2:"横滚"}}};function Me(t,e,a){const i=e??navigator.language?.split("-")[0]??"en",r=ke[e??""]??Object.entries(ke).find(([t])=>t.startsWith(i))?.[1]??ke.en;let o=r;for(const e of t.split("."))if(o=o?.[e],void 0===o)break;if("string"!=typeof o){let e=ke.en;for(const a of t.split("."))if(e=e?.[a],void 0===e)break;o=e}return"string"!=typeof o?t:a?o.replace(/\{(\w+)\}/g,(t,e)=>e in a?String(a[e]):t):o}const Se=B`
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
`,Re="mmwave-card",ze="mmwave-card-editor",Ce=15e3,Ae={position:"#03a9f4",height:"#00a878",yaw:"#ff9800",pitch:"#7e57c2",roll:"#ec407a"},De=(t,e,a)=>Math.min(a,Math.max(e,t)),Ee=t=>t*Math.PI/180,Te=(t,e)=>Math.round(t/e)*e;let qe=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.peerCalibrations=[],this._handles=new Map,this._drawRaf=0}_t(t,e){return Me(t,this.lang,e)}get _verticalFovDegrees(){return this.adapter?.info.verticalFovDegrees??Math.min(this.adapter?.info.fovDegrees??60,60)}get _isVerticalFovEstimated(){return null==this.adapter?.info.verticalFovDegrees}firstUpdated(){this._cv&&(this._resizeObserver=new ResizeObserver(()=>this._scheduleDraw()),this._resizeObserver.observe(this._cv)),this._scheduleDraw()}updated(){this._scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),cancelAnimationFrame(this._drawRaf)}_scheduleDraw(){cancelAnimationFrame(this._drawRaf),this._drawRaf=requestAnimationFrame(()=>this._draw())}_scene(){const t=this._cv?.offsetWidth||420,e=De(Math.round(.7*t),260,330);return{W:t,H:e,floorW:Math.max(180,t-72),floorH:Math.min(104,.32*e),floorTop:.48*e,verticalH:.36*e,roomW:this.calibration?.room_w??this.roomW,roomD:this.calibration?.room_d??this.roomD,zMax:400}}_project(t,e){const a=t.x/e.roomW,i=t.y/e.roomD,r=t.z/e.zMax;return{x:e.W/2+(a-i)*(e.floorW/2),y:e.floorTop+(a+i)*(e.floorH/2)-r*e.verticalH}}_unproject(t,e,a){const i=(t.x-a.W/2)/(a.floorW/2),r=(t.y+e/a.zMax*a.verticalH-a.floorTop)/(a.floorH/2);return{x:(i+r)/2*a.roomW,y:(r-i)/2*a.roomD}}_polygon(t,e){t.beginPath(),e.forEach((e,a)=>0===a?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)),t.closePath()}_line(t,e,a){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(a.x,a.y),t.stroke()}_drawHandle(t,e,a,i){this._handles.set(e,a),t.save(),t.shadowColor=Ae[e],t.shadowBlur=this._drag?.mode===e?14:7,t.beginPath(),t.arc(a.x,a.y,this._drag?.mode===e?9:7,0,2*Math.PI),t.fillStyle=Ae[e],t.fill(),t.shadowBlur=0,t.strokeStyle="#fff",t.lineWidth=1.5,t.stroke(),t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillStyle=Ae[e],t.fillText(i,a.x,a.y-11),t.restore()}_draw(){const t=this._cv;if(!t||!this.calibration||0===t.offsetWidth)return;const e=this._scene(),a=ge(t,e.H),i=getComputedStyle(this),r=i.getPropertyValue("--primary-text-color").trim()||"#374151",o=i.getPropertyValue("--secondary-text-color").trim()||"#6b7280",s=this.calibration,n=[this._project({x:0,y:0,z:0},e),this._project({x:e.roomW,y:0,z:0},e),this._project({x:e.roomW,y:e.roomD,z:0},e),this._project({x:0,y:e.roomD,z:0},e)],l=[this._project({x:0,y:0,z:e.zMax},e),this._project({x:e.roomW,y:0,z:e.zMax},e)];a.clearRect(0,0,e.W,e.H),this._handles.clear(),a.save(),this._polygon(a,[n[0],n[1],l[1],l[0]]),a.fillStyle="rgba(3,169,244,.035)",a.fill(),this._polygon(a,[n[0],n[3],this._project({x:0,y:e.roomD,z:e.zMax},e),l[0]]),a.fillStyle="rgba(11,130,92,.035)",a.fill(),a.restore(),this._polygon(a,n),a.fillStyle="rgba(11,130,92,.09)",a.fill(),a.strokeStyle="rgba(11,130,92,.55)",a.lineWidth=1.4,a.stroke(),a.save(),a.strokeStyle=o,a.globalAlpha=.14,a.lineWidth=.8;for(let t=.25;t<1;t+=.25)this._line(a,this._project({x:e.roomW*t,y:0,z:0},e),this._project({x:e.roomW*t,y:e.roomD,z:0},e)),this._line(a,this._project({x:0,y:e.roomD*t,z:0},e),this._project({x:e.roomW,y:e.roomD*t,z:0},e));a.restore(),a.save(),a.strokeStyle=o,a.globalAlpha=.25,a.setLineDash([3,4]);for(const t of[{x:0,y:0},{x:e.roomW,y:0},{x:0,y:e.roomD}])this._line(a,this._project({...t,z:0},e),this._project({...t,z:e.zMax},e));a.restore(),a.font="bold 10px system-ui",a.fillStyle=o,a.fillText("X",n[1].x+8,n[1].y+2),a.fillText("Y",n[3].x-14,n[3].y+2),a.fillText("Z",l[0].x-13,l[0].y-2);for(const t of this.peerCalibrations){const i=this._project({x:t.calibration.radar_x,y:t.calibration.radar_y,z:t.calibration.radar_z},e),r=Ee(t.calibration.yaw),s=this._project({x:t.calibration.radar_x+45*Math.sin(r),y:t.calibration.radar_y+45*Math.cos(r),z:t.calibration.radar_z},e);a.save(),a.globalAlpha=.48,a.strokeStyle=o,a.fillStyle=o,a.lineWidth=1.2,this._line(a,i,s),a.beginPath(),a.arc(i.x,i.y,4,0,2*Math.PI),a.fill(),a.font="bold 9px system-ui",a.textAlign="center",a.fillText(t.id,i.x,i.y-9),a.restore()}const d=this._project({x:s.radar_x,y:s.radar_y,z:0},e),c=this._project({x:s.radar_x,y:s.radar_y,z:s.radar_z},e),p=Ee(s.yaw),h=Ee(s.pitch),_=Ee(s.roll),u=Math.sin(p)*Math.cos(h),g=Math.cos(p)*Math.cos(h),m=-Math.sin(h),f=Math.cos(p),y=-Math.sin(p),b=0,v=-Math.sin(p)*Math.sin(h),x=-Math.cos(p)*Math.sin(h),w=-Math.cos(h),$=f*Math.cos(_)+v*Math.sin(_),k=y*Math.cos(_)+x*Math.sin(_),M=b*Math.cos(_)+w*Math.sin(_),S=v*Math.cos(_)-f*Math.sin(_),R=x*Math.cos(_)-y*Math.sin(_),z=w*Math.cos(_)-b*Math.sin(_);a.save(),a.strokeStyle=Ae.height,a.globalAlpha=.55,a.setLineDash([4,4]),a.lineWidth=1.5,this._line(a,d,c),a.restore(),a.save(),a.translate(d.x,d.y),a.scale(1,.42),a.beginPath(),a.arc(0,0,12,0,2*Math.PI),a.fillStyle="rgba(3,169,244,.14)",a.fill(),a.restore();const C=this.maxRangeM??this.adapter?.info.maxRangeM??3,A=Math.min(100*C,.58*Math.max(e.roomW,e.roomD)),D=Ee((this.adapter?.info.fovDegrees??60)/2),E=Ee(this._verticalFovDegrees/2),T=(t,a,i=A)=>{const r=Math.cos(a),o=u*Math.cos(t)*r+$*Math.sin(t)*r+S*Math.sin(a),n=g*Math.cos(t)*r+k*Math.sin(t)*r+R*Math.sin(a),l=m*Math.cos(t)*r+M*Math.sin(t)*r+z*Math.sin(a);return this._project({x:s.radar_x+o*i,y:s.radar_y+n*i,z:De(s.radar_z+l*i,0,e.zMax)},e)},q=t=>Array.from({length:19},(e,a)=>T(a/18*D*2-D,t)),P=t=>Array.from({length:9},(e,a)=>T(t,a/8*E*2-E)),H=q(-E),F=q(0),W=q(E),N=P(-D),L=P(D);a.save(),this._polygon(a,[c,...H]),a.fillStyle="rgba(3,169,244,.055)",a.fill(),this._polygon(a,[c,...W]),a.fillStyle="rgba(11,130,92,.055)",a.fill(),this._polygon(a,[c,...N]),a.fillStyle="rgba(3,169,244,.04)",a.fill(),this._polygon(a,[c,...L]),a.fill(),a.strokeStyle="rgba(3,169,244,.25)",a.lineWidth=.8;for(let t=0;t<=18;t+=3)this._line(a,H[t],W[t]);for(const t of[H,W,N,L])a.beginPath(),t.forEach((t,e)=>0===e?a.moveTo(t.x,t.y):a.lineTo(t.x,t.y)),a.stroke();this._polygon(a,[c,...F]),a.fillStyle="rgba(11,130,92,.16)",a.fill(),a.strokeStyle="rgba(11,130,92,.72)",a.lineWidth=1.25,a.stroke();const j=this.adapter?.info.minRangeM??0;if(j>0&&C>0){const t=A*Math.min(j/C,.8),e=Array.from({length:19},(e,a)=>T(a/18*D*2-D,0,t));a.beginPath(),e.forEach((t,e)=>0===e?a.moveTo(t.x,t.y):a.lineTo(t.x,t.y)),a.setLineDash([3,3]),a.strokeStyle="rgba(11,130,92,.48)",a.stroke(),a.setLineDash([])}a.restore();const I=(t,a)=>this._project({x:s.radar_x+$*t+S*a,y:s.radar_y+k*t+R*a,z:s.radar_z+M*t+z*a},e),B=[I(-22,-10),I(22,-10),I(22,10),I(-22,10)];this._polygon(a,B),a.fillStyle="#13212b",a.fill(),a.strokeStyle="#6ee7c1",a.lineWidth=1.5,a.stroke(),a.beginPath(),a.arc(c.x,c.y,4,0,2*Math.PI),a.fillStyle="#0b825c",a.fill();const O=.18*Math.min(e.roomW,e.roomD),Y=t=>({x:De(t.x,18,e.W-18),y:De(t.y,52,e.H-18)}),K=Y(this._project({x:s.radar_x+Math.sin(p)*O,y:s.radar_y+Math.cos(p)*O,z:s.radar_z},e));a.strokeStyle=Ae.yaw,a.lineWidth=2,this._line(a,c,K);const X=Y({x:c.x-28,y:c.y});a.strokeStyle=Ae.height,a.lineWidth=1,this._line(a,{x:X.x+8,y:X.y},c);const U=Y({x:K.x,y:K.y-30-s.pitch/90*20});a.strokeStyle=Ae.pitch,a.setLineDash([2,3]),this._line(a,K,U),a.setLineDash([]);const Z=I(38,0),G=Y({x:Z.x+s.roll/90*10,y:Z.y});this._drawHandle(a,"position",d,"XY"),this._drawHandle(a,"height",X,"Z"),this._drawHandle(a,"yaw",K,this._t("install3d.yaw")),this._drawHandle(a,"pitch",U,this._t("install3d.pitch")),this._drawHandle(a,"roll",G,this._t("install3d.roll")),a.save(),a.fillStyle=r,a.globalAlpha=.72,a.font="10px system-ui",a.textAlign="right",a.fillText(`${Math.round(e.roomW)} × ${Math.round(e.roomD)} cm`,e.W-10,e.H-10),a.restore()}_hitTest(t){let e;for(const[a,i]of this._handles){const r=Math.hypot(t.x-i.x,t.y-i.y);r<=18&&(!e||r<e.distance)&&(e={mode:a,distance:r})}return e?.mode}_onPointerDown(t){const e=this._cv;if(!e)return;const a=ue(t,e),i=this._hitTest(a);if(!i)return;t.preventDefault(),e.setPointerCapture(t.pointerId);const r="height"===i?this.calibration.radar_z:"yaw"===i?this.calibration.yaw:"pitch"===i?this.calibration.pitch:"roll"===i?this.calibration.roll:0;this._drag={mode:i,startX:a.x,startY:a.y,startValue:r},this._scheduleDraw()}_onPointerMove(t){const e=this._cv;if(!e)return;const a=ue(t,e);if(!this._drag)return void(e.style.cursor=this._hitTest(a)?"grab":"default");t.preventDefault();const i=this._scene(),r=this._drag;if("position"===r.mode){const t=this._unproject(a,0,i);this._emit({radar_x:Te(De(t.x,0,i.roomW),1),radar_y:Te(De(t.y,0,i.roomD),1)})}else if("height"===r.mode){const t=r.startValue-(a.y-r.startY)/i.verticalH*i.zMax;this._emit({radar_z:Te(De(t,0,i.zMax),1)})}else if("yaw"===r.mode){const t=this._unproject(a,this.calibration.radar_z,i),e=180*Math.atan2(t.x-this.calibration.radar_x,t.y-this.calibration.radar_y)/Math.PI;this._emit({yaw:Te(e,.5)})}else if("pitch"===r.mode){const t=r.startValue-.6*(a.y-r.startY);this._emit({pitch:Te(De(t,-90,90),.5)})}else{const t=r.startValue+.6*(a.x-r.startX);this._emit({roll:Te(De(t,-90,90),.5)})}}_onPointerUp(t){const e=this._cv;e?.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._drag=void 0,this._scheduleDraw()}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}render(){if(!this.calibration)return B``;const t=this.calibration;return B`
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
    `}_legend(t,e){return B`<span><i style="background:${Ae[t]}"></i>${e}</span>`}static{this.styles=s`
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
  `}};t([ht({attribute:!1})],qe.prototype,"adapter",void 0),t([ht({attribute:!1})],qe.prototype,"calibration",void 0),t([ht({attribute:!1})],qe.prototype,"lang",void 0),t([ht({type:Number})],qe.prototype,"roomW",void 0),t([ht({type:Number})],qe.prototype,"roomD",void 0),t([ht({type:Number})],qe.prototype,"maxRangeM",void 0),t([ht({attribute:!1})],qe.prototype,"peerCalibrations",void 0),t([ut("#installation-cv")],qe.prototype,"_cv",void 0),qe=t([dt("mmwave-installation-3d")],qe);let Pe=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._rafId=0}_L(t){return Me(t,this.lang)}_t(t,e){return Me(t,this.lang,e)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const a=ue(t,e),i=_e(a.x,a.y,this._m());this._emit({polygon:[...this.calibration.polygon,i]})}_undo(){const t=[...this.calibration.polygon];t.pop(),this._emit({polygon:t})}_clear(){this._emit({polygon:[]})}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0){const e=ge(t,this._cssH()),a=this._m();if(me(e,a),this.adapter){const t=he(this.calibration.radar_x,this.calibration.radar_y,a);ve(e,t.cx,t.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,a,this.adapter.info.vitalRangeM)}fe(e,this.calibration.polygon,a)}this._rafId=requestAnimationFrame(()=>this._loop())}_numField(t,e,a,i=5,r=-9999,o=9999){const s=t=>{let a=parseFloat(t.target.value)||0;a>o&&(a=o),a<r&&(a=r),this._emit({[e]:a})};return B` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(a)}
        step=${i}
        min=${r}
        max=${o}
        @input=${s}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(a)}
        step=${i}
        min=${r}
        max=${o}
        @change=${s}
      />
      <span class="unit">cm</span>
    </div>`}_degField(t,e,a,i=-180,r=180){const o=t=>{const a=parseFloat(t.target.value)||0;this._emit({[e]:a})};return B` <div class="field">
      <label>${t}</label>
      <input
        class="slider"
        type="range"
        .value=${String(a)}
        step="0.5"
        min=${i}
        max=${r}
        @input=${o}
      />
      <input
        class="num-input"
        type="number"
        .value=${String(a)}
        step="0.5"
        min=${i}
        max=${r}
        @change=${o}
      />
      <span class="unit">°</span>
    </div>`}render(){const t=this.calibration,e=t.polygon.length,a=e>=3?this._L("geo.poly_hint_ok").replace("{n}",String(e)):this._L("geo.poly_hint_none"),i=t.room_w??this.roomW,r=t.room_d??this.roomD;return B`
      <div class="panel-heading">
        <span class="eyebrow">${this._t("geo.step_1_installation")}</span>
        <h2>${this._t("geo.place_the_radar_in_the_room")}</h2>
        <p>${this._t("geo.drag_the_colored_handles_to_set")}</p>
      </div>

      <mmwave-installation-3d
        .adapter=${this.adapter}
        .calibration=${t}
        .lang=${this.lang}
        .roomW=${i}
        .roomD=${r}
        .maxRangeM=${this.maxRangeM}
      ></mmwave-installation-3d>

      <details class="precision">
        <summary>
          <span>${this._t("geo.precise_numeric_adjustment")}</span>
          <small>${this._t("geo.optional")}</small>
        </summary>
        <div class="precision-fields">
          ${this._numField(this._L("geo.radar_x"),"radar_x",t.radar_x,5,0,i)}
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
          <span class="poly-hint ${e>=3?"ok":""}">${a}</span>
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
  `}};t([ht({attribute:!1})],Pe.prototype,"adapter",void 0),t([ht({attribute:!1})],Pe.prototype,"calibration",void 0),t([ht({attribute:!1})],Pe.prototype,"lang",void 0),t([ht({type:Number})],Pe.prototype,"roomW",void 0),t([ht({type:Number})],Pe.prototype,"roomD",void 0),t([ht({type:Number})],Pe.prototype,"maxRangeM",void 0),t([ut("#poly-cv")],Pe.prototype,"_cv",void 0),Pe=t([dt("mmwave-geo-panel")],Pe);let He=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this._yw={sub:0,capturing:!1},this._rafId=0}_L(t){return Me(t,this.lang)}_t(t,e){return Me(t,this.lang,e)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}offerReading(t,e){this._yw.capturing&&(this._capture(t,e),this._yw={...this._yw,capturing:!1})}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_onCanvasClick(t){const e=this._cv;if(!e)return;const a=this._yw;if(0!==a.sub&&1!==a.sub)return;const i=ue(t,e),r=_e(i.x,i.y,this._m());0===a.sub?this._yw={...a,refA:{canvasPt:i,roomPt:r},sub:.5}:this._yw={...a,refB:{canvasPt:i,roomPt:r},sub:1.5},this.requestUpdate()}_onCapture(){this._yw={...this._yw,capturing:!0},this.dispatchEvent(new CustomEvent("capture-requested",{bubbles:!0,composed:!0}))}_restart(){this._yw={sub:0,capturing:!1}}_capture(t,e){const a=this._yw;.5===a.sub&&a.refA?this._yw={...a,refA:{...a.refA,detPt:{x:t,y:e}},sub:1}:1.5===a.sub&&a.refB&&(this._yw={...a,refB:{...a.refB,detPt:{x:t,y:e}},sub:2},this._computeYaw())}_computeYaw(){const t=this._yw;if(!t.refA?.detPt||!t.refB?.detPt)return;const e=this._m(),a=_e(t.refA.canvasPt.x,t.refA.canvasPt.y,e),i=_e(t.refB.canvasPt.x,t.refB.canvasPt.y,e),r=t.refA.detPt,o=t.refB.detPt,s=function(t,e,a,i){const r=Math.atan2(e.y-t.y,e.x-t.x);let o=(Math.atan2(i.y-a.y,i.x-a.x)-r)*(180/Math.PI);for(;o>180;)o-=360;for(;o<-180;)o+=360;return Math.round(10*o)/10}(a,i,r,o),n={...this.calibration,yaw:s},l=function(t,e,a,i,r){const o=le(a.x,a.y,0,r),s=le(i.x,i.y,0,r);return(Math.hypot(o.roomX-t.x,o.roomY-t.y)+Math.hypot(s.roomX-e.x,s.roomY-e.y))/2}(a,i,r,o,n);this._yw={...this._yw,residual:l},this.dispatchEvent(new CustomEvent("calibration-changed",{detail:n,bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=ge(t,this._cssH()),a=this._m();me(e,a),fe(e,this.calibration.polygon,a,!0);const i=he(this.calibration.radar_x,this.calibration.radar_y,a);ve(e,i.cx,i.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,a,this.adapter.info.vitalRangeM);const r=(t,i)=>{if(t&&($e(e,t.canvasPt.x,t.canvasPt.y,i,"#64b5f6"),t.detPt)){const r=le(t.detPt.x,t.detPt.y,0,this.calibration),o=he(r.roomX,r.roomY,a);e.beginPath(),e.moveTo(t.canvasPt.x,t.canvasPt.y),e.lineTo(o.cx,o.cy),e.strokeStyle="rgba(244,99,99,.4)",e.lineWidth=1,e.setLineDash([3,3]),e.stroke(),e.setLineDash([]),$e(e,o.cx,o.cy,i,"rgba(244,99,99,.85)",!0)}};r(this._yw.refA,"A"),r(this._yw.refB,"B")}this._rafId=requestAnimationFrame(()=>this._loop())}_refStep(t){const e=this._yw,a=0===t?e.sub:e.sub-1,i=a>=1?"done":a>=0?"act":"",r=0===t,o=r?e.refA:e.refB;let s;if(a>=1)s=this._L(r?"yaw.ref_a_done":"yaw.ref_b_done");else if(.5===a)if(null!=o?.roomPt){const t=Math.round(o.roomPt.x),e=Math.round(o.roomPt.y),a=this._L(r?"yaw.ref_a_marked":"yaw.ref_b_marked");s=a.includes("{x}")?a.replace("{x}",String(t)).replace("{y}",String(e)):`(X=${t}, Y=${e} cm) — ${this._L(r?"yaw.ref_a_idle":"yaw.ref_b_step")}`}else s=this._L(r?"yaw.ref_a_marked":"yaw.ref_b_marked").replace("{x}","?").replace("{y}","?");else s=0===a?this._L(r?"yaw.ref_a_idle":"yaw.ref_b_step"):this._L("yaw.ref_b_idle");return B` <div class="ref-step ${i}">
      <div class="ref-num">${a>=1?"✓":r?"A":"B"}</div>
      <div class="ref-copy">
        <div class="ref-title">${this._L(r?"yaw.ref_a_title":"yaw.ref_b_title")}</div>
        <div class="ref-sub">${s}</div>
      </div>
    </div>`}render(){const t=this._yw,e=.5===t.sub||1.5===t.sub,a=t.sub>=2,i=a?this._L("yaw.result_ok").replace("{yaw}",String(this.calibration.yaw)).replace("{residual}",String((t.residual??0).toFixed(1))):this._L("yaw.result_idle");return B`
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
      <div class="result-card ${a?"ok":""}">
        <span class="result-icon">${a?"✓":"i"}</span>
        <span>${i}</span>
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
  `}};t([ht({attribute:!1})],He.prototype,"adapter",void 0),t([ht({attribute:!1})],He.prototype,"calibration",void 0),t([ht({attribute:!1})],He.prototype,"lang",void 0),t([ht({type:Number})],He.prototype,"roomW",void 0),t([ht({type:Number})],He.prototype,"roomD",void 0),t([ht({type:Number})],He.prototype,"maxRangeM",void 0),t([_t()],He.prototype,"_yw",void 0),t([ut("#yaw-cv")],He.prototype,"_cv",void 0),He=t([dt("mmwave-yaw-panel")],He);const Fe=["#ff9800","#03a9f4","#e91e63"];function We(t){return Fe[(t%Fe.length+Fe.length)%Fe.length]}function Ne(t,e,a,i,r){const o=2/Math.max(1e-4,i),s=o*r,n=1/(1+s+.48*s*s+.235*s*s*s),l=t-e,d=(a+o*l)*r;let c=(a-o*d)*n,p=e+(l+d)*n;return(Math.abs(e-t)<1e-6||(e-t)*(p-e)>0)&&(p=e,c=0),[p,c]}let Le=class extends nt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.targets=[],this.present=!1,this.showStatus=!1,this._trails=new Map,this._animatedTargets=new Map,this._rafId=0,this._lastFrameAt=0,this._lastTrailPruneAt=0}connectedCallback(){super.connectedCallback(),this._lastFrameAt=Date.now(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}willUpdate(t){t.has("targets")&&this._setTargetGoals(this.targets)}_setTargetGoals(t){const e=Date.now();for(const a of t){if(!a.room)continue;const t=a.room.roomX,i=a.room.roomY,r=Math.hypot(a.rawX,a.rawY)/100,o=this._animatedTargets.get(a.index);o&&e-o.lastSeen<=1e3?(o.goalX=t,o.goalY=i,o.goalRangeM=r,o.lastSeen=e):(this._trails.delete(a.index),this._animatedTargets.set(a.index,{x:t,y:i,rangeM:r,goalX:t,goalY:i,goalRangeM:r,velocityX:0,velocityY:0,velocityRange:0,lastSeen:e,lastTrailAt:0}))}}_advanceTargets(t){const e=Math.min(Math.max((t-this._lastFrameAt)/1e3,0),.05);this._lastFrameAt=t;const a=Math.max(this.adapter.info.updateRateHz,1),i=Math.min(.22,Math.max(.12,1.25/a));for(const[a,r]of this._animatedTargets)t-r.lastSeen>1e3?this._animatedTargets.delete(a):([r.x,r.velocityX]=Ne(r.x,r.goalX,r.velocityX,i,e),[r.y,r.velocityY]=Ne(r.y,r.goalY,r.velocityY,i,e),[r.rangeM,r.velocityRange]=Ne(r.rangeM,r.goalRangeM,r.velocityRange,i,e))}_sampleTrails(t,e){for(const a of t){const t=this._animatedTargets.get(a.index);if(!t||!a.room?.inBoundary||e-t.lastTrailAt<75)continue;t.lastTrailAt=e;const i=this._trails.get(a.index)??[],r=i.at(-1);(!r||Math.hypot(t.x-r.x,t.y-r.y)>=.5)&&(i.push({x:t.x,y:t.y,t:e}),this._trails.set(a.index,i))}if(e-this._lastTrailPruneAt>=1e3){this._lastTrailPruneAt=e;const t=e-9e4;for(const[e,a]of this._trails){const i=a.filter(e=>e.t>t);i.length>0?this._trails.set(e,i):this._trails.delete(e)}}}clearTrail(){this._trails.clear();for(const t of this._animatedTargets.values())t.lastTrailAt=0}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 340;const e=this.roomD/this.roomW;return Math.max(140,Math.min(340,Math.round(t*e)))}_m(){return{W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD}}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=ge(t,this._cssH()),a=this._m(),i=Date.now();this._advanceTargets(i),this._sampleTrails(this.targets,i),me(e,a),fe(e,this.calibration.polygon,a);const r=he(this.calibration.radar_x,this.calibration.radar_y,a);ve(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,a,this.adapter.info.vitalRangeM);for(const[t,r]of this._trails)if(!(r.length<2)){e.save(),e.strokeStyle=We(t),e.lineWidth=2,e.lineCap="round";for(let t=1;t<r.length;t++){const o=r[t-1],s=r[t],n=(i-s.t)/9e4;e.globalAlpha=Math.max(0,.5-.5*n);const l=he(o.x,o.y,a),d=he(s.x,s.y,a);e.beginPath(),e.moveTo(l.cx,l.cy),e.lineTo(d.cx,d.cy),e.stroke()}e.restore()}for(const t of this.targets){if(!t.room)continue;const i=this._animatedTargets.get(t.index);if(this.adapter.info.is1DRanging)we(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,i?.rangeM??Math.hypot(t.rawX,t.rawY)/100,a,t.room.inBoundary);else{const r=he(i?.x??t.room.roomX,i?.y??t.room.roomY,a),o=We(t.index);xe(e,r.cx,r.cy,t.room.inBoundary,o),this.adapter.info.maxTargets>1&&(e.fillStyle=o,e.font="bold 10px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(String(t.index+1),r.cx,r.cy-14),e.textBaseline="alphabetic")}}}this._rafId=requestAnimationFrame(()=>this._loop())}_L(t){return Me(t,this.lang)}_t(t,e){return Me(t,this.lang,e)}_badgeText(){if(!this.present)return this._L("live.badge_none");const t=this.targets.filter(t=>t.room?.inBoundary).length;return t>0?this._L("live.badge_present"):this._L("live.badge_filtered")}_badgeCls(){return this.present?this.targets.some(t=>t.room?.inBoundary)?"on":"filtered":""}render(){return B`
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
                          style="--target-color:${We(t.index)}"
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
  `}};t([ht({attribute:!1})],Le.prototype,"adapter",void 0),t([ht({attribute:!1})],Le.prototype,"calibration",void 0),t([ht({attribute:!1})],Le.prototype,"lang",void 0),t([ht({type:Number})],Le.prototype,"roomW",void 0),t([ht({type:Number})],Le.prototype,"roomD",void 0),t([ht({attribute:!1})],Le.prototype,"targets",void 0),t([ht({type:Boolean})],Le.prototype,"present",void 0),t([ht({type:Boolean})],Le.prototype,"showStatus",void 0),t([ht({type:Number})],Le.prototype,"maxRangeM",void 0),t([ut("#live-cv")],Le.prototype,"_cv",void 0),Le=t([dt("mmwave-live-panel")],Le);const je=["#ff9800","#03a9f4","#e91e63","#8bc34a","#9c27b0","#00bcd4"];function Ie(t){let e=0;for(const a of t)e=31*e+a.charCodeAt(0)|0;return je[Math.abs(e)%je.length]}let Be=class extends nt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.radars=[],this.targets=[],this.zones=[],this.events=[],this.historyTrack=[],this.selectedEventId="",this.lang="en",this.backendState="connecting",this.heatmapLoading=!1,this.heatmapError="",this.showCoverage=!1,this.showHeatmap=!1,this.heatmapHours=24,this.replayLoading=!1,this.replayError="",this.showReplay=!1,this.replayMinutes=5,this.playing=!1,this.speed=4,this.playhead=Number.NaN,this.lastAdvanceAt=0,this.trails=new Map,this.animationFrame=0}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.animationFrame)}willUpdate(t){if(t.has("replay")&&this.clampPlayhead(),!t.has("targets"))return;const e=Date.now();for(const t of this.targets){const a=this.trails.get(t.track_id)??[],i=a.at(-1);(!i||Math.hypot(i.x-t.x,i.y-t.y)>=.5)&&a.push({x:t.x,y:t.y,timestamp:e}),this.trails.set(t.track_id,a.filter(t=>t.timestamp>=e-Ce))}const a=new Set(this.targets.map(t=>t.track_id));for(const t of this.trails.keys()){const i=this.trails.get(t)??[];!a.has(t)&&(i.at(-1)?.timestamp??0)<e-Ce&&this.trails.delete(t)}}metrics(){const t=this.canvas?.offsetWidth||500;return{W:t,H:Math.max(220,Math.min(520,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD}}loop(){const t=this.canvas;if(t&&t.offsetWidth>0){const e=this.metrics(),a=ge(t,e.H),i=Date.now();me(a,e),this.showHeatmap&&this.heatmap&&function(t,e,a,i,r){if(!e.length||i<=0)return;const o=Math.log1p(i),s=a/r.roomW*r.W+.5,n=a/r.roomD*r.H+.5;t.save();for(const a of e){const e=0===o?1:Math.log1p(a.visits)/o,i=he(a.x,a.y,r);t.fillStyle=be(e,.14+.58*e),t.fillRect(i.cx,i.cy,s,n)}t.restore()}(a,this.heatmap.cells,this.heatmap.bin_cm,this.heatmap.max_visits,e),this.drawZones(a,e),this.drawRadars(a,e),this.showReplay&&this.replay?(this.advancePlayhead(i),function(t,e,a,i,r,o){const s=i>0?1/i:.5,n=3*s,l=3*s;for(const i of e){const e=i.points.filter(t=>t.ts<=a&&t.ts>=a-8);if(!e.length)continue;const s=e[e.length-1];if(a-s.ts>n)continue;const d=o(i.track_id);t.save(),t.strokeStyle=d,t.lineWidth=2.2,t.lineCap="round";for(let i=1;i<e.length;i++){const o=e[i-1],s=e[i];if(s.ts-o.ts>l)continue;t.globalAlpha=Math.max(.08,.7-(a-s.ts)/8*.7);const n=he(o.x,o.y,r),d=he(s.x,s.y,r);t.beginPath(),t.moveTo(n.cx,n.cy),t.lineTo(d.cx,d.cy),t.stroke()}t.restore();const c=he(s.x,s.y,r);xe(t,c.cx,c.cy,!0,d),t.fillStyle=d,t.font="bold 9px ui-monospace, monospace",t.textAlign="center",t.fillText(i.track_id.slice(0,6),c.cx,c.cy-14)}}(a,this.replay.tracks,this.playhead,this.replay.sample_hz,e,Ie)):(this.drawTrails(a,e,i),this.drawHistory(a,e),this.drawTargets(a,e))}this.animationFrame=requestAnimationFrame(()=>this.loop())}drawZones(t,e){this.zones.forEach((a,i)=>{if(a.polygon.length<3)return;const r=je[(i+3)%je.length],o=a.polygon.map(t=>he(t.x,t.y,e));t.beginPath(),o.forEach((e,a)=>0===a?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),t.closePath(),t.globalAlpha=.08,t.fillStyle=r,t.fill(),t.globalAlpha=.6,t.strokeStyle=r,t.lineWidth=1.5,t.setLineDash([5,4]),t.stroke(),t.setLineDash([]),t.globalAlpha=1,t.fillStyle=r,t.font="bold 10px system-ui",t.textAlign="left",t.fillText(a.name||a.id,o[0].cx+5,o[0].cy+13)})}drawRadars(t,e){for(const a of this.radars){const i=he(a.calibration.radar_x,a.calibration.radar_y,e),r=a.calibrationWarning?"#ff9800":a.available?"#0b825c":"#9ca3af";this.showCoverage&&(t.save(),t.globalAlpha=a.available?.14:.06,ve(t,i.cx,i.cy,a.calibration.yaw,a.calibration.pitch,a.adapter.info.fovDegrees,a.adapter.info.minRangeM,a.adapter.info.maxRangeM,e,a.adapter.info.vitalRangeM),t.restore());const o=Math.PI/2-a.calibration.yaw*(Math.PI/180);t.save(),t.strokeStyle=r,t.fillStyle=r,t.lineWidth=1.5,t.globalAlpha=a.available?.9:.4,t.beginPath(),t.arc(i.cx,i.cy,4,0,2*Math.PI),t.fill(),t.beginPath(),t.moveTo(i.cx,i.cy),t.lineTo(i.cx+18*Math.cos(o),i.cy+18*Math.sin(o)),t.stroke(),t.restore(),t.fillStyle=r,t.font="bold 9px system-ui",t.textAlign="center",t.fillText(a.config.id,i.cx,i.cy-14)}}drawTrails(t,e,a){for(const[i,r]of this.trails)if(!(r.length<2)){t.save(),t.strokeStyle=Ie(i),t.lineWidth=2.2,t.lineCap="round";for(let i=1;i<r.length;i++){const o=he(r[i-1].x,r[i-1].y,e),s=he(r[i].x,r[i].y,e);t.globalAlpha=Math.max(.05,.65-(a-r[i].timestamp)/Ce*.65),t.beginPath(),t.moveTo(o.cx,o.cy),t.lineTo(s.cx,s.cy),t.stroke()}t.restore()}}drawTargets(t,e){for(const a of this.targets){const i=he(a.x,a.y,e),r=Ie(a.track_id);xe(t,i.cx,i.cy,!0,r),t.fillStyle=r,t.font="bold 9px ui-monospace, monospace",t.textAlign="center",t.fillText(a.track_id.slice(0,6),i.cx,i.cy-14)}}drawHistory(t,e){this.historyTrack.length<2||(t.save(),t.strokeStyle="#ffffff",t.lineWidth=2.5,t.globalAlpha=.75,t.setLineDash([6,4]),t.beginPath(),this.historyTrack.forEach((a,i)=>{const r=he(a.x,a.y,e);0===i?t.moveTo(r.cx,r.cy):t.lineTo(r.cx,r.cy)}),t.stroke(),t.restore())}selectEvent(t){this.dispatchEvent(new CustomEvent("fusion-event-selected",{detail:t,bubbles:!0,composed:!0}))}clampPlayhead(){const t=this.replay;t&&(Number.isNaN(this.playhead)||this.playhead<t.since||this.playhead>t.until)&&(this.playhead=t.since)}advancePlayhead(t){const e=this.replay;if(!e)return;Number.isNaN(this.playhead)&&(this.playhead=e.since);const a=this.lastAdvanceAt?(t-this.lastAdvanceAt)/1e3:0;if(this.lastAdvanceAt=t,!this.playing)return;const i=this.playhead+Math.min(a,.5)*this.speed;i>=e.until?(this.playhead=e.until,this.playing=!1):this.playhead=i,this.requestUpdate()}requestReplay(){const t=Date.now()/1e3;this.dispatchEvent(new CustomEvent("fusion-replay-requested",{detail:{since:t-60*this.replayMinutes,until:t},bubbles:!0,composed:!0}))}toggleReplay(){this.showReplay=!this.showReplay,this.playing=!1,this.showReplay&&!this.replay&&this.requestReplay()}setReplayMinutes(t){t!==this.replayMinutes&&(this.replayMinutes=t,this.playing=!1,this.requestReplay())}togglePlaying(){const t=this.replay;t&&(!this.playing&&this.playhead>=t.until&&(this.playhead=t.since),this.playing=!this.playing)}scrubTo(t){const e=this.replay;e&&(this.playhead=e.since+(e.until-e.since)*t)}clockAt(t){return Number.isNaN(t)?"--:--:--":new Date(1e3*t).toLocaleTimeString()}binCm(){const t=Math.max(this.roomW,this.roomD)/40;return Math.min(200,Math.max(5,5*Math.round(t/5)))}requestHeatmap(){this.dispatchEvent(new CustomEvent("fusion-heatmap-requested",{detail:{hours:this.heatmapHours,binCm:this.binCm()},bubbles:!0,composed:!0}))}toggleHeatmap(){this.showHeatmap=!this.showHeatmap,this.showHeatmap&&!this.heatmap&&this.requestHeatmap()}setHeatmapHours(t){t!==this.heatmapHours&&(this.heatmapHours=t,this.requestHeatmap())}_t(t,e){return Me(t,this.lang,e)}qualityReason(t){return t?this._t(`fusion_reason.${t}`):this._t("fusion.filtered")}eventStatus(t){return t.clip_path?"▶":"failed"===t.clip_status?this._t("fusion.clip_failed"):"waiting"===t.clip_status||"extracting"===t.clip_status?this._t("fusion.recording"):"rejected_quality"===t.recording_decision||"trajectory"===t.event_type?this.qualityReason(t.quality_reason):"traverse"===t.event_type?this._t("fusion.key_track"):""}renderReplayBar(){const t=this.replay,e=[[5,this._t("fusion.window_5min")],[60,this._t("fusion.window_hour")],[360,this._t("fusion.window_6h")]],a=t?t.until-t.since:0,i=t&&a>0&&!Number.isNaN(this.playhead)?Math.min(1,Math.max(0,(this.playhead-t.since)/a)):0;return B`
      <!--
        data-span-s reports the window that is actually loaded, not the button
        that is selected. The two differ for as long as a query is in flight,
        and that gap is exactly where a test — or anything else watching — would
        otherwise read the previous window's numbers and believe them.
      -->
      <div class="replay-bar" data-span-s=${t?Math.round(a):0}>
        <div class="windows">
          ${e.map(([t,e])=>B`
              <button
                type="button"
                class=${this.replayMinutes===t?"selected":""}
                ?disabled=${this.replayLoading}
                @click=${()=>this.setReplayMinutes(t)}
              >
                ${e}
              </button>
            `)}
        </div>
        ${"unsupported"===this.replayError?B`<span class="heatmap-note">${this._t("fusion.replay_needs_newer_backend")}</span>`:"failed"===this.replayError?B`<span class="heatmap-note">${this._t("fusion.replay_failed")}</span>`:this.replayLoading?B`<span class="heatmap-note">${this._t("fusion.replay_loading")}</span>`:t?0===t.tracks.length?B`<span class="heatmap-note">${this._t("fusion.replay_empty")}</span>`:B`
                      <button type="button" class="play" @click=${this.togglePlaying}>
                        ${this.playing?"❙❙":"▶"}
                      </button>
                      <div class="windows">
                        ${[1,4,16].map(t=>B`
                            <button
                              type="button"
                              class=${this.speed===t?"selected":""}
                              @click=${()=>this.speed=t}
                            >
                              ${t}×
                            </button>
                          `)}
                      </div>
                      <input
                        class="scrub"
                        type="range"
                        min="0"
                        max="1000"
                        .value=${String(Math.round(1e3*i))}
                        @input=${t=>{this.playing=!1,this.scrubTo(Number(t.target.value)/1e3)}}
                      />
                      <span class="clock">${this.clockAt(this.playhead)}</span>
                      <span class="heatmap-note">
                        ${this._t("fusion.replay_summary",{tracks:t.tracks.length,points:t.total_points.toLocaleString()})}
                        ${t.thinned?` · ${this._t("fusion.replay_thinned",{hz:t.sample_hz.toFixed(1)})}`:""}
                      </span>
                    `:""}
      </div>
    `}renderHeatmapLegend(){const t=[[1,this._t("fusion.window_hour")],[24,this._t("fusion.window_day")],[168,this._t("fusion.window_week")]];return B`
      <div class="heatmap-bar">
        <div class="windows">
          ${t.map(([t,e])=>B`
              <button
                type="button"
                class=${this.heatmapHours===t?"selected":""}
                ?disabled=${this.heatmapLoading}
                @click=${()=>this.setHeatmapHours(t)}
              >
                ${e}
              </button>
            `)}
        </div>
        ${"unsupported"===this.heatmapError?B`<span class="heatmap-note">${this._t("fusion.heatmap_needs_newer_backend")}</span>`:"failed"===this.heatmapError?B`<span class="heatmap-note">${this._t("fusion.heatmap_failed")}</span>`:this.heatmapLoading?B`<span class="heatmap-note">${this._t("fusion.heatmap_loading")}</span>`:this.heatmap?B`
                    <span class="ramp">
                      <small>${this._t("fusion.heatmap_rare")}</small>
                      ${function(t=5){return Array.from({length:t},(e,a)=>be(a/(t-1),.14+a/(t-1)*.58))}().map(t=>B`<i style="background:${t}"></i>`)}
                      <small>${this._t("fusion.heatmap_frequent")}</small>
                    </span>
                    <span class="heatmap-note">
                      ${this._t("fusion.heatmap_summary",{points:this.heatmap.total_points.toLocaleString(),bin:this.heatmap.bin_cm})}
                      ${this.heatmap.truncated?` · ${this._t("fusion.heatmap_truncated")}`:""}
                    </span>
                  `:""}
      </div>
    `}render(){const t=this.radars.filter(t=>t.available).length,e=this.radars.filter(t=>t.calibrationWarning),a=this.events.filter(t=>"trajectory"===t.event_type||"traverse"===t.event_type),i=a.length?a:this.events;return B`
      <div class="scene-toolbar">
        <span class="status ${this.backendState}">
          <i></i>
          ${"online"===this.backendState?this._t("fusion.backend_fusion"):"missing"===this.backendState?this._t("fusion.integration_missing"):"outdated"===this.backendState?this._t("fusion.integration_outdated"):"fallback"===this.backendState?this._t("fusion.local_fallback"):"error"===this.backendState?this._t("fusion.backend_error"):this._t("fusion.connecting")}
        </span>
        <span class="toolbar-actions">
          <button type="button" class="coverage-toggle ${this.showReplay?"active":""}" @click=${this.toggleReplay}>
            ${this.showReplay?this._t("fusion.hide_replay"):this._t("fusion.show_replay")}
          </button>
          <button
            type="button"
            class="coverage-toggle ${this.showHeatmap?"active":""}"
            @click=${this.toggleHeatmap}
          >
            ${this.showHeatmap?this._t("fusion.hide_heatmap"):this._t("fusion.show_heatmap")}
          </button>
          <button type="button" class="coverage-toggle" @click=${()=>this.showCoverage=!this.showCoverage}>
            ${this.showCoverage?this._t("fusion.hide_coverage"):this._t("fusion.show_coverage")}
          </button>
          <span class="radar-count">${t}/${this.radars.length} ${this._t("fusion.radars_online")}</span>
        </span>
      </div>
      <div class="scene">
        <canvas id="fusion-cv"></canvas>
      </div>
      ${this.showReplay?this.renderReplayBar():""} ${this.showHeatmap?this.renderHeatmapLegend():""}
      ${e.length?B`<div class="calibration-warning">
            ${this._t("fusion.calibration_warning")}:
            ${e.map(t=>{const e=null==t.inRoomRatio?"?":`${Math.round(100*t.inRoomRatio)}%`;return`${t.config.id} (${e})`}).join(", ")}
          </div>`:""}
      <div class="summary">
        <div><strong>${this.targets.length}</strong><span>${this._t("fusion.fused_targets")}</span></div>
        ${this.targets.map(t=>B`
            <div class="track" style="--track-color:${Ie(t.track_id)}">
              <i></i>
              <span>${t.track_id.slice(0,6)}</span>
              <small>X ${Math.round(t.x)} · Y ${Math.round(t.y)} cm</small>
              <em>${Math.round(100*t.confidence)}%</em>
            </div>
          `)}
      </div>
      ${i.length?B`
            <div class="events">
              <strong>${this._t("fusion.recent_events")}</strong>
              ${i.slice(0,8).map(t=>B`
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
    .scene-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 7px;
      padding: 0 2px;
    }
    .toolbar-actions {
      display: flex;
      flex: 1 1 auto;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
    }
    .coverage-toggle {
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      font: inherit;
      font-size: 9px;
      cursor: pointer;
    }
    .coverage-toggle.active {
      border-color: #0b825c;
      color: #0b825c;
      background: color-mix(in srgb, #0b825c 12%, var(--card-background-color, #fff));
    }
    .replay-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .play {
      width: 26px;
      height: 22px;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--primary-text-color);
      background: transparent;
      font-size: 9px;
      cursor: pointer;
    }
    .scrub {
      flex: 1 1 120px;
      min-width: 100px;
      accent-color: #0b825c;
    }
    .clock {
      color: var(--secondary-text-color);
      font:
        9px ui-monospace,
        monospace;
    }
    .heatmap-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .windows {
      display: inline-flex;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
    }
    .windows button {
      padding: 3px 10px;
      border: none;
      color: var(--secondary-text-color);
      background: transparent;
      font: inherit;
      font-size: 9px;
      cursor: pointer;
    }
    .windows button + button {
      border-left: 1px solid var(--divider-color);
    }
    .windows button.selected {
      color: #fff;
      background: #0b825c;
    }
    .windows button[disabled] {
      cursor: progress;
      opacity: 0.5;
    }
    .ramp {
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .ramp i {
      width: 14px;
      height: 8px;
      border-radius: 2px;
    }
    .ramp small,
    .heatmap-note {
      color: var(--secondary-text-color);
      font-size: 9px;
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
  `}};t([ht({type:Number})],Be.prototype,"roomW",void 0),t([ht({type:Number})],Be.prototype,"roomD",void 0),t([ht({attribute:!1})],Be.prototype,"radars",void 0),t([ht({attribute:!1})],Be.prototype,"targets",void 0),t([ht({attribute:!1})],Be.prototype,"zones",void 0),t([ht({attribute:!1})],Be.prototype,"events",void 0),t([ht({attribute:!1})],Be.prototype,"historyTrack",void 0),t([ht({attribute:!1})],Be.prototype,"selectedEventId",void 0),t([ht({attribute:!1})],Be.prototype,"lang",void 0),t([ht({attribute:!1})],Be.prototype,"backendState",void 0),t([ht({attribute:!1})],Be.prototype,"heatmap",void 0),t([ht({type:Boolean})],Be.prototype,"heatmapLoading",void 0),t([ht({attribute:!1})],Be.prototype,"heatmapError",void 0),t([_t()],Be.prototype,"showCoverage",void 0),t([_t()],Be.prototype,"showHeatmap",void 0),t([_t()],Be.prototype,"heatmapHours",void 0),t([ht({attribute:!1})],Be.prototype,"replay",void 0),t([ht({type:Boolean})],Be.prototype,"replayLoading",void 0),t([ht({attribute:!1})],Be.prototype,"replayError",void 0),t([_t()],Be.prototype,"showReplay",void 0),t([_t()],Be.prototype,"replayMinutes",void 0),t([_t()],Be.prototype,"playing",void 0),t([_t()],Be.prototype,"speed",void 0),t([_t()],Be.prototype,"playhead",void 0),t([ut("#fusion-cv")],Be.prototype,"canvas",void 0),Be=t([dt("mmwave-fusion-panel")],Be),window.customCards??=[],window.customCards.push({type:Re,name:"MMWave Radar HA Card",description:"Multi-model mmWave radar calibration & live visualization",preview:!0,documentationURL:"https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card"}),console.info("%c MMWAVE-CARD %c v1.0.0 ","background:#03a9f4;color:#fff;font-weight:700","background:#1c1c2e;color:#03a9f4;font-weight:700");function Oe(t,e=new Set){return"string"==typeof t&&/^[a-z_]+\.[a-z0-9_]+$/.test(t)?e.add(t):Array.isArray(t)?t.forEach(t=>Oe(t,e)):t&&"object"==typeof t&&Object.values(t).forEach(t=>Oe(t,e)),e}function Ye(t,e){return[...Oe(e)].some(e=>{const a=t.states[e];return a&&"unavailable"!==a.state&&"unknown"!==a.state})}let Ke=class extends nt{constructor(){super(...arguments),this._tab=0,this._isCalibrating=!1,this._targets=[],this._present=!1,this._syncState="idle",this._fusionTargets=[],this._fusionRadars=[],this._fusionBackendState="connecting",this._fusionEvents=[],this._fusionHistoryTrack=[],this._fusionVideoUrl="",this._fusionHeatmapLoading=!1,this._fusionHeatmapError="",this._fusionReplayLoading=!1,this._fusionReplayError="",this._deviceLoaded=!1,this._localFusion=new de,this._localObservationBuffer=[],this._sourceSignatures=new Map,this._fusionConnecting=!1}setConfig(t){if(this._disconnectFusionBackend(),t.radars?.length){this._config={...mt,...t};const e=this._config.room_w,a=this._config.room_d;return this._fusionRadars=t.radars.map((i,r)=>{const o=oe(i.radar_model);if(!o)throw new Error(`Unknown radar_model for radars[${r}]: "${i.radar_model}"`);if(o.info.is1DRanging)throw new Error(`Radar "${i.id}" uses a ranging-only model and cannot participate in 2-D fusion.`);const s={...i,type:this._config.type,room_w:e,room_d:a},n=o.validateConfig(s);n.length&&console.warn(`Radar "${i.id}" is not fully configured: ${n.join("; ")}`);const l=o.getDefaultCalibration();return{config:i,adapter:o,calibration:{...l,radar_x:Math.round(e*(r+1)/(t.radars.length+1)),radar_y:Math.round(.2*a),...i.calibration,polygon:i.calibration?.polygon??[]},available:!1}}),this._adapter=this._fusionRadars[0].adapter,this._cal=this._fusionRadars[0].calibration,this._localFusion=new de({...t.fusion,min_confirm_sources:t.fusion?.min_confirm_sources??(t.radars.length>1?2:1),track_ttl_s:t.fusion?.track_ttl_s??(t.radars.some(t=>"r60abd1"===t.radar_model)?3:1.2)}),this._fusionTargets=[],this._fusionEvents=[],this._fusionHistoryTrack=[],this._selectedFusionEvent=void 0,this._fusionHeatmap=void 0,this._fusionHeatmapError="",this._fusionReplay=void 0,this._fusionReplayError="",this._fusionVideoUrl="",this._localObservationBuffer=[],this._sourceSignatures.clear(),void(this._fusionBackendState="connecting")}if(!t.radar_model)throw new Error("radar_model is required");const e=oe(t.radar_model);if(!e)throw new Error(`Unknown radar_model: "${t.radar_model}". Check src/models/index.ts.`);const a=e.validateConfig(t);if(a.length)throw new Error(a.join("; "));this._config={...mt,...t},this._adapter=e;const i=e.getDefaultCalibration(),r=this._config.room_w,o=this._config.room_d;i.radar_x=Math.round(.382*r),i.radar_y=Math.round(.382*o),this._cal=i}static async getConfigElement(){return await Promise.resolve().then(function(){return na}),document.createElement(ze)}static getStubConfig(){return{...mt,radar_model:"r60abd1",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z"}}getCardSize(){return 7}set hass(t){if(this._hass=t,!this._adapter||!this._config)return;if(this._config.radars?.length)return this._updateFusionMode(t),void this._connectFusionBackend();this._deviceLoaded||(this._deviceLoaded=!0,this._loadFromDevice());const e=this._adapter.readFromHass(t,this._config);if(this._present=e.present,this._maxRangeM=e.maxRangeM,this._targets=e.targets.map(t=>({...t,room:le(t.rawX,t.rawY,t.rawZ,this._cal)})),this.requestUpdate(),1===this._tab&&this._yawPanel){const t=e.targets[0];t&&this._yawPanel.offerReading(t.rawX,t.rawY)}}_L(t){return Me(t,this._hass?.language)}_t(t,e){return Me(t,this._hass?.language,e)}_insideTargetCount(){return this._targets.filter(t=>t.room?.inBoundary).length}_syncLabel(){return"syncing"===this._syncState?this._t("card.syncing"):"success"===this._syncState?this._t("card.synced"):"error"===this._syncState?this._t("card.sync_failed"):this._t("card.sync_to_device")}disconnectedCallback(){super.disconnectedCallback(),null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._disconnectFusionBackend()}_updateFusionMode(t){const e=Date.now(),a=[];this._fusionRadars=this._fusionRadars.map(i=>{const r={...i.config,type:this._config.type,room_w:this._config.room_w,room_d:this._config.room_d},o=i.config.frame_entity?t.states[i.config.frame_entity]:void 0,s=o?pe(o.state):void 0,n=s?{present:s.targets.length>0,targets:s.targets.map((t,e)=>{const a=Number(i.config.frame_coordinate_scale??1);return{index:e,rawX:t.x*a,rawY:t.y*a,rawZ:t.z*a,speed:null==t.speed?void 0:t.speed*a}})}:i.adapter.readFromHass(t,r),l=function(t,e){const a=e.frame_entity?t.states[e.frame_entity]:void 0;return(a&&pe(a.state)?[e.frame_entity]:[...Oe(e)]).sort().map(e=>`${e}:${t.states[e]?.last_updated??"missing"}`).join("|")}(t,i.config),d=l!==this._sourceSignatures.get(i.config.id);if(this._sourceSignatures.set(i.config.id,l),d)for(const t of n.targets){const r=le(t.rawX,t.rawY,t.rawZ,i.calibration);a.push({radarId:i.config.id,slot:t.index,timestamp:e,x:r.roomX,y:r.roomY,weight:Math.max(Number(i.config.measurement_weight??1),.01)})}return{...i,available:Ye(t,i.config)}});const i=a.filter(t=>t.x>=0&&t.x<=Number(this._config.room_w)&&t.y>=0&&t.y<=Number(this._config.room_d));i.length&&this._localObservationBuffer.push(...i),this._localObservationBuffer=this._localObservationBuffer.filter(t=>e-t.timestamp<=250);const r=this._localFusion.step(this._localObservationBuffer,e);"online"!==this._fusionBackendState&&(this._fusionTargets=r,"connecting"===this._fusionBackendState&&r.length&&(this._fusionBackendState="fallback")),this.requestUpdate()}async _connectFusionBackend(){if(this._fusionConnecting||this._fusionUnsubscribe||!this._config.radars?.length||!this._hass)return;this._fusionConnecting=!0;const t=this._config.fusion_id||"home";try{if(!1!==this._config.sync_backend)try{await this._hass.callWS({type:"mmwave_fusion/configure",config:{fusion_id:t,room_w:this._config.room_w,room_d:this._config.room_d,radars:this._config.radars,zones:this._config.zones??[],cameras:this._config.cameras??[],fusion:this._config.fusion??{},quality:this._config.quality??{}}})}catch(t){console.info("MMWave Fusion backend configuration was not updated",t)}this._fusionUnsubscribe=await this._hass.connection.subscribeMessage(e=>{if(e.fusion_id!==t)return;const a=e.api_version??0;if(a<1)return"outdated"!==this._fusionBackendState&&console.warn(`MMWave Fusion backend speaks api_version ${a}, this card needs 1; please update the mmwave-fusion integration`),this._fusionBackendState="outdated",void this.requestUpdate();this._fusionTargets=e.tracks,e.events.length&&(this._fusionEvents=[...e.events,...this._fusionEvents].slice(0,100));const i=new Map(e.radars.map(t=>[t.id,t]));this._fusionRadars=this._fusionRadars.map(t=>({...t,available:i.get(t.config.id)?.available??t.available,observations:i.get(t.config.id)?.observations,inRoomRatio:i.get(t.config.id)?.in_room_ratio,calibrationWarning:i.get(t.config.id)?.calibration_warning})),this._fusionBackendState="online",this.requestUpdate()},{type:"mmwave_fusion/subscribe",fusion_id:t}),await this._loadFusionEvents()}catch(t){const e=t?.code;"unknown_command"===e?(console.info("MMWave Fusion integration is not installed; multi-radar fusion needs it"),this._fusionBackendState="missing"):(console.warn("MMWave Fusion backend unavailable; using browser fallback",t),this._fusionBackendState="fallback")}finally{this._fusionConnecting=!1}}_disconnectFusionBackend(){this._fusionUnsubscribe?.(),this._fusionUnsubscribe=void 0,this._fusionConnecting=!1}async _loadFusionEvents(){if(this._hass&&this._config.radars?.length)try{const t=await this._hass.callWS({type:"mmwave_fusion/query_events",fusion_id:this._config.fusion_id||"home",limit:100});this._fusionEvents=t.map(t=>({event_id:String(t.event_id),fusion_id:String(t.fusion_id),track_id:String(t.track_id),event_type:t.event_type,zone_id:String(t.zone_id),timestamp:Number(t.ts),x:Number(t.x),y:Number(t.y),clip_path:t.clip_path?String(t.clip_path):void 0,camera_entity_id:t.camera_entity_id?String(t.camera_entity_id):void 0,clip_status:t.clip_status?String(t.clip_status):void 0,clip_provider:t.clip_provider?String(t.clip_provider):void 0,clip_file_size:t.clip_file_size?Number(t.clip_file_size):void 0,clip_error:t.clip_error?String(t.clip_error):void 0,metadata:t.metadata&&"object"==typeof t.metadata?t.metadata:void 0,quality_score:null==t.quality_score?void 0:Number(t.quality_score),quality_reason:t.quality_reason?String(t.quality_reason):void 0,recording_decision:t.recording_decision?String(t.recording_decision):void 0,recording_decisions:Array.isArray(t.recording_decisions)?t.recording_decisions:void 0}))}catch(t){console.info("MMWave Fusion history is not available",t)}}async _loadFusionHeatmap(t){if(this._hass){this._fusionHeatmapLoading=!0,this._fusionHeatmapError="";try{this._fusionHeatmap=await this._hass.callWS({type:"mmwave_fusion/query_heatmap",fusion_id:this._config.fusion_id||"home",hours:t.detail.hours,bin_cm:t.detail.binCm})}catch(t){const e=t?.code;this._fusionHeatmapError="unknown_command"===e?"unsupported":"failed","unknown_command"!==e&&console.warn("MMWave Fusion heatmap query failed",t)}finally{this._fusionHeatmapLoading=!1}}}async _loadFusionReplay(t){if(this._hass){this._fusionReplayLoading=!0,this._fusionReplayError="";try{this._fusionReplay=await this._hass.callWS({type:"mmwave_fusion/query_replay",fusion_id:this._config.fusion_id||"home",since:t.detail.since,until:t.detail.until})}catch(t){const e=t?.code;this._fusionReplayError="unknown_command"===e?"unsupported":"failed","unknown_command"!==e&&console.warn("MMWave Fusion replay query failed",t)}finally{this._fusionReplayLoading=!1}}}async _selectFusionEvent(t){this._selectedFusionEvent=t.detail,this._fusionVideoUrl="";try{await this._loadFusionEvents();const e=this._fusionEvents.find(e=>e.event_id===t.detail.event_id)??t.detail;if(this._selectedFusionEvent=e,this._fusionHistoryTrack=await this._hass.callWS({type:"mmwave_fusion/query_track",track_id:e.track_id,limit:1e4}),e.clip_path){const t=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${e.clip_path}`});this._fusionVideoUrl=t.url}}catch(t){console.warn("Failed to load fused trajectory event",t)}}_gotoTab(t){this._tab=t,this._livePanel?.clearTrail(),this.requestUpdate()}_onPolygonPointAdded(t){const e=this.shadowRoot?.querySelector("#poly-cv"),a={W:e?.offsetWidth??400,H:165,roomW:this._cal?.room_w??this._config.room_w,roomD:this._cal?.room_d??this._config.room_d},i=_e(t.detail.canvasX,t.detail.canvasY,a),r={...this._cal,polygon:[...this._cal.polygon,i]};this._cal=r,this.requestUpdate()}_onCalibrationChanged(t){let e=t.detail;const a=e.room_w??this._config.room_w,i=e.room_d??this._config.room_d;e.radar_x>a&&(e={...e,radar_x:a}),e.radar_y>i&&(e={...e,radar_y:i}),this._cal=e,this.requestUpdate()}_onCaptureRequested(){}_devicePrefix(){const t=this._config?.x_entity||"";if(t){const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);if(e)return e[1];const a=t.split(".")[1]?.split("_")||[];return a.slice(0,a.length-1).join("_")}const e=(this._config?.target_1_x_entity||"").match(/^sensor\.(.+?)_target_\d+_x$/);return e?e[1]:""}_loadFromDevice(){if(!this._hass||!this._config)return;const t=this._devicePrefix();if(!t)return;const e={...this._cal},a=["radar_x","radar_y","radar_z","yaw","pitch","roll"];for(const i of a){const a=this._hass.states[`number.${t}_${i}`];a&&a.state&&!isNaN(Number(a.state))&&(e[i]=Number(a.state))}const i=this._config.polygon_entity||`text.${t}_polygon_config`,r=this._hass.states[i];if(r&&r.state){const t=r.state.split(";").filter(t=>t.includes(",")).map(t=>{const[e,a]=t.split(",");return{x:parseFloat(e),y:parseFloat(a)}});t.length>0?e.polygon=t:e.polygon=[]}else r&&""===r.state&&(e.polygon=[]);const o=e.room_w??this._config.room_w,s=e.room_d??this._config.room_d;e.radar_x>o&&(e.radar_x=o),e.radar_y>s&&(e.radar_y=s),this._cal=e,this.requestUpdate()}async _sync(){const t=this._devicePrefix();if(t){this._syncState="syncing";try{const e={radar_x:this._cal.radar_x,radar_y:this._cal.radar_y,radar_z:this._cal.radar_z,yaw:this._cal.yaw,pitch:this._cal.pitch,roll:this._cal.roll};for(const[a,i]of Object.entries(e)){const e=`number.${t}_${a}`;try{await this._hass.callService("number","set_value",{entity_id:e,value:i})}catch(t){console.warn(`Failed to sync ${e}`,t)}}const a=this._cal.polygon.map(t=>`${t.x},${t.y}`).join(";"),i=this._config.polygon_entity||`text.${t}_polygon_config`;if(void 0!==this._hass.states[i])try{await this._hass.callService("text","set_value",{entity_id:i,value:a})}catch(t){console.warn(`Failed to sync ${i}`,t)}if(this._config.device_id&&this._config.radar_model)try{await this._hass.callWS({type:"mmwave_fusion/upsert_calibration_profile",profile:{profile_id:`device:${this._config.device_id}`,device_id:this._config.device_id,radar_model:this._config.radar_model,name:this._adapter.info.displayName,calibration:this._cal}})}catch(t){console.info("Shared calibration profile is not available",t)}this._syncState="success"}catch(t){this._syncState="error",console.error(t)}finally{null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._syncResetTimer=window.setTimeout(()=>this._syncState="idle",2200)}}else alert("Error: neither x_entity nor target_1_x_entity is configured.")}_reset(){if(!confirm(this._L("actions.reset_confirm")||"Reset to factory defaults?"))return;const t=this._adapter.getDefaultCalibration(),e=this._config.room_w,a=this._config.room_d;t.radar_x=Math.round(.382*e),t.radar_y=Math.round(.382*a),this._cal=t,this._gotoTab(0)}render(){if(!this._config||!this._adapter)return Y;if(this._config.radars?.length)return this._renderFusionMode();const t=this._cal.room_w??this._config.room_w,e=this._cal.room_d??this._config.room_d,a=this._hass?.language??"en",i=this._insideTargetCount(),r=[{icon:"mdi:cube-scan",title:this._t("card.installation"),description:this._t("card.place_the_radar_in_the_3d")},{icon:"mdi:compass-outline",title:this._t("card.direction"),description:this._t("card.calibrate_yaw_with_two_reference_points")},{icon:"mdi:radar",title:this._t("card.live_test"),description:this._t("card.verify_targets_boundary_and_trails")}];return this._isCalibrating?B`
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
                aria-current=${this._tab===e?"step":Y}
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
                .lang=${a}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-geo-panel>`:Y}
          ${1===this._tab?B` <mmwave-yaw-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${a}
                .roomW=${t}
                .roomD=${e}
                .maxRangeM=${this._maxRangeM}
              >
              </mmwave-yaw-panel>`:Y}
          ${2===this._tab?B` <mmwave-live-panel
                .adapter=${this._adapter}
                .calibration=${this._cal}
                .lang=${a}
                .roomW=${t}
                .roomD=${e}
                .targets=${this._targets}
                .present=${this._present}
                .maxRangeM=${this._maxRangeM}
                .showStatus=${!0}
              >
              </mmwave-live-panel>`:Y}
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
                </button>`:Y}
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
              <div class="logo-tile ${this._present?"online":""}">${Se}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name||this._t("card.presence_radar")}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span class="presence-chip ${i>0?"active":this._present?"filtered":""}">
                <i></i>
                ${i>0?this._t("card.p0_target_p1",{p0:i,p1:1===i?"":"s"}):this._present?this._t("card.outside"):this._t("card.clear")}
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
              .lang=${a}
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
            <div class="logo-tile ${this._fusionTargets.length?"online":""}">${Se}</div>
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
            .heatmap=${this._fusionHeatmap}
            .heatmapLoading=${this._fusionHeatmapLoading}
            .heatmapError=${this._fusionHeatmapError}
            @fusion-event-selected=${this._selectFusionEvent}
            @fusion-heatmap-requested=${this._loadFusionHeatmap}
            .replay=${this._fusionReplay}
            .replayLoading=${this._fusionReplayLoading}
            .replayError=${this._fusionReplayError}
            @fusion-replay-requested=${this._loadFusionReplay}
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
                        ${this._selectedFusionEvent.quality_reason?B` · ${this._selectedFusionEvent.quality_reason}`:Y}
                      </p>`:Y}
                  ${this._fusionVideoUrl?B`<video controls preload="metadata" .src=${this._fusionVideoUrl}></video>`:B`<p>
                        ${this._t("card.no_playable_clip_is_available_yet")}
                        ${this._selectedFusionEvent.clip_status?B` (${this._selectedFusionEvent.clip_status})`:Y}
                        ${this._selectedFusionEvent.clip_error?B`<br /><span class="clip-error">${this._selectedFusionEvent.clip_error}</span>`:Y}
                      </p>`}
                </section>
              `:Y}
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
  `}};t([_t()],Ke.prototype,"_config",void 0),t([_t()],Ke.prototype,"_adapter",void 0),t([_t()],Ke.prototype,"_cal",void 0),t([_t()],Ke.prototype,"_tab",void 0),t([_t()],Ke.prototype,"_isCalibrating",void 0),t([_t()],Ke.prototype,"_targets",void 0),t([_t()],Ke.prototype,"_present",void 0),t([_t()],Ke.prototype,"_maxRangeM",void 0),t([_t()],Ke.prototype,"_syncState",void 0),t([_t()],Ke.prototype,"_fusionTargets",void 0),t([_t()],Ke.prototype,"_fusionRadars",void 0),t([_t()],Ke.prototype,"_fusionBackendState",void 0),t([_t()],Ke.prototype,"_fusionEvents",void 0),t([_t()],Ke.prototype,"_fusionHistoryTrack",void 0),t([_t()],Ke.prototype,"_selectedFusionEvent",void 0),t([_t()],Ke.prototype,"_fusionVideoUrl",void 0),t([_t()],Ke.prototype,"_fusionHeatmap",void 0),t([_t()],Ke.prototype,"_fusionHeatmapLoading",void 0),t([_t()],Ke.prototype,"_fusionHeatmapError",void 0),t([_t()],Ke.prototype,"_fusionReplay",void 0),t([_t()],Ke.prototype,"_fusionReplayLoading",void 0),t([_t()],Ke.prototype,"_fusionReplayError",void 0),t([ut("mmwave-yaw-panel")],Ke.prototype,"_yawPanel",void 0),t([ut("mmwave-live-panel")],Ke.prototype,"_livePanel",void 0),Ke=t([dt(Re)],Ke);var Xe={fusion:{rate_hz:10,association_gate_cm:90,merge_gate_cm:70,track_ttl_s:1.2,confirm_hits:2,min_confirm_sources:2},quality:{min_score:70,min_duration_s:3,min_displacement_cm:120,require_enter_exit:!0,boundary_margin_cm:60},conditional:{track_ttl_s_with_r60abd1:3}};function Ue(t){const e=new Set(t.map(t=>t.id));let a=1;for(;e.has(`radar_${a}`);)a+=1;return`radar_${a}`}const Ze=["#0b825c","#03a9f4","#e91e63","#ff9800","#8bc34a","#9c27b0"];let Ge=class extends nt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.zones=[],this.radars=[],this.lang="en",this.originalId="",this.error=""}_t(t,e){return Me(t,this.lang,e)}beginNew(){let t=this.zones.length+1;for(;this.zones.some(e=>e.id===`zone_${t}`);)t++;this.originalId="",this.draft={id:`zone_${t}`,name:this._t("zone.zone_p0",{p0:t}),dwell_s:0,polygon:[]},this.error=""}select(t){this.originalId=t.id,this.draft={...t,polygon:t.polygon.map(t=>({...t}))},this.error=""}patch(t){this.draft&&(this.draft={...this.draft,...t})}addPoint(t){if(!this.draft)return;const e=t.currentTarget.getBoundingClientRect(),a={x:Math.round(Math.min(Math.max((t.clientX-e.left)/e.width*this.roomW,0),this.roomW)),y:Math.round(Math.min(Math.max((t.clientY-e.top)/e.height*this.roomD,0),this.roomD))};this.patch({polygon:[...this.draft.polygon,a]})}undoPoint(){this.draft?.polygon.length&&this.patch({polygon:this.draft.polygon.slice(0,-1)})}save(){if(!this.draft)return;const t=this.draft.id.trim();if(!t)return void(this.error=this._t("zone.zone_id_cannot_be_empty"));if(this.zones.some(e=>e.id===t&&e.id!==this.originalId))return void(this.error=this._t("zone.zone_id_must_be_unique"));if(this.draft.polygon.length<3)return void(this.error=this._t("zone.at_least_three_vertices_are_required"));const e={...this.draft,id:t,name:this.draft.name?.trim()||t},a=this.originalId?this.zones.map(t=>t.id===this.originalId?e:t):[...this.zones,e];this.originalId=t,this.draft=e,this.error="",this.emit(a)}removeZone(){this.originalId&&this.emit(this.zones.filter(t=>t.id!==this.originalId)),this.draft=void 0,this.originalId="",this.error=""}emit(t){this.dispatchEvent(new CustomEvent("zones-changed",{detail:t,bubbles:!0,composed:!0}))}pointString(t){return t.map(t=>`${t.x},${t.y}`).join(" ")}render(){const t=this.draft?[...this.zones.filter(t=>t.id!==this.originalId),this.draft]:this.zones;return B`
      <div class="toolbar">
        <div class="zone-tabs">
          ${this.zones.map((t,e)=>B`<button
                type="button"
                class=${this.originalId===t.id?"active":""}
                style="--zone-color:${Ze[e%Ze.length]}"
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
        ${t.map((t,e)=>{const a=this.draft===t,i=Ze[e%Ze.length];return B`
            ${t.polygon.length>=3?B`<polygon
                  points=${this.pointString(t.polygon)}
                  fill=${i}
                  fill-opacity=${a?".20":".09"}
                  stroke=${i}
                  stroke-width=${a?"3":"2"}
                  vector-effect="non-scaling-stroke"
                />`:B`<polyline
                  points=${this.pointString(t.polygon)}
                  fill="none"
                  stroke=${i}
                  stroke-width="3"
                  vector-effect="non-scaling-stroke"
                />`}
            ${t.polygon.map((t,e)=>B`
                <circle
                  cx=${t.x}
                  cy=${t.y}
                  r="7"
                  fill=${i}
                  stroke="white"
                  stroke-width="2"
                  vector-effect="non-scaling-stroke"
                />
                ${a?B`<text x=${t.x} y=${t.y-12} class="point-label">${e+1}</text>`:Y}
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
            ${this.error?B`<div class="error">${this.error}</div>`:Y}
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
  `}};t([ht({type:Number})],Ge.prototype,"roomW",void 0),t([ht({type:Number})],Ge.prototype,"roomD",void 0),t([ht({attribute:!1})],Ge.prototype,"zones",void 0),t([ht({attribute:!1})],Ge.prototype,"radars",void 0),t([ht({attribute:!1})],Ge.prototype,"lang",void 0),t([_t()],Ge.prototype,"draft",void 0),t([_t()],Ge.prototype,"originalId",void 0),t([_t()],Ge.prototype,"error",void 0),Ge=t([dt("mmwave-zone-editor")],Ge);const Ve=t=>{let e=t;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e},Je=t=>Math.round(10*t)/10;const Qe=t=>t.length?Math.sqrt(t.reduce((t,e)=>t+e*e,0)/t.length):1/0;const ta=["#03a9f4","#9c27b0","#ff9800","#e91e63","#4caf50","#795548"],ea=t=>{const e=[...t].sort((t,e)=>t-e),a=Math.floor(e.length/2);return e.length%2?e[a]:(e[a-1]+e[a])/2},aa=t=>({...gt,...t.calibration??{},polygon:t.calibration?.polygon??[]});let ia=class extends nt{constructor(){super(...arguments),this.radars=[],this.roomW=400,this.roomD=600,this.lang="en",this.references=[],this.selectedRegionId="region_a",this.capturing=!1,this.captureProgress=0,this.captureMessage="",this.captureCounts={},this.mobileFocus=!1,this.detailsExpanded=!1,this.sampleBuffers=new Map,this.signatures=new Map,this.drawFrame=0}_t(t,e){return Me(t,this.lang,e)}firstUpdated(){this.scheduleDraw()}updated(t){(t.has("radars")||t.has("roomW")||t.has("roomD")||t.has("references")||t.has("selectedRegionId")||t.has("captureCounts")||t.has("mobileFocus"))&&this.scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this.clearCaptureTimers(),cancelAnimationFrame(this.drawFrame)}async toggleMobileFocus(){this.mobileFocus=!this.mobileFocus,this.mobileFocus&&(this.detailsExpanded=!1),await this.updateComplete,this.mobileFocus&&this.renderRoot.querySelector(".calibration-shell")?.scrollTo({top:0}),this.scheduleDraw()}toggleDetails(){this.detailsExpanded=!this.detailsExpanded}metrics(){const t=this.canvas?.offsetWidth||520;return{W:t,H:Math.max(240,Math.min(420,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD}}scheduleDraw(){cancelAnimationFrame(this.drawFrame),this.drawFrame=requestAnimationFrame(()=>this.draw())}get guidedRegions(){const t=(t,e,a,i)=>({id:t,label:e,room:{x:Math.round(this.roomW*a),y:Math.round(this.roomD*i)}});return[t("region_a","A",.23,.22),t("region_b","B",.77,.78),t("region_c","C",.77,.22),t("region_d","D",.23,.78),t("region_e","E",.5,.5),t("region_f","F",.23,.5),t("region_g","G",.77,.5)]}get selectedRegion(){return this.guidedRegions.find(t=>t.id===this.selectedRegionId)??this.guidedRegions[0]}get regionRadiusCm(){return Math.max(32,Math.min(60,.09*Math.min(this.roomW,this.roomD)))}drawGuidedRegion(t,e,a){const i=he(a.room.x,a.room.y,e),r=he(a.room.x+this.regionRadiusCm,a.room.y,e),o=Math.max(18,Math.min(34,Math.abs(r.cx-i.cx))),s=this.references.find(t=>t.id===a.id),n=new Set(Object.keys(s?.readings??{}));this.capturing&&a.id===this.selectedRegionId&&this.radars.forEach(t=>{(this.captureCounts[t.id]??0)>=3&&n.add(t.id)});const l=this.radars.length>0&&n.size===this.radars.length;t.save(),t.fillStyle="rgba(100, 116, 139, 0.18)",t.beginPath(),t.arc(i.cx,i.cy,o,0,2*Math.PI),t.fill();const d=2*Math.PI/Math.max(1,this.radars.length);this.radars.forEach((e,a)=>{if(!n.has(e.id))return;const r=-Math.PI/2+a*d;t.fillStyle=ta[a%ta.length],t.globalAlpha=.82,t.beginPath(),t.moveTo(i.cx,i.cy),t.arc(i.cx,i.cy,o,r,r+d),t.closePath(),t.fill()}),t.globalAlpha=1,t.strokeStyle=l?"#0b825c":a.id===this.selectedRegionId?"#0284c7":"rgba(100, 116, 139, 0.45)",t.lineWidth=a.id===this.selectedRegionId?3:1.5,t.setLineDash(a.id!==this.selectedRegionId||l?[]:[5,4]),t.beginPath(),t.arc(i.cx,i.cy,o+2,0,2*Math.PI),t.stroke(),t.setLineDash([]),t.fillStyle="rgba(255, 255, 255, 0.92)",t.beginPath(),t.arc(i.cx,i.cy,9,0,2*Math.PI),t.fill(),t.fillStyle=l?"#0b825c":a.id===this.selectedRegionId?"#0284c7":"#64748b",t.font="bold 10px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(a.label,i.cx,i.cy+.5),t.restore()}draw(){const t=this.canvas;if(!t||!t.offsetWidth)return;const e=this.metrics(),a=ge(t,e.H);me(a,e);const i=new Map(this.solutions.map(t=>[t.radarId,t]));this.radars.forEach(t=>{const i=oe(t.radar_model);if(!i)return;const r=aa(t),o=he(r.radar_x,r.radar_y,e);a.save(),a.globalAlpha=.045,ve(a,o.cx,o.cy,r.yaw,r.pitch,i.info.fovDegrees,i.info.minRangeM,i.info.maxRangeM,e,i.info.vitalRangeM),a.restore()}),this.guidedRegions.forEach(t=>this.drawGuidedRegion(a,e,t)),this.radars.forEach((t,r)=>{const o=aa(t),s=he(o.radar_x,o.radar_y,e);a.fillStyle=ta[r%ta.length],a.beginPath(),a.arc(s.cx,s.cy,4,0,2*Math.PI),a.fill(),a.font="bold 9px system-ui",a.textAlign="center",a.fillText(t.id,s.cx,s.cy-10);const n=i.get(t.id);if(n)for(const i of this.references){const o=i.readings[t.id];if(!o)continue;const s=le(o.rawX,o.rawY,o.rawZ,n.calibration),l=he(s.roomX,s.roomY,e);a.save(),a.globalAlpha=.75,a.fillStyle=ta[r%ta.length],a.beginPath(),a.arc(l.cx,l.cy,3,0,2*Math.PI),a.fill(),a.restore()}})}onCanvasClick(t){if(this.capturing||!this.canvas)return;const e=ue(t,this.canvas),a=_e(e.x,e.y,this.metrics()),i=this.guidedRegions.map(t=>({region:t,distance:Math.hypot(t.room.x-a.x,t.room.y-a.y)})).sort((t,e)=>t.distance-e.distance)[0];!i||i.distance>1.55*this.regionRadiusCm?this.captureMessage=this._t("fusioncal.tap_a_guided_region"):(this.selectedRegionId=i.region.id,this.captureMessage=this._t("fusioncal.move_to_region_p0",{p0:i.region.label}))}beginCapture(){if(this.capturing)return;this.capturing=!0,this.captureProgress=0,this.captureMessage=this._t("fusioncal.capturing_region_p0",{p0:this.selectedRegion.label}),this.sampleBuffers=new Map(this.radars.map(t=>[t.id,[]])),this.captureCounts=Object.fromEntries(this.radars.map(t=>[t.id,0])),this.signatures.clear();const t=Date.now();this.collectSamples(),this.captureInterval=window.setInterval(()=>{this.collectSamples(),this.captureProgress=Math.min(1,(Date.now()-t)/3e3)},100),this.captureTimer=window.setTimeout(()=>this.finishCapture(),3e3)}collectSamples(){if(!this.hass)return;const t=this.selectedRegion.room;let e=!1;for(const a of this.radars){const i=this.readRadarTargets(a);if(!i||i.signature===this.signatures.get(a.id)||!i.targets.length)continue;this.signatures.set(a.id,i.signature);const r=aa(a),o=i.targets.map(e=>{const a=le(e.rawX,e.rawY,e.rawZ,r);return{target:e,distance:Math.hypot(a.roomX-t.x,a.roomY-t.y)}}).sort((t,e)=>t.distance-e.distance)[0];o&&(this.sampleBuffers.get(a.id)?.push({x:o.target.rawX,y:o.target.rawY,z:o.target.rawZ}),e=!0)}e&&(this.captureCounts=Object.fromEntries(this.radars.map(t=>[t.id,this.sampleBuffers.get(t.id)?.length??0])))}readRadarTargets(t){const e=t.frame_entity?this.hass.states[t.frame_entity]:void 0,a=e?pe(e.state):void 0;if(a){const e=Number(t.frame_coordinate_scale??1);return{signature:`${a.frameId}:${a.sourceTimestamp}`,targets:a.targets.map((t,a)=>({index:a,rawX:t.x*e,rawY:t.y*e,rawZ:t.z*e,speed:null==t.speed?void 0:t.speed*e}))}}const i=oe(t.radar_model);if(!i)return;const r={...t,type:"custom:mmwave-card",room_w:this.roomW,room_d:this.roomD};return{signature:Object.entries(t).filter(([t,e])=>t.endsWith("_entity")&&"string"==typeof e).map(([,t])=>this.hass.states[String(t)]?.last_updated??"missing").join("|"),targets:i.readFromHass(this.hass,r).targets}}finishCapture(){const t=this.selectedRegion;this.clearCaptureTimers(),this.capturing=!1,this.captureProgress=1;const e=this.references.find(e=>e.id===t.id),a={...e?.readings??{}};let i=0;for(const t of this.radars){const e=this.sampleBuffers.get(t.id)??[];if(e.length<3)continue;const r=ea(e.map(t=>t.x)),o=ea(e.map(t=>t.y)),s=ea(e.map(t=>t.z)),n=ea(e.map(t=>Math.hypot(t.x-r,t.y-o)));a[t.id]={rawX:Math.round(10*r)/10,rawY:Math.round(10*o)/10,rawZ:Math.round(10*s)/10,samples:e.length,spreadCm:Math.round(10*n)/10},i+=1}if(!i)return this.captureMessage=this._t("fusioncal.no_radar_produced_enough_stable_samples"),void(this.captureCounts={});const r={id:t.id,room:t.room,readings:a},o=new Map(this.guidedRegions.map((t,e)=>[t.id,e])),s=[...this.references.filter(e=>e.id!==t.id),r].sort((t,e)=>(o.get(t.id)??99)-(o.get(e.id)??99));this.references=s,this.captureCounts={},s.length===this.guidedRegions.length&&(this.detailsExpanded=!0),this.captureMessage=this._t("fusioncal.region_p0_captured_p1_p2_radars",{p0:t.label,p1:Object.keys(a).length,p2:this.radars.length}),this.selectedRegionId=this.recommendNextRegion(s,t.id)}recommendNextRegion(t,e){const a=e=>Object.keys(t.find(t=>t.id===e.id)?.readings??{}).length,i=this.guidedRegions.find(t=>t.id!==e&&0===a(t));if(i)return i.id;const r=this.guidedRegions.filter(t=>t.id!==e&&a(t)<this.radars.length).sort((t,e)=>a(t)-a(e))[0];return r?.id??e}clearCaptureTimers(){null!=this.captureInterval&&window.clearInterval(this.captureInterval),null!=this.captureTimer&&window.clearTimeout(this.captureTimer),this.captureInterval=void 0,this.captureTimer=void 0}get solutions(){return this.radars.map(t=>function(t,e,a){const i=a.map(e=>({room:e.room,reading:e.readings[t]})).filter(t=>Boolean(t.reading));if(i.length<2)return;const r=i.reduce((t,e)=>t+e.reading.rawX,0)/i.length,o=i.reduce((t,e)=>t+e.reading.rawY,0)/i.length,s=i.reduce((t,e)=>t+e.room.x,0)/i.length,n=i.reduce((t,e)=>t+e.room.y,0)/i.length;let l=0,d=0;for(const t of i){const e=t.reading.rawX-r,a=t.reading.rawY-o,i=t.room.x-s,c=t.room.y-n;l+=e*i+a*c,d+=e*c-a*i}if(Math.hypot(l,d)<1)return;const c=Math.atan2(d,l),p=Ve(180*-c/Math.PI),h=Math.cos(c),_=Math.sin(c),u=s-(h*r-_*o),g=n-(_*r+h*o),m={...e,radar_x:Je(u),radar_y:Je(g),yaw:Je(p)},f=i.map(t=>{const a=le(t.reading.rawX,t.reading.rawY,t.reading.rawZ,e);return Math.hypot(a.roomX-t.room.x,a.roomY-t.room.y)}),y=i.map(t=>{const e=le(t.reading.rawX,t.reading.rawY,t.reading.rawZ,m);return Math.hypot(e.roomX-t.room.x,e.roomY-t.room.y)});let b=0;for(let t=0;t<i.length;t+=1)for(let e=t+1;e<i.length;e+=1)b=Math.max(b,Math.hypot(i[t].room.x-i[e].room.x,i[t].room.y-i[e].room.y));return{radarId:t,calibration:m,pointCount:i.length,sampleCount:i.reduce((t,e)=>t+e.reading.samples,0),referenceSpanCm:Je(b),residualBeforeCm:Je(Qe(f)),residualAfterCm:Je(Qe(y)),maxResidualCm:Je(Math.max(...y))}}(t.id,aa(t),this.references)).filter(t=>Boolean(t))}removeReference(t){this.references=this.references.filter(e=>e.id!==t),this.selectedRegionId=t,this.captureMessage=""}reset(){this.capturing||(this.references=[],this.selectedRegionId=this.guidedRegions[0].id,this.captureCounts={},this.captureMessage="",this.detailsExpanded=!1)}applySolutions(){const t=this.solutions;this.solutionsReady(t)&&this.dispatchEvent(new CustomEvent("fusion-calibration-applied",{detail:{solutions:t},bubbles:!0,composed:!0}))}applySolutionsAndExitMobile(){this.applySolutions(),this.mobileFocus=!1}get referenceSpanCm(){let t=0;for(let e=0;e<this.references.length;e+=1)for(let a=e+1;a<this.references.length;a+=1)t=Math.max(t,Math.hypot(this.references[e].room.x-this.references[a].room.x,this.references[e].room.y-this.references[a].room.y));return t}solutionMeetsQuality(t){return t.pointCount>=3&&t.referenceSpanCm>=120&&t.residualAfterCm<=40&&t.calibration.radar_x>=-50&&t.calibration.radar_x<=this.roomW+50&&t.calibration.radar_y>=-50&&t.calibration.radar_y<=this.roomD+50}qualityMessage(t){return t.pointCount<3?this._t("fusioncal.quality_not_enough_points",{p0:t.pointCount}):t.referenceSpanCm<120?this._t("fusioncal.quality_span_too_small",{p0:t.referenceSpanCm}):t.residualAfterCm>40?this._t("fusioncal.quality_residual_too_high",{p0:t.residualAfterCm,p1:40}):t.calibration.radar_x<-50||t.calibration.radar_x>this.roomW+50||t.calibration.radar_y<-50||t.calibration.radar_y>this.roomD+50?this._t("fusioncal.quality_reference_outside_room"):this._t("fusioncal.quality_reference_accepted",{p0:t.residualAfterCm})}formatParameter(t){return Number.isInteger(t)?String(t):t.toFixed(1)}formatAdjustment(t){const e=this.formatParameter(t);return t>0?`+${e}`:e}solutionsReady(t){return this.references.length>=3&&this.referenceSpanCm>=120&&t.length===this.radars.length&&t.every(t=>this.solutionMeetsQuality(t))}render(){const t=this.solutions,e=this.solutionsReady(t),a=this.selectedRegion,i=this.references.find(t=>t.id===a.id),r=Object.keys(i?.readings??{}).length,o=t.filter(t=>this.solutionMeetsQuality(t)).length,s=this.radars.filter(t=>(this.captureCounts[t.id]??0)>=3).length,n=this.references.length>=3?this.radars.filter(e=>{const a=t.find(t=>t.radarId===e.id);return!a||!this.solutionMeetsQuality(a)}):[];return B`
      <section
        class=${"calibration-shell "+(this.mobileFocus?"mobile-focus":"")}
        aria-busy=${this.capturing?"true":"false"}
      >
        <div class="mobile-mode-bar">
          <span>
            <strong>${this._t("fusioncal.mobile_calibration")}</strong>
            <small>${this._t("fusioncal.mobile_calibration_hint")}</small>
          </span>
          <button
            type="button"
            class="mobile-mode-toggle"
            aria-pressed=${this.mobileFocus?"true":"false"}
            @click=${this.toggleMobileFocus}
          >
            ${this.mobileFocus?this._t("fusioncal.exit_mobile_calibration"):this._t("fusioncal.enter_mobile_calibration")}
          </button>
        </div>
        <div class="intro">
          <span class="eyebrow">${this._t("fusioncal.joint_direction_calibration")}</span>
          <strong>${this._t("fusioncal.calibrate_every_radar_from_shared_positions")}</strong>
          <p>${this._t("fusioncal.keep_only_one_test_person_in")}</p>
        </div>
        <div class="guide-card" role="status" aria-live="polite">
          <b>${a.label}</b>
          <span>
            <strong>${this._t("fusioncal.move_to_region_p0",{p0:a.label})}</strong>
            <small>
              ${this.capturing?this._t("fusioncal.capturing_p0_percent_p1_p2_radars_ready",{p0:Math.round(100*this.captureProgress),p1:s,p2:this.radars.length}):this._t("fusioncal.stand_near_center_then_hold_still",{p0:a.room.x,p1:a.room.y,p2:r,p3:this.radars.length})}
            </small>
          </span>
        </div>
        <canvas
          id="fusion-calibration-canvas"
          aria-label=${this._t("fusioncal.guided_capture_floor_plan")}
          @click=${this.onCanvasClick}
        ></canvas>
        <div class=${`capture-dock ${e?"ready":""} ${this.capturing?"capturing":""}`}>
          <div class="capture-bar">
            <span>${this._t("fusioncal.tap_another_region_or_follow_recommendation")}</span>
            <button class="capture-action" type="button" ?disabled=${this.capturing} @click=${this.beginCapture}>
              ${this.capturing?this._t("fusioncal.capturing_p0_percent",{p0:Math.round(100*this.captureProgress)}):this._t("fusioncal.i_am_ready_capture_all")}
            </button>
            <button class="mobile-apply" type="button" @click=${this.applySolutionsAndExitMobile}>
              ${this._t("fusioncal.apply_all_calibrations")}
            </button>
          </div>
          ${this.capturing?B`<div class="progress"><i style=${`width:${Math.round(100*this.captureProgress)}%`}></i></div>`:Y}
        </div>
        <div class=${"radar-sample-status "+(this.capturing?"capturing":"")}>
          ${this.radars.map(t=>{const e=this.captureCounts[t.id]??0,a=this.references.filter(e=>e.readings[t.id]).length;return B`
              <span class=${this.capturing&&e>=3?"live-ready":""}>
                <i style=${`background:${ta[this.radars.indexOf(t)%ta.length]}`}></i>
                ${t.id} ·
                ${this.capturing?this._t("fusioncal.p0_p1_samples",{p0:Math.min(e,3),p1:3}):this._t("fusioncal.p0_reference_points",{p0:a})}
              </span>
            `})}
        </div>
        ${this.captureMessage?B`<div class="message" role="status" aria-live="polite">${this.captureMessage}</div>`:Y}
        <button
          type="button"
          class="details-toggle"
          aria-expanded=${this.detailsExpanded?"true":"false"}
          @click=${this.toggleDetails}
        >
          <span>
            <strong>
              ${this._t("fusioncal.p0_p1_regions_captured",{p0:this.references.length,p1:this.guidedRegions.length})}
            </strong>
            <small>
              ${this._t("fusioncal.p0_p1_radars_ready_short",{p0:o,p1:this.radars.length})}
            </small>
          </span>
          <b>
            ${this.detailsExpanded?this._t("fusioncal.hide_capture_details"):this._t("fusioncal.show_capture_details")}
          </b>
        </button>
        <div class=${"calibration-details "+(this.detailsExpanded?"expanded":"")}>
          <div class="reference-list">
            ${this.references.map(t=>{const e=this.guidedRegions.find(e=>e.id===t.id),a=Object.keys(t.readings).length;return B`
                <div class="reference">
                  <b class=${a===this.radars.length?"complete":""}>${e?.label??"?"}</b>
                  <span>X ${t.room.x} · Y ${t.room.y} cm</span>
                  <small>${a}/${this.radars.length} ${this._t("fusioncal.radars")}</small>
                  <button type="button" @click=${()=>this.removeReference(t.id)}>×</button>
                </div>
              `})}
          </div>
          ${n.length?B`
                <div class="installation-review">
                  <strong>${this._t("fusioncal.review_installation_parameters")}</strong>
                  <span>
                    ${this._t("fusioncal.review_p0_radars_before_retrying",{p0:n.map(t=>t.id).join(", ")})}
                  </span>
                  <small>${this._t("fusioncal.xy_yaw_only_manual_note")}</small>
                </div>
              `:Y}
          ${t.length?B`
                <div class="results">
                  ${this.radars.map(e=>{const a=t.find(t=>t.radarId===e.id),i=aa(e),r=Boolean(a&&this.solutionMeetsQuality(a)),o=a?function(t,e){return{radarX:Je(e.radar_x-t.radar_x),radarY:Je(e.radar_y-t.radar_y),yaw:Je(Ve(e.yaw-t.yaw))}}(i,a.calibration):void 0;return B`
                      <div class="result ${r?"":"bad"}">
                        <header>
                          <span><strong>${e.id}</strong><small>${e.radar_model}</small></span>
                          <b class="status ${r?"accepted":"review"}">
                            ${r?this._t("fusioncal.calibration_reference_accepted"):this._t("fusioncal.installation_needs_review")}
                          </b>
                        </header>
                        ${a?B`
                              <div class="residual">
                                <strong>${a.residualBeforeCm} → ${a.residualAfterCm} cm</strong>
                                <small class=${r?"":"warning"}>${this.qualityMessage(a)}</small>
                              </div>
                              <div class="parameter-grid">
                                <div>
                                  <small>${this._t("fusioncal.current_installation")}</small>
                                  <span>
                                    X ${this.formatParameter(i.radar_x)} · Y
                                    ${this.formatParameter(i.radar_y)} · yaw ${this.formatParameter(i.yaw)}°
                                  </span>
                                </div>
                                <div>
                                  <small>${this._t("fusioncal.fitted_reference")}</small>
                                  <span>
                                    X ${this.formatParameter(a.calibration.radar_x)} · Y
                                    ${this.formatParameter(a.calibration.radar_y)} · yaw
                                    ${this.formatParameter(a.calibration.yaw)}°
                                  </span>
                                </div>
                                <div class="adjustment">
                                  <small>${this._t("fusioncal.suggested_manual_adjustment")}</small>
                                  <span>
                                    ΔX ${this.formatAdjustment(o?.radarX??0)} · ΔY
                                    ${this.formatAdjustment(o?.radarY??0)} · Δyaw
                                    ${this.formatAdjustment(o?.yaw??0)}°
                                  </span>
                                </div>
                              </div>
                              <small class="solution-meta">
                                ${a.pointCount} ${this._t("fusioncal.points")} · yaw ${a.calibration.yaw}°
                                · ${this._t("fusioncal.span_p0_cm",{p0:a.referenceSpanCm})} · max
                                ${a.maxResidualCm} cm
                              </small>
                            `:B`<span class="missing">${this._t("fusioncal.not_enough_references")}</span>`}
                      </div>
                    `})}
                </div>
              `:Y}
        </div>
        <div class="calibration-progress">
          ${this._t("fusioncal.p0_p1_radars_ready",{p0:o,p1:this.radars.length})}
        </div>
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
    .mobile-mode-bar,
    .details-toggle,
    .mobile-apply {
      display: none;
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
    .guide-card {
      display: flex;
      align-items: center;
      gap: 9px;
      margin: 0 11px 9px;
      padding: 9px 10px;
      border: 1px solid color-mix(in srgb, #0284c7 38%, var(--divider-color, transparent));
      border-radius: 10px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, #0284c7 8%, transparent);
    }
    .guide-card > b {
      width: 30px;
      height: 30px;
      display: grid;
      flex: 0 0 30px;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: #0284c7;
      font-size: 14px;
    }
    .guide-card span {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .guide-card strong {
      font-size: 11px;
    }
    .guide-card small {
      color: var(--secondary-text-color);
      font-size: 9px;
      line-height: 1.45;
    }
    canvas {
      display: block;
      max-width: 100%;
      width: 100%;
      cursor: pointer;
      touch-action: manipulation;
    }
    .capture-dock {
      background: var(--card-background-color, #fff);
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
    .radar-sample-status {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding: 8px 11px 0;
    }
    .radar-sample-status span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 7px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.04);
      font-size: 9px;
    }
    .radar-sample-status span.live-ready {
      border-color: color-mix(in srgb, var(--primary-color, #0b825c) 48%, transparent);
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 8%, transparent);
    }
    .radar-sample-status i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .message {
      padding: 7px 11px;
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .calibration-details {
      min-width: 0;
    }
    .reference-list,
    .results {
      display: grid;
      gap: 5px;
      padding: 8px 11px;
    }
    .installation-review {
      display: grid;
      gap: 4px;
      margin: 8px 11px 0;
      padding: 9px 10px;
      border: 1px solid color-mix(in srgb, var(--warning-color, #f59e0b) 45%, transparent);
      border-radius: 9px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--warning-color, #f59e0b) 9%, transparent);
      font-size: 10px;
      line-height: 1.45;
    }
    .installation-review strong {
      color: var(--warning-color, #b45309);
      font-size: 11px;
    }
    .installation-review small {
      color: var(--secondary-text-color);
      font-size: 9px;
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
      background: #64748b;
    }
    .reference b.complete {
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
      gap: 7px;
      min-width: 0;
      padding: 9px;
      border-radius: 8px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, transparent);
      font-size: 10px;
    }
    .result.bad {
      background: color-mix(in srgb, var(--error-color, #e53935) 7%, transparent);
    }
    .result header,
    .result header > span {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .result header {
      justify-content: space-between;
    }
    .result header > span small,
    .solution-meta {
      color: var(--secondary-text-color);
    }
    .status {
      flex: 0 0 auto;
      padding: 3px 6px;
      border-radius: 999px;
      font-size: 8px;
    }
    .status.accepted {
      color: var(--primary-color, #0b825c);
      background: color-mix(in srgb, var(--primary-color, #0b825c) 12%, transparent);
    }
    .status.review {
      color: var(--error-color, #c62828);
      background: color-mix(in srgb, var(--error-color, #e53935) 12%, transparent);
    }
    .residual {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }
    .residual small {
      color: var(--secondary-text-color);
      text-align: right;
    }
    .residual small.warning {
      color: var(--error-color, #c62828);
    }
    .parameter-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
      min-width: 0;
    }
    .parameter-grid > div {
      display: grid;
      gap: 3px;
      min-width: 0;
      padding: 6px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.14));
      border-radius: 7px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 72%, transparent);
    }
    .parameter-grid small {
      color: var(--secondary-text-color);
      font-size: 8px;
    }
    .parameter-grid span {
      overflow-wrap: anywhere;
      font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
      line-height: 1.45;
    }
    .parameter-grid .adjustment {
      border-color: color-mix(in srgb, var(--primary-color, #0b825c) 24%, transparent);
    }
    .solution-meta {
      font-size: 8px;
    }
    .missing {
      color: var(--error-color, #c62828);
    }
    .calibration-progress {
      padding: 5px 11px 0;
      color: var(--secondary-text-color);
      font-size: 9px;
      text-align: right;
    }
    .actions {
      justify-content: flex-end;
    }
    .actions .secondary {
      color: var(--secondary-text-color);
      background: rgba(128, 128, 128, 0.08);
    }
    @media (max-width: 600px) {
      .calibration-shell {
        border-radius: 10px;
      }
      .mobile-mode-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 11px;
        border-bottom: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
        color: var(--primary-text-color);
        background: color-mix(in srgb, var(--primary-color, #0b825c) 7%, var(--card-background-color, #fff));
      }
      .mobile-mode-bar > span {
        display: grid;
        gap: 2px;
        min-width: 0;
      }
      .mobile-mode-bar strong {
        font-size: 12px;
      }
      .mobile-mode-bar small {
        color: var(--secondary-text-color);
        font-size: 9px;
        line-height: 1.35;
      }
      .mobile-mode-toggle {
        flex: 0 0 auto;
        min-height: 44px;
      }
      .capture-bar,
      .actions {
        align-items: stretch;
        flex-direction: column;
      }
      .capture-bar button,
      .actions button {
        width: 100%;
      }
      .parameter-grid {
        grid-template-columns: 1fr;
      }
      .residual {
        align-items: flex-start;
        flex-direction: column;
      }
      .residual small {
        text-align: left;
      }
      button {
        min-height: 44px;
      }
      .details-toggle {
        display: flex;
        width: calc(100% - 22px);
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 9px 11px 0;
        padding: 9px 10px;
        border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.15));
        color: var(--primary-text-color);
        background: rgba(128, 128, 128, 0.05);
        text-align: left;
      }
      .details-toggle > span {
        display: grid;
        gap: 2px;
      }
      .details-toggle small {
        color: var(--secondary-text-color);
        font-size: 9px;
      }
      .details-toggle > b {
        flex: 0 0 auto;
        color: var(--primary-color, #0b825c);
        font-size: 9px;
      }
      .calibration-details:not(.expanded) {
        display: none;
      }
      .reference {
        grid-template-columns: 24px minmax(0, 1fr) auto 44px;
      }
      .reference button {
        width: 44px;
        height: 44px;
      }
      .mobile-focus {
        position: fixed;
        z-index: 10000;
        inset: 0;
        box-sizing: border-box;
        width: 100vw;
        height: 100dvh;
        padding-bottom: calc(94px + env(safe-area-inset-bottom));
        overflow-x: hidden;
        overflow-y: auto;
        overscroll-behavior: contain;
        border: 0;
        border-radius: 0;
      }
      .mobile-focus .mobile-mode-bar {
        position: sticky;
        z-index: 12;
        top: 0;
        min-height: 52px;
        box-sizing: border-box;
        padding-top: calc(8px + env(safe-area-inset-top));
        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
      }
      .mobile-focus .mobile-mode-bar small {
        display: none;
      }
      .mobile-focus .intro {
        display: none;
      }
      .mobile-focus .guide-card {
        position: sticky;
        z-index: 11;
        top: calc(52px + env(safe-area-inset-top));
        margin: 0;
        padding: 10px 12px;
        border-right: 0;
        border-left: 0;
        border-radius: 0;
        background: color-mix(in srgb, #0284c7 11%, var(--card-background-color, #fff));
        box-shadow: 0 5px 13px rgba(15, 23, 42, 0.07);
      }
      .mobile-focus .guide-card > b {
        width: 36px;
        height: 36px;
        flex-basis: 36px;
      }
      .mobile-focus .guide-card strong {
        font-size: 13px;
      }
      .mobile-focus .guide-card small {
        font-size: 10px;
      }
      .mobile-focus .capture-dock {
        position: fixed;
        z-index: 10020;
        right: 8px;
        bottom: calc(8px + env(safe-area-inset-bottom));
        left: 8px;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--primary-color, #0b825c) 22%, var(--divider-color, transparent));
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.24);
      }
      .mobile-focus .capture-bar {
        padding: 8px;
        border-top: 0;
      }
      .mobile-focus .capture-bar > span {
        display: none;
      }
      .mobile-focus .capture-bar button {
        min-height: 54px;
        border-radius: 11px;
        font-size: 14px;
      }
      .mobile-focus .radar-sample-status:not(.capturing) {
        display: none;
      }
      .mobile-focus .capture-dock.ready:not(.capturing) .capture-action {
        display: none;
      }
      .mobile-focus .capture-dock.ready:not(.capturing) .mobile-apply {
        display: block;
      }
      .mobile-focus .calibration-progress,
      .mobile-focus .actions {
        margin-right: 8px;
        margin-left: 8px;
      }
    }
  `}};function ra(t,e){return"min_confirm_sources"===t?Math.min(2,Math.max(1,e.length)):"track_ttl_s"===t&&e.some(t=>"r60abd1"===t.radar_model)?Xe.conditional.track_ttl_s_with_r60abd1:Xe.fusion[t]}function oa(t,e,a){const i=`${t} ${e}`.toLowerCase();return function(t){const e=[];for(const a of Object.values(ke)){const i=a?.entity_aliases?.[t];Array.isArray(i)&&e.push(...i.map(t=>String(t).toLowerCase()))}return e}(a).some(t=>i.includes(t))}t([ht({attribute:!1})],ia.prototype,"hass",void 0),t([ht({attribute:!1})],ia.prototype,"radars",void 0),t([ht({type:Number})],ia.prototype,"roomW",void 0),t([ht({type:Number})],ia.prototype,"roomD",void 0),t([ht({attribute:!1})],ia.prototype,"lang",void 0),t([_t()],ia.prototype,"references",void 0),t([_t()],ia.prototype,"selectedRegionId",void 0),t([_t()],ia.prototype,"capturing",void 0),t([_t()],ia.prototype,"captureProgress",void 0),t([_t()],ia.prototype,"captureMessage",void 0),t([_t()],ia.prototype,"captureCounts",void 0),t([_t()],ia.prototype,"mobileFocus",void 0),t([_t()],ia.prototype,"detailsExpanded",void 0),t([ut("#fusion-calibration-canvas")],ia.prototype,"canvas",void 0),ia=t([dt("mmwave-fusion-calibration")],ia);let sa=class extends nt{constructor(){super(...arguments),this._devices=[],this._advOpen=!1,this._deviceStatus="idle",this._matchedEntities=0,this._fusionJsonError="",this._calibrationProfiles=[],this._selectedFusionRadar=0,this._profileStatus="",this._profilesLoaded=!1}updated(t){super.updated(t),t.has("hass")&&this.hass&&0===this._devices.length&&this._loadDevices(),t.has("hass")&&this.hass&&!this._profilesLoaded&&(this._profilesLoaded=!0,this._loadCalibrationProfiles())}async _loadDevices(){try{this._devices=await this.hass.callWS({type:"config/device_registry/list"})}catch(t){console.warn("Failed to load devices",t)}}async _loadCalibrationProfiles(){try{this._calibrationProfiles=await this.hass.callWS({type:"mmwave_fusion/list_calibration_profiles"})}catch(t){console.info("Calibration profiles are not available",t),this._calibrationProfiles=[]}}setConfig(t){this._config={...mt,...t}}_L(t){return Me(t,this.hass?.language)}_t(t,e){return Me(t,this.hass?.language,e)}_changed(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_setMode(t){if("fusion"===t){const t={id:"radar_1",radar_model:"ld2450",device_id:"",calibration:{radar_x:100,radar_y:100,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}};this._config={...this._config,fusion_id:this._config.fusion_id||"home",sync_backend:!0,radars:this._config.radars?.length?this._config.radars:[t]}}else this._config={...this._config,radars:void 0};this._emitConfig()}_emitConfig(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_updateFusionRadar(t,e){const a=[...this._config.radars??[]];a[t]={...a[t],...e},this._config={...this._config,radars:a},this._emitConfig()}_updateRadarCalibration(t,e,a){const i=this._config.radars?.[t];i&&this._updateFusionRadar(t,{calibration:{...i.calibration,[e]:a},calibration_profile_id:void 0,calibration_profile_revision:void 0})}_fusionInstallationChanged(t,e){this._updateFusionRadar(t,{calibration:e.detail,calibration_profile_id:void 0,calibration_profile_revision:void 0})}async _selectFusionRadar(t,e=!1){const a=this._config.radars?.length??0;this._selectedFusionRadar=Math.max(0,Math.min(t,a-1)),e&&(await this.updateComplete,this.renderRoot.querySelector(`[data-radar-tab="${this._selectedFusionRadar}"]`)?.focus())}_fusionRadarTabKeyDown(t,e){const a=this._config.radars?.length??0;if(!a)return;let i;"ArrowRight"===e.key?i=(t+1)%a:"ArrowLeft"===e.key?i=(t-1+a)%a:"Home"===e.key?i=0:"End"===e.key&&(i=a-1),void 0!==i&&(e.preventDefault(),this._selectFusionRadar(i,!0))}_addFusionRadar(){const t=[...this._config.radars??[]],e=t.length+1;t.push({id:Ue(t),radar_model:"ld2450",device_id:"",calibration:{radar_x:Math.round(Number(this._config.room_w??400)*e/(e+1)),radar_y:Math.round(.2*Number(this._config.room_d??600)),radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}}),this._selectedFusionRadar=t.length-1,this._config={...this._config,radars:t},this._emitConfig()}_removeFusionRadar(t){const e=(this._config.radars??[]).filter((e,a)=>a!==t);var a,i,r;this._config={...this._config,radars:e},this._selectedFusionRadar=(a=this._selectedFusionRadar,i=t,(r=e.length)<=0?0:a>i?a-1:a===i?Math.min(i,r-1):Math.min(a,r-1)),this._emitConfig()}_profileChanged(t,e){const a=e.target.value;if(!a)return void this._updateFusionRadar(t,{calibration_profile_id:void 0,calibration_profile_revision:void 0});const i=this._calibrationProfiles.find(t=>t.profile_id===a);i&&(this._updateFusionRadar(t,{device_id:i.device_id,radar_model:i.radar_model,calibration:structuredClone(i.calibration),calibration_profile_id:i.profile_id,calibration_profile_revision:i.revision}),this._profileStatus=this._t("editor.imported_p0_revision_p1",{p0:i.name,p1:i.revision}))}async _fusionDeviceChanged(t,e){const a=e.target.value;if(this._updateFusionRadar(t,{device_id:a}),a)try{const e=await this.hass.callWS({type:"config/entity_registry/list"}),i={};for(const t of e.filter(t=>t.device_id===a)){const e=t.entity_id,a=(t.original_name||e).toLowerCase(),r=e.match(/target_(\d+)_x/),o=e.match(/target_(\d+)_y/),s=e.match(/target_(\d+)_speed/);e.startsWith("binary_sensor.")&&(e.includes("presence")||a.includes("presence"))?i.presence_entity=e:e.startsWith("sensor.")&&(e.includes("target_frame")||a.includes("target frame"))?i.frame_entity=e:r?i[`target_${r[1]}_x_entity`]=e:o?i[`target_${o[1]}_y_entity`]=e:s?i[`target_${s[1]}_speed_entity`]=e:e.startsWith("sensor.")&&(e.endsWith("_x")||a.endsWith(" x"))?i.x_entity=e:e.startsWith("sensor.")&&(e.endsWith("_y")||a.endsWith(" y"))?i.y_entity=e:e.startsWith("sensor.")&&(e.endsWith("_z")||a.endsWith(" z"))&&(i.z_entity=e)}const r=this._calibrationProfiles.find(t=>t.device_id===a);r&&(i.calibration=structuredClone(r.calibration),i.calibration_profile_id=r.profile_id,i.calibration_profile_revision=r.revision,this._profileStatus=this._t("editor.imported_device_calibration_profile_p0",{p0:r.name})),this._updateFusionRadar(t,i)}catch(t){console.warn("Failed to match fusion radar entities",t)}}_updateFusionJson(t,e){try{const a=JSON.parse(e.target.value);if(!Array.isArray(a))throw new Error("Value must be a JSON array");this._fusionJsonError="",this._changed(t,a)}catch(t){this._fusionJsonError=t instanceof Error?t.message:String(t)}}_updateFusionSetting(t,e){this._changed("fusion",{...this._config.fusion??{},[t]:e})}_updateQualitySetting(t,e){this._changed("quality",{...this._config.quality??{},[t]:e})}_fusionZonesChanged(t){this._changed("zones",t.detail??[])}async _fusionCalibrationApplied(t){const e=new Map(t.detail.solutions.map(t=>[t.radarId,t])),a=(this._config.radars??[]).map(t=>{const a=e.get(t.id);return a?{...t,calibration:a.calibration}:t});this._config={...this._config,radars:a},this._emitConfig(),this._profileStatus=this._t("editor.saving_device_calibration_profiles");const i=await Promise.all(a.map(async t=>{const a=e.get(t.id);if(!a||!t.device_id)return t;try{const e=await this.hass.callWS({type:"mmwave_fusion/upsert_calibration_profile",profile:{profile_id:`device:${t.device_id}`,device_id:t.device_id,radar_model:t.radar_model,name:this._devices.find(e=>e.id===t.device_id)?.name_by_user||t.id,calibration:a.calibration,residual_cm:a.residualAfterCm}});return{...t,calibration_profile_id:e.profile_id,calibration_profile_revision:e.revision}}catch(e){return console.warn(`Failed to save calibration profile for ${t.id}`,e),t}}));this._config={...this._config,radars:i},this._emitConfig(),await this._loadCalibrationProfiles(),this._profileStatus=this._t("editor.all_calibrations_were_applied_and_saved")}async _deviceDropdownChanged(t){const e=t.target.value;if(this._changed("device_id",e),!e)return this._deviceStatus="idle",void(this._matchedEntities=0);this._deviceStatus="loading";try{const t=(await this.hass.callWS({type:"config/entity_registry/list"})).filter(t=>t.device_id===e),a={};for(const e of t){const t=e.entity_id,i=(e.original_name||t).toLowerCase(),r=t.match(/target_(\d+)_x/),o=t.match(/target_(\d+)_y/),s=t.match(/target_(\d+)_speed/);t.startsWith("binary_sensor.")&&(i.includes("presence")||t.includes("presence"))?a.presence_entity=t:t.startsWith("sensor.")&&oa(t,i,"distance")?a.distance_entity=t:t.startsWith("sensor.")&&oa(t,i,"motion_state")?(a.motion_state_entity=t,a.target_state_entity=t):r?a[`target_${r[1]}_x_entity`]=t:o?a[`target_${o[1]}_y_entity`]=t:s?a[`target_${s[1]}_speed_entity`]=t:t.startsWith("sensor.")&&(i.endsWith(" x")||t.endsWith("_x")||t.endsWith("radar_x"))&&!t.includes("room_x")&&!i.includes("room x")?a.x_entity=t:t.startsWith("sensor.")&&(i.endsWith(" y")||t.endsWith("_y")||t.endsWith("radar_y"))&&!t.includes("room_y")&&!i.includes("room y")?a.y_entity=t:t.startsWith("sensor.")&&(i.endsWith(" z")||t.endsWith("_z")||t.endsWith("radar_z"))&&!t.includes("room_z")&&!i.includes("room z")?a.z_entity=t:t.startsWith("sensor.")&&(t.includes("breath")||t.includes("respiration"))?a.breath_entity=t:t.startsWith("sensor.")&&t.includes("heart")?a.heart_entity=t:t.startsWith("sensor.")&&t.includes("sleep")?a.sleep_entity=t:t.startsWith("text.")&&oa(t,i,"polygon")&&(a.polygon_entity=t)}Object.keys(a).length>0&&(this._config={...this._config,...a},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))),this._matchedEntities=Object.keys(a).length,this._deviceStatus=this._matchedEntities>0?"success":"error"}catch(t){this._deviceStatus="error",console.warn("Failed to auto-populate entities from device",t)}}_modeSelector(t){return B`
      <div class="mode-switch" role="group" aria-label=${this._t("editor.operating_mode")}>
        <button type="button" class=${"single"===t?"active":""} @click=${()=>this._setMode("single")}>
          ${this._t("editor.single_radar")}
        </button>
        <button type="button" class=${"fusion"===t?"active":""} @click=${()=>this._setMode("fusion")}>
          ${this._t("editor.multi_radar_fusion")}
        </button>
      </div>
    `}_renderFusionEditor(){const t=se().filter(t=>!oe(t.id)?.info.is1DRanging),e=this._config.radars??[],a=Math.max(0,Math.min(this._selectedFusionRadar,e.length-1)),i=e[a],r=i?oe(i.radar_model):void 0,o=i?{...gt,...r?.getDefaultCalibration()??{},...i.calibration??{},polygon:i.calibration?.polygon??[]}:void 0,s=e.map((t,e)=>({index:e,id:t.id,calibration:{...gt,...oe(t.radar_model)?.getDefaultCalibration()??{},...t.calibration??{},polygon:t.calibration?.polygon??[]}})).filter(t=>t.index!==a);return B`
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

        <h3><span>2</span>${this._t("editor.radar_devices_and_installation")}</h3>
        <p class="section-help">${this._t("editor.configure_devices_then_place_them")}</p>
        <div class="radar-workspace">
          <div class="radar-tabs" role="tablist" aria-label=${this._t("editor.radar_installation_tabs")}>
            ${e.map((t,e)=>B`
                <button
                  id=${`radar-tab-${e}`}
                  data-radar-tab=${e}
                  type="button"
                  role="tab"
                  aria-selected=${e===a?"true":"false"}
                  tabindex=${e===a?"0":"-1"}
                  class=${e===a?"active":""}
                  @click=${()=>this._selectFusionRadar(e)}
                  @keydown=${t=>this._fusionRadarTabKeyDown(e,t)}
                >
                  ${t.id}<small>${t.radar_model}</small>
                </button>
              `)}
            <button class="add-radar-tab" type="button" @click=${this._addFusionRadar}>
              <b>＋</b><span>${this._t("editor.add_radar")}</span>
            </button>
          </div>
          ${i&&r&&o?B`
                <div class="radar-tab-panel" role="tabpanel" aria-labelledby=${`radar-tab-${a}`}>
                  <section class="radar-editor">
                    <header>
                      <span>
                        <strong>${this._t("editor.radar")} ${a+1}</strong>
                        <small>${i.id} · ${r.info.displayName}</small>
                      </span>
                      <button
                        type="button"
                        class="remove-button"
                        ?disabled=${e.length<=1}
                        @click=${()=>this._removeFusionRadar(a)}
                      >
                        ×
                      </button>
                    </header>
                    <div class="two-col">
                      <div class="field compact">
                        <label>ID</label>
                        <input
                          type="text"
                          .value=${i.id}
                          @change=${t=>this._updateFusionRadar(a,{id:t.target.value})}
                        />
                      </div>
                      <div class="field compact">
                        <label>${this._L("editor.model")}</label>
                        <select
                          .value=${i.radar_model}
                          @change=${t=>this._updateFusionRadar(a,{radar_model:t.target.value})}
                        >
                          ${t.map(t=>B`<option value=${t.id} ?selected=${t.id===i.radar_model}>
                                ${t.label}
                              </option>`)}
                        </select>
                      </div>
                    </div>
                    <div class="field">
                      <label>${this._t("editor.radar_device")}</label>
                      <select
                        .value=${i.device_id??""}
                        @change=${t=>this._fusionDeviceChanged(a,t)}
                      >
                        <option value="">-- ${this._t("editor.select_device")} --</option>
                        ${this._devices.map(t=>B`<option value=${t.id} ?selected=${t.id===i.device_id}>
                              ${t.name_by_user||t.name||"Unknown device"}
                            </option>`)}
                      </select>
                    </div>
                    <div class="field profile-field">
                      <label>${this._t("editor.calibration_profile")}</label>
                      <select
                        .value=${i.calibration_profile_id??""}
                        @change=${t=>this._profileChanged(a,t)}
                      >
                        <option value="">${this._t("editor.manual_not_linked")}</option>
                        ${this._calibrationProfiles.map(t=>B`
                            <option
                              value=${t.profile_id}
                              ?selected=${t.profile_id===i.calibration_profile_id}
                            >
                              ${t.name} · ${t.radar_model} · v${t.revision}
                            </option>
                          `)}
                      </select>
                      ${i.calibration_profile_id?B`<small class="profile-badge">
                            ${this._t("editor.device_profile_snapshot")} ·
                            v${i.calibration_profile_revision??"?"}
                          </small>`:Y}
                    </div>
                    <div class="cal-grid">
                      ${["radar_x","radar_y","radar_z","yaw","pitch","roll"].map(t=>B`
                          <div class="field compact">
                            <label>${t}</label>
                            <input
                              type="number"
                              step=${"yaw"===t||"pitch"===t||"roll"===t?"1":"10"}
                              .value=${String(o[t]??("radar_z"===t?220:0))}
                              @change=${e=>this._updateRadarCalibration(a,t,Number(e.target.value))}
                            />
                          </div>
                        `)}
                    </div>
                    ${r?B`
                          <details class="advanced">
                            <summary>${this._t("editor.entity_mapping")}</summary>
                            <div class="advanced-fields">
                              ${r.getEntitySchema().map(t=>B`
                                  <div class="field">
                                    <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                                    <input
                                      type="text"
                                      list="entities-list"
                                      .value=${String(i[t.key]??"")}
                                      @change=${e=>this._updateFusionRadar(a,{[t.key]:e.target.value})}
                                    />
                                  </div>
                                `)}
                            </div>
                          </details>
                        `:Y}
                  </section>
                  <div class="installation-subsection">
                    <strong>${this._t("editor.interactive_installation")}</strong>
                    <span>${this._t("editor.current_tab_controls_form_and_3d")}</span>
                  </div>
                  <mmwave-installation-3d
                    .adapter=${r}
                    .calibration=${o}
                    .peerCalibrations=${s}
                    .lang=${this.hass.language}
                    .roomW=${Number(this._config.room_w??400)}
                    .roomD=${Number(this._config.room_d??600)}
                    .maxRangeM=${r.info.maxRangeM}
                    @calibration-changed=${t=>this._fusionInstallationChanged(a,t)}
                  ></mmwave-installation-3d>
                </div>
              `:Y}
        </div>
        ${this._profileStatus?B`<div class="profile-status">${this._profileStatus}</div>`:Y}

        <h3><span>3</span>${this._t("editor.joint_multi_radar_calibration")}</h3>
        <p class="section-help">${this._t("editor.each_shared_reference_position_captures_every")}</p>
        <mmwave-fusion-calibration
          .hass=${this.hass}
          .radars=${e}
          .roomW=${Number(this._config.room_w??400)}
          .roomD=${Number(this._config.room_d??600)}
          .lang=${this.hass.language}
          @fusion-calibration-applied=${this._fusionCalibrationApplied}
        ></mmwave-fusion-calibration>

        <h3><span>4</span>${this._t("editor.fusion_and_recording_rules")}</h3>
        <p class="section-help">${this._t("editor.filter_single_radar_false_alarms_and")}</p>
        <div class="rules-grid">
          <div class="field compact">
            <label>${this._t("editor.fusion_rate_hz")}</label>
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              .value=${String(this._config.fusion?.rate_hz??ra("rate_hz",e))}
              @change=${t=>this._updateFusionSetting("rate_hz",Number(t.target.value))}
            />
            <small>${this._t("editor.fusion_rate_hz_help")}</small>
          </div>
          <div class="field compact">
            <label>${this._t("editor.association_distance_cm")}</label>
            <input
              type="number"
              min="20"
              step="5"
              .value=${String(this._config.fusion?.association_gate_cm??ra("association_gate_cm",e))}
              @change=${t=>this._updateFusionSetting("association_gate_cm",Number(t.target.value))}
            />
            <small>${this._t("editor.association_distance_cm_help")}</small>
          </div>
          <div class="field compact">
            <label>${this._t("editor.confirm_hits")}</label>
            <input
              type="number"
              min="1"
              step="1"
              .value=${String(this._config.fusion?.confirm_hits??ra("confirm_hits",e))}
              @change=${t=>this._updateFusionSetting("confirm_hits",Number(t.target.value))}
            />
            <small>${this._t("editor.confirm_hits_help")}</small>
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_supporting_radars")}</label>
            <input
              type="number"
              min="1"
              max=${String(Math.max(1,this._config.radars?.length??1))}
              step="1"
              .value=${String(this._config.fusion?.min_confirm_sources??ra("min_confirm_sources",e))}
              @change=${t=>this._updateFusionSetting("min_confirm_sources",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.merge_distance_cm")}</label>
            <input
              type="number"
              min="20"
              step="5"
              .value=${String(this._config.fusion?.merge_gate_cm??ra("merge_gate_cm",e))}
              @change=${t=>this._updateFusionSetting("merge_gate_cm",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.track_end_delay_s")}</label>
            <input
              type="number"
              min="0.5"
              step="0.1"
              .value=${String(this._config.fusion?.track_ttl_s??ra("track_ttl_s",e))}
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
              .value=${String(this._config.quality?.min_score??Xe.quality.min_score)}
              @change=${t=>this._updateQualitySetting("min_score",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_duration_s")}</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              .value=${String(this._config.quality?.min_duration_s??Xe.quality.min_duration_s)}
              @change=${t=>this._updateQualitySetting("min_duration_s",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_displacement_cm")}</label>
            <input
              type="number"
              min="20"
              step="10"
              .value=${String(this._config.quality?.min_displacement_cm??Xe.quality.min_displacement_cm)}
              @change=${t=>this._updateQualitySetting("min_displacement_cm",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.boundary_margin_cm")}</label>
            <input
              type="number"
              min="10"
              step="10"
              .value=${String(this._config.quality?.boundary_margin_cm??Xe.quality.boundary_margin_cm)}
              @change=${t=>this._updateQualitySetting("boundary_margin_cm",Number(t.target.value))}
            />
          </div>
        </div>
        <label class="check-row">
          <input
            type="checkbox"
            .checked=${this._config.quality?.require_enter_exit??Xe.quality.require_enter_exit}
            @change=${t=>this._updateQualitySetting("require_enter_exit",t.target.checked)}
          />
          <span>${this._t("editor.record_complete_crossings_only")}</span>
        </label>
        <div class="test-hint">
          <strong>${this._t("editor.recording_test")}</strong>
          <span>
            ${this._t("editor.enter_near_one_room_edge_walk",{p0:this._config.quality?.min_displacement_cm??Xe.quality.min_displacement_cm,p1:this._config.fusion?.track_ttl_s??ra("track_ttl_s",e)})}
          </span>
        </div>

        <h3><span>5</span>${this._t("editor.event_zones_and_cameras")}</h3>
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
        ${this._fusionJsonError?B`<div class="json-error">${this._fusionJsonError}</div>`:Y}

        <datalist id="entities-list">
          ${Object.keys(this.hass.states).map(t=>B`<option value=${t}></option>`)}
        </datalist>
      </div>
    `}render(){if(!this.hass||!this._config)return Y;const t=this._config.radar_model??"",e=oe(t),a=se();return this._config.radars?.length?this._renderFusionEditor():B` <div class="card-config">
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
          ${a.map(e=>B` <option value=${e.id} ?selected=${e.id===t}>${e.label}</option>`)}
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
          </details>`:Y}

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
    .radar-workspace,
    .radar-tab-panel {
      min-width: 0;
    }
    .radar-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }
    .radar-tabs button {
      display: grid;
      flex: 0 0 auto;
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
    .radar-tabs button.active {
      border-color: rgba(11, 130, 92, 0.5);
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.08);
      box-shadow: inset 0 -2px 0 var(--mmwave-primary);
    }
    .radar-tabs small {
      color: var(--secondary-text-color);
      font-size: 8px;
      font-weight: 500;
    }
    .radar-tabs .add-radar-tab {
      grid-auto-flow: column;
      place-content: center;
      align-items: center;
      min-width: max-content;
      border-style: dashed;
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.05);
    }
    .add-radar-tab b {
      font-size: 14px;
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
    .radar-editor > header > span {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .radar-editor > header small {
      overflow: hidden;
      color: var(--secondary-text-color);
      font-size: 8px;
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    .profile-status {
      margin-top: 7px;
      padding: 8px 10px;
      border-radius: 8px;
      color: var(--mmwave-primary);
      background: rgba(11, 130, 92, 0.07);
      font-size: 10px;
    }
    .installation-subsection {
      display: grid;
      gap: 3px;
      margin: 14px 0 8px;
      padding-top: 12px;
      border-top: 1px solid var(--mmwave-line);
    }
    .installation-subsection strong {
      color: var(--primary-text-color);
      font-size: 12px;
    }
    .installation-subsection span {
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.5;
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
  `}};t([ht({attribute:!1})],sa.prototype,"hass",void 0),t([ht({attribute:!1})],sa.prototype,"_config",void 0),t([_t()],sa.prototype,"_devices",void 0),t([_t()],sa.prototype,"_advOpen",void 0),t([_t()],sa.prototype,"_deviceStatus",void 0),t([_t()],sa.prototype,"_matchedEntities",void 0),t([_t()],sa.prototype,"_fusionJsonError",void 0),t([_t()],sa.prototype,"_calibrationProfiles",void 0),t([_t()],sa.prototype,"_selectedFusionRadar",void 0),t([_t()],sa.prototype,"_profileStatus",void 0),sa=t([dt(ze)],sa);var na=Object.freeze({__proto__:null,get MMWaveCardEditor(){return sa}});export{Ke as MMWaveCard};
