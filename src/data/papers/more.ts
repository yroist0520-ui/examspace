import type { Paper } from '@/types/paper';

const NOTE = '本套试卷为 EXAMSPACE 自编示例数据，用于演示产品功能，不是任何考试的历年真题。';

export const kaoyan1_2025: Paper = {
  id: 'kaoyan1-2025-01',
  exam: 'kaoyan1',
  year: 2025,
  session: '12月',
  setNo: 1,
  title: '考研英语（一）· 示例卷 A',
  subtitle: '2025 年 · 示例数据',
  difficulty: 4,
  minutes: 180,
  words: 2150,
  tags: ['学术阅读', '科技伦理', '长难句'],
  summary: '围绕“算法推荐与自主选择”的学术型示例卷，含完形、四篇阅读、翻译与写作。',
  sample: true,
  sampleNote: NOTE,
  parts: [
    {
      id: 'cloze',
      kind: 'cloze',
      title: 'Section I  Use of English',
      instructions: 'Directions: Read the following text. Choose the best word(s) for each numbered blank.',
      minutes: 20,
      questions: [
        {
          id: 'ky1-2025-cl1',
          number: 1,
          type: 'single',
          stem: 'Recommendation systems are often described as __1__ tools, yet they shape what we encounter.',
          options: [
            { key: 'A', text: 'neutral' },
            { key: 'B', text: 'mutual' },
            { key: 'C', text: 'rigid' },
            { key: 'D', text: 'spare' }
          ],
          answer: 'A',
          explanation:
            'yet 提示转折：系统被描述为“中立”的工具，实际上却塑造了我们接触到的内容。neutral 与后文张力形成对照。mutual 需搭配关系双方；rigid 与“工具”搭配不自然；spare 语义不合。',
          score: 0.5
        },
        {
          id: 'ky1-2025-cl2',
          number: 2,
          type: 'single',
          stem: 'A filter that quietly removes options is __2__ from one that argues for a choice.',
          options: [
            { key: 'A', text: 'distinct' },
            { key: 'B', text: 'derived' },
            { key: 'C', text: 'immune' },
            { key: 'D', text: 'modest' }
          ],
          answer: 'A',
          explanation:
            'be distinct from 表示“与……不同”，句意为“悄悄删除选项的过滤器，与为某个选择辩护的机制不同”。derived from 语义不通，immune from 指“不受影响”，modest 不接 from。',
          score: 0.5
        },
        {
          id: 'ky1-2025-cl3',
          number: 3,
          type: 'single',
          stem: 'The distinction matters because autonomy __3__ on the visibility of alternatives.',
          options: [
            { key: 'A', text: 'insists' },
            { key: 'B', text: 'depends' },
            { key: 'C', text: 'imposes' },
            { key: 'D', text: 'reflects' }
          ],
          answer: 'B',
          explanation:
            'depend on 表示“取决于”，自主性取决于可选项是否可见，逻辑成立。insist on 语义不符；impose on 意为“强加于”；reflect on 意为“思考”，均不搭配 autonomy 与 visibility 的关系。',
          score: 0.5
        },
        {
          id: 'ky1-2025-cl4',
          number: 4,
          type: 'single',
          stem: 'When a system learns from past choices, it may __4__ the very preferences it is meant to serve.',
          options: [
            { key: 'A', text: 'reinforce' },
            { key: 'B', text: 'suspend' },
            { key: 'C', text: 'borrow' },
            { key: 'D', text: 'predict' }
          ],
          answer: 'A',
          explanation:
            '句意为“系统可能强化它本应服务的偏好”，形成反馈回路的批评，reinforce 最贴切。predict 本身不构成问题，无法形成 may ... the very preferences 的批评语气。',
          score: 0.5
        },
        {
          id: 'ky1-2025-cl5',
          number: 5,
          type: 'single',
          stem: 'Critics therefore call for greater __5__ about how such rankings are produced.',
          options: [
            { key: 'A', text: 'caution' },
            { key: 'B', text: 'transparency' },
            { key: 'C', text: 'distance' },
            { key: 'D', text: 'tolerance' }
          ],
          answer: 'B',
          explanation:
            'call for greater transparency about how ... are produced 是公共讨论中的固定搭配，意为“呼吁提高生产过程透明度”。caution about 也可搭配但与“如何产生”这一信息诉求不匹配。',
          score: 0.5
        }
      ]
    },
    {
      id: 'reading',
      kind: 'reading',
      title: 'Section II  Reading Comprehension',
      instructions: 'Directions: Read the passages and answer the questions by choosing A, B, C or D.',
      minutes: 80,
      passages: [
        {
          id: 'p1',
          title: 'Text 1',
          source: 'EXAMSPACE 原创示例文本',
          paragraphs: [
            {
              id: 'p1-1',
              marker: 'A',
              text: 'Economists have long assumed that more information produces better decisions. Give people the facts, the argument goes, and they will act on them. The assumption is attractive because it flatters both the provider of information and the receiver of it. It is also, in a wide range of settings, false.'
            },
            {
              id: 'p1-2',
              marker: 'B',
              text: 'The problem is not that people ignore information. It is that information arrives with a cost that is rarely counted: the cost of deciding which parts of it are relevant. A patient handed forty pages of test results has not been empowered; she has been given a second job. A shopper comparing nine nearly identical insurance policies may postpone the decision altogether, not because the options are bad but because the comparison itself has become the obstacle.'
            },
            {
              id: 'p1-3',
              marker: 'C',
              text: 'This is why the most effective reforms are often not about disclosing more but about disclosing differently. A single summary line at the top of a statement, a default that is genuinely sensible, a comparison expressed in units the reader already uses — none of these tricks hide information. They simply move the cost of sorting from the reader to the designer, where it can be paid once instead of a million times.'
            },
            {
              id: 'p1-4',
              marker: 'D',
              text: 'The objection will be familiar: choosing a default is choosing for people, and designers may choose badly or self-interestedly. That objection is serious, and it is an argument for scrutiny of defaults, not for the abandonment of design. The alternative — maximum disclosure with minimum structure — is not neutrality. It is a decision to let the burden fall on those with the least time to carry it.'
            }
          ]
        },
        {
          id: 'p2',
          title: 'Text 2',
          source: 'EXAMSPACE 原创示例文本',
          paragraphs: [
            {
              id: 'p2-1',
              marker: 'A',
              text: 'When a city plants trees, it usually justifies the expense with numbers: shade reduces cooling costs, foliage absorbs particulates, property values rise. These are real effects, and they are measurable, which is precisely why they dominate the conversation. What the numbers cannot easily capture is the reason residents often give when asked why the trees matter: the street feels different.'
            },
            {
              id: 'p2-2',
              marker: 'B',
              text: 'Urban planners have a word for this — "soft benefits" — and the phrase carries an unfortunate implication, as if the feeling of a street were a decorative addition to the hard facts. In practice the soft benefits are frequently the ones that determine whether a project survives. Residents who feel that a street belongs to them will use it, defend it, and report problems on it; residents who do not will treat it as a corridor to be crossed as quickly as possible. The measurable benefits follow the unmeasurable ones.'
            },
            {
              id: 'p2-3',
              marker: 'C',
              text: 'This has an awkward consequence for policy. Trees must be justified in the language of accounting to receive funding, but the case for trees is partly a case about a feeling that accounting cannot record. The temptation is to inflate the measurable numbers until they carry the whole argument. A better response is to treat the numbers as necessary but incomplete, and to build in explicit space for the judgement that a street has become somewhere people want to be.'
            }
          ]
        }
      ],
      questions: [
        {
          id: 'ky1-2025-r21',
          number: 21,
          type: 'single',
          stem: 'The author mentions the patient with forty pages of test results to show that',
          options: [
            { key: 'A', text: 'medical information is often inaccurate.' },
            { key: 'B', text: 'more information can create new work.' },
            { key: 'C', text: 'patients rarely trust their doctors.' },
            { key: 'D', text: 'test results should be withheld.' }
          ],
          answer: 'B',
          explanation:
            'B 段以病人为例说明“信息本身带来分类成本”，即信息越多反而增加工作负担，B 正确。作者并未主张隐瞒信息（排除 D），也未质疑信息准确性。',
          evidence: { paragraphId: 'p1-2', quote: 'A patient handed forty pages of test results has not been empowered; she has been given a second job.' },
          score: 2
        },
        {
          id: 'ky1-2025-r22',
          number: 22,
          type: 'single',
          stem: 'According to Paragraph C, effective reforms tend to',
          options: [
            { key: 'A', text: 'reduce the total amount of information.' },
            { key: 'B', text: 'shift the cost of sorting to designers.' },
            { key: 'C', text: 'persuade readers to accept defaults.' },
            { key: 'D', text: 'standardise all comparison units.' }
          ],
          answer: 'B',
          explanation:
            'C 段末句“They simply move the cost of sorting from the reader to the designer”，B 为原句改写。A 与“not about disclosing more but about disclosing differently”矛盾。',
          evidence: { paragraphId: 'p1-3', quote: 'move the cost of sorting from the reader to the designer' },
          score: 2
        },
        {
          id: 'ky1-2025-r23',
          number: 23,
          type: 'single',
          stem: 'The author responds to the objection about defaults by',
          options: [
            { key: 'A', text: 'denying that designers have interests.' },
            { key: 'B', text: 'accepting it and recommending less design.' },
            { key: 'C', text: 'treating it as a reason to examine defaults.' },
            { key: 'D', text: 'arguing that readers can change defaults.' }
          ],
          answer: 'C',
          explanation:
            'D 段“it is an argument for scrutiny of defaults, not for the abandonment of design”，作者承认反对意见严肃，但结论是加强审查而非放弃设计，C 正确。',
          evidence: { paragraphId: 'p1-4', quote: 'an argument for scrutiny of defaults, not for the abandonment of design' },
          score: 2
        },
        {
          id: 'ky1-2025-r24',
          number: 24,
          type: 'single',
          stem: 'The phrase "the street feels different" is used to introduce',
          options: [
            { key: 'A', text: 'a benefit that resists measurement.' },
            { key: 'B', text: 'a reason to reduce tree planting.' },
            { key: 'C', text: 'a measurable property of foliage.' },
            { key: 'D', text: 'a complaint about city services.' }
          ],
          answer: 'A',
          explanation:
            '第二篇 A 段以“the street feels different”引出无法被数字捕捉的收益，B 段以 soft benefits 命名，A 正确。',
          evidence: { paragraphId: 'p2-1', quote: 'the street feels different.' },
          score: 2
        },
        {
          id: 'ky1-2025-r25',
          number: 25,
          type: 'single',
          stem: 'Which statement best captures the author\'s view in the last paragraph of Text 2?',
          options: [
            { key: 'A', text: 'Accounting language should be abandoned.' },
            { key: 'B', text: 'Numbers should be inflated to win funding.' },
            { key: 'C', text: 'Numbers are necessary but not sufficient.' },
            { key: 'D', text: 'Soft benefits cannot influence policy.' }
          ],
          answer: 'C',
          explanation:
            'C 段“treat the numbers as necessary but incomplete”，C 为同义表述。A、B 与作者主张相反；D 与“soft benefits determine whether a project survives”矛盾。',
          evidence: { paragraphId: 'p2-3', quote: 'treat the numbers as necessary but incomplete' },
          score: 2
        }
      ]
    },
    {
      id: 'translation',
      kind: 'translation',
      title: 'Section III  Translation',
      instructions: 'Directions: Translate the following passage into English.',
      minutes: 25,
      questions: [
        {
          id: 'ky1-2025-t1',
          number: 46,
          type: 'translation',
          stem:
            '中国传统文化强调“知行合一”。这种观念认为，知识和行动不是两件事，而是一个完整过程的两个方面。一个人只有把学到的道理用于日常事务，才算真正理解了它。这一思想在今天依然影响着许多人的学习方式。',
          answer:
            '参考译文：Traditional Chinese culture stresses the unity of knowledge and action. According to this view, knowing and doing are not two separate things but two aspects of a single process. Only when a person applies what has been learned to everyday affairs can he be said to have truly understood it. This idea still shapes the way many people learn today.',
          explanation:
            '难点：①“知行合一”需意译，unity of knowledge and action；②“不是……而是……”用 not ... but ...；③“只有……才……”用 Only when 置于句首并部分倒装；④“才算真正理解”用 can he be said to have truly understood，避免中式英语。',
          score: 10
        }
      ],
      reference: {
        translation:
          'Traditional Chinese culture stresses the unity of knowledge and action. According to this view, knowing and doing are not two separate things but two aspects of a single process. Only when a person applies what has been learned to everyday affairs can he be said to have truly understood it. This idea still shapes the way many people learn today.'
      }
    },
    {
      id: 'writing',
      kind: 'writing',
      title: 'Section IV  Writing',
      instructions:
        'Directions: Write an essay of 160-200 words based on the following situation. In your essay, you should describe the situation, interpret its meaning, and give your comment.',
      minutes: 35,
      questions: [
        {
          id: 'ky1-2025-w1',
          number: 47,
          type: 'writing',
          stem:
            'A growing number of students choose to record lectures and listen to them again instead of taking notes in class. Write an essay of 160-200 words commenting on this trend.',
          answer: '参考范文见解析。',
          explanation:
            '结构建议：描述现象（录音替代笔记）→ 分析双向影响（解放注意力 / 削弱即时加工）→ 给出立场与可执行建议（录音作为补充而非替代）。评分关注立场清晰、论证具体、语言准确，避免只罗列优缺点而无判断。',
          score: 20
        }
      ],
      reference: {
        essay:
          'Walk into any lecture hall and you will see a row of phones propped against water bottles, quietly recording. For many students, the audio file has replaced the notebook, and the reasoning is easy to sympathise with: listening feels more attentive than writing.\n\nThere is something to this. Note-taking splits attention, and a student who is copying a definition may miss the qualification that follows it. A recording, in contrast, preserves everything, including the hesitation before an important point.\n\nYet the trade has a hidden cost. Notes are not a transcript; they are a record of what the listener has already understood, compressed into the listener\'s own words. That compression is the learning. A student who records everything may find, at the end of term, that they possess hours of audio and very little comprehension.\n\nThe sensible arrangement is not to choose between the two but to rank them. Record the lecture as a safety net, then take notes from the recording, pausing where the argument turns. The file becomes a tool for a second pass rather than a substitute for the first.',
        guidance: [
          '首段描述现象，用具体场景代替抽象概括。',
          '中间两段分别承认合理性并指出隐藏成本，形成张力。',
          '末段给出“排序而非二选一”的可执行结论，体现思辨。'
        ]
      }
    }
  ]
};

