import {QUESTIONS,TYPES,calculate} from './data.js';
const $=id=>document.getElementById(id);const values=['まったくない','あまりない','ときどきある','よくある'];let position=0;let answers={};let result=null;let mode='patient';
const picture=id=>`./assets/${id}.png`;
function setMode(next){mode=next;for(const [id,value] of [['patientMode','patient'],['expertMode','expert']]){$(id).classList.toggle('selected',value===next);$(id).setAttribute('aria-pressed',String(value===next));}$('modeExplain').textContent=next==='expert'?'弁証の補助情報は認証後に表示。問診のみで確定しません。':'セルフケアと体質傾向をやさしく紹介します。';$('proSection').classList.toggle('hidden',next!=='expert');}
$('patientMode').addEventListener('click',()=>setMode('patient'));$('expertMode').addEventListener('click',()=>setMode('expert'));
for(const t of TYPES){const card=document.createElement('div');card.className='mascot-card';const im=document.createElement('img');im.src=picture(t.id);im.alt=`${t.name}のキャラクター試作`;im.loading='lazy';const name=document.createElement('strong');name.textContent=t.name;card.append(im,name);$('gallery').append(card);}setMode('patient');
function show(name){for(const id of ['intro','quiz','result'])$(id).classList.toggle('hidden',id!==name);window.scrollTo({top:0,behavior:'smooth'});}
function render(){const q=QUESTIONS[position];$('progressText').textContent=`${position+1} / ${QUESTIONS.length}`;$('progressBar').style.width=`${(position+1)/QUESTIONS.length*100}%`;$('questionText').textContent=q.text;$('back').disabled=position===0;$('choices').replaceChildren();values.forEach((v,i)=>{const b=document.createElement('button');b.className='choice';b.textContent=v;b.addEventListener('click',()=>{answers[q.id]=i;if(position<QUESTIONS.length-1){position++;render();}else finish();});$('choices').append(b);});}
function finish(){
 result=calculate(answers);
 const t=result.primary;
 const best=result.ordered.filter(x=>x.score===t.score);
 const isTie=best.length>1;
 const isZero=t.score===0;
 $('tieGallery').replaceChildren();
 $('tieGallery').classList.toggle('hidden',!isTie||isZero);
 $('singleHero').classList.toggle('hidden',isTie||isZero);
 if(isZero){
   $('resultStatus').textContent='今回の回答では8体質の質問すべてが「まったくない」でした。特定の傾向を示す根拠はありません。';
   $('resultTitle').textContent='目立つ傾向はありません';
 }else if(isTie){
   $('resultStatus').textContent=`${best.length}つの傾向が同点（各 ${t.score}/6）です。1つを主タイプと決めず、並列に紹介します。点数は医療的な判定ではありません。`;
   $('resultTitle').textContent='複数タイプの傾向';
   best.forEach(x=>{const card=document.createElement('div');card.className='tie-card';const img=document.createElement('img');img.src=picture(x.id);img.alt=`${x.name}のキャラクター`;const name=document.createElement('strong');name.textContent=`${x.name} ${x.score}/6`;card.append(img,name);$('tieGallery').append(card);});
 }else{
   $('resultStatus').textContent=`${t.name}が最多（${t.score}/6）でした。ただし質問への回答を集計した参考結果であり、病名や証を確定するものではありません。`;
   $('resultTitle').textContent=`${t.name} 傾向`;
 }
 $('resultMascot').src=picture(t.id);
 $('resultMascot').alt=`${t.name}のキャラクター`;
 $('resultLead').textContent=`${t.desc}が相対的に目立ちました。これは質問への回答を単純集計した結果で、医学的な診断ではありません。`;
 const others=result.ordered.filter(x=>!best.some(b=>b.id===x.id)).slice(0,3);
 $('secondaryText').textContent=isZero?'今回の回答では、目立った傾向を確認できませんでした。':others.length?others.map(x=>`${x.name}（${x.score}/6）`).join('、')+'。複数の傾向が重なることもあります。':'すべての体質が同点です。';
 $('scoreList').replaceChildren();
 result.ordered.forEach(s=>{const row=document.createElement('div');row.className='score';const name=document.createElement('span');name.textContent=s.name;const num=document.createElement('span');num.textContent=`${s.score} / 6`;row.append(name,num);const bar=document.createElement('div');bar.className='bar';const inner=document.createElement('div');inner.style.width=`${s.percentage}%`;bar.append(inner);$('scoreList').append(row,bar);});
 $('elementText').textContent=isZero?'今回の回答から五行の傾向は推定しません。':isTie?`同点タイプに対応する伝統的な五行の参考：${[...new Set(best.map(x=>x.element))].join('・')}。体質から五臓の病気は判断できません。`:`${t.name}と関連づける五行：${t.element}。この対応は概念を理解するための参考です。`;
 $('careText').textContent=isZero?'無理に体質を決めず、日頃の休養・睡眠・食事を大切にしてください。':isTie?'複数の傾向があります。負担のない軽い運動・規則的な休養など共通する生活習慣から始めましょう。':t.care;
 $('pointName').textContent=isTie||isZero?'ツボ押しは希望に応じて：参考情報のみ':`セルフケアの参考：${t.point}（${t.code}）`;
 $('pointWhere').textContent=isTie||isZero?'同点や根拠が乏しい結果から、特定のツボを推奨しません。':t.where;
 $('proOutput').classList.add('hidden');$('proStatus').textContent='';$('proSection').classList.toggle('hidden',mode!=='expert');show('result');
}
$('start').addEventListener('click',()=>{position=0;answers={};show('quiz');render();});$('back').addEventListener('click',()=>{if(position>0){position--;render();}});$('reset').addEventListener('click',()=>{position=0;answers={};show('intro');});
$('proButton').addEventListener('click',async()=>{if(!result)return;const btn=$('proButton');btn.disabled=true;$('proStatus').textContent='情報を確認しています…';$('proOutput').classList.add('hidden');try{const response=await fetch('/.netlify/functions/pro',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:result.primary.id,accessKey:$('accessKey').value})});const data=await response.json();if(!response.ok)throw new Error(data.error||`通信エラー ${response.status}`);const box=$('proOutput');box.replaceChildren();for(const [label,value] of [['弁証候補',data.pattern],['追加確認事項',data.reason],['参考経穴',data.acupoints.map(x=>`${x.name}（${x.code}）：${x.reason}`).join('、')],['注意',data.notes]]){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+'：';p.append(strong,document.createTextNode(value));box.append(p);}box.classList.remove('hidden');$('proStatus').textContent='表示しました。';}catch(e){$('proStatus').textContent=e.message;}finally{btn.disabled=false;}});
$('feedbackForm').addEventListener('submit',async e=>{e.preventDefault();const form=e.currentTarget;const status=$('feedbackStatus');status.textContent='送信中…';const body=new URLSearchParams(new FormData(form));try{const res=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()});if(!res.ok)throw new Error(`送信エラー（${res.status}）`);status.textContent='送信を受け付けました。運営者による保存確認は別途必要です。';form.reset();}catch(err){status.textContent=`送信できませんでした：${err.message}`;}});

// GitHub Pages does not provide Netlify Functions or Forms. Never imply they work.
if(location.hostname.endsWith('github.io')){
  $('proButton').disabled=true; $('accessKey').disabled=true; $('proStatus').textContent='GitHub Pages版では利用不可（専門家の認証機能は未実装）';
  $('feedbackForm').querySelectorAll('input,textarea,select,button').forEach(el=>el.disabled=true);
  $('feedbackStatus').textContent='この公開先では感想の保存・送信はできません。';
}
