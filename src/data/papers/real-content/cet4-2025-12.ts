import type { Paper } from '@/types/paper';

/**
 * 2025 年 12 月英语四级真题（三套）站内作答数据。
 * 题面、选项、参考答案与解析整理自公开真题页面：懒笔记 english-exam.lazynote.cn、
 * 新东方在线 cet4.koolearn.com、南京大学英语分级考自测 eol.nju.edu.cn、过级鸭 guojiya.cn。
 * 听力归属经多源交叉核验：第1套、第2套题面与答案在懒笔记整卷页与听力解析页一致；
 * 第3套听力各来源不一（懒笔记标注与第1套共用，南大自测与过级鸭展示与第2套相同），
 * 本文件按第2套收录。听力原文由浏览器语音合成朗读（合成语音），非考试原音，不跳转外部网站。
 */
const content: Record<string, Partial<Paper>> = {
  'cet4-2025-12-s1': {
    subtitle: '2025 年 12 月 · 站内收录',
    minutes: 125,
    words: 1950,
    tags: [
      '真题',
      '四级',
    ],
    summary: '2025年12月英语四级真题第1套：写作、听力、选词填空、长篇阅读、仔细阅读与翻译的完整题面与参考答案站内收录，听力由浏览器合成语音朗读原文，全程不跳转外部站点。',
    parts: [
      {
        id: 'writing',
        kind: 'writing',
        title: 'Part I Writing',
        instructions: 'Directions: Suppose the student union of your university is collecting opinions on improving its work for the coming year. You are now to write a response by suggesting how it can better enrich student life. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
        minutes: 30,
        questions: [
          {
            id: 'cet4-2025-12-s1-w1',
            number: 1,
            type: 'writing',
            stem: 'Suppose the student union of your university is collecting opinions on improving its work for the coming year. You are now to write a response by suggesting how it can better enrich student life. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
            answer: '见参考',
            explanation: '写作要点：核心任务：给学生会提丰富生活的建议；中心立意：乐意为丰富校园生活献策；要点：增设多样社团 · 组织文体赛事 · 举办讲座工作坊；段序链：回应征询并表态 → 分点给出建议 → 表达期待与支持。',
            score: 15,
          },
        ],
        reference: {
          essay: 'I am truly glad that the student union is collecting our opinions for the coming year, and I would like to share a few thoughts on how campus life could become richer and more colourful.\n\nTo begin with, I suggest that more student clubs be set up, ranging from photography to debating, so that everyone can find a hobby and make new friends. It would also be helpful if the union organized regular sports meets and art festivals, because such events relax us after study and build a stronger sense of community. Another idea is to invite experts to hold lectures and workshops, which would broaden our horizons and prepare us for future careers.\n\nI believe these suggestions, if adopted, will make our daily life on campus far more enjoyable. Thank you for listening, and I am always ready to offer any help the union may need.',
          guidance: [
            '核心任务：给学生会提丰富生活的建议',
            '中心立意：乐意为丰富校园生活献策',
            '要点：增设多样社团 · 组织文体赛事 · 举办讲座工作坊',
            '段序链：回应征询并表态 → 分点给出建议 → 表达期待与支持',
          ],
        },
      },
      {
        id: 'listening',
        kind: 'listening',
        title: 'Part II Listening Comprehension',
        instructions: 'Directions: In this section, you will hear three news reports. At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre. Directions: In this section, you will hear two long conversations. At the end of each conversation, you will hear four questions. Both the conversation and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre. Directions: In this section, you will hear three passages. At the end of each passage, you will hear three or four questions. Both the passage and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre.',
        minutes: 25,
        audio: {
          note: '听力原文由浏览器语音合成朗读（合成语音），非考试原音。',
          segments: [
            {
              id: 'cet4-2025-12-s1-ls-1',
              label: 'News Report 1',
              questionNo: 1,
              seconds: 60,
              text: 'A terrified cat has survived a five-mile round trip under the engine cover of a car on a school run. The black cat was found curled up under the engine cover of David King\'s car when he decided to do an oil check after dropping his grandson off at school in Kent. Mr King\'s wife said her husband had come "running in" and was "shouting for me to come have a look". "We weren\'t even sure it was alive, so I gently pushed it with a stick to check it was breathing and saw it was a terrified little cat. It reversed even further into the engine and was stuck. I tried to reach it, but it was too far down and there wasn\'t any way I could get it out." Following a rescue by UK charity Cats Protection, the four-year-old cat was later reunited with its owner, Mr King\'s neighbour.',
            },
            {
              id: 'cet4-2025-12-s1-ls-2',
              label: 'News Report 2',
              questionNo: 3,
              seconds: 56,
              text: 'In less than a month, the Special Olympics Spring Games will make a return to Fayetteville. The Games are coming back for the first time in five years. The event will take place at Methodist University. Event organizer Benjamin Kowalczyk says he\'s excited that athletes will get a chance to come back and demonstrate their abilities. Organizers expect about 100 athletes will come out to compete in Fayetteville. They will have a variety of events to choose from, including running, throwing, and jumping. There will also be a fun tent for children. Kowalczyk said it\'s rewarding to see athletes with special needs triumph in the Games. For anyone who wants to help make this year\'s Games a massive success, there are still opportunities to volunteer for Fayetteville\'s Special Olympics. Organizers encourage them to visit the Games\' website to sign up.',
            },
            {
              id: 'cet4-2025-12-s1-ls-3',
              label: 'News Report 3',
              questionNo: 5,
              seconds: 70,
              text: 'A German supermarket has been ordered to destroy its chocolate rabbits after it lost a court battle with a Swiss chocolate manufacturer. The Swiss firm had argued its gold-wrapped chocolate rabbit deserved copyright protection from a similar product sold by the budget supermarket. Switzerland\'s highest court agreed and overturned a ruling last year by the country\'s commercial court that had sided with the supermarket. It ordered that all the imitation rabbits be destroyed, but suggested the chocolate needn\'t be wasted. It could be melted for use in other products. It said even though there are some differences between the two products, there was still the possibility of confusion for consumers. The Swiss manufacturer\'s rabbit has a red bow and bell, while the German supermarket\'s has a green bow and bell. The colour of the wrapper is similar, as are the illustrations of the features. The chocolate company has been to court before to protect its popular chocolate treat. Last year, a German federal court said the shade of the gold wrapping was also protected.',
            },
            {
              id: 'cet4-2025-12-s1-ls-4',
              label: 'Conversation 1',
              questionNo: 8,
              seconds: 99,
              text: 'Man: Can you please hand me that book over there? It has instructions for making a winter bean salad. My sister\'s boyfriend is coming over for dinner. He\'s vegetarian, so I need to make a lot of vegetable dishes. Woman: He only eats vegetables, no meat? That doesn\'t sound like a very balanced diet. How can he get enough protein? What does he do to strengthen his muscles and all that? Man: Apparently that\'s no problem. He\'s explained this to me when we first met. He eats a variety of different vegetables and nuts, especially those with high amounts of protein. Woman: It sounds a bit difficult, but he\'s done his research I suppose. What\'s his reasoning for being vegetarian? Is it his religion, health condition, or lifestyle? Man: He\'s an animal activist. He\'s always been very sensitive and sympathizes with animals. He\'s even written to his state senator about the torture of dolphins in sea parks. He says that keeping animals in zoos and parks causes them great distress. Woman: That\'s a little gloomy, but I can understand that to a point. Not all zoos and animal parks have the most favorable conditions, but without them it just wouldn\'t be feasible to learn about animals and their environments. Besides, I don\'t think I could ever give up a good hot dog at a baseball game. Man: Honestly, I agree, but just don\'t let him hear you say that. He\'s the spokesperson for his local animal rights group.',
            },
            {
              id: 'cet4-2025-12-s1-ls-5',
              label: 'Conversation 2',
              questionNo: 12,
              seconds: 115,
              text: 'Woman: Did you see that television program on air travel last night? Man: Yes. The part about overcoming jetlag was interesting. I was surprised that the expert recommended not eating for the entire journey and avoiding sleeping on the plane. Woman: I was too, as I read an article on the subject in the past that suggested the opposite. It claimed that it was important not to miss meals and that taking a nap on the plane was the best way to adjust to a new time zone. Man: Well, the expert on the show did cite research supporting her recommendations, so I guess I\'ll give it a try next time I fly a long distance. Jetlag is a big problem for me and has been for the last few years, even though I never suffered from it before. Woman: Well, she did say that jetlag often becomes more of a problem after 40, so I guess I\'m lucky that I can still adjust to different time zones well. My problem is I\'m afraid to fly. Man: Oh, I didn\'t know that. Actually, my mother is terrified of airplanes to the point where she can\'t even fly, so our family vacations were always by car or train. Woman: I\'m not as bad as that. I just get anxious before I fly and feel nervous the whole time we\'re in the air, which is why I was hoping the television program would cover that topic more than it did. Man: Yeah. That segment was too brief, especially as so many people have that problem. She said 20% of people are afraid to fly. Woman: Actually, it was a quarter of people, so the problem really is widespread and deserves attention.',
            },
            {
              id: 'cet4-2025-12-s1-ls-6',
              label: 'Passage 1',
              questionNo: 16,
              seconds: 90,
              text: 'The most common question I\'m asked always centers around how to get started in user experience design, to which my response is always that nothing can substitute real-world experience. Building the skills required of a user experience designer takes time, patience, and commitment. Higher education is a great way to equip yourself with some core skills, but it will not prepare you for actual challenges you\'ll face with clients\' work. In other words, being proficient with a design tool and a few methods doesn\'t make you a user experience designer. There simply isn\'t a one-size-fits-all process. Being effective requires adaptability — something you don\'t really learn in school, much less in a 6-month training camp. It\'s gained through experience on the job and learning what\'s appropriate given the needs of the project. I found my way to user experience through graphic design and slowly over many different roles and experiences. That led me to become a user experience designer. It took time and commitment to continue to pursue roles within teams that I knew could teach and challenge me. That\'s not to say that I think my path is the only one. But once again, nothing can substitute real-world experience. You can start anywhere as long as you know your end goal and you commit to actively pursuing opportunities to learn and grow along the way.',
            },
            {
              id: 'cet4-2025-12-s1-ls-7',
              label: 'Passage 2',
              questionNo: 19,
              seconds: 95,
              text: 'When planning for this year, our principal asked what needed to change to engage students more in their learning. I responded in a whisper "flexible seating", thinking about our then-current classroom. It had rows of desks with blue chairs and nameplates reminding each student where they should be sitting. This began a journey to transform our practice and challenge the ways of learning for a group of Year 6 students used to sitting in desks and rows for years. Flexible seating has been defined as movable furniture to create an engaging learning environment. It is a shift in practice from being teacher-focused to student-focused learning. For us, flexible seating has meant removing most of the traditional chairs and desks and introducing a variety of different seating options to promote student engagement. The use of rows and their minimal adaptations to "U" shape were traditionally intended to maximize on-task behavior and reduce distraction from the teacher. Teachers tend to still use this format because of either the need to control students or the belief that the teacher is the most important person in the room. Now our students have a range of different seating options, including a floor desk, couches, stools, bean bags, and the traditional desk-and-chair. From our experience so far, flexible seating enhances student ownership of space and engagement in learning, while reducing rates of student disengagement and disciplinary actions. It is a win for all concerned.',
            },
            {
              id: 'cet4-2025-12-s1-ls-8',
              label: 'Passage 3',
              questionNo: 22,
              seconds: 90,
              text: 'Dozens of British students arriving for their first day of school on Tuesday were sent home over their shoes. About 30 students were turned away from Taverham High School in Norfolk, England. Headteacher, Dr Roger Harris, confirmed that this was due to a change in the school\'s uniform policy. Harris, who became headteacher this year, said he notified parents of the updated rules in an email in June. The price of school uniforms can spark panic among families struggling with the high cost of living. Nearly all British schools have uniforms. They cost parents an average of £337 per year for each secondary school child. According to the new rules, students of Taverham are required to wear smart black shoes appropriate for the workplace, Harris held that strengthened rules around school uniforms improved student outcomes and behavior. But for some parents, the school\'s restrictions are an unnecessary burden. As annual inflation climbs over 10%, many households are on tight budgets. Private rental prices in Britain rose 3.2% over the 12 months to July 2022, the largest jump since 2016. Soaring energy bills have made things worse. Lucinda May, mum of a Taverham student, said that she had to ask her parents for £65 to buy her child the correct pair of shoes. May said that the school\'s uniform policy showed the lack of regard for parents dealing with the high cost of living.',
            },
          ],
        },
        questions: [
          {
            id: 'cet4-2025-12-s1-l1',
            number: 1,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-1',
            stem: 'Where was the black cat found?',
            options: [
              {
                key: 'A',
                text: 'Outside the office of a charity foundation.',
              },
              {
                key: 'B',
                text: 'Inside the car of David King\'s neighbour.',
              },
              {
                key: 'C',
                text: 'Under the engine cover of a man\'s car.',
              },
              {
                key: 'D',
                text: 'At the gate of a grade school in Kent.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“The black cat was found curled up under the engine cover of David King\'s car when he decided to do an oil check after dropping his grandson off at…”。这只黑猫是在大卫·金送孙子上学后、决定检查机油时，被发现蜷缩在他汽车的引擎盖下面的。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-1',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l2',
            number: 2,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-1',
            stem: 'What do we learn about the cat at the end of the news report?',
            options: [
              {
                key: 'A',
                text: 'It got reunited with its owner.',
              },
              {
                key: 'B',
                text: 'It was injured during the rescue.',
              },
              {
                key: 'C',
                text: 'It became a pet of Mr King\'s grandson.',
              },
              {
                key: 'D',
                text: 'It was placed in the care of a UK charity.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“Following a rescue by UK charity Cats Protection, the four-year-old cat was later reunited with its owner, Mr King\'s neighbour.”。在英国慈善机构『猫咪保护』救援之后，这只四岁的猫最终与它的主人——金先生的邻居——团聚了。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-1',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l3',
            number: 3,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-2',
            stem: 'What will Fayetteville witness in less than a month?',
            options: [
              {
                key: 'A',
                text: 'The 100th anniversary celebration of Methodist University.',
              },
              {
                key: 'B',
                text: 'The first important political event in the next five years.',
              },
              {
                key: 'C',
                text: 'The opening of the Special Olympics Spring Games.',
              },
              {
                key: 'D',
                text: 'The reunion of this year\'s Olympic gold medalists.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“In less than a month, the Special Olympics Spring Games will make a return to Fayetteville.”。不到一个月后，特殊奥林匹克运动会春季赛事将重返费耶特维尔。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-2',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l4',
            number: 4,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-2',
            stem: 'What did Benjamin Kowalczyk say is rewarding to see?',
            options: [
              {
                key: 'A',
                text: 'Volunteers visit the Games\' website to sign up.',
              },
              {
                key: 'B',
                text: 'Athletes with special needs triumph in the Games.',
              },
              {
                key: 'C',
                text: 'Organizers devote their time and energy to the Games.',
              },
              {
                key: 'D',
                text: 'Children play in a fun tent and enjoy themselves fully.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“Kowalczyk said it\'s rewarding to see athletes with special needs triumph in the Games.”。Kowalczyk 说，看到有特殊需求的运动员在赛事中取得胜利，是很有意义、很值得的。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-2',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l5',
            number: 5,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-3',
            stem: 'What has the German supermarket been ordered to do?',
            options: [
              {
                key: 'A',
                text: 'Destroy its imitation chocolate rabbits.',
              },
              {
                key: 'B',
                text: 'Change the wrapping of its commodities.',
              },
              {
                key: 'C',
                text: 'Compensate for the Swiss manufacturer\'s loss.',
              },
              {
                key: 'D',
                text: 'Defend itself in the country\'s commercial court.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“A German supermarket has been ordered to destroy its chocolate rabbits after it lost a court battle with a Swiss chocolate manufacturer.”。一家德国超市在与一家瑞士巧克力制造商的官司中败诉后，被勒令销毁其巧克力兔子。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l6',
            number: 6,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-3',
            stem: 'What did Switzerland\'s highest court suggest about the chocolate in question?',
            options: [
              {
                key: 'A',
                text: 'It could be rewrapped and sold by the budget supermarket.',
              },
              {
                key: 'B',
                text: 'It could be reshaped into animals other than rabbits.',
              },
              {
                key: 'C',
                text: 'It could be resold cheaper to avoid waste.',
              },
              {
                key: 'D',
                text: 'It could be reused in other products.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“It ordered that all the imitation rabbits be destroyed, but suggested the chocolate needn\'t be wasted. It could be melted for use in other products.”。法院下令销毁所有仿制兔子，但建议巧克力不必浪费，可以熔化后用于其他产品。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l7',
            number: 7,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-3',
            stem: 'Why did Switzerland\'s highest court overturn the commercial court\'s ruling?',
            options: [
              {
                key: 'A',
                text: 'To be fair to the German supermarkets.',
              },
              {
                key: 'B',
                text: 'To protect chocolate retailers\' interests.',
              },
              {
                key: 'C',
                text: 'To boost the growth of the chocolate industry.',
              },
              {
                key: 'D',
                text: 'To prevent consumers\' possible confusion.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“It said even though there are some differences between the two products, there was still the possibility of confusion for consumers.”。法院表示，尽管两种产品之间存在一些差异，但仍有可能让消费者产生混淆。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l8',
            number: 8,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-4',
            stem: 'What does the man request the woman to do?',
            options: [
              {
                key: 'A',
                text: 'Return the handbook to him.',
              },
              {
                key: 'B',
                text: 'Make a vegetable dish.',
              },
              {
                key: 'C',
                text: 'Pass a book to him.',
              },
              {
                key: 'D',
                text: 'Meet his sister\'s boyfriend.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“Can you please hand me that book over there?”。你能把那边那本书递给我吗？故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l9',
            number: 9,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-4',
            stem: 'What does the woman say about eating vegetables only?',
            options: [
              {
                key: 'A',
                text: 'It doesn\'t seem to be a balanced diet.',
              },
              {
                key: 'B',
                text: 'It would reduce one\'s protein intake.',
              },
              {
                key: 'C',
                text: 'It would do harm to one\'s muscles.',
              },
              {
                key: 'D',
                text: 'It doesn\'t sound practical for her.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“He only eats vegetables, no meat? That doesn\'t sound like a very balanced diet.”。他只吃菜、不吃肉？那听起来不像是很均衡的饮食啊。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l10',
            number: 10,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-4',
            stem: 'Why does the boyfriend of the man\'s sister choose to be a vegetarian?',
            options: [
              {
                key: 'A',
                text: 'To improve his health.',
              },
              {
                key: 'B',
                text: 'To protect animal rights.',
              },
              {
                key: 'C',
                text: 'To follow a trendy lifestyle.',
              },
              {
                key: 'D',
                text: 'To stick to his religious belief.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“He\'s an animal activist. He\'s always been very sensitive and sympathizes with animals.”。他是个动物保护活动者。他一向很敏感，对动物充满同情。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l11',
            number: 11,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-4',
            stem: 'On what point does the man agree with the woman at the end of the conversation?',
            options: [
              {
                key: 'A',
                text: 'The torture and distress dolphins suffer in parks.',
              },
              {
                key: 'B',
                text: 'The necessity of having zoos and eating meat.',
              },
              {
                key: 'C',
                text: 'The gloomy environments animals are kept in.',
              },
              {
                key: 'D',
                text: 'The urgency of joining an animal rights group.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“W: Not all zoos and animal parks have the most favorable conditions, but without them it just wouldn\'t be feasible to learn about animals and their…”。女：并不是所有动物园和动物公园条件都最理想，但要是没有它们，就没法了解动物和它们的生存环境了。再说，我可舍不得放弃看棒球赛时来一根热狗。男：说实话，我同意。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l12',
            number: 12,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-5',
            stem: 'What part of the TV program does the man say was interesting?',
            options: [
              {
                key: 'A',
                text: 'The part about getting over jetlag.',
              },
              {
                key: 'B',
                text: 'The part about air travel in the past.',
              },
              {
                key: 'C',
                text: 'The part about not eating on board the plane.',
              },
              {
                key: 'D',
                text: 'The part about avoiding sleeping on the plane.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“The part about overcoming jetlag was interesting.”。关于克服时差的那一部分很有趣。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l13',
            number: 13,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-5',
            stem: 'What does the man say he will do next time he flies a long distance?',
            options: [
              {
                key: 'A',
                text: 'Take a nap to adjust to a new time zone.',
              },
              {
                key: 'B',
                text: 'Have meals as usual to stay away from hunger.',
              },
              {
                key: 'C',
                text: 'Concentrate on reading articles recommended by experts.',
              },
              {
                key: 'D',
                text: 'Try following the advice given by the expert on the show.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“the expert on the show did cite research supporting her recommendations, so I guess I\'ll give it a try next time I fly a long distance.”。节目里的那位专家确实引用了支持她建议的研究，所以我想下次长途飞行时我会试试看。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l14',
            number: 14,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-5',
            stem: 'Why does the woman think she is lucky?',
            options: [
              {
                key: 'A',
                text: 'She does not have any problem flying.',
              },
              {
                key: 'B',
                text: 'She can spend a lot of time vacationing.',
              },
              {
                key: 'C',
                text: 'She does not have to worry about jetlag.',
              },
              {
                key: 'D',
                text: 'She has been well treated when traveling.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“she did say that jetlag often becomes more of a problem after 40, so I guess I\'m lucky that I can still adjust to different time zones well.”。她确实说过时差在 40 岁以后往往会变成更大的问题，所以我想我算幸运，因为我还能很好地适应不同的时区。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l15',
            number: 15,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-5',
            stem: 'Why does the woman think the problem of being afraid to fly deserves attention?',
            options: [
              {
                key: 'A',
                text: 'It has caused heavy losses to many airlines.',
              },
              {
                key: 'B',
                text: 'It impacts female travelers more seriously.',
              },
              {
                key: 'C',
                text: 'It has long been ignored by many experts.',
              },
              {
                key: 'D',
                text: 'It affects twenty-five percent of people.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“Actually, it was a quarter of people, so the problem really is widespread and deserves attention.”。其实是四分之一的人，所以这个问题确实很普遍，值得关注。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-l16',
            number: 16,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-6',
            stem: 'What does the speaker think is the best way to get started in user experience design?',
            options: [
              {
                key: 'A',
                text: 'Learning from skilled designers.',
              },
              {
                key: 'B',
                text: 'Obtaining real-world experience.',
              },
              {
                key: 'C',
                text: 'Joining a 6-month training camp.',
              },
              {
                key: 'D',
                text: 'Anticipating actual challenges.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“The most common question I\'m asked always centers around how to get started in user experience design, to which my response is always that nothing…”。别人最常问我的问题总是围绕怎么入门用户体验设计，对此我的回答始终是：没有什么能替代真实世界的经验。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l17',
            number: 17,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-6',
            stem: 'What does the speaker say being effective requires?',
            options: [
              {
                key: 'A',
                text: 'Core skills.',
              },
              {
                key: 'B',
                text: 'Higher education.',
              },
              {
                key: 'C',
                text: 'Adaptability.',
              },
              {
                key: 'D',
                text: 'Capability.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“Being effective requires adaptability — something you don\'t really learn in school, much less in a 6-month training camp.”。要做到有效就需要适应力——这是你在学校里学不太到的东西，在六个月的训练营里就更别提了。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l18',
            number: 18,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-6',
            stem: 'What can people do as long as they know their end goal and strive for it?',
            options: [
              {
                key: 'A',
                text: 'Start anywhere.',
              },
              {
                key: 'B',
                text: 'Face challenges.',
              },
              {
                key: 'C',
                text: 'Pursue roles in teams.',
              },
              {
                key: 'D',
                text: 'Follow their own path.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“You can start anywhere as long as you know your end goal and you commit to actively pursuing opportunities to learn and grow along the way.”。只要你清楚自己的终极目标，并且愿意一路上主动去追寻学习和成长的机会，你可以从任何地方起步。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l19',
            number: 19,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-7',
            stem: 'Why did the school principal ask what needed to change?',
            options: [
              {
                key: 'A',
                text: 'To respond actively to students\' requests.',
              },
              {
                key: 'B',
                text: 'To engage students more in their learning.',
              },
              {
                key: 'C',
                text: 'To enable teachers to interact more with their students.',
              },
              {
                key: 'D',
                text: 'To allow students more freedom in their academic work.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“When planning for this year, our principal asked what needed to change to engage students more in their learning.”。在筹划今年的工作时，我们校长问需要改变什么，好让学生更投入到自己的学习中。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l20',
            number: 20,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-7',
            stem: 'What has flexible seating meant at the speaker\'s school?',
            options: [
              {
                key: 'A',
                text: 'Using new furniture to create a comfortable environment.',
              },
              {
                key: 'B',
                text: 'Shifting from traditional teaching to task-based learning.',
              },
              {
                key: 'C',
                text: 'Adopting a variety of different seating options.',
              },
              {
                key: 'D',
                text: 'Rearranging most traditional chairs and desks.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“For us, flexible seating has meant removing most of the traditional chairs and desks and introducing a variety of different seating options to…”。对我们来说，灵活座位意味着撤掉大部分传统桌椅，引入多种不同的座位选择，以促进学生投入。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l21',
            number: 21,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-7',
            stem: 'What has flexible seating brought about at the speaker\'s school?',
            options: [
              {
                key: 'A',
                text: 'A win for all people involved.',
              },
              {
                key: 'B',
                text: 'A strengthened effect of its discipline.',
              },
              {
                key: 'C',
                text: 'A harmonious relationship among its students.',
              },
              {
                key: 'D',
                text: 'A change to teachers\' opinion of their students.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“From our experience so far, flexible seating enhances student ownership of space and engagement in learning, while reducing rates of student…”。从我们目前的经验看，灵活座位增强了学生对空间的归属感和学习投入，同时降低了学生的脱离感和纪律处分的发生率。这对所有相关方都是一种共赢。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l22',
            number: 22,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-8',
            stem: 'Why were dozens of British students sent home on Tuesday?',
            options: [
              {
                key: 'A',
                text: 'They weren\'t informed of the school\'s updated rules.',
              },
              {
                key: 'B',
                text: 'They arrived late for their first day of school.',
              },
              {
                key: 'C',
                text: 'They answered their headteacher\'s email in an impolite way.',
              },
              {
                key: 'D',
                text: 'They didn\'t wear the shoes required by the school\'s new policy.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“About 30 students were turned away from Taverham High School in Norfolk, England. Headteacher, Dr Roger Harris, confirmed that this was due to a…”。大约 30 名学生被英格兰诺福克的 Taverham 高中拒之门外。校长 Roger Harris 博士确认，这是由于学校校服政策的一项变动。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l23',
            number: 23,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-8',
            stem: 'What can the price of school uniforms spark among families in financial difficulty?',
            options: [
              {
                key: 'A',
                text: 'Riots.',
              },
              {
                key: 'B',
                text: 'Anger.',
              },
              {
                key: 'C',
                text: 'Disputes.',
              },
              {
                key: 'D',
                text: 'Panic.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“The price of school uniforms can spark panic among families struggling with the high cost of living.”。校服的价格会在那些在高生活成本中苦苦挣扎的家庭里激起恐慌。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l24',
            number: 24,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-8',
            stem: 'What did the headteacher think of the school\'s new uniform rules?',
            options: [
              {
                key: 'A',
                text: 'They strengthened the school\'s discipline and order.',
              },
              {
                key: 'B',
                text: 'They improved student behavior and performance.',
              },
              {
                key: 'C',
                text: 'They enhanced the positive image of the school.',
              },
              {
                key: 'D',
                text: 'They rendered the school unique in the district.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“Harris held that strengthened rules around school uniforms improved student outcomes and behavior.”。Harris 认为，更严格的校服规定改善了学生的成绩和行为。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-l25',
            number: 25,
            type: 'single',
            groupId: 'cet4-2025-12-s1-ls-8',
            stem: 'What did Lucinda May have to do to buy her child the correct pair of shoes?',
            options: [
              {
                key: 'A',
                text: 'Turn to her parents for help.',
              },
              {
                key: 'B',
                text: 'Tighten her monthly budget.',
              },
              {
                key: 'C',
                text: 'Borrow £65 from her friend.',
              },
              {
                key: 'D',
                text: 'Postpone paying her other bills.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“Lucinda May, mum of a Taverham student, said that she had to ask her parents for £65 to buy her child the correct pair of shoes.”。Taverham 一名学生的母亲 Lucinda May 说，她不得不向自己的父母要 65 英镑，来给孩子买那双符合要求的鞋。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s1-ls-8',
            },
            score: 2,
          },
        ],
      },
      {
        id: 'cloze',
        kind: 'cloze',
        title: 'Part III Section A Banked Cloze',
        instructions: 'Directions: In this section, there is a passage with ten blanks. You are required to select one word for each blank from a list of choices given in a word bank following the passage. Read the passage through carefully before making your choices. Each choice in the bank is identified by a letter. Please mark the corresponding letter for each item on Answer Sheet 2 with a single line through the centre. You may not use any of the words in the bank more than once.',
        minutes: 15,
        bank: {
          A: 'approximately',
          B: 'case',
          C: 'chance',
          D: 'confused',
          E: 'crucial',
          F: 'deposited',
          G: 'enter',
          H: 'invest',
          I: 'matter',
          J: 'presented',
          K: 'range',
          L: 'regular',
          M: 'seize',
          N: 'selection',
          O: 'ultimately',
        },
        passages: [
          {
            id: 'c1',
            title: '选词填空短文',
            paragraphs: [
              {
                id: 'c1-1',
                text: 'People tend to want as many choices as possible. They believe this will maximize their __(26)__ of making the best decision. But research shows that, when it comes to actually making a __(27)__ from all of these choices, people can become __(28)__ and avoid making a decision altogether. Even worse, when people finally do decide, they are generally less satisfied with their decision and feel more regretful over whatever choice they made.',
              },
              {
                id: 'c1-2',
                text: 'Why does this happen? Research shows that when people choose from many options, they __(29)__ more in the decision, but feel less confident in their ability to decide well. In other words, when we are __(30)__ with more choices, making the "right" or "correct" decision begins to feel more __(31)__ and, at the same time, more difficult to do. This may contribute to the deep fear that we will make the wrong decision.',
              },
              {
                id: 'c1-3',
                text: 'How can we solve this problem? I believe this fear could be tempered by putting decisions into perspective. It might help to remember that many of the choices you make, such as what to have for lunch, will not __(32)__ much in the future and that, even more important choices, like accepting a new job, can __(33)__ be changed. It could also help to __(34)__ these situations with clear guidelines and ideas of what you want from the __(35)__ of options, which can narrow the possible choices, and also make you more confident about your ability to make the right decision.',
              },
            ],
          },
        ],
        questions: [
          {
            id: 'cet4-2025-12-s1-c26',
            number: 26,
            type: 'bank',
            stem: 'They believe this will maximize their __(26)__ of making the best decision.',
            answer: 'C',
            explanation: 'C chance（名词）。词性：形容词 their 物主代词后 + of 短语，名词性短语中心词。依据：chance of doing sth = 做……的可能性。原句意为「他们相信这样能最大化做出最佳决定的可能性」，maximize the chance of doing sth 是非常稳定的搭配，C 完美契合。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c27',
            number: 27,
            type: 'bank',
            stem: 'But research shows that, when it comes to actually making a __(27)__ from all of these choices, people can become __(28)__ and avoid making a decision altogether.',
            answer: 'N',
            explanation: 'N selection（名词）。词性：不定冠词 a 后 + from 短语前，名词作宾语。依据：make a selection from = 从……中做出选择。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c28',
            number: 28,
            type: 'bank',
            stem: 'But research shows that, when it comes to actually making a __(27)__ from all of these choices, people can become __(28)__ and avoid making a decision altogether.',
            answer: 'D',
            explanation: 'D confused（形容词）。词性：become 后接形容词/过去分词作表语。依据：confused = 困惑、不知所措，正好引出「干脆不决定」。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c29',
            number: 29,
            type: 'bank',
            stem: 'Research shows that when people choose from many options, they __(29)__ more in the decision, but feel less confident in their ability to decide well.',
            answer: 'H',
            explanation: 'H invest（动词）。词性：主语 people 后缺谓语，且与 feel less confident 并列。依据：invest more in sth = 在……上投入更多。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c30',
            number: 30,
            type: 'bank',
            stem: 'In other words, when we are __(30)__ with more choices, making the "right" or "correct" decision begins to feel more __(31)__ and, at the same time, more difficult to do.',
            answer: 'J',
            explanation: 'J presented（形容词）。词性：be 动词 are 后 + 介词 with，典型「be + 形容词 + with」结构。依据：be presented with 是固定搭配，表「被给予/面对……」。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c31',
            number: 31,
            type: 'bank',
            stem: 'In other words, when we are __(30)__ with more choices, making the "right" or "correct" decision begins to feel more __(31)__ and, at the same time, more difficult to do.',
            answer: 'E',
            explanation: 'E crucial（形容词）。词性：feel + more + 空，feel 后接形容词作表语。依据：和 difficult 并列：决定既「显得更重要」又「更难做」。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c32',
            number: 32,
            type: 'bank',
            stem: 'It might help to remember that many of the choices you make, such as what to have for lunch, will not __(32)__ much in the future and that, even more important choices, like accepting a new job, can __(33)__ be changed.',
            answer: 'I',
            explanation: 'I matter（动词）。词性：助动词 not 后 + 副词 much，需要动词原形。依据：matter much = 关系重大、要紧。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c33',
            number: 33,
            type: 'bank',
            stem: 'It might help to remember that many of the choices you make, such as what to have for lunch, will not __(32)__ much in the future and that, even more important choices, like accepting a new job, can __(33)__ be changed.',
            answer: 'O',
            explanation: 'O ultimately（副词）。词性：情态动词 can 后 + 被动语态 be changed 前，副词作状语。依据：ultimately 表「最终归根到底」，弱化决定的不可逆感。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c34',
            number: 34,
            type: 'bank',
            stem: 'It could also help to __(34)__ these situations with clear guidelines and ideas of what you want from the __(35)__ of options, which can narrow the possible choices, and also make you more confident about your ability to make the right decision.',
            answer: 'G',
            explanation: 'G enter（动词）。词性：并列 to + 空，需动词原形；与上句 to remember 并列。依据：enter these situations with ... = 带着……进入这些情境。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s1-c35',
            number: 35,
            type: 'bank',
            stem: 'It could also help to __(34)__ these situations with clear guidelines and ideas of what you want from the __(35)__ of options, which can narrow the possible choices, and also make you more confident about your ability to make the right decision.',
            answer: 'K',
            explanation: 'K range（名词）。词性：定冠词 the 后 + of 短语，典型「冠词+名词+of...」结构。依据：a range of / the range of options 是固定搭配，意为「一系列选项」。',
            score: 0.5,
          },
        ],
      },
      {
        id: 'reading',
        kind: 'reading',
        title: 'Part III Section B/C Reading Comprehension',
        instructions: 'Directions: In this section, you are going to read a passage with ten statements attached to it. Each statement contains information given in one of the paragraphs. Identify the paragraph from which the information is derived. You may choose a paragraph more than once. Each paragraph is marked with a letter. Answer the questions by marking the corresponding letter on Answer Sheet 2. Directions: There are 2 passages in this section. Each passage is followed by some questions or unfinished statements. For each of them there are four choices marked A), B), C) and D). You should decide on the best choice and mark the corresponding letter on Answer Sheet 2 with a single line through the centre.',
        minutes: 25,
        passages: [
          {
            id: 'p0',
            title: 'The battle over bike lanes needs a mindset shift',
            paragraphs: [
              {
                id: 'p0-1',
                marker: 'A',
                text: ' Five years ago, the city of Queens, New York, announced that it would be putting bike lanes onto a stretch of Skillman Ave — and removing 116 parking spots. Cyclists loved the plan, but local business owners got very angry. Taking out those parking spots, as they argued at protests and in letters to the city council, would ruin stores and restaurants along Skillman. "Parking here is already a nightmare," one shouted at a protest rally.',
              },
              {
                id: 'p0-2',
                marker: 'B',
                text: ' But the bike lanes were a done deal, and soon they were in place. Early this year, Jesse Coburn — an investigative writer with Streetsblog New York — wondered whether those predictions of economic collapse came true. So he asked the city\'s Department of Finance to give him a few years\' worth of sales figures for that stretch of Skillman Ave. How had the businesses on that street fared?',
              },
              {
                id: 'p0-3',
                marker: 'C',
                text: ' Quite well, it turns out. In the year after the bike lanes arrived, businesses on Skillman saw sales rise by 12 percent, compared to 3 percent for Queens in general. What\'s more, that section of road saw new businesses open, while Queens overall had a net loss.',
              },
              {
                id: 'p0-4',
                marker: 'D',
                text: ' The thing is, the actual merchants along Skillman? They didn\'t believe it. When Coburn spoke to them and described what he\'d found, only a few store owners admitted the lanes had helped. Many still insisted the lanes were killing their part of the city. And emotions ran hot: Someone scattered tacks(大头钉) on the bike lane.',
              },
              {
                id: 'p0-5',
                marker: 'E',
                text: ' This little story turns out to be a fascinating glimpse at the challenges cities face as they try to update their urban infrastructure — to clean up the air, reduce greenhouse emissions, and speed up travel by making towns more bike-friendly. There\'s a rising amount of data showing that installing bike lanes and making streets more pedestrian-friendly boosts the economic fortunes of a place. Removing cars and parking spots works. But the folks who run local businesses simply aren\'t convinced, even when their own street performs. Given that sort of mess, can political fights over bike lanes ever end?',
              },
              {
                id: 'p0-6',
                marker: 'F',
                text: ' In 2013, researchers at New York City\'s Department of Transportation studied seven stretches of road that had installed bike lanes or created pedestrian-friendly areas. The city analyzed the data for businesses along those routes and found that by the third year, sales grew faster on five of the streets than in the district overall, on average — up to five times faster, in fact.',
              },
              {
                id: 'p0-7',
                marker: 'G',
                text: ' Beyond New York, a survey of research from 23 cities found that bike lanes and pedestrian-friendly design didn\'t hurt local retail and food stores. ("Fears of disastrous consequences for local businesses are unfounded," the researchers concluded.) More recent work has shown roughly the same.',
              },
              {
                id: 'p0-8',
                marker: 'H',
                text: ' The truth is that in fairly dense areas, bikes are more efficient at moving people around. You might lose one car driver\'s business — but you gain shoppers who now can arrive more easily on bikes. "Cyclists and pedestrians are consumers too," notes Professor Susan Handy. Plus, streets redesigned for bikes and pedestrians tend to become more pleasant places to hang around, so "in a lot of cases, that\'s created much nicer environments that are really good for those businesses."',
              },
              {
                id: 'p0-9',
                marker: 'I',
                text: ' Mom-and-pop shops are usually pretty quick at recognizing situations that will help their bottom lines. So why the blind spot here? Perhaps it\'s that attention focuses on horror stories — and some merchants do get hit when bike lanes come in.',
              },
              {
                id: 'p0-10',
                marker: 'J',
                text: ' I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge, Massachusetts. She said business fell by at least 40 percent when the city removed nearby parking to put in a bike lane. The majority of her customers drive, with many coming from nearby towns. Only a very few have shifted to cycling, and even those almost certainly won\'t cycle in Boston\'s snowy winters. So while Hughes supports bike lanes — "cyclists deserve to be safe" — she sees the parking loss as an existential risk. "Look, 90 percent of my customers drive," she told me. "For our business, the bike lanes are way worse than Covid was."',
              },
              {
                id: 'p0-11',
                marker: 'K',
                text: ' For others, the pushback is cultural, says Henry Grabar, a writer for the Slate Magazine. Small business owners are frequently drivers who commute from other parts of the city by car, Grabar points out. They\'re also often longtime locals. "They tend to be people with deep roots in the city, who have hung around since before the neighborhood became what it is today," he adds. Driving around town in a car is so normal to them that cycling seems weird and unusual — despite its boost from Covid, when bike sales exploded by 75 percent.',
              },
              {
                id: 'p0-12',
                marker: 'L',
                text: ' Psychology beats all! Who knew, right? The fierce divide between store owners and bike-lane advocates seems similar to our larger culture wars over climate change. If we\'ve learned anything about culture wars, it\'s that data isn\'t much good at changing minds.',
              },
              {
                id: 'p0-13',
                marker: 'M',
                text: ' When Janette Sadik-Khan was the head of New York City\'s Transportation Department back in the early 2000s, she oversaw a rollout(推出) of bike lanes — and got angry blowback from residents and business owners who claimed there weren\'t enough cyclists to justify installing lanes. Now, she notes ironically, the lanes are so full of activity that opponents have turned to claiming the problem is the opposite: There are too many cyclists getting in the way of cars.',
              },
              {
                id: 'p0-14',
                marker: 'N',
                text: ' Maybe bike lanes will always be charged with emotion, until enough of the public is finally concerned about climate change — and it seems reckless(鲁莽的) to not have them.',
              },
              {
                id: 'p0-15',
                marker: 'O',
                text: ' Crises, after all, have a way of opening people\'s eyes to possibilities. During Covid, restaurants and cafés lost so much business that cities nationwide began allowing them to build curbside seating areas where people could sit, safely, in the open air. It greatly reduced parking — but because, well, shop owners didn\'t see any way around it. Customers loved the outdoor seating so much that cities are making it permanent: A New York City study of several streets closed during Covid found storeowners making more than before, and diners enjoying the outdoor lifestyle. If data won\'t change minds, customers might.',
              },
            ],
          },
          {
            id: 'p1',
            title: 'Passage One',
            paragraphs: [
              {
                id: 'p1-1',
                marker: 'A',
                text: 'All living organisms on Earth are exposed to a 24-hour day-night cycle. This cycle is the reason why people rest at night and are active during the day. Consequently, all human body functions also follow this daily rhythm, and the timing of behaviors like exercise or food intake can significantly influence your health. For example, eating at night can lead to weight gain over time because food intake at night leads to increased fat storage.',
              },
              {
                id: 'p1-2',
                marker: 'B',
                text: 'Many drug targets in the body follow a 24-hour cycle, too. This means that the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period. Because how the body responds to a drug can differ depending on the time it is taken, it logically follows that taking medicines at specific times could help increase their effectiveness and reduce unwanted side effects.',
              },
              {
                id: 'p1-3',
                marker: 'C',
                text: 'When doctors prescribe medicine for people, they rarely consider the best time to take it. There are two main reasons for that oversight. First, many physicians are not aware that some drugs work better during a specific time of the day. And second, most drugs have not been studied for possible different effects during a 24-hour cycle. Therefore, patients are directed to take most drugs during the morning or evening primarily to ensure compliance.',
              },
              {
                id: 'p1-4',
                marker: 'D',
                text: 'Over 50 years ago, researchers found that the cholesterol drug simvastatin is more effective at lowering cholesterol levels when taken at night rather than during the day. This is because the liver enzyme(酶) these drugs target is more active at night.',
              },
              {
                id: 'p1-5',
                marker: 'E',
                text: 'Taking medicine at the wrong time can even cause harm. My colleagues and I wondered whether midazolam, the most common sedative(镇静剂) used in surgical procedures worldwide, might interfere with the internal clock that protects the heart at night. Currently, there are no guidelines regarding when midazolam should be administered.',
              },
              {
                id: 'p1-6',
                marker: 'F',
                text: 'More research is needed to determine the best times to administer treatments for different diseases. I believe taking drug timing into account could help make treatments more effective and help more people worldwide.',
              },
            ],
          },
          {
            id: 'p2',
            title: 'Passage Two',
            paragraphs: [
              {
                id: 'p2-1',
                marker: 'A',
                text: 'Katharine Abraham, an economics professor, was chatting with her hairdresser(理发师) about retirement plans. The economist said she plans to continue working because she wants to. The hairdresser agreed but for a different reason: She needs the money.',
              },
              {
                id: 'p2-2',
                marker: 'B',
                text: 'Both scenarios(情况) are contributing to a big increase in the number of people in the U.S. working into their 70s. Over the past 20 years, the share of Americans working in their 70s has risen from less than 10% to nearly 15%.',
              },
              {
                id: 'p2-3',
                marker: 'C',
                text: 'In addition to people being healthier and living much longer, economists say that a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional pensions in the private sector are some of the reasons people delay retirement. The decline of manufacturing and the increase in the number of people working in less labor-intensive occupations also has contributed to the trend, says Abraham, who researches work and retirement decisions of older Americans.',
              },
              {
                id: 'p2-4',
                marker: 'D',
                text: '"Which matters more depends on what your history up until that point has been in the type of work you\'re doing," Abraham says.',
              },
              {
                id: 'p2-5',
                marker: 'E',
                text: 'The overall trend is hitting Americans of all different levels of educational attainment, although the percentages vary by category. The share of Americans with bachelor\'s degrees who were working into their 70s reached nearly 20% in 2018. For those with a high school degree or less, the proportion of those working in their 70s had risen to around 10%, while those with some college education were in the middle at around 15%.',
              },
              {
                id: 'p2-6',
                marker: 'F',
                text: 'Martin Neil Baily, an economist who is leading a research project on retirement security, notes that quitting a career can lead to feelings of isolation and loneliness, particularly for men. He suggests that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons. They\'re also more likely to be in professional occupations where they tend to enjoy their work more.',
              },
              {
                id: 'p2-7',
                marker: 'G',
                text: 'Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely doing so for financial reasons.',
              },
            ],
          },
        ],
        questions: [
          {
            id: 'cet4-2025-12-s1-m36',
            number: 36,
            type: 'single',
            stem: 'An increasing amount of data indicates that installing bike lanes raises local business revenues.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'E',
            explanation: '锚点「increasing amount of data + raises local business revenues」。定位原文：“There\'s a rising amount of data showing that installing bike lanes and making streets more pedestrian-friendly boosts the economic fortunes of a…”。越来越多的数据表明,铺设自行车道与让街道更适合步行,能拉升一个地方的经济运势。故选 E 段。',
            evidence: {
              paragraphId: 'p0-5',
              quote: 'There\'s a rising amount of data showing that installing bike lanes and making streets more pedestrian-friendly boosts the economic fortunes of a place.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m37',
            number: 37,
            type: 'single',
            stem: 'According to a magazine writer, some small business owners\' resistance to bike lanes arises from cultural factors.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'K',
            explanation: '锚点「a magazine writer + cultural factors」。定位原文：“For others, the pushback is cultural, says Henry Grabar, a writer for the Slate Magazine.”。Slate 杂志撰稿人 Henry Grabar 表示,对另一些商户来说,这种抵触是文化层面的。故选 K 段。',
            evidence: {
              paragraphId: 'p0-11',
              quote: 'For others, the pushback is cultural, says Henry Grabar, a writer for the Slate Magazine.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m38',
            number: 38,
            type: 'single',
            stem: 'A stretch of Skillman Ave witnessed not only a big increase in sales but also the opening of new businesses.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'C',
            explanation: '锚点「Skillman Ave + 销售大增 + 新店开张」。定位原文：“In the year after the bike lanes arrived, businesses on Skillman saw sales rise by 12 percent, compared to 3 percent for Queens in general. What\'s…”。自行车道铺设后的一年里,Skillman 沿街商户的销售上涨了 12%,相比之下整个皇后区只涨了 3%;不仅如此,这一段路还有新店开张,而皇后区整体出现净减少。故选 C 段。',
            evidence: {
              paragraphId: 'p0-3',
              quote: 'In the year after the bike lanes arrived, businesses on Skillman saw sales rise by 12 percent, compared to 3 percent for Queens in general. What\'s more, that section of road saw new businesses open,…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m39',
            number: 39,
            type: 'single',
            stem: 'When people have no way out in crises, they are more likely to embrace changes.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'O',
            explanation: '锚点「no way out in crises + embrace changes」。定位原文：“Crises, after all, have a way of opening people\'s eyes to possibilities.”。危机毕竟有它的办法,能让人睁开眼睛看到新的可能性。故选 O 段。',
            evidence: {
              paragraphId: 'p0-15',
              quote: 'Crises, after all, have a way of opening people\'s eyes to possibilities.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m40',
            number: 40,
            type: 'single',
            stem: 'According to one survey, city design with bike lanes and pedestrian space did not negatively impact local businesses.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'G',
            explanation: '锚点「one survey + did not negatively impact」。定位原文：“Beyond New York, a survey of research from 23 cities found that bike lanes and pedestrian-friendly design didn\'t hurt local retail and food stores.”。把视野放到纽约以外,一项汇总了 23 个城市研究的调查发现,自行车道与步行友好设计并未损害本地零售与餐饮店。故选 G 段。',
            evidence: {
              paragraphId: 'p0-7',
              quote: 'Beyond New York, a survey of research from 23 cities found that bike lanes and pedestrian-friendly design didn\'t hurt local retail and food stores.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m41',
            number: 41,
            type: 'single',
            stem: 'Despite increased business activity on Skillman Ave, many store owners insisted the bike lanes were destroying their area.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'D',
            explanation: '锚点「Skillman Ave + 商业其实增长 + 店主仍坚称车道毁了街区」。定位原文：“When Coburn spoke to them and described what he\'d found, only a few store owners admitted the lanes had helped. Many still insisted the lanes were…”。当 Coburn 找店主、把自己的发现告诉他们时,只有少数店主承认车道帮了忙;许多人仍坚称车道正在毁掉他们所在的这一带。故选 D 段。',
            evidence: {
              paragraphId: 'p0-4',
              quote: 'When Coburn spoke to them and described what he\'d found, only a few store owners admitted the lanes had helped. Many still insisted the lanes were killing their part of the city.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m42',
            number: 42,
            type: 'single',
            stem: 'In a war of culture, data does not help much in changing people\'s minds.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'L',
            explanation: '锚点「war of culture + data does not help」。定位原文：“If we\'ve learned anything about culture wars, it\'s that data isn\'t much good at changing minds.”。如果说我们在文化战上学到了什么,那就是: 数据并不擅长改变人的想法。故选 L 段。',
            evidence: {
              paragraphId: 'p0-12',
              quote: 'If we\'ve learned anything about culture wars, it\'s that data isn\'t much good at changing minds.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m43',
            number: 43,
            type: 'single',
            stem: 'A businesswoman said her business dropped sharply when parking space gave way to a bike lane, because most of her customers came by car.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'J',
            explanation: '锚点「一位女商户 + 生意骤降 + 顾客多开车」。定位原文：“She said business fell by at least 40 percent when the city removed nearby parking to put in a bike lane. The majority of her customers drive, with…”。她说,当城市拆掉附近的停车位以铺设自行车道时,生意至少下降了 40%;她的大多数顾客都是开车来的,很多来自邻近城镇。故选 J 段。',
            evidence: {
              paragraphId: 'p0-10',
              quote: 'She said business fell by at least 40 percent when the city removed nearby parking to put in a bike lane. The majority of her customers drive, with many coming from nearby towns.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m44',
            number: 44,
            type: 'single',
            stem: 'Local business owners on Skillman Ave argued that their businesses would be ruined when parking spots were replaced by bike lanes.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'A',
            explanation: '锚点「Skillman Ave + 店主担心被毁 + 停车位被换成自行车道」。定位原文：“Cyclists loved the plan, but local business owners got very angry. Taking out those parking spots, as they argued at protests and in letters to the…”。骑行者很喜欢这个方案,但当地商户非常愤怒;他们在抗议中、在写给市议会的信里都辩称,拆掉那些停车位会毁掉 Skillman 沿街的商店与餐馆。故选 A 段。',
            evidence: {
              paragraphId: 'p0-1',
              quote: 'Cyclists loved the plan, but local business owners got very angry. Taking out those parking spots, as they argued at protests and in letters to the city council, would ruin stores and restaurants…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-m45',
            number: 45,
            type: 'single',
            stem: 'People may find it more pleasant to wander around streets redesigned for cycling and walking.',
            options: [
              {
                key: 'A',
                text: 'Five years ago, the city of Queens, New York, announced…',
              },
              {
                key: 'B',
                text: 'But the bike lanes were a done deal, and soon they were in…',
              },
              {
                key: 'C',
                text: 'Quite well, it turns out.',
              },
              {
                key: 'D',
                text: 'The thing is, the actual merchants along Skillman?',
              },
              {
                key: 'E',
                text: 'This little story turns out to be a fascinating glimpse at…',
              },
              {
                key: 'F',
                text: 'In 2013, researchers at New York City\'s Department of…',
              },
              {
                key: 'G',
                text: 'Beyond New York, a survey of research from 23 cities found…',
              },
              {
                key: 'H',
                text: 'The truth is that in fairly dense areas, bikes are more…',
              },
              {
                key: 'I',
                text: 'Mom-and-pop shops are usually pretty quick at recognizing…',
              },
              {
                key: 'J',
                text: 'I spoke to Cindy Hughes, a hairdresser(理发师) in Cambridge,…',
              },
              {
                key: 'K',
                text: 'For others, the pushback is cultural, says Henry Grabar, a…',
              },
              {
                key: 'L',
                text: 'Psychology beats all!',
              },
              {
                key: 'M',
                text: 'When Janette Sadik-Khan was the head of New York City\'s…',
              },
              {
                key: 'N',
                text: 'Maybe bike lanes will always be charged with emotion, until…',
              },
              {
                key: 'O',
                text: 'Crises, after all, have a way of opening people\'s eyes to…',
              },
            ],
            answer: 'H',
            explanation: '锚点「more pleasant + wander/stroll + redesigned streets」。定位原文：“streets redesigned for bikes and pedestrians tend to become more pleasant places to hang around”。为自行车和行人重新设计过的街道,往往变成让人更愿意逗留的宜人场所。故选 H 段。',
            evidence: {
              paragraphId: 'p0-8',
              quote: 'streets redesigned for bikes and pedestrians tend to become more pleasant places to hang around',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s1-r46',
            number: 46,
            type: 'single',
            stem: 'What do we learn from the passage about the timing of our behaviors?',
            options: [
              {
                key: 'A',
                text: 'It has a considerable impact on our health.',
              },
              {
                key: 'B',
                text: 'It confines us to a 24-hour day-night cycle.',
              },
              {
                key: 'C',
                text: 'It requires us to follow a particular rhythm.',
              },
              {
                key: 'D',
                text: 'It holds the key to all human body functions.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“Consequently, all human body functions also follow this daily rhythm, and the timing of behaviors like exercise or food intake can significantly…”。因此，人体的所有功能也都遵循这一日常节律，而锻炼、进食等行为的时机会显著影响你的健康。故选 A。',
            evidence: {
              paragraphId: 'p1-1',
              quote: 'Consequently, all human body functions also follow this daily rhythm, and the timing of behaviors like exercise or food intake can significantly influence your health.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r47',
            number: 47,
            type: 'single',
            stem: 'What does the author say about the proteins in our body?',
            options: [
              {
                key: 'A',
                text: 'They can modify the effects of medicines in different ways.',
              },
              {
                key: 'B',
                text: 'They can reduce unwanted side effects of certain medicines.',
              },
              {
                key: 'C',
                text: 'Their reaction to medicines changes during the day-night cycle.',
              },
              {
                key: 'D',
                text: 'Their design determines how differently they react to medicines.',
              },
            ],
            answer: 'C',
            explanation: '（细节题）定位原文：“This means that the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period.”。这意味着，药物所要作用的那些特定蛋白质，在 24 小时的进程中对药物的反应可能各不相同。故选 C。',
            evidence: {
              paragraphId: 'p1-2',
              quote: 'This means that the specific proteins a drug is designed to modify can react differently to the medicine over the course of a 24-hour time period.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r48',
            number: 48,
            type: 'single',
            stem: 'What do doctors do when prescribing medicine for people?',
            options: [
              {
                key: 'A',
                text: 'They give little thought to the time of taking it for maximum effect.',
              },
              {
                key: 'B',
                text: 'They rarely consider which medicine works better for which patient.',
              },
              {
                key: 'C',
                text: 'They tell patients its possible side effects during a period of 24 hours.',
              },
              {
                key: 'D',
                text: 'They tell patients to comply with the directions of drug manufacturers.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“When doctors prescribe medicine for people, they rarely consider the best time to take it.”。医生给人们开药时，很少考虑服药的最佳时间。故选 A。',
            evidence: {
              paragraphId: 'p1-3',
              quote: 'When doctors prescribe medicine for people, they rarely consider the best time to take it.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r49',
            number: 49,
            type: 'single',
            stem: 'Why do doctors advise patients to take most drugs in the morning or in the evening?',
            options: [
              {
                key: 'A',
                text: 'To discourage them from making complaints.',
              },
              {
                key: 'B',
                text: 'To ensure they take the drugs as instructed.',
              },
              {
                key: 'C',
                text: 'To comply with new research findings strictly.',
              },
              {
                key: 'D',
                text: 'To guarantee the maximum effect of the drugs.',
              },
            ],
            answer: 'B',
            explanation: '（细节题）定位原文：“Therefore, patients are directed to take most drugs during the morning or evening primarily to ensure compliance.”。因此，病人被指示在早上或晚上服用大多数药物，主要是为了确保遵医服药。故选 B。',
            evidence: {
              paragraphId: 'p1-3',
              quote: 'Therefore, patients are directed to take most drugs during the morning or evening primarily to ensure compliance.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r50',
            number: 50,
            type: 'single',
            stem: 'What does the author suggest near the end of the passage?',
            options: [
              {
                key: 'A',
                text: 'Considering drug-taking timing when prescribing drugs for patients.',
              },
              {
                key: 'B',
                text: 'Making treatments less complex by taking drug timing into account.',
              },
              {
                key: 'C',
                text: 'Conducting more studies to find out the best timing for treating different diseases.',
              },
              {
                key: 'D',
                text: 'Finding out the most effective drugs for treating diseases through further research. Passage Two Questions 51 to 55 are based on the following passage. Katharine Abraham, an economics professor, was chatting with her hairdresser(理发师) about retirement plans. The economist said she plans to continue working because she wants to. The hairdresser agreed but for a different reason: She needs the money. Both scenarios(情况) are contributing to a big increase in the number of people in the U.S. working into their 70s. Over the past 20 years, the share of Americans working in their 70s has risen from less than 10% to nearly 15%. In addition to people being healthier and living much longer, economists say that a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional pensions in the private sector are some of the reasons people delay retirement. The decline of manufacturing and the increase in the number of people working in less labor-intensive occupations also has contributed to the trend, says Abraham, who researches work and retirement decisions of older Americans. "Which matters more depends on what your history up until that point has been in the type of work you\'re doing," Abraham says. The overall trend is hitting Americans of all different levels of educational attainment, although the percentages vary by category. The share of Americans with bachelor\'s degrees who were working into their 70s reached nearly 20% in 2018. For those with a high school degree or less, the proportion of those working in their 70s had risen to around 10%, while those with some college education were in the middle at around 15%. Martin Neil Baily, an economist who is leading a research project on retirement security, notes that quitting a career can lead to feelings of isolation and loneliness, particularly for men. He suggests that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons. They\'re also more likely to be in professional occupations where they tend to enjoy their work more. Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely doing so for financial reasons.',
              },
            ],
            answer: 'C',
            explanation: '（主旨题）定位原文：“More research is needed to determine the best times to administer treatments for different diseases”。预判「需更多研究找最佳给药时机」与 Conducting more studies to find out the best timing for treating different diseases 完全对应，锁定该项。故选 C。',
            evidence: {
              paragraphId: 'p1-6',
              quote: 'More research is needed to determine the best times to administer treatments for different diseases',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r51',
            number: 51,
            type: 'single',
            stem: 'What do we learn from the passage about the economics professor and her hairdresser?',
            options: [
              {
                key: 'A',
                text: 'They differ in their reasons for continuing to work.',
              },
              {
                key: 'B',
                text: 'They are both committed to working into their 70s.',
              },
              {
                key: 'C',
                text: 'They are happy about their current financial situation.',
              },
              {
                key: 'D',
                text: 'They hold different views about postponing retirement.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“The economist said she plans to continue working because she wants to. The hairdresser agreed but for a different reason: She needs the money.”。经济学家说她打算继续工作，因为她想这样做。理发师也同意继续工作，但理由不同：她需要钱。故选 A。',
            evidence: {
              paragraphId: 'p2-1',
              quote: 'The economist said she plans to continue working because she wants to. The hairdresser agreed but for a different reason: She needs the money.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r52',
            number: 52,
            type: 'single',
            stem: 'What is one of the reasons for people to delay retirement?',
            options: [
              {
                key: 'A',
                text: 'More and more people have switched to less intellectually challenging jobs.',
              },
              {
                key: 'B',
                text: 'The number of jobs suitable for older people has increased in the private sector.',
              },
              {
                key: 'C',
                text: 'The rate of wage increase in terms of purchasing power has slowed down for years.',
              },
              {
                key: 'D',
                text: 'More and more people in the workplace find it hard to rely on traditional pensions.',
              },
            ],
            answer: 'C',
            explanation: '（细节题）定位原文：“In addition to people being healthier and living much longer, economists say that a combination of financial considerations such as years of slow…”。除了人们更健康、寿命更长之外，经济学家说，多重经济因素的叠加——例如实际工资多年增长缓慢，以及私人部门远离传统养老金——是人们延迟退休的部分原因。故选 C。',
            evidence: {
              paragraphId: 'p2-3',
              quote: 'In addition to people being healthier and living much longer, economists say that a combination of financial considerations such as years of slow rise in real wages and a shift away from traditional…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r53',
            number: 53,
            type: 'single',
            stem: 'What is the general trend in people delaying retirement?',
            options: [
              {
                key: 'A',
                text: 'The higher their earnings, the more likely they are tempted to delay retirement.',
              },
              {
                key: 'B',
                text: 'Those who have more job satisfaction tend to retire later than those who have less.',
              },
              {
                key: 'C',
                text: 'More men than women are likely to stay in the labor force until their late seventies.',
              },
              {
                key: 'D',
                text: 'The higher their educational level, the more likely they are to delay retirement.',
              },
            ],
            answer: 'D',
            explanation: '（细节题）定位原文：“The overall trend is hitting Americans of all different levels of educational attainment, although the percentages vary by category. The share of…”。这一整体趋势影响着所有学历层次的美国人，尽管各类别的比例有所不同。拥有本科学历、且仍在 70 多岁工作的美国人比例在 2018 年达到近 20%；高中及以下学历者比例约 10%；有部分大学经历者居中，约 15%。故选 D。',
            evidence: {
              paragraphId: 'p2-5',
              quote: 'The overall trend is hitting Americans of all different levels of educational attainment, although the percentages vary by category. The share of Americans with bachelor\'s degrees who were working…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r54',
            number: 54,
            type: 'single',
            stem: 'What is the chief reason for college-educated workers delaying retirement according to an economist?',
            options: [
              {
                key: 'A',
                text: 'Enjoying financial security.',
              },
              {
                key: 'B',
                text: 'Staying connected socially.',
              },
              {
                key: 'C',
                text: 'Contributing more professionally.',
              },
              {
                key: 'D',
                text: 'Increasing social security payments.',
              },
            ],
            answer: 'B',
            explanation: '（细节题）定位原文：“He suggests that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons.”。他指出，许多受过大学教育的劳动者选择继续留在劳动力市场，更多是出于社交方面的好处，而不是经济原因。故选 B。',
            evidence: {
              paragraphId: 'p2-6',
              quote: 'He suggests that many college-educated workers are choosing to stay in the labor force more for social benefits than for financial reasons.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s1-r55',
            number: 55,
            type: 'single',
            stem: 'What does the passage say about people doing manual work?',
            options: [
              {
                key: 'A',
                text: 'They are eager to enjoy life after retiring.',
              },
              {
                key: 'B',
                text: 'They are likely to have financial troubles.',
              },
              {
                key: 'C',
                text: 'They generally don\'t enjoy doing it.',
              },
              {
                key: 'D',
                text: 'They tend to anticipate retirement.',
              },
            ],
            answer: 'D',
            explanation: '（细节题）定位原文：“Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely…”。另一方面，从事体力劳动较多的工人则可能更期待退休；Baily 说，那些继续留下来的多半是出于经济原因。故选 D。',
            evidence: {
              paragraphId: 'p2-7',
              quote: 'Workers in more physical jobs, meanwhile, may be more likely to look forward to retiring, Baily says, suggesting those who stay on are more likely doing so for financial reasons.',
            },
            score: 2,
          },
        ],
      },
      {
        id: 'translation',
        kind: 'translation',
        title: 'Part IV Translation',
        instructions: 'Directions: For this part, you are allowed 30 minutes to translate a passage from Chinese into English. You should write your answer on Answer Sheet 2.',
        minutes: 30,
        questions: [
          {
            id: 'cet4-2025-12-s1-t1',
            number: 1,
            type: 'translation',
            stem: '近年来，中国政府高度重视民营经济(private economy)的发展，出台了一系列政策支持民营企业。截至 2025 年 3 月底，全国民营企业数量超过 5700 万家，占企业总量的 92.3%。民营企业不仅数量稳步增长，质量和结构也在不断提升。民营企业的研发投入不断增加，在新一代信息技术、人工智能等领域发展迅速。民营企业核心竞争力的增强为中国经济的高质量发展提供了有力支撑。',
            answer: '见参考',
            explanation: '翻译解析：客观介绍中国民营经济近年的发展现状。全段是一篇客观陈述类的成就介绍：以 近年来，中国政府高度重视民营经济(private economy)的发展 开篇，围绕政策、数量、质量、研发、竞争力逐层铺陈中国民营经济的现状与趋势。这是四级汉译英的典型语体——中国社会经济介绍，用词偏正式书面，不带个人情感色彩，全篇陈述事实。 时态：一般现在时。全段在客观陈述民营经济的现状、特征与持续趋势，如 民营企业不仅数量稳步增长，质量和结构也在不断提升 讲的是当下仍在持续的状况，属于“现在的事实／常态”，故全篇默认一般现在时。仅 出台了一系列政策 这类已完成的具体动作，可局部用现在完成时承接。',
            score: 15,
          },
        ],
        reference: {
          translation: 'In recent years, the Chinese government has attached great importance to the development of the private economy and introduced a series of policies to support private enterprises. By the end of March 2025, the number of private enterprises nationwide exceeded 57 million, accounting for 92.3% of the total number of enterprises. Private enterprises are not only growing steadily in number but also improving in quality and structure. They are also increasing their R&D investment and developing rapidly in fields such as next-generation information technology and artificial intelligence. As a result, the enhancement of private enterprises\' core competitiveness provides strong support for the high-quality development of China\'s economy.',
        },
      },
    ],
  },
  'cet4-2025-12-s2': {
    subtitle: '2025 年 12 月 · 站内收录',
    minutes: 125,
    words: 1950,
    tags: [
      '真题',
      '四级',
    ],
    summary: '2025年12月英语四级真题第2套：写作、听力、选词填空、长篇阅读、仔细阅读与翻译的完整题面与参考答案站内收录，听力由浏览器合成语音朗读原文，全程不跳转外部站点。',
    parts: [
      {
        id: 'writing',
        kind: 'writing',
        title: 'Part I Writing',
        instructions: 'Directions: Suppose it is proposed that all university students should be required to learn academic writing. You are now to write a response by stating what you think of the proposal. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
        minutes: 30,
        questions: [
          {
            id: 'cet4-2025-12-s2-w1',
            number: 1,
            type: 'writing',
            stem: 'Suppose it is proposed that all university students should be required to learn academic writing. You are now to write a response by stating what you think of the proposal. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
            answer: '见参考',
            explanation: '写作要点：核心任务：对提案亮明态度；中心立意：全力支持必修学术写作；要点：打牢论文规范与学术诚信 · 为深造与就业铺路 · 让步后重申立场；段序链：复述提案＋亮立场 → 两条理由＋例证 → 让步转折＋重申建议。',
            score: 15,
          },
        ],
        reference: {
          essay: 'It has recently been proposed that all university students should be required to learn academic writing. In my view, this proposal deserves our full support, for such a skill is far more than an optional refinement.\n\nFor one thing, academic writing trains students to organize ideas logically and cite sources honestly. When I wrote my first term paper, I struggled to structure arguments and nearly copied online material by mistake; a writing course would have taught me both clear reasoning and academic integrity. For another, this ability pays off well beyond campus. Whether a graduate applies for a research position or drafts a report at work, the capacity to express thoughts precisely on paper often determines success.\n\nAdmittedly, mastering academic writing takes time and effort. Nevertheless, the long-term rewards clearly outweigh the cost. Therefore, I strongly believe universities should make this course compulsory, ideally starting from the first year so that students benefit throughout their studies.',
          guidance: [
            '核心任务：对提案亮明态度',
            '中心立意：全力支持必修学术写作',
            '要点：打牢论文规范与学术诚信 · 为深造与就业铺路 · 让步后重申立场',
            '段序链：复述提案＋亮立场 → 两条理由＋例证 → 让步转折＋重申建议',
          ],
        },
      },
      {
        id: 'listening',
        kind: 'listening',
        title: 'Part II Listening Comprehension',
        instructions: 'Directions: In this section, you will hear three news reports. At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre. Directions: In this section, you will hear two long conversations. At the end of each conversation, you will hear four questions. Both the conversation and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre. Directions: In this section, you will hear three passages. At the end of each passage, you will hear three or four questions. Both the passage and the questions will be spoken only once After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre.',
        minutes: 25,
        audio: {
          note: '听力原文由浏览器语音合成朗读（合成语音），非考试原音。',
          segments: [
            {
              id: 'cet4-2025-12-s2-ls-1',
              label: 'News Report 1',
              questionNo: 1,
              seconds: 65,
              text: 'Customs and Border Protection officials are seeing a rise in people illegally bringing eggs from Mexico into border states, such as Texas. The U.S. average price for a dozen large eggs last month hit $4.25. That\'s more than double their $1.78 price in December, 2023. Meanwhile, 30 eggs in Mexico sell for just $3.4. Those bringing eggs into the U.S. risk fines of up to $10,000. But officials say they usually seize and destroy the eggs. They also impose a $300 penalty. The Department of Agriculture banned eggs from Mexico in 2012. This was due to the risk of bird flu. Officials said most people arriving at international borders with eggs are truthful about their purchases. They simply don\'t know bringing eggs is not allowed. "Generally, the items are declared during the first inspection. Then the person can abandon the eggs without consequence," a Customs and Border Protection spokesperson said. Even so, there have been a very small number of cases recently when authorities discovered eggs during further inspections.',
            },
            {
              id: 'cet4-2025-12-s2-ls-2',
              label: 'News Report 2',
              questionNo: 3,
              seconds: 61,
              text: 'Nettie\'s House, a restaurant in America, has been hit with criticism after announcing on the website that children under the age of 10 are no longer welcome. Among the reasons given for the decision, the restaurant cited "noise levels, lack of space for high chairs, cleaning up crazy messes, and the liability of kids running around the restaurant". They decided that it was time to take control. The decision wasn\'t made lightly, but some recent events pushed them to implement this new policy. Responding to the post, one person commented that "It is messed up beyond another level. Children are children. Mums are tired and don\'t have time to cook. Not welcoming children under 10 is a complete slap in the face to families." He felt so disappointed in the establishment. There are others, however, who showed support for the restaurant\'s decision. They said it has the right to implement any rules it wants.',
            },
            {
              id: 'cet4-2025-12-s2-ls-3',
              label: 'News Report 3',
              questionNo: 5,
              seconds: 80,
              text: 'Security officers were searching a suburb in Australia where an adult snake was believed to be wandering after the discovery of a huge, "freshly shed" snake skin. The skin was found at a construction site, and the government wrote to residents to warn them. They were told to observe and, if possible, photograph the animal. If it was moving, watch where it went. It was recommended not to make contact with the animal. The type of snake was determined to be one of the world\'s largest snake species. It is not poisonous, but can still attack and kill its victims. This type of snake is classified as a threat to humans, especially small children, as well as pets. They may carry viruses that are fatal to native snakes, which do not have resistance. If officers found the snake, they would employ a licensed snake catcher to catch it and transport it to a specialist animal doctor, the government said. If caught, the snake would be examined to determine where it came from, how long it had been in the area, what it had been eating, whether it was carrying any diseases of concern and whether it had produced babies.',
            },
            {
              id: 'cet4-2025-12-s2-ls-4',
              label: 'Conversation 1',
              questionNo: 8,
              seconds: 113,
              text: 'Woman: Poor Hannah! Man: Why? What happened? Woman: Didn\'t you hear? She won a TV competition and became a millionaire overnight. Man: No way. That\'s incredible. Are you kidding? Woman: No, I\'m serious. I swear it. She went on a TV show where they quiz on general knowledge, and she won first prize. Man: Wow. That\'s so lucky of her. How much did she win? Woman: I\'m not sure of the exact figure, but it\'s a few million Euros, maybe five million Euros after tax. Man: I can\'t believe it. You\'re really not joking, are you? Woman: Honestly, look at my face. Our friend Hannah won a ton of money. Man: Unbelievable. Then why were you saying "poor Hannah"? Woman: Well, it turns out that she\'s spent it all already. Man: Five million Euros? How is that even possible? Woman: She bought a house for herself and her husband, a house for her parents, and then a house for each of her four brothers and sisters. And then she bought her husband a ridiculously expensive sports car. Man: Wow. Are they all happy? Because that\'s what matters, isn\'t it? Woman: I know for a fact Hannah isn\'t. You see, she was planning to quit the job she hates and retire early. But now that she ran out of money, she can\'t. Basically, she miscalculated how fast she was burning through the money, and she\'s now full of regret. Man: Why don\'t they sell that flashy new car? Woman: She wants to, but her husband refuses to get rid of it. He says the car is the best thing that has ever happened to him, and if she sells it, he will divorce her.',
            },
            {
              id: 'cet4-2025-12-s2-ls-5',
              label: 'Conversation 2',
              questionNo: 12,
              seconds: 110,
              text: 'Woman: If you have time right now, I think we need to sit down and discuss what exactly we are going to do for Jake\'s education next year. I\'ve been thinking it over, and I\'d like to send him to Westwood Elementary. Man: You mean that boarding school? I thought we agreed that we would not be sending him away at such a young age. I admit that their academic record is very strong with many outstanding awards for achievements in Science and Math, but he is just not mature enough to live on his own at this point. What about enrolling him in Lakeview School? Woman: They do have a great outdoor campus where he could finally learn all those outdoor sports you have been wanting him to try. With so much greenery and fresh air, I think his current breathing problems would probably disappear. They did just open, though, so I don\'t think I feel comfortable having our son in the first class of a brand-new school. Man: Yeah, the classrooms would probably smell like paint, making the air in the school all stuffy. What about our local school then? They have a wonderful arts program that would really challenge Jake in terms of creativity and imagination. Being practically next door, one of us could take him to school every day before going to work. Woman: I don\'t know. They have a reputation of being overly strict with the students, not to mention the overwhelming amount of homework they assign, which would lead to a lot of pressure for Jake and me. What if we send him to the place near your mother\'s house?',
            },
            {
              id: 'cet4-2025-12-s2-ls-6',
              label: 'Passage 1',
              questionNo: 16,
              seconds: 94,
              text: 'Analytical decision-making is a decision-making approach where a manager makes important business decisions only with solid data. This style contrasts with more instinctive leadership styles where managers make many decisions using instinct or opinion. While analytical decision-makers benefit from a deliberate, thoughtful approach, this style also has some shortcomings. A key flaw with analytical decision-making is that it takes time. While this approach is beneficial when you have the time and the decision is important, it is problematic when time is crucial. Analytical decision-makers struggle with deadlines and a sense of urgency with decisions. In situations where you need more timely action, decisions based on some information and instinct may work better. The desire to be right is a major driver of analytical decision-making. Leaders who use this style don\'t want to make mistakes. This commitment, one right way of thinking or doing things, hinders the manager\'s flexibility. Inflexibility causes you to ignore or avoid listening to the thoughts and ideas of others. You only want to utilize hard data or facts. Despite its restrictions, analytical decision-making does have several key strengths. By relying on facts and data, you minimize your potential for a wrong decision. You also get away from the habit of making guesses or following instincts. Database technology enables business leaders to look to hard evidence in analyzing target markets and promotional strategies, rather than making assumptions or guesses on what works.',
            },
            {
              id: 'cet4-2025-12-s2-ls-7',
              label: 'Passage 2',
              questionNo: 19,
              seconds: 90,
              text: 'What is the secret to living past 100? Playing the piano is among the things the world\'s oldest person believes has contributed to her long life. Branyas Morera is now 115 years and 320 days old. That means she\'s been alive longer than any other living individual. Branyas was born in the United States on April 4th, 1907. But her family moved to Spain, where they were originally from, when she was a young child. She has lived there ever since. The 115-year-old is active on social media, regularly sharing aspects of her life. She also shares some of her secrets to living so long. These include playing the piano from a young age. Unfortunately, she had to give up the practice seven years ago at 108. Her other secrets for living a long life? She led an active lifestyle until her later years, but has never followed a specific diet. "Many people ask me what diet I follow to live so many years," Branyas wrote. "I have always eaten little, but everything, and I have never followed any plan." But she does eat yogurt every day, which she said has "an infinite number of positive properties" for the body. She has also said that the secret to a long life is "knowing how to choose" what to forget. "Life would be impossible if we remembered everything," she said.',
            },
            {
              id: 'cet4-2025-12-s2-ls-8',
              label: 'Passage 3',
              questionNo: 22,
              seconds: 96,
              text: 'It\'s the first day of school, and your teacher tells you to find a seat in the classroom. Where do you sit? Does it matter? Yes. It does matter where you sit in your classroom, so choose and choose carefully. Studies report that where you sit in the classroom can impact your ability to learn and the way your teacher perceives you. Guess what else? Your grade. Then what is the best seat in the classroom? In one study, students who sat in the front and center of the classroom received a higher grade average and scored higher on tests than those sitting towards the back of the classroom. Get this. Students sitting in the middle of the classroom also outscored students sitting behind them. This study gathered that students had a clearer vision of the blackboard and were able to focus more attention on the instructor. By sitting front and center, students were able to hear better too. The instructors said that they also formed a better connection with the students who sat in front. Perhaps the connection is made because of eye contact and visibility and more interaction. But when you sit in the front row, you may be called on more by your teacher, mainly due to the fact that you are easier to see. So for students who are not prepared and for those who are extremely shy, the attention could cause some unwanted stress.',
            },
          ],
        },
        questions: [
          {
            id: 'cet4-2025-12-s2-l1',
            number: 1,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-1',
            stem: 'What do we learn from the news report about the egg price in the U.S.?',
            options: [
              {
                key: 'A',
                text: 'It has gone up sharply.',
              },
              {
                key: 'B',
                text: 'It has been fluctuating.',
              },
              {
                key: 'C',
                text: 'It has risen because of bird flu.',
              },
              {
                key: 'D',
                text: 'It has been consumers\' concern.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“The U.S. average price for a dozen large eggs last month hit $4.25. That\'s more than double their $1.78 price in December, 2023.”。上个月美国一打大号鸡蛋的平均价格达到了 4.25 美元，这比 2023 年 12 月的 1.78 美元还高出一倍多。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-1',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l2',
            number: 2,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-1',
            stem: 'What does the news report say about most people arriving at American borders with eggs?',
            options: [
              {
                key: 'A',
                text: 'They don\'t want to abandon their eggs.',
              },
              {
                key: 'B',
                text: 'They don\'t know they will be heavily fined.',
              },
              {
                key: 'C',
                text: 'They don\'t know they are forbidden to bring eggs.',
              },
              {
                key: 'D',
                text: 'They don\'t declare their eggs during the inspection.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“Officials said most people arriving at international borders with eggs are truthful about their purchases. They simply don\'t know bringing eggs is…”。官员说，多数带着鸡蛋到达国际边境的人对自己买的东西是如实交代的。他们只是不知道带鸡蛋是不被允许的。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-1',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l3',
            number: 3,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-2',
            stem: 'What do we learn from the news report about the restaurant Nettie\'s House?',
            options: [
              {
                key: 'A',
                text: 'It is no longer critical of younger customers.',
              },
              {
                key: 'B',
                text: 'It has banned kids under 10 from dining there.',
              },
              {
                key: 'C',
                text: 'It is no longer as noisy and crowded as before.',
              },
              {
                key: 'D',
                text: 'It has implemented a decision to expand business.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“Nettie\'s House, a restaurant in America, has been hit with criticism after announcing on the website that children under the age of 10 are no longer…”。美国一家名叫 Nettie\'s House 的餐厅在网站上宣布不再欢迎 10 岁以下儿童后，遭到了批评。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-2',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l4',
            number: 4,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-2',
            stem: 'What do supporters say in response to the restaurant\'s new policy?',
            options: [
              {
                key: 'A',
                text: 'It is fully aware of frequent customers\' feelings.',
              },
              {
                key: 'B',
                text: 'It caters to the tastes of different customers.',
              },
              {
                key: 'C',
                text: 'It is entitled to adopt any rules it wants.',
              },
              {
                key: 'D',
                text: 'It should announce its decisions online.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“There are others, however, who showed support for the restaurant\'s decision. They said it has the right to implement any rules it wants.”。不过也有另一些人对餐厅的决定表示支持。他们说餐厅有权实施它想要的任何规定。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-2',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l5',
            number: 5,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-3',
            stem: 'What does the report say security officers were searching for?',
            options: [
              {
                key: 'A',
                text: 'A missing pet.',
              },
              {
                key: 'B',
                text: 'A grown-up snake.',
              },
              {
                key: 'C',
                text: 'A huge animal skin.',
              },
              {
                key: 'D',
                text: 'A snake specialist.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“Security officers were searching a suburb in Australia where an adult snake was believed to be wandering after the discovery of a huge, "freshly…”。安保人员正在搜查澳大利亚的一处郊区，据信有一条成年蛇在那里游荡，此前那里发现了一张巨大的、刚蜕下的蛇皮。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l6',
            number: 6,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-3',
            stem: 'Where does the report say the discovery was made?',
            options: [
              {
                key: 'A',
                text: 'In a government office.',
              },
              {
                key: 'B',
                text: 'In a deserted house.',
              },
              {
                key: 'C',
                text: 'At a local zoo.',
              },
              {
                key: 'D',
                text: 'At a construction site.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“The skin was found at a construction site, and the government wrote to residents to warn them.”。那张蛇皮是在一处建筑工地发现的，政府随后致信居民提醒他们。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l7',
            number: 7,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-3',
            stem: 'What did the government say would be done if security officers found what they were searching for?',
            options: [
              {
                key: 'A',
                text: 'Figuring out where it came from.',
              },
              {
                key: 'B',
                text: 'Curing it of any possible diseases.',
              },
              {
                key: 'C',
                text: 'Protecting its babies against harm.',
              },
              {
                key: 'D',
                text: 'Determining how to catch it safely.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“If caught, the snake would be examined to determine where it came from, how long it had been in the area, what it had been eating, whether it was…”。一旦抓获，这条蛇将接受检查，以确定它从哪里来、在该区域待了多久、一直在吃什么、是否携带值得关注的疾病，以及是否已经产下幼蛇。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l8',
            number: 8,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-4',
            stem: 'Why does the woman say she swears it?',
            options: [
              {
                key: 'A',
                text: 'The man doesn\'t agree Hannah is poor.',
              },
              {
                key: 'B',
                text: 'The man doesn\'t believe what she says.',
              },
              {
                key: 'C',
                text: 'The man doesn\'t think she can be a millionaire.',
              },
              {
                key: 'D',
                text: 'The man doesn\'t consider her to be trustworthy.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“M: I can\'t believe it. You\'re really not joking, are you?”。男：我真不敢相信。你真的不是在开玩笑吧？故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l9',
            number: 9,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-4',
            stem: 'What do we learn about Hannah from the conversation?',
            options: [
              {
                key: 'A',
                text: 'She no longer has any money left.',
              },
              {
                key: 'B',
                text: 'She has been betrayed by her family.',
              },
              {
                key: 'C',
                text: 'She can no longer hold on to her job.',
              },
              {
                key: 'D',
                text: 'She has been robbed of 5 million Euros.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“W: Well, it turns out that she\'s spent it all already.”。女：嗯，原来她已经把钱全花光了。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l10',
            number: 10,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-4',
            stem: 'What does the man think really matters to people?',
            options: [
              {
                key: 'A',
                text: 'Fortune.',
              },
              {
                key: 'B',
                text: 'Family.',
              },
              {
                key: 'C',
                text: 'Harmony.',
              },
              {
                key: 'D',
                text: 'Happiness.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“M: Wow. Are they all happy? Because that\'s what matters, isn\'t it?”。男：哇，他们都开心吗？因为那才是最要紧的，不是吗？故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l11',
            number: 11,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-4',
            stem: 'What does Hannah\'s husband say he\'ll do if she sells the new car?',
            options: [
              {
                key: 'A',
                text: 'Divorce her.',
              },
              {
                key: 'B',
                text: 'Leave home.',
              },
              {
                key: 'C',
                text: 'Buy her a more expensive model.',
              },
              {
                key: 'D',
                text: 'Let the best thing happen to them.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“W: She wants to, but her husband refuses to get rid of it. He says the car is the best thing that has ever happened to him, and if she sells it, he…”。女：她想卖，但她丈夫拒绝处理掉它。他说这辆车是他这辈子遇到的最好的东西，如果她卖了，他就跟她离婚。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l12',
            number: 12,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-5',
            stem: 'What does the man say about Jake?',
            options: [
              {
                key: 'A',
                text: 'He is not outstanding in Science and Math.',
              },
              {
                key: 'B',
                text: 'He does not have a strong academic record.',
              },
              {
                key: 'C',
                text: 'He is not yet mature enough to live on his own.',
              },
              {
                key: 'D',
                text: 'He does not like Westwood Elementary School.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“I admit that their academic record is very strong with many outstanding awards for achievements in Science and Math, but he is just not mature enough…”。我承认他们的学术成绩很强，在科学和数学方面拿过很多杰出的奖项，但他现在还不够成熟，没法独立生活。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l13',
            number: 13,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-5',
            stem: 'Why does the woman feel uncomfortable about sending Jake to Lakeview School?',
            options: [
              {
                key: 'A',
                text: 'It is too far away.',
              },
              {
                key: 'B',
                text: 'It is newly opened.',
              },
              {
                key: 'C',
                text: 'It lacks outdoor sports facilities.',
              },
              {
                key: 'D',
                text: 'It has too few first-class teachers.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“They did just open, though, so I don\'t think I feel comfortable having our son in the first class of a brand-new school.”。不过他们才刚开学，所以我不太放心让我们的儿子去一所全新学校的第一届。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l14',
            number: 14,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-5',
            stem: 'What does the man say about their local school?',
            options: [
              {
                key: 'A',
                text: 'It has a beautiful campus.',
              },
              {
                key: 'B',
                text: 'It is within walking distance.',
              },
              {
                key: 'C',
                text: 'It has a wonderful arts program.',
              },
              {
                key: 'D',
                text: 'It is helpful to Jake\'s breathing problems.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“What about our local school then? They have a wonderful arts program that would really challenge Jake in terms of creativity and imagination.”。那我们本地的学校呢？他们有一个很棒的艺术项目，能在创造力和想象力方面真正挑战 Jake。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l15',
            number: 15,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-5',
            stem: 'What does the woman suggest at the end of the conversation?',
            options: [
              {
                key: 'A',
                text: 'Asking Jake which school he himself prefers to enroll in.',
              },
              {
                key: 'B',
                text: 'Thinking twice about what is best for Jake\'s education next year.',
              },
              {
                key: 'C',
                text: 'Consulting her mother about which school Jake is to attend.',
              },
              {
                key: 'D',
                text: 'Sending Jake to the school near the home of the man\'s mother.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“What if we send him to the place near your mother\'s house?”。要不我们把他送到你妈妈家附近的那所学校怎么样？故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-l16',
            number: 16,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-6',
            stem: 'What does the passage say is a major flaw of analytical decision-making?',
            options: [
              {
                key: 'A',
                text: 'It is time consuming.',
              },
              {
                key: 'B',
                text: 'It is unfit for crucial issues.',
              },
              {
                key: 'C',
                text: 'It relies too much on solid data.',
              },
              {
                key: 'D',
                text: 'It dulls a leader\'s sense of urgency.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“A key flaw with analytical decision-making is that it takes time.”。分析型决策的一个关键缺陷是它很费时间。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l17',
            number: 17,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-6',
            stem: 'What does a leader tend to do when they are committed to analytical decision-making?',
            options: [
              {
                key: 'A',
                text: 'Depend on digital technology.',
              },
              {
                key: 'B',
                text: 'Make assumptions and guesses.',
              },
              {
                key: 'C',
                text: 'Ignore others\' thoughts and ideas.',
              },
              {
                key: 'D',
                text: 'Lay emphasis on thinking flexibly.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“Inflexibility causes you to ignore or avoid listening to the thoughts and ideas of others.”。这种僵化会使你忽视或回避去倾听他人的想法和主意。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l18',
            number: 18,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-6',
            stem: 'What is a key strength of analytical decision-making?',
            options: [
              {
                key: 'A',
                text: 'Maximizing the advantage of available resources.',
              },
              {
                key: 'B',
                text: 'Minimizing the possibility of a wrong decision.',
              },
              {
                key: 'C',
                text: 'Discovering new potential markets.',
              },
              {
                key: 'D',
                text: 'Perfecting promotional strategies.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“By relying on facts and data, you minimize your potential for a wrong decision.”。通过依靠事实和数据，你把做出错误决策的可能性降到最低。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l19',
            number: 19,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-7',
            stem: 'What do we learn about Branyas Morera?',
            options: [
              {
                key: 'A',
                text: 'She is one of the world\'s best-known pianists.',
              },
              {
                key: 'B',
                text: 'She celebrated her 110th birthday this April.',
              },
              {
                key: 'C',
                text: 'She moved to the U.S. at a young age.',
              },
              {
                key: 'D',
                text: 'She is the world\'s oldest individual.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“Branyas Morera is now 115 years and 320 days old. That means she\'s been alive longer than any other living individual.”。布兰亚斯·莫雷拉现在 115 岁零 320 天。这意味着她比任何其他在世的人都活得更久。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l20',
            number: 20,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-7',
            stem: 'What is one of Branyas Morera\'s secrets to living a long life?',
            options: [
              {
                key: 'A',
                text: 'Being always active on social media.',
              },
              {
                key: 'B',
                text: 'Doing regular and vigorous exercise.',
              },
              {
                key: 'C',
                text: 'Playing the piano from a young age.',
              },
              {
                key: 'D',
                text: 'Following a specific diet every day.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“She also shares some of her secrets to living so long. These include playing the piano from a young age.”。她还分享了一些自己长寿的秘诀。这些秘诀包括从小弹钢琴。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l21',
            number: 21,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-7',
            stem: 'What does Branyas Morera think also contributes to a long life?',
            options: [
              {
                key: 'A',
                text: 'Eating as little as one can possibly manage.',
              },
              {
                key: 'B',
                text: 'Having the ability to forget things selectively.',
              },
              {
                key: 'C',
                text: 'Figuring out the positive properties of each food item.',
              },
              {
                key: 'D',
                text: 'Knowing how to remember major events in one\'s life.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“She has also said that the secret to a long life is "knowing how to choose" what to forget.”。她还说过，长寿的秘诀是“懂得选择”要忘掉什么。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l22',
            number: 22,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-8',
            stem: 'What is of great importance to students according to the speaker?',
            options: [
              {
                key: 'A',
                text: 'The ability to learn.',
              },
              {
                key: 'B',
                text: 'The first day of school.',
              },
              {
                key: 'C',
                text: 'How teachers perceive them.',
              },
              {
                key: 'D',
                text: 'Where they sit in the classroom.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“It does matter where you sit in your classroom, so choose and choose carefully. Studies report that where you sit in the classroom can impact your…”。你坐在教室的哪个位置，确实有影响，所以要慎重选座。研究表明，你在教室里的座位会影响你的学习能力以及老师对你的看法。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l23',
            number: 23,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-8',
            stem: 'What did one study find about students seated in the middle of the classroom?',
            options: [
              {
                key: 'A',
                text: 'They often received close attention from the instructors.',
              },
              {
                key: 'B',
                text: 'They obtained the highest grade average in their class.',
              },
              {
                key: 'C',
                text: 'They actually wanted a clear vision of the blackboard.',
              },
              {
                key: 'D',
                text: 'They scored higher than students sitting behind them.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“Get this. Students sitting in the middle of the classroom also outscored students sitting behind them.”。注意了：坐在教室中间的学生，成绩也超过了坐在他们后面的学生。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l24',
            number: 24,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-8',
            stem: 'What can eye contact, visibility and more interaction probably bring about?',
            options: [
              {
                key: 'A',
                text: 'A higher grade average among all students of a class.',
              },
              {
                key: 'B',
                text: 'A better connection between instructors and students.',
              },
              {
                key: 'C',
                text: 'A stronger support for a student-centered teaching approach.',
              },
              {
                key: 'D',
                text: 'A more favorable atmosphere for effective classroom learning.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“The instructors said that they also formed a better connection with the students who sat in front. Perhaps the connection is made because of eye…”。老师们说，他们和坐在前排的学生还建立了更好的联系。也许这种联系正是因为眼神交流、容易被看到以及更多的互动而形成的。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-l25',
            number: 25,
            type: 'single',
            groupId: 'cet4-2025-12-s2-ls-8',
            stem: 'What do we learn about extremely shy students sitting in the front row of the classroom?',
            options: [
              {
                key: 'A',
                text: 'They may experience some unwanted stress.',
              },
              {
                key: 'B',
                text: 'They may try hard to show their preparedness.',
              },
              {
                key: 'C',
                text: 'They may receive extra attention from the instructor.',
              },
              {
                key: 'D',
                text: 'They may feel helpless when called on by the instructor.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“So for students who are not prepared and for those who are extremely shy, the attention could cause some unwanted stress.”。所以，对于那些没准备好的学生以及那些极为害羞的学生来说，这种关注可能会带来一些不想要的压力。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s2-ls-8',
            },
            score: 2,
          },
        ],
      },
      {
        id: 'cloze',
        kind: 'cloze',
        title: 'Part III Section A Banked Cloze',
        instructions: 'Directions: In this section, there is a passage with ten blanks. You are required to select one word for each blank from a list of choices given in a word bank following the passage. Read the passage through carefully before making your choices. Each choice in the bank is identified by a letter. Please mark the corresponding letter for each item on Answer Sheet 2 with a single line through the centre. You may not use any of the words in the bank more than once.',
        minutes: 15,
        bank: {
          A: 'actually',
          B: 'consequently',
          C: 'contributing',
          D: 'fair',
          E: 'feels',
          F: 'manageable',
          G: 'mends',
          H: 'observed',
          I: 'phase',
          J: 'plotting',
          K: 'quality',
          L: 'recently',
          M: 'taxing',
          N: 'tends',
          O: 'yielded',
        },
        passages: [
          {
            id: 'c1',
            title: '选词填空短文',
            paragraphs: [
              {
                id: 'c1-1',
                text: 'Some music inspires you to move your feet, some inspires you to get out there and change the world. In any case, it\'s __(26)__ to say that music moves people in special ways.',
              },
              {
                id: 'c1-2',
                text: 'If you\'re especially into a piece of music, your brain does something called Autonomous Sensory Meridian Response (ASMR), which __(27)__ to you like a sting in your brain.',
              },
              {
                id: 'c1-3',
                text: 'It turns out that ASMR is pretty special. According to a __(28)__ published study in The Journal of Prevention of Alzheimer\'s Disease, the part of your brain responsible for ASMR doesn\'t get lost to Alzheimer\'s. Alzheimer\'s __(29)__ to put people into layers of confusion, and the study confirms that music can sometimes __(30)__ lift people out of the Alzheimer\'s haze and bring them back to (at least a likeness of) normality … if only for a short while. ASMR is powerful stuff!',
              },
              {
                id: 'c1-4',
                text: 'This phenomenon has been __(31)__ several times but rarely studied properly. One of the most famous examples of this is the story of 92-year-old Henry Dryer, who comes out of dementia(痴呆) while listening to songs from his youth.',
              },
              {
                id: 'c1-5',
                text: 'Jeff Anderson, associate professor in Radiology at the University of Utah and __(32)__ author on the study, says "In our society, the diagnoses of dementia are __(33)__ resources to the maximum. No one says playing music will be a cure for Alzheimer\'s disease, but it might make the symptoms more __(34)__ , decrease the cost of care and improve a patient\'s __(35)__ of life."',
              },
            ],
          },
        ],
        questions: [
          {
            id: 'cet4-2025-12-s2-c26',
            number: 26,
            type: 'bank',
            stem: 'In any case, it\'s __(26)__ to say that music moves people in special ways.',
            answer: 'D',
            explanation: 'D fair（形容词）。词性：it\'s ___ to say that …，形式主语 it 后系动词 + 表语。依据：It\'s fair to say 是英语高频习语「可以这样说、说……不为过」。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c27',
            number: 27,
            type: 'bank',
            stem: 'If you\'re especially into a piece of music, your brain does something called Autonomous Sensory Meridian Response (ASMR), which __(27)__ to you like a sting in your brain.',
            answer: 'E',
            explanation: 'E feels（动词）。词性：your brain does … which ___ to you like a sting，which 引导的定语从句缺谓语。依据：feel like 是固定搭配「感觉像」。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c28',
            number: 28,
            type: 'bank',
            stem: 'According to a __(28)__ published study in The Journal of Prevention of Alzheimer\'s Disease, the part of your brain responsible for ASMR doesn\'t get lost to Alzheimer\'s.',
            answer: 'L',
            explanation: 'L recently（副词）。词性：a ___ published study，冠词与过去分词之间填副词修饰 published。依据：recently published「最近发表」是学术文献标配搭配。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c29',
            number: 29,
            type: 'bank',
            stem: 'Alzheimer\'s __(29)__ to put people into layers of confusion, and the study confirms that music can sometimes __(30)__ lift people out of the Alzheimer\'s haze and bring them back to (at least a likeness of) normality … if only for a short while.',
            answer: 'N',
            explanation: 'N tends（动词）。词性：Alzheimer\'s ___ to put people …，主语后缺谓语，第三人称单数。依据：tends to do 表「倾向于、往往」，契合阿尔茨海默症常见症状。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c30',
            number: 30,
            type: 'bank',
            stem: 'Alzheimer\'s __(29)__ to put people into layers of confusion, and the study confirms that music can sometimes __(30)__ lift people out of the Alzheimer\'s haze and bring them back to (at least a likeness of) normality … if only for a short while.',
            answer: 'A',
            explanation: 'A actually（副词）。词性：music can sometimes ___ lift people out of …，情态动词 + 副词 + 实义动词。依据：actually 强调「真的、的确」，呼应前文研究证实。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c31',
            number: 31,
            type: 'bank',
            stem: 'This phenomenon has been __(31)__ several times but rarely studied properly.',
            answer: 'H',
            explanation: 'H observed（动词）。词性：This phenomenon has been ___ several times，被动语态，has been + 过去分词。依据：observed「被观察到」与并列的 studied 同属研究动作。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c32',
            number: 32,
            type: 'bank',
            stem: 'Jeff Anderson, associate professor in Radiology at the University of Utah and __(32)__ author on the study, says "In our society, the diagnoses of dementia are __(33)__ resources to the maximum.',
            answer: 'C',
            explanation: 'C contributing（形容词）。词性：___ author on the study，冠词位 + 名词 author 前作定语。依据：contributing author 是学术文献固定身份「参与撰写的作者」。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c33',
            number: 33,
            type: 'bank',
            stem: 'Jeff Anderson, associate professor in Radiology at the University of Utah and __(32)__ author on the study, says "In our society, the diagnoses of dementia are __(33)__ resources to the maximum.',
            answer: 'M',
            explanation: 'M taxing（动词）。词性：the diagnoses of dementia are ___ resources，be 动词后缺谓语成分，与后面 resources 形成动宾。依据：tax resources「使资源吃紧」是固定搭配，与 to the maximum 呼应。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c34',
            number: 34,
            type: 'bank',
            stem: 'No one says playing music will be a cure for Alzheimer\'s disease, but it might make the symptoms more __(34)__ , decrease the cost of care and improve a patient\'s __(35)__ of life."',
            answer: 'F',
            explanation: 'F manageable（形容词）。词性：make the symptoms more ___，make + 宾语 + 形容词比较级，空填形容词。依据：make symptoms more manageable「让症状更可控」医学语境标配。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s2-c35',
            number: 35,
            type: 'bank',
            stem: 'No one says playing music will be a cure for Alzheimer\'s disease, but it might make the symptoms more __(34)__ , decrease the cost of care and improve a patient\'s __(35)__ of life."',
            answer: 'K',
            explanation: 'K quality（名词）。词性：improve a patient\'s ___ of life，所有格+of 锁定名词。依据：quality of life 是英语固定搭配。',
            score: 0.5,
          },
        ],
      },
      {
        id: 'reading',
        kind: 'reading',
        title: 'Part III Section B/C Reading Comprehension',
        instructions: 'Directions: In this section, you are going to read a passage with ten statements attached to it. Each statement contains information given in one of the paragraphs. Identify the paragraph from which the information is derived. You may choose a paragraph more than once. Each paragraph is marked with a letter. Answer the questions by marking the corresponding letter on Answer Sheet 2. Directions: There are 2 passages in this section. Each passage is followed by some questions or unfinished statements. For each of them there are four choices marked A), B), C) and D). You should decide on the best choice and mark the corresponding letter on Answer Sheet 2 with a single line through the centre.',
        minutes: 25,
        passages: [
          {
            id: 'p0',
            title: 'Can playing video games help you get a better job?',
            paragraphs: [
              {
                id: 'p0-1',
                marker: 'A',
                text: ' The gaming industry is larger than films and music combined, yet few of us are likely to list our achievements in playing computer games as work experience in our résumé. But why not? Businesses are waking up to the skills gamers can bring to the workplace.',
              },
              {
                id: 'p0-2',
                marker: 'B',
                text: ' One start-up is convinced that the skills learned by playing games — hard-won through years of training and battle — can be applied to real-life work situations. And Game Academy reckons its belief is backed up by hard data. Do you enjoy unusual puzzle games like Portal, or tower defence games like Defense Grid? The team has found that IT workers play those more than average. But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key, then you might have more in common with managers.',
              },
              {
                id: 'p0-3',
                marker: 'C',
                text: ' Game Academy\'s idea is simple: analyse gamers\' habits from their online gaming profile, and offer courses in valuable skills that reflect their aptitudes — skills they can practise and refine in-game. And there is already a growing acceptance that gaming skills are transferable.',
              },
              {
                id: 'p0-4',
                marker: 'D',
                text: ' Even the military is hiring gamers. "The ability to absorb information, react swiftly and coordinate actions whilst remaining calm under pressure are often attributes of people that are good at gaming," according to a Royal Air Force spokesperson. Those skills are part of what the Royal Air Force is looking for "in a variety of roles". "Skills acquired through gaming can be very relevant to certain areas."',
              },
              {
                id: 'p0-5',
                marker: 'E',
                text: ' "There are plenty of soft skills that gamers can utilise in a professional setting, such as teamwork, problem solving and strategic planning," says Ryan Gardner, a regional director with Hays recruitment. But does that really mean your top 100 ranking in Overwatch should go down in your résumé? "It\'s about how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee," Mr Gardner says.',
              },
              {
                id: 'p0-6',
                marker: 'F',
                text: ' Two years ago, a Glasgow University study made headlines for suggesting gaming could make students more successful. But "the research hasn\'t really changed minds, at least not yet," says one of the authors of the study, Dr Matthew Barr. He\'s now writing a book on the topic. "For now, I think the negative reputation around games means that telling someone you\'re a determined gamer is more likely to harm your chances of getting a job. But if someone can explain how they\'ve led a team in an online game, for example, they may be able to persuade an employer that this is useful," says Dr Barr.',
              },
              {
                id: 'p0-7',
                marker: 'G',
                text: ' Playing games casually is unlikely to help your career prospects. But part of Game Academy\'s suggestion is to transform casual gamers into "conscious" ones, applying critical thinking to developing their skills. "We see gameplay as a resource of talent," says co-founder David Barrie. "Why can\'t we put in our résumé our gaming victories and achievements?" he asks. "If they say they want leadership — why can\'t I point to my years of leading World of Warcraft raids?"',
              },
              {
                id: 'p0-8',
                marker: 'H',
                text: ' There are already plenty of gamers out there who know that their hobby has made them who they are. Earlier this year, Matthew Ricci told gaming site Kotaku: "If you\'re playing EVE Online you basically already have an MBA." Often made fun of in gaming circles as a "spreadsheet simulator(电子表格模拟)", the economy of the fictional EVE universe is driven by real market principles. If you want to build a new spaceship, the raw material has to be mined by another player. Manufacturing costs come into effect, and commodities fluctuate in price based on demand and the distance to haul the commodity.',
              },
              {
                id: 'p0-9',
                marker: 'I',
                text: ' Mr Ricci, who had always dreamed of being the boss of his own company, ran an in-game corporation comprising hundreds of players. Eventually, he realised he could transfer his skills to real-life business — instead of doing it for free. He restructured Zentech, once a taxation vehicle for his father\'s business, and it is now in its fourth year helping international brands enter the Canadian market. EVE teaches skills like creativity, leadership, organisation, and conflict resolution, he maintains. He credits his success to his family, his strong desire to run his own business — and "a damn good company in Iceland that made a damn good game".',
              },
              {
                id: 'p0-10',
                marker: 'J',
                text: ' Digital entrepreneur and business consultant Mia Bennett says: "In more traditional settings, gaming is still imagined to be the pursuit of teenage boys — a waste of time." But there are some links to skills like "decision-making, the ability to anticipate and future planning," she says. "It also helps with meta-skills — learning how to learn, experimentation, and creative thinking."',
              },
              {
                id: 'p0-11',
                marker: 'K',
                text: ' Twelve years into his career, Mark Long, a radiotherapy physicist with the NHS in Surrey, doesn\'t get as much gaming time as he used to. "I would love to say that my gaming skills allow me to destroy cancer using linear accelerators like photon(光子) blasters, but that\'s not quite the reality." Instead, he credits old-school games like Palace of Magic with exposing him to computers. Every new gaming upgrade improved his knowledge of how they worked. Gaming also encouraged a competitive spirit — and that, he believes, translates. "When creating treatment plans, the aim is to optimise the radiation dose to the tumour and restrict it as much as possible to healthy surrounding tissues and organs," he says. It\'s about "repeating the process, but each time doing something slightly different to improve the result". Not unlike achieving a high score or a perfect run. "Most videogames are essentially puzzles to solve," he says. "And problem-solving is a big part of my job."',
              },
              {
                id: 'p0-12',
                marker: 'L',
                text: ' "Over at Game Academy, Mr Barrie is aware they still have a mountain to climb. The employer community will need the science," he says, but confesses he only became a true believer when he started asking players about their biggest in-game achievements. "The scale and scope of their answers were amazing," he says. "But ask them the same about their work, and they don\'t know." "The engagement and powerful skills that people get playing a game — why can\'t work be like that?" he asks.',
              },
            ],
          },
          {
            id: 'p1',
            title: 'Passage One',
            paragraphs: [
              {
                id: 'p1-1',
                marker: 'A',
                text: 'Junk food is now a staple of many Americans\' diets. Advertising campaigns from the snack food companies, often featuring sports stars, send the message that we can neutralize any negative effects of consuming their products simply by getting more physical exercise. But recent studies show a lack of exercise is not to blame for rising obesity rates. Bad diets are.',
              },
              {
                id: 'p1-2',
                marker: 'B',
                text: 'Interventions(干预) to help reduce junk food consumption are especially important for children and teenagers. Prevention is better than cure because obesity is so difficult to treat. Unfortunately, while health education has shown some success among young children, teens have been harder to reach.',
              },
              {
                id: 'p1-3',
                marker: 'C',
                text: 'Now a large-scale study has tried an innovative approach to change teenagers\' attitudes towards healthy eating, and the results are promising. The researchers argued that previous interventions have probably been unsuccessful because of a major flaw: they focused on a future, healthier you and assumed that this would be enough motivation for teenagers. In contrast, the new intervention cleverly exploits teenagers\' instinct for rebelliousness and autonomy, and the value they place on social justice.',
              },
              {
                id: 'p1-4',
                marker: 'D',
                text: 'To do this, researchers had students read an article on the food industry. It revealed a secret about the manipulative and deceptive strategies used to make junk food more addictive and characterize the products as healthy. The article also explained how advertising campaigns specifically target very young and poor people, causing harm for these vulnerable groups. Afterwards, the participants read a fictional survey of teens who wanted to "fight back against the companies by buying and eating less processed food"',
              },
              {
                id: 'p1-5',
                marker: 'E',
                text: 'After the intervention, participants associated healthy eating with autonomy and social justice. The teenagers also rated healthy eating as being more appealing. Importantly, there were also some promising effects of the new intervention on actual behavior. A day later the students were offered a choice of snacks and drinks in a seemingly unrelated context. The teens chose healthy snacks and drinks (such as fruit or water) more often over unhealthy options (like biscuits and soda). Apparently associating a healthy diet with teenagers\' own values seems to be a promising avenue to prevent obesity.',
              },
            ],
          },
          {
            id: 'p2',
            title: 'Passage Two',
            paragraphs: [
              {
                id: 'p2-1',
                marker: 'A',
                text: 'Adults dream during REM (rapid eye movement) sleep and infants have loads of REM. So, it might be fair to assume that babies have tons of dreams.',
              },
              {
                id: 'p2-2',
                marker: 'B',
                text: 'But scientists believe REM serves a completely different purpose for newborns and infants than dreaming. When babies are in REM, it allows their brain to develop pathways, connections, and eventually, learn languages.',
              },
              {
                id: 'p2-3',
                marker: 'C',
                text: 'Since your baby doesn\'t dream at this stage of brain development, it\'s safe to assume babies do not have nightmares, either. Nightmares stem from exposure to trauma(创伤), an overactive imagination, and the normal stresses of everyday life.',
              },
              {
                id: 'p2-4',
                marker: 'D',
                text: 'Are you wondering, what do babies dream about? Good question, but the answer is nothing! So, when do babies start dreaming? The general consensus is that they start dreaming around the age of two. Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day. In his lab, he lets kids fall asleep and then wakes them 3 times a night and asks them to describe what they recall.',
              },
              {
                id: 'p2-5',
                marker: 'E',
                text: 'Foulkes\' findings are unsurprising. Basically, little kids have little dreams. But exactly what kids see while dreaming depends on their age. As children develop and grow, their dreams do too.',
              },
              {
                id: 'p2-6',
                marker: 'F',
                text: 'Dreams of very small kids are usually just snapshots(快照), looking much more like a slideshow than a movie, when compared to the dreams of adults. They heavily feature animals and other familiar sights, like images of people eating. According to Foulkes, "Children\'s dream life…seems to be similar to their waking imagination and narration." Kids ages 5 – 9 begin seeing moving images and characters in action. Dreams now include multiple events strung together, one after the other. They also start developing greater ability to remember dreams. Still, that\'s not always the case: When roused during REM sleep, 25% of the kids in Foulkes\' studies had no recollection of dreaming, a trend that continues through age 9.',
              },
              {
                id: 'p2-7',
                marker: 'G',
                text: 'So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.',
              },
            ],
          },
        ],
        questions: [
          {
            id: 'cet4-2025-12-s2-m36',
            number: 36,
            type: 'single',
            stem: 'Certain gaming skills meet the requirements of the armed forces in Britain.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'D',
            explanation: '锚点「英国武装部队」。定位原文：“Even the military is hiring gamers. "The ability to absorb information, react swiftly and coordinate actions whilst remaining calm under pressure are…”。连军方都在招玩家。皇家空军发言人说：吸收信息、快速反应、在压力下保持冷静同时协调行动的能力，往往是擅长打游戏的人身上具备的特质。故选 D 段。',
            evidence: {
              paragraphId: 'p0-4',
              quote: 'Even the military is hiring gamers. "The ability to absorb information, react swiftly and coordinate actions whilst remaining calm under pressure are often attributes of people that are good at…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m37',
            number: 37,
            type: 'single',
            stem: 'One veteran player has applied his gaming skills to his real-world business and owes his success partly to a game company.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'I',
            explanation: '锚点「老玩家 + 把成功部分归功于游戏公司」。定位原文：“He credits his success to his family, his strong desire to run his own business — and "a damn good company in Iceland that made a damn good game".”。他把自己的成功归功于家人、强烈的自主创业愿望，以及一家在冰岛做出好游戏的好公司。故选 I 段。',
            evidence: {
              paragraphId: 'p0-9',
              quote: 'He credits his success to his family, his strong desire to run his own business — and "a damn good company in Iceland that made a damn good game".',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m38',
            number: 38,
            type: 'single',
            stem: 'According to a researcher, bad reputation about games will probably limit a gamer\'s chances of landing a job.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'F',
            explanation: '锚点「研究者 + 坏名声会限制求职」。定位原文：“For now, I think the negative reputation around games means that telling someone you\'re a determined gamer is more likely to harm your chances of…”。目前我觉得游戏的负面名声意味着，跟别人说自己是个铁杆玩家更可能损害你找工作的机会。故选 F 段。',
            evidence: {
              paragraphId: 'p0-6',
              quote: 'For now, I think the negative reputation around games means that telling someone you\'re a determined gamer is more likely to harm your chances of getting a job.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m39',
            number: 39,
            type: 'single',
            stem: 'Businesses are beginning to realise gaming skills are applicable to their employees\' work.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'A',
            explanation: '锚点「企业开始意识到游戏技能可用」。定位原文：“Businesses are waking up to the skills gamers can bring to the workplace.”。企业开始意识到玩家能带到职场的那些技能。故选 A 段。',
            evidence: {
              paragraphId: 'p0-1',
              quote: 'Businesses are waking up to the skills gamers can bring to the workplace.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m40',
            number: 40,
            type: 'single',
            stem: 'A physicist admits gaming has contributed to his computer knowledge and skills of solving problems.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'K',
            explanation: '锚点「物理师 + 电脑知识 + 解决问题」。定位原文：“Instead, he credits old-school games like Palace of Magic with exposing him to computers. Every new gaming upgrade improved his knowledge of how they…”。相反，他把自己对计算机的接触归功于 Palace of Magic 这类老牌游戏，每一次硬件升级都加深了他对电脑工作方式的认识。他还说大多数电子游戏本质上都是要解的谜，而解决问题正是他工作中的大头。故选 K 段。',
            evidence: {
              paragraphId: 'p0-11',
              quote: 'Instead, he credits old-school games like Palace of Magic with exposing him to computers. Every new gaming upgrade improved his knowledge of how they worked. ... "Most videogames are essentially…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m41',
            number: 41,
            type: 'single',
            stem: 'Game Academy proposes to help gamers develop their skills using critical thinking.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'G',
            explanation: '锚点「Game Academy + 批判性思维」。定位原文：“But part of Game Academy\'s suggestion is to transform casual gamers into "conscious" ones, applying critical thinking to developing their skills.”。但 Game Academy 的建议中有一部分是把休闲玩家变成有意识的玩家，把批判性思维用到技能培养上去。故选 G 段。',
            evidence: {
              paragraphId: 'p0-7',
              quote: 'But part of Game Academy\'s suggestion is to transform casual gamers into "conscious" ones, applying critical thinking to developing their skills.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m42',
            number: 42,
            type: 'single',
            stem: 'One who enjoys playing games that require management skills to win might possess more qualities of a manager.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'B',
            explanation: '锚点「玩管理类游戏的人具有管理者特质」。定位原文：“But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key, then you might have more in common with managers.”。但如果你更喜欢《文明》《全面战争》《幽浮》这类以策略和资源管理为核心的游戏，那你和管理者的共同点可能就更多了。故选 B 段。',
            evidence: {
              paragraphId: 'p0-2',
              quote: 'But if you prefer Civilization, Total War, or X-Com, where strategy and resource management are key, then you might have more in common with managers.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m43',
            number: 43,
            type: 'single',
            stem: 'In more conventional views, gaming is a time-wasting activity pursued by young boys.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'J',
            explanation: '锚点「传统观念 + 浪费时间 + 男生爱好」。定位原文：“In more traditional settings, gaming is still imagined to be the pursuit of teenage boys — a waste of time.”。在更传统的认知里，玩游戏仍然被想成是青少年男生的爱好——是浪费时间。故选 J 段。',
            evidence: {
              paragraphId: 'p0-10',
              quote: 'In more traditional settings, gaming is still imagined to be the pursuit of teenage boys — a waste of time.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m44',
            number: 44,
            type: 'single',
            stem: 'It is suggested that gaming skills be included in a résumé if they enhance a job applicant\'s appeal.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'E',
            explanation: '锚点「简历该不该写游戏 + 提升候选人吸引力」。定位原文：“"It\'s about how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee," Mr…”。Gardner 先生说：关键就在于你要么让它（游戏战绩）和你申请的岗位挂上钩，要么让它使你作为候选人更有吸引力。故选 E 段。',
            evidence: {
              paragraphId: 'p0-5',
              quote: '"It\'s about how you either make it relevant to the job you are applying for, or how it makes you more interesting as a potential employee," Mr Gardner says.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-m45',
            number: 45,
            type: 'single',
            stem: 'Many gamers know their passion for playing games has shaped their identity.',
            options: [
              {
                key: 'A',
                text: 'The gaming industry is larger than films and music…',
              },
              {
                key: 'B',
                text: 'One start-up is convinced that the skills learned by…',
              },
              {
                key: 'C',
                text: 'Game Academy\'s idea is simple: analyse gamers\' habits from…',
              },
              {
                key: 'D',
                text: 'Even the military is hiring gamers.',
              },
              {
                key: 'E',
                text: '"There are plenty of soft skills that gamers can utilise in…',
              },
              {
                key: 'F',
                text: 'Two years ago, a Glasgow University study made headlines…',
              },
              {
                key: 'G',
                text: 'Playing games casually is unlikely to help your career…',
              },
              {
                key: 'H',
                text: 'There are already plenty of gamers out there who know that…',
              },
              {
                key: 'I',
                text: 'Mr Ricci, who had always dreamed of being the boss of his…',
              },
              {
                key: 'J',
                text: 'Digital entrepreneur and business consultant Mia Bennett…',
              },
              {
                key: 'K',
                text: 'Twelve years into his career, Mark Long, a radiotherapy…',
              },
              {
                key: 'L',
                text: '"Over at Game Academy, Mr Barrie is aware they still have a…',
              },
            ],
            answer: 'H',
            explanation: '锚点「玩家自知游戏塑造了自己」。定位原文：“There are already plenty of gamers out there who know that their hobby has made them who they are.”。已经有不少玩家清楚自己这份爱好塑造了今天的自己。故选 H 段。',
            evidence: {
              paragraphId: 'p0-8',
              quote: 'There are already plenty of gamers out there who know that their hobby has made them who they are.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s2-r46',
            number: 46,
            type: 'single',
            stem: 'What do we learn about advertising campaigns from the snack food companies?',
            options: [
              {
                key: 'A',
                text: 'They convey the idea that their products are ok if consumers exercise more.',
              },
              {
                key: 'B',
                text: 'They send the message that bad diets are responsible for Americans\' obesity.',
              },
              {
                key: 'C',
                text: 'They usually feature sports stars to emphasize the benefits of their snack foods.',
              },
              {
                key: 'D',
                text: 'They claim that lack of exercise is to blame for the increasing obesity rates.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“Advertising campaigns from the snack food companies, often featuring sports stars, send the message that we can neutralize any negative effects of…”。零食公司的广告活动经常以体育明星为主角，传递的信息是：只要多做体育锻炼，就能抵消食用其产品带来的任何负面影响。故选 A。',
            evidence: {
              paragraphId: 'p1-1',
              quote: 'Advertising campaigns from the snack food companies, often featuring sports stars, send the message that we can neutralize any negative effects of consuming their products simply by getting more…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r47',
            number: 47,
            type: 'single',
            stem: 'What does the passage say about health education?',
            options: [
              {
                key: 'A',
                text: 'It has shed light on teens\' instinct for rebellion and autonomy.',
              },
              {
                key: 'B',
                text: 'It has placed much more emphasis on cure than on prevention.',
              },
              {
                key: 'C',
                text: 'It has contributed little to the campaigns against obesity.',
              },
              {
                key: 'D',
                text: 'It has largely failed to turn teens away from junk food.',
              },
            ],
            answer: 'D',
            explanation: '（细节题）定位原文：“Unfortunately, while health education has shown some success among young children, teens have been harder to reach.”。遗憾的是，虽然健康教育在低龄儿童中取得了一定成效，但对青少年的影响一直很难触达。故选 D。',
            evidence: {
              paragraphId: 'p1-2',
              quote: 'Unfortunately, while health education has shown some success among young children, teens have been harder to reach.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r48',
            number: 48,
            type: 'single',
            stem: 'What is a major flaw in previous interventions to help reduce junk food consumption?',
            options: [
              {
                key: 'A',
                text: 'They motivated teens to stay away from junk food only temporarily.',
              },
              {
                key: 'B',
                text: 'They focused on the benefits young people would reap in the future.',
              },
              {
                key: 'C',
                text: 'They were based on the assumption that motivation was the only key.',
              },
              {
                key: 'D',
                text: 'They were incapable of appealing to teens\' instinct for rebelliousness.',
              },
            ],
            answer: 'B',
            explanation: '（细节题）定位原文：“The researchers argued that previous interventions have probably been unsuccessful because of a major flaw: they focused on a future, healthier you…”。研究者认为，以往的干预之所以可能失败，是因为一个重大缺陷：它们把重心放在"未来更健康的你"，并假设这就足以激励青少年。故选 B。',
            evidence: {
              paragraphId: 'p1-3',
              quote: 'The researchers argued that previous interventions have probably been unsuccessful because of a major flaw: they focused on a future, healthier you and assumed that this would be enough motivation…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r49',
            number: 49,
            type: 'single',
            stem: 'In what way is the new intervention innovative?',
            options: [
              {
                key: 'A',
                text: 'It emphasizes people\'s sense of social responsibility.',
              },
              {
                key: 'B',
                text: 'It cleverly exploits teenagers\' personal weaknesses.',
              },
              {
                key: 'C',
                text: 'It takes advantage of teenagers\' natural inclination.',
              },
              {
                key: 'D',
                text: 'It promises immediate rather than future benefits.',
              },
            ],
            answer: 'C',
            explanation: '（细节题）定位原文：“In contrast, the new intervention cleverly exploits teenagers\' instinct for rebelliousness and autonomy, and the value they place on social justice.”。与之相对，新干预巧妙地利用了青少年对叛逆和自主的本能，以及他们对社会公正的重视。故选 C。',
            evidence: {
              paragraphId: 'p1-3',
              quote: 'In contrast, the new intervention cleverly exploits teenagers\' instinct for rebelliousness and autonomy, and the value they place on social justice.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r50',
            number: 50,
            type: 'single',
            stem: 'What conclusion can be drawn from the new research?',
            options: [
              {
                key: 'A',
                text: 'A totally different approach could be adopted to combat advertising campaigns for snack food.',
              },
              {
                key: 'B',
                text: 'An effective intervention has to be found to persuade teenagers to switch to a healthier lifestyle.',
              },
              {
                key: 'C',
                text: 'Obesity can be hopefully prevented by building links between teenagers\' values and healthy eating.',
              },
              {
                key: 'D',
                text: 'An innovative way to beat obesity is to expose food companies\' manipulative and deceptive practices. Passage Two Questions 51 to 55 are based on the following passage. Adults dream during REM (rapid eye movement) sleep and infants have loads of REM. So, it might be fair to assume that babies have tons of dreams. But scientists believe REM serves a completely different purpose for newborns and infants than dreaming. When babies are in REM, it allows their brain to develop pathways, connections, and eventually, learn languages. Since your baby doesn\'t dream at this stage of brain development, it\'s safe to assume babies do not have nightmares, either. Nightmares stem from exposure to trauma(创伤), an overactive imagination, and the normal stresses of everyday life. Are you wondering, what do babies dream about? Good question, but the answer is nothing! So, when do babies start dreaming? The general consensus is that they start dreaming around the age of two. Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day. In his lab, he lets kids fall asleep and then wakes them 3 times a night and asks them to describe what they recall. Foulkes\' findings are unsurprising. Basically, little kids have little dreams. But exactly what kids see while dreaming depends on their age. As children develop and grow, their dreams do too. Dreams of very small kids are usually just snapshots(快照), looking much more like a slideshow than a movie, when compared to the dreams of adults. They heavily feature animals and other familiar sights, like images of people eating. According to Foulkes, "Children\'s dream life…seems to be similar to their waking imagination and narration." Kids ages 5 – 9 begin seeing moving images and characters in action. Dreams now include multiple events strung together, one after the other. They also start developing greater ability to remember dreams. Still, that\'s not always the case: When roused during REM sleep, 25% of the kids in Foulkes\' studies had no recollection of dreaming, a trend that continues through age 9. So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.',
              },
            ],
            answer: 'C',
            explanation: '（主旨题）定位原文：“associating a healthy diet with teenagers\' own values seems to be a promising avenue to prevent obesity”，与选项 C 同义对应，故选 C。',
            evidence: {
              paragraphId: 'p1-5',
              quote: 'associating a healthy diet with teenagers\' own values seems to be a promising avenue to prevent obesity',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r51',
            number: 51,
            type: 'single',
            stem: 'What do scientists think of REM?',
            options: [
              {
                key: 'A',
                text: 'It is a sign of dreaming in adults and infants alike.',
              },
              {
                key: 'B',
                text: 'It is essential to human beings\' language learning.',
              },
              {
                key: 'C',
                text: 'It determines the formation of connections in the brain.',
              },
              {
                key: 'D',
                text: 'It performs a different function in babies than in adults.',
              },
            ],
            answer: 'D',
            explanation: '（细节题）定位原文：“But scientists believe REM serves a completely different purpose for newborns and infants than dreaming.”。但科学家认为，对新生儿和婴儿而言，REM 所起的作用与做梦完全不同。故选 D。',
            evidence: {
              paragraphId: 'p2-2',
              quote: 'But scientists believe REM serves a completely different purpose for newborns and infants than dreaming.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r52',
            number: 52,
            type: 'single',
            stem: 'What can we infer about nightmares from the passage?',
            options: [
              {
                key: 'A',
                text: 'They occur often in people with an active imagination.',
              },
              {
                key: 'B',
                text: 'They occur in people suffering from emotional stress.',
              },
              {
                key: 'C',
                text: 'They vary in different stages of brain development.',
              },
              {
                key: 'D',
                text: 'They appear in the sleep of both adults and infants.',
              },
            ],
            answer: 'B',
            explanation: '（推断题）定位原文：“Nightmares stem from exposure to trauma(创伤), an overactive imagination, and the normal stresses of everyday life.”。噩梦源于创伤经历、过度活跃的想象，以及日常生活中的正常压力。故选 B。',
            evidence: {
              paragraphId: 'p2-3',
              quote: 'Nightmares stem from exposure to trauma(创伤), an overactive imagination, and the normal stresses of everyday life.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r53',
            number: 53,
            type: 'single',
            stem: 'What is the aim of psychologist David Foulkes\' study?',
            options: [
              {
                key: 'A',
                text: 'To reveal the secrets of children\'s dreams.',
              },
              {
                key: 'B',
                text: 'To see if children start dreaming at age two.',
              },
              {
                key: 'C',
                text: 'To solve the mystery of dreaming and brain growth.',
              },
              {
                key: 'D',
                text: 'To confirm the general consensus on when kids dream.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day.”。心理学家 David Foulkes 研究儿童（从年幼孩童到青少年），目的是把他们梦境的秘密揭示于人前。故选 A。',
            evidence: {
              paragraphId: 'p2-4',
              quote: 'Psychologist David Foulkes studies children (from very small kids to teens) to bring the secrets of their dreams to the light of day.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r54',
            number: 54,
            type: 'single',
            stem: 'What are Foulkes\' findings about kids\' dreams?',
            options: [
              {
                key: 'A',
                text: 'They feature strange animals.',
              },
              {
                key: 'B',
                text: 'They are unsurprising to adults.',
              },
              {
                key: 'C',
                text: 'They grow and evolve with age.',
              },
              {
                key: 'D',
                text: 'They reflect kids\' waking life.',
              },
            ],
            answer: 'C',
            explanation: '（细节题）定位原文：“Foulkes\' findings are unsurprising. Basically, little kids have little dreams. But exactly what kids see while dreaming depends on their age. As…”。Foulkes 的发现并不令人意外。本质上，小孩做的也是小梦。但孩子在梦中究竟看到什么，取决于他们的年龄。随着孩子的发育成长，他们的梦也在发育成长。故选 C。',
            evidence: {
              paragraphId: 'p2-5',
              quote: 'Foulkes\' findings are unsurprising. Basically, little kids have little dreams. But exactly what kids see while dreaming depends on their age. As children develop and grow, their dreams do too.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s2-r55',
            number: 55,
            type: 'single',
            stem: 'What can we assume about babies who appear upset upon waking?',
            options: [
              {
                key: 'A',
                text: 'They have been roused against their will.',
              },
              {
                key: 'B',
                text: 'They have been disturbed by a nightmare.',
              },
              {
                key: 'C',
                text: 'They have trouble recollecting the images of their dreams.',
              },
              {
                key: 'D',
                text: 'They have been affected by something other than dreaming.',
              },
            ],
            answer: 'D',
            explanation: '（推断题）定位原文：“So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.”。因此，如果你的婴儿睡觉时显得紧张、或一醒来就不安，那很可能是别的因素在起作用。故选 D。',
            evidence: {
              paragraphId: 'p2-7',
              quote: 'So, if your baby seems to be in a stressful state while sleeping or is upset upon waking, there may be other factors at play.',
            },
            score: 2,
          },
        ],
      },
      {
        id: 'translation',
        kind: 'translation',
        title: 'Part IV Translation',
        instructions: 'Directions: For this part, you are allowed 30 minutes to translate a passage from Chinese into English. You should write your answer on Answer Sheet 2.',
        minutes: 30,
        questions: [
          {
            id: 'cet4-2025-12-s2-t1',
            number: 1,
            type: 'translation',
            stem: '近年来，"城市漫步(city walk)"在中国的年轻人中悄然兴起，已成为一种旅游新潮流。与传统旅游不同，城市漫步不追求在短时间内游览尽可能多的景点。而是随意行走或按照主题路线漫步在城市的大街小巷。漫步者品尝地道小吃，欣赏特色建筑，了解当地生活方式。他们还用相机或手机记录城市的风景和人物。这种旅游方式能让城市漫步者更深入了解城市的历史与文化。',
            answer: '见参考',
            explanation: '翻译解析：客观介绍"城市漫步"这一旅游新潮流。全段在客观介绍一种新兴现象："城市漫步(city walk)"在中国的年轻人中悄然兴起，已成为一种旅游新潮流，随后说明它是什么、漫步者做什么、有什么意义。语体是典型的四级文化/社会现象介绍说明文，用词宜平实、客观，不带主观抒情。 时态：一般现在时。通篇是在陈述一种当下普遍存在的现象与其一贯特征——已成为一种旅游新潮流说明它是现在持续的状态，后面"不追求……""品尝……欣赏……""用相机或手机记录……"都是对漫步者一贯做法的客观描述，不是某次过去事件。所以全篇默认一般现在时，仅"已成为"这类强调"已经实现"处可酌情用现在完成时。',
            score: 15,
          },
        ],
        reference: {
          translation: 'In recent years, city walk has quietly emerged among young people in China and has become a new travel trend. Unlike traditional travel, city walk does not seek to visit as many attractions as possible in a short time. Instead, city walkers wander randomly or stroll along themed routes through the streets and alleys of the city. They taste authentic snacks, admire distinctive buildings, and learn about local ways of life. They also record the city\'s scenery and people with cameras or mobile phones. This travel style enables city walkers to gain a deeper understanding of the city\'s history and culture.',
        },
      },
    ],
  },
  'cet4-2025-12-s3': {
    subtitle: '2025 年 12 月 · 站内收录',
    minutes: 125,
    words: 1900,
    tags: [
      '真题',
      '四级',
    ],
    summary: '2025年12月英语四级真题第3套，写作、选词填空、长篇阅读、仔细阅读与翻译均收录完整题面与参考答案；本套听力的归属各来源说法不一——懒笔记标注与第1套共用，南京大学分级考自测与过级鸭展示的题目与第2套完全一致，故本文件按第2套的听力题面、答案与原文收录，听力由浏览器合成语音朗读。',
    parts: [
      {
        id: 'writing',
        kind: 'writing',
        title: 'Part I Writing',
        instructions: 'Directions: Suppose your university is organizing a forum on how students can make the best use of on-campus resources for academic development. You are now to write an essay to express your view. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
        minutes: 30,
        questions: [
          {
            id: 'cet4-2025-12-s3-w1',
            number: 1,
            type: 'writing',
            stem: 'Suppose your university is organizing a forum on how students can make the best use of on-campus resources for academic development. You are now to write an essay to express your view. You will have 30 minutes to write the essay. You should write at least 120 words but no more than 180 words.',
            answer: '见参考',
            explanation: '写作要点：核心任务：为利用校内资源促学业表态；中心立意：主动利用校内资源是学业成长捷径；要点：常泡图书馆与数据库查资料 · 利用答疑时间请教教授 · 听学术讲座并加入学习小组；段序链：点价值亮总观点 → 分点给具体做法 → 重申升华呼应主题。',
            score: 15,
          },
        ],
        reference: {
          essay: 'On-campus resources are a treasure that too many students overlook. In my view, actively making use of these facilities is one of the smartest ways to boost our academic development.\n\nThere are several practical steps we can take. First, we should visit the library and its online databases regularly, since they offer academic papers and books that turn a rough idea into a well-supported argument. Moreover, we ought to consult professors during their office hours, because a ten-minute talk often clears up confusion that hours of self-study cannot. In addition, attending academic lectures and joining study groups exposes us to fresh perspectives and keeps our motivation high.\n\nIn short, the campus is full of tools waiting to be used. Only by taking the initiative to utilize them can we truly grow as learners and get the most out of our university years.',
          guidance: [
            '核心任务：为利用校内资源促学业表态',
            '中心立意：主动利用校内资源是学业成长捷径',
            '要点：常泡图书馆与数据库查资料 · 利用答疑时间请教教授 · 听学术讲座并加入学习小组',
            '段序链：点价值亮总观点 → 分点给具体做法 → 重申升华呼应主题',
          ],
        },
      },
      {
        id: 'listening',
        kind: 'listening',
        title: 'Part II Listening Comprehension',
        instructions: 'Directions: In this section, you will hear three news reports. At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre. Directions: In this section, you will hear two long conversations. At the end of each conversation, you will hear four questions. Both the conversation and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre. Directions: In this section, you will hear three passages. At the end of each passage, you will hear three or four questions. Both the passage and the questions will be spoken only once After you hear a question, you must choose the best answer from the four choices marked A), B), C) and D). Then mark the corresponding letter on Answer Sheet 1 with a single line through the centre.',
        minutes: 25,
        audio: {
          note: '听力原文由浏览器语音合成朗读（合成语音），非考试原音。',
          segments: [
            {
              id: 'cet4-2025-12-s3-ls-1',
              label: 'News Report 1',
              questionNo: 1,
              seconds: 65,
              text: 'Customs and Border Protection officials are seeing a rise in people illegally bringing eggs from Mexico into border states, such as Texas. The U.S. average price for a dozen large eggs last month hit $4.25. That\'s more than double their $1.78 price in December, 2023. Meanwhile, 30 eggs in Mexico sell for just $3.4. Those bringing eggs into the U.S. risk fines of up to $10,000. But officials say they usually seize and destroy the eggs. They also impose a $300 penalty. The Department of Agriculture banned eggs from Mexico in 2012. This was due to the risk of bird flu. Officials said most people arriving at international borders with eggs are truthful about their purchases. They simply don\'t know bringing eggs is not allowed. "Generally, the items are declared during the first inspection. Then the person can abandon the eggs without consequence," a Customs and Border Protection spokesperson said. Even so, there have been a very small number of cases recently when authorities discovered eggs during further inspections.',
            },
            {
              id: 'cet4-2025-12-s3-ls-2',
              label: 'News Report 2',
              questionNo: 3,
              seconds: 61,
              text: 'Nettie\'s House, a restaurant in America, has been hit with criticism after announcing on the website that children under the age of 10 are no longer welcome. Among the reasons given for the decision, the restaurant cited "noise levels, lack of space for high chairs, cleaning up crazy messes, and the liability of kids running around the restaurant". They decided that it was time to take control. The decision wasn\'t made lightly, but some recent events pushed them to implement this new policy. Responding to the post, one person commented that "It is messed up beyond another level. Children are children. Mums are tired and don\'t have time to cook. Not welcoming children under 10 is a complete slap in the face to families." He felt so disappointed in the establishment. There are others, however, who showed support for the restaurant\'s decision. They said it has the right to implement any rules it wants.',
            },
            {
              id: 'cet4-2025-12-s3-ls-3',
              label: 'News Report 3',
              questionNo: 5,
              seconds: 80,
              text: 'Security officers were searching a suburb in Australia where an adult snake was believed to be wandering after the discovery of a huge, "freshly shed" snake skin. The skin was found at a construction site, and the government wrote to residents to warn them. They were told to observe and, if possible, photograph the animal. If it was moving, watch where it went. It was recommended not to make contact with the animal. The type of snake was determined to be one of the world\'s largest snake species. It is not poisonous, but can still attack and kill its victims. This type of snake is classified as a threat to humans, especially small children, as well as pets. They may carry viruses that are fatal to native snakes, which do not have resistance. If officers found the snake, they would employ a licensed snake catcher to catch it and transport it to a specialist animal doctor, the government said. If caught, the snake would be examined to determine where it came from, how long it had been in the area, what it had been eating, whether it was carrying any diseases of concern and whether it had produced babies.',
            },
            {
              id: 'cet4-2025-12-s3-ls-4',
              label: 'Conversation 1',
              questionNo: 8,
              seconds: 113,
              text: 'Woman: Poor Hannah! Man: Why? What happened? Woman: Didn\'t you hear? She won a TV competition and became a millionaire overnight. Man: No way. That\'s incredible. Are you kidding? Woman: No, I\'m serious. I swear it. She went on a TV show where they quiz on general knowledge, and she won first prize. Man: Wow. That\'s so lucky of her. How much did she win? Woman: I\'m not sure of the exact figure, but it\'s a few million Euros, maybe five million Euros after tax. Man: I can\'t believe it. You\'re really not joking, are you? Woman: Honestly, look at my face. Our friend Hannah won a ton of money. Man: Unbelievable. Then why were you saying "poor Hannah"? Woman: Well, it turns out that she\'s spent it all already. Man: Five million Euros? How is that even possible? Woman: She bought a house for herself and her husband, a house for her parents, and then a house for each of her four brothers and sisters. And then she bought her husband a ridiculously expensive sports car. Man: Wow. Are they all happy? Because that\'s what matters, isn\'t it? Woman: I know for a fact Hannah isn\'t. You see, she was planning to quit the job she hates and retire early. But now that she ran out of money, she can\'t. Basically, she miscalculated how fast she was burning through the money, and she\'s now full of regret. Man: Why don\'t they sell that flashy new car? Woman: She wants to, but her husband refuses to get rid of it. He says the car is the best thing that has ever happened to him, and if she sells it, he will divorce her.',
            },
            {
              id: 'cet4-2025-12-s3-ls-5',
              label: 'Conversation 2',
              questionNo: 12,
              seconds: 110,
              text: 'Woman: If you have time right now, I think we need to sit down and discuss what exactly we are going to do for Jake\'s education next year. I\'ve been thinking it over, and I\'d like to send him to Westwood Elementary. Man: You mean that boarding school? I thought we agreed that we would not be sending him away at such a young age. I admit that their academic record is very strong with many outstanding awards for achievements in Science and Math, but he is just not mature enough to live on his own at this point. What about enrolling him in Lakeview School? Woman: They do have a great outdoor campus where he could finally learn all those outdoor sports you have been wanting him to try. With so much greenery and fresh air, I think his current breathing problems would probably disappear. They did just open, though, so I don\'t think I feel comfortable having our son in the first class of a brand-new school. Man: Yeah, the classrooms would probably smell like paint, making the air in the school all stuffy. What about our local school then? They have a wonderful arts program that would really challenge Jake in terms of creativity and imagination. Being practically next door, one of us could take him to school every day before going to work. Woman: I don\'t know. They have a reputation of being overly strict with the students, not to mention the overwhelming amount of homework they assign, which would lead to a lot of pressure for Jake and me. What if we send him to the place near your mother\'s house?',
            },
            {
              id: 'cet4-2025-12-s3-ls-6',
              label: 'Passage 1',
              questionNo: 16,
              seconds: 94,
              text: 'Analytical decision-making is a decision-making approach where a manager makes important business decisions only with solid data. This style contrasts with more instinctive leadership styles where managers make many decisions using instinct or opinion. While analytical decision-makers benefit from a deliberate, thoughtful approach, this style also has some shortcomings. A key flaw with analytical decision-making is that it takes time. While this approach is beneficial when you have the time and the decision is important, it is problematic when time is crucial. Analytical decision-makers struggle with deadlines and a sense of urgency with decisions. In situations where you need more timely action, decisions based on some information and instinct may work better. The desire to be right is a major driver of analytical decision-making. Leaders who use this style don\'t want to make mistakes. This commitment, one right way of thinking or doing things, hinders the manager\'s flexibility. Inflexibility causes you to ignore or avoid listening to the thoughts and ideas of others. You only want to utilize hard data or facts. Despite its restrictions, analytical decision-making does have several key strengths. By relying on facts and data, you minimize your potential for a wrong decision. You also get away from the habit of making guesses or following instincts. Database technology enables business leaders to look to hard evidence in analyzing target markets and promotional strategies, rather than making assumptions or guesses on what works.',
            },
            {
              id: 'cet4-2025-12-s3-ls-7',
              label: 'Passage 2',
              questionNo: 19,
              seconds: 90,
              text: 'What is the secret to living past 100? Playing the piano is among the things the world\'s oldest person believes has contributed to her long life. Branyas Morera is now 115 years and 320 days old. That means she\'s been alive longer than any other living individual. Branyas was born in the United States on April 4th, 1907. But her family moved to Spain, where they were originally from, when she was a young child. She has lived there ever since. The 115-year-old is active on social media, regularly sharing aspects of her life. She also shares some of her secrets to living so long. These include playing the piano from a young age. Unfortunately, she had to give up the practice seven years ago at 108. Her other secrets for living a long life? She led an active lifestyle until her later years, but has never followed a specific diet. "Many people ask me what diet I follow to live so many years," Branyas wrote. "I have always eaten little, but everything, and I have never followed any plan." But she does eat yogurt every day, which she said has "an infinite number of positive properties" for the body. She has also said that the secret to a long life is "knowing how to choose" what to forget. "Life would be impossible if we remembered everything," she said.',
            },
            {
              id: 'cet4-2025-12-s3-ls-8',
              label: 'Passage 3',
              questionNo: 22,
              seconds: 96,
              text: 'It\'s the first day of school, and your teacher tells you to find a seat in the classroom. Where do you sit? Does it matter? Yes. It does matter where you sit in your classroom, so choose and choose carefully. Studies report that where you sit in the classroom can impact your ability to learn and the way your teacher perceives you. Guess what else? Your grade. Then what is the best seat in the classroom? In one study, students who sat in the front and center of the classroom received a higher grade average and scored higher on tests than those sitting towards the back of the classroom. Get this. Students sitting in the middle of the classroom also outscored students sitting behind them. This study gathered that students had a clearer vision of the blackboard and were able to focus more attention on the instructor. By sitting front and center, students were able to hear better too. The instructors said that they also formed a better connection with the students who sat in front. Perhaps the connection is made because of eye contact and visibility and more interaction. But when you sit in the front row, you may be called on more by your teacher, mainly due to the fact that you are easier to see. So for students who are not prepared and for those who are extremely shy, the attention could cause some unwanted stress.',
            },
          ],
        },
        questions: [
          {
            id: 'cet4-2025-12-s3-l1',
            number: 1,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-1',
            stem: 'What do we learn from the news report about the egg price in the U.S.?',
            options: [
              {
                key: 'A',
                text: 'It has gone up sharply.',
              },
              {
                key: 'B',
                text: 'It has been fluctuating.',
              },
              {
                key: 'C',
                text: 'It has risen because of bird flu.',
              },
              {
                key: 'D',
                text: 'It has been consumers\' concern.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“The U.S. average price for a dozen large eggs last month hit $4.25. That\'s more than double their $1.78 price in December, 2023.”。上个月美国一打大号鸡蛋的平均价格达到了 4.25 美元，这比 2023 年 12 月的 1.78 美元还高出一倍多。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-1',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l2',
            number: 2,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-1',
            stem: 'What does the news report say about most people arriving at American borders with eggs?',
            options: [
              {
                key: 'A',
                text: 'They don\'t want to abandon their eggs.',
              },
              {
                key: 'B',
                text: 'They don\'t know they will be heavily fined.',
              },
              {
                key: 'C',
                text: 'They don\'t know they are forbidden to bring eggs.',
              },
              {
                key: 'D',
                text: 'They don\'t declare their eggs during the inspection.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“Officials said most people arriving at international borders with eggs are truthful about their purchases. They simply don\'t know bringing eggs is…”。官员说，多数带着鸡蛋到达国际边境的人对自己买的东西是如实交代的。他们只是不知道带鸡蛋是不被允许的。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-1',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l3',
            number: 3,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-2',
            stem: 'What do we learn from the news report about the restaurant Nettie\'s House?',
            options: [
              {
                key: 'A',
                text: 'It is no longer critical of younger customers.',
              },
              {
                key: 'B',
                text: 'It has banned kids under 10 from dining there.',
              },
              {
                key: 'C',
                text: 'It is no longer as noisy and crowded as before.',
              },
              {
                key: 'D',
                text: 'It has implemented a decision to expand business.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“Nettie\'s House, a restaurant in America, has been hit with criticism after announcing on the website that children under the age of 10 are no longer…”。美国一家名叫 Nettie\'s House 的餐厅在网站上宣布不再欢迎 10 岁以下儿童后，遭到了批评。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-2',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l4',
            number: 4,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-2',
            stem: 'What do supporters say in response to the restaurant\'s new policy?',
            options: [
              {
                key: 'A',
                text: 'It is fully aware of frequent customers\' feelings.',
              },
              {
                key: 'B',
                text: 'It caters to the tastes of different customers.',
              },
              {
                key: 'C',
                text: 'It is entitled to adopt any rules it wants.',
              },
              {
                key: 'D',
                text: 'It should announce its decisions online.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“There are others, however, who showed support for the restaurant\'s decision. They said it has the right to implement any rules it wants.”。不过也有另一些人对餐厅的决定表示支持。他们说餐厅有权实施它想要的任何规定。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-2',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l5',
            number: 5,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-3',
            stem: 'What does the report say security officers were searching for?',
            options: [
              {
                key: 'A',
                text: 'A missing pet.',
              },
              {
                key: 'B',
                text: 'A grown-up snake.',
              },
              {
                key: 'C',
                text: 'A huge animal skin.',
              },
              {
                key: 'D',
                text: 'A snake specialist.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“Security officers were searching a suburb in Australia where an adult snake was believed to be wandering after the discovery of a huge, "freshly…”。安保人员正在搜查澳大利亚的一处郊区，据信有一条成年蛇在那里游荡，此前那里发现了一张巨大的、刚蜕下的蛇皮。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l6',
            number: 6,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-3',
            stem: 'Where does the report say the discovery was made?',
            options: [
              {
                key: 'A',
                text: 'In a government office.',
              },
              {
                key: 'B',
                text: 'In a deserted house.',
              },
              {
                key: 'C',
                text: 'At a local zoo.',
              },
              {
                key: 'D',
                text: 'At a construction site.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“The skin was found at a construction site, and the government wrote to residents to warn them.”。那张蛇皮是在一处建筑工地发现的，政府随后致信居民提醒他们。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l7',
            number: 7,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-3',
            stem: 'What did the government say would be done if security officers found what they were searching for?',
            options: [
              {
                key: 'A',
                text: 'Figuring out where it came from.',
              },
              {
                key: 'B',
                text: 'Curing it of any possible diseases.',
              },
              {
                key: 'C',
                text: 'Protecting its babies against harm.',
              },
              {
                key: 'D',
                text: 'Determining how to catch it safely.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“If caught, the snake would be examined to determine where it came from, how long it had been in the area, what it had been eating, whether it was…”。一旦抓获，这条蛇将接受检查，以确定它从哪里来、在该区域待了多久、一直在吃什么、是否携带值得关注的疾病，以及是否已经产下幼蛇。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-3',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l8',
            number: 8,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-4',
            stem: 'Why does the woman say she swears it?',
            options: [
              {
                key: 'A',
                text: 'The man doesn\'t agree Hannah is poor.',
              },
              {
                key: 'B',
                text: 'The man doesn\'t believe what she says.',
              },
              {
                key: 'C',
                text: 'The man doesn\'t think she can be a millionaire.',
              },
              {
                key: 'D',
                text: 'The man doesn\'t consider her to be trustworthy.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“M: I can\'t believe it. You\'re really not joking, are you?”。男：我真不敢相信。你真的不是在开玩笑吧？故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l9',
            number: 9,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-4',
            stem: 'What do we learn about Hannah from the conversation?',
            options: [
              {
                key: 'A',
                text: 'She no longer has any money left.',
              },
              {
                key: 'B',
                text: 'She has been betrayed by her family.',
              },
              {
                key: 'C',
                text: 'She can no longer hold on to her job.',
              },
              {
                key: 'D',
                text: 'She has been robbed of 5 million Euros.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“W: Well, it turns out that she\'s spent it all already.”。女：嗯，原来她已经把钱全花光了。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l10',
            number: 10,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-4',
            stem: 'What does the man think really matters to people?',
            options: [
              {
                key: 'A',
                text: 'Fortune.',
              },
              {
                key: 'B',
                text: 'Family.',
              },
              {
                key: 'C',
                text: 'Harmony.',
              },
              {
                key: 'D',
                text: 'Happiness.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“M: Wow. Are they all happy? Because that\'s what matters, isn\'t it?”。男：哇，他们都开心吗？因为那才是最要紧的，不是吗？故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l11',
            number: 11,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-4',
            stem: 'What does Hannah\'s husband say he\'ll do if she sells the new car?',
            options: [
              {
                key: 'A',
                text: 'Divorce her.',
              },
              {
                key: 'B',
                text: 'Leave home.',
              },
              {
                key: 'C',
                text: 'Buy her a more expensive model.',
              },
              {
                key: 'D',
                text: 'Let the best thing happen to them.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“W: She wants to, but her husband refuses to get rid of it. He says the car is the best thing that has ever happened to him, and if she sells it, he…”。女：她想卖，但她丈夫拒绝处理掉它。他说这辆车是他这辈子遇到的最好的东西，如果她卖了，他就跟她离婚。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-4',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l12',
            number: 12,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-5',
            stem: 'What does the man say about Jake?',
            options: [
              {
                key: 'A',
                text: 'He is not outstanding in Science and Math.',
              },
              {
                key: 'B',
                text: 'He does not have a strong academic record.',
              },
              {
                key: 'C',
                text: 'He is not yet mature enough to live on his own.',
              },
              {
                key: 'D',
                text: 'He does not like Westwood Elementary School.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“I admit that their academic record is very strong with many outstanding awards for achievements in Science and Math, but he is just not mature enough…”。我承认他们的学术成绩很强，在科学和数学方面拿过很多杰出的奖项，但他现在还不够成熟，没法独立生活。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l13',
            number: 13,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-5',
            stem: 'Why does the woman feel uncomfortable about sending Jake to Lakeview School?',
            options: [
              {
                key: 'A',
                text: 'It is too far away.',
              },
              {
                key: 'B',
                text: 'It is newly opened.',
              },
              {
                key: 'C',
                text: 'It lacks outdoor sports facilities.',
              },
              {
                key: 'D',
                text: 'It has too few first-class teachers.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“They did just open, though, so I don\'t think I feel comfortable having our son in the first class of a brand-new school.”。不过他们才刚开学，所以我不太放心让我们的儿子去一所全新学校的第一届。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l14',
            number: 14,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-5',
            stem: 'What does the man say about their local school?',
            options: [
              {
                key: 'A',
                text: 'It has a beautiful campus.',
              },
              {
                key: 'B',
                text: 'It is within walking distance.',
              },
              {
                key: 'C',
                text: 'It has a wonderful arts program.',
              },
              {
                key: 'D',
                text: 'It is helpful to Jake\'s breathing problems.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“What about our local school then? They have a wonderful arts program that would really challenge Jake in terms of creativity and imagination.”。那我们本地的学校呢？他们有一个很棒的艺术项目，能在创造力和想象力方面真正挑战 Jake。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l15',
            number: 15,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-5',
            stem: 'What does the woman suggest at the end of the conversation?',
            options: [
              {
                key: 'A',
                text: 'Asking Jake which school he himself prefers to enroll in.',
              },
              {
                key: 'B',
                text: 'Thinking twice about what is best for Jake\'s education next year.',
              },
              {
                key: 'C',
                text: 'Consulting her mother about which school Jake is to attend.',
              },
              {
                key: 'D',
                text: 'Sending Jake to the school near the home of the man\'s mother.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“What if we send him to the place near your mother\'s house?”。要不我们把他送到你妈妈家附近的那所学校怎么样？故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-5',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-l16',
            number: 16,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-6',
            stem: 'What does the passage say is a major flaw of analytical decision-making?',
            options: [
              {
                key: 'A',
                text: 'It is time consuming.',
              },
              {
                key: 'B',
                text: 'It is unfit for crucial issues.',
              },
              {
                key: 'C',
                text: 'It relies too much on solid data.',
              },
              {
                key: 'D',
                text: 'It dulls a leader\'s sense of urgency.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“A key flaw with analytical decision-making is that it takes time.”。分析型决策的一个关键缺陷是它很费时间。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l17',
            number: 17,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-6',
            stem: 'What does a leader tend to do when they are committed to analytical decision-making?',
            options: [
              {
                key: 'A',
                text: 'Depend on digital technology.',
              },
              {
                key: 'B',
                text: 'Make assumptions and guesses.',
              },
              {
                key: 'C',
                text: 'Ignore others\' thoughts and ideas.',
              },
              {
                key: 'D',
                text: 'Lay emphasis on thinking flexibly.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“Inflexibility causes you to ignore or avoid listening to the thoughts and ideas of others.”。这种僵化会使你忽视或回避去倾听他人的想法和主意。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l18',
            number: 18,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-6',
            stem: 'What is a key strength of analytical decision-making?',
            options: [
              {
                key: 'A',
                text: 'Maximizing the advantage of available resources.',
              },
              {
                key: 'B',
                text: 'Minimizing the possibility of a wrong decision.',
              },
              {
                key: 'C',
                text: 'Discovering new potential markets.',
              },
              {
                key: 'D',
                text: 'Perfecting promotional strategies.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“By relying on facts and data, you minimize your potential for a wrong decision.”。通过依靠事实和数据，你把做出错误决策的可能性降到最低。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-6',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l19',
            number: 19,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-7',
            stem: 'What do we learn about Branyas Morera?',
            options: [
              {
                key: 'A',
                text: 'She is one of the world\'s best-known pianists.',
              },
              {
                key: 'B',
                text: 'She celebrated her 110th birthday this April.',
              },
              {
                key: 'C',
                text: 'She moved to the U.S. at a young age.',
              },
              {
                key: 'D',
                text: 'She is the world\'s oldest individual.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“Branyas Morera is now 115 years and 320 days old. That means she\'s been alive longer than any other living individual.”。布兰亚斯·莫雷拉现在 115 岁零 320 天。这意味着她比任何其他在世的人都活得更久。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l20',
            number: 20,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-7',
            stem: 'What is one of Branyas Morera\'s secrets to living a long life?',
            options: [
              {
                key: 'A',
                text: 'Being always active on social media.',
              },
              {
                key: 'B',
                text: 'Doing regular and vigorous exercise.',
              },
              {
                key: 'C',
                text: 'Playing the piano from a young age.',
              },
              {
                key: 'D',
                text: 'Following a specific diet every day.',
              },
            ],
            answer: 'C',
            explanation: '定位原文：“She also shares some of her secrets to living so long. These include playing the piano from a young age.”。她还分享了一些自己长寿的秘诀。这些秘诀包括从小弹钢琴。故选 C。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l21',
            number: 21,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-7',
            stem: 'What does Branyas Morera think also contributes to a long life?',
            options: [
              {
                key: 'A',
                text: 'Eating as little as one can possibly manage.',
              },
              {
                key: 'B',
                text: 'Having the ability to forget things selectively.',
              },
              {
                key: 'C',
                text: 'Figuring out the positive properties of each food item.',
              },
              {
                key: 'D',
                text: 'Knowing how to remember major events in one\'s life.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“She has also said that the secret to a long life is "knowing how to choose" what to forget.”。她还说过，长寿的秘诀是“懂得选择”要忘掉什么。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-7',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l22',
            number: 22,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-8',
            stem: 'What is of great importance to students according to the speaker?',
            options: [
              {
                key: 'A',
                text: 'The ability to learn.',
              },
              {
                key: 'B',
                text: 'The first day of school.',
              },
              {
                key: 'C',
                text: 'How teachers perceive them.',
              },
              {
                key: 'D',
                text: 'Where they sit in the classroom.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“It does matter where you sit in your classroom, so choose and choose carefully. Studies report that where you sit in the classroom can impact your…”。你坐在教室的哪个位置，确实有影响，所以要慎重选座。研究表明，你在教室里的座位会影响你的学习能力以及老师对你的看法。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l23',
            number: 23,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-8',
            stem: 'What did one study find about students seated in the middle of the classroom?',
            options: [
              {
                key: 'A',
                text: 'They often received close attention from the instructors.',
              },
              {
                key: 'B',
                text: 'They obtained the highest grade average in their class.',
              },
              {
                key: 'C',
                text: 'They actually wanted a clear vision of the blackboard.',
              },
              {
                key: 'D',
                text: 'They scored higher than students sitting behind them.',
              },
            ],
            answer: 'D',
            explanation: '定位原文：“Get this. Students sitting in the middle of the classroom also outscored students sitting behind them.”。注意了：坐在教室中间的学生，成绩也超过了坐在他们后面的学生。故选 D。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l24',
            number: 24,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-8',
            stem: 'What can eye contact, visibility and more interaction probably bring about?',
            options: [
              {
                key: 'A',
                text: 'A higher grade average among all students of a class.',
              },
              {
                key: 'B',
                text: 'A better connection between instructors and students.',
              },
              {
                key: 'C',
                text: 'A stronger support for a student-centered teaching approach.',
              },
              {
                key: 'D',
                text: 'A more favorable atmosphere for effective classroom learning.',
              },
            ],
            answer: 'B',
            explanation: '定位原文：“The instructors said that they also formed a better connection with the students who sat in front. Perhaps the connection is made because of eye…”。老师们说，他们和坐在前排的学生还建立了更好的联系。也许这种联系正是因为眼神交流、容易被看到以及更多的互动而形成的。故选 B。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-8',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-l25',
            number: 25,
            type: 'single',
            groupId: 'cet4-2025-12-s3-ls-8',
            stem: 'What do we learn about extremely shy students sitting in the front row of the classroom?',
            options: [
              {
                key: 'A',
                text: 'They may experience some unwanted stress.',
              },
              {
                key: 'B',
                text: 'They may try hard to show their preparedness.',
              },
              {
                key: 'C',
                text: 'They may receive extra attention from the instructor.',
              },
              {
                key: 'D',
                text: 'They may feel helpless when called on by the instructor.',
              },
            ],
            answer: 'A',
            explanation: '定位原文：“So for students who are not prepared and for those who are extremely shy, the attention could cause some unwanted stress.”。所以，对于那些没准备好的学生以及那些极为害羞的学生来说，这种关注可能会带来一些不想要的压力。故选 A。',
            evidence: {
              paragraphId: 'cet4-2025-12-s3-ls-8',
            },
            score: 2,
          },
        ],
      },
      {
        id: 'cloze',
        kind: 'cloze',
        title: 'Part III Section A Banked Cloze',
        instructions: 'Directions: In this section, there is a passage with ten blanks. You are required to select one word for each blank from a list of choices given in a word bank following the passage. Read the passage through carefully before making your choices. Each choice in the bank is identified by a letter. Please mark the corresponding letter for each item on Answer Sheet 2 with a single line through the centre. You may not use any of the words in the bank more than once.',
        minutes: 15,
        bank: {
          A: 'concerns',
          B: 'expansion',
          C: 'forth',
          D: 'geography',
          E: 'importance',
          F: 'imposed',
          G: 'inspired',
          H: 'national',
          I: 'partners',
          J: 'potential',
          K: 'pursues',
          L: 'rescues',
          M: 'rest',
          N: 'strengthened',
          O: 'together',
        },
        passages: [
          {
            id: 'c1',
            title: '选词填空短文',
            paragraphs: [
              {
                id: 'c1-1',
                text: 'Earth Day is an annual celebration that honors the achievements of the environmental movement and raises awareness of the need to protect Earth\'s natural resources for future generations. Earth Day is celebrated on April 22 in the United States and on either April 22 or the day the spring equinox(春分) occurs throughout the __(26)__ of the world.',
              },
              {
                id: 'c1-2',
                text: 'Environmental activism during the 1960s __(27)__ Wisconsin Senator Gaylord Nelson to create a __(28)__ celebration uniting the environmental movement. With the help of Denis Hayes, a graduate student at Harvard University, Nelson organized the first Earth Day on April 22, 1970, educating participants in the __(29)__ of environmental protection. Attended by 20 million people across the United States, the event __(30)__ support for legislation such as the Clean Air Act and the Endangered Species Act.',
              },
              {
                id: 'c1-3',
                text: 'In 1990, Hayes organized a global Earth Day, with more than 200 million participants in 140 countries. Earth Day now brings __(31)__ citizens and activists from around the world to raise awareness and take action regarding such environmental __(32)__ as global warming and renewable energy.',
              },
              {
                id: 'c1-4',
                text: 'Today, the Earth Day Network, which rallies more than 20,000 __(33)__ and organizations in 190 countries, supports the Earth Day mission year-round. This mission is founded on the proposition that all people, regardless of race, gender, income, or __(34)__ , have a moral right to a healthy, sustainable environment. The Earth Day Network __(35)__ this mission through education, public policy, and activism campaigns.',
              },
            ],
          },
        ],
        questions: [
          {
            id: 'cet4-2025-12-s3-c26',
            number: 26,
            type: 'bank',
            stem: 'Earth Day is celebrated on April 22 in the United States and on either April 22 or the day the spring equinox(春分) occurs throughout the __(26)__ of the world.',
            answer: 'M',
            explanation: 'M rest（名词）。词性：the ___ of the world：定冠词 + 空 + of，典型名词位。依据：the rest of the world：固定搭配，指"世界其余地方"。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c27',
            number: 27,
            type: 'bank',
            stem: 'Environmental activism during the 1960s __(27)__ Wisconsin Senator Gaylord Nelson to create a __(28)__ celebration uniting the environmental movement.',
            answer: 'G',
            explanation: 'G inspired（动词）。词性：Environmental activism … ___ Wisconsin Senator … to create：主语后缺谓语，需谓语动词。依据：inspire sb to do sth：激励某人去做某事。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c28',
            number: 28,
            type: 'bank',
            stem: 'Environmental activism during the 1960s __(27)__ Wisconsin Senator Gaylord Nelson to create a __(28)__ celebration uniting the environmental movement.',
            answer: 'H',
            explanation: 'H national（形容词）。词性：a ___ celebration：冠词 + 空 + 名词，定语位。依据：a national celebration：呼应"全国统一的环保运动"。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c29',
            number: 29,
            type: 'bank',
            stem: 'With the help of Denis Hayes, a graduate student at Harvard University, Nelson organized the first Earth Day on April 22, 1970, educating participants in the __(29)__ of environmental protection.',
            answer: 'E',
            explanation: 'E importance（名词）。词性：in the ___ of：固定名词框架。依据：educate sb in the importance of sth：教育某人意识到某事的重要性。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c30',
            number: 30,
            type: 'bank',
            stem: 'Attended by 20 million people across the United States, the event __(30)__ support for legislation such as the Clean Air Act and the Endangered Species Act.',
            answer: 'N',
            explanation: 'N strengthened（动词）。词性：the event ___ support：主语后缺谓语，需过去时动词。依据：strengthened support for legislation：增强了对立法的支持。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c31',
            number: 31,
            type: 'bank',
            stem: 'Earth Day now brings __(31)__ citizens and activists from around the world to raise awareness and take action regarding such environmental __(32)__ as global warming and renewable energy.',
            answer: 'O',
            explanation: 'O together（副词）。词性：brings ___ citizens：bring 后接副词，构成 bring together 短语。依据：bring together：把（来自世界各地的人）聚到一起。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c32',
            number: 32,
            type: 'bank',
            stem: 'Earth Day now brings __(31)__ citizens and activists from around the world to raise awareness and take action regarding such environmental __(32)__ as global warming and renewable energy.',
            answer: 'A',
            explanation: 'A concerns（名词）。词性：such environmental ___ as global warming and renewable energy：such…as 结构里的复数名词。依据：environmental concerns：环境关切/环保议题。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c33',
            number: 33,
            type: 'bank',
            stem: 'Today, the Earth Day Network, which rallies more than 20,000 __(33)__ and organizations in 190 countries, supports the Earth Day mission year-round.',
            answer: 'I',
            explanation: 'I partners（名词）。词性：rallies more than 20,000 ___ and organizations：数量词+空+and+名词，并列名词位。依据：partners and organizations："合作伙伴 + 组织"是地球日网络的天然描述。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c34',
            number: 34,
            type: 'bank',
            stem: 'This mission is founded on the proposition that all people, regardless of race, gender, income, or __(34)__ , have a moral right to a healthy, sustainable environment.',
            answer: 'D',
            explanation: 'D geography（名词）。词性：race, gender, income, or ___：并列名词序列的末项。依据：geography 在此指"地域/地区"，与种族、性别、收入并列为人的归属属性。',
            score: 0.5,
          },
          {
            id: 'cet4-2025-12-s3-c35',
            number: 35,
            type: 'bank',
            stem: 'The Earth Day Network __(35)__ this mission through education, public policy, and activism campaigns.',
            answer: 'K',
            explanation: 'K pursues（动词）。词性：The Earth Day Network ___ this mission：主语后缺谓语，需第三人称单数现在时动词。依据：pursues this mission：推行/践行这一使命。',
            score: 0.5,
          },
        ],
      },
      {
        id: 'reading',
        kind: 'reading',
        title: 'Part III Section B/C Reading Comprehension',
        instructions: 'Directions: In this section, you are going to read a passage with ten statements attached to it. Each statement contains information given in one of the paragraphs. Identify the paragraph from which the information is derived. You may choose a paragraph more than once. Each paragraph is marked with a letter. Answer the questions by marking the corresponding letter on Answer Sheet 2. Directions: There are 2 passages in this section. Each passage is followed by some questions or unfinished statements. For each of them there are four choices marked A), B), C) and D). You should decide on the best choice and mark the corresponding letter on Answer Sheet 2 with a single line through the centre.',
        minutes: 25,
        passages: [
          {
            id: 'p0',
            title: 'Looking for a job after 45',
            paragraphs: [
              {
                id: 'p0-1',
                marker: 'A',
                text: ' Ageism and long-term unemployment are most damaging for those in the second half of their careers. Changing careers is hard. Getting back into work after you\'ve been laid off is even harder. Those over 45 make up the bulk of the long-term unemployed, in America and elsewhere. Hiring managers admit they are reluctant to hire those over 40 or 45, arguing they probably won\'t be a good "fit," their experience won\'t be relevant to the workplace, and they\'ll be unable or unwilling to learn new skills.',
              },
              {
                id: 'p0-2',
                marker: 'B',
                text: ' But the one thing that can really make a difference? More education and training. These are the results from a new study by Generation, a nonprofit founded by former McKinsey consultants. They\'ve just published a global survey on midcareer employment, based on surveys of over 5,000 workers and managers in seven countries.',
              },
              {
                id: 'p0-3',
                marker: 'C',
                text: ' "Older midcareer workers … make up the bulk of the long-term unemployed in many countries," Generation\'s analysts write in their report. Those over 45 comprise over 40% of the long-term unemployed, for example. And if you\'re out of work past the age of 45, there\'s nearly a two in three chance you\'ll be out of work for over a year, they find. "Midcareer individuals are finding it harder to get jobs," they write. "People age 45+ face persistent and rising pressure in the global job market. They are unemployed for much longer than the average, and their age is indeed one of the greatest barriers to their finding a job."',
              },
              {
                id: 'p0-4',
                marker: 'D',
                text: ' A substantial part of this, they report, is "widespread ageism" on the part of hiring managers. Although such managers admit that post-45 hires turn out on average to be just as good as or better than younger workers, they still don\'t want to hire them. "Hiring managers have a strong perception bias against 45+ job candidates — they believe that members of this age group have poor skills and low adaptability," Generation\'s analysts report.',
              },
              {
                id: 'p0-5',
                marker: 'E',
                text: ' The survey results are remarkable. Hiring managers are three times as likely to rate job applicants age 35 – 44 as a better "fit" than those over 45. They rate the post-45 job seekers lower on average on all three measures — even experience — than those ages 18 to 34. This is true even though nearly nine managers in 10 also said their post-45 workers were as good as or better than younger employees in the same jobs.',
              },
              {
                id: 'p0-6',
                marker: 'F',
                text: ' Their biggest fears about hiring those over 45? Managers said they worry that older hires will be reluctant to try new technologies, and will be unable to learn new skills. Besides, the majority of hiring managers are under 45 — and seem reluctant to hire people older than themselves.',
              },
              {
                id: 'p0-7',
                marker: 'G',
                text: ' But here\'s the good news. Older workers who\'ve actively engaged in more education and training relevant to their jobs turn this pretty much on its head. Three-quarters of hiring managers said they\'d be more likely to hire an over-45 who had relevant education, training or credentials(文凭). Among those over 45 who\'d successfully switched careers, 74% said training helped them get their new job.',
              },
              {
                id: 'p0-8',
                marker: 'H',
                text: ' "Midcareer switchers overwhelmingly say that training enabled them to shift to a new career path," the analysts write. And when they asked over-45 candidates about their attitudes, they found that "those who are excited by training are unemployed for less time, receive more job offers, and are more satisfied by the job offers they receive."',
              },
              {
                id: 'p0-9',
                marker: 'I',
                text: ' Hiring managers said training was three times more likely to get them to hire applicants over age 45 than, say, government subsidies(补贴). What training are we talking about? Obviously it depends on the job. And, yes, managers are most likely to be impressed by industry qualifications you get in school. These things cost money, and time. But these aren\'t the only things helpful. Those who had successfully changed careers after 45 told Generation that education and training had been a big help — and that included in-person, on-the-job training, "informal learning," and online courses — with or without certification.',
              },
              {
                id: 'p0-10',
                marker: 'J',
                text: ' If they think we\'re too old to learn new skills after we\'re 45, just learning some new skills may have an effect on its own. There\'s a downside to this. The people least interested in retraining are more likely to come from historically disadvantaged communities, more likely to have low incomes, and are more likely to have the least schooling after getting their high-school diploma or earlier. On average, post-45 job switchers with higher incomes participate in 2.5 training programs each. Those with lower incomes: 0.9 programs on average.',
              },
              {
                id: 'p0-11',
                marker: 'K',
                text: ' Many years ago, I wrote about a study which found that employers are much more likely to hire a college graduate who has some work experience in the industry than a college graduate who took the "right" degree. A bank is more likely to hire a literature graduate who spent their summers working in their local bank than a finance or economics graduate who spent their summers surfing or traveling around Italy. They\'ve learned through long experience. The person who worked in the bank is more likely ready, willing and able to be part of the team and do the job from day 1.',
              },
              {
                id: 'p0-12',
                marker: 'L',
                text: ' We can rail against "ageism" all we like. It gets us nowhere. And it\'s easy to forget that employers, like everyone else, are under time pressure and are just trying to solve problems. Any and all "training," including inexpensive and informal training, is going to help resolve their worries about hiring someone over 45. And it has never been easier or cheaper to gain instruction in new skills, thanks to the internet. Online schools like Udemy and Lynda.com offer sweet deals at sign-up. And courses on YouTube are free.',
              },
              {
                id: 'p0-13',
                marker: 'M',
                text: ' Bottom line? Yes, it really can be difficult getting a new job after age 45, let alone changing careers. One of the best things we can do to help ourselves is to go online and learn new, relevant skills. Sadly, the people who most need the help are least likely to take it — which raises a challenge for society as a whole. Not only do we not want to see lives go to waste, but we all benefit if more people are working and fewer are unemployed.',
              },
            ],
          },
          {
            id: 'p1',
            title: 'Passage One',
            paragraphs: [
              {
                id: 'p1-1',
                marker: 'A',
                text: 'New York\'s Eleven Madison Park has become the first vegan(素食主义的) restaurant to be awarded three Michelin stars.',
              },
              {
                id: 'p1-2',
                marker: 'B',
                text: 'The fine dining establishment received its first three-star Michelin rating in 2011 when the menu was famed for its fancy animal-based dishes.',
              },
              {
                id: 'p1-3',
                marker: 'C',
                text: 'However, last year, the restaurant\'s co-owner and famous chef, Daniel Humm, made the bold decision to remove meat from the menu, citing our unsustainable food system. While cow milk is still served for tea and coffee, the menu is almost 100 percent vegan.',
              },
              {
                id: 'p1-4',
                marker: 'D',
                text: 'At the time, Humm acknowledged the move was risky, admitting that "it wasn\'t clear if guests would come", but called the gamble "a risk worth taking."',
              },
              {
                id: 'p1-5',
                marker: 'E',
                text: '"In view of the climate crisis, I didn\'t want to open the same restaurant," Humm told the Financial Times in an interview. "If we can show the possibilities of eating plant-based food in this setting, it can open a lot of doors" for others to follow.',
              },
              {
                id: 'p1-6',
                marker: 'F',
                text: 'Now, this impressive new accomplishment validates Eleven Madison Park\'s decision to take meat off the menu and embrace plant-based foods, with Michelin\'s 2022 New York guide branding it \'a bold vision of luxury dining\'.',
              },
              {
                id: 'p1-7',
                marker: 'G',
                text: '"We took the jump to transform Eleven Madison Park into a plant-based fine dining restaurant knowing in our hearts this is what we believed in," stated Humm on Instagram. "Last night, we were honored to be awarded three Michelin stars for the 11th year in a row. I am so grateful to the team members who contributed through its nearly 25-year history. We are also grateful to our guests and partners who believed in our vision and encouraged us to push harder."',
              },
              {
                id: 'p1-8',
                marker: 'H',
                text: 'Three Michelin stars is the highest award, given to chefs who are at the peak of their profession. "Their cooking is elevated to an art form and some of their dishes are destined to become classics," reads Michelin\'s website, in a clear nod to plant-based foods\' growing significance in the culinary(烹饪的) world.',
              },
              {
                id: 'p1-9',
                marker: 'I',
                text: '"I think luxury companies have a real role to play and a responsibility," says Humm. "The more creative we are, the more beautiful and delicious our future will be."',
              },
            ],
          },
          {
            id: 'p2',
            title: 'Passage Two',
            paragraphs: [
              {
                id: 'p2-1',
                marker: 'A',
                text: 'With genetic testing becoming increasingly popular, many people are left wondering exactly how accurate it is. Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn(先天的) health conditions, it is important to understand how accurate genetic tests are, and what information we can rely upon.',
              },
              {
                id: 'p2-2',
                marker: 'B',
                text: 'How accurate DNA tests are relies greatly upon the kind of test being taken, on the specific question you ask, and on how complex the genetics behind a trait(特征) is. For example, tests for traits that depend on a single gene provide much more reliable results, because you can see whether a disease-causing trait is present.',
              },
              {
                id: 'p2-3',
                marker: 'C',
                text: 'Ancestry tests claim to reveal our genetic identities. But saying you are 30 percent East Asian or American hardly reflects your real ancestry.',
              },
              {
                id: 'p2-4',
                marker: 'D',
                text: 'What about using DNA tests to discover distant family members? There are tools to compare one\'s DNA with others\' to find distant relatives based on their genetic identification. These kinds of applications are generally accurate. It\'s relatively easy to tell whether two DNA samples belong to close relatives. With distant relatives, results become hazier.',
              },
              {
                id: 'p2-5',
                marker: 'E',
                text: 'Genetic health tests claim to be able to detect certain hereditary(遗传的) diseases, or other health conditions. While certain rare diseases can be easily identified, most potential health conditions cannot be identified by genetic testing alone. The large majority of our traits and diseases also depend upon non-genetic factors, such as lifestyle, the environment, and many others.',
              },
              {
                id: 'p2-6',
                marker: 'F',
                text: 'Genetic tests for multi-factorial traits are often very tricky to interpret. Height, for example, depends on hundreds of genes, each contributing a little to the outcome, together with a bunch of environmental factors. A test can look at many genes at once, but it\'s difficult to predict how they will play together. Then you should also account for non-genetic factors that are not written in the DNA.',
              },
              {
                id: 'p2-7',
                marker: 'G',
                text: 'Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense. At the moment, the scientific bases for these applications are non-existent or incredibly weak.',
              },
            ],
          },
        ],
        questions: [
          {
            id: 'cet4-2025-12-s3-m36',
            number: 36,
            type: 'single',
            stem: 'Hiring managers believe unemployed workers over 45 lack good skills and are less adaptable.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'D',
            explanation: '锚点「技能差+适应力低」。定位原文：“Hiring managers have a strong perception bias against 45+ job candidates — they believe that members of this age group have poor skills and low…”。招聘经理对 45 岁以上的求职者抱有强烈的偏见——他们认为这一年龄群体的成员技能差、适应力低。故选 D 段。',
            evidence: {
              paragraphId: 'p0-4',
              quote: 'Hiring managers have a strong perception bias against 45+ job candidates — they believe that members of this age group have poor skills and low adaptability',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m37',
            number: 37,
            type: 'single',
            stem: 'Switching to a new career is difficult and getting reemployed after a layoff is even tougher.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'A',
            explanation: '锚点「换职业+被裁后再就业」。定位原文：“Changing careers is hard. Getting back into work after you\'ve been laid off is even harder.”。换工作是难的。被裁员后重新找到工作就更难。故选 A 段。',
            evidence: {
              paragraphId: 'p0-1',
              quote: 'Changing careers is hard. Getting back into work after you\'ve been laid off is even harder.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m38',
            number: 38,
            type: 'single',
            stem: 'People from poor neighborhoods tend to have the least interest in retraining.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'J',
            explanation: '锚点「穷社区+最不愿再培训」。定位原文：“The people least interested in retraining are more likely to come from historically disadvantaged communities, more likely to have low incomes, and…”。对再培训最缺乏兴趣的人更可能来自历史上处境不利的社区，更可能收入低，更可能教育程度仅到高中或更低。故选 J 段。',
            evidence: {
              paragraphId: 'p0-10',
              quote: 'The people least interested in retraining are more likely to come from historically disadvantaged communities, more likely to have low incomes, and are more likely to have the least schooling after…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m39',
            number: 39,
            type: 'single',
            stem: 'Hiring managers who are not yet 45 years old seem unwilling to hire people their senior.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'F',
            explanation: '锚点「未满 45 的招聘经理+不愿招更年长者」。定位原文：“Besides, the majority of hiring managers are under 45 — and seem reluctant to hire people older than themselves.”。此外，大多数招聘经理本身不满 45 岁——并且似乎不愿意聘用比他们年长的人。故选 F 段。',
            evidence: {
              paragraphId: 'p0-6',
              quote: 'Besides, the majority of hiring managers are under 45 — and seem reluctant to hire people older than themselves.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m40',
            number: 40,
            type: 'single',
            stem: 'Some analysts find age 45+ jobless workers are most likely to be unemployed for more than a year.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'C',
            explanation: '锚点「失业超过一年」。定位原文：“And if you\'re out of work past the age of 45, there\'s nearly a two in three chance you\'ll be out of work for over a year, they find.”。他们发现，如果你过了 45 岁又失业，那么你将有近三分之二的概率失业超过一年。故选 C 段。',
            evidence: {
              paragraphId: 'p0-3',
              quote: 'And if you\'re out of work past the age of 45, there\'s nearly a two in three chance you\'ll be out of work for over a year, they find.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m41',
            number: 41,
            type: 'single',
            stem: 'People who had succeeded in career change after 45 told a nonprofit organization they owed a great deal to the education and training they had received.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'I',
            explanation: '锚点「成功转职者+告诉非营利组织+归功培训」。定位原文：“Those who had successfully changed careers after 45 told Generation that education and training had been a big help — and that included in-person,…”。那些 45 岁后成功转换职业的人告诉 Generation：教育和培训给了他们很大帮助——这些培训包括面对面的、在岗培训、"非正式学习"以及在线课程——有无证书都算。故选 I 段。',
            evidence: {
              paragraphId: 'p0-9',
              quote: 'Those who had successfully changed careers after 45 told Generation that education and training had been a big help — and that included in-person, on-the-job training, "informal learning," and online…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m42',
            number: 42,
            type: 'single',
            stem: 'Older workers who actively pursue more education and training have a good chance of being hired.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'G',
            explanation: '锚点「积极教育培训+较好录用机会」。定位原文：“Three-quarters of hiring managers said they\'d be more likely to hire an over-45 who had relevant education, training or credentials(文凭).”。四分之三的招聘经理表示，他们更愿意聘用接受过相关教育、培训或拥有相关文凭的 45 岁以上者。故选 G 段。',
            evidence: {
              paragraphId: 'p0-7',
              quote: 'Three-quarters of hiring managers said they\'d be more likely to hire an over-45 who had relevant education, training or credentials(文凭).',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m43',
            number: 43,
            type: 'single',
            stem: 'A new study finds that more education and training helps midcareer individuals find a new job.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'B',
            explanation: '锚点「一项新研究+教育培训助力中年人找工作」。定位原文：“But the one thing that can really make a difference? More education and training. These are the results from a new study by Generation, a nonprofit…”。但真正能起作用的是什么呢？更多的教育和培训。这是来自 Generation——一家由前麦肯锡顾问创立的非营利组织——的一项新研究的结果。故选 B 段。',
            evidence: {
              paragraphId: 'p0-2',
              quote: 'But the one thing that can really make a difference? More education and training. These are the results from a new study by Generation, a nonprofit founded by former McKinsey consultants.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m44',
            number: 44,
            type: 'single',
            stem: 'Owing to the internet, it is now more convenient than ever to receive training in new skills.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'L',
            explanation: '锚点「互联网+训练新技能从未如此便捷」。定位原文：“And it has never been easier or cheaper to gain instruction in new skills, thanks to the internet.”。多亏了互联网，学习新技能从未如此容易或便宜。故选 L 段。',
            evidence: {
              paragraphId: 'p0-12',
              quote: 'And it has never been easier or cheaper to gain instruction in new skills, thanks to the internet.',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-m45',
            number: 45,
            type: 'single',
            stem: 'People over 45 stimulated by training suffer shorter periods of unemployment, get more job offers and have greater satisfaction in them.',
            options: [
              {
                key: 'A',
                text: 'Ageism and long-term unemployment are most damaging for…',
              },
              {
                key: 'B',
                text: 'But the one thing that can really make a difference?',
              },
              {
                key: 'C',
                text: '"Older midcareer workers … make up the bulk of the…',
              },
              {
                key: 'D',
                text: 'A substantial part of this, they report, is "widespread…',
              },
              {
                key: 'E',
                text: 'The survey results are remarkable.',
              },
              {
                key: 'F',
                text: 'Their biggest fears about hiring those over 45?',
              },
              {
                key: 'G',
                text: 'But here\'s the good news.',
              },
              {
                key: 'H',
                text: '"Midcareer switchers overwhelmingly say that training…',
              },
              {
                key: 'I',
                text: 'Hiring managers said training was three times more likely…',
              },
              {
                key: 'J',
                text: 'If they think we\'re too old to learn new skills after we\'re…',
              },
              {
                key: 'K',
                text: 'Many years ago, I wrote about a study which found that…',
              },
              {
                key: 'L',
                text: 'We can rail against "ageism" all we like.',
              },
              {
                key: 'M',
                text: 'Bottom line?',
              },
            ],
            answer: 'H',
            explanation: '锚点「受培训刺激者+三项收益」。定位原文：“And when they asked over-45 candidates about their attitudes, they found that "those who are excited by training are unemployed for less time,…”。当他们询问 45 岁以上候选人的态度时，发现"那些因培训而兴奋的人失业时间更短、获得更多录用、对所收到的录用更满意"。故选 H 段。',
            evidence: {
              paragraphId: 'p0-8',
              quote: 'And when they asked over-45 candidates about their attitudes, they found that "those who are excited by training are unemployed for less time, receive more job offers, and are more satisfied by the…',
            },
            score: 1,
          },
          {
            id: 'cet4-2025-12-s3-r46',
            number: 46,
            type: 'single',
            stem: 'What do we learn about New York\'s Eleven Madison Park?',
            options: [
              {
                key: 'A',
                text: 'It is the first vegan restaurant to receive the highest Michelin rating.',
              },
              {
                key: 'B',
                text: 'It is the first restaurant in the city to remove meat from its menu.',
              },
              {
                key: 'C',
                text: 'It was famed throughout the U.S. for its fancy regional dishes.',
              },
              {
                key: 'D',
                text: 'It was established as a three-star Michelin restaurant in 2011.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“New York\'s Eleven Madison Park has become the first vegan(素食主义的) restaurant to be awarded three Michelin stars.”。纽约的 Eleven Madison Park 成为首家获颁米其林三星的素食餐厅。故选 A。',
            evidence: {
              paragraphId: 'p1-1',
              quote: 'New York\'s Eleven Madison Park has become the first vegan(素食主义的) restaurant to be awarded three Michelin stars.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r47',
            number: 47,
            type: 'single',
            stem: 'Why did Daniel Humm decide to remove meat from the menu of his restaurant?',
            options: [
              {
                key: 'A',
                text: 'To encourage more customers to be vegan.',
              },
              {
                key: 'B',
                text: 'To contribute to a sustainable food system.',
              },
              {
                key: 'C',
                text: 'To show the appeal of a plant-based menu.',
              },
              {
                key: 'D',
                text: 'To strive for the three-star Michelin rating.',
              },
            ],
            answer: 'B',
            explanation: '（细节题）定位原文：“However, last year, the restaurant\'s co-owner and famous chef, Daniel Humm, made the bold decision to remove meat from the menu, citing our…”。然而，去年餐厅的联合所有者兼名厨 Daniel Humm 做出了大胆决定，将肉从菜单中撤下，理由是我们的食物体系不可持续。故选 B。',
            evidence: {
              paragraphId: 'p1-3',
              quote: 'However, last year, the restaurant\'s co-owner and famous chef, Daniel Humm, made the bold decision to remove meat from the menu, citing our unsustainable food system.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r48',
            number: 48,
            type: 'single',
            stem: 'What did Daniel Humm think of his move to a meat-free menu?',
            options: [
              {
                key: 'A',
                text: 'It was a worthwhile effort even though he was unsure of its success.',
              },
              {
                key: 'B',
                text: 'It would set a model for many more restaurants to follow.',
              },
              {
                key: 'C',
                text: 'It was a mad gamble few chefs in the fine dining world would risk taking.',
              },
              {
                key: 'D',
                text: 'It would prove a right step to take in today\'s catering business.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“At the time, Humm acknowledged the move was risky, admitting that "it wasn\'t clear if guests would come", but called the gamble "a risk worth taking."”。当时 Humm 承认此举有风险，承认不清楚客人是否还会来，但他把这场赌博称作一次值得冒的险。故选 A。',
            evidence: {
              paragraphId: 'p1-4',
              quote: 'At the time, Humm acknowledged the move was risky, admitting that "it wasn\'t clear if guests would come", but called the gamble "a risk worth taking."',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r49',
            number: 49,
            type: 'single',
            stem: 'What does Michelin\'s 2022 New York guide say about Eleven Madison Park\'s decision?',
            options: [
              {
                key: 'A',
                text: 'It elevates the restaurant\'s cooking to an art form.',
              },
              {
                key: 'B',
                text: 'It proves the validity of ratings awarded by Michelin.',
              },
              {
                key: 'C',
                text: 'It shows a daring foresight regarding future fine dining.',
              },
              {
                key: 'D',
                text: 'It is an effort to transform the restaurant into a luxury one.',
              },
            ],
            answer: 'C',
            explanation: '（细节题）定位原文：“Now, this impressive new accomplishment validates Eleven Madison Park\'s decision to take meat off the menu and embrace plant-based foods, with…”。如今，这一令人瞩目的新成就印证了 Eleven Madison Park 撤肉、拥抱植物饮食的决定；米其林 2022 纽约指南将其誉为奢华餐饮的大胆愿景。故选 C。',
            evidence: {
              paragraphId: 'p1-6',
              quote: 'Now, this impressive new accomplishment validates Eleven Madison Park\'s decision to take meat off the menu and embrace plant-based foods, with Michelin\'s 2022 New York guide branding it \'a bold…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r50',
            number: 50,
            type: 'single',
            stem: 'What does the awarding of three Michelin stars to Eleven Madison Park indicate?',
            options: [
              {
                key: 'A',
                text: 'An optimistic vision of vegan foods becoming mainstream.',
              },
              {
                key: 'B',
                text: 'A greater responsibility for the culinary world to undertake.',
              },
              {
                key: 'C',
                text: 'A strong incentive for more restaurants to offer healthier foods to their customers.',
              },
              {
                key: 'D',
                text: 'An explicit recognition of the rising importance of restaurants serving vegan foods. Passage Two Questions 51 to 55 are based on the following passage. With genetic testing becoming increasingly popular, many people are left wondering exactly how accurate it is. Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn(先天的) health conditions, it is important to understand how accurate genetic tests are, and what information we can rely upon. How accurate DNA tests are relies greatly upon the kind of test being taken, on the specific question you ask, and on how complex the genetics behind a trait(特征) is. For example, tests for traits that depend on a single gene provide much more reliable results, because you can see whether a disease-causing trait is present. Ancestry tests claim to reveal our genetic identities. But saying you are 30 percent East Asian or American hardly reflects your real ancestry. What about using DNA tests to discover distant family members? There are tools to compare one\'s DNA with others\' to find distant relatives based on their genetic identification. These kinds of applications are generally accurate. It\'s relatively easy to tell whether two DNA samples belong to close relatives. With distant relatives, results become hazier. Genetic health tests claim to be able to detect certain hereditary(遗传的) diseases, or other health conditions. While certain rare diseases can be easily identified, most potential health conditions cannot be identified by genetic testing alone. The large majority of our traits and diseases also depend upon non-genetic factors, such as lifestyle, the environment, and many others. Genetic tests for multi-factorial traits are often very tricky to interpret. Height, for example, depends on hundreds of genes, each contributing a little to the outcome, together with a bunch of environmental factors. A test can look at many genes at once, but it\'s difficult to predict how they will play together. Then you should also account for non-genetic factors that are not written in the DNA. Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense. At the moment, the scientific bases for these applications are non-existent or incredibly weak.',
              },
            ],
            answer: 'D',
            explanation: '（推断题）定位原文：“"Their cooking is elevated to an art form and some of their dishes are destined to become classics," reads Michelin\'s website, in a clear nod to…”。米其林官网写道：他们的烹饪被提升为一种艺术形式，他们的部分菜肴注定将成为经典；这是对植物饮食在烹饪界日益增长的重要性的明确认可。故选 D。',
            evidence: {
              paragraphId: 'p1-8',
              quote: '"Their cooking is elevated to an art form and some of their dishes are destined to become classics," reads Michelin\'s website, in a clear nod to plant-based foods\' growing significance in the…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r51',
            number: 51,
            type: 'single',
            stem: 'What does the passage say is of importance regarding genetic tests?',
            options: [
              {
                key: 'A',
                text: 'Knowing their accuracy.',
              },
              {
                key: 'B',
                text: 'Evaluating their applicability.',
              },
              {
                key: 'C',
                text: 'Utilizing the information they provide.',
              },
              {
                key: 'D',
                text: 'Weighing the consequences they have.',
              },
            ],
            answer: 'A',
            explanation: '（细节题）定位原文：“Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn health conditions, it is important to…”。无论你是为了构建延伸的 DNA 家谱树而做基因测试，还是想获得关于先天健康状况的精确信息，搞清楚基因检测到底有多准、我们可以依赖哪些信息，都是很重要的。故选 A。',
            evidence: {
              paragraphId: 'p2-1',
              quote: 'Whether you are taking a DNA test to build your extended DNA family tree, or want precise information on inborn health conditions, it is important to understand how accurate genetic tests are, and…',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r52',
            number: 52,
            type: 'single',
            stem: 'What kind of genetic tests tend to be comparatively reliable?',
            options: [
              {
                key: 'A',
                text: 'Those complex enough to reveal the genetics behind a trait.',
              },
              {
                key: 'B',
                text: 'Those looking for traits responsible for certain diseases.',
              },
              {
                key: 'C',
                text: 'Those focusing on the specific questions being asked.',
              },
              {
                key: 'D',
                text: 'Those looking for traits determined by a single gene.',
              },
            ],
            answer: 'D',
            explanation: '（细节题）定位原文：“For example, tests for traits that depend on a single gene provide much more reliable results, because you can see whether a disease-causing trait is…”。举个例子，对于那些只依赖单个基因的性状，相关检测能给出准确得多的结果，因为你可以直接看到致病性状到底存不存在。故选 D。',
            evidence: {
              paragraphId: 'p2-2',
              quote: 'For example, tests for traits that depend on a single gene provide much more reliable results, because you can see whether a disease-causing trait is present.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r53',
            number: 53,
            type: 'single',
            stem: 'What do we learn about genetic health tests from the passage?',
            options: [
              {
                key: 'A',
                text: 'They are unable to identify certain hereditary diseases by themselves.',
              },
              {
                key: 'B',
                text: 'They are generally unable to separate genetic and non-genetic factors.',
              },
              {
                key: 'C',
                text: 'They cannot independently identify the majority of potential diseases.',
              },
              {
                key: 'D',
                text: 'They cannot tell apart the impact of lifestyle and that of the environment.',
              },
            ],
            answer: 'C',
            explanation: '（细节题）定位原文：“While certain rare diseases can be easily identified, most potential health conditions cannot be identified by genetic testing alone.”。虽然某些罕见疾病能轻松识别出来，但大多数潜在的健康问题靠基因检测一项是查不出来的。故选 C。',
            evidence: {
              paragraphId: 'p2-5',
              quote: 'While certain rare diseases can be easily identified, most potential health conditions cannot be identified by genetic testing alone.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r54',
            number: 54,
            type: 'single',
            stem: 'What makes genetic tests for multi-factorial traits tricky to interpret?',
            options: [
              {
                key: 'A',
                text: 'The challenge in determining the role of each individual gene.',
              },
              {
                key: 'B',
                text: 'The difficulty of foretelling how the various genes will interact.',
              },
              {
                key: 'C',
                text: 'The difficulty of telling genetic factors from environmental ones.',
              },
              {
                key: 'D',
                text: 'The enormous work to identify the hundreds of genes involved.',
              },
            ],
            answer: 'B',
            explanation: '（细节题）定位原文：“A test can look at many genes at once, but it\'s difficult to predict how they will play together.”。一次基因检测可以同时查看许多基因，但很难预测这些基因放在一起会怎么"协作"。故选 B。',
            evidence: {
              paragraphId: 'p2-6',
              quote: 'A test can look at many genes at once, but it\'s difficult to predict how they will play together.',
            },
            score: 2,
          },
          {
            id: 'cet4-2025-12-s3-r55',
            number: 55,
            type: 'single',
            stem: 'What does the passage say about DNA tests to predict personality or talents?',
            options: [
              {
                key: 'A',
                text: 'They are solid scientific bases for application.',
              },
              {
                key: 'B',
                text: 'They are helpful in finding a romantic match.',
              },
              {
                key: 'C',
                text: 'They do not look promising at the moment.',
              },
              {
                key: 'D',
                text: 'They do not make any sense at present.',
              },
            ],
            answer: 'D',
            explanation: '（态度题）定位原文：“Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense. At the…”。那些声称能帮你找到完美恋爱对象的检测、以及那些号称能根据 DNA 预测性格或才能的检测，都是纯粹的胡说八道。眼下，这些应用的科学依据要么压根不存在，要么薄弱得离谱。故选 D。',
            evidence: {
              paragraphId: 'p2-7',
              quote: 'Tests that offer to find your perfect romantic match and those claiming to predict personality or talents based on your DNA are pure nonsense. At the moment, the scientific bases for these…',
            },
            score: 2,
          },
        ],
      },
      {
        id: 'translation',
        kind: 'translation',
        title: 'Part IV Translation',
        instructions: 'Directions: For this part, you are allowed 30 minutes to translate a passage from Chinese into English. You should write your answer on Answer Sheet 2.',
        minutes: 30,
        questions: [
          {
            id: 'cet4-2025-12-s3-t1',
            number: 1,
            type: 'translation',
            stem: '中国政府十分重视绿色经济的发展。通过加强森林资源保护、加大污染治理力度等一系列措施，许多地区的生态环境得到了显著改善。绿水青山 (lucid waters and lush mountains) 促进了当地的旅游、健康等产业的发展，创造了可观的经济效益。如今，生态环境与人类社会和谐共存的观念在中国已深入人心。绿色经济的推进不仅能为中国可持续发展做出贡献，也为全球环境保护提供了宝贵经验。',
            answer: '见参考',
            explanation: '翻译解析：中国发展绿色经济的客观介绍。全段是一篇典型的「中国社会／经济成就」客观介绍：开篇 中国政府十分重视绿色经济的发展 就摆出态度，随后讲措施、成效、观念与意义，通篇陈述当下普遍存在的事实与现状，没有讲某段历史故事。这类语体决定了下面要用「陈述当前事实」的时态去翻，用词偏正式、书面。 时态：一般现在时。通篇在客观陈述「现在的事实与现状」：政府重视、绿水青山促进产业、观念已深入人心、绿色经济能做贡献。这些都是当下成立、并非过去某一刻发生完即结束的事，所以全篇以一般现在时为基调。仅个别表「已经完成」的句子(如 生态环境得到了显著改善)才偏离为现在完成时。',
            score: 15,
          },
        ],
        reference: {
          translation: 'The Chinese government attaches great importance to the development of the green economy. Through a series of measures such as strengthening forest resource protection and intensifying pollution control, the ecological environment in many regions has improved remarkably. Lucid waters and lush mountains have promoted the development of local industries such as tourism and health care, generating considerable economic benefits. Today, the idea that ecology and human society can coexist in harmony has taken deep root in China. The promotion of the green economy not only contributes to China\'s sustainable development but also provides valuable experience for global environmental protection.',
        },
      },
    ],
  }
};

export default content;
