// 一般向けの生活のヒント。医学的効果・診断を保証しない。
const PLANS={
 qi:['朝：起床時刻をなるべくそろえ、朝食を無理のない量でとる。','昼：疲労を感じる前に短い休息を挟む。','夜：翌日の予定を詰め込みすぎず、睡眠時間を確保する。'],
 stagnation:['朝：肩や首をゆっくり動かし、呼吸を整える。','昼：座りっぱなしを避け、数分の散歩を入れる。','夜：気がかりを書き出し、気分転換する。'],
 blood:['朝：食事を抜かず、偏りを避ける。','昼：立ちくらみがあるときは無理せず座る。','夜：疲れが強ければ休息を優先。持続するめまいや息切れは受診する。'],
 stasis:['朝：体調に合わせてゆっくり身体を動かす。','昼：同じ姿勢を長時間続けない。','夜：痛みの部位・続く時間・変化を記録する。突然の強い痛みは受診する。'],
 damp:['朝：食事・睡眠のリズムを整える。','昼：負担の少ない歩行や体操を取り入れる。','夜：むくみ・体重の急変を確認し、急な悪化は医療機関へ相談する。'],
 yin:['朝：乾燥を避け、必要に応じて室内を加湿する。','昼：暑い環境では休息と水分補給に注意する。','夜：睡眠を優先。ほてりが持続する場合は医療機関へ相談する。'],
 yang:['朝：寒さに合わせて衣服を調整する。','昼：軽い活動で身体を動かし、過度な負荷を避ける。','夜：入浴は熱すぎない温度で、のぼせに注意する。'],
 essence:['朝：無理のない一日の予定を立てる。','昼：疲労が強ければ活動を分割する。','夜：睡眠・回復を優先し、持続する体調変化は医療機関に相談する。']};
const order=['qi','stagnation','blood','stasis','damp','yin','yang','essence'];
const aliases={qi:'気虚',stagnation:'気滞',blood:'血虚',stasis:'瘀血',damp:'痰湿',yin:'陰虚',yang:'陽虚',essence:'精虚'};
function add(){const scores=[...document.querySelectorAll('#scoreList .score')];if(!scores.length)return;const vals=scores.map(x=>({name:x.querySelector('span')?.textContent||'',score:parseInt(x.querySelectorAll('span')[1]?.textContent||'0')})).sort((a,b)=>b.score-a.score);const best=vals[0];const box=document.getElementById('careGrid');if(!box)return;box.querySelectorAll('.plus-care').forEach(x=>x.remove());const id=order.find(k=>aliases[k]===best?.name);const plan=best?.score>0&&PLANS[id]?PLANS[id]:['朝：生活リズムを確認する。','昼：体調に合わせて無理なく活動する。','夜：睡眠時間を確保する。'];const part=document.createElement('section');part.className='plus-care';part.style.cssText='margin-top:1rem;padding:1rem;border:1px solid #adb99f;border-radius:16px;background:#f1f0df;color:#304b37';const h=document.createElement('h4');h.textContent='📅 まず1週間試す生活のヒント';part.append(h);const p=document.createElement('p');p.textContent='効果を保証するものではありません。できることを1つ選び、体調が悪いときは中止してください。';part.append(p);const ul=document.createElement('ul');plan.forEach(s=>{const li=document.createElement('li');li.textContent=s;ul.append(li)});part.append(ul);const d=document.createElement('details');const sum=document.createElement('summary');sum.textContent='実践の振り返り方';const body=document.createElement('p');body.textContent='睡眠・食事・疲労など1項目だけ、実施前後の変化をメモします。症状の原因や治療効果をこのチェックだけで判断しないでください。';d.append(sum,body);part.append(d);box.append(part);}
new MutationObserver(()=>{if(!document.getElementById('result').classList.contains('hidden'))add()}).observe(document.getElementById('result'),{attributes:true,attributeFilter:['class']});
