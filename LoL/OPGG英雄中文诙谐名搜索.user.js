// ==UserScript==
// @name         OPGG英雄中文诙谐名搜索
// @namespace   https://github.com/LongMan98/personal-script
// @version      1.1.1
// @description  为OP.GG游戏模式页面添加英雄中文诙谐名搜索功能
// @license      MIT
// @author       LongMan98
// @match        https://op.gg/zh-cn/lol/modes/*
// @match        https://op.gg/lol/modes/*
// @icon         https://opgg-static.akamaized.net/meta/images/lol/latest/champion/Ashe.png?image=e_upscale,c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160
// @updateURL   https://raw.githubusercontent.com/LongMan98/personal-script/main/LoL/OPGG%E8%8B%B1%E9%9B%84%E4%B8%AD%E6%96%87%E8%AF%99%E8%B0%90%E5%90%8D%E6%90%9C%E7%B4%A2.user.js
// @downloadURL  https://raw.githubusercontent.com/LongMan98/personal-script/main/LoL/OPGG%E8%8B%B1%E9%9B%84%E4%B8%AD%E6%96%87%E8%AF%99%E8%B0%90%E5%90%8D%E6%90%9C%E7%B4%A2.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 完整的中文诙谐名到官方英文名的映射
    const heroNameMap = {
        // 战士类
        "盖伦": "garen", "大宝剑": "garen", "草丛伦": "garen", "gay伦": "garen",
        "诺手": "darius", "达瑞斯": "darius", "人头狗": "darius",
        "鳄鱼": "renekton", "雷克顿": "renekton", "荒漠屠夫": "renekton",
        "狗头": "nasus", "内瑟斯": "nasus", "沙漠死神": "nasus",
        "剑魔": "aatrox", "暗裔剑魔": "aatrox",
        "剑姬": "fiora", "菲奥娜": "fiora", "无双剑姬": "fiora",
        "青钢影": "camille", "卡蜜尔": "camille", "剪刀腿": "camille",
        "腕豪": "sett", "瑟提": "sett", "劲夫": "sett", "万豪": "sett",
        "赵信": "xinzhao", "赵云": "xinzhao", "赵子龙": "xinzhao", "菊花信": "xinzhao",
        "皇子": "jarvaniv", "嘉文四世": "jarvaniv",
        "剑圣": "masteryi", "易大师": "masteryi", "蛮易信": "masteryi",
        "蛮王": "tryndamere", "蛮子": "tryndamere", "五秒真男人": "tryndamere",
        "武器": "jax", "贾克斯": "jax", "武器大师": "jax",
        "盲僧": "leesin", "李青": "leesin", "瞎子": "leesin", "小学僧": "leesin",
        "偷男": "sylas", "塞拉斯": "sylas", "解脱者": "sylas", "蒜男": "sylas",
        "约里克": "yorick", "掘墓者": "yorick","掘墓": "yorick",
        "卑尔维斯": "belveth", "阿尔卑斯": "belveth", "虚空鱼": "belveth",
        "克烈": "kled", "暴怒骑士": "kled",
        "奥拉夫": "olaf", "狂战士": "olaf", "疯狗": "olaf",
        "乌迪尔": "udyr", "兽灵行者": "udyr",
        "龙女": "shyvana", "希瓦娜": "shyvana", "龙血武姬": "shyvana",
        "人马": "hecarim", "赫卡里姆": "hecarim", "战争之影": "hecarim",
        "男枪": "graves", "格雷福斯": "graves", "法外狂徒": "graves",
        "刀妹": "irelia", "艾瑞莉娅": "irelia", "刀锋舞者": "irelia", "女刀": "irelia",
        "杰斯": "jayce", "未来守护者": "jayce", "塔利斯议员": "jayce",
        "船长": "gangplank", "桶子哥": "gangplank", "普朗克": "gangplank", "橘子哥": "gangplank",
        "纳尔": "gnar", "小纳尔": "gnar", "大纳尔": "gnar",
        "潘森": "pantheon", "斯巴达": "pantheon", "长枪哥": "pantheon", "不屈之枪": "pantheon",
        "蔚": "vi", "拳姐": "vi", "皮城大姐头": "vi", "皮城执法官": "vi",
        "猴子": "wukong", "悟空": "wukong", "齐天大圣": "wukong", "猴哥": "wukong",
        "百裂冥犬": "naafiri",
        "铁血狼母": "ambessa", "狼母": "ambessa", "狼妈": "ambessa", "铁血母狼": "ambessa",
        "狂厄蔷薇": "briar", "蔷薇": "briar", "小蔷薇": "briar", "抽血泵": "briar", "疯批蔷薇": "briar", "荆棘妹": "briar",

        // 刺客类
        "劫": "zed", "儿童劫": "zed",
        "男刀": "talon", "泰隆": "talon", "刀锋之影": "talon",
        "螳螂": "khazix", "卡兹克": "khazix", "虚空掠夺者": "khazix", "喜之郎": "khazix",
        "狮子狗": "rengar", "雷恩加尔": "rengar", "傲之追猎者": "rengar",
        "小鱼人": "fizz", "菲兹": "fizz", "鲇鱼": "fizz", "小鱼": "fizz",
        "阿卡丽": "akali", "离群之刺": "akali", "快乐刺客": "akali",
        "卡特": "katarina", "卡特琳娜": "katarina", "不祥之刃": "katarina",
        "派克": "pyke", "血港鬼影": "pyke", "水鬼": "pyke",
        "永恩": "yone", "亚索哥": "yone", "快乐风男他哥": "yone", "封魔剑魂": "yone",
        "阿克尚": "akshan", "阿克曼": "akshan",
        "破败之王": "viego", "佛耶戈": "viego", "佛爷": "viego", "破败王": "viego", "破财王": "viego",
        "凯隐": "kayn", "拉亚斯特": "kayn", "红凯": "kayn", "蓝凯": "kayn", "凯": "kayn", "影流之镰": "kayn", "镰刀": "kayn",
        "奇亚娜": "qiyana", "元素女皇": "qiyana", "盘子妈": "qiyana",
        "小丑": "shaco", "萨科": "shaco", "恶魔小丑": "shaco",
        "黛安娜": "diana", "皎月女神": "diana", "皎月": "diana",
        "伊芙琳": "evelynn", "痛苦之拥": "evelynn", "寡妇": "evelynn",
        "卡萨丁": "kassadin", "虚空行者": "kassadin", "基霸脸": "kassadin",
        "乐芙兰": "leblanc", "诡术妖姬": "leblanc", "妖姬": "leblanc", "提款姬": "leblanc",
        "锐雯": "riven", "放逐之刃": "riven",
        "魔腾": "nocturne", "永恒梦魇": "nocturne", "梦魇": "nocturne",
        "挖掘机": "reksai", "雷克塞": "reksai", "土龙": "reksai", "虚空遁地兽": "reksai",

        // 坦克类
        "大树": "maokai", "茂凯": "maokai", "扭曲树精": "maokai", "树精": "maokai", "树人": "maokai",
        "石头人": "malphite", "墨菲特": "malphite", "混分巨兽": "malphite",
        "牛头": "alistar", "阿里斯塔": "alistar", "阿利斯塔": "alistar","牛头人": "alistar","ntr": "alistar", "牛头酋长": "alistar",
        "机器人": "blitzcrank", "布里茨": "blitzcrank",
        "锤石": "thresh", "钩子": "thresh", "魂锁典狱长": "thresh",
        "泰坦": "nautilus", "诺提勒斯": "nautilus", "深海泰坦": "nautilus",
        "布隆": "braum", "门板": "braum", "弗雷尔卓德之心": "braum",
        "日女": "leona", "蕾欧娜": "leona", "曙光": "leona", "曙光女神": "leona", "女坦": "leona", "太阳女孩": "leona",
        "猪妹": "sejuani", "瑟庄妮": "sejuani", "北地之怒": "sejuani",
        "龙龟": "rammus", "拉莫斯": "rammus", "披甲龙龟": "rammus", "王八": "rammus",
        "蝎子": "skarner", "斯卡纳": "skarner", "水晶先锋": "skarner",
        "狗熊": "volibear", "沃利贝尔": "volibear", "不灭狂雷": "volibear",
        "木乃伊": "amumu", "阿木木": "amumu", "殇之木乃伊": "amumu", "木木": "amumu",
        "慎": "shen", "暮光之眼": "shen", "肾": "shen", "腰子": "shen",
        "塔姆": "tahmkench", "塔姆肯奇": "tahmkench", "河流之王": "tahmkench", "蛤蟆": "tahmkench", "鲶鱼": "tahmkench",
        "奥恩": "Ornn", "羊驼": "Ornn", "山羊": "Ornn", "羊": "Ornn", "山隐之焰": "ornn", "铁头娃": "ornn",
        "波比": "poppy", "圣锤之毅": "poppy",
        "加里奥": "galio", "正义巨像": "galio", "石像鬼": "galio", "城墙": "galio", "蝙蝠侠": "galio",
        "扎克": "zac", "生化魔人": "zac", "绿巨人": "zac", "鼻涕人": "zac", "粑粑人": "zac", "果冻人": "zac", "翔战士": "zac",
        "赛恩": "sion", "亡灵战神": "sion", "老司机": "sion",
        "蒙多": "drmundo", "祖安狂人": "drmundo",
        "特朗德尔": "trundle", "巨魔之王": "trundle", "巨魔": "trundle",
        "塔里克": "taric", "瓦洛兰之盾": "taric", "宝石": "taric",
        "妮蔻": "neeko", "万花通灵": "neeko","niko": "neeko",
        "俄洛伊": "illaoi", "海兽祭司": "illaoi", "章鱼妈": "illaoi", "触手妈": "illaoi",
        "纳祖芒荣耀": "ksante", "黑人": "ksante", "老黑": "ksante", "傲岸雄姿": "ksante", "奎桑提": "ksante",

        // 法师类
        "火男": "brand", "布兰德": "brand", "复仇焰魂": "brand",
        "冰女": "lissandra", "丽桑卓": "lissandra", "冰霜女巫": "lissandra",
        "卡牌": "twistedfate", "崔斯特": "twistedfate", "卡牌大师": "twistedfate",
        "发条": "orianna", "奥莉安娜": "orianna", "发条魔灵": "orianna",
        "蛇女": "cassiopeia", "卡西奥佩娅": "cassiopeia", "魔蛇之拥": "cassiopeia",
        "吸血鬼": "vladimir", "弗拉基米尔": "vladimir", "猩红收割者": "vladimir",
        "辛德拉": "syndra", "球女": "syndra", "暗黑元首": "syndra",
        "泽拉斯": "xerath", "远古巫灵": "xerath", "三炮": "xerath",
        "光辉": "lux", "光女": "lux", "拉克丝": "lux",
        "小法": "veigar", "邪恶小法师": "veigar", "维迦": "veigar",
        "大头": "heimerdinger", "黑默丁格": "heimerdinger", "大发明家": "heimerdinger",
        "凯南": "kennen", "电耗子": "kennen", "狂暴之心": "kennen",
        "炼金": "singed", "辛吉德": "singed", "毒奶": "singed", "炼金术士": "singed",
        "酒桶": "gragas", "古拉加斯": "gragas", "酒男": "gragas", "啤酒人": "gragas",
        "铁男": "mordekaiser", "莫德凯撒": "mordekaiser", "金属大师": "mordekaiser",
        "冰鸟": "anivia", "艾尼维亚": "anivia", "冰晶凤凰": "anivia", "凤凰": "anivia",
        "大虫子": "chogath", "科加斯": "chogath", "虚空恐惧": "chogath",
        "稻草人": "fiddlesticks", "费德提克": "fiddlesticks", "末日使者": "fiddlesticks", "远古恐惧": "fiddlesticks",
        "扇子妈": "karma", "卡尔玛": "karma", "天启者": "karma",
        "乌鸦": "swain", "斯维因": "swain", "诺克萨斯统领": "swain",
        "岩雀": "taliyah", "塔莉垭": "taliyah", "石女": "taliyah", "麻雀": "taliyah",
        "翠神": "ivern", "艾翁": "ivern", "草男": "ivern", "蔡徐坤": "ivern",
        "薇古丝": "vex", "小恶魔": "vex", "摆烂熊": "vex", "熬夜波比": "vex",
        "瑞兹": "ryze", "法术机关枪": "ryze", "光头": "ryze",
        "提莫": "teemo", "提百万": "teemo", "蘑菇": "teemo", "迅捷斥候": "teemo",
        "安妮": "annie", "火女": "annie", "黑暗之女": "annie",
        "阿狸": "ahri", "狐狸": "ahri", "九尾妖狐": "ahri",
        "梅尔": "mel", "三体人": "mel",
        "艾克": "ekko", "时间刺客": "ekko",
        "佐伊": "zoe", "暮光星灵": "zoe", "a女": "zoe", "木瓜星灵": "zoe",
        "奥瑞利安·索尔": "aurelionsol", "铸星龙王": "aurelionsol", "龙王": "aurelionsol",
        "玛尔扎哈": "malzahar", "虚空先知": "malzahar", "蚂蚱": "malzahar",
        "兰博": "rumble", "机械公敌": "rumble", "喷火娃": "rumble",
        "婕拉": "zyra", "荆棘之兴": "zyra",
        "维克托": "viktor", "机械先驱": "viktor", "三只手": "viktor",
        "基兰": "zilean", "时光守护者": "zilean", "时光老头": "zilean", "基佬": "zilean",
        "维克兹": "velkoz", "虚空之眼": "velkoz", "大眼": "velkoz",
        "吉格斯": "ziggs", "爆破鬼才": "ziggs", "炸弹人": "ziggs",
        "卡尔萨斯": "karthus", "死亡颂唱者": "karthus", "死歌": "karthus",
        "阿兹尔": "azir", "沙漠皇帝": "azir", "沙皇": "azir", "黄鸡": "azir", "脆皮鸡": "azir",
        "格温": "gwen", "灵罗娃娃": "gwen",
        "豹女": "nidalee", "奶大力": "nidalee", "奈德丽": "nidalee", "狂野女猎手": "nidalee", "豹子": "nidalee",
        "异画师": "hwei", "绘师": "hwei",
        "双界灵兔": "aurora", "灵兔": "aurora", "兔子": "aurora",

        // 射手类
        "寒冰": "ashe", "艾希": "ashe", "寒冰射手": "ashe",
        "EZ": "ezreal", "伊泽瑞尔": "ezreal", "小黄毛": "ezreal", "伊泽": "ezreal", "探险家": "ezreal",
        "VN": "vayne", "薇恩": "vayne", "暗夜猎手": "vayne",
        "女警": "caitlyn", "凯特琳": "caitlyn", "皮城女警": "caitlyn",
        "金克丝": "jinx", "暴走萝莉": "jinx",
        "德莱文": "draven","荣耀行刑官": "draven","文森特": "draven",
        "老鼠": "twitch", "图奇": "twitch", "瘟疫之源": "twitch",
        "大嘴": "kogmaw", "克格莫": "kogmaw", "深渊巨口": "kogmaw",
        "滑板鞋": "kalista", "卡莉斯塔": "kalista", "复仇之矛": "kalista",
        "卢锡安": "lucian", "奥巴马": "lucian", "圣枪游侠": "lucian", "卢仙": "lucian",
        "螃蟹": "urgot", "厄加特": "urgot", "无畏战车": "urgot",
        "戏命师": "jhin", "烬": "jhin", "四枪": "jhin",
        "千珏": "kindred", "羊灵狼灵": "kindred",
        "月男": "aphelios", "厄斐琉斯": "aphelios", "无E凡": "aphelios", "吴亦凡": "aphelios", "残月之肃": "aphelios",
        "莎弥拉": "samira", "沙弥拉": "samira", "女枪2.0": "samira", "沙漠玫瑰": "samira",
        "女枪": "missfortune", "厄运小姐": "missfortune", "好运姐": "missfortune",
        "卡莎": "kaisa", "虚空之女": "kaisa",
        "库奇": "corki", "英勇投弹手": "corki", "飞机": "corki",
        "维鲁斯": "varus", "惩戒之箭": "varus",
        "奎因": "quinn", "德玛西亚之翼": "quinn", "鸟人": "quinn",
        "赛娜": "senna", "涤魂圣枪": "senna",
        "希维尔": "sivir", "战争女神": "sivir", "轮子妈": "sivir",
        "霞": "xayah", "逆羽": "xayah",
        "泽丽": "zeri", "祖安花火": "zeri",
        "小炮": "tristana", "炮娘": "tristana", "崔丝塔娜": "tristana", "麦林炮手": "tristana", "推塔小能手": "tristana",
        "炽炎雏龙": "smolder", "小火龙": "smolder", "喷火龙": "smolder", "奶龙": "smolder", "斯莫德": "smolder",
        "尼菈": "nilah", "尼拉": "nilah", "水弥拉": "nilah", "不羁之悦": "nilah", "水鞭妹": "nilah", "鞭姐": "nilah",
        "不破之誓": "yunara", "云娜": "yunara",

        // 辅助类
        "风女": "janna", "迦娜": "janna", "风暴之怒": "janna",
        "星妈": "soraka", "索拉卡": "soraka", "奶妈": "soraka", "众星之子": "soraka",
        "琴女": "sona", "娑娜": "sona", "琴瑟仙女": "sona", "三色果盘": "sona",
        "璐璐": "lulu", "仙灵女巫": "lulu",
        "娜美": "nami", "唤潮鲛姬": "nami", "人鱼": "nami",
        "巴德": "bard", "星界游神": "bard",
        "蜘蛛": "elise", "伊莉丝": "elise", "蜘蛛女皇": "elise",
        "莫甘娜": "morgana", "堕落天使": "morgana", "黑妹": "morgana",
        "天使": "kayle", "凯尔": "kayle", "大天使": "kayle",
        "狼人": "warwick", "沃里克": "warwick", "嗜血猎手": "warwick",
        "雪人": "nunu", "努努": "nunu", "努努和威朗普": "nunu",
        "悠米": "yuumi", "猫": "yuumi", "魔法猫咪": "yuumi", "猫咪": "yuumi",
        "萨勒芬妮": "seraphine", "歌姬": "seraphine",
        "芮尔": "rell", "铁女": "rell", "镕铁少女": "rell",
        "莉莉娅": "lillia", "鹿女": "lillia", "含羞蓓蕾": "lillia", "小鹿": "lillia",
        "米利欧": "milio", "明烛": "milio",
        "洛": "rakan", "幻翎": "rakan",
        "炼金男爵": "renata", "炼金妈": "renata", "男爵妈": "renata",

        // 快乐风男系列
        "托儿索": "yasuo", "快乐风男": "yasuo", "亚索": "yasuo", "压缩": "yasuo", "风男": "yasuo", "剑豪": "yasuo"
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
