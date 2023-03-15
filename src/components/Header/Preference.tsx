import { Component } from 'solid-js/types/render/component';
import { BiRegularWorld, BiSolidMoon, BiSolidSun } from 'solid-icons/bi';
import Dropdown, { DropdownMenuProps } from '~/components/Dropdown';
import { createMemo, useContext } from 'solid-js';
import { AppContext } from '~/AppContext';
import { useI18n } from '@solid-primitives/i18n';

const langs: Record<string, string> = {
  en: 'English',
  'zh-cn': '简体中文',
};
const Preference: Component = () => {
  const context = useContext(AppContext);
  const [, { locale }] = useI18n();

  const langOptions = createMemo(() => {
    return Object.entries(langs).map(([lang, text]) => {
      return {
        id: lang,
        label: <div class="w-36">{text}</div>,
        onSelect: (lang) => locale(lang),
      } as DropdownMenuProps;
    });
  });

  const langText = createMemo(() => {
    return langs[locale()] ?? langs['en'];
  });

  const changeDarkMode = () => {
    context.isDark = !context.isDark;
  };

  return (
    <div
      class="flex items-center lg:space-x-4 text-light-tertiary dark:text-dark-tertiary text-2xl
      lg:divide-none divide-x divide-light-divider dark:divide-dark-border divide-light-border
      border-t border-light-border dark:border-dark-divider lg:border-none"
    >
      <div
        class="flex justify-center items-center flex-1 py-4 inline-block cursor-pointer
        hover:bg-light-hover dark:hover:bg-dark-hover hover:lg:bg-transparent lg:dark:hover:bg-transparent"
        onClick={changeDarkMode}
      >
        {context.isDark ? <BiSolidMoon /> : <BiSolidSun />}
      </div>
      <Dropdown
        class="flex-1 hover:bg-light-hover dark:hover:bg-dark-hover lg:hover:bg-transparent dark:lg:hover:bg-transparent"
        menus={langOptions()}
        arrow={true}
        selected={[locale()]}
      >
        <div
          class="flex py-4 justify-center lg:justify-start lg:w-32 items-center lg:py-2 lg:px-2 rounded-lg
          lg:border border-light-border dark:border-dark-border"
        >
          <BiRegularWorld class="mr-2" />
          <span class="text-sm">{langText()}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Preference;
