import styles from './index.less';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { history, connect, IndexModelState, Loading } from 'umi';

function IndexPage({ children, Search, dispatch }: any) {
  const { searchContent, searchState } = Search;
  const toSearch = () => {
    if (!searchContent.trim()) {
      return;
    }
    if (searchContent === history.location.pathname.replace('/search/', ''))
      return;
    history.push(`/search/${searchContent.replace(/\s/g, '+')}`);
    dispatch({
      type: 'Search/setSearchState',
      payload: true,
    });
  };
  const setSearch = ({ target }: any) => {
    dispatch({
      type: 'Search/setSearchContent',
      payload: target.value,
    });
    if (!target.value.trim()) {
      history.push('/');
      dispatch({
        type: 'Search/setSearchState',
        payload: false,
      });
    }
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>
        <span>
          {' '}
          <strong>Best</strong>Search{' '}
        </span>
        {searchState ? (
          <div className={styles.search_content}>
            <div className={styles.input_bar}>
              <TextField
                onPointerEnter={toSearch}
                value={searchContent}
                onInput={setSearch}
                size="small"
                id="outlined-basic"
                label="search"
                variant="outlined"
                fullWidth
              />
            </div>
            <Button
              onClick={toSearch}
              variant="outlined"
              startIcon={<SearchIcon />}
            ></Button>
          </div>
        ) : (
          ''
        )}
      </h2>
      {searchState ? (
        <>{children}</>
      ) : (
        <>
          <div className={styles.search_content}>
            <div className={styles.input_bar}>
              <TextField
                onPointerEnter={toSearch}
                value={searchContent}
                size="small"
                id="outlined-basic"
                label="search"
                variant="outlined"
                onInput={({ target }: any) => {
                  dispatch({
                    type: 'Search/setSearchContent',
                    payload: target.value,
                  });
                }}
                fullWidth
              />
            </div>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={toSearch}
            ></Button>
          </div>
        </>
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
