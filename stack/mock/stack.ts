export default {
  'GET /service/stack/api/stack': (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        name: '23452345',
        stacks: [{
          name: 'sdfsdf',
        }]
      });
    }, 1000)
  },
  'POST /service/stack/api/stack': (req: any, res: any) => {
    setTimeout(() => {
      res.send();
    }, 1000)
  },
  'DELETE /service/stack/api/stack/delete': (req: any, res: any) => {
    setTimeout(() => {
      res.send();
    }, 1000)
  },
}
