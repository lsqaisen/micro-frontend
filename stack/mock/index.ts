

export default {
  'GET /api/plugin': (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        plugins: [{
          status: 'active',
          spec: {
            id: 'stack'
          }
        }]
      });
    }, 1000)
  },
}