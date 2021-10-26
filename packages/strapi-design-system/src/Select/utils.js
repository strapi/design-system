import computeScrollIntoView from 'compute-scroll-into-view';

export const changeDescendant = (list, option) => {
  list.setAttribute('aria-activedescendant', option.getAttribute('id'));

  const options = list.querySelectorAll('[role="option"]');

  options.forEach((opt) => opt.classList.remove('is-focused'));
  option.classList.add('is-focused');

  const actions = computeScrollIntoView(option, {
    scrollMode: 'if-needed',
    block: 'nearest',
    inline: 'nearest',
  });

  actions.forEach(({ el, top, left }) => {
    el.scrollTop = top;
    el.scrollLeft = left;
  });
};

export const getActiveDescendant = (list) => {
  const id = list.getAttribute('aria-activedescendant');

  return list.querySelector(`#${id}`);
};
