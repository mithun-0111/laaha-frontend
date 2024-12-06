import { useTranslations } from 'next-intl';

const handleExit = () => {
  window.location.href = 'https://www.google.com';
}
const ExitButton = () => {
  const t = useTranslations();
  return (
    <button 
      className='py-3 px-5 text-white font-bold btn-secondary rounded'
      onClick={handleExit}
      >
        <span></span>
        <span>{t('EXIT_BUTTON')}</span>
    </button>
  )
}

export default ExitButton