export const cet6_2024_12: Paper = {
  id: 'cet6-2024-12-01',
  exam: 'cet6',
  year: 2024,
  session: '12月',
  setNo: 1,
  title: '大学英语六级 · 示例卷 A',
  subtitle: '2024 年 12 月（第 1 套）· 示例数据',
  difficulty: 3,
  minutes: 130,
  words: 1780,
  tags: ['城市研究', '注意力经济', '图表描述'],
  summary: '以“城市噪音与注意力”为主题的示例套卷，含写作、听力、选词填空、长篇阅读与翻译。',
  sample: true,
  sampleNote: NOTE,
  parts: [
    {
      id: 'listening',
      kind: 'listening',
      title: 'Part II  Listening Comprehension',
      instructions: 'Directions: Listen to the recording and choose the best answer to each question.',
      minutes: 30,
      audio: {
        note: '示例音频由浏览器语音合成朗读原文，用于演示播放、倍速与原文定位。',
        segments: [
          {
            id: 'ls-a',
            label: 'Lecture',
            questionNo: 8,
            seconds: 70,
            text: 'Good morning. Today I want to talk about what happens to attention in a noisy city. Most of us assume that noise is a problem because it is unpleasant, and that the solution is simply to make it quieter. But the research suggests something more interesting. What matters is not only the volume of sound but its unpredictability. A steady hum, even a fairly loud one, is something the brain can learn to ignore. A door slamming at random intervals is not. The brain keeps a channel open for the unexpected sound, and that open channel is expensive. It draws resources away from whatever else you are doing. So when we design quieter streets, the goal is not silence. The goal is predictability.'
          },
          {
            id: 'ls-b',
            label: 'Conversation',
            questionNo: 10,
            seconds: 45,
            text: 'Man: I read that the city is planning to replace the fountain in the square with a grass lawn. Woman: Really? The fountain is the only thing that covers the traffic noise. Man: That is what the engineers say too. They are proposing a low wall instead, with plants behind it. Woman: A wall would not sound like water, but at least it would be constant. Man: Exactly. Constant is the word they keep using.'
          }
        ]
      },
      questions: [
        {
          id: 'cet6-2024-12-01-l8',
          number: 8,
          type: 'single',
          groupId: 'ls-a',
          stem: 'What does the speaker say matters most about urban noise?',
          options: [
            { key: 'A', text: 'Its total volume.' },
            { key: 'B', text: 'Its unpredictability.' },
            { key: 'C', text: 'Its source.' },
            { key: 'D', text: 'Its duration.' }
          ],
          answer: 'B',
          explanation:
            '演讲明确指出“What matters is not only the volume of sound but its unpredictability”，并把可预测性作为设计目标，B 正确。',
          evidence: { paragraphId: 'ls-a' },
          score: 1
        },
        {
          id: 'cet6-2024-12-01-l9',
          number: 9,
          type: 'single',
          groupId: 'ls-a',
          stem: 'Why is a random sound more costly than a steady one?',
          options: [
            { key: 'A', text: 'It is usually louder.' },
            { key: 'B', text: 'It lasts longer.' },
            { key: 'C', text: 'It keeps a mental channel open.' },
            { key: 'D', text: 'It damages hearing faster.' }
          ],
          answer: 'C',
          explanation:
            '原文“The brain keeps a channel open for the unexpected sound, and that open channel is expensive”，C 为原句改写。',
          evidence: { paragraphId: 'ls-a' },
          score: 1
        },
        {
          id: 'cet6-2024-12-01-l10',
          number: 10,
          type: 'single',
          groupId: 'ls-b',
          stem: 'Why does the woman value the fountain?',
          options: [
            { key: 'A', text: 'It attracts visitors.' },
            { key: 'B', text: 'It masks traffic noise.' },
            { key: 'C', text: 'It cools the square.' },
            { key: 'D', text: 'It is historically important.' }
          ],
          answer: 'B',
          explanation:
            '女士说“The fountain is the only thing that covers the traffic noise”，cover 在此意为“掩盖（声音）”，选 B。',
          evidence: { paragraphId: 'ls-b' },
          score: 1
        },
        {
          id: 'cet6-2024-12-01-l11',
          number: 11,
          type: 'single',
          groupId: 'ls-b',
          stem: 'What do the engineers emphasise about the proposed wall?',
          options: [
            { key: 'A', text: 'It is cheaper.' },
            { key: 'B', text: 'It looks more natural.' },
            { key: 'C', text: 'It produces a constant sound.' },
            { key: 'D', text: 'It blocks wind.' }
          ],
          answer: 'C',
          explanation:
            '对话结尾“Constant is the word they keep using”，与讲座中“可预测性”呼应，选 C。',
          evidence: { paragraphId: 'ls-b' },
          score: 1
        }
      ]
    },
    {
      id: 'reading',
      kind: 'reading',
      title: 'Part IV  Reading Comprehension',
      instructions: 'Directions: Read the passage and answer the questions.',
      minutes: 45,
      passages: [
        {
          id: 'p1',
          title: 'Passage One',
          source: 'EXAMSPACE 原创示例文本',
          paragraphs: [
            {
              id: 'p1-1',
              marker: 'A',
              text: 'The modern office was designed around a simple theory of productivity: remove distraction, and work will happen. Walls came down to encourage collaboration; notifications were added to keep everyone informed; open plans replaced corridors. Each decision made sense on its own. Together they produced an environment in which the average worker is interrupted roughly every eleven minutes, and needs more than twenty to return to the task at hand.'
            },
            {
              id: 'p1-2',
              marker: 'B',
              text: 'The cost is not the interruption itself but what it does to the shape of thought. A writer who is interrupted mid-sentence can usually resume the sentence. A writer who is interrupted while deciding what the sentence should argue must rebuild the whole structure, and may quietly choose a simpler claim instead. Over a week, this is how ambitious work becomes cautious work without anyone deciding that it should.'
            },
            {
              id: 'p1-3',
              marker: 'C',
              text: 'Some organisations have responded by introducing "focus hours", blocks of the morning when meetings are discouraged and messages may be answered late. The results are modest but consistent: people report finishing more of what they start. The discouraging part is how often the policy survives only until the first urgent project, at which point the calendar fills again and the block becomes a formality.'
            },
            {
              id: 'p1-4',
              marker: 'D',
              text: 'What the successful cases share is not a better tool but a different expectation. In those offices, a delayed reply is not read as indifference, and a closed door is not read as arrogance. The norm has shifted from availability to attentiveness. That shift is cheap to describe and expensive to make, because it requires the most senior person in the room to be interrupted least — and to say so out loud.'
            }
          ]
        }
      ],
      questions: [
        {
          id: 'cet6-2024-12-01-r46',
          number: 46,
          type: 'single',
          stem: 'What is the main point of Paragraph A?',
          options: [
            { key: 'A', text: 'Open offices failed because of poor design tools.' },
            { key: 'B', text: 'Individually sensible choices produced a distracting environment.' },
            { key: 'C', text: 'Collaboration is less valuable than privacy.' },
            { key: 'D', text: 'Notifications should be removed entirely.' }
          ],
          answer: 'B',
          explanation:
            'A 段“Each decision made sense on its own. Together they produced an environment ... interrupted roughly every eleven minutes”，强调局部合理导致整体失衡，B 最准确。',
          evidence: { paragraphId: 'p1-1', quote: 'Each decision made sense on its own.' },
          score: 1
        },
        {
          id: 'cet6-2024-12-01-r47',
          number: 47,
          type: 'single',
          stem: 'According to Paragraph B, the deeper cost of interruption is that',
          options: [
            { key: 'A', text: 'workers forget factual details.' },
            { key: 'B', text: 'people lower the ambition of their work.' },
            { key: 'C', text: 'meetings become longer.' },
            { key: 'D', text: 'writing quality declines mechanically.' }
          ],
          answer: 'B',
          explanation:
            'B 段末句“this is how ambitious work becomes cautious work without anyone deciding that it should”，即抱负被悄悄降低，B 正确。',
          evidence: { paragraphId: 'p1-2', quote: 'this is how ambitious work becomes cautious work' },
          score: 1
        },
        {
          id: 'cet6-2024-12-01-r48',
          number: 48,
          type: 'single',
          stem: 'What does the author find discouraging about "focus hours"?',
          options: [
            { key: 'A', text: 'They are unpopular with staff.' },
            { key: 'B', text: 'They rarely survive the first urgent project.' },
            { key: 'C', text: 'They reduce meeting quality.' },
            { key: 'D', text: 'They apply only to senior staff.' }
          ],
          answer: 'B',
          explanation:
            'C 段“how often the policy survives only until the first urgent project”，B 为同义表述。',
          evidence: { paragraphId: 'p1-3', quote: 'the policy survives only until the first urgent project' },
          score: 1
        },
        {
          id: 'cet6-2024-12-01-r49',
          number: 49,
          type: 'single',
          stem: 'What do successful cases have in common?',
          options: [
            { key: 'A', text: 'Better collaboration software.' },
            { key: 'B', text: 'Fewer meetings in total.' },
            { key: 'C', text: 'A norm that values attentiveness over availability.' },
            { key: 'D', text: 'Strict limits on email.' }
          ],
          answer: 'C',
          explanation:
          'D 段“The norm has shifted from availability to attentiveness”直接给出答案，C 正确。作者明确说“not a better tool”（排除 A）。',
          evidence: { paragraphId: 'p1-4', quote: 'The norm has shifted from availability to attentiveness.' },
          score: 1
        }
      ]
    },
    {
      id: 'translation',
      kind: 'translation',
      title: 'Part V  Translation',
      instructions: 'Directions: Translate the following passage into English.',
      minutes: 30,
      questions: [
        {
          id: 'cet6-2024-12-01-t1',
          number: 56,
          type: 'translation',
          stem:
            '近年来，中国许多城市在改造老旧街区时，开始注重保留原有的生活气息。设计者不再一味追求整齐划一，而是尝试保留小店铺、老树和熟悉的街角。这种做法使居民在新环境中仍能找到归属感。',
          answer:
            '参考译文：In recent years, when renovating old neighbourhoods, many Chinese cities have begun to pay attention to preserving the original atmosphere of daily life. Instead of pursuing uniformity, designers now try to keep small shops, old trees and familiar street corners. This approach allows residents to retain a sense of belonging in their new surroundings.',
          explanation:
            '关键点：①“改造老旧街区”renovate old neighbourhoods；②“一味追求整齐划一”Instead of pursuing uniformity，用介词短语前置更简洁；③“生活气息”可译 atmosphere of daily life，避免直译 flavour of life；④“归属感”sense of belonging 为固定搭配。',
          score: 15
        }
      ],
      reference: {
        translation:
          'In recent years, when renovating old neighbourhoods, many Chinese cities have begun to pay attention to preserving the original atmosphere of daily life. Instead of pursuing uniformity, designers now try to keep small shops, old trees and familiar street corners. This approach allows residents to retain a sense of belonging in their new surroundings.'
      }
    }
  ]
};

