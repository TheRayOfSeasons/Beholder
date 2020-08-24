const form = document.getElementById('CharacterSheetForm');
const submit = document.getElementById('CharacterSheetSubmit');

submit.onclick = async event =>
{
  event.preventDefault();

  /** This contains all the prefixes of all dynamic fields. */
  const multipartPrefixes = [
    'class',
    'level',
    'other_proficiency',
    'language',
    'atk_name',
    'atk_bonus',
    'atk_damage',
    'feature_name',
    'feature_description',
    'cantrip',
    'spell_one',
    'spell_two',
    'spell_three',
    'spell_four',
    'spell_five',
    'spell_six',
    'spell_seven',
    'spell_eight',
    'spell_nine'
  ];

  /** Initiallize each multi-part prefix as an array for the form data. */
  let initialFormData = {}
  for(const prefix of multipartPrefixes)
    initialFormData[prefix] = []

  /** Assemble form data to be submitted to backend. */
  const formData = Object.values(form.elements).reduce((formData, { name, value }) =>
  {
    const [prefix, ...others] = multipartPrefixes.filter(item => name.startsWith(`${item}-`));
    if(prefix)
      formData[prefix].push(value);
    else if(prefix == undefined)
      formData[name] = value;
    return formData;
  }, initialFormData);

  /* https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch */
  /** Send data to backend. */
  fetch('/character-sheet',
  {
    method: 'POST',
    body: JSON.stringify(formData),
  });
}
