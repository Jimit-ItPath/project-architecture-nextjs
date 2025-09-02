export const routes = {
  public: {
    home: '/',
    terms_and_conditions: '/terms-and-conditions',
  },
  auth: {
    login: '/login',
    register: '/register',
    forgot_password: '/forgot-password',
  },
  private: {
    dashboard: '/dashboard',
    users: '/users',
    add_user: '/users/add',
    user_detail: (id: string | number) => `/users/${id}`,
    account: '/account',
  },
};