export const cet4_2023_06: Paper = {
  id: 'cet4-2023-06-02',
  exam: 'cet4',
  year: 2023,
  session: '6月',
  setNo: 2,
  title: '大学英语四级 · 示例卷 B',
  subtitle: '2023 年 6 月（第 2 套）· 示例数据',
  difficulty: 2,
  minutes: 125,
  words: 1180,
  tags: ['科技', '人际沟通', '选词填空'],
  summary: '以“屏幕时间与面对面交流”为主题的示例套卷，适合首次完整模考。',
  sample: true,
  sampleNote: NOTE,
  parts: [
    {
      id: 'reading',
      kind: 'reading',
      title: 'Part III  Reading Comprehension',
      instructions: 'Directions: Read the passage and answer the questions.',
      minutes: 40,
      passages: [
        {
          id: 'p1',
          title: 'Passage One',
          source: 'EXAMSPACE 原创示例文本',
          paragraphs: [
            {
              id: 'p1-1',
              marker: 'A',
              text: 'A friend once described the difference between texting and talking this way: texting is a series of decisions, while talking is a continuous act. In a text you can choose every word, delete it, and choose again. In conversation you cannot. You speak, you watch the other person receive it, and you adjust. The adjustment is the interesting part.'
            },
            {
              id: 'p1-2',
              marker: 'B',
              text: 'This is not an argument against texting. Written messages have made it possible for friends in different time zones to stay close, and for people who find speech difficult to say what they mean. But it is worth noticing what the medium rewards. Text rewards precision and punishes hesitation. Speech rewards responsiveness and forgives clumsiness, because the listener can see the effort that went into the sentence.'
            },
            {
              id: 'p1-3',
              marker: 'C',
              text: 'The result is that some young people now find the phone call faintly alarming. A call has no editing stage and no visible cue that the other person is still thinking. Many students say they rehearse a call before making it, which is exactly what a text would let them avoid. The skill being lost is not grammar. It is the ability to be unfinished in front of someone else.'
            }
          ]
        }
      ],
      questions: [
        {
          id: 'cet4-2023-06-02-r1',
          number: 46,
          type: 'single',
          stem: 'How does the author contrast texting with talking?',
          options: [
            { key: 'A', text: 'Texting takes more effort.' },
            { key: 'B', text: 'Texting allows constant revision.' },
            { key: 'C', text: 'Talking is more precise.' },
            { key: 'D', text: 'Talking requires fewer decisions.' }
          ],
          answer: 'B',
          explanation:
            'A 段“In a text you can choose every word, delete it, and choose again”，即文字可以反复修改，B 正确。C 与 B 段“Text rewards precision”相反。',
          evidence: { paragraphId: 'p1-1' },
          score: 1
        },
        {
          id: 'cet4-2023-06-02-r2',
          number: 47,
          type: 'single',
          stem: 'What does the author say is the value of written messages?',
          options: [
            { key: 'A', text: 'They improve grammar.' },
            { key: 'B', text: 'They help people across time zones and those who find speech hard.' },
            { key: 'C', text: 'They make conversations shorter.' },
            { key: 'D', text: 'They replace phone calls entirely.' }
          ],
          answer: 'B',
          explanation:
            'B 段“Written messages have made it possible for friends in different time zones to stay close, and for people who find speech difficult”，B 为原文概括。',
          evidence: { paragraphId: 'p1-2' },
          score: 1
        },
        {
          id: 'cet4-2023-06-02-r3',
          number: 48,
          type: 'single',
          stem: 'What skill does the author think is being lost?',
          options: [
            { key: 'A', text: 'Writing precisely.' },
            { key: 'B', text: 'Speaking grammatically.' },
            { key: 'C', text: 'Being unfinished in front of others.' },
            { key: 'D', text: 'Remembering phone numbers.' }
          ],
          answer: 'C',
          explanation:
          'C 段末句“The skill being lost is not grammar. It is the ability to be unfinished in front of someone else.”明确排除 A、B，选 C。',
          evidence: { paragraphId: 'p1-3' },
          score: 1
        }
      ]
    },
    {
      id: 'cloze',
      kind: 'cloze',
      title: 'Part IV  Banked Cloze',
      instructions: 'Directions: Fill in each blank with a word from the bank.',
      minutes: 10,
      bank: {
        A: 'aware',
        B: 'hesitation',
        C: 'immediate',
        D: 'occasional',
        E: 'precision',
        F: 'rehearse',
        G: 'replace',
        H: 'slow'
      },
      questions: [
        {
          id: 'cet4-2023-06-02-c26',
          number: 26,
          type: 'bank',
          stem: 'Texting rewards __26__ rather than spontaneity.',
          answer: 'E',
          explanation: '与 rather than spontaneity 形成对照，需填名词，precision 与 B 段“Text rewards precision”呼应。',
          score: 1
        },
        {
          id: 'cet4-2023-06-02-c27',
          number: 27,
          type: 'bank',
          stem: 'Some students __27__ a call before making it.',
          answer: 'F',
          explanation: '主语为复数，需动词原形，rehearse a call 意为“预演一次通话”，与原文一致。',
          score: 1
        },
        {
          id: 'cet4-2023-06-02-c28',
          number: 28,
          type: 'bank',
          stem: 'A phone call offers no __28__ cue that the other person is still thinking.',
          answer: 'C',
          explanation: '需形容词修饰 cue，immediate 表示“即时的”，与后文 still thinking 形成对比。',
          score: 1
        },
        {
          id: 'cet4-2023-06-02-c29',
          number: 29,
          type: 'bank',
          stem: 'Conversation forgives __29__ clumsiness.',
          answer: 'D',
          explanation: '需形容词修饰 clumsiness，occasional（偶尔的）最符合“偶尔的笨拙可以被原谅”的语义。',
          score: 1
        },
        {
          id: 'cet4-2023-06-02-c30',
          number: 30,
          type: 'bank',
          stem: 'Being __30__ of the trade-off helps us choose the right medium.',
          answer: 'A',
          explanation: 'be aware of 为固定搭配，句意为“意识到这种取舍有助于我们选择合适媒介”。',
          score: 1
        }
      ]
    }
  ]
};

