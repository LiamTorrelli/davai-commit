// Helpers
import { tasks } from '../config/words'

// Handlers
import { _Errors } from './outputHandler'

const taskHandler = async (
  taskName,
  taskFunction,
  params = null
) =>
  taskFunction(params)
    .then(isTaskOkk => (isTaskOkk
      ? Promise.resolve(isTaskOkk)
      : Promise.reject((tasks[taskName].error))
    )).catch(err => {
      console.log('Task Errored here')
      throw new Error(err)
    })

export { taskHandler }
