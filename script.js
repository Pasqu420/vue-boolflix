function boolFlix() {
  new Vue({
    el:'#containerVue',
    data:{
      contents:[],
      input:''
    },
    methods:{
      search: function () {
        axios.get('https://api.themoviedb.org/3/search/multi',{
          params:{
            'api_key':'751a05be1460b8ba83b49cc31a439091',
            'query': this.input
          }
        })
        .then(data => {
          const result = data.data.results;
          // console.log(result);
          this.contents = result
          console.log(this.contents);
        });
      }
    }
  });
}

function init() {
  boolFlix();
}
document.addEventListener('DOMContentLoaded',init);
