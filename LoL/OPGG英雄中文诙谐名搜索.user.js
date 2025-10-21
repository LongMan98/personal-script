// ==UserScript==
// @name         OPGG英雄中文诙谐名搜索
// @namespace   https://github.com/LongMan98/personal-script
// @version      2025.10.21
// @description  为OP.GG游戏模式页面添加英雄中文诙谐名搜索功能
// @license      MIT
// @author       LongMan98
// @match        https://op.gg/zh-cn/lol/modes/*
// @match        https://op.gg/lol/modes/*
// @icon         https://opgg-static.akamaized.net/meta/images/lol/latest/champion/寒冰射手.png?image=e_upscale,c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160
// @updateURL   https://raw.githubusercontent.com/LongMan98/personal-script/main/LoL/OPGG%E8%8B%B1%E9%9B%84%E4%B8%AD%E6%96%87%E8%AF%99%E8%B0%90%E5%90%8D%E6%90%9C%E7%B4%A2.user.js
// @downloadURL  https://raw.githubusercontent.com/LongMan98/personal-script/main/LoL/OPGG%E8%8B%B1%E9%9B%84%E4%B8%AD%E6%96%87%E8%AF%99%E8%B0%90%E5%90%8D%E6%90%9C%E7%B4%A2.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 完整的中文诙谐名到官方英文名的映射
    const heroNameMap = {
        // 战士类
        "德玛西亚之力": "德玛西亚之力", "盖伦": "德玛西亚之力", "大宝剑": "德玛西亚之力", "草丛伦": "德玛西亚之力", "gay伦": "德玛西亚之力",
        "诺克萨斯之手": "诺克萨斯之手", "诺手": "诺克萨斯之手", "达瑞斯": "诺克萨斯之手", "人头狗": "诺克萨斯之手", "德莱厄斯": "诺克萨斯之手",
        "荒漠屠夫": "荒漠屠夫", "鳄鱼": "荒漠屠夫", "雷克顿": "荒漠屠夫",
        "沙漠死神": "沙漠死神", "狗头": "沙漠死神", "内瑟斯": "沙漠死神",
        "暗裔剑魔": "暗裔剑魔", "剑魔": "暗裔剑魔", "亚托克斯": "暗裔剑魔",
        "无双剑姬": "无双剑姬", "剑姬": "无双剑姬", "菲奥娜": "无双剑姬",
        "青钢影": "青钢影", "卡蜜尔": "青钢影", "剪刀腿": "青钢影",
        "腕豪": "腕豪", "瑟提": "腕豪", "劲夫": "腕豪", "万豪": "腕豪",
        "德邦总管": "德邦总管", "赵信": "德邦总管", "赵云": "德邦总管", "赵子龙": "德邦总管", "菊花信": "德邦总管",
        "德玛西亚皇子": "德玛西亚皇子", "皇子": "德玛西亚皇子", "嘉文四世": "德玛西亚皇子",
        "无极剑圣": "无极剑圣", "剑圣": "无极剑圣", "易大师": "无极剑圣", "蛮易信": "无极剑圣",
        "蛮族之王": "蛮族之王", "蛮王": "蛮族之王", "蛮子": "蛮族之王", "五秒真男人": "蛮族之王", "泰达米尔": "蛮族之王",
        "武器大师": "武器大师", "武器": "武器大师", "贾克斯": "武器大师",
        "李青": "盲僧", "瞎子": "盲僧", "小学僧": "盲僧", "盲僧": "盲僧",
        "解脱者": "解脱者", "偷男": "解脱者", "塞拉斯": "解脱者", "蒜男": "解脱者",
        "牧魂人": "牧魂人", "约里克": "牧魂人", "掘墓者": "牧魂人", "掘墓": "牧魂人",
        "虚空女皇": "虚空女皇", "卑尔维斯": "虚空女皇", "阿尔卑斯": "虚空女皇", "虚空鱼": "虚空女皇",
        "暴怒骑士": "暴怒骑士", "克烈": "暴怒骑士",
        "狂战士": "狂战士", "奥拉夫": "狂战士", "疯狗": "狂战士",
        "兽灵行者": "兽灵行者", "乌迪尔": "兽灵行者",
        "龙血武姬": "龙血武姬", "龙女": "龙血武姬", "希瓦娜": "龙血武姬",
        "战争之影": "战争之影", "人马": "战争之影", "赫卡里姆": "战争之影",
        "法外狂徒": "法外狂徒", "男枪": "法外狂徒", "格雷福斯": "法外狂徒",
        "刀锋舞者": "刀锋舞者", "刀妹": "刀锋舞者", "艾瑞莉娅": "刀锋舞者", "女刀": "刀锋舞者",
        "未来守护者": "未来守护者", "杰斯": "未来守护者", "塔利斯议员": "未来守护者",
        "海洋之灾": "海洋之灾", "船长": "海洋之灾", "桶子哥": "海洋之灾", "普朗克": "海洋之灾", "橘子哥": "海洋之灾",
        "迷失之牙": "迷失之牙", "纳尔": "迷失之牙", "小纳尔": "迷失之牙", "大纳尔": "迷失之牙",
        "不屈之枪": "不屈之枪", "潘森": "不屈之枪", "斯巴达": "不屈之枪", "长枪哥": "不屈之枪",
        "皮城执法官": "皮城执法官", "蔚": "皮城执法官", "拳姐": "皮城执法官", "皮城大姐头": "皮城执法官",
        "猴子": "齐天大圣", "悟空": "齐天大圣", "猴哥": "齐天大圣", "孙悟空": "齐天大圣", "齐天大圣": "齐天大圣",
        "百裂冥犬": "百裂冥犬", "纳亚菲利": "百裂冥犬",
        "铁血狼母": "铁血狼母", "狼母": "铁血狼母", "狼妈": "铁血狼母", "铁血母狼": "铁血狼母", "安蓓萨": "铁血狼母",
        "狂厄蔷薇": "狂厄蔷薇", "蔷薇": "狂厄蔷薇", "小蔷薇": "狂厄蔷薇", "抽血泵": "狂厄蔷薇", "疯批蔷薇": "狂厄蔷薇", "荆棘妹": "狂厄蔷薇", "贝蕾亚": "狂厄蔷薇",

        // 刺客类
        "影流之主": "影流之主", "劫": "影流之主", "儿童劫": "影流之主",
        "刀锋之影": "刀锋之影", "男刀": "刀锋之影", "泰隆": "刀锋之影",
        "虚空掠夺者": "虚空掠夺者", "螳螂": "虚空掠夺者", "卡兹克": "虚空掠夺者", "喜之郎": "虚空掠夺者",
        "傲之追猎者": "傲之追猎者", "狮子狗": "傲之追猎者", "雷恩加尔": "傲之追猎者",
        "小鱼人": "潮汐海灵", "菲兹": "潮汐海灵", "鲇鱼": "潮汐海灵", "小鱼": "潮汐海灵", "潮汐海灵": "潮汐海灵",
        "离群之刺": "离群之刺", "阿卡丽": "离群之刺", "快乐刺客": "离群之刺", "暗影之拳": "离群之刺",
        "不祥之刃": "不祥之刃", "卡特": "不祥之刃", "卡特琳娜": "不祥之刃",
        "血港鬼影": "血港鬼影", "派克": "血港鬼影", "水鬼": "血港鬼影",
        "封魔剑魂": "封魔剑魂", "永恩": "封魔剑魂", "亚索哥": "封魔剑魂", "快乐风男他哥": "封魔剑魂",
        "影哨": "影哨", "阿克尚": "影哨", "阿克曼": "影哨",
        "破败之王": "破败之王", "佛耶戈": "破败之王", "佛爷": "破败之王", "破败王": "破败之王", "破财王": "破败之王",
        "凯隐": "影流之镰", "拉亚斯特": "影流之镰", "红凯": "影流之镰", "蓝凯": "影流之镰", "凯": "影流之镰", "影流之镰": "影流之镰", "镰刀": "影流之镰", "凯影": "影流之镰",
        "元素女皇": "元素女皇", "奇亚娜": "元素女皇", "盘子妈": "元素女皇",
        "恶魔小丑": "恶魔小丑", "小丑": "恶魔小丑", "萨科": "恶魔小丑",
        "皎月女神": "皎月女神", "黛安娜": "皎月女神", "皎月": "皎月女神", "露娜": "皎月女神",
        "痛苦之拥": "痛苦之拥", "伊芙琳": "痛苦之拥", "寡妇": "痛苦之拥",
        "虚空行者": "虚空行者", "卡萨丁": "虚空行者", "基霸脸": "虚空行者",
        "诡术妖姬": "诡术妖姬", "乐芙兰": "诡术妖姬", "妖姬": "诡术妖姬", "提款姬": "诡术妖姬",
        "锐雯": "放逐之刃", "放逐之刃": "放逐之刃",
        "永恒梦魇": "永恒梦魇", "魔腾": "永恒梦魇", "梦魇": "永恒梦魇",
        "虚空遁地兽": "虚空遁地兽", "挖掘机": "虚空遁地兽", "雷克塞": "虚空遁地兽", "土龙": "虚空遁地兽", "地鼠": "虚空遁地兽", "挖机": "虚空遁地兽",

        // 坦克类
        "扭曲树精": "扭曲树精", "大树": "扭曲树精", "茂凯": "扭曲树精", "树精": "扭曲树精", "树人": "扭曲树精",
        "熔岩巨兽": "熔岩巨兽", "石头人": "熔岩巨兽", "墨菲特": "熔岩巨兽", "混分巨兽": "熔岩巨兽", "岩头人": "熔岩巨兽",
        "牛头酋长": "牛头酋长", "牛头": "牛头酋长", "阿里斯塔": "牛头酋长", "阿利斯塔": "牛头酋长","牛头人": "牛头酋长","ntr": "牛头酋长", "阿利斯塔": "牛头酋长",
        "蒸汽机器人": "蒸汽机器人", "机器人": "蒸汽机器人", "布里茨": "蒸汽机器人",
        "魂锁典狱长": "魂锁典狱长", "锤石": "魂锁典狱长", "钩子": "魂锁典狱长",
        "深海泰坦": "深海泰坦", "泰坦": "深海泰坦", "诺提勒斯": "深海泰坦",
        "弗雷尔卓德之心": "弗雷尔卓德之心", "布隆": "弗雷尔卓德之心", "门板": "弗雷尔卓德之心",
        "曙光女神": "曙光女神", "日女": "曙光女神", "蕾欧娜": "曙光女神", "曙光": "曙光女神", "女坦": "曙光女神", "太阳女孩": "曙光女神",
        "北地之怒": "北地之怒", "猪妹": "北地之怒", "瑟庄妮": "北地之怒",
        "披甲龙龟": "披甲龙龟", "龙龟": "披甲龙龟", "拉莫斯": "披甲龙龟", "王八": "披甲龙龟", "反甲龟": "披甲龙龟",
        "上古领主": "上古领主", "蝎子": "上古领主", "斯卡纳": "上古领主", "水晶先锋": "上古领主",
        "不灭狂雷": "不灭狂雷", "狗熊": "不灭狂雷", "沃利贝尔": "不灭狂雷",
        "殇之木乃伊": "殇之木乃伊", "木乃伊": "殇之木乃伊", "阿木木": "殇之木乃伊", "木木": "殇之木乃伊",
        "慎": "shen", "暮光之眼": "shen", "肾": "shen", "腰子": "shen",
        "河流之王": "河流之王", "塔姆": "河流之王", "塔姆肯奇": "河流之王", "蛤蟆": "河流之王", "鲶鱼": "河流之王", "塔姆·肯奇": "河流之王",
        "山隐之焰": "山隐之焰", "奥恩": "山隐之焰", "羊驼": "山隐之焰", "山羊": "山隐之焰", "羊": "山隐之焰", "铁头娃": "山隐之焰",
        "圣锤之毅": "圣锤之毅", "波比": "圣锤之毅",
        "正义巨像": "正义巨像", "加里奥": "正义巨像", "石像鬼": "正义巨像", "城墙": "正义巨像", "蝙蝠侠": "正义巨像",
        "生化魔人": "生化魔人", "扎克": "生化魔人", "绿巨人": "生化魔人", "鼻涕人": "生化魔人", "粑粑人": "生化魔人", "果冻人": "生化魔人", "翔战士": "生化魔人",
        "亡灵战神": "亡灵战神", "赛恩": "亡灵战神", "老司机": "亡灵战神",
        "祖安狂人": "祖安狂人", "蒙多": "祖安狂人", "想去哪就去哪": "祖安狂人",
        "巨魔之王": "巨魔之王", "特朗德尔": "巨魔之王", "巨魔": "巨魔之王",
        "瓦洛兰之盾": "瓦洛兰之盾", "塔里克": "瓦洛兰之盾", "宝石": "瓦洛兰之盾",
        "万花通灵": "万花通灵", "妮蔻": "万花通灵", "niko": "万花通灵",
        "海兽祭司": "海兽祭司", "俄洛伊": "海兽祭司", "章鱼妈": "海兽祭司", "触手妈": "海兽祭司",
        "纳祖芒荣耀": "纳祖芒荣耀", "黑人": "纳祖芒荣耀", "老黑": "纳祖芒荣耀", "傲岸雄姿": "纳祖芒荣耀", "奎桑提": "纳祖芒荣耀",

        // 法师类
        "复仇焰魂": "复仇焰魂", "火男": "复仇焰魂", "布兰德": "复仇焰魂",
        "冰霜女巫": "冰霜女巫", "冰女": "冰霜女巫", "丽桑卓": "冰霜女巫",
        "卡牌大师": "卡牌大师", "卡牌": "卡牌大师", "崔斯特": "卡牌大师",
        "发条魔灵": "发条魔灵", "发条": "发条魔灵", "奥莉安娜": "发条魔灵",
        "魔蛇之拥": "魔蛇之拥", "蛇女": "魔蛇之拥", "卡西奥佩娅": "魔蛇之拥",
        "猩红收割者": "猩红收割者", "吸血鬼": "猩红收割者", "弗拉基米尔": "猩红收割者",
        "暗黑元首": "暗黑元首", "辛德拉": "暗黑元首", "球女": "暗黑元首",
        "远古巫灵": "远古巫灵", "泽拉斯": "远古巫灵", "三炮": "远古巫灵",
        "光辉女郎": "光辉女郎", "光辉": "光辉女郎", "光女": "光辉女郎", "拉克丝": "光辉女郎",
        "邪恶小法师": "邪恶小法师", "小法": "邪恶小法师", "维迦": "邪恶小法师",
        "大发明家": "大发明家", "大头": "大发明家", "黑默丁格": "大发明家",
        "狂暴之心": "狂暴之心", "凯南": "狂暴之心", "电耗子": "狂暴之心",
        "炼金术士": "炼金术士", "炼金": "炼金术士", "辛吉德": "炼金术士", "毒奶": "炼金术士",
        "酒桶": "酒桶", "古拉加斯": "酒桶", "酒男": "酒桶", "啤酒人": "酒桶",
        "铁铠冥魂": "铁铠冥魂", "铁男": "铁铠冥魂", "莫德凯撒": "铁铠冥魂", "金属大师": "铁铠冥魂",
        "冰晶凤凰": "冰晶凤凰", "冰鸟": "冰晶凤凰", "艾尼维亚": "冰晶凤凰", "凤凰": "冰晶凤凰",
        "虚空恐惧": "虚空恐惧", "大虫子": "虚空恐惧", "科加斯": "虚空恐惧",
        "远古恐惧": "远古恐惧", "稻草人": "远古恐惧", "费德提克": "远古恐惧", "末日使者": "远古恐惧",
        "天启者": "天启者", "扇子妈": "天启者", "卡尔玛": "天启者",
        "诺克萨斯统领": "诺克萨斯统领", "乌鸦": "诺克萨斯统领", "斯维因": "诺克萨斯统领",
        "岩雀": "岩雀", "塔莉垭": "岩雀", "石女": "岩雀", "麻雀": "岩雀",
        "翠神": "翠神", "艾翁": "翠神", "草男": "翠神", "蔡徐坤": "翠神",
        "愁云使者": "愁云使者", "薇古丝": "愁云使者", "小恶魔": "愁云使者", "摆烂熊": "愁云使者", "熬夜波比": "愁云使者",
        "符文法师": "符文法师", "瑞兹": "符文法师", "法术机关枪": "符文法师", "光头": "符文法师", "流浪法师": "符文法师",
        "迅捷斥候": "迅捷斥候", "提莫": "迅捷斥候", "提百万": "迅捷斥候", "蘑菇": "迅捷斥候",
        "黑暗之女": "黑暗之女", "安妮": "黑暗之女", "火女": "黑暗之女",
        "九尾妖狐": "九尾妖狐", "阿狸": "九尾妖狐", "狐狸": "九尾妖狐",
        "流光镜影": "流光镜影", "梅尔": "流光镜影", "三体人": "流光镜影",
        "时间刺客": "时间刺客", "艾克": "时间刺客",
        "暮光星灵": "暮光星灵", "佐伊": "暮光星灵", "a女": "暮光星灵", "木瓜星灵": "暮光星灵",
        "铸星龙王": "铸星龙王", "奥瑞利安·索尔": "铸星龙王", "龙王": "铸星龙王", "奥瑞利安索尔": "铸星龙王",
        "虚空先知": "虚空先知", "玛尔扎哈": "虚空先知", "蚂蚱": "虚空先知",
        "机械公敌": "机械公敌", "兰博": "机械公敌", "喷火娃": "机械公敌",
        "荆棘之兴": "荆棘之兴", "婕拉": "荆棘之兴",
        "奥术先驱": "奥术先驱", "维克托": "奥术先驱", "机械先驱": "奥术先驱", "三只手": "奥术先驱",
        "时光守护者": "时光守护者", "基兰": "时光守护者", "时光老头": "时光守护者", "基佬": "时光守护者",
        "虚空之眼": "虚空之眼", "维克兹": "虚空之眼", "大眼": "虚空之眼",
        "爆破鬼才": "爆破鬼才", "吉格斯": "爆破鬼才", "炸弹人": "爆破鬼才",
        "死亡颂唱者": "死亡颂唱者", "卡尔萨斯": "死亡颂唱者", "死歌": "死亡颂唱者",
        "沙漠皇帝": "沙漠皇帝", "阿兹尔": "沙漠皇帝", "沙皇": "沙漠皇帝", "黄鸡": "沙漠皇帝", "脆皮鸡": "沙漠皇帝",
        "灵罗娃娃": "灵罗娃娃", "格温": "灵罗娃娃",
        "狂野女猎手": "狂野女猎手", "豹女": "狂野女猎手", "奶大力": "狂野女猎手", "奈德丽": "狂野女猎手", "豹子": "狂野女猎手", "暴女": "狂野女猎手",
        "异画师": "异画师", "绘师": "异画师", "画家": "异画师", "水墨法师": "异画师", "彗": "异画师",
        "双界灵兔": "双界灵兔", "灵兔": "双界灵兔", "兔子": "双界灵兔", "阿萝拉": "双界灵兔",

        // 射手类
        "寒冰射手": "寒冰射手", "寒冰": "寒冰射手", "艾希": "寒冰射手",
        "探险家": "探险家", "EZ": "探险家", "伊泽瑞尔": "探险家", "小黄毛": "探险家", "伊泽": "探险家", "ez": "探险家",
        "暗夜猎手": "暗夜猎手", "VN": "暗夜猎手", "薇恩": "暗夜猎手", "红眼睛": "暗夜猎手", "红眼镜": "暗夜猎手",
        "皮城女警": "皮城女警", "女警": "皮城女警", "凯特琳": "皮城女警",
        "暴走萝莉": "暴走萝莉", "金克丝": "暴走萝莉",
        "荣耀行刑官": "荣耀行刑官", "德莱文": "荣耀行刑官", "文森特": "荣耀行刑官",
        "瘟疫之源": "瘟疫之源", "老鼠": "瘟疫之源", "图奇": "瘟疫之源",
        "深渊巨口": "深渊巨口", "大嘴": "深渊巨口", "克格莫": "深渊巨口",
        "复仇之矛": "复仇之矛", "滑板鞋": "复仇之矛", "卡莉斯塔": "复仇之矛", "卡莉丝塔": "复仇之矛",
        "圣枪游侠": "圣枪游侠", "卢锡安": "圣枪游侠", "奥巴马": "圣枪游侠", "卢仙": "圣枪游侠",
        "无畏战车": "无畏战车", "螃蟹": "无畏战车", "厄加特": "无畏战车",
        "戏命师": "戏命师", "烬": "戏命师", "四枪": "戏命师",
        "永猎双子": "永猎双子", "千珏": "永猎双子", "羊灵狼灵": "永猎双子",
        "残月之肃": "残月之肃", "月男": "残月之肃", "厄斐琉斯": "残月之肃", "无E凡": "残月之肃", "吴亦凡": "残月之肃",
        "沙漠玫瑰": "沙漠玫瑰", "莎弥拉": "沙漠玫瑰", "沙弥拉": "沙漠玫瑰", "女枪2.0": "沙漠玫瑰",
        "赏金猎人": "赏金猎人", "女枪": "赏金猎人", "厄运小姐": "赏金猎人", "好运姐": "赏金猎人",
        "卡莎": "虚空之女", "虚空之女": "虚空之女",
        "英勇投弹手": "英勇投弹手", "库奇": "英勇投弹手", "飞机": "英勇投弹手",
        "惩戒之箭": "惩戒之箭", "维鲁斯": "惩戒之箭", "韦鲁斯": "惩戒之箭",
        "德玛西亚之翼": "德玛西亚之翼", "奎因": "德玛西亚之翼", "鸟人": "德玛西亚之翼",
        "涤魂圣枪": "涤魂圣枪", "赛娜": "涤魂圣枪",
        "战争女神": "战争女神", "希维尔": "战争女神", "轮子妈": "战争女神",
        "逆羽": "逆羽", "霞": "逆羽",
        "祖安花火": "祖安花火", "泽丽": "祖安花火",
        "麦林炮手": "麦林炮手", "小炮": "麦林炮手", "炮娘": "麦林炮手", "崔丝塔娜": "麦林炮手", "推塔小能手": "麦林炮手",
        "炽炎雏龙": "炽炎雏龙", "小火龙": "炽炎雏龙", "喷火龙": "炽炎雏龙", "奶龙": "炽炎雏龙", "斯莫德": "炽炎雏龙",
        "不羁之悦": "不羁之悦", "尼菈": "不羁之悦", "尼拉": "不羁之悦", "水弥拉": "不羁之悦", "水鞭妹": "不羁之悦", "鞭姐": "不羁之悦",
        "不破之誓": "不破之誓", "云娜": "不破之誓", "芸阿娜": "不破之誓",

        // 辅助类
        "风暴之怒": "风暴之怒", "风女": "风暴之怒", "迦娜": "风暴之怒",
        "众星之子": "众星之子", "星妈": "众星之子", "索拉卡": "众星之子", "奶妈": "众星之子",
        "琴瑟仙女": "琴瑟仙女", "琴女": "琴瑟仙女", "娑娜": "琴瑟仙女", "三色果盘": "琴瑟仙女",
        "仙灵女巫": "仙灵女巫", "璐璐": "仙灵女巫",
        "唤潮鲛姬": "唤潮鲛姬", "娜美": "唤潮鲛姬", "人鱼": "唤潮鲛姬", "美人鱼": "唤潮鲛姬",
        "星界游神": "星界游神", "巴德": "星界游神",
        "蜘蛛女皇": "蜘蛛女皇", "蜘蛛": "蜘蛛女皇", "伊莉丝": "蜘蛛女皇",
        "堕落天使": "堕落天使", "莫甘娜": "堕落天使", "黑妹": "堕落天使",
        "正义天使": "正义天使", "天使": "正义天使", "凯尔": "正义天使", "大天使": "正义天使",
        "祖安怒兽": "祖安怒兽", "狼人": "祖安怒兽", "沃里克": "祖安怒兽", "嗜血猎手": "祖安怒兽",
        "雪原双子": "雪原双子", "雪人": "雪原双子", "努努": "雪原双子", "努努和威朗普": "雪原双子",
        "魔法猫咪": "魔法猫咪", "悠米": "魔法猫咪", "猫": "魔法猫咪", "猫咪": "魔法猫咪",
        "星籁歌姬": "星籁歌姬", "萨勒芬妮": "星籁歌姬", "歌姬": "星籁歌姬",
        "镕铁少女": "镕铁少女", "芮尔": "镕铁少女", "铁女": "镕铁少女",
        "含羞蓓蕾": "含羞蓓蕾", "莉莉娅": "含羞蓓蕾", "鹿女": "含羞蓓蕾", "小鹿": "含羞蓓蕾", "梦鹿": "含羞蓓蕾",
        "明烛": "明烛", "米利欧": "明烛", "小灯笼": "明烛",
        "幻翎": "幻翎", "洛": "幻翎",
        "炼金男爵": "炼金男爵", "炼金妈": "炼金男爵", "男爵妈": "炼金男爵", "烈娜塔": "炼金男爵", "烈娜塔·戈拉斯克": "炼金男爵",

        // 快乐风男系列
        "疾风剑豪": "疾风剑豪", "托儿索": "疾风剑豪", "快乐风男": "疾风剑豪", "亚索": "疾风剑豪", "压缩": "疾风剑豪", "风男": "疾风剑豪", "剑豪": "疾风剑豪"
    };

    let searchInput = null;
    let isProcessing = false;
    let tipsSearchInput = null;

    // 等待页面加载完成
    window.addEventListener('load', function() {
        setTimeout(enhanceSearch功能, 2000);
    });

    function enhanceSearch功能() {
        // 精确查找搜索输入框
        searchInput = document.getElementById('championSearchAndFilter');

        if (!searchInput) {
            console.log('未找到搜索输入框，重试中...');
            setTimeout(enhanceSearch功能, 1000);
            return;
        }

        console.log('找到OP.GG搜索输入框，启用中文搜索功能');

        // 移除旧的事件监听器
        searchInput.removeEventListener('input', handleInput);
        searchInput.removeEventListener('keydown', handleKeyDown);

        // 添加新的事件监听器
        searchInput.addEventListener('input', handleInput);
        searchInput.addEventListener('keydown', handleKeyDown);

        addSearchTips();
    }

    function handleInput(e) {
        if (isProcessing) return;

        const inputValue = e.target.value.trim();

        if (!inputValue) return;

        // 检查是否是中文诙谐名
        let actualSearchName = heroNameMap[inputValue];

        if (actualSearchName) {
            console.log(`检测到中文名: ${inputValue} -> ${actualSearchName}`);
            isProcessing = true;

            // 使用更可靠的方法来触发搜索
            triggerSearch(actualSearchName);
        }
    }

    function handleKeyDown(e) {
        if (isProcessing) return;

        // 如果用户按回车，也检查是否需要转换
        if (e.key === 'Enter') {
            const inputValue = searchInput.value.trim();
            let actualSearchName = heroNameMap[inputValue];

            if (actualSearchName) {
                console.log(`回车键检测到中文名: ${inputValue} -> ${actualSearchName}`);
                isProcessing = true;
                triggerSearch(actualSearchName);
                e.preventDefault();
            }
        }
    }

    function triggerSearch(englishName) {
        // 方法1: 直接设置值并触发事件
        searchInput.value = englishName;

        // 触发多种事件以确保React状态更新
        const events = ['input', 'change', 'keyup', 'keydown', 'blur', 'focus'];
        events.forEach(eventType => {
            const event = new Event(eventType, { bubbles: true, cancelable: true });
            searchInput.dispatchEvent(event);
        });

        // 方法2: 模拟用户输入（更可靠的方法）
        simulateUserInput(englishName);
    }

    function simulateUserInput(text) {
        // 更彻底的模拟用户输入
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, "value"
        ).set;

        // 先清空
        nativeInputValueSetter.call(searchInput, '');
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));

        // 延迟后设置新值
        setTimeout(() => {
            nativeInputValueSetter.call(searchInput, text);

            // 触发所有可能的事件
            const inputEvent = new Event('input', { bubbles: true, cancelable: true });
            const changeEvent = new Event('change', { bubbles: true, cancelable: true });

            searchInput.dispatchEvent(inputEvent);
            searchInput.dispatchEvent(changeEvent);

            // 额外触发键盘事件
            const keydownEvent = new KeyboardEvent('keydown', {
                bubbles: true, cancelable: true, key: 'a'
            });
            const keyupEvent = new KeyboardEvent('keyup', {
                bubbles: true, cancelable: true, key: 'a'
            });

            searchInput.dispatchEvent(keydownEvent);
            searchInput.dispatchEvent(keyupEvent);

            // 强制聚焦
            searchInput.focus();

            console.log('已完成搜索触发:', text);

            // 重置处理状态
            setTimeout(() => {
                isProcessing = false;
            }, 100);

        }, 50);
    }

    function addSearchTips() {
        // 移除可能已存在的提示框
        const existingTips = document.getElementById('opgg-chinese-search-tips');
        if (existingTips) {
            existingTips.remove();
        }

        const tipsContainer = document.createElement('div');
        tipsContainer.id = 'opgg-chinese-search-tips';
        tipsContainer.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 12px;
            z-index: 10000;
            max-width: 320px;
            backdrop-filter: blur(10px);
            border: 2px solid #ffdd44;
            box-shadow: 0 4px 20px rgba(0,0,0,0.4);
            font-family: system-ui, -apple-system, sans-serif;
        `;

        tipsContainer.innerHTML = `
            <h4 style="margin: 0 0 12px 0; color: #ffdd44; font-size: 14px; display: flex; align-items: center; gap: 8px;">
                🎮 OP.GG 中文搜索
            </h4>
            <div style="max-height: 350px; overflow-y: auto;">
                <div style="margin-bottom: 12px;">
                    <input type="text" id="tips-search-input" placeholder="🔍 输入中文昵称搜索..."
                           style="width: 100%; padding: 8px; border: 1px solid #444; border-radius: 6px;
                                  background: rgba(255,255,255,0.1); color: white; font-size: 12px;
                                  outline: none; transition: border 0.2s;">
                    <div id="search-suggestions" style="margin-top: 8px; max-height: 120px; overflow-y: auto; display: none;"></div>
                </div>
                <p style="margin: 8px 0; font-weight: bold; color: #e0e0e0;">支持中文诙谐名搜索：</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px; line-height: 1.4;">
                    <div><span style="color: #ff6b6b;">战士:</span> 盖伦 诺手 鳄鱼</div>
                    <div><span style="color: #4ecdc4;">刺客:</span> 劫 男刀 螳螂</div>
                    <div><span style="color: #45b7d1;">射手:</span> 寒冰 EZ VN</div>
                    <div><span style="color: #96ceb4;">辅助:</span> 风女 星妈 琴女</div>
                    <div><span style="color: #feca57;">法师:</span> 火男 冰女 发条</div>
                    <div><span style="color: #ff9ff3;">坦克:</span> 石头人 牛头 锤石</div>
                </div>
                <p style="margin: 10px 0 5px 0; font-size: 11px; color: #aaa;">输入示例：</p>
                <div style="font-size: 10px; color: #ccc; background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    "托儿索" → 亚索 &nbsp;|&nbsp; "快乐风男" → 亚索<br>
                    "草丛伦" → 盖伦 &nbsp;|&nbsp; "儿童劫" → 劫
                </div>
                <p style="margin: 8px 0 0 0; font-size: 11px; color: #88ff88;">✓ 自动转换并立即搜索</p>
            </div>
        `;

        document.body.appendChild(tipsContainer);

        // 获取提示框内的搜索输入框
        tipsSearchInput = document.getElementById('tips-search-input');
        const searchSuggestions = document.getElementById('search-suggestions');

        // 为提示框搜索输入框添加事件监听
        if (tipsSearchInput) {
            tipsSearchInput.addEventListener('input', function(e) {
                const inputValue = e.target.value.trim();

                if (inputValue) {
                    // 显示搜索建议
                    showSearchSuggestions(inputValue, searchSuggestions);
                } else {
                    searchSuggestions.style.display = 'none';
                }
            });

            tipsSearchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const inputValue = e.target.value.trim();
                    if (inputValue) {
                        handleTipsSearch(inputValue);
                        e.target.value = '';
                        searchSuggestions.style.display = 'none';
                    }
                }
            });

            // 输入框聚焦时改变边框颜色
            tipsSearchInput.addEventListener('focus', function() {
                this.style.borderColor = '#ffdd44';
            });

            tipsSearchInput.addEventListener('blur', function() {
                this.style.borderColor = '#444';
            });
        }

        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 10px;
            background: rgba(255,221,68,0.2);
            border: none;
            color: #ffdd44;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        `;
        closeBtn.onmouseover = () => closeBtn.style.background = 'rgba(255,221,68,0.4)';
        closeBtn.onmouseout = () => closeBtn.style.background = 'rgba(255,221,68,0.2)';
        closeBtn.onclick = () => tipsContainer.remove();
        tipsContainer.appendChild(closeBtn);

        // 10秒后淡出提示
        setTimeout(() => {
            if (document.body.contains(tipsContainer)) {
                tipsContainer.style.transition = 'opacity 2s';
                tipsContainer.style.opacity = '0.6';

                // 点击时完全显示
                tipsContainer.onclick = () => {
                    tipsContainer.style.opacity = '1';
                };
            }
        }, 10000);
    }

    function showSearchSuggestions(input, container) {
        const matches = [];

        // 查找匹配的中文昵称
        for (const [chineseName, englishName] of Object.entries(heroNameMap)) {
            if (chineseName.includes(input)) {
                matches.push({ chineseName, englishName });
                if (matches.length >= 8) break; // 限制显示数量
            }
        }

        if (matches.length > 0) {
            container.innerHTML = matches.map(match =>
                `<div class="suggestion-item"
                      style="padding: 6px 8px; cursor: pointer; border-radius: 4px; margin-bottom: 2px;
                             background: rgba(255,255,255,0.05); transition: background 0.2s;"
                      onmouseover="this.style.background='rgba(255,221,68,0.2)'"
                      onmouseout="this.style.background='rgba(255,255,255,0.05)'"
                      data-english="${match.englishName}">
                    <span style="color: #ffdd44;">${match.chineseName}</span>
                    <span style="color: #888; font-size: 10px; float: right;">→ ${match.englishName}</span>
                 </div>`
            ).join('');

            // 添加点击事件
            container.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    const englishName = this.getAttribute('data-english');
                    handleTipsSearch(englishName);
                    tipsSearchInput.value = '';
                    container.style.display = 'none';
                });
            });

            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    function handleTipsSearch(searchTerm) {
        if (!searchInput) return;

        // 检查是否是中文昵称
        let actualSearchName = heroNameMap[searchTerm] || searchTerm;

        console.log(`提示框搜索: ${searchTerm} -> ${actualSearchName}`);
        isProcessing = true;

        // 触发搜索
        triggerSearch(actualSearchName);

        // 聚焦到主搜索框
        searchInput.focus();
    }

    // 监听页面变化（OP.GG是单页应用）
    let currentUrl = location.href;
    const observer = new MutationObserver(function() {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            // 页面变化后重新增强搜索功能
            setTimeout(() => {
                enhanceSearch功能();
                // 重新添加提示框
                setTimeout(addSearchTips, 500);
            }, 1500);
        }
    });

    observer.observe(document, { subtree: true, childList: true });

    // 页面加载完成后也尝试添加提示
    setTimeout(addSearchTips, 3000);
})();
