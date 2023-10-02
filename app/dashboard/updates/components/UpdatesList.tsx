import { FC } from 'react'

interface UpdatesListProps {
  data: any[];
}

const UpdatesList: FC<UpdatesListProps> = ({data}) => {
  return <div>{data.map((update)=><div>{update.type}</div>)}</div>
}

export default UpdatesList