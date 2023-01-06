import {Box} from "@mui/material";
import {styled} from '@mui/material/styles';

type FlexBetweenProps = {
    backgroundColor?: string
}

const FlexBetween = styled(Box)<FlexBetweenProps>(({backgroundColor}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor
}))

export default FlexBetween
