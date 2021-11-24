<li key={i} css={styles.message}>
  <p>
    <span>{message.author}</span>
    {' - '}
    <span>{dayjs().calendar(message.creation)}</span>
  </p>
  <div dangerouslySetInnerHTML={{__html: value}}>
  </div>
</li>
