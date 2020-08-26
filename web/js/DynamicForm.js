const template = `
  <div class="d-flex flex-row" id="ID_PREFIX-index">
    <input class="form-control bg-dark text-light" type="text" name="name_prefix-index" id="ID_PREFIX-index">
    <button type="button" class="btn btn-danger ml-1" id="RemoveID_Prefix-index">-</button>
  </div>
`;

const domparser = new DOMParser();

class DynamicForm
{
  constructor(namePrefix, idPrefix, addButton, formHolder, template)
  {
    this.prefix = prefix;
    this.addButton = addButton;
    this.formHolder = formHolder;

    const newIndex = querySelectorAll(`[id*=${idPrefix}]`).length + 1;

    const indexRegex = /index/g;
    const idRegex = /ID_PREFIX/g;
    const nameRegex = /name_prefix/g;

    const newTemplate = template
      .replace(indexRegex, newIndex)
      .replace(idRegex, idPrefix)
      .replace(nameRegex, namePrefix);

    /** @param {HTMLLIElement} addButton*/
    const addButton = document.getElementById(addButton);
    addButton.addEventListener('click', event =>
    {
      formHolder.appendChild(newTemplate);
    });
    querySelector(`#Remove${idPrefix}-${index}`).addEventListener('click', event =>
    {
      const element = querySelector(`${idPrefix}-${index}`);
      element.parentNode.removeChild(element);
    });
  }
}

