/*
  从2014年7月开始恢复股票池的发布。
  2015年4月暂停，10月份继续发布。
*/

var historyArr = new Array (
/*  达成日期     股票代码  股票名称  初始价格  目标价格  达成价  累计涨幅%  行业分类   关注日期     总计天数  */
  ["2016-04-28", "601799", "星宇股份", "28.68", "40.00", "41.12", "43.38", "汽车和汽车零部件", "2016-03-21", "39"],
  ["2016-04-12", "600005", "武钢股份", "3.02", "3.50", "3.58", "18.54", "钢铁行业", "2016-04-05", "7"],
  ["2016-04-07", "002284", "亚太股份", "16.68", "21.00", "21.32", "27.82", "汽车和汽车零部件", "2016-03-21", "18"],
  ["2016-03-21", "600965", "福成五丰", "12.79", "15.00", "15.40", "20.41", "农林牧渔", "2016-03-01", "21"],
  ["2016-03-09", "300180", "华峰超纤", "11.13", "15.20", "15.32", "37.65", "基础化工", "2016-01-29", "41"],
  ["2016-02-23", "002229", "鸿博股份", "18.86", "23.00", "23.43", "24.23", "造纸印刷轻工", "2016-01-19", "36"],
  ["2015-12-21", "002327", "富安娜", "10.94", "12.00", "12.41", "13.44", "纺织和服装", "2015-10-14", "69"],
  ["2015-11-20", "000619", "海螺型材", "12.80", "14.80", "15.82", "23.59", "建筑和工程", "2015-10-26", "26"],
  ["2015-11-20", "002631", "德尔未来", "20.90", "26.00", "26.71", "27.80", "家用轻工", "2015-10-26", "26"],
  ["2015-11-11", "600720", "祁连山", "7.58", "8.50", "8.56", "12.93", "非金属类建材", "2015-10-29", "14"],
  ["2015-11-09", "600449", "宁夏建材", "9.61", "11.00", "11.25", "17.07", "非金属类建材", "2015-10-28", "13"],
  ["2015-11-06", "300078", "思创医惠", "35.09", "37.97", "40.07", "14.19", "电子行业", "2015-10-23", "15"],
  ["2015-11-04", "603766", "隆鑫通用", "17.14", "21.00", "21.17", "23.51", "非汽车交运", "2015-10-11", "25"],
  ["2015-10-17", "300465", "高伟达", "62.27", "68.00", "70.97", "13.97", "计算机行业", "2015-10-12", "5"]
);

//指数数组与股票数组为二维数组，可以用统一的接口来调用
var indexArr = new Array(["0000001"],["1399001"],["1399006"],["1399300"]);

//股票数组需要去除关注日期超过180日的股票
var allHqArr = new Array(
/* 股票代码   所属行业     关注日期   前日收盘价   目标价    评级 */
  ["0600498", "通信行业", "2016-10-31", "27.88",  "35.00",  "买入"],
  ["0600438", "农林牧渔", "2016-10-31", "6.08",  "7.80",  "买入"],
  ["0601799", "汽车和汽车零部件", "2016-10-31", "38.66",  "55.00",  "买入"],
  ["0601012", "电气设备", "2016-10-31", "13.95",  "18.75",  "买入"],
  ["1002179", "机械行业", "2016-10-31", "39.45",  "50.00",  "买入"],
  ["1000789", "非金属类建材", "2016-10-31", "7.02",  "10.00",  "买入"],
  ["1002169", "电力设备与新能源", "2016-10-27", "20.17",  "25.00",  "买入"],
  ["1002595", "机械行业", "2016-10-27", "21.58",  "27.00",  "买入"],
  ["0600612", "批发和零售贸易", "2016-10-27", "41.16",  "48.00",  "买入"],
  ["0600867", "医药生物", "2016-10-26", "23.25",  "26.74",  "买入"],
  ["1002302", "非金属类建材", "2016-10-26", "8.14",  "10.50",  "买入"],
  ["1002572", "造纸印刷轻工", "2016-10-26", "58.88",  "69.00",  "买入"],
  ["0600176", "基础化工", "2016-10-26", "11.31",  "13.90",  "买入"],
  ["1002665", "电气设备", "2016-10-26", "9.51",  "11.21",  "买入"],
  ["1002303", "造纸印刷轻工", "2016-10-25", "12.80",  "19.00",  "买入"],
  ["1002026", "机械行业", "2016-10-25", "12.24",  "14.00",  "买入"],
  ["1300066", "机械行业", "2016-10-25", "7.74",  "10.40",  "买入"],
  ["1002229", "造纸印刷轻工", "2016-10-25", "24.31",  "28.00",  "买入"],
  ["1002167", "电力设备与新能源", "2016-10-24", "12.12",  "14.32",  "买入"],
  ["1002080", "非金属类建材", "2016-10-24", "18.14",  "21.00",  "买入"],
  ["1000885", "非金属类建材", "2016-10-21", "16.59",  "20.00",  "买入"],
  ["1002615", "金属制品", "2016-10-21", "18.82",  "23.20",  "买入"],
  ["1002085", "汽车和汽车零部件", "2016-10-20", "19.62",  "27.50",  "买入"],
  ["1002271", "非金属类建材", "2016-10-20", "23.26",  "30.00",  "买入"],
  ["0600114", "机械行业", "2016-10-20", "16.27",  "23.20",  "买入"]
);
