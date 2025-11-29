import { createPinia } from 'pinia'
import { boot } from 'quasar/wrappers'

/*
 * If not building with SSR mode, you can
 * directly export the Pinia instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Pinia instance.
 */

export default boot(({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
})
