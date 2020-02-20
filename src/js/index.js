//新規登録に必要な変数。
import {
  postBtn,
  user_name,
  user_bio,
  user_mail,
  user_pass,
  user_confirmpass,
  postlgBtn,
  user_maillg
} from './models/userlogin';
//新規登録に必要な変数。
//ローカルストレージ関連
const myID = localStorage.getItem('id');
//使うURL達
const url = 'https://teachapi.herokuapp.com/sign_up'
const urlsign = 'https://teachapi.herokuapp.com/sign_in'
const urls = 'https://teachapi.herokuapp.com/users';
const urlfix = `https://teachapi.herokuapp.com/users/${myID}`;
//新規登録
const sendData = () => {
  fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "sign_up_user_params": {
          "name": user_name.value,
          "bio": user_bio.value,
          "email": user_mail.value,
          "password": user_pass.value,
          "password_confirmation": user_confirmpass.value
        }
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      //ユーザ生成時に以下の情報をローカルストレージに入れる。
      console.log(json)
      localStorage.token = json.token,
        localStorage.id = json.id,
        localStorage.name = json.name,
        localStorage.bio = json.bio
      window.location.href = 'timeline.html';
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
};
if (postBtn) {
  postBtn.addEventListener('click', sendData);
}
// ユーザーログイン
if (postlgBtn) {
  const sendlgData = () => {
    const datasign = {
      "sign_in_user_params": {
        "email": user_maillg.value,
        "password": user_pass.value,
        "password_confirmation": user_confirmpass.value
      }
    }
    fetch(urlsign, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datasign)
      })
      .then(response => response.json())
      .then(json => {
        //ユーザ生成時に以下の情報をローカルストレージに入れる。
        localStorage.token = json.token,
          localStorage.id = json.id,
          localStorage.name = json.name,
          localStorage.bio = json.bio
        window.location.href = 'timeline.html';
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  };
  if (postlgBtn) {
    postlgBtn.addEventListener('click', sendlgData);
  }
}
//ローカルストレージ関連
const getId = window.localStorage.getItem('id');
//ローカルストレージ関連
// ユーザー一覧
fetch(urls, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    },
  })
  .then(response => response.json())
  .then(json => {
    let markup = "";
    json.forEach(element => {
      markup += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
             <p class="acount">＠${element.id}</p>
            <p class="card-text">${element.bio}</p>
            <p class="card-text"><a href="fix.html">ユーザー編集</a></p>
          </div>
        </div>
      </div>`;
    });
    let h = document.getElementById('userrs');
    h.insertAdjacentHTML('beforeend', markup);
  })
  .then(responseData => {
    console.log(responseData);
  })
  .catch(err => {
    console.log(err, err.data);
  });
// ユーザー編集
const usersfix = () => {
fetch(urlfix, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    },
    body: JSON.stringify({
      "user_params": {
        "name": document.getElementById('rename').value,
        "bio": document.getElementById('rebio').value,
      }
    })
  })
  .then(response => response.json())
  .then(json => {
    localStorage.name = json.name,
      localStorage.bio = json.bio
    window.location.href = 'user.html';
  })
  .then(responseData => {
    console.log(responseData);
  })
  .catch(err => {
    console.log(err, err.data);
  });
}
const refix = document.getElementById('post-lgtbtnr')
if (refix) {
  refix.addEventListener('click', usersfix);
}
//アカウントの削除
const sendHttpRequesdtlge = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(response => {
    if (response.status >= 400) {
      // !response.ok
      return response.json().then(errResData => {
        const error = new Error('Something went wrong!');
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  });
};

const jsendlgDatasc = () => {
  sendHttpRequesdtlge('DELETE', newurl, )
    .then(json => {
      localStorage.name = json.name,
        localStorage.bio = json.bio
      alert("アカウントを削除しました")
      window.location.href = 'title.html';
    })
    .then(responseData => {
      console.log(responseData);
    })

    .catch(err => {
      console.log(err, err.data);
    });
};
const poppoo = document.getElementById('post-lgldbtn')
if (poppoo) {
  poppoo.addEventListener('click', jsendlgDatasc);
}
//投稿
const sendfHttpRequestlg = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then(response => {
    if (response.status >= 400) {
      // !response.ok
      return response.json().then(errResData => {
        const error = new Error('Something went wrong!');
        error.data = errResData;
        throw error;
      });
    }
    return response.json();
  });
};
console.log(localStorage.token)
const sendflgData = () => {
  sendfHttpRequestlg('POST', 'https://teachapi.herokuapp.com/posts', {
      "post_params": {
        "text": document.getElementById('postpost').value,
      }
    })
    .then(json => {
      console.log(json)
      window.location.href = 'timeline.html';
    })
    .then(responseData => {
      console.log(responseData);
    })

    .catch(err => {
      console.log(err, err.data);
    });
};
const postbttn = document.getElementById('post-lgvtbtnr')
if (postbttn) {
  postbttn.addEventListener('click', sendflgData);
}
// ユーザーのタイムライン
const MYurl = `https://teachapi.herokuapp.com/users/${myID}/timeline`;
const timelinelogo = document.getElementById('logo')
if (timelinelogo) {
  const sendHttpRequesftlgt = (method, url) => {
    return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => {
        if (response.status >= 400) {
          // !response.ok
          return response.json()
            .then(errResData => {
              const error = new Error('Something went wrong!');
              error.data = errResData;
              throw error;
            });
        }
        return response.json();
      });
  };
  const senddlgdData = () => {
    sendHttpRequesftlgt('GET', MYurl)
      .then(json => {
        console.log(json)
        let markuped = "";
        json.forEach(element => {
          markuped += `<div class="twitter__block">
      <figure>
          <img src="./img/ryusei.jpg" />
      </figure>
      <div class="twitter__block-text">
          <div class="name">${element.user.name}<span class="name_reply">@${element.id}</span></div>
          <div class="date">${element.user.created_at}</div>
          <div class="text">
              ${element.text}
          </div>
          <div class="twitter__icon">
              <span class="twitter-bubble"></span>
              <span class="twitter-loop"></span>
              <span class="twitter-heart"></span>
          </div>
      </div>
  </div>`;
        });
        let hd = document.getElementById('timeline');
        hd.insertAdjacentHTML('beforeend', markuped);
        console.log(json.stringify);
      })
      .then(responseData => {
        console.log(responseData);
      })
      .catch(err => {
        console.log(err, err.data);
      });
  };
  timelinelogo.addEventListener('click', senddlgdData);
}
//投稿編集
const postrefix = document.getElementById("re_post")
if (postrefix) {
  postrefix.addEventListener("click", (event) => {
    event.preventDefault();
    const sendreposts = (method, url, data) => {
      return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(response => {
        if (response.status >= 400) {
          // !response.ok
          return response.json().then(errResData => {
            const error = new Error('Something went wrong!');
            error.data = errResData;
            throw error;
          });
        }
        return response.json();
      });
    };
    const edit_text_id = document.querySelector("#edit_text_id").value;
    console.log(edit_text_id)
    const reposturl = `https://teachapi.herokuapp.com/posts/${edit_text_id}`;
    const sendposts = () => {
      sendreposts('PUT', reposturl, {
          "post_params": {
            "text": document.getElementById('repost').value,
          }
        })
        .then(json => {
          console.log(json)
          localStorage.text = json.text;
          window.location.href = 'timeline.html';
        })
        .then(responseData => {
          console.log(responseData);
        })

        .catch(err => {
          console.log(err, err.data);
        });
    };
    const repost_btn = document.getElementById('re_post')
    const result = document.getElementsByClassName('btn-success');
    console.log(repost_btn)
    console.log(result)
    if (repost_btn) {
      repost_btn.addEventListener('click', sendposts);
    }
  });
}
//投稿削除
const postdel = document.getElementById("del_post")
if (postdel) {
  postdel.addEventListener("click", (event) => {
    event.preventDefault();
    const deletrequest = (method, url, data) => {
      return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(response => {
        if (response.status >= 400) {
          // !response.ok
          return response.json().then(errResData => {
            const error = new Error('Something went wrong!');
            error.data = errResData;
            throw error;
          });
        }
        return response.json();
      });
    };

    const delet_text_id = document.querySelector("#edit_text_id").value;
    const deleteurl = `https://teachapi.herokuapp.com/posts/${delet_text_id}`

    const deletefetched = () => {
      deletrequest('DELETE', deleteurl, )
        .then(json => {
          console.log(json)
          window.location.href = 'timeline.html';
        })
        .then(responseData => {
          console.log(responseData);
        })

        .catch(err => {
          console.log(err, err.data);
        });
    };
    const del_posts = document.getElementById('del_post')
    if (del_posts) {
      del_posts.addEventListener('click', deletefetched);
    }
  });
}
//タイムラインのページを取得する。
// const show_timeline = document.getElementById('timeline_submit')
// if (show_timeline) {
//   show_timeline.addEventListener("click", (event) => {
//     event.preventDefault();
//     // const users_pages = document.getElementById('pages').value;
//     // const users_limits = document.getElementById('limits').value;
//     // const users_querys = document.getElementById('querys').value;
//     // page=${users_pages}&limit=${users_limits}&query=${users_querys}

const MY_url = `https://teachapi.herokuapp.com/posts`;
const get_data = document.getElementById('timeline')
if (get_data) {
  const users_timeline = (method, url) => {
    return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => {
        if (response.status >= 400) {
          // !response.ok
          return response.json()
            .then(errResData => {
              const error = new Error('Something went wrong!');
              error.data = errResData;
              throw error;
            });
        }
        return response.json();
      });
  };
  // const sendtimeline = () => {
  users_timeline('GET', MY_url)
    .then(json => {
      console.log(json)
      let time = "";
      json.forEach(element => {
        time += `<div class="twitter__block">
        <figure>
            <img src="./img/ryusei.jpg" />
        </figure>
        <div class="twitter__block-text">
            <div class="name">${element.user.name}<span class="name_reply">@${element.id}</span></div>
            <div class="date">${element.user.created_at}</div>
            <div class="text">
                ${element.text}
            </div>
            <div class="twitter__icon">
                <span class="twitter-bubble"></span>
                <span class="twitter-loop"></span>
                <span class="twitter-heart"></span>
            </div>
        </div>
    </div>`;
      });
      let hd = document.getElementById('timeline');
      hd.insertAdjacentHTML('beforeend', time);
      console.log(json.stringify);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
// };
// const get_data = document.getElementById('timeline_submit')
// if (get_data) {
//   get_data.addEventListener('click', sendtimeline);
// }

//チャットルームの実装
const show_chat = document.getElementById('chatbtn')
if (show_chat) {
  show_chat.addEventListener("click", (event) => {
    event.preventDefault();
    const chatrequest = (method, url, data) => {
      return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then(response => {
        if (response.status >= 400) {
          // !response.ok
          return response.json().then(errResData => {
            const error = new Error('Something went wrong!');
            error.data = errResData;
            throw error;
          });
        }
        return response.json();
      });
    };
    console.log(localStorage.token)
    const chat_name = document.getElementById('chattitle').value
    const sendchatrequest = () => {
      chatrequest('POST', 'https://teachapi.herokuapp.com/chatrooms', {
          "chatroom_params": {
            "name": chat_name
          }
        })
        .then(json => {
          console.log(json)
          const chat_time = `<div id="title" class="line__title">
        <a href="chat.html"> ${json.name}</a>
        </div> `;
          const chatroom_posts = document.getElementById('chat_Btn');
          chatroom_posts.insertAdjacentHTML('beforeend', chat_time);
          window.location.href = 'all_chatroom.html';
        })
        .then(responseData => {
          console.log(responseData);
        })

        .catch(err => {
          console.log(err, err.data);
        });
    };
    const chatBtn = document.getElementById('chatbtn')
    if (chatBtn) {
      chatBtn.addEventListener('click', sendchatrequest);
    }
  });
}
//チャットルームの一覧の作成
const show_chatroom = document.getElementById('Chatbtn')
console.log(show_chatroom)
if (show_chatroom) {
  show_chatroom.addEventListener("click", (event) => {
    event.preventDefault();
    const chat_pages = document.getElementById('chat_page').value;
    const chat_limits = document.getElementById('chat_limit').value;
    const chat_url = `https://teachapi.herokuapp.com/chatrooms?page=${chat_pages}&limit=${chat_limits}`;
    console.log(chat_url)

    const users_chatname = (method, url) => {
      return fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
        .then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json()
              .then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
              });
          }
          return response.json();
        });
    };
    const sendchatroom = () => {
      users_chatname('GET', chat_url)
        .then(json => {
          console.log(json)
          let chatime = "";
          json.forEach(element => {
            chatime += `<div class="col-lg-4">
            <div class="card">
              <img class="card-img-top" src="./img/ozi.jpg" alt="ライトコースのイメージ画像">
              <div class="card-body">
                <h4 class="card-title">${element.name}</h4>
                <a href="chat.html" class="btn btn-primary">👨‍❤️‍👨${element.id}番👨‍❤️‍👨</a>
              </div>
            </div>
          </div> `;
          });
          let chahd = document.getElementById('row');
          chahd.insertAdjacentHTML('beforeend', chatime);
          console.log(json.stringify);
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };
    const get_room = document.getElementById('Chatbtn')
    if (get_room) {
      get_room.addEventListener('click', sendchatroom);
    }
  });
}

//他人のチャットルームに参加する。
const show_chatroomids = document.getElementById('catrooms_btn')
console.log(show_chatroom)
if (show_chatroomids) {
  show_chatroomids.addEventListener("click", (event) => {
    event.preventDefault();
    const caht_Ids = document.getElementById('chat_ids').value;
    const chat_idsurl = `https://teachapi.herokuapp.com/chatrooms/${caht_Ids}/join`;

    const users_chatnameids = (method, url) => {
      return fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
        .then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json()
              .then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
              });
          }
          return response.json();
        });
    };
    const sendchatroomids = () => {
      users_chatnameids('POST', chat_idsurl)
        .then(json => {
          alert('参加しました');
          window.location.href = 'chat.html';
          console.log(json)
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };
    const get_roomids = document.getElementById('catrooms_btn')
    if (get_roomids) {
      get_roomids.addEventListener('click', sendchatroomids);
    }
  });
}
//チャットないでメッセージを送る。
const show_chaids = document.getElementById('chatSubmit')
const get_roomstext = document.getElementById('chatSubmit')
if (show_chaids) {
  show_chaids.addEventListener("click", (event) => {
    event.preventDefault();
    const users_chattext = (method, url, data) => {
      return fetch(url, {
          method: method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
        .then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json()
              .then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
              });
          }
          return response.json();
        });
    };
    const cahts_Ids = document.getElementById('getid').value;
    const chat_textsurl = `https://teachapi.herokuapp.com/chatrooms/${cahts_Ids}/messages`;
    const chat_text = document.getElementById('messagecontent').value;
    const sendchatroomtext = () => {
      users_chattext('POST', chat_textsurl, {
          "message_params": {
            "text": chat_text
          }
        })
        .then(json => {
          console.log(json);
          const mychat = localStorage.chatroom_id = json.chatroom_id
          console.log(mychat)
          const chat_linetime = `<div class="line__right">
          <div class="text">${json.text}</div>
          <span class="date">既読<br>0:30</span>
        </div>`
          const chatroom_chatposts = document.getElementById('chtat_line');
          chatroom_chatposts.insertAdjacentHTML('beforeend', chat_linetime);
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };
    if (get_roomstext) {
      get_roomstext.addEventListener('click', sendchatroomtext);
    }
  });
}
const getchstid = localStorage.getItem('chatroom_id')
console.log(getchstid)
//チャット内でのメッセージの取得
if (show_chaids) {
  show_chaids.addEventListener("click", (event) => {
    event.preventDefault();
    const users_chatgettext = (method, url) => {
      return fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
        .then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json()
              .then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
              });
          }
          return response.json();
        });
    };
    const params = {
      id: '150'
    }
    const qs = new URLSearchParams(params);

    // const cahts_getI = document.getElementById('getd').value;
    const chat_textsgeturl = `https://teachapi.herokuapp.com/chatrooms/${getchstid}/messages?${qs}`;
    const sendchatroomgettext = () => {
      users_chatgettext('GET', chat_textsgeturl)
        .then(json => {
          console.log(json);
          let chatgets = "";
          json.forEach(element => {
            chatgets += `<div id="line_line"> 
            <figure>
            <img src="./img/ryusei.jpg" />
          </figure>
          <div class="line__left-text">
            <div class="name">${element.user.name}</div>
            <div class="text">${element.text}</div>
          </div></div>`;
          });
          let chahdget = document.getElementById('line__left');
          chahdget.insertAdjacentHTML('beforeend', chatgets);
          console.log(json.stringify);
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };
    if (get_roomstext) {
      get_roomstext.addEventListener('click', sendchatroomgettext);
    }
  });
}
//フォロー機能
const post_dofollw = document.getElementById('getting')
if (post_dofollw) {
  post_dofollw.addEventListener("click", (event) => {
    event.preventDefault();
    const foloowgets = (method, url) => {
      return fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
        .then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json()
              .then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
              });
          }
          return response.json();
        });
    };
    const cahts_getfollow = document.getElementById('post_dofollw').value;
    const chat_folowgeturl = `https://teachapi.herokuapp.com/users/${cahts_getfollow}/follow`;
    const getsfollower = () => {
      foloowgets('POST', chat_folowgeturl)
        .then(json => {
          alert(json.id + "番をフォローしました。");
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };
    const post_doingfollw = document.getElementById('getting')
    if (post_doingfollw) {
      post_doingfollw.addEventListener('click', getsfollower);
    }
  });
}
//フォローを外す
const post_unfollw = document.getElementById('post-unfollowing')
if (post_unfollw) {
  post_unfollw.addEventListener("click", (event) => {
    event.preventDefault();
    const unfoloowgets = (method, url) => {
      return fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token
          }
        })
        .then(response => {
          if (response.status >= 400) {
            // !response.ok
            return response.json()
              .then(errResData => {
                const error = new Error('Something went wrong!');
                error.data = errResData;
                throw error;
              });
          }
          return response.json();
        });
    };
    const cahts_unfollow = document.getElementById('unfollow').value;
    const chat_unfolowgeturl = `https://teachapi.herokuapp.com/users/${cahts_unfollow}/follow`;
    const unfollower = () => {
      unfoloowgets('DELETE', chat_unfolowgeturl)
        .then(json => {
          alert(json.id + "番をアンフォローしました。");
        })
        .then(responseData => {
          console.log(responseData);
        })
        .catch(err => {
          console.log(err, err.data);
        });
    };

    if (post_unfollw) {
      post_unfollw.addEventListener('click', unfollower);
    }
  });
}
// フォロ一覧を取得する
const nowfoloow = (method, url) => {
  return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    })
    .then(response => {
      if (response.status >= 400) {
        // !response.ok
        return response.json()
          .then(errResData => {
            const error = new Error('Something went wrong!');
            error.data = errResData;
            throw error;
          });
      }
      return response.json();
    });
};
const chat_nowfolowgeturl = `https://teachapi.herokuapp.com/users/${getId}/followings`;

