import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'stack', ...(require('/Users/aisen/workspace/web/micro-frontend/stack/src/models/stack.js').default) });
app.model({ namespace: 'model', ...(require('/Users/aisen/workspace/web/micro-frontend/stack/src/pages/ex/model.js').default) });
