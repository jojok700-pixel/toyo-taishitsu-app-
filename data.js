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
