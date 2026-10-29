// 教育・検討用のルールベース対応表。医療機器としての精度検証は未実施。
export const PATTERNS=[
 {id:'liver_qi',name:'肝鬱気滞',family:'気血津液・臓腑',signals:['stress','distension','sigh'],support:'情志変化と胸脇・腹部の張り、ため息などが同時にみられるか',check:'発症経過・主訴、痛みの性質、月経関連症状、舌・脈、その他の原因を確認',points:[['太衝','LR3','肝経の原穴として疏肝理気の考え方に関連'],['内関','PC6','胸部の不快感・気機の調整に関する伝統的配穴候補'],['合谷','LI4','気機の調整を考える際の参考候補']]},
 {id:'spleen_qi',name:'脾気虚',family:'気血津液・臓腑',signals:['fatigue','appetite','loose'],support:'疲れやすさと食欲低下・軟便などの消化器症状が組み合わさるか',check:'食事量、体重変化、排便状況、脱水、舌・脈、消化器疾患の除外',points:[['足三里','ST36','胃経の合土穴で健脾和胃の伝統的な考え方に関連'],['太白','SP3','脾経の原穴として脾の虚を検討する際の候補'],['中脘','CV12','胃の募穴として消化機能を検討する際の候補']]},
 {id:'kidney_yin',name:'腎陰虚',family:'臓腑・陰虚',signals:['nightheat','dry','backweak'],support:'夜間のほてり・乾燥傾向と腰膝のだるさが併存するか',check:'発熱、脱水、内分泌要因、服薬、舌質・舌苔、脈、睡眠状態',points:[['太渓','KI3','腎経の原穴として補腎を検討する際の候補'],['三陰交','SP6','三陰経の交会穴として陰液に関する伝統的配穴候補'],['照海','KI6','陰蹻脈に関係する経穴として陰虚所見の検討時の候補']]},
 {id:'spleen_damp',name:'脾虚湿盛',family:'臓腑・痰湿',signals:['fatigue','heaviness','loose'],support:'倦怠感・身体の重だるさと便通変化が同時にみられるか',check:'浮腫の急性発症や心腎疾患、服薬、舌苔・脈、飲食状況',points:[['陰陵泉','SP9','脾経の合水穴として水湿を考える際の候補'],['足三里','ST36','健脾和胃の伝統的な選穴候補'],['豊隆','ST40','痰湿を検討する際に用いられる伝統的な候補']]},
 {id:'blood_def',name:'血虚',family:'気血津液',signals:['dizziness','dry','fatigue'],support:'ふらつき・乾燥感・疲労感の組み合わせがみられるか',check:'貧血、出血、栄養状態、服薬、睡眠、舌・脈など医学的評価を優先',points:[['三陰交','SP6','血を養うという伝統的な配穴の考え方に関連'],['血海','SP10','血に関する伝統的な配穴候補'],['足三里','ST36','後天の気血の生成という伝統的な考え方に関連']]},
 {id:'blood_stasis',name:'瘀血',family:'気血津液',signals:['fixedpain','dark','chronic'],support:'固定性の痛みと慢性経過、舌の暗紫などの所見が併存するか',check:'急性の強い痛み・腫脹・血栓症状・外傷・出血傾向を先に鑑別',points:[['血海','SP10','血の運行に関する伝統的な選穴候補'],['膈兪','BL17','八会穴の血会としての伝統的な考え方に関連'],['三陰交','SP6','血に関連する伝統的な配穴候補']]}
];
export const SIGNS=[
 ['stress','精神的負担で不調が変動'],['distension','胸脇・腹部の張り'],['sigh','ため息が多い'],['fatigue','疲れやすい'],['appetite','食欲が低下'],['loose','軟便傾向'],['nightheat','夜間のほてり'],['dry','口や皮膚の乾燥'],['backweak','腰膝のだるさ'],['heaviness','身体が重だるい'],['dizziness','ふらつき'],['fixedpain','固定した痛み'],['dark','舌の暗紫色など'],['chronic','症状が長期間続く']
];
export function rankPatterns(selected){const set=new Set(selected);return PATTERNS.map(p=>({...p,hits:p.signals.filter(s=>set.has(s)),missing:p.signals.filter(s=>!set.has(s))})).filter(p=>p.hits.length>=2).sort((a,b)=>b.hits.length-a.hits.length||a.missing.length-b.missing.length).slice(0,4);}
