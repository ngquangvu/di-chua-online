import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const root=document.querySelector('#game');
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x9b9a83); scene.fog=new THREE.Fog(0x777365,24,65);
const camera=new THREE.PerspectiveCamera(53,innerWidth/innerHeight,.1,120); camera.position.set(0,8,17);
const renderer=new THREE.WebGLRenderer({antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.25; root.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement); controls.target.set(0,2,0); controls.enableDamping=true; controls.enablePan=false; controls.minDistance=8; controls.maxDistance=25; controls.maxPolarAngle=Math.PI*.48; controls.minPolarAngle=.18;
scene.add(new THREE.HemisphereLight(0xe8d9b6,0x403327,2.0)); const sun=new THREE.DirectionalLight(0xffe4b2,2.3); sun.position.set(-8,15,9); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048); scene.add(sun);
const mat=(c,r=.85,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const wood=mat(0x38271d),wood2=mat(0x563a28),dark=mat(0x211913),wall=mat(0x817966),floorMat=mat(0x30271f),gold=mat(0xc99a43,.42,.55),robe=mat(0xe7e1c8),saffron=mat(0xc7a64c),skin=mat(0xe5b98e),jade=mat(0x718a70);
function box(parent,w,h,d,material,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function cyl(parent,rt,rb,h,material,x,y,z,seg=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function sphere(parent,r,material,x,y,z,scale=1){const o=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),material);o.position.set(x,y,z);o.scale.setScalar(scale);o.castShadow=true;parent.add(o);return o}
// floor and raised altar
box(scene,34,.35,32,floorMat,0,-.25,0);
for(let x=-16;x<=16;x+=2)for(let z=-14;z<=14;z+=2){const tile=box(scene,1.92,.025,1.92,mat((Math.floor(x/2+z/2)%2===0)?0x45372c:0x3b3027),x,-.055,z);tile.castShadow=false}
// back wall and side walls
box(scene,34,10,.55,wall,0,4.8,-15.5);box(scene,.55,10,31,wall,-17,4.8,0);box(scene,.55,10,31,wall,17,4.8,0);
// dark beams and pillars
for(let x=-15;x<=15;x+=7.5){box(scene,.72,9,.72,wood,x,4.45,-14.8);box(scene,.72,9,.72,wood,x,4.45,12.5);box(scene,.72,.7,31,wood,x,9.1,-1)}
for(let z=-13;z<=12;z+=8){box(scene,34,.55,.55,wood,0,8.9,z)}
box(scene,34,.65,.65,dark,0,9.65,-1);for(let x=-16;x<=16;x+=1.2)box(scene,.08,.25,30,wood2,x,9.3,-1);
// windows with lattice on both sides
for(const side of [-1,1]){for(let z=-11;z<=10;z+=7){box(scene,.12,3.1,5.4,dark,side*16.65,5.8,z);box(scene,.18,2.8,5.1,mat(0x829071),side*16.5,5.8,z);for(let y=4.5;y<=7.2;y+=.55)box(scene,.2,.08,5.2,wood2,side*16.35,y,z);for(let zz=z-2.2;zz<=z+2.2;zz+=.55)box(scene,.2,2.8,.08,wood2,side*16.35,5.8,zz)}}
// altar platform, backdrop, decorative mandala
box(scene,7,.55,2.4,wood2,0,.2,-11.8);box(scene,6.8,.25,1.9,gold,0,.6,-11.8);
box(scene,10,6,.22,mat(0x39251e),0,5,-15.12);
const halo=sphere(scene,2.15,mat(0xb28a39,.5,.2),0,5.3,-14.82);halo.scale.set(1,1,.08);
for(let i=0;i<24;i++){const a=i*Math.PI/12;const p=sphere(scene,.12,gold,Math.cos(a)*2.45,5.3+Math.sin(a)*2.45,-14.7);p.scale.set(1,1,.35)}
// seated Buddha stylized, calm silhouette
cyl(scene,.72,.9,.65,gold,0,1.3,-12.3,20);sphere(scene,.75,gold,0,2.3,-12.3);sphere(scene,.48,gold,0,3.2,-12.3);sphere(scene,.43,mat(0xd8ad52,.45,.35),0,3.45,-12.3,.8);
// ushnisha + urna and robe front
sphere(scene,.16,gold,0,3.82,-12.3);sphere(scene,.045,mat(0x7b4426),0,3.46,-11.88);
const robeB=new THREE.Mesh(new THREE.SphereGeometry(.9,20,16),mat(0xd4a64c));robeB.scale.set(1.1,.65,.65);robeB.position.set(0,2.45,-11.72);scene.add(robeB);
// lotus pedestal
for(let i=0;i<12;i++){const a=i*Math.PI/6;const p=sphere(scene,.22,mat(0xe3c77b),Math.cos(a)*.85,.85,-12.2+Math.sin(a)*.35);p.scale.set(.7,.3,1)}
// hanging lanterns
for(let x=-12;x<=12;x+=6){for(let z=-8;z<=6;z+=7){cyl(scene,.28,.35,.65,mat(0x9d3e24),x,7.2,z,10);cyl(scene,.33,.33,.1,gold,x,7.58,z,10);const bulb=new THREE.PointLight(0xffbd6b,.8,6);bulb.position.set(x,6.8,z);scene.add(bulb)}}
// cushions and worshippers arranged in rows
const cushionMat=mat(0x77766b),cushionGold=mat(0xb7a77d);
function makeMonk(x,z,isPlayer=false){const g=new THREE.Group();scene.add(g);const robeM=isPlayer?mat(0xe8e0c7):robe;const body=new THREE.Mesh(new THREE.CapsuleGeometry(.22,.55,4,8),robeM);body.position.y=.75;body.castShadow=true;g.add(body);const head=sphere(g,.27,skin,0,1.35,0);head.scale.set(1,.92,.94);cyl(g,.08,.09,.34,mat(0xd6d0bc),0,.36,0,8);const armMat=robeM;for(const s of [-1,1]){const arm=cyl(g,.095,.11,.55,armMat,s*.28,.83,0,8);arm.rotation.z=s*.28}
if(isPlayer){g.userData.isPlayer=true;const scarf=box(g,.34,.28,.04,saffron,0,.78,.22);scarf.rotation.z=-.1}
else {const sash=box(g,.28,.34,.035,saffron,0,.72,.22);sash.rotation.z=.04}
return g}
const monks=[];for(let row=0;row<6;row++){for(let col=-5;col<=5;col++){if(Math.random()<.16)continue;const x=col*2.25+(Math.random()-.5)*.3,z=7-row*3.05+(Math.random()-.5)*.5;const c=box(scene,.95,.12,.85,cushionMat,x,.05,z);c.castShadow=false;const m=makeMonk(x,z);m.rotation.y=Math.PI+(Math.random()-.5)*.15;monks.push(m)}}
// player starts foreground
const player=makeMonk(0,10,true);player.position.y=0;player.rotation.y=Math.PI;
// a few small candle altars
for(let x of [-8,-4,4,8]){box(scene,1,.55,.8,wood2,x,.2,-8);cyl(scene,.12,.12,.45,mat(0xe7d5a2),x,.7,-8);const flame=sphere(scene,.09,mat(0xffc15a),x,.98,-8);flame.scale.set(.6,1.5,.6)}
// subtle tree shapes visible outside side windows
for(let side of [-1,1])for(let i=0;i<10;i++){const t=cyl(scene,.12,.2,3,wood2,side*(18+Math.random()*2),1.2,-12+i*2.5);const crown=sphere(scene,1.15,mat(0x526a45),side*18,3.4,-12+i*2.5);crown.scale.set(1,1.2,1)}

const keys={};addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault()});addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
let merit=0,lotus=12,actionBusy=false;const done={};let toastTimer;
function toast(s){const el=document.querySelector('#toast');el.textContent=s;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500)}
function updateStats(){document.querySelector('#merit').textContent=merit;document.querySelector('#lotus').textContent=lotus;document.querySelector('#progressText').textContent=`${merit%100} / 100`;document.querySelector('#progressBar').style.width=(merit%100)+'%'}
function complete(id,points,msg){if(!done[id]){done[id]=true;merit+=points;lotus+=1;updateStats();const el=document.querySelector(id==='bow'?'#questBow':id==='meditate'?'#questMeditate':'#questBeads');if(el)el.textContent='✓';toast(msg+` · +${points} công đức, +1 hoa sen`)}else toast(msg)}
function doAction(id){if(actionBusy)return;actionBusy=true;const messages={bow:'Bạn chắp tay, cúi đầu lễ Phật.',meditate:'Bạn ngồi xuống, thở chậm và tĩnh tâm.',beads:'Bạn nhẹ nhàng lần từng hạt chuỗi.',incense:'Một nén hương lòng được dâng lên.',bell:'Tiếng chuông ngân vang giữa chính điện.'};document.querySelector('#interaction').textContent=messages[id]||'An nhiên';
if(id==='bow'){player.rotation.x=-.65;complete(id,10,'Lễ Phật thành tâm')}else if(id==='meditate'){player.rotation.x=0;player.position.y=-.22;complete(id,15,'Đã hoàn thành thời thiền')}else if(id==='beads'){complete(id,8,'Một vòng tràng hạt an lành')}else if(id==='incense'){complete(id,5,'Đã dâng hương')}else if(id==='bell'){complete(id,5,'Tiếng chuông an lạc')}
setTimeout(()=>{player.rotation.x=0;player.position.y=0;actionBusy=false;document.querySelector('#interaction').textContent='Đang ở chính điện · Hãy chọn một hoạt động'},1800)}
document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>doAction(b.dataset.action)));
document.querySelector('#editName').onclick=()=>{document.querySelector('#nameModal').classList.remove('hidden');document.querySelector('#nameInput').value=document.querySelector('#playerName').textContent};
document.querySelector('#startBtn').onclick=()=>{const n=document.querySelector('#nameInput').value.trim()||'Thiện Tâm';document.querySelector('#playerName').textContent=n;document.querySelector('#welcome').textContent='🙏 Chào mừng '+n+' đến với Chùa An Nhiên';document.querySelector('#nameModal').classList.add('hidden');toast('Nam mô · Chúc bạn một ngày an nhiên')};
document.querySelector('#closeActions').onclick=()=>document.querySelector('.right-panel').classList.toggle('collapsed');
let soundOn=false;document.querySelector('#soundBtn').onclick=()=>{soundOn=!soundOn;document.querySelector('#soundBtn').textContent=soundOn?'♫':'♪';toast(soundOn?'Âm thanh đã bật (nhạc nền sẽ được bổ sung)':'Đã tắt âm thanh')};
function move(dir){const speed=.28;if(dir==='forward')player.position.z-=speed;if(dir==='back')player.position.z+=speed;if(dir==='left')player.position.x-=speed;if(dir==='right')player.position.x+=speed;player.position.x=THREE.MathUtils.clamp(player.position.x,-14,14);player.position.z=THREE.MathUtils.clamp(player.position.z,-8,13);const offset=new THREE.Vector3(player.position.x,2,player.position.z);controls.target.lerp(offset,.08)}
document.querySelectorAll('[data-move]').forEach(b=>{const dir=b.dataset.move;b.addEventListener('pointerdown',e=>{e.preventDefault();keys['mobile-'+dir]=true});b.addEventListener('pointerup',()=>keys['mobile-'+dir]=false);b.addEventListener('pointerleave',()=>keys['mobile-'+dir]=false)});
let last=performance.now();function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/16.67,2);last=now;const speed=.16*dt;if(keys.w||keys.arrowup||keys['mobile-forward'])move('forward');if(keys.s||keys.arrowdown||keys['mobile-back'])move('back');if(keys.a||keys.arrowleft||keys['mobile-left'])move('left');if(keys.d||keys.arrowright||keys['mobile-right'])move('right');for(const m of monks){m.position.y=Math.sin(now*.001+m.position.x)*.012}controls.update();renderer.render(scene,camera)}requestAnimationFrame(animate);
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
document.querySelector('#online').textContent=38+Math.floor(Math.random()*24);
