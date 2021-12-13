
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef} from 'react'
// Layout
import { useTheme } from '@mui/styles';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: ' hh:mm A'
  }
})

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    color : 'black',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      border: '1px solid white',
    },
    backgroundColor:'whithe',
    marginBottom: '.9rem',
    borderRadius: '25px',
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  }
})


const unit_message = {
      marginTop:"50px",
      marginLeft:"30px",
      marginRight:"30px",
};

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
}, ref) => {
  const styles = useStyles(useTheme())
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  return (
    <div css={styles.root} ref={rootEl}>
      <ul>
        { messages.map( (message, i) => {
            const {value} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);

            return (
              <li key={i} >
              <div style={unit_message}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Avatar>Z.T</Avatar>
                    </Grid>
                    <Grid item xs={8}>
                      <div css={{color:'grey', fontSize:'15px;', color:'blue', marginTop:'0px;'}}>{message.author}</div>
                    </Grid>
                    <Grid item xs={2}>
                      <div css={{color:'grey', fontSize:'10px;'}}>{dayjs().calendar(message.creation)}</div>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <div css={{color:'grey', fontSize:'12px;', color:'grey', marginLeft:'70px', marginRight:'60px', marginTop:'-40px'}} dangerouslySetInnerHTML={{__html: value}}>
                        </div>
                      </Typography>
                    </Grid>

                  </Grid>
                </div>
              </li>

            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
