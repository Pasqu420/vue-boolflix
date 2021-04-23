function boolFlix() {
  new Vue({
    el:'#containerVue',
    data:{
      movies:[],
      tv:[],
      input:'',
    },
    mounted(){  //top 10 film visualizzati di default
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=751a05be1460b8ba83b49cc31a439091')
      .then(movie => {
        this.movies =  movie.data.results.splice(0,10);
        this.addKey(this.movies);
      })
      .catch(() => console.log('error'));
      // top 10 serie visualizzate di default
      axios.get('https://api.themoviedb.org/3/tv/popular?api_key=751a05be1460b8ba83b49cc31a439091')
      .then(topTv => {
        this.tv = topTv.data.results.splice(0,10);
        this.addKey(this.tv);
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
          this.movies = resultMovie;
          this.addKey(this.movies);
        })
        .catch(() => console.log('error'));

        // API tv show
        axios.get('https://api.themoviedb.org/3/search/tv',params)
        .then(data => {
          const resultTv = data.data.results;
          this.tv = resultTv;
          this.addKey(this.tv);
        })
        .catch(() => console.log('error'));
      },
      addKey:function (item) {
        for (var i = 0; i < item.length; i++) {
          this.$set(item[i], 'active', true);
          this.$set(item[i], 'actors', []);
        }
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
          movie.actors=actorMovie.data.cast.splice(0,5);
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
          tv.actors= actorTv.data.credits.cast.splice(0,5);
        })
        .catch(() => console.log('error'));
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
