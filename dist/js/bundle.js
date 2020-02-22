/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_userlogin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/userlogin */ \"./src/js/models/userlogin.js\");\n//新規登録に必要な変数。\n\n//新規登録に必要な変数。\n//ローカルストレージ関連\nconst myID = localStorage.getItem('id');\nconst getchstid = localStorage.getItem('chatroom_id')\n//使うURL達\nconst url = 'https://teachapi.herokuapp.com/sign_up';\nconst urlsign = 'https://teachapi.herokuapp.com/sign_in';\nconst urls = 'https://teachapi.herokuapp.com/users';\nconst urlfix = `https://teachapi.herokuapp.com/users/${myID}`;\nconst posurl = `https://teachapi.herokuapp.com/posts`;\nconst urltimeline = `https://teachapi.herokuapp.com/users/${myID}/timeline`;\nconst chatroomurl = 'https://teachapi.herokuapp.com/chatrooms';\nconst chatfollwer = `https://teachapi.herokuapp.com/users/${myID}/followings`;\nconst chat_nowfolower = `https://teachapi.herokuapp.com/users/${myID}/followers`;\n//新規登録\nconst sendData = () => {\n  fetch(url, {\n      method: \"POST\",\n      body: JSON.stringify({\n        \"sign_up_user_params\": {\n          \"name\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_name\"].value,\n          \"bio\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_bio\"].value,\n          \"email\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_mail\"].value,\n          \"password\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_pass\"].value,\n          \"password_confirmation\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_confirmpass\"].value\n        }\n      }),\n      headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n      }\n    })\n    .then(response => response.json())\n    .then(json => {\n      //ユーザ生成時に以下の情報をローカルストレージに入れる。\n      console.log(json)\n      localStorage.token = json.token,\n        localStorage.id = json.id,\n        localStorage.name = json.name,\n        localStorage.bio = json.bio\n      window.location.href = 'timeline.html';\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n};\nif (_models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postBtn\"]) {\n  _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postBtn\"].addEventListener('click', sendData);\n}\n\n// ユーザーログイン\nif (_models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postlgBtn\"]) {\n  const sendlgData = () => {\n    const datasign = {\n      \"sign_in_user_params\": {\n        \"email\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_maillg\"].value,\n        \"password\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_pass\"].value,\n        \"password_confirmation\": _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"user_confirmpass\"].value\n      }\n    }\n    fetch(urlsign, {\n        method: \"POST\",\n        headers: {\n          'Accept': 'application/json',\n          'Content-Type': 'application/json'\n        },\n        body: JSON.stringify(datasign)\n      })\n      .then(response => response.json())\n      .then(json => {\n        //ユーザ生成時に以下の情報をローカルストレージに入れる。\n        localStorage.token = json.token,\n          localStorage.id = json.id,\n          localStorage.name = json.name,\n          localStorage.bio = json.bio\n        window.location.href = 'timeline.html';\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  };\n  if (_models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postlgBtn\"]) {\n    _models_userlogin__WEBPACK_IMPORTED_MODULE_0__[\"postlgBtn\"].addEventListener('click', sendlgData);\n  }\n}\n// ユーザー一覧\nfetch(urls, {\n    method: \"GET\",\n    headers: {\n      'Content-Type': 'application/json',\n      'Authorization': 'Bearer ' + localStorage.token\n    },\n  })\n  .then(response => response.json())\n  .then(json => {\n    let markup = \"\";\n    json.forEach(element => {\n      markup += `<div class=\"col mb-4\"><div class=\"card h-100\"><img src=\"img/ryusei.jpg\" class=\"card-img-top\" alt=\"...\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">${element.name}</h5>\n             <p class=\"acount\">＠${element.id}</p>\n            <p class=\"card-text\">${element.bio}</p>\n            <p class=\"card-text\"><a href=\"fix.html\">ユーザー編集</a></p>\n            <p class=\"card-text\" onclick=\"follow(${element.id})\">フォローする</p>\n          </div>\n        </div>\n      </div>`;\n    });\n    let users = document.getElementById('userrs');\n    users.insertAdjacentHTML('beforeend', markup);\n  })\n  .then(responseData => {\n    console.log(responseData);\n  })\n  .catch(err => {\n    console.log(err, err.data);\n  });\n// ユーザー編集\nconst usersfix = () => {\n  fetch(urlfix, {\n      method: \"PUT\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      },\n      body: JSON.stringify({\n        \"user_params\": {\n          \"name\": document.getElementById('rename').value,\n          \"bio\": document.getElementById('rebio').value,\n        }\n      })\n    })\n    .then(response => response.json())\n    .then(json => {\n      localStorage.name = json.name,\n        localStorage.bio = json.bio\n      window.location.href = 'user.html';\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\nconst refix = document.getElementById('post-lgtbtnr')\nif (refix) {\n  refix.addEventListener('click', usersfix);\n}\n//アカウントの削除\nconst userdelete = () => {\n  fetch(urlfix, {\n      method: \"DELETE\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      }\n    })\n    .then(response => response.json())\n    .then(json => {\n      localStorage.name = json.name,\n        localStorage.bio = json.bio\n      alert(\"アカウントを削除しました\")\n      window.location.href = 'title.html';\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\nconst deleteusr = document.getElementById('post-lgldbtn')\nif (deleteusr) {\n  deleteusr.addEventListener('click', userdelete);\n}\n//投稿\nconst userpost = () => {\n  fetch(posurl, {\n      method: \"POST\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      },\n      body: JSON.stringify({\n        \"post_params\": {\n          \"text\": document.getElementById('postpost').value,\n        }\n      })\n    })\n    .then(response => response.json())\n    .then(json => {\n      console.log(json)\n      window.location.href = 'timeline.html';\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\nconst postusr = document.getElementById('post-lgvtbtnr')\nif (postusr) {\n  postusr.addEventListener('click', userpost);\n}\n// ユーザーのタイムライン\nconst timelinelogo = document.getElementById('logo')\nif (timelinelogo) {\n  const usertimeline = () => {\n    fetch(urltimeline, {\n        method: \"GET\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        }\n      })\n      .then(response => response.json())\n      .then(json => {\n        console.log(json)\n        let mytime = \"\";\n        json.forEach(element => {\n          mytime += `<div class=\"twitter__block\">\n      <figure>\n          <img src=\"./img/ryusei.jpg\" />\n      </figure>\n      <div class=\"twitter__block-text\">\n          <div class=\"name\">${element.user.name}<span class=\"name_reply\">@${element.id}</span></div>\n          <div class=\"date\">${element.user.created_at}</div>\n          <div class=\"text\">\n              ${element.text}\n          </div>\n          <div class=\"twitter__icon\">\n              <span class=\"twitter-bubble\"></span>\n              <span class=\"twitter-loop\"></span>\n              <span class=\"twitter-heart\"></span>\n          </div>\n      </div>\n  </div>`;\n        });\n        let timelineget = document.getElementById('timeline');\n        timelineget.insertAdjacentHTML('beforeend', mytime);\n        console.log(json.stringify);\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  timelinelogo.addEventListener('click', usertimeline);\n}\n//投稿編集\nconst postrefix = document.getElementById(\"re_post\")\nif (postrefix) {\n  const userpostfix = () => {\n    //特例URLここにセット\n    const edit_text_id = document.querySelector(\"#edit_text_id\").value;\n    const reposturl = `https://teachapi.herokuapp.com/posts/${edit_text_id}`;\n    //特例URLここにセット\n    fetch(reposturl, {\n        method: \"PUT\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        },\n        body: JSON.stringify({\n          \"post_params\": {\n            \"text\": document.getElementById('repost').value,\n          }\n        })\n      })\n      .then(response => response.json())\n      .then(json => {\n        console.log(json)\n        localStorage.text = json.text;\n        window.location.href = 'timeline.html';\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  postrefix.addEventListener('click', userpostfix);\n}\n//投稿削除\nconst postdelete = document.getElementById(\"del_post\")\nif (postdelete) {\n  const userpostdelete = () => {\n    //特例URLここにセット\n    const edit_text_id = document.querySelector(\"#edit_text_id\").value;\n    const reposturl = `https://teachapi.herokuapp.com/posts/${edit_text_id}`;\n    //特例URLここにセット\n    fetch(reposturl, {\n        method: \"DELETE\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        }\n      })\n      .then(response => response.json())\n      .then(json => {\n        console.log(json)\n        alert(\"投稿を消しました。\")\n        window.location.href = 'timeline.html';\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  postdelete.addEventListener('click', userpostdelete);\n}\n//タイムラインのページを取得する。\nconst postget = document.getElementById('timeline')\nif (postget) {\n  fetch(posurl, {\n      method: \"GET\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      }\n    })\n    .then(response => response.json())\n    .then(json => {\n      console.log(json)\n      let time = \"\";\n      json.forEach(element => {\n        time += `<div class=\"twitter__block\">\n          <figure>\n              <img src=\"./img/ryusei.jpg\" />\n          </figure>\n          <div class=\"twitter__block-text\">\n              <div class=\"name\">${element.user.name}<span class=\"name_reply\">@${element.id}</span></div>\n              <div class=\"date\">${element.user.created_at}</div>\n              <div class=\"text\">\n                  ${element.text}\n              </div>\n              <div class=\"twitter__icon\">\n                  <span class=\"twitter-bubble\"></span>\n                  <span class=\"twitter-loop\"></span>\n                  <span class=\"twitter-heart\"></span>\n              </div>\n          </div>\n      </div>`;\n      });\n      postget.insertAdjacentHTML('beforeend', time);\n      console.log(json.stringify);\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\n//チャットルームの実装\nconst show_chat = document.getElementById('chatbtn')\nif (show_chat) {\n  const makeroom = () => {\n    const chat_name = document.getElementById('chattitle').value\n    fetch(chatroomurl, {\n        method: \"POST\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        },\n        body: JSON.stringify({\n          \"chatroom_params\": {\n            \"name\": chat_name\n          }\n        })\n      })\n      .then(response => response.json())\n      .then(json => {\n        const chat_time = `<div id=\"title\" class=\"line__title\">\n  <a href=\"chat.html\"> ${json.name}</a>\n  </div> `;\n        const chatroom_posts = document.getElementById('chat_Btn');\n        chatroom_posts.insertAdjacentHTML('beforeend', chat_time);\n        window.location.href = 'all_chatroom.html';\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  show_chat.addEventListener('click', makeroom)\n}\n//チャットルームの一覧の作成\nconst show_mychatroom = document.getElementById('Chatbtn')\nif (show_mychatroom) {\n  const chatroomshow = () => {\n    //特例にURL設置\n    const chat_pages = document.getElementById('chat_page').value;\n    const chat_limits = document.getElementById('chat_limit').value;\n    const chat_url = `https://teachapi.herokuapp.com/chatrooms?page=${chat_pages}&limit=${chat_limits}`;\n    //特例にURL設置\n    fetch(chat_url, {\n        method: \"GET\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        }\n      })\n      .then(response => response.json())\n      .then(json => {\n        console.log(json)\n        let chatime = \"\";\n        json.forEach(element => {\n          chatime += `<div class=\"col-lg-4\">\n        <div class=\"card\">\n          <img class=\"card-img-top\" src=\"./img/ozi.jpg\" alt=\"ライトコースのイメージ画像\">\n          <div class=\"card-body\">\n            <h4 class=\"card-title\">${element.name}</h4>\n            <a href=\"chat.html\" class=\"btn btn-primary\">👨‍❤️‍👨${element.id}番👨‍❤️‍👨</a>\n          </div>\n        </div>\n      </div> `;\n        });\n        let chatroompage = document.getElementById('row');\n        chatroompage.insertAdjacentHTML('beforeend', chatime);\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  show_mychatroom.addEventListener('click', chatroomshow)\n}\n//他人のチャットルームに参加する。\nconst show_chatroomids = document.getElementById('catrooms_btn')\nif (show_chatroomids) {\n  const chatroomjoin = () => {\n    //特例にURL設置\n    const caht_Ids = document.getElementById('chat_ids').value;\n    const chat_idsurl = `https://teachapi.herokuapp.com/chatrooms/${caht_Ids}/join`;\n    //特例にURL設置\n    fetch(chat_idsurl, {\n        method: \"POST\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        }\n      })\n      .then(response => response.json())\n      .then(json => {\n        alert('参加しました');\n        window.location.href = 'chat.html';\n        console.log(json)\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  show_chatroomids.addEventListener('click', chatroomjoin)\n}\n//チャットないでメッセージを送る。\nconst get_roomstext = document.getElementById('chatSubmit')\nif (get_roomstext) {\n  const chatroomjoin = () => {\n    //特例にURL設置\n    const cahts_Ids = document.getElementById('getid').value;\n    const chat_textsurl = `https://teachapi.herokuapp.com/chatrooms/${cahts_Ids}/messages`;\n    const chat_text = document.getElementById('messagecontent').value;\n    //特例にURL設置\n    fetch(chat_textsurl, {\n        method: \"POST\",\n        headers: {\n          'Content-Type': 'application/json',\n          'Authorization': 'Bearer ' + localStorage.token\n        },\n        body: body.json.stringify({\n          \"message_params\": {\n            \"text\": chat_text\n          }\n        })\n      })\n      .then(response => response.json())\n      .then(json => {\n        console.log(json);\n        const mychat = localStorage.chatroom_id = json.chatroom_id\n        console.log(mychat)\n        const chat_linetime = `<div class=\"line__right\">\n        <div class=\"text\">${json.text}</div>\n        <span class=\"date\">既読<br>0:30</span>\n      </div>`\n        const chatroom_chatposts = document.getElementById('chtat_line');\n        chatroom_chatposts.insertAdjacentHTML('beforeend', chat_linetime);\n      })\n      .then(responseData => {\n        console.log(responseData);\n      })\n      .catch(err => {\n        console.log(err, err.data);\n      });\n  }\n  get_roomstext.addEventListener('click', chatroomjoin)\n}\n//チャット内でのメッセージの取得\nconst mychat = document.getElementById('getd')\nif (mychat) {\n  const params = {\n    id: '150'\n  }\n  //特例URL\n  const qs = new URLSearchParams(params);\n  const chat_textsgeturl = `https://teachapi.herokuapp.com/chatrooms/${getchstid}/messages?${qs}`;\n  //特例URL\n  fetch(chat_textsgeturl, {\n      method: \"GET\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      }\n    })\n    .then(response => response.json())\n    .then(json => {\n      console.log(json);\n      let chatgets = \"\";\n      json.forEach(element => {\n        chatgets += `<div id=\"line_line\"> \n      <figure>\n      <img src=\"./img/ryusei.jpg\" />\n    </figure>\n    <div class=\"line__left-text\">\n      <div class=\"name\">${element.user.name}</div>\n      <div class=\"text\">${element.text}</div>\n    </div></div>`;\n      });\n      let chahdget = document.getElementById('line__left');\n      chahdget.insertAdjacentHTML('beforeend', chatgets);\n      console.log(json.stringify);\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\n//フォロー機能DOM操作ができなかったので、user.htmlに書き込み\n//unfollowもDOM操作ができなかったためfollow.htmlに書き込み\n// フォロワ一覧を取得する\nconst post_gwtfollw = document.getElementById('urs')\nif (post_gwtfollw) {\n  fetch(chat_nowfolower, {\n      method: \"GET\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      }\n    })\n    .then(response => response.json())\n    .then(json => {\n      let marimgkup = \"\";\n      json.forEach(element => {\n        marimgkup += `<div class=\"col mb-4\"><div class=\"card h-100\"><img src=\"img/ryusei.jpg\" class=\"card-img-top\" alt=\"...\">\n                <div class=\"card-body\">\n                  <h5 class=\"card-title\">${element.name}</h5>\n                   <p class=\"acount\">＠${element.id}</p>\n                  <p class=\"card-text\">${element.bio}</p>\n                </div>\n              </div>\n            </div>`;\n      });\n      let hed = document.getElementById('urs');\n      hed.insertAdjacentHTML('beforeend', marimgkup);\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\n// フォロー覧を取得する\nconst my_folower = document.getElementById('urss')\nif (my_folower) {\n  fetch(chatfollwer, {\n      method: \"GET\",\n      headers: {\n        'Content-Type': 'application/json',\n        'Authorization': 'Bearer ' + localStorage.token\n      }\n    })\n    .then(response => response.json())\n    .then(json => {\n      let myfower = \"\";\n      json.forEach(element => {\n        myfower += `<div class=\"col mb-4\"><div class=\"card h-100\"><img src=\"img/ryusei.jpg\" class=\"card-img-top\" alt=\"...\">\n          <div class=\"card-body\">\n            <h5 class=\"card-title\">${element.name}</h5>\n             <p class=\"acount\">＠${element.id}</p>\n            <p class=\"card-text\">${element.bio}</p>\n            <p class=\"card-text\" onclick=\"unfollow(${element.id})\">フォロー外す</p>\n          </div>\n        </div>\n      </div>`;\n      });\n      let hede = document.getElementById('urss');\n      hede.insertAdjacentHTML('beforeend', myfower);\n    })\n    .then(responseData => {\n      console.log(responseData);\n    })\n    .catch(err => {\n      console.log(err, err.data);\n    });\n}\n//ログアウト\nconst mylogout = document.getElementById('post-logout')\nif (mylogout) {\n  mylogout.addEventListener(\"click\", (e) => {\n    e.preventDefault()\n    window.localStorage.clear();\n    alert(\"ログアウトします。\")\n    window.location.href = 'title.html';\n  })\n}\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/userlogin.js":
/*!************************************!*\
  !*** ./src/js/models/userlogin.js ***!
  \************************************/
/*! exports provided: postBtn, user_name, user_bio, user_mail, user_maillg, user_pass, user_confirmpass, postlgBtn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postBtn\", function() { return postBtn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_name\", function() { return user_name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_bio\", function() { return user_bio; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_mail\", function() { return user_mail; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_maillg\", function() { return user_maillg; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_pass\", function() { return user_pass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"user_confirmpass\", function() { return user_confirmpass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postlgBtn\", function() { return postlgBtn; });\n// いらない変数ども\nconst postBtn = document.getElementById('post-btn');\nconst user_name=document.getElementById('UserName');\nconst user_bio=document.getElementById('User');\nconst user_mail=document.getElementById('Email');\nconst user_maillg=document.getElementById('email');\nconst user_pass=document.getElementById('Password');\nconst user_confirmpass=document.getElementById('ConfirmPassword');\nconst postlgBtn = document.getElementById('post-lgbtn');\n\n\n\n\n//# sourceURL=webpack:///./src/js/models/userlogin.js?");

/***/ })

/******/ });