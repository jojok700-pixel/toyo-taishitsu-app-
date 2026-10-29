// 教育用の八綱整理。確率・診断・資格認証を提供しない。
export const AXES=[
 {key:'location',title:'表・裏',options:[['surface','表を示唆する急性の外感様所見'],['interior','裏を示唆する内臓・慢性の所見'],['mixed','両方の所見がある'],['unknown','未確認・判断保留']]},
 {key:'temperature',title:'寒・熱',options:[['cold','寒がり・温めると楽など寒の所見'],['hot','熱感・口渇など熱の所見'],['mixed','寒熱両方の所見'],['unknown','未確認・判断保留']]},
 {key:'strength',title:'虚・実',options:[['deficient','疲れやすさ・弱い声など虚の所見'],['excess','強い張り・拒按など実の所見'],['mixed','虚実両方の所見'],['unknown','未確認・判断保留']]},
 {key:'yinYang',title:'陰・陽（全体像）',options:[['yin','陰的な傾向が比較的優位'],['yang','陽的な傾向が比較的優位'],['mixed','入り混じる'],['unknown','未確認・判断保留']]}
];
export const EXTRA=[
 {id:'tongue',title:'舌所見',options:[['pale','淡・淡胖'],['red','紅・少苔'],['purple','暗紫'],['thick','厚膩苔'],['other','その他'],['unknown','未確認']]},
 {id:'pulse',title:'脈所見',options:[['weak','弱・細'],['wiry','弦'],['slippery','滑'],['rapid','数'],['other','その他'],['unknown','未確認']]},
 {id:'course',title:'経過',options:[['acute','急性・急変'],['chronic','慢性・反復'],['unknown','未確認']]}
];
const LABEL={surface:'表',interior:'裏',cold:'寒',hot:'熱',deficient:'虚',excess:'実',yin:'陰',yang:'陽',mixed:'混在',unknown:'保留'};
export function summarizeEight(data){return AXES.map(a=>`${a.title}：${LABEL[data[a.key]]||'保留'}`).join(' ／ ');}
const EXPECT={
 liver_qi:{location:'interior',strength:'excess',pulse:'wiry',questions:['情志変動と胸脇の張りは連動するか','熱証や血瘀など競合所見はないか']},
 spleen_qi:{location:'interior',strength:'deficient',tongue:'pale',pulse:'weak',questions:['食欲低下・軟便・疲労の経過は一致するか','冷えが顕著なら脾陽虚も検討したか']},
 kidney_yin:{location:'interior',temperature:'hot',strength:'deficient',tongue:'red',questions:['夜間の熱感と乾燥は持続するか','発熱・内分泌・薬剤などを評価したか']},
 spleen_damp:{location:'interior',tongue:'thick',pulse:'slippery',questions:['湿の徴候と脾の虚の徴候は両立するか','浮腫や体重変化の医学的要因は確認したか']},
 blood_def:{strength:'deficient',tongue:'pale',pulse:'weak',questions:['出血・栄養・貧血の評価は必要か','乾燥とふらつきは別の原因で説明できないか']},
 blood_stasis:{tongue:'purple',course:'chronic',questions:['固定痛・舌色・経過の一致を確認したか','血栓・外傷など緊急性のある原因を除外できるか']}
};
export function evaluateCandidate(p,data){const rule=EXPECT[p.id]||{};const support=[],conflict=[],unverified=[];
 for(const [k,v] of Object.entries(rule)){if(k==='questions')continue;const actual=data[k]||'unknown';const axis=AXES.find(a=>a.key===k)||EXTRA.find(a=>a.id===k);const name=axis?.title||k;
  if(actual==='unknown'||!actual){unverified.push(name);continue;}
  if(actual==='mixed'){unverified.push(`${name}（混在）`);continue;}
  if(actual===v)support.push(name);else conflict.push(name);
 }
 return {support,conflict,unverified,questions:rule.questions||[],status:conflict.length?'矛盾する所見あり・再検討':unverified.length?'所見不足・鑑別継続':'複数所見が整合・鑑別継続'};
}
export function setupEightUI(){const container=document.getElementById('eightAssessment');if(!container)return;
 const form=document.createElement('div');form.className='eight-form';
 for(const group of [...AXES,...EXTRA]){const field=document.createElement('fieldset');field.className='eight-field';const legend=document.createElement('legend');legend.textContent=group.title;field.append(legend);
 for(const [v,label] of group.options){const wrapper=document.createElement('label');wrapper.className='eight-choice';const el=document.createElement('input');el.type='radio';el.name=`eight-${group.key||group.id}`;el.value=v;if(v==='unknown')el.checked=true;wrapper.append(el,document.createTextNode(' '+label));field.append(wrapper);}form.append(field);}
 container.append(form);const output=document.getElementById('eightResult');const button=document.getElementById('eightAnalyze');button.addEventListener('click',()=>{const data={};for(const group of [...AXES,...EXTRA])data[group.key||group.id]=form.querySelector(`input[name="eight-${group.key||group.id}"]:checked`)?.value||'unknown';
 output.replaceChildren();const lead=document.createElement('p');lead.textContent='八綱の参考整理：'+summarizeEight(data)+'。陰陽は他の三対を単純加算したものではありません。';output.append(lead);
 const details=document.createElement('p');details.className='fine';details.textContent='この分類は観察した情報の整理であり、自動診断ではありません。矛盾や混在、未確認をそのまま残します。';output.append(details);
 const wrap=document.getElementById('proAssessmentResult');if(wrap?.children.length){const p=document.createElement('p');p.className='point-note';p.textContent='下の弁証候補は先に選んだ所見の一致数です。八綱の情報と照合した追加検討は、もう一度「弁証候補・選穴理由を比較する」を押すと表示されます。';output.append(p);}
 document.dispatchEvent(new CustomEvent('eight-updated',{detail:data}));});
 return ()=>{const data={};for(const group of [...AXES,...EXTRA])data[group.key||group.id]=form.querySelector(`input[name="eight-${group.key||group.id}"]:checked`)?.value||'unknown';return data;};
}
