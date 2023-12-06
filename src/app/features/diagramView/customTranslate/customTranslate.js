import PT from '../translations/pt';

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  const find = Object.keys(PT).find(key => key.includes(replacements.type))

  template = PT[template] || PT[find] || 'Criar tarefa';

  return template?.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key];
  });
}
