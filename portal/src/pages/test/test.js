import dynamic from 'umi/dynamic';

const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
export default dynamic({
  loader: async function () {
    return () => <div>I will render after 1s</div>;
  },
});