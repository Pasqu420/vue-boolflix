function boolFlix() {
  new Vue({
    el:'#containerVue',
    data:{
      contents:[],
      input:'',
    },
    methods:{
      search: function () {
        axios.get('https://api.themoviedb.org/3/search/multi',{
            params:{
              'api_key':'751a05be1460b8ba83b49cc31a439091',
              'query': this.input,
              'include_image_language':'en,null'
            }
          })
        .then(data => {
          const result = data.data.results;
          // console.log(result);
          this.contents = result
          for (var i = 0; i < this.contents.length; i++) {
            this.contents[i].active = true;
          }
          console.log(this.contents);
        });
      },
      language: function (item) {
        if (item == 'en') {
          return 'img/Bandiera-Inglese.png';
        }else if (item == 'it') {
          return 'img/Bandiera-italiana.jpg';
        }else if (item == 'es') {
          return 'img/bandiera-Spain.svg';
        }
      },
      flag:function (language) {
        return language == 'it'||language == 'en'||language == 'es';
      },
      overview: function (item){
        if (item.overview && item.overview.length > 130) {
          return item.overview.slice(0,130);
        }else {
          return item.overview;
        }
      },
      vote:function (item) {
        return Math.ceil(item / 2);
      },
      myActive:function (item) {
        console.log(item.active);
        console.log(item);
        item.active = !item.active;
      }
    }
  });
}

function init() {
  boolFlix();
}
document.addEventListener('DOMContentLoaded',init);
