"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stem;
(function (Stem) {
    Stem[Stem["Jia"] = 0] = "Jia";
    Stem[Stem["Yi"] = 1] = "Yi";
    Stem[Stem["Bing"] = 2] = "Bing";
    Stem[Stem["Ding"] = 3] = "Ding";
    Stem[Stem["Wu"] = 4] = "Wu";
    Stem[Stem["Ji"] = 5] = "Ji";
    Stem[Stem["Geng"] = 6] = "Geng";
    Stem[Stem["Xin"] = 7] = "Xin";
    Stem[Stem["Ren"] = 8] = "Ren";
    Stem[Stem["Gui"] = 9] = "Gui";
})(Stem = exports.Stem || (exports.Stem = {}));
var Branch;
(function (Branch) {
    Branch[Branch["Rat"] = 0] = "Rat";
    Branch[Branch["Ox"] = 1] = "Ox";
    Branch[Branch["Tiger"] = 2] = "Tiger";
    Branch[Branch["Rabbit"] = 3] = "Rabbit";
    Branch[Branch["Dragon"] = 4] = "Dragon";
    Branch[Branch["Snake"] = 5] = "Snake";
    Branch[Branch["Horse"] = 6] = "Horse";
    Branch[Branch["Goat"] = 7] = "Goat";
    Branch[Branch["Monkey"] = 8] = "Monkey";
    Branch[Branch["Rooster"] = 9] = "Rooster";
    Branch[Branch["Dog"] = 10] = "Dog";
    Branch[Branch["Pig"] = 11] = "Pig";
})(Branch = exports.Branch || (exports.Branch = {}));
var LOCALES = {
    default: {
        stems: ['jia', 'yi', 'bing', 'ding', 'wu', 'ji', 'geng', 'xin', 'ren', 'gui'],
        branches: ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'],
    },
    ko: {
        stems: ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'],
        branches: ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'],
    },
    vi: {
        stems: ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'],
        branches: ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'],
    },
    zh: {
        stems: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
        branches: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    },
};
var Sexagenary = /** @class */ (function () {
    function Sexagenary(_a) {
        var stem = _a.stem, branch = _a.branch;
        this._stem = stem;
        this._branch = branch;
    }
    Sexagenary.prototype.toString = function (locale) {
        if (locale === void 0) { locale = 'default'; }
        var _a = LOCALES[locale] || {}, _b = _a.stems, stems = _b === void 0 ? null : _b, _c = _a.branches, branches = _c === void 0 ? null : _c;
        if (stems == null || branches == null)
            return '';
        var stem = stems[this._stem];
        var branch = branches[this._branch];
        if (locale === 'default')
            return [stem, branch].join('-');
        return [stem, branch].join(' ');
    };
    return Sexagenary;
}());
exports.default = Sexagenary;
