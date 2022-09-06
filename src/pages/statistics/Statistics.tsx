import React from 'react';
import Image from 'src/components/Image';
import Loading from 'src/components/Loading';
import LayoutMain from 'src/containers/LayoutMain';
import { userIsInStorage, userIsLogged } from 'src/helpers/storage';
import styles from 'src/pages/statistics/Statistics.module.scss';
import { useAppSelector } from 'src/store/hooks';
import { getUserData, getUserIsLoading } from 'src/store/userSlice';
import { useNavigate } from 'react-router-dom';
import TodayStatistics from 'src/containers/statistic-list/TodayStatistics';

const Statistic: React.FC = () => {
  const userIsLoggedLoading = useAppSelector(getUserIsLoading);
  const userData = useAppSelector(getUserData);
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate('../login', { replace: true });
  };

  if (userIsLoggedLoading || (userIsInStorage() && !userData))
    return (
      <LayoutMain>
        <Loading />
      </LayoutMain>
    );

  return (
    <LayoutMain>
      <h1 className={styles.title}>Статистика</h1>
      {userIsLogged(userData?.message) ? (
        <TodayStatistics />
      ) : (
        <div className={styles.wrapper}>
          <p className={styles.subtitle}>
            Данный раздел доступен только авторизованным пользователям.
          </p>
          <p className={styles.subtitle}>
            <button type='button' className={styles.link} onClick={navigationHandler}>
              Зарегистрируйся
            </button>{' '}
            и используй все возможности приложения!
          </p>
          <Image
            {...{
              altImg: 'Authentication',
              srcImg: 'assets/images/authentication.png',
              className: `${styles.image}`,
            }}
          />
        </div>
      )}
    </LayoutMain>
  );
};

export default Statistic;
