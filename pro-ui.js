import {SIGNS,rankPatterns} from './pro-guide.js';
export function setupProUI(){
 const root=document.getElementById('proAssessment');if(!root)return;
 const options=document.getElementById('proSigns');
 for(const [id,label] of SIGNS){const wrapper=document.createElement('label');wrapper.className='pro-check';const chk=document.createElement('input');chk.type='checkbox';chk.value=id;const span=document.createElement('span');span.textContent=label;wrapper.append(chk,span);options.append(wrapper);}
 document.getElementById('proAnalyze').addEventListener('click',()=>{
  const selected=[...options.querySelectorAll('input:checked')].map(x=>x.value);
  const out=document.getElementById('proAssessmentResult');out.replaceChildren();
  if(selected.length<2){out.textContent='所見を2項目以上選択してください。所見が不十分なときは候補を出しません。';return;}
  const matches=rankPatterns(selected);
  const contradictory=(selected.includes('nightheat')&&selected.includes('heaviness'));
  if(contradictory){const warn=document.createElement('p');warn.className='point-note';warn.textContent='異なる傾向の所見が重なっています。単一の証に決めつけず、経過・他の要因も確認してください。';out.append(warn);}
  if(!matches.length){out.textContent='設定した候補と十分な一致がありません。候補なしとして、問診・診察と他の原因の検討を優先してください。';return;}
  const info=document.createElement('p');info.className='fine';info.textContent='以下は入力した所見との一致数による学習用の比較です。証・治療法・刺鍼部位を確定しません。';out.append(info);
  for(const p of matches){const card=document.createElement('article');card.className='pro-pattern';const h=document.createElement('h4');h.textContent=`${p.name}｜一致 ${p.hits.length}/${p.signals.length}`;card.append(h);
   const desc=document.createElement('p');desc.textContent=`照合の考え方：${p.support}`;card.append(desc);
   const chk=document.createElement('p');chk.textContent=`追加確認：${p.check}`;card.append(chk);
   const head=document.createElement('strong');head.textContent='参考経穴と伝統的な選穴理由';card.append(head);
   const ul=document.createElement('ul');for(const [name,code,why] of p.points){const li=document.createElement('li');li.textContent=`${name}（${code}）：${why}`;ul.append(li);}card.append(ul);
   const note=document.createElement('small');note.textContent='経穴の位置・刺入方向・禁忌・適否はここでは提示しません。施術判断は資格者が対面で行ってください。';card.append(note);out.append(card);
  }
 });
}
