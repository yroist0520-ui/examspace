import type { LexiconEntry } from '@/types/paper';

/**
 * 内置演示词库（示例数据）。
 * 释义为通用英语词典释义的简化整理，仅用于演示查词交互，
 * 不构成完整词典产品；后续可替换为已授权词库或自有词典服务。
 */
export const lexicon: LexiconEntry[] = [
  {
    word: 'abandon',
    phonetic: '/əˈbændən/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '放弃，中止（计划、努力）' },
      { pos: 'v.', cn: '抛弃，遗弃' }
    ],
    example: 'The researchers had to abandon the trial after the first winter.',
    exampleCn: '第一次冬季之后，研究者不得不中止这项试验。',
    collocations: ['abandon a plan', 'abandon hope', 'with abandon'],
    level: 'CET-4',
    examTags: ['CET-4', '考研']
  },
  {
    word: 'abundant',
    phonetic: '/əˈbʌndənt/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '丰富的，大量的' }],
    example: 'Evidence is abundant that sleep shapes memory.',
    exampleCn: '有大量证据表明睡眠塑造记忆。',
    collocations: ['abundant evidence', 'abundant in'],
    level: 'CET-6'
  },
  {
    word: 'accessible',
    phonetic: '/əkˈsesəbl/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '易接近的，可进入的' },
      { pos: 'adj.', cn: '易理解的' }
    ],
    example: 'The archive is now accessible to the public.',
    exampleCn: '该档案馆现在向公众开放。',
    collocations: ['accessible to', 'widely accessible'],
    level: 'CET-4'
  },
  {
    word: 'accommodate',
    phonetic: '/əˈkɒmədeɪt/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '容纳，为……提供空间' },
      { pos: 'v.', cn: '适应，迁就' }
    ],
    example: 'The hall can accommodate four hundred people.',
    exampleCn: '这个大厅可容纳四百人。',
    collocations: ['accommodate to', 'accommodate the needs of'],
    level: 'CET-6'
  },
  {
    word: 'accumulate',
    phonetic: '/əˈkjuːmjəleɪt/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '积累，积聚' }],
    example: 'Small habits accumulate into large results.',
    exampleCn: '微小的习惯会累积成巨大的结果。',
    collocations: ['accumulate wealth', 'accumulated knowledge'],
    level: 'CET-4'
  },
  {
    word: 'advocate',
    phonetic: '/ˈædvəkeɪt/',
    pos: 'v. / n.',
    senses: [
      { pos: 'v.', cn: '提倡，主张' },
      { pos: 'n.', cn: '拥护者，倡导者' }
    ],
    example: 'She advocates a slower, more deliberate approach to reading.',
    exampleCn: '她提倡一种更慢、更从容的阅读方式。',
    collocations: ['advocate for', 'a strong advocate of'],
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'aesthetic',
    phonetic: '/iːsˈθetɪk/',
    pos: 'adj. / n.',
    senses: [
      { pos: 'adj.', cn: '审美的，美学的' },
      { pos: 'n.', cn: '审美观' }
    ],
    example: 'The design serves an aesthetic purpose as well as a practical one.',
    exampleCn: '这一设计既有实用目的，也有审美目的。',
    level: 'CET-6'
  },
  {
    word: 'ambiguous',
    phonetic: '/æmˈbɪɡjuəs/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '模棱两可的，含糊不清的' }],
    example: 'The wording of the rule is deliberately ambiguous.',
    exampleCn: '这条规则的措辞故意含糊。',
    collocations: ['ambiguous statement', 'morally ambiguous'],
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'anticipate',
    phonetic: '/ænˈtɪsɪpeɪt/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '预料，预期' },
      { pos: 'v.', cn: '提前处理' }
    ],
    example: 'We anticipate that demand will double within three years.',
    exampleCn: '我们预计需求将在三年内翻倍。',
    collocations: ['anticipate changes', 'widely anticipated'],
    level: 'CET-4'
  },
  {
    word: 'apparent',
    phonetic: '/əˈpærənt/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '明显的，显而易见的' },
      { pos: 'adj.', cn: '表面上的' }
    ],
    example: 'It soon became apparent that the plan would not work.',
    exampleCn: '很快就明显看出这个计划行不通。',
    level: 'CET-4'
  },
  {
    word: 'assess',
    phonetic: '/əˈses/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '评估，评定' }],
    example: 'Teachers assess progress through short weekly tasks.',
    exampleCn: '教师通过每周的短任务来评估进度。',
    collocations: ['assess the impact', 'assess risk'],
    level: 'CET-4'
  },
  {
    word: 'attribute',
    phonetic: '/əˈtrɪbjuːt/',
    pos: 'v. / n.',
    senses: [
      { pos: 'v.', cn: '把……归因于' },
      { pos: 'n.', cn: '属性，特质' }
    ],
    example: 'They attribute the improvement to better sleep.',
    exampleCn: '他们把这一改善归因于更好的睡眠。',
    collocations: ['attribute A to B', 'a key attribute'],
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'autonomy',
    phonetic: '/ɔːˈtɒnəmi/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '自主，自治权' }],
    example: 'Learners need a degree of autonomy to stay motivated.',
    exampleCn: '学习者需要一定程度的自主性才能保持动力。',
    level: 'CET-6'
  },
  {
    word: 'bias',
    phonetic: '/ˈbaɪəs/',
    pos: 'n. / v.',
    senses: [
      { pos: 'n.', cn: '偏见，偏向' },
      { pos: 'v.', cn: '使有偏见' }
    ],
    example: 'The sample was small enough to introduce bias.',
    exampleCn: '样本太小，足以引入偏差。',
    collocations: ['cognitive bias', 'be biased towards'],
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'candidate',
    phonetic: '/ˈkændɪdət/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '候选人；考生' }],
    example: 'Each candidate is given twenty minutes.',
    exampleCn: '每位考生有二十分钟。',
    level: 'CET-4'
  },
  {
    word: 'capacity',
    phonetic: '/kəˈpæsəti/',
    pos: 'n.',
    senses: [
      { pos: 'n.', cn: '容量，容积' },
      { pos: 'n.', cn: '能力' }
    ],
    example: 'The city has the capacity to absorb new residents.',
    exampleCn: '这座城市有能力吸纳新居民。',
    collocations: ['at full capacity', 'the capacity to'],
    level: 'CET-4'
  },
  {
    word: 'chronic',
    phonetic: '/ˈkrɒnɪk/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '长期的，慢性的' }],
    example: 'Chronic noise changes how birds communicate.',
    exampleCn: '长期噪音改变了鸟类交流的方式。',
    collocations: ['chronic shortage', 'chronic illness'],
    level: 'CET-6'
  },
  {
    word: 'cite',
    phonetic: '/saɪt/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '引用，引证' },
      { pos: 'v.', cn: '列举（理由）' }
    ],
    example: 'The report cites three separate surveys.',
    exampleCn: '这份报告引用了三项独立调查。',
    collocations: ['cite evidence', 'be cited as'],
    level: 'CET-4'
  },
  {
    word: 'coherent',
    phonetic: '/kəʊˈhɪərənt/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '连贯的，条理清楚的' }],
    example: 'A coherent essay needs a clear central claim.',
    exampleCn: '一篇连贯的文章需要清晰的中心论点。',
    collocations: ['coherent argument', 'coherent whole'],
    level: 'CET-6'
  },
  {
    word: 'compelling',
    phonetic: '/kəmˈpelɪŋ/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '令人信服的' },
      { pos: 'adj.', cn: '引人入胜的' }
    ],
    example: 'There is compelling evidence for the link.',
    exampleCn: '有令人信服的证据支持这一联系。',
    level: 'CET-6'
  },
  {
    word: 'compromise',
    phonetic: '/ˈkɒmprəmaɪz/',
    pos: 'n. / v.',
    senses: [
      { pos: 'n.', cn: '妥协，折中' },
      { pos: 'v.', cn: '损害，危及' }
    ],
    example: 'Cheap materials compromise the quality of the frame.',
    exampleCn: '廉价的材料会损害画框的质量。',
    collocations: ['reach a compromise', 'compromise safety'],
    level: 'CET-4'
  },
  {
    word: 'conceive',
    phonetic: '/kənˈsiːv/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '构想，设想' },
      { pos: 'v.', cn: '理解' }
    ],
    example: 'It is hard to conceive of a city without cars.',
    exampleCn: '很难想象一座没有汽车的城市。',
    level: 'CET-6'
  },
  {
    word: 'consensus',
    phonetic: '/kənˈsensəs/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '共识，一致意见' }],
    example: 'A consensus is emerging among researchers.',
    exampleCn: '研究者之间正在形成共识。',
    collocations: ['reach a consensus', 'broad consensus'],
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'consequence',
    phonetic: '/ˈkɒnsɪkwəns/',
    pos: 'n.',
    senses: [
      { pos: 'n.', cn: '结果，后果' },
      { pos: 'n.', cn: '重要性' }
    ],
    example: 'The consequences of the delay were felt for years.',
    exampleCn: '这次延误的后果持续了多年。',
    collocations: ['as a consequence', 'of little consequence'],
    level: 'CET-4'
  },
  {
    word: 'constrain',
    phonetic: '/kənˈstreɪn/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '限制，约束' }],
    example: 'Limited funding constrained the scope of the study.',
    exampleCn: '有限的经费限制了研究的范围。',
    collocations: ['be constrained by', 'financial constraints'],
    level: 'CET-6'
  },
  {
    word: 'contemporary',
    phonetic: '/kənˈtemprəri/',
    pos: 'adj. / n.',
    senses: [
      { pos: 'adj.', cn: '当代的；同时代的' },
      { pos: 'n.', cn: '同代人' }
    ],
    example: 'Contemporary readers expect footnotes to be clickable.',
    exampleCn: '当代读者希望脚注是可点击的。',
    level: 'CET-4'
  },
  {
    word: 'controversial',
    phonetic: '/ˌkɒntrəˈvɜːʃl/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '有争议的' }],
    example: 'The proposal proved far more controversial than expected.',
    exampleCn: '这项提议的争议远超预期。',
    level: 'CET-4'
  },
  {
    word: 'conventional',
    phonetic: '/kənˈvenʃənl/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '传统的，常规的' },
      { pos: 'adj.', cn: '普通武器的（非核的）' }
    ],
    example: 'Conventional methods failed to detect the trend.',
    exampleCn: '常规方法未能发现这一趋势。',
    level: 'CET-4'
  },
  {
    word: 'cultivate',
    phonetic: '/ˈkʌltɪveɪt/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '培养，养成' },
      { pos: 'v.', cn: '耕种' }
    ],
    example: 'Reading slowly helps cultivate patience.',
    exampleCn: '慢读有助于培养耐心。',
    collocations: ['cultivate a habit', 'cultivate land'],
    level: 'CET-4'
  },
  {
    word: 'deliberate',
    phonetic: '/dɪˈlɪbərət/',
    pos: 'adj. / v.',
    senses: [
      { pos: 'adj.', cn: '故意的；深思熟虑的' },
      { pos: 'v.', cn: '仔细考虑' }
    ],
    example: 'The pause was deliberate, not accidental.',
    exampleCn: '这个停顿是刻意的，并非偶然。',
    level: 'CET-6'
  },
  {
    word: 'derive',
    phonetic: '/dɪˈraɪv/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '获得，取得（from）' },
      { pos: 'v.', cn: '源自' }
    ],
    example: 'Much of the pleasure derives from the rhythm of the sentence.',
    exampleCn: '很多乐趣源自句子的节奏。',
    collocations: ['derive from', 'derive benefit'],
    level: 'CET-4'
  },
  {
    word: 'deteriorate',
    phonetic: '/dɪˈtɪəriəreɪt/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '恶化，变坏' }],
    example: 'Air quality deteriorated sharply over the decade.',
    exampleCn: '空气质量在这十年间急剧恶化。',
    level: 'CET-6'
  },
  {
    word: 'diminish',
    phonetic: '/dɪˈmɪnɪʃ/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '减少，降低' },
      { pos: 'v.', cn: '贬低' }
    ],
    example: 'Attention does not diminish with age so much as shift.',
    exampleCn: '注意力并非随年龄减少，而是发生了转移。',
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'discrepancy',
    phonetic: '/dɪsˈkrepənsi/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '差异，不一致' }],
    example: 'There is a discrepancy between the two accounts.',
    exampleCn: '两种说法之间存在差异。',
    level: 'CET-6'
  },
  {
    word: 'dispose',
    phonetic: '/dɪˈspəʊz/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '处理，处置（of）' },
      { pos: 'v.', cn: '使倾向于' }
    ],
    example: 'Households dispose of far more textiles than they realise.',
    exampleCn: '家庭处理的纺织品远超其意识到的数量。',
    collocations: ['dispose of waste', 'be disposed to'],
    level: 'CET-6'
  },
  {
    word: 'distinct',
    phonetic: '/dɪˈstɪŋkt/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '明显的，清楚的' },
      { pos: 'adj.', cn: '不同的' }
    ],
    example: 'The two stages are distinct and should not be merged.',
    exampleCn: '这两个阶段相互独立，不应合并。',
    collocations: ['distinct from', 'a distinct advantage'],
    level: 'CET-4'
  },
  {
    word: 'diverse',
    phonetic: '/daɪˈvɜːs/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '多种多样的，不同的' }],
    example: 'A diverse reading list keeps curiosity alive.',
    exampleCn: '多样的书单能让好奇心保持活力。',
    level: 'CET-4'
  },
  {
    word: 'elaborate',
    phonetic: '/ɪˈlæbərət/',
    pos: 'adj. / v.',
    senses: [
      { pos: 'adj.', cn: '精心制作的，复杂的' },
      { pos: 'v.', cn: '详细说明' }
    ],
    example: 'He elaborated on the design in a follow-up note.',
    exampleCn: '他在后续笔记中详细说明了设计。',
    collocations: ['elaborate on', 'an elaborate system'],
    level: 'CET-6'
  },
  {
    word: 'emerge',
    phonetic: '/iˈmɜːdʒ/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '出现，浮现' },
      { pos: 'v.', cn: '（事实）显露' }
    ],
    example: 'A pattern emerged only after the third reading.',
    exampleCn: '直到第三次阅读，规律才浮现出来。',
    collocations: ['emerge from', 'emerging markets'],
    level: 'CET-4'
  },
  {
    word: 'empirical',
    phonetic: '/ɪmˈpɪrɪkl/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '经验的，实证的' }],
    example: 'The claim rests on empirical data rather than intuition.',
    exampleCn: '这一主张依据实证数据而非直觉。',
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'enhance',
    phonetic: '/ɪnˈhɑːns/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '提高，增强' }],
    example: 'Annotations can enhance rather than interrupt attention.',
    exampleCn: '批注可以增强而非打断注意力。',
    collocations: ['enhance understanding', 'enhance reputation'],
    level: 'CET-4'
  },
  {
    word: 'entail',
    phonetic: '/ɪnˈteɪl/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '需要，牵涉' }],
    example: 'Careful reading entails returning to the same paragraph.',
    exampleCn: '仔细阅读意味着要回到同一段落。',
    level: 'CET-6'
  },
  {
    word: 'explicit',
    phonetic: '/ɪkˈsplɪsɪt/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '明确的，清楚的' }],
    example: 'The instructions should be explicit about timing.',
    exampleCn: '说明应当明确时间安排。',
    level: 'CET-4'
  },
  {
    word: 'facilitate',
    phonetic: '/fəˈsɪlɪteɪt/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '促进，使便利' }],
    example: 'The margin notes facilitate a second reading.',
    exampleCn: '页边注便利了二次阅读。',
    level: 'CET-4'
  },
  {
    word: 'fluctuate',
    phonetic: '/ˈflʌktʃueɪt/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '波动，起伏' }],
    example: 'Scores fluctuated but the trend was upward.',
    exampleCn: '分数有波动，但趋势是上升的。',
    level: 'CET-6'
  },
  {
    word: 'fragile',
    phonetic: '/ˈfrædʒaɪl/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '脆弱的，易碎的' }],
    example: 'The silence in the room felt fragile.',
    exampleCn: '房间里的寂静显得脆弱。',
    level: 'CET-4'
  },
  {
    word: 'fundamental',
    phonetic: '/ˌfʌndəˈmentl/',
    pos: 'adj. / n.',
    senses: [
      { pos: 'adj.', cn: '根本的，基础的' },
      { pos: 'n.', cn: '基本原则' }
    ],
    example: 'A fundamental shift in habit takes weeks, not days.',
    exampleCn: '习惯的根本转变需要数周而非数天。',
    level: 'CET-4'
  },
  {
    word: 'generate',
    phonetic: '/ˈdʒenəreɪt/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '产生，引起' }],
    example: 'The project generated more questions than answers.',
    exampleCn: '这个项目引出的问题多于答案。',
    level: 'CET-4'
  },
  {
    word: 'hypothesis',
    phonetic: '/haɪˈpɒθəsɪs/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '假设，假说' }],
    example: 'The hypothesis survived three rounds of testing.',
    exampleCn: '这一假说经受住了三轮检验。',
    collocations: ['test a hypothesis', 'working hypothesis'],
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'immune',
    phonetic: '/ɪˈmjuːn/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '免疫的' },
      { pos: 'adj.', cn: '不受影响的（to）' }
    ],
    example: 'No reader is immune to the pull of a good opening line.',
    exampleCn: '没有读者能不受好的开篇句吸引。',
    collocations: ['immune to', 'immune system'],
    level: 'CET-6'
  },
  {
    word: 'implement',
    phonetic: '/ˈɪmplɪment/',
    pos: 'v. / n.',
    senses: [
      { pos: 'v.', cn: '实施，执行' },
      { pos: 'n.', cn: '工具，器械' }
    ],
    example: 'The school implemented the change in one term.',
    exampleCn: '学校在一个学期内实施了这项变革。',
    level: 'CET-4'
  },
  {
    word: 'incentive',
    phonetic: '/ɪnˈsentɪv/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '激励，刺激因素' }],
    example: 'Small rewards act as an incentive to keep going.',
    exampleCn: '小的奖励作为坚持下去的激励。',
    collocations: ['financial incentive', 'an incentive to'],
    level: 'CET-6'
  },
  {
    word: 'inevitable',
    phonetic: '/ɪnˈevɪtəbl/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '不可避免的' }],
    example: 'Some forgetting is inevitable and even useful.',
    exampleCn: '一定程度的遗忘是不可避免的，甚至是有益的。',
    level: 'CET-4'
  },
  {
    word: 'insight',
    phonetic: '/ˈɪnsaɪt/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '洞察力；深刻见解' }],
    example: 'The interview offers insight into how he drafts.',
    exampleCn: '这次访谈为了解他如何起草提供了洞见。',
    collocations: ['gain insight into', 'a valuable insight'],
    level: 'CET-4'
  },
  {
    word: 'integrate',
    phonetic: '/ˈɪntɪɡreɪt/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '整合，使成为一体' }],
    example: 'Notes should integrate with the text, not float above it.',
    exampleCn: '笔记应当与正文融为一体，而不是浮在上面。',
    level: 'CET-4'
  },
  {
    word: 'intricate',
    phonetic: '/ˈɪntrɪkət/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '错综复杂的' }],
    example: 'The intricate pattern rewards close looking.',
    exampleCn: '这种复杂的图案值得仔细观看。',
    level: 'CET-6'
  },
  {
    word: 'justify',
    phonetic: '/ˈdʒʌstɪfaɪ/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '证明……正当，为……辩解' }],
    example: 'The cost is hard to justify in a short course.',
    exampleCn: '在短课程中这一成本难以证明其合理性。',
    level: 'CET-4'
  },
  {
    word: 'legitimate',
    phonetic: '/lɪˈdʒɪtɪmət/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '合法的，正当的' },
      { pos: 'adj.', cn: '合理的' }
    ],
    example: 'Curiosity is a legitimate reason to read a difficult book.',
    exampleCn: '好奇心是阅读一本难书的正当理由。',
    level: 'CET-6'
  },
  {
    word: 'magnitude',
    phonetic: '/ˈmæɡnɪtjuːd/',
    pos: 'n.',
    senses: [
      { pos: 'n.', cn: '巨大；重要性' },
      { pos: 'n.', cn: '量级' }
    ],
    example: 'Few grasp the magnitude of the change.',
    exampleCn: '很少有人理解这一变化的规模。',
    level: 'CET-6'
  },
  {
    word: 'manipulate',
    phonetic: '/məˈnɪpjuleɪt/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '操纵，控制' },
      { pos: 'v.', cn: '熟练操作' }
    ],
    example: 'Charts can manipulate perception if axes are trimmed.',
    exampleCn: '如果截断坐标轴，图表可能操纵感知。',
    level: 'CET-6'
  },
  {
    word: 'modest',
    phonetic: '/ˈmɒdɪst/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '谦虚的' },
      { pos: 'adj.', cn: '适度的，不大的' }
    ],
    example: 'The gains were modest but consistent.',
    exampleCn: '提升幅度不大，但很稳定。',
    level: 'CET-4'
  },
  {
    word: 'notion',
    phonetic: '/ˈnəʊʃn/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '概念，观念' }],
    example: 'The notion that speed equals progress deserves scrutiny.',
    exampleCn: '“速度等于进步”这一观念值得审视。',
    level: 'CET-4'
  },
  {
    word: 'obscure',
    phonetic: '/əbˈskjʊə/',
    pos: 'adj. / v.',
    senses: [
      { pos: 'adj.', cn: '晦涩的，不出名的' },
      { pos: 'v.', cn: '使模糊' }
    ],
    example: 'Heavy annotation can obscure the plain sense of a line.',
    exampleCn: '过多的注解可能掩盖句子的字面意思。',
    level: 'CET-6'
  },
  {
    word: 'optimistic',
    phonetic: '/ˌɒptɪˈmɪstɪk/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '乐观的' }],
    example: 'She remains optimistic about the second attempt.',
    exampleCn: '她对第二次尝试仍持乐观态度。',
    level: 'CET-4'
  },
  {
    word: 'paradox',
    phonetic: '/ˈpærədɒks/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '悖论，自相矛盾的事' }],
    example: 'The paradox is that slowing down saves time.',
    exampleCn: '悖论在于：放慢速度反而节省时间。',
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'perceive',
    phonetic: '/pəˈsiːv/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '察觉，感知' },
      { pos: 'v.', cn: '认为，视为' }
    ],
    example: 'Students perceive the task as harder than it is.',
    exampleCn: '学生认为这项任务比实际更难。',
    level: 'CET-4'
  },
  {
    word: 'persistent',
    phonetic: '/pəˈsɪstənt/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '持续的，顽固的' },
      { pos: 'adj.', cn: '坚持不懈的' }
    ],
    example: 'A persistent rumour shaped the whole debate.',
    exampleCn: '一个顽固的传言左右了整个讨论。',
    level: 'CET-4'
  },
  {
    word: 'plausible',
    phonetic: '/ˈplɔːzəbl/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '看似合理的' }],
    example: 'The explanation is plausible but unproven.',
    exampleCn: '这一解释看似合理，但未经证实。',
    level: 'CET-6'
  },
  {
    word: 'preliminary',
    phonetic: '/prɪˈlɪmɪnəri/',
    pos: 'adj. / n.',
    senses: [
      { pos: 'adj.', cn: '初步的，预备的' },
      { pos: 'n.', cn: '预备步骤' }
    ],
    example: 'Preliminary results point to a small effect.',
    exampleCn: '初步结果指向一个较小的效应。',
    level: 'CET-6'
  },
  {
    word: 'presume',
    phonetic: '/prɪˈzjuːm/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '假定，认为' },
      { pos: 'v.', cn: '擅自' }
    ],
    example: 'We presume the reader has met the argument before.',
    exampleCn: '我们假定读者此前已接触过这一论点。',
    level: 'CET-6'
  },
  {
    word: 'prevail',
    phonetic: '/prɪˈveɪl/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '盛行，流行' },
      { pos: 'v.', cn: '获胜' }
    ],
    example: 'A quieter style of design now prevails.',
    exampleCn: '一种更安静的设计风格如今占据主流。',
    level: 'CET-6'
  },
  {
    word: 'profound',
    phonetic: '/prəˈfaʊnd/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '深刻的，深远的' },
      { pos: 'adj.', cn: '渊博的' }
    ],
    example: 'A single paragraph can have a profound effect on a reader.',
    exampleCn: '一个段落就可能对读者产生深远影响。',
    level: 'CET-6'
  },
  {
    word: 'prospect',
    phonetic: '/ˈprɒspekt/',
    pos: 'n. / v.',
    senses: [
      { pos: 'n.', cn: '前景，可能性' },
      { pos: 'v.', cn: '勘探' }
    ],
    example: 'The prospect of a quiet hour kept her at the desk.',
    exampleCn: '想到能有一小时的安静，她留在了桌前。',
    level: 'CET-4'
  },
  {
    word: 'reinforce',
    phonetic: '/ˌriːɪnˈfɔːs/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '加强，巩固' },
      { pos: 'v.', cn: '增援' }
    ],
    example: 'Re-reading reinforces the memory of unfamiliar syntax.',
    exampleCn: '重读会巩固对不熟悉句法的记忆。',
    level: 'CET-4'
  },
  {
    word: 'reluctant',
    phonetic: '/rɪˈlʌktənt/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '不情愿的，勉强的' }],
    example: 'He was reluctant to publish a first draft.',
    exampleCn: '他不愿意发表初稿。',
    collocations: ['be reluctant to do', 'reluctant agreement'],
    level: 'CET-4'
  },
  {
    word: 'resilient',
    phonetic: '/rɪˈzɪliənt/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '有韧性的，能恢复的' },
      { pos: 'adj.', cn: '有弹性的' }
    ],
    example: 'Habits built slowly tend to be more resilient.',
    exampleCn: '慢慢建立的习惯往往更有韧性。',
    level: 'CET-6'
  },
  {
    word: 'retain',
    phonetic: '/rɪˈteɪn/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '保留，保持' },
      { pos: 'v.', cn: '记住' }
    ],
    example: 'We retain more when we explain a passage aloud.',
    exampleCn: '当我们把段落讲出来时，记得更多。',
    level: 'CET-4'
  },
  {
    word: 'reveal',
    phonetic: '/rɪˈviːl/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '揭示，显露' },
      { pos: 'v.', cn: '透露' }
    ],
    example: 'The letters reveal a patient, unhurried writer.',
    exampleCn: '这些信件显示出一位耐心、从容的作家。',
    level: 'CET-4'
  },
  {
    word: 'rigid',
    phonetic: '/ˈrɪdʒɪd/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '僵硬的，僵化的' },
      { pos: 'adj.', cn: '严格的' }
    ],
    example: 'A rigid schedule can kill curiosity.',
    exampleCn: '僵化的时间表会扼杀好奇心。',
    level: 'CET-4'
  },
  {
    word: 'scrutiny',
    phonetic: '/ˈskruːtəni/',
    pos: 'n.',
    senses: [{ pos: 'n.', cn: '仔细审查' }],
    example: 'The figures collapsed under scrutiny.',
    exampleCn: '这些数据经细查便不成立了。',
    collocations: ['under scrutiny', 'close scrutiny'],
    level: 'CET-6'
  },
  {
    word: 'significant',
    phonetic: '/sɪɡˈnɪfɪkənt/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '重要的，显著的' },
      { pos: 'adj.', cn: '有意义的' }
    ],
    example: 'The difference was statistically significant.',
    exampleCn: '这一差异在统计上显著。',
    level: 'CET-4'
  },
  {
    word: 'simultaneously',
    phonetic: '/ˌsɪmlˈteɪniəsli/',
    pos: 'adv.',
    senses: [{ pos: 'adv.', cn: '同时地' }],
    example: 'She reads and takes notes simultaneously.',
    exampleCn: '她一边阅读一边做笔记。',
    level: 'CET-6'
  },
  {
    word: 'sophisticated',
    phonetic: '/səˈfɪstɪkeɪtɪd/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '复杂精密的' },
      { pos: 'adj.', cn: '老练的' }
    ],
    example: 'The tool looks simple but is quietly sophisticated.',
    exampleCn: '这个工具看似简单，实则精巧。',
    level: 'CET-4'
  },
  {
    word: 'spontaneous',
    phonetic: '/spɒnˈteɪniəs/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '自发的，自然的' }],
    example: 'The best notes are spontaneous, not scheduled.',
    exampleCn: '最好的笔记是自发的，而非按计划写出的。',
    level: 'CET-6'
  },
  {
    word: 'sustain',
    phonetic: '/səˈsteɪn/',
    pos: 'v.',
    senses: [
      { pos: 'v.', cn: '维持，支撑' },
      { pos: 'v.', cn: '遭受' }
    ],
    example: 'It is hard to sustain attention for ninety minutes.',
    exampleCn: '很难维持九十分钟的注意力。',
    level: 'CET-4'
  },
  {
    word: 'subtle',
    phonetic: '/ˈsʌtl/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '微妙的，细微的' },
      { pos: 'adj.', cn: '精巧的' }
    ],
    example: 'The shift in tone is subtle but decisive.',
    exampleCn: '语气的变化很微妙，却是决定性的。',
    level: 'CET-4'
  },
  {
    word: 'sufficient',
    phonetic: '/səˈfɪʃnt/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '足够的，充分的' }],
    example: 'Two hours may be sufficient for this section.',
    exampleCn: '这一部分两小时可能足够。',
    level: 'CET-4'
  },
  {
    word: 'threshold',
    phonetic: '/ˈθreʃhəʊld/',
    pos: 'n.',
    senses: [
      { pos: 'n.', cn: '门槛，界限' },
      { pos: 'n.', cn: '开端' }
    ],
    example: 'There is a threshold below which practice feels pointless.',
    exampleCn: '存在一个阈值，低于它练习就显得没有意义。',
    level: 'CET-6'
  },
  {
    word: 'transparent',
    phonetic: '/trænsˈpærənt/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '透明的' },
      { pos: 'adj.', cn: '公开透明的' }
    ],
    example: 'The marking scheme should be transparent to candidates.',
    exampleCn: '评分标准应当对考生公开透明。',
    level: 'CET-4'
  },
  {
    word: 'undermine',
    phonetic: '/ˌʌndəˈmaɪn/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '削弱，暗中破坏' }],
    example: 'Constant interruption undermines deep reading.',
    exampleCn: '不断的打断会削弱深度阅读。',
    level: 'CET-6',
    examTags: ['考研']
  },
  {
    word: 'unprecedented',
    phonetic: '/ʌnˈpresɪdentɪd/',
    pos: 'adj.',
    senses: [{ pos: 'adj.', cn: '前所未有的' }],
    example: 'The pace of change is unprecedented.',
    exampleCn: '变化的速度是前所未有的。',
    level: 'CET-6'
  },
  {
    word: 'vulnerable',
    phonetic: '/ˈvʌlnərəbl/',
    pos: 'adj.',
    senses: [
      { pos: 'adj.', cn: '易受伤害的，脆弱的' },
      { pos: 'adj.', cn: '易受攻击的' }
    ],
    example: 'Beginner readers are vulnerable to discouragement.',
    exampleCn: '初学阅读者容易受挫。',
    collocations: ['vulnerable to', 'vulnerable groups'],
    level: 'CET-4'
  },
  {
    word: 'withstand',
    phonetic: '/wɪðˈstænd/',
    pos: 'v.',
    senses: [{ pos: 'v.', cn: '经受住，抵挡' }],
    example: 'The habit withstood a whole semester of deadlines.',
    exampleCn: '这个习惯经受住了整个学期的截止日期。',
    level: 'CET-6'
  },
  {
    word: 'yield',
    phonetic: '/jiːld/',
    pos: 'v. / n.',
    senses: [
      { pos: 'v.', cn: '产生，得出' },
      { pos: 'v.', cn: '屈服（to）' },
      { pos: 'n.', cn: '产量' }
    ],
    example: 'The experiment yielded a surprising result.',
    exampleCn: '实验得出了令人惊讶的结果。',
    collocations: ['yield results', 'yield to pressure'],
    level: 'CET-4'
  }
];

