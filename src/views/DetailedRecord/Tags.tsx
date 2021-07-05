import { Avatar, Chip } from '@material-ui/core';

interface TagsProps {
  tags: string[];
}

export function Tags(props: TagsProps) {
  return (
    <>
      {props.tags.map((tag) => (
        <Chip
          className="record-tag"
          key={tag}
          avatar={<Avatar>#</Avatar>}
          label={tag}
          color="primary"
          variant="outlined"
        />
      ))}
    </>
  );
}
