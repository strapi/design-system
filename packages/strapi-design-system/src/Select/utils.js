export const changeDescendant = (list, option) => {
  list.setAttribute('aria-activedescendant', option.getAttribute('id'));

  const options = list.querySelectorAll('[role="option"]');

  options.forEach((opt) => opt.classList.remove('is-focused'));
  option.classList.add('is-focused');
};

export const getActiveDescendant = (list) => {
  const id = list.getAttribute('aria-activedescendant');

  return list.querySelector(`#${id}`);
};
