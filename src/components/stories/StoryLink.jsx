import { storyHref } from '../../data/catalogue';

// A real link to a story's URL. Plain left-clicks open the story in place;
// cmd/ctrl/shift/middle-clicks fall through to the browser, so "open in new
// tab" and "copy link" work.
export default function StoryLink({ slug, onOpen, className = '', children, ...rest }) {
  const handleClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onOpen();
  };

  return (
    <a href={storyHref(slug)} onClick={handleClick} className={`wi-plainlink ${className}`.trim()} {...rest}>
      {children}
    </a>
  );
}
