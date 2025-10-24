// ==UserScript==
// @name         OPGG英雄中文诙谐名搜索
// @namespace   https://github.com/LongMan98/personal-script
// @version      2025.10.24
// @description  为OP.GG游戏模式页面添加英雄中文诙谐名搜索功能
// @license      MIT
// @author       LongMan98
// @match        https://op.gg/zh-cn/lol/modes/*
// @match        https://op.gg/lol/modes/*
// @icon         https://opgg-static.akamaized.net/meta/images/lol/latest/champion/寒冰射手.png?image=e_upscale,c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160
// @updateURL    https://wget.la/https://raw.githubusercontent.com/LongMan98/personal-script/main/LoL/OPGG%E8%8B%B1%E9%9B%84%E4%B8%AD%E6%96%87%E8%AF%99%E8%B0%90%E5%90%8D%E6%90%9C%E7%B4%A2.user.js
// @downloadURL  https://wget.la/https://raw.githubusercontent.com/LongMan98/personal-script/main/LoL/OPGG%E8%8B%B1%E9%9B%84%E4%B8%AD%E6%96%87%E8%AF%99%E8%B0%90%E5%90%8D%E6%90%9C%E7%B4%A2.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 完整的中文诙谐名、拼音到官方中文名的映射
    const heroNameMap = {
        // 战士类
        "德玛西亚之力": "德玛西亚之力", "盖伦": "德玛西亚之力", "大宝剑": "德玛西亚之力", "草丛伦": "德玛西亚之力", "gay伦": "德玛西亚之力",
        "demaxiyazhili": "德玛西亚之力", "gailun": "德玛西亚之力", "dabaojian": "德玛西亚之力", "caoconglun": "德玛西亚之力", "gaylun": "德玛西亚之力",
        "诺克萨斯之手": "诺克萨斯之手", "诺手": "诺克萨斯之手", "达瑞斯": "诺克萨斯之手", "人头狗": "诺克萨斯之手", "德莱厄斯": "诺克萨斯之手",
        "nuokesasizhishou": "诺克萨斯之手", "nuoshou": "诺克萨斯之手", "daruisi": "诺克萨斯之手", "rentougou": "诺克萨斯之手", "delaiesi": "诺克萨斯之手",
        "荒漠屠夫": "荒漠屠夫", "鳄鱼": "荒漠屠夫", "雷克顿": "荒漠屠夫",
        "huangmotufu": "荒漠屠夫", "eyu": "荒漠屠夫", "leikedun": "荒漠屠夫",
        "沙漠死神": "沙漠死神", "狗头": "沙漠死神", "内瑟斯": "沙漠死神",
        "shamossishen": "沙漠死神", "goutou": "沙漠死神", "neisesi": "沙漠死神",
        "暗裔剑魔": "暗裔剑魔", "剑魔": "暗裔剑魔", "亚托克斯": "暗裔剑魔",
        "anyijianmo": "暗裔剑魔", "jianmo": "暗裔剑魔", "yatuokesi": "暗裔剑魔",
        "无双剑姬": "无双剑姬", "剑姬": "无双剑姬", "菲奥娜": "无双剑姬",
        "wushuangjianji": "无双剑姬", "jianji": "无双剑姬", "feiaona": "无双剑姬",
        "青钢影": "青钢影", "卡蜜尔": "青钢影", "剪刀腿": "青钢影",
        "qinggangying": "青钢影", "kami'er": "青钢影", "jiandaotui": "青钢影",
        "腕豪": "腕豪", "瑟提": "腕豪", "劲夫": "腕豪", "万豪": "腕豪",
        "wanhao": "腕豪", "seti": "腕豪", "jingfu": "腕豪",
        "德邦总管": "德邦总管", "赵信": "德邦总管", "赵云": "德邦总管", "赵子龙": "德邦总管", "菊花信": "德邦总管",
        "debangzongguan": "德邦总管", "zhaoxin": "德邦总管", "zhaoyun": "德邦总管", "zhaozilong": "德邦总管", "juhuaxin": "德邦总管",
        "德玛西亚皇子": "德玛西亚皇子", "皇子": "德玛西亚皇子", "嘉文四世": "德玛西亚皇子",
        "demaxiyahuangzi": "德玛西亚皇子", "huangzi": "德玛西亚皇子", "jiawensishi": "德玛西亚皇子",
        "无极剑圣": "无极剑圣", "剑圣": "无极剑圣", "易大师": "无极剑圣", "蛮易信": "无极剑圣",
        "wujijiansheng": "无极剑圣", "jiansheng": "无极剑圣", "yidashi": "无极剑圣", "manyixin": "无极剑圣",
        "蛮族之王": "蛮族之王", "蛮王": "蛮族之王", "蛮子": "蛮族之王", "五秒真男人": "蛮族之王", "泰达米尔": "蛮族之王",
        "manzuzhiwang": "蛮族之王", "manwang": "蛮族之王", "manzi": "蛮族之王", "wumiaozhennanren": "蛮族之王", "taidamier": "蛮族之王",
        "武器大师": "武器大师", "武器": "武器大师", "贾克斯": "武器大师",
        "wuqidashi": "武器大师", "wuqi": "武器大师", "jiakesi": "武器大师",
        "盲僧": "盲僧", "李青": "盲僧", "瞎子": "盲僧", "小学僧": "盲僧",
        "mang-seng": "盲僧", "liqing": "盲僧", "xiazi": "盲僧", "xiaoxueseng": "盲僧",
        "解脱者": "解脱者", "偷男": "解脱者", "塞拉斯": "解脱者", "蒜男": "解脱者",
        "jietuozhe": "解脱者", "tounan": "解脱者", "sailasi": "解脱者", "suannan": "解脱者",
        "牧魂人": "牧魂人", "约里克": "牧魂人", "掘墓者": "牧魂人", "掘墓": "牧魂人",
        "muhunren": "牧魂人", "yuelike": "牧魂人", "ju-muzhe": "牧魂人", "jumu": "牧魂人",
        "虚空女皇": "虚空女皇", "卑尔维斯": "虚空女皇", "阿尔卑斯": "虚空女皇", "虚空鱼": "虚空女皇",
        "xukongnvhuang": "虚空女皇", "bei'erweisi": "虚空女皇", "a'erbeisi": "虚空女皇", "xukongyu": "虚空女皇",
        "暴怒骑士": "暴怒骑士", "克烈": "暴怒骑士",
        "baonuqishi": "暴怒骑士", "kelie": "暴怒骑士",
        "狂战士": "狂战士", "奥拉夫": "狂战士", "疯狗": "狂战士",
        "kuangzhanshi": "狂战士", "aolafu": "狂战士", "fenggou": "狂战士",
        "兽灵行者": "兽灵行者", "乌迪尔": "兽灵行者",
        "shoulingxingzhe": "兽灵行者", "wudi'er": "兽灵行者",
        "龙血武姬": "龙血武姬", "龙女": "龙血武姬", "希瓦娜": "龙血武姬",
        "longxuewuji": "龙血武姬", "longnv": "龙血武姬", "xiwana": "龙血武姬",
        "战争之影": "战争之影", "人马": "战争之影", "赫卡里姆": "战争之影",
        "zhanzhengzhiying": "战争之影", "renma": "战争之影", "hekalimu": "战争之影",
        "法外狂徒": "法外狂徒", "男枪": "法外狂徒", "格雷福斯": "法外狂徒",
        "fawaikuangtu": "法外狂徒", "nanqiang": "法外狂徒", "geleifusi": "法外狂徒",
        "刀锋舞者": "刀锋舞者", "刀妹": "刀锋舞者", "艾瑞莉娅": "刀锋舞者", "女刀": "刀锋舞者",
        "daofengwuzhe": "刀锋舞者", "daomei": "刀锋舞者", "airuiliya": "刀锋舞者", "nvdao": "刀锋舞者",
        "未来守护者": "未来守护者", "杰斯": "未来守护者", "塔利斯议员": "未来守护者",
        "weilai-shouzhe": "未来守护者", "jiesi": "未来守护者", "talisiyiyuan": "未来守护者",
        "海洋之灾": "海洋之灾", "船长": "海洋之灾", "桶子哥": "海洋之灾", "普朗克": "海洋之灾", "橘子哥": "海洋之灾",
        "haiyangzhizai": "海洋之灾", "chuanzhang": "海洋之灾", "tongzige": "海洋之灾", "pulangke": "海洋之灾", "juzige": "海洋之灾",
        "迷失之牙": "迷失之牙", "纳尔": "迷失之牙", "小纳尔": "迷失之牙", "大纳尔": "迷失之牙",
        "mishizhiya": "迷失之牙", "naer": "迷失之牙", "xiaona'er": "迷失之牙", "dana'er": "迷失之牙",
        "不屈之枪": "不屈之枪", "潘森": "不屈之枪", "斯巴达": "不屈之枪", "长枪哥": "不屈之枪",
        "buquzhiqiang": "不屈之枪", "pansen": "不屈之枪", "sibada": "不屈之枪", "changqiangge": "不屈之枪",
        "皮城执法官": "皮城执法官", "蔚": "皮城执法官", "拳姐": "皮城执法官", "皮城大姐头": "皮城执法官",
        "pichengzhifaguan": "皮城执法官", "wei": "皮城执法官", "quanjie": "皮城执法官", "pichengdajietou": "皮城执法官",
        "齐天大圣": "齐天大圣", "猴子": "齐天大圣", "悟空": "齐天大圣", "猴哥": "齐天大圣", "孙悟空": "齐天大圣",
        "qitiandasheng": "齐天大圣", "houzi": "齐天大圣", "wukong": "齐天大圣", "houge": "齐天大圣", "sunwukong": "齐天大圣",
        "百裂冥犬": "百裂冥犬", "纳亚菲利": "百裂冥犬",
        "bailiemingquan": "百裂冥犬", "nay afeili": "百裂冥犬",
        "铁血狼母": "铁血狼母", "狼母": "铁血狼母", "狼妈": "铁血狼母", "铁血母狼": "铁血狼母", "安蓓萨": "铁血狼母",
        "tiexuelangmu": "铁血狼母", "langmu": "铁血狼母", "langma": "铁血狼母", "tiexuemulang": "铁血狼母", "anbeisa": "铁血狼母",
        "狂厄蔷薇": "狂厄蔷薇", "蔷薇": "狂厄蔷薇", "小蔷薇": "狂厄蔷薇", "抽血泵": "狂厄蔷薇", "疯批蔷薇": "狂厄蔷薇", "荆棘妹": "狂厄蔷薇", "贝蕾亚": "狂厄蔷薇",
        "kuangeqiangwei": "狂厄蔷薇", "qiangwei": "狂厄蔷薇", "xiaoqiangwei": "狂厄蔷薇", "chouxuebeng": "狂厄蔷薇", "fengpiqiangwei": "狂厄蔷薇", "jingjimei": "狂厄蔷薇", "beileiya": "狂厄蔷薇",

        // 刺客类
        "影流之主": "影流之主", "劫": "影流之主", "儿童劫": "影流之主",
        "yingliuzhizhu": "影流之主", "jie": "影流之主", "ertongjie": "影流之主",
        "刀锋之影": "刀锋之影", "男刀": "刀锋之影", "泰隆": "刀锋之影",
        "daofengzhiying": "刀锋之影", "nandao": "刀锋之影", "tailong": "刀锋之影",
        "虚空掠夺者": "虚空掠夺者", "螳螂": "虚空掠夺者", "卡兹克": "虚空掠夺者", "喜之郎": "虚空掠夺者",
        "xukonglueduozhe": "虚空掠夺者", "tanglang": "虚空掠夺者", "kazike": "虚空掠夺者", "xizhilang": "虚空掠夺者",
        "傲之追猎者": "傲之追猎者", "狮子狗": "傲之追猎者", "雷恩加尔": "傲之追猎者",
        "aozhizhuiliezhe": "傲之追猎者", "shizigou": "傲之追猎者", "leienjiaer": "傲之追猎者",
        "潮汐海灵": "潮汐海灵", "小鱼人": "潮汐海灵", "菲兹": "潮汐海灵", "鲇鱼": "潮汐海灵", "小鱼": "潮汐海灵",
        "chaoxihailing": "潮汐海灵", "xiaoyuren": "潮汐海灵", "feizi": "潮汐海灵", "nianyu": "潮汐海灵", "xiaoyu": "潮汐海灵",
        "离群之刺": "离群之刺", "阿卡丽": "离群之刺", "快乐刺客": "离群之刺", "暗影之拳": "离群之刺",
        "liqunzhici": "离群之刺", "akali": "离群之刺", "kuailecike": "离群之刺", "anyingzhiquan": "离群之刺",
        "不祥之刃": "不祥之刃", "卡特": "不祥之刃", "卡特琳娜": "不祥之刃",
        "buxiangzhiren": "不祥之刃", "kate": "不祥之刃", "katelinna": "不祥之刃",
        "血港鬼影": "血港鬼影", "派克": "血港鬼影", "水鬼": "血港鬼影",
        "xuegangguiying": "血港鬼影", "paike": "血港鬼影", "shuigui": "血港鬼影",
        "封魔剑魂": "封魔剑魂", "永恩": "封魔剑魂", "亚索哥": "封魔剑魂", "快乐风男他哥": "封魔剑魂",
        "fengmojianhun": "封魔剑魂", "yongen": "封魔剑魂", "yasuoge": "封魔剑魂", "kuailefengnantage": "封魔剑魂",
        "影哨": "影哨", "阿克尚": "影哨", "阿克曼": "影哨",
        "yingshao": "影哨", "akeshang": "影哨", "akeman": "影哨",
        "破败之王": "破败之王", "佛耶戈": "破败之王", "佛爷": "破败之王", "破败王": "破败之王", "破财王": "破败之王",
        "pobaizhiwang": "破败之王", "foyegao": "破败之王", "foye": "破败之王", "pobaiwang": "破败之王", "pocaizhiwang": "破败之王",
        "影流之镰": "影流之镰", "凯隐": "影流之镰", "拉亚斯特": "影流之镰", "红凯": "影流之镰", "蓝凯": "影流之镰", "凯": "影流之镰", "镰刀": "影流之镰", "凯影": "影流之镰",
        "yingliuzhilian": "影流之镰", "kaiyin": "影流之镰", "layasite": "影流之镰", "hongkai": "影流之镰", "lankai": "影流之镰", "kai": "影流之镰", "liandao": "影流之镰", "kaiying": "影流之镰",
        "元素女皇": "元素女皇", "奇亚娜": "元素女皇", "盘子妈": "元素女皇",
        "yuansunvhuang": "元素女皇", "qiyana": "元素女皇", "panzima": "元素女皇",
        "恶魔小丑": "恶魔小丑", "小丑": "恶魔小丑", "萨科": "恶魔小丑",
        "emoxiaochou": "恶魔小丑", "xiaochou": "恶魔小丑", "sake": "恶魔小丑",
        "皎月女神": "皎月女神", "黛安娜": "皎月女神", "皎月": "皎月女神", "露娜": "皎月女神",
        "jiaoyuenvshen": "皎月女神", "daianna": "皎月女神", "jiaoyue": "皎月女神", "luna": "皎月女神",
        "痛苦之拥": "痛苦之拥", "伊芙琳": "痛苦之拥", "寡妇": "痛苦之拥",
        "tongkuzhiyong": "痛苦之拥", "yifulin": "痛苦之拥", "gua-fu": "痛苦之拥",
        "虚空行者": "虚空行者", "卡萨丁": "虚空行者", "基霸脸": "虚空行者",
        "xukongxingzhe": "虚空行者", "kasading": "虚空行者", "jibalian": "虚空行者",
        "诡术妖姬": "诡术妖姬", "乐芙兰": "诡术妖姬", "妖姬": "诡术妖姬", "提款姬": "诡术妖姬",
        "guishuyaoji": "诡术妖姬", "lefulan": "诡术妖姬", "yaoji": "诡术妖姬", "tikuanji": "诡术妖姬",
        "放逐之刃": "放逐之刃", "锐雯": "放逐之刃",
        "fangzhuzhiren": "放逐之刃", "ruiwen": "放逐之刃",
        "永恒梦魇": "永恒梦魇", "魔腾": "永恒梦魇", "梦魇": "永恒梦魇",
        "yonghengmengyan": "永恒梦魇", "moteng": "永恒梦魇", "mengyan": "永恒梦魇",
        "虚空遁地兽": "虚空遁地兽", "挖掘机": "虚空遁地兽", "雷克塞": "虚空遁地兽", "土龙": "虚空遁地兽", "地鼠": "虚空遁地兽", "挖机": "虚空遁地兽",
        "xukongdundishou": "虚空遁地兽", "wajueji": "虚空遁地兽", "leikesai": "虚空遁地兽", "tulong": "虚空遁地兽", "dishu": "虚空遁地兽", "waji": "虚空遁地兽",

        // 坦克类
        "扭曲树精": "扭曲树精", "大树": "扭曲树精", "茂凯": "扭曲树精", "树精": "扭曲树精", "树人": "扭曲树精",
        "niuqushujing": "扭曲树精", "dashu": "扭曲树精", "maokai": "扭曲树精", "shujing": "扭曲树精", "shuren": "扭曲树精",
        "熔岩巨兽": "熔岩巨兽", "石头人": "熔岩巨兽", "墨菲特": "熔岩巨兽", "混分巨兽": "熔岩巨兽", "岩头人": "熔岩巨兽",
        "rongyanjushou": "熔岩巨兽", "shitouren": "熔岩巨兽", "mofeite": "熔岩巨兽", "hunfenjushou": "熔岩巨兽", "yantouren": "熔岩巨兽",
        "牛头酋长": "牛头酋长", "牛头": "牛头酋长", "阿里斯塔": "牛头酋长", "阿利斯塔": "牛头酋长", "牛头人": "牛头酋长", "ntr": "牛头酋长",
        "niutouqiuzhang": "牛头酋长", "niutou": "牛头酋长", "alisita": "牛头酋长", "alisita": "牛头酋长", "niutouren": "牛头酋长",
        "蒸汽机器人": "蒸汽机器人", "机器人": "蒸汽机器人", "布里茨": "蒸汽机器人",
        "zhengqijiqiren": "蒸汽机器人", "jiqiren": "蒸汽机器人", "bulici": "蒸汽机器人",
        "魂锁典狱长": "魂锁典狱长", "锤石": "魂锁典狱长", "钩子": "魂锁典狱长",
        "hunsuodian-yuzhang": "魂锁典狱长", "chuishi": "魂锁典狱长", "gouzi": "魂锁典狱长",
        "深海泰坦": "深海泰坦", "泰坦": "深海泰坦", "诺提勒斯": "深海泰坦",
        "shenhaitaitan": "深海泰坦", "taitan": "深海泰坦", "nuotilesi": "深海泰坦",
        "弗雷尔卓德之心": "弗雷尔卓德之心", "布隆": "弗雷尔卓德之心", "门板": "弗雷尔卓德之心",
        "fuleierzhuodezhixin": "弗雷尔卓德之心", "bulong": "弗雷尔卓德之心", "menban": "弗雷尔卓德之心",
        "曙光女神": "曙光女神", "日女": "曙光女神", "蕾欧娜": "曙光女神", "曙光": "曙光女神", "女坦": "曙光女神", "太阳女孩": "曙光女神",
        "shuguangnvshen": "曙光女神", "rinu": "曙光女神", "leiaona": "曙光女神", "shuguang": "曙光女神", "nvtan": "曙光女神", "taiyangnvhai": "曙光女神",
        "北地之怒": "北地之怒", "猪妹": "北地之怒", "瑟庄妮": "北地之怒",
        "beidizhinu": "北地之怒", "zhumei": "北地之怒", "sezhuangni": "北地之怒",
        "披甲龙龟": "披甲龙龟", "龙龟": "披甲龙龟", "拉莫斯": "披甲龙龟", "王八": "披甲龙龟", "反甲龟": "披甲龙龟",
        "pijialonggui": "披甲龙龟", "longgui": "披甲龙龟", "lamosi": "披甲龙龟", "wangba": "披甲龙龟", "fanjiagui": "披甲龙龟",
        "上古领主": "上古领主", "蝎子": "上古领主", "斯卡纳": "上古领主", "水晶先锋": "上古领主",
        "shanggulingzhu": "上古领主", "xiezi": "上古领主", "sikana": "上古领主", "shuijingxianfeng": "上古领主",
        "不灭狂雷": "不灭狂雷", "狗熊": "不灭狂雷", "沃利贝尔": "不灭狂雷",
        "bumiekuanglei": "不灭狂雷", "gouxiong": "不灭狂雷", "wolibeier": "不灭狂雷",
        "殇之木乃伊": "殇之木乃伊", "木乃伊": "殇之木乃伊", "阿木木": "殇之木乃伊", "木木": "殇之木乃伊",
        "shangzhimunaiyi": "殇之木乃伊", "munaiyi": "殇之木乃伊", "amumu": "殇之木乃伊", "mumu": "殇之木乃伊",
        "shen": "shen", "暮光之眼": "shen", "肾": "shen", "腰子": "shen",
        "shen": "shen", "muguangzhiyan": "shen", "shen": "shen", "yaozi": "shen",
        "河流之王": "河流之王", "塔姆": "河流之王", "塔姆肯奇": "河流之王", "蛤蟆": "河流之王", "鲶鱼": "河流之王", "塔姆·肯奇": "河流之王",
        "heliuzhiwang": "河流之王", "tamu": "河流之王", "tamukengqi": "河流之王", "hama": "河流之王", "nianyu": "河流之王", "tamukengqi": "河流之王",
        "山隐之焰": "山隐之焰", "奥恩": "山隐之焰", "羊驼": "山隐之焰", "山羊": "山隐之焰", "羊": "山隐之焰", "铁头娃": "山隐之焰",
        "shanyinzhiyan": "山隐之焰", "aoen": "山隐之焰", "yangtuo": "山隐之焰", "shanyang": "山隐之焰", "yang": "山隐之焰", "tietouwa": "山隐之焰",
        "圣锤之毅": "圣锤之毅", "波比": "圣锤之毅",
        "shengchuizhiyi": "圣锤之毅", "bobi": "圣锤之毅",
        "正义巨像": "正义巨像", "加里奥": "正义巨像", "石像鬼": "正义巨像", "城墙": "正义巨像", "蝙蝠侠": "正义巨像",
        "zhengyijuxiang": "正义巨像", "jialiao": "正义巨像", "shixianggui": "正义巨像", "chengqiang": "正义巨像", "bianfuxia": "正义巨像",
        "生化魔人": "生化魔人", "扎克": "生化魔人", "绿巨人": "生化魔人", "鼻涕人": "生化魔人", "粑粑人": "生化魔人", "果冻人": "生化魔人", "翔战士": "生化魔人",
        "shenghuamoren": "生化魔人", "zhake": "生化魔人", "lvjuren": "生化魔人", "bitiren": "生化魔人", "babaren": "生化魔人", "guodongren": "生化魔人", "xiangzhanshi": "生化魔人",
        "亡灵战神": "亡灵战神", "赛恩": "亡灵战神", "老司机": "亡灵战神",
        "wanglingzhanshen": "亡灵战神", "saien": "亡灵战神", "laosiji": "亡灵战神",
        "祖安狂人": "祖安狂人", "蒙多": "祖安狂人", "想去哪就去哪": "祖安狂人",
        "zuan-kuangren": "祖安狂人", "mengduo": "祖安狂人", "xiangqunajiuna": "祖安狂人",
        "巨魔之王": "巨魔之王", "特朗德尔": "巨魔之王", "巨魔": "巨魔之王",
        "jumozhiwang": "巨魔之王", "telangde'er": "巨魔之王", "jumo": "巨魔之王",
        "瓦洛兰之盾": "瓦洛兰之盾", "塔里克": "瓦洛兰之盾", "宝石": "瓦洛兰之盾",
        "waluolanzhidun": "瓦洛兰之盾", "talike": "瓦洛兰之盾", "baoshi": "瓦洛兰之盾",
        "万花通灵": "万花通灵", "妮蔻": "万花通灵", "niko": "万花通灵",
        "wanhuatongling": "万花通灵", "nikou": "万花通灵", "niko": "万花通灵",
        "海兽祭司": "海兽祭司", "俄洛伊": "海兽祭司", "章鱼妈": "海兽祭司", "触手妈": "海兽祭司",
        "haishoujisi": "海兽祭司", "eluoyi": "海兽祭司", "zhangyuma": "海兽祭司", "chushouma": "海兽祭司",
        "纳祖芒荣耀": "纳祖芒荣耀", "黑人": "纳祖芒荣耀", "老黑": "纳祖芒荣耀", "傲岸雄姿": "纳祖芒荣耀", "奎桑提": "纳祖芒荣耀",
        "nazumangrongyao": "纳祖芒荣耀", "heiren": "纳祖芒荣耀", "laohei": "纳祖芒荣耀", "aoanxiongzi": "纳祖芒荣耀", "kuisangti": "纳祖芒荣耀",

        // 法师类
        "复仇焰魂": "复仇焰魂", "火男": "复仇焰魂", "布兰德": "复仇焰魂",
        "fuchouyanhun": "复仇焰魂", "huonan": "复仇焰魂", "bulande": "复仇焰魂",
        "冰霜女巫": "冰霜女巫", "冰女": "冰霜女巫", "丽桑卓": "冰霜女巫",
        "bingshuangnvwu": "冰霜女巫", "bingnv": "冰霜女巫", "lisangzhuo": "冰霜女巫",
        "卡牌大师": "卡牌大师", "卡牌": "卡牌大师", "崔斯特": "卡牌大师",
        "kapaidashi": "卡牌大师", "kapai": "卡牌大师", "cuisite": "卡牌大师",
        "发条魔灵": "发条魔灵", "发条": "发条魔灵", "奥莉安娜": "发条魔灵",
        "fatiaomoling": "发条魔灵", "fatiao": "发条魔灵", "aolianna": "发条魔灵",
        "魔蛇之拥": "魔蛇之拥", "蛇女": "魔蛇之拥", "卡西奥佩娅": "魔蛇之拥",
        "moshezhiyong": "魔蛇之拥", "shenv": "魔蛇之拥", "kaxiaopeiya": "魔蛇之拥",
        "猩红收割者": "猩红收割者", "吸血鬼": "猩红收割者", "弗拉基米尔": "猩红收割者",
        "xinghongshougezhe": "猩红收割者", "xixuegui": "猩红收割者", "fulajimier": "猩红收割者",
        "暗黑元首": "暗黑元首", "辛德拉": "暗黑元首", "球女": "暗黑元首",
        "anheiyuanshou": "暗黑元首", "xindela": "暗黑元首", "qiunv": "暗黑元首",
        "远古巫灵": "远古巫灵", "泽拉斯": "远古巫灵", "三炮": "远古巫灵",
        "yuanguwuling": "远古巫灵", "zelasi": "远古巫灵", "sanpao": "远古巫灵",
        "光辉女郎": "光辉女郎", "光辉": "光辉女郎", "光女": "光辉女郎", "拉克丝": "光辉女郎",
        "guanghuinvlang": "光辉女郎", "guanghui": "光辉女郎", "guangnv": "光辉女郎", "lakesi": "光辉女郎",
        "邪恶小法师": "邪恶小法师", "小法": "邪恶小法师", "维迦": "邪恶小法师",
        "xieexiaofashi": "邪恶小法师", "xiaofa": "邪恶小法师", "weijia": "邪恶小法师",
        "大发明家": "大发明家", "大头": "大发明家", "黑默丁格": "大发明家",
        "dafamingjia": "大发明家", "datou": "大发明家", "heimodingge": "大发明家",
        "狂暴之心": "狂暴之心", "凯南": "狂暴之心", "电耗子": "狂暴之心",
        "kuangbaozhixin": "狂暴之心", "kainan": "狂暴之心", "dianhaozi": "狂暴之心",
        "炼金术士": "炼金术士", "炼金": "炼金术士", "辛吉德": "炼金术士", "毒奶": "炼金术士",
        "lianjinshushi": "炼金术士", "lianjin": "炼金术士", "xinjide": "炼金术士", "dunai": "炼金术士",
        "酒桶": "酒桶", "古拉加斯": "酒桶", "酒男": "酒桶", "啤酒人": "酒桶",
        "jiutong": "酒桶", "gulajiasi": "酒桶", "jiunan": "酒桶", "pijiuren": "酒桶",
        "铁铠冥魂": "铁铠冥魂", "铁男": "铁铠冥魂", "莫德凯撒": "铁铠冥魂", "金属大师": "铁铠冥魂",
        "tiekaiminghun": "铁铠冥魂", "tienan": "铁铠冥魂", "modekaisa": "铁铠冥魂", "jinshudashi": "铁铠冥魂",
        "冰晶凤凰": "冰晶凤凰", "冰鸟": "冰晶凤凰", "艾尼维亚": "冰晶凤凰", "凤凰": "冰晶凤凰",
        "bingjingfenghuang": "冰晶凤凰", "bingniao": "冰晶凤凰", "ainiweiya": "冰晶凤凰", "fenghuang": "冰晶凤凰",
        "虚空恐惧": "虚空恐惧", "大虫子": "虚空恐惧", "科加斯": "虚空恐惧",
        "xukongkongju": "虚空恐惧", "dachongzi": "虚空恐惧", "kejiasi": "虚空恐惧",
        "远古恐惧": "远古恐惧", "稻草人": "远古恐惧", "费德提克": "远古恐惧", "末日使者": "远古恐惧",
        "yuangukongju": "远古恐惧", "daocaoren": "远古恐惧", "feidetike": "远古恐惧", "morishizhe": "远古恐惧",
        "天启者": "天启者", "扇子妈": "天启者", "卡尔玛": "天启者",
        "tianqizhe": "天启者", "shanzima": "天启者", "ka'erma": "天启者",
        "诺克萨斯统领": "诺克萨斯统领", "乌鸦": "诺克萨斯统领", "斯维因": "诺克萨斯统领",
        "nuokesasitongling": "诺克萨斯统领", "wuya": "诺克萨斯统领", "siweiyin": "诺克萨斯统领",
        "岩雀": "岩雀", "塔莉垭": "岩雀", "石女": "岩雀", "麻雀": "岩雀",
        "yanque": "岩雀", "taliya": "岩雀", "shinv": "岩雀", "maque": "岩雀",
        "翠神": "翠神", "艾翁": "翠神", "草男": "翠神", "蔡徐坤": "翠神",
        "cuishen": "翠神", "aiweng": "翠神", "caonan": "翠神", "caixukun": "翠神",
        "愁云使者": "愁云使者", "薇古丝": "愁云使者", "小恶魔": "愁云使者", "摆烂熊": "愁云使者", "熬夜波比": "愁云使者",
        "chouyunshizhe": "愁云使者", "weigusi": "愁云使者", "xiaoemo": "愁云使者", "bailanxiong": "愁云使者", "aoye-bobi": "愁云使者",
        "符文法师": "符文法师", "瑞兹": "符文法师", "法术机关枪": "符文法师", "光头": "符文法师", "流浪法师": "符文法师",
        "fuwenfashi": "符文法师", "ruizi": "符文法师", "fashujiguanqiang": "符文法师", "guangtou": "符文法师", "liulangfashi": "符文法师",
        "迅捷斥候": "迅捷斥候", "提莫": "迅捷斥候", "提百万": "迅捷斥候", "蘑菇": "迅捷斥候",
        "xunjiechihou": "迅捷斥候", "timo": "迅捷斥候", "tibaiwan": "迅捷斥候", "mogu": "迅捷斥候",
        "黑暗之女": "黑暗之女", "安妮": "黑暗之女", "火女": "黑暗之女",
        "heianzhinv": "黑暗之女", "anni": "黑暗之女", "huonv": "黑暗之女",
        "九尾妖狐": "九尾妖狐", "阿狸": "九尾妖狐", "狐狸": "九尾妖狐",
        "jiuweiyaohu": "九尾妖狐", "ali": "九尾妖狐", "huli": "九尾妖狐",
        "流光镜影": "流光镜影", "梅尔": "流光镜影", "三体人": "流光镜影",
        "liuguangjingying": "流光镜影", "mei'er": "流光镜影", "santiren": "流光镜影",
        "时间刺客": "时间刺客", "艾克": "时间刺客",
        "shijian-cike": "时间刺客", "aike": "时间刺客",
        "暮光星灵": "暮光星灵", "佐伊": "暮光星灵", "a女": "暮光星灵", "木瓜星灵": "暮光星灵",
        "muguangxingling": "暮光星灵", "zuoyi": "暮光星灵", "anv": "暮光星灵", "muguaxingling": "暮光星灵",
        "铸星龙王": "铸星龙王", "奥瑞利安·索尔": "铸星龙王", "龙王": "铸星龙王", "奥瑞利安索尔": "铸星龙王",
        "zhuxinglongwang": "铸星龙王", "aoruilian-suo'er": "铸星龙王", "longwang": "铸星龙王", "aoruiliansuo'er": "铸星龙王",
        "虚空先知": "虚空先知", "玛尔扎哈": "虚空先知", "蚂蚱": "虚空先知",
        "xukongxianzhi": "虚空先知", "ma'erzhaha": "虚空先知", "mazha": "虚空先知",
        "机械公敌": "机械公敌", "兰博": "机械公敌", "喷火娃": "机械公敌",
        "jixiegongdi": "机械公敌", "lanbo": "机械公敌", "penhuowa": "机械公敌",
        "荆棘之兴": "荆棘之兴", "婕拉": "荆棘之兴",
        "jingjizhixing": "荆棘之兴", "jiela": "荆棘之兴",
        "奥术先驱": "奥术先驱", "维克托": "奥术先驱", "机械先驱": "奥术先驱", "三只手": "奥术先驱",
        "aoshuxianfeng": "奥术先驱", "weiketuo": "奥术先驱", "jixiexianfeng": "奥术先驱", "sanzhishou": "奥术先驱",
        "时光守护者": "时光守护者", "基兰": "时光守护者", "时光老头": "时光守护者", "基佬": "时光守护者",
        "shiguangshouzhe": "时光守护者", "jilan": "时光守护者", "shiguanglaotou": "时光守护者", "jilao": "时光守护者",
        "虚空之眼": "虚空之眼", "维克兹": "虚空之眼", "大眼": "虚空之眼",
        "xukongzhiyan": "虚空之眼", "weikezi": "虚空之眼", "dayan": "虚空之眼",
        "爆破鬼才": "爆破鬼才", "吉格斯": "爆破鬼才", "炸弹人": "爆破鬼才",
        "baopoguicai": "爆破鬼才", "jigesi": "爆破鬼才", "zhadanren": "爆破鬼才",
        "死亡颂唱者": "死亡颂唱者", "卡尔萨斯": "死亡颂唱者", "死歌": "死亡颂唱者",
        "siwangsongchangzhe": "死亡颂唱者", "ka'ersasi": "死亡颂唱者", "sige": "死亡颂唱者",
        "沙漠皇帝": "沙漠皇帝", "阿兹尔": "沙漠皇帝", "沙皇": "沙漠皇帝", "黄鸡": "沙漠皇帝", "脆皮鸡": "沙漠皇帝",
        "shamo-huangdi": "沙漠皇帝", "azier": "沙漠皇帝", "shahuang": "沙漠皇帝", "huangji": "沙漠皇帝", "cuipiji": "沙漠皇帝",
        "灵罗娃娃": "灵罗娃娃", "格温": "灵罗娃娃",
        "lingluowawa": "灵罗娃娃", "gewun": "灵罗娃娃",
        "狂野女猎手": "狂野女猎手", "豹女": "狂野女猎手", "奶大力": "狂野女猎手", "奈德丽": "狂野女猎手", "豹子": "狂野女猎手", "暴女": "狂野女猎手",
        "kuangyenvlieshou": "狂野女猎手", "baonv": "狂野女猎手", "naidali": "狂野女猎手", "naideli": "狂野女猎手", "baozi": "狂野女猎手", "baonv": "狂野女猎手",
        "异画师": "异画师", "绘师": "异画师", "画家": "异画师", "水墨法师": "异画师", "彗": "异画师",
        "yihuashi": "异画师", "huishi": "异画师", "huajia": "异画师", "shuimofashi": "异画师", "hui": "异画师",
        "双界灵兔": "双界灵兔", "灵兔": "双界灵兔", "兔子": "双界灵兔", "阿萝拉": "双界灵兔",
        "shuangjielingtu": "双界灵兔", "lingtu": "双界灵兔", "tuzi": "双界灵兔", "aluola": "双界灵兔",

        // 射手类
        "寒冰射手": "寒冰射手", "寒冰": "寒冰射手", "艾希": "寒冰射手",
        "hanbingshoushou": "寒冰射手", "hanbing": "寒冰射手", "aixi": "寒冰射手",
        "探险家": "探险家", "EZ": "探险家", "伊泽瑞尔": "探险家", "小黄毛": "探险家", "伊泽": "探险家", "ez": "探险家",
        "tanxianjia": "探险家", "ez": "探险家", "yizeruier": "探险家", "xiaohuangmao": "探险家", "yize": "探险家",
        "暗夜猎手": "暗夜猎手", "VN": "暗夜猎手", "薇恩": "暗夜猎手", "红眼睛": "暗夜猎手", "红眼镜": "暗夜猎手",
        "anyelieshou": "暗夜猎手", "vn": "暗夜猎手", "weien": "暗夜猎手", "hongyanjing": "暗夜猎手", "hongyanjing": "暗夜猎手",
        "皮城女警": "皮城女警", "女警": "皮城女警", "凯特琳": "皮城女警",
        "pichengnvjing": "皮城女警", "nvjing": "皮城女警", "kaitelin": "皮城女警",
        "暴走萝莉": "暴走萝莉", "金克丝": "暴走萝莉",
        "baozouluoli": "暴走萝莉", "jinkesi": "暴走萝莉",
        "荣耀行刑官": "荣耀行刑官", "德莱文": "荣耀行刑官", "文森特": "荣耀行刑官",
        "rongyaoxingxingguan": "荣耀行刑官", "delaowen": "荣耀行刑官", "wensente": "荣耀行刑官",
        "瘟疫之源": "瘟疫之源", "老鼠": "瘟疫之源", "图奇": "瘟疫之源",
        "wenyizhiyuan": "瘟疫之源", "laoshu": "瘟疫之源", "tuqi": "瘟疫之源",
        "深渊巨口": "深渊巨口", "大嘴": "深渊巨口", "克格莫": "深渊巨口",
        "shenyuanjukou": "深渊巨口", "dazui": "深渊巨口", "kegemo": "深渊巨口",
        "复仇之矛": "复仇之矛", "滑板鞋": "复仇之矛", "卡莉斯塔": "复仇之矛", "卡莉丝塔": "复仇之矛",
        "fuchouzhimao": "复仇之矛", "huabanxie": "复仇之矛", "kalisita": "复仇之矛", "kalishita": "复仇之矛",
        "圣枪游侠": "圣枪游侠", "卢锡安": "圣枪游侠", "奥巴马": "圣枪游侠", "卢仙": "圣枪游侠",
        "shengqiangyouxia": "圣枪游侠", "luxian": "圣枪游侠", "aobama": "圣枪游侠", "luxian": "圣枪游侠",
        "无畏战车": "无畏战车", "螃蟹": "无畏战车", "厄加特": "无畏战车",
        "wuweizhanche": "无畏战车", "pangxie": "无畏战车", "ejiate": "无畏战车",
        "戏命师": "戏命师", "烬": "戏命师", "四枪": "戏命师",
        "ximingshi": "戏命师", "jin": "戏命师", "siqiang": "戏命师",
        "永猎双子": "永猎双子", "千珏": "永猎双子", "羊灵狼灵": "永猎双子",
        "yonglieshuangzi": "永猎双子", "qianjue": "永猎双子", "yanglinglangling": "永猎双子",
        "残月之肃": "残月之肃", "月男": "残月之肃", "厄斐琉斯": "残月之肃", "无E凡": "残月之肃", "吴亦凡": "残月之肃",
        "canyuezhisu": "残月之肃", "yuenan": "残月之肃", "efeiliusi": "残月之肃", "wuefan": "残月之肃", "wuyifan": "残月之肃",
        "沙漠玫瑰": "沙漠玫瑰", "莎弥拉": "沙漠玫瑰", "沙弥拉": "沙漠玫瑰", "女枪2.0": "沙漠玫瑰",
        "shamomeigui": "沙漠玫瑰", "shamila": "沙漠玫瑰", "nvqiang2.0": "沙漠玫瑰",
        "赏金猎人": "赏金猎人", "女枪": "赏金猎人", "厄运小姐": "赏金猎人", "好运姐": "赏金猎人",
        "shangjinlieshou": "赏金猎人", "nvqiang": "赏金猎人", "eyunxiaojie": "赏金猎人", "haoyunjie": "赏金猎人",
        "虚空之女": "虚空之女", "卡莎": "虚空之女",
        "xukongzhinv": "虚空之女", "kasha": "虚空之女",
        "英勇投弹手": "英勇投弹手", "库奇": "英勇投弹手", "飞机": "英勇投弹手",
        "yingyongtoudanshou": "英勇投弹手", "kuqi": "英勇投弹手", "feiji": "英勇投弹手",
        "惩戒之箭": "惩戒之箭", "维鲁斯": "惩戒之箭", "韦鲁斯": "惩戒之箭",
        "chengjiezhijian": "惩戒之箭", "weilusi": "惩戒之箭", "weilusi": "惩戒之箭",
        "德玛西亚之翼": "德玛西亚之翼", "奎因": "德玛西亚之翼", "鸟人": "德玛西亚之翼",
        "demaxiyazhiyi": "德玛西亚之翼", "kuiyin": "德玛西亚之翼", "niaoren": "德玛西亚之翼",
        "涤魂圣枪": "涤魂圣枪", "赛娜": "涤魂圣枪",
        "dihunshengqiang": "涤魂圣枪", "saina": "涤魂圣枪",
        "战争女神": "战争女神", "希维尔": "战争女神", "轮子妈": "战争女神",
        "zhanzhengnvshen": "战争女神", "xiweier": "战争女神", "lunzima": "战争女神",
        "逆羽": "逆羽", "霞": "逆羽",
        "niyu": "逆羽", "xia": "逆羽",
        "祖安花火": "祖安花火", "泽丽": "祖安花火",
        "zuanhuahuo": "祖安花火", "zeli": "祖安花火",
        "麦林炮手": "麦林炮手", "小炮": "麦林炮手", "炮娘": "麦林炮手", "崔丝塔娜": "麦林炮手", "推塔小能手": "麦林炮手",
        "mailinpaoshou": "麦林炮手", "xiaopao": "麦林炮手", "paoniang": "麦林炮手", "cuisitana": "麦林炮手", "tuitaxiaonengshou": "麦林炮手",
        "炽炎雏龙": "炽炎雏龙", "小火龙": "炽炎雏龙", "喷火龙": "炽炎雏龙", "奶龙": "炽炎雏龙", "斯莫德": "炽炎雏龙",
        "chiyanchulong": "炽炎雏龙", "xiaohuolong": "炽炎雏龙", "penhuolong": "炽炎雏龙", "nailong": "炽炎雏龙", "simode": "炽炎雏龙",
        "不羁之悦": "不羁之悦", "尼菈": "不羁之悦", "尼拉": "不羁之悦", "水弥拉": "不羁之悦", "水鞭妹": "不羁之悦", "鞭姐": "不羁之悦",
        "bujizhiyue": "不羁之悦", "nila": "不羁之悦", "nila": "不羁之悦", "shuimila": "不羁之悦", "shuibianmei": "不羁之悦", "bianjie": "不羁之悦",
        "不破之誓": "不破之誓", "云娜": "不破之誓", "芸阿娜": "不破之誓",
        "bupozhishi": "不破之誓", "yunna": "不破之誓", "yunana": "不破之誓",

        // 辅助类
        "风暴之怒": "风暴之怒", "风女": "风暴之怒", "迦娜": "风暴之怒",
        "fengbaozhinu": "风暴之怒", "fengnv": "风暴之怒", "jiana": "风暴之怒",
        "众星之子": "众星之子", "星妈": "众星之子", "索拉卡": "众星之子", "奶妈": "众星之子",
        "zhongxingzhizi": "众星之子", "xingma": "众星之子", "suolaka": "众星之子", "naima": "众星之子",
        "琴瑟仙女": "琴瑟仙女", "琴女": "琴瑟仙女", "娑娜": "琴瑟仙女", "三色果盘": "琴瑟仙女",
        "qinsexiannü": "琴瑟仙女", "qinnv": "琴瑟仙女", "suona": "琴瑟仙女", "sanseguopan": "琴瑟仙女",
        "仙灵女巫": "仙灵女巫", "璐璐": "仙灵女巫",
        "xianlingnvwu": "仙灵女巫", "lulu": "仙灵女巫",
        "唤潮鲛姬": "唤潮鲛姬", "娜美": "唤潮鲛姬", "人鱼": "唤潮鲛姬", "美人鱼": "唤潮鲛姬",
        "huanchaojiaoji": "唤潮鲛姬", "namei": "唤潮鲛姬", "renyu": "唤潮鲛姬", "meirenyu": "唤潮鲛姬",
        "星界游神": "星界游神", "巴德": "星界游神",
        "xingjieyoushen": "星界游神", "bade": "星界游神",
        "蜘蛛女皇": "蜘蛛女皇", "蜘蛛": "蜘蛛女皇", "伊莉丝": "蜘蛛女皇",
        "zhizhunvhuang": "蜘蛛女皇", "zhizhu": "蜘蛛女皇", "yilisi": "蜘蛛女皇",
        "堕落天使": "堕落天使", "莫甘娜": "堕落天使", "黑妹": "堕落天使",
        "duoluotianshi": "堕落天使", "moganna": "堕落天使", "heimei": "堕落天使",
        "正义天使": "正义天使", "天使": "正义天使", "凯尔": "正义天使", "大天使": "正义天使",
        "zhengyitianshi": "正义天使", "tianshi": "正义天使", "kaier": "正义天使", "datianshi": "正义天使",
        "祖安怒兽": "祖安怒兽", "狼人": "祖安怒兽", "沃里克": "祖安怒兽", "嗜血猎手": "祖安怒兽",
        "zuannushou": "祖安怒兽", "langren": "祖安怒兽", "wolike": "祖安怒兽", "shixuelieshou": "祖安怒兽",
        "雪原双子": "雪原双子", "雪人": "雪原双子", "努努": "雪原双子", "努努和威朗普": "雪原双子",
        "xueyuanshuangzi": "雪原双子", "xueren": "雪原双子", "nunu": "雪原双子", "nunuheweilangpu": "雪原双子",
        "魔法猫咪": "魔法猫咪", "悠米": "魔法猫咪", "猫": "魔法猫咪", "猫咪": "魔法猫咪",
        "mofamaomi": "魔法猫咪", "youmi": "魔法猫咪", "mao": "魔法猫咪", "maomi": "魔法猫咪",
        "星籁歌姬": "星籁歌姬", "萨勒芬妮": "星籁歌姬", "歌姬": "星籁歌姬",
        "xinglaigeji": "星籁歌姬", "salefenni": "星籁歌姬", "geji": "星籁歌姬",
        "镕铁少女": "镕铁少女", "芮尔": "镕铁少女", "铁女": "镕铁少女",
        "rongtieshaonv": "镕铁少女", "rui'er": "镕铁少女", "tienv": "镕铁少女",
        "含羞蓓蕾": "含羞蓓蕾", "莉莉娅": "含羞蓓蕾", "鹿女": "含羞蓓蕾", "小鹿": "含羞蓓蕾", "梦鹿": "含羞蓓蕾",
        "hanxiubeilei": "含羞蓓蕾", "liliya": "含羞蓓蕾", "lunv": "含羞蓓蕾", "xiaolu": "含羞蓓蕾", "menglu": "含羞蓓蕾",
        "明烛": "明烛", "米利欧": "明烛", "小灯笼": "明烛",
        "mingzhu": "明烛", "miliao": "明烛", "xiaodenglong": "明烛",
        "幻翎": "幻翎", "洛": "幻翎",
        "huanling": "幻翎", "luo": "幻翎",
        "炼金男爵": "炼金男爵", "炼金妈": "炼金男爵", "男爵妈": "炼金男爵", "烈娜塔": "炼金男爵", "烈娜塔·戈拉斯克": "炼金男爵",
        "lianjinnanjue": "炼金男爵", "lianjinma": "炼金男爵", "nanjuema": "炼金男爵", "lienata": "炼金男爵", "lienatagelasike": "炼金男爵",

        // 快乐风男系列
        "疾风剑豪": "疾风剑豪", "托儿索": "疾风剑豪", "快乐风男": "疾风剑豪", "亚索": "疾风剑豪", "压缩": "疾风剑豪", "风男": "疾风剑豪", "剑豪": "疾风剑豪",
        "jifengjianhao": "疾风剑豪", "tuoersuo": "疾风剑豪", "kuailefengnan": "疾风剑豪", "yasuo": "疾风剑豪", "yasuo": "疾风剑豪", "fengnan": "疾风剑豪", "jianhao": "疾风剑豪"
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
                if (matches.length >= 15) break; // 限制显示数量
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
