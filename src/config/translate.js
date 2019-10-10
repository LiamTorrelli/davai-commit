const WORDS = {
  all: { en: 'all', ru: 'все' },
  a: { en: 'a', ru: 'а' },
  _article: { en: 'a', ru: '' },
  lines: { en: 'lines', ru: 'строки' },
  files: { en: 'files', ru: 'файлы' },
  hours: { en: 'hours', ru: 'часов' },
  evaluated: { en: 'evaluated', ru: 'оценил' },
  changes: { en: 'changes', ru: 'изменения' },
  changed: { en: 'changed', ru: 'измененные' },
  touched: { en: 'touched', ru: 'затронутые' },
  insertions: { en: 'insertions', ru: 'вставленные' },
  deletions: { en: 'deletions', ru: 'вырезанные' },
  modified: { en: 'modified', ru: 'измененные' },
  deleted: { en: 'deleted', ru: 'удаленные' },
  added: { en: 'added', ru: 'добавленные' },
  renamed: { en: 'renamed', ru: 'переименованные' },
  information: { en: 'information', ru: 'информация' },
  date: { en: 'date', ru: 'дата' },
  name: { en: 'name', ru: 'имя' },
  description: { en: 'description', ru: 'описание' },
  sent: { en: 'sent', ru: 'отправки' },
  summary: { en: 'summary', ru: 'общая информация' },
  commit: { en: 'commit', ru: 'коммит' },
  release: { en: 'release', ru: 'релиз' },
  created: { en: 'created', ru: 'создал' },
  task: { en: 'task', ru: 'задачу' },
  tasks: { en: 'tasks', ru: 'задач' },
  yuan: { en: 'yuan', ru: 'юаней' }
}

const makeUpper = str => str[0].toUpperCase() + str.substring(1)
const makeAllUppercase = (str, needUpper) => needUpper ? str.toUpperCase() : str

const TRANSLATE = (word, lang, isUppercase = false, allUppercase = false) => isUppercase
  ? makeAllUppercase(makeUpper(WORDS[word][lang]), allUppercase)
  : makeAllUppercase(WORDS[word][lang], allUppercase)

export {
  TRANSLATE
}
