/**
 * data/zh/talk-scenarios.js
 * Dữ liệu kịch bản đàm thoại nhập vai Luyện nói (Talk Practice) HSK1
 * Hỗ trợ 8 tình huống giao tiếp thực tế với các lượt hội thoại sinh động.
 */

(function () {
  'use strict';

  const TALK_SCENARIOS = [
    // ------------------------------------------------------------------------
    // 1. Chào hỏi làm quen
    // ------------------------------------------------------------------------
    {
      id: 'greeting',
      title: 'Chào hỏi làm quen',
      description: 'Gặp gỡ bạn mới lần đầu, chào hỏi, hỏi thăm sức khỏe và làm quen bạn bè.',
      topic: 'Chào hỏi',
      difficulty: 'HSK 1',
      npc: {
        name: 'Vương Lệ',
        role: 'Bạn học người Bắc Kinh',
        avatarColor: '#2563EB',
        initials: 'VL',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#DBEAFE"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#2563EB"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '你好！很高兴认识你。',
            py: 'Nǐ hǎo! Hěn gāoxìng rènshi nǐ.',
            vi: 'Chào bạn! Rất vui được quen biết bạn.'
          },
          user: {
            goal: 'Hãy chào lại và nói bạn cũng rất vui được làm quen',
            answers: [
              { zh: '你好！我也很高兴认识你。', py: 'Nǐ hǎo! Wǒ yě hěn gāoxìng rènshi nǐ.', vi: 'Chào bạn! Tôi cũng rất vui được làm quen.' },
              { zh: '你好！认识你很高兴。', py: 'Nǐ hǎo! Rènshi nǐ hěn gāoxìng.', vi: 'Chào bạn! Quen biết bạn rất vui.' }
            ],
            accept: {
              anyOf: ['你好', '高兴', '认识'],
              pattern: /(?:你好|很高兴|认识你)/i
            },
            next: 't2',
            fallback: '不好意思，我没听清楚，请再说一次。'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '你今天怎么样？身体好吗？',
            py: 'Nǐ jīntiān zěnmeyàng? Shēntǐ hǎo ma?',
            vi: 'Hôm nay bạn thế nào? Sức khỏe tốt không?'
          },
          user: {
            goal: 'Hãy trả lời rằng bạn rất khỏe và hỏi lại bạn ấy',
            answers: [
              { zh: '我很好，你呢？', py: 'Wǒ hěn hǎo, nǐ ne?', vi: 'Tôi rất khỏe, còn bạn thì sao?' },
              { zh: '我身体很好，谢谢你。', py: 'Wǒ shēntǐ hěn hǎo, xièxie nǐ.', vi: 'Sức khỏe tôi rất tốt, cảm ơn bạn.' }
            ],
            accept: {
              anyOf: ['好', '很', '身体'],
              pattern: /(?:我很好|身体很好|好)/i
            },
            next: 't3',
            fallback: '你说什么？我没太听懂。'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '我也很好！他是我的朋友大卫。',
            py: 'Wǒ yě hěn hǎo! Tā shì wǒ de péngyou Dàwèi.',
            vi: 'Tôi cũng rất khỏe! Đây là bạn tôi, David.'
          },
          user: {
            goal: 'Hãy chào David và nói rất vui được quen biết',
            answers: [
              { zh: '你好大卫，很高兴认识你！', py: 'Nǐ hǎo Dàwèi, hěn gāoxìng rènshi nǐ!', vi: 'Chào David, rất vui được quen bạn!' },
              { zh: '大卫你好！', py: 'Dàwèi nǐ hǎo!', vi: 'Chào David!' }
            ],
            accept: {
              anyOf: ['大卫', '你好', '认识'],
              pattern: /(?:大卫|你好|认识)/i
            },
            next: 't4',
            fallback: '请跟大卫打个招呼吧！'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '你们现在去哪儿？去学校吗？',
            py: 'Nǐmen xiànzài qù nǎr? Qù xuéxiào ma?',
            vi: 'Các bạn bây giờ đi đâu? Đi đến trường à?'
          },
          user: {
            goal: 'Hãy nói bạn đi đến trường học hoặc đi cửa hàng',
            answers: [
              { zh: '我去学校看书。', py: 'Wǒ qù xuéxiào kàn shū.', vi: 'Tôi đến trường đọc sách.' },
              { zh: '我不去学校，我去商店。', py: 'Wǒ bú qù xuéxiào, wǒ qù shāngdiàn.', vi: 'Tôi không đến trường, tôi đến cửa hàng.' },
              { zh: '我们去学校。', py: 'Wǒmen qù xuéxiào.', vi: 'Chúng tôi đến trường học.' }
            ],
            accept: {
              anyOf: ['学校', '去', '商店'],
              pattern: /(?:学校|去|商店)/i
            },
            next: 't5',
            fallback: '不好意思，你们要去哪里呢？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '好的，那我们明天见！',
            py: 'Hǎo de, nà wǒmen míngtiān jiàn!',
            vi: 'Được rồi, vậy ngày mai gặp nhé!'
          },
          user: {
            goal: 'Hãy chào tạm biệt hoặc hẹn ngày mai gặp',
            answers: [
              { zh: '好的，明天见！', py: 'Hǎo de, míngtiān jiàn!', vi: 'Được, mai gặp lại nhé!' },
              { zh: '再见！', py: 'Zàijiàn!', vi: 'Tạm biệt!' }
            ],
            accept: {
              anyOf: ['明天见', '再见', '好的'],
              pattern: /(?:明天见|再见|好)/i
            },
            next: null,
            fallback: '请再说一遍好吗？'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 2. Giới thiệu bản thân
    // ------------------------------------------------------------------------
    {
      id: 'intro',
      title: 'Giới thiệu bản thân',
      description: 'Giới thiệu tên của bạn, quốc tịch Việt Nam và nghề nghiệp.',
      topic: 'Làm quen',
      difficulty: 'HSK 1',
      npc: {
        name: 'Trần Lão Sư',
        role: 'Giáo viên phụ trách lớp',
        avatarColor: '#059669',
        initials: 'TL',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#D1FAE5"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#059669"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '你好！请问你叫什么名字？',
            py: 'Nǐ hǎo! Qǐngwèn nǐ jiào shénme míngzi?',
            vi: 'Xin chào! Xin hỏi bạn tên là gì?'
          },
          user: {
            goal: 'Hãy nói tên của bạn (ví dụ: Tôi tên là Lý Minh)',
            answers: [
              { zh: '我叫李明。', py: 'Wǒ jiào Lǐ Míng.', vi: 'Tôi tên là Lý Minh.' },
              { zh: '我叫王小明。', py: 'Wǒ jiào Wáng Xiǎomíng.', vi: 'Tôi tên là Vương Tiểu Minh.' },
              { zh: '我的名字叫李明。', py: 'Wǒ de míngzi jiào Lǐ Míng.', vi: 'Tên của tôi là Lý Minh.' }
            ],
            accept: {
              pattern: /(?:我叫|我是|名字叫|叫)\s*([^\s,，。！？]+)/i,
              required: ['叫']
            },
            next: 't2',
            fallback: '不好意思，请再说一遍你的名字。'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '你好！请问你是哪国人？',
            py: 'Nǐ hǎo! Qǐngwèn nǐ shì nǎ guó rén?',
            vi: 'Chào bạn! Xin hỏi bạn là người nước nào?'
          },
          user: {
            goal: 'Hãy nói bạn là người Việt Nam',
            answers: [
              { zh: '我是越南人。', py: 'Wǒ shì Yuènán rén.', vi: 'Tôi là người Việt Nam.' },
              { zh: '我是越南留学生。', py: 'Wǒ shì Yuènán liúxuéshēng.', vi: 'Tôi là du học sinh Việt Nam.' }
            ],
            accept: {
              pattern: /(?:我是)?\s*越南\s*(?:人|留学生)?/i,
              required: ['越南']
            },
            next: 't3',
            fallback: '不好意思，你是哪国人呢？'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '很高兴认识你！你是学生还是老师？',
            py: 'Hěn gāoxìng rènshi nǐ! Nǐ shì xuésheng háishi lǎoshī?',
            vi: 'Rất vui được quen bạn! Bạn là học sinh hay giáo viên?'
          },
          user: {
            goal: 'Hãy nói bạn là học sinh (hoặc giáo viên)',
            answers: [
              { zh: '我是学生，我在学习汉语。', py: 'Wǒ shì xuésheng, wǒ zài xuéxí Hànyǔ.', vi: 'Tôi là học sinh, tôi đang học tiếng Hán.' },
              { zh: '我是学生。', py: 'Wǒ shì xuésheng.', vi: 'Tôi là học sinh.' },
              { zh: '我是老师。', py: 'Wǒ shì lǎoshī.', vi: 'Tôi là giáo viên.' }
            ],
            accept: {
              anyOf: ['学生', '老师', '工作'],
              pattern: /(?:学生|老师|工作)/i
            },
            next: 't4',
            fallback: '你的工作是什么呢？请再说一遍。'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '你学习汉语多长时间了？',
            py: 'Nǐ xuéxí Hànyǔ duō cháng shíjiān le?',
            vi: 'Bạn học tiếng Hán được bao lâu rồi?'
          },
          user: {
            goal: 'Hãy nói bạn học được ba tháng (hoặc một năm)',
            answers: [
              { zh: '我学了三个月。', py: 'Wǒ xué le sān gè yuè.', vi: 'Tôi học được ba tháng rồi.' },
              { zh: '我学了一年。', py: 'Wǒ xué le yì nián.', vi: 'Tôi học được một năm rồi.' },
              { zh: '我刚刚开始学。', py: 'Wǒ gānggang kāishǐ xué.', vi: 'Tôi vừa mới bắt đầu học.' }
            ],
            accept: {
              anyOf: ['月', '年', '学', '天'],
              pattern: /(?:月|年|天|刚刚|开始)/i
            },
            next: 't5',
            fallback: '不好意思，你说学了多久？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '你汉语说得真好！欢迎你来中国。',
            py: 'Nǐ Hànyǔ shuō de zhēn hǎo! Huānyíng nǐ lái Zhōngguó.',
            vi: 'Bạn nói tiếng Hán giỏi thật đấy! Hoan nghênh bạn đến Trung Quốc.'
          },
          user: {
            goal: 'Hãy cảm ơn lời khen và bày tỏ sự vui mừng',
            answers: [
              { zh: '哪里哪里，谢谢你！', py: 'Nǎlǐ nǎlǐ, xièxie nǐ!', vi: 'Đâu có đâu có, cảm ơn bạn!' },
              { zh: '谢谢你，我也很高兴！', py: 'Xièxie nǐ, wǒ yě hěn gāoxìng!', vi: 'Cảm ơn bạn, tôi cũng rất vui!' }
            ],
            accept: {
              anyOf: ['谢谢', '哪里', '高兴'],
              pattern: /(?:谢谢|哪里|高兴)/i
            },
            next: null,
            fallback: '你说什么？请再说一次。'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 3. Gọi món ở quán ăn (Có rẽ nhánh Trà / Cà phê)
    // ------------------------------------------------------------------------
    {
      id: 'restaurant',
      title: 'Gọi món ở quán ăn',
      description: 'Vào quán ăn, gọi món mì/cơm và chọn đồ uống yêu thích (trà hoặc cà phê).',
      topic: 'Ăn uống',
      difficulty: 'HSK 1',
      npc: {
        name: 'Tiểu Trương',
        role: 'Nhân viên phục vụ quán ăn',
        avatarColor: '#D97706',
        initials: 'TT',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#FEF3C7"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#D97706"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '您好，欢迎光临！请问您想吃什么？',
            py: 'Nín hǎo, huānyíng guānglín! Qǐngwèn nín xiǎng chī shénme?',
            vi: 'Xin chào, hoan nghênh quý khách! Xin hỏi quý khách muốn ăn gì?'
          },
          user: {
            goal: 'Hãy nói bạn muốn ăn mì sợi hoặc cơm',
            answers: [
              { zh: '我想吃面条。', py: 'Wǒ xiǎng chī miàntiáo.', vi: 'Tôi muốn ăn mì sợi.' },
              { zh: '我想吃米饭和中国菜。', py: 'Wǒ xiǎng chī mǐfàn hé Zhōngguó cài.', vi: 'Tôi muốn ăn cơm và món Trung Quốc.' },
              { zh: '给我一碗面条。', py: 'Gěi wǒ yì wǎn miàntiáo.', vi: 'Cho tôi một bát mì.' }
            ],
            accept: {
              anyOf: ['面条', '米饭', '菜', '包子', '吃'],
              pattern: /(?:面条|米饭|菜|包子|吃)/i
            },
            next: 't2',
            fallback: '不好意思，您想吃什么？请再说一遍。'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '好的！您想喝茶还是喝咖啡？',
            py: 'Hǎo de! Nín xiǎng hē chá háishi hē kāfēi?',
            vi: 'Được ạ! Quý khách muốn uống trà hay uống cà phê?'
          },
          user: {
            goal: 'Hãy chọn uống trà hoặc cà phê (Tôi uống trà / Tôi uống cà phê)',
            answers: [
              { zh: '我想喝茶。', py: 'Wǒ xiǎng hē chá.', vi: 'Tôi muốn uống trà.' },
              { zh: '我想喝咖啡。', py: 'Wǒ xiǎng hē kāfēi.', vi: 'Tôi muốn uống cà phê.' }
            ],
            accept: {
              anyOf: ['茶', '咖啡', '喝'],
              pattern: /(?:茶|咖啡|喝)/i
            },
            branch: {
              choices: [
                { match: /茶|chá/i, next: 't3_tea' },
                { match: /咖啡|kāfēi/i, next: 't3_coffee' }
              ],
              defaultNext: 't3_tea'
            },
            next: 't3_tea',
            fallback: '您想喝茶还是咖啡呢？请再说一次。'
          }
        },
        t3_tea: {
          id: 't3_tea',
          npc: {
            zh: '好的，中国绿茶很香。您要热茶还是冰茶？',
            py: 'Hǎo de, Zhōngguó lǜchá hěn xiāng. Nín yào rè chá háishi bīng chá?',
            vi: 'Được ạ, trà xanh Trung Quốc rất thơm. Quý khách muốn trà nóng hay trà đá?'
          },
          user: {
            goal: 'Hãy nói bạn muốn một cốc trà nóng hoặc trà đá',
            answers: [
              { zh: '我要一杯热茶。', py: 'Wǒ yào yì bēi rè chá.', vi: 'Cho tôi một cốc trà nóng.' },
              { zh: '一杯冰茶，谢谢。', py: 'Yì bēi bīng chá, xièxie.', vi: 'Một cốc trà đá, cảm ơn.' }
            ],
            accept: {
              anyOf: ['热', '冰', '杯', '茶'],
              pattern: /(?:热|冰|杯|茶)/i
            },
            next: 't4',
            fallback: '您要热茶还是冰茶呢？'
          }
        },
        t3_coffee: {
          id: 't3_coffee',
          npc: {
            zh: '好的，热咖啡马上来。您要加牛奶吗？',
            py: 'Hǎo de, rè kāfēi mǎshàng lái. Nín yào jiā niúnǎi ma?',
            vi: 'Được ạ, cà phê nóng có ngay. Quý khách có thêm sữa không?'
          },
          user: {
            goal: 'Hãy nói không cần sữa hoặc cho chút sữa',
            answers: [
              { zh: '不要牛奶，谢谢。', py: 'Bú yào niúnǎi, xièxie.', vi: 'Không cần sữa, cảm ơn.' },
              { zh: '加一点牛奶，谢谢。', py: 'Jiā yìdiǎn niúnǎi, xièxie.', vi: 'Thêm một chút sữa, cảm ơn.' }
            ],
            accept: {
              anyOf: ['牛奶', '不要', '加', '要'],
              pattern: /(?:牛奶|不要|要|加)/i
            },
            next: 't4',
            fallback: '您要加牛奶吗？请再说一遍。'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '好的，记下了。您还要别的菜吗？',
            py: 'Hǎo de, jì xià le. Nín hái yào bié de cài ma?',
            vi: 'Dạ được, tôi ghi lại rồi. Quý khách có cần thêm món nào khác không?'
          },
          user: {
            goal: 'Hãy nói không cần nữa, thế là đủ rồi',
            answers: [
              { zh: '不要了，这些够了，谢谢。', py: 'Bú yào le, zhèxiē gòu le, xièxie.', vi: 'Không cần nữa, chừng này đủ rồi, cảm ơn.' },
              { zh: '不要别的了，谢谢。', py: 'Bú yào bié de le, xièxie.', vi: 'Không cần món khác nữa, cảm ơn.' }
            ],
            accept: {
              anyOf: ['不要', '够', '谢谢', '没有'],
              pattern: /(?:不要|够|没有|谢谢)/i
            },
            next: 't5',
            fallback: '请问还要别的吗？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '您的菜和饮品齐了，请慢用！',
            py: 'Nín de cài hé yǐnpǐn qí le, qǐng màn yòng!',
            vi: 'Món ăn và thức uống của quý khách đã đủ rồi, chúc quý khách ngon miệng!'
          },
          user: {
            goal: 'Hãy cảm ơn và khen món ăn rất ngon',
            answers: [
              { zh: '太好吃了，非常感谢！', py: 'Tài hǎochī le, fēicháng gǎnxiè!', vi: 'Ngon quá, vô cùng cảm ơn bạn!' },
              { zh: '谢谢服务员！', py: 'Xièxie fúwùyuán!', vi: 'Cảm ơn bạn phục vụ!' }
            ],
            accept: {
              anyOf: ['好吃', '谢谢', '感谢'],
              pattern: /(?:好吃|谢谢|感谢)/i
            },
            next: null,
            fallback: '请慢用！'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 4. Mua hoa quả hỏi giá & mặc cả
    // ------------------------------------------------------------------------
    {
      id: 'fruit',
      title: 'Mua hoa quả & mặc cả',
      description: 'Hỏi giá hoa quả, thương lượng giảm giá và thanh toán tiền.',
      topic: 'Mua sắm',
      difficulty: 'HSK 1',
      npc: {
        name: 'Bác Lưu',
        role: 'Chủ quầy hoa quả tươi',
        avatarColor: '#DC2626',
        initials: 'BL',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#FEE2E2"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#DC2626"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '你好！今天的水果很新鲜，你想买什么？',
            py: 'Nǐ hǎo! Jīntiān de shuǐguǒ hěn xīnxiān, nǐ xiǎng mǎi shénme?',
            vi: 'Chào bạn! Hoa quả hôm nay tươi lắm, bạn muốn mua gì?'
          },
          user: {
            goal: 'Hãy nói muốn mua táo và hỏi giá bán',
            answers: [
              { zh: '我想买苹果，这个苹果多少钱一斤？', py: 'Wǒ xiǎng mǎi píngguǒ, zhè ge píngguǒ duōshao qián yì jīn?', vi: 'Tôi muốn mua táo, táo này bao nhiêu tiền một cân?' },
              { zh: '苹果怎么卖？', py: 'Píngguǒ zěnme mài?', vi: 'Táo bán thế nào vậy?' }
            ],
            accept: {
              anyOf: ['苹果', '多少钱', '怎么卖', '买'],
              pattern: /(?:苹果|多少钱|怎么卖|买)/i
            },
            next: 't2',
            fallback: '你想买什么水果呢？请再说一遍。'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '苹果一斤六块钱，很甜的！',
            py: 'Píngguǒ yì jīn liù kuài qián, hěn tián de!',
            vi: 'Táo sáu tệ một cân, ngọt lắm đấy!'
          },
          user: {
            goal: 'Hãy chê đắt và mặc cả (Đắt quá, rẻ một chút đi)',
            answers: [
              { zh: '太贵了，便宜一点吧！', py: 'Tài guì le, piányi yìdiǎn ba!', vi: 'Đắt quá rồi, rẻ hơn một chút đi!' },
              { zh: '太贵了，五块钱一斤行不行？', py: 'Tài guì le, wǔ kuài qián yì jīn xíng bu xíng?', vi: 'Đắt quá, năm tệ một cân được không?' }
            ],
            accept: {
              anyOf: ['贵', '便宜', '行不行'],
              pattern: /(?:贵|便宜|行不行)/i
            },
            next: 't3',
            fallback: '苹果很甜的，你说什么？'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '好吧，算你五块钱一斤。你要几斤？',
            py: 'Hǎo ba, suàn nǐ wǔ kuài qián yì jīn. Nǐ yào jǐ jīn?',
            vi: 'Thôi được, tính bạn năm tệ một cân. Bạn lấy mấy cân?'
          },
          user: {
            goal: 'Hãy nói số lượng muốn mua (cho tôi hai cân)',
            answers: [
              { zh: '我要两斤，请帮我挑好的。', py: 'Wǒ yào liǎng jīn, qǐng bāng wǒ tiāo hǎo de.', vi: 'Cho tôi hai cân, chọn giúp tôi quả ngon nhé.' },
              { zh: '我要三斤。', py: 'Wǒ yào sān jīn.', vi: 'Cho tôi ba cân.' }
            ],
            accept: {
              anyOf: ['斤', '两', '三', '要'],
              pattern: /(?:斤|两|三|要)/i
            },
            next: 't4',
            fallback: '你要买几斤呢？'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '给你称好了，正好两斤。还要西瓜吗？西瓜也很好。',
            py: 'Gěi nǐ chēng hǎo le, zhènghǎo liǎng jīn. Hái yào xīguā ma? Xīguā yě hěn hǎo.',
            vi: 'Cân xong cho bạn rồi, đúng hai cân. Có lấy dưa hấu không? Dưa hấu cũng ngon lắm.'
          },
          user: {
            goal: 'Hãy nói không mua thêm và hỏi tổng cộng bao nhiêu tiền',
            answers: [
              { zh: '不要西瓜了，一共多少钱？', py: 'Bú yào xīguā le, yígòng duōshao qián?', vi: 'Không lấy dưa hấu nữa, tổng cộng bao nhiêu tiền?' },
              { zh: '一共多少钱？', py: 'Yígòng duōshao qián?', vi: 'Tổng cộng bao nhiêu tiền?' }
            ],
            accept: {
              anyOf: ['多少钱', '一共', '不要'],
              pattern: /(?:多少钱|一共|不要)/i
            },
            next: 't5',
            fallback: '不好意思，请再说一遍。'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '两斤一共十块钱。你微信还是现金？',
            py: 'Liǎng jīn yígòng shí kuài qián. Nǐ Wēixìn háishi xiànjīn?',
            vi: 'Hai cân tổng cộng mười tệ. Bạn trả WeChat hay tiền mặt?'
          },
          user: {
            goal: 'Hãy nói phương thức thanh toán và đưa tiền',
            answers: [
              { zh: '我扫码支付，给你十块钱。', py: 'Wǒ sǎomǎ zhīfù, gěi nǐ shí kuài qián.', vi: 'Tôi quét mã thanh toán, gửi bạn mười tệ.' },
              { zh: '我给现金，这是十块。', py: 'Wǒ gěi xiànjīn, zhè shì shí kuài.', vi: 'Tôi đưa tiền mặt, đây là mười tệ.' }
            ],
            accept: {
              anyOf: ['扫码', '微信', '现金', '钱', '块'],
              pattern: /(?:扫码|微信|现金|钱|块)/i
            },
            next: null,
            fallback: '你用微信还是现金呢？'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 5. Hỏi đường
    // ------------------------------------------------------------------------
    {
      id: 'directions',
      title: 'Hỏi đường',
      description: 'Hỏi thăm đường đến bệnh viện, hỏi khoảng cách và trạm xe buýt.',
      topic: 'Hỏi đường',
      difficulty: 'HSK 1',
      npc: {
        name: 'Chú cảnh sát',
        role: 'Công an khu vực',
        avatarColor: '#4F46E5',
        initials: 'CS',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#E0E7FF"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#4F46E5"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '你好！请问有什么可以帮你吗？',
            py: 'Nǐ hǎo! Qǐngwèn yǒu shénme kěyǐ bāng nǐ ma?',
            vi: 'Xin chào! Xin hỏi có việc gì giúp bạn không?'
          },
          user: {
            goal: 'Hãy hỏi đường đi đến bệnh viện hoặc nhà ga',
            answers: [
              { zh: '请问，医院在哪儿？怎么走？', py: 'Qǐngwèn, yīyuàn zài nǎr? Zěnme zǒu?', vi: 'Xin hỏi, bệnh viện ở đâu? Đi thế nào ạ?' },
              { zh: '请问去火车站怎么走？', py: 'Qǐngwèn qù huǒchēzhàn zěnme zǒu?', vi: 'Xin hỏi đi nhà ga xe lửa đi thế nào?' }
            ],
            accept: {
              anyOf: ['医院', '火车站', '哪儿', '怎么走'],
              pattern: /(?:医院|火车站|哪儿|怎么走)/i
            },
            next: 't2',
            fallback: '请问你想去哪里呢？'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '往前走，到了前面的路口往右拐。',
            py: 'Wǎng qián zǒu, dào le qiánmian de lùkǒu wǎng yòu guǎi.',
            vi: 'Đi về phía trước, đến ngã rẽ phía trước thì rẽ phải.'
          },
          user: {
            goal: 'Hãy hỏi nơi đó cách đây có xa không',
            answers: [
              { zh: '离这里远不远？', py: 'Lí zhèlǐ yuǎn bu yuǎn?', vi: 'Cách đây có xa không ạ?' },
              { zh: '走路要几分钟？', py: 'Zǒulù yào jǐ fēnzhōng?', vi: 'Đi bộ mất mấy phút ạ?' }
            ],
            accept: {
              anyOf: ['远', '分钟', '走'],
              pattern: /(?:远|分钟|走)/i
            },
            next: 't3',
            fallback: '你说什么？我没听懂。'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '走路大概要二十分钟，有点儿远。你可以坐公共汽车。',
            py: 'Zǒulù dàgài yào èrshí fēnzhōng, yǒudiǎnr yuǎn. Nǐ kěyǐ zuò gōnggòng qìchē.',
            vi: 'Đi bộ khoảng hai mươi phút, hơi xa đấy. Bạn có thể đi xe buýt.'
          },
          user: {
            goal: 'Hãy hỏi trạm xe buýt ở đâu',
            answers: [
              { zh: '请问公共汽车站在哪儿？', py: 'Qǐngwèn gōnggòng qìchē zhàn zài nǎr?', vi: 'Xin hỏi trạm xe buýt ở đâu ạ?' },
              { zh: '坐几路汽车？', py: 'Zuò jǐ lù qìchē?', vi: 'Đi xe tuyến số mấy ạ?' }
            ],
            accept: {
              anyOf: ['汽车', '车', '站', '哪儿'],
              pattern: /(?:汽车|车|站|哪儿)/i
            },
            next: 't4',
            fallback: '请问你想问公共汽车吗？'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '车站就在马路对面，前面有一所学校。',
            py: 'Chēzhàn jiù zài mǎlù duìmiàn, qiánmian yǒu yì suǒ xuéxiào.',
            vi: 'Trạm xe ở ngay bên kia đường, phía trước có một ngôi trường.'
          },
          user: {
            goal: 'Hãy nói bạn đã hiểu rõ rồi',
            answers: [
              { zh: '好的，我明白了，太清楚了！', py: 'Hǎo de, wǒ míngbai le, tài qīngchu le!', vi: 'Vâng, tôi hiểu rồi, rõ ràng quá!' },
              { zh: '好的，我知道了。', py: 'Hǎo de, wǒ zhīdào le.', vi: 'Vâng, tôi biết rồi.' }
            ],
            accept: {
              anyOf: ['明白', '知道', '好'],
              pattern: /(?:明白|知道|好)/i
            },
            next: 't5',
            fallback: '你听明白了吗？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '不客气，路上注意安全，慢走！',
            py: 'Bú kèqi, lùshang zhùyì ānquán, màn zǒu!',
            vi: 'Không có gì, đi đường chú ý an toàn nhé!'
          },
          user: {
            goal: 'Hãy cảm ơn và chào tạm biệt người hướng dẫn',
            answers: [
              { zh: '太感谢您了，再见！', py: 'Tài gǎnxiè nín le, zàijiàn!', vi: 'Vô cùng cảm ơn bác, tạm biệt bác!' },
              { zh: '谢谢您，再见！', py: 'Xièxie nín, zàijiàn!', vi: 'Cảm ơn bác, tạm biệt ạ!' }
            ],
            accept: {
              anyOf: ['感谢', '谢谢', '再见'],
              pattern: /(?:感谢|谢谢|再见)/i
            },
            next: null,
            fallback: '再见！'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 6. Hẹn bạn đi chơi (ngày giờ)
    // ------------------------------------------------------------------------
    {
      id: 'date',
      title: 'Hẹn bạn đi chơi (ngày giờ)',
      description: 'Hẹn bạn đi xem phim, thống nhất thời gian và địa điểm gặp gỡ.',
      topic: 'Hẹn hò',
      difficulty: 'HSK 1',
      npc: {
        name: 'Tiểu Vũ',
        role: 'Bạn thân cùng lớp',
        avatarColor: '#7C3AED',
        initials: 'TV',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#EDE9FE"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#7C3AED"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '喂，李明！你明天下午有时间吗？',
            py: 'Wèi, Lǐ Míng! Nǐ míngtiān xiàwǔ yǒu shíjiān ma?',
            vi: 'Alo, Lý Minh! Chiều mai bạn có thời gian rảnh không?'
          },
          user: {
            goal: 'Hãy nói bạn có thời gian rảnh (không bận)',
            answers: [
              { zh: '我有时间，明天我不忙。', py: 'Wǒ yǒu shíjiān, míngtiān wǒ bù máng.', vi: 'Tôi có thời gian, ngày mai tôi không bận.' },
              { zh: '有时间，怎么了？', py: 'Yǒu shíjiān, zěnme le?', vi: 'Có rảnh chứ, sao thế bạn?' }
            ],
            accept: {
              anyOf: ['时间', '不忙', '有', '可以'],
              pattern: /(?:时间|不忙|有|可以)/i
            },
            next: 't2',
            fallback: '你明天有时间吗？请再说一次。'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '我们明天下午一起去看电影，好不好？',
            py: 'Wǒmen míngtiān xiàwǔ yìqǐ qù kàn diànyǐng, hǎo bu hǎo?',
            vi: 'Chiều mai chúng ta cùng đi xem phim nhé, được không?'
          },
          user: {
            goal: 'Hãy đồng ý lời rủ (Tốt quá, được chứ)',
            answers: [
              { zh: '太好了，我很想看电影！', py: 'Tài hǎo le, wǒ hěn xiǎng kàn diànyǐng!', vi: 'Tuyệt quá, tôi rất muốn đi xem phim!' },
              { zh: '好啊，没问题！', py: 'Hǎo a, méi wèntí!', vi: 'Được chứ, không thành vấn đề!' }
            ],
            accept: {
              anyOf: ['好', '行', '电影', '没问题'],
              pattern: /(?:好|行|电影|没问题)/i
            },
            next: 't3',
            fallback: '你想去看电影吗？'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '太棒了！我们明天几点见面？',
            py: 'Tài bàng le! Wǒmen míngtiān jǐ diǎn jiànmiàn?',
            vi: 'Tuyệt vời! Ngày mai chúng ta mấy giờ gặp nhau?'
          },
          user: {
            goal: 'Hãy đề xuất giờ gặp (ví dụ: ba giờ chiều)',
            answers: [
              { zh: '下午三点怎么样？', py: 'Xiàwǔ sān diǎn zěnmeyàng?', vi: 'Ba giờ chiều thấy thế nào?' },
              { zh: '我们下午两点半见吧。', py: 'Wǒmen xiàwǔ liǎng diǎn bàn jiàn ba.', vi: 'Chúng ta gặp nhau lúc hai giờ rưỡi chiều đi.' }
            ],
            accept: {
              anyOf: ['点', '下午', '两点', '三点'],
              pattern: /(?:点|下午)/i
            },
            next: 't4',
            fallback: '我们几点见呢？请说具体时间。'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '三点很好。我们在哪儿见面？',
            py: 'Sān diǎn hěn hǎo. Wǒmen zài nǎr jiànmiàn?',
            vi: 'Ba giờ được đấy. Chúng ta gặp ở đâu?'
          },
          user: {
            goal: 'Hãy đề xuất địa điểm (ở cổng rạp phim hoặc cổng trường)',
            answers: [
              { zh: '在电影院门口见吧。', py: 'Zài diànyǐngyuàn ménkǒu jiàn ba.', vi: 'Gặp nhau ở cổng rạp chiếu phim đi.' },
              { zh: '在学校门口见面。', py: 'Zài xuéxiào ménkǒu jiànmiàn.', vi: 'Gặp nhau ở cổng trường.' }
            ],
            accept: {
              anyOf: ['门口', '电影院', '学校', '哪儿'],
              pattern: /(?:门口|电影院|学校)/i
            },
            next: 't5',
            fallback: '我们在哪里见面好呢？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '好的，那就明天下午三点在电影院门口，不见不散！',
            py: 'Hǎo de, nà jiù míngtiān xiàwǔ sān diǎn zài diànyǐngyuàn ménkǒu, bú jiàn bú sàn!',
            vi: 'Được rồi, vậy chiều mai ba giờ ở cổng rạp phim nhé, không gặp không về!'
          },
          user: {
            goal: 'Hãy xác nhận lại và tạm biệt',
            answers: [
              { zh: '好的，不见不散，明天见！', py: 'Hǎo de, bú jiàn bú sàn, míngtiān jiàn!', vi: 'Được, không gặp không về, mai gặp nhé!' },
              { zh: '明天见！', py: 'Míngtiān jiàn!', vi: 'Mai gặp lại!' }
            ],
            accept: {
              anyOf: ['明天见', '再见', '好'],
              pattern: /(?:明天见|再见|好)/i
            },
            next: null,
            fallback: '明天见哦！'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 7. Ở trường – hỏi thầy cô
    // ------------------------------------------------------------------------
    {
      id: 'school',
      title: 'Ở trường – hỏi thầy cô',
      description: 'Gặp giáo viên thắc mắc cách phát âm chữ Hán và trao đổi bài tập.',
      topic: 'Học tập',
      difficulty: 'HSK 1',
      npc: {
        name: 'Vương Lão Sư',
        role: 'Giáo viên bộ môn Hán ngữ',
        avatarColor: '#0D9488',
        initials: 'VLS',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#CCFBF1"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#0D9488"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '请进！同学，你有什么问题？',
            py: 'Qǐng jìn! Tóngxué, nǐ yǒu shénme wèntí?',
            vi: 'Mời vào! Em có câu hỏi gì cần hỏi?'
          },
          user: {
            goal: 'Hãy chào cô giáo và xin phép hỏi một câu hỏi',
            answers: [
              { zh: '王老师好！我想问一个汉语问题。', py: 'Wáng lǎoshī hǎo! Wǒ xiǎng wèn yí gè Hànyǔ wèntí.', vi: 'Em chào cô Vương! Em muốn hỏi một câu hỏi tiếng Hán.' },
              { zh: '老师好，请问我可以问一个问题吗？', py: 'Lǎoshī hǎo, qǐngwèn wǒ kěyǐ wèn yí gè wèntí ma?', vi: 'Chào cô ạ, xin hỏi em có thể hỏi một câu không ạ?' }
            ],
            accept: {
              anyOf: ['老师', '问题', '好', '想问'],
              pattern: /(?:老师|问题|想问)/i
            },
            next: 't2',
            fallback: '同学你好，有什么问题吗？'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '当然可以，你哪一个汉字不明白？',
            py: 'Dāngrán kěyǐ, nǐ nǎ yí gè hànzì bù míngbai?',
            vi: 'Đương nhiên được rồi, em chưa hiểu chữ Hán nào?'
          },
          user: {
            goal: 'Hãy hỏi chữ này đọc như thế nào',
            answers: [
              { zh: '老师，请问这个字怎么读？', py: 'Lǎoshī, qǐngwèn zhè ge zì zěnme dú?', vi: 'Thưa cô, xin hỏi chữ này đọc thế nào ạ?' },
              { zh: '这个汉字是什么意思？', py: 'Zhè ge hànzì shì shénme yìsi?', vi: 'Chữ Hán này có nghĩa là gì ạ?' }
            ],
            accept: {
              anyOf: ['字', '怎么读', '意思', '读'],
              pattern: /(?:字|怎么读|意思|读)/i
            },
            next: 't3',
            fallback: '你想问哪个字怎么读呢？'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '这个字读“学”，学习的学。跟老师读一遍：xué！',
            py: 'Zhè ge zì dú “xué”, xuéxí de xué. Gēn lǎoshī dú yí biàn: xué!',
            vi: 'Chữ này đọc là "học" (xué), trong từ học tập. Đọc theo cô một lần nào: xué!'
          },
          user: {
            goal: 'Hãy đọc theo cô hoặc nói em đã hiểu rồi',
            answers: [
              { zh: '学，xué！老师我读得对吗？', py: 'Xué, xué! Lǎoshī wǒ dú de duì ma?', vi: 'Xué, xué! Cô ơi em đọc đúng chưa ạ?' },
              { zh: '我明白了，谢谢老师！', py: 'Wǒ míngbai le, xièxie lǎoshī!', vi: 'Em hiểu rồi ạ, cảm ơn cô!' }
            ],
            accept: {
              anyOf: ['学', 'xue', '明白', '对'],
              pattern: /(?:学|xué|明白|对)/i
            },
            next: 't4',
            fallback: '跟老师读：xué。'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '读得很好，发音很准！今天的汉字作业你写了吗？',
            py: 'Dú de hěn hǎo, fāyīn hěn zhǔn! Jīntiān de hànzì zuòyè nǐ xiě le ma?',
            vi: 'Đọc rất tốt, phát âm chuẩn lắm! Bài tập chữ Hán hôm nay em viết chưa?'
          },
          user: {
            goal: 'Hãy nói em đã viết xong bài tập rồi',
            answers: [
              { zh: '我写完了，请老师检查。', py: 'Wǒ xiě wán le, qǐng lǎoshī jiǎnchá.', vi: 'Em viết xong rồi ạ, xin cô kiểm tra giúp em.' },
              { zh: '我正在写，今天一定写完。', py: 'Wǒ zhèngzài xiě, jīntiān yídìng xiě wán.', vi: 'Em đang viết ạ, hôm nay nhất định sẽ viết xong.' }
            ],
            accept: {
              anyOf: ['写完', '写', '完了'],
              pattern: /(?:写完|写|完)/i
            },
            next: 't5',
            fallback: '作业写完了吗？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '好的，很认真！明天上课交作业。加油！',
            py: 'Hǎo de, hěn rènzhēn! Míngtiān shàngkè jiāo zuòyè. Jiāyóu!',
            vi: 'Tốt lắm, rất chăm chỉ! Ngày mai lên lớp nộp bài nhé. Cố lên!'
          },
          user: {
            goal: 'Hãy cảm ơn cô và chào tạm biệt',
            answers: [
              { zh: '谢谢老师，老师再见！', py: 'Xièxie lǎoshī, lǎoshī zàijiàn!', vi: 'Em cảm ơn cô, em chào cô ạ!' },
              { zh: '老师明天见！', py: 'Lǎoshī míngtiān jiàn!', vi: 'Mai gặp lại cô ạ!' }
            ],
            accept: {
              anyOf: ['谢谢', '老师', '再见', '明天见'],
              pattern: /(?:谢谢|再见|明天见)/i
            },
            next: null,
            fallback: '明天见！'
          }
        }
      }
    },

    // ------------------------------------------------------------------------
    // 8. Gọi taxi / đi tàu
    // ------------------------------------------------------------------------
    {
      id: 'transport',
      title: 'Gọi taxi / đi tàu',
      description: 'Lên taxi, nói điểm đến là nhà ga, hỏi thời gian và trả tiền cước.',
      topic: 'Đi lại',
      difficulty: 'HSK 1',
      npc: {
        name: 'Bác Trương',
        role: 'Tài xế taxi kinh nghiệm',
        avatarColor: '#2563EB',
        initials: 'BT',
        avatarSvg: '<svg viewBox="0 0 40 40" width="40" height="40" fill="none"><circle cx="20" cy="20" r="20" fill="#DBEAFE"/><path d="M20 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM10 33a10 10 0 0 1 20 0H10Z" fill="#2563EB"/></svg>'
      },
      initialTurn: 't1',
      turns: {
        t1: {
          id: 't1',
          npc: {
            zh: '您好！请问您去哪儿？',
            py: 'Nín hǎo! Qǐngwèn nín qù nǎr?',
            vi: 'Chào bạn! Xin hỏi bạn muốn đi đâu?'
          },
          user: {
            goal: 'Hãy nói điểm đến (Tôi muốn đi ga xe lửa hoặc sân bay)',
            answers: [
              { zh: '我想去北京火车站。', py: 'Wǒ xiǎng qù Běijīng huǒchēzhàn.', vi: 'Tôi muốn đến ga xe lửa Bắc Kinh.' },
              { zh: '我去飞机场，请快一点。', py: 'Wǒ qù fēijīchǎng, qǐng kuài yìdiǎn.', vi: 'Tôi đi sân bay, xin đi nhanh một chút ạ.' }
            ],
            accept: {
              anyOf: ['火车站', '机场', '站', '去'],
              pattern: /(?:火车站|机场|站|去)/i
            },
            next: 't2',
            fallback: '请问你想去哪里呢？'
          }
        },
        t2: {
          id: 't2',
          npc: {
            zh: '好的，去火车站。您买了几点的车票？',
            py: 'Hǎo de, qù huǒchēzhàn. Nín mǎi le jǐ diǎn de chēpiào?',
            vi: 'Được, đi ga xe lửa. Bạn mua vé tàu mấy giờ thế?'
          },
          user: {
            goal: 'Hãy nói giờ tàu chạy (Tàu lúc ba giờ chiều)',
            answers: [
              { zh: '我是下午三点半的火车。', py: 'Wǒ shì xiàwǔ sān diǎn bàn de huǒchē.', vi: 'Tôi đi tàu lúc ba giờ rưỡi chiều.' },
              { zh: '下午四点的火车，时间来得及吗？', py: 'Xiàwǔ sì diǎn de huǒchē, shíjiān láidejí ma?', vi: 'Tàu bốn giờ chiều, kịp giờ không bác?' }
            ],
            accept: {
              anyOf: ['火车', '点', '下午'],
              pattern: /(?:火车|点|下午)/i
            },
            next: 't3',
            fallback: '你的火车是几点的？'
          }
        },
        t3: {
          id: 't3',
          npc: {
            zh: '来得及，现在路上不堵车，大概二十分钟就到。',
            py: 'Láidejí, xiànzài lùshang bù dǔchē, dàgài èrshí fēnzhōng jiù dào.',
            vi: 'Kịp chứ, giờ đường không tắc, khoảng hai mươi phút là tới.'
          },
          user: {
            goal: 'Hãy hỏi giá cước hoặc yêu cầu bấm đồng hồ',
            answers: [
              { zh: '请问去火车站多少钱？', py: 'Qǐngwèn qù huǒchēzhàn duōshao qián?', vi: 'Xin hỏi đến ga xe lửa bao nhiêu tiền ạ?' },
              { zh: '师傅，请打表。', py: 'Shīfu, qǐng dǎbiǎo.', vi: 'Bác tài xế ơi, xin bấm đồng hồ tính tiền nhé.' }
            ],
            accept: {
              anyOf: ['多少钱', '打表', '钱'],
              pattern: /(?:多少钱|打表|钱)/i
            },
            next: 't4',
            fallback: '你说什么？'
          }
        },
        t4: {
          id: 't4',
          npc: {
            zh: '放心，我们都是打表的。前面就是火车站了。',
            py: 'Fàngxīn, wǒmen dōu shì dǎbiǎo de. Qiánmian jiù shì huǒchēzhàn le.',
            vi: 'Yên tâm, chúng tôi đều bấm đồng hồ. Phía trước là ga xe lửa rồi.'
          },
          user: {
            goal: 'Hãy nói dừng ở đây và hỏi tổng số tiền',
            answers: [
              { zh: '就在这里停吧，一共多少钱？', py: 'Jiù zài zhèlǐ tíng ba, yígòng duōshao qián?', vi: 'Dừng ở đây đi ạ, tổng cộng bao nhiêu tiền?' },
              { zh: '好的，一共多少钱？', py: 'Hǎo de, yígòng duōshao qián?', vi: 'Vâng, tổng cộng bao nhiêu tiền ạ?' }
            ],
            accept: {
              anyOf: ['停', '多少钱', '一共'],
              pattern: /(?:停|多少钱|一共)/i
            },
            next: 't5',
            fallback: '到了，请问在哪里停？'
          }
        },
        t5: {
          id: 't5',
          npc: {
            zh: '一共二十五块钱。请拿好您的随身物品。',
            py: 'Yígòng èrshíwǔ kuài qián. Qǐng ná hǎo nín de suíshēn wùpǐn.',
            vi: 'Tổng cộng hai mươi lăm tệ. Xin cầm chắc đồ đạc mang theo.'
          },
          user: {
            goal: 'Hãy gửi tiền và cảm ơn bác tài xế',
            answers: [
              { zh: '给您三十块，不用找了，谢谢师傅！', py: 'Gěi nín sānshí kuài, bú yòng zhǎo le, xièxie shīfu!', vi: 'Gửi bác ba mươi tệ, không cần trả lại đâu, cảm ơn bác tài!' },
              { zh: '给您钱，谢谢师傅，再见！', py: 'Gěi nín qián, xièxie shīfu, zàijiàn!', vi: 'Gửi bác tiền, cảm ơn bác tài, tạm biệt!' }
            ],
            accept: {
              anyOf: ['钱', '块', '谢谢', '师傅'],
              pattern: /(?:钱|块|谢谢|师傅)/i
            },
            next: null,
            fallback: '谢谢，再见！'
          }
        }
      }
    }
  ];

  if (typeof window !== 'undefined') {
    window.TALK_SCENARIOS = TALK_SCENARIOS;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TALK_SCENARIOS };
  }
})();