export const tem4_2024: Paper = {
  id: 'tem4-2024-01',
  exam: 'tem4',
  year: 2024,
  session: '春季',
  setNo: 1,
  title: '英语专业四级 · 示例卷 A',
  subtitle: '2024 年 · 示例数据',
  difficulty: 3,
  minutes: 130,
  words: 1560,
  tags: ['听写', '语言知识', '文学阅读'],
  summary: '面向英专基础阶段的示例卷，含听写、听力、语言知识、阅读与写作。',
  sample: true,
  sampleNote: NOTE,
  parts: [
    {
      id: 'listening',
      kind: 'listening',
      title: 'Part II  Dictation',
      instructions: 'Directions: Listen to the passage and write it down. The passage will be read four times.',
      minutes: 15,
      audio: {
        note: '示例音频由浏览器语音合成朗读，用于演示听写训练与原文对照。',
        segments: [
          {
            id: 'ls-a',
            label: 'Dictation',
            seconds: 60,
            text: 'The habit of keeping a notebook is older than printing. Merchants kept ledgers, monks kept calendars, and readers kept collections of sentences they did not want to lose. What these practices share is a belief that a thought not written down belongs to the moment rather than to the person. The notebook is a promise to the future self, and like most promises it is easier to make than to keep.'
          }
        ]
      },
      questions: [
        {
          id: 'tem4-2024-d1',
          number: 1,
          type: 'writing',
          stem: '听写：逐句写下你听到的内容。',
          answer:
            'The habit of keeping a notebook is older than printing. Merchants kept ledgers, monks kept calendars, and readers kept collections of sentences they did not want to lose. What these practices share is a belief that a thought not written down belongs to the moment rather than to the person. The notebook is a promise to the future self, and like most promises it is easier to make than to keep.',
          explanation:
            '听写评分点：older than printing（比较结构）、ledgers / calendars（拼写）、What these practices share is a belief that ...（主语从句 + 同位语从句）、belongs to the moment rather than to the person（rather than 平行）、easier to make than to keep（比较省略）。',
          score: 15
        }
      ]
    },
    {
      id: 'reading',
      kind: 'reading',
      title: 'Part V  Reading Comprehension',
      instructions: 'Directions: Read the passage and answer the questions.',
      minutes: 30,
      passages: [
        {
          id: 'p1',
          title: 'Passage One',
          source: 'EXAMSPACE 原创示例文本',
          paragraphs: [
            {
              id: 'p1-1',
              marker: 'A',
              text: 'It is a curious fact about libraries that the most heavily used copies of a novel are rarely the most heavily annotated. The books that carry marginalia tend to be second-hand, bought by someone who inherited another reader\'s habit of argument. The pencil marks are not evidence of use but of company: a previous reader disagreeing in the margin, underlining a phrase that seemed, at the time, to be the whole point.'
            },
            {
              id: 'p1-2',
              marker: 'B',
              text: 'Writers have long been ambivalent about this company. Some treat annotations as vandalism, a defacement of the object they laboured to make. Others collect their own annotated copies as a record of thinking. The difference is not aesthetic but temporal: the first group sees the book as a finished thing, the second as an unfinished conversation into which another voice may enter.'
            },
            {
              id: 'p1-3',
              marker: 'C',
              text: 'For the student, the practical lesson is simple enough. An annotation made in the first reading will almost always embarrass you in the second, and that embarrassment is useful information. It marks the exact place where your reading has changed. A clean copy, however well preserved, cannot tell you that.'
            }
          ]
        }
      ],
      questions: [
        {
          id: 'tem4-2024-r1',
          number: 21,
          type: 'single',
          stem: 'What does the author find curious about library copies?',
          options: [
            { key: 'A', text: 'They are rarely borrowed.' },
            { key: 'B', text: 'The most used copies are seldom annotated.' },
            { key: 'C', text: 'They are always second-hand.' },
            { key: 'D', text: 'They contain no marginalia at all.' }
          ],
          answer: 'B',
          explanation:
            'A 段首句“the most heavily used copies of a novel are rarely the most heavily annotated”，B 为直接改写。',
          evidence: { paragraphId: 'p1-1' },
          score: 1
        },
        {
          id: 'tem4-2024-r2',
          number: 22,
          type: 'single',
          stem: 'The word "company" in Paragraph A refers to',
          options: [
            { key: 'A', text: 'a publishing house.' },
            { key: 'B', text: 'the presence of a previous reader.' },
            { key: 'C', text: 'a group of students.' },
            { key: 'D', text: 'the author\'s friends.' }
          ],
          answer: 'B',
          explanation:
            '上下文“a previous reader disagreeing in the margin”，说明 company 指前一位读者留下的“陪伴”，选 B。',
          evidence: { paragraphId: 'p1-1' },
          score: 1
        },
        {
          id: 'tem4-2024-r3',
          number: 23,
          type: 'single',
          stem: 'What distinguishes the two groups of writers in Paragraph B?',
          options: [
            { key: 'A', text: 'Their attitude to money.' },
            { key: 'B', text: 'Their view of the book as finished or unfinished.' },
            { key: 'C', text: 'Their preferred genre.' },
            { key: 'D', text: 'Their age.' }
          ],
          answer: 'B',
          explanation:
            'B 段“the first group sees the book as a finished thing, the second as an unfinished conversation”，B 正确。',
          evidence: { paragraphId: 'p1-2' },
          score: 1
        }
      ]
    },
    {
      id: 'writing',
      kind: 'writing',
      title: 'Part VI  Writing',
      instructions: 'Directions: Write a composition of about 200 words on the following topic.',
      minutes: 45,
      questions: [
        {
          id: 'tem4-2024-w1',
          number: 31,
          type: 'writing',
          stem: 'Write a composition of about 200 words on the topic: Should students be encouraged to annotate library books?',
          answer: '参考范文见解析。',
          explanation:
            '论证结构建议：明确立场 → 承认反方（公共财产、他人阅读体验）→ 提出可执行的折中方案（便利贴、电子副本）→ 收束。评分关注论点一致性、段落衔接与词汇多样性。',
          score: 20
        }
      ],
      reference: {
        essay:
          'The pencil mark in a library book is a small act of confidence: the reader assumes that what struck them will be worth explaining to a stranger. Whether libraries should encourage this confidence is a question about whose book a book is.\n\nThe case against annotation is easily stated. A library copy belongs to everyone, and a marginal note is a decision made on behalf of readers who never agreed to it. A dense page of someone else\'s underlining can be more distracting than helpful, particularly for a student trying to form an independent reading.\n\nYet the case for tolerating annotation is stronger than it first appears. Marks in a book are evidence of how a text has been used, and students learn a great deal from watching another mind hesitate. The solution is not prohibition but design: removable sticky notes, or a digital copy that can be annotated without touching the shared object.\n\nA library that treats its books as museum objects protects them from use. A library that treats them as working tools accepts a little wear in exchange for a great deal of thinking. The second seems to me the better bargain.',
        guidance: [
          '首段用一个具体意象（铅笔印）引出抽象问题。',
          '第二段先给反方最强理由，第三段再回应，避免自说自话。',
          '末段用对比句收束，立场清楚但不绝对。'
        ]
      }
    }
  ]
};