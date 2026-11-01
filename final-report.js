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
export function renderFinalReport({type,element,guide}){
 let root=document.getElementById('toyoFinalReport');
 if(!root){root=document.createElement('section');root.id='toyoFinalReport';root.className='resultbox tlr-wrap';const result=document.getElementById('result');const reset=document.getElementById('reset');result.insertBefore(root,reset);}
 root.replaceChildren();add(root,'div','東洋ケアラボ｜わたしの養生レポート','tlr-overline');add(root,'h2','あなたの身体と、これからの整え方');
 if(!type||!element){section(root,'今回の結果について','特定の体質や五行を一つに絞れない結果でした。無理に型を決めず、食事・睡眠・適度な活動の基本から振り返りましょう。');add(root,'p','このチェックは医療的な診断ではありません。','tlr-fine');return;}
 const pair=combinedAdvice(type.id,element.id);const theme=TYPE_THEME[type.id]||'日々のコンディション';
 add(root,'h3',`${type.name} × ${element.symbol} ${element.label}`);
 add(root,'p',`今回の回答では「${type.name}」の傾向と、五行の「${element.label}」に関連する生活テーマが目立ちました。これは今の身体を決めつけるものではなく、${theme}を見直すための一つの視点です。`);
 section(root,'01｜体質と五行はどうつながる？',`${pair?.interpretation||'いくつかの気がかりが重なっているのかもしれません。'} 五行の点数は「その元素の力が強い」という意味ではありません。独立した質問から、最近の生活で気になることを整理した結果です。`);
 section(root,'02｜今日からの整え方',`${pair?.action||'無理のない生活調整から始めましょう。'} 体調に合わせ、小さく始めて続けられることを大切にしましょう。`);
 const care=guide||{food:'食事の時間を整える。',activity:'無理なく動く。',rest:'睡眠時間を確保する。'};
 const box=section(root,'03｜食事・運動・休養を一緒に整える','特別なことを一度に増やさず、毎日続けやすい順番で試します。');
 for(const [name,txt] of [['🍚 食事',care.food],['🚶 運動',care.activity],['🌙 休養',care.rest]])add(box,'p',`${name}：${txt}`);
 const pts=section(root,'04｜ツボで振り返るセルフケア','東洋医学の伝統的な選穴例から、体質と五行に関連する参考候補を紹介します。ツボ押しは診断や治療の代わりにはなりません。');
 const tp=TYPE_POINT[type.id],ep=ELEM_POINT[element.id];if(tp)pointBlock(pts,tp,'体質から');if(ep&&ep!==tp)pointBlock(pts,ep,'五行から');
 add(pts,'p','指の腹で軽く触れる程度にとどめ、痛みを伴う刺激は避けてください。傷・腫れ・炎症のある場所には行わず、体調が悪くなれば中止。妊娠中は特に自己判断での刺激を避け、持病がある方は専門家に相談してください。','tlr-fine');
 const week=section(root,'05｜これからの7日間','まずは一つの習慣だけを選びましょう。できなかった日があっても問題ありません。');
 const habits=['朝か夜の休憩を5〜10分確保する','食事と就寝時刻を少し整える','体調に合わせて短い散歩をする'];
 const sel=document.createElement('select');sel.setAttribute('aria-label','7日間の目標を選択');for(const h of habits){const o=document.createElement('option');o.value=o.textContent=h;sel.append(o);}week.append(sel);
 const btn=document.createElement('button');btn.type='button';btn.textContent='選んだ目標をコピー';btn.className='secondary';btn.addEventListener('click',()=>navigator.clipboard?.writeText(`東洋ケアラボ 7日間の目標：${sel.value}`).then(()=>{btn.textContent='コピーしました'}).catch(()=>{btn.textContent='コピーできませんでした'}));week.append(btn);
 section(root,'06｜最後に','診断結果は「こういう体質だから仕方がない」という結論ではありません。今の生活を少しだけ違う角度から見つめ、負担を減らして、自分のペースを取り戻すためのヒントです。できることを一つ選ぶ。それが、今日から始める養生です。');
 add(root,'p','この内容は東洋医学の考え方に基づく一般的な情報です。病名・原因・体質の確定、治療効果の保証はできません。症状が続く・悪化する、強い痛み・胸痛・息苦しさ・失神などがあるときは医療機関にご相談ください。','tlr-fine');
}
export const pointCatalog=POINTS;
