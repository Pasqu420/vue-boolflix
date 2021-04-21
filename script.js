function boolFlix() {
  new Vue({
    el:'#containerVue',
    data:{
      movie:[],
      tv:[],
      input:'a',
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
            this.$set(this.movie[i], 'actors', []);
            this.actorsMovie(this.movie[i]);
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
            this.$set(this.tv[i], 'actors', []);
            this.actorsTv(this.tv[i]);
          }
          // console.log(this.tv)
        });
      },
      actorsMovie:function(movie){
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits`
        axios.get(url,{
          params:{
            'api_key':'751a05be1460b8ba83b49cc31a439091',
            'language': 'en-US'
          }
        })
        .then(actorMovie => {
          const arrActorsMovie = actorMovie.data.cast;
          const topFiveMovie = arrActorsMovie.splice(0,5);
          movie.actors=topFiveMovie;
          // console.log(topFiveMovie);
        })
        .catch(() => console.log('error'));
      },
      actorsTv:function (tv) {
        const url = `https://api.themoviedb.org/3/tv/${tv.id}`
        axios.get(url,{
          params:{
            'api_key':'751a05be1460b8ba83b49cc31a439091',
            'append_to_response': 'credits',
            'language': 'en-US'
          }
        })
        .then(actorTv => {
          const arrActorsTv = actorTv.data.credits.cast;
          const topFiveTv = arrActorsTv.splice(0,5);
          tv.actors=topFiveTv;
          // console.log(topFiveTv);
        })
        .catch(() => console.log('error'));
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
