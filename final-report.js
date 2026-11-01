// 一般向けの生活振り返りレポート。臨床診断や個別治療を行わない。
import {combinedAdvice} from './constitution-five-link.js';
const POINTS={
 '足三里':['ST36','気虚・土','伝統的に胃腸や気を養う目的で用いられる'],
 '内関':['PC6','気滞・火','気分の不快感などのセルフケアで紹介される'],
 '太衝':['LR3','木','緊張や巡りを考える際の伝統的な候補'],
 '三陰交':['SP6','血虚・陰虚','陰と血の養生で伝統的に用いられる'],
 '血海':['SP10','血虚・瘀血','血に関わる養生で用いられる'],
 '合谷':['LI4','気滞・金','気の巡りを考える際の伝統的な候補'],
 '豊隆':['ST40','痰湿','痰湿を整理する考え方で用いられる'],
 '陰陵泉':['SP9','痰湿・土','水湿を考える際の伝統的な候補'],
 '太渓':['KI3','陰虚・精虚・水','腎に関係する養生の候補'],
 '照海':['KI6','陰虚','陰の養生で用いられる'],
 '復溜':['KI7','水','水・腎の養生で用いられる'],
 '神門':['HT7','火','安らぎや落ち着きの養生で用いられる'],
 '公孫':['SP4','土','脾胃に関連する伝統的な候補'],
 '太白':['SP3','気虚・土','脾の気を考える際の伝統的な候補'],
 '太淵':['LU9','金','肺の養生で伝統的に用いられる'],
 '列欠':['LU7','金','肺の経絡に関係する伝統的な候補'],
 '陽陵泉':['GB34','木','筋や動きの養生で用いられる'],
 '印堂':['EX-HN3','リラックス','気持ちの落ち着きを考える際の候補']
};
const TYPE_POINT={qi:'足三里',stagnation:'内関',blood:'三陰交',stasis:'血海',damp:'豊隆',yin:'太渓',yang:'足三里',essence:'太渓'};
const ELEM_POINT={wood:'太衝',fire:'神門',earth:'公孫',metal:'列欠',water:'復溜'};
const TYPE_THEME={qi:'疲れやすさと活動量',stagnation:'緊張と気分転換',blood:'疲労感と生活の余白',stasis:'同じ姿勢が続く生活',damp:'重だるさと生活リズム',yin:'乾燥・ほてりと休養',yang:'冷えと無理のない活動',essence:'回復のペース'};
const add=(parent,tag,txt,cls)=>{const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=txt;parent.append(el);return el};
const section=(root,title,body)=>{const d=document.createElement('div');d.className='tlr-section';add(d,'h3',title);add(d,'p',body);root.append(d);return d};
const pointBlock=(root,name,role)=>{const [code,tag,desc]=POINTS[name];const wrap=document.createElement('div');wrap.className='tlr-point';add(wrap,'strong',`${name}（${code}）｜${role}`);add(wrap,'p',desc);add(wrap,'small',`分類：${tag}。参考候補であり効果を保証しません。位置図は専門確認まで公開しません。`);root.append(wrap)};
export function renderFinalReport({types=[],elements=[],guide,lowEvidence=false}){
 let root=document.getElementById('toyoFinalReport');
 if(!root){root=document.createElement('section');root.id='toyoFinalReport';root.className='resultbox tlr-wrap';}
 const target=document.getElementById('result');const anchor=document.querySelector('#result .v07-podium')||document.getElementById('reset');target.insertBefore(root,anchor);
 root.replaceChildren();
 add(root,'div','東洋ケアラボ｜診断のまとめ','tlr-overline');
 add(root,'h2','あなたの体質と五行をつなぐ、総合セルフケアレポート');
 if(!types.length||!elements.length){
  section(root,'今回の回答','体質や五行に関する回答を読み取れませんでした。回答を確認してください。');
  section(root,'参考ツボ','回答と紐付かない特定のツボは紹介していません。');
  return;
 }
 if(lowEvidence){add(root,'p','回答の多くが低得点または同点です。以下は診断ではなく、複数の養生テーマを並列に紹介したものです。','tlr-fine');}
 const primary=types[0],elem=elements[0],pair=combinedAdvice(primary.id,elem.id);
 const typeNames=types.map(t=>t.name).join('・'),elemNames=elements.map(e=>e.label).join('・');
 add(root,'h3',`${typeNames} × ${elemNames}｜今回の養生テーマ`);
 add(root,'p',`今回の回答では、体質は「${typeNames}」、五行の生活テーマは「${elemNames}」が目立ちました。${types.length>1?'体質が同点なので一つに決めず、共通する養生の方向を読み解きます。':''} 五行は元素の強さや体内のエネルギー量を測った数値ではありません。`);
 section(root,'01｜今回の結果をどう読む？',`${pair?.interpretation||'日々の負担と休養のバランスを見直すタイミングかもしれません。'} これは質問への回答から考えられる生活上の仮説で、疲労や不調の原因を確定するものではありません。`);
 if(types.length>1){
  for(const t of types.slice(1)){const p=combinedAdvice(t.id,elem.id);section(root,`もう一つの傾向｜${t.name}`,`${p?.interpretation||'別の生活テーマも同時に見られます。'} 一方だけを正解と決めず、共通して負担を減らす工夫を優先しましょう。`);}
 }
 section(root,'02｜あなたに今、提案したいこと',`${pair?.action||'無理のない生活調整から始めましょう。'} 一気に生活を変える必要はありません。最初は、体調が悪くなる前に休む予定を入れるなど、負担を減らす行動を一つ選びましょう。`);
 const care=guide||{food:'食事の時間を整える。',activity:'無理なく動く。',rest:'睡眠時間を確保する。'};
 const c=section(root,'03｜食事・運動・休養の3つの整え方','身体の状態は一つの対策だけでは変わりません。食べる・動く・休むのバランスを振り返りましょう。');
 for(const [name,txt,why] of [['🍚 食事',care.food,'忙しい日に食事が不規則になっていないかを確認。無理なく食べられる形で栄養と水分を補いましょう。'],['🚶 活動',care.activity,'活動は多いほどよいとは限りません。運動の翌日まで疲れが残るなら、時間や強さを減らしましょう。'],['🌙 休養',care.rest,'休む時間を後から捻出するのではなく、最初から予定に入れてみましょう。']]){
  const p=add(c,'p',`${name}｜${txt}`);p.style.fontWeight='600';add(c,'p',why);
 }
 const pts=section(root,'04｜今回の参考ツボ','東洋医学で伝統的に用いられる候補です。効果が保証された組み合わせではなく、位置図は専門確認まで表示しません。');
 const names=[];
 for(const t of types){const n=TYPE_POINT[t.id];if(n&&!names.includes(n))names.push(n);}
 for(const e of elements){const en=ELEM_POINT[e.id];if(en&&!names.includes(en))names.push(en);}
 for(const name of names.slice(0,3))pointBlock(pts,name,(TYPE_POINT[primary.id]===name?'体質から':'関連する傾向から'));
 if(!names.length)add(pts,'p','今回の回答に対応するツボを特定できませんでした。');
 add(pts,'p','ツボの正確な位置を確認できない場合は押さないでください。強く押す、長時間押すことは避け、痛み・傷・腫れ・炎症のある部位への刺激は控えましょう。妊娠中や治療中の方は医療者にご相談ください。','tlr-fine');
 const week=section(root,'05｜7日間のセルフケアプラン','一週間で全部やろうとせず、続けられる目標を一つ選んでください。');
 const habits=['休憩する時間を毎日5〜10分予定に入れる','朝か昼の食事を抜かず、就寝時刻を整える','疲れを残さない短い散歩やストレッチをする'];
 const sel=document.createElement('select');sel.setAttribute('aria-label','7日間の目標を選択');for(const h of habits){const o=document.createElement('option');o.value=o.textContent=h;sel.append(o);}week.append(sel);
 const chosen=add(week,'p',`今週の目標：${habits[0]}`);sel.addEventListener('change',()=>chosen.textContent=`今週の目標：${sel.value}`);
 const btn=document.createElement('button');btn.type='button';btn.textContent='目標をコピー';btn.className='secondary';btn.addEventListener('click',()=>{if(!navigator.clipboard?.writeText){btn.textContent='お使いの環境ではコピーできません';return;}navigator.clipboard.writeText(`東洋ケアラボ｜今週の目標：${sel.value}`).then(()=>{btn.textContent='コピーしました'}).catch(()=>{btn.textContent='コピーできませんでした'});});week.append(btn);
 section(root,'06｜あなたへの最後のメッセージ',`今回目立った「${typeNames}」と「${elemNames}」は、あなたの限界や性格を決めるラベルではありません。 今の生活の中で、どこに力を使い、どこで力を回復するかを考える手がかりです。まず一つ、休む・食べる・動くのバランスを自分で選び直してみてください。`);
 add(root,'p','このチェックは病気や体質を確定する診断ではありません。疲れや立ちくらみなどが続く場合は医療機関へ。胸痛、息苦しさ、失神などの危険徴候があれば速やかに医療につなげてください。','tlr-fine');
}
export const pointCatalog=POINTS;
