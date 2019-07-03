let profile: any = null;

export default {
  'GET /profile': (req: any, res: any) => {
    setTimeout(() => {
      res.send();
    }, 1000)
  },

  'GET /service/auth/api/ldap/domain': (req: any, res: any) => {
    setTimeout(() => {
      res.send({ 1: 'domain1.com', 2: 'domain2.com' });
    }, 1000)
  },

  'POST /login': (req: any, res: any) => {
    setTimeout(() => {
      profile = {}
      res.send({ code: 200 });
    }, 1000)
  },
};
