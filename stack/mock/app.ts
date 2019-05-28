export default {
  'GET /service/stack/api/app': (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        name: '23452345',
        listMeta: {
          totalItems: 0,
        },
        apps: []
      });
    }, 1000)
  },
  'POST /service/stack/api/app': (req: any, res: any) => {
    setTimeout(() => {
      res.send();
    }, 1000)
  },
}
