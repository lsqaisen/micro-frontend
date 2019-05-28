let profile: any = {};

export default {
  'GET /profile': (req: any, res: any) => {
    setTimeout(() => {
      res.send(profile);
    }, 1)
  },

  'GET /service/auth/api/ldap/domain': (req: any, res: any) => {
    setTimeout(() => {
      res.send({ 1: 'domain1.com', 2: 'domain2.com' });
    }, 1)
  },

  'POST /login': (req: any, res: any) => {
    setTimeout(() => {
      profile = {}
      res.send({ code: 200 });
    }, 1)
  },
};
