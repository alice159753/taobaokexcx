var util = require('../utils/util');
var md5 = require('../utils/md5.js');

function newWork(options) {
  var tempOptions = {
    url: options.url || '',
    data: options.data || {},
    header: options.header || { 'content-type': 'application/json' },
    method: options.method || 'GET',
  };

  console.log("调用接口参数");
  console.log(tempOptions);

  if (!!tempOptions.method && tempOptions.method.toLowerCase() == 'POST'.toLowerCase() && !options.header) {
    tempOptions.header = {
      "content-type": "application/x-www-form-urlencoded"
    };
  }
  return new Promise((resolve) => {
      if (!!tempOptions.data.isUser) {
        tempOptions.data.user_id = sucData.user_id;//用户ID【1.01版本新增】
      }
      tempOptions.data.req_time = new Date().getTime() + util.randomNum();
      console.log("接口url");
      console.log(util.host + tempOptions.url);

      wx.request({
        url: '' + util.host + tempOptions.url,
        data: tempOptions.data,
        header: tempOptions.header,
        method: tempOptions.method,
        success: function (res) {
          resolve(res);

          console.log("调用接口返回结果");
          console.log(res);
        },
        fail: function (e) {
          
          console.log("调用接口fail");
          console.log(e);
        }
      });
    });
}

export function commonAjax(options) {
  return newWork(options);
}

//首页，轮播图
export function slideshow() {
  return newWork({
    url: '/slideshow.php',
    data: {
    }
  });
}

//注册用户
export function register(userInfo) {
  return newWork({
    url: '/register.php',
    data: {
      userinfo: userInfo
    }
  });
}

//首页一级分类
export function category1() {
  return newWork({
    url: '/category1.php',
    data: {
    }
  });
}

//首页一级分类下面的二级分类
export function category2(parent_no) {
  return newWork({
    url: '/category2.php',
    data: {
      parent_no: parent_no
    }
  });
}

//一级分类下面的所有二级分类
export function categoryall() {
  return newWork({
    url: '/categoryall.php',
    data: {
    }
  });
}

//商品列表
export function product(page, category_no1 = 0, category_no2 = 0, order = 'sale_num desc') {
  return newWork({
    url: '/product.php',
    data: {
      page: page,
      category_no1: category_no1,
      category_no2: category_no2,
      order: order,
    }
  });
}

//商品详情
export function product_detail(user_no, no) {
  return newWork({
    url: '/product_detail.php',
    data: {
      no: no,
      user_no: user_no,
    }
  });
}

//意见反馈
export function suggest(user_no, content) {
  return newWork({
    url: '/suggest.php',
    data: {
      user_no: user_no,
      content: content,
    }
  });
}


//热门搜索
export function hot_search() {
  return newWork({
    url: '/hot_search.php',
    data: {
    }
  });
}


//历史搜索
export function user_search_history(user_no) {
  return newWork({
    url: '/user_search_history.php',
    data: {
      user_no: user_no,
    }
  });
}


//删除历史搜索
export function user_search_delete(no) {
  return newWork({
    url: '/user_search_delete.php',
    data: {
      no: no,
    }
  });
}

//商品搜索列表
export function product_search(page, keyword, user_no, order = 'sale_num desc') {
  return newWork({
    url: '/product_search.php',
    data: {
      page: page,
      keyword: keyword,
      user_no: user_no,
      order: order,
    }
  });
}
