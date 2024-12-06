import { useLocale } from 'next-intl';
import { locales, usePathname, useRouter } from '@/navigation';
import { locales as localeName } from '@/site.config';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathName, { locale: e.target.value });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
    >
      {locales.map((lang) => (
        <option
          key={lang}
          value={lang}
        >
          {localeName[lang as keyof typeof localeName]}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
