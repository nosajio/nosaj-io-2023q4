import s from './UnsubscribePage.module.scss';

type UnsubscribePageProps = {
  searchParams?: {
    token?: string;
    eid?: string;
  };
};

export default async function UnsubscribePage({
  searchParams,
}: UnsubscribePageProps) {
  const { token, eid } = searchParams ?? {};
  return (
    <div className={s.content_grid}>
      <div className={s.grid_content}>
        {token && <h1>Sorry to see you go</h1>}
      </div>
    </div>
  );
}
