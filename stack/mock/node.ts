export default {
  'GET /service/node/api/cluster/default/node/': (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        name: '23452345',
        listMeta: {
          totalItems: 100,
        },
        nodes: [{ name: '1', hostIPS: [{ address: '1' }] }]
      });
    }, 1000)
  },
}