nowfoloow('GET', chat_nowfolowgeturl)
  .then(json => {
    console.log(json)
    let marimgkup = "";
    json.forEach(element => {
      marimgkup += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
               <p class="acount">＠${element.id}</p>
              <p class="card-text">${element.bio}</p>
            </div>
          </div>
        </div>`;
    });
    let hed = document.getElementById('urs');
    hed.insertAdjacentHTML('beforeend', marimgkup);
    if (json.length = 0) {
      alert("まだ誰もフォローしていません")
    }
    console.log(json.stringify);
  })
  .then(responseData => {
    console.log(responseData);
  })
  .catch(err => {
    console.log(err, err.data);
  });
const nowfolowinguser = document.getElementById('post-lgtbtnfollowing')
if (nowfolowinguser) {
  nowfolowinguser.addEventListener('click', nowfollowe);
}

// フォロワー覧を取得する
const my_folower = document.getElementById('urss')
if (my_folower) {
  const nowfoloower = (method, url) => {
    return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        }
      })
      .then(response => {
        if (response.status >= 400) {
          // !response.ok
          return response.json()
            .then(errResData => {
              const error = new Error('Something went wrong!');
              error.data = errResData;
              throw error;
            });
        }
        return response.json();
      });
  };
  const chat_nowfolower = `https://teachapi.herokuapp.com/users/${getId}/followers`;

  nowfoloower('GET', chat_nowfolower)
    .then(json => {
      let myfower = "";
      json.forEach(element => {
        myfower += `<div class="col mb-4"><div class="card h-100"><img src="img/ryusei.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
               <p class="acount">＠${element.id}</p>
              <p class="card-text">${element.bio}</p>
            </div>
          </div>
        </div>`;
      });
      let hede = document.getElementById('urss');
      hede.insertAdjacentHTML('beforeend', myfower);
      if (json.length = 0) {
        alert("まだ誰もフォロワーはいません")
      }
      console.log(json.stringify);
    })
    .then(responseData => {
      console.log(responseData);
    })
    .catch(err => {
      console.log(err, err.data);
    });
}
//ログアウト
const mylogout = document.getElementById('post-logout')
if (mylogout) {
  mylogout.addEventListener("click", (e) => {
    e.preventDefault()
    window.localStorage.clear();
    alert("ログアウトします。")
    window.location.href = 'title.html';
  })
}