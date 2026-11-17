import type { ExamCode, Paper, PaperSource, Provenance, ResourceFlag } from '@/types/paper';

/**
 * 真实历年真题资源记录（正式列表数据源）。
 *
 * 规则（项目红线）：
 * - 每条记录必须指向真实存在的来源；禁止 AI 编造试题、答案、解析或年份；
 * - 无授权不转载：所有记录 license='link-only'，站内不放题面，只展示来源链接与状态；
 * - 缺失资源一律用 ResourceFlag 明示，不用合成内容补齐；
 * - 原始听力音频仅在获得书面授权时提供 originalAudioUrl，绝不以 TTS 冒充真题原音。
 *
 * 来源于 2026-11-17 联网核验（逐渠道 WebFetch 实测页面真实存在）：
 * - 教育部教育考试院（CET 官网）从不发布英语历年真题、答案与听力音频；
 * - TEM 官方规定：2021 年起试题册、录音稿、参考答案、音带为国家机密级材料；
 * - 考研：教育部《招生工作管理规定》第七条——试题、参考答案按国家秘密管理；
 * - 因此历年真题均以“仅外部链接 + 待人工核验”方式记录，站内不复制任何题面。
 */

const CHECKED = '2026-11-17';

/** 录入辅助：外链型资源记录（无站内题面） */
function resourceRecord(input: {
  id: string;
  exam: ExamCode;
  year: number;
  session: string;
  setNo?: number;
  title: string;
  sources: PaperSource[];
  flags: ResourceFlag[];
  verification?: Provenance['verification'];
  note?: string;
}): Paper {
  const flags = Array.from(new Set([...input.flags, 'external-only' as ResourceFlag]));
  return {
    id: input.id,
    exam: input.exam,
    year: input.year,
    session: input.session,
    setNo: input.setNo,
    title: input.title,
    subtitle: `${input.year} 年 · 真实来源资源`,
    difficulty: 3,
    minutes: 0,
    words: 0,
    tags: ['真题', '外部链接'],
    summary:
      flags.includes('no-legal-resource')
        ? '暂无合法可用资源：未找到可验证的公开来源，待人工补充。'
        : `来源已联网核验（${CHECKED}）；因版权无转载授权，点击进入详情查看来源链接。`,
    parts: [],
    sample: false,
    provenance: {
      sources: input.sources,
      license: 'link-only',
      verification: input.verification ?? 'pending',
      flags,
      checkedAt: CHECKED,
      note: input.note
    }
  } as Paper;
}

/* ------------------------------ 来源渠道（已实测核验） ------------------------------ */

/** 第三方渠道（无授权声明 → 仅外链、套级待人工核验） */
function third(name: string, url: string, kind: PaperSource['kind'], note?: string): PaperSource {
  return { name, url, kind, license: 'unknown', verifiedAt: CHECKED, note };
}

/** 官方公开页面（可外链引用，禁止整页复制） */
function official(name: string, url: string, note?: string): PaperSource {
  return { name, url, kind: '页面', license: 'link-only', verifiedAt: CHECKED, note };
}

const CET4_SOURCES = (year: number): PaperSource[] => [
  third('CET通（试题PDF+答案+听力MP3）', 'https://www.cettong.cn/library/cet4', '试题', '2019–2025 各年 6/12 月，套级页面待逐套核验'),
  third('WeHUSTER（真题+答案+解析+听力）', 'https://www.wehuster.com/cet4', '解析'),
  ...(year >= 2023 || year >= 2026
    ? [third('南京大学外语技能训练中心（试题+答案/范文）', 'https://eol.nju.edu.cn/cet4/', '试题', '覆盖 2023-12 至 2026-06，听力音频未附')]
    : []),
  official('教育部教育考试院·CET 官网（题型结构与大纲，无历年真题）', 'https://cet.neea.edu.cn/xhtml1/category/16123/192-1.htm')
];

const CET6_SOURCES = (year: number): PaperSource[] => [
  third('CET通（试题PDF+答案+听力MP3）', 'https://www.cettong.cn/library/cet6', '试题', '2019–2025 各年 6/12 月，套级页面待逐套核验'),
  third('WeHUSTER（真题+答案+解析+听力）', 'https://www.wehuster.com/cet6', '解析'),
  ...(year >= 2024 || year >= 2026
    ? [third('南京大学外语技能训练中心（试题+答案/范文）', 'https://eol.nju.edu.cn/cet6/', '试题', '覆盖 2024-06 至 2026-06，听力音频未附')]
    : []),
  official('教育部教育考试院·CET 官网（题型结构与大纲，无历年真题）', 'https://cet.neea.edu.cn/xhtml1/category/16123/192-1.htm')
];

/** CET 记录共用说明 */
const CET_NOTE =
  '官方不发布历年真题与听力音频；来源含听力 MP3 者授权不明，站内不接入播放（不以合成语音替代原音）。答案与解析以来源页为准。';

/* --------------------------------- 生成：四六级 --------------------------------- */

/**
 * 已考期次（截至 2026-11-17）：
 * 2019-06 起至 2026-06，跳过 2020-06（疫情停考，7 月补考期次待人工核验）；
 * 2026 年 12 月期次尚未开考，不生成。
 */
const CET_PERIODS: [number, 6 | 12][] = [
  [2019, 6], [2019, 12],
  [2020, 12],
  [2021, 6], [2021, 12],
  [2022, 6], [2022, 12],
  [2023, 6], [2023, 12],
  [2024, 6], [2024, 12],
  [2025, 6], [2025, 12],
  [2026, 6]
];

