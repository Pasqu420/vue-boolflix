function boolFlix() {
  new Vue({
    el:'#containerVue',
    data:{
      movies:[],
      tv:[],
      input:'',
    },
    mounted(){  //top 20 film visualizzati di default
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=751a05be1460b8ba83b49cc31a439091')
      .then(movie => {
        const topRes = movie.data.results;
        this.movies = topRes;
        for (var i = 0; i < this.movies.length; i++) {
          this.$set(this.movies[i], 'active', true);
          this.$set(this.movies[i], 'actors', []);
          this.actorsMovie(this.movies[i]);
        }
      })
      .catch(() => console.log('error'));
      // top 20 serie visualizzate di default
      axios.get('https://api.themoviedb.org/3/tv/popular?api_key=751a05be1460b8ba83b49cc31a439091')
      .then(topTv => {
        const topResTv = topTv.data.results;
        this.tv = topResTv;
        for (var i = 0; i < this.tv.length; i++) {
          this.$set(this.tv[i], 'active', true);
          this.$set(this.tv[i], 'actors', []);
          this.actorsTv(this.tv[i]);
        }
      })
      .catch(() => console.log('error'));
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
            'query': this.input
          }
        }
        // API movies
        axios.get('https://api.themoviedb.org/3/search/movie',params)
        .then(data => {
          const resultMovie = data.data.results;
          this.movies = resultMovie
          for (var i = 0; i < this.movies.length; i++) {
            this.$set(this.movies[i], 'active', true);
            this.$set(this.movies[i], 'actors', []);
            this.actorsMovie(this.movies[i]);
          }
        })
        .catch(() => console.log('error'));
        // API tv show
        axios.get('https://api.themoviedb.org/3/search/tv',params)
        .then(data => {
          const resultTv = data.data.results;
          this.tv = resultTv
          for (var i = 0; i < this.tv.length; i++) {
            this.$set(this.tv[i], 'active', true);
            this.$set(this.tv[i], 'actors', []);
            this.actorsTv(this.tv[i]);
          }
        })
        .catch(() => console.log('error'));
      },
      actorsMovie:function(movie){  //API cast movie
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
        })
        .catch(() => console.log('error'));
      },
      actorsTv:function (tv) {  //API cast tv show
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
        })
        .catch(() => console.log('error'));
      },
      language: function (item) { //ritorn percorso img flag language
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
      vote:function (item) {  //converto il voto in base 5
        return Math.ceil(item / 2);
      },
      myActive:function (item) {  //effetto hover
        item.active = !item.active;
      }
    }
  });
}

function init() {
  boolFlix();
}
document.addEventListener('DOMContentLoaded',init);
