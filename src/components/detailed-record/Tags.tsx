import { Avatar, Chip } from '@material-ui/core';

interface TagsProps {
  tags: string[];
}

export function Tags(props: TagsProps) {
  return (
    <div>
      {props.tags.map((tag) => (
        <Chip
          key={tag}
          avatar={<Avatar>#</Avatar>}
          label={tag}
          color="primary"
          variant="outlined"
        />
      ))}
    </div>
  );
}