function cetPapers(code: 'cet4' | 'cet6', cnName: string, srcOf: (year: number) => PaperSource[]): Paper[] {
  const out: Paper[] = [];
  for (const [year, month] of CET_PERIODS) {
    const sources = srcOf(year);
    for (let setNo = 1; setNo <= 3; setNo++) {
      out.push(
        resourceRecord({
          id: `${code}-${year}-${String(month).padStart(2, '0')}-s${setNo}`,
          exam: code,
          year,
          session: `${month}月`,
          setNo,
          title: `${year}年${month}月英语${cnName}真题（第${setNo}套）`,
          sources,
          flags: ['pending', 'no-audio'],
          note: CET_NOTE
        })
      );
    }
  }
  return out;
}

/* --------------------------------- 生成：考研 --------------------------------- */

const KY_SOURCES: PaperSource[] = [
  third('中国教育在线·历年英语真题（供稿：文都/海文/掌上考研）', 'https://kaoyan.eol.cn/shiti/yingyu/', '试题', '2019–2025，第三方整理，非官方答案'),
  third('新东方在线·真题与答案解析', 'https://m.koolearn.com/kaoyan/20241221/1790436.html', '解析', '第三方自标出处，非官方'),
  third('考研帮·真题 PDF', 'https://static.kaoyan.cn/file/question/2024/12/21/18ded45bae038369e4c066a786618ec2.pdf', '试题', '已实测 2025 英语一；其余年份待核验'),
  official('教育部·招生工作管理规定（试题与答案属国家秘密）', 'http://www.moe.gov.cn/srcsite/A15/moe_778/s3261/202509/t20250918_1413836.html'),
  official('中国教育考试网·考研专栏（大纲样题，无历年真题与官方答案）', 'https://yankao.neea.edu.cn/')
];

const KY_NOTE =
  '教育部及考试院从未公布考研真题与官方答案（试题、参考答案按国家秘密管理）；所有真题与答案均来自第三方整理，须以官方为准。考研初试无听力部分。';

function kaoyanPapers(code: 'kaoyan1' | 'kaoyan2', cnSuffix: string): Paper[] {
  const out: Paper[] = [];
  for (let year = 2019; year <= 2025; year++) {
    out.push(
      resourceRecord({
        id: `${code}-${year}-real`,
        exam: code,
        year,
        session: '初试',
        title: `${year}年英语考研真题（${cnSuffix}）`,
        sources: KY_SOURCES,
        flags: ['pending'],
        note: KY_NOTE
      })
    );
  }
  return out;
}

/* --------------------------------- 生成：专四专八 --------------------------------- */

const TEM4_NOTE =
  'TEM 官方规定：2021 年起试题册、录音稿、参考答案、音带为国家机密级材料，商用须书面授权；站内不收录任何题面与录音。听力原音不接入，不以合成语音替代。';

function tem4Papers(): Paper[] {
  const sources: PaperSource[] = [
    third('南京大学外语技能训练中心·专四真题（含答案/范文）', 'https://eol.nju.edu.cn/tem4/', '试题', '覆盖 2021–2025 共 5 套，听力音频未附'),
    official('高校外语专业教学测试办公室·试卷使用规定（国家机密级材料声明）', 'http://tem.fltonline.cn/?p=75431')
  ];
  const out: Paper[] = [];
  for (let year = 2021; year <= 2025; year++) {
    out.push(
      resourceRecord({
        id: `tem4-${year}-real`,
        exam: 'tem4',
        year,
        session: '年度',
        title: `${year}年英语专业四级真题`,
        sources,
        flags: ['pending', 'no-audio'],
        note: TEM4_NOTE
      })
    );
  }
  return out;
}

const TEM8_NOTE =
  'TEM 官方规定：试题册、录音稿、参考答案、音带为国家机密级材料；第三方站点真题与听力仅可跳转查看，站内不转载、不接入录音，不以合成语音替代原音。';

function tem8Papers(): Paper[] {
  const sources: PaperSource[] = [
    third('新东方在线·专八真题（含答案与听力）', 'https://tem.koolearn.com/tem8/zhenti/', '试题', '覆盖 2009–2022（2020 年停考）'),
    third('英语真题库·专八（PDF+解析+听力，网盘分享）', 'https://cet.suanzan.com/category/tem8', '解析', '16 套：2009–2025 缺 2020'),
    official('高校外语专业教学测试办公室·试卷使用规定（国家机密级材料声明）', 'http://tem.fltonline.cn/?p=75431')
  ];
  const out: Paper[] = [];
  for (let year = 2009; year <= 2025; year++) {
    if (year === 2020) continue; // 停考年，来源明确缺 2020
    out.push(
      resourceRecord({
        id: `tem8-${year}-real`,
        exam: 'tem8',
        year,
        session: '年度',
        title: `${year}年英语专业八级真题`,
        sources,
        flags: ['pending', 'no-audio'],
        note: TEM8_NOTE
      })
    );
  }
  return out;
}

/** 真实资源记录列表（全部由联网核验的来源构成） */
export const realPapers: Paper[] = [
  ...cetPapers('cet4', '四级', CET4_SOURCES),
  ...cetPapers('cet6', '六级', CET6_SOURCES),
  ...kaoyanPapers('kaoyan1', '一'),
  ...kaoyanPapers('kaoyan2', '二'),
  ...tem4Papers(),
  ...tem8Papers()
];
