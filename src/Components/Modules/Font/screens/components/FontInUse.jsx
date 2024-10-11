function FontInUse({font, sites}) {
  const examples = font.inuse.split(";");
  return examples.map((example) => {
    const urlObj = sites.find((site) => site.website === example);
    const url = urlObj ? urlObj.url : null;
    return (
      <li className="text-sm leading-4 mb-1" key={example}>
        {url ? (
          <a href={`https://www.${url}`} target="_blank" rel="noopener noreferrer">{example}</a>
        ) : (
          example
        )}
      </li>
    )
  })
}

export default FontInUse;