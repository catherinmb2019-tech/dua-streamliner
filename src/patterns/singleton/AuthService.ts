export class AuthService {
  private static instance: AuthService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async login(username: string, password: string) {
    console.log("Auth with Cognito (mock)");
    return { username };
  }
}