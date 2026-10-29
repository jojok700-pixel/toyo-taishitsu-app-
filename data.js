export const TYPES = [
 {id:'qi',name:'気虚',desc:'エネルギー不足に関連する伝統的な傾向',element:'土',care:'休息を優先し、食事と睡眠のリズムを整える。',point:'足三里',code:'ST36',where:'膝のお皿の下の外側から、指幅4本ほど下のすね外側。'},
 {id:'stagnation',name:'気滞',desc:'気分や緊張の変動に関連する伝統的な傾向',element:'木',care:'軽い散歩や深呼吸で気分を切り替える。',point:'内関',code:'PC6',where:'手のひら側の手首のしわから肘方向に指幅3本ほど、2本の腱の間。'},
 {id:'blood',name:'血虚',desc:'血の滋養不足に関連する伝統的な傾向',element:'木',care:'無理な夜更かしを避け、規則的に食事をとる。',point:'足三里',code:'ST36',where:'膝のお皿の下の外側から、指幅4本ほど下のすね外側。'},
 {id:'stasis',name:'瘀血',desc:'血の巡りの滞りに関連する伝統的な傾向',element:'火',care:'同じ姿勢を長く続けず、負担のない範囲で体を動かす。',point:'内関',code:'PC6',where:'手のひら側の手首のしわから肘方向に指幅3本ほど、2本の腱の間。'},
 {id:'damp',name:'痰湿',desc:'水分代謝の偏りに関連する伝統的な傾向',element:'土',care:'適度に体を動かし、食生活のリズムを見直す。',point:'足三里',code:'ST36',where:'膝のお皿の下の外側から、指幅4本ほど下のすね外側。'},
 {id:'yin',name:'陰虚',desc:'潤い不足やほてりに関連する伝統的な傾向',element:'水',care:'睡眠を確保し、のぼせや乾燥が気になる環境を避ける。',point:'内関',code:'PC6',where:'手のひら側の手首のしわから肘方向に指幅3本ほど、2本の腱の間。'},
 {id:'yang',name:'陽虚',desc:'冷えや温める力の不足に関連する伝統的な傾向',element:'水',care:'衣服や室温を調整して無理のない保温を心がける。',point:'足三里',code:'ST36',where:'膝のお皿の下の外側から、指幅4本ほど下のすね外側。'},
 {id:'essence',name:'精虚',desc:'加齢や回復力への関心に関連する伝統的な傾向',element:'水',care:'疲労をためない予定を組み、休養と運動のバランスをとる。',point:'足三里',code:'ST36',where:'膝のお皿の下の外側から、指幅4本ほど下のすね外側。'}
];
export const QUESTIONS = [
 ['qi','疲れやすく、休みたくなることが多い'],['qi','声に力が入りにくいと感じる'],
 ['stagnation','ストレスで胸やお腹が張る感じがする'],['stagnation','ため息をつくことが多い'],
 ['blood','肌や髪の乾燥が気になる'],['blood','立ちくらみを感じることがある'],
 ['stasis','同じ場所に固定した痛みを感じることがある'],['stasis','肌のくすみが気になる'],
 ['damp','身体が重だるく感じる'],['damp','むくみやべたつきが気になる'],
 ['yin','夕方や夜にほてりを感じる'],['yin','口やのどが乾きやすい'],
 ['yang','手足やお腹が冷えやすい'],['yang','温かい環境を好む'],
 ['essence','以前より回復に時間がかかると感じる'],['essence','足腰の衰えが気になる']
].map(([type,text],index)=>({id:index+1,type,text}));
export function calculate(answers){
 const scores=Object.fromEntries(TYPES.map(t=>[t.id,0]));
 for(const q of QUESTIONS){const n=Number(answers[q.id]); if(!Number.isInteger(n)||n<0||n>3)throw new Error('すべての質問に回答してください');scores[q.type]+=n;}
 const ordered=TYPES.map(t=>({...t,score:scores[t.id],percentage:Math.round(scores[t.id]/6*100)})).sort((a,b)=>b.score-a.score||TYPES.findIndex(t=>t.id===a.id)-TYPES.findIndex(t=>t.id===b.id));
 return {ordered,primary:ordered[0],ties:ordered.filter(t=>t.score===ordered[0].score).length};
}

