import styles from './index.less';
import Skeleton from '@mui/material/Skeleton';
import { history, connect, IndexModelState, Loading } from 'umi';
import {
  Sparklines,
  SparklinesLine,
  SparklinesBars,
  SparklinesReferenceLine,
} from 'react-sparklines';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
function IndexPage({ Search, dispatch, loading }: any) {
  const { searchList } = Search;
  return (
    <div>
      <h2 className={styles.text}>Related product trends</h2>
      {loading ? (
        <div className={styles.content}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item}>
              <Skeleton variant="text" />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="rectangular" width={210} height={168} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.content}>
          {searchList.map((item: any, index: number) => (
            <div style={{ width: '280px', marginBottom: '24px' }} key={index}>
              <Card sx={{ maxWidth: '280px' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    growth {item.growth}%
                  </Typography>
                  <Sparklines
                    data={item.search_msv.map((item: any) => item.sv)}
                    style={{ background: '#00bdcc' }}
                    margin={10}
                    height={40}
                  >
                    <SparklinesLine style={{ stroke: 'white', fill: 'none' }} />
                    <SparklinesReferenceLine
                      style={{
                        stroke: 'white',
                        strokeOpacity: 0.75,
                        strokeDasharray: '2, 2',
                      }}
                    />
                  </Sparklines>
                </CardContent>
                <h4 className={styles.time_bar}>
                  {item.search_msv[0].date}至
                  {item.search_msv[item.search_msv.length - 1].date}
                </h4>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default connect(
  ({ Search, loading }: { Search: IndexModelState; loading: Loading }) => ({
    Search,
    loading: loading.models.Search,
  }),
)(IndexPage);
