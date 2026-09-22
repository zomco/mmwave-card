function t(t,e,i,a){var r,o=arguments.length,s=o<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,a);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(o<3?r(s):o>3?r(e,i,s):r(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new o(i,t,a)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,a))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,y=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&d(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const o=a?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,a)=>{if(i)t.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of a){const a=document.createElement("style"),r=e.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=i.cssText,t.appendChild(a)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=a;const o=r.fromAttribute(e,t.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(t,e,i,a=!1,r){if(void 0!==t){const o=this.constructor;if(!1===a&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,f?.({ReactiveElement:w}),(u.reactiveElementVersions??=[]).push("2.1.2");const $=globalThis,k=t=>t,M=$.trustedTypes,S=M?M.createPolicy("lit-html",{createHTML:t=>t}):void 0,R="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+z,D=`<${C}>`,A=document,E=()=>A.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,P="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,q=/>/g,N=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,O=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),U=O(1),B=O(2),K=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),X=new WeakMap,Z=A.createTreeWalker(A,129);function G(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,a=[];let r,o=2===e?"<svg>":3===e?"<math>":"",s=F;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===F?"!--"===l[1]?s=H:void 0!==l[1]?s=q:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=r??F,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,n=l[1],s=void 0===l[3]?N:'"'===l[3]?I:L):s===I||s===L?s=N:s===H||s===q?s=F:(s=N,r=void 0);const h=s===N&&t[e+1].startsWith("/>")?" ":"";o+=s===F?i+D:d>=0?(a.push(n),i.slice(0,d)+R+i.slice(d)+z+h):i+z+(-2===d?e:h)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class J{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let r=0,o=0;const s=t.length-1,n=this.parts,[l,d]=V(t,e);if(this.el=J.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=Z.nextNode())&&n.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(R)){const e=d[o++],i=a.getAttribute(t).split(z),s=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?at:"?"===s[1]?rt:"@"===s[1]?ot:it}),a.removeAttribute(t)}else t.startsWith(z)&&(n.push({type:6,index:r}),a.removeAttribute(t));if(j.test(a.tagName)){const t=a.textContent.split(z),e=t.length-1;if(e>0){a.textContent=M?M.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],E()),Z.nextNode(),n.push({type:2,index:++r});a.append(t[e],E())}}}else if(8===a.nodeType)if(a.data===C)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=a.data.indexOf(z,t+1));)n.push({type:7,index:r}),t+=z.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,a){if(e===K)return e;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const o=T(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,a)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??A).importNode(e,!0);Z.currentNode=a;let r=Z.nextNode(),o=0,s=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new et(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new st(r,this,t)),this._$AV.push(e),n=i[++s]}o!==n?.index&&(r=Z.nextNode(),o++)}return Z.currentNode=A,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===Y||null==t||""===t?(this._$AH!==Y&&this._$AR(),this._$AH=Y):t!==this._$AH&&t!==K&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Y&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new tt(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new J(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const r of t)a===e.length?e.push(i=new et(this.O(E()),this.O(E()),this,this.options)):i=e[a],i._$AI(r),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,r){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(t,e=this,i,a){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==K,o&&(this._$AH=t);else{const a=t;let s,n;for(t=r[0],s=0;s<r.length-1;s++)n=Q(this,a[i+s],e,s),n===K&&(n=this._$AH[s]),o||=!T(n)||n!==this._$AH[s],n===Y?t=Y:t!==Y&&(t+=(n??"")+r[s+1]),this._$AH[s]=n}o&&!a&&this.j(t)}j(t){t===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Y?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Y)}}class ot extends it{constructor(t,e,i,a,r){super(t,e,i,a,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Y)===K)return;const i=this._$AH,a=t===Y&&i!==Y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Y&&(i===Y||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(J,et),($.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;class dt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let r=a._$litPart$;if(void 0===r){const t=i?.renderBefore??null;a._$litPart$=r=new et(e.insertBefore(E(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return K}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},_t=(t=pt,e,i)=>{const{kind:a,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===a&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===a){const{name:a}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(a,r,t,!0,i)},init(e){return void 0!==e&&this.C(a,void 0,t,e),e}}}if("setter"===a){const{name:a}=i;return function(i){const r=this[a];e.call(this,i),this.requestUpdate(a,r,t,!0,i)}}throw Error("Unsupported decorator location: "+a)};function ut(t){return(e,i)=>"object"==typeof i?_t(t,e,i):((t,e,i)=>{const a=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),a?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return ut({...t,state:!0,attribute:!1})}function mt(t,e){return(e,i,a)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}const ft={radar_x:0,radar_y:0,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]},yt={room_w:400,room_d:600,device_id:"",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z",polygon_entity:"text.r60abd1_polygon_config"},bt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!0,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!0,domain:"sensor"},{key:"z_entity",labelKey:"editor.z_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"},{key:"sleep_entity",labelKey:"editor.sleep_entity",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}],vt={info:{id:"r60abd1",displayName:"MicRadar R60ABD1 (60 GHz)",fovDegrees:40,maxRangeM:2.5,minRangeM:.4,vitalRangeM:1.5,updateRateHz:.5,maxTargets:1,hasZAxis:!0,hasBreathing:!0,hasHeartRate:!0,hasSleep:!0},getEntitySchema:()=>bt,validateConfig(t){const e=[];for(const i of bt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("x_entity"),o=i("y_entity"),s=i("z_entity");if(!r||!o)return{present:!0,targets:[]};const n=parseFloat(r.state)||0,l=parseFloat(o.state)||0,d=s&&parseFloat(s.state)||0;return 0===n&&0===l&&0===d?{present:!0,targets:[]}:{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:d}]}},getDefaultCalibration:()=>({...ft,radar_z:220,pitch:0,roll:0})},xt=t=>"number"==typeof t&&Number.isFinite(t)?t:void 0;function wt(t){let e;try{e=JSON.parse(t)}catch{return}if(!e||"object"!=typeof e)return;const i=e,a=i.f,r=xt(i.ts);if(1!==i.v||"number"!=typeof a&&"string"!=typeof a||null==r)return;if(!Array.isArray(i.t)||i.t.length>32)return;const o=i.s;if(void 0!==o&&(!Array.isArray(o)||o.length!==i.t.length||o.some(t=>!Number.isInteger(t)||t<0||t>31)||new Set(o).size!==o.length))return;const s=[];let n=0;for(const t of i.t){const e=Array.isArray(o)?o[n]:void 0;let i,a;n++;let r,l=0;if(Array.isArray(t)&&t.length>=2&&t.length<=4)i=xt(t[0]),a=xt(t[1]),3===t.length&&(r=xt(t[2])),4===t.length&&(l=xt(t[2])??Number.NaN,r=xt(t[3]));else{if(!t||"object"!=typeof t)return;{const e=t;i=xt(e.x),a=xt(e.y),l=null==e.z?0:xt(e.z)??Number.NaN,r=null==e.speed?void 0:xt(e.speed)}}if(null==i||null==a||!Number.isFinite(l)||Math.max(Math.abs(i),Math.abs(a),Math.abs(l))>1e5)return;0===i&&0===a&&0===l||s.push({...void 0===e?{}:{slot:e},x:i,y:a,z:l,speed:null==r?void 0:Math.abs(r)})}return{frameId:String(a),sourceTimestamp:r,targets:s}}const $t={id:"ld2450",displayName:"Hi-Link LD2450 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},kt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Mt(t){const e=parseFloat(t.state);if(!Number.isFinite(e))return null;const i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const St={info:$t,getEntitySchema:()=>kt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};const r="on"===a.state;if(!r)return{present:!1,targets:[]};if(e.frame_entity){const t=wt(i("frame_entity")?.state??"");return{present:r,targets:t?.targets.map((t,e)=>({index:t.slot??e,rawX:t.x,rawY:t.y,rawZ:t.z,speed:t.speed}))??[]}}const o=[];for(let t=1;t<=$t.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const r=Mt(e),s=Mt(a);if(null===r||null===s)continue;if(0===r&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;o.push({index:t-1,rawX:r,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:o}},getDefaultCalibration:()=>({...ft,radar_z:250,pitch:0,roll:0})},Rt={id:"ld2452",displayName:"Hi-Link LD2452 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Ct(t){const e=parseFloat(t.state);if(!Number.isFinite(e))return null;const i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const Dt={info:Rt,getEntitySchema:()=>zt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Rt.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=Ct(e),s=Ct(a);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ft,radar_z:250,pitch:0,roll:0})},At=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],Et={info:{id:"rd03e",displayName:"Ai-Thinker RD03E (24 GHz)",fovDegrees:40,verticalFovDegrees:90,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>At.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of At)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Tt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"motion_state_entity",labelKey:"editor.motion_state_entity",required:!1,domain:"sensor"}],Wt={info:{id:"ld2411",displayName:"Hi-Link LD2411 (24 GHz)",fovDegrees:40,verticalFovDegrees:80,maxRangeM:6,minRangeM:.3,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Tt.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of Tt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Pt={id:"ld2451",displayName:"Hi-Link LD2451 (24 GHz)",fovDegrees:30,verticalFovDegrees:14,maxRangeM:100,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Ft=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function Ht(t){if(!t)return null;const e=parseFloat(t.state);return Number.isFinite(e)?e:null}const qt={info:Pt,getEntitySchema:()=>Ft,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Pt.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=Ht(e),s=Ht(a);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Nt={id:"ld2453",displayName:"Hi-Link LD2453 (24 GHz)",fovDegrees:80,verticalFovDegrees:60,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},Lt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function It(t){if(!t)return null;const e=parseFloat(t.state);return Number.isFinite(e)?e:null}const jt={info:Nt,getEntitySchema:()=>Lt,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=Nt.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=It(e),s=It(a);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Ot=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Ut={info:{id:"ld2410b",displayName:"Hi-Link LD2410B (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Ot.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of Ot)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Bt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],Kt={info:{id:"ld2410c",displayName:"Hi-Link LD2410C (24 GHz)",fovDegrees:120,maxRangeM:6,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Bt.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of Bt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Yt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"x_entity",labelKey:"editor.x_entity",required:!1,domain:"sensor"},{key:"y_entity",labelKey:"editor.y_entity",required:!1,domain:"sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!1,domain:"sensor"},{key:"breath_entity",labelKey:"editor.breath_entity",required:!1,domain:"sensor"},{key:"heart_entity",labelKey:"editor.heart_entity",required:!1,domain:"sensor"}],Xt={info:{id:"ld6002",displayName:"Hi-Link LD6002 (60 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:6,minRangeM:.4,vitalRangeM:1.5,updateRateHz:1,maxTargets:1,hasZAxis:!1,hasBreathing:!0,hasHeartRate:!0,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Yt.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];return t.presence_entity||e.push("Missing required entity: presence_entity"),t.distance_entity||t.x_entity&&t.y_entity||e.push("You must provide either distance_entity OR both x_entity and y_entity."),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("x_entity"),o=i("y_entity"),s=i("distance_entity");let n=0,l=0;if(r&&o?(n=parseFloat(r.state)||0,l=parseFloat(o.state)||0):s&&(l=parseFloat(s.state)||0),0===n&&l<=0)return{present:!0,targets:[]};return{present:!0,targets:[{index:0,rawX:n,rawY:l,rawZ:0}]}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Zt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Gt={info:{id:"ld2420",displayName:"Hi-Link LD2420 (24 GHz)",fovDegrees:120,verticalFovDegrees:120,maxRangeM:8,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Zt.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of Zt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0;if(o<=0)return{present:!0,targets:[]};const s=[];return s.push({index:0,rawX:0,rawY:o,rawZ:0}),{present:!0,targets:s}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},Vt=[{key:"gesture_entity",labelKey:"editor.gesture_entity",required:!1,domain:"sensor"},{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],Jt={info:{id:"ld2450a",displayName:"Hi-Link LD2450A (24 GHz Gesture)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:2,minRangeM:.2,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Vt.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of Vt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=i("distance_entity");if(!r)return{present:!0,targets:[]};const o=parseFloat(r.state)||0,s=o>0?o:0,n=[];return n.push({index:0,rawX:0,rawY:s,rawZ:0}),{present:!0,targets:n}},getDefaultCalibration:()=>({...ft,radar_z:150,pitch:0,roll:0})},Qt=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],te={info:{id:"ld2410",displayName:"Hi-Link LD2410 (24 GHz)",fovDegrees:120,maxRangeM:8,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>Qt.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of Qt)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})},ee=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"}],ie={info:{id:"ld2411s",displayName:"Hi-Link LD2411S (24 GHz 1-D)",fovDegrees:45,verticalFovDegrees:20,maxRangeM:6,minRangeM:.3,updateRateHz:20,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>ee.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of ee)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[],o=i("distance_entity");if(o&&"unavailable"!==o.state){const t=parseFloat(o.state)||0;t>0&&r.push({index:0,rawX:0,rawY:t,rawZ:0})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ft,radar_z:100,pitch:0,roll:0})},ae={id:"ld2454",displayName:"Hi-Link LD2454 (24 GHz)",fovDegrees:120,verticalFovDegrees:70,maxRangeM:6,minRangeM:.2,updateRateHz:10,maxTargets:3,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1},re=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"frame_entity",labelKey:"editor.target_frame",required:!1,domain:"sensor"},{key:"target_1_x_entity",labelKey:"editor.target_1_x",required:!0,domain:"sensor"},{key:"target_1_y_entity",labelKey:"editor.target_1_y",required:!0,domain:"sensor"},{key:"target_1_speed_entity",labelKey:"editor.target_1_speed",required:!1,domain:"sensor"},{key:"target_2_x_entity",labelKey:"editor.target_2_x",required:!1,domain:"sensor"},{key:"target_2_y_entity",labelKey:"editor.target_2_y",required:!1,domain:"sensor"},{key:"target_2_speed_entity",labelKey:"editor.target_2_speed",required:!1,domain:"sensor"},{key:"target_3_x_entity",labelKey:"editor.target_3_x",required:!1,domain:"sensor"},{key:"target_3_y_entity",labelKey:"editor.target_3_y",required:!1,domain:"sensor"},{key:"target_3_speed_entity",labelKey:"editor.target_3_speed",required:!1,domain:"sensor"},{key:"polygon_entity",labelKey:"editor.polygon_entity",required:!1,domain:"text"}];function oe(t){const e=parseFloat(t.state);if(!Number.isFinite(e))return null;const i=String(t.attributes.unit_of_measurement??"").toLowerCase();return"cm"===i?e:"m"===i?100*e:e/10}const se={info:ae,getEntitySchema:()=>re,validateConfig(t){const e=t.presence_entity?[]:["Missing required entity: presence_entity"];return t.frame_entity||t.target_1_x_entity&&t.target_1_y_entity||e.push("Missing frame_entity or target_1 X/Y entities"),e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0},a=i("presence_entity");if(!a||"unavailable"===a.state)return{present:!1,targets:[]};if(!("on"===a.state))return{present:!1,targets:[]};const r=[];for(let t=1;t<=ae.maxTargets;t++){const e=i(`target_${t}_x_entity`),a=i(`target_${t}_y_entity`);if(!e||!a)continue;const o=oe(e),s=oe(a);if(null===o||null===s)continue;if(0===o&&0===s)continue;const n=i(`target_${t}_speed_entity`),l=n?Math.abs(parseFloat(n.state)||0):void 0;r.push({index:t-1,rawX:o,rawY:s,rawZ:0,speed:l})}return{present:!0,targets:r}},getDefaultCalibration:()=>({...ft,radar_z:250,pitch:0,roll:0})},ne=[{key:"presence_entity",labelKey:"editor.presence_entity",required:!0,domain:"binary_sensor"},{key:"distance_entity",labelKey:"editor.distance_entity",required:!0,domain:"sensor"},{key:"target_state_entity",labelKey:"editor.target_state_entity",required:!1,domain:"sensor"},{key:"max_distance_entity",labelKey:"editor.max_distance_entity",required:!1,domain:"sensor"}],le={r60abd1:vt,ld2450:St,ld2452:Dt,rd03e:Et,ld2411:Wt,ld2451:qt,ld2453:jt,ld2410b:Ut,ld2410c:Kt,ld6002:Xt,ld2420:Gt,ld2450a:Jt,ld2410:te,ld2411s:ie,ld2454:se,ld2412:{info:{id:"ld2412",displayName:"Hi-Link LD2412 (24 GHz)",fovDegrees:150,maxRangeM:9,minRangeM:0,updateRateHz:10,maxTargets:1,hasZAxis:!1,hasBreathing:!1,hasHeartRate:!1,hasSleep:!1,is1DRanging:!0},getEntitySchema:()=>ne.filter(t=>"polygon_entity"!==t.key),validateConfig(t){const e=[];for(const i of ne)i.required&&!t[i.key]&&e.push(`Missing required entity: ${i.key}`);return e},readFromHass(t,e){const i=i=>{const a=e[i];return a?t.states[a]:void 0};let a;const r=i("max_distance_entity");if(r&&r.state&&"unavailable"!==r.state){const t=parseFloat(r.state);!isNaN(t)&&t>0&&(a=t/100)}const o=i("presence_entity");if(!o||"unavailable"===o.state)return{present:!1,targets:[],maxRangeM:a};if(!("on"===o.state))return{present:!1,targets:[],maxRangeM:a};const s=i("distance_entity");if(!s)return{present:!0,targets:[],maxRangeM:a};const n=parseFloat(s.state)||0;if(n<=0)return{present:!0,targets:[],maxRangeM:a};const l=[];return l.push({index:0,rawX:0,rawY:n,rawZ:0}),{present:!0,targets:l,maxRangeM:a}},getDefaultCalibration:()=>({...ft,radar_z:240,pitch:0,roll:0})}};function de(t){return le[t]}function ce(){return Object.entries(le).map(([t,e])=>({id:t,label:e.info.displayName})).sort((t,e)=>t.label.localeCompare(e.label))}function he(t,e,i){const a=i.length;if(a<3)return!0;let r=!1;for(let o=0,s=a-1;o<a;s=o++){const a=i[o].x,n=i[o].y,l=i[s].x,d=i[s].y;n>e!=d>e&&t<(l-a)*(e-n)/(d-n)+a&&(r=!r)}return r}function pe(t,e,i,a){const r=function(t,e,i){const a=Math.PI/180,r=t*a,o=e*a,s=i*a,[n,l,d,c,h,p]=[Math.sin(r),Math.cos(r),Math.sin(o),Math.cos(o),Math.sin(s),Math.cos(s)];return[[l*p+n*d*h,n*c,-l*h+n*d*p],[-n*p+l*d*h,l*c,n*h+l*d*p],[c*h,-d,c*p]]}(a.yaw,a.pitch,a.roll),o=r[0][0]*t+r[0][1]*e+r[0][2]*i,s=r[1][0]*t+r[1][1]*e+r[1][2]*i,n=r[2][0]*t+r[2][1]*e+r[2][2]*i,l=a.radar_x+o,d=a.radar_y+s;return{roomX:l,roomY:d,roomZ:a.radar_z-n,inBoundary:he(l,d,a.polygon)}}class _e{constructor(t={}){this.tracks=new Map,this.mergeSince=new Map,this.associationGate=Math.max(t.association_gate_cm??90,10),this.mergeGate=Math.max(t.merge_gate_cm??70,10),this.ttlMs=1e3*Math.max(t.track_ttl_s??2,.2),this.confirmHits=Math.max(t.confirm_hits??2,1),this.minConfirmSources=Math.max(t.min_confirm_sources??1,1),this.duplicateGate=Math.max(t.duplicate_gate_cm??50,0),this.rangeMergeFactor=Math.max(t.range_merge_factor??.08,0),this.mergeConfirmMs=1e3*Math.max(t.merge_confirm_s??.6,0)}reset(){this.tracks.clear(),this.mergeSince.clear()}step(t,e=Date.now()){for(const[t,i]of this.tracks)e-i.last_seen>this.ttlMs&&this.tracks.delete(t);const i=new Map;for(const t of this.tracks.values()){const a=Math.min(Math.max((e-t.updated_at)/1e3,0),.5);t.x+=t.vx*a,t.y+=t.vy*a,t.updated_at=e,i.set(t.track_id,a)}const a=this.cluster(this.dedupeSameRadar(t)),r=[...this.tracks.values()],o=r.length,s=a.length,n=o+s,l=Array.from({length:n},()=>Array(n).fill(0));for(let t=0;t<o;t++){const e=r[t],o=Math.hypot(e.vx,e.vy),d=this.associationGate+o*(i.get(e.track_id)??0);a.forEach((i,a)=>{const r=Math.hypot(e.x-i.x,e.y-i.y);l[t][a]=r<=d?r/d:4});for(let e=s;e<n;e++)l[t][e]=1.05}for(let t=o;t<n;t++)for(let e=0;e<s;e++)l[t][e]=1.05;const d=new Set,c=new Set;for(const[t,e]of function(t){if(!t.length||!t[0]?.length)return[];let e=t.map(t=>[...t]),i=e.length,a=e[0].length;const r=i>a;r&&(e=Array.from({length:a},(t,i)=>e.map(t=>t[i])),[i,a]=[a,i]);const o=Array(i+1).fill(0),s=Array(a+1).fill(0),n=Array(a+1).fill(0),l=Array(a+1).fill(0);for(let t=1;t<=i;t++){n[0]=t;let i=0;const r=Array(a+1).fill(Number.POSITIVE_INFINITY),d=Array(a+1).fill(!1);do{d[i]=!0;const t=n[i];let c=Number.POSITIVE_INFINITY,h=0;for(let n=1;n<=a;n++){if(d[n])continue;const a=e[t-1][n-1]-o[t]-s[n];a<r[n]&&(r[n]=a,l[n]=i),r[n]<c&&(c=r[n],h=n)}for(let t=0;t<=a;t++)d[t]?(o[n[t]]+=c,s[t]-=c):r[t]-=c;i=h}while(0!==n[i]);do{const t=l[i];n[i]=n[t],i=t}while(0!==i)}const d=n.map((t,e)=>[t-1,e-1]).filter(([t],e)=>e>0&&t>=0);return r?d.map(([t,e])=>[e,t]):d}(l)){if(t>=o||e>=s||l[t][e]>1)continue;const n=r[t];d.add(n.track_id),c.add(e),this.updateTrack(n,a[e],Math.max(i.get(n.track_id)??.1,.05))}for(const t of this.tracks.values())d.has(t.track_id)||(t.sources=[],t.confidence=Math.max(0,t.confidence-.08));const h=new Set(this.tracks.keys());return a.forEach((t,a)=>{if(c.has(a))return;const r=this.nearestTrack(t,i,h);if(r)if(d.has(r.track.track_id)){if(r.distance<=this.mergeGate)return;this.birthTrack(t,e)}else{if(r.distance<=this.associationGate)return d.add(r.track.track_id),void this.updateTrack(r.track,t,Math.max(i.get(r.track.track_id)??.1,.05));this.birthTrack(t,e)}else this.birthTrack(t,e)}),this.mergeCloseTracks(e),[...this.tracks.values()].filter(t=>t.confirmed).map(({updated_at:t,hits:e,confirmed:i,seenSources:a,...r})=>({...r,source_count:a.size}))}pairMergeGate(t,e){const i=[t.range??0,...e.observations.map(t=>t.range??0)];return this.mergeGate+this.rangeMergeFactor*Math.max(...i)}dedupeSameRadar(t){if(this.duplicateGate<=0||t.length<2)return t;const e=new Map;for(const i of t){const t=e.get(i.radarId)??[];t.push(i),e.set(i.radarId,t)}const i=[];for(const t of e.values()){if(1===t.length){i.push(t[0]);continue}const e=[...t].sort((t,e)=>{const i=t=>this.tracks.size?-Math.min(...[...this.tracks.values()].map(e=>Math.hypot(t.x-e.x,t.y-e.y))):t.weight;return i(e)-i(t)}),a=[];for(const t of e)a.some(e=>Math.hypot(t.x-e.x,t.y-e.y)<=this.duplicateGate)||a.push(t);i.push(...a)}return i}updateTrack(t,e,i){const a=e.x-t.x,r=e.y-t.y,o=Math.min(e.sources.length-1,3),s=.35+.05*o,n=.08+.02*o;t.x+=s*a,t.y+=s*r,t.vx+=n*a/i,t.vy+=n*r/i,t.last_seen=e.timestamp,t.sources=e.sources,e.sources.forEach(e=>t.seenSources.add(e)),t.hits+=Math.max(e.sources.length,1),t.confirmed=t.hits>=this.confirmHits&&t.seenSources.size>=this.minConfirmSources;const l=t.seenSources.size>=this.minConfirmSources?1:.74;t.confidence=Math.min(l,t.confidence+.1+.08*o)}birthTrack(t,e){const i=Math.max(t.sources.length,1),a={track_id:globalThis.crypto?.randomUUID?.().replaceAll("-","")??`${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`,x:t.x,y:t.y,vx:0,vy:0,confidence:Math.min(.9,.35+.18*t.sources.length),sources:t.sources,started_at:t.timestamp,last_seen:t.timestamp,updated_at:e,hits:i,confirmed:i>=this.confirmHits&&t.sources.length>=this.minConfirmSources,seenSources:new Set(t.sources)};this.tracks.set(a.track_id,a)}nearestTrack(t,e,i){let a;for(const r of this.tracks.values()){if(!i.has(r.track_id))continue;const o=Math.hypot(r.x-t.x,r.y-t.y);o<=this.associationGate+Math.hypot(r.vx,r.vy)*(e.get(r.track_id)??0)&&(!a||o<a.distance)&&(a={track:r,distance:o})}return a}mergeCloseTracks(t){if(this.mergeConfirmMs<=0)return void this.mergeSince.clear();const e=[...this.tracks.values()].filter(t=>t.confirmed),i=new Set,a=new Set;for(let r=0;r<e.length;r++){const o=e[r];if(!a.has(o.track_id))for(const s of e.slice(r+1)){if(a.has(s.track_id))continue;if(Math.hypot(o.x-s.x,o.y-s.y)>this.mergeGate)continue;const e=[o.track_id,s.track_id].sort().join("|");i.add(e);const r=this.mergeSince.get(e)??t;if(this.mergeSince.has(e)||this.mergeSince.set(e,t),t-r<this.mergeConfirmMs)continue;const n=o.started_at<=s.started_at?o:s,l=n===o?s:o;l.sources.forEach(t=>n.seenSources.add(t)),n.sources=[...new Set([...n.sources,...l.sources])],n.hits+=l.hits,n.confidence=Math.max(n.confidence,l.confidence),this.tracks.delete(l.track_id),a.add(l.track_id),a.add(n.track_id);break}}for(const t of this.mergeSince.keys()){const[e,a]=t.split("|");i.has(t)&&this.tracks.has(e)&&this.tracks.has(a)||this.mergeSince.delete(t)}}cluster(t){const e=[];for(const i of[...t].sort((t,e)=>e.weight-t.weight)){let t,a=Number.POSITIVE_INFINITY;for(const r of e){if(r.sources.includes(i.radarId))continue;const e=Math.hypot(i.x-r.x,i.y-r.y);e<=this.pairMergeGate(i,r)&&e<a&&(t=r,a=e)}t?(t.observations.push(i),this.recalculate(t)):e.push({observations:[i],x:i.x,y:i.y,timestamp:i.timestamp,sources:[i.radarId]})}return e}recalculate(t){const e=t.observations.reduce((t,e)=>t+Math.max(e.weight,.01),0);t.x=t.observations.reduce((t,e)=>t+e.x*Math.max(e.weight,.01),0)/e,t.y=t.observations.reduce((t,e)=>t+e.y*Math.max(e.weight,.01),0)/e,t.timestamp=Math.max(...t.observations.map(t=>t.timestamp)),t.sources=[...new Set(t.observations.map(t=>t.radarId))]}}const ue=["person","pet","false_positive","uncertain"];function ge(t){const e=String(t??"");return ue.includes(e)?e:void 0}function me(t){const e=t.ts??t.timestamp;return{event_id:String(t.event_id),fusion_id:String(t.fusion_id),track_id:String(t.track_id),event_type:t.event_type,zone_id:String(t.zone_id),timestamp:Number(e),x:Number(t.x),y:Number(t.y),clip_path:t.clip_path?String(t.clip_path):void 0,snapshot_path:t.snapshot_path?String(t.snapshot_path):void 0,camera_entity_id:t.camera_entity_id?String(t.camera_entity_id):void 0,clip_status:t.clip_status?String(t.clip_status):void 0,clip_provider:t.clip_provider?String(t.clip_provider):void 0,clip_file_size:t.clip_file_size?Number(t.clip_file_size):void 0,clip_error:t.clip_error?String(t.clip_error):void 0,metadata:t.metadata&&"object"==typeof t.metadata?t.metadata:void 0,quality_score:null==t.quality_score?void 0:Number(t.quality_score),quality_reason:t.quality_reason?String(t.quality_reason):void 0,recording_decision:t.recording_decision?String(t.recording_decision):void 0,recording_decisions:Array.isArray(t.recording_decisions)?t.recording_decisions:void 0,review_verdict:ge(t.review_verdict),review_summary:t.review_summary?String(t.review_summary):void 0,review_error:t.review_error?String(t.review_error):void 0}}const fe=new Map,ye=(t,e)=>"number"==typeof t&&Number.isFinite(t)?t:e;function be(t,e){return{width:Math.max(1,ye(t.width_cm,e)),x:ye(t.offset_x_cm,0),y:ye(t.offset_y_cm,0),angle:ye(t.rotation,0)*Math.PI/180,opacity:Math.max(0,Math.min(1,ye(t.opacity,.45)))}}function ve(t,e){if("string"!=typeof t||!t.trim())return;let i;try{i=new URL(t,window.location.href)}catch{return}if(!["http:","https:"].includes(i.protocol))return;let a=fe.get(i.href);if(!a){const t=new Image;a={image:t,status:"loading",listeners:new Set},fe.set(i.href,a),fe.size>16&&fe.delete(fe.keys().next().value);const e=t=>{a.status=t;for(const t of a.listeners)t();a.listeners.clear()};t.onload=()=>e(t.naturalWidth>0?"ready":"error"),t.onerror=()=>e("error"),t.src=i.href}return"loading"===a.status&&e&&a.listeners.add(e),a}function xe(t,e,i){const a=be(e,i),r=Math.cos(a.angle),o=Math.sin(a.angle);return{x:a.x+a.width*(r*t.x-o*t.y),y:a.y+a.width*(o*t.x+r*t.y)}}function we(t,e,i){const a=be(e,i),r=Math.cos(a.angle),o=Math.sin(a.angle),s=t.x-a.x,n=t.y-a.y;return{x:(r*s+o*n)/a.width,y:(-o*s+r*n)/a.width}}function $e(t,e,i){const a=Math.hypot(e.x-t.x,e.y-t.y);return Number.isFinite(i)&&i>0&&a>.001?i/a:void 0}function ke(t,e,i,a){if(!i||!1===i.visible)return;const r=ve(i.url,a);if("ready"!==r?.status)return;const o=be(i,e.roomW),s=o.width*r.image.naturalHeight/r.image.naturalWidth;t.save(),t.globalAlpha=o.opacity,t.scale(e.W/e.roomW,e.H/e.roomD),t.translate(o.x,o.y),t.rotate(o.angle),t.drawImage(r.image,0,0,o.width,s),t.restore()}const Me=["#0b825c","#03a9f4","#e91e63"];function Se(t){if(t.length<3)return null;const e=t.reduce((t,e)=>({x:t.x+e.x,y:t.y+e.y}),{x:0,y:0});return{x:e.x/t.length,y:e.y/t.length}}function Re(t){if(t.length<3)return 0;const e=t.map(t=>t.x),i=t.map(t=>t.y);return Math.min(Math.max(...e)-Math.min(...e),Math.max(...i)-Math.min(...i))}function ze(t,e){return!(t.length<3||e.length<3)&&(t.some(t=>he(t.x,t.y,e))||e.some(e=>he(e.x,e.y,t)))}function Ce(t){return t.split(";").map(t=>t.trim()).filter(t=>t.includes(",")).map(t=>{const[e,i]=t.split(",");return{x:parseFloat(e),y:parseFloat(i)}}).filter(t=>Number.isFinite(t.x)&&Number.isFinite(t.y))}function De(t){return t.map(t=>`${t.x},${t.y}`).join(";")}function Ae(t){const e=Math.min(t.W/t.roomW,t.H/t.roomD);return{...t,roomW:t.W/e,roomD:t.H/e}}const Ee=(t,e,i)=>({cx:t/i.roomW*i.W,cy:e/i.roomD*i.H}),Te=(t,e,i)=>({x:t/i.W*i.roomW,y:e/i.H*i.roomD});function We(t,e){const i=e.getBoundingClientRect(),a="touches"in t?t.touches[0].clientX:t.clientX,r="touches"in t?t.touches[0].clientY:t.clientY;return{x:a-i.left,y:r-i.top}}function Pe(t,e){const i=window.devicePixelRatio||1,a=t.offsetWidth||400;t.width=a*i,t.height=e*i,t.style.height=`${e}px`;const r=t.getContext("2d");return r.scale(i,i),r}function Fe(t,e,i,a){t.clearRect(0,0,e.W,e.H),ke(t,e,i,a),t.strokeStyle="rgba(128,128,128,.06)",t.lineWidth=.5;for(let i=0;i<e.W;i+=40)t.beginPath(),t.moveTo(i,0),t.lineTo(i,e.H),t.stroke();for(let i=0;i<e.H;i+=40)t.beginPath(),t.moveTo(0,i),t.lineTo(e.W,i),t.stroke();t.strokeStyle="rgba(255,255,255,.15)",t.lineWidth=1.5,t.strokeRect(1,1,e.W-2,e.H-2);const r=100*Math.round(e.roomW/4/100)||100,o=r/e.roomW*e.W,s=e.H-10,n=e.W-o-8;t.beginPath(),t.moveTo(n,s),t.lineTo(n+o,s),t.strokeStyle="rgba(255,255,255,.35)",t.lineWidth=1.2,t.stroke(),t.beginPath(),t.moveTo(n,s-3),t.lineTo(n,s+3),t.moveTo(n+o,s-3),t.lineTo(n+o,s+3),t.stroke(),t.fillStyle="rgba(255,255,255,.45)",t.font="9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillText(`${r}cm`,n+o/2,s-3),t.font="bold 9px system-ui",t.fillStyle="rgba(11,130,92,.6)",t.textAlign="right",t.textBaseline="top",t.fillText("X →",e.W-4,4),t.textAlign="left",t.textBaseline="bottom",t.fillText("Y ↓",4,e.H-4),t.textAlign="left",t.textBaseline="top",t.fillStyle="rgba(255,255,255,.3)",t.fillText("0",4,4),t.textBaseline="alphabetic"}const He=[[0,33,102,172],[.35,5,168,170],[.65,240,190,60],[1,214,48,49]];function qe(t,e){const i=Math.min(1,Math.max(0,t));let a=He[0],r=He[He.length-1];for(let t=1;t<He.length;t++)if(i<=He[t][0]){a=He[t-1],r=He[t];break}const o=r[0]-a[0],s=0===o?0:(i-a[0])/o,n=(t,e)=>Math.round(t+(e-t)*s);return`rgba(${n(a[1],r[1])},${n(a[2],r[2])},${n(a[3],r[3])},${e})`}function Ne(t,e,i,a){const r=a.W/a.roomW,o=a.H/a.roomD;return{point:(t,a)=>({x:e+t*Math.cos(a)*r,y:i+t*Math.sin(a)*o}),arc:(a,s,n,l=!1)=>{t.ellipse(e,i,a*r,a*o,0,s,n,l)},gradient:(a,s)=>{t.save(),t.translate(e,i),t.scale(r,o);const n=t.createRadialGradient(0,0,a,0,0,s);return t.restore(),n}}}function Le(t,e,i,a,r,o,s,n,l,d){const c=Ne(t,e,i,l),h=t=>100*t,p=o/2*(Math.PI/180),_=Math.PI/2-a*(Math.PI/180),u=Math.max(0,Math.cos(r*(Math.PI/180))),g=h(s*u),m=h(n*u),f=(e,i,a,r,o=1.2)=>{const s=c.point(i,_-p);t.beginPath(),t.moveTo(s.x,s.y),c.arc(i,_-p,_+p,!1),c.arc(e,_+p,_-p,!0),t.closePath(),t.fillStyle=a,t.fill("evenodd"),t.strokeStyle=r,t.lineWidth=o,t.stroke()};if(null!=d&&d>s&&d<n){const t=h(d*u),e=c.gradient(t,m);e.addColorStop(0,"rgba(11,130,92,.35)"),e.addColorStop(1,"rgba(11,130,92,.08)"),f(t,m,e,"rgba(11,130,92,.60)");const i=c.gradient(g,t);i.addColorStop(0,"rgba(11,130,92,.60)"),i.addColorStop(1,"rgba(11,130,92,.25)"),f(g,t,i,"rgba(11,130,92,.90)",1.5)}else{const t=c.gradient(g,m);t.addColorStop(0,"rgba(11,130,92,.50)"),t.addColorStop(1,"rgba(11,130,92,.12)"),f(g,m,t,"rgba(11,130,92,.75)",1.5)}if(o>0){let e=1;e=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let i=e;i<=n;i+=e){if(i<=s)continue;const e=h(i*u);t.beginPath(),c.arc(e,_-p,_+p,!1),t.strokeStyle="rgba(255, 255, 255, 0.18)",t.lineWidth=.8,t.setLineDash([3,4]),t.stroke(),t.setLineDash([])}const i=o>=90?15:o>=40?10:15,a=o/2;for(let e=-a;e<=a;e+=i){const i=_+e*(Math.PI/180),a=c.point(g,i),r=c.point(m,i);if(t.beginPath(),t.moveTo(a.x,a.y),t.lineTo(r.x,r.y),t.strokeStyle=0===e?"rgba(11, 200, 140, 0.5)":"rgba(255, 255, 255, 0.18)",t.lineWidth=0===e?1.2:.8,0!==e&&t.setLineDash([3,4]),t.stroke(),t.setLineDash([]),0!==e){const a=c.point(m,i),r=a.x+14*Math.cos(i),o=a.y+14*Math.sin(i);t.font="bold 9px system-ui",t.fillStyle="rgba(255, 255, 255, 0.85)",t.textAlign="center",t.textBaseline="middle",t.fillText(`${e>0?"+":""}${e}°`,r,o),t.textBaseline="alphabetic"}}}t.beginPath(),t.moveTo(e,i),c.arc(g,_-p,_+p,!1),t.closePath(),t.fillStyle="rgba(0,0,0,.50)",t.fill(),t.beginPath(),c.arc(g,_-p,_+p,!1),t.strokeStyle="rgba(244,99,99,.80)",t.lineWidth=1.5,t.setLineDash([3,3]),t.stroke(),t.setLineDash([]);const y=(e,i,a)=>{const{x:r,y:o}=c.point(i,_),s=`${e}m`;t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="middle";const n=t.measureText(s).width;t.fillStyle="rgba(10,10,24,.82)",t.beginPath(),t.roundRect?.(r-n/2-3,o-7,n+6,14,3),t.fill(),t.fillStyle=a,t.fillText(s,r,o)};if(o>0){let t=1;t=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let e=t;e<=n;e+=t){if(e<=s)continue;const t=h(e*u),i=Math.abs(e-n)<.01,a=null!=d&&Math.abs(e-d)<.01,r=i?"rgba(27,159,117,.95)":a?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";y(Number(e.toFixed(1)),t,r)}}else{const e=c.point(g,_),i=c.point(m,_);t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.strokeStyle="rgba(11, 200, 140, 0.65)",t.lineWidth=1.5,t.setLineDash([4,4]),t.stroke(),t.setLineDash([]);let a=1;a=n<=3?.5:n<=12?1:n<=25?5:n<=50?10:20;for(let t=a;t<=n;t+=a){if(t<=s)continue;const e=h(t*u),i=Math.abs(t-n)<.01,a=null!=d&&Math.abs(t-d)<.01,r=i?"rgba(27,159,117,.95)":a?"rgba(11,130,92,1)":"rgba(255,255,255,.7)";y(Number(t.toFixed(1)),e,r)}}t.textBaseline="alphabetic",t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.fillStyle="rgba(10,10,24,.92)",t.fill(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=1.5,t.stroke();for(const[a,r]of[[7,0],[-7,0],[0,7],[0,-7]])t.beginPath(),t.moveTo(e+.3*a,i+.3*r),t.lineTo(e+a,i+r),t.strokeStyle="rgba(11,130,92,.7)",t.lineWidth=1.2,t.stroke()}function Ie(t,e,i,a,r="#ff9800"){a?(t.save(),t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.fillStyle=r,t.globalAlpha=.25,t.fill(),t.restore(),t.beginPath(),t.arc(e,i,5,0,2*Math.PI),t.fillStyle=r,t.fill(),t.strokeStyle="rgba(255,255,255,.6)",t.lineWidth=1.5,t.stroke()):(t.save(),t.setLineDash([2,2]),t.beginPath(),t.arc(e,i,9,0,2*Math.PI),t.strokeStyle=r,t.globalAlpha=.5,t.lineWidth=1.5,t.stroke(),t.setLineDash([]),t.beginPath(),t.arc(e,i,4,0,2*Math.PI),t.globalAlpha=.8,t.lineWidth=1.5,t.stroke(),t.restore())}function je(t,e,i,a,r,o,s,n,l){const d=Ne(t,e,i,n),c=100*s*Math.max(0,Math.cos(r*(Math.PI/180))),h=o/2*(Math.PI/180),p=Math.PI/2-a*(Math.PI/180);if(l){t.beginPath(),d.arc(c,p-h,p+h),t.strokeStyle="rgba(255,152,0,.35)",t.lineWidth=6,t.lineCap="round",t.stroke(),t.beginPath(),d.arc(c,p-h,p+h),t.strokeStyle="var(--accent-color,#ff9800)",t.lineWidth=2.5,t.lineCap="round",t.stroke();const{x:e,y:i}=d.point(c,p);t.beginPath(),t.arc(e,i,7,0,2*Math.PI),t.fillStyle="rgba(255,152,0,.3)",t.fill(),t.beginPath(),t.arc(e,i,4,0,2*Math.PI),t.fillStyle="var(--accent-color,#ff9800)",t.fill(),t.strokeStyle="rgba(255,255,255,.8)",t.lineWidth=1.2,t.stroke()}else{t.setLineDash([4,4]),t.beginPath(),d.arc(c,p-h,p+h),t.strokeStyle="rgba(244,67,54,.65)",t.lineWidth=2,t.lineCap="round",t.stroke(),t.setLineDash([]);const{x:e,y:i}=d.point(c,p);t.beginPath(),t.arc(e,i,4,0,2*Math.PI),t.strokeStyle="rgba(244,67,54,.8)",t.lineWidth=1.5,t.stroke()}t.lineCap="butt"}const Oe={en:{card_name:"MMWave Radar HA Card",tabs:{geo:"① Geometry & Boundary",yaw:"② Yaw Calibration",live:"③ Live View"},geo:{install_params:"Installation Parameters (measure with tape)",radar_x:"Radar X",radar_y:"Radar Y",radar_z:"Height",yaw_rough:"Rough Yaw",pitch:"Pitch",roll:"Roll",geo_note:"Origin: top-left corner. X → right. Y ↓ down (toward foot of bed).\nYaw = angle of radar forward axis from Y-axis, clockwise positive.\nPitch/Roll: 0 for horizontal mount; enter tilt angle or read from IMU.",boundary:"Room Boundary (optional)",poly_hint_none:"Click canvas to draw boundary (≥ 3 points)",poly_hint_ok:"Boundary active — {n} vertices",poly_undo:"Undo",poly_clear:"Clear",boundary_note:"No boundary = no filtering. Targets outside the polygon are ignored.",step_1_installation:"Step 1 · Installation",place_the_radar_in_the_room:"Place the radar in the room",drag_the_colored_handles_to_set:"Drag the colored handles to set position, height and orientation.",precise_numeric_adjustment:"Precise numeric adjustment",optional:"Optional",optional_2:"Optional",click_the_top_down_map_to:"Click the top-down map to outline the active detection area.",points:"points",off:"Off",undo_point:"Undo point",click_the_map_to_add_the:"Click the map to add the first point"},yaw:{ref_a_title:"Reference Point A",ref_b_title:"Reference Point B",ref_a_idle:"Click the preview to mark a known position",ref_a_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_a_done:"Captured",ref_b_idle:"Complete point A first",ref_b_step:"Click another known position (> 80 cm from A)",ref_b_marked:"Marked at ({x}, {y}) cm — walk there, then Capture",ref_b_done:"Captured",capture_btn:"Walk to marked position → Capture radar reading",capture_wait:"Waiting for radar data…",result_idle:"Click the preview map to start — mark reference point A",result_ok:"Yaw {yaw}° · Residual {residual} cm",step_2_direction:"Step 2 · Direction",calculate_yaw_from_two_positions:"Calculate yaw from two positions",choose_two_well_separated_places_you:"Choose two well-separated places you can stand, then capture one reading at each.",click_the_map_to_choose_where:"Click the map to choose where to stand",stand_still_while_waiting_for_radar:"Stand still while waiting for radar data…",walk_to_the_marked_position:"Walk to the marked position",i_am_ready_capture_position:"I am ready — capture position",choose_a_position_on_the_map:"Choose a position on the map first",start_over:"Start over",troubleshoot_title:"If the live point looks wrong",troubleshoot_body:"Mirrored motion means yaw is 180° off. Motion at right angles means 90° off. Recapture the two points rather than editing the number by hand. 2D radars cannot infer pitch or roll from floor points."},live:{title:"Room Top-Down View",badge_none:"No presence",badge_present:"Present",badge_unlocated:"Present · range unavailable",badge_filtered:"Outside boundary",model:"Model",ld2450:"HLK-LD2450 (2-D 120° 8m)",ld2454:"HLK-LD2454 (2-D 120° 8m)",rd03e:"RD03E (1-D 8m)",room_x:"Room X (cm)",room_y:"Room Y (cm)",room_z:"Height (cm)",targets:"Targets",step_3_live_test:"Step 3 · Live test",verify_coverage_and_target_trails:"Verify coverage and target trails",walk_through_the_room_and_confirm:"Walk through the room and confirm that target positions and trails match reality.",clear_trails:"Clear trails",waiting_for_a_radar_target:"Waiting for a radar target",detected_targets:"Detected targets",target:"Target",inside:"Inside",outside:"Outside",no_target_data_yet:"No target data yet",polygon_boundary:"Polygon boundary",filtered_area:"Shaded: filtered out",area_n:"Area {n}"},area:{hint:"Stand at the desk, bed or door and tap I'm here — or click the map to draw the polygon yourself.",stand_here:"I'm here",stand_need_target:"Walk into the spot first. The radar needs a target before it can place the area.",area_n:"Area {n}",warn_small:"An area is narrower than {cm} cm — occupancy may flicker.",warn_close:"Area centroids are closer than {cm} cm — exclusive assignment will fight.",warn_overlap:"Areas overlap. A still target stays in the last area until it leaves the hysteresis band.",ok:"Areas look separable."},actions:{save:"Save",saved:"Saved ✓",reset:"Reset",reset_confirm:"Clear all calibration data?"},editor:{model:"Radar model",entities:"Entities",presence_entity:"Presence entity",distance_entity:"Distance entity",motion_state_entity:"Motion state entity (optional)",target_state_entity:"Target state entity (optional)",x_entity:"X coordinate entity",y_entity:"Y coordinate entity",z_entity:"Z coordinate entity (optional)",breath_entity:"Breath Entity (Optional)",heart_entity:"Heart Rate Entity (Optional)",sleep_entity:"Sleep State Entity (Optional)",polygon_entity:"Polygon Sync Entity (Optional)",target_frame:"Atomic Target Frame (Optional)",target_1_x:"Target 1 X Entity",target_1_y:"Target 1 Y Entity",target_1_speed:"Target 1 Speed Entity (Optional)",target_2_x:"Target 2 X Entity (Optional)",target_2_y:"Target 2 Y Entity (Optional)",target_2_speed:"Target 2 Speed Entity (Optional)",target_3_x:"Target 3 X Entity (Optional)",target_3_y:"Target 3 Y Entity (Optional)",target_3_speed:"Target 3 Speed Entity (Optional)",room_dimensions:"Room Dimensions",room_w:"Room width (cm)",room_d:"Room depth (cm)",imported_p0_revision_p1:"Imported {p0} (revision {p1})",imported_device_calibration_profile_p0:"Imported device calibration profile: {p0}",saving_device_calibration_profiles:"Saving device calibration profiles…",all_calibrations_were_applied_and_saved:"All calibrations were applied and saved.",operating_mode:"Operating mode",single_radar:"Single radar",multi_radar_fusion:"Multi-radar fusion",multi_radar_fusion_2:"Multi-radar fusion",place_multiple_2_d_radars_in:"Place multiple 2-D radars in one floor-plan coordinate system and sync them to the persistent HA backend.",floor_plan_and_backend:"Floor plan and backend",card_title:"Card title",sync_configuration_to_the_backend_when:"Sync configuration to the backend when an administrator opens the card",radar_devices:"Radar devices",only_radar_models_with_2_d:"Only radar models with 2-D or 3-D positions are shown. Every radar needs a unique ID.",radar_devices_and_installation:"Radar devices",configure_devices_then_place_them:"Use tabs to add, remove and bind radar devices. Adjust installation and direction from the card’s top-right calibration workspace.",radar:"Radar",radar_device:"Radar device",select_device:"Select device",calibration_profile:"Calibration profile",manual_not_linked:"Automatic device calibration profile",device_profile_snapshot:"Linked calibration profile",entity_mapping:"Entity mapping",add_radar:"Add radar",radar_installation_tabs:"Radar installation tabs",interactive_installation:"Interactive installation",select_a_radar_in_the_shared:"Select a radar in the shared room model, then drag the handles to adjust its position, height and orientation. Other radars remain as gray landmarks.",current_tab_controls_form_and_3d:"The active tab keeps its parameter form and 3-D model in sync. Other radars remain as gray landmarks.",joint_multi_radar_calibration:"Joint multi-radar calibration",each_shared_reference_position_captures_every:"Each shared reference position captures every radar and independently solves yaw and X/Y corrections for each device.",fusion_and_recording_rules:"Fusion and recording rules",filter_single_radar_false_alarms_and:"Filter single-radar false alarms and save recordings only for complete, continuous crossings after a track ends.",minimum_supporting_radars:"Minimum supporting radars",merge_distance_cm:"Merge distance (cm)",track_end_delay_s:"Track end delay (s)",duplicate_gate_cm:"Same-radar duplicate distance (cm)",duplicate_gate_cm_help:"Extra slots from one radar closer than this are treated as the same person.",range_merge_factor:"Range merge factor",range_merge_factor_help:"Extra merge allowance as a fraction of radar-local range. 0.08 at 5 m adds 40 cm.",merge_confirm_s:"Track merge delay (s)",merge_confirm_s_help:"How long two close confirmed tracks must overlap before they become one identity.",recording_score:"Recording score",minimum_duration_s:"Minimum duration (s)",minimum_displacement_cm:"Minimum displacement (cm)",boundary_margin_cm:"Boundary margin (cm)",record_complete_crossings_only:"Record complete crossings only",recording_test:"Recording test",enter_near_one_room_edge_walk:"Enter near one room edge, walk continuously for at least {p0} cm, and leave at another edge. Wait {p1} seconds after leaving radar coverage. A qualified event becomes TRAVERSE and triggers the camera.",event_zones_and_cameras:"Event zones and cameras",draw_polygon_vertices_on_the_floor:"Draw lobby, corridor or stairwell zones on the floor plan. Indoor bathrooms and desks use single-radar Occupied, not fusion. Saved zones sync to the backend.",cameras_help:"Stills and short clips are saved locally when those events fire. This does not search an NVR timeline. Leave zones unchecked to record every zone.",add_camera:"Add camera",remove_camera:"Remove camera",camera_entity:"Camera entity",keep_media_for:"Keep stills/clips for",camera_zones:"Zones",camera_zones_all:"No zones drawn yet — this camera records the whole floor.",lookback_s:"Lookback (s)",duration_s:"Clip duration (s)",cooldown_s:"Cooldown (s)",mmwave_radar_card:"MMWave radar card",choose_a_radar_device_to_match:"Choose a radar device to match entities automatically, then confirm the room size.",basics:"Basics",card_title_2:"Card title",presence_radar:"Presence radar",connect_radar_device:"Connect radar device",select_the_radar_from_home_assistant:"Select the radar from Home Assistant and the card will identify the required entities.",radar_device_2:"Radar device",detecting_device_entities:"Detecting device entities…",matched_p0_configuration_fields:"Matched {p0} configuration fields",automatic_detection_failed_configure_entities_manually:"Automatic detection failed. Configure entities manually below.",enter_the_room_dimensions_used_by:"Enter the room dimensions used by the 3D placement and target map.",advanced_assign_entities_manually:"Advanced: assign entities manually",troubleshooting:"Troubleshooting",fusion_rate_hz:"Fusion rate (Hz)",fusion_rate_hz_help:"How often positions are computed. Higher is smoother and costs more CPU. It does not change how much is stored — that is the trajectory quality setting persist_interval_s, which saves one position per track every half second by default.",association_distance_cm:"Association distance (cm)",association_distance_cm_help:"How far a target may move between frames and still be treated as the same person. Too small splits one person into several tracks; too large merges two people into one.",confirm_hits:"Frames before a track is published",confirm_hits_help:"Raising this suppresses brief false targets at the cost of a slower first detection.",gesture_entity:"Gesture sensor"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)",entity_aliases:{distance:["distance"],motion_state:["motion state","motion_state","target state","target_state"],polygon:["polygon","boundary"]},card:{syncing:"Syncing…",synced:"Synced",sync_failed:"Sync failed",sync_to_device:"Sync to device",installation:"Installation",place_the_radar_in_the_3d:"Place the radar in the 3D room",direction:"Direction",calibrate_yaw_with_two_reference_points:"Calibrate direction with samples from several areas",live_test:"Live test",verify_targets_boundary_and_trails:"Verify targets, boundary and trails",presence_radar:"Presence radar",p0_target_p1:"{p0} target{p1}",outside:"Outside",clear:"Clear",near:"Near",far:"Far",open_calibration:"Open calibration",open_calibration_2:"Open calibration",back_to_radar_view:"Back to radar view",back_to_radar_view_2:"Back to radar view",radar_spatial_calibration:"Radar spatial calibration",calibration_steps:"Calibration steps",revert:"Revert",reset:"Reset",back:"Back",continue:"Continue",multi_radar_fusion:"Multi-radar fusion",p0_p1_radars_p2:"{p0}/{p1} radars · {p2}",p0_targets:"{p0} targets",clear_2:"Clear",trajectory_quality:"Trajectory quality",no_playable_clip_is_available_yet:"No playable clip is available yet, or recording is still in progress.",clip_review:"Camera review"},fusion:{filtered:"Filtered",clip_failed:"Clip failed",recording:"Recording",key_track:"Key track",backend_fusion:"Backend fusion",local_fallback:"Local fallback",backend_error:"Backend error",connecting:"Connecting",hide_coverage:"Hide coverage",show_coverage:"Show coverage",radars_online:"radars online",calibration_warning:"Calibration warning",fused_targets:"Fused targets",recent_events:"Recent events",event_search_hint:"Filter by type, zone and time. Thumbnails are local stills, not NVR playback.",filter_all:"All",filter_all_zones:"All zones",window_all:"All time",integration_missing:"Fusion integration not installed",integration_missing_help:"Multi-radar fusion needs the separate mmwave-fusion integration (experimental). Without it the card fuses in the browser only: no stored trajectories, no events, no recordings.",integration_outdated:"Fusion integration is outdated",show_heatmap:"Heatmap",hide_heatmap:"Hide heatmap",window_hour:"1 h",window_day:"24 h",window_week:"7 d",heatmap_rare:"Rare",heatmap_frequent:"Frequent",heatmap_loading:"Reading stored trajectories…",heatmap_summary:"{points} points · {bin} cm cells",heatmap_truncated:"busiest cells only",heatmap_failed:"Heatmap query failed",heatmap_needs_newer_backend:"The heatmap needs a newer mmwave-fusion integration",heatmap_hint:"Where people walked. Apartment: which stretch of corridor is used. Does not name anyone.",show_replay:"Replay",hide_replay:"Hide replay",window_5min:"5 min",window_6h:"6 h",replay_loading:"Reading stored tracks…",replay_empty:"Nothing was recorded in this window",replay_summary:"{tracks} tracks · {points} points",replay_thinned:"thinned to {hz} Hz",replay_failed:"Replay query failed",replay_needs_newer_backend:"Replay needs a newer mmwave-fusion integration",replay_hint:"What happened at a time. Apartment: check a 3am crossing without a camera.",assist_hint:"Optional: enable the MMWave Fusion LLM API on a conversation agent to ask Assist about occupancy and events. Radar tracks stay anonymous.",calibration_hint_not_reporting:"Not reporting. Check power, Wi-Fi and the UART wiring first.",calibration_hint_stale_frames:"The ESP is reachable but frames have stopped. A full power cycle usually fixes this.",calibration_hint_outside_room:"Fewer than 20% of detections land inside the room. Yaw is usually 90° or 180° off, or the origin corner is wrong. Recalibrate from the yaw tab; do not edit numbers by hand.",review_person:"Person",review_pet:"Pet",review_false_positive:"False positive",review_uncertain:"Uncertain"},workflow:{editor_calibration_title:"Installation and calibration are on the card",editor_calibration_hint:"Save the basic configuration, return to the card and open its top-right calibration control for placement, direction and live verification. Selecting a profile here only binds it.",discard_confirm:"Leave and discard unapplied installation changes and capture samples?",preview_readonly:"Save and exit the card editor, then open calibration from the card’s top-right control.",backend_required:"Update and connect the fusion backend before calibrating multiple radars.",use_results:"Use results and verify",verify_hint:"This temporary fusion preview uses your draft installation. Walk through the room alone and check target merging and continuity, then apply and sync. This preview stores no tracks or recordings; the running backend continues using its saved settings.",preview_status:"Calibration draft",saving:"Applying…",saved:"Calibration saved in HA and synced to all devices.",saved_partial:"Calibration saved in HA. Some device parameters could not be synced; reconnect and retry.",save_failed:"Calibration could not be applied. Check the error; if another page updated calibration, exit and reopen this workspace.",unsaved:"Unapplied installation changes",draft_hint:"Apply after verification; exit to discard changes",apply_sync:"Apply and sync",previous:"Previous",next:"Next"},fusioncal:{capturing_all_radars_synchronously:"Capturing all radars synchronously…",no_radar_produced_enough_stable_samples:"No radar produced enough stable samples. Try again.",captured_p0_p1_radars:"Captured {p0}/{p1} radars.",joint_direction_calibration:"Direction calibration",calibrate_every_radar_from_shared_positions:"Pause in three guided areas",keep_only_one_test_person_in:"Keep one person in the room. Follow the green areas and stand still to capture; centimetre accuracy is unnecessary.",mobile_calibration:"Mobile calibration",mobile_calibration_hint:"Use the focused view to keep guidance and capture controls visible.",enter_mobile_calibration:"Start",exit_mobile_calibration:"Exit",guided_capture_floor_plan:"Guided joint-calibration floor plan",pending_x_p0_y_p1_cm:"Pending: X {p0} / Y {p1} cm",click_the_floor_plan_to_choose:"Click the floor plan to choose the next reference position",tap_a_guided_region:"Tap one of the guided capture areas.",move_to_region_p0:"Move to green area {p0}",stand_near_center_then_hold_still:"Stand approximately near the center, within about one small step. Captured: {p2}/{p3} radars.",tap_another_region_or_follow_recommendation:"Follow the green guide; tap empty space to move the current uncaptured area.",capturing_region_p0:"Capturing area {p0} from all radars…",region_p0_captured_p1_p2_radars:"Area {p0} captured {p1}/{p2} radars. The next area is now recommended.",p0_p1_samples:"{p0}/{p1} samples",p0_reference_points:"{p0} reference points",capturing:"Capturing…",capturing_p0_percent:"Capturing… {p0}%",capturing_p0_percent_p1_p2_radars_ready:"Capturing {p0}% · {p1}/{p2} radars have stable samples. Hold still.",i_am_ready_capture_all:"I am ready — capture all",p0_p1_regions_captured:"{p0}/{p1} areas captured",p0_p1_radars_ready_short:"{p0}/{p1} radars ready",show_capture_details:"Show details",hide_capture_details:"Hide details",radars:"radars",points:"points",not_enough_references:"Not enough references",span_p0_cm:"span {p0} cm",review_installation_parameters:"Review the indicated radar installations",review_p0_radars_before_retrying:"{p0} need more valid samples. Capture another visible area; completed readings are retained.",xy_yaw_only_manual_note:"Joint calibration estimates only X, Y and yaw. Confirm radar_z, pitch and roll from the physical installation. A rejected fit is diagnostic only and is never written to the configuration.",calibration_reference_accepted:"Reference accepted",installation_needs_review:"Review installation",current_installation:"Current installation",fitted_reference:"Fitted reference",suggested_manual_adjustment:"Suggested manual adjustment",quality_not_enough_points:"Only {p0} valid points; this reference has low confidence.",quality_span_too_small:"The capture span is only {p0} cm; this reference has low confidence.",quality_residual_too_high:"The fitted residual of {p0} cm exceeds {p1} cm. Check the installation and outlier captures first; do not copy this reference directly.",quality_reference_outside_room:"The fitted installation is outside the room. Check the coordinate origin, direction and physical installation.",quality_reference_accepted:"The fitted residual is {p0} cm; this reference can be reviewed or applied.",p0_p1_radars_ready:"{p0}/{p1} radars ready to verify",start_over:"Start over",apply_all_calibrations:"Use accepted results and verify",need_3_points_120_cm_span:"Capture at least three separated areas",retained_current:"Existing parameters passed this check; no adjustment needed.",ready_summary:"Capture complete: {p0} ready to verify; {p1} need more samples and will keep their existing settings.",range_only:"Range-only radar cannot determine direction. Set its orientation in Installation.",remove_before_moving:"Remove this captured area in details before moving it.",outlier_remaining:"A large mismatch remains. Capture another area.",retained_names:"{p0}: existing parameters passed this check; no adjustment needed.",pending_names:"{p0} still need calibration. Their existing settings are retained; capture more areas later.",standing_area_outside:"Choose a standing area inside the boundary and away from walls.",no_standing_area:"No usable standing area. Check the room boundary, dimensions and radar placement.",few_standing_areas:"Too little space for three separate standing areas. Check the boundary and radar placement."},zone:{zone_p0:"Zone {p0}",zone_id_cannot_be_empty:"Zone ID cannot be empty",zone_id_must_be_unique:"Zone ID must be unique",at_least_three_vertices_are_required:"At least three vertices are required",new_zone:"New zone",floor_plan_event_zone_editor:"Floor-plan event zone editor",name:"Name",dwell_seconds:"Dwell seconds",dwell_seconds_help:"0 = no dwell event. Apartment loitering: 300 for five minutes. Indoor bathrooms use single-radar Occupied, not this.",vertices:"vertices",undo_point:"Undo point",clear:"Clear",delete_zone:"Delete zone",cancel:"Cancel",save_zone:"Save zone",select_or_create_a_zone_then:"Select or create a zone, then click its vertices on the floor plan."},fusion_reason:{insufficient_observations:"Too few observations",too_short:"Too short",too_few_observations:"Too few valid points",insufficient_displacement:"Insufficient displacement",discontinuous_observations:"Discontinuous",mostly_outside_room:"Mostly outside room",observation_gap:"Observation gap",trajectory_jump:"Trajectory jump",incomplete_crossing:"Incomplete crossing",unstable_boundary_crossing:"Unstable crossing",below_score_threshold:"Below score threshold"},install3d:{yaw:"Yaw",pitch:"Pitch",roll:"Roll",vertical_fov_is_not_specified_showing:"Vertical FOV is not specified; showing a conservative estimate",nominal_scan_volume_from_the_model:"Nominal scan volume from the model manual",scan_volume:"Scan volume",drag_the_colored_handles_to_position:"Drag the colored handles to position and orient the radar",model_scan_range:"Model scan range",position_x_y:"Position X/Y",height:"Height",yaw_2:"Yaw",pitch_2:"Pitch",roll_2:"Roll"},range:{title:"Distance filter",explanation:"This radar measures range only. Position on the centre line is illustrative; polygon filtering is unavailable.",min:"Minimum distance",max:"Maximum distance",zero:"0 disables that software limit. Changes are sent with Sync to device.",software:"Software interval",unlimited:"No upper limit",native_max:"Reported native maximum",unknown:"Unknown / not exposed",native_min_unknown:"Native minimum and per-gate exclusions are not reported here; full coverage is not verified.",limited:"Native maximum is smaller than the software interval; targets beyond it cannot be recovered.",noise_preserved:"Native detection thresholds are preserved; changing this interval does not reset them.",noise_unknown:"Adjustable native noise rejection is not confirmed for this model; no noise parameters are overwritten.",invalid:"Maximum distance must be zero or at least the minimum distance."},floorplan:{title:"Floor plan background",url:"Image URL",source_hint:"Use a PNG, JPG or WebP image, for example /local/floorplans/room.png in HA.",visible:"Show background",locked:"Lock placement",loading:"Loading image…",error:"Unable to load image. Check the URL.",preview:"Floor plan placement preview",unlock_hint:"Unlock to adjust image placement and scale.",drag_hint:"Drag the image to align it. The green outline is the room.",scale_hint:"Tap both ends of a known wall segment, then enter its actual length.",origin_hint:"Tap the image point that should be the room origin.",scale:"Calibrate scale",origin:"Set origin",move:"Move image",length:"Actual length (cm)",apply_scale:"Apply scale",width:"Image width (cm)",x:"Horizontal offset (cm)",y:"Vertical offset (cm)",rotation:"Clockwise rotation (°)",opacity:"Opacity",upload:"Upload image",uploading:"Uploading image…",upload_error:"Upload failed. Choose a PNG, JPEG or GIF under 9 MB and check the HA connection.",trace:"Snap to walls",trace_hint:"Tap near wall corners to trace; undo to correct a point.",trace_snapped:"Snapped to image edge",trace_unavailable:"Use an uploaded image for snapping; manual tracing is still available."},metrics:{heart:"Heart rate",breath:"Breathing",gesture:"Gesture",per_minute:"/min",none:"None",right:"Wave right",left:"Wave left"}},"zh-Hans":{card_name:"毫米波雷达校准卡片",tabs:{geo:"① 几何 & 边界",yaw:"② 偏航校准",live:"③ 实时验证"},geo:{install_params:"安装参数（卷尺测量后填入）",radar_x:"雷达 X",radar_y:"雷达 Y",radar_z:"安装高度",yaw_rough:"粗略偏航",pitch:"俯仰角",roll:"横滚角",geo_note:"坐标原点为预览图左上角，X 向右，Y 向下（从床头到床尾方向为正）。\n偏航角 = 雷达正前方相对 Y 轴（向下）的夹角，顺时针为正。\nPitch/Roll：水平安装填 0；有倾斜时填实测值或接入 IMU 传感器后自动读取。",boundary:"房间边界过滤（可选）",poly_hint_none:"点击画布添加顶点，绘制有效区域（≥ 3 个点）",poly_hint_ok:"边界过滤已启用 — {n} 个顶点",poly_undo:"撤销",poly_clear:"清除",boundary_note:"不绘制边界 = 不过滤。绘制后，落在多边形外的目标将被忽略。",step_1_installation:"步骤 1 · 安装定位",place_the_radar_in_the_room:"在房间中放置雷达",drag_the_colored_handles_to_set:"拖拽 3D 模型上的彩色控制柄，直观调整安装位置、高度和朝向。",precise_numeric_adjustment:"精确数值调整",optional:"可选",optional_2:"可选设置",click_the_top_down_map_to:"在俯视图中点击，依次勾画实际有效检测区域。",points:"个点",off:"未启用",undo_point:"撤销一点",click_the_map_to_add_the:"点击地图添加第一个边界点"},yaw:{ref_a_title:"参考点 A",ref_b_title:"参考点 B",ref_a_idle:"在预览图上点击一个你能走到的已知位置",ref_a_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_a_done:"捕获完成",ref_b_idle:"完成 A 点后操作",ref_b_step:"点击另一个已知位置（与 A 距离 > 80 cm）",ref_b_marked:"已标记 (X={x}, Y={y}) cm → 走到该位置后点击「捕获」",ref_b_done:"捕获完成",capture_btn:"走到标记位置后 → 点此捕获雷达读数",capture_wait:"等待雷达数据…",result_idle:"在预览图上点击参考点 A 开始校准",result_ok:"偏航角 {yaw}° · 残差 {residual} cm",step_2_direction:"步骤 2 · 方向校准",calculate_yaw_from_two_positions:"用两个位置自动计算偏航",choose_two_well_separated_places_you:"依次选择两个相距较远且方便站立的位置，雷达会自动完成方向校准。",click_the_map_to_choose_where:"点击地图选择站立位置",stand_still_while_waiting_for_radar:"保持站立，正在等待雷达数据…",walk_to_the_marked_position:"请走到已标记的位置",i_am_ready_capture_position:"我已站好，捕获雷达位置",choose_a_position_on_the_map:"请先在地图上选择位置",start_over:"重新校准",troubleshoot_title:"实时的点看起来不对时",troubleshoot_body:"点镜像说明偏航角差 180°；点和移动方向成直角说明差 90°。请重新捕获两个参考点，不要手改数字。二维雷达不能从平面点反推俯仰或横滚。"},live:{title:"房间俯视图",badge_none:"无人",badge_present:"有人",badge_unlocated:"有人 · 距离未知",badge_filtered:"边界外",model:"雷达型号",ld2450:"HLK-LD2450 (二维 120° 8米)",ld2454:"HLK-LD2454 (二维 120° 8米)",rd03e:"RD03E (一维 8米)",room_x:"房间 X (cm)",room_y:"房间 Y (cm)",room_z:"离地高度 (cm)",targets:"目标数",step_3_live_test:"步骤 3 · 实时验证",verify_coverage_and_target_trails:"确认检测区域与目标轨迹",walk_through_the_room_and_confirm:"在房间内走动，检查每个目标的颜色、位置和轨迹是否符合实际。",clear_trails:"清除轨迹",waiting_for_a_radar_target:"等待雷达检测到目标",detected_targets:"检测目标",target:"目标",inside:"有效",outside:"边界外",no_target_data_yet:"当前没有目标数据",polygon_boundary:"多边形边界",filtered_area:"灰色区域：已过滤",area_n:"区域 {n}"},area:{hint:"站到书桌、床或门口，点「我在这里」——也可以自己在地图上描多边形。",stand_here:"我在这里",stand_need_target:"先走进那个位置。雷达要看到目标才能放下区域。",area_n:"区域 {n}",warn_small:"有区域短边小于 {cm} cm，占位可能抖动。",warn_close:"区域质心距离小于 {cm} cm，互斥分配会来回抢。",warn_overlap:"区域有重叠。静止目标会留在上次区域，直到走出迟滞带。",ok:"区域间距看起来够用。"},actions:{save:"保存",saved:"已保存 ✓",reset:"重置",reset_confirm:"清除所有校准数据？"},editor:{model:"雷达型号",entities:"实体配置",presence_entity:"存在感知实体",distance_entity:"距离实体",motion_state_entity:"运动状态实体（可选）",target_state_entity:"目标状态实体（可选）",x_entity:"X 坐标实体",y_entity:"Y 坐标实体",z_entity:"Z 坐标实体（可选）",breath_entity:"呼吸频率实体（可选）",heart_entity:"心率实体（可选）",sleep_entity:"睡眠状态实体（可选）",polygon_entity:"多边形同步实体（可选）",target_frame:"原子目标帧实体（可选）",target_1_x:"目标 1 X 实体",target_1_y:"目标 1 Y 实体",target_1_speed:"目标 1 速度实体（可选）",target_2_x:"目标 2 X 实体（可选）",target_2_y:"目标 2 Y 实体（可选）",target_2_speed:"目标 2 速度实体（可选）",target_3_x:"目标 3 X 实体（可选）",target_3_y:"目标 3 Y 实体（可选）",target_3_speed:"目标 3 速度实体（可选）",room_dimensions:"房间尺寸",room_w:"房间宽度 (cm)",room_d:"房间深度 (cm)",imported_p0_revision_p1:"已导入 {p0}（版本 {p1}）",imported_device_calibration_profile_p0:"已自动导入设备校准档案：{p0}",saving_device_calibration_profiles:"正在保存设备校准档案…",all_calibrations_were_applied_and_saved:"全部校准已应用并保存。",operating_mode:"运行模式",single_radar:"单雷达",multi_radar_fusion:"多雷达融合",multi_radar_fusion_2:"多雷达融合",place_multiple_2_d_radars_in:"把多台二维定位雷达放入统一户型坐标系，并同步到持续运行的 HA 后端。",floor_plan_and_backend:"户型与后端",card_title:"卡片标题",sync_configuration_to_the_backend_when:"管理员打开卡片时自动同步配置到后端",radar_devices:"雷达设备",only_radar_models_with_2_d:"只显示可输出二维或三维位置的雷达型号。每台雷达必须使用唯一 ID。",radar_devices_and_installation:"雷达设备",configure_devices_then_place_them:"通过 TAB 添加、删除和绑定雷达设备。安装位置和方向统一在卡片右上角的校准工作区调整。",radar:"雷达",radar_device:"雷达设备",select_device:"选择设备",calibration_profile:"校准档案",manual_not_linked:"自动使用设备校准档案",device_profile_snapshot:"已绑定校准档案",entity_mapping:"实体映射",add_radar:"添加雷达",radar_installation_tabs:"雷达安装配置页",interactive_installation:"交互式安装定位",select_a_radar_in_the_shared:"在同一房间模型中选择雷达，并拖动彩色控制柄调整位置、高度和姿态。其他雷达会作为灰色参照保留。",current_tab_controls_form_and_3d:"当前 TAB 的参数表单与 3D 模型保持同步；其他雷达作为灰色参照保留。",joint_multi_radar_calibration:"多雷达联合方向校准",each_shared_reference_position_captures_every:"同一个参考位置会同步采集全部雷达，并为每台设备独立计算 yaw 与 X/Y 修正。",fusion_and_recording_rules:"融合与录像规则",filter_single_radar_false_alarms_and:"过滤单雷达误报，并在轨迹结束后只为完整、连续的穿越轨迹保存录像。",minimum_supporting_radars:"最少支持雷达数",merge_distance_cm:"融合距离 (cm)",track_end_delay_s:"轨迹结束等待 (s)",duplicate_gate_cm:"同雷达重复距离 (cm)",duplicate_gate_cm_help:"同一雷达上近于该距离的多余槽位视为同一个人。",range_merge_factor:"距离融合系数",range_merge_factor_help:"按雷达本地距离额外放宽合并门限。0.08 在 5 m 处约多 40 cm。",merge_confirm_s:"轨迹合并等待 (s)",merge_confirm_s_help:"两条靠近的已确认轨迹要重叠多久才并成同一个身份。",recording_score:"录像最低评分",minimum_duration_s:"最短持续时间 (s)",minimum_displacement_cm:"最短位移 (cm)",boundary_margin_cm:"边界判定范围 (cm)",record_complete_crossings_only:"只保存完整穿越轨迹",recording_test:"录像测试方法",enter_near_one_room_edge_walk:"从房间一侧边缘进入，连续行走至少 {p0} cm 并从另一侧边缘离开；离开雷达范围后等待 {p1} 秒。合格事件会由 TRAJECTORY 变为 TRAVERSE 并触发摄像头。",event_zones_and_cameras:"事件区域与摄像头",draw_polygon_vertices_on_the_floor:"在户型图上画大堂、楼道或楼梯间。户内卫生间和书桌用单雷达 Occupied，不要用融合。保存后同步到后端。",cameras_help:"这些事件发生时在本地保存抓拍和短片，不会去 NVR 时间轴上检索。区域都不勾选表示整层都录。",add_camera:"添加摄像头",remove_camera:"移除摄像头",camera_entity:"摄像头实体",keep_media_for:"为这些事件留画面",camera_zones:"区域",camera_zones_all:"还没有画区域 — 这路摄像头覆盖整层。",lookback_s:"回看（秒）",duration_s:"短片时长（秒）",cooldown_s:"冷却（秒）",mmwave_radar_card:"毫米波雷达卡片",choose_a_radar_device_to_match:"选择雷达设备后自动完成实体匹配，只需确认房间尺寸即可开始。",basics:"基本信息",card_title_2:"卡片标题",presence_radar:"人体存在雷达",connect_radar_device:"连接雷达设备",select_the_radar_from_home_assistant:"从 Home Assistant 设备列表中选择雷达，卡片会自动识别所需实体。",radar_device_2:"雷达设备",detecting_device_entities:"正在识别设备实体…",matched_p0_configuration_fields:"已自动匹配 {p0} 个配置项",automatic_detection_failed_configure_entities_manually:"自动识别失败，请展开高级选项手动配置。",enter_the_room_dimensions_used_by:"填写房间实际尺寸，后续 3D 安装定位和轨迹显示会使用此比例。",advanced_assign_entities_manually:"高级选项：手动指定实体",troubleshooting:"故障排查",fusion_rate_hz:"融合频率（Hz）",fusion_rate_hz_help:"计算位置的频率。越高轨迹越平滑，CPU 开销也越大。它不影响存储量——决定存储量的是轨迹质量选项 persist_interval_s，默认每条轨迹每半秒存一个点。",association_distance_cm:"关联距离（厘米）",association_distance_cm_help:"目标在相邻帧之间移动多远仍算同一个人。过小会把一个人拆成多条轨迹，过大会把两个人并成一条。",confirm_hits:"确认帧数",confirm_hits_help:"调高可抑制瞬时误报，代价是首次检出变慢。",gesture_entity:"手势传感器"},"model.ld2452":"HLK-LD2452 (2D 120° 6m)",entity_aliases:{distance:["距离"],motion_state:["运动状态","目标状态"],polygon:["多边形","边界"]},card:{syncing:"正在同步…",synced:"已同步",sync_failed:"同步失败",sync_to_device:"同步到设备",installation:"安装定位",place_the_radar_in_the_3d:"在 3D 房间中放置雷达",direction:"方向校准",calibrate_yaw_with_two_reference_points:"通过多个区域连续采样校准方向",live_test:"实时验证",verify_targets_boundary_and_trails:"检查目标、边界和运动轨迹",presence_radar:"人体存在雷达",p0_target_p1:"{p0} 个目标",outside:"边界外",clear:"无人",near:"近",far:"远",open_calibration:"打开校准",open_calibration_2:"打开校准",back_to_radar_view:"返回雷达视图",back_to_radar_view_2:"返回雷达视图",radar_spatial_calibration:"雷达空间校准",calibration_steps:"校准步骤",revert:"撤销修改",reset:"恢复默认",back:"上一步",continue:"下一步",multi_radar_fusion:"多雷达融合",p0_p1_radars_p2:"{p0}/{p1} 台雷达 · {p2}",p0_targets:"{p0} 个目标",clear_2:"无人",trajectory_quality:"轨迹质量",no_playable_clip_is_available_yet:"该事件没有可播放片段，或录像仍在生成。",clip_review:"摄像头复核"},fusion:{filtered:"已过滤",clip_failed:"录像失败",recording:"录像中",key_track:"关键轨迹",backend_fusion:"后端融合",local_fallback:"本地降级",backend_error:"后端异常",connecting:"正在连接",hide_coverage:"隐藏覆盖",show_coverage:"显示覆盖",radars_online:"雷达在线",calibration_warning:"安装校准异常",fused_targets:"融合目标",recent_events:"最近事件",event_search_hint:"按类型、区域和时间筛选。缩略图是本地抓拍，不是 NVR 回放。",filter_all:"全部",filter_all_zones:"全部区域",window_all:"全部时间",integration_missing:"未安装融合集成",integration_missing_help:"多雷达融合需要额外安装 mmwave-fusion 集成（实验性）。未安装时卡片仅在浏览器内做临时融合：不保存轨迹、不产生事件、不触发录像。",integration_outdated:"融合集成版本过旧",show_heatmap:"热力图",hide_heatmap:"隐藏热力图",window_hour:"1 小时",window_day:"24 小时",window_week:"7 天",heatmap_rare:"少",heatmap_frequent:"多",heatmap_loading:"正在读取历史轨迹…",heatmap_summary:"{points} 个点 · {bin} 厘米网格",heatmap_truncated:"仅显示最密集的网格",heatmap_failed:"热力图查询失败",heatmap_needs_newer_backend:"热力图需要更新版本的 mmwave-fusion 集成",heatmap_hint:"人常走哪。公寓：哪段走廊用得多。不认人。",show_replay:"回放",hide_replay:"隐藏回放",window_5min:"5 分钟",window_6h:"6 小时",replay_loading:"正在读取历史轨迹…",replay_empty:"这段时间内没有任何记录",replay_summary:"{tracks} 条轨迹 · {points} 个点",replay_thinned:"已抽稀至 {hz} Hz",replay_failed:"回放查询失败",replay_needs_newer_backend:"回放需要更新版本的 mmwave-fusion 集成",replay_hint:"某一时刻发生过什么。公寓：没有摄像头也能核对凌晨三点的穿越。",assist_hint:"可选：在对话代理中勾选 MMWave Fusion LLM API，即可用 Assist 询问占用和事件。雷达轨迹始终匿名。",calibration_hint_not_reporting:"没有上报。先检查供电、Wi-Fi 和 UART 接线。",calibration_hint_stale_frames:"ESP 在线但数据帧停了。通常需要给雷达整体断电重上。",calibration_hint_outside_room:"不到两成的点落在房间内。多半是偏航角差了 90° 或 180°，或原点墙角填错。请到偏航校准页重做，不要手改数字。",review_person:"有人",review_pet:"宠物",review_false_positive:"误报",review_uncertain:"无法判断"},workflow:{editor_calibration_title:"安装与校准已移到卡片右上角",editor_calibration_hint:"保存基础配置后，返回卡片并点击右上角调节图标，完成安装定位、方向校准和现场验证。这里选择的档案仅用于绑定。",discard_confirm:"离开后将丢弃尚未应用的安装调整和采集记录。是否离开？",preview_readonly:"请先保存并退出卡片编辑器，再从卡片右上角进入安装校准。",backend_required:"请更新并连接融合后端，再进行多雷达校准。",use_results:"使用校准结果，进入验证",verify_hint:"当前使用草稿安装参数进行临时融合预览。请单人在房间内行走，检查目标是否合并和轨迹是否连续；确认后点击“应用并同步”。此预览不会保存轨迹或触发录像，运行中的后端继续使用原参数。",preview_status:"校准草稿预览",saving:"正在应用…",saved:"校准已保存到 HA，并已同步全部设备。",saved_partial:"校准已保存到 HA；以下设备参数未同步成功，可恢复连接后重试。",save_failed:"未能应用校准。请检查错误信息；如其他页面已更新校准，请退出后重新进入。",unsaved:"有未应用的安装调整",draft_hint:"确认后再应用，退出可取消本次调整",apply_sync:"应用并同步",previous:"上一步",next:"下一步"},fusioncal:{capturing_all_radars_synchronously:"正在同步采集所有雷达…",no_radar_produced_enough_stable_samples:"没有雷达获得足够的稳定样本，请重试。",captured_p0_p1_radars:"已采集 {p0}/{p1} 台雷达。",joint_direction_calibration:"方向校准",calibrate_every_radar_from_shared_positions:"按引导在三个区域停留",keep_only_one_test_person_in:"房间内只留一人。依次走到绿色提示区域，站稳后采集；无需精确到厘米。",mobile_calibration:"移动校准",mobile_calibration_hint:"进入专注界面后，区域指引和采集按钮会始终可见。",enter_mobile_calibration:"开始",exit_mobile_calibration:"退出",guided_capture_floor_plan:"联合方向校准引导地图",pending_x_p0_y_p1_cm:"待采集：X {p0} / Y {p1} cm",click_the_floor_plan_to_choose:"点击户型图选择下一个参考位置",tap_a_guided_region:"请点击一个引导采集区域。",move_to_region_p0:"请走到绿色区域 {p0}",stand_near_center_then_hold_still:"站在区域中心附近即可，尽量在约一步以内。已采集 {p2}/{p3} 台。",tap_another_region_or_follow_recommendation:"按绿色提示采集；空白处可调整当前未采集区域。",capturing_region_p0:"正在同步采集区域 {p0}…",region_p0_captured_p1_p2_radars:"区域 {p0} 已采集 {p1}/{p2} 台雷达，已自动推荐下一区域。",p0_p1_samples:"{p0}/{p1} 样本",p0_reference_points:"{p0} 个参考点",capturing:"正在采集…",capturing_p0_percent:"正在采集… {p0}%",capturing_p0_percent_p1_p2_radars_ready:"正在采集 {p0}% · {p1}/{p2} 台雷达已获得稳定样本，请保持静止。",i_am_ready_capture_all:"我已站好，同步采集",p0_p1_regions_captured:"已采集 {p0}/{p1} 个区域",p0_p1_radars_ready_short:"{p0}/{p1} 台雷达达标",show_capture_details:"查看详情",hide_capture_details:"收起详情",radars:"台雷达",points:"点",not_enough_references:"参考点不足",span_p0_cm:"跨度 {p0} cm",review_installation_parameters:"请核对指定雷达的安装参数",review_p0_radars_before_retrying:"{p0} 需要更多有效采样。请在可检测到的位置补采，已完成的数据会保留。",xy_yaw_only_manual_note:"联合校准只能估算 X、Y 和 yaw；radar_z、pitch、roll 仍需按实际安装手动确认。拟合未通过时，参考值仅用于排查，不会自动写入配置。",calibration_reference_accepted:"参考可信",installation_needs_review:"需核对安装",current_installation:"当前安装参数",fitted_reference:"拟合参考值",suggested_manual_adjustment:"建议手动调整量",quality_not_enough_points:"只有 {p0} 个有效点，参考可信度低。",quality_span_too_small:"采集跨度只有 {p0} cm，参考可信度低。",quality_residual_too_high:"拟合残差 {p0} cm 超过 {p1} cm；请先核对安装参数和异常采集点，不要直接套用参考值。",quality_reference_outside_room:"拟合安装位置超出户型边界，参考可信度低；请核对坐标原点、方向和安装位置。",quality_reference_accepted:"拟合残差 {p0} cm，参考值可用于核对或应用。",p0_p1_radars_ready:"{p0}/{p1} 台雷达可进入验证",start_over:"重新采集",apply_all_calibrations:"使用合格结果并验证",need_3_points_120_cm_span:"请在至少三个分散区域完成采集",retained_current:"原参数已通过本次检查，无需调整。",ready_summary:"采集完成：{p0} 台可进入验证；{p1} 台待补采，将保留原配置。",range_only:"仅测距雷达无法自动校准方向，请在安装定位中设置朝向。",remove_before_moving:"该区域已有数据，请先在详情中移除再调整位置。",outlier_remaining:"仍有明显偏差，请补采其他区域。",retained_names:"{p0}：原参数已通过检查，无需调整。",pending_names:"{p0} 尚未完成校准，本次保留原配置，可稍后补采。",standing_area_outside:"请选择边界内且远离墙边的停留位置。",no_standing_area:"没有可用的停留区域，请检查房间边界、尺寸和雷达安装位置。",few_standing_areas:"可用空间不足以安排三个分开的停留区域，请检查边界和雷达安装位置。"},zone:{zone_p0:"区域 {p0}",zone_id_cannot_be_empty:"区域 ID 不能为空",zone_id_must_be_unique:"区域 ID 必须唯一",at_least_three_vertices_are_required:"至少需要 3 个顶点",new_zone:"新建区域",floor_plan_event_zone_editor:"事件区域户型编辑器",name:"名称",dwell_seconds:"驻留秒数",dwell_seconds_help:"0 不发久留事件。公寓徘徊：300 为五分钟。户内卫生间用单雷达 Occupied，不要画融合区域。",vertices:"个顶点",undo_point:"撤销顶点",clear:"清空",delete_zone:"删除区域",cancel:"取消",save_zone:"保存区域",select_or_create_a_zone_then:"选择已有区域或新建区域，然后在户型图上依次点击顶点。"},fusion_reason:{insufficient_observations:"观测不足",too_short:"持续时间不足",too_few_observations:"有效点不足",insufficient_displacement:"位移不足",discontinuous_observations:"轨迹不连续",mostly_outside_room:"大部分在房间外",observation_gap:"观测中断",trajectory_jump:"轨迹跳变",incomplete_crossing:"未完整穿越",unstable_boundary_crossing:"边界反复跳变",below_score_threshold:"质量分不足"},install3d:{yaw:"偏航",pitch:"俯仰",roll:"横滚",vertical_fov_is_not_specified_showing:"说明书未标注垂直视场角，当前为保守示意值",nominal_scan_volume_from_the_model:"型号说明书标称扫描范围",scan_volume:"扫描空间",drag_the_colored_handles_to_position:"拖拽彩色控制柄直接调整安装位置与姿态",model_scan_range:"型号扫描范围",position_x_y:"位置 X/Y",height:"高度",yaw_2:"偏航",pitch_2:"俯仰",roll_2:"横滚"},range:{title:"距离区间过滤",explanation:"此雷达仅测距离。法线上的位置仅作示意，不支持二维多边形过滤。",min:"最小距离",max:"最大距离",zero:"0 表示不设该软件限制；点击同步到设备后下发。",software:"软件距离区间",unlimited:"不设上限",native_max:"原生最远范围（回读）",unknown:"未知或未提供",native_min_unknown:"原生最近范围及各距离门屏蔽状态未在此回读，不能据此确认全区间有效。",limited:"原生最远范围小于软件区间，超出的目标无法由软件恢复。",noise_preserved:"保留原生检测阈值；修改此区间不会重置阈值。",noise_unknown:"此型号的可调原生噪声抑制能力未确认，不覆盖噪声参数。",invalid:"最大距离必须为 0 或不小于最小距离。"},floorplan:{title:"户型背景",url:"图片地址",source_hint:"支持 PNG、JPG、WebP。可填写 HA 本地图片地址，例如 /local/floorplans/room.png。",visible:"显示背景",locked:"锁定位置",loading:"图片加载中…",error:"图片无法加载，请检查地址。",preview:"户型背景定位预览",unlock_hint:"取消锁定后可调整图片位置和比例。",drag_hint:"拖动图片对齐房间；绿色边框代表房间范围。",scale_hint:"在图片上依次点选已知墙段的两端，输入实际长度。",origin_hint:"点击图片中对应房间原点的位置。",scale:"标定比例",origin:"设置原点",move:"拖动定位",length:"实际长度（cm）",apply_scale:"应用比例",width:"图片宽度（cm）",x:"水平偏移（cm）",y:"垂直偏移（cm）",rotation:"顺时针旋转（°）",opacity:"不透明度",upload:"上传户型图",uploading:"正在上传…",upload_error:"上传失败，请选择小于 9 MB 的 PNG、JPEG 或 GIF 图片，并检查 HA 连接。",trace:"沿墙吸附",trace_hint:"依次点击墙角附近描边，可撤销重选。",trace_snapped:"已吸附到图中轮廓",trace_unavailable:"请上传图片以使用吸附；仍可手动描边。"},metrics:{heart:"心率",breath:"呼吸",gesture:"手势",per_minute:"次/分",none:"无手势",right:"向右挥手",left:"向左挥手"}}};function Ue(t,e,i){const a=e??navigator.language?.split("-")[0]??"en",r=Oe[e??""]??Object.entries(Oe).find(([t])=>t.startsWith(a))?.[1]??Oe.en;let o=r;for(const e of t.split("."))if(o=o?.[e],void 0===o)break;if("string"!=typeof o){let e=Oe.en;for(const i of t.split("."))if(e=e?.[i],void 0===e)break;o=e}return"string"!=typeof o?t:i?o.replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):t):o}const Be=U`
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
`,Ke="mmwave-card",Ye="mmwave-card-editor",Xe=15e3,Ze=new WeakMap;function Ge(t,e,i,a){if(!e||!1===e.visible)return{point:t};const r=ve(e.url);if("ready"!==r?.status)return{point:t};const o=r.image;if(!Ze.has(o))try{const t=Math.min(1,1024/Math.max(o.naturalWidth,o.naturalHeight)),e=document.createElement("canvas");e.width=Math.max(1,Math.round(o.naturalWidth*t)),e.height=Math.max(1,Math.round(o.naturalHeight*t));const i=e.getContext("2d",{willReadFrequently:!0});i.drawImage(o,0,0,e.width,e.height),Ze.set(o,function(t,e,i){const a=new Float32Array(e*i),r=new Uint8Array(e*i);for(let e=0;e<a.length;e++){const i=t[4*e+3]/255;a[e]=(.299*t[4*e]+.587*t[4*e+1]+.114*t[4*e+2])*i+255*(1-i)}for(let t=1;t<i-1;t++)for(let i=1;i<e-1;i++){const o=t*e+i;r[o]=Math.max(Math.abs(a[o+1]-a[o-1]),Math.abs(a[o+e]-a[o-e]))>=60?1:0}return{width:e,height:i,edges:r}}(i.getImageData(0,0,e.width,e.height).data,e.width,e.height))}catch{Ze.set(o,null)}const s=Ze.get(o);if(!s)return{point:t,unavailable:!0};const n=we(t,e,i),l=function(t,e,i){let a,r=i*i;for(let o=Math.max(0,Math.floor(e.y-i));o<=Math.min(t.height-1,e.y+i);o++)for(let s=Math.max(0,Math.floor(e.x-i));s<=Math.min(t.width-1,e.x+i);s++){const i=(s-e.x)**2+(o-e.y)**2;t.edges[o*t.width+s]&&i<r&&(r=i,a={x:s,y:o})}return a}(s,{x:n.x*s.width,y:n.y*s.width},Math.min(40,a/be(e,i).width*s.width));return l?{point:xe({x:l.x/s.width,y:l.y/s.width},e,i),snapped:!0}:{point:t}}const Ve={position:"#03a9f4",height:"#00a878",yaw:"#ff9800",pitch:"#7e57c2",roll:"#ec407a"},Je=(t,e,i)=>Math.min(i,Math.max(e,t)),Qe=t=>t*Math.PI/180,ti=(t,e)=>Math.round(t/e)*e;let ei=class extends dt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.peerCalibrations=[],this._handles=new Map,this._drawRaf=0,this.floorplanLoaded=()=>{this.isConnected&&this._scheduleDraw()}}_t(t,e){return Ue(t,this.lang,e)}get _verticalFovDegrees(){return this.adapter?.info.verticalFovDegrees??Math.min(this.adapter?.info.fovDegrees??60,60)}get _isVerticalFovEstimated(){return null==this.adapter?.info.verticalFovDegrees}firstUpdated(){this._cv&&(this._resizeObserver=new ResizeObserver(()=>this._scheduleDraw()),this._resizeObserver.observe(this._cv)),this._scheduleDraw()}updated(){this._scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver?.disconnect(),cancelAnimationFrame(this._drawRaf)}_scheduleDraw(){cancelAnimationFrame(this._drawRaf),this._drawRaf=requestAnimationFrame(()=>this._draw())}_scene(){const t=this._cv?.offsetWidth||420,e=Je(Math.round(.7*t),260,330);return{W:t,H:e,floorW:Math.max(180,t-72),floorH:Math.min(104,.32*e),floorTop:.48*e,verticalH:.36*e,roomW:this.calibration?.room_w??this.roomW,roomD:this.calibration?.room_d??this.roomD,zMax:400}}_project(t,e){const i=t.x/e.roomW,a=t.y/e.roomD,r=t.z/e.zMax;return{x:e.W/2+(i-a)*(e.floorW/2),y:e.floorTop+(i+a)*(e.floorH/2)-r*e.verticalH}}_unproject(t,e,i){const a=(t.x-i.W/2)/(i.floorW/2),r=(t.y+e/i.zMax*i.verticalH-i.floorTop)/(i.floorH/2);return{x:(a+r)/2*i.roomW,y:(r-a)/2*i.roomD}}_polygon(t,e){t.beginPath(),e.forEach((e,i)=>0===i?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)),t.closePath()}_line(t,e,i){t.beginPath(),t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.stroke()}_drawHandle(t,e,i,a){this._handles.set(e,i),t.save(),t.shadowColor=Ve[e],t.shadowBlur=this._drag?.mode===e?14:7,t.beginPath(),t.arc(i.x,i.y,this._drag?.mode===e?9:7,0,2*Math.PI),t.fillStyle=Ve[e],t.fill(),t.shadowBlur=0,t.strokeStyle="#fff",t.lineWidth=1.5,t.stroke(),t.font="bold 9px system-ui",t.textAlign="center",t.textBaseline="bottom",t.fillStyle=Ve[e],t.fillText(a,i.x,i.y-11),t.restore()}_draw(){const t=this._cv;if(!t||!this.calibration||0===t.offsetWidth)return;const e=this._scene(),i=Pe(t,e.H),a=getComputedStyle(this),r=a.getPropertyValue("--primary-text-color").trim()||"#374151",o=a.getPropertyValue("--secondary-text-color").trim()||"#6b7280",s=this.calibration,n=[this._project({x:0,y:0,z:0},e),this._project({x:e.roomW,y:0,z:0},e),this._project({x:e.roomW,y:e.roomD,z:0},e),this._project({x:0,y:e.roomD,z:0},e)],l=[this._project({x:0,y:0,z:e.zMax},e),this._project({x:e.roomW,y:0,z:e.zMax},e)];i.clearRect(0,0,e.W,e.H),this._handles.clear(),i.save(),this._polygon(i,[n[0],n[1],l[1],l[0]]),i.fillStyle="rgba(3,169,244,.035)",i.fill(),this._polygon(i,[n[0],n[3],this._project({x:0,y:e.roomD,z:e.zMax},e),l[0]]),i.fillStyle="rgba(11,130,92,.035)",i.fill(),i.restore(),this._polygon(i,n),i.fillStyle="rgba(11,130,92,.09)",i.fill(),i.save(),this._polygon(i,n),i.clip(),i.transform(e.floorW/(2*e.roomW),e.floorH/(2*e.roomW),-e.floorW/(2*e.roomD),e.floorH/(2*e.roomD),e.W/2,e.floorTop),ke(i,{W:e.roomW,H:e.roomD,roomW:e.roomW,roomD:e.roomD},this.floorplan,this.floorplanLoaded),i.restore(),this._polygon(i,n),i.strokeStyle="rgba(11,130,92,.55)",i.lineWidth=1.4,i.stroke(),i.save(),i.strokeStyle=o,i.globalAlpha=.14,i.lineWidth=.8;for(let t=.25;t<1;t+=.25)this._line(i,this._project({x:e.roomW*t,y:0,z:0},e),this._project({x:e.roomW*t,y:e.roomD,z:0},e)),this._line(i,this._project({x:0,y:e.roomD*t,z:0},e),this._project({x:e.roomW,y:e.roomD*t,z:0},e));i.restore(),i.save(),i.strokeStyle=o,i.globalAlpha=.25,i.setLineDash([3,4]);for(const t of[{x:0,y:0},{x:e.roomW,y:0},{x:0,y:e.roomD}])this._line(i,this._project({...t,z:0},e),this._project({...t,z:e.zMax},e));i.restore(),i.font="bold 10px system-ui",i.fillStyle=o,i.fillText("X",n[1].x+8,n[1].y+2),i.fillText("Y",n[3].x-14,n[3].y+2),i.fillText("Z",l[0].x-13,l[0].y-2);for(const t of this.peerCalibrations){const a=this._project({x:t.calibration.radar_x,y:t.calibration.radar_y,z:t.calibration.radar_z},e),r=Qe(t.calibration.yaw),s=this._project({x:t.calibration.radar_x+45*Math.sin(r),y:t.calibration.radar_y+45*Math.cos(r),z:t.calibration.radar_z},e);i.save(),i.globalAlpha=.48,i.strokeStyle=o,i.fillStyle=o,i.lineWidth=1.2,this._line(i,a,s),i.beginPath(),i.arc(a.x,a.y,4,0,2*Math.PI),i.fill(),i.font="bold 9px system-ui",i.textAlign="center",i.fillText(t.id,a.x,a.y-9),i.restore()}const d=this._project({x:s.radar_x,y:s.radar_y,z:0},e),c=this._project({x:s.radar_x,y:s.radar_y,z:s.radar_z},e),h=Qe(s.yaw),p=Qe(s.pitch),_=Qe(s.roll),u=Math.sin(h)*Math.cos(p),g=Math.cos(h)*Math.cos(p),m=-Math.sin(p),f=Math.cos(h),y=-Math.sin(h),b=0,v=-Math.sin(h)*Math.sin(p),x=-Math.cos(h)*Math.sin(p),w=-Math.cos(p),$=f*Math.cos(_)+v*Math.sin(_),k=y*Math.cos(_)+x*Math.sin(_),M=b*Math.cos(_)+w*Math.sin(_),S=v*Math.cos(_)-f*Math.sin(_),R=x*Math.cos(_)-y*Math.sin(_),z=w*Math.cos(_)-b*Math.sin(_);i.save(),i.strokeStyle=Ve.height,i.globalAlpha=.55,i.setLineDash([4,4]),i.lineWidth=1.5,this._line(i,d,c),i.restore(),i.save(),i.translate(d.x,d.y),i.scale(1,.42),i.beginPath(),i.arc(0,0,12,0,2*Math.PI),i.fillStyle="rgba(3,169,244,.14)",i.fill(),i.restore();const C=this.maxRangeM??this.adapter?.info.maxRangeM??3,D=Math.min(100*C,.58*Math.max(e.roomW,e.roomD)),A=Qe((this.adapter?.info.fovDegrees??60)/2),E=Qe(this._verticalFovDegrees/2),T=(t,i,a=D)=>{const r=Math.cos(i),o=u*Math.cos(t)*r+$*Math.sin(t)*r+S*Math.sin(i),n=g*Math.cos(t)*r+k*Math.sin(t)*r+R*Math.sin(i),l=m*Math.cos(t)*r+M*Math.sin(t)*r+z*Math.sin(i);return this._project({x:s.radar_x+o*a,y:s.radar_y+n*a,z:Je(s.radar_z+l*a,0,e.zMax)},e)},W=t=>Array.from({length:19},(e,i)=>T(i/18*A*2-A,t)),P=t=>Array.from({length:9},(e,i)=>T(t,i/8*E*2-E)),F=W(-E),H=W(0),q=W(E),N=P(-A),L=P(A);i.save(),this._polygon(i,[c,...F]),i.fillStyle="rgba(3,169,244,.055)",i.fill(),this._polygon(i,[c,...q]),i.fillStyle="rgba(11,130,92,.055)",i.fill(),this._polygon(i,[c,...N]),i.fillStyle="rgba(3,169,244,.04)",i.fill(),this._polygon(i,[c,...L]),i.fill(),i.strokeStyle="rgba(3,169,244,.25)",i.lineWidth=.8;for(let t=0;t<=18;t+=3)this._line(i,F[t],q[t]);for(const t of[F,q,N,L])i.beginPath(),t.forEach((t,e)=>0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)),i.stroke();this._polygon(i,[c,...H]),i.fillStyle="rgba(11,130,92,.16)",i.fill(),i.strokeStyle="rgba(11,130,92,.72)",i.lineWidth=1.25,i.stroke();const I=this.adapter?.info.minRangeM??0;if(I>0&&C>0){const t=D*Math.min(I/C,.8),e=Array.from({length:19},(e,i)=>T(i/18*A*2-A,0,t));i.beginPath(),e.forEach((t,e)=>0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)),i.setLineDash([3,3]),i.strokeStyle="rgba(11,130,92,.48)",i.stroke(),i.setLineDash([])}i.restore();const j=(t,i)=>this._project({x:s.radar_x+$*t+S*i,y:s.radar_y+k*t+R*i,z:s.radar_z+M*t+z*i},e),O=[j(-22,-10),j(22,-10),j(22,10),j(-22,10)];this._polygon(i,O),i.fillStyle="#13212b",i.fill(),i.strokeStyle="#6ee7c1",i.lineWidth=1.5,i.stroke(),i.beginPath(),i.arc(c.x,c.y,4,0,2*Math.PI),i.fillStyle="#0b825c",i.fill();const U=.18*Math.min(e.roomW,e.roomD),B=t=>({x:Je(t.x,18,e.W-18),y:Je(t.y,52,e.H-18)}),K=B(this._project({x:s.radar_x+Math.sin(h)*U,y:s.radar_y+Math.cos(h)*U,z:s.radar_z},e));i.strokeStyle=Ve.yaw,i.lineWidth=2,this._line(i,c,K);const Y=B({x:c.x-28,y:c.y});i.strokeStyle=Ve.height,i.lineWidth=1,this._line(i,{x:Y.x+8,y:Y.y},c);const X=B({x:K.x,y:K.y-30-s.pitch/90*20});i.strokeStyle=Ve.pitch,i.setLineDash([2,3]),this._line(i,K,X),i.setLineDash([]);const Z=j(38,0),G=B({x:Z.x+s.roll/90*10,y:Z.y});this._drawHandle(i,"position",d,"XY"),this._drawHandle(i,"height",Y,"Z"),this._drawHandle(i,"yaw",K,this._t("install3d.yaw")),this._drawHandle(i,"pitch",X,this._t("install3d.pitch")),this._drawHandle(i,"roll",G,this._t("install3d.roll")),i.save(),i.fillStyle=r,i.globalAlpha=.72,i.font="10px system-ui",i.textAlign="right",i.fillText(`${Math.round(e.roomW)} × ${Math.round(e.roomD)} cm`,e.W-10,e.H-10),i.restore()}_hitTest(t){let e;for(const[i,a]of this._handles){const r=Math.hypot(t.x-a.x,t.y-a.y);r<=18&&(!e||r<e.distance)&&(e={mode:i,distance:r})}return e?.mode}_onPointerDown(t){const e=this._cv;if(!e)return;const i=We(t,e),a=this._hitTest(i);if(!a)return;t.preventDefault(),e.setPointerCapture(t.pointerId);const r="height"===a?this.calibration.radar_z:"yaw"===a?this.calibration.yaw:"pitch"===a?this.calibration.pitch:"roll"===a?this.calibration.roll:0;this._drag={mode:a,startX:i.x,startY:i.y,startValue:r},this._scheduleDraw()}_onPointerMove(t){const e=this._cv;if(!e)return;const i=We(t,e);if(!this._drag)return void(e.style.cursor=this._hitTest(i)?"grab":"default");t.preventDefault();const a=this._scene(),r=this._drag;if("position"===r.mode){const t=this._unproject(i,0,a);this._emit({radar_x:ti(Je(t.x,0,a.roomW),1),radar_y:ti(Je(t.y,0,a.roomD),1)})}else if("height"===r.mode){const t=r.startValue-(i.y-r.startY)/a.verticalH*a.zMax;this._emit({radar_z:ti(Je(t,0,a.zMax),1)})}else if("yaw"===r.mode){const t=this._unproject(i,this.calibration.radar_z,a),e=180*Math.atan2(t.x-this.calibration.radar_x,t.y-this.calibration.radar_y)/Math.PI;this._emit({yaw:ti(e,.5)})}else if("pitch"===r.mode){const t=r.startValue-.6*(i.y-r.startY);this._emit({pitch:ti(Je(t,-90,90),.5)})}else{const t=r.startValue+.6*(i.x-r.startX);this._emit({roll:ti(Je(t,-90,90),.5)})}}_onPointerUp(t){const e=this._cv;e?.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId),this._drag=void 0,this._scheduleDraw()}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}render(){if(!this.calibration)return U``;const t=this.calibration;return U`
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
    `}_legend(t,e){return U`<span><i style="background:${Ve[t]}"></i>${e}</span>`}static{this.styles=s`
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
  `}};t([ut({attribute:!1})],ei.prototype,"floorplan",void 0),t([ut({attribute:!1})],ei.prototype,"adapter",void 0),t([ut({attribute:!1})],ei.prototype,"calibration",void 0),t([ut({attribute:!1})],ei.prototype,"lang",void 0),t([ut({type:Number})],ei.prototype,"roomW",void 0),t([ut({type:Number})],ei.prototype,"roomD",void 0),t([ut({type:Number})],ei.prototype,"maxRangeM",void 0),t([ut({attribute:!1})],ei.prototype,"peerCalibrations",void 0),t([mt("#installation-cv")],ei.prototype,"_cv",void 0),ei=t([ht("mmwave-installation-3d")],ei);let ii=class extends dt{constructor(){super(...arguments),this.lang="en",this.model=""}render(){const t=t=>Ue(`range.${t}`,this.lang),e=this.calibration.distance_max??0,i=["ld2410","ld2410b","ld2410c","ld2412","ld2420","rd03e"].includes(this.model);return U`<div>
      <p>
        ${t("software")}: ${(this.calibration.distance_min??0)/100}–${e>0?e/100+" m":t("unlimited")}
      </p>
      <p>${t("native_max")}: ${void 0!==this.maxRangeM?`${this.maxRangeM} m`:t("unknown")}</p>
      <p>${t("native_min_unknown")}</p>
      ${a=this.maxRangeM,r=this.calibration,void 0!==a&&a>0&&(r.distance_max??0)>100*a?U`<p class="warning" role="status">${t("limited")}</p>`:""}
      <p>${t(i?"noise_preserved":"noise_unknown")}</p>
    </div>`;var a,r}static{this.styles=s`
    :host {
      display: block;
      color: var(--secondary-text-color);
      font-size: 11px;
    }
    p {
      margin: 5px 0;
    }
    .warning {
      color: var(--warning-color, #b26a00);
    }
  `}};t([ut({attribute:!1})],ii.prototype,"calibration",void 0),t([ut({type:Number})],ii.prototype,"maxRangeM",void 0),t([ut()],ii.prototype,"lang",void 0),t([ut()],ii.prototype,"model",void 0),ii=t([ht("mmwave-range-status")],ii);let ai=class extends dt{constructor(){super(...arguments),this.trace=!0,this.traceStatus="",this.lang="en",this.roomW=400,this.roomD=350,this.peerCalibrations=[],this.showBoundary=!0,this._rafId=0}_L(t){return Ue(t,this.lang)}_t(t,e){return Ue(t,this.lang,e)}connectedCallback(){super.connectedCallback(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 280;const e=this.roomD/this.roomW;return Math.max(140,Math.min(280,Math.round(t*e)))}_m(){return Ae({W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD})}_onCanvasClick(t){const e=this._cv;if(!e)return;const i=We(t,e);let a=Te(i.x,i.y,this._m());if(this.trace){const t=Ge(a,this.floorplan,this.roomW,12*this._m().roomW/this._m().W);a=t.point,this.traceStatus=t.unavailable?"trace_unavailable":t.snapped?"trace_snapped":"trace_hint"}this._emit({polygon:[...this.calibration.polygon,a]})}_undo(){const t=[...this.calibration.polygon];t.pop(),this._emit({polygon:t})}_clear(){this._emit({polygon:[]})}_emit(t){this.dispatchEvent(new CustomEvent("calibration-changed",{detail:{...this.calibration,...t},bubbles:!0,composed:!0}))}_loop(){const t=this._cv;if(t&&t.offsetWidth>0){const e=Pe(t,this._cssH()),i=this._m();if(Fe(e,i,this.floorplan?{...this.floorplan,width_cm:this.floorplan.width_cm??this.roomW}:void 0),this.adapter){const t=Ee(this.calibration.radar_x,this.calibration.radar_y,i);Le(e,t.cx,t.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM)}!function(t,e,i,a=!1){if(e.length<2)return;const r=e.map(t=>Ee(t.x,t.y,i));t.beginPath(),r.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.fillStyle=a?"rgba(11,130,92,.04)":"rgba(11,130,92,.07)",t.fill()),t.strokeStyle=a?"rgba(11,130,92,.22)":"rgba(11,130,92,.55)",t.lineWidth=1.5,t.stroke(),a||r.forEach(e=>{t.beginPath(),t.arc(e.cx,e.cy,3,0,2*Math.PI),t.fillStyle="rgba(11,130,92,.8)",t.fill()})}(e,this.calibration.polygon,i)}this._rafId=requestAnimationFrame(()=>this._loop())}_numField(t,e,i,a=5,r=-9999,o=9999){const s=t=>{let i=parseFloat(t.target.value)||0;i>o&&(i=o),i<r&&(i=r),this._emit({[e]:i})};return U` <div class="field">
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
    </div>`}_degField(t,e,i,a=-180,r=180){const o=t=>{const i=parseFloat(t.target.value)||0;this._emit({[e]:i})};return U` <div class="field">
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
    </div>`}render(){const t=this.calibration,e=t.polygon.length,i=e>=3?this._L("geo.poly_hint_ok").replace("{n}",String(e)):this._L("geo.poly_hint_none"),a=t.room_w??this.roomW,r=t.room_d??this.roomD;return U`
      <div class="panel-heading">
        <span class="eyebrow">${this._t("geo.step_1_installation")}</span>
        <h2>${this._t("geo.place_the_radar_in_the_room")}</h2>
        <p>${this._t("geo.drag_the_colored_handles_to_set")}</p>
      </div>

      <mmwave-installation-3d
        .floorplan=${this.floorplan}
        .adapter=${this.adapter}
        .calibration=${t}
        .peerCalibrations=${this.peerCalibrations}
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

      ${this.adapter.info.is1DRanging?U`<section class="boundary-card">
              <h3>${this._L("range.title")}</h3>
              <p class="note">${this._L("range.explanation")}</p>
              ${this._numField(this._L("range.min"),"distance_min",t.distance_min??0,10,0,1e3)}
              ${this._numField(this._L("range.max"),"distance_max",t.distance_max??0,10,0,1e3)}
              <p class="note">${this._L("range.zero")}</p>
              <mmwave-range-status
                .calibration=${t}
                .maxRangeM=${this.maxRangeM}
                .lang=${this.lang}
                .model=${this.adapter.info.id}
              ></mmwave-range-status>
            </section>`:""}
      <section class="boundary-card" ?hidden=${!this.showBoundary||this.adapter.info.is1DRanging}>
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
        ${this.floorplan?.url&&!1!==this.floorplan.visible?U`<div class="trace-controls">
                <label
                  ><input
                    type="checkbox"
                    .checked=${this.trace}
                    @change=${t=>{this.trace=t.target.checked,this.traceStatus=""}}
                  />${this._t("floorplan.trace")}</label
                >
                <small role="status">${this._t("floorplan."+(this.traceStatus||"trace_hint"))}</small>
              </div>`:""}
        <div class="map-shell">
          <canvas id="poly-cv" @click=${this._onCanvasClick}></canvas>
          ${0===e?U`<span class="map-empty">${this._t("geo.click_the_map_to_add_the")}</span>`:""}
        </div>
        <p class="note">${this._L("geo.boundary_note")}</p>
      </section>
    `}static{this.styles=s`
    .trace-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      font-size: 12px;
    }
    .trace-controls label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .trace-controls input {
      width: auto;
      accent-color: var(--mmwave-primary, #408564);
    }
    .trace-controls small {
      color: var(--secondary-text-color);
    }

    :host {
      container-type: inline-size;
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
      display: grid;
      grid-template-columns: minmax(0, 90px) minmax(0, 1fr) 8ch 2.5ch;
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
      min-width: 0;
      overflow-wrap: anywhere;
    }
    .field input {
      box-sizing: border-box;
      min-width: 0;
      width: 100%;
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
      margin: 0;
    }
    .field input.num-input {
      font-size: 16px;
      padding: 2px 0;
    }
    .unit {
      font-size: 11px;
      color: var(--secondary-text-color);
      min-width: 18px;
      text-align: right;
    }
    @container (max-width: 400px) {
      .field {
        grid-template-columns: minmax(0, 1fr) 8ch 2.5ch;
        grid-template-areas: 'label value unit' 'slider slider slider';
        row-gap: 6px;
      }
      .field label {
        grid-area: label;
      }
      .field input.num-input {
        grid-area: value;
      }
      .field .unit {
        grid-area: unit;
      }
      .field input.slider {
        grid-area: slider;
        min-height: 28px;
      }
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
  `}};t([gt()],ai.prototype,"trace",void 0),t([gt()],ai.prototype,"traceStatus",void 0),t([ut({attribute:!1})],ai.prototype,"floorplan",void 0),t([ut({attribute:!1})],ai.prototype,"adapter",void 0),t([ut({attribute:!1})],ai.prototype,"calibration",void 0),t([ut({attribute:!1})],ai.prototype,"lang",void 0),t([ut({type:Number})],ai.prototype,"roomW",void 0),t([ut({type:Number})],ai.prototype,"roomD",void 0),t([ut({type:Number})],ai.prototype,"maxRangeM",void 0),t([ut({attribute:!1})],ai.prototype,"peerCalibrations",void 0),t([ut({type:Boolean})],ai.prototype,"showBoundary",void 0),t([mt("#poly-cv")],ai.prototype,"_cv",void 0),ai=t([ht("mmwave-geo-panel")],ai);const ri=t=>{let e=t;for(;e>180;)e-=360;for(;e<-180;)e+=360;return e},oi=t=>Math.round(10*t)/10;const si=t=>t.length?Math.sqrt(t.reduce((t,e)=>t+e*e,0)/t.length):1/0;const ni=["#408564","#9c27b0","#ff9800","#e91e63","#4caf50","#795548"],li=t=>{const e=[...t].sort((t,e)=>t-e),i=Math.floor(e.length/2);return e.length%2?e[i]:(e[i-1]+e[i])/2},di=t=>({...ft,...t.calibration??{},polygon:t.calibration?.polygon??[]});let ci=class extends dt{constructor(){super(...arguments),this.radars=[],this.roomW=400,this.roomD=600,this.lang="en",this.applyLabel="",this.references=[],this.selectedRegionId="region_a",this.regionOverrides={},this.capturing=!1,this.captureProgress=0,this.captureMessage="",this.captureCounts={},this.mobileFocus=!1,this.detailsExpanded=!1,this.sampleBuffers=new Map,this.signatures=new Map,this.drawFrame=0,this.regionCacheKey="",this.regionCache=[],this.floorplanLoaded=()=>{this.isConnected&&this.scheduleDraw()}}_t(t,e){return Ue(t,this.lang,e)}firstUpdated(){this.resizeObserver=new ResizeObserver(()=>this.scheduleDraw()),this.canvas&&this.resizeObserver.observe(this.canvas),this.scheduleDraw()}updated(t){(t.has("floorplan")||t.has("radars")||t.has("roomW")||t.has("roomD")||t.has("references")||t.has("selectedRegionId")||t.has("captureCounts")||t.has("mobileFocus")||t.has("regionOverrides"))&&this.scheduleDraw()}disconnectedCallback(){super.disconnectedCallback(),this.clearCaptureTimers(),this.resizeObserver?.disconnect(),cancelAnimationFrame(this.drawFrame)}async toggleMobileFocus(){this.mobileFocus=!this.mobileFocus,this.mobileFocus&&(this.detailsExpanded=!1),await this.updateComplete,this.mobileFocus&&this.renderRoot.querySelector(".calibration-shell")?.scrollTo({top:0}),this.scheduleDraw()}toggleDetails(){this.detailsExpanded=!this.detailsExpanded}metrics(){const t=this.canvas?.offsetWidth||520;return Ae({W:t,H:Math.max(240,Math.min(420,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD})}scheduleDraw(){cancelAnimationFrame(this.drawFrame),this.drawFrame=requestAnimationFrame(()=>this.draw())}validStandingArea(t){return function(t,e,i,a,r){if(![t.x,t.y,e,i,a].every(Number.isFinite)||e<=0||t.x<e||t.y<e||t.x>i-e||t.y>a-e)return!1;const o=r.filter(t=>t.length>=3);return 0===o.length||o.some(i=>!(!i.every(t=>Number.isFinite(t.x)&&Number.isFinite(t.y))||!he(t.x,t.y,i))&&i.every((a,r)=>{const o=i[(r+1)%i.length],s=o.x-a.x,n=o.y-a.y,l=Math.max(0,Math.min(1,((t.x-a.x)*s+(t.y-a.y)*n)/(s*s+n*n||1)));return Math.hypot(t.x-a.x-l*s,t.y-a.y-l*n)>=e}))}(t,this.regionRadiusCm,this.roomW,this.roomD,this.radars.map(t=>t.calibration?.polygon??[]))}get guidedRegions(){const t=JSON.stringify([this.roomW,this.roomD,this.radars.map(t=>[t.radar_model,t.calibration]),this.regionOverrides]);return t!==this.regionCacheKey&&(this.regionCacheKey=t,this.regionCache=this.buildGuidedRegions()),this.regionCache}buildGuidedRegions(){const t=[];for(let e=1;e<40;e++)for(let i=1;i<40;i++){const a={x:this.roomW*e/40,y:this.roomD*i/40};if(this.validStandingArea(a)){if(1===this.radars.length){const t=this.radars[0],e=di(t),i=de(t.radar_model)?.info,r=e.yaw*Math.PI/180,o=a.x-e.radar_x,s=a.y-e.radar_y,n=o*Math.cos(r)-s*Math.sin(r),l=o*Math.sin(r)+s*Math.cos(r),d=Math.hypot(o,s);if(!i||l<=0||d<Math.max(60,100*i.minRangeM)||d>=100*i.maxRangeM||Math.abs(Math.atan2(n,l))>=i.fovDegrees*Math.PI/360*.85)continue}t.push(a)}}if(!t.length)return[];const e=e=>t.reduce((t,i)=>Math.hypot(i.x-e.x,i.y-e.y)>Math.hypot(t.x-e.x,t.y-e.y)?i:t),i=[e(e(t[0]))];for(;i.length<7;){const e=t=>Math.min(...i.map(e=>Math.hypot(t.x-e.x,t.y-e.y))),a=t.reduce((t,i)=>e(i)>e(t)?i:t);if(e(a)<2*this.regionRadiusCm)break;i.push(a)}return i.map((t,e)=>{const i=String.fromCharCode(65+e),a="region_"+i.toLowerCase(),r=this.regionOverrides[a];return{id:a,label:i,room:r&&this.validStandingArea(r)?r:t}})}get selectedRegion(){return this.guidedRegions.find(t=>t.id===this.selectedRegionId)??this.guidedRegions[0]}get regionRadiusCm(){return Math.max(32,Math.min(60,.09*Math.min(this.roomW,this.roomD)))}drawGuidedRegion(t,e,i){const a=Ee(i.room.x,i.room.y,e),r=Ee(i.room.x+this.regionRadiusCm,i.room.y,e),o=Math.abs(r.cx-a.cx),s=this.references.find(t=>t.id===i.id),n=new Set(Object.keys(s?.readings??{}));this.capturing&&i.id===this.selectedRegionId&&this.radars.forEach(t=>{(this.captureCounts[t.id]??0)>=3&&n.add(t.id)});const l=this.radars.length>0&&n.size===this.radars.length;t.save(),t.fillStyle="rgba(100, 116, 139, 0.18)",t.beginPath(),t.arc(a.cx,a.cy,o,0,2*Math.PI),t.fill();const d=2*Math.PI/Math.max(1,this.radars.length);this.radars.forEach((e,i)=>{if(!n.has(e.id))return;const r=-Math.PI/2+i*d;t.fillStyle=ni[i%ni.length],t.globalAlpha=.82,t.beginPath(),t.moveTo(a.cx,a.cy),t.arc(a.cx,a.cy,o,r,r+d),t.closePath(),t.fill()}),t.globalAlpha=1,t.strokeStyle=l?"#0b825c":i.id===this.selectedRegionId?"#408564":"rgba(100, 116, 139, 0.45)",t.lineWidth=i.id===this.selectedRegionId?3:1.5,t.setLineDash(i.id!==this.selectedRegionId||l?[]:[5,4]),t.beginPath(),t.arc(a.cx,a.cy,o+2,0,2*Math.PI),t.stroke(),t.setLineDash([]),t.fillStyle="rgba(255, 255, 255, 0.92)",t.beginPath(),t.arc(a.cx,a.cy,9,0,2*Math.PI),t.fill(),t.fillStyle=l?"#0b825c":i.id===this.selectedRegionId?"#408564":"#64748b",t.font="bold 10px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(i.label,a.cx,a.cy+.5),t.restore()}draw(){const t=this.canvas;if(!t||!t.offsetWidth)return;const e=this.metrics(),i=Pe(t,e.H);Fe(i,e,this.floorplan?{...this.floorplan,width_cm:this.floorplan.width_cm??this.roomW}:void 0,this.floorplanLoaded);const a=new Map(this.solutions.map(t=>[t.radarId,t]));this.radars.forEach(t=>{const a=de(t.radar_model);if(!a)return;const r=di(t),o=Ee(r.radar_x,r.radar_y,e);i.save(),i.globalAlpha=1===this.radars.length?1:.35,Le(i,o.cx,o.cy,r.yaw,r.pitch,a.info.fovDegrees,a.info.minRangeM,a.info.maxRangeM,e,a.info.vitalRangeM),i.restore()}),this.guidedRegions.forEach(t=>this.drawGuidedRegion(i,e,t)),this.radars.forEach((t,r)=>{const o=di(t),s=Ee(o.radar_x,o.radar_y,e);i.fillStyle=ni[r%ni.length],i.beginPath(),i.arc(s.cx,s.cy,4,0,2*Math.PI),i.fill(),i.font="bold 9px system-ui",i.textAlign="center",i.fillText(t.id,s.cx,s.cy-10);const n=a.get(t.id);if(n)for(const a of this.references){const o=a.readings[t.id];if(!o)continue;const s=pe(o.rawX,o.rawY,o.rawZ,n.calibration),l=Ee(s.roomX,s.roomY,e);i.save(),i.globalAlpha=.75,i.fillStyle=ni[r%ni.length],i.beginPath(),i.arc(l.cx,l.cy,3,0,2*Math.PI),i.fill(),i.restore()}})}onCanvasClick(t){if(this.capturing||!this.canvas)return;const e=We(t,this.canvas),i=Te(e.x,e.y,this.metrics()),a=this.guidedRegions.map(t=>({region:t,distance:Math.hypot(t.room.x-i.x,t.room.y-i.y)})).sort((t,e)=>t.distance-e.distance)[0];if(!a||a.distance>1.55*this.regionRadiusCm)return this.validStandingArea(i)?this.references.some(t=>t.id===this.selectedRegionId)?void(this.captureMessage=this._t("fusioncal.remove_before_moving")):(this.regionOverrides={...this.regionOverrides,[this.selectedRegionId]:i},void(this.captureMessage=this._t("fusioncal.move_to_region_p0",{p0:this.selectedRegion.label}))):void(this.captureMessage=this._t("fusioncal.standing_area_outside"));this.selectedRegionId=a.region.id,this.captureMessage=this._t("fusioncal.move_to_region_p0",{p0:a.region.label})}beginCapture(){if(this.capturing||!this.selectedRegion)return;this.selectedRegionId=this.selectedRegion.id,this.dispatchEvent(new CustomEvent("calibration-capture-started",{bubbles:!0,composed:!0})),this.capturing=!0,this.captureProgress=0,this.captureMessage=this._t("fusioncal.capturing_region_p0",{p0:this.selectedRegion.label}),this.sampleBuffers=new Map(this.radars.map(t=>[t.id,[]])),this.captureCounts=Object.fromEntries(this.radars.map(t=>[t.id,0])),this.signatures.clear();const t=Date.now();this.collectSamples(),this.captureInterval=window.setInterval(()=>{this.collectSamples(),this.captureProgress=Math.min(1,(Date.now()-t)/3e3)},100),this.captureTimer=window.setTimeout(()=>this.finishCapture(),3e3)}collectSamples(){if(!this.hass)return;const t=this.selectedRegion.room;let e=!1;for(const i of this.radars){const a=this.readRadarTargets(i);if(!a||a.signature===this.signatures.get(i.id)||1!==a.targets.length)continue;this.signatures.set(i.id,a.signature);const r=di(i),o=a.targets.map(e=>{const i=pe(e.rawX,e.rawY,e.rawZ,r);return{target:e,distance:Math.hypot(i.roomX-t.x,i.roomY-t.y)}}).sort((t,e)=>t.distance-e.distance)[0];o&&(this.sampleBuffers.get(i.id)?.push({x:o.target.rawX,y:o.target.rawY,z:o.target.rawZ}),e=!0)}e&&(this.captureCounts=Object.fromEntries(this.radars.map(t=>[t.id,this.sampleBuffers.get(t.id)?.length??0])))}readRadarTargets(t){const e=t.frame_entity?this.hass.states[t.frame_entity]:void 0,i=e?wt(e.state):void 0;if(t.frame_entity&&(!i||!e||Date.now()-Date.parse(e.last_updated)>5e3))return;if(i){const e=Number(t.frame_coordinate_scale??1);return{signature:`${i.frameId}:${i.sourceTimestamp}`,targets:i.targets.map((t,i)=>({index:i,rawX:t.x*e,rawY:t.y*e,rawZ:t.z*e,speed:null==t.speed?void 0:t.speed*e}))}}const a=de(t.radar_model);if(!a)return;const r={...t,type:"custom:mmwave-card",room_w:this.roomW,room_d:this.roomD};return{signature:Object.entries(t).filter(([t,e])=>t.endsWith("_entity")&&"string"==typeof e).map(([,t])=>this.hass.states[String(t)]?.last_updated??"missing").join("|"),targets:a.readFromHass(this.hass,r).targets}}finishCapture(){const t=this.selectedRegion;this.clearCaptureTimers(),this.capturing=!1,this.captureProgress=1;const e=this.references.find(e=>e.id===t.id),i={...e?.readings??{}};let a=0;for(const t of this.radars){const e=this.sampleBuffers.get(t.id)??[];if(e.length<3)continue;const r=li(e.map(t=>t.x)),o=li(e.map(t=>t.y)),s=li(e.map(t=>t.z)),n=li(e.map(t=>Math.hypot(t.x-r,t.y-o))),l=e.filter(t=>Math.hypot(t.x-r,t.y-o)<=60);n>30||l.length<3||l.length<.8*e.length||(i[t.id]||(i[t.id]={rawX:Math.round(10*r)/10,rawY:Math.round(10*o)/10,rawZ:Math.round(10*s)/10,samples:e.length,spreadCm:Math.round(10*n)/10},a+=1))}if(!a)return this.captureMessage=this._t("fusioncal.no_radar_produced_enough_stable_samples"),void(this.captureCounts={});const r={id:t.id,room:t.room,readings:i},o=new Map(this.guidedRegions.map((t,e)=>[t.id,e])),s=[...this.references.filter(e=>e.id!==t.id),r].sort((t,e)=>(o.get(t.id)??99)-(o.get(e.id)??99));this.references=s,this.captureCounts={},s.length===this.guidedRegions.length&&(this.detailsExpanded=!0),this.captureMessage=this._t("fusioncal.region_p0_captured_p1_p2_radars",{p0:t.label,p1:Object.keys(i).length,p2:this.radars.length}),this.selectedRegionId=this.recommendNextRegion(s,t.id)}recommendNextRegion(t,e){const i=e=>Object.keys(t.find(t=>t.id===e.id)?.readings??{}).length,a=this.guidedRegions.find(t=>t.id!==e&&0===i(t));if(a)return a.id;const r=this.guidedRegions.filter(t=>t.id!==e&&i(t)<this.radars.length).sort((t,e)=>i(t)-i(e))[0];return r?.id??e}clearCaptureTimers(){null!=this.captureInterval&&window.clearInterval(this.captureInterval),null!=this.captureTimer&&window.clearTimeout(this.captureTimer),this.captureInterval=void 0,this.captureTimer=void 0}get solutions(){return this.radars.map(t=>function(t,e,i){const a=i.flatMap(i=>{const a=i.readings[t];if(!a||a.samples<3||a.spreadCm>30||![a.rawX,a.rawY,a.rawZ,a.spreadCm,i.room.x,i.room.y].every(Number.isFinite))return[];const r=pe(a.rawX,a.rawY,a.rawZ,{...e,yaw:0,radar_x:0,radar_y:0});return[{room:i.room,reading:a,x:r.roomX,y:r.roomY,weight:1/(900+a.spreadCm**2)}]});if(a.length<2)return;const r=t=>{const i=t.reduce((t,e)=>t+e.weight,0),a=e=>t.reduce((t,i)=>t+e(i)*i.weight,0)/i,r=a(t=>t.x),o=a(t=>t.y),s=a(t=>t.room.x),n=a(t=>t.room.y);let l=0,d=0;for(const e of t)l+=e.weight*((e.x-r)*(e.room.x-s)+(e.y-o)*(e.room.y-n)),d+=e.weight*((e.x-r)*(e.room.y-n)-(e.y-o)*(e.room.x-s));if(Math.hypot(l,d)<.001)return;const c=Math.atan2(d,l),h=Math.cos(c),p=Math.sin(c);return{...e,yaw:oi(ri(180*-c/Math.PI)),radar_x:oi(s-h*r+p*o),radar_y:oi(n-p*r-h*o)}},o=(t,e)=>{const i=pe(t.reading.rawX,t.reading.rawY,t.reading.rawZ,e);return Math.hypot(i.roomX-t.room.x,i.roomY-t.room.y)};let s=a,n=r(a);if(!n)return;if(a.length>=4){let t=1/0;for(let e=0;e<a.length;e++)for(let i=e+1;i<a.length;i++){const l=r([a[e],a[i]]);if(!l)continue;const d=a.filter(t=>o(t,l)<=60);if(d.length<Math.max(3,Math.ceil(.75*a.length)))continue;const c=r(d);if(!c)continue;const h=3600*(a.length-d.length)+d.reduce((t,e)=>t+o(e,c)**2,0);h<t&&(t=h,s=d,n=c)}}const l=s.map(t=>o(t,e)),d=s.map(t=>o(t,n)),c=si(l)<=40&&si(l)-si(d)<15&&Math.max(...l)<=60,h=c?{...e}:n,p=s.map(t=>o(t,h));let _=0;for(const t of s)for(const e of s)_=Math.max(_,Math.hypot(t.room.x-e.room.x,t.room.y-e.room.y));return{radarId:t,calibration:h,retainedCurrent:c,excludedPointCount:a.length-s.length,pointCount:s.length,sampleCount:s.reduce((t,e)=>t+e.reading.samples,0),referenceSpanCm:oi(_),residualBeforeCm:oi(si(l)),residualAfterCm:oi(si(p)),maxResidualCm:oi(Math.max(...p))}}(t.id,di(t),this.references)).filter(t=>Boolean(t))}removeReference(t){this.references=this.references.filter(e=>e.id!==t),this.selectedRegionId=t,this.captureMessage=""}reset(){this.capturing||(this.references=[],this.regionOverrides={},this.selectedRegionId=this.guidedRegions[0]?.id??"region_a",this.captureCounts={},this.captureMessage="",this.detailsExpanded=!1)}applySolutions(){const t=this.solutions.filter(t=>this.solutionMeetsQuality(t));!this.capturing&&this.solutionsReady(t)&&this.dispatchEvent(new CustomEvent("fusion-calibration-applied",{detail:{solutions:t},bubbles:!0,composed:!0}))}applySolutionsAndExitMobile(){this.applySolutions(),this.mobileFocus=!1}get referenceSpanCm(){let t=0;for(let e=0;e<this.references.length;e+=1)for(let i=e+1;i<this.references.length;i+=1)t=Math.max(t,Math.hypot(this.references[e].room.x-this.references[i].room.x,this.references[e].room.y-this.references[i].room.y));return t}solutionMeetsQuality(t){return t.pointCount>=3&&t.referenceSpanCm>=120&&t.residualAfterCm<=60&&t.maxResidualCm<=90&&t.calibration.radar_x>=-50&&t.calibration.radar_x<=this.roomW+50&&t.calibration.radar_y>=-50&&t.calibration.radar_y<=this.roomD+50}qualityMessage(t){return t.pointCount<3?this._t("fusioncal.quality_not_enough_points",{p0:t.pointCount}):t.referenceSpanCm<120?this._t("fusioncal.quality_span_too_small",{p0:t.referenceSpanCm}):t.maxResidualCm>90?this._t("fusioncal.outlier_remaining"):t.residualAfterCm>60?this._t("fusioncal.quality_residual_too_high",{p0:t.residualAfterCm,p1:60}):t.calibration.radar_x<-50||t.calibration.radar_x>this.roomW+50||t.calibration.radar_y<-50||t.calibration.radar_y>this.roomD+50?this._t("fusioncal.quality_reference_outside_room"):t.retainedCurrent?this._t("fusioncal.retained_current"):this._t("fusioncal.quality_reference_accepted",{p0:t.residualAfterCm})}formatParameter(t){return Number.isInteger(t)?String(t):t.toFixed(1)}formatAdjustment(t){const e=this.formatParameter(t);return t>0?`+${e}`:e}solutionsReady(t){return this.references.length>=3&&this.referenceSpanCm>=120&&!this.capturing&&t.some(t=>this.solutionMeetsQuality(t))}render(){const t=this.solutions,e=this.solutionsReady(t),i=this.selectedRegion;if(!i)return U`<p role="status">${this._t("fusioncal.no_standing_area")}</p>`;const a=this.references.find(t=>t.id===i.id),r=Object.keys(a?.readings??{}).length,o=t.filter(t=>this.solutionMeetsQuality(t)).length,s=this.radars.filter(t=>(this.captureCounts[t.id]??0)>=3).length,n=this.references.length>=3?this.radars.filter(e=>{const i=t.find(t=>t.radarId===e.id);return!i||!this.solutionMeetsQuality(i)}):[];return U`
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
        ${this.guidedRegions.length<3?U`<p role="status">${this._t("fusioncal.few_standing_areas")}</p>`:Y}
        <div class="guide-card" role="status" aria-live="polite">
          <b>${i.label}</b>
          <span>
            <strong>${this._t("fusioncal.move_to_region_p0",{p0:i.label})}</strong>
            <small>
              ${this.capturing?this._t("fusioncal.capturing_p0_percent_p1_p2_radars_ready",{p0:Math.round(100*this.captureProgress),p1:s,p2:this.radars.length}):this._t("fusioncal.stand_near_center_then_hold_still",{p0:i.room.x,p1:i.room.y,p2:r,p3:this.radars.length})}
            </small>
          </span>
        </div>
        <canvas
          id="fusion-calibration-canvas"
          aria-label=${this._t("fusioncal.guided_capture_floor_plan")}
          @click=${this.onCanvasClick}
        ></canvas>
        ${e?U`<div class="message" role="status">
                ${this._t("fusioncal.ready_summary",{p0:o,p1:this.radars.length-o})}
              </div>`:Y}
        ${e&&t.some(t=>this.solutionMeetsQuality(t)&&t.retainedCurrent)?U`<div class="message">
                ${this._t("fusioncal.retained_names",{p0:t.filter(t=>this.solutionMeetsQuality(t)&&t.retainedCurrent).map(t=>t.radarId).join(", ")})}
              </div>`:Y}
        <div class=${`capture-dock ${e?"ready":""} ${this.capturing?"capturing":""}`}>
          <div class="capture-bar">
            <span>${this._t("fusioncal.tap_another_region_or_follow_recommendation")}</span>
            <button class="capture-action" type="button" ?disabled=${this.capturing} @click=${this.beginCapture}>
              ${this.capturing?this._t("fusioncal.capturing_p0_percent",{p0:Math.round(100*this.captureProgress)}):this._t("fusioncal.i_am_ready_capture_all")}
            </button>
            <button class="mobile-apply" type="button" ?disabled=${!e} @click=${this.applySolutionsAndExitMobile}>
              ${this.applyLabel||this._t("fusioncal.apply_all_calibrations")}
            </button>
          </div>
          ${this.capturing?U`<div class="progress"><i style=${`width:${Math.round(100*this.captureProgress)}%`}></i></div>`:Y}
        </div>
        <div class=${"radar-sample-status "+(this.capturing?"capturing":"")}>
          ${this.radars.map(t=>{const e=this.captureCounts[t.id]??0,i=this.references.filter(e=>e.readings[t.id]).length;return U`
              <span class=${this.capturing&&e>=3?"live-ready":""}>
                <i style=${`background:${ni[this.radars.indexOf(t)%ni.length]}`}></i>
                ${t.id} ·
                ${this.capturing?this._t("fusioncal.p0_p1_samples",{p0:Math.min(e,3),p1:3}):this._t("fusioncal.p0_reference_points",{p0:i})}
              </span>
            `})}
        </div>
        ${this.captureMessage?U`<div class="message" role="status" aria-live="polite">${this.captureMessage}</div>`:Y}
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
            ${this.references.map(t=>{const e=this.guidedRegions.find(e=>e.id===t.id),i=Object.keys(t.readings).length;return U`
                <div class="reference">
                  <b class=${i===this.radars.length?"complete":""}>${e?.label??"?"}</b>
                  <span>X ${t.room.x} · Y ${t.room.y} cm</span>
                  <small>${i}/${this.radars.length} ${this._t("fusioncal.radars")}</small>
                  <button type="button" @click=${()=>this.removeReference(t.id)}>×</button>
                </div>
              `})}
          </div>
          ${n.length?U`
                  <div class="installation-review">
                    <strong>${this._t("fusioncal.review_installation_parameters")}</strong>
                    <span>
                      ${this._t("fusioncal.review_p0_radars_before_retrying",{p0:n.map(t=>t.id).join(", ")})}
                    </span>
                    <small>${this._t("fusioncal.xy_yaw_only_manual_note")}</small>
                  </div>
                `:Y}
          ${t.length?U`
                  <div class="results">
                    ${this.radars.map(e=>{const i=t.find(t=>t.radarId===e.id),a=di(e),r=Boolean(i&&this.solutionMeetsQuality(i)),o=i?function(t,e){return{radarX:oi(e.radar_x-t.radar_x),radarY:oi(e.radar_y-t.radar_y),yaw:oi(ri(e.yaw-t.yaw))}}(a,i.calibration):void 0;return U`
                        <div class="result ${r?"":"bad"}">
                          <header>
                            <span><strong>${e.id}</strong><small>${e.radar_model}</small></span>
                            <b class="status ${r?"accepted":"review"}">
                              ${r?this._t("fusioncal.calibration_reference_accepted"):this._t("fusioncal.installation_needs_review")}
                            </b>
                          </header>
                          ${i?U`
                                  <div class="residual">
                                    <strong>${i.residualBeforeCm} → ${i.residualAfterCm} cm</strong>
                                    <small class=${r?"":"warning"}>${this.qualityMessage(i)}</small>
                                  </div>
                                  <div class="parameter-grid">
                                    <div>
                                      <small>${this._t("fusioncal.current_installation")}</small>
                                      <span>
                                        X ${this.formatParameter(a.radar_x)} · Y
                                        ${this.formatParameter(a.radar_y)} · yaw
                                        ${this.formatParameter(a.yaw)}°
                                      </span>
                                    </div>
                                    <div>
                                      <small>${this._t("fusioncal.fitted_reference")}</small>
                                      <span>
                                        X ${this.formatParameter(i.calibration.radar_x)} · Y
                                        ${this.formatParameter(i.calibration.radar_y)} · yaw
                                        ${this.formatParameter(i.calibration.yaw)}°
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
                                    ${i.pointCount} ${this._t("fusioncal.points")} · yaw
                                    ${i.calibration.yaw}° ·
                                    ${this._t("fusioncal.span_p0_cm",{p0:i.referenceSpanCm})} · max
                                    ${i.maxResidualCm} cm
                                  </small>
                                `:U`<span class="missing">${this._t("fusioncal.not_enough_references")}</span>`}
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
            ${e?this.applyLabel||this._t("fusioncal.apply_all_calibrations"):this._t("fusioncal.need_3_points_120_cm_span")}
          </button>
        </div>
      </section>
    `}static{this.styles=s`
    :host {
      --primary-color: var(--mmwave-primary, #0b825c);
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
      border: 1px solid color-mix(in srgb, #408564 38%, var(--divider-color, transparent));
      border-radius: 10px;
      color: var(--primary-text-color);
      background: color-mix(in srgb, #408564 8%, transparent);
    }
    .guide-card > b {
      width: 30px;
      height: 30px;
      display: grid;
      flex: 0 0 30px;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      background: #408564;
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
        background: color-mix(in srgb, #408564 11%, var(--card-background-color, #fff));
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
  `}};function hi(t,e,i){return!(i<0||i>1e3)&&Math.hypot(e.x-t.x,e.y-t.y)<=100+300*i/1e3}function pi(t,e){return t?0===e.length?"unlocated":e.some(t=>t.room?.inBoundary)?"present":"filtered":"none"}t([ut({attribute:!1})],ci.prototype,"floorplan",void 0),t([ut({attribute:!1})],ci.prototype,"hass",void 0),t([ut({attribute:!1})],ci.prototype,"radars",void 0),t([ut({type:Number})],ci.prototype,"roomW",void 0),t([ut({type:Number})],ci.prototype,"roomD",void 0),t([ut({attribute:!1})],ci.prototype,"lang",void 0),t([ut({attribute:!1})],ci.prototype,"applyLabel",void 0),t([gt()],ci.prototype,"references",void 0),t([gt()],ci.prototype,"selectedRegionId",void 0),t([gt()],ci.prototype,"regionOverrides",void 0),t([gt()],ci.prototype,"capturing",void 0),t([gt()],ci.prototype,"captureProgress",void 0),t([gt()],ci.prototype,"captureMessage",void 0),t([gt()],ci.prototype,"captureCounts",void 0),t([gt()],ci.prototype,"mobileFocus",void 0),t([gt()],ci.prototype,"detailsExpanded",void 0),t([mt("#fusion-calibration-canvas")],ci.prototype,"canvas",void 0),ci=t([ht("mmwave-fusion-calibration")],ci);const _i=["#ff9800","#03a9f4","#e91e63"];function ui(t){return _i[(t%_i.length+_i.length)%_i.length]}function gi(t,e,i,a,r){const o=2/Math.max(1e-4,a),s=o*r,n=1/(1+s+.48*s*s+.235*s*s*s),l=t-e,d=(i+o*l)*r;let c=(i-o*d)*n,h=e+(l+d)*n;return(Math.abs(e-t)<1e-6||(e-t)*(h-e)>0)&&(h=e,c=0),[h,c]}let mi=class extends dt{constructor(){super(...arguments),this.lang="en",this.roomW=400,this.roomD=350,this.targets=[],this.present=!1,this.showStatus=!1,this.areas=[[],[],[]],this.areaOccupied=[!1,!1,!1],this.privacy=!1,this._trails=new Map,this._animatedTargets=new Map,this._rafId=0,this._lastFrameAt=0,this._lastTrailPruneAt=0}connectedCallback(){super.connectedCallback(),this._lastFrameAt=Date.now(),this._loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this._rafId)}willUpdate(t){t.has("targets")&&this._setTargetGoals(this.targets)}_setTargetGoals(t){const e=Date.now(),i=new Set(t.filter(t=>t.room).map(t=>t.index));for(const t of this._animatedTargets.keys())i.has(t)||this._animatedTargets.delete(t);for(const i of t){if(!i.room)continue;const t=i.room.roomX,a=i.room.roomY,r=Math.hypot(i.rawX,i.rawY)/100,o=this._animatedTargets.get(i.index);o&&hi({x:o.goalX,y:o.goalY},{x:t,y:a},e-o.lastSeen)?(o.goalX=t,o.goalY=a,o.goalRangeM=r,o.lastSeen=e):(this._trails.delete(i.index),this._animatedTargets.set(i.index,{x:t,y:a,rangeM:r,goalX:t,goalY:a,goalRangeM:r,velocityX:0,velocityY:0,velocityRange:0,lastSeen:e,lastTrailAt:0}))}}_advanceTargets(t){const e=Math.min(Math.max((t-this._lastFrameAt)/1e3,0),.05);this._lastFrameAt=t;const i=Math.max(this.adapter.info.updateRateHz,1),a=Math.min(.22,Math.max(.12,1.25/i));for(const[i,r]of this._animatedTargets)t-r.lastSeen>1e3?this._animatedTargets.delete(i):([r.x,r.velocityX]=gi(r.x,r.goalX,r.velocityX,a,e),[r.y,r.velocityY]=gi(r.y,r.goalY,r.velocityY,a,e),[r.rangeM,r.velocityRange]=gi(r.rangeM,r.goalRangeM,r.velocityRange,a,e))}_sampleTrails(t,e){for(const i of t){const t=this._animatedTargets.get(i.index);if(!t||!i.room?.inBoundary||e-t.lastTrailAt<75)continue;t.lastTrailAt=e;const a=this._trails.get(i.index)??[],r=a.at(-1);(!r||Math.hypot(t.x-r.x,t.y-r.y)>=.5)&&(a.push({x:t.x,y:t.y,t:e}),this._trails.set(i.index,a))}if(e-this._lastTrailPruneAt>=1e3){this._lastTrailPruneAt=e;const t=e-9e4;for(const[e,i]of this._trails){const a=i.filter(e=>e.t>t);a.length>0?this._trails.set(e,a):this._trails.delete(e)}}}clearTrail(){this._trails.clear();for(const t of this._animatedTargets.values())t.lastTrailAt=0}_cssH(){const t=this._cv?.offsetWidth;if(!t||0===t)return 340;const e=this.roomD/this.roomW;return Math.max(140,Math.min(340,Math.round(t*e)))}_m(){return Ae({W:this._cv?.offsetWidth||400,H:this._cssH(),roomW:this.roomW,roomD:this.roomD})}_loop(){const t=this._cv;if(t&&t.offsetWidth>0&&this.adapter){const e=Pe(t,this._cssH()),i=this._m(),a=Date.now();this._advanceTargets(a),this.privacy||this._sampleTrails(this.targets,a),Fe(e,i,this.floorplan?{...this.floorplan,width_cm:this.floorplan.width_cm??this.roomW}:void 0);const r=Ee(this.calibration.radar_x,this.calibration.radar_y,i);Le(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,i,this.adapter.info.vitalRangeM),this.adapter.info.is1DRanging?function(t,e,i,a,r,o,s,n,l,d,c){const h=Ne(t,e,i,c),p=Math.PI/2-(a+o/2)*Math.PI/180,_=p+o*Math.PI/180,u=Math.max(0,Math.cos(r*Math.PI/180)),g=Math.max(100*s,l),m=Math.min(100*n,d>0?d:1/0),f=(e,i)=>{if(i<=e)return;const a=h.point(i*u,p);t.beginPath(),t.moveTo(a.x,a.y),h.arc(i*u,p,_),h.arc(e*u,_,p,!0),t.closePath(),t.fillStyle="rgba(180,185,190,.82)",t.fill("evenodd")};if(t.save(),g>=m)f(100*s,100*n);else{f(100*s,g),f(m,100*n),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=2;for(const e of[g,m])e<=100*s||e>=100*n||(t.beginPath(),h.arc(e*u,p,_),t.stroke())}t.restore()}(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,this.adapter.info.minRangeM,this.maxRangeM??this.adapter.info.maxRangeM,this.calibration.distance_min??0,this.calibration.distance_max??0,i):(function(t,e,i){if(e.length<3)return;const a=e.map(t=>Ee(t.x,t.y,i));t.save(),t.beginPath(),t.rect(0,0,i.W,i.H),t.moveTo(a[0].cx,a[0].cy),a.slice(1).forEach(e=>t.lineTo(e.cx,e.cy)),t.closePath(),t.fillStyle="rgba(100,116,139,.25)",t.fill("evenodd"),t.beginPath(),t.moveTo(a[0].cx,a[0].cy),a.slice(1).forEach(e=>t.lineTo(e.cx,e.cy)),t.closePath(),t.strokeStyle="rgba(11,130,92,.95)",t.lineWidth=2,t.setLineDash([6,4]),t.stroke(),t.restore()}(e,this.calibration.polygon,i),function(t,e,i,a){e.forEach((e,r)=>{if(e.length<2)return;const o=Me[r]??Me[0],s=e.map(t=>Ee(t.x,t.y,a));t.save(),t.beginPath(),s.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),e.length>=3&&(t.closePath(),t.globalAlpha=i[r]?.28:.1,t.fillStyle=o,t.fill()),t.globalAlpha=i[r]?.95:.5,t.strokeStyle=o,t.lineWidth=i[r]?2.4:1.5,t.stroke();const n=s.reduce((t,e)=>t+e.cx,0)/s.length,l=s.reduce((t,e)=>t+e.cy,0)/s.length;t.globalAlpha=.9,t.fillStyle=o,t.font="bold 11px system-ui",t.textAlign="center",t.textBaseline="middle",t.fillText(String(r+1),n,l),t.restore()})}(e,this.areas,this.areaOccupied,i)),this.privacy&&(this._trails.clear(),this._animatedTargets.clear());for(const[t,r]of this._trails)if(!(r.length<2)){e.save(),e.strokeStyle=ui(t),e.lineWidth=2,e.lineCap="round";for(let t=1;t<r.length;t++){const o=r[t-1],s=r[t],n=(a-s.t)/9e4;e.globalAlpha=Math.max(0,.5-.5*n);const l=Ee(o.x,o.y,i),d=Ee(s.x,s.y,i);e.beginPath(),e.moveTo(l.cx,l.cy),e.lineTo(d.cx,d.cy),e.stroke()}e.restore()}for(const t of this.privacy?[]:this.targets){if(!t.room)continue;const a=this._animatedTargets.get(t.index);if(this.adapter.info.is1DRanging)je(e,r.cx,r.cy,this.calibration.yaw,this.calibration.pitch,this.adapter.info.fovDegrees,a?.rangeM??Math.hypot(t.rawX,t.rawY)/100,i,t.room.inBoundary);else{const r=Ee(a?.x??t.room.roomX,a?.y??t.room.roomY,i),o=ui(t.index);Ie(e,r.cx,r.cy,t.room.inBoundary,o),this.adapter.info.maxTargets>1&&(e.fillStyle=o,e.font="bold 10px system-ui",e.textAlign="center",e.textBaseline="middle",e.fillText(String(t.index+1),r.cx,r.cy-14),e.textBaseline="alphabetic")}}}this._rafId=requestAnimationFrame(()=>this._loop())}_L(t){return Ue(t,this.lang)}_t(t,e){return Ue(t,this.lang,e)}_badgeText(){return this._L(`live.badge_${pi(this.present,this.targets)}`)}_badgeCls(){const t=pi(this.present,this.targets);return"none"===t?"":"filtered"===t?"filtered":"on"}render(){return U`
      ${this.showStatus?U`<div class="panel-heading">
              <span class="eyebrow">${this._t("live.step_3_live_test")}</span>
              <h2>${this._t("live.verify_coverage_and_target_trails")}</h2>
              <p>${this._t("live.walk_through_the_room_and_confirm")}</p>
            </div>`:""}
      <div class="scene-shell">
        <canvas id="live-cv"></canvas>
        <div class="scene-toolbar">
          <div class="badge ${this._badgeCls()}"><i></i>${this._badgeText()}</div>
          ${this.showStatus?U`<button type="button" @click=${this.clearTrail}>${this._t("live.clear_trails")}</button>`:""}
        </div>
        <div class="scene-metrics">
          ${function(t,e,i,a){const r=t=>Ue("metrics."+t,a),o=i=>{const a=e?.[i];return"string"==typeof a?t?.states[a]:void 0},s=[];for(const[t,e,a,n]of[[i.info.hasHeartRate,"heart_entity","heart","mdi:heart-pulse"],[i.info.hasBreathing,"breath_entity","breath","mdi:lungs"]]){if(!t)continue;const i=o(e),l=i?.state?.trim(),d=l?Number(l):NaN;s.push({key:e,label:r(a),value:Number.isFinite(d)&&d>0?String(Math.round(10*d)/10):"—",unit:r("per_minute"),icon:n})}if(i.getEntitySchema().some(t=>"gesture_entity"===t.key)){const t=o("gesture_entity")?.state,e={None:"none","Wave Right":"right","Wave Left":"left"},i=!t||["unknown","unavailable"].includes(t)?"—":e[t]?r(e[t]):t;s.push({key:"gesture_entity",label:r("gesture"),value:i,unit:"",icon:"mdi:hand-wave"})}return s}(this.hass,this.config,this.adapter,this.lang).map(t=>U` <div class="scene-metric" data-metric=${t.key}>
                <ha-icon .icon=${t.icon}></ha-icon>
                <span class="metric-label">${t.label}</span>
                <strong>${t.value}</strong><small>${t.unit}</small>
              </div>`)}
        </div>
        ${this.present?"":U`<div class="idle-hint"><span>◎</span>${this._t("live.waiting_for_a_radar_target")}</div>`}
      </div>
      ${!this.adapter.info.is1DRanging&&(this.calibration.polygon.length>=3||this.areas.some(t=>t.length>=3))?U`<div class="boundary-legend">
              ${this.calibration.polygon.length>=3?U`<span><i class="boundary-line"></i>${this._t("live.polygon_boundary")}</span>
                      <span><i class="filtered-area"></i>${this._t("live.filtered_area")}</span>`:""}
              ${this.areas.map((t,e)=>t.length>=3?U`<span
                      ><i class="area-swatch" style=${`--c:${Me[e]}`}></i
                      >${this._t("live.area_n",{n:e+1})}${this.areaOccupied[e]?" ●":""}</span
                    >`:"")}
            </div>`:""}
      ${this.showStatus?U`
              <div class="target-summary">
                <div class="summary-head">
                  <strong>${this._t("live.detected_targets")}</strong>
                  <span
                    >${this.targets.filter(t=>t.room?.inBoundary).length} /
                    ${this.adapter.info.maxTargets}</span
                  >
                </div>
                <div class="target-list">
                  ${this.targets.length>0?this.targets.map(t=>U`
                            <div
                              class="target-row ${t.room?.inBoundary?"":"outside"}"
                              style="--target-color:${ui(t.index)}"
                            >
                              <span class="target-id"><i></i>${this._t("live.target")} ${t.index+1}</span>
                              <span class="target-coord">
                                ${t.room?`X ${Math.round(t.room.roomX)} · Y ${Math.round(t.room.roomY)}${this.adapter.info.hasZAxis?` · Z ${Math.round(t.room.roomZ)}`:""} cm`:"—"}
                              </span>
                              <span class="target-state"
                                >${t.room?.inBoundary?this._t("live.inside"):this._t("live.outside")}</span
                              >
                            </div>
                          `):U`<div class="target-empty">${this._t("live.no_target_data_yet")}</div>`}
                </div>
              </div>
            `:""}
    `}static{this.styles=s`
    .scene-metrics {
      position: absolute;
      right: 10px;
      bottom: 10px;
      max-width: calc(100% - 20px);
      display: grid;
      gap: 5px;
      pointer-events: none;
    }
    .scene-metric {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      padding: 6px 9px;
      border-radius: 10px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color, #ddd);
      box-shadow: 0 1px 5px #0001;
      font-size: 12px;
    }
    .scene-metric ha-icon {
      --mdc-icon-size: 17px;
      color: var(--mmwave-primary, #408564);
      flex-shrink: 0;
    }
    .metric-label {
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .scene-metric strong {
      font-size: 16px;
      overflow-wrap: anywhere;
      min-width: 0;
      margin-left: auto;
    }
    .scene-metric small {
      font-size: 10px;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }

    :host {
      display: block;
      position: relative;
    }
    .boundary-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      padding: 6px 2px 0;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .boundary-legend span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .boundary-line {
      width: 18px;
      border-top: 2px dashed var(--mmwave-primary, #0b825c);
    }
    .filtered-area {
      width: 12px;
      height: 10px;
      background: rgba(100, 116, 139, 0.25);
    }
    .area-swatch {
      width: 12px;
      height: 10px;
      background: var(--c);
      opacity: 0.7;
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
  `}};t([ut({attribute:!1})],mi.prototype,"hass",void 0),t([ut({attribute:!1})],mi.prototype,"config",void 0),t([ut({attribute:!1})],mi.prototype,"floorplan",void 0),t([ut({attribute:!1})],mi.prototype,"adapter",void 0),t([ut({attribute:!1})],mi.prototype,"calibration",void 0),t([ut({attribute:!1})],mi.prototype,"lang",void 0),t([ut({type:Number})],mi.prototype,"roomW",void 0),t([ut({type:Number})],mi.prototype,"roomD",void 0),t([ut({attribute:!1})],mi.prototype,"targets",void 0),t([ut({type:Boolean})],mi.prototype,"present",void 0),t([ut({type:Boolean})],mi.prototype,"showStatus",void 0),t([ut({type:Number})],mi.prototype,"maxRangeM",void 0),t([ut({attribute:!1})],mi.prototype,"areas",void 0),t([ut({attribute:!1})],mi.prototype,"areaOccupied",void 0),t([ut({type:Boolean})],mi.prototype,"privacy",void 0),t([mt("#live-cv")],mi.prototype,"_cv",void 0),mi=t([ht("mmwave-live-panel")],mi);let fi=class extends dt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.areas=[{polygon:[]},{polygon:[]},{polygon:[]}],this.lang="en",this.selected=0,this.floorplanLoaded=()=>{this.isConnected&&this.requestUpdate()}}t(t,e){return Ue(t,this.lang,e)}connectedCallback(){super.connectedCallback(),this.floorplan?.url&&ve(this.floorplan.url,this.floorplanLoaded)}emit(t){this.dispatchEvent(new CustomEvent("areas-changed",{detail:t,bubbles:!0,composed:!0}))}patchSelected(t){const e=this.areas.map((e,i)=>i===this.selected?{polygon:t}:e);this.emit(e)}addPoint(t){const e=t.currentTarget.getBoundingClientRect(),i={x:Math.round(Math.min(Math.max((t.clientX-e.left)/e.width*this.roomW,0),this.roomW)),y:Math.round(Math.min(Math.max((t.clientY-e.top)/e.height*this.roomD,0),this.roomD))};this.patchSelected([...this.areas[this.selected]?.polygon??[],i])}undo(){const t=this.areas[this.selected]?.polygon??[];t.length&&this.patchSelected(t.slice(0,-1))}clear(){this.patchSelected([])}standHere(){this.standPoint&&this.patchSelected(function(t,e,i,a=180){const r=a/2;let o=t.x-r,s=t.y-r,n=t.x+r,l=t.y+r;return o<0&&(n-=o,o=0),s<0&&(l-=s,s=0),n>e&&(o-=n-e,n=e),l>i&&(s-=l-i,l=i),o=Math.max(0,Math.round(o)),s=Math.max(0,Math.round(s)),n=Math.min(e,Math.round(n)),l=Math.min(i,Math.round(l)),[{x:o,y:s},{x:n,y:s},{x:n,y:l},{x:o,y:l}]}(this.standPoint,this.roomW,this.roomD))}pointString(t){return t.map(t=>`${t.x},${t.y}`).join(" ")}render(){const t=!1!==this.floorplan?.visible&&this.floorplan?ve(this.floorplan.url,this.floorplanLoaded):void 0,e=be(this.floorplan??{},this.roomW),i=function(t){const e=t.map((t,e)=>({polygon:t,index:e,center:Se(t)})).filter(t=>t.center&&t.polygon.length>=3),i=[];for(const t of e)Re(t.polygon)<150&&i.push(`small:${t.index}`);for(let t=0;t<e.length;t++)for(let a=t+1;a<e.length;a++){const r=e[t].center.x-e[a].center.x,o=e[t].center.y-e[a].center.y;Math.hypot(r,o)<200&&i.push(`close:${e[t].index}:${e[a].index}`),ze(e[t].polygon,e[a].polygon)&&i.push(`overlap:${e[t].index}:${e[a].index}`)}return i}(this.areas.map(t=>t.polygon));return U`
      <p class="hint">${this.t("area.hint")}</p>
      ${this.standPoint?Y:U`<p class="need">${this.t("area.stand_need_target")}</p>`}
      <div class="picks">
        ${[0,1,2].map(t=>U`<button
              type="button"
              class=${this.selected===t?"on":""}
              style=${`--c:${Me[t]}`}
              @click=${()=>this.selected=t}
            >
              ${this.t("area.area_n",{n:t+1})}
              <small>${this.areas[t]?.polygon.length??0}</small>
            </button>`)}
      </div>
      <svg
        class="floor"
        viewBox=${`0 0 ${this.roomW} ${this.roomD}`}
        style=${`aspect-ratio:${this.roomW}/${this.roomD}`}
        @click=${this.addPoint}
      >
        ${"ready"===t?.status?B`<image
              href=${t.image.src}
              width=${e.width}
              height=${e.width*t.image.naturalHeight/t.image.naturalWidth}
              opacity=${e.opacity}
              transform=${`translate(${e.x} ${e.y}) rotate(${180*e.angle/Math.PI})`}
              pointer-events="none"
            />`:Y}
        <rect width="100%" height="100%" fill="transparent" />
        ${this.areas.map((t,e)=>{const i=Me[e],a=this.selected===e;return t.polygon.length?B`
            ${t.polygon.length>=3?B`<polygon points=${this.pointString(t.polygon)} fill=${i} fill-opacity=${a?".22":".08"} stroke=${i} stroke-width=${a?3:2} vector-effect="non-scaling-stroke" />`:B`<polyline points=${this.pointString(t.polygon)} fill="none" stroke=${i} stroke-width="3" vector-effect="non-scaling-stroke" />`}
            ${t.polygon.map(t=>B`<circle cx=${t.x} cy=${t.y} r="7" fill=${i} stroke="white" stroke-width="2" vector-effect="non-scaling-stroke" />`)}
          `:Y})}
        ${this.standPoint?B`<circle cx=${this.standPoint.x} cy=${this.standPoint.y} r="14" fill="none" stroke="white" stroke-width="2" stroke-dasharray="4 3" vector-effect="non-scaling-stroke" />`:Y}
        ${this.radar?B`<g transform=${`translate(${this.radar.x} ${this.radar.y}) rotate(${-this.radar.yaw})`}><circle r="10" fill="#111" /><path d="M 0 0 L -10 22 M 0 0 L 10 22" stroke="#111" fill="none" /></g>`:Y}
      </svg>
      <div class="actions">
        <button type="button" ?disabled=${!this.standPoint} @click=${this.standHere}>
          ${this.t("area.stand_here")}
        </button>
        <button type="button" @click=${this.undo}>${this.t("geo.poly_undo")}</button>
        <button type="button" @click=${this.clear}>${this.t("geo.poly_clear")}</button>
      </div>
      ${i.length?U`<div class="warn">
              ${i.some(t=>t.startsWith("small"))?U`<p>${this.t("area.warn_small",{cm:150})}</p>`:Y}
              ${i.some(t=>t.startsWith("close"))?U`<p>${this.t("area.warn_close",{cm:200})}</p>`:Y}
              ${i.some(t=>t.startsWith("overlap"))?U`<p>${this.t("area.warn_overlap")}</p>`:Y}
            </div>`:U`<p class="ok">${this.t("area.ok")}</p>`}
    `}static{this.styles=s`
    :host {
      display: block;
    }
    .hint,
    .ok,
    .need {
      margin: 0 0 0.6rem;
      font-size: 0.85rem;
      opacity: 0.75;
    }
    .actions button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .picks {
      display: flex;
      gap: 0.4rem;
      margin-bottom: 0.6rem;
    }
    .picks button {
      flex: 1;
      border: 1px solid var(--c);
      background: transparent;
      color: inherit;
      border-radius: 8px;
      padding: 0.4rem;
      cursor: pointer;
    }
    .picks button.on {
      background: color-mix(in srgb, var(--c) 18%, transparent);
    }
    .picks small {
      display: block;
      opacity: 0.6;
    }
    .floor {
      width: 100%;
      background: var(--secondary-background-color, #111);
      border-radius: 12px;
      cursor: crosshair;
    }
    .actions {
      display: flex;
      gap: 0.4rem;
      margin: 0.5rem 0;
    }
    .warn {
      color: var(--warning-color, #f59e0b);
      font-size: 0.85rem;
    }
  `}};t([ut({attribute:!1})],fi.prototype,"floorplan",void 0),t([ut({type:Number})],fi.prototype,"roomW",void 0),t([ut({type:Number})],fi.prototype,"roomD",void 0),t([ut({attribute:!1})],fi.prototype,"areas",void 0),t([ut({attribute:!1})],fi.prototype,"radar",void 0),t([ut({attribute:!1})],fi.prototype,"standPoint",void 0),t([ut({attribute:!1})],fi.prototype,"lang",void 0),t([gt()],fi.prototype,"selected",void 0),fi=t([ht("mmwave-area-editor")],fi);const yi=["#ff9800","#03a9f4","#e91e63","#8bc34a","#9c27b0","#00bcd4"];function bi(t){let e=0;for(const i of t)e=31*e+i.charCodeAt(0)|0;return yi[Math.abs(e)%yi.length]}let vi=class extends dt{constructor(){super(...arguments),this.roomW=400,this.roomD=600,this.radars=[],this.targets=[],this.zones=[],this.events=[],this.thumbUrls={},this.historyTrack=[],this.selectedEventId="",this.lang="en",this.backendState="connecting",this.heatmapLoading=!1,this.heatmapError="",this.showCoverage=!1,this.showHeatmap=!1,this.heatmapHours=24,this.replayLoading=!1,this.replayError="",this.eventTypeFilter="",this.zoneFilter="",this.sinceHours=0,this.showReplay=!1,this.replayMinutes=5,this.playing=!1,this.speed=4,this.playhead=Number.NaN,this.lastAdvanceAt=0,this.trails=new Map,this.animationFrame=0}connectedCallback(){super.connectedCallback(),this.loop()}disconnectedCallback(){super.disconnectedCallback(),cancelAnimationFrame(this.animationFrame)}willUpdate(t){if(t.has("replay")&&this.clampPlayhead(),!t.has("targets"))return;const e=Date.now();for(const t of this.targets){const i=this.trails.get(t.track_id)??[],a=i.at(-1);(!a||Math.hypot(a.x-t.x,a.y-t.y)>=.5)&&i.push({x:t.x,y:t.y,timestamp:e}),this.trails.set(t.track_id,i.filter(t=>t.timestamp>=e-Xe))}const i=new Set(this.targets.map(t=>t.track_id));for(const t of this.trails.keys()){const a=this.trails.get(t)??[];!i.has(t)&&(a.at(-1)?.timestamp??0)<e-Xe&&this.trails.delete(t)}}metrics(){const t=this.canvas?.offsetWidth||500;return Ae({W:t,H:Math.max(220,Math.min(520,Math.round(t*this.roomD/this.roomW))),roomW:this.roomW,roomD:this.roomD})}loop(){const t=this.canvas;if(t&&t.offsetWidth>0){const e=this.metrics(),i=Pe(t,e.H),a=Date.now();Fe(i,e,this.floorplan?{...this.floorplan,width_cm:this.floorplan.width_cm??this.roomW}:void 0),this.showHeatmap&&this.heatmap&&function(t,e,i,a,r){if(!e.length||a<=0)return;const o=Math.log1p(a),s=i/r.roomW*r.W+.5,n=i/r.roomD*r.H+.5;t.save();for(const i of e){const e=0===o?1:Math.log1p(i.visits)/o,a=Ee(i.x,i.y,r);t.fillStyle=qe(e,.14+.58*e),t.fillRect(a.cx,a.cy,s,n)}t.restore()}(i,this.heatmap.cells,this.heatmap.bin_cm,this.heatmap.max_visits,e),this.drawZones(i,e),this.drawRadars(i,e),this.showReplay&&this.replay?(this.advancePlayhead(a),function(t,e,i,a,r,o){const s=a>0?1/a:.5,n=3*s,l=3*s;for(const a of e){const e=a.points.filter(t=>t.ts<=i&&t.ts>=i-8);if(!e.length)continue;const s=e[e.length-1];if(i-s.ts>n)continue;const d=o(a.track_id);t.save(),t.strokeStyle=d,t.lineWidth=2.2,t.lineCap="round";for(let a=1;a<e.length;a++){const o=e[a-1],s=e[a];if(s.ts-o.ts>l)continue;t.globalAlpha=Math.max(.08,.7-(i-s.ts)/8*.7);const n=Ee(o.x,o.y,r),d=Ee(s.x,s.y,r);t.beginPath(),t.moveTo(n.cx,n.cy),t.lineTo(d.cx,d.cy),t.stroke()}t.restore();const c=Ee(s.x,s.y,r);Ie(t,c.cx,c.cy,!0,d),t.fillStyle=d,t.font="bold 9px ui-monospace, monospace",t.textAlign="center",t.fillText(a.track_id.slice(0,6),c.cx,c.cy-14)}}(i,this.replay.tracks,this.playhead,this.replay.sample_hz,e,bi)):(this.drawTrails(i,e,a),this.drawHistory(i,e),this.drawTargets(i,e))}this.animationFrame=requestAnimationFrame(()=>this.loop())}drawZones(t,e){this.zones.forEach((i,a)=>{if(i.polygon.length<3)return;const r=yi[(a+3)%yi.length],o=i.polygon.map(t=>Ee(t.x,t.y,e));t.beginPath(),o.forEach((e,i)=>0===i?t.moveTo(e.cx,e.cy):t.lineTo(e.cx,e.cy)),t.closePath(),t.globalAlpha=.08,t.fillStyle=r,t.fill(),t.globalAlpha=.6,t.strokeStyle=r,t.lineWidth=1.5,t.setLineDash([5,4]),t.stroke(),t.setLineDash([]),t.globalAlpha=1,t.fillStyle=r,t.font="bold 10px system-ui",t.textAlign="left",t.fillText(i.name||i.id,o[0].cx+5,o[0].cy+13)})}drawRadars(t,e){for(const i of this.radars){const a=Ee(i.calibration.radar_x,i.calibration.radar_y,e),r=i.calibrationWarning?"#ff9800":i.available?"#0b825c":"#9ca3af";this.showCoverage&&(t.save(),t.globalAlpha=i.available?.14:.06,Le(t,a.cx,a.cy,i.calibration.yaw,i.calibration.pitch,i.adapter.info.fovDegrees,i.adapter.info.minRangeM,i.adapter.info.maxRangeM,e,i.adapter.info.vitalRangeM),t.restore());const o=Math.PI/2-i.calibration.yaw*(Math.PI/180);t.save(),t.strokeStyle=r,t.fillStyle=r,t.lineWidth=1.5,t.globalAlpha=i.available?.9:.4,t.beginPath(),t.arc(a.cx,a.cy,4,0,2*Math.PI),t.fill(),t.beginPath(),t.moveTo(a.cx,a.cy),t.lineTo(a.cx+18*Math.cos(o),a.cy+18*Math.sin(o)),t.stroke(),t.restore(),t.fillStyle=r,t.font="bold 9px system-ui",t.textAlign="center",t.fillText(i.config.id,a.cx,a.cy-14)}}drawTrails(t,e,i){for(const[a,r]of this.trails)if(!(r.length<2)){t.save(),t.strokeStyle=bi(a),t.lineWidth=2.2,t.lineCap="round";for(let a=1;a<r.length;a++){const o=Ee(r[a-1].x,r[a-1].y,e),s=Ee(r[a].x,r[a].y,e);t.globalAlpha=Math.max(.05,.65-(i-r[a].timestamp)/Xe*.65),t.beginPath(),t.moveTo(o.cx,o.cy),t.lineTo(s.cx,s.cy),t.stroke()}t.restore()}}drawTargets(t,e){for(const i of this.targets){const a=Ee(i.x,i.y,e),r=bi(i.track_id);Ie(t,a.cx,a.cy,!0,r),t.fillStyle=r,t.font="bold 9px ui-monospace, monospace",t.textAlign="center",t.fillText(i.track_id.slice(0,6),a.cx,a.cy-14)}}drawHistory(t,e){this.historyTrack.length<2||(t.save(),t.strokeStyle="#ffffff",t.lineWidth=2.5,t.globalAlpha=.75,t.setLineDash([6,4]),t.beginPath(),this.historyTrack.forEach((i,a)=>{const r=Ee(i.x,i.y,e);0===a?t.moveTo(r.cx,r.cy):t.lineTo(r.cx,r.cy)}),t.stroke(),t.restore())}selectEvent(t){this.dispatchEvent(new CustomEvent("fusion-event-selected",{detail:t,bubbles:!0,composed:!0}))}clampPlayhead(){const t=this.replay;t&&(Number.isNaN(this.playhead)||this.playhead<t.since||this.playhead>t.until)&&(this.playhead=t.since)}advancePlayhead(t){const e=this.replay;if(!e)return;Number.isNaN(this.playhead)&&(this.playhead=e.since);const i=this.lastAdvanceAt?(t-this.lastAdvanceAt)/1e3:0;if(this.lastAdvanceAt=t,!this.playing)return;const a=this.playhead+Math.min(i,.5)*this.speed;a>=e.until?(this.playhead=e.until,this.playing=!1):this.playhead=a,this.requestUpdate()}requestReplay(){const t=Date.now()/1e3;this.dispatchEvent(new CustomEvent("fusion-replay-requested",{detail:{since:t-60*this.replayMinutes,until:t},bubbles:!0,composed:!0}))}toggleReplay(){this.showReplay=!this.showReplay,this.playing=!1,this.showReplay&&!this.replay&&this.requestReplay()}setReplayMinutes(t){t!==this.replayMinutes&&(this.replayMinutes=t,this.playing=!1,this.requestReplay())}togglePlaying(){const t=this.replay;t&&(!this.playing&&this.playhead>=t.until&&(this.playhead=t.since),this.playing=!this.playing)}scrubTo(t){const e=this.replay;e&&(this.playhead=e.since+(e.until-e.since)*t)}clockAt(t){return Number.isNaN(t)?"--:--:--":new Date(1e3*t).toLocaleTimeString()}binCm(){const t=Math.max(this.roomW,this.roomD)/40;return Math.min(200,Math.max(5,5*Math.round(t/5)))}requestHeatmap(){this.dispatchEvent(new CustomEvent("fusion-heatmap-requested",{detail:{hours:this.heatmapHours,binCm:this.binCm()},bubbles:!0,composed:!0}))}toggleHeatmap(){this.showHeatmap=!this.showHeatmap,this.showHeatmap&&!this.heatmap&&this.requestHeatmap()}setHeatmapHours(t){t!==this.heatmapHours&&(this.heatmapHours=t,this.requestHeatmap())}_t(t,e){return Ue(t,this.lang,e)}qualityReason(t){return t?this._t(`fusion_reason.${t}`):this._t("fusion.filtered")}eventStatus(t){return t.review_verdict?this._t(`fusion.review_${t.review_verdict}`):t.clip_path?"▶":"failed"===t.clip_status?this._t("fusion.clip_failed"):"waiting"===t.clip_status||"extracting"===t.clip_status?this._t("fusion.recording"):"rejected_quality"===t.recording_decision||"trajectory"===t.event_type?this.qualityReason(t.quality_reason):"traverse"===t.event_type?this._t("fusion.key_track"):""}renderReplayBar(){const t=this.replay,e=[[5,this._t("fusion.window_5min")],[60,this._t("fusion.window_hour")],[360,this._t("fusion.window_6h")]],i=t?t.until-t.since:0,a=t&&i>0&&!Number.isNaN(this.playhead)?Math.min(1,Math.max(0,(this.playhead-t.since)/i)):0;return U`
      <!--
        data-span-s reports the window that is actually loaded, not the button
        that is selected. The two differ for as long as a query is in flight,
        and that gap is exactly where a test — or anything else watching — would
        otherwise read the previous window's numbers and believe them.
      -->
      <div class="replay-bar" data-span-s=${t?Math.round(i):0}>
        <span class="heatmap-note">${this._t("fusion.replay_hint")}</span>
        <div class="windows">
          ${e.map(([t,e])=>U`
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
        ${"unsupported"===this.replayError?U`<span class="heatmap-note">${this._t("fusion.replay_needs_newer_backend")}</span>`:"failed"===this.replayError?U`<span class="heatmap-note">${this._t("fusion.replay_failed")}</span>`:this.replayLoading?U`<span class="heatmap-note">${this._t("fusion.replay_loading")}</span>`:t?0===t.tracks.length?U`<span class="heatmap-note">${this._t("fusion.replay_empty")}</span>`:U`
                        <button type="button" class="play" @click=${this.togglePlaying}>
                          ${this.playing?"❙❙":"▶"}
                        </button>
                        <div class="windows">
                          ${[1,4,16].map(t=>U`
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
                          .value=${String(Math.round(1e3*a))}
                          @input=${t=>{this.playing=!1,this.scrubTo(Number(t.target.value)/1e3)}}
                        />
                        <span class="clock">${this.clockAt(this.playhead)}</span>
                        <span class="heatmap-note">
                          ${this._t("fusion.replay_summary",{tracks:t.tracks.length,points:t.total_points.toLocaleString()})}
                          ${t.thinned?` · ${this._t("fusion.replay_thinned",{hz:t.sample_hz.toFixed(1)})}`:""}
                        </span>
                      `:""}
      </div>
    `}renderHeatmapLegend(){const t=[[1,this._t("fusion.window_hour")],[24,this._t("fusion.window_day")],[168,this._t("fusion.window_week")]];return U`
      <div class="heatmap-bar">
        <span class="heatmap-note">${this._t("fusion.heatmap_hint")}</span>
        <div class="windows">
          ${t.map(([t,e])=>U`
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
        ${"unsupported"===this.heatmapError?U`<span class="heatmap-note">${this._t("fusion.heatmap_needs_newer_backend")}</span>`:"failed"===this.heatmapError?U`<span class="heatmap-note">${this._t("fusion.heatmap_failed")}</span>`:this.heatmapLoading?U`<span class="heatmap-note">${this._t("fusion.heatmap_loading")}</span>`:this.heatmap?U`
                      <span class="ramp">
                        <small>${this._t("fusion.heatmap_rare")}</small>
                        ${function(t=5){return Array.from({length:t},(e,i)=>qe(i/(t-1),.14+i/(t-1)*.58))}().map(t=>U`<i style="background:${t}"></i>`)}
                        <small>${this._t("fusion.heatmap_frequent")}</small>
                      </span>
                      <span class="heatmap-note">
                        ${this._t("fusion.heatmap_summary",{points:this.heatmap.total_points.toLocaleString(),bin:this.heatmap.bin_cm})}
                        ${this.heatmap.truncated?` · ${this._t("fusion.heatmap_truncated")}`:""}
                      </span>
                    `:""}
      </div>
    `}render(){const t=this.radars.filter(t=>t.available).length,e=this.radars.flatMap(t=>{const e=function(t){return t.available?t.stale?"stale_frames":t.calibrationWarning?"outside_room":null:"not_reporting"}(t);return e?[{radar:t,issue:e}]:[]}),i=(a=this.events,r={eventType:this.eventTypeFilter||void 0,zoneId:this.zoneFilter||void 0,since:this.sinceHours?Date.now()/1e3-3600*this.sinceHours:void 0},a.filter(t=>!(r.eventType&&t.event_type!==r.eventType||r.zoneId&&t.zone_id!==r.zoneId||null!=r.since&&t.timestamp<r.since)));var a,r;return U`
      <div class="scene-toolbar">
        <span class="status ${this.backendState}">
          <i></i>
          ${"preview"===this.backendState?this._t("workflow.preview_status"):"online"===this.backendState?this._t("fusion.backend_fusion"):"missing"===this.backendState?this._t("fusion.integration_missing"):"outdated"===this.backendState?this._t("fusion.integration_outdated"):"fallback"===this.backendState?this._t("fusion.local_fallback"):"error"===this.backendState?this._t("fusion.backend_error"):this._t("fusion.connecting")}
        </span>
        <span class="toolbar-actions">
          <button
            ?hidden=${"preview"===this.backendState}
            type="button"
            class="coverage-toggle ${this.showReplay?"active":""}"
            @click=${this.toggleReplay}
          >
            ${this.showReplay?this._t("fusion.hide_replay"):this._t("fusion.show_replay")}
          </button>
          <button
            type="button"
            class="coverage-toggle ${this.showHeatmap?"active":""}"
            @click=${this.toggleHeatmap}
            ?hidden=${"preview"===this.backendState}
          >
            ${this.showHeatmap?this._t("fusion.hide_heatmap"):this._t("fusion.show_heatmap")}
          </button>
          <button type="button" class="coverage-toggle" @click=${()=>this.showCoverage=!this.showCoverage}>
            ${this.showCoverage?this._t("fusion.hide_coverage"):this._t("fusion.show_coverage")}
          </button>
          <span class="radar-count">${t}/${this.radars.length} ${this._t("fusion.radars_online")}</span>
        </span>
      </div>
      ${"online"===this.backendState?U`<p class="assist-hint">${this._t("fusion.assist_hint")}</p>`:""}
      <div class="scene">
        <canvas id="fusion-cv"></canvas>
      </div>
      ${this.showReplay?this.renderReplayBar():""} ${this.showHeatmap?this.renderHeatmapLegend():""}
      ${e.length?U`<div class="calibration-warning">
              ${e.map(({radar:t,issue:e})=>U`
                  <div>
                    <strong>${t.config.id}</strong>
                    ${null==t.inRoomRatio?"":U` (${Math.round(100*t.inRoomRatio)}%)`} ·
                    ${this._t(`fusion.calibration_hint_${e}`)}
                  </div>
                `)}
            </div>`:""}
      <div class="summary">
        <div><strong>${this.targets.length}</strong><span>${this._t("fusion.fused_targets")}</span></div>
        ${this.targets.map(t=>U`
            <div class="track" style="--track-color:${bi(t.track_id)}">
              <i></i>
              <span>${t.track_id.slice(0,6)}</span>
              <small>X ${Math.round(t.x)} · Y ${Math.round(t.y)} cm</small>
              <em>${Math.round(100*t.confidence)}%</em>
            </div>
          `)}
      </div>
      <div class="events">
        <strong>${this._t("fusion.recent_events")}</strong>
        <p class="heatmap-note">${this._t("fusion.event_search_hint")}</p>
        <div class="event-filters">
          ${["","enter","dwell","traverse","trajectory"].map(t=>U`
              <button
                type="button"
                class=${this.eventTypeFilter===t?"selected":""}
                @click=${()=>this.eventTypeFilter=t}
              >
                ${t||this._t("fusion.filter_all")}
              </button>
            `)}
        </div>
        <div class="event-filters">
          <button
            type="button"
            class=${""===this.zoneFilter?"selected":""}
            @click=${()=>this.zoneFilter=""}
          >
            ${this._t("fusion.filter_all_zones")}
          </button>
          ${this.zones.map(t=>U`
              <button
                type="button"
                class=${this.zoneFilter===t.id?"selected":""}
                @click=${()=>this.zoneFilter=t.id}
              >
                ${t.name||t.id}
              </button>
            `)}
        </div>
        <div class="event-filters">
          ${[[0,"fusion.window_all"],[1,"fusion.window_hour"],[24,"fusion.window_day"]].map(([t,e])=>U`
              <button
                type="button"
                class=${this.sinceHours===t?"selected":""}
                @click=${()=>this.sinceHours=t}
              >
                ${this._t(e)}
              </button>
            `)}
        </div>
        ${i.length?i.slice(0,24).map(t=>U`
                  <button
                    type="button"
                    class=${t.event_id===this.selectedEventId?"selected":""}
                    @click=${()=>this.selectEvent(t)}
                  >
                    ${this.thumbUrls[t.event_id]?U`<img class="thumb" src=${this.thumbUrls[t.event_id]} alt="" />`:Y}
                    <span>
                      ${t.event_type.toUpperCase()} · ${t.zone_id}
                      ${null==t.quality_score?"":` · ${t.quality_score}/100`}
                    </span>
                    <small>${new Date(1e3*t.timestamp).toLocaleString()}</small>
                    <em class=${"failed"===t.clip_status?"failed":""}>${this.eventStatus(t)}</em>
                  </button>
                `):U`<span class="heatmap-note">${this._t("fusion.replay_empty")}</span>`}
      </div>
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
    .replay-bar > .heatmap-note:first-child,
    .heatmap-bar > .heatmap-note:first-child {
      flex: 1 1 100%;
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
    .assist-hint {
      margin: 8px 0 0;
      color: var(--secondary-text-color);
      font-size: 10px;
      line-height: 1.45;
    }
    .calibration-warning {
      display: grid;
      gap: 6px;
      margin-top: 8px;
      padding: 7px 9px;
      border: 1px solid color-mix(in srgb, var(--warning-color, #ff9800) 45%, transparent);
      border-radius: 8px;
      color: var(--warning-color, #ff9800);
      background: color-mix(in srgb, var(--warning-color, #ff9800) 8%, transparent);
      font-size: 9px;
      line-height: 1.45;
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
    .event-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .event-filters button {
      padding: 3px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--secondary-text-color);
      background: transparent;
      font: inherit;
      font-size: 9px;
      cursor: pointer;
    }
    .event-filters button.selected {
      color: #fff;
      background: #0b825c;
      border-color: #0b825c;
    }
    .events > button {
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
    .events > button:has(img) {
      grid-template-columns: auto 1fr auto auto;
    }
    .events > button.selected {
      border-color: #0b825c;
      background: rgba(11, 130, 92, 0.08);
    }
    .events .thumb {
      width: 36px;
      height: 36px;
      object-fit: cover;
      border-radius: 4px;
      background: rgba(128, 128, 128, 0.12);
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
  `}};t([ut({attribute:!1})],vi.prototype,"floorplan",void 0),t([ut({type:Number})],vi.prototype,"roomW",void 0),t([ut({type:Number})],vi.prototype,"roomD",void 0),t([ut({attribute:!1})],vi.prototype,"radars",void 0),t([ut({attribute:!1})],vi.prototype,"targets",void 0),t([ut({attribute:!1})],vi.prototype,"zones",void 0),t([ut({attribute:!1})],vi.prototype,"events",void 0),t([ut({attribute:!1})],vi.prototype,"thumbUrls",void 0),t([ut({attribute:!1})],vi.prototype,"historyTrack",void 0),t([ut({attribute:!1})],vi.prototype,"selectedEventId",void 0),t([ut({attribute:!1})],vi.prototype,"lang",void 0),t([ut({attribute:!1})],vi.prototype,"backendState",void 0),t([ut({attribute:!1})],vi.prototype,"heatmap",void 0),t([ut({type:Boolean})],vi.prototype,"heatmapLoading",void 0),t([ut({attribute:!1})],vi.prototype,"heatmapError",void 0),t([gt()],vi.prototype,"showCoverage",void 0),t([gt()],vi.prototype,"showHeatmap",void 0),t([gt()],vi.prototype,"heatmapHours",void 0),t([ut({attribute:!1})],vi.prototype,"replay",void 0),t([ut({type:Boolean})],vi.prototype,"replayLoading",void 0),t([ut({attribute:!1})],vi.prototype,"replayError",void 0),t([gt()],vi.prototype,"eventTypeFilter",void 0),t([gt()],vi.prototype,"zoneFilter",void 0),t([gt()],vi.prototype,"sinceHours",void 0),t([gt()],vi.prototype,"showReplay",void 0),t([gt()],vi.prototype,"replayMinutes",void 0),t([gt()],vi.prototype,"playing",void 0),t([gt()],vi.prototype,"speed",void 0),t([gt()],vi.prototype,"playhead",void 0),t([mt("#fusion-cv")],vi.prototype,"canvas",void 0),vi=t([ht("mmwave-fusion-panel")],vi);let xi=class extends dt{constructor(){super(...arguments),this.draft=[],this.step=0,this.selected=0,this.saving=!1,this.message="",this.failures=[],this.targets=[],this.hasCapture=!1,this.pendingRadars=[],this.saved=[],this.revision=0,this.tracker=new _e,this.observations=[],this.signatures=new Map}t(t,e){return Ue(t,this.hass?.language,e)}willUpdate(t){t.has("config")&&this.config&&(this.draft=structuredClone(this.config.radars??[]),this.saved=structuredClone(this.draft),this.revision=Number(this.config.calibration_revision??0),this.resetPreview()),(t.has("hass")||t.has("draft"))&&this.hass&&this.updatePreview()}calibration(t){return{...ft,...t.calibration}}get dirty(){return JSON.stringify(this.draft)!==JSON.stringify(this.saved)}close(){this.saving||(!this.dirty&&!this.hasCapture||confirm(this.t("workflow.discard_confirm")))&&this.dispatchEvent(new CustomEvent("calibration-closed",{bubbles:!0,composed:!0}))}changePose(t){t.stopPropagation(),this.draft=this.draft.map((e,i)=>i===this.selected?{...e,calibration:t.detail}:e),this.message="",this.resetPreview()}useSolutions(t){t.stopPropagation(),this.pendingRadars=this.draft.filter(e=>!t.detail.solutions.some(t=>t.radarId===e.id)).map(t=>t.id),this.draft=this.draft.map(e=>{const i=t.detail.solutions.find(t=>t.radarId===e.id);return i?{...e,calibration:i.calibration,residual_cm:i.residualAfterCm}:e}),this.resetPreview(),this.step=2}resetPreview(){this.tracker=new _e(this.config.fusion),this.observations=[],this.signatures.clear(),this.targets=[]}updatePreview(){const t=Date.now();for(const e of this.draft){const i=de(e.radar_model);if(!i)continue;const a=e.frame_entity?this.hass.states[e.frame_entity]:void 0,r=a?wt(a.state):void 0,o=r?`${r.frameId}:${r.sourceTimestamp}`:Object.entries(e).filter(([t])=>t.endsWith("_entity")).map(([,t])=>this.hass.states[String(t)]?.last_updated??"").join("|");if(o===this.signatures.get(e.id))continue;this.signatures.set(e.id,o);const s=Number(e.frame_coordinate_scale??1),n=r?r.targets.map((t,e)=>({index:e,rawX:t.x*s,rawY:t.y*s,rawZ:t.z*s})):i.readFromHass(this.hass,{...this.config,...e}).targets;for(const i of n){const a=pe(i.rawX,i.rawY,i.rawZ,this.calibration(e));!a.inBoundary||a.roomX<0||a.roomY<0||a.roomX>Number(this.config.room_w)||a.roomY>Number(this.config.room_d)||this.observations.push({radarId:e.id,slot:i.index,timestamp:t,x:a.roomX,y:a.roomY,weight:Number(e.measurement_weight??1),range:Math.hypot(i.rawX,i.rawY)})}}this.observations=this.observations.filter(e=>t-e.timestamp<=250),this.targets=this.tracker.step(this.observations,t)}async save(){if(!this.saving&&this.hass.user?.is_admin){this.saving=!0,this.message=this.t("workflow.saving"),this.failures=[];try{const t=await this.hass.callWS({type:"mmwave_fusion/apply_calibrations",fusion_id:this.config.fusion_id||"home",expected_revision:this.revision,radars:this.draft,sync_devices:!0});this.draft=structuredClone(t.config.radars??[]),this.saved=structuredClone(this.draft),this.revision=Number(t.config.calibration_revision??0),this.hasCapture=!1,this.failures=t.devices.flatMap(t=>t.failures.map(e=>`${t.id}: ${e}`)),this.message=this.t(this.failures.length?"workflow.saved_partial":"workflow.saved"),this.dispatchEvent(new CustomEvent("calibration-saved",{detail:t.config,bubbles:!0,composed:!0}))}catch(t){this.message=this.t("workflow.save_failed"),this.failures=[String(t.message??t)]}finally{this.saving=!1}}}render(){if(!this.config||!this.draft.length)return Y;const t=this.draft[this.selected]??this.draft[0],e=de(t.radar_model),i=this.draft.filter(e=>e.id!==t.id).map(t=>({id:t.id,calibration:this.calibration(t)})),a=this.draft.flatMap(t=>{const e=de(t.radar_model);return e?[{config:t,adapter:e,calibration:this.calibration(t),available:Object.entries(t).some(([t,e])=>t.endsWith("_entity")&&this.hass.states[String(e)]&&!["unavailable","unknown"].includes(this.hass.states[String(e)].state))}]:[]});return U` <header>
        <button
          type="button"
          class="back"
          aria-label=${this.t("card.back_to_radar_view")}
          ?disabled=${this.saving}
          @click=${this.close}
        >
          ←
        </button>
        <span
          ><strong>${this.t("card.radar_spatial_calibration")}</strong
          ><small>${this.config.name??this.config.fusion_id}</small></span
        ><b>${this.step+1} / 3</b>
      </header>
      <nav aria-label=${this.t("card.calibration_steps")}>
        ${["card.installation","card.direction","card.live_test"].map((t,e)=>U`<button
              type="button"
              aria-current=${this.step===e?"step":Y}
              ?disabled=${this.saving}
              @click=${()=>this.step=e}
            >
              ${e+1} · ${this.t(t)}
            </button>`)}
      </nav>
      <div class="body" ?inert=${this.saving}>
        <section ?hidden=${0!==this.step}>
          <div class="radar-tabs" role="tablist" aria-label=${this.t("editor.radar_installation_tabs")}>
            ${this.draft.map((t,e)=>U`<button
                  type="button"
                  role="tab"
                  aria-selected=${e===this.selected?"true":"false"}
                  @click=${()=>this.selected=e}
                >
                  ${t.id}<small>${t.radar_model}</small>
                </button>`)}
          </div>
          ${e?U`<mmwave-geo-panel
                  .floorplan=${this.config.floorplan}
                  .adapter=${e}
                  .calibration=${this.calibration(t)}
                  .peerCalibrations=${i}
                  .showBoundary=${!1}
                  .roomW=${Number(this.config.room_w)}
                  .roomD=${Number(this.config.room_d)}
                  .lang=${this.hass.language}
                  .maxRangeM=${e.info.maxRangeM}
                  @calibration-changed=${this.changePose}
                ></mmwave-geo-panel>`:Y}
        </section>
        <section ?hidden=${1!==this.step}>
          <mmwave-fusion-calibration
            .floorplan=${this.config.floorplan}
            .hass=${this.hass}
            .radars=${this.draft}
            .roomW=${Number(this.config.room_w)}
            .roomD=${Number(this.config.room_d)}
            .lang=${this.hass.language}
            .applyLabel=${this.t("workflow.use_results")}
            @fusion-calibration-applied=${this.useSolutions}
            @calibration-capture-started=${()=>this.hasCapture=!0}
          ></mmwave-fusion-calibration>
        </section>
        <section ?hidden=${2!==this.step}>
          <p>${this.t("workflow.verify_hint")}</p>
          ${this.pendingRadars.length?U`<p class="pending-calibration">
                  ${this.t("fusioncal.pending_names",{p0:this.pendingRadars.join(", ")})}
                </p>`:Y}
          <mmwave-fusion-panel
            .floorplan=${this.config.floorplan}
            .roomW=${Number(this.config.room_w)}
            .roomD=${Number(this.config.room_d)}
            .radars=${a}
            .targets=${this.targets}
            .lang=${this.hass.language}
            .backendState=${"preview"}
          ></mmwave-fusion-panel>
        </section>
        ${this.message?U`<p role="status">${this.message}</p>`:Y}
        ${this.failures.length?U`<ul role="alert">
                ${this.failures.map(t=>U`<li>${t}</li>`)}
              </ul>`:Y}
      </div>
      <footer>
        <small>${this.dirty?this.t("workflow.unsaved"):this.t("workflow.draft_hint")}</small>
        ${this.step>0?U`<button type="button" ?disabled=${this.saving} @click=${()=>this.step--}>
                ${this.t("workflow.previous")}
              </button>`:Y}
        ${this.step<2?U`<button type="button" class="primary" ?disabled=${this.saving} @click=${()=>this.step++}>
                ${this.t("workflow.next")}
              </button>`:U`<button type="button" class="primary" ?disabled=${this.saving} @click=${this.save}>
                ${this.t(this.saving?"workflow.saving":"workflow.apply_sync")}
              </button>`}
      </footer>`}static{this.styles=s`
    :host {
      --primary-color: var(--mmwave-primary, #0b825c);
      display: block;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border-radius: 16px;
      overflow: hidden;
    }
    * {
      box-sizing: border-box;
    }
    [hidden] {
      display: none !important;
    }
    header,
    nav,
    footer {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color);
    }
    header > span {
      display: grid;
      gap: 4px;
      flex: 1;
    }
    small {
      color: var(--secondary-text-color);
      font-size: 11px;
    }
    header > b {
      font-size: 12px;
    }
    button {
      min-height: 44px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      padding: 8px 12px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    button[aria-current='step'],
    button[aria-selected='true'] {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
    }
    nav > button {
      flex: 1;
    }
    .body {
      padding: 12px;
      min-width: 0;
    }
    .radar-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .radar-tabs button {
      display: grid;
      gap: 3px;
      min-width: 76px;
    }
    p,
    li {
      font-size: 12px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }
    ul {
      padding-left: 20px;
      color: var(--error-color);
    }
    footer {
      position: sticky;
      bottom: 0;
      background: var(--card-background-color, #fff);
      border-top: 1px solid var(--divider-color);
      border-bottom: 0;
      flex-wrap: wrap;
      padding-bottom: calc(12px + env(safe-area-inset-bottom));
      z-index: 2;
    }
    footer > small {
      flex: 1;
      min-width: 100px;
    }
    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    @media (max-width: 600px) {
      :host {
        position: fixed;
        inset: 0;
        z-index: 1000;
        height: 100dvh;
        overflow-y: auto;
        border-radius: 0;
        overscroll-behavior: contain;
      }
      header {
        position: sticky;
        top: 0;
        background: var(--card-background-color, #fff);
        z-index: 3;
        padding-top: calc(12px + env(safe-area-inset-top));
      }
      footer {
        position: sticky;
        bottom: 0;
      }
      .body {
        min-height: calc(100dvh - 240px);
      }
      footer > small {
        flex-basis: 100%;
      }
    }
  `}};t([ut({attribute:!1})],xi.prototype,"hass",void 0),t([ut({attribute:!1})],xi.prototype,"config",void 0),t([gt()],xi.prototype,"draft",void 0),t([gt()],xi.prototype,"step",void 0),t([gt()],xi.prototype,"selected",void 0),t([gt()],xi.prototype,"saving",void 0),t([gt()],xi.prototype,"message",void 0),t([gt()],xi.prototype,"failures",void 0),t([gt()],xi.prototype,"targets",void 0),t([gt()],xi.prototype,"hasCapture",void 0),t([gt()],xi.prototype,"pendingRadars",void 0),xi=t([ht("mmwave-fusion-workflow")],xi),window.customCards??=[],window.customCards.push({type:Ke,name:"MMWave Radar HA Card",description:"Multi-model mmWave radar calibration & live visualization",preview:!0,documentationURL:"https://github.com/YOUR_GITHUB_USERNAME/lovelace-mmwave-card"}),console.info("%c MMWAVE-CARD %c v1.0.0 (build 4e632af52ea2) ","background:#03a9f4;color:#fff;font-weight:700","background:#1c1c2e;color:#03a9f4;font-weight:700");function wi(t,e){return`text.${t}_area_${e+1}_polygon`}function $i(t,e=new Set){return"string"==typeof t&&/^[a-z_]+\.[a-z0-9_]+$/.test(t)?e.add(t):Array.isArray(t)?t.forEach(t=>$i(t,e)):t&&"object"==typeof t&&Object.values(t).forEach(t=>$i(t,e)),e}function ki(t,e){return[...$i(e)].some(e=>{const i=t.states[e];return i&&"unavailable"!==i.state&&"unknown"!==i.state})}const Mi={radar_x:"mount_x",radar_y:"mount_y",radar_z:"mount_z",yaw:"mount_yaw",pitch:"mount_pitch",roll:"mount_roll"};let Si=class extends dt{constructor(){super(...arguments),this._areas=[[],[],[]],this._areaOccupied=[!1,!1,!1],this._tab=0,this._isCalibrating=!1,this._calibrationLoading=!1,this._calibrationError="",this._targets=[],this._present=!1,this._syncState="idle",this._syncFailures=[],this._fusionTargets=[],this._fusionRadars=[],this._fusionBackendState="connecting",this._fusionEvents=[],this._fusionHistoryTrack=[],this._fusionVideoUrl="",this._fusionThumbUrls={},this._fusionSnapshotUrl="",this._fusionHeatmapLoading=!1,this._fusionHeatmapError="",this._fusionReplayLoading=!1,this._fusionReplayError="",this._deviceLoaded=!1,this._localFusion=new _e,this._localObservationBuffer=[],this._sourceSignatures=new Map,this._fusionConnecting=!1}setConfig(t){if(this._disconnectFusionBackend(),this._deviceLoaded=!1,this._singleProfile=void 0,this._singleProfileRevision=void 0,t.radars?.length){this._config={...yt,...t};const e=this._config.room_w,i=this._config.room_d;return this._fusionRadars=t.radars.map((a,r)=>{const o=de(a.radar_model);if(!o)throw new Error(`Unknown radar_model for radars[${r}]: "${a.radar_model}"`);if(o.info.is1DRanging)throw new Error(`Radar "${a.id}" uses a ranging-only model and cannot participate in 2-D fusion.`);const s={...a,type:this._config.type,room_w:e,room_d:i},n=o.validateConfig(s);n.length&&console.warn(`Radar "${a.id}" is not fully configured: ${n.join("; ")}`);const l=o.getDefaultCalibration();return{config:a,adapter:o,calibration:{...l,radar_x:Math.round(e*(r+1)/(t.radars.length+1)),radar_y:Math.round(.2*i),...a.calibration,polygon:a.calibration?.polygon??[]},available:!1}}),this._adapter=this._fusionRadars[0].adapter,this._cal=this._fusionRadars[0].calibration,this._localFusion=new _e({...t.fusion,min_confirm_sources:t.fusion?.min_confirm_sources??(t.radars.length>1?2:1),track_ttl_s:t.fusion?.track_ttl_s??(t.radars.some(t=>"r60abd1"===t.radar_model)?3:2)}),this._fusionTargets=[],this._fusionEvents=[],this._fusionHistoryTrack=[],this._selectedFusionEvent=void 0,this._fusionHeatmap=void 0,this._fusionHeatmapError="",this._fusionReplay=void 0,this._fusionReplayError="",this._fusionVideoUrl="",this._fusionSnapshotUrl="",this._fusionThumbUrls={},this._localObservationBuffer=[],this._sourceSignatures.clear(),void(this._fusionBackendState="connecting")}if(!t.radar_model)throw new Error("radar_model is required");const e=de(t.radar_model);if(!e)throw new Error(`Unknown radar_model: "${t.radar_model}". Check src/models/index.ts.`);const i=e.validateConfig(t);if(i.length)throw new Error(i.join("; "));this._config={...yt,...t},this._adapter=e;const a=e.getDefaultCalibration(),r=this._config.room_w,o=this._config.room_d;a.radar_x=Math.round(.382*r),a.radar_y=Math.round(.382*o),this._cal=a,this._areas=[[],[],[]],this._areaOccupied=[!1,!1,!1]}static async getConfigElement(){return await Promise.resolve().then(function(){return Pi}),document.createElement(Ye)}static getStubConfig(){return{...yt,radar_model:"r60abd1",presence_entity:"binary_sensor.r60abd1_presence",x_entity:"sensor.r60abd1_x",y_entity:"sensor.r60abd1_y",z_entity:"sensor.r60abd1_z"}}getCardSize(){return 7}set hass(t){if(this._hass=t,!this._adapter||!this._config)return;if(this._config.radars?.length)return this._updateFusionMode(t),void this._connectFusionBackend();this._deviceLoaded||(this._deviceLoaded=!0,this._loadFromDevice(),this._loadSingleProfile());const e=this._adapter.readFromHass(t,this._config);this._present=e.present,this._maxRangeM=e.maxRangeM;const i=this._devicePrefix();i&&(this._areaOccupied=[0,1,2].map(t=>"on"===this._hass.states[function(t,e){return`binary_sensor.${t}_area_${e+1}_occupied`}(i,t)]?.state)),this._targets=e.targets.map(t=>{return{...t,room:{...pe(t.rawX,t.rawY,t.rawZ,this._cal),...this._adapter.info.is1DRanging?{inBoundary:(e=Math.hypot(t.rawX,t.rawY,t.rawZ),i=this._cal,Number.isFinite(e)&&e>=(i.distance_min??0)&&(!(i.distance_max>0)||e<=i.distance_max))}:{}}};var e,i}),this.requestUpdate()}_L(t){return Ue(t,this._hass?.language)}_t(t,e){return Ue(t,this._hass?.language,e)}_insideTargetCount(){return this._targets.filter(t=>t.room?.inBoundary).length}_syncLabel(){return"syncing"===this._syncState?this._t("card.syncing"):"success"===this._syncState?this._t("card.synced"):"error"===this._syncState?this._t("card.sync_failed"):this._t("card.sync_to_device")}disconnectedCallback(){super.disconnectedCallback(),null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._disconnectFusionBackend()}_updateFusionMode(t){const e=Date.now(),i=[];this._fusionRadars=this._fusionRadars.map(a=>{const r={...a.config,type:this._config.type,room_w:this._config.room_w,room_d:this._config.room_d},o=a.config.frame_entity?t.states[a.config.frame_entity]:void 0,s=o?wt(o.state):void 0,n=s?{present:s.targets.length>0,targets:s.targets.map((t,e)=>{const i=Number(a.config.frame_coordinate_scale??1);return{index:e,rawX:t.x*i,rawY:t.y*i,rawZ:t.z*i,speed:null==t.speed?void 0:t.speed*i}})}:a.adapter.readFromHass(t,r),l=function(t,e){const i=e.frame_entity?t.states[e.frame_entity]:void 0;return(i&&wt(i.state)?[e.frame_entity]:[...$i(e)]).sort().map(e=>`${e}:${t.states[e]?.last_updated??"missing"}`).join("|")}(t,a.config),d=l!==this._sourceSignatures.get(a.config.id);if(this._sourceSignatures.set(a.config.id,l),d)for(const t of n.targets){const r=pe(t.rawX,t.rawY,t.rawZ,a.calibration);r.inBoundary&&i.push({radarId:a.config.id,slot:t.index,timestamp:e,x:r.roomX,y:r.roomY,weight:Math.max(Number(a.config.measurement_weight??1),.01),range:Math.hypot(t.rawX,t.rawY)})}return{...a,available:ki(t,a.config)}});const a=i.filter(t=>t.x>=0&&t.x<=Number(this._config.room_w)&&t.y>=0&&t.y<=Number(this._config.room_d));a.length&&this._localObservationBuffer.push(...a),this._localObservationBuffer=this._localObservationBuffer.filter(t=>e-t.timestamp<=250);const r=this._localFusion.step(this._localObservationBuffer,e);"online"!==this._fusionBackendState&&(this._fusionTargets=r,"connecting"===this._fusionBackendState&&r.length&&(this._fusionBackendState="fallback")),this.requestUpdate()}async _connectFusionBackend(){if(this._fusionConnecting||this._fusionUnsubscribe||!this._config.radars?.length||!this._hass)return;this._fusionConnecting=!0;const t=this._config.fusion_id||"home";try{if(!1!==this._config.sync_backend&&!this._isEditorPreview())try{await this._hass.callWS({type:"mmwave_fusion/configure",config:{fusion_id:t,room_w:this._config.room_w,room_d:this._config.room_d,radars:this._config.radars,zones:this._config.zones??[],cameras:this._config.cameras??[],fusion:this._config.fusion??{},quality:this._config.quality??{}}})}catch(t){console.info("MMWave Fusion backend configuration was not updated",t)}this._fusionUnsubscribe=await this._hass.connection.subscribeMessage(e=>{if(e.fusion_id!==t)return;const i=e.api_version??0;if(i<4)return"outdated"!==this._fusionBackendState&&console.warn(`MMWave Fusion backend speaks api_version ${i}, this card needs 4; please update the mmwave-fusion integration`),this._fusionBackendState="outdated",void this.requestUpdate();this._fusionTargets=e.tracks,e.events.length&&(this._fusionEvents=[...e.events,...this._fusionEvents].slice(0,100));const a=new Map(e.radars.map(t=>[t.id,t]));this._fusionRadars=this._fusionRadars.map(t=>({...t,calibration:a.get(t.config.id)?.calibration??t.calibration,config:{...t.config,calibration:a.get(t.config.id)?.calibration??t.calibration,calibration_profile_id:a.get(t.config.id)?.calibration_profile_id??t.config.calibration_profile_id,calibration_profile_revision:a.get(t.config.id)?.calibration_profile_revision??t.config.calibration_profile_revision},available:a.get(t.config.id)?.available??t.available,observations:a.get(t.config.id)?.observations,inRoomRatio:a.get(t.config.id)?.in_room_ratio,calibrationWarning:a.get(t.config.id)?.calibration_warning,stale:a.get(t.config.id)?.stale})),this._fusionBackendState="online",this.requestUpdate()},{type:"mmwave_fusion/subscribe",fusion_id:t}),await this._loadFusionEvents(),this._fusionClipUnsubscribe=await this._hass.connection.subscribeEvents(t=>{this._onFusionClipReady(t.data)},"mmwave_fusion_clip_ready"),this._fusionReviewUnsubscribe=await this._hass.connection.subscribeEvents(t=>{this._onFusionClipReviewed(t.data)},"mmwave_fusion_clip_reviewed"),this._fusionSnapshotUnsubscribe=await this._hass.connection.subscribeEvents(t=>{this._onFusionSnapshotReady(t.data)},"mmwave_fusion_snapshot_ready")}catch(t){const e=t?.code;"unknown_command"===e?(console.info("MMWave Fusion integration is not installed; multi-radar fusion needs it"),this._fusionBackendState="missing"):(console.warn("MMWave Fusion backend unavailable; using browser fallback",t),this._fusionBackendState="fallback")}finally{this._fusionConnecting=!1}}_disconnectFusionBackend(){this._fusionUnsubscribe?.(),this._fusionUnsubscribe=void 0,this._fusionClipUnsubscribe?.(),this._fusionClipUnsubscribe=void 0,this._fusionReviewUnsubscribe?.(),this._fusionReviewUnsubscribe=void 0,this._fusionSnapshotUnsubscribe?.(),this._fusionSnapshotUnsubscribe=void 0,this._fusionConnecting=!1}async _onFusionClipReady(t){const e=this._config.fusion_id||"home";if(String(t.fusion_id??"")!==e)return;const i=String(t.event_id??""),a=t.clip_path?String(t.clip_path):"";if(i&&a)if(this._fusionEvents=this._fusionEvents.map(e=>e.event_id===i?{...e,clip_path:a,clip_status:"ready",camera_entity_id:t.camera_entity_id?String(t.camera_entity_id):e.camera_entity_id}:e),this._selectedFusionEvent?.event_id===i){this._selectedFusionEvent=this._fusionEvents.find(t=>t.event_id===i);try{const t=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${a}`});this._fusionVideoUrl=t.url}catch(t){console.warn("Failed to resolve fusion clip media",t)}this.requestUpdate()}else this.requestUpdate()}async _onFusionSnapshotReady(t){const e=this._config.fusion_id||"home";if(String(t.fusion_id??"")!==e)return;this._fusionEvents=function(t,e){const i=String(e.event_id??""),a=e.snapshot_path?String(e.snapshot_path):"";return i&&a?t.map(t=>t.event_id===i?{...t,snapshot_path:a,camera_entity_id:e.camera_entity_id?String(e.camera_entity_id):t.camera_entity_id}:t):t}(this._fusionEvents,t);const i=String(t.event_id??""),a=t.snapshot_path?String(t.snapshot_path):"";i&&a&&await this._resolveFusionThumb(i,a),this._selectedFusionEvent?.event_id===i&&(this._selectedFusionEvent=this._fusionEvents.find(t=>t.event_id===i),a&&!this._fusionVideoUrl&&(this._fusionSnapshotUrl=this._fusionThumbUrls[i]??"")),this.requestUpdate()}async _resolveFusionThumb(t,e){try{const i=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${e}`});this._fusionThumbUrls={...this._fusionThumbUrls,[t]:i.url}}catch(t){console.warn("Failed to resolve fusion snapshot",t)}}_onFusionClipReviewed(t){const e=this._config.fusion_id||"home";if(String(t.fusion_id??"")!==e)return;this._fusionEvents=function(t,e){const i=String(e.event_id??""),a=ge(e.verdict??e.review_verdict);if(!i||!a)return t;const r=e.summary??e.review_summary;return t.map(t=>t.event_id===i?{...t,review_verdict:a,review_summary:r?String(r):t.review_summary,review_error:void 0}:t)}(this._fusionEvents,t);const i=String(t.event_id??"");this._selectedFusionEvent?.event_id===i&&(this._selectedFusionEvent=this._fusionEvents.find(t=>t.event_id===i)),this.requestUpdate()}_isEditorPreview(){let t=this.parentNode??this.getRootNode();for(;t;){if(t instanceof HTMLElement&&["HUI-CARD-PREVIEW","HUI-DIALOG-EDIT-CARD"].includes(t.tagName))return!0;t=t.parentNode??(t instanceof ShadowRoot?t.host:null)}return!1}async _openCalibration(){if(!this._calibrationLoading&&this._hass.user?.is_admin)if(this._isEditorPreview())this._calibrationError=this._t("workflow.preview_readonly");else{this._calibrationLoading=!0,this._calibrationError="";try{if(this._config.radars?.length){const t=await this._hass.callWS({type:"mmwave_fusion/get_config",fusion_id:this._config.fusion_id||"home"});if(t.api_version<4||!t.config)throw new Error(this._t("workflow.backend_required"));this._fusionCalibrationConfig={...this._config,...t.config}}else this._loadFromDevice(),await this._loadSingleProfile(),this._originalCalibration=structuredClone(this._cal),this._isCalibrating=!0,this._tab=0}catch(t){this._calibrationError=String(t.message??t)}finally{this._calibrationLoading=!1}}}_closeCalibration(){if("syncing"!==this._syncState){if(this._originalCalibration&&JSON.stringify(this._cal)!==JSON.stringify(this._originalCalibration)){if(!confirm(this._t("workflow.discard_confirm")))return;this._cal=structuredClone(this._originalCalibration)}this._isCalibrating=!1}}async _loadSingleProfile(){if(!this._hass.user?.is_admin||!this._config.device_id||this._adapter.info.is1DRanging)return;const t=this._config.device_id;try{const e=await this._hass.callWS({type:"mmwave_fusion/list_calibration_profiles"});if(this._config.device_id!==t||this._isCalibrating)return;const i=e.find(e=>e.profile_id===`device:${t}`&&e.radar_model===this._config.radar_model);this._singleProfileRevision=i?.revision??0,this._singleProfile=i,i&&(this._cal=structuredClone(i.calibration))}catch{this._singleProfileRevision=void 0,this._singleProfile=void 0}}async _loadFusionEvents(){if(this._hass&&this._config.radars?.length)try{const t=await this._hass.callWS({type:"mmwave_fusion/query_events",fusion_id:this._config.fusion_id||"home",limit:100});this._fusionEvents=t.map(me);const e=this._fusionEvents.filter(t=>t.snapshot_path).slice(0,24);await Promise.all(e.map(t=>this._resolveFusionThumb(t.event_id,t.snapshot_path)))}catch(t){console.info("MMWave Fusion history is not available",t)}}async _loadFusionHeatmap(t){if(this._hass){this._fusionHeatmapLoading=!0,this._fusionHeatmapError="";try{this._fusionHeatmap=await this._hass.callWS({type:"mmwave_fusion/query_heatmap",fusion_id:this._config.fusion_id||"home",hours:t.detail.hours,bin_cm:t.detail.binCm})}catch(t){const e=t?.code;this._fusionHeatmapError="unknown_command"===e?"unsupported":"failed","unknown_command"!==e&&console.warn("MMWave Fusion heatmap query failed",t)}finally{this._fusionHeatmapLoading=!1}}}async _loadFusionReplay(t){if(this._hass){this._fusionReplayLoading=!0,this._fusionReplayError="";try{this._fusionReplay=await this._hass.callWS({type:"mmwave_fusion/query_replay",fusion_id:this._config.fusion_id||"home",since:t.detail.since,until:t.detail.until})}catch(t){const e=t?.code;this._fusionReplayError="unknown_command"===e?"unsupported":"failed","unknown_command"!==e&&console.warn("MMWave Fusion replay query failed",t)}finally{this._fusionReplayLoading=!1}}}async _selectFusionEvent(t){this._selectedFusionEvent=t.detail,this._fusionVideoUrl="",this._fusionSnapshotUrl="";try{await this._loadFusionEvents();const e=this._fusionEvents.find(e=>e.event_id===t.detail.event_id)??t.detail;if(this._selectedFusionEvent=e,this._fusionHistoryTrack=await this._hass.callWS({type:"mmwave_fusion/query_track",track_id:e.track_id,limit:1e4}),e.clip_path){const t=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${e.clip_path}`});this._fusionVideoUrl=t.url}else if(e.snapshot_path){const t=await this._hass.callWS({type:"media_source/resolve_media",media_content_id:`media-source://media_source/local/${e.snapshot_path}`});this._fusionSnapshotUrl=t.url}}catch(t){console.warn("Failed to load fused trajectory event",t)}}_gotoTab(t){this._tab=t,this._livePanel?.clearTrail(),this.requestUpdate()}_onPolygonPointAdded(t){const e=this.shadowRoot?.querySelector("#poly-cv"),i={W:e?.offsetWidth??400,H:165,roomW:this._cal?.room_w??this._config.room_w,roomD:this._cal?.room_d??this._config.room_d},a=Te(t.detail.canvasX,t.detail.canvasY,i),r={...this._cal,polygon:[...this._cal.polygon,a]};this._cal=r,this.requestUpdate()}_onCalibrationChanged(t){let e=t.detail;const i=e.room_w??this._config.room_w,a=e.room_d??this._config.room_d;e.radar_x>i&&(e={...e,radar_x:i}),e.radar_y>a&&(e={...e,radar_y:a}),this._cal=this._adapter.info.is1DRanging?{...e,polygon:[]}:e,this._hass&&(this.hass=this._hass),this.requestUpdate()}_onCaptureRequested(){}_devicePrefix(){if(this._adapter.info.is1DRanging){const t=this._config.presence_entity,e=t?.match(/^binary_sensor\.(.+)_presence$/);if(e)return e[1]}const t=this._config?.x_entity||"";if(t){const e=t.match(/^sensor\.(.+?)(_radar_x|_x)$/);if(e)return e[1];const i=t.split(".")[1]?.split("_")||[];return i.slice(0,i.length-1).join("_")}const e=(this._config?.target_1_x_entity||"").match(/^sensor\.(.+?)_target_\d+_x$/);return e?e[1]:""}_loadFromDevice(){if(!this._hass||!this._config)return;const t=this._devicePrefix();if(!t)return;const e={...this._cal};for(const[i,a]of Object.entries(Mi)){const r=this._hass.states[`number.${t}_${a}`];r&&r.state&&!isNaN(Number(r.state))&&(e[i]=Number(r.state))}if(this._adapter.info.is1DRanging){for(const i of["distance_min","distance_max"]){const a=Number(this._hass.states[`number.${t}_zone_${"distance_min"===i?"min":"max"}_distance`]?.state);Number.isFinite(a)&&a>=0&&(e[i]=a)}e.polygon=[]}const i=this._config.polygon_entity||`text.${t}_zone_polygon`,a=this._adapter.info.is1DRanging?void 0:this._hass.states[i];if(a&&a.state){const t=a.state.split(";").filter(t=>t.includes(",")).map(t=>{const[e,i]=t.split(",");return{x:parseFloat(e),y:parseFloat(i)}});t.length>0?e.polygon=t:e.polygon=[]}else a&&""===a.state&&(e.polygon=[]);if(this._adapter.info.is1DRanging)this._areas=[[],[],[]];else{const e=[[],[],[]];for(let i=0;i<3;i++){const a=this._hass.states[wi(t,i)]?.state;a&&"unknown"!==a&&"unavailable"!==a&&(e[i]=Ce(a))}this._areas=e}const r=e.room_w??this._config.room_w,o=e.room_d??this._config.room_d;e.radar_x>r&&(e.radar_x=r),e.radar_y>o&&(e.radar_y=o),this._cal=e,this._singleProfile&&(this._cal=structuredClone(this._singleProfile.calibration)),this.requestUpdate()}async _sync(){if(!this._hass.user?.is_admin)return;const t=this._devicePrefix();if(t){if(this._adapter.info.is1DRanging&&(this._cal.distance_max??0)>0&&(this._cal.distance_min??0)>this._cal.distance_max)return this._syncFailures=[this._t("range.invalid")],void(this._syncState="error");this._syncState="syncing";try{if(void 0!==this._singleProfileRevision&&this._config.device_id){const t=await this._hass.callWS({type:"mmwave_fusion/upsert_calibration_profile",profile:{profile_id:`device:${this._config.device_id}`,device_id:this._config.device_id,radar_model:this._config.radar_model,name:this._adapter.info.displayName,calibration:this._cal,expected_revision:this._singleProfileRevision}});this._singleProfileRevision=t.revision,this._singleProfile=t,this._originalCalibration=structuredClone(this._cal)}const e=[];for(const[i,a]of Object.entries(Mi)){const r=this._cal[i],o=`number.${t}_${a}`;if(void 0!==this._hass.states[o])try{await this._hass.callService("number","set_value",{entity_id:o,value:r})}catch(t){e.push(o),console.warn(`Failed to sync ${o}`,t)}else e.push(`${o} (no such entity)`)}if(this._adapter.info.is1DRanging)for(const[i,a]of[["distance_min","zone_min_distance"],["distance_max","zone_max_distance"]]){const r=`number.${t}_${a}`;if(this._hass.states[r])try{await this._hass.callService("number","set_value",{entity_id:r,value:this._cal[i]??0})}catch{e.push(r)}else e.push(`${r} (no such entity)`)}const i=this._cal.polygon.map(t=>`${t.x},${t.y}`).join(";"),a=this._config.polygon_entity||`text.${t}_zone_polygon`;if(this._adapter.info.is1DRanging||void 0===this._hass.states[a])!this._adapter.info.is1DRanging&&this._cal.polygon.length>0&&e.push(`${a} (no such entity)`);else try{await this._hass.callService("text","set_value",{entity_id:a,value:i})}catch(t){e.push(a),console.warn(`Failed to sync ${a}`,t)}if(!this._adapter.info.is1DRanging)for(let i=0;i<3;i++){const a=wi(t,i),r=De(this._areas[i]??[]);if(void 0!==this._hass.states[a])try{await this._hass.callService("text","set_value",{entity_id:a,value:r})}catch(t){e.push(a),console.warn(`Failed to sync ${a}`,t)}else r&&e.push(`${a} (no such entity)`)}this._syncFailures=e,this._syncState=e.length>0?"error":"success",e.length||(this._originalCalibration=structuredClone(this._cal)),e.length>0&&console.error("mmwave-card: these did not reach the device -",e)}catch(t){this._syncFailures=[String(t.message??t)],this._syncState="error",console.error(t)}finally{null!=this._syncResetTimer&&clearTimeout(this._syncResetTimer),this._syncResetTimer=window.setTimeout(()=>this._syncState="idle",2200)}}else alert("Error: neither x_entity nor target_1_x_entity is configured.")}_reset(){if(!confirm(this._L("actions.reset_confirm")||"Reset to factory defaults?"))return;const t=this._adapter.getDefaultCalibration(),e=this._config.room_w,i=this._config.room_d;t.radar_x=Math.round(.382*e),t.radar_y=Math.round(.382*i),this._cal=t,this._gotoTab(0)}render(){if(!this._config||!this._adapter)return Y;if(this._config.radars?.length)return this._renderFusionMode();const t=this._cal.room_w??this._config.room_w,e=this._cal.room_d??this._config.room_d,i=this._hass?.language??"en",a=this._insideTargetCount(),r=[{icon:"mdi:cube-scan",title:this._t("card.installation"),description:this._t("card.place_the_radar_in_the_3d")},{icon:"mdi:compass-outline",title:this._t("card.direction"),description:this._t("card.calibrate_yaw_with_two_reference_points")},{icon:"mdi:radar",title:this._t("card.live_test"),description:this._t("card.verify_targets_boundary_and_trails")}];return this._isCalibrating?U`
      <ha-card>
        <header class="workflow-header">
          <button
            class="icon-button"
            type="button"
            title=${this._t("card.back_to_radar_view")}
            aria-label=${this._t("card.back_to_radar_view_2")}
            @click=${this._closeCalibration}
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
          ${r.map((t,e)=>U`
              <button
                type="button"
                class="workflow-step ${this._tab===e?"current":""} ${this._tab>e?"complete":""}"
                aria-current=${this._tab===e?"step":Y}
                @click=${()=>this._gotoTab(e)}
              >
                <span class="step-icon">
                  ${this._tab>e?U`<ha-icon icon="mdi:check"></ha-icon>`:U`<ha-icon icon=${t.icon}></ha-icon>`}
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
          ${0===this._tab?U` <mmwave-geo-panel
                  .floorplan=${this._config.floorplan}
                  .adapter=${this._adapter}
                  .calibration=${this._cal}
                  .lang=${i}
                  .roomW=${t}
                  .roomD=${e}
                  .maxRangeM=${this._maxRangeM}
                >
                </mmwave-geo-panel>`:Y}
          ${1===this._tab?this._adapter.info.is1DRanging?U`<p>${this._t("fusioncal.range_only")}</p>`:U`<mmwave-fusion-calibration
                    .floorplan=${this._config.floorplan}
                    .hass=${this._hass}
                    .radars=${[{...this._config,id:this._config.device_id||"radar",calibration:this._cal}]}
                    .lang=${i}
                    .roomW=${t}
                    .roomD=${e}
                    .applyLabel=${this._t("workflow.use_results")}
                    @fusion-calibration-applied=${t=>{const e=t.detail.solutions[0];e&&(this._onCalibrationChanged(new CustomEvent("calibration-changed",{detail:e.calibration})),this._gotoTab(2))}}
                  ></mmwave-fusion-calibration>`:Y}
          ${2===this._tab?U` <mmwave-live-panel
                    .hass=${this._hass}
                    .config=${this._config}
                    .floorplan=${this._config.floorplan}
                    .adapter=${this._adapter}
                    .calibration=${this._cal}
                    .lang=${i}
                    .roomW=${t}
                    .roomD=${e}
                    .targets=${this._targets}
                    .present=${this._present}
                    .maxRangeM=${this._maxRangeM}
                    .showStatus=${!0}
                    .areas=${this._areas}
                    .areaOccupied=${this._areaOccupied}
                  >
                  </mmwave-live-panel>
                  ${this._adapter.info.is1DRanging?Y:U`<mmwave-area-editor
                          .floorplan=${this._config.floorplan}
                          .roomW=${t}
                          .roomD=${e}
                          .areas=${this._areas.map(t=>({polygon:t}))}
                          .radar=${{x:this._cal.radar_x,y:this._cal.radar_y,yaw:this._cal.yaw}}
                          .standPoint=${(()=>{const t=this._targets.find(t=>t.room?.inBoundary);return t?.room?{x:t.room.roomX,y:t.room.roomY}:void 0})()}
                          .lang=${i}
                          @areas-changed=${t=>{this._areas=[0,1,2].map(e=>t.detail[e]?.polygon??[])}}
                        ></mmwave-area-editor>`}`:Y}
        </div>

        <footer class="workflow-footer">
          ${"error"===this._syncState?U`<p role="alert">${this._syncFailures.join("; ")}</p>`:Y}
          <div class="footer-tools">
            <button class="text-button" type="button" @click=${this._loadFromDevice}>
              <ha-icon icon="mdi:backup-restore"></ha-icon><span>${this._t("card.revert")}</span>
            </button>
            <button class="text-button danger" type="button" @click=${this._reset}>
              <ha-icon icon="mdi:restore-alert"></ha-icon><span>${this._t("card.reset")}</span>
            </button>
          </div>
          <div class="footer-actions">
            ${this._tab>0?U`<button class="secondary-button" type="button" @click=${()=>this._gotoTab(this._tab-1)}>
                    <ha-icon icon="mdi:chevron-left"></ha-icon>${this._t("card.back")}
                  </button>`:Y}
            ${this._tab<2?U`<button class="primary-button" type="button" @click=${()=>this._gotoTab(this._tab+1)}>
                    ${this._t("card.continue")}<ha-icon icon="mdi:chevron-right"></ha-icon>
                  </button>`:U`<button
                    class="primary-button sync ${this._syncState}"
                    type="button"
                    title=${this._syncFailures.length>0?`Not written: ${this._syncFailures.join(", ")}`:Y}
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
    `:U`
        <ha-card class="live-card">
          <header class="live-header">
            <div class="identity">
              <div class="logo-tile ${this._present?"online":""}">${Be}</div>
              <div class="identity-copy">
                <div class="card-title">${this._config.name||this._t("card.presence_radar")}</div>
                <div class="card-subtitle">${this._adapter.info.displayName}</div>
              </div>
            </div>
            <div class="header-actions">
              <span
                class="presence-chip ${a>0||this._areaOccupied.some(Boolean)?"active":this._present?"filtered":""}"
              >
                <i></i>
                ${this._areaOccupied.some(Boolean)?this._areaOccupied.map((t,e)=>t?this._adapter.info.is1DRanging?this._t(0===e?"card.near":"card.far"):this._t("live.area_n",{n:e+1}):"").filter(Boolean).join(" · "):a>0?this._t("card.p0_target_p1",{p0:a,p1:1===a?"":"s"}):this._present?this._t("card.outside"):this._t("card.clear")}
              </span>
              <button
                class="icon-button"
                type="button"
                title=${this._t("card.open_calibration")}
                aria-label=${this._t("card.open_calibration_2")}
                ?disabled=${!this._hass.user?.is_admin||this._calibrationLoading}
                @click=${this._openCalibration}
              >
                <ha-icon icon="mdi:tune-variant"></ha-icon>
              </button>
            </div>
          </header>
          ${this._calibrationError?U`<p role="alert">${this._calibrationError}</p>`:Y}
          <div class="live-body">
            <mmwave-live-panel
              .hass=${this._hass}
              .config=${this._config}
              .floorplan=${this._config.floorplan}
              .adapter=${this._adapter}
              .calibration=${this._cal}
              .lang=${i}
              .roomW=${t}
              .roomD=${e}
              .targets=${this._targets}
              .present=${this._present}
              .maxRangeM=${this._maxRangeM}
              .areas=${this._areas}
              .areaOccupied=${this._areaOccupied}
              .privacy=${!0}
            >
            </mmwave-live-panel>
          </div>
        </ha-card>
      `}_renderFusionMode(){if(this._fusionCalibrationConfig)return U`<ha-card>
        <mmwave-fusion-workflow
          .hass=${this._hass}
          .config=${this._fusionCalibrationConfig}
          @calibration-closed=${()=>this._fusionCalibrationConfig=void 0}
          @calibration-saved=${t=>{this._fusionRadars=this._fusionRadars.map(e=>{const i=t.detail.radars?.find(t=>t.id===e.config.id);return i?{...e,config:i,calibration:{...e.calibration,...i.calibration}}:e})}}
        ></mmwave-fusion-workflow
      ></ha-card>`;const t=this._hass?.language??"en",e=this._fusionRadars.filter(t=>t.available).length;return U`
      <ha-card class="live-card fusion-card">
        <header class="live-header">
          <div class="identity">
            <div class="logo-tile ${this._fusionTargets.length?"online":""}">${Be}</div>
            <div class="identity-copy">
              <div class="card-title">${this._config.name||this._t("card.multi_radar_fusion")}</div>
              <div class="card-subtitle">
                ${this._t("card.p0_p1_radars_p2",{p0:e,p1:this._fusionRadars.length,p2:this._config.fusion_id||"home"})}
              </div>
            </div>
          </div>
          <div class="header-actions">
            <span class="presence-chip ${this._fusionTargets.length?"active":""}">
              <i></i>
              ${this._fusionTargets.length?this._t("card.p0_targets",{p0:this._fusionTargets.length}):this._t("card.clear_2")}
            </span>
            <button
              class="icon-button"
              type="button"
              title=${this._t("card.open_calibration")}
              aria-label=${this._t("card.open_calibration_2")}
              ?disabled=${!this._hass.user?.is_admin||this._calibrationLoading}
              @click=${this._openCalibration}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
            </button>
          </div>
        </header>
        ${this._calibrationError?U`<p role="alert">${this._calibrationError}</p>`:Y}
        <div class="live-body">
          <mmwave-fusion-panel
            .floorplan=${this._config.floorplan}
            .roomW=${this._config.room_w}
            .roomD=${this._config.room_d}
            .radars=${this._fusionRadars}
            .targets=${this._fusionTargets}
            .zones=${this._config.zones??[]}
            .events=${this._fusionEvents}
            .thumbUrls=${this._fusionThumbUrls}
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
          ${this._selectedFusionEvent?U`
                  <section class="fusion-playback">
                    <header>
                      <strong
                        >${this._selectedFusionEvent.event_type.toUpperCase()} ·
                        ${this._selectedFusionEvent.zone_id}</strong
                      >
                      <span>${new Date(1e3*this._selectedFusionEvent.timestamp).toLocaleString()}</span>
                    </header>
                    ${null!=this._selectedFusionEvent.quality_score?U`<p class="quality-detail">
                            ${this._t("card.trajectory_quality")}:
                            <strong>${this._selectedFusionEvent.quality_score}/100</strong>
                            ${this._selectedFusionEvent.quality_reason?U` · ${this._selectedFusionEvent.quality_reason}`:Y}
                          </p>`:Y}
                    ${this._selectedFusionEvent.review_verdict?U`<p class="quality-detail">
                            ${this._t("card.clip_review")}:
                            <strong>${this._t(`fusion.review_${this._selectedFusionEvent.review_verdict}`)}</strong>
                            ${this._selectedFusionEvent.review_summary?U` · ${this._selectedFusionEvent.review_summary}`:Y}
                          </p>`:this._selectedFusionEvent.review_error?U`<p class="clip-error">${this._selectedFusionEvent.review_error}</p>`:Y}
                    ${this._fusionVideoUrl?U`<video controls preload="metadata" .src=${this._fusionVideoUrl}></video>`:this._fusionSnapshotUrl?U`<img class="fusion-still" src=${this._fusionSnapshotUrl} alt="" />`:U`<p>
                              ${this._t("card.no_playable_clip_is_available_yet")}
                              ${this._selectedFusionEvent.clip_status?U` (${this._selectedFusionEvent.clip_status})`:Y}
                              ${this._selectedFusionEvent.clip_error?U`<br /><span class="clip-error">${this._selectedFusionEvent.clip_error}</span>`:Y}
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
    .fusion-playback video,
    .fusion-playback .fusion-still {
      display: block;
      width: 100%;
      max-height: 360px;
      border-radius: 8px;
      background: #000;
      object-fit: contain;
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
  `}};t([gt()],Si.prototype,"_config",void 0),t([gt()],Si.prototype,"_adapter",void 0),t([gt()],Si.prototype,"_cal",void 0),t([gt()],Si.prototype,"_areas",void 0),t([gt()],Si.prototype,"_areaOccupied",void 0),t([gt()],Si.prototype,"_tab",void 0),t([gt()],Si.prototype,"_isCalibrating",void 0),t([gt()],Si.prototype,"_fusionCalibrationConfig",void 0),t([gt()],Si.prototype,"_calibrationLoading",void 0),t([gt()],Si.prototype,"_calibrationError",void 0),t([gt()],Si.prototype,"_targets",void 0),t([gt()],Si.prototype,"_present",void 0),t([gt()],Si.prototype,"_maxRangeM",void 0),t([gt()],Si.prototype,"_syncState",void 0),t([gt()],Si.prototype,"_syncFailures",void 0),t([gt()],Si.prototype,"_fusionTargets",void 0),t([gt()],Si.prototype,"_fusionRadars",void 0),t([gt()],Si.prototype,"_fusionBackendState",void 0),t([gt()],Si.prototype,"_fusionEvents",void 0),t([gt()],Si.prototype,"_fusionHistoryTrack",void 0),t([gt()],Si.prototype,"_selectedFusionEvent",void 0),t([gt()],Si.prototype,"_fusionVideoUrl",void 0),t([gt()],Si.prototype,"_fusionThumbUrls",void 0),t([gt()],Si.prototype,"_fusionSnapshotUrl",void 0),t([gt()],Si.prototype,"_fusionHeatmap",void 0),t([gt()],Si.prototype,"_fusionHeatmapLoading",void 0),t([gt()],Si.prototype,"_fusionHeatmapError",void 0),t([gt()],Si.prototype,"_fusionReplay",void 0),t([gt()],Si.prototype,"_fusionReplayLoading",void 0),t([gt()],Si.prototype,"_fusionReplayError",void 0),t([mt("mmwave-live-panel")],Si.prototype,"_livePanel",void 0),Si=t([ht(Ke)],Si);let Ri=class extends dt{constructor(){super(...arguments),this.uploading=!1,this.uploadError=!1,this.roomW=400,this.roomD=600,this.lang="en",this.mode="move",this.points=[],this.length=100,this.loaded=()=>{this.isConnected&&(this.requestUpdate(),this.draw())}}t(t){return Ue("floorplan."+t,this.lang)}get current(){return this.draft??this.config??{url:""}}get normalized(){return{...this.current,width_cm:this.current.width_cm??this.roomW}}metrics(){const t=this.canvas?.clientWidth||400;return Ae({W:t,H:Math.min(420,Math.max(240,t*this.roomD/this.roomW)),roomW:this.roomW,roomD:this.roomD})}firstUpdated(){this.observer=new ResizeObserver(()=>this.draw()),this.canvas&&this.observer.observe(this.canvas)}updated(t){t.has("config")&&(this.draft=void 0,this.drag=void 0),this.draw()}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect()}change(t){const e={...this.normalized,...t};this.draft=e,this.dispatchEvent(new CustomEvent("floorplan-changed",{detail:e,bubbles:!0,composed:!0}))}draw(){if(!this.canvas?.clientWidth)return;const t=this.metrics(),e=Pe(this.canvas,t.H);Fe(e,t,this.normalized,this.loaded),e.strokeStyle="#408564",e.lineWidth=2,e.strokeRect(0,0,this.roomW*t.W/t.roomW,this.roomD*t.H/t.roomD),this.points.forEach((i,a)=>{const r=xe(i,this.normalized,this.roomW),o=Ee(r.x,r.y,t);e.beginPath(),e.arc(o.cx,o.cy,6,0,2*Math.PI),e.fillStyle="#ff9800",e.fill(),e.fillStyle="#222",e.font="bold 14px sans-serif",e.fillText(String(a+1),o.cx+9,o.cy)})}roomPoint(t){const e=this.canvas.getBoundingClientRect();return Te(t.clientX-e.left,t.clientY-e.top,this.metrics())}down(t){if(!1!==this.current.locked||!1===this.current.visible||"ready"!==ve(this.current.url)?.status)return;const e=this.roomPoint(t);if("move"===this.mode)this.drag={start:e,config:{...this.normalized},pointer:t.pointerId},this.canvas.setPointerCapture(t.pointerId);else{const t=we(e,this.normalized,this.roomW),i=ve(this.current.url).image;if(t.x<0||t.x>1||t.y<0||t.y>i.naturalHeight/i.naturalWidth)return;if("scale"===this.mode)this.points=2===this.points.length?[t]:[...this.points,t];else{const e=xe(t,{...this.normalized,offset_x_cm:0,offset_y_cm:0},this.roomW);this.change({offset_x_cm:-e.x,offset_y_cm:-e.y}),this.mode="move"}}}move(t){if(!this.drag||t.pointerId!==this.drag.pointer)return;const e=this.roomPoint(t),i=be(this.drag.config,this.roomW);this.draft={...this.drag.config,offset_x_cm:i.x+e.x-this.drag.start.x,offset_y_cm:i.y+e.y-this.drag.start.y}}up(t){this.drag&&t.pointerId===this.drag.pointer&&(this.move(t),this.drag=void 0,this.change({}))}cancel(){this.drag=void 0,this.draft=void 0}calibrate(){if(2!==this.points.length)return;const t=$e(this.points[0],this.points[1],this.length);if(void 0===t)return;const e=xe(this.points[0],this.normalized,this.roomW),i=xe(this.points[0],{...this.normalized,width_cm:t,offset_x_cm:0,offset_y_cm:0},this.roomW);this.change({width_cm:t,offset_x_cm:e.x-i.x,offset_y_cm:e.y-i.y}),this.points=[],this.mode="move"}async upload(t){const e=t.target,i=e.files?.[0];if(i&&!this.uploading){if(this.uploadError=!1,!["image/png","image/jpeg","image/gif"].includes(i.type)||i.size>9437184)return this.uploadError=!0,void(e.value="");this.uploading=!0;try{const t=new FormData;if(t.append("file",i),!this.hass?.fetchWithAuth)throw new Error("Upload unavailable");const e=await this.hass.fetchWithAuth("/api/image/upload",{method:"POST",body:t});if(!e.ok)throw new Error("Upload failed");const a=await e.json(),r=a?.id;if("string"!=typeof r||!/^[a-f0-9]{32}$/.test(r))throw new Error("Invalid image ID");this.points=[],this.mode="move",this.change({url:`/api/image/serve/${r}/original`,visible:!0,locked:!1})}catch{this.uploadError=!0}finally{this.uploading=!1,e.value=""}}}render(){const t=this.current,e=be(t,this.roomW),i=!1!==t.locked,a=t.url?ve(t.url,this.loaded):void 0;return U`<details @toggle=${()=>this.draw()}>
      <summary>${this.t("title")}</summary>
      <label
        >${this.t("upload")}<input
          type="file"
          accept="image/png,image/jpeg,image/gif"
          ?disabled=${this.uploading}
          @change=${this.upload}
      /></label>
      ${this.uploading?U`<p role="status">${this.t("uploading")}</p>`:Y}
      ${this.uploadError?U`<p role="alert">${this.t("upload_error")}</p>`:Y}
      <label
        >${this.t("url")}<input
          type="text"
          placeholder="/local/floorplans/room.png"
          .value=${t.url}
          @change=${t=>{this.points=[],this.change({url:t.target.value.trim()})}}
      /></label>
      <p>${this.t("source_hint")}</p>
      <div class="options">
        <label
          ><input
            type="checkbox"
            .checked=${!1!==t.visible}
            @change=${t=>this.change({visible:t.target.checked})}
          />${this.t("visible")}</label
        >
        <label
          ><input
            type="checkbox"
            .checked=${i}
            @change=${t=>{this.mode="move",this.points=[],this.change({locked:t.target.checked})}}
          />${this.t("locked")}</label
        >
      </div>
      ${t.url&&"ready"!==a?.status?U`<p role="status">${this.t("loading"===a?.status?"loading":"error")}</p>`:Y}
      <canvas
        aria-label=${this.t("preview")}
        @pointerdown=${this.down}
        @pointermove=${this.move}
        @pointerup=${this.up}
        @pointercancel=${this.cancel}
      ></canvas>
      <p>
        ${this.t(i?"unlock_hint":"move"===this.mode?"drag_hint":"scale"===this.mode?"scale_hint":"origin_hint")}
      </p>
      <div class="options">
        <button
          type="button"
          ?disabled=${i||"ready"!==a?.status}
          @click=${()=>{this.mode="scale",this.points=[]}}
        >
          ${this.t("scale")}
        </button>
        <button
          type="button"
          ?disabled=${i||"ready"!==a?.status}
          @click=${()=>{this.mode="origin",this.points=[]}}
        >
          ${this.t("origin")}
        </button>
        <button
          type="button"
          ?disabled=${i}
          @click=${()=>{this.mode="move",this.points=[]}}
        >
          ${this.t("move")}
        </button>
      </div>
      ${"scale"===this.mode?U`<label
                >${this.t("length")}<input
                  type="number"
                  min="1"
                  .value=${String(this.length)}
                  @input=${t=>this.length=Number(t.target.value)}
              /></label>
              <button
                type="button"
                ?disabled=${2!==this.points.length||!$e(this.points[0],this.points[1],this.length)}
                @click=${this.calibrate}
              >
                ${this.t("apply_scale")}
              </button>`:Y}
      <div class="numbers">
        ${[["width_cm",e.width,"width"],["offset_x_cm",e.x,"x"],["offset_y_cm",e.y,"y"],["rotation",t.rotation??0,"rotation"]].map(([t,e,a])=>U` <label
              >${this.t(a)}<input
                type="number"
                ?disabled=${i}
                step="0.1"
                .value=${String(Math.round(10*e)/10)}
                @change=${e=>{const i=Number(e.target.value);Number.isFinite(i)&&("width_cm"!==t||i>0)&&this.change({[t]:i})}}
            /></label>`)}
      </div>
      <label
        >${this.t("opacity")}<input
          type="range"
          min="0"
          max="1"
          step="0.05"
          .value=${String(e.opacity)}
          @input=${t=>this.change({opacity:Number(t.target.value)})}
      /></label>
    </details>`}static{this.styles=s`
    :host {
      display: block;
      min-width: 0;
    }
    details {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
      padding: 12px;
      margin: 12px 0;
    }
    summary {
      cursor: pointer;
      font-weight: 600;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 10px 0;
      font-size: 12px;
      min-width: 0;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      font: inherit;
      font-size: 16px;
      padding: 7px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 6px;
    }
    input[type='checkbox'] {
      width: auto;
    }
    input[type='range'] {
      padding: 0;
      accent-color: var(--mmwave-primary, #408564);
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .options label {
      flex-direction: row;
      align-items: center;
    }
    .numbers {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 10px;
    }
    canvas {
      display: block;
      width: 100%;
      touch-action: none;
      box-shadow: inset 0 0 0 1px var(--divider-color, #ddd);
      box-sizing: border-box;
      border-radius: 8px;
    }
    button {
      font: inherit;
      font-size: 12px;
      min-height: 36px;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 7px;
      border: 1px solid var(--divider-color, #ddd);
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    p {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
  `}};t([ut({attribute:!1})],Ri.prototype,"hass",void 0),t([gt()],Ri.prototype,"uploading",void 0),t([gt()],Ri.prototype,"uploadError",void 0),t([ut({attribute:!1})],Ri.prototype,"config",void 0),t([ut({type:Number})],Ri.prototype,"roomW",void 0),t([ut({type:Number})],Ri.prototype,"roomD",void 0),t([ut()],Ri.prototype,"lang",void 0),t([gt()],Ri.prototype,"mode",void 0),t([gt()],Ri.prototype,"points",void 0),t([gt()],Ri.prototype,"length",void 0),t([gt()],Ri.prototype,"draft",void 0),t([mt("canvas")],Ri.prototype,"canvas",void 0),Ri=t([ht("mmwave-floorplan-editor")],Ri);var zi={fusion:{rate_hz:10,association_gate_cm:90,merge_gate_cm:70,track_ttl_s:2,confirm_hits:2,min_confirm_sources:2,duplicate_gate_cm:50,range_merge_factor:.08,merge_confirm_s:.6},quality:{min_score:70,min_duration_s:3,min_displacement_cm:120,require_enter_exit:!0,boundary_margin_cm:60},conditional:{track_ttl_s_with_r60abd1:3}};function Ci(t){const e=new Set(t.map(t=>t.id));let i=1;for(;e.has(`radar_${i}`);)i+=1;return`radar_${i}`}const Di=["#0b825c","#03a9f4","#e91e63","#ff9800","#8bc34a","#9c27b0"];let Ai=class extends dt{constructor(){super(...arguments),this.trace=!0,this.traceStatus="",this.floorplanLoaded=()=>{this.isConnected&&this.requestUpdate()},this.roomW=400,this.roomD=600,this.zones=[],this.radars=[],this.lang="en",this.originalId="",this.error=""}_t(t,e){return Ue(t,this.lang,e)}beginNew(){let t=this.zones.length+1;for(;this.zones.some(e=>e.id===`zone_${t}`);)t++;this.originalId="",this.draft={id:`zone_${t}`,name:this._t("zone.zone_p0",{p0:t}),dwell_s:0,polygon:[]},this.error=""}select(t){this.originalId=t.id,this.draft={...t,polygon:t.polygon.map(t=>({...t}))},this.error=""}patch(t){this.draft&&(this.draft={...this.draft,...t})}addPoint(t){if(!this.draft)return;const e=t.currentTarget.getBoundingClientRect();let i={x:Math.round(Math.min(Math.max((t.clientX-e.left)/e.width*this.roomW,0),this.roomW)),y:Math.round(Math.min(Math.max((t.clientY-e.top)/e.height*this.roomD,0),this.roomD))};if(this.trace){const t=Ge(i,this.floorplan,this.roomW,12*this.roomW/e.width);t.point.x>=0&&t.point.x<=this.roomW&&t.point.y>=0&&t.point.y<=this.roomD&&(i=t.point),this.traceStatus=t.unavailable?"trace_unavailable":t.snapped?"trace_snapped":"trace_hint"}this.patch({polygon:[...this.draft.polygon,i]})}undoPoint(){this.draft?.polygon.length&&this.patch({polygon:this.draft.polygon.slice(0,-1)})}save(){if(!this.draft)return;const t=this.draft.id.trim();if(!t)return void(this.error=this._t("zone.zone_id_cannot_be_empty"));if(this.zones.some(e=>e.id===t&&e.id!==this.originalId))return void(this.error=this._t("zone.zone_id_must_be_unique"));if(this.draft.polygon.length<3)return void(this.error=this._t("zone.at_least_three_vertices_are_required"));const e={...this.draft,id:t,name:this.draft.name?.trim()||t},i=this.originalId?this.zones.map(t=>t.id===this.originalId?e:t):[...this.zones,e];this.originalId=t,this.draft=e,this.error="",this.emit(i)}removeZone(){this.originalId&&this.emit(this.zones.filter(t=>t.id!==this.originalId)),this.draft=void 0,this.originalId="",this.error=""}emit(t){this.dispatchEvent(new CustomEvent("zones-changed",{detail:t,bubbles:!0,composed:!0}))}pointString(t){return t.map(t=>`${t.x},${t.y}`).join(" ")}render(){const t=!1!==this.floorplan?.visible&&this.floorplan?ve(this.floorplan.url,this.floorplanLoaded):void 0,e=be(this.floorplan??{},this.roomW),i=this.draft?[...this.zones.filter(t=>t.id!==this.originalId),this.draft]:this.zones;return U`
      <div class="toolbar">
        <div class="zone-tabs">
          ${this.zones.map((t,e)=>U`<button
                type="button"
                class=${this.originalId===t.id?"active":""}
                style="--zone-color:${Di[e%Di.length]}"
                @click=${()=>this.select(t)}
              >
                ${t.name||t.id}
              </button>`)}
        </div>
        <button type="button" class="new" @click=${this.beginNew}>＋ ${this._t("zone.new_zone")}</button>
      </div>
      ${this.floorplan?.url&&!1!==this.floorplan.visible?U`<div class="trace-controls">
              <label
                ><input
                  type="checkbox"
                  .checked=${this.trace}
                  @change=${t=>{this.trace=t.target.checked,this.traceStatus=""}}
                />${this._t("floorplan.trace")}</label
              >
              <small role="status">${this._t("floorplan."+(this.traceStatus||"trace_hint"))}</small>
            </div>`:""}
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
        ${"ready"===t?.status?B`<image
              href=${t.image.src}
              width=${e.width}
              height=${e.width*t.image.naturalHeight/t.image.naturalWidth}
              opacity=${e.opacity}
              transform=${`translate(${e.x} ${e.y}) rotate(${180*e.angle/Math.PI})`}
              pointer-events="none"
            />`:Y}
        <rect width="100%" height="100%" class="background" />
        ${i.map((t,e)=>{const i=this.draft===t,a=Di[e%Di.length];return U`
            ${t.polygon.length>=3?U`<polygon
                    points=${this.pointString(t.polygon)}
                    fill=${a}
                    fill-opacity=${i?".20":".09"}
                    stroke=${a}
                    stroke-width=${i?"3":"2"}
                    vector-effect="non-scaling-stroke"
                  />`:U`<polyline
                    points=${this.pointString(t.polygon)}
                    fill="none"
                    stroke=${a}
                    stroke-width="3"
                    vector-effect="non-scaling-stroke"
                  />`}
            ${t.polygon.map((t,e)=>U`
                <circle
                  cx=${t.x}
                  cy=${t.y}
                  r="7"
                  fill=${a}
                  stroke="white"
                  stroke-width="2"
                  vector-effect="non-scaling-stroke"
                />
                ${i?U`<text x=${t.x} y=${t.y-12} class="point-label">${e+1}</text>`:Y}
              `)}
          `})}
        ${this.radars.map(t=>{const e=t.calibration??{};return U`<g
            class="radar"
            transform=${`translate(${Number(e.radar_x??0)} ${Number(e.radar_y??0)}) rotate(${-Number(e.yaw??0)})`}
          >
            <circle r="11" /><path d="M 0 0 L -12 25 M 0 0 L 12 25" /><text y="-17">${t.id}</text>
          </g>`})}
        <text x="8" y="18" class="axis">0</text>
        <text x=${this.roomW-8} y="18" text-anchor="end" class="axis">X → ${this.roomW}cm</text>
        <text x="8" y=${this.roomD-9} class="axis">Y ↓ ${this.roomD}cm</text>
      </svg>
      ${this.draft?U`
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
                <label class="dwell"
                  >${this._t("zone.dwell_seconds")}<input
                    type="number"
                    min="0"
                    step="1"
                    .value=${String(this.draft.dwell_s??0)}
                    @input=${t=>this.patch({dwell_s:Number(t.target.value)})}
                  /><small class="hint">${this._t("zone.dwell_seconds_help")}</small></label
                >
                <div class="vertex-count">${this.draft.polygon.length} ${this._t("zone.vertices")}</div>
              </div>
              <div class="actions">
                <button type="button" @click=${this.undoPoint} ?disabled=${!this.draft.polygon.length}>
                  ↶ ${this._t("zone.undo_point")}
                </button>
                <button
                  type="button"
                  @click=${()=>this.patch({polygon:[]})}
                  ?disabled=${!this.draft.polygon.length}
                >
                  ${this._t("zone.clear")}
                </button>
                <button type="button" class="danger" @click=${this.removeZone}>
                  ${this.originalId?this._t("zone.delete_zone"):this._t("zone.cancel")}
                </button>
                <button type="button" class="save" @click=${this.save}>${this._t("zone.save_zone")}</button>
              </div>
              ${this.error?U`<div class="error">${this.error}</div>`:Y}
            `:U`<p class="hint">${this._t("zone.select_or_create_a_zone_then")}</p>`}
    `}static{this.styles=s`
    .trace-controls {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      font-size: 12px;
    }
    .trace-controls label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .trace-controls input {
      width: auto;
      accent-color: var(--mmwave-primary, #408564);
    }
    .trace-controls small {
      color: var(--secondary-text-color);
    }

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
    .form-grid label.dwell {
      grid-column: 1 / -1;
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
  `}};function Ei(t,e){return"min_confirm_sources"===t?Math.min(2,Math.max(1,e.length)):"track_ttl_s"===t&&e.some(t=>"r60abd1"===t.radar_model)?zi.conditional.track_ttl_s_with_r60abd1:zi.fusion[t]}function Ti(t,e,i){const a=`${t} ${e}`.toLowerCase();return function(t){const e=[];for(const i of Object.values(Oe)){const a=i?.entity_aliases?.[t];Array.isArray(a)&&e.push(...a.map(t=>String(t).toLowerCase()))}return e}(i).some(t=>a.includes(t))}t([gt()],Ai.prototype,"trace",void 0),t([gt()],Ai.prototype,"traceStatus",void 0),t([ut({attribute:!1})],Ai.prototype,"floorplan",void 0),t([ut({type:Number})],Ai.prototype,"roomW",void 0),t([ut({type:Number})],Ai.prototype,"roomD",void 0),t([ut({attribute:!1})],Ai.prototype,"zones",void 0),t([ut({attribute:!1})],Ai.prototype,"radars",void 0),t([ut({attribute:!1})],Ai.prototype,"lang",void 0),t([gt()],Ai.prototype,"draft",void 0),t([gt()],Ai.prototype,"originalId",void 0),t([gt()],Ai.prototype,"error",void 0),Ai=t([ht("mmwave-zone-editor")],Ai);let Wi=class extends dt{constructor(){super(...arguments),this._devices=[],this._advOpen=!1,this._deviceStatus="idle",this._matchedEntities=0,this._calibrationProfiles=[],this._selectedFusionRadar=0,this._profileStatus="",this._profilesLoaded=!1}updated(t){super.updated(t),t.has("hass")&&this.hass&&0===this._devices.length&&this._loadDevices(),t.has("hass")&&this.hass&&!this._profilesLoaded&&(this._profilesLoaded=!0,this._loadCalibrationProfiles())}async _loadDevices(){try{this._devices=await this.hass.callWS({type:"config/device_registry/list"})}catch(t){console.warn("Failed to load devices",t)}}async _loadCalibrationProfiles(){try{this._calibrationProfiles=await this.hass.callWS({type:"mmwave_fusion/list_calibration_profiles"})}catch(t){console.info("Calibration profiles are not available",t),this._calibrationProfiles=[]}}setConfig(t){this._config={...yt,...t}}_L(t){return Ue(t,this.hass?.language)}_t(t,e){return Ue(t,this.hass?.language,e)}_floorplanSettings(){return U`<mmwave-floorplan-editor
      .hass=${this.hass}
      .config=${this._config.floorplan}
      .roomW=${Number(this._config.room_w??400)}
      .roomD=${Number(this._config.room_d??600)}
      .lang=${this.hass?.language??"en"}
      @floorplan-changed=${t=>{t.stopPropagation(),this._changed("floorplan",t.detail)}}
    ></mmwave-floorplan-editor>`}_changed(t,e){this._config={...this._config,[t]:e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_setMode(t){if("fusion"===t){const t={id:"radar_1",radar_model:"ld2450",device_id:"",calibration:{radar_x:100,radar_y:100,radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}};this._config={...this._config,fusion_id:this._config.fusion_id||"home",sync_backend:!0,radars:this._config.radars?.length?this._config.radars:[t]}}else this._config={...this._config,radars:void 0};this._emitConfig()}_emitConfig(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}_updateFusionRadar(t,e){const i=[...this._config.radars??[]];i[t]={...i[t],...e},this._config={...this._config,radars:i},this._emitConfig()}async _selectFusionRadar(t,e=!1){const i=this._config.radars?.length??0;this._selectedFusionRadar=Math.max(0,Math.min(t,i-1)),e&&(await this.updateComplete,this.renderRoot.querySelector(`[data-radar-tab="${this._selectedFusionRadar}"]`)?.focus())}_fusionRadarTabKeyDown(t,e){const i=this._config.radars?.length??0;if(!i)return;let a;"ArrowRight"===e.key?a=(t+1)%i:"ArrowLeft"===e.key?a=(t-1+i)%i:"Home"===e.key?a=0:"End"===e.key&&(a=i-1),void 0!==a&&(e.preventDefault(),this._selectFusionRadar(a,!0))}_addFusionRadar(){const t=[...this._config.radars??[]],e=t.length+1;t.push({id:Ci(t),radar_model:"ld2450",device_id:"",calibration:{radar_x:Math.round(Number(this._config.room_w??400)*e/(e+1)),radar_y:Math.round(.2*Number(this._config.room_d??600)),radar_z:220,yaw:0,pitch:0,roll:0,polygon:[]}}),this._selectedFusionRadar=t.length-1,this._config={...this._config,radars:t},this._emitConfig()}_removeFusionRadar(t){const e=(this._config.radars??[]).filter((e,i)=>i!==t);var i,a,r;this._config={...this._config,radars:e},this._selectedFusionRadar=(i=this._selectedFusionRadar,a=t,(r=e.length)<=0?0:i>a?i-1:i===a?Math.min(a,r-1):Math.min(i,r-1)),this._emitConfig()}_profileChanged(t,e){const i=e.target.value;if(!i)return void this._updateFusionRadar(t,{calibration_profile_id:void 0,calibration_profile_revision:void 0});const a=this._calibrationProfiles.find(t=>t.profile_id===i);a&&(this._updateFusionRadar(t,{calibration:structuredClone(a.calibration),calibration_profile_id:a.profile_id,calibration_profile_revision:a.revision}),this._profileStatus=this._t("editor.imported_p0_revision_p1",{p0:a.name,p1:a.revision}))}async _fusionDeviceChanged(t,e){const i=e.target.value;if(this._updateFusionRadar(t,{device_id:i}),i)try{const e=await this.hass.callWS({type:"config/entity_registry/list"}),a={};for(const t of e.filter(t=>t.device_id===i)){const e=t.entity_id,i=(t.original_name||e).toLowerCase(),r=e.match(/target_(\d+)_x/),o=e.match(/target_(\d+)_y/),s=e.match(/target_(\d+)_speed/);e.startsWith("binary_sensor.")&&(e.includes("presence")||i.includes("presence"))?a.presence_entity=e:e.startsWith("sensor.")&&(e.includes("target_frame")||i.includes("target frame"))?a.frame_entity=e:r?a[`target_${r[1]}_x_entity`]=e:o?a[`target_${o[1]}_y_entity`]=e:s?a[`target_${s[1]}_speed_entity`]=e:e.startsWith("sensor.")&&(e.endsWith("_x")||i.endsWith(" x"))?a.x_entity=e:e.startsWith("sensor.")&&(e.endsWith("_y")||i.endsWith(" y"))?a.y_entity=e:e.startsWith("sensor.")&&(e.endsWith("_z")||i.endsWith(" z"))&&(a.z_entity=e)}const r=this._calibrationProfiles.find(t=>t.device_id===i);r&&(a.calibration=structuredClone(r.calibration),a.calibration_profile_id=r.profile_id,a.calibration_profile_revision=r.revision,this._profileStatus=this._t("editor.imported_device_calibration_profile_p0",{p0:r.name})),this._updateFusionRadar(t,a)}catch(t){console.warn("Failed to match fusion radar entities",t)}}_updateFusionSetting(t,e){this._changed("fusion",{...this._config.fusion??{},[t]:e})}_updateQualitySetting(t,e){this._changed("quality",{...this._config.quality??{},[t]:e})}_fusionZonesChanged(t){this._changed("zones",t.detail??[])}_patchCameras(t){this._changed("cameras",t)}_addCamera(){this._patchCameras([...this._config.cameras??[],{entity_id:"",event_types:["enter","dwell","traverse"],lookback:5,duration:10,cooldown_s:60}])}_patchCamera(t,e){const i=[...this._config.cameras??[]];i[t]={...i[t],...e},this._patchCameras(i)}_toggleCameraEvent(t,e){const i=this._config.cameras?.[t],a=new Set(i?.event_types??["enter","dwell","traverse"]);a.has(e)?a.delete(e):a.add(e),this._patchCamera(t,{event_types:["enter","dwell","traverse","exit"].filter(t=>a.has(t))})}_toggleCameraZone(t,e){const i=(this._config.zones??[]).map(t=>t.id),a=this._config.cameras?.[t],r=new Set(a?.zones?.length?a.zones:i);r.has(e)?r.delete(e):r.add(e);const o=[...r];this._patchCamera(t,{zones:o.length===i.length?[]:o})}async _deviceDropdownChanged(t){const e=t.target.value;if(this._changed("device_id",e),!e)return this._deviceStatus="idle",void(this._matchedEntities=0);this._deviceStatus="loading";try{const t=(await this.hass.callWS({type:"config/entity_registry/list"})).filter(t=>t.device_id===e),i={};for(const e of t){const t=e.entity_id,a=(e.original_name||t).toLowerCase(),r=t.match(/target_(\d+)_x/),o=t.match(/target_(\d+)_y/),s=t.match(/target_(\d+)_speed/);if(t.startsWith("binary_sensor.")&&(a.includes("presence")||t.includes("presence")))i.presence_entity=t;else if(t.startsWith("sensor.")&&("gesture"===a||t.endsWith("_gesture")))i.gesture_entity=t;else{if(t.startsWith("sensor.")&&(t.includes("gesture")||a.includes("gesture")))continue;t.startsWith("sensor.")&&Ti(t,a,"distance")?i.distance_entity=t:t.startsWith("sensor.")&&Ti(t,a,"motion_state")?(i.motion_state_entity=t,i.target_state_entity=t):r?i[`target_${r[1]}_x_entity`]=t:o?i[`target_${o[1]}_y_entity`]=t:s?i[`target_${s[1]}_speed_entity`]=t:t.startsWith("sensor.")&&(a.endsWith(" x")||t.endsWith("_x")||t.endsWith("radar_x"))&&!t.includes("room_x")&&!a.includes("room x")?i.x_entity=t:t.startsWith("sensor.")&&(a.endsWith(" y")||t.endsWith("_y")||t.endsWith("radar_y"))&&!t.includes("room_y")&&!a.includes("room y")?i.y_entity=t:t.startsWith("sensor.")&&(a.endsWith(" z")||t.endsWith("_z")||t.endsWith("radar_z"))&&!t.includes("room_z")&&!a.includes("room z")?i.z_entity=t:t.startsWith("sensor.")&&(/_(?:breath|breathing|respiration)_(?:rate|value)$/.test(t)||/^(?:breath|breathing|respiration) rate$/.test(a))?i.breath_entity=t:t.startsWith("sensor.")&&(/_heart_rate$/.test(t)||"heart rate"===a)?i.heart_entity=t:t.startsWith("sensor.")&&t.includes("sleep")?i.sleep_entity=t:t.startsWith("text.")&&Ti(t,a,"polygon")&&(i.polygon_entity=t)}}Object.keys(i).length>0&&(this._config={...this._config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))),this._matchedEntities=Object.keys(i).length,this._deviceStatus=this._matchedEntities>0?"success":"error"}catch(t){this._deviceStatus="error",console.warn("Failed to auto-populate entities from device",t)}}_modeSelector(t){return U`
      <div class="mode-switch" role="group" aria-label=${this._t("editor.operating_mode")}>
        <button type="button" class=${"single"===t?"active":""} @click=${()=>this._setMode("single")}>
          ${this._t("editor.single_radar")}
        </button>
        <button type="button" class=${"fusion"===t?"active":""} @click=${()=>this._setMode("fusion")}>
          ${this._t("editor.multi_radar_fusion")}
        </button>
      </div>
    `}_renderFusionEditor(){const t=ce().filter(t=>!de(t.id)?.info.is1DRanging),e=this._config.radars??[],i=Math.max(0,Math.min(this._selectedFusionRadar,e.length-1)),a=e[i],r=a?de(a.radar_model):void 0,o=a?{...r?.getDefaultCalibration()??{},...a.calibration??{},polygon:a.calibration?.polygon??[]}:void 0;return U`
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
        ${this._floorplanSettings()}
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
            ${e.map((t,e)=>U`
                <button
                  id=${`radar-tab-${e}`}
                  data-radar-tab=${e}
                  type="button"
                  role="tab"
                  aria-selected=${e===i?"true":"false"}
                  tabindex=${e===i?"0":"-1"}
                  class=${e===i?"active":""}
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
          ${a&&r&&o?U`
                  <div class="radar-tab-panel" role="tabpanel" aria-labelledby=${`radar-tab-${i}`}>
                    <section class="radar-editor">
                      <header>
                        <span>
                          <strong>${this._t("editor.radar")} ${i+1}</strong>
                          <small>${a.id} · ${r.info.displayName}</small>
                        </span>
                        <button
                          type="button"
                          class="remove-button"
                          ?disabled=${e.length<=1}
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
                            .value=${a.id}
                            @change=${t=>this._updateFusionRadar(i,{id:t.target.value})}
                          />
                        </div>
                        <div class="field compact">
                          <label>${this._L("editor.model")}</label>
                          <select
                            .value=${a.radar_model}
                            @change=${t=>this._updateFusionRadar(i,{radar_model:t.target.value})}
                          >
                            ${t.map(t=>U`<option value=${t.id} ?selected=${t.id===a.radar_model}>
                                  ${t.label}
                                </option>`)}
                          </select>
                        </div>
                      </div>
                      <div class="field">
                        <label>${this._t("editor.radar_device")}</label>
                        <select
                          .value=${a.device_id??""}
                          @change=${t=>this._fusionDeviceChanged(i,t)}
                        >
                          <option value="">-- ${this._t("editor.select_device")} --</option>
                          ${this._devices.map(t=>U`<option value=${t.id} ?selected=${t.id===a.device_id}>
                                ${t.name_by_user||t.name||"Unknown device"}
                              </option>`)}
                        </select>
                      </div>
                      <div class="field profile-field">
                        <label>${this._t("editor.calibration_profile")}</label>
                        <select
                          .value=${a.calibration_profile_id??""}
                          @change=${t=>this._profileChanged(i,t)}
                        >
                          <option value="">${this._t("editor.manual_not_linked")}</option>
                          ${this._calibrationProfiles.filter(t=>t.device_id===a.device_id&&t.radar_model===a.radar_model).map(t=>U`
                                <option
                                  value=${t.profile_id}
                                  ?selected=${t.profile_id===a.calibration_profile_id}
                                >
                                  ${t.name} · ${t.radar_model} · v${t.revision}
                                </option>
                              `)}
                        </select>
                        ${a.calibration_profile_id?U`<small class="profile-badge">
                                ${this._t("editor.device_profile_snapshot")} ·
                                v${a.calibration_profile_revision??"?"}
                              </small>`:Y}
                      </div>
                      ${r?U`
                              <details class="advanced">
                                <summary>${this._t("editor.entity_mapping")}</summary>
                                <div class="advanced-fields">
                                  ${r.getEntitySchema().map(t=>U`
                                      <div class="field">
                                        <label>${this._L(t.labelKey)}${t.required?"":" *"}</label>
                                        <input
                                          type="text"
                                          list="entities-list"
                                          .value=${String(a[t.key]??"")}
                                          @change=${e=>this._updateFusionRadar(i,{[t.key]:e.target.value})}
                                        />
                                      </div>
                                    `)}
                                </div>
                              </details>
                            `:Y}
                    </section>
                  </div>
                `:Y}
        </div>
        ${this._profileStatus?U`<div class="profile-status">${this._profileStatus}</div>`:Y}

        <div class="test-hint">
          <strong>${this._t("workflow.editor_calibration_title")}</strong
          ><span>${this._t("workflow.editor_calibration_hint")}</span>
        </div>
        <h3><span>3</span>${this._t("editor.fusion_and_recording_rules")}</h3>
        <p class="section-help">${this._t("editor.filter_single_radar_false_alarms_and")}</p>
        <div class="rules-grid">
          <div class="field compact">
            <label>${this._t("editor.fusion_rate_hz")}</label>
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              .value=${String(this._config.fusion?.rate_hz??Ei("rate_hz",e))}
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
              .value=${String(this._config.fusion?.association_gate_cm??Ei("association_gate_cm",e))}
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
              .value=${String(this._config.fusion?.confirm_hits??Ei("confirm_hits",e))}
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
              .value=${String(this._config.fusion?.min_confirm_sources??Ei("min_confirm_sources",e))}
              @change=${t=>this._updateFusionSetting("min_confirm_sources",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.merge_distance_cm")}</label>
            <input
              type="number"
              min="20"
              step="5"
              .value=${String(this._config.fusion?.merge_gate_cm??Ei("merge_gate_cm",e))}
              @change=${t=>this._updateFusionSetting("merge_gate_cm",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.track_end_delay_s")}</label>
            <input
              type="number"
              min="0.5"
              step="0.1"
              .value=${String(this._config.fusion?.track_ttl_s??Ei("track_ttl_s",e))}
              @change=${t=>this._updateFusionSetting("track_ttl_s",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.duplicate_gate_cm")}</label>
            <input
              type="number"
              min="0"
              step="5"
              .value=${String(this._config.fusion?.duplicate_gate_cm??Ei("duplicate_gate_cm",e))}
              @change=${t=>this._updateFusionSetting("duplicate_gate_cm",Number(t.target.value))}
            />
            <small>${this._t("editor.duplicate_gate_cm_help")}</small>
          </div>
          <div class="field compact">
            <label>${this._t("editor.range_merge_factor")}</label>
            <input
              type="number"
              min="0"
              step="0.01"
              .value=${String(this._config.fusion?.range_merge_factor??Ei("range_merge_factor",e))}
              @change=${t=>this._updateFusionSetting("range_merge_factor",Number(t.target.value))}
            />
            <small>${this._t("editor.range_merge_factor_help")}</small>
          </div>
          <div class="field compact">
            <label>${this._t("editor.merge_confirm_s")}</label>
            <input
              type="number"
              min="0"
              step="0.1"
              .value=${String(this._config.fusion?.merge_confirm_s??Ei("merge_confirm_s",e))}
              @change=${t=>this._updateFusionSetting("merge_confirm_s",Number(t.target.value))}
            />
            <small>${this._t("editor.merge_confirm_s_help")}</small>
          </div>
          <div class="field compact">
            <label>${this._t("editor.recording_score")}</label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              .value=${String(this._config.quality?.min_score??zi.quality.min_score)}
              @change=${t=>this._updateQualitySetting("min_score",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_duration_s")}</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              .value=${String(this._config.quality?.min_duration_s??zi.quality.min_duration_s)}
              @change=${t=>this._updateQualitySetting("min_duration_s",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.minimum_displacement_cm")}</label>
            <input
              type="number"
              min="20"
              step="10"
              .value=${String(this._config.quality?.min_displacement_cm??zi.quality.min_displacement_cm)}
              @change=${t=>this._updateQualitySetting("min_displacement_cm",Number(t.target.value))}
            />
          </div>
          <div class="field compact">
            <label>${this._t("editor.boundary_margin_cm")}</label>
            <input
              type="number"
              min="10"
              step="10"
              .value=${String(this._config.quality?.boundary_margin_cm??zi.quality.boundary_margin_cm)}
              @change=${t=>this._updateQualitySetting("boundary_margin_cm",Number(t.target.value))}
            />
          </div>
        </div>
        <label class="check-row">
          <input
            type="checkbox"
            .checked=${this._config.quality?.require_enter_exit??zi.quality.require_enter_exit}
            @change=${t=>this._updateQualitySetting("require_enter_exit",t.target.checked)}
          />
          <span>${this._t("editor.record_complete_crossings_only")}</span>
        </label>
        <div class="test-hint">
          <strong>${this._t("editor.recording_test")}</strong>
          <span>
            ${this._t("editor.enter_near_one_room_edge_walk",{p0:this._config.quality?.min_displacement_cm??zi.quality.min_displacement_cm,p1:this._config.fusion?.track_ttl_s??Ei("track_ttl_s",e)})}
          </span>
        </div>

        <h3><span>4</span>${this._t("editor.event_zones_and_cameras")}</h3>
        <p class="section-help">${this._t("editor.draw_polygon_vertices_on_the_floor")}</p>
        <mmwave-zone-editor
          .floorplan=${this._config.floorplan}
          .roomW=${Number(this._config.room_w??400)}
          .roomD=${Number(this._config.room_d??600)}
          .zones=${this._config.zones??[]}
          .radars=${this._config.radars??[]}
          .lang=${this.hass.language}
          @zones-changed=${this._fusionZonesChanged}
        ></mmwave-zone-editor>
        <p class="section-help">${this._t("editor.cameras_help")}</p>
        ${(this._config.cameras??[]).map((t,e)=>{const i=new Set(t.event_types??["enter","dwell","traverse"]),a=new Set(t.zones??[]);return U`
            <div class="camera-card">
              <div class="field compact">
                <label>${this._t("editor.camera_entity")}</label>
                <input
                  list="camera-entities-list"
                  .value=${t.entity_id}
                  @change=${t=>this._patchCamera(e,{entity_id:t.target.value})}
                />
              </div>
              <div class="checks">
                <span>${this._t("editor.keep_media_for")}</span>
                ${["enter","dwell","traverse"].map(t=>U`
                    <label class="check-row">
                      <input
                        type="checkbox"
                        .checked=${i.has(t)}
                        @change=${()=>this._toggleCameraEvent(e,t)}
                      />
                      <span>${t}</span>
                    </label>
                  `)}
              </div>
              ${(this._config.zones??[]).length?U`
                      <div class="checks">
                        <span>${this._t("editor.camera_zones")}</span>
                        ${(this._config.zones??[]).map(t=>U`
                            <label class="check-row">
                              <input
                                type="checkbox"
                                .checked=${0===a.size||a.has(t.id)}
                                @change=${()=>this._toggleCameraZone(e,t.id)}
                              />
                              <span>${t.name||t.id}</span>
                            </label>
                          `)}
                      </div>
                    `:U`<p class="section-help">${this._t("editor.camera_zones_all")}</p>`}
              <div class="rules-grid">
                <div class="field compact">
                  <label>${this._t("editor.lookback_s")}</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    .value=${String(t.lookback??5)}
                    @change=${t=>this._patchCamera(e,{lookback:Number(t.target.value)})}
                  />
                </div>
                <div class="field compact">
                  <label>${this._t("editor.duration_s")}</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    .value=${String(t.duration??10)}
                    @change=${t=>this._patchCamera(e,{duration:Number(t.target.value)})}
                  />
                </div>
                <div class="field compact">
                  <label>${this._t("editor.cooldown_s")}</label>
                  <input
                    type="number"
                    min="0"
                    .value=${String(t.cooldown_s??60)}
                    @change=${t=>this._patchCamera(e,{cooldown_s:Number(t.target.value)})}
                  />
                </div>
              </div>
              <button
                type="button"
                @click=${()=>this._patchCameras((this._config.cameras??[]).filter((t,i)=>i!==e))}
              >
                ${this._t("editor.remove_camera")}
              </button>
            </div>
          `})}
        <button type="button" @click=${this._addCamera}>${this._t("editor.add_camera")}</button>
        <datalist id="camera-entities-list">
          ${Object.keys(this.hass.states).filter(t=>t.startsWith("camera.")).map(t=>U`<option value=${t}></option>`)}
        </datalist>

        <datalist id="entities-list">
          ${Object.keys(this.hass.states).map(t=>U`<option value=${t}></option>`)}
        </datalist>
      </div>
    `}render(){if(!this.hass||!this._config)return Y;const t=this._config.radar_model??"",e=de(t),i=ce();return this._config.radars?.length?this._renderFusionEditor():U` <div class="card-config">
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
          ${i.map(e=>U` <option value=${e.id} ?selected=${e.id===t}>${e.label}</option>`)}
        </select>
      </div>

      <!-- Device selector -->
      <h3><span>2</span>${this._t("editor.connect_radar_device")}</h3>
      <p class="section-help">${this._t("editor.select_the_radar_from_home_assistant")}</p>
      <div class="field">
        <label>${this._t("editor.radar_device_2")}</label>
        <select .value=${this._config.device_id??""} @change=${this._deviceDropdownChanged}>
          <option value="">-- 选择设备 (Select Device) --</option>
          ${this._devices.map(t=>U` <option value=${t.id} ?selected=${t.id===this._config.device_id}>
                ${t.name_by_user||t.name||"Unknown Device"}
              </option>`)}
        </select>
      </div>
      ${"idle"!==this._deviceStatus?U`<div class="match-status ${this._deviceStatus}">
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

      ${this._floorplanSettings()}
      <!-- Entity fields (model-specific) -->
      ${e?U` <details
              class="advanced"
              ?open=${this._advOpen}
              @toggle=${t=>this._advOpen=t.target.open}
            >
              <summary>
                <span>${this._t("editor.advanced_assign_entities_manually")}</span>
                <small>${this._t("editor.troubleshooting")}</small>
              </summary>
              <div class="advanced-fields">
                ${e.getEntitySchema().map(t=>U` <div class="field">
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
        ${(this.hass?Object.keys(this.hass.states):[]).map(t=>U`<option value=${t}></option>`)}
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
    .camera-card {
      display: grid;
      gap: 8px;
      margin: 8px 0;
      padding: 10px;
      border: 1px solid var(--mmwave-line);
      border-radius: 12px;
    }
    .checks {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .camera-card .check-row {
      margin-top: 0;
      padding: 6px 8px;
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
  `}};t([ut({attribute:!1})],Wi.prototype,"hass",void 0),t([ut({attribute:!1})],Wi.prototype,"_config",void 0),t([gt()],Wi.prototype,"_devices",void 0),t([gt()],Wi.prototype,"_advOpen",void 0),t([gt()],Wi.prototype,"_deviceStatus",void 0),t([gt()],Wi.prototype,"_matchedEntities",void 0),t([gt()],Wi.prototype,"_calibrationProfiles",void 0),t([gt()],Wi.prototype,"_selectedFusionRadar",void 0),t([gt()],Wi.prototype,"_profileStatus",void 0),Wi=t([ht(Ye)],Wi);var Pi=Object.freeze({__proto__:null,get MMWaveCardEditor(){return Wi}});export{Si as MMWaveCard};
