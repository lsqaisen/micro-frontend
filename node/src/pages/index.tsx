import Layout from "./node/_layout";
import Node from "./node";

export default (props: any) => (
  <Layout {...props}>
    <Node {...props} />
  </Layout>
)
