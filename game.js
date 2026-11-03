import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const root=document.querySelector('#game');
const scene=new THREE.Scene(); scene.background=new THREE.Color(0x728064); scene.fog=new THREE.Fog(0x777365,34,85);
const camera=new THREE.PerspectiveCamera(49,innerWidth/innerHeight,.1,140); camera.position.set(0,8.2,19);
const renderer=new THREE.WebGLRenderer({antialias:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.25; root.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement); controls.target.set(0,3.0,-2.0); controls.enableDamping=true; controls.enablePan=false; controls.minDistance=9; controls.maxDistance=30; controls.maxPolarAngle=Math.PI*.48; controls.minPolarAngle=.18;
scene.add(new THREE.HemisphereLight(0xffe9c9,0x33251a,1.45)); const sun=new THREE.DirectionalLight(0xffd89a,3.0); sun.position.set(-8,15,9); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048); scene.add(sun);
const mat=(c,r=.85,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const wood=mat(0x38271d),wood2=mat(0x563a28),dark=mat(0x211913),wall=mat(0x817966),floorMat=mat(0x30271f),gold=mat(0xc99a43,.42,.55),robe=mat(0xe7e1c8),saffron=mat(0xc7a64c),skin=mat(0xe5b98e),jade=mat(0x718a70);
function box(parent,w,h,d,material,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function cyl(parent,rt,rb,h,material,x,y,z,seg=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function sphere(parent,r,material,x,y,z,scale=1){const o=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),material);o.position.set(x,y,z);o.scale.setScalar(scale);o.castShadow=true;parent.add(o);return o}
// Polished dark timber floor with long planks and subtle grain seams
const floorWood=[0x38251b,0x422b1e,0x4a3021,0x352319,0x503524].map(c=>mat(c,.48));
box(scene,34,.35,32,floorMat,0,-.25,0);
for(let z=-15;z<=15;z+=.62){
  const plank=box(scene,33.8,.035,.59,floorWood[Math.abs(Math.floor(z*7))%floorWood.length],0,-.055,z);plank.castShadow=false;
  for(let x=-16;x<=16;x+=5.5){const seam=box(scene,.025,.008,.57,mat(0x241811),x,-.032,z);seam.castShadow=false;}
}
// back wall and side walls
box(scene,34,10,.55,wall,0,4.8,-15.5);box(scene,.55,10,31,wall,-17,4.8,0);box(scene,.55,10,31,wall,17,4.8,0);
// dark beams and pillars
for(let x=-15;x<=15;x+=7.5){box(scene,.72,9,.72,wood,x,4.45,-14.8);box(scene,.72,9,.72,wood,x,4.45,12.5);box(scene,.72,.7,31,wood,x,9.1,-1)}
for(let z=-13;z<=12;z+=8){box(scene,34,.55,.55,wood,0,8.9,z)}
box(scene,34,.65,.65,dark,0,9.65,-1);for(let x=-16;x<=16;x+=1.2)box(scene,.08,.25,30,wood2,x,9.3,-1);
// windows with lattice on both sides
for(const side of [-1,1]){for(let z=-11;z<=10;z+=7){box(scene,.12,3.1,5.4,dark,side*16.65,5.8,z);box(scene,.18,2.8,5.1,mat(0x829071),side*16.5,5.8,z);for(let y=4.5;y<=7.2;y+=.55)box(scene,.2,.08,5.2,wood2,side*16.35,y,z);for(let zz=z-2.2;zz<=z+2.2;zz+=.55)box(scene,.2,2.8,.08,wood2,side*16.35,5.8,zz)}}
// Raised altar and a richly detailed brocade mural behind the Buddha
box(scene,9,.45,2.8,wood2,0,.22,-11.9);box(scene,8.6,.22,2.2,gold,0,.58,-11.9);
box(scene,11,6.5,.28,mat(0x241710),0,5.15,-15.12);
function createMuralTexture(){
 const c=document.createElement('canvas');c.width=1400;c.height=820;const g=c.getContext('2d');
 const bg=g.createLinearGradient(0,0,1400,820);bg.addColorStop(0,'#241b16');bg.addColorStop(.5,'#493022');bg.addColorStop(1,'#1e211c');g.fillStyle=bg;g.fillRect(0,0,1400,820);
 for(let i=0;i<2200;i++){g.fillStyle=i%3?'rgba(218,166,77,.10)':'rgba(55,117,100,.13)';g.beginPath();g.arc(Math.random()*1400,Math.random()*820,Math.random()*2+.3,0,Math.PI*2);g.fill();}
 function lotus(x,y,r,color){for(let k=0;k<12;k++){const a=k*Math.PI/6;g.save();g.translate(x,y);g.rotate(a);g.fillStyle=color;g.beginPath();g.ellipse(0,-r*.55,r*.19,r*.57,0,0,Math.PI*2);g.fill();g.restore();}g.fillStyle='#dfbd70';g.beginPath();g.arc(x,y,r*.15,0,Math.PI*2);g.fill();}
 for(let x=35;x<1400;x+=70){lotus(x,42,23,'#b58a43');lotus(x,778,23,'#a77a3b');}
 for(let y=110;y<760;y+=95){lotus(40,y,24,'#477c70');lotus(1360,y,24,'#477c70');}
 const cx=700,cy=395;
 for(let r=300;r>90;r-=34){g.strokeStyle=r%2?'#b88c45':'#4e8370';g.lineWidth=5;g.beginPath();g.arc(cx,cy,r,0,Math.PI*2);g.stroke();}
 for(let k=0;k<48;k++){const a=k*Math.PI/24;g.save();g.translate(cx,cy);g.rotate(a);g.fillStyle=k%2?'rgba(196,151,69,.7)':'rgba(73,132,112,.75)';g.beginPath();g.ellipse(0,-245,16,53,0,0,Math.PI*2);g.fill();g.restore();}
 lotus(cx,cy,110,'#d6ae59');
 for(const side of [-1,1]){for(let i=0;i<9;i++){const x=cx+side*(220+i*45),y=145+(i%3)*220;g.strokeStyle=i%2?'#c18d43':'#47816d';g.lineWidth=8;g.beginPath();g.moveTo(x,y+70);g.bezierCurveTo(x-side*95,y-10,x+side*95,y-70,x,y-120);g.stroke();lotus(x,y,35,i%2?'#b78a45':'#477d6d');}
  g.fillStyle='rgba(197,157,91,.9)';g.beginPath();g.ellipse(cx+side*350,cy-5,48,100,side*.25,0,Math.PI*2);g.fill();g.fillStyle='#d8b67b';g.beginPath();g.arc(cx+side*350,cy-125,37,0,Math.PI*2);g.fill();g.strokeStyle='#c79a4e';g.lineWidth=13;g.beginPath();g.arc(cx+side*350,cy-125,55,Math.PI,Math.PI*2);g.stroke();}
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;return tex;
}
const muralMat=new THREE.MeshStandardMaterial({map:createMuralTexture(),roughness:.92});box(scene,10.5,6.2,.06,muralMat,0,5.1,-14.92);
// Ornate halo with engraved rings and lotus rays
const haloMat=mat(0xd3a64e,.38,.48),haloDark=mat(0x8d642b,.55,.25);
const halo=sphere(scene,2.2,haloDark,0,5.15,-14.68);halo.scale.set(1.08,1.08,.075);
const haloRing=new THREE.Mesh(new THREE.TorusGeometry(2.12,.075,12,96),haloMat);haloRing.position.set(0,5.15,-14.57);scene.add(haloRing);
for(let i=0;i<32;i++){const a=i*Math.PI/16;const ray=box(scene,.045,.65,.035,haloMat,Math.cos(a)*2.48,5.15+Math.sin(a)*2.48,-14.55);ray.rotation.z=-a;}
// More lifelike seated Buddha: layered anatomy, robe, elongated ears, curled hair and calm face
const buddha=new THREE.Group();buddha.position.set(0,0,-12.65);scene.add(buddha);
const goldSkin=new THREE.MeshStandardMaterial({color:0xd5a343,metalness:.72,roughness:.29});
const goldLight=new THREE.MeshStandardMaterial({color:0xf0c66e,metalness:.68,roughness:.25});
const shadowGold=mat(0x986a2c,.48,.55);
cyl(buddha,1.18,1.32,.42,shadowGold,0,.68,0,48);cyl(buddha,1.05,1.18,.22,goldLight,0,.98,0,48);
for(let i=0;i<16;i++){const a=i*Math.PI/8;const petal=sphere(buddha,.3,goldLight,Math.cos(a)*1.02,1.12,Math.sin(a)*.43);petal.scale.set(.72,.42,1.25);petal.rotation.y=-a;}
cyl(buddha,.83,.9,.25,shadowGold,0,1.32,0,40);
const lower=new THREE.Mesh(new THREE.SphereGeometry(1,48,32),goldSkin);lower.scale.set(1.05,.52,.72);lower.position.set(0,1.72,.03);buddha.add(lower);
for(const side of [-1,1]){const leg=new THREE.Mesh(new THREE.SphereGeometry(1,40,28),goldSkin);leg.scale.set(.92,.27,.48);leg.position.set(side*.48,1.55,.35);leg.rotation.z=side*.12;buddha.add(leg);}
const torso=new THREE.Mesh(new THREE.SphereGeometry(1,48,36),goldSkin);torso.scale.set(.72,1.02,.52);torso.position.set(0,2.55,-.02);buddha.add(torso);
const shoulders=new THREE.Mesh(new THREE.SphereGeometry(1,40,28),goldSkin);shoulders.scale.set(.9,.43,.48);shoulders.position.set(0,3.18,-.02);buddha.add(shoulders);
// Robe folds as fine curved golden lines across the chest
const robeMat=new THREE.MeshStandardMaterial({color:0xc18a35,metalness:.58,roughness:.4,side:THREE.DoubleSide});
const robeShape=new THREE.Shape();robeShape.moveTo(-.68,3.15);robeShape.quadraticCurveTo(-.25,3.55,.45,3.35);robeShape.quadraticCurveTo(.78,2.55,.55,1.9);robeShape.quadraticCurveTo(.15,2.2,-.2,2.35);robeShape.quadraticCurveTo(-.58,2.55,-.68,3.15);
const robeMesh=new THREE.Mesh(new THREE.ShapeGeometry(robeShape,32),robeMat);robeMesh.position.z=.48;buddha.add(robeMesh);
for(let i=0;i<5;i++){const pts=[];for(let j=0;j<=20;j++){const t=j/20;pts.push(new THREE.Vector3(-.52+t*1.04,3.05-i*.16+Math.sin(t*Math.PI)*.06,.49));}const curve=new THREE.CatmullRomCurve3(pts);buddha.add(new THREE.Mesh(new THREE.TubeGeometry(curve,24,.012,6,false),goldLight));}
cyl(buddha,.29,.34,.35,goldSkin,0,3.35,0,32);
const head=new THREE.Mesh(new THREE.SphereGeometry(.48,48,40),goldSkin);head.scale.set(.82,1.08,.83);head.position.set(0,3.92,0);buddha.add(head);
for(const side of [-1,1]){const ear=sphere(buddha,.14,goldLight,side*.4,3.88,0);ear.scale.set(.72,1.55,.55);}
const hairMat=mat(0x50351e,.62,.32);const hair=sphere(buddha,.405,hairMat,0,4.27,-.025);hair.scale.set(.83,.62,.82);
for(let i=0;i<95;i++){const y=3.99+Math.random()*.48,a=Math.random()*Math.PI*2,rr=.37*Math.sqrt(Math.max(.05,1-Math.pow((y-4.22)/.55,2)));const curl=sphere(buddha,.035,goldLight,Math.cos(a)*rr,y,Math.sin(a)*rr-.015);curl.scale.set(1,.85,1);}
const ushnisha=sphere(buddha,.13,goldLight,0,4.62,0);ushnisha.scale.set(.8,1.3,.8);
const faceDark=mat(0x775020,.62,.25);
for(const side of [-1,1]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.055,16,12),faceDark);eye.scale.set(1,.28,.35);eye.position.set(side*.155,3.98,.393);buddha.add(eye);}
const nose=new THREE.Mesh(new THREE.ConeGeometry(.055,.19,12),goldLight);nose.position.set(0,3.91,.43);nose.rotation.x=-.25;buddha.add(nose);
const mouth=new THREE.Mesh(new THREE.TorusGeometry(.075,.012,6,24,Math.PI),faceDark);mouth.position.set(0,3.79,.425);mouth.rotation.z=Math.PI;buddha.add(mouth);
const palm=sphere(buddha,.28,goldLight,0,2.04,.57);palm.scale.set(1.35,.32,.62);
for(let i=-2;i<=2;i++){const finger=cyl(buddha,.045,.055,.27,goldSkin,i*.095,1.98,.68,10);finger.rotation.z=i*.12;}
for(const side of [-1,1]){cyl(scene,.22,.3,.48,gold,side*2.1,1.05,-11.4,20);for(let i=0;i<5;i++){const petal=sphere(scene,.13,mat(i%2?0xe8d9bb:0xd49b83),side*2.1+Math.cos(i*1.25)*.22,1.52+Math.sin(i*1.25)*.12,-11.4+Math.sin(i*1.25)*.18);petal.scale.set(.7,1.8,.7);}}
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
