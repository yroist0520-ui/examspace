import type { Paper } from '@/types/paper';

const SAMPLE_NOTE =
  '本套试卷为 EXAMSPACE 自编示例数据，用于演示产品功能，不是任何考试的历年真题，题目、选项、答案与解析均为原创示例。';

export const cet4_2024_12: Paper = {
  id: 'cet4-2024-12-01',
  exam: 'cet4',
  year: 2024,
  session: '12月',
  setNo: 1,
  title: '大学英语四级 · 示例卷 A',
  subtitle: '2024 年 12 月（第 1 套）· 示例数据',
  difficulty: 2,
  minutes: 125,
  words: 1420,
  tags: ['校园生活', '阅读速度', '环保'],
  summary: '以“慢读与注意力”为主题的示例套卷，覆盖写作、听力、选词填空、仔细阅读与翻译五个部分。',
  sample: true,
  sampleNote: SAMPLE_NOTE,
  parts: [
    {
      id: 'writing',
      kind: 'writing',
      title: 'Part I  Writing',
      instructions:
        'Directions: Write an essay on the importance of deliberate reading habits. You should write at least 120 words but no more than 180 words.',
      minutes: 30,
      questions: [
        {
          id: 'cet4-2024-12-01-w1',
          number: 1,
          type: 'writing',
          stem: 'Write an essay on the importance of deliberate reading habits. You should write at least 120 words but no more than 180 words.',
          answer: '参考范文见解析。',
          explanation:
            '评分关注三点：明确的中心论点、可展开的两到三个理由、以及一个收束全篇的结论。建议首段用一句话给出立场，中间段每段一个理由并配具体例子，末段回扣立场而不重复原句。',
          score: 15
        }
      ],
      reference: {
        essay:
          'Deliberate reading is the difference between passing one\'s eyes over a page and actually taking something away from it. In an age when headlines arrive in seconds, the habit of reading slowly has become a competitive advantage rather than a luxury.\n\nFirst, deliberate reading builds durable knowledge. When we pause to connect a new argument with something we already know, the memory has somewhere to attach itself, and it survives far longer than a fact skimmed in haste. Second, it trains judgement. A reader who notices how a claim is supported — or left unsupported — is harder to persuade with confident but empty language.\n\nThe habit costs little to start. Ten minutes with a pencil, marking one sentence worth returning to, is enough. What matters is not speed but attention, and attention, like any muscle, grows with deliberate use.',
        guidance: [
          '开头用对比句点明“慢读”的价值，避免空泛表态。',
          '中间段用 First / Second 明确分点，每点配一个可验证的例子。',
          '结尾回到立场，给出可执行的小建议，比空喊口号更有力。'
        ]
      }
    },
    {
      id: 'listening',
      kind: 'listening',
      title: 'Part II  Listening Comprehension',
      instructions:
        'Directions: You will hear three short recordings. Each recording is followed by questions. Choose the best answer from the four choices.',
      minutes: 25,
      audio: {
        note: '示例音频由浏览器语音合成朗读听力原文，仅用于演示播放、倍速与单题循环功能。',
        segments: [
          {
            id: 'ls-a',
            label: 'Conversation 1',
            questionNo: 2,
            seconds: 42,
            text: 'Woman: I noticed you have been carrying that thick novel around all week. Are you actually reading it, or just using it as a prop? Man: Honestly, both. I read twelve pages on the bus this morning, and then I fell asleep on page thirteen. Woman: That sounds about right. My problem is that I keep restarting the first chapter because I forget what happened. Man: Maybe we should start a two-person reading group. Meeting once a week would force me to finish something. Woman: Deal. But you are bringing the coffee.'
          },
          {
            id: 'ls-b',
            label: 'Passage 1',
            questionNo: 4,
            seconds: 55,
            text: 'A study of nearly two thousand office workers found that people who took a short walk after lunch returned to their desks with better focus than those who stayed seated. The effect lasted about ninety minutes. Researchers say the benefit probably comes from two sources: mild physical activity increases blood flow to the brain, and the change of scene interrupts the mental loop that builds up during concentrated work. The walk does not need to be long. Fifteen minutes outdoors was enough in the study, and walking with a colleague seemed to help slightly more than walking alone, perhaps because conversation adds a social reset.'
          },
          {
            id: 'ls-c',
            label: 'News Report',
            questionNo: 6,
            seconds: 40,
            text: 'A city library announced this week that it will extend its opening hours to ten in the evening during the exam season. The decision follows a survey in which more than half of the students said they had no quiet place to study after their dormitory lights were dimmed. The library will also add forty extra desks on the second floor and provide free earplugs at the entrance. Staff say the busiest hours are likely to be between eight and ten, when the reading rooms have traditionally been closed.'
          }
        ]
      },
      questions: [
        {
          id: 'cet4-2024-12-01-l2',
          number: 2,
          type: 'single',
          groupId: 'ls-a',
          stem: 'What does the man admit about his reading?',
          options: [
            { key: 'A', text: 'He reads only on the bus.' },
            { key: 'B', text: 'He often falls asleep while reading.' },
            { key: 'C', text: 'He has finished the whole novel.' },
            { key: 'D', text: 'He uses the book to impress others.' }
          ],
          answer: 'B',
          explanation:
            '男士说“I read twelve pages on the bus this morning, and then I fell asleep on page thirteen”，直接表明他读到第十三页就睡着了，因此 B 正确。A 过于绝对；C 与事实相反；D 中“as a prop”是自嘲式玩笑，并非真实目的。',
          evidence: { paragraphId: 'ls-a' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-l3',
          number: 3,
          type: 'single',
          groupId: 'ls-a',
          stem: 'What do the two speakers decide to do?',
          options: [
            { key: 'A', text: 'Join a public speaking club.' },
            { key: 'B', text: 'Read the same novel together.' },
            { key: 'C', text: 'Start a small reading group.' },
            { key: 'D', text: 'Take a literature course.' }
          ],
          answer: 'C',
          explanation:
            '男士建议“we should start a two-person reading group”，女士回答“Deal”，说明两人决定成立一个小型读书小组，故选 C。',
          evidence: { paragraphId: 'ls-a' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-l4',
          number: 4,
          type: 'single',
          groupId: 'ls-b',
          stem: 'What did the study find about workers who walked after lunch?',
          options: [
            { key: 'A', text: 'They worked longer hours.' },
            { key: 'B', text: 'They concentrated better for a while.' },
            { key: 'C', text: 'They slept more in the afternoon.' },
            { key: 'D', text: 'They reported more stress.' }
          ],
          answer: 'B',
          explanation:
            '原文“returned to their desks with better focus … the effect lasted about ninety minutes”对应 B。其余选项均未提及或与原文相反。',
          evidence: { paragraphId: 'ls-b' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-l5',
          number: 5,
          type: 'single',
          groupId: 'ls-b',
          stem: 'Why might walking with a colleague be slightly more helpful?',
          options: [
            { key: 'A', text: 'It burns more calories.' },
            { key: 'B', text: 'It makes the walk longer.' },
            { key: 'C', text: 'Conversation adds a social reset.' },
            { key: 'D', text: 'Colleagues walk faster.' }
          ],
          answer: 'C',
          explanation:
            '原文“perhaps because conversation adds a social reset”直接给出原因，选 C。',
          evidence: { paragraphId: 'ls-b' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-l6',
          number: 6,
          type: 'single',
          groupId: 'ls-c',
          stem: 'Why will the library stay open later?',
          options: [
            { key: 'A', text: 'To host evening lectures.' },
            { key: 'B', text: 'Because students lack quiet study space.' },
            { key: 'C', text: 'To reduce staff costs.' },
            { key: 'D', text: 'Because a new building opened.' }
          ],
          answer: 'B',
          explanation:
            '报道称调查显示“more than half of the students said they had no quiet place to study”，因此延长开放时间，选 B。',
          evidence: { paragraphId: 'ls-c' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-l7',
          number: 7,
          type: 'single',
          groupId: 'ls-c',
          stem: 'What will be provided free at the entrance?',
          options: [
            { key: 'A', text: 'Coffee' },
            { key: 'B', text: 'Desk lamps' },
            { key: 'C', text: 'Earplugs' },
            { key: 'D', text: 'Textbooks' }
          ],
          answer: 'C',
          explanation: '原文“provide free earplugs at the entrance”，选 C。',
          evidence: { paragraphId: 'ls-c' },
          score: 1
        }
      ]
    },
    {
      id: 'cloze',
      kind: 'cloze',
      title: 'Part III  Banked Cloze',
      instructions:
        'Directions: Read the passage and choose one word for each blank from the word bank. Each word can be used only once.',
      minutes: 10,
      bank: {
        A: 'adaptable',
        B: 'deliberately',
        C: 'diminish',
        D: 'evidence',
        E: 'fragile',
        F: 'habit',
        G: 'modest',
        H: 'reinforces',
        I: 'retain',
        J: 'sustained',
        K: 'threshold',
        L: 'transparent'
      },
      audio: undefined,
      questions: [
        {
          id: 'cet4-2024-12-01-c26',
          number: 26,
          type: 'bank',
          stem: 'Reading speed is a surprisingly __26__ measure of skill.',
          answer: 'G',
          explanation:
            '此处需要形容词修饰 measure，并与后文“并不等于理解力”形成对照。modest（不高的、有限的）最贴合语义：速度只是能力的有限指标。fragile 指易碎，与 measure 搭配不合逻辑。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c27',
          number: 27,
          type: 'bank',
          stem: 'A reader who races through a page may __27__ very little of it.',
          answer: 'I',
          explanation:
            'may 后需动词原形，且与 very little 搭配表示“记住得很少”，retain 意为保留、记住，最合适。diminish 是不及物或及物“减少”，与 of it 搭配不成立。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c28',
          number: 28,
          type: 'bank',
          stem: 'The __28__ that slow reading improves comprehension is now well established.',
          answer: 'D',
          explanation:
            'The ... that 从句结构前需要名词，evidence 后接同位语从句，意为“有证据表明”，符合学术语篇的常见表达。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c29',
          number: 29,
          type: 'bank',
          stem: 'Even a __29__ pause at the end of a paragraph can help.',
          answer: 'J',
          explanation:
            '需要形容词修饰 pause。sustained 表示“持续的”，与 pause 搭配自然；modest 也可修饰程度但已被 26 题占用，且 bank 中每词仅用一次。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c30',
          number: 30,
          type: 'bank',
          stem: 'Re-reading a difficult sentence __30__ the memory of its structure.',
          answer: 'H',
          explanation:
            '主语为动名词短语，谓语需第三人称单数。reinforces 意为“加强”，与 the memory 搭配构成完整语义。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c31',
          number: 31,
          type: 'bank',
          stem: 'Build the __31__ slowly, and it will survive a busy week.',
          answer: 'F',
          explanation:
            '定冠词 the 后接名词，且与 build / survive 搭配，habit（习惯）最符合“逐步建立并能经受忙碌一周”的语义。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c32',
          number: 32,
          type: 'bank',
          stem: 'Set the bar low enough to cross it __32__ every day.',
          answer: 'B',
          explanation:
            '此处需副词修饰 cross。deliberately 与“刻意每天做到”语义一致，且为 bank 中唯一合适的副词。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c33',
          number: 33,
          type: 'bank',
          stem: 'Readers who annotate tend to be more __33__ when a text changes genre.',
          answer: 'A',
          explanation:
            'be more + 形容词，表示读者面对文体变化时的适应力，adaptable（适应性强的）最贴切。transparent 形容文本而非读者。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c34',
          number: 34,
          type: 'bank',
          stem: 'Their notes also make the reasoning behind an answer more __34__.',
          answer: 'L',
          explanation:
            'make + 宾语 + 形容词，表示使推理过程更“清晰可查”，transparent 在学术语境中常表“透明的、可追溯的”，符合句意。',
          score: 1
        },
        {
          id: 'cet4-2024-12-01-c35',
          number: 35,
          type: 'bank',
          stem: 'Even so, attention is __35__ and must be protected.',
          answer: 'E',
          explanation:
            'be + 形容词，并与 must be protected 形成因果关系：因为“脆弱”才需要保护，fragile 最合适。',
          score: 1
        }
      ]
    },
    {
      id: 'reading',
      kind: 'reading',
      title: 'Part IV  Reading Comprehension',
      instructions:
        'Directions: Read each passage and answer the questions. Choose the best answer for each question.',
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
              text: 'For most of the last century, speed was treated as an unmixed good in the way people read. Faster reading meant more books, more information, more of everything that a busy life seemed to require. Today a growing number of teachers and researchers are less certain. They point out that a reader who covers a page in forty seconds may be absorbing almost nothing, while a reader who spends four minutes on the same page may emerge with an argument they can use a year later.'
            },
            {
              id: 'p1-2',
              marker: 'B',
              text: 'The distinction matters because reading is not a single skill. Skimming a timetable and studying a legal contract call on different mental operations, and only one of them rewards velocity. When a text is dense, unfamiliar or important, the useful unit of progress is not pages per hour but connections made. A sentence that sparks a memory, a paragraph that contradicts an earlier claim, a phrase that seems slightly off — these are the moments where comprehension actually happens, and none of them can be scheduled.'
            },
            {
              id: 'p1-3',
              marker: 'C',
              text: 'This is why annotation helps, and why it is so often taught badly. Students are told to underline important sentences, which assumes they already know what is important. A more reliable instruction is to write questions in the margin: why does the author concede this point? whose interest does this example serve? Questions keep a reader awake in a way that highlighting does not, because a question has no obvious end. The page stops being a surface to be covered and becomes a problem to be worked on.'
            },
            {
              id: 'p1-4',
              marker: 'D',
              text: 'None of this argues for slow reading as a virtue in itself. There are afternoons when the right decision is to skim three reports and read none of them closely. What the research supports is a kind of deliberate choice: knowing which text deserves the slow treatment, and having practised it often enough that the choice is available. The reader who can only move quickly is not fast; they are simply stuck in one gear.'
            }
          ]
        },
        {
          id: 'p2',
          title: 'Passage Two',
          source: 'EXAMSPACE 原创示例文本',
          paragraphs: [
            {
              id: 'p2-1',
              marker: 'A',
              text: 'Every autumn, university libraries report the same small mystery: the books most often borrowed are also the books most often returned unread. Students check out a title because a reading list demands it, carry it for a week, and bring it back with the plastic wrap still in place. Librarians have a name for the pattern — "shelf decoration" — and they are unusually calm about it.'
            },
            {
              id: 'p2-2',
              marker: 'B',
              text: 'Their calm is instructive. A borrowed book that goes unread still does something: it keeps the title in circulation, it signals to other students that the subject is being taken seriously, and occasionally it is opened at the exact moment the reader needs it. The alternative, an unborrowed book sitting perfectly clean on a shelf, accomplishes none of these things.'
            },
            {
              id: 'p2-3',
              marker: 'C',
              text: 'The lesson is not that reading lists should be shorter, although some should be. It is that the act of intending to read has value that is easy to overlook in a culture that measures completion. A student who carries a difficult book for a term has at least kept the question alive. The risk is only that intention becomes a substitute for the work itself, and that the plastic wrap never comes off.'
            }
          ]
        }
      ],
      questions: [
        {
          id: 'cet4-2024-12-01-r36',
          number: 36,
          type: 'single',
          stem: 'What does the author suggest about fast reading in Paragraph A?',
          options: [
            { key: 'A', text: 'It is the only way to handle a heavy workload.' },
            { key: 'B', text: 'Its value is no longer taken for granted.' },
            { key: 'C', text: 'It has been proved harmful to memory.' },
            { key: 'D', text: 'It was invented in the last century.' }
          ],
          answer: 'B',
          explanation:
            'A 段说“a growing number of teachers and researchers are less certain”，即人们对速度的价值不再想当然，B 正确。A 是过去观念的极端化；C 文中只说不等于吸收，未说“有害”；D 无据。',
          evidence: { paragraphId: 'p1-1', quote: 'Today a growing number of teachers and researchers are less certain.' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-r37',
          number: 37,
          type: 'single',
          stem: 'According to Paragraph B, what is a better measure of progress in difficult reading?',
          options: [
            { key: 'A', text: 'The number of pages finished.' },
            { key: 'B', text: 'The time spent on each page.' },
            { key: 'C', text: 'The connections a reader makes.' },
            { key: 'D', text: 'The number of words looked up.' }
          ],
          answer: 'C',
          explanation:
            'B 段明确指出“the useful unit of progress is not pages per hour but connections made”，C 与原文同义。A 是被否定的标准；B、D 原文未作为标准提出。',
          evidence: { paragraphId: 'p1-2', quote: 'the useful unit of progress is not pages per hour but connections made' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-r38',
          number: 38,
          type: 'single',
          stem: 'Why does the author criticise the advice to underline important sentences?',
          options: [
            { key: 'A', text: 'It slows readers down too much.' },
            { key: 'B', text: 'It assumes readers can already judge importance.' },
            { key: 'C', text: 'It damages the book.' },
            { key: 'D', text: 'It is rarely taught in schools.' }
          ],
          answer: 'B',
          explanation:
            'C 段“which assumes they already know what is important”直接点出批评理由，B 正确。D 与原文“so often taught badly”（教得多但教得不好）相反。',
          evidence: { paragraphId: 'p1-3', quote: 'which assumes they already know what is important' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-r39',
          number: 39,
          type: 'single',
          stem: 'What does the phrase "stuck in one gear" imply in the last paragraph?',
          options: [
            { key: 'A', text: 'Fast readers lack the ability to read slowly.' },
            { key: 'B', text: 'Slow readers finish fewer books.' },
            { key: 'C', text: 'Readers need better equipment.' },
            { key: 'D', text: 'Reading speed cannot be changed.' }
          ],
          answer: 'A',
          explanation:
            '“只有一个档位”比喻只能以一种速度阅读，作者意在说明这类读者缺少慢读的能力，A 正确。B、C、D 均偏离比喻含义。',
          evidence: { paragraphId: 'p1-4', quote: 'The reader who can only move quickly is not fast; they are simply stuck in one gear.' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-r40',
          number: 40,
          type: 'single',
          stem: 'What is "shelf decoration" in Passage Two?',
          options: [
            { key: 'A', text: 'Books used to make a room look better.' },
            { key: 'B', text: 'Books borrowed but never read.' },
            { key: 'C', text: 'Books that are rarely borrowed.' },
            { key: 'D', text: 'Books damaged by too much use.' }
          ],
          answer: 'B',
          explanation:
            '第二篇 A 段把“借出后原样归还、塑封都没拆”的现象称作 shelf decoration，B 正确。C 与原文“most often borrowed”相反。',
          evidence: { paragraphId: 'p2-1', quote: 'the books most often borrowed are also the books most often returned unread' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-r41',
          number: 41,
          type: 'single',
          stem: 'Why are librarians calm about the pattern?',
          options: [
            { key: 'A', text: 'They believe an unread borrowed book still has effects.' },
            { key: 'B', text: 'They think students will read it next term.' },
            { key: 'C', text: 'They do not care about reading lists.' },
            { key: 'D', text: 'They want to keep the shelves tidy.' }
          ],
          answer: 'A',
          explanation:
            'B 段列举借出未读仍有三点作用：保持书目流通、向他人传递学科被重视的信号、偶尔在需要时被打开，故 A 正确。',
          evidence: { paragraphId: 'p2-2', quote: 'A borrowed book that goes unread still does something' },
          score: 1
        },
        {
          id: 'cet4-2024-12-01-r42',
          number: 42,
          type: 'single',
          stem: 'What risk does the author identify in the last paragraph of Passage Two?',
          options: [
            { key: 'A', text: 'Reading lists are becoming too short.' },
            { key: 'B', text: 'Students stop borrowing books altogether.' },
            { key: 'C', text: 'Intention replaces the actual work of reading.' },
            { key: 'D', text: 'Libraries buy too many copies.' }
          ],
          answer: 'C',
          explanation:
            'C 段“The risk is only that intention becomes a substitute for the work itself”，C 为同义改写。',
          evidence: { paragraphId: 'p2-3', quote: 'intention becomes a substitute for the work itself' },
          score: 1
        }
      ]
    },
    {
      id: 'translation',
      kind: 'translation',
      title: 'Part V  Translation',
      instructions:
        'Directions: Translate the following passage into English. You should write your answer on the answer sheet.',
      minutes: 25,
      questions: [
        {
          id: 'cet4-2024-12-01-t1',
          number: 43,
          type: 'translation',
          stem:
            '近年来，越来越多的中国年轻人开始重视慢阅读。他们会在周末关掉手机，花两三个小时读完一本书。有人认为这种做法效率不高，但支持者认为，慢下来反而能记住更多内容，也更容易发现自己真正感兴趣的问题。',
          answer:
            '参考译文：In recent years, more and more young people in China have begun to value slow reading. They turn off their phones at weekends and spend two or three hours finishing a book. Some argue that this is inefficient, but supporters believe that slowing down helps them remember more and makes it easier to discover the questions they are genuinely interested in.',
          explanation:
            '关键点：①“越来越……开始重视”用 have begun to value / attach importance to；②“关掉手机”turn off their phones，注意复数；③“有人认为”Some argue that，避免 Some people think 过于口语；④“反而”用 instead / on the contrary 体现转折递进；⑤“发现自己真正感兴趣的问题”用定语从句或形容词短语后置，避免逐字直译。',
          score: 15
        }
      ],
      reference: {
        translation:
          'In recent years, more and more young people in China have begun to value slow reading. They turn off their phones at weekends and spend two or three hours finishing a book. Some argue that this is inefficient, but supporters believe that slowing down helps them remember more and makes it easier to discover the questions they are genuinely interested in.'
      }
    }
  ]
};