export const lexiconMap = new Map(lexicon.map((w) => [w.word.toLowerCase(), w]));

/** 常见屈折变化回退（去后缀的简单规则），仅用于演示查词 */
export function lookupWord(raw: string): LexiconEntry | undefined {
  const w = raw.toLowerCase().replace(/[^a-z'-]/g, '');
  if (!w) return undefined;
  const direct = lexiconMap.get(w);
  if (direct) return direct;
  const candidates = new Set<string>();
  if (w.endsWith('ies')) candidates.add(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) candidates.add(w.slice(0, -2));
  if (w.endsWith('s')) candidates.add(w.slice(0, -1));
  if (w.endsWith('ed')) {
    candidates.add(w.slice(0, -2));
    candidates.add(w.slice(0, -1));
    if (w.length > 3 && w[w.length - 3] === w[w.length - 4]) candidates.add(w.slice(0, -3));
  }
  if (w.endsWith('ing')) {
    candidates.add(w.slice(0, -3));
    candidates.add(w.slice(0, -3) + 'e');
  }
  if (w.endsWith('ly')) candidates.add(w.slice(0, -2));
  if (w.endsWith('er')) candidates.add(w.slice(0, -2));
  if (w.endsWith('est')) candidates.add(w.slice(0, -3));
  for (const c of candidates) {
    const hit = lexiconMap.get(c);
    if (hit) return hit;
  }
  return undefined;
}