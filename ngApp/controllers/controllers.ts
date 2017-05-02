namespace auth_intro.Controllers {

  export class HomeController {
    public message = 'Hello from the home page!';
  }


  export class AboutController {
    public message = 'Hello from the about page!';
  }

  export class LoginController {
    public user;

    constructor(private $http: ng.IHttpService,
      private $state: ng.ui.IStateService) {

    }
    public login() {
      console.log(this.user);
      this.$http.post('/api/users/login', this.user).then((response) => {
        this.$state.go('home')
      });
    }
  }
  export class RegisterController {
    public user;


    constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService) {

    }

    public register() {
      console.log(this.user);
      this.$http.post('api/users/register', this.user).then((response) => {
        this.$state.go('home')
      })
    }

  }
}
