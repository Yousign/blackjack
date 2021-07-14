import Error from 'next/error';
import useTranslation from 'next-translate/useTranslation';

export default function Custom404() {
  const { t } = useTranslation();
  const errorMessage = t`error:404`;

  return <Error statusCode={404} title={errorMessage} />;
}
