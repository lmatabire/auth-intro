namespace auth_intro.Controllers {

  export class HomeController {
    public message = 'Hello from the home page!';
  }


  export class AboutController {
    public message = 'Hello from the about page!';
  }

  export class LoginController {
    public user;

    constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService,
    private $window: ng.IWindowService) {

    }
    public login() {
      console.log(this.user);
      this.$http.post('/api/users/login', this.user).then((response) => {
        console.log('Token: ' + response.data.token);
        this.$window.sessionStorage.setItem('token', response.data.token);
        this.$http.defaults.headers.common['x-access-token'] = response.data.token;
        this.$http.get('/api/users/message').then((response)=>{
          if(response.status == 200) {
            alert(response.data.message)
          } else {
            alert(response.data.err)
          }
        })
        console.log('Token: ' + response.data.token)
        this.$state.go('home')
      });
    }
  }

  export class RegisterController {
    public user;

    constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService,
    private $window: ng.IWindowService) {

    }
    public register() {
      console.log(this.user);
      this.$http.post('api/users/register', this.user).then((response) => {
        this.$state.go('home')
      })
    }

  }
}