// Separate exploratory prompts: not validated eight-principle assessment.
export const AXIS_QUESTIONS = [
 {id:'a1',axis:'cold',text:'最近、温かくしていても寒さを感じることが多い'},
 {id:'a2',axis:'heat',text:'最近、暑がり・ほてりが気になることが多い'},
 {id:'a3',axis:'deficiency',text:'最近、無理をすると疲れが残りやすい'},
 {id:'a4',axis:'excess',text:'最近、張りや重苦しさが気になることが多い'}
];
export function calculateAxes(answers){
 const values=Object.fromEntries(AXIS_QUESTIONS.map(q=>[q.axis,0]));
 for(const q of AXIS_QUESTIONS){ const n=Number(answers[q.id]); if(!Number.isInteger(n)||n<0||n>3)throw new Error('補足質問にも回答してください'); values[q.axis]=n; }
 const pair=(left,right,leftLabel,rightLabel)=>{
  if(values[left]===0 && values[right]===0)return '目立つ回答なし';
  if(values[left]===values[right])return '同程度（方向は決めません）';
  return `${values[left]>values[right]?leftLabel:rightLabel}に関する回答が相対的に多め`;
 };
 return {values,temperature:pair('cold','heat','寒さ','熱さ'),strength:pair('deficiency','excess','疲れやすさ','張り・重苦しさ')};
}

// 五行の5問は親しみやすい自己観察のための独立した質問です。
// 五臓の機能障害や体質と同義ではなく、心理・身体疾患を判定しません。
export const ELEMENTS = [
 {id:'wood',label:'木',symbol:'🌱',topic:'変化と気分転換',tip:'自然の中で短い散歩やストレッチをしてみましょう。'},
 {id:'fire',label:'火',symbol:'☀️',topic:'交流と活動',tip:'楽しめる交流と、一人で休む時間の両方を確保しましょう。'},
 {id:'earth',label:'土',symbol:'🍚',topic:'食事と生活リズム',tip:'食事・睡眠の時間を無理のない範囲で整えましょう。'},
 {id:'metal',label:'金',symbol:'🍃',topic:'呼吸と気持ちの切り替え',tip:'窓を開けてゆったり呼吸する時間を作りましょう。'},
 {id:'water',label:'水',symbol:'💧',topic:'休養と回復',tip:'疲れた日は予定を減らし、睡眠を優先しましょう。'}
];
export const ELEMENT_QUESTIONS = [
 {id:'e1',element:'wood',text:'最近、気分転換や新しいことに取り組む余裕が少ない'},
 {id:'e2',element:'fire',text:'最近、人との交流や楽しむ時間を十分に持てていない'},
 {id:'e3',element:'earth',text:'最近、食事や生活のリズムが乱れがちだ'},
 {id:'e4',element:'metal',text:'最近、ゆっくり呼吸して気持ちを切り替える余裕が少ない'},
 {id:'e5',element:'water',text:'最近、十分に休んで回復する時間がとれていない'}
];
export function calculateElements(answers){
 const values={};
 for(const q of ELEMENT_QUESTIONS){const n=Number(answers[q.id]);if(!Number.isInteger(n)||n<0||n>3)throw new Error('五行の補足質問にも回答してください');values[q.element]=n;}
 const ordered=ELEMENTS.map(e=>({...e,score:values[e.id]})).sort((x,y)=>y.score-x.score||ELEMENTS.findIndex(e=>e.id===x.id)-ELEMENTS.findIndex(e=>e.id===y.id));
 return {values,ordered,top:ordered.filter(e=>e.score===ordered[0].score&&e.score>0)};
}
export const CARE_GUIDES={
 qi:{food:'食事を抜かず、食べやすいものを規則的に。',activity:'疲れを残さない短い散歩から。',rest:'予定の間に休憩を入れる。'},
 stagnation:{food:'慌ただしい食事を避け、落ち着いて食べる。',activity:'軽い散歩や伸びをして気分転換。',rest:'息を長く吐く時間を作る。'},
 blood:{food:'偏食を避けてさまざまな食品を組み合わせる。',activity:'ふらつきがある時は無理に運動しない。',rest:'夜更かしを避ける。'},
 stasis:{food:'規則的な食事と十分な水分補給を意識。',activity:'同じ姿勢が長く続かないようにする。',rest:'痛みが続く場合は医療機関へ相談。'},
 damp:{food:'食べすぎ・飲みすぎを避け、食事の時間を整える。',activity:'無理のない範囲でこまめに身体を動かす。',rest:'むくみが急に出る場合は医療機関へ相談。'},
 yin:{food:'水分摂取は体調や医師の指示に合わせる。',activity:'暑い時は運動量を調整する。',rest:'睡眠を確保し、室温を調整する。'},
 yang:{food:'極端な食事制限を避け、温かな食事も取り入れる。',activity:'寒い場所では体調に合わせて運動する。',rest:'冷えに応じて衣服や室温を調整する。'},
 essence:{food:'偏りの少ない食事を続ける。',activity:'体力に合わせた歩行や筋力維持を意識。',rest:'回復に合わせて予定を組む。'}
};
