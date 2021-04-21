function boolFlix() {
  new Vue({
    el:'#containerVue',
    data:{
      movie:[],
      tv:[],
      input:'',
    },
    methods:{
      search: function () {
        if (!this.input) {
          return;
        }
        const params = {
          params:{
            'api_key':'751a05be1460b8ba83b49cc31a439091',
            'language': 'en-US',
            'query': this.input,
            'include_image_language':'en,null'
          }
        }
        // API movie
        axios.get('https://api.themoviedb.org/3/search/movie',params)
        .then(data => {
          const result = data.data.results;
          this.movie = result
          for (var i = 0; i < this.movie.length; i++) {
            this.$set(this.movie[i], 'active', true);
          }
          // console.log(this.movie);
        });
        // API tv show
        axios.get('https://api.themoviedb.org/3/search/tv',params)
        .then(data => {
          const result = data.data.results;
          this.tv = result
          for (var i = 0; i < this.tv.length; i++) {
            this.$set(this.tv[i], 'active', true);
          }
          // console.log(this.tv);
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
        }
        return item.overview;
      },
      vote:function (item) {
        return Math.ceil(item / 2);
      },
      myActive:function (item) {
        item.active = !item.active;
      }
    }
  });
}

function init() {
  boolFlix();
}
document.addEventListener('DOMContentLoaded',init